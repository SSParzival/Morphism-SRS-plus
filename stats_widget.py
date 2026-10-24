import os
import json
from datetime import datetime, timezone, timedelta, date
from typing import List, Dict
from PySide6.QtWidgets import (QWidget, QVBoxLayout, QHBoxLayout, QLabel, 
                               QGroupBox, QSplitter, QScrollArea)

from PySide6.QtWebEngineWidgets import QWebEngineView
from PySide6.QtCore import Qt, QUrl
from models import Course, ReviewLogRecord
from scheduler_manager import SchedulerManager
import course_storage
from app_paths import ASSETS_DIR, CHART_JS
from theme_manager import ThemeManager

def build_heatmap_html_template() -> str:
    css_vars = ThemeManager.get_instance().get_web_css_variables()
    return f"""<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        {css_vars}
        body {{
            background-color: var(--bg-color);
            color: var(--text-color);
            font-family: -apple-system, BlinkMacSystemFont, "Inter", "Ubuntu", "DejaVu Sans", sans-serif;
            margin: 0;
            padding: 8px;
        }}
        .container {{
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            border-radius: 10px;
            padding: 14px;
        }}
        .header-bar {{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 12px;
        }}
        .header-title {{
            font-weight: bold;
            font-size: 15px;
            color: var(--accent-border);
        }}
        select {{
            background: var(--bg-color);
            color: var(--text-color);
            border: 1px solid var(--border-color);
            padding: 4px 10px;
            border-radius: 6px;
            font-size: 13px;
            font-weight: bold;
            cursor: pointer;
        }}
        .heatmap-grid {{
            display: grid;
            grid-template-rows: repeat(7, 13px);
            grid-auto-flow: column;
            gap: 3px;
            overflow-x: auto;
            padding-bottom: 6px;
        }}
        .day-cell {{
            width: 13px;
            height: 13px;
            border-radius: 2px;
            box-sizing: border-box;
            transition: transform 0.1s ease;
        }}
        .day-cell:hover {{
            transform: scale(1.3);
            z-index: 10;
            outline: 1px solid #ffffff;
        }}
        .cell-level-0 {{ background-color: var(--border-color); opacity: 0.25; }}
        .cell-level-1 {{ background-color: var(--accent-border); opacity: 0.40; }}
        .cell-level-2 {{ background-color: var(--accent-border); opacity: 0.65; }}
        .cell-level-3 {{ background-color: var(--accent-border); opacity: 0.85; }}
        .cell-level-4 {{ background-color: var(--accent-border); opacity: 1.0; box-shadow: 0 0 8px var(--accent-glow); }}
        .future-cell {{ visibility: hidden; }}
        .legend-bar {{
            display: flex;
            align-items: center;
            justify-content: flex-end;
            gap: 6px;
            font-size: 12px;
            color: var(--text-muted);
            margin-top: 10px;
        }}
        .legend-box {{
            width: 12px;
            height: 12px;
            border-radius: 2px;
        }}
    </style>
    <script>
        let allYearData = {{}};
        let currentYear = new Date().getFullYear();

        window.renderHeatmap = function(yearDataJson, availableYears) {{
            allYearData = yearDataJson;
            let selectEl = document.getElementById('year-select');
            if (selectEl) {{
                selectEl.innerHTML = '';
                availableYears.forEach(y => {{
                    let opt = document.createElement('option');
                    opt.value = y;
                    opt.innerText = "Year " + y;
                    if (y === currentYear) opt.selected = true;
                    selectEl.appendChild(opt);
                }});
                if (!availableYears.includes(currentYear) && availableYears.length > 0) {{
                    currentYear = availableYears[0];
                }}
            }}
            displayHeatmapForYear(currentYear);
        }};

        function switchYear(y) {{
            currentYear = parseInt(y);
            displayHeatmapForYear(currentYear);
        }}

        function displayHeatmapForYear(year) {{
            let container = document.getElementById('heatmap-container');
            if (!container) return;
            container.innerHTML = '';

            let today = new Date();
            let startDate = new Date(year, 0, 1);
            let endDate = new Date(year, 11, 31);
            let cur = new Date(startDate);
            
            while (cur <= endDate) {{
                let yearStr = cur.getFullYear();
                let monthStr = String(cur.getMonth() + 1).padStart(2, '0');
                let dayStr = String(cur.getDate()).padStart(2, '0');
                let dateStr = yearStr + "-" + monthStr + "-" + dayStr;

                let count = (allYearData[dateStr] || 0);
                let cell = document.createElement('div');
                cell.className = 'day-cell';

                if (cur > today) {{
                    cell.classList.add('future-cell');
                }} else {{
                    if (count === 0) {{
                        cell.classList.add('cell-level-0');
                        cell.title = dateStr + ": 0 reviews";
                    }} else if (count <= 2) {{
                        cell.classList.add('cell-level-1');
                        cell.title = dateStr + ": " + count + " review" + (count > 1 ? "s" : "");
                    }} else if (count <= 5) {{
                        cell.classList.add('cell-level-2');
                        cell.title = dateStr + ": " + count + " reviews";
                    }} else if (count <= 10) {{
                        cell.classList.add('cell-level-3');
                        cell.title = dateStr + ": " + count + " reviews";
                    }} else {{
                        cell.classList.add('cell-level-4');
                        cell.title = dateStr + ": " + count + " reviews (🔥 High Activity!)";
                    }}
                }}

                container.appendChild(cell);
                cur.setDate(cur.getDate() + 1);
            }}
        }}
    </script>
</head>
<body>
    <div class="container">
        <div class="header-bar">
            <div class="header-title">📅 Yearly Review Contribution Grid</div>
            <div>
                <select id="year-select" onchange="switchYear(this.value)"></select>
            </div>
        </div>
        <div id="heatmap-container" class="heatmap-grid"></div>
        <div class="legend-bar">
            <span>Less</span>
            <div class="legend-box cell-level-0"></div>
            <div class="legend-box cell-level-1"></div>
            <div class="legend-box cell-level-2"></div>
            <div class="legend-box cell-level-3"></div>
            <div class="legend-box cell-level-4"></div>
            <span>More (Active)</span>
        </div>
    </div>
</body>
</html>"""

def build_barplot_html_template() -> str:
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
            border-radius: 12px;
            padding: 16px;
        }}
        h3 {{ color: var(--accent-border); margin-top: 0; font-size: 16px; }}
        .canvas-holder {{ height: 240px; position: relative; }}
    </style>
    <script>
        let barChart = null;

        window.renderBarPlot = function(labels, counts, bgColors) {{
            let canvas = document.getElementById('dueBarChart');
            if (!canvas || typeof Chart === 'undefined') return;
            let ctx = canvas.getContext('2d');
            if (barChart) barChart.destroy();

            barChart = new Chart(ctx, {{
                type: 'bar',
                data: {{
                    labels: labels,
                    datasets: [{{
                        label: 'Due Cards',
                        data: counts,
                        backgroundColor: bgColors,
                        borderWidth: 0,
                        borderRadius: 4
                    }}]
                }},
                options: {{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {{
                        x: {{
                            grid: {{ color: '{grid_col}' }},
                            ticks: {{ color: '{tick_col}', font: {{ size: 11 }} }}
                        }},
                        y: {{
                            beginAtZero: true,
                            grid: {{ color: '{grid_col}' }},
                            ticks: {{ color: '{tick_col}', stepSize: 1 }}
                        }}
                    }},
                    plugins: {{
                        legend: {{ display: false }}
                    }}
                }}
            }});
        }};
    </script>
</head>
<body>
    <div class="container">
        <h3>📊 Due Cards Histogram (Next 30 Days & Overdue)</h3>
        <div class="canvas-holder">
            <canvas id="dueBarChart"></canvas>
        </div>
    </div>
</body>
</html>"""


class StatsWidget(QWidget):
    """Stats tab with Anki-style yearly review heatmap grid and due cards histogram barplot."""

    def __init__(self, scheduler_manager: SchedulerManager, parent=None):
        super().__init__(parent)
        self.scheduler_manager = scheduler_manager
        self.current_course: Course = None
        self.is_barplot_loaded = False
        self.is_heatmap_loaded = False

        self._setup_ui()
        ThemeManager.get_instance().theme_changed.connect(self.on_theme_changed)

    def on_theme_changed(self, theme_id: str):
        assets_url = QUrl.fromLocalFile(ASSETS_DIR.replace("\\", "/") + "/")
        self.heatmap_browser.setHtml(build_heatmap_html_template(), assets_url)
        self.barplot_browser.setHtml(build_barplot_html_template(), assets_url)

    def _setup_ui(self):
        main_layout = QVBoxLayout(self)
        main_layout.setContentsMargins(20, 20, 20, 20)
        main_layout.setSpacing(16)

        header_layout = QHBoxLayout()
        self.lbl_title = QLabel("📈 Learning Statistics & Review History")
        self.lbl_title.setStyleSheet("font-size: 20px; font-weight: bold; color: #38bdf8;")
        header_layout.addWidget(self.lbl_title)
        header_layout.addStretch()

        self.lbl_stats_summary = QLabel("Total Reviews: 0  |  Active Days: 0")
        self.lbl_stats_summary.setStyleSheet("background-color: #1e293b; border: 1px solid #334155; padding: 6px 14px; border-radius: 6px; font-weight: bold; color: #10b981;")
        header_layout.addWidget(self.lbl_stats_summary)

        main_layout.addLayout(header_layout)

        scroll_area = QScrollArea()
        scroll_area.setWidgetResizable(True)
        scroll_area.setStyleSheet("QScrollArea { border: none; background: transparent; }")

        scroll_content = QWidget()
        scroll_layout = QVBoxLayout(scroll_content)
        scroll_layout.setContentsMargins(0, 0, 0, 0)
        scroll_layout.setSpacing(16)

        # 1. Yearly Review Heatmap
        heatmap_group = QGroupBox("📅 Yearly Review Heatmap")
        heatmap_layout = QVBoxLayout(heatmap_group)

        self.heatmap_browser = QWebEngineView()
        self.heatmap_browser.setMinimumHeight(260)
        assets_url = QUrl.fromLocalFile(ASSETS_DIR.replace("\\", "/") + "/")
        self.heatmap_browser.setHtml(build_heatmap_html_template(), assets_url)
        self.heatmap_browser.loadFinished.connect(self._on_heatmap_loaded)
        heatmap_layout.addWidget(self.heatmap_browser)
        scroll_layout.addWidget(heatmap_group)

        # 2. Due Cards Histogram Barplot (Chart.js)
        barplot_group = QGroupBox("📊 Due Cards Barplot Forecast")
        barplot_layout = QVBoxLayout(barplot_group)

        self.barplot_browser = QWebEngineView()
        self.barplot_browser.setMinimumHeight(320)
        self.barplot_browser.setHtml(build_barplot_html_template(), assets_url)
        self.barplot_browser.loadFinished.connect(self._on_barplot_loaded)
        barplot_layout.addWidget(self.barplot_browser)
        scroll_layout.addWidget(barplot_group)

        scroll_area.setWidget(scroll_content)
        main_layout.addWidget(scroll_area, stretch=1)

    def _on_heatmap_loaded(self, ok: bool):
        self.is_heatmap_loaded = True
        self.refresh_stats()

    def _on_barplot_loaded(self, ok: bool):
        self.is_barplot_loaded = True
        self.refresh_stats()

    def set_course(self, course: Course):
        self.current_course = course
        self.refresh_stats()

    def load_course_stats(self, course: Course):
        self.set_course(course)

    def refresh_stats(self):
        if not self.current_course:
            return

        logs = course_storage.load_review_logs(self.current_course.name)
        total_reviews = len(logs)
        dates_set = set(l.review_time[:10] for l in logs)
        active_days = len(dates_set)

        self.lbl_title.setText(f"📈 Learning Statistics — '{self.current_course.name}'")
        self.lbl_stats_summary.setText(f"Total Reviews: {total_reviews}  |  Active Study Days: {active_days}")

        if self.is_heatmap_loaded:
            self._render_heatmap(logs)

        if self.is_barplot_loaded:
            self._render_barplot()

    def _render_heatmap(self, logs: List[ReviewLogRecord]):
        date_counts = {}
        years_set = set()

        for l in logs:
            d_str = l.review_time[:10]
            date_counts[d_str] = date_counts.get(d_str, 0) + 1
            try:
                y = int(d_str[:4])
                years_set.add(y)
            except Exception:
                pass

        current_year = datetime.now().year
        years_set.add(current_year)
        available_years = sorted(list(years_set), reverse=True)

        counts_json = json.dumps(date_counts)
        years_json = json.dumps(available_years)
        js_code = f"if (typeof renderHeatmap === 'function') {{ renderHeatmap({counts_json}, {years_json}); }}"
        self.heatmap_browser.page().runJavaScript(js_code)

    def _render_barplot(self):
        if not self.current_course:
            return

        now_dt = datetime.now(timezone.utc)
        today_date = now_dt.date()

        overdue_count = 0
        future_day_counts = [0] * 30

        for note in self.current_course.notes:
            for card in note.cards:
                fc = card.fsrs_card
                if fc.last_review is None:
                    overdue_count += 1
                elif fc.due <= now_dt:
                    overdue_count += 1
                else:
                    due_date = fc.due.date()
                    delta_days = (due_date - today_date).days
                    if 0 <= delta_days < 30:
                        future_day_counts[delta_days] += 1

        labels = ["Overdue / Now"]
        counts = [overdue_count]
        bg_colors = ["#ef4444"]

        for i in range(1, 31):
            target_date = today_date + timedelta(days=i)
            labels.append(target_date.strftime("%b %d"))
            counts.append(future_day_counts[i-1])
            bg_colors.append("#6366f1" if i <= 7 else "#38bdf8")

        labels_json = json.dumps(labels)
        counts_json = json.dumps(counts)
        colors_json = json.dumps(bg_colors)

        js_code = f"if (typeof renderBarPlot === 'function') {{ renderBarPlot({labels_json}, {counts_json}, {colors_json}); }}"
        self.barplot_browser.page().runJavaScript(js_code)
