import os
import json
from typing import Dict, List, Any, Optional
from PySide6.QtWidgets import QApplication, QComboBox, QListView
from PySide6.QtGui import QPalette, QColor
from PySide6.QtCore import QObject, Signal

from app_paths import THEMES_DIR, SETTINGS_FILE

FONT_FAMILY_STACK = '-apple-system, BlinkMacSystemFont, "Inter", "Ubuntu", "DejaVu Sans", "Liberation Sans", "Segoe UI", Roboto, sans-serif'
MONO_FONT_STACK = '"JetBrains Mono", "Fira Code", "DejaVu Sans Mono", "Liberation Mono", "Cascadia Code", monospace'

DEFAULT_THEME_ID = "dark_modern"

class ThemeManager(QObject):
    """
    Centralized theme manager that loads JSON theme configurations,
    generates Qt stylesheets (QSS), QPalettes, and web-ready CSS variables,
    and enables live switching across the entire application.
    """
    theme_changed = Signal(str)  # Emits theme_id when theme changes

    _instance: Optional['ThemeManager'] = None

    @classmethod
    def get_instance(cls) -> 'ThemeManager':
        if cls._instance is None:
            cls._instance = ThemeManager()
        return cls._instance

    def __init__(self):
        super().__init__()
        self.themes: Dict[str, Dict[str, Any]] = {}
        self.active_theme_id: str = DEFAULT_THEME_ID
        self.load_all_themes()
        self._load_saved_theme_preference()

    def load_all_themes(self):
        """Scan THEMES_DIR and load all valid .json theme definition files."""
        self.themes.clear()
        if not os.path.exists(THEMES_DIR):
            return

        for filename in sorted(os.listdir(THEMES_DIR)):
            if filename.endswith(".json"):
                filepath = os.path.join(THEMES_DIR, filename)
                try:
                    with open(filepath, "r", encoding="utf-8") as f:
                        data = json.load(f)
                        theme_id = data.get("id") or os.path.splitext(filename)[0]
                        data["id"] = theme_id
                        if "name" not in data:
                            data["name"] = theme_id.replace("_", " ").title()
                        self.themes[theme_id] = data
                except Exception as e:
                    print(f"Error loading theme file {filename}: {e}")

        if DEFAULT_THEME_ID not in self.themes and self.themes:
            self.active_theme_id = next(iter(self.themes.keys()))

    def get_available_themes(self) -> List[Dict[str, str]]:
        """Return list of available themes as dicts with id, name, and is_dark."""
        result = []
        for tid, tdata in self.themes.items():
            result.append({
                "id": tid,
                "name": tdata.get("name", tid),
                "is_dark": tdata.get("is_dark", True)
            })
        return result

    def get_active_theme(self) -> Dict[str, Any]:
        """Return data dictionary for currently active theme."""
        return self.themes.get(self.active_theme_id) or self._get_fallback_theme()

    def set_theme(self, theme_id: str, app: Optional[QApplication] = None) -> bool:
        """Switch active theme and re-apply styles globally."""
        if theme_id not in self.themes:
            print(f"Theme '{theme_id}' not found.")
            return False

        self.active_theme_id = theme_id
        self._save_theme_preference()

        if app is None:
            app = QApplication.instance()
        if app is not None:
            self.apply_theme_to_app(app)

        self.theme_changed.emit(theme_id)
        return True

    def _load_saved_theme_preference(self):
        """Read saved theme preference from settings.json."""
        if os.path.exists(SETTINGS_FILE):
            try:
                with open(SETTINGS_FILE, "r", encoding="utf-8") as f:
                    settings = json.load(f)
                    saved_theme = settings.get("theme")
                    if saved_theme and saved_theme in self.themes:
                        self.active_theme_id = saved_theme
            except Exception as e:
                print(f"Error reading settings.json: {e}")

    def _save_theme_preference(self):
        """Save active theme to settings.json."""
        settings = {}
        if os.path.exists(SETTINGS_FILE):
            try:
                with open(SETTINGS_FILE, "r", encoding="utf-8") as f:
                    settings = json.load(f)
            except Exception:
                settings = {}

        settings["theme"] = self.active_theme_id
        try:
            with open(SETTINGS_FILE, "w", encoding="utf-8") as f:
                json.dump(settings, f, indent=2)
        except Exception as e:
            print(f"Error saving theme setting: {e}")

    def apply_theme_to_app(self, app: QApplication):
        """Apply Fusion style, global QPalette, and dynamically generated QSS."""
        app.setStyle("Fusion")
        t = self.get_active_theme()
        c = t.get("colors", {})

        palette = QPalette()
        palette.setColor(QPalette.Window, QColor(c.get("window_bg", "#0b0f19")))
        palette.setColor(QPalette.WindowText, QColor(c.get("text_primary", "#f8fafc")))
        palette.setColor(QPalette.Base, QColor(c.get("surface_bg", "#1e293b")))
        palette.setColor(QPalette.AlternateBase, QColor(c.get("header_bg", "#0f172a")))
        palette.setColor(QPalette.ToolTipBase, QColor(c.get("surface_bg", "#1e293b")))
        palette.setColor(QPalette.ToolTipText, QColor(c.get("text_primary", "#f8fafc")))
        palette.setColor(QPalette.Text, QColor(c.get("text_primary", "#f8fafc")))
        palette.setColor(QPalette.Button, QColor(c.get("surface_bg", "#1e293b")))
        palette.setColor(QPalette.ButtonText, QColor(c.get("text_primary", "#f8fafc")))
        palette.setColor(QPalette.BrightText, QColor(c.get("danger", "#ef4444")))
        palette.setColor(QPalette.Link, QColor(c.get("accent", "#6366f1")))
        palette.setColor(QPalette.Highlight, QColor(c.get("selection_bg", "#6366f1")))
        palette.setColor(QPalette.HighlightedText, QColor(c.get("selection_text", "#ffffff")))

        app.setPalette(palette)
        qss = self.generate_qss()
        app.setStyleSheet(qss)

    def generate_qss(self) -> str:
        """Generate comprehensive Qt stylesheet string from current theme."""
        t = self.get_active_theme()
        c = t.get("colors", {})
        btn = t.get("buttons", {})

        return f"""
/* Universal ToolTip */
QToolTip {{
    background-color: {c.get("surface_bg", "#1e293b")};
    color: {c.get("text_primary", "#f8fafc")};
    border: 1px solid {c.get("border", "#475569")};
    border-radius: 6px;
    padding: 6px 10px;
    font-size: 12px;
    font-family: {FONT_FAMILY_STACK};
}}

/* Global Window & Dialogs */
QMainWindow, QDialog {{
    background-color: {c.get("window_bg", "#0b0f19")};
    color: {c.get("text_primary", "#f8fafc")};
    font-family: {FONT_FAMILY_STACK};
}}

QWidget {{
    background-color: transparent;
    color: {c.get("text_primary", "#f8fafc")};
    font-family: {FONT_FAMILY_STACK};
}}

/* ToolBar & Header Navigation */
QToolBar {{
    background-color: {c.get("header_bg", "#0f172a")};
    border-bottom: 1px solid {c.get("border", "#1e293b")};
    padding: 6px;
    spacing: 8px;
}}

QToolButton {{
    background-color: {c.get("surface_bg", "#1e293b")};
    color: {c.get("text_primary", "#f8fafc")};
    border: 1px solid {c.get("border", "#334155")};
    border-radius: 6px;
    padding: 6px 12px;
    font-size: 13px;
    font-weight: 500;
}}

QToolButton:hover {{
    background-color: {c.get("surface_variant", "#334155")};
    border-color: {c.get("accent", "#6366f1")};
}}

QToolButton:pressed {{
    background-color: {c.get("accent_pressed", "#4338ca")};
}}

/* Universal Push Buttons */
QPushButton {{
    background-color: {c.get("surface_bg", "#1e293b")};
    color: {c.get("text_primary", "#f8fafc")};
    border: 1px solid {c.get("border", "#334155")};
    border-radius: 8px;
    padding: 8px 16px;
    font-size: 13px;
    font-weight: 600;
}}

QPushButton:hover {{
    background-color: {c.get("surface_variant", "#334155")};
    border-color: {c.get("accent", "#6366f1")};
}}

QPushButton:pressed {{
    background-color: {c.get("accent_pressed", "#4338ca")};
}}

/* FSRS Rating Buttons in Review View */
QPushButton#BtnShowAnswer {{
    background-color: {btn.get("show_answer_bg", "#6366f1")};
    color: {btn.get("show_answer_text", "#ffffff")};
    border: none;
    font-size: 15px;
    font-weight: bold;
    border-radius: 10px;
}}

QPushButton#BtnShowAnswer:hover {{
    background-color: {btn.get("show_answer_hover", "#4f46e5")};
}}

QPushButton#BtnAgain {{
    background-color: {btn.get("again_bg", "#991b1b")};
    color: {btn.get("again_text", "#fca5a5")};
    border: 1px solid {btn.get("again_border", "#ef4444")};
}}
QPushButton#BtnAgain:hover {{ background-color: {btn.get("again_hover", "#dc2626")}; color: #ffffff; }}

QPushButton#BtnHard {{
    background-color: {btn.get("hard_bg", "#78350f")};
    color: {btn.get("hard_text", "#fde68a")};
    border: 1px solid {btn.get("hard_border", "#f59e0b")};
}}
QPushButton#BtnHard:hover {{ background-color: {btn.get("hard_hover", "#d97706")}; color: #ffffff; }}

QPushButton#BtnGood {{
    background-color: {btn.get("good_bg", "#065f46")};
    color: {btn.get("good_text", "#a7f3d0")};
    border: 1px solid {btn.get("good_border", "#10b981")};
}}
QPushButton#BtnGood:hover {{ background-color: {btn.get("good_hover", "#059669")}; color: #ffffff; }}

QPushButton#BtnEasy {{
    background-color: {btn.get("easy_bg", "#1e40af")};
    color: {btn.get("easy_text", "#bfdbfe")};
    border: 1px solid {btn.get("easy_border", "#3b82f6")};
}}
QPushButton#BtnEasy:hover {{ background-color: {btn.get("easy_hover", "#2563eb")}; color: #ffffff; }}

/* Control Frame */
QFrame#ControlFrame {{
    background-color: {c.get("header_bg", "#0f172a")};
    border-top: 1px solid {c.get("border", "#1e293b")};
    border-radius: 12px;
}}

/* Inputs, Text Editors & List Widgets */
QLineEdit, QTextEdit, QListWidget, QSpinBox, QDoubleSpinBox {{
    background-color: {c.get("surface_bg", "#1e293b")};
    color: {c.get("text_primary", "#f8fafc")};
    border: 1px solid {c.get("border", "#334155")};
    border-radius: 8px;
    padding: 6px;
    selection-background-color: {c.get("selection_bg", "#6366f1")};
    selection-color: {c.get("selection_text", "#ffffff")};
}}

QLineEdit:focus, QTextEdit:focus, QSpinBox:focus, QDoubleSpinBox:focus {{
    border-color: {c.get("accent", "#6366f1")};
}}

/* Universal QComboBox */
QComboBox {{
    background-color: {c.get("surface_bg", "#1e293b")};
    color: {c.get("text_primary", "#f8fafc")};
    border: 1px solid {c.get("border", "#334155")};
    border-radius: 8px;
    padding: 6px 12px;
    font-size: 13px;
    font-weight: 500;
    min-width: 140px;
}}

QComboBox:hover {{
    border-color: {c.get("accent", "#6366f1")};
    background-color: {c.get("surface_variant", "#334155")};
}}

QComboBox::drop-down {{
    subcontrol-origin: padding;
    subcontrol-position: top right;
    width: 24px;
    border-left-width: 0px;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
}}

/* Dropdown Popup List View */
QComboBox QAbstractItemView, QListView {{
    background-color: {c.get("surface_bg", "#1e293b")} !important;
    color: {c.get("text_primary", "#f8fafc")} !important;
    border: 1px solid {c.get("accent", "#6366f1")};
    selection-background-color: {c.get("selection_bg", "#6366f1")} !important;
    selection-color: {c.get("selection_text", "#ffffff")} !important;
    outline: 0;
    padding: 4px;
    border-radius: 6px;
}}

QComboBox QAbstractItemView::item, QListView::item {{
    background-color: {c.get("surface_bg", "#1e293b")} !important;
    color: {c.get("text_primary", "#f8fafc")} !important;
    padding: 8px 12px;
    min-height: 28px;
    border-radius: 4px;
}}

QComboBox QAbstractItemView::item:hover, QComboBox QAbstractItemView::item:selected,
QListView::item:hover, QListView::item:selected {{
    background-color: {c.get("accent", "#6366f1")} !important;
    color: {c.get("selection_text", "#ffffff")} !important;
}}

/* QMenu Context Menus */
QMenu {{
    background-color: {c.get("surface_bg", "#1e293b")};
    color: {c.get("text_primary", "#f8fafc")};
    border: 1px solid {c.get("accent", "#6366f1")};
    border-radius: 8px;
    padding: 6px;
}}

QMenu::item {{
    background-color: transparent;
    color: {c.get("text_primary", "#f8fafc")};
    padding: 8px 20px 8px 12px;
    border-radius: 4px;
}}

QMenu::item:selected {{
    background-color: {c.get("accent", "#6366f1")};
    color: {c.get("selection_text", "#ffffff")};
}}

QMenu::separator {{
    height: 1px;
    background-color: {c.get("border", "#334155")};
    margin: 4px 0;
}}

/* GroupBoxes & Labels */
QGroupBox {{
    border: 1px solid {c.get("border", "#334155")};
    border-radius: 10px;
    margin-top: 12px;
    font-weight: bold;
    color: {c.get("info", "#38bdf8")};
}}

QGroupBox::title {{
    subcontrol-origin: margin;
    subcontrol-position: top left;
    padding: 4px 8px;
}}

/* Splitter */
QSplitter::handle {{
    background-color: {c.get("border", "#1e293b")};
}}

/* Tables, Tree & Calendar */
QTableWidget, QTreeWidget, QCalendarWidget {{
    background-color: {c.get("surface_bg", "#1e293b")};
    color: {c.get("text_primary", "#f8fafc")};
    gridline-color: {c.get("border", "#334155")};
    border: 1px solid {c.get("border", "#334155")};
    border-radius: 8px;
}}

QHeaderView::section {{
    background-color: {c.get("header_bg", "#0f172a")};
    color: {c.get("info", "#38bdf8")};
    font-weight: bold;
    padding: 6px;
    border: 1px solid {c.get("border", "#334155")};
}}

/* ScrollBars */
QScrollBar:vertical {{
    background: {c.get("window_bg", "#0b0f19")};
    width: 10px;
    margin: 0px;
}}
QScrollBar::handle:vertical {{
    background: {c.get("border", "#334155")};
    min-height: 20px;
    border-radius: 5px;
}}
QScrollBar::handle:vertical:hover {{
    background: {c.get("accent", "#6366f1")};
}}
QScrollBar::add-line:vertical, QScrollBar::sub-line:vertical {{
    height: 0px;
}}
"""

    def get_web_css_variables(self) -> str:
        """Return CSS custom properties (:root { ... }) for embedding into QWebEngineView HTML."""
        t = self.get_active_theme()
        w = t.get("web", {})
        c = t.get("colors", {})
        return f"""
        :root {{
            --bg-color: {w.get("bg_color", c.get("header_bg", "#0f172a"))};
            --card-bg: {w.get("card_bg", c.get("surface_bg", "#1e293b"))};
            --text-color: {w.get("text_color", c.get("text_primary", "#f8fafc"))};
            --text-muted: {w.get("text_muted", c.get("text_muted", "#94a3b8"))};
            --border-color: {w.get("border_color", c.get("border", "#334155"))};
            --accent-glow: {w.get("accent_glow", "rgba(99, 102, 241, 0.2)")};
            --accent-border: {w.get("accent_border", c.get("accent", "#6366f1"))};
        }}
        """

    def get_graph_colors(self) -> Dict[str, str]:
        """Return graph rendering colors for the active theme."""
        t = self.get_active_theme()
        return t.get("graph", {})

    def get_chart_theme(self) -> Dict[str, str]:
        """Return chart rendering colors for the active theme."""
        t = self.get_active_theme()
        return t.get("chart", {})

    def _get_fallback_theme(self) -> Dict[str, Any]:
        return {
            "id": "dark_modern",
            "name": "Dark Modern",
            "is_dark": True,
            "colors": {
                "window_bg": "#0b0f19",
                "surface_bg": "#1e293b",
                "text_primary": "#f8fafc",
                "accent": "#6366f1"
            }
        }

def attach_dark_view(combo: QComboBox):
    """Attach custom styled QListView to combobox to ensure dark/custom theme rendering."""
    view = QListView(combo)
    tm = ThemeManager.get_instance()
    t = tm.get_active_theme()
    c = t.get("colors", {})
    view.setStyleSheet(f"""
        QListView {{
            background-color: {c.get("surface_bg", "#1e293b")};
            color: {c.get("text_primary", "#f8fafc")};
            border: 1px solid {c.get("accent", "#6366f1")};
            selection-background-color: {c.get("selection_bg", "#6366f1")};
            selection-color: {c.get("selection_text", "#ffffff")};
            outline: 0;
            padding: 4px;
        }}
        QListView::item {{
            background-color: {c.get("surface_bg", "#1e293b")};
            color: {c.get("text_primary", "#f8fafc")};
            padding: 8px 12px;
            min-height: 24px;
        }}
        QListView::item:hover, QListView::item:selected {{
            background-color: {c.get("accent", "#6366f1")};
            color: {c.get("selection_text", "#ffffff")};
        }}
    """)
    combo.setView(view)
