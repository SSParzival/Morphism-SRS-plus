#!/usr/bin/env python3
import json
import os

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
ROOT_DIR = os.path.abspath(os.path.join(SCRIPT_DIR, ".."))

APP_JS = os.path.join(ROOT_DIR, "android/app/src/main/assets/app.js")
SEED_JSON = os.path.join(ROOT_DIR, "android/app/src/main/assets/seed_courses.json")

with open(SEED_JSON, "r", encoding="utf-8") as f:
    courses = json.load(f)

with open(APP_JS, "r", encoding="utf-8") as f:
    content = f.read()

# Replace SEED_COURSES
prefix = "const SEED_COURSES = "
start_idx = content.find(prefix)
if start_idx == -1:
    raise ValueError("SEED_COURSES not found in app.js")

end_needle = "];\n\nclass MorphismApp {"
end_idx = content.find(end_needle, start_idx)
if end_idx == -1:
    raise ValueError("End of SEED_COURSES not found in app.js")

formatted_seed = json.dumps(courses, indent=4, ensure_ascii=False)
new_seed_str = prefix + formatted_seed + ";\n\nclass MorphismApp {"

content = content[:start_idx] + new_seed_str + content[end_idx + len(end_needle):]

# Fix Cloze split("::", 1) bug
content = content.replace('p1.split("::", 1)', 'p1.split("::")')

import shutil

# Ensure offline vendor bundles are synchronized
tex_vendor = os.path.join(ROOT_DIR, "src/morphism_srs/resources/web/vendor/mathjax/tex-svg-full.js")
tex_android = os.path.join(ROOT_DIR, "android/app/src/main/assets/tex-svg.js")
tex_root = os.path.join(ROOT_DIR, "assets/tex-svg.js")
if os.path.exists(tex_vendor):
    shutil.copyfile(tex_vendor, tex_android)
    shutil.copyfile(tex_vendor, tex_root)

chart_vendor = os.path.join(ROOT_DIR, "src/morphism_srs/resources/web/vendor/chartjs/chart.umd.min.js")
chart_android = os.path.join(ROOT_DIR, "android/app/src/main/assets/chart.js")
chart_root = os.path.join(ROOT_DIR, "assets/chart.js")
if os.path.exists(chart_vendor):
    shutil.copyfile(chart_vendor, chart_android)
    shutil.copyfile(chart_vendor, chart_root)

# Update storage keys to ensure automatic migration on mobile
for old_v in ['"morphism_courses"', '"morphism_courses_v2"', '"morphism_courses_v3"', '"morphism_courses_v4"', '"morphism_courses_v5"', '"morphism_courses_v6"', '"morphism_courses_v7"']:
    content = content.replace(old_v, '"morphism_courses_v8"')
for old_v in ['"morphism_active_course"', '"morphism_active_course_v2"', '"morphism_active_course_v3"', '"morphism_active_course_v4"', '"morphism_active_course_v5"', '"morphism_active_course_v6"', '"morphism_active_course_v7"']:
    content = content.replace(old_v, '"morphism_active_course_v8"')

# Update restore message
content = content.replace(
    '¿Restaurar los cursos de demostración de Álgebra Lineal y Espacios Métricos?',
    '¿Restaurar los 4 cursos oficiales (Electricidad y Magnetismo I2, Análisis Real I3, Química I2 y OFG Muerte)?'
)

with open(APP_JS, "w", encoding="utf-8") as f:
    f.write(content)

print(f"app.js updated successfully with {len(courses)} courses!")
for c in courses:
    card_count = sum(len(n.get("cards", [])) for n in c.get("notes", []))
    print(f" - {c.get('name')}: {len(c.get('notes', []))} notes, {card_count} cards, {len(c.get('edges', []))} edges")
