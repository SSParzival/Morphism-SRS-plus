import sys
import os
import ctypes
from typing import List, Dict, Optional, Tuple
from datetime import datetime, timezone
from PySide6.QtWidgets import (QApplication, QMainWindow, QStackedWidget, 
                               QToolBar, QWidget, QVBoxLayout, QHBoxLayout, 
                               QLabel, QPushButton, QMessageBox, QInputDialog, QTabBar,
                               QDialog, QListWidget, QListWidgetItem, QLineEdit, QComboBox)
from PySide6.QtCore import Qt, QSize
from PySide6.QtGui import QAction, QIcon, QKeySequence

from models import Course, NoteNode, NoteEdge, Flashcard, ProofSequenceCard, ClozeCard, ReviewLogRecord
from scheduler_manager import SchedulerManager
from graph_view import GraphWidget
from review_view import ReviewWidget
from node_editor_dialog import NodeEditorDialog
from retrievability_plot_dialog import RetrievabilityPlotDialog
from due_forecast_dialog import DueForecastDialog
from scratchbook_dialog import ScratchbookDialog
from courses_widget import CoursesWidget
from stats_widget import StatsWidget
import course_storage
from theme_manager import ThemeManager, attach_dark_view
from app_paths import ICON_PNG, ICON_ICO
from fsrs import Rating, Card as FSRSCard

class DeletePrereqsDialog(QDialog):
    """Dialog allowing user to selectively remove prerequisite edges attached to a note."""
    def __init__(self, note: NoteNode, edges: List[NoteEdge], notes_map: Dict[str, NoteNode], parent=None):
        super().__init__(parent)
        self.note = note
        self.edges = edges
        self.notes_map = notes_map
        self.selected_edges_to_delete: List[NoteEdge] = []

        self.setWindowTitle(f"✂️ Remove Prerequisites - '{note.title}'")
        self.resize(520, 360)
        self._setup_ui()

    def _setup_ui(self):
        layout = QVBoxLayout(self)

        lbl_desc = QLabel(f"Select prerequisite connections attached to '{self.note.title}' to remove:")
        lbl_desc.setStyleSheet("font-size: 13px; font-weight: bold; color: #38bdf8;")
        layout.addWidget(lbl_desc)

        self.list_widget = QListWidget()
        self.attached_edges = [
            e for e in self.edges if e.source_id == self.note.note_id or e.target_id == self.note.note_id
        ]

        for edge in self.attached_edges:
            src_note = self.notes_map.get(edge.source_id)
            tgt_note = self.notes_map.get(edge.target_id)
            src_name = src_note.title if src_note else f"ID {edge.source_id}"
            tgt_name = tgt_note.title if tgt_note else f"ID {edge.target_id}"

            if edge.target_id == self.note.note_id:
                label = f"📥 Incoming: '{src_name}' ➔ '{self.note.title}'"
            else:
                label = f"📤 Outgoing: '{self.note.title}' ➔ '{tgt_name}'"

            item = QListWidgetItem(label)
            item.setFlags(item.flags() | Qt.ItemIsUserCheckable)
            item.setCheckState(Qt.Unchecked)
            item.setData(Qt.UserRole, edge)
            self.list_widget.addItem(item)

        layout.addWidget(self.list_widget)

        btn_layout = QHBoxLayout()
        btn_select_all = QPushButton("Select All")
        btn_select_all.clicked.connect(self._select_all)
        btn_layout.addWidget(btn_select_all)

        btn_layout.addStretch()

        btn_cancel = QPushButton("Cancel")
        btn_cancel.clicked.connect(self.reject)
        btn_layout.addWidget(btn_cancel)

        btn_delete = QPushButton("✂️ Remove Selected")
        btn_delete.setStyleSheet("background-color: #dc2626; color: white; font-weight: bold; padding: 6px 14px; border-radius: 6px;")
        btn_delete.clicked.connect(self._on_delete)
        btn_layout.addWidget(btn_delete)

        layout.addLayout(btn_layout)

    def _select_all(self):
        for i in range(self.list_widget.count()):
            self.list_widget.item(i).setCheckState(Qt.Checked)

    def _on_delete(self):
        self.selected_edges_to_delete = []
        for i in range(self.list_widget.count()):
            item = self.list_widget.item(i)
            if item.checkState() == Qt.Checked:
                self.selected_edges_to_delete.append(item.data(Qt.UserRole))

        if not self.selected_edges_to_delete:
            QMessageBox.warning(self, "No Selection", "Please check at least one prerequisite edge to remove.")
            return

        self.accept()


class ReviewSummaryDialog(QDialog):
    """Celebration summary dialog shown at the end of a review session."""
    def __init__(self, count: int, ratings_count: Dict[int, int], duration_sec: int, parent=None):
        super().__init__(parent)
        self.setWindowTitle("🎉 Session Complete! — Morphism SRS Plus")
        self.setFixedSize(480, 360)
        
        layout = QVBoxLayout(self)
        layout.setContentsMargins(24, 24, 24, 24)
        layout.setSpacing(16)

        lbl_header = QLabel("🌟 Review Session Completed!")
        lbl_header.setStyleSheet("font-size: 22px; font-weight: bold; color: #10b981; text-align: center;")
        lbl_header.setAlignment(Qt.AlignCenter)
        layout.addWidget(lbl_header)

        minutes = max(1, duration_sec // 60)
        lbl_stats = QLabel(f"You reviewed <b>{count} cards</b> in ~<b>{minutes} minute(s)</b>.")
        lbl_stats.setStyleSheet("font-size: 15px; color: #cbd5e1; text-align: center;")
        lbl_stats.setAlignment(Qt.AlignCenter)
        layout.addWidget(lbl_stats)

        # Rating breakdown box
        breakdown_box = QWidget()
        breakdown_box.setStyleSheet("background-color: rgba(15, 23, 42, 0.6); border-radius: 8px; padding: 12px;")
        b_layout = QHBoxLayout(breakdown_box)

        b_again = QLabel(f"Again: {ratings_count.get(1, 0)}")
        b_again.setStyleSheet("color: #ef4444; font-weight: bold; font-size: 14px;")
        b_layout.addWidget(b_again)

        b_hard = QLabel(f"Hard: {ratings_count.get(2, 0)}")
        b_hard.setStyleSheet("color: #f59e0b; font-weight: bold; font-size: 14px;")
        b_layout.addWidget(b_hard)

        b_good = QLabel(f"Good: {ratings_count.get(3, 0)}")
        b_good.setStyleSheet("color: #10b981; font-weight: bold; font-size: 14px;")
        b_layout.addWidget(b_good)

        b_easy = QLabel(f"Easy: {ratings_count.get(4, 0)}")
        b_easy.setStyleSheet("color: #3b82f6; font-weight: bold; font-size: 14px;")
        b_layout.addWidget(b_easy)

        layout.addWidget(breakdown_box)

        lbl_quote = QLabel("<i>\"Mathematics is not about numbers, equations, computations, or algorithms: it is about understanding.\"</i> — William Paul Thurston")
        lbl_quote.setWordWrap(True)
        lbl_quote.setStyleSheet("font-size: 13px; color: #94a3b8; font-style: italic; margin-top: 10px;")
        lbl_quote.setAlignment(Qt.AlignCenter)
        layout.addWidget(lbl_quote)

        layout.addStretch()

        btn_ok = QPushButton("Return to Explorer")
        btn_ok.setStyleSheet("background-color: #6366f1; color: white; font-weight: bold; padding: 10px; font-size: 14px; border-radius: 8px;")
        btn_ok.clicked.connect(self.accept)
        layout.addWidget(btn_ok)


class MainWindow(QMainWindow):
    """Morphism SRS Plus - Main window with Top Ledger Navigation, Themes, and Explorer Graph."""

    def __init__(self):
        super().__init__()
        icon_file = ICON_PNG if os.path.exists(ICON_PNG) else (ICON_ICO if os.path.exists(ICON_ICO) else None)
        if icon_file:
            self.setWindowIcon(QIcon(icon_file))

        self.scheduler_manager = SchedulerManager()
        self.current_course: Course = None

        self.current_review_queue: List[object] = []
        self.current_review_note: Optional[NoteNode] = None
        self.serial_past_steps: List[object] = []

        # Session tracking and Undo Rating
        self.review_undo_stack: List[dict] = []
        self.session_cards_reviewed: int = 0
        self.session_ratings_count: Dict[int, int] = {1: 0, 2: 0, 3: 0, 4: 0}
        self.session_start_time: Optional[datetime] = None

        self._init_data()
        self._setup_ui()

    def _init_data(self):
        """Ensure seed courses exist and load default course."""
        course_storage.ensure_seed_courses()
        cinfo_list = [c for c in course_storage.list_courses_info() if not c.get("is_folder")]
        initial_name = cinfo_list[0]["name"] if cinfo_list else "My Course"
        initial_folder = cinfo_list[0]["folder_path"] if cinfo_list else ""
        self.current_course = course_storage.load_course(initial_name, initial_folder)

    @property
    def notes(self) -> List[NoteNode]:
        return self.current_course.notes if self.current_course else []

    @property
    def edges(self) -> List[NoteEdge]:
        return self.current_course.edges if self.current_course else []

    def _update_title(self):
        cname = self.current_course.name if self.current_course else "Default"
        self.setWindowTitle(f"Morphism SRS Plus ⚡ — Course: {cname}")

    def _setup_ui(self):
        central_widget = QWidget()
        self.setCentralWidget(central_widget)
        main_layout = QVBoxLayout(central_widget)
        main_layout.setContentsMargins(0, 0, 0, 0)
        main_layout.setSpacing(0)

        # 1. Top Ledger Navigation Bar
        ledger_bar = QHBoxLayout()
        ledger_bar.setContentsMargins(12, 6, 12, 6)

        self.tab_bar = QTabBar()
        self.tab_bar.setStyleSheet("""
            QTabBar::tab {
                padding: 10px 22px;
                font-size: 14px;
                font-weight: bold;
                border-top-left-radius: 8px;
                border-top-right-radius: 8px;
                margin-right: 4px;
            }
        """)

        self.tab_bar.addTab("📚 Courses")
        self.tab_bar.addTab("🗺️ Explorer")
        self.tab_bar.addTab("📝 Review")
        self.tab_bar.addTab("📈 Stats")
        self.tab_bar.currentChanged.connect(self._on_ledger_tab_changed)

        ledger_bar.addWidget(self.tab_bar)

        btn_scratch = QPushButton("✏️ Scratchbook")
        btn_scratch.setCursor(Qt.PointingHandCursor)
        btn_scratch.clicked.connect(self._open_scratchbook_dialog)
        ledger_bar.addWidget(btn_scratch)

        ledger_bar.addSpacing(16)

        # Theme Selector Dropdown
        lbl_theme = QLabel("🎨 Theme:")
        lbl_theme.setStyleSheet("font-weight: bold; font-size: 13px;")
        ledger_bar.addWidget(lbl_theme)

        self.combo_theme = QComboBox()
        self.combo_theme.setCursor(Qt.PointingHandCursor)
        attach_dark_view(self.combo_theme)
        self._populate_themes()
        self.combo_theme.currentIndexChanged.connect(self._on_theme_selected)
        ledger_bar.addWidget(self.combo_theme)

        ledger_bar.addStretch()

        self.lbl_active_course_badge = QLabel(f"Active: {self.current_course.name}")
        self.lbl_active_course_badge.setStyleSheet("font-size: 13px; font-weight: bold; color: #38bdf8; padding: 6px 14px; border-radius: 6px; border: 1px solid #334155;")
        ledger_bar.addWidget(self.lbl_active_course_badge)

        main_layout.addLayout(ledger_bar)

        # 2. Main Stacked Router View Pages
        self.stack = QStackedWidget()
        main_layout.addWidget(self.stack, stretch=1)

        # Page 0: Courses Ledger Widget
        self.courses_widget = CoursesWidget()
        self.courses_widget.course_activated.connect(self._on_course_activated_from_ledger)
        self.courses_widget.course_updated.connect(self._on_course_updated_from_ledger)
        self.courses_widget.course_reschedule_requested.connect(self._reschedule_course)
        self.stack.addWidget(self.courses_widget)

        # Page 1: Explorer View Container (Graph View + Search & Side Controls)
        explorer_container = QWidget()
        explorer_vbox = QVBoxLayout(explorer_container)
        explorer_vbox.setContentsMargins(0, 0, 0, 0)
        explorer_vbox.setSpacing(0)

        # Explorer Top Filter & Navigation Bar
        explorer_filter_bar = QHBoxLayout()
        explorer_filter_bar.setContentsMargins(12, 6, 12, 6)
        explorer_filter_bar.setSpacing(8)

        self.txt_graph_search = QLineEdit()
        self.txt_graph_search.setPlaceholderText("🔍 Search notes by title, tags, formula or content...")
        self.txt_graph_search.setClearButtonEnabled(True)
        self.txt_graph_search.textChanged.connect(self._on_graph_search_changed)
        explorer_filter_bar.addWidget(self.txt_graph_search, stretch=2)

        self.lbl_search_count = QLabel("")
        self.lbl_search_count.setStyleSheet("font-size: 12px; color: #94a3b8;")
        explorer_filter_bar.addWidget(self.lbl_search_count)

        btn_fit = QPushButton("⛶ Fit View")
        btn_fit.setToolTip("Fit all nodes neatly in the viewport")
        btn_fit.clicked.connect(lambda: self.graph_view.fit_all())
        explorer_filter_bar.addWidget(btn_fit)

        btn_zoom_in = QPushButton("🔍+")
        btn_zoom_in.setToolTip("Zoom In")
        btn_zoom_in.clicked.connect(lambda: self.graph_view.zoom_in())
        explorer_filter_bar.addWidget(btn_zoom_in)

        btn_zoom_out = QPushButton("🔍-")
        btn_zoom_out.setToolTip("Zoom Out")
        btn_zoom_out.clicked.connect(lambda: self.graph_view.zoom_out())
        explorer_filter_bar.addWidget(btn_zoom_out)

        btn_zoom_reset = QPushButton("1:1")
        btn_zoom_reset.setToolTip("Reset Zoom to 100%")
        btn_zoom_reset.clicked.connect(lambda: self.graph_view.zoom_reset())
        explorer_filter_bar.addWidget(btn_zoom_reset)

        btn_due_forecast = QPushButton("📅 Forecast")
        btn_due_forecast.setToolTip("View forecasted due cards across future dates")
        btn_due_forecast.clicked.connect(self._open_due_forecast_dialog)
        explorer_filter_bar.addWidget(btn_due_forecast)

        explorer_vbox.addLayout(explorer_filter_bar)

        # Explorer Graph Canvas + ToolBar
        explorer_canvas_layout = QHBoxLayout()
        explorer_canvas_layout.setContentsMargins(0, 0, 0, 0)
        explorer_canvas_layout.setSpacing(0)

        self.graph_view = GraphWidget(self.notes, self.edges, scheduler_manager=self.scheduler_manager)
        self.graph_view.signals.note_selected_for_review.connect(self.start_note_review)
        self.graph_view.signals.note_edit_requested.connect(self._edit_note_dialog)
        self.graph_view.signals.note_info_requested.connect(self._open_note_info_dialog)
        self.graph_view.signals.note_reschedule_requested.connect(self._reschedule_note)
        self.graph_view.signals.note_force_review_requested.connect(self._force_review_note)
        self.graph_view.signals.note_delete_prereqs_requested.connect(self._delete_prereqs_dialog)
        self.graph_view.signals.note_delete_requested.connect(self._delete_note_dialog)
        self.graph_view.signals.prereq_edge_created.connect(self._on_prereq_edge_created)

        explorer_canvas_layout.addWidget(self.graph_view, stretch=1)

        # Explorer Side ToolBar
        explorer_toolbar = QToolBar("Explorer Controls")
        explorer_toolbar.setOrientation(Qt.Vertical)
        explorer_toolbar.setIconSize(QSize(18, 18))

        act_add_note = QAction("+ New Note", self)
        act_add_note.triggered.connect(self._create_new_note)
        explorer_toolbar.addAction(act_add_note)

        act_auto_layout = QAction("⚡ Auto Layout", self)
        act_auto_layout.triggered.connect(self._auto_arrange_graph)
        explorer_toolbar.addAction(act_auto_layout)

        self.btn_snap_toggle = QPushButton("🧲 Snapping Off")
        self.btn_snap_toggle.setCheckable(True)
        self.btn_snap_toggle.setStyleSheet("background-color: #1e293b; color: #94a3b8; padding: 6px 10px; font-weight: bold; border-radius: 6px;")
        self.btn_snap_toggle.toggled.connect(self._on_snap_toggled)
        explorer_toolbar.addWidget(self.btn_snap_toggle)

        act_cram = QAction("⚡ Review Due", self)
        act_cram.triggered.connect(self._start_global_review)
        explorer_toolbar.addAction(act_cram)

        act_save = QAction("💾 Save", self)
        act_save.triggered.connect(self.save_data)
        explorer_toolbar.addAction(act_save)

        explorer_canvas_layout.addWidget(explorer_toolbar)
        explorer_vbox.addLayout(explorer_canvas_layout, stretch=1)

        self.stack.addWidget(explorer_container)

        # Page 2: Review Window
        self.review_view = ReviewWidget(self.scheduler_manager)
        self.review_view.back_to_graph_requested.connect(lambda: self.tab_bar.setCurrentIndex(1))
        self.review_view.rated.connect(self._on_card_rated)
        self.review_view.undo_requested.connect(self._on_undo_rating_requested)
        self.stack.addWidget(self.review_view)

        # Page 3: Stats View
        self.stats_widget = StatsWidget(self.scheduler_manager)
        self.stack.addWidget(self.stats_widget)

        # Set default tab to Explorer (1)
        self.tab_bar.setCurrentIndex(1)
        self._update_title()

    def _populate_themes(self):
        tm = ThemeManager.get_instance()
        available = tm.get_available_themes()
        self.combo_theme.blockSignals(True)
        self.combo_theme.clear()
        selected_idx = 0
        for idx, t in enumerate(available):
            self.combo_theme.addItem(t["name"], t["id"])
            if t["id"] == tm.active_theme_id:
                selected_idx = idx
        self.combo_theme.setCurrentIndex(selected_idx)
        self.combo_theme.blockSignals(False)

    def _on_theme_selected(self, index: int):
        theme_id = self.combo_theme.currentData()
        if theme_id:
            ThemeManager.get_instance().set_theme(theme_id, QApplication.instance())

    def _on_graph_search_changed(self, text: str):
        count = self.graph_view.highlight_search(text)
        if text.strip():
            self.lbl_search_count.setText(f"{count} match(es)")
        else:
            self.lbl_search_count.setText("")

    def _open_due_forecast_dialog(self):
        if not self.current_course:
            return
        dlg = DueForecastDialog(self.current_course, self.scheduler_manager, parent=self)
        dlg.exec()

    def _on_ledger_tab_changed(self, index: int):
        self.stack.setCurrentIndex(index)
        if index == 0:
            self.courses_widget.refresh_tree(self.current_course.name if self.current_course else "")
        elif index == 1:
            if self.current_course:
                try:
                    self.current_course = course_storage.load_course(self.current_course.name, self.current_course.folder_path)
                    self.graph_view.load_graph(self.notes, self.edges)
                except Exception as e:
                    print(f"Warning reloading active course: {e}")
            else:
                self.graph_view.refresh_nodes()
        elif index == 2:
            if not self.current_review_queue and not self.current_review_note:
                self.review_view.show_empty_session()
        elif index == 3:
            if self.current_course:
                self.stats_widget.load_course_stats(self.current_course)

    def _on_course_updated_from_ledger(self, course_name: str, folder_path: str):
        if self.current_course and self.current_course.name == course_name:
            try:
                self.current_course = course_storage.load_course(course_name, folder_path)
                self.graph_view.load_graph(self.notes, self.edges)
            except Exception as e:
                print(f"Error updating active course after disk modification: {e}")

    def _on_course_activated_from_ledger(self, course_name: str, folder_path: str):
        if self.current_course and self.current_course.name != course_name:
            self.save_data(silent=True)

        try:
            self.current_course = course_storage.load_course(course_name, folder_path)
            self.graph_view.load_graph(self.notes, self.edges)
            self.lbl_active_course_badge.setText(f"Active: {self.current_course.name}")
            self._update_title()
            self.tab_bar.setCurrentIndex(1)
        except Exception as e:
            QMessageBox.critical(self, "Error Loading Course", f"Failed to load course '{course_name}': {e}")

    def start_note_review(self, note: NoteNode):
        """Start or queue a review session for a note."""
        if not note.cards:
            QMessageBox.information(self, "No Cards to Review", f"Note '{note.title}' does not contain any cards. Please edit the note to add cards.")
            return

        self._reset_session_metrics()

        if note.is_serial_sequence_single():
            now_dt = datetime.now(timezone.utc)
            first_due_idx = 0
            for idx, c in enumerate(note.cards):
                if c.fsrs_card.last_review is None or c.is_due():
                    first_due_idx = idx
                    break
            else:
                if note.cards:
                    first_due_idx = min(range(len(note.cards)), key=lambda i: self.scheduler_manager.get_card_retrievability(note.cards[i], now_dt))

            due_queue = [c for c in note.cards[first_due_idx:] if (c.fsrs_card.last_review is None or c.is_due())]
            if not due_queue and note.cards:
                due_queue = [note.cards[first_due_idx]]

            self.current_review_note = note
            self.current_review_queue = list(due_queue)
            self.serial_past_steps = list(note.cards[:first_due_idx])
            self.tab_bar.setCurrentIndex(2)
            self._next_review_card()
            return

        if note.is_serial_sequence_full():
            self.current_review_note = note
            self.current_review_queue = list(note.cards)
            self.serial_past_steps = []
            self.tab_bar.setCurrentIndex(2)
            self._next_review_card()
            return

        now_dt = datetime.now(timezone.utc)
        sorted_cards = sorted(note.cards, key=lambda c: self.scheduler_manager.get_card_retrievability(c, now_dt))
        
        cards_to_review = []
        prod_r = 1.0
        for c in sorted_cards:
            prod_r *= self.scheduler_manager.get_card_retrievability(c, now_dt)

        if prod_r <= note.desired_retention or any(c.fsrs_card.last_review is None for c in note.cards):
            accum_prod = 1.0
            for c in sorted_cards:
                cards_to_review.append(c)
                if c.fsrs_card.last_review is not None:
                    sim_prod = accum_prod * 1.0
                    remaining_prod = 1.0
                    for rem_c in sorted_cards[len(cards_to_review):]:
                        remaining_prod *= self.scheduler_manager.get_card_retrievability(rem_c, now_dt)
                    if sim_prod * remaining_prod >= note.desired_retention:
                        break

        if not cards_to_review:
            cards_to_review = note.cards

        self.current_review_note = note
        self.current_review_queue = list(cards_to_review)
        self.serial_past_steps = []
        self.tab_bar.setCurrentIndex(2)
        self._next_review_card()

    def _force_review_note(self, note: NoteNode):
        if not note.cards:
            QMessageBox.information(self, "No Cards", f"Note '{note.title}' contains no cards to review.")
            return

        self._reset_session_metrics()
        self.current_review_note = note
        self.current_review_queue = list(note.cards)
        self.serial_past_steps = []
        self.tab_bar.setCurrentIndex(2)
        self._next_review_card()

    def _start_global_review(self):
        all_due = []
        for note in self.notes:
            if note.is_due(self.scheduler_manager):
                all_due.extend(note.cards)
        
        if not all_due:
            QMessageBox.information(self, "All Complete", f"🎉 Great job! No notes are currently due for review in '{self.current_course.name}'.")
            return

        self._reset_session_metrics()
        self.current_review_note = None
        self.current_review_queue = all_due
        self.serial_past_steps = []
        self.tab_bar.setCurrentIndex(2)
        self._next_review_card()

    def _reset_session_metrics(self):
        self.review_undo_stack.clear()
        self.session_cards_reviewed = 0
        self.session_ratings_count = {1: 0, 2: 0, 3: 0, 4: 0}
        self.session_start_time = datetime.now()
        self.review_view.set_undo_available(False)

    def _open_scratchbook_dialog(self):
        if not hasattr(self, "scratchbook_window") or self.scratchbook_window is None or not self.scratchbook_window.isVisible():
            self.scratchbook_window = ScratchbookDialog(self)
            self.scratchbook_window.setWindowModality(Qt.NonModal)
            self.scratchbook_window.show()
        else:
            self.scratchbook_window.show()
            self.scratchbook_window.raise_()
            self.scratchbook_window.activateWindow()

    def _next_review_card(self):
        self.review_view.set_undo_available(len(self.review_undo_stack) > 0)

        if not self.current_review_queue:
            self.review_view.show_empty_session()
            self.current_review_note = None
            
            # Show summary dialog
            duration = int((datetime.now() - self.session_start_time).total_seconds()) if self.session_start_time else 0
            if self.session_cards_reviewed > 0:
                dlg = ReviewSummaryDialog(self.session_cards_reviewed, self.session_ratings_count, duration, parent=self)
                dlg.exec()
            else:
                QMessageBox.information(self, "Session Complete", "✓ You have completed all due cards in this session!")

            self.save_data(silent=True)
            self.tab_bar.setCurrentIndex(1)
            return

        current_card = self.current_review_queue[0]
        if self.current_review_note and self.current_review_note.is_serial_sequence():
            step_idx = len(self.serial_past_steps) + 1
            total_steps = len(self.current_review_note.cards)
            joint_r = self.current_review_note.get_joint_retention(self.scheduler_manager)
            seq_info = {
                "step_idx": step_idx,
                "total_steps": total_steps,
                "past_steps": self.serial_past_steps,
                "note_title": self.current_review_note.title,
                "joint_retention": joint_r
            }
            self.review_view.load_object(current_card, seq_info)
        else:
            self.review_view.load_object(current_card)

    def _on_card_rated(self, rating: Rating):
        if not self.current_review_queue:
            return

        rated_card = self.current_review_queue[0]
        r_val = int(rating.value) if hasattr(rating, "value") else int(rating)

        # Snapshot for undo
        undo_entry = {
            "card": rated_card,
            "fsrs_dict": rated_card.fsrs_card.to_dict() if hasattr(rated_card.fsrs_card, "to_dict") else None,
            "serial_past_steps": list(self.serial_past_steps),
            "queue_item": rated_card
        }
        self.review_undo_stack.append(undo_entry)

        fc = rated_card.fsrs_card
        log_rec = ReviewLogRecord(
            card_id=rated_card.item_id,
            rating=r_val,
            review_time=datetime.now(timezone.utc).isoformat(),
            elapsed_days=getattr(fc, "elapsed_days", 0),
            scheduled_days=getattr(fc, "scheduled_days", 0),
            state=getattr(fc.state, "value", 0) if hasattr(fc, "state") else 0,
            stability=getattr(fc, "stability", None),
            difficulty=getattr(fc, "difficulty", None)
        )
        course_storage.save_review_log(self.current_course.name, log_rec)
        self.save_data(silent=True)

        if self.current_course:
            self.stats_widget.load_course_stats(self.current_course)

        self.session_cards_reviewed += 1
        self.session_ratings_count[r_val] = self.session_ratings_count.get(r_val, 0) + 1

        if self.current_review_note and self.current_review_note.is_serial_sequence():
            if rating == Rating.Again:
                pass
            else:
                self.current_review_queue.pop(0)
                self.serial_past_steps.append(rated_card)
        else:
            self.current_review_queue.pop(0)

        self._next_review_card()

    def _on_undo_rating_requested(self):
        """Revert last rating action, restore previous card state, and push back to review queue."""
        if not self.review_undo_stack:
            return

        last_action = self.review_undo_stack.pop()
        card = last_action["card"]
        prev_fsrs = last_action["fsrs_dict"]

        if prev_fsrs:
            card.fsrs_card = FSRSCard.from_dict(prev_fsrs)

        self.serial_past_steps = last_action.get("serial_past_steps", [])

        # Re-insert card at head of queue if not already there
        if not self.current_review_queue or self.current_review_queue[0] != card:
            self.current_review_queue.insert(0, card)

        self.session_cards_reviewed = max(0, self.session_cards_reviewed - 1)
        self.save_data(silent=True)

        # Reload card
        self._next_review_card()
        QMessageBox.information(self, "Rating Reverted", f"✓ Restored card '{card.get_title()}' to previous state.")

    def _reschedule_note(self, note: NoteNode):
        if not self.current_course: return
        logs = course_storage.load_review_logs(self.current_course.name)
        c_cnt, l_cnt = self.scheduler_manager.reschedule_note(note, logs)
        self.save_data(silent=True)
        self.graph_view.refresh_nodes()
        QMessageBox.information(
            self,
            "Reschedule Completed",
            f"✓ Successfully recalculated FSRS state for note '{note.title}'!\n"
            f"• Cards recalculated: {c_cnt}\n"
            f"• Historical review logs replayed: {l_cnt}"
        )

    def _reschedule_course(self, course_name: str, folder_path: str):
        try:
            course = course_storage.load_course(course_name, folder_path)
            logs = course_storage.load_review_logs(course_name)
            c_cnt, l_cnt = self.scheduler_manager.reschedule_course(course, logs)
            course_storage.save_course(course)
            if self.current_course and self.current_course.name == course_name:
                self.current_course = course
                self.graph_view.load_graph(self.notes, self.edges)
            QMessageBox.information(
                self,
                "Reschedule Completed",
                f"✓ Successfully recalculated FSRS state for course '{course_name}'!\n"
                f"• Total Cards recalculated: {c_cnt}\n"
                f"• Total Historical review logs replayed: {l_cnt}"
            )
        except Exception as e:
            QMessageBox.critical(self, "Reschedule Error", f"Failed to reschedule course: {e}")

    def _create_new_note(self):
        title, ok = QInputDialog.getText(self, "New Note Node", "Enter Note Title:")
        if ok and title.strip():
            new_note = NoteNode(title=title.strip(), x=0, y=0)
            self.notes.append(new_note)
            self.graph_view.load_graph(self.notes, self.edges)
            self.save_data(silent=True)
            self._edit_note_dialog(new_note)

    def _edit_note_dialog(self, note: NoteNode):
        if not hasattr(self, "active_note_editors"):
            self.active_note_editors = {}

        if note.note_id in self.active_note_editors and self.active_note_editors[note.note_id].isVisible():
            self.active_note_editors[note.note_id].show()
            self.active_note_editors[note.note_id].raise_()
            self.active_note_editors[note.note_id].activateWindow()
            return

        dialog = NodeEditorDialog(note, self)
        dialog.setWindowModality(Qt.NonModal)

        def on_saved():
            self.graph_view.load_graph(self.notes, self.edges)
            self.save_data(silent=True)

        dialog.accepted.connect(on_saved)
        self.active_note_editors[note.note_id] = dialog
        dialog.show()
        dialog.raise_()
        dialog.activateWindow()

    def _open_note_info_dialog(self, note: NoteNode):
        if not self.current_course: return
        dialog = RetrievabilityPlotDialog(self.current_course, self.scheduler_manager, initial_note=note, parent=self)
        dialog.exec()

    def _delete_note_dialog(self, note: NoteNode):
        reply = QMessageBox.question(self, "Confirm Delete Note", f"Are you sure you want to delete note '{note.title}' and all its connections?",
                                     QMessageBox.Yes | QMessageBox.No, QMessageBox.No)
        if reply == QMessageBox.Yes:
            self.current_course.notes = [n for n in self.notes if n.note_id != note.note_id]
            self.current_course.edges = [e for e in self.edges if e.source_id != note.note_id and e.target_id != note.note_id]
            self.graph_view.load_graph(self.notes, self.edges)
            self.save_data(silent=True)

    def _delete_prereqs_dialog(self, note: NoteNode):
        attached = [e for e in self.edges if e.source_id == note.note_id or e.target_id == note.note_id]
        if not attached:
            QMessageBox.information(self, "No Prerequisites", f"Note '{note.title}' has no attached prerequisite connections.")
            return

        notes_map = {n.note_id: n for n in self.notes}
        dialog = DeletePrereqsDialog(note, self.edges, notes_map, self)
        if dialog.exec():
            edges_to_remove = set(dialog.selected_edges_to_delete)
            self.current_course.edges = [e for e in self.edges if e not in edges_to_remove]
            self.graph_view.load_graph(self.notes, self.edges)
            self.save_data(silent=True)
            QMessageBox.information(self, "Prerequisites Removed", f"✓ Removed {len(edges_to_remove)} prerequisite connection(s).")

    def _on_snap_toggled(self, checked: bool):
        self.graph_view.set_snapping_enabled(checked)
        if checked:
            self.btn_snap_toggle.setText("🧲 Snapping ON")
            self.btn_snap_toggle.setStyleSheet("background-color: #10b981; color: white; padding: 6px 10px; font-weight: bold; border-radius: 6px;")
        else:
            self.btn_snap_toggle.setText("🧲 Snapping Off")
            self.btn_snap_toggle.setStyleSheet("background-color: #1e293b; color: #94a3b8; padding: 6px 10px; font-weight: bold; border-radius: 6px;")

    def _on_prereq_edge_created(self, source_id: str, target_id: str):
        if any(e.source_id == source_id and e.target_id == target_id for e in self.edges):
            return
        new_edge = NoteEdge(source_id, target_id, "Prerequisite")
        self.edges.append(new_edge)
        self.graph_view.load_graph(self.notes, self.edges)
        self.save_data(silent=True)

    def _auto_arrange_graph(self):
        self.graph_view.auto_arrange()

    def save_data(self, silent: bool = False):
        if self.current_course:
            course_storage.save_course(self.current_course)
            if not silent:
                QMessageBox.information(
                    self, 
                    "Course Saved", 
                    f"Saved '{self.current_course.name}' to:\n• Courses/{self.current_course.name}.json\n• scheduling/{self.current_course.name}_scheduling.json"
                )

    def closeEvent(self, event):
        if self.current_course:
            self.save_data(silent=True)
        event.accept()


if __name__ == "__main__":
    # Platform-specific app ID for Windows taskbar grouping
    if sys.platform == 'win32':
        myappid = 'morphism.srs.plus.app.1.0'
        try:
            ctypes.windll.shell32.SetCurrentProcessExplicitAppUserModelID(myappid)
        except Exception:
            pass

    app = QApplication(sys.argv)
    
    # Linux Desktop Entry support (Wayland & X11)
    if hasattr(app, "setDesktopFileName"):
        app.setDesktopFileName("morphism-srs-plus.desktop")

    # Apply saved JSON Theme
    tm = ThemeManager.get_instance()
    tm.apply_theme_to_app(app)

    # Window Icon
    icon_file = ICON_PNG if os.path.exists(ICON_PNG) else (ICON_ICO if os.path.exists(ICON_ICO) else None)
    if icon_file:
        app.setWindowIcon(QIcon(icon_file))

    window = MainWindow()
    window.show()
    sys.exit(app.exec())
