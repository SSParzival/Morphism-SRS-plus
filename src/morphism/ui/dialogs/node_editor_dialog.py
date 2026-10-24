import html
import json
import os
import re
from typing import Optional, List

from PySide6.QtWidgets import (QDialog, QVBoxLayout, QHBoxLayout, QPushButton, 
                               QLabel, QLineEdit, QTextEdit, QListWidget, QListWidgetItem, 
                               QGroupBox, QComboBox, QMessageBox, QDoubleSpinBox,
                               QScrollArea, QWidget, QFileDialog, QToolButton, QLayout, QSizePolicy, QMenu)
from PySide6.QtWebEngineWidgets import QWebEngineView
from PySide6.QtCore import Qt, QUrl, QRect, QSize, QPoint
from PySide6.QtGui import QFont, QKeySequence, QShortcut, QTextCursor

from morphism.core.models import NoteNode, Flashcard, ProofSequenceCard, ClozeCard, ReviewObject
from morphism.core.app_paths import ASSETS_DIR, MATHJAX_CONFIG_FILE, EDITOR_BUTTONS_FILE
from morphism.core.theme_manager import ThemeManager, FONT_FAMILY_STACK, MONO_FONT_STACK

def load_mathjax_config_json() -> dict:
    """Load assets/mathjax_config.json dynamically or return default configuration."""
    if os.path.exists(MATHJAX_CONFIG_FILE):
        try:
            with open(MATHJAX_CONFIG_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception as e:
            print(f"Error loading mathjax_config.json in node_editor_dialog: {e}")
    return {
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
    }

def load_editor_buttons_config() -> List[dict]:
    """Load assets/editor_buttons.json dynamically or return default configuration."""
    if os.path.exists(EDITOR_BUTTONS_FILE):
        try:
            with open(EDITOR_BUTTONS_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception as e:
            print(f"Error loading editor_buttons.json: {e}")
    return [
        {"id": "bold", "label": "<b>B</b>", "tooltip": "Bold <b>", "type": "interval", "left": "<b>", "right": "</b>", "default_text": "bold text", "shortcut": "Ctrl+B"},
        {"id": "italic", "label": "<i>I</i>", "tooltip": "Italic <i>", "type": "interval", "left": "<i>", "right": "</i>", "default_text": "italic text", "shortcut": "Ctrl+I"},
        {"id": "underline", "label": "<u>U</u>", "tooltip": "Underline <u>", "type": "interval", "left": "<u>", "right": "</u>", "default_text": "underlined text", "shortcut": "Ctrl+U"},
        {"id": "cloze", "label": "🧩 Cloze", "tooltip": "Insert Cloze Deletion", "type": "interval", "left": "{{c1::", "right": "}}", "default_text": "answer", "shortcut": "Ctrl+Shift+K"},
        {"id": "math_display", "label": "$$ TeX $$", "tooltip": "Math Display Block", "type": "interval", "left": "$$", "right": "$$", "default_text": "f(x) = y", "shortcut": "Ctrl+M"},
    ]

def build_live_preview_html_template() -> str:
    tex_data = load_mathjax_config_json()
    tex_json = json.dumps(tex_data)
    css_vars = ThemeManager.get_instance().get_web_css_variables()

    return f"""<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        {css_vars}
        body {{ 
            font-family: -apple-system, BlinkMacSystemFont, "Inter", "Ubuntu", "DejaVu Sans", "Segoe UI", Roboto, sans-serif; 
            font-size: 16px; 
            background: var(--card-bg); 
            color: var(--text-color); 
            padding: 16px;
            margin: 0;
            line-height: 1.6;
            overflow-x: hidden;
            box-sizing: border-box;
            max-width: 100vw;
        }}
        .title {{ color: var(--accent-border); font-weight: bold; font-size: 18px; margin-bottom: 8px; border-bottom: 1px solid var(--border-color); padding-bottom: 6px; overflow-wrap: break-word; word-break: break-word; }}
        .body {{ line-height: 1.5; overflow-wrap: break-word; word-break: normal; max-width: 100%; box-sizing: border-box; }}
        .cloze-bracket {{ color: #38bdf8; font-weight: bold; padding: 2px 8px; background: rgba(56, 189, 248, 0.15); border-radius: 4px; border: 1px dashed #38bdf8; display: inline-block; max-width: 100%; overflow-wrap: break-word; }}
        .cloze-revealed {{ color: #10b981; font-weight: bold; background: rgba(16, 185, 129, 0.2); border-radius: 4px; padding: 2px 8px; border: 1px solid #10b981; display: inline-block; max-width: 100%; overflow-wrap: break-word; }}
        hr {{ border: 0; height: 1px; background: var(--border-color); margin: 16px 0; }}
        img {{ max-width: 100%; height: auto; border-radius: 8px; margin: 8px 0; display: block; }}
        table {{ border-collapse: collapse; width: 100%; margin: 12px 0; background: rgba(15, 23, 42, 0.6); display: block; overflow-x: auto; max-width: 100%; box-sizing: border-box; }}
        th, td {{ border: 1px solid var(--border-color); padding: 8px 12px; text-align: left; min-width: 60px; }}
        th {{ background-color: rgba(30, 41, 59, 0.8); color: var(--accent-border); }}
        code {{ background: rgba(0,0,0,0.3); color: #f43f5e; padding: 2px 6px; border-radius: 4px; font-family: monospace; overflow-wrap: break-word; word-break: break-word; }}
        pre {{ background: rgba(0,0,0,0.4); padding: 12px; border-radius: 8px; overflow-x: auto; border: 1px solid var(--border-color); max-width: 100%; box-sizing: border-box; }}

        /* MathJax 3 Responsive Equations */
        mjx-container[jax="SVG"][display="true"] {{
            display: block !important;
            text-align: center !important;
            margin: 0.8em 0 !important;
            max-width: 100% !important;
            overflow-x: auto !important;
            overflow-y: hidden !important;
            padding: 6px 2px !important;
            box-sizing: border-box !important;
        }}
        mjx-container[jax="SVG"][display="true"] > svg {{
            max-width: none !important;
            min-width: min-content;
            display: inline-block !important;
        }}
        mjx-container[jax="SVG"]:not([display="true"]) {{
            max-width: 100% !important;
            overflow-x: auto !important;
            overflow-y: hidden !important;
            vertical-align: -0.2em !important;
            display: inline-block !important;
            box-sizing: border-box !important;
        }}
        mjx-container[jax="SVG"]:not([display="true"]) > svg {{
            max-width: none !important;
        }}
        mjx-container[jax="SVG"]::-webkit-scrollbar,
        .body::-webkit-scrollbar,
        pre::-webkit-scrollbar,
        table::-webkit-scrollbar {{
            height: 6px;
            width: 6px;
        }}
        mjx-container[jax="SVG"]::-webkit-scrollbar-thumb,
        .body::-webkit-scrollbar-thumb,
        pre::-webkit-scrollbar-thumb,
        table::-webkit-scrollbar-thumb {{
            background: var(--accent-border);
            border-radius: 4px;
        }}
        mjx-container[jax="SVG"]::-webkit-scrollbar-track {{
            background: rgba(0, 0, 0, 0.2);
        }}
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
        window.renderPreview = function(title, front, back) {{
            let container = document.getElementById('preview-container');
            if (!container) return;

            let content = "";
            if (title) content += "<div class='title'>" + title + "</div>";
            content += "<div class='body'>" + front + "</div>";
            if (back) content += "<hr><div class='body'>" + back + "</div>";

            container.innerHTML = content;

            if (window.MathJax && window.MathJax.typesetPromise) {{
                MathJax.typesetPromise([container]).catch(function(err) {{
                    console.log(err);
                }});
            }}
        }};
    </script>
</head>
<body>
    <div id="preview-container">
        <div style="color: var(--text-muted); text-align: center; margin-top: 20px;">
            Select a card from the left panel to edit content and preview rendered HTML / MathJax formulas.
        </div>
    </div>
</body>
</html>"""

def prompt_insert_image(editor: QTextEdit, parent: QWidget):
    file_path, _ = QFileDialog.getOpenFileName(parent, "Select Image File", "", "Images (*.png *.jpg *.jpeg *.gif *.svg *.webp)")
    if file_path:
        file_url = QUrl.fromLocalFile(os.path.abspath(file_path)).toString()
        img_tag = f'<img src="{file_url}" style="max-width:100%; border-radius:8px; margin:8px 0;" />'
        editor.textCursor().insertText(img_tag)

def prompt_insert_table(editor: QTextEdit):
    table_snippet = (
        '<table border="1" style="border-collapse: collapse; width: 100%; margin: 10px 0;">\n'
        '  <thead>\n'
        '    <tr>\n'
        '      <th style="padding: 8px;">Header 1</th>\n'
        '      <th style="padding: 8px;">Header 2</th>\n'
        '    </tr>\n'
        '  </thead>\n'
        '  <tbody>\n'
        '    <tr>\n'
        '      <td style="padding: 8px;">Cell 1</td>\n'
        '      <td style="padding: 8px;">Cell 2</td>\n'
        '    </tr>\n'
        '  </tbody>\n'
        '</table>'
    )
    editor.textCursor().insertText(table_snippet)


class FlowLayout(QLayout):
    """Dynamic wrapping layout for toolbar buttons that automatically flows onto multiple rows."""
    def __init__(self, parent=None, margin=0, spacing=6):
        super().__init__(parent)
        self.itemList = []
        self.setContentsMargins(margin, margin, margin, margin)
        self.setSpacing(spacing)

    def addItem(self, item):
        self.itemList.append(item)

    def count(self):
        return len(self.itemList)

    def itemAt(self, index):
        if 0 <= index < len(self.itemList):
            return self.itemList[index]
        return None

    def takeAt(self, index):
        if 0 <= index < len(self.itemList):
            return self.itemList.pop(index)
        return None

    def expandingDirections(self):
        return Qt.Orientations(0)

    def hasHeightForWidth(self):
        return True

    def heightForWidth(self, width):
        return self.doLayout(QRect(0, 0, width, 0), True)

    def setGeometry(self, rect):
        super().setGeometry(rect)
        self.doLayout(rect, False)

    def sizeHint(self):
        return self.minimumSize()

    def minimumSize(self):
        size = QSize()
        for item in self.itemList:
            size = size.expandedTo(item.minimumSize())
        margins = self.contentsMargins()
        size += QSize(margins.left() + margins.right(), margins.top() + margins.bottom())
        return size

    def doLayout(self, rect, testOnly):
        x = rect.x()
        y = rect.y()
        lineHeight = 0

        for item in self.itemList:
            spaceX = self.spacing()
            spaceY = self.spacing()
            nextX = x + item.sizeHint().width() + spaceX
            if nextX - spaceX > rect.right() and lineHeight > 0:
                x = rect.x()
                y = y + lineHeight + spaceY
                nextX = x + item.sizeHint().width() + spaceX
                lineHeight = 0

            if not testOnly:
                item.setGeometry(QRect(QPoint(x, y), item.sizeHint()))

            x = nextX
            lineHeight = max(lineHeight, item.sizeHint().height())

        return y + lineHeight - rect.y()


class NodeEditorDialog(QDialog):
    """Dialog for creating & editing Note Nodes and their attached Flashcards/Proofs/Clozes."""

    def __init__(self, note: NoteNode, parent=None):
        super().__init__(parent)
        self.note = note
        if not self.note.cards:
            self.note.add_card(Flashcard("Card 1", "", ""))

        self.is_preview_loaded = False
        self.current_editing_row = -1

        self.setWindowTitle(f"Edit Note: {note.title}")
        self.setWindowFlags(self.windowFlags() | Qt.WindowMaximizeButtonHint | Qt.WindowMinimizeButtonHint)
        self.setWindowModality(Qt.NonModal)
        self.setMinimumSize(840, 620)
        self.resize(1140, 840)
        
        self._setup_ui()
        self._load_cards_list()
        ThemeManager.get_instance().theme_changed.connect(self.on_theme_changed)

    def on_theme_changed(self, theme_id: str):
        assets_url = QUrl.fromLocalFile(ASSETS_DIR.replace("\\", "/") + "/")
        self.preview_browser.setHtml(build_live_preview_html_template(), assets_url)

    def _open_scratchbook_from_editor(self):
        """Open or raise the Scratchbook window directly from the Note Editor."""
        if self.parent() and hasattr(self.parent(), "_open_scratchbook_dialog"):
            self.parent()._open_scratchbook_dialog()
        else:
            from .scratchbook_dialog import ScratchbookDialog
            if not hasattr(self, "_scratchbook_dlg") or self._scratchbook_dlg is None or not self._scratchbook_dlg.isVisible():
                self._scratchbook_dlg = ScratchbookDialog(self)
                self._scratchbook_dlg.setWindowModality(Qt.NonModal)
                self._scratchbook_dlg.show()
            else:
                self._scratchbook_dlg.show()
                self._scratchbook_dlg.raise_()
                self._scratchbook_dlg.activateWindow()

    def _setup_ui(self):
        dialog_layout = QVBoxLayout(self)
        dialog_layout.setContentsMargins(12, 12, 12, 12)

        scroll = QScrollArea()
        scroll.setWidgetResizable(True)
        scroll.setStyleSheet("QScrollArea { border: none; background: transparent; }")

        scroll_content = QWidget()
        main_layout = QVBoxLayout(scroll_content)
        main_layout.setContentsMargins(6, 6, 6, 6)

        # Note Header & Architecture Options
        header_layout = QHBoxLayout()
        header_layout.addWidget(QLabel("Note Title:"))
        self.txt_note_title = QLineEdit(self.note.title)
        header_layout.addWidget(self.txt_note_title, stretch=2)

        header_layout.addWidget(QLabel("Architecture:"))
        self.combo_note_type = QComboBox()
        self.combo_note_type.addItem("Standard Note (Joint Retention)", "standard")
        self.combo_note_type.addItem("Serial Sequence Note (All Steps)", "serial_sequence")
        self.combo_note_type.addItem("Serial Sequence Note (Single Step)", "serial_sequence_single")
        
        idx = self.combo_note_type.findData(self.note.note_type)
        if idx >= 0:
            self.combo_note_type.setCurrentIndex(idx)
        header_layout.addWidget(self.combo_note_type, stretch=1)

        self.btn_scratchbook = QPushButton("✏️ Scratchbook")
        self.btn_scratchbook.setCursor(Qt.PointingHandCursor)
        self.btn_scratchbook.clicked.connect(self._open_scratchbook_from_editor)
        header_layout.addWidget(self.btn_scratchbook)

        header_layout.addWidget(QLabel("Target R:"))
        self.spin_desired_r = QDoubleSpinBox()
        self.spin_desired_r.setRange(0.50, 0.99)
        self.spin_desired_r.setSingleStep(0.05)
        self.spin_desired_r.setValue(self.note.desired_retention)
        header_layout.addWidget(self.spin_desired_r)

        main_layout.addLayout(header_layout)

        # Content Splitter (Left: Cards List | Right: Editor & Live MathJax Preview)
        content_layout = QHBoxLayout()

        # Left Column: Cards List & Ordering Controls
        list_group = QGroupBox("Attached Cards / Steps")
        list_vbox = QVBoxLayout(list_group)

        self.list_cards = QListWidget()
        self.list_cards.currentRowChanged.connect(self._on_card_selected)
        list_vbox.addWidget(self.list_cards)

        order_btns_layout = QHBoxLayout()
        btn_move_up = QPushButton("▲ Up")
        btn_move_up.clicked.connect(self._move_card_up)
        order_btns_layout.addWidget(btn_move_up)

        btn_move_down = QPushButton("▼ Down")
        btn_move_down.clicked.connect(self._move_card_down)
        order_btns_layout.addWidget(btn_move_down)
        list_vbox.addLayout(order_btns_layout)

        card_actions_layout = QHBoxLayout()
        self.btn_add_card = QPushButton("+ Add Card ▾")
        self.btn_add_card.setStyleSheet("background-color: #6366f1; color: white; font-weight: bold;")
        self.btn_add_card.clicked.connect(self._show_add_card_menu)
        card_actions_layout.addWidget(self.btn_add_card)

        btn_del_card = QPushButton("🗑 Delete")
        btn_del_card.setStyleSheet("background-color: #991b1b; color: #fca5a5;")
        btn_del_card.clicked.connect(self._delete_current_card)
        card_actions_layout.addWidget(btn_del_card)

        list_vbox.addLayout(card_actions_layout)
        content_layout.addWidget(list_group, stretch=1)

        # Right Column: Text Editors + Live Preview Browser
        editor_group = QGroupBox("Card Content & Live HTML / MathJax Preview")
        editor_vbox = QVBoxLayout(editor_group)

        header_save_layout = QHBoxLayout()
        header_save_layout.addWidget(QLabel("Card Title / Step Header:"))
        
        self.btn_save_card = QPushButton("💾 Save Card Changes")
        self.btn_save_card.setStyleSheet("background-color: #10b981; color: white; font-weight: bold; padding: 4px 14px;")
        self.btn_save_card.clicked.connect(self._save_current_card_explicit)
        header_save_layout.addWidget(self.btn_save_card)
        
        editor_vbox.addLayout(header_save_layout)

        self.txt_card_title = QLineEdit()
        self.txt_card_title.textChanged.connect(self._update_preview)
        editor_vbox.addWidget(self.txt_card_title)

        # Front Field Header & HTML Toolbar
        self.lbl_front = QLabel("Front / Question / Cloze Content:")
        editor_vbox.addWidget(self.lbl_front)
        front_toolbar = self._create_html_toolbar(field="front")
        editor_vbox.addLayout(front_toolbar)

        mono_font = QFont("monospace", 11)
        mono_font.setStyleHint(QFont.Monospace)

        self.txt_card_front = QTextEdit()
        self.txt_card_front.setAcceptRichText(False)
        self.txt_card_front.setFont(mono_font)
        self.txt_card_front.setMinimumHeight(110)
        self.txt_card_front.textChanged.connect(self._update_preview)
        editor_vbox.addWidget(self.txt_card_front, stretch=1)

        # Back Field Header & HTML Toolbar
        self.lbl_back = QLabel("Back / Answer / Proof Steps:")
        editor_vbox.addWidget(self.lbl_back)
        back_toolbar = self._create_html_toolbar(field="back")
        editor_vbox.addLayout(back_toolbar)

        self.txt_card_back = QTextEdit()
        self.txt_card_back.setAcceptRichText(False)
        self.txt_card_back.setFont(mono_font)
        self.txt_card_back.setMinimumHeight(110)
        self.txt_card_back.textChanged.connect(self._update_preview)
        editor_vbox.addWidget(self.txt_card_back, stretch=1)

        # Live MathJax Preview Browser
        self.preview_browser = QWebEngineView()
        self.preview_browser.setMinimumHeight(240)
        assets_url = QUrl.fromLocalFile(ASSETS_DIR.replace("\\", "/") + "/")
        self.preview_browser.setHtml(build_live_preview_html_template(), assets_url)
        self.preview_browser.loadFinished.connect(self._on_preview_loaded)
        editor_vbox.addWidget(self.preview_browser, stretch=2)

        content_layout.addWidget(editor_group, stretch=2)
        main_layout.addLayout(content_layout, stretch=1)

        scroll.setWidget(scroll_content)
        dialog_layout.addWidget(scroll, stretch=1)

        # Fixed Bottom Action Buttons
        bottom_layout = QHBoxLayout()
        bottom_layout.addStretch()

        btn_cancel = QPushButton("Cancel")
        btn_cancel.clicked.connect(self.reject)
        bottom_layout.addWidget(btn_cancel)

        btn_save = QPushButton("Save Note & Close")
        btn_save.setStyleSheet("background-color: #6366f1; color: white; font-weight: bold; padding: 10px 24px; border-radius: 6px;")
        btn_save.clicked.connect(self._save_and_accept)
        bottom_layout.addWidget(btn_save)

        dialog_layout.addLayout(bottom_layout)

    def _show_add_card_menu(self):
        menu = QMenu(self)
        menu.setStyleSheet(ThemeManager.get_instance().generate_qss())
        
        act_std = menu.addAction("📄 Standard Flashcard")
        act_cloze = menu.addAction("🧩 Cloze Deletion Card")
        act_proof = menu.addAction("📜 Multi-Step Proof Card")

        action = menu.exec(self.btn_add_card.mapToGlobal(QPoint(0, self.btn_add_card.height())))
        if action == act_std:
            self._add_card("standard")
        elif action == act_cloze:
            self._add_card("cloze")
        elif action == act_proof:
            self._add_card("proof")

    def _apply_interval(self, editor: QTextEdit, left: str, right: str, default_text: str = ""):
        cursor = editor.textCursor()
        selected = cursor.selectedText()
        if selected:
            cursor.insertText(f"{left}{selected}{right}")
        else:
            fallback = default_text if default_text else "text"
            cursor.insertText(f"{left}{fallback}{right}")

    def _trigger_shortcut_action(self, btn_info: dict):
        target_editor = self.txt_card_back if self.txt_card_back.hasFocus() else self.txt_card_front
        btn_type = btn_info.get("type", "single")
        if btn_type == "interval":
            left = btn_info.get("left", "")
            right = btn_info.get("right", "")
            default_text = btn_info.get("default_text", "")
            self._apply_interval(target_editor, left, right, default_text)
        elif btn_type == "single":
            content = btn_info.get("content", "")
            target_editor.textCursor().insertText(content)
        elif btn_type == "action":
            act_name = btn_info.get("action", "")
            if act_name == "prompt_image":
                prompt_insert_image(target_editor, self)
            elif act_name == "prompt_table":
                prompt_insert_table(target_editor)

    def configure_button_rich_text(self, btn: QPushButton, label_str: str):
        raw_label = html.unescape(label_str)
        if raw_label.strip() in ("<br>", "<br/>", "<br >"):
            plain_text = "<br>"
        else:
            plain_text = re.sub(r'<(?!br\b)[^>]+>', '', raw_label)
        btn.setText(plain_text)

        is_bold = "<b>" in label_str or "bold" in label_str
        font = btn.font()
        font.setPointSize(10)
        font.setBold(is_bold)
        btn.setFont(font)
        btn.setStyleSheet("padding: 4px 8px; min-width: 24px;")

    def _create_html_toolbar(self, field: str) -> FlowLayout:
        layout = FlowLayout(spacing=5)

        def get_target_editor() -> QTextEdit:
            return self.txt_card_front if field == "front" else self.txt_card_back

        buttons_config = load_editor_buttons_config()
        for btn_info in buttons_config:
            label_text = btn_info.get("label", "Button")
            tooltip_text = btn_info.get("tooltip", "")
            btn_type = btn_info.get("type", "single")

            btn = QPushButton()
            self.configure_button_rich_text(btn, label_text)
            if tooltip_text:
                btn.setToolTip(tooltip_text)

            if btn_type == "interval":
                left = btn_info.get("left", "")
                right = btn_info.get("right", "")
                default_text = btn_info.get("default_text", "")
                btn.clicked.connect(lambda _, l=left, r=right, d=default_text: self._apply_interval(get_target_editor(), l, r, d))
            elif btn_type == "single":
                content = btn_info.get("content", "")
                btn.clicked.connect(lambda _, c=content: get_target_editor().textCursor().insertText(c))
            elif btn_type == "action":
                act_name = btn_info.get("action", "")
                if act_name == "prompt_image":
                    btn.clicked.connect(lambda: prompt_insert_image(get_target_editor(), self))
                elif act_name == "prompt_table":
                    btn.clicked.connect(lambda: prompt_insert_table(get_target_editor()))

            layout.addWidget(btn)

            shortcut_key = btn_info.get("shortcut", "")
            if shortcut_key and field == "front":
                sc = QShortcut(QKeySequence(shortcut_key), self)
                sc.setContext(Qt.WindowShortcut)
                sc.activated.connect(lambda info=btn_info: self._trigger_shortcut_action(info))

        return layout

    def _on_preview_loaded(self, ok: bool):
        self.is_preview_loaded = True
        self._update_preview()

    def _load_cards_list(self):
        self.list_cards.blockSignals(True)
        self.list_cards.clear()
        for idx, card in enumerate(self.note.cards, start=1):
            title = card.get_title()
            type_icon = "🧩" if isinstance(card, ClozeCard) else ("📜" if isinstance(card, ProofSequenceCard) else "📄")
            item = QListWidgetItem(f"#{idx} {type_icon} {title}")
            item.setData(Qt.UserRole, card)
            self.list_cards.addItem(item)
        self.list_cards.blockSignals(False)

        if self.note.cards:
            self.list_cards.setCurrentRow(0)

    def _on_card_selected(self, row: int):
        if 0 <= self.current_editing_row < len(self.note.cards) and self.current_editing_row != row:
            self._save_current_card(self.current_editing_row)

        self.current_editing_row = row
        if 0 <= row < len(self.note.cards):
            card = self.note.cards[row]
            self.txt_card_title.setText(card.get_title())

            if isinstance(card, ClozeCard):
                self.lbl_front.setText("Cloze Sentence (Use {{c1::answer}} or {{c1::answer::hint}}):")
                self.lbl_back.setText("Optional Extra Notes / Comments (Shown after answer):")
                self.txt_card_front.setPlainText(card.text)
                self.txt_card_back.setPlainText("")
            elif isinstance(card, ProofSequenceCard):
                self.lbl_front.setText("Proof Premise / Theorem:")
                self.lbl_back.setText("Proof Steps (One step per line):")
                self.txt_card_front.setPlainText(card.premise)
                self.txt_card_back.setPlainText("\n".join(card.steps))
            else:
                self.lbl_front.setText("Front / Question / Premise:")
                self.lbl_back.setText("Back / Answer / Solution:")
                self.txt_card_front.setPlainText(getattr(card, 'front', ''))
                self.txt_card_back.setPlainText(getattr(card, 'back', ''))

            self._update_preview()

    def _update_preview(self):
        if not hasattr(self, "is_preview_loaded") or not self.is_preview_loaded:
            return

        title = self.txt_card_title.text()
        front = self.txt_card_front.toPlainText()
        back = self.txt_card_back.toPlainText()

        # Handle cloze preview
        if 0 <= self.current_editing_row < len(self.note.cards):
            card = self.note.cards[self.current_editing_row]
            if isinstance(card, ClozeCard) or ("{{" in front and "}}" in front):
                def repl(match):
                    parts = match.group(1).split("::")
                    answer = parts[0]
                    return f"<span class='cloze-revealed'>{answer}</span>"
                back = re.sub(r"\{\{c\d+::(.*?)\}\}", repl, front)
                
                def repl_front(match):
                    parts = match.group(1).split("::")
                    hint = parts[1].strip() if len(parts) >= 2 else "..."
                    return f"<span class='cloze-bracket'>[{hint}]</span>"
                front = re.sub(r"\{\{c\d+::(.*?)\}\}", repl_front, front)

        title_json = json.dumps(title)
        front_json = json.dumps(front)
        back_json = json.dumps(back)

        js = f"if (typeof renderPreview === 'function') {{ renderPreview({title_json}, {front_json}, {back_json}); }}"
        self.preview_browser.page().runJavaScript(js)

    def _save_current_card_explicit(self):
        row = self.list_cards.currentRow()
        if row < 0 and self.current_editing_row >= 0:
            row = self.current_editing_row
        if 0 <= row < len(self.note.cards):
            self._save_current_card(row)
            self.btn_save_card.setText("✓ Card Saved!")
            from PySide6.QtCore import QTimer
            QTimer.singleShot(1500, lambda: self.btn_save_card.setText("💾 Save Card Changes"))

    def _save_current_card(self, target_row: Optional[int] = None):
        row = target_row if target_row is not None else self.list_cards.currentRow()
        if 0 <= row < len(self.note.cards):
            card = self.note.cards[row]
            card.title = self.txt_card_title.text().strip() or f"Card #{row+1}"
            if isinstance(card, ClozeCard):
                card.text = self.txt_card_front.toPlainText()
            elif isinstance(card, ProofSequenceCard):
                card.premise = self.txt_card_front.toPlainText()
                card.steps = [s.strip() for s in self.txt_card_back.toPlainText().split("\n") if s.strip()]
            else:
                card.front = self.txt_card_front.toPlainText()
                card.back = self.txt_card_back.toPlainText()
            
            item = self.list_cards.item(row)
            if item:
                type_icon = "🧩" if isinstance(card, ClozeCard) else ("📜" if isinstance(card, ProofSequenceCard) else "📄")
                item.setText(f"#{row+1} {type_icon} {card.title}")

    def _delete_current_card(self):
        row = self.list_cards.currentRow()
        if 0 <= row < len(self.note.cards):
            del self.note.cards[row]
            self.current_editing_row = -1
            self._load_cards_list()
            if self.note.cards:
                self.list_cards.setCurrentRow(min(row, len(self.note.cards) - 1))
            else:
                self.txt_card_title.clear()
                self.txt_card_front.clear()
                self.txt_card_back.clear()

    def _add_card(self, card_type: str = "standard"):
        if 0 <= self.current_editing_row < len(self.note.cards):
            self._save_current_card(self.current_editing_row)

        step_num = len(self.note.cards) + 1
        is_serial = self.combo_note_type.currentData() == "serial_sequence"

        if card_type == "cloze":
            title = f"Definition {step_num}"
            new_card = ClozeCard(title, "A topological space $(X, \\tau)$ is {{c1::compact::property}} if every open cover has a finite subcover.")
        elif card_type == "proof":
            title = f"Proof Step {step_num}"
            new_card = ProofSequenceCard(title, "Theorem Premise Statement", ["Assume $P$", "Then $Q$ follows", "Therefore $R$"])
        else:
            title = f"Step A_{step_num} Statement" if is_serial else f"Card {step_num}"
            new_card = Flashcard(title, "Question / theorem statement (e.g. $\\nabla \\cdot \\mathbf{B} = 0$)", "Answer / proof details")

        self.note.add_card(new_card)
        self._load_cards_list()
        self.list_cards.setCurrentRow(len(self.note.cards) - 1)

    def _move_card_up(self):
        row = self.list_cards.currentRow()
        if row > 0:
            self._save_current_card(row)
            self.note.cards[row], self.note.cards[row-1] = self.note.cards[row-1], self.note.cards[row]
            self.current_editing_row = -1
            self._load_cards_list()
            self.list_cards.setCurrentRow(row - 1)

    def _move_card_down(self):
        row = self.list_cards.currentRow()
        if 0 <= row < len(self.note.cards) - 1:
            self._save_current_card(row)
            self.note.cards[row], self.note.cards[row+1] = self.note.cards[row+1], self.note.cards[row]
            self.current_editing_row = -1
            self._load_cards_list()
            self.list_cards.setCurrentRow(row + 1)

    def _save_and_accept(self):
        self.note.title = self.txt_note_title.text().strip() or "Untitled Note"
        self.note.note_type = self.combo_note_type.currentData()
        self.note.desired_retention = self.spin_desired_r.value()
        row = self.list_cards.currentRow()
        if row < 0 and self.current_editing_row >= 0:
            row = self.current_editing_row
        if 0 <= row < len(self.note.cards):
            self._save_current_card(row)
        self.accept()
