import os
import sys
import unittest

# Ensure Morphism-SRS-plus and src are on path
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC_DIR = os.path.join(BASE_DIR, "src")
for p in [BASE_DIR, SRC_DIR]:
    if p not in sys.path:
        sys.path.insert(0, p)

from morphism.core.app_paths import (BASE_DIR as APP_BASE_DIR, ASSETS_DIR, COURSES_DIR, 
                                     THEMES_DIR, CHART_JS, MATHJAX_SVG_JS)
from morphism.core.theme_manager import ThemeManager
from morphism.core.models import Flashcard, ProofSequenceCard, ClozeCard, NoteNode, NoteEdge, Course, ReviewLogRecord
from morphism.core.scheduler_manager import SchedulerManager
from morphism.core import course_storage

class TestMorphismPlus(unittest.TestCase):

    def setUp(self):
        import tempfile
        self.tmp_dir = tempfile.TemporaryDirectory()
        self.orig_courses_dir = course_storage.COURSES_DIR
        self.orig_scheduling_dir = course_storage.SCHEDULING_DIR
        course_storage.COURSES_DIR = os.path.join(self.tmp_dir.name, "Courses")
        course_storage.SCHEDULING_DIR = os.path.join(self.tmp_dir.name, "scheduling")
        os.makedirs(course_storage.COURSES_DIR, exist_ok=True)
        os.makedirs(course_storage.SCHEDULING_DIR, exist_ok=True)

    def tearDown(self):
        course_storage.COURSES_DIR = self.orig_courses_dir
        course_storage.SCHEDULING_DIR = self.orig_scheduling_dir
        self.tmp_dir.cleanup()

    def test_paths_and_bundled_assets(self):
        """Verify that offline assets exist and are non-empty."""
        self.assertTrue(os.path.exists(ASSETS_DIR), "assets/ directory should exist")
        self.assertTrue(os.path.exists(CHART_JS), "chart.js should exist in assets/")
        self.assertGreater(os.path.getsize(CHART_JS), 1000, "chart.js should not be empty")

        self.assertTrue(os.path.exists(MATHJAX_SVG_JS), "tex-svg.js should exist in assets/")
        self.assertGreater(os.path.getsize(MATHJAX_SVG_JS), 1000, "tex-svg.js should not be empty")

    def test_theme_manager(self):
        """Verify JSON theme discovery, parsing, and live switching."""
        tm = ThemeManager.get_instance()
        themes = tm.get_available_themes()
        self.assertGreaterEqual(len(themes), 5, "At least 5 JSON themes should be loaded")

        theme_ids = [t["id"] for t in themes]
        self.assertIn("bisexual_midnight", theme_ids)
        self.assertIn("dark_modern", theme_ids)
        self.assertIn("catppuccin_mocha", theme_ids)
        self.assertIn("nord", theme_ids)
        self.assertIn("dracula", theme_ids)
        self.assertIn("github_light", theme_ids)

        # Test switching to each theme
        for t in themes:
            success = tm.set_theme(t["id"])
            self.assertTrue(success, f"Should be able to activate theme {t['id']}")
            qss = tm.generate_qss()
            self.assertIn("QMainWindow", qss)
            self.assertIn("QPushButton", qss)

            web_css = tm.get_web_css_variables()
            self.assertIn("--bg-color:", web_css)
            self.assertIn("--card-bg:", web_css)

            graph_colors = tm.get_graph_colors()
            self.assertIn("canvas_bg", graph_colors)

    def test_cloze_card(self):
        """Verify Cloze deletion card parsing and HTML generation."""
        cloze = ClozeCard("Euler Formula", "The equation {{c1::$e^{i\\pi} + 1 = 0$::Euler's relation}} connects 5 constants.")
        front = cloze.get_html_front()
        back = cloze.get_html_back()

        self.assertIn("[Euler's relation]", front, "Hint should appear in brackets on front")
        self.assertNotIn("connects 5 constants", front[:front.find("[Euler's relation]")])
        self.assertIn("cloze-revealed", back, "Answer should be highlighted on back")
        self.assertIn("$e^{i\\pi} + 1 = 0$", back)

        # Test serialization
        d = cloze.to_dict()
        self.assertEqual(d["type"], "ClozeCard")
        self.assertEqual(d["title"], "Euler Formula")

        # Test cloze inside math block cleanly splits math delimiters
        cloze_math = ClozeCard("Math Cloze", r"$$\mathbf{A} \times \mathbf{B} = {{c1::\mathbf{C}::hint}}$$")
        front_m = cloze_math.get_html_front()
        back_m = cloze_math.get_html_back()
        self.assertNotIn(r"<span class='cloze-bracket'>[hint]</span>$$", front_m)
        self.assertIn(r"<div class='math-display-container'>$\displaystyle \mathbf{A} \times \mathbf{B} = $<span class='cloze-bracket'>[hint]</span></div>", front_m)
        self.assertIn(r"<span class='cloze-revealed'>$\displaystyle \mathbf{C}$</span>", back_m)

    def test_search_and_filter(self):
        """Verify note search matching across title, tags, and cards."""
        note = NoteNode(title="Linear Transformations and Kernels", tags=["algebra", "matrices"])
        card1 = Flashcard("Definition", r"Let $T: V \to W$", r"$\ker(T) = \{v \in V \mid T(v) = 0\}$")
        note.add_card(card1)

        self.assertTrue(note.matches_query("linear"))
        self.assertTrue(note.matches_query("algebra"))
        self.assertTrue(note.matches_query("ker(T)"))
        self.assertFalse(note.matches_query("nonexistent_concept_xyz"))

    def test_fsrs_and_joint_retention(self):
        """Verify FSRS calculations and joint retention modeling."""
        sm = SchedulerManager()
        c1 = Flashcard("Card 1", "Q1", "A1")
        c2 = Flashcard("Card 2", "Q2", "A2")

        note = NoteNode(title="Calculus", desired_retention=0.85)
        note.add_card(c1)
        note.add_card(c2)

        # Initially new cards have retrievability 0
        r_initial = note.get_joint_retention(sm)
        self.assertEqual(r_initial, 0.0)
        self.assertTrue(note.is_due(sm))

        # Rate card
        from fsrs import Rating
        sm.rate_object(c1, Rating.Good)
        self.assertIsNotNone(c1.fsrs_card.last_review)

    def test_review_log_undo(self):
        """Verify review log appending and popping for undo support."""
        course_name = "TestUndoCourse"
        rlog = ReviewLogRecord(card_id=123, rating=3, review_time="2026-10-23T00:00:00Z")
        course_storage.save_review_log(course_name, rlog)
        
        logs = course_storage.load_review_logs(course_name)
        self.assertEqual(len(logs), 1)
        self.assertEqual(logs[0].card_id, 123)

        popped = course_storage.pop_last_review_log(course_name)
        self.assertIsNotNone(popped)
        self.assertEqual(popped["card_id"], 123)

        logs_after = course_storage.load_review_logs(course_name)
        self.assertEqual(len(logs_after), 0)
        course_storage.delete_course(course_name)

    def test_course_storage_and_packages(self):
        """Verify course creation, saving, and .morphism / .zip package export & import."""
        course = Course("Test Linear Algebra")
        n1 = NoteNode(title="Vector Spaces")
        n1.add_card(Flashcard("Axiom 1", "Associativity", "u + (v + w) = (u + v) + w"))
        n2 = NoteNode(title="Subspaces")
        n2.add_card(ClozeCard("Subspace test", "A subset $W$ is a subspace if {{c1::it is non-empty and closed under + and *}}."))
        course.notes.extend([n1, n2])
        course.edges.append(NoteEdge(n1.note_id, n2.note_id, "Prerequisite"))

        # Save course
        course_storage.save_course(course)
        loaded = course_storage.load_course("Test Linear Algebra")
        self.assertEqual(len(loaded.notes), 2)
        self.assertEqual(len(loaded.edges), 1)

        # Test package export
        pkg_path = os.path.join(self.tmp_dir.name, "test_pkg.morphism")
        try:
            course_storage.export_course_package_zip(loaded, pkg_path)
            self.assertTrue(os.path.exists(pkg_path))

            # Test package import
            imported = course_storage.import_course_package_zip(pkg_path)
            self.assertEqual(imported.name, "Test Linear Algebra")
            self.assertEqual(len(imported.notes), 2)
        finally:
            if os.path.exists(pkg_path):
                os.remove(pkg_path)
            course_storage.delete_course("Test Linear Algebra")

    def test_nested_latex_and_mathbf_cloze_rendering(self):
        """Verify that LaTeX with mathbf and nested braces renders cleanly on front and back."""
        text = r"Regla BAC-CAB: $$\mathbf{A} \times (\mathbf{B} \times \mathbf{C}) = {{c1::\mathbf{B}(\mathbf{A}\cdot\mathbf{C}) - \mathbf{C}(\mathbf{A}\cdot\mathbf{B})}}$$<br>Desplazamiento: $\mathbf{D} = {{c2::\varepsilon_0 \mathbf{E} + \mathbf{P}}}$ y carga ${{c3::Q_{f,\text{enc}}}}$."
        card = ClozeCard("Identidades Vectoriales", text)
        
        front = card.get_html_front()
        back = card.get_html_back()

        # Front checks
        self.assertNotIn("{{c1::", front)
        self.assertNotIn("{{c2::", front)
        self.assertNotIn("{{c3::", front)
        self.assertIn("cloze-bracket", front)
        self.assertNotIn("cloze-revealed", front)

        # Back checks
        self.assertNotIn("{{c1::", back)
        self.assertNotIn("{{c2::", back)
        self.assertNotIn("{{c3::", back)
        self.assertIn("cloze-revealed", back)
        self.assertIn(r"\mathbf{B}(\mathbf{A}\cdot\mathbf{C})", back)
        self.assertIn(r"\varepsilon_0 \mathbf{E} + \mathbf{P}", back)
        self.assertIn(r"Q_{f,\text{enc}}", back)

        # Delimiter balance check
        self.assertEqual(front.count("$") % 2, 0)
        self.assertEqual(back.count("$") % 2, 0)

    def test_all_courses_math_and_mathbf_integrity(self):
        """Verify that all cards across all courses have balanced math delimiters and no raw LaTeX outside math."""
        import json, glob, re
        course_files = sorted(set(glob.glob("Courses/*.json") + ["android/app/src/main/assets/seed_courses.json"]))
        self.assertGreater(len(course_files), 0)

        latex_outside_regex = re.compile(r"\\(mathbf|boldsymbol|vec|hat|nabla|frac|sqrt|text|alpha|beta|gamma|epsilon|varepsilon|mu|pi|rho|sigma|tau|theta|phi|omega|int|oint|iint|iiint|partial|times|cdot|pm|le|ge|ne|approx|equiv|to|not|in|subset|cap|cup|forall|exists|ce)\b")

        total_cards_checked = 0
        for path in course_files:
            with open(path, "r", encoding="utf-8") as f:
                data = json.load(f)
            courses = data if isinstance(data, list) else [data]
            for c in courses:
                for n in c.get("notes", []):
                    for card in n.get("cards", []):
                        total_cards_checked += 1
                        for field in ["text", "front", "back", "premise"]:
                            val = card.get(field, "")
                            if not val:
                                continue
                            # Verify balanced $
                            self.assertEqual(
                                val.count("$") % 2, 0,
                                f"Odd dollar count in {path} [{c.get('name')}] node {n.get('note_id')} card {card.get('title')} field {field}"
                            )
                            # Strip math blocks and verify no raw LaTeX commands outside
                            stripped = re.sub(r"\$\$[\s\S]*?\$\$", " ", val)
                            stripped = re.sub(r"\$[^\$]+?\$", " ", stripped)
                            outside_matches = latex_outside_regex.findall(stripped)
                            self.assertEqual(
                                len(outside_matches), 0,
                                f"Raw LaTeX outside math mode in {path} [{c.get('name')}] node {n.get('note_id')} card {card.get('title')}: {outside_matches}"
                            )
        self.assertGreaterEqual(total_cards_checked, 200)

    def test_android_assets_and_responsive_css(self):
        """Verify Android assets, CSS responsive rules, themes completeness, and back button handler."""
        # 1. Check index.html responsive & safe area rules
        with open("android/app/src/main/assets/index.html", "r", encoding="utf-8") as f:
            html = f.read()

        self.assertIn("env(safe-area-inset-top", html)
        self.assertIn("env(safe-area-inset-bottom", html)
        self.assertIn(".math-display-container::before", html)
        self.assertIn("overflow-wrap: anywhere", html)
        self.assertIn("touch-action: pan-x pan-y", html)

        # 2. Check graph.js Retina / High-DPI scaling
        with open("android/app/src/main/assets/graph.js", "r", encoding="utf-8") as f:
            graph_js = f.read()

        self.assertIn("ctx.scale(dpr, dpr)", graph_js)
        self.assertIn("this.cssWidth", graph_js)
        self.assertIn("this.cssHeight", graph_js)

        # 3. Check app.js themes completeness and back button handler
        with open("android/app/src/main/assets/app.js", "r", encoding="utf-8") as f:
            app_js = f.read()

        self.assertIn("window.onAndroidBackPressed", app_js)
        for theme_id in ["bisexual_midnight", "catppuccin_mocha", "nord", "dracula", "dark_modern", "github_light"]:
            self.assertIn(f"{theme_id}:", app_js)
        self.assertIn("canvas_bg", app_js)
        self.assertIn("grid_color", app_js)
        self.assertIn("morphism_courses_v7", app_js)

        # 4. Check MainActivity.java has Javascript back handler integration
        with open("android/app/src/main/java/org/morphism/srs/plus/MainActivity.java", "r", encoding="utf-8") as f:
            main_activity = f.read()
        self.assertIn("window.onAndroidBackPressed", main_activity)

if __name__ == "__main__":
    unittest.main()
