from __future__ import annotations

import json
import sqlite3

from PySide6.QtCore import QBuffer, QByteArray, QIODevice, QMimeData, QTimer, QUrl, Qt
from PySide6.QtGui import QGuiApplication, QKeyEvent
from PySide6.QtWidgets import (
    QComboBox,
    QDialog,
    QDoubleSpinBox,
    QFileDialog,
    QFormLayout,
    QFrame,
    QHBoxLayout,
    QLabel,
    QLineEdit,
    QListWidget,
    QListWidgetItem,
    QMessageBox,
    QPlainTextEdit,
    QPushButton,
    QSplitter,
    QVBoxLayout,
    QWidget,
)

from morphism_srs.config import AppConfig
from morphism_srs.domain.enums import NoteReviewMode
from morphism_srs.domain.models import CardModel, NoteModel
from morphism_srs.services.safe_html import sanitize_math_html
from morphism_srs.storage.media_vault import MediaVault
from morphism_srs.storage.repositories.note_repo import NoteRepository
from morphism_srs.storage.unit_of_work import UnitOfWork
from morphism_srs.theming.delegates import set_widget_props
from morphism_srs.ui.components.html_toolbar import HtmlEditorToolbar
from morphism_srs.ui.components.tag_chips import TagChipsWidget
from morphism_srs.ui.window_sizing import apply_relative_geometry
from morphism_srs.web_engine.web_profile import WebEngineProfileManager


class MediaPasteTextEdit(QPlainTextEdit):
    """QPlainTextEdit that intercepts Ctrl+V images/SVGs and stores them into MediaVault."""

    def __init__(self, media_vault: MediaVault, parent: QWidget | None = None) -> None:
        super().__init__(parent)
        self.media_vault = media_vault

    def insertFromMimeData(self, source: QMimeData) -> None:
        if source.hasUrls():
            for url in source.urls():
                if url.isLocalFile():
                    local_path = url.toLocalFile()
                    if local_path.lower().endswith((".svg", ".png", ".webp", ".jpg", ".jpeg", ".gif")):
                        from pathlib import Path
                        _, stored_name = self.media_vault.store_file(Path(local_path))
                        cls_attr = ' class="commutative-diagram"' if stored_name.endswith(".svg") else ""
                        self.insertPlainText(f'<img src="morphism://media/{stored_name}"{cls_attr}>')
                        return

        if source.hasImage():
            image = QGuiApplication.clipboard().image()
            if not image.isNull():
                ba = QByteArray()
                buf = QBuffer(ba)
                buf.open(QIODevice.OpenModeFlag.WriteOnly)
                image.save(buf, "PNG")
                _, stored_name = self.media_vault.store_bytes(bytes(ba), "clipboard.png")
                self.insertPlainText(f'<img src="morphism://media/{stored_name}">')
                return

        if source.hasText():
            txt = source.text().strip()
            if txt.startswith("<svg") and txt.endswith("</svg>"):
                _, stored_name = self.media_vault.store_bytes(txt.encode("utf-8"), "diagram.svg")
                self.insertPlainText(f'<img src="morphism://media/{stored_name}" class="commutative-diagram">')
                return

        super().insertFromMimeData(source)


class NodeEditorDialog(QDialog):
    """Split-pane Node & Multi-Step Card Editor with live MathJax preview and MediaVault SVG/PNG support."""

    def __init__(
        self,
        conn: sqlite3.Connection,
        config: AppConfig,
        media_vault: MediaVault,
        web_profile: WebEngineProfileManager,
        course_id: int,
        note: NoteModel | None = None,
        default_pos: tuple[float, float] = (0.0, 0.0),
        parent: QWidget | None = None,
    ) -> None:
        super().__init__(parent)
        self.setWindowTitle("Edit Mathematical Note" if note else "Create Mathematical Note")
        apply_relative_geometry(self, width_ratio=0.82, height_ratio=0.82, min_width=820, min_height=540)

        self.conn = conn
        self.config = config
        self.media_vault = media_vault
        self.web_profile = web_profile
        self.course_id = course_id
        self.note_repo = NoteRepository(conn)

        if note is not None:
            self.note = note
            if not self.note.cards:
                self.note.cards = [CardModel(step_order=0, title="Step 1", front_html="", back_html="")]
        else:
            self.note = NoteModel(
                course_id=course_id,
                title="New Mathematical Note",
                pos_x=default_pos[0],
                pos_y=default_pos[1],
                review_mode=NoteReviewMode.STANDARD,
                cards=[CardModel(step_order=0, title="", front_html="", back_html="")],
            )

        self._active_card_idx = 0
        self._active_text_edit: QPlainTextEdit | None = None
        self._preview_ready = False

        self._preview_timer = QTimer(self)
        self._preview_timer.setSingleShot(True)
        self._preview_timer.setInterval(200)
        self._preview_timer.timeout.connect(self._update_live_preview)

        self._build_ui()
        self._load_note_into_ui()

    def _build_ui(self) -> None:
        root = QVBoxLayout(self)
        root.setContentsMargins(14, 14, 14, 14)
        root.setSpacing(10)

        splitter = QSplitter(Qt.Orientation.Horizontal, self)

        # Left Pane: Metadata + Step List + Q/A/H Editors
        left_pane = QWidget(splitter)
        left_layout = QVBoxLayout(left_pane)
        left_layout.setContentsMargins(0, 0, 8, 0)
        left_layout.setSpacing(8)

        meta_form = QFormLayout()
        meta_form.setSpacing(6)

        self.title_edit = QLineEdit(left_pane)
        self.title_edit.textChanged.connect(lambda _: self._preview_timer.start())
        meta_form.addRow("Note Title:", self.title_edit)

        mode_row = QHBoxLayout()
        self.mode_combo = QComboBox(left_pane)
        self.mode_combo.addItem("Standard — Independent Cards  P(A_i)  [Rectangle]", NoteReviewMode.STANDARD.value)
        self.mode_combo.addItem("Serial — Proof Chain  P(A_i | A_j, j < i)  [Diamond]", NoteReviewMode.SERIAL.value)
        self.mode_combo.addItem("Cloze — Mutual Context  P(A_i | A_j, j ≠ i)  [Ellipse]", NoteReviewMode.CLOZE.value)
        self.mode_combo.currentIndexChanged.connect(lambda _: self._preview_timer.start())
        mode_row.addWidget(self.mode_combo, 1)

        self.retention_spin = QDoubleSpinBox(left_pane)
        self.retention_spin.setRange(0.70, 0.99)
        self.retention_spin.setSingleStep(0.01)
        self.retention_spin.setValue(self.note.desired_retention or 0.90)
        mode_row.addWidget(QLabel("Retention:", left_pane))
        mode_row.addWidget(self.retention_spin)
        meta_form.addRow("Review Mode:", mode_row)

        all_tags = [t.name for t in self.note_repo.list_all_tags()]
        self.tag_chips = TagChipsWidget(all_tags, left_pane)
        self.tag_chips.tags_changed.connect(lambda _: self._preview_timer.start())
        meta_form.addRow("Tags:", self.tag_chips)

        left_layout.addLayout(meta_form)

        # Toolbar + Media Import
        tb_row = QHBoxLayout()
        self.html_toolbar = HtmlEditorToolbar(
            get_active_editor=lambda: self._active_text_edit,
            custom_buttons=self.config.load_editor_buttons(),
            parent=left_pane,
        )
        tb_row.addWidget(self.html_toolbar, 1)

        insert_media_btn = QPushButton("Insert SVG / Image...", left_pane)
        insert_media_btn.clicked.connect(self._on_insert_media_file)
        tb_row.addWidget(insert_media_btn)
        left_layout.addLayout(tb_row)

        # Premise
        prem_lbl = QLabel("Shared Premise / Context (optional):", left_pane)
        set_widget_props(prem_lbl, role="muted")
        left_layout.addWidget(prem_lbl)
        self.premise_edit = MediaPasteTextEdit(self.media_vault, left_pane)
        self.premise_edit.setMaximumHeight(68)
        self.premise_edit.textChanged.connect(self._on_editor_changed)
        self._track_focus(self.premise_edit)
        left_layout.addWidget(self.premise_edit)

        # Cards / Steps list + Step Editor
        steps_header = QHBoxLayout()
        steps_lbl = QLabel("Cards / Proof Steps:", left_pane)
        set_widget_props(steps_lbl, role="subtitle")
        steps_header.addWidget(steps_lbl)
        steps_header.addStretch(1)

        add_step_btn = QPushButton("+ Add Card / Step", left_pane)
        add_step_btn.clicked.connect(self._on_add_step)
        del_step_btn = QPushButton("Remove Step", left_pane)
        del_step_btn.clicked.connect(self._on_remove_step)
        steps_header.addWidget(add_step_btn)
        steps_header.addWidget(del_step_btn)
        left_layout.addLayout(steps_header)

        self.steps_list = QListWidget(left_pane)
        self.steps_list.setMaximumHeight(85)
        self.steps_list.currentRowChanged.connect(self._on_step_selected)
        left_layout.addWidget(self.steps_list)

        step_title_row = QHBoxLayout()
        step_title_row.addWidget(QLabel("Step Title:", left_pane))
        self.card_title_edit = QLineEdit(left_pane)
        self.card_title_edit.setPlaceholderText("Optional step title (e.g. Base Case, Uniqueness)...")
        self.card_title_edit.textChanged.connect(self._on_editor_changed)
        step_title_row.addWidget(self.card_title_edit, 1)
        left_layout.addLayout(step_title_row)

        left_layout.addWidget(QLabel("Prompt / Front (LaTeX & HTML):", left_pane))
        self.front_edit = MediaPasteTextEdit(self.media_vault, left_pane)
        self.front_edit.textChanged.connect(self._on_editor_changed)
        self._track_focus(self.front_edit)
        left_layout.addWidget(self.front_edit, 2)

        left_layout.addWidget(QLabel("Answer / Proof Step Back (LaTeX & HTML):", left_pane))
        self.back_edit = MediaPasteTextEdit(self.media_vault, left_pane)
        self.back_edit.textChanged.connect(self._on_editor_changed)
        self._track_focus(self.back_edit)
        left_layout.addWidget(self.back_edit, 2)

        left_layout.addWidget(QLabel("Optional Hint:", left_pane))
        self.hint_edit = MediaPasteTextEdit(self.media_vault, left_pane)
        self.hint_edit.setMaximumHeight(54)
        self.hint_edit.textChanged.connect(self._on_editor_changed)
        self._track_focus(self.hint_edit)
        left_layout.addWidget(self.hint_edit)

        # Right Pane: Live MathJax Preview
        right_pane = QFrame(splitter)
        set_widget_props(right_pane, role="panel")
        right_layout = QVBoxLayout(right_pane)
        right_layout.setContentsMargins(8, 8, 8, 8)
        p_header = QLabel("Live MathJax & SVG Preview", right_pane)
        set_widget_props(p_header, role="subtitle")
        right_layout.addWidget(p_header)

        self.web_view = self.web_profile.create_web_view(right_pane)
        self.web_view.loadFinished.connect(self._on_preview_page_loaded)
        self.web_view.setUrl(QUrl("morphism://app/html/preview.html"))
        right_layout.addWidget(self.web_view, 1)

        splitter.addWidget(left_pane)
        splitter.addWidget(right_pane)
        splitter.setStretchFactor(0, 3)
        splitter.setStretchFactor(1, 2)
        root.addWidget(splitter, 1)

        btn_row = QHBoxLayout()
        btn_row.addStretch(1)
        cancel_btn = QPushButton("Cancel", self)
        cancel_btn.clicked.connect(self.reject)
        save_btn = QPushButton("Save Note (Ctrl+Enter)", self)
        set_widget_props(save_btn, variant="primary")
        save_btn.clicked.connect(self._on_save)
        btn_row.addWidget(cancel_btn)
        btn_row.addWidget(save_btn)
        root.addLayout(btn_row)

    def _track_focus(self, editor: QPlainTextEdit) -> None:
        orig_focus = editor.focusInEvent

        def _focus_in(ev) -> None:
            self._active_text_edit = editor
            orig_focus(ev)

        editor.focusInEvent = _focus_in  # type: ignore[method-assign]

    def keyPressEvent(self, event: QKeyEvent) -> None:
        if event.key() in (Qt.Key.Key_Return, Qt.Key.Key_Enter) and (event.modifiers() & Qt.KeyboardModifier.ControlModifier):
            self._on_save()
            return
        super().keyPressEvent(event)

    def _load_note_into_ui(self) -> None:
        self.title_edit.setText(self.note.title)
        idx = self.mode_combo.findData(self.note.review_mode.value)
        if idx >= 0:
            self.mode_combo.setCurrentIndex(idx)
        self.tag_chips.set_tags(self.note.tags)
        self.premise_edit.setPlainText(self.note.premise_html)
        self._refresh_steps_list(select_idx=0)

    def _refresh_steps_list(self, select_idx: int = 0) -> None:
        self.steps_list.blockSignals(True)
        self.steps_list.clear()
        for idx, c in enumerate(self.note.cards):
            lbl = f"Step {idx + 1}: {c.title}" if c.title else f"Step {idx + 1}"
            self.steps_list.addItem(QListWidgetItem(lbl))
        self.steps_list.blockSignals(False)
        target = max(0, min(select_idx, len(self.note.cards) - 1))
        self._active_card_idx = target
        self.steps_list.setCurrentRow(target)
        self._load_card_into_editors(target)

    def _load_card_into_editors(self, idx: int) -> None:
        if not (0 <= idx < len(self.note.cards)):
            return
        c = self.note.cards[idx]
        for w in (self.card_title_edit, self.front_edit, self.back_edit, self.hint_edit):
            w.blockSignals(True)
        self.card_title_edit.setText(c.title)
        self.front_edit.setPlainText(c.front_html)
        self.back_edit.setPlainText(c.back_html)
        self.hint_edit.setPlainText(c.hint_html)
        for w in (self.card_title_edit, self.front_edit, self.back_edit, self.hint_edit):
            w.blockSignals(False)
        self._preview_timer.start()

    def _sync_current_card_from_editors(self) -> None:
        if not (0 <= self._active_card_idx < len(self.note.cards)):
            return
        c = self.note.cards[self._active_card_idx]
        c.title = self.card_title_edit.text().strip()
        c.front_html = self.front_edit.toPlainText()
        c.back_html = self.back_edit.toPlainText()
        c.hint_html = self.hint_edit.toPlainText()
        item = self.steps_list.item(self._active_card_idx)
        if item:
            item.setText(f"Step {self._active_card_idx + 1}: {c.title}" if c.title else f"Step {self._active_card_idx + 1}")

    def _on_step_selected(self, new_row: int) -> None:
        self._sync_current_card_from_editors()
        if 0 <= new_row < len(self.note.cards):
            self._active_card_idx = new_row
            self._load_card_into_editors(new_row)

    def _on_editor_changed(self) -> None:
        self._sync_current_card_from_editors()
        self._preview_timer.start()

    def _on_add_step(self) -> None:
        self._sync_current_card_from_editors()
        new_idx = len(self.note.cards)
        self.note.cards.append(CardModel(step_order=new_idx, title="", front_html="", back_html=""))
        if len(self.note.cards) > 1 and self.mode_combo.currentData() == NoteReviewMode.STANDARD.value:
            s_idx = self.mode_combo.findData(NoteReviewMode.SERIAL.value)
            if s_idx >= 0:
                self.mode_combo.setCurrentIndex(s_idx)
        self._refresh_steps_list(select_idx=new_idx)

    def _on_remove_step(self) -> None:
        if len(self.note.cards) <= 1:
            QMessageBox.information(self, "Cannot Remove", "A note must contain at least one card.")
            return
        self.note.cards.pop(self._active_card_idx)
        for i, c in enumerate(self.note.cards):
            c.step_order = i
        self._refresh_steps_list(select_idx=max(0, self._active_card_idx - 1))

    def _on_insert_media_file(self) -> None:
        path_str, _ = QFileDialog.getOpenFileName(
            self,
            "Insert SVG or Image into Card",
            "",
            "Diagrams & Images (*.svg *.png *.webp *.jpg *.jpeg *.gif)",
        )
        if not path_str:
            return
        from pathlib import Path
        _, stored = self.media_vault.store_file(Path(path_str))
        target_ed = self._active_text_edit or self.front_edit
        cls_attr = ' class="commutative-diagram"' if stored.endswith(".svg") else ""
        target_ed.insertPlainText(f'<img src="morphism://media/{stored}"{cls_attr}>')

    def _on_preview_page_loaded(self, ok: bool) -> None:
        self._preview_ready = ok
        if ok:
            macros = self.config.load_mathjax_macros()
            self.web_view.page().runJavaScript(
                f"if (window.MathJax && window.MathJax.config && window.MathJax.config.tex) "
                f"{{ Object.assign(window.MathJax.config.tex.macros, {json.dumps(macros)}); }}"
            )
            self._update_live_preview()

    def _update_live_preview(self) -> None:
        if not self._preview_ready:
            return
        self._sync_current_card_from_editors()
        payload = {
            "title": self.title_edit.text().strip() or "Untitled Note",
            "review_mode": str(self.mode_combo.currentData() or "standard"),
            "tags": self.tag_chips.tags(),
            "premise_html": sanitize_math_html(self.premise_edit.toPlainText()),
            "cards": [
                {
                    "title": c.title,
                    "front_html": sanitize_math_html(c.front_html),
                    "back_html": sanitize_math_html(c.back_html),
                    "hint_html": sanitize_math_html(c.hint_html),
                }
                for c in self.note.cards
            ],
        }
        self.web_view.page().runJavaScript(
            f"if (window.MorphismPreview) {{ window.MorphismPreview.renderPreview({json.dumps(payload)}); }}"
        )

    def _on_save(self) -> None:
        self._sync_current_card_from_editors()
        title = self.title_edit.text().strip()
        if not title:
            QMessageBox.warning(self, "Missing Title", "Please enter a title for the note.")
            return

        for idx, c in enumerate(self.note.cards):
            c.step_order = idx
            c.front_html = sanitize_math_html(c.front_html)
            c.back_html = sanitize_math_html(c.back_html)
            c.hint_html = sanitize_math_html(c.hint_html)

        self.note.title = title
        self.note.premise_html = sanitize_math_html(self.premise_edit.toPlainText())
        self.note.review_mode = NoteReviewMode(str(self.mode_combo.currentData() or "standard"))
        self.note.desired_retention = self.retention_spin.value()
        self.note.tags = self.tag_chips.tags()

        with UnitOfWork(self.conn):
            if self.note.id is None:
                self.note = self.note_repo.create(self.note)
            else:
                self.note_repo.update(self.note, sync_cards=True)

        self.accept()
