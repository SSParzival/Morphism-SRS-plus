import json
import os
from typing import Optional, List, Dict
from PySide6.QtWidgets import (QWidget, QVBoxLayout, QHBoxLayout, QPushButton, 
                               QLabel, QFrame, QSizePolicy)
from PySide6.QtWebEngineWidgets import QWebEngineView
from PySide6.QtCore import Signal, Qt, QUrl, QEvent
from PySide6.QtGui import QKeySequence, QShortcut
from fsrs import Rating

from models import ReviewObject, ProofSequenceCard
from scheduler_manager import SchedulerManager
from app_paths import ASSETS_DIR, MATHJAX_CONFIG_FILE
from theme_manager import ThemeManager

def load_mathjax_tex_config_json() -> str:
    """Load assets/mathjax_config.json dynamically or return fallback TeX config JSON."""
    if os.path.exists(MATHJAX_CONFIG_FILE):
        try:
            with open(MATHJAX_CONFIG_FILE, "r", encoding="utf-8") as f:
                data = json.load(f)
                return json.dumps(data)
        except Exception as e:
            print(f"Error loading mathjax_config.json: {e}")
    return json.dumps({
        "inlineMath": [["$", "$"], ["\\(", "\\)"]],
        "displayMath": [["$$", "$$"], ["\\[", "\\]"]],
        "processEscapes": True,
        "packages": {"[+]": ["color", "ams"]},
        "macros": {
            "RR": "{\\mathbb{R}}",
            "CC": "{\\mathbb{C}}",
            "NN": "{\\mathbb{N}}",
            "ZZ": "{\\mathbb{Z}}",
            "QQ": "{\\mathbb{Q}}"
        }
    })

def build_mathjax_html_template() -> str:
    tex_json = load_mathjax_tex_config_json()
    css_vars = ThemeManager.get_instance().get_web_css_variables()

    return f"""<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        {css_vars}
        * {{ box-sizing: border-box; }}
        body {{ 
            font-family: -apple-system, BlinkMacSystemFont, "Inter", "Ubuntu", "DejaVu Sans", "Segoe UI", Roboto, sans-serif;
            font-size: 18px; 
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            background-color: var(--bg-color);
            color: var(--text-color);
            display: flex;
            justify-content: center;
            align-items: flex-start;
            min-height: 95vh;
        }}
        .container {{
            width: 100%;
            max-width: 860px;
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            border-radius: 16px;
            padding: 28px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.4), 0 0 20px var(--accent-glow);
            transition: all 0.3s ease;
        }}
        .empty-placeholder {{
            text-align: center;
            padding: 40px 20px;
        }}
        .empty-title {{
            font-size: 24px;
            font-weight: bold;
            color: var(--accent-border);
            margin-bottom: 12px;
        }}
        .empty-subtitle {{
            font-size: 16px;
            color: var(--text-muted);
        }}
        .seq-badge {{
            display: inline-block;
            background: linear-gradient(135deg, #4f46e5, #7c3aed);
            color: #ffffff;
            font-weight: 700;
            font-size: 13px;
            padding: 4px 12px;
            border-radius: 12px;
            margin-bottom: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }}
        .past-steps-container {{
            background: rgba(15, 23, 42, 0.7);
            border: 1px solid var(--border-color);
            border-radius: 10px;
            padding: 12px 16px;
            margin-bottom: 20px;
        }}
        .past-steps-summary {{
            cursor: pointer;
            font-weight: 600;
            color: var(--accent-border);
            font-size: 15px;
            user-select: none;
        }}
        .past-step-item {{
            background: rgba(30, 41, 59, 0.6);
            border-left: 3px solid #10b981;
            margin-top: 10px;
            padding: 10px 14px;
            border-radius: 6px;
            font-size: 16px;
        }}
        .past-step-title {{
            font-weight: bold;
            color: #38bdf8;
            margin-bottom: 4px;
        }}
        .card-title {{
            font-size: 22px;
            font-weight: 700;
            color: var(--accent-border);
            margin-bottom: 14px;
            border-bottom: 1px solid var(--border-color);
            padding-bottom: 8px;
        }}
        .card-body {{
            font-size: 18px;
            margin-top: 10px;
        }}
        .cloze-bracket {{
            color: #38bdf8;
            font-weight: bold;
            padding: 2px 8px;
            background: rgba(56, 189, 248, 0.15);
            border-radius: 4px;
            border: 1px dashed #38bdf8;
        }}
        .cloze-revealed {{
            color: #10b981;
            font-weight: bold;
            background: rgba(16, 185, 129, 0.2);
            border-radius: 4px;
            padding: 2px 8px;
            border: 1px solid #10b981;
        }}
        hr.divider {{
            margin: 24px 0;
            border: 0;
            height: 1px;
            background: linear-gradient(90deg, transparent, var(--accent-border), transparent);
        }}
        .proof-list {{
            padding-left: 20px;
            margin-top: 10px;
        }}
        .proof-step {{
            margin-bottom: 10px;
            background: rgba(255,255,255,0.03);
            padding: 8px 12px;
            border-radius: 8px;
            border-left: 3px solid #10b981;
        }}
        img {{ max-width: 100%; height: auto; border-radius: 8px; margin: 8px 0; display: block; }}
        table {{ border-collapse: collapse; width: 100%; margin: 12px 0; background: rgba(15, 23, 42, 0.6); }}
        th, td {{ border: 1px solid var(--border-color); padding: 8px 12px; text-align: left; }}
        th {{ background-color: rgba(30, 41, 59, 0.8); color: var(--accent-border); }}
        code {{ background: rgba(0,0,0,0.3); color: #f43f5e; padding: 2px 6px; border-radius: 4px; font-family: monospace; }}
        pre {{ background: rgba(0,0,0,0.4); padding: 12px; border-radius: 8px; overflow-x: auto; border: 1px solid var(--border-color); }}
    </style>

    <script>
        window.MathJax = {{
            tex: {tex_json},
            svg: {{
                fontCache: 'local'
            }},
            options: {{
                skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre']
            }}
        }};
    </script>
    <script src="tex-svg.js"></script>

    <script>
        window.updateCardContent = function(frontHtml, backHtml, isBackVisible) {{
            let container = document.getElementById('card-container');
            if (!container) return;
            let content = "<div class='front'>" + frontHtml + "</div>";
            if (isBackVisible && backHtml) {{
                content += "<hr class='divider'>" + "<div class='back'>" + backHtml + "</div>";
            }}
            container.innerHTML = content;
            if (window.MathJax && window.MathJax.typesetPromise) {{
                MathJax.typesetPromise([container]).catch(function(err) {{
                    console.log(err);
                }});
            }}
        }};

        window.showEmptyState = function() {{
            let container = document.getElementById('card-container');
            if (!container) return;
            container.innerHTML = "<div class='empty-placeholder'>" +
                                  "<div class='empty-title'>☕ No card is currently being reviewed</div>" +
                                  "<div class='empty-subtitle'>Select a Course or Note in Explorer to start a review session!</div>" +
                                  "</div>";
        }};
    </script>
</head>
<body>
    <div class="container" id="card-container">
        <div class="empty-placeholder">
            <div class="empty-title">☕ No card is currently being reviewed</div>
            <div class="empty-subtitle">Select a Course or Note in Explorer to start a review session!</div>
        </div>
    </div>
</body>
</html>"""


class ReviewWidget(QWidget):
    """Review screen widget with QWebEngineView, FSRS rating controls, and Undo functionality."""
    
    rated = Signal(object, object)  # (Rating, prev_fsrs_card_dict)
    undo_requested = Signal()
    back_to_graph_requested = Signal()
    start_session_requested = Signal()

    def __init__(self, scheduler_manager: SchedulerManager):
        super().__init__()
        self.scheduler_manager = scheduler_manager
        self.current_obj: Optional[ReviewObject] = None
        self.seq_info: Optional[Dict] = None
        self.is_showing_back = False
        self.is_page_loaded = False
        self.can_undo = False

        self._setup_ui()
        ThemeManager.get_instance().theme_changed.connect(self.on_theme_changed)

    def _setup_ui(self):
        main_layout = QVBoxLayout(self)
        main_layout.setContentsMargins(16, 16, 16, 16)
        main_layout.setSpacing(12)

        # Top Header Bar
        top_bar = QHBoxLayout()
        self.btn_back = QPushButton("← Return to Explorer Graph")
        self.btn_back.setCursor(Qt.PointingHandCursor)
        self.btn_back.clicked.connect(self.back_to_graph_requested.emit)
        top_bar.addWidget(self.btn_back)

        self.btn_undo = QPushButton("↩ Undo Last Rating (Ctrl+Z)")
        self.btn_undo.setCursor(Qt.PointingHandCursor)
        self.btn_undo.setEnabled(False)
        self.btn_undo.clicked.connect(self._on_undo_clicked)
        top_bar.addWidget(self.btn_undo)

        self.lbl_card_info = QLabel("Review Session")
        self.lbl_card_info.setStyleSheet("font-size: 15px; font-weight: bold; color: #94a3b8;")
        top_bar.addSpacing(20)
        top_bar.addWidget(self.lbl_card_info)
        top_bar.addStretch()

        main_layout.addLayout(top_bar)

        # Embedded QWebEngineView
        self.browser = QWebEngineView()
        self.reload_html_template()
        self.browser.loadFinished.connect(self._on_page_loaded)
        self.browser.installEventFilter(self)
        if self.browser.focusProxy():
            self.browser.focusProxy().installEventFilter(self)

        main_layout.addWidget(self.browser, stretch=1)

        # Bottom Control Panel
        self.control_frame = QFrame()
        self.control_frame.setObjectName("ControlFrame")
        control_layout = QHBoxLayout(self.control_frame)
        control_layout.setContentsMargins(12, 12, 12, 12)
        control_layout.setSpacing(12)

        # Show Answer Button
        self.btn_show_answer = QPushButton("Show Answer (Space)")
        self.btn_show_answer.setObjectName("BtnShowAnswer")
        self.btn_show_answer.setCursor(Qt.PointingHandCursor)
        self.btn_show_answer.setFixedHeight(48)
        self.btn_show_answer.clicked.connect(self.show_answer)
        control_layout.addWidget(self.btn_show_answer)

        # FSRS Rating Buttons
        self.rating_buttons = {}
        ratings_data = [
            (Rating.Again, "Again (1)", "BtnAgain"),
            (Rating.Hard, "Hard (2)", "BtnHard"),
            (Rating.Good, "Good (3)", "BtnGood"),
            (Rating.Easy, "Easy (4)", "BtnEasy"),
        ]

        for rating, label_text, obj_name in ratings_data:
            btn = QPushButton()
            btn.setObjectName(obj_name)
            btn.setCursor(Qt.PointingHandCursor)
            btn.setFixedHeight(48)
            btn.clicked.connect(lambda checked=False, r=rating: self.submit_rating(r))
            self.rating_buttons[rating] = (btn, label_text)
            control_layout.addWidget(btn)

        main_layout.addWidget(self.control_frame)
        self._setup_shortcuts()
        self._set_empty_state()

    def reload_html_template(self):
        assets_url = QUrl.fromLocalFile(ASSETS_DIR.replace("\\", "/") + "/")
        self.browser.setHtml(build_mathjax_html_template(), assets_url)

    def on_theme_changed(self, theme_id: str):
        self.reload_html_template()

    def set_undo_available(self, available: bool):
        self.can_undo = available
        self.btn_undo.setEnabled(available)

    def _on_undo_clicked(self):
        if self.can_undo:
            self.undo_requested.emit()

    def _setup_shortcuts(self):
        sc_space = QShortcut(QKeySequence(Qt.Key_Space), self)
        sc_space.setContext(Qt.WindowShortcut)
        sc_space.activated.connect(self._on_space_pressed)

        sc_return = QShortcut(QKeySequence(Qt.Key_Return), self)
        sc_return.setContext(Qt.WindowShortcut)
        sc_return.activated.connect(self._on_space_pressed)

        sc_undo = QShortcut(QKeySequence("Ctrl+Z"), self)
        sc_undo.setContext(Qt.WindowShortcut)
        sc_undo.activated.connect(self._on_undo_clicked)

        sc_1 = QShortcut(QKeySequence(Qt.Key_1), self)
        sc_1.setContext(Qt.WindowShortcut)
        sc_1.activated.connect(lambda: self._on_rating_shortcut(Rating.Again))

        sc_2 = QShortcut(QKeySequence(Qt.Key_2), self)
        sc_2.setContext(Qt.WindowShortcut)
        sc_2.activated.connect(lambda: self._on_rating_shortcut(Rating.Hard))

        sc_3 = QShortcut(QKeySequence(Qt.Key_3), self)
        sc_3.setContext(Qt.WindowShortcut)
        sc_3.activated.connect(lambda: self._on_rating_shortcut(Rating.Good))

        sc_4 = QShortcut(QKeySequence(Qt.Key_4), self)
        sc_4.setContext(Qt.WindowShortcut)
        sc_4.activated.connect(lambda: self._on_rating_shortcut(Rating.Easy))

    def _on_space_pressed(self):
        if not self.current_obj:
            return
        if not self.is_showing_back:
            self.show_answer()
        else:
            self.submit_rating(Rating.Good)

    def _on_rating_shortcut(self, rating: Rating):
        if self.current_obj and self.is_showing_back:
            self.submit_rating(rating)

    def _on_page_loaded(self, ok: bool):
        self.is_page_loaded = True
        self._render_current_state()

    def show_empty_session(self):
        """Display default empty state when no active review card."""
        self.current_obj = None
        self.seq_info = None
        self.lbl_card_info.setText("No Active Review Session")
        self._set_empty_state()
        if self.is_page_loaded:
            self.browser.page().runJavaScript("if (typeof showEmptyState === 'function') { showEmptyState(); }")

    def load_object(self, review_obj: ReviewObject, seq_info: Optional[Dict] = None):
        """Load a review object into view."""
        self.current_obj = review_obj
        self.seq_info = seq_info
        self.is_showing_back = False
        
        forecasts = self.scheduler_manager.get_interval_forecasts(review_obj)
        for rating, (btn, label_text) in self.rating_buttons.items():
            forecast_str = forecasts.get(rating, "")
            btn.setText(f"{label_text}\n[{forecast_str}]")

        if seq_info:
            s_idx = seq_info.get("step_idx", 1)
            s_tot = seq_info.get("total_steps", 1)
            title = seq_info.get("note_title", "")
            j_ret = int(seq_info.get("joint_retention", 1.0) * 100)
            self.lbl_card_info.setText(f"Serial Note: {title} | Step {s_idx} of {s_tot} ({review_obj.get_hex_id()}) | P(∩ A_i) = {j_ret}%")
        else:
            self.lbl_card_info.setText(f"Card ID: {review_obj.get_hex_id()} | State: {review_obj.get_state_name()}")

        self._render_current_state()
        self._set_front_state()

    def show_answer(self):
        """Toggle back of card visible."""
        if not self.current_obj: return
        self.is_showing_back = True
        self._render_current_state()
        self._set_back_state()

    def eventFilter(self, watched, event):
        if event.type() == QEvent.KeyPress:
            key = event.key()
            if key in (Qt.Key_Space, Qt.Key_Return):
                self._on_space_pressed()
                return True
            elif key == Qt.Key_1 and self.is_showing_back:
                self._on_rating_shortcut(Rating.Again)
                return True
            elif key == Qt.Key_2 and self.is_showing_back:
                self._on_rating_shortcut(Rating.Hard)
                return True
            elif key == Qt.Key_3 and self.is_showing_back:
                self._on_rating_shortcut(Rating.Good)
                return True
            elif key == Qt.Key_4 and self.is_showing_back:
                self._on_rating_shortcut(Rating.Easy)
                return True
            elif key == Qt.Key_Z and (event.modifiers() & Qt.ControlModifier):
                self._on_undo_clicked()
                return True
        return super().eventFilter(watched, event)

    def submit_rating(self, rating: Rating):
        """Rate card via FSRS and emit signal with previous state snapshot."""
        if self.current_obj:
            prev_fsrs_dict = self.current_obj.fsrs_card.to_dict() if hasattr(self.current_obj.fsrs_card, "to_dict") else None
            self.scheduler_manager.rate_object(self.current_obj, rating)
            self.rated.emit(rating, prev_fsrs_dict)

    def _render_current_state(self):
        if not hasattr(self, "is_page_loaded") or not self.is_page_loaded:
            return

        if not self.current_obj:
            self.browser.page().runJavaScript("if (typeof showEmptyState === 'function') { showEmptyState(); }")
            return

        front_html = ""
        if self.seq_info:
            s_idx = self.seq_info.get("step_idx", 1)
            s_tot = self.seq_info.get("total_steps", 1)
            past_steps: List[ReviewObject] = self.seq_info.get("past_steps", [])

            front_html += f"<div class='seq-badge'>Serial Sequence Step {s_idx} of {s_tot}</div>"

            if past_steps:
                past_items_html = ""
                for idx, pcard in enumerate(past_steps, start=1):
                    p_title = pcard.get_title()
                    p_front = pcard.get_html_front()
                    p_back = pcard.get_html_back()
                    past_items_html += f"""
                    <div class='past-step-item'>
                        <div class='past-step-title'>Step A_{idx}: {p_title}</div>
                        <div>{p_front}</div>
                        <div style='margin-top: 6px; border-top: 1px dashed #475569; padding-top: 6px;'>{p_back}</div>
                    </div>
                    """

                front_html += f"""
                <details class='past-steps-container' open>
                    <summary class='past-steps-summary'>📜 Mastered Previous Steps (A_1 ... A_{len(past_steps)}) — Click to Toggle</summary>
                    {past_items_html}
                </details>
                """

        front_html += self.current_obj.get_html_front()
        back_html = self.current_obj.get_html_back()

        front_json = json.dumps(front_html)
        back_json = json.dumps(back_html)
        is_back_js = "true" if self.is_showing_back else "false"

        js_code = f"if (typeof updateCardContent === 'function') {{ updateCardContent({front_json}, {back_json}, {is_back_js}); }}"
        self.browser.page().runJavaScript(js_code)

    def _set_empty_state(self):
        self.btn_show_answer.setVisible(False)
        for btn, _ in self.rating_buttons.values():
            btn.setVisible(False)

    def _set_front_state(self):
        self.btn_show_answer.setVisible(True)
        for btn, _ in self.rating_buttons.values():
            btn.setVisible(False)

    def _set_back_state(self):
        self.btn_show_answer.setVisible(False)
        for btn, _ in self.rating_buttons.values():
            btn.setVisible(True)
