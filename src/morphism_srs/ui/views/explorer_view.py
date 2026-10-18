from __future__ import annotations

import math
import sqlite3

from PySide6.QtCore import QPointF, QRectF, Qt
from PySide6.QtGui import (
    QBrush,
    QColor,
    QFont,
    QKeyEvent,
    QPainter,
    QPainterPath,
    QPen,
    QPolygonF,
    QWheelEvent,
)
from PySide6.QtWidgets import (
    QComboBox,
    QFrame,
    QGraphicsItem,
    QGraphicsPathItem,
    QGraphicsScene,
    QGraphicsView,
    QHBoxLayout,
    QInputDialog,
    QLabel,
    QMenu,
    QPushButton,
    QVBoxLayout,
    QWidget,
)

from morphism_srs.config import AppConfig
from morphism_srs.controllers.event_bus import EventBus
from morphism_srs.controllers.explorer_controller import ExplorerController
from morphism_srs.controllers.review_controller import CustomStudyConfig, ReviewController
from morphism_srs.domain.enums import NoteReviewMode
from morphism_srs.domain.models import EdgeModel, NoteMetrics, NoteModel
from morphism_srs.storage.media_vault import MediaVault
from morphism_srs.storage.repositories.course_repo import CourseRepository
from morphism_srs.theming.delegates import set_widget_props
from morphism_srs.theming.theme_manager import ThemeManager
from morphism_srs.ui.dialogs.delete_prereqs_dialog import DeleteNoteDialog
from morphism_srs.ui.dialogs.node_editor_dialog import NodeEditorDialog
from morphism_srs.ui.dialogs.retrievability_dialog import RetrievabilityDialog
from morphism_srs.web_engine.web_profile import WebEngineProfileManager


class GraphEdgeItem(QGraphicsPathItem):
    """Directed Bezier edge between two GraphNodeItems with an arrowhead."""

    def __init__(
        self,
        edge_model: EdgeModel,
        source_item: GraphNodeItem,
        target_item: GraphNodeItem,
        theme_manager: ThemeManager,
    ) -> None:
        super().__init__()
        self.edge_model = edge_model
        self.source_item = source_item
        self.target_item = target_item
        self.theme_manager = theme_manager
        self.setZValue(-1.0)
        self.update_position()

    def update_position(self) -> None:
        p1 = self.source_item.pos()
        p2 = self.target_item.pos()
        path = QPainterPath(p1)
        dy = max(40.0, abs(p2.y() - p1.y()) * 0.45)
        c1 = QPointF(p1.x(), p1.y() + dy)
        c2 = QPointF(p2.x(), p2.y() - dy)
        path.cubicTo(c1, c2, p2)
        self.setPath(path)

    def paint(self, painter: QPainter, _option, widget: QWidget | None = None) -> None:
        scale = painter.worldTransform().m11()
        color = self.theme_manager.qcolor("text_muted", "#a6adc8")
        if self.source_item.isSelected() or self.target_item.isSelected():
            color = self.theme_manager.qcolor("accent_primary", "#89b4fa")

        pen = QPen(color, 1.8)
        painter.setPen(pen)
        painter.setBrush(Qt.BrushStyle.NoBrush)

        p1 = self.source_item.pos()
        p2 = self.target_item.pos()
        if scale < 0.35:
            painter.drawLine(p1, p2)
            return

        painter.drawPath(self.path())

        # Draw arrowhead near target boundary
        angle = math.atan2(p2.y() - p1.y(), p2.x() - p1.x())
        tip = QPointF(p2.x() - math.cos(angle) * 32.0, p2.y() - math.sin(angle) * 26.0)
        arrow_size = 9.0
        left_pt = QPointF(
            tip.x() - arrow_size * math.cos(angle - math.pi / 6.0),
            tip.y() - arrow_size * math.sin(angle - math.pi / 6.0),
        )
        right_pt = QPointF(
            tip.x() - arrow_size * math.cos(angle + math.pi / 6.0),
            tip.y() - arrow_size * math.sin(angle + math.pi / 6.0),
        )
        painter.setBrush(QBrush(color))
        painter.drawPolygon(QPolygonF([tip, left_pt, right_pt]))


class GraphNodeItem(QGraphicsItem):
    """
    Shape-coded DAG Node Item:
    - standard -> Rounded Rectangle
    - serial   -> Rhombus / Diamond
    - cloze    -> Circle / Ellipse
    """

    WIDTH = 176.0
    HEIGHT = 76.0

    def __init__(
        self,
        note: NoteModel,
        metrics: NoteMetrics,
        theme_manager: ThemeManager,
        explorer_view: ExplorerView,
    ) -> None:
        super().__init__()
        self.note = note
        self.metrics = metrics
        self.theme_manager = theme_manager
        self.explorer_view = explorer_view
        self.connected_edges: list[GraphEdgeItem] = []

        self.setPos(note.pos_x, note.pos_y)
        self.setFlags(
            QGraphicsItem.GraphicsItemFlag.ItemIsMovable
            | QGraphicsItem.GraphicsItemFlag.ItemIsSelectable
            | QGraphicsItem.GraphicsItemFlag.ItemSendsGeometryChanges
        )
        self.setCacheMode(QGraphicsItem.CacheMode.DeviceCoordinateCache)

    def boundingRect(self) -> QRectF:
        pad = 6.0
        return QRectF(-self.WIDTH / 2 - pad, -self.HEIGHT / 2 - pad, self.WIDTH + pad * 2, self.HEIGHT + pad * 2)

    def shape(self) -> QPainterPath:
        rect = QRectF(-self.WIDTH / 2, -self.HEIGHT / 2, self.WIDTH, self.HEIGHT)
        path = QPainterPath()
        if self.note.review_mode == NoteReviewMode.SERIAL:
            poly = QPolygonF(
                [
                    QPointF(0.0, -self.HEIGHT / 2 - 4.0),
                    QPointF(self.WIDTH / 2 + 8.0, 0.0),
                    QPointF(0.0, self.HEIGHT / 2 + 4.0),
                    QPointF(-self.WIDTH / 2 - 8.0, 0.0),
                ]
            )
            path.addPolygon(poly)
            path.closeSubpath()
        elif self.note.review_mode == NoteReviewMode.CLOZE:
            path.addEllipse(rect)
        else:
            path.addRoundedRect(rect, 10.0, 10.0)
        return path

    def paint(self, painter: QPainter, _option, widget: QWidget | None = None) -> None:
        scale = painter.worldTransform().m11()
        bg_col = self.theme_manager.qcolor("bg_surface_0", "#313244")
        text_col = self.theme_manager.qcolor("text_primary", "#cdd6f4")
        muted_col = self.theme_manager.qcolor("text_muted", "#a6adc8")

        if self.isSelected():
            border_col = self.theme_manager.qcolor("accent_primary", "#89b4fa")
            pen_width = 2.8
        elif self.metrics.due_count > 0:
            border_col = self.theme_manager.qcolor("node_due_border", "#f38ba8")
            pen_width = 2.2
        elif self.metrics.new_count < self.metrics.card_count and self.metrics.card_count > 0:
            border_col = self.theme_manager.qcolor("node_learned_border", "#a6e3a1")
            pen_width = 1.8
        else:
            border_col = self.theme_manager.qcolor("node_new_border", "#585b70")
            pen_width = 1.5

        painter.setRenderHint(QPainter.RenderHint.Antialiasing, True)
        painter.setBrush(QBrush(bg_col))
        painter.setPen(QPen(border_col, pen_width))
        painter.drawPath(self.shape())

        # LOD < 0.35: shape only, skip text
        if scale < 0.35:
            return

        title_rect = QRectF(-self.WIDTH / 2 + 14, -self.HEIGHT / 2 + 10, self.WIDTH - 28, 34)
        font = QFont()
        font.setBold(True)
        font.setPointSize(9)
        painter.setFont(font)
        painter.setPen(text_col)
        elided = painter.fontMetrics().elidedText(self.note.title, Qt.TextElideMode.ElideRight, int(title_rect.width()))
        painter.drawText(title_rect, Qt.AlignmentFlag.AlignCenter, elided)

        if scale >= 0.65:
            sub_rect = QRectF(-self.WIDTH / 2 + 16, 6, self.WIDTH - 32, 22)
            sub_font = QFont()
            sub_font.setPointSize(8)
            painter.setFont(sub_font)
            painter.setPen(muted_col)
            mode_tag = self.note.review_mode.value.upper()
            r_str = f"R_min {int(self.metrics.r_min * 100)}%"
            painter.drawText(sub_rect, Qt.AlignmentFlag.AlignCenter, f"{mode_tag} ({self.metrics.card_count}) • {r_str}")

    def itemChange(self, change: QGraphicsItem.GraphicsItemChange, value):
        if change == QGraphicsItem.GraphicsItemChange.ItemPositionHasChanged:
            for e in self.connected_edges:
                e.update_position()
        return super().itemChange(change, value)

    def mouseDoubleClickEvent(self, event) -> None:
        if self.note.id is not None:
            self.explorer_view.open_note_editor(self.note.id)
        super().mouseDoubleClickEvent(event)


class GraphCanvasView(QGraphicsView):
    """Interactive QGraphicsView supporting RubberBandDrag marquee selection, Middle/Space pan, and Shift+Click edge linking."""

    def __init__(self, scene: QGraphicsScene, explorer_view: ExplorerView) -> None:
        super().__init__(scene, explorer_view)
        self.explorer_view = explorer_view
        self.setRenderHints(QPainter.RenderHint.Antialiasing | QPainter.RenderHint.TextAntialiasing)
        self.setDragMode(QGraphicsView.DragMode.RubberBandDrag)
        self.setTransformationAnchor(QGraphicsView.ViewportAnchor.AnchorUnderMouse)
        self.setViewportUpdateMode(QGraphicsView.ViewportUpdateMode.SmartViewportUpdate)
        self._panning = False
        self._pan_start = QPointF()
        self._drag_start_positions: dict[int, tuple[float, float]] = {}
        self._shift_link_source_id: int | None = None

    def wheelEvent(self, event: QWheelEvent) -> None:
        factor = 1.15 if event.angleDelta().y() > 0 else (1.0 / 1.15)
        curr_scale = self.transform().m11()
        if (curr_scale < 0.15 and factor < 1.0) or (curr_scale > 3.5 and factor > 1.0):
            return
        self.scale(factor, factor)

    def mousePressEvent(self, event) -> None:
        if event.button() == Qt.MouseButton.MiddleButton:
            self._panning = True
            self._pan_start = event.position()
            self.setCursor(Qt.CursorShape.ClosedHandCursor)
            event.accept()
            return

        item = self.itemAt(event.position().toPoint())
        if isinstance(item, GraphNodeItem) and (event.modifiers() & Qt.KeyboardModifier.ShiftModifier):
            if self._shift_link_source_id is None and item.note.id is not None:
                self._shift_link_source_id = item.note.id
                self.explorer_view.event_bus.status_message.emit(
                    f"Linking from '{item.note.title}' — Shift+Click target node to connect prerequisite edge.",
                    4000,
                )
            elif self._shift_link_source_id is not None and item.note.id is not None:
                src_id = self._shift_link_source_id
                self._shift_link_source_id = None
                if src_id != item.note.id:
                    self.explorer_view.create_prerequisite_edge(src_id, item.note.id)
            event.accept()
            return

        self._shift_link_source_id = None
        self._drag_start_positions = {
            it.note.id: (it.pos().x(), it.pos().y())
            for it in self.scene().items()
            if isinstance(it, GraphNodeItem) and it.note.id is not None
        }
        super().mousePressEvent(event)

    def mouseMoveEvent(self, event) -> None:
        if self._panning:
            delta = event.position() - self._pan_start
            self._pan_start = event.position()
            self.horizontalScrollBar().setValue(self.horizontalScrollBar().value() - int(delta.x()))
            self.verticalScrollBar().setValue(self.verticalScrollBar().value() - int(delta.y()))
            event.accept()
            return
        super().mouseMoveEvent(event)

    def mouseReleaseEvent(self, event) -> None:
        if event.button() == Qt.MouseButton.MiddleButton and self._panning:
            self._panning = False
            self.setCursor(Qt.CursorShape.ArrowCursor)
            event.accept()
            return
        super().mouseReleaseEvent(event)

        moved_old: dict[int, tuple[float, float]] = {}
        moved_new: dict[int, tuple[float, float]] = {}
        for it in self.scene().items():
            if isinstance(it, GraphNodeItem) and it.note.id is not None:
                nid = it.note.id
                old_xy = self._drag_start_positions.get(nid)
                new_xy = (it.pos().x(), it.pos().y())
                if old_xy and (abs(old_xy[0] - new_xy[0]) > 1.0 or abs(old_xy[1] - new_xy[1]) > 1.0):
                    moved_old[nid] = old_xy
                    moved_new[nid] = new_xy
        if moved_new and self.explorer_view.current_course_id is not None:
            self.explorer_view.explorer_controller.record_nodes_moved(
                self.explorer_view.current_course_id,
                moved_old,
                moved_new,
            )

    def mouseDoubleClickEvent(self, event) -> None:
        item = self.itemAt(event.position().toPoint())
        if item is None:
            scene_pt = self.mapToScene(event.position().toPoint())
            self.explorer_view.create_note_at((scene_pt.x(), scene_pt.y()))
            return
        super().mouseDoubleClickEvent(event)


class ExplorerView(QWidget):
    """
    DAG Knowledge Graph Explorer with shape-coded nodes (Rectangle=standard, Diamond=serial, Ellipse=cloze),
    Rubber-Band Marquee selection, and Floating Bulk Action Bar.
    """

    def __init__(
        self,
        conn: sqlite3.Connection,
        config: AppConfig,
        media_vault: MediaVault,
        web_profile: WebEngineProfileManager,
        theme_manager: ThemeManager,
        explorer_controller: ExplorerController,
        review_controller: ReviewController,
        event_bus: EventBus,
        parent: QWidget | None = None,
    ) -> None:
        super().__init__(parent)
        self.conn = conn
        self.config = config
        self.media_vault = media_vault
        self.web_profile = web_profile
        self.theme_manager = theme_manager
        self.explorer_controller = explorer_controller
        self.review_controller = review_controller
        self.event_bus = event_bus

        self.course_repo = CourseRepository(conn)
        self.current_course_id: int | None = None
        self._node_items: dict[int, GraphNodeItem] = {}

        self._build_ui()
        self.event_bus.course_selected.connect(self.select_course)
        self.event_bus.courses_updated.connect(self._reload_course_combo)
        self.event_bus.notes_updated.connect(self._on_notes_updated)
        self.event_bus.open_node_in_explorer.connect(self._on_focus_node)
        self.theme_manager.theme_changed.connect(lambda _: self.scene.update())

        self._reload_course_combo()

    def _build_ui(self) -> None:
        root = QVBoxLayout(self)
        root.setContentsMargins(14, 12, 14, 12)
        root.setSpacing(8)

        # Top Toolbar
        toolbar = QHBoxLayout()
        toolbar.addWidget(QLabel("Course:", self))
        self.course_combo = QComboBox(self)
        self.course_combo.setMinimumWidth(220)
        self.course_combo.currentIndexChanged.connect(self._on_course_combo_changed)
        toolbar.addWidget(self.course_combo)

        new_node_btn = QPushButton("+ New Note", self)
        set_widget_props(new_node_btn, variant="primary")
        new_node_btn.clicked.connect(lambda: self.create_note_at((0.0, 0.0)))
        toolbar.addWidget(new_node_btn)

        layout_btn = QPushButton("Auto-Layout DAG", self)
        layout_btn.clicked.connect(self._on_auto_layout)
        toolbar.addWidget(layout_btn)

        fit_btn = QPushButton("Fit View", self)
        set_widget_props(fit_btn, variant="ghost")
        fit_btn.clicked.connect(self._on_fit_view)
        toolbar.addWidget(fit_btn)

        undo_btn = QPushButton("Undo (Ctrl+Z)", self)
        set_widget_props(undo_btn, variant="ghost")
        undo_btn.clicked.connect(lambda: self.explorer_controller.undo_last_action())
        toolbar.addWidget(undo_btn)

        toolbar.addStretch(1)
        legend = QLabel("Shapes: ▭ Standard   ◇ Serial   ◯ Cloze   |   Shift+Click 2 nodes to link edge", self)
        set_widget_props(legend, role="muted")
        toolbar.addWidget(legend)
        root.addLayout(toolbar)

        # Floating Bulk Action Bar (shown when >= 2 nodes selected via Marquee)
        self.floating_bar = QFrame(self)
        set_widget_props(self.floating_bar, role="floating_bar")
        fb_layout = QHBoxLayout(self.floating_bar)
        fb_layout.setContentsMargins(12, 6, 12, 6)
        self.sel_count_lbl = QLabel("0 nodes selected", self.floating_bar)
        set_widget_props(self.sel_count_lbl, role="subtitle")
        fb_layout.addWidget(self.sel_count_lbl)
        fb_layout.addStretch(1)

        study_sub_btn = QPushButton("Custom Study Subgraph (with Prereqs)", self.floating_bar)
        set_widget_props(study_sub_btn, variant="primary")
        study_sub_btn.clicked.connect(self._on_bulk_study_subgraph)
        fb_layout.addWidget(study_sub_btn)

        tag_sub_btn = QPushButton("+ Bulk Tag", self.floating_bar)
        tag_sub_btn.clicked.connect(self._on_bulk_add_tag)
        fb_layout.addWidget(tag_sub_btn)

        layout_sub_btn = QPushButton("Auto-Layout Selected", self.floating_bar)
        layout_sub_btn.clicked.connect(self._on_bulk_layout)
        fb_layout.addWidget(layout_sub_btn)

        susp_sub_btn = QPushButton("Suspend Selected", self.floating_bar)
        fb_layout.addWidget(susp_sub_btn)
        susp_sub_btn.clicked.connect(lambda: self._on_bulk_suspend(True))

        del_sub_btn = QPushButton("Delete Selected", self.floating_bar)
        set_widget_props(del_sub_btn, variant="danger")
        del_sub_btn.clicked.connect(self._on_bulk_delete)
        fb_layout.addWidget(del_sub_btn)

        self.floating_bar.setVisible(False)
        root.addWidget(self.floating_bar)

        # Graph Canvas
        self.scene = QGraphicsScene(self)
        self.scene.selectionChanged.connect(self._on_selection_changed)
        self.canvas = GraphCanvasView(self.scene, self)
        self.canvas.setContextMenuPolicy(Qt.ContextMenuPolicy.CustomContextMenu)
        self.canvas.customContextMenuRequested.connect(self._on_canvas_context_menu)
        root.addWidget(self.canvas, 1)

    def keyPressEvent(self, event: QKeyEvent) -> None:
        if (event.modifiers() & Qt.KeyboardModifier.ControlModifier) and event.key() == Qt.Key.Key_Z:
            self.explorer_controller.undo_last_action()
            return
        if event.key() == Qt.Key.Key_Delete:
            self._on_bulk_delete()
            return
        super().keyPressEvent(event)

    def _reload_course_combo(self) -> None:
        courses = self.course_repo.list_all()
        self.course_combo.blockSignals(True)
        self.course_combo.clear()
        for c in courses:
            self.course_combo.addItem(c.name, c.id)
        if self.current_course_id is not None:
            idx = self.course_combo.findData(self.current_course_id)
            if idx >= 0:
                self.course_combo.setCurrentIndex(idx)
        elif courses and courses[0].id is not None:
            self.current_course_id = courses[0].id
            self.course_combo.setCurrentIndex(0)
        self.course_combo.blockSignals(False)
        self.rebuild_graph()

    def select_course(self, course_id: int) -> None:
        self.current_course_id = course_id
        idx = self.course_combo.findData(course_id)
        if idx >= 0:
            self.course_combo.blockSignals(True)
            self.course_combo.setCurrentIndex(idx)
            self.course_combo.blockSignals(False)
        self.rebuild_graph()

    def _on_course_combo_changed(self) -> None:
        cid = self.course_combo.currentData()
        self.current_course_id = int(cid) if cid is not None else None
        self.rebuild_graph()

    def _on_notes_updated(self, course_id: int) -> None:
        if course_id == self.current_course_id:
            self.rebuild_graph()

    def rebuild_graph(self) -> None:
        self.scene.clear()
        self._node_items.clear()
        if self.current_course_id is None:
            return

        notes, edges, metrics_map = self.explorer_controller.get_course_graph(self.current_course_id)
        for n in notes:
            if n.id is None:
                continue
            m = metrics_map.get(n.id) or NoteMetrics(n.id, 0, 0.0, 0.0, 0.0, 0, 0)
            node_item = GraphNodeItem(n, m, self.theme_manager, self)
            self.scene.addItem(node_item)
            self._node_items[n.id] = node_item

        for e in edges:
            src_it = self._node_items.get(e.source_note_id)
            dst_it = self._node_items.get(e.target_note_id)
            if src_it and dst_it:
                edge_item = GraphEdgeItem(e, src_it, dst_it, self.theme_manager)
                src_it.connected_edges.append(edge_item)
                dst_it.connected_edges.append(edge_item)
                self.scene.addItem(edge_item)

    def _selected_note_ids(self) -> list[int]:
        ids: list[int] = []
        for it in self.scene.selectedItems():
            if isinstance(it, GraphNodeItem) and it.note.id is not None:
                ids.append(it.note.id)
        return ids

    def _on_selection_changed(self) -> None:
        sel = self._selected_note_ids()
        if len(sel) >= 2:
            self.sel_count_lbl.setText(f"{len(sel)} nodes selected")
            self.floating_bar.setVisible(True)
        else:
            self.floating_bar.setVisible(False)

    def create_note_at(self, pos: tuple[float, float]) -> None:
        if self.current_course_id is None:
            return
        dlg = NodeEditorDialog(
            conn=self.conn,
            config=self.config,
            media_vault=self.media_vault,
            web_profile=self.web_profile,
            course_id=self.current_course_id,
            note=None,
            default_pos=pos,
            parent=self,
        )
        if dlg.exec():
            self.event_bus.notes_updated.emit(self.current_course_id)
            self.event_bus.courses_updated.emit()

    def open_note_editor(self, note_id: int) -> None:
        if self.current_course_id is None:
            return
        note = self.explorer_controller.note_repo.get_by_id(note_id, include_children=True)
        if note is None:
            return
        dlg = NodeEditorDialog(
            conn=self.conn,
            config=self.config,
            media_vault=self.media_vault,
            web_profile=self.web_profile,
            course_id=self.current_course_id,
            note=note,
            parent=self,
        )
        if dlg.exec():
            self.event_bus.notes_updated.emit(self.current_course_id)

    def create_prerequisite_edge(self, source_id: int, target_id: int) -> None:
        if self.current_course_id is None:
            return
        self.explorer_controller.create_edge(self.current_course_id, source_id, target_id)

    def _on_auto_layout(self) -> None:
        if self.current_course_id is not None:
            self.explorer_controller.auto_layout_course(self.current_course_id)
            self._on_fit_view()

    def _on_fit_view(self) -> None:
        rect = self.scene.itemsBoundingRect()
        if not rect.isNull():
            self.canvas.fitInView(rect.adjusted(-80, -80, 80, 80), Qt.AspectRatioMode.KeepAspectRatio)

    def _on_focus_node(self, course_id: int, note_id: int) -> None:
        self.select_course(course_id)
        node_item = self._node_items.get(note_id)
        if node_item:
            self.scene.clearSelection()
            node_item.setSelected(True)
            self.canvas.centerOn(node_item)

    def _on_bulk_study_subgraph(self) -> None:
        sel = self._selected_note_ids()
        if not sel:
            return
        cfg = CustomStudyConfig(
            note_ids=sel,
            include_prerequisite_ancestors=True,
            only_due_or_new=False,
            sort_criterion="topological_due",
        )
        cnt = self.review_controller.start_custom_study(cfg)
        if cnt > 0:
            self.event_bus.navigate_to_tab.emit("review")

    def _on_bulk_add_tag(self) -> None:
        sel = self._selected_note_ids()
        if not sel or self.current_course_id is None:
            return
        tag, ok = QInputDialog.getText(self, "Bulk Add Tag", "Tag name (snake_case):")
        if ok and tag.strip():
            self.explorer_controller.bulk_add_tag(self.current_course_id, sel, tag.strip())

    def _on_bulk_layout(self) -> None:
        sel = self._selected_note_ids()
        if sel and self.current_course_id is not None:
            self.explorer_controller.auto_layout_course(self.current_course_id, note_ids_subset=sel)

    def _on_bulk_suspend(self, suspended: bool) -> None:
        sel = self._selected_note_ids()
        if sel and self.current_course_id is not None:
            self.explorer_controller.bulk_suspend_notes(self.current_course_id, sel, suspended)

    def _on_bulk_delete(self) -> None:
        sel = self._selected_note_ids()
        if not sel or self.current_course_id is None:
            return
        dlg = DeleteNoteDialog(note_count=len(sel), parent=self)
        if dlg.exec():
            self.explorer_controller.bulk_delete_notes(self.current_course_id, sel, bridge_edges=dlg.bridge_edges)
            self.event_bus.courses_updated.emit()

    def _on_canvas_context_menu(self, pos) -> None:
        item = self.canvas.itemAt(pos)
        menu = QMenu(self)
        if isinstance(item, GraphNodeItem) and item.note.id is not None:
            nid = item.note.id
            edit_act = menu.addAction("Edit Mathematical Note...")
            metrics_act = menu.addAction("Inspect Retrievability (R_min / P_joint)...")
            study_act = menu.addAction("Study Note & Prerequisites")
            menu.addSeparator()
            del_act = menu.addAction("Delete Note...")
            chosen = menu.exec(self.canvas.viewport().mapToGlobal(pos))
            if chosen == edit_act:
                self.open_note_editor(nid)
            elif chosen == metrics_act:
                RetrievabilityDialog(self.conn, self.web_profile, nid, parent=self).exec()
            elif chosen == study_act:
                item.setSelected(True)
                self._on_bulk_study_subgraph()
            elif chosen == del_act:
                item.setSelected(True)
                self._on_bulk_delete()
        else:
            scene_pt = self.canvas.mapToScene(pos)
            new_act = menu.addAction("+ Create Note Here...")
            layout_act = menu.addAction("Auto-Layout DAG")
            chosen = menu.exec(self.canvas.viewport().mapToGlobal(pos))
            if chosen == new_act:
                self.create_note_at((scene_pt.x(), scene_pt.y()))
            elif chosen == layout_act:
                self._on_auto_layout()
