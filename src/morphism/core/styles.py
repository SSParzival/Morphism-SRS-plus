"""
Styles compatibility module bridging to the JSON-based ThemeManager.
Allows existing code to import apply_global_dark_theme, DARK_THEME_QSS, attach_dark_view
while dynamically resolving colors from user-configurable JSON theme files.
"""

from PySide6.QtWidgets import QApplication, QComboBox
from .theme_manager import ThemeManager, attach_dark_view

def apply_global_dark_theme(app: QApplication):
    """Apply the active JSON theme to the Qt application."""
    tm = ThemeManager.get_instance()
    tm.apply_theme_to_app(app)

def get_current_qss() -> str:
    """Return the current QSS generated from the active JSON theme."""
    return ThemeManager.get_instance().generate_qss()

# Backward compatibility property for direct string access
class _DynamicQSS(str):
    def __str__(self):
        return get_current_qss()
    def __repr__(self):
        return get_current_qss()

DARK_THEME_QSS = _DynamicQSS()
