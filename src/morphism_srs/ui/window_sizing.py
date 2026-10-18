from __future__ import annotations

from PySide6.QtGui import QGuiApplication
from PySide6.QtWidgets import QWidget


def apply_relative_geometry(
    widget: QWidget,
    width_ratio: float = 0.85,
    height_ratio: float = 0.85,
    min_width: int = 860,
    min_height: int = 560,
    center: bool = True,
) -> None:
    """
    Applies screen-relative geometry using QScreen.availableGeometry() so windows
    and dialogs fit comfortably on 720p (1280x720 / 1366x768) laptop displays as well as 4K screens.
    """
    screen = widget.screen() or QGuiApplication.primaryScreen()
    if screen is None:
        widget.resize(min_width, min_height)
        return

    avail = screen.availableGeometry()
    eff_min_w = min(min_width, int(avail.width() * 0.96))
    eff_min_h = min(min_height, int(avail.height() * 0.94))
    widget.setMinimumSize(eff_min_w, eff_min_h)

    target_w = max(eff_min_w, min(int(avail.width() * width_ratio), int(avail.width() * 0.96)))
    target_h = max(eff_min_h, min(int(avail.height() * height_ratio), int(avail.height() * 0.94)))
    widget.resize(target_w, target_h)

    if center:
        x = avail.x() + (avail.width() - target_w) // 2
        y = avail.y() + (avail.height() - target_h) // 2
        widget.move(max(avail.x(), x), max(avail.y(), y))
