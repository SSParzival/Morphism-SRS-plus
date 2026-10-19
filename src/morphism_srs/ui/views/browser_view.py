from __future__ import annotations

import json
import sqlite3

from PySide6.QtCore import QAbstractTableModel, QModelIndex, QUrl, Qt
from PySide6.QtWidgets import (
    QFrame,
    QHBoxLayout,
    QHeaderView,
    QInputDialog,
    QLabel,
    QPushButton,
    QSplitter,
    QTableView,
    QTreeWidget,
    QTreeWidgetItem,
    QVBoxLayout,
    QWidget,
)

from morphism_srs.config import AppConfig
from morphism_srs.controllers.browser_controller import BrowserController
from morphism_srs.controllers.event_bus import EventBus
from morphism_srs.controllers.review_controller import CustomStudyConfig, ReviewController
from morphism_srs.domain.enums import CardState
from morphism_srs.domain.scheduler_engine import SchedulerEngine
from morphism_srs.storage.media_vault import MediaVault
from morphism_srs.storage.repositories.browser_repo import BrowserRowItem
from morphism_srs.storage.repositories.course_repo import CourseRepository
from morphism_srs.storage.repositories.note_repo import NoteRepository
from morphism_srs.theming.delegates import set_widget_props
from morphism_srs.ui.components.search_bar import DebouncedSearchBar
from morphism_srs.ui.dialogs.node_editor_dialog import NodeEditorDialog
from morphism_srs.ui.window_sizing import configure_splitter, wrap_in_scroll_area
from morphism_srs.web_engine.web_profile import WebEngineProfileManager


class BrowserTableModel(QAbstractTableModel):
    """Virtual table model over BrowserRowItem for instantaneous scrolling over thousands of cards."""

    HEADERS = ["Course", "Note Title", "Mode", "Step", "State", "R(t)", "Stability", "Due Date", "Lapses", "Tags"]

    def __init__(self, parent: QWidget | None = None) -> None:
        super().__init__(parent)
        self._rows: list[BrowserRowItem] = []

    def set_rows(self, rows: list[BrowserRowItem]) -> None:
        self.beginResetModel()
        self._rows = rows
        self.endResetModel()

    def row_at(self, row_idx: int) -> BrowserRowItem | None:
        if 0 <= row_idx < len(self._rows):
            return self._rows[row_idx]
        return None

    def rowCount(self, parent: QModelIndex = QModelIndex()) -> int:
        return 0 if parent.isValid() else len(self._rows)

    def columnCount(self, parent: QModelIndex = QModelIndex()) -> int:
        return 0 if parent.isValid() else len(self.HEADERS)

    def headerData(self, section: int, orientation: Qt.Orientation, role: int = Qt.ItemDataRole.DisplayRole):
        if role == Qt.ItemDataRole.DisplayRole and orientation == Qt.Orientation.Horizontal:
            if 0 <= section < len(self.HEADERS):
                return self.HEADERS[section]
        return None

    def data(self, index: QModelIndex, role: int = Qt.ItemDataRole.DisplayRole):
        if not index.isValid() or not (0 <= index.row() < len(self._rows)):
            return None
        r = self._rows[index.row()]
        col = index.column()
        if role == Qt.ItemDataRole.DisplayRole:
            if col == 0:
                return r.course_name
            if col == 1:
                return r.note_title
            if col == 2:
                return r.review_mode.upper()
            if col == 3:
                return f"#{r.step_order + 1}" + (f" ({r.card_title})" if r.card_title else "")
            if col == 4:
                return "SUSPENDED" if r.is_suspended else CardState(r.state).name
            if col == 5:
                if r.state == 0 or r.stability is None or r.last_review_at is None:
                    return "—"
                from morphism_srs.domain.models import CardScheduleModel
                sched = CardScheduleModel(
                    card_id=r.card_id,
                    state=CardState(r.state),
                    stability=r.stability,
                    last_review_at=r.last_review_at,
                )
                return f"{SchedulerEngine.compute_card_retrievability(sched) * 100:.0f}%"
            if col == 6:
                return f"{r.stability:.1f}d" if r.stability is not None else "—"
            if col == 7:
                return r.due_at[:10] if r.due_at else ""
            if col == 8:
                return str(r.lapses)
            if col == 9:
                return r.tags_csv
        return None


class BrowserView(QWidget):
    """3-Panel Mass Card Browser (Facet Sidebar + FTS5 Search & Virtual Table + Live Inspector/Preview)."""

    FILTER_KIND_ROLE = Qt.ItemDataRole.UserRole
    FILTER_VAL_ROLE = Qt.ItemDataRole.UserRole + 1

    def __init__(
        self,
        conn: sqlite3.Connection,
        config: AppConfig,
        media_vault: MediaVault,
        web_profile: WebEngineProfileManager,
        browser_controller: BrowserController,
        review_controller: ReviewController,
        event_bus: EventBus,
        parent: QWidget | None = None,
    ) -> None:
        super().__init__(parent)
        self.conn = conn
        self.config = config
        self.media_vault = media_vault
        self.web_profile = web_profile
        self.browser_controller = browser_controller
        self.review_controller = review_controller
        self.event_bus = event_bus

        self.course_repo = CourseRepository(conn)
        self.note_repo = NoteRepository(conn)
        self._preview_ready = False

        self._active_course_filter: int | None = None
        self._active_tag_filter: str | None = None
        self._active_state_filter: int | None = None
        self._active_mode_filter: str | None = None
        self._active_suspended_filter: bool | None = None

        self._build_ui()
        self.event_bus.courses_updated.connect(self.refresh_all)
        self.event_bus.notes_updated.connect(lambda _: self.refresh_all())
        self.refresh_all()

    def _build_ui(self) -> None:
        outer = QVBoxLayout(self)
        outer.setContentsMargins(0, 0, 0, 0)

        container = QWidget(self)
        root = QVBoxLayout(container)
        root.setContentsMargins(14, 12, 14, 12)
        root.setSpacing(10)

        # Top Search + Bulk Actions Bar
        top_row = QHBoxLayout()
        self.search_bar = DebouncedSearchBar(
            placeholder='FTS5 Search (e.g. "homotopy", tag:theorem, mode:serial, is:due, prop:lapses>3)...',
            parent=container,
        )
        self.search_bar.search_triggered.connect(lambda _: self.run_search())
        top_row.addWidget(self.search_bar, 1)

        study_sel_btn = QPushButton("Custom Study Selected", container)
        set_widget_props(study_sel_btn, variant="primary")
        study_sel_btn.clicked.connect(self._on_study_selected)
        top_row.addWidget(study_sel_btn)

        tag_btn = QPushButton("+ Tag", container)
        tag_btn.clicked.connect(self._on_bulk_tag)
        top_row.addWidget(tag_btn)

        susp_btn = QPushButton("Toggle Suspend", container)
        susp_btn.clicked.connect(self._on_toggle_suspend)
        top_row.addWidget(susp_btn)

        reset_btn = QPushButton("Reset Schedule", container)
        reset_btn.clicked.connect(self._on_reset_schedule)
        top_row.addWidget(reset_btn)

        root.addLayout(top_row)

        splitter = QSplitter(Qt.Orientation.Horizontal, container)

        # Left Panel: Facet Tree
        self.facet_tree = QTreeWidget(splitter)
        self.facet_tree.setMinimumWidth(180)
        self.facet_tree.setMinimumHeight(260)
        self.facet_tree.setHeaderLabel("Filters")
        self.facet_tree.itemClicked.connect(self._on_facet_clicked)

        # Center Panel: Virtual TableView
        center_widget = QWidget(splitter)
        center_layout = QVBoxLayout(center_widget)
        center_layout.setContentsMargins(4, 0, 4, 0)
        self.count_label = QLabel("0 cards matched", center_widget)
        set_widget_props(self.count_label, role="muted")
        center_layout.addWidget(self.count_label)

        self.table_model = BrowserTableModel(center_widget)
        self.table_view = QTableView(center_widget)
        self.table_view.setMinimumWidth(300)
        self.table_view.setMinimumHeight(240)
        self.table_view.setModel(self.table_model)
        self.table_view.setSelectionBehavior(QTableView.SelectionBehavior.SelectRows)
        self.table_view.setSelectionMode(QTableView.SelectionMode.ExtendedSelection)
        self.table_view.setAlternatingRowColors(True)
        self.table_view.horizontalHeader().setSectionResizeMode(1, QHeaderView.ResizeMode.Stretch)
        self.table_view.selectionModel().selectionChanged.connect(self._on_row_selected)
        center_layout.addWidget(self.table_view, 1)

        # Right Panel: Live Inspector & Jump to Graph
        right_frame = QFrame(splitter)
        set_widget_props(right_frame, role="panel")
        right_layout = QVBoxLayout(right_frame)
        right_layout.setContentsMargins(8, 8, 8, 8)

        insp_top = QHBoxLayout()
        insp_lbl = QLabel("Card Inspector", right_frame)
        set_widget_props(insp_lbl, role="subtitle")
        insp_top.addWidget(insp_lbl)
        insp_top.addStretch(1)

        edit_btn = QPushButton("Edit Note...", right_frame)
        edit_btn.clicked.connect(self._on_edit_selected_note)
        insp_top.addWidget(edit_btn)

        jump_btn = QPushButton("Show in Graph", right_frame)
        set_widget_props(jump_btn, variant="ghost")
        jump_btn.clicked.connect(self._on_jump_to_graph)
        insp_top.addWidget(jump_btn)
        right_layout.addLayout(insp_top)

        self.web_view = self.web_profile.create_web_view(right_frame)
        self.web_view.setMinimumHeight(220)
        self.web_view.loadFinished.connect(self._on_preview_loaded)
        self.web_view.setUrl(QUrl("morphism://app/html/preview.html"))
        right_layout.addWidget(self.web_view, 1)

        splitter.addWidget(self.facet_tree)
        splitter.addWidget(center_widget)
        splitter.addWidget(right_frame)
        configure_splitter(splitter, min_sizes=[180, 320, 260], initial_sizes=[200, 440, 300])
        root.addWidget(splitter, 1)

        scroll = wrap_in_scroll_area(container, self, min_width=760, min_height=460)
        outer.addWidget(scroll)

    def refresh_all(self) -> None:
        self._rebuild_facets()
        self.run_search()

    def _rebuild_facets(self) -> None:
        self.facet_tree.clear()

        all_item = QTreeWidgetItem(["All Cards"])
        all_item.setData(0, self.FILTER_KIND_ROLE, "all")
        self.facet_tree.addTopLevelItem(all_item)

        states_root = QTreeWidgetItem(["Card State"])
        for label, val in [
            ("New", 0),
            ("Learning", 1),
            ("Review", 2),
            ("Relearning", 3),
            ("Suspended", "suspended"),
        ]:
            it = QTreeWidgetItem([label])
            it.setData(0, self.FILTER_KIND_ROLE, "state")
            it.setData(0, self.FILTER_VAL_ROLE, val)
            states_root.addChild(it)
        self.facet_tree.addTopLevelItem(states_root)
        states_root.setExpanded(True)

        modes_root = QTreeWidgetItem(["Review Mode"])
        for label, mval in [
            ("Standard (Rectangle)", "standard"),
            ("Serial (Diamond)", "serial"),
            ("Cloze (Ellipse)", "cloze"),
        ]:
            it = QTreeWidgetItem([label])
            it.setData(0, self.FILTER_KIND_ROLE, "mode")
            it.setData(0, self.FILTER_VAL_ROLE, mval)
            modes_root.addChild(it)
        self.facet_tree.addTopLevelItem(modes_root)
        modes_root.setExpanded(True)

        courses_root = QTreeWidgetItem(["Courses"])
        for c in self.course_repo.list_all():
            it = QTreeWidgetItem([c.name])
            it.setData(0, self.FILTER_KIND_ROLE, "course")
            it.setData(0, self.FILTER_VAL_ROLE, c.id)
            courses_root.addChild(it)
        self.facet_tree.addTopLevelItem(courses_root)
        courses_root.setExpanded(True)

        tags_root = QTreeWidgetItem(["Used Tags"])
        used_rows = self.conn.execute(
            """
            SELECT DISTINCT t.name
            FROM tags t
            JOIN note_tags nt ON nt.tag_id = t.id
            ORDER BY t.name ASC LIMIT 200;
            """
        ).fetchall()
        for r in used_rows:
            tname = str(r["name"])
            it = QTreeWidgetItem([f"#{tname}"])
            it.setData(0, self.FILTER_KIND_ROLE, "tag")
            it.setData(0, self.FILTER_VAL_ROLE, tname)
            tags_root.addChild(it)
        self.facet_tree.addTopLevelItem(tags_root)
        tags_root.setExpanded(True)

    def _on_facet_clicked(self, item: QTreeWidgetItem, _col: int) -> None:
        kind = item.data(0, self.FILTER_KIND_ROLE)
        val = item.data(0, self.FILTER_VAL_ROLE)

        self._active_course_filter = None
        self._active_tag_filter = None
        self._active_state_filter = None
        self._active_mode_filter = None
        self._active_suspended_filter = None

        if kind == "course" and val is not None:
            self._active_course_filter = int(val)
        elif kind == "tag" and val is not None:
            self._active_tag_filter = str(val)
        elif kind == "state":
            if val == "suspended":
                self._active_suspended_filter = True
            elif val is not None:
                self._active_state_filter = int(val)
        elif kind == "mode" and val is not None:
            self._active_mode_filter = str(val)

        self.run_search()

    def run_search(self) -> None:
        rows = self.browser_controller.search(
            query_text=self.search_bar.text(),
            course_id=self._active_course_filter,
            tag_filter=self._active_tag_filter,
            state_filter=self._active_state_filter,
            review_mode_filter=self._active_mode_filter,
            suspended_filter=self._active_suspended_filter,
        )
        self.table_model.set_rows(rows)
        self.count_label.setText(f"{len(rows)} card(s) matched")
        if rows:
            self.table_view.selectRow(0)

    def _selected_rows(self) -> list[BrowserRowItem]:
        indexes = self.table_view.selectionModel().selectedRows()
        items: list[BrowserRowItem] = []
        for idx in indexes:
            r = self.table_model.row_at(idx.row())
            if r is not None:
                items.append(r)
        return items

    def _on_preview_loaded(self, ok: bool) -> None:
        self._preview_ready = ok
        if ok:
            self._on_row_selected()

    def _on_row_selected(self, *_args) -> None:
        if not self._preview_ready:
            return
        sel = self._selected_rows()
        if not sel:
            return
        r = sel[0]
        payload = {
            "title": r.note_title,
            "review_mode": r.review_mode,
            "tags": [t.strip() for t in r.tags_csv.split(",") if t.strip()],
            "premise_html": "",
            "cards": [
                {
                    "title": r.card_title or f"Step {r.step_order + 1}",
                    "front_html": r.front_html,
                    "back_html": r.back_html,
                    "hint_html": "",
                }
            ],
        }
        self.web_view.page().runJavaScript(
            f"if (window.MorphismPreview) {{ window.MorphismPreview.renderPreview({json.dumps(payload)}); }}"
        )

    def _on_study_selected(self) -> None:
        sel = self._selected_rows()
        if not sel:
            return
        note_ids = sorted({r.note_id for r in sel})
        cfg = CustomStudyConfig(note_ids=note_ids, only_due_or_new=False, sort_criterion="topological_due")
        if self.review_controller.start_custom_study(cfg) > 0:
            self.event_bus.navigate_to_tab.emit("review")

    def _on_bulk_tag(self) -> None:
        sel = self._selected_rows()
        if not sel:
            return
        tag, ok = QInputDialog.getText(self, "Add Tag to Selected Notes", "Tag name:")
        if ok and tag.strip():
            note_ids = sorted({r.note_id for r in sel})
            self.browser_controller.add_tag_to_notes(note_ids, tag.strip())
            self.refresh_all()

    def _on_toggle_suspend(self) -> None:
        sel = self._selected_rows()
        if not sel:
            return
        target_susp = not sel[0].is_suspended
        self.browser_controller.suspend_cards([r.card_id for r in sel], target_susp)
        self.run_search()

    def _on_reset_schedule(self) -> None:
        sel = self._selected_rows()
        if not sel:
            return
        self.browser_controller.reset_cards([r.card_id for r in sel])
        self.run_search()

    def _on_edit_selected_note(self) -> None:
        sel = self._selected_rows()
        if not sel:
            return
        r = sel[0]
        note = self.note_repo.get_by_id(r.note_id, include_children=True)
        if note is None:
            return
        dlg = NodeEditorDialog(
            conn=self.conn,
            config=self.config,
            media_vault=self.media_vault,
            web_profile=self.web_profile,
            course_id=r.course_id,
            note=note,
            parent=self,
        )
        if dlg.exec():
            self.refresh_all()

    def _on_jump_to_graph(self) -> None:
        sel = self._selected_rows()
        if not sel:
            return
        r = sel[0]
        self.event_bus.open_node_in_explorer.emit(r.course_id, r.note_id)
        self.event_bus.navigate_to_tab.emit("explorer")
