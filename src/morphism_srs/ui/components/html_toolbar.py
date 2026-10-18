from __future__ import annotations

from typing import Callable

from PySide6.QtWidgets import QHBoxLayout, QPlainTextEdit, QPushButton, QWidget

from morphism_srs.theming.delegates import set_widget_props


class HtmlEditorToolbar(QWidget):
    """Toolbar for inserting HTML/LaTeX snippets and custom macro buttons into the active QPlainTextEdit."""

    def __init__(
        self,
        get_active_editor: Callable[[], QPlainTextEdit | None],
        custom_buttons: list[dict[str, str]] | None = None,
        parent: QWidget | None = None,
    ) -> None:
        super().__init__(parent)
        self.get_active_editor = get_active_editor
        layout = QHBoxLayout(self)
        layout.setContentsMargins(0, 0, 0, 0)
        layout.setSpacing(4)

        builtins = [
            ("B", "<b>", "</b>"),
            ("I", "<i>", "</i>"),
            ("$..$", "$", "$"),
            ("$$..$$", "$$\n", "\n$$"),
            ("List", "<ul>\n  <li>", "</li>\n</ul>"),
            ("Thm Box", '<div class="math-box-theorem"><b>Theorem.</b> ', "</div>"),
            ("Def Box", '<div class="math-box-definition"><b>Definition.</b> ', "</div>"),
            ("Proof Box", '<div class="math-box-proof"><i>Proof.</i> ', " $\\blacksquare$</div>"),
        ]
        for label, prefix, suffix in builtins:
            btn = QPushButton(label, self)
            set_widget_props(btn, variant="ghost")
            btn.clicked.connect(lambda _=False, p=prefix, s=suffix: self.wrap_selection(p, s))
            layout.addWidget(btn)

        for cb in (custom_buttons or [])[:6]:
            lbl = cb.get("label", "Snippet")
            prefix = cb.get("prefix", "")
            suffix = cb.get("suffix", "")
            btn = QPushButton(lbl, self)
            set_widget_props(btn, variant="ghost")
            btn.clicked.connect(lambda _=False, p=prefix, s=suffix: self.wrap_selection(p, s))
            layout.addWidget(btn)

        layout.addStretch(1)

    def wrap_selection(self, prefix: str, suffix: str) -> None:
        editor = self.get_active_editor()
        if editor is None:
            return
        cursor = editor.textCursor()
        selected = cursor.selectedText().replace("\u2029", "\n")
        cursor.insertText(f"{prefix}{selected}{suffix}")
        editor.setFocus()
