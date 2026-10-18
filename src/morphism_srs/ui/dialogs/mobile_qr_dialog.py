from __future__ import annotations

from pathlib import Path
import sqlite3

from PySide6.QtCore import Qt
from PySide6.QtGui import QCloseEvent, QGuiApplication
from PySide6.QtWidgets import (
    QDialog,
    QFrame,
    QHBoxLayout,
    QLabel,
    QLineEdit,
    QPushButton,
    QVBoxLayout,
    QWidget,
)

from morphism_srs.controllers.event_bus import EventBus
from morphism_srs.controllers.review_controller import ReviewController
from morphism_srs.services.mobile_server import EphemeralMobileServer
from morphism_srs.storage.media_vault import MediaVault
from morphism_srs.theming.delegates import set_widget_props
from morphism_srs.ui.window_sizing import apply_relative_geometry


class MobileQRDialog(QDialog):
    """
    Dialog that starts the EphemeralMobileServer ONLY while open and shuts it down
    immediately when closed (zero 24/7 background daemon).
    """

    def __init__(
        self,
        conn: sqlite3.Connection,
        review_controller: ReviewController,
        media_vault: MediaVault,
        web_root: Path,
        event_bus: EventBus,
        parent: QWidget | None = None,
    ) -> None:
        super().__init__(parent)
        self.setWindowTitle("Mobile Companion — Ephemeral LAN Sync")
        apply_relative_geometry(self, width_ratio=0.46, height_ratio=0.52, min_width=480, min_height=360)

        mathjax_path = web_root / "vendor" / "mathjax" / "tex-svg-full.js"
        mj_bytes = mathjax_path.read_bytes() if mathjax_path.exists() else b""

        self.server = EphemeralMobileServer(
            conn=conn,
            review_controller=review_controller,
            media_vault=media_vault,
            mathjax_js_bytes=mj_bytes,
            event_bus=event_bus,
        )
        url = self.server.start()

        root = QVBoxLayout(self)
        root.setContentsMargins(18, 18, 18, 18)
        root.setSpacing(12)

        title = QLabel("Ephemeral Mobile Companion Active", self)
        set_widget_props(title, role="title")
        root.addWidget(title)

        desc = QLabel(
            "The local server is running ONLY while this dialog remains open.\n"
            "Open the URL below on your phone (connected to the same Wi-Fi/LAN) to review live "
            "or use 'Check-Out Offline' to download your queue and sync back later.",
            self,
        )
        desc.setWordWrap(True)
        set_widget_props(desc, role="muted")
        root.addWidget(desc)

        card = QFrame(self)
        set_widget_props(card, role="card")
        card_layout = QVBoxLayout(card)
        card_layout.setContentsMargins(14, 14, 14, 14)

        status_lbl = QLabel(f"Listening on Port {self.server.port} • Token Authenticated", card)
        set_widget_props(status_lbl, role="badge")
        card_layout.addWidget(status_lbl, 0, Qt.AlignmentFlag.AlignLeft)

        url_row = QHBoxLayout()
        self.url_edit = QLineEdit(url, card)
        self.url_edit.setReadOnly(True)
        copy_btn = QPushButton("Copy URL", card)
        copy_btn.clicked.connect(lambda: QGuiApplication.clipboard().setText(url))
        url_row.addWidget(self.url_edit, 1)
        url_row.addWidget(copy_btn)
        card_layout.addLayout(url_row)

        root.addWidget(card)
        root.addStretch(1)

        btn_row = QHBoxLayout()
        btn_row.addStretch(1)
        stop_btn = QPushButton("Stop Server & Close", self)
        set_widget_props(stop_btn, variant="danger")
        stop_btn.clicked.connect(self.accept)
        btn_row.addWidget(stop_btn)
        root.addLayout(btn_row)

    def closeEvent(self, event: QCloseEvent) -> None:
        self.server.stop()
        super().closeEvent(event)

    def done(self, result: int) -> None:
        self.server.stop()
        super().done(result)
