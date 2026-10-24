import os
import sys
import unittest

os.environ["QT_QPA_PLATFORM"] = "offscreen"
os.environ["MESA_DEBUG"] = "silent"

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

from PySide6.QtWidgets import QApplication
from theme_manager import ThemeManager
from main import MainWindow
from models import NoteNode, Flashcard, ClozeCard
from node_editor_dialog import NodeEditorDialog
from due_forecast_dialog import DueForecastDialog
from scratchbook_dialog import ScratchbookDialog

class TestGUIHeadless(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        cls.app = QApplication.instance() or QApplication(sys.argv)

    def test_main_window_instantiation(self):
        window = MainWindow()
        self.assertIsNotNone(window)
        self.assertGreater(window.tab_bar.count(), 3)
        self.assertIsNotNone(window.graph_view)
        self.assertIsNotNone(window.review_view)
        self.assertIsNotNone(window.stats_widget)

    def test_theme_switching_on_window(self):
        window = MainWindow()
        tm = ThemeManager.get_instance()
        for t in ["bisexual_midnight", "nord", "catppuccin_mocha", "github_light", "dark_modern"]:
            tm.set_theme(t, self.app)
            self.assertEqual(tm.active_theme_id, t)

    def test_dialogs_instantiation(self):
        note = NoteNode(title="Test Note")
        note.add_card(Flashcard("Card 1", "Front", "Back"))
        note.add_card(ClozeCard("Cloze", "Let {{c1::A}} be a set."))

        editor = NodeEditorDialog(note)
        self.assertIsNotNone(editor)

        window = MainWindow()
        forecast = DueForecastDialog(window.current_course, window.scheduler_manager)
        self.assertIsNotNone(forecast)

        scratch = ScratchbookDialog()
        self.assertIsNotNone(scratch)

if __name__ == "__main__":
    unittest.main()
