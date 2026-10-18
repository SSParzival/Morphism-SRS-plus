from __future__ import annotations

from PySide6.QtWidgets import (
    QCheckBox,
    QDialog,
    QHBoxLayout,
    QLabel,
    QPushButton,
    QVBoxLayout,
    QWidget,
)

from morphism_srs.theming.delegates import set_widget_props
from morphism_srs.ui.window_sizing import apply_relative_geometry


class DeleteNoteDialog(QDialog):
    """Confirmation dialog when deleting DAG nodes, offering prerequisite edge bridging."""

    def __init__(self, note_count: int = 1, parent: QWidget | None = None) -> None:
        super().__init__(parent)
        self.setWindowTitle("Delete Note(s)")
        apply_relative_geometry(self, width_ratio=0.36, height_ratio=0.28, min_width=400, min_height=210)

        layout = QVBoxLayout(self)
        layout.setContentsMargins(16, 16, 16, 16)
        layout.setSpacing(12)

        lbl = QLabel(
            f"Are you sure you want to permanently delete {note_count} selected note(s) and their cards?",
            self,
        )
        lbl.setWordWrap(True)
        layout.addWidget(lbl)

        self.bridge_cb = QCheckBox(
            "Bridge prerequisite edges (connect parent prerequisites directly to child dependents)",
            self,
        )
        self.bridge_cb.setChecked(True)
        layout.addWidget(self.bridge_cb)
        layout.addStretch(1)

        row = QHBoxLayout()
        row.addStretch(1)
        cancel_btn = QPushButton("Cancel", self)
        cancel_btn.clicked.connect(self.reject)
        del_btn = QPushButton("Delete", self)
        set_widget_props(del_btn, variant="danger")
        del_btn.clicked.connect(self.accept)
        row.addWidget(cancel_btn)
        row.addWidget(del_btn)
        layout.addLayout(row)

    @property
    def bridge_edges(self) -> bool:
        return self.bridge_cb.isChecked()
