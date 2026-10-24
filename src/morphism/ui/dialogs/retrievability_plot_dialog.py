import json
import os
from typing import Optional, List, Dict
from datetime import datetime, timezone, timedelta
from PySide6.QtWidgets import (QDialog, QVBoxLayout, QHBoxLayout, QLabel, 
                               QComboBox, QPushButton, QGroupBox, QTableWidget, 
                               QTableWidgetItem, QHeaderView, QSplitter, QScrollArea, QWidget)

from PySide6.QtWebEngineWidgets import QWebEngineView
from PySide6.QtCore import Qt, QUrl
from PySide6.QtGui import QIcon
from morphism.core.models import Course, NoteNode, ReviewLogRecord, to_hex_id
from morphism.core.scheduler_manager import SchedulerManager
from morphism.core import course_storage
from morphism.core.app_paths import ASSETS_DIR, CHART_JS, ICON_PNG, ICON_ICO
from morphism.core.theme_manager import ThemeManager

def build_chart_html_template() -> str:
    chart_js_code = ""
    if os.path.exists(CHART_JS):
        try:
            with open(CHART_JS, "r", encoding="utf-8") as f:
                chart_js_code = f.read()
        except Exception:
            chart_js_code = ""

    css_vars = ThemeManager.get_instance().get_web_css_variables()
    ct = ThemeManager.get_instance().get_chart_theme()

    grid_col = ct.get("grid_color", "#334155")
    tick_col = ct.get("tick_color", "#94a3b8")
    text_col = ct.get("text_color", "#f8fafc")

    return f"""<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <script>
    {chart_js_code}
    </script>
    <style>
        {css_vars}
        body {{
            background-color: var(--bg-color);
            color: var(--text-color);
            font-family: -apple-system, BlinkMacSystemFont, "Inter", "Ubuntu", "DejaVu Sans", sans-serif;
            margin: 0;
            padding: 12px;
        }}
        .container {{
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            border-radius: 10px;
            padding: 14px;
        }}
        h2 {{
            color: var(--accent-border);
            margin-top: 0;
            font-size: 17px;
        }}
        .canvas-holder {{
            position: relative;
            height: 380px;
            width: 100%;
        }}
    </style>
    <script>
        let myChart = null;

        window.renderChart = function(title, labels, datasets) {{
            let titleEl = document.getElementById('chart-title');
            if (titleEl) titleEl.innerText = title;
            let canvas = document.getElementById('retrievabilityChart');
            if (!canvas || typeof Chart === 'undefined') return;
            let ctx = canvas.getContext('2d');
            
            if (myChart) {{
                myChart.destroy();
            }}

            myChart = new Chart(ctx, {{
                type: 'line',
                data: {{
                    labels: labels,
                    datasets: datasets
                }},
                options: {{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {{
                        x: {{
                            grid: {{ color: '{grid_col}' }},
                            ticks: {{ color: '{tick_col}' }},
                            title: {{ display: true, text: 'Days from Today (t)', color: '{tick_col}' }}
                        }},
                        y: {{
                            min: 0,
                            max: 100,
                            grid: {{ color: '{grid_col}' }},
                            ticks: {{ color: '{tick_col}', callback: value => value + '%' }},
                            title: {{ display: true, text: 'Retrievability R(t)', color: '{tick_col}' }}
                        }}
                    }},
                    plugins: {{
                        legend: {{
                            labels: {{ color: '{text_col}', font: {{ size: 12 }} }}
                        }},
                        tooltip: {{
                            mode: 'index',
                            intersect: false
                        }}
                    }}
                }}
            }});
        }};
    </script>
</head>
<body>
    <div class="container">
        <h2 id="chart-title">Retrievability Decay R(t) Over Time</h2>
        <div class="canvas-holder">
            <canvas id="retrievabilityChart"></canvas>
        </div>
    </div>
</body>
</html>"""


class RetrievabilityPlotDialog(QDialog):
    """Dialog for inspecting Note retrievability metrics, per-card breakdown, decay chart, and review history."""

    def __init__(self, course: Course, scheduler_manager: SchedulerManager, initial_note: Optional[NoteNode] = None, parent=None):
        super().__init__(parent)
        self.course = course
        self.scheduler_manager = scheduler_manager
        self.initial_note = initial_note
        self.is_page_loaded = False

        icon_file = ICON_PNG if os.path.exists(ICON_PNG) else (ICON_ICO if os.path.exists(ICON_ICO) else None)
        if icon_file:
            self.setWindowIcon(QIcon(icon_file))

        self.setWindowTitle(f"📈 Note Info & Retrievability Plotter - {course.name}")
        self.setWindowFlags(self.windowFlags() | Qt.WindowMaximizeButtonHint | Qt.WindowMinimizeButtonHint)
        self.setMinimumSize(840, 560)
        self.resize(1080, 720)
        self._setup_ui()
        self._load_notes_list()
        ThemeManager.get_instance().theme_changed.connect(self.on_theme_changed)

    def on_theme_changed(self, theme_id: str):
        assets_url = QUrl.fromLocalFile(ASSETS_DIR.replace("\\", "/") + "/")
        self.browser.setHtml(build_chart_html_template(), assets_url)

    def _setup_ui(self):
        main_layout = QVBoxLayout(self)

        # Header Selector Bar
        header_layout = QHBoxLayout()
        header_layout.addWidget(QLabel("Select Note:"))
        self.combo_notes = QComboBox()
        self.combo_notes.currentIndexChanged.connect(self._on_note_selected)
        header_layout.addWidget(self.combo_notes, stretch=2)

        header_layout.addWidget(QLabel("Time Horizon:"))
        self.combo_horizon = QComboBox()
        self.combo_horizon.addItem("24 Hours (Detailed)", 1)
        self.combo_horizon.addItem("48 Hours", 2)
        self.combo_horizon.addItem("7 Days", 7)
        self.combo_horizon.addItem("30 Days (Default)", 30)
        self.combo_horizon.addItem("90 Days (Quarter)", 90)
        self.combo_horizon.setCurrentIndex(3)
        self.combo_horizon.currentIndexChanged.connect(self._update_plot_and_tables)
        header_layout.addWidget(self.combo_horizon, stretch=1)

        main_layout.addLayout(header_layout)

        # Splitter: Left Table / Right Plot
        splitter = QSplitter(Qt.Horizontal)

        # Left Info & Tables Panel
        left_widget = QWidget()
        left_layout = QVBoxLayout(left_widget)
        left_layout.setContentsMargins(0, 0, 0, 0)

        # Metrics Summary Box
        metrics_group = QGroupBox("Target & Joint Retention Metrics")
        metrics_layout = QVBoxLayout(metrics_group)
        self.lbl_metrics_summary = QLabel("Loading metrics...")
        self.lbl_metrics_summary.setStyleSheet("font-size: 13px; line-height: 1.5; color: #f8fafc;")
        metrics_layout.addWidget(self.lbl_metrics_summary)
        left_layout.addWidget(metrics_group)

        # Cards Breakdown Table
        cards_group = QGroupBox("Attached Cards & Steps FSRS Stability")
        cards_layout = QVBoxLayout(cards_group)
        self.table_cards = QTableWidget()
        self.table_cards.setColumnCount(6)
        self.table_cards.setHorizontalHeaderLabels(["ID", "Title", "State", "R(now)", "S (days)", "D (diff)"])
        self.table_cards.horizontalHeader().setSectionResizeMode(1, QHeaderView.Stretch)
        for col in [0, 2, 3, 4, 5]:
            self.table_cards.horizontalHeader().setSectionResizeMode(col, QHeaderView.ResizeToContents)
        cards_layout.addWidget(self.table_cards)
        left_layout.addWidget(cards_group)

        # Review Logs Table
        logs_group = QGroupBox("Historical Review Log Events")
        logs_layout = QVBoxLayout(logs_group)
        self.table_logs = QTableWidget()
        self.table_logs.setColumnCount(4)
        self.table_logs.setHorizontalHeaderLabels(["Card ID", "Rating", "Review Date", "Interval"])
        self.table_logs.horizontalHeader().setSectionResizeMode(2, QHeaderView.Stretch)
        for col in [0, 1, 3]:
            self.table_logs.horizontalHeader().setSectionResizeMode(col, QHeaderView.ResizeToContents)
        logs_layout.addWidget(self.table_logs)
        left_layout.addWidget(logs_group)

        splitter.addWidget(left_widget)

        # Right Chart.js Interactive Graph
        self.browser = QWebEngineView()
        assets_url = QUrl.fromLocalFile(ASSETS_DIR.replace("\\", "/") + "/")
        self.browser.setHtml(build_chart_html_template(), assets_url)
        self.browser.loadFinished.connect(self._on_page_loaded)
        splitter.addWidget(self.browser)

        splitter.setSizes([450, 630])
        main_layout.addWidget(splitter, stretch=1)

        # Bottom Buttons
        bottom_layout = QHBoxLayout()
        bottom_layout.addStretch()
        btn_close = QPushButton("Close")
        btn_close.clicked.connect(self.accept)
        bottom_layout.addWidget(btn_close)
        main_layout.addLayout(bottom_layout)

    def _on_page_loaded(self, ok: bool):
        self.is_page_loaded = True
        self._update_plot_and_tables()

    def _load_notes_list(self):
        self.combo_notes.blockSignals(True)
        self.combo_notes.clear()
        selected_idx = 0
        for idx, note in enumerate(self.course.notes):
            self.combo_notes.addItem(f"{note.title} (ID: {to_hex_id(note.note_id)})", note.note_id)
            if self.initial_note and note.note_id == self.initial_note.note_id:
                selected_idx = idx
        self.combo_notes.setCurrentIndex(selected_idx)
        self.combo_notes.blockSignals(False)
        self._update_plot_and_tables()

    def _on_note_selected(self):
        self._update_plot_and_tables()

    def _update_plot_and_tables(self):
        note_id = self.combo_notes.currentData()
        note = next((n for n in self.course.notes if n.note_id == note_id), None)
        if not note:
            return

        now = datetime.now(timezone.utc)
        joint_r = note.get_joint_retention(self.scheduler_manager)
        ret_pct = int(joint_r * 100)
        target_pct = int(note.desired_retention * 100)
        is_due = note.is_due(self.scheduler_manager)

        status_badge = "<span style='color: #ef4444; font-weight: bold;'>🔥 DUE FOR REVIEW</span>" if is_due else "<span style='color: #10b981; font-weight: bold;'>✓ RETENTION HEALTHY</span>"
        type_str = "Serial Sequence Proof (Step-by-Step)" if note.is_serial_sequence() else "Standard Concept Note"

        summary_text = (
            f"<b>Type:</b> {type_str}<br>"
            f"<b>Target Retention:</b> {target_pct}% | <b>Joint Retention P(∩ A_i):</b> {ret_pct}%<br>"
            f"<b>Schedule Status:</b> {status_badge}<br>"
            f"<b>Total Cards/Steps:</b> {len(note.cards)}"
        )
        self.lbl_metrics_summary.setText(summary_text)

        # Update Cards Breakdown Table
        self.table_cards.setRowCount(len(note.cards))
        for row, card in enumerate(note.cards):
            c_ret = self.scheduler_manager.get_card_retrievability(card, now)
            fc = card.fsrs_card

            self.table_cards.setItem(row, 0, QTableWidgetItem(to_hex_id(card.item_id)))
            self.table_cards.setItem(row, 1, QTableWidgetItem(card.get_title()))
            self.table_cards.setItem(row, 2, QTableWidgetItem(card.get_state_name()))
            self.table_cards.setItem(row, 3, QTableWidgetItem(f"{int(c_ret * 100)}%"))
            self.table_cards.setItem(row, 4, QTableWidgetItem(f"{fc.stability:.2f}" if fc.stability else "-"))
            self.table_cards.setItem(row, 5, QTableWidgetItem(f"{fc.difficulty:.2f}" if fc.difficulty else "-"))

        # Update Review Logs Table
        logs = course_storage.load_review_logs(self.course.name)
        card_ids = set(c.item_id for c in note.cards)
        matching_logs = [l for l in logs if l.card_id in card_ids]
        matching_logs.sort(key=lambda l: l.review_time, reverse=True)

        self.table_logs.setRowCount(len(matching_logs))
        rating_labels = {1: "Again (1)", 2: "Hard (2)", 3: "Good (3)", 4: "Easy (4)"}

        for row, rlog in enumerate(matching_logs):
            self.table_logs.setItem(row, 0, QTableWidgetItem(to_hex_id(rlog.card_id)))
            self.table_logs.setItem(row, 1, QTableWidgetItem(rating_labels.get(rlog.rating, str(rlog.rating))))
            date_display = rlog.review_time[:19].replace("T", " ")
            self.table_logs.setItem(row, 2, QTableWidgetItem(date_display))
            interval_str = f"{rlog.scheduled_days}d" if rlog.scheduled_days else "-"
            self.table_logs.setItem(row, 3, QTableWidgetItem(interval_str))

        if self.is_page_loaded:
            self._render_chart_js(note)

    def _render_chart_js(self, note: NoteNode):
        horizon_days = self.combo_horizon.currentData() or 30
        now = datetime.now(timezone.utc)

        steps = 30
        labels = []
        joint_points = []
        card_points = {card.item_id: [] for card in note.cards}

        time_delta_step = timedelta(days=horizon_days / steps)

        for i in range(steps + 1):
            future_dt = now + (time_delta_step * i)
            if horizon_days <= 2:
                hrs = (i * horizon_days * 24) / steps
                labels.append(f"+{hrs:.1f}h")
            else:
                days = (i * horizon_days) / steps
                labels.append(f"+{days:.1f}d")

            # Calculate individual card retrievabilities
            step_joint = 1.0
            for card in note.cards:
                r = self.scheduler_manager.get_card_retrievability(card, future_dt)
                card_points[card.item_id].append(round(r * 100, 1))
                step_joint *= r

            joint_points.append(round(step_joint * 100, 1))

        ct = ThemeManager.get_instance().get_chart_theme()
        primary_color = ct.get("primary_line", "#6366f1")

        datasets = [
            {
                "label": f"Joint Retention P(∩ A_i)",
                "data": joint_points,
                "borderColor": primary_color,
                "backgroundColor": "rgba(99, 102, 241, 0.15)",
                "borderWidth": 3,
                "fill": True,
                "tension": 0.2
            }
        ]

        palette = ["#38bdf8", "#10b981", "#f59e0b", "#ec4899", "#8b5cf6"]
        for idx, card in enumerate(note.cards):
            color = palette[idx % len(palette)]
            datasets.append({
                "label": f"R(t): {card.get_title()}",
                "data": card_points[card.item_id],
                "borderColor": color,
                "borderWidth": 1.5,
                "borderDash": [4, 4],
                "fill": False,
                "tension": 0.2
            })

        # Threshold target line
        target_val = int(note.desired_retention * 100)
        datasets.append({
            "label": f"Target Retention ({target_val}%)",
            "data": [target_val] * (steps + 1),
            "borderColor": "#ef4444",
            "borderWidth": 2,
            "borderDash": [6, 4],
            "fill": False,
            "pointRadius": 0
        })

        title = f"Retention Decay Projection — {note.title} ({horizon_days} Days)"
        js_code = f"if (typeof renderChart === 'function') {{ renderChart({json.dumps(title)}, {json.dumps(labels)}, {json.dumps(datasets)}); }}"
        self.browser.page().runJavaScript(js_code)
