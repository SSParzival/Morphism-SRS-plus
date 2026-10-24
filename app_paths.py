import os
import sys

# Canonical Base Directory of the application (where the script / package is located)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Data & Resource Paths
ASSETS_DIR = os.path.join(BASE_DIR, "assets")
COURSES_DIR = os.path.join(BASE_DIR, "Courses")
SCHEDULING_DIR = os.path.join(BASE_DIR, "scheduling")
THEMES_DIR = os.path.join(BASE_DIR, "themes")
SCRATCHBOOK_DIR = os.path.join(BASE_DIR, "scratchbook")
SETTINGS_FILE = os.path.join(BASE_DIR, "settings.json")

# Linux XDG Cache Directories
CACHE_DIR = os.path.join(os.path.expanduser("~/.cache"), "morphism-srs-plus")
WEB_CACHE_DIR = os.path.join(CACHE_DIR, "webengine")

# Core Assets
ICON_PNG = os.path.join(BASE_DIR, "icon.png")
ICON_ICO = os.path.join(BASE_DIR, "icon.ico")
MATHJAX_SVG_JS = os.path.join(ASSETS_DIR, "tex-svg.js")
MATHJAX_CHTML_JS = os.path.join(ASSETS_DIR, "tex-chtml.js")
CHART_JS = os.path.join(ASSETS_DIR, "chart.js")
MATHJAX_CONFIG_FILE = os.path.join(ASSETS_DIR, "mathjax_config.json")
EDITOR_BUTTONS_FILE = os.path.join(ASSETS_DIR, "editor_buttons.json")

def ensure_app_directories():
    """Ensure all core application directories exist."""
    for d in [ASSETS_DIR, COURSES_DIR, SCHEDULING_DIR, THEMES_DIR, SCRATCHBOOK_DIR]:
        os.makedirs(d, exist_ok=True)
