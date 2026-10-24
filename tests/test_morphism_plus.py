import os
import sys
import unittest

# Ensure Morphism-SRS-plus is on path
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

from app_paths import (BASE_DIR as APP_BASE_DIR, ASSETS_DIR, COURSES_DIR, 
                       THEMES_DIR, CHART_JS, MATHJAX_SVG_JS)
from theme_manager import ThemeManager
from models import Flashcard, ProofSequenceCard, ClozeCard, NoteNode, NoteEdge, Course, ReviewLogRecord
from scheduler_manager import SchedulerManager
import course_storage

class TestMorphismPlus(unittest.TestCase):

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
        pkg_path = os.path.join(APP_BASE_DIR, "test_pkg.morphism")
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

if __name__ == "__main__":
    unittest.main()
