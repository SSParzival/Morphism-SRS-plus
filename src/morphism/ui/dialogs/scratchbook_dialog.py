import os
import json
import re
import html
from typing import List, Optional

from PySide6.QtWidgets import (QDialog, QVBoxLayout, QHBoxLayout, QPushButton,
                               QLabel, QLineEdit, QTextEdit, QListWidget, QListWidgetItem,
                               QGroupBox, QMessageBox, QWidget, QSplitter, QInputDialog, QFileDialog)
from PySide6.QtWebEngineWidgets import QWebEngineView
from PySide6.QtCore import Qt, QUrl, QTimer
from PySide6.QtGui import QFont, QKeySequence, QShortcut, QIcon

from .node_editor_dialog import (FlowLayout, load_editor_buttons_config, 
                                 load_mathjax_config_json, prompt_insert_image, prompt_insert_table)
from morphism.core.app_paths import SCRATCHBOOK_DIR, ASSETS_DIR, ICON_PNG, ICON_ICO
from morphism.core.theme_manager import ThemeManager

def build_scratchbook_html_template(content: str = "") -> str:
    """Build MathJax HTML page template for scratchbook live preview matching active theme."""
    mathjax_cfg = load_mathjax_config_json()
    cfg_json = json.dumps(mathjax_cfg)
    css_vars = ThemeManager.get_instance().get_web_css_variables()

    return f"""<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        {css_vars}
        body {{
            background-color: var(--bg-color);
            color: var(--text-color);
            font-family: -apple-system, BlinkMacSystemFont, "Inter", "Ubuntu", "DejaVu Sans", sans-serif;
            padding: 16px;
            margin: 0;
            line-height: 1.6;
            overflow-x: hidden;
            box-sizing: border-box;
            max-width: 100vw;
            overflow-wrap: break-word;
            word-break: normal;
        }}
        img {{
            max-width: 100%;
            border-radius: 8px;
        }}
        table {{
            border-collapse: collapse;
            width: 100%;
            margin: 10px 0;
            background: rgba(15, 23, 42, 0.6);
            display: block;
            overflow-x: auto;
            max-width: 100%;
            box-sizing: border-box;
        }}
        th, td {{
            border: 1px solid var(--border-color);
            padding: 8px 12px;
            text-align: left;
            min-width: 60px;
        }}
        th {{
            background-color: rgba(30, 41, 59, 0.8);
            color: var(--accent-border);
        }}
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
        body::-webkit-scrollbar,
        pre::-webkit-scrollbar,
        table::-webkit-scrollbar {{
            height: 6px;
            width: 6px;
        }}
        mjx-container[jax="SVG"]::-webkit-scrollbar-thumb,
        body::-webkit-scrollbar-thumb,
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
            tex: {cfg_json},
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
        window.updatePreview = function(htmlContent) {{
            let container = document.getElementById('content');
            if (!container) return;
            container.innerHTML = htmlContent;
            if (window.MathJax && window.MathJax.typesetPromise) {{
                MathJax.typesetPromise([container]).catch(function(err) {{
                    console.log(err);
                }});
            }}
        }};
    </script>
</head>
<body>
    <div id="content">{content}</div>
</body>
</html>"""

def sanitize_page_filename(name: str) -> str:
    """Sanitize page name for OS filename safety."""
    return "".join(c for c in name if c.isalnum() or c in (' ', '_', '-')).strip() or "Untitled"


class ScratchbookDialog(QDialog):
    """
    Scratchbook scratchpad dialog for scratch math derivations, theorems, 
    scratch proofs, and live formula rendering with auto-save.
    """

    def __init__(self, parent=None):
        super().__init__(parent)
        os.makedirs(SCRATCHBOOK_DIR, exist_ok=True)

        self.current_page_name: Optional[str] = None
        self.is_page_loaded: bool = False

        icon_file = ICON_PNG if os.path.exists(ICON_PNG) else (ICON_ICO if os.path.exists(ICON_ICO) else None)
        if icon_file:
            self.setWindowIcon(QIcon(icon_file))

        self.setWindowTitle("✏️ Scratchbook — Mathematics & Proof Scratchpad")
        self.setWindowFlags(self.windowFlags() | Qt.WindowMaximizeButtonHint | Qt.WindowMinimizeButtonHint)
        self.setMinimumSize(900, 600)
        self.resize(1160, 780)

        # Debounce timer for live rendering
        self.preview_timer = QTimer(self)
        self.preview_timer.setSingleShot(True)
        self.preview_timer.setInterval(250)
        self.preview_timer.timeout.connect(self._sync_current_page_to_preview_and_disk)

        self._setup_ui()
        self._load_pages_list()
        ThemeManager.get_instance().theme_changed.connect(self.on_theme_changed)

    def on_theme_changed(self, theme_id: str):
        assets_url = QUrl.fromLocalFile(ASSETS_DIR.replace("\\", "/") + "/")
        self.browser_preview.setHtml(build_scratchbook_html_template(""), assets_url)

    def _setup_ui(self):
        main_layout = QVBoxLayout(self)
        main_layout.setContentsMargins(12, 12, 12, 12)
        main_layout.setSpacing(10)

        splitter = QSplitter(Qt.Horizontal)

        # 1. Left Sidebar: Page List & Page Management
        sidebar_panel = QGroupBox("Scratch Pages")
        sidebar_layout = QVBoxLayout(sidebar_panel)

        self.list_pages = QListWidget()
        self.list_pages.currentItemChanged.connect(self._on_page_selection_changed)
        sidebar_layout.addWidget(self.list_pages)

        page_actions_layout = QHBoxLayout()
        btn_new_page = QPushButton("+ New Page")
        btn_new_page.setStyleSheet("background-color: #6366f1; color: white; font-weight: bold;")
        btn_new_page.clicked.connect(self._add_new_page)
        page_actions_layout.addWidget(btn_new_page)

        btn_rename_page = QPushButton("✏️ Rename")
        btn_rename_page.clicked.connect(self._rename_current_page)
        page_actions_layout.addWidget(btn_rename_page)

        btn_delete_page = QPushButton("🗑 Delete")
        btn_delete_page.setStyleSheet("background-color: #991b1b; color: #fca5a5;")
        btn_delete_page.clicked.connect(self._delete_current_page)
        page_actions_layout.addWidget(btn_delete_page)

        sidebar_layout.addLayout(page_actions_layout)

        btn_export = QPushButton("📤 Export Page to File...")
        btn_export.clicked.connect(self._export_page)
        sidebar_layout.addWidget(btn_export)

        splitter.addWidget(sidebar_panel)

        # 2. Right Area: Formatting Toolbar + Split Editor/Preview
        editor_panel = QWidget()
        editor_layout = QVBoxLayout(editor_panel)
        editor_layout.setContentsMargins(0, 0, 0, 0)

        # Active page header bar
        header_bar = QHBoxLayout()
        self.lbl_active_page_title = QLabel("Select or create a page")
        self.lbl_active_page_title.setStyleSheet("font-size: 16px; font-weight: bold; color: #38bdf8;")
        header_bar.addWidget(self.lbl_active_page_title)
        header_bar.addStretch()

        self.lbl_word_count = QLabel("Words: 0 | Chars: 0")
        self.lbl_word_count.setStyleSheet("color: #94a3b8; font-size: 12px;")
        header_bar.addWidget(self.lbl_word_count)

        self.lbl_status = QLabel("● Auto-saving")
        self.lbl_status.setStyleSheet("color: #10b981; font-weight: bold; font-size: 12px;")
        header_bar.addWidget(self.lbl_status)
        editor_layout.addLayout(header_bar)

        # Formatting Toolbar
        toolbar_layout = self._create_formatting_toolbar()
        editor_layout.addLayout(toolbar_layout)

        # Editor & Preview Splitter
        editor_splitter = QSplitter(Qt.Horizontal)

        # Text Editor
        self.txt_editor = QTextEdit()
        self.txt_editor.setPlaceholderText("Write HTML and LaTeX math ($...$, $$...$$) here...")
        mono_font = QFont("monospace", 11)
        mono_font.setStyleHint(QFont.Monospace)
        self.txt_editor.setFont(mono_font)
        self.txt_editor.textChanged.connect(self._on_text_changed)
        editor_splitter.addWidget(self.txt_editor)

        # WebEngine Live Preview
        self.browser_preview = QWebEngineView()
        assets_url = QUrl.fromLocalFile(ASSETS_DIR.replace("\\", "/") + "/")
        self.browser_preview.setHtml(build_scratchbook_html_template(""), assets_url)
        self.browser_preview.loadFinished.connect(self._on_preview_loaded)
        editor_splitter.addWidget(self.browser_preview)

        editor_splitter.setSizes([500, 500])
        editor_layout.addWidget(editor_splitter, stretch=1)

        splitter.addWidget(editor_panel)
        splitter.setSizes([260, 860])

        main_layout.addWidget(splitter)

    def _create_formatting_toolbar(self) -> FlowLayout:
        layout = FlowLayout(spacing=5)
        buttons_config = load_editor_buttons_config()
        for btn_info in buttons_config:
            label_text = btn_info.get("label", "Button")
            tooltip_text = btn_info.get("tooltip", "")
            btn_type = btn_info.get("type", "single")

            btn = QPushButton()
            self._configure_button_rich_text(btn, label_text)
            if tooltip_text:
                btn.setToolTip(tooltip_text)

            if btn_type == "interval":
                left = btn_info.get("left", "")
                right = btn_info.get("right", "")
                default_text = btn_info.get("default_text", "")
                btn.clicked.connect(lambda _, l=left, r=right, d=default_text: self._apply_interval(l, r, d))
            elif btn_type == "single":
                content = btn_info.get("content", "")
                btn.clicked.connect(lambda _, c=content: self.txt_editor.textCursor().insertText(c))
            elif btn_type == "action":
                act_name = btn_info.get("action", "")
                if act_name == "prompt_image":
                    btn.clicked.connect(lambda: prompt_insert_image(self.txt_editor, self))
                elif act_name == "prompt_table":
                    btn.clicked.connect(lambda: prompt_insert_table(self.txt_editor))

            layout.addWidget(btn)

            shortcut_key = btn_info.get("shortcut", "")
            if shortcut_key:
                sc = QShortcut(QKeySequence(shortcut_key), self)
                sc.setContext(Qt.WindowShortcut)
                sc.activated.connect(lambda info=btn_info: self._trigger_shortcut_action(info))

        return layout

    def _configure_button_rich_text(self, btn: QPushButton, raw_label: str):
        label_str = html.unescape(raw_label)
        plain_text = re.sub(r'<[^>]+>', '', label_str)
        btn.setText(plain_text)

        is_bold = "<b>" in label_str or "bold" in label_str
        font = btn.font()
        font.setPointSize(10)
        font.setBold(is_bold)
        btn.setFont(font)
        btn.setStyleSheet("padding: 4px 8px; min-width: 24px;")

    def _apply_interval(self, left: str, right: str, default_text: str = ""):
        cursor = self.txt_editor.textCursor()
        selected = cursor.selectedText()
        if selected:
            cursor.insertText(f"{left}{selected}{right}")
        else:
            val = default_text if default_text else "text"
            cursor.insertText(f"{left}{val}{right}")

    def _trigger_shortcut_action(self, btn_info: dict):
        btn_type = btn_info.get("type", "single")
        if btn_type == "interval":
            left = btn_info.get("left", "")
            right = btn_info.get("right", "")
            default_text = btn_info.get("default_text", "")
            self._apply_interval(left, right, default_text)
        elif btn_type == "single":
            content = btn_info.get("content", "")
            self.txt_editor.textCursor().insertText(content)
        elif btn_type == "action":
            act_name = btn_info.get("action", "")
            if act_name == "prompt_image":
                prompt_insert_image(self.txt_editor, self)
            elif act_name == "prompt_table":
                prompt_insert_table(self.txt_editor)

    def _load_pages_list(self):
        self.list_pages.blockSignals(True)
        self.list_pages.clear()

        files = [f for f in os.listdir(SCRATCHBOOK_DIR) if f.endswith(".txt")]
        page_names = sorted([os.path.splitext(f)[0] for f in files])

        if not page_names:
            default_name = "General Notes"
            default_file = os.path.join(SCRATCHBOOK_DIR, f"{default_name}.txt")
            sample_content = (
                "<h2>✏️ Welcome to Scratchbook!</h2>\n"
                "<p>Write notes, formulas, and proofs freely here.</p>\n"
                "<p>Euler's Identity: $e^{i\\pi} + 1 = 0$</p>\n"
            )
            with open(default_file, "w", encoding="utf-8") as f:
                f.write(sample_content)
            page_names = [default_name]

        for p_name in page_names:
            item = QListWidgetItem(f"📄 {p_name}")
            item.setData(Qt.UserRole, p_name)
            self.list_pages.addItem(item)

        self.list_pages.blockSignals(False)

        if self.list_pages.count() > 0:
            self.list_pages.setCurrentRow(0)

    def _on_page_selection_changed(self, current: Optional[QListWidgetItem], previous: Optional[QListWidgetItem]):
        if previous:
            prev_name = previous.data(Qt.UserRole)
            self._save_page_to_disk(prev_name, self.txt_editor.toPlainText())

        if not current:
            self.current_page_name = None
            self.lbl_active_page_title.setText("No Page Selected")
            self.txt_editor.setPlainText("")
            return

        page_name = current.data(Qt.UserRole)
        self.current_page_name = page_name
        self.lbl_active_page_title.setText(f"📄 {page_name}")

        file_path = os.path.join(SCRATCHBOOK_DIR, f"{sanitize_page_filename(page_name)}.txt")
        content = ""
        if os.path.exists(file_path):
            try:
                with open(file_path, "r", encoding="utf-8") as f:
                    content = f.read()
            except Exception as e:
                print(f"Error loading page '{page_name}': {e}")

        self.txt_editor.blockSignals(True)
        self.txt_editor.setPlainText(content)
        self.txt_editor.blockSignals(False)

        self._update_preview(content)
        self._update_word_count(content)

    def _on_text_changed(self):
        self.preview_timer.start()

    def _update_word_count(self, content: str):
        words = len(re.findall(r'\b\w+\b', content))
        chars = len(content)
        self.lbl_word_count.setText(f"Words: {words} | Chars: {chars}")

    def _sync_current_page_to_preview_and_disk(self):
        if not self.current_page_name:
            return
        content = self.txt_editor.toPlainText()
        self._update_preview(content)
        self._save_page_to_disk(self.current_page_name, content)
        self._update_word_count(content)

    def _save_page_to_disk(self, page_name: str, content: str):
        if not page_name:
            return
        file_path = os.path.join(SCRATCHBOOK_DIR, f"{sanitize_page_filename(page_name)}.txt")
        try:
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(content)
        except Exception as e:
            print(f"Error saving scratchbook page '{page_name}': {e}")

    def _on_preview_loaded(self, ok: bool):
        self.is_page_loaded = True
        if self.current_page_name:
            self._update_preview(self.txt_editor.toPlainText())

    def _update_preview(self, content: str):
        if hasattr(self, "is_page_loaded") and self.is_page_loaded:
            js = f"if (typeof updatePreview === 'function') {{ updatePreview({json.dumps(content)}); }}"
            self.browser_preview.page().runJavaScript(js)

    def _add_new_page(self):
        name, ok = QInputDialog.getText(self, "New Page", "Enter name for new scratch page:")
        if ok and name.strip():
            safe_name = sanitize_page_filename(name.strip())
            file_path = os.path.join(SCRATCHBOOK_DIR, f"{safe_name}.txt")
            if os.path.exists(file_path):
                QMessageBox.warning(self, "Page Exists", f"A page named '{safe_name}' already exists.")
                return

            with open(file_path, "w", encoding="utf-8") as f:
                f.write(f"<h2>{html.escape(safe_name)}</h2>\n<p>Start writing your notes...</p>\n")

            item = QListWidgetItem(f"📄 {safe_name}")
            item.setData(Qt.UserRole, safe_name)
            self.list_pages.addItem(item)
            self.list_pages.setCurrentItem(item)

    def _rename_current_page(self):
        if not self.current_page_name or not self.list_pages.currentItem():
            return

        old_name = self.current_page_name
        new_name, ok = QInputDialog.getText(self, "Rename Page", f"Enter new name for '{old_name}':", QLineEdit.Normal, old_name)
        if ok and new_name.strip() and new_name.strip() != old_name:
            safe_new_name = sanitize_page_filename(new_name.strip())
            old_path = os.path.join(SCRATCHBOOK_DIR, f"{sanitize_page_filename(old_name)}.txt")
            new_path = os.path.join(SCRATCHBOOK_DIR, f"{safe_new_name}.txt")

            if os.path.exists(new_path):
                QMessageBox.warning(self, "Page Exists", f"A page named '{safe_new_name}' already exists.")
                return

            self._save_page_to_disk(old_name, self.txt_editor.toPlainText())

            if os.path.exists(old_path):
                os.rename(old_path, new_path)

            self.current_page_name = safe_new_name
            self.lbl_active_page_title.setText(f"📄 {safe_new_name}")
            curr_item = self.list_pages.currentItem()
            curr_item.setText(f"📄 {safe_new_name}")
            curr_item.setData(Qt.UserRole, safe_new_name)

    def _delete_current_page(self):
        if not self.current_page_name or not self.list_pages.currentItem():
            return

        page_name = self.current_page_name
        reply = QMessageBox.question(
            self, 
            "Delete Page", 
            f"Are you sure you want to delete page '{page_name}'?",
            QMessageBox.Yes | QMessageBox.No,
            QMessageBox.No
        )
        if reply == QMessageBox.Yes:
            file_path = os.path.join(SCRATCHBOOK_DIR, f"{sanitize_page_filename(page_name)}.txt")
            if os.path.exists(file_path):
                try:
                    os.remove(file_path)
                except Exception as e:
                    print(f"Error deleting file '{file_path}': {e}")

            row = self.list_pages.currentRow()
            self.list_pages.takeItem(row)
            if self.list_pages.count() > 0:
                new_row = min(row, self.list_pages.count() - 1)
                self.list_pages.setCurrentRow(new_row)
            else:
                self.current_page_name = None
                self.lbl_active_page_title.setText("No Page Selected")
                self.txt_editor.setPlainText("")
                self._update_preview("")

    def _export_page(self):
        if not self.current_page_name:
            return
        dest_path, _ = QFileDialog.getSaveFileName(
            self, f"Export '{self.current_page_name}'", 
            f"{self.current_page_name}.md", 
            "Markdown File (*.md);;HTML File (*.html);;Text File (*.txt)"
        )
        if dest_path:
            content = self.txt_editor.toPlainText()
            with open(dest_path, "w", encoding="utf-8") as f:
                f.write(content)
            QMessageBox.information(self, "Exported", f"Exported to {dest_path}")

    def closeEvent(self, event):
        if self.current_page_name:
            self._save_page_to_disk(self.current_page_name, self.txt_editor.toPlainText())
        event.accept()
