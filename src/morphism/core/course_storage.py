import os
import json
import zipfile
import shutil
import urllib.request
from typing import List, Dict, Any, Optional, Tuple
from .models import Course, NoteNode, NoteEdge, Flashcard, ProofSequenceCard, ClozeCard, ReviewLogRecord
from fsrs import Card as FSRSCard
from .app_paths import (COURSES_DIR, SCHEDULING_DIR, ASSETS_DIR, 
                       MATHJAX_SVG_JS, CHART_JS, ensure_app_directories)

FOLDER_CONFIG_FILE = "folder_config.cfg"
MATHJAX_CDN_SVG_URL = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js"
CHARTJS_CDN_URL = "https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"

def ensure_local_mathjax_assets():
    """Ensure MathJax 3 SVG vector bundle and Chart.js are downloaded locally for 100% offline usage."""
    ensure_app_directories()
    if not os.path.exists(MATHJAX_SVG_JS):
        try:
            print("Downloading offline MathJax 3 tex-svg bundle into assets/...")
            urllib.request.urlretrieve(MATHJAX_CDN_SVG_URL, MATHJAX_SVG_JS)
            print("MathJax 3 bundle downloaded successfully for offline usage!")
        except Exception as e:
            print(f"Warning: Could not download MathJax 3 offline bundle: {e}")

    if not os.path.exists(CHART_JS):
        try:
            print("Downloading offline Chart.js bundle into assets/...")
            urllib.request.urlretrieve(CHARTJS_CDN_URL, CHART_JS)
            print("Chart.js bundle downloaded successfully for offline usage!")
        except Exception as e:
            print(f"Warning: Could not download Chart.js offline bundle: {e}")

def ensure_directories():
    """Ensure Courses, scheduling, and assets directories exist and contain required libraries."""
    ensure_app_directories()
    ensure_local_mathjax_assets()

def sanitize_filename(name: str) -> str:
    """Sanitize filename string for OS path safety."""
    return "".join(c for c in name if c.isalnum() or c in (' ', '_', '-', '/', '\\')).strip()

def get_course_file_path(course_name: str, folder_path: str = "") -> str:
    ensure_directories()
    safe_folder = folder_path.strip("/\\")
    dir_path = os.path.join(COURSES_DIR, safe_folder) if safe_folder else COURSES_DIR
    os.makedirs(dir_path, exist_ok=True)
    safe_name = "".join(c for c in course_name if c.isalnum() or c in (' ', '_', '-')).strip()
    return os.path.join(dir_path, f"{safe_name}.json")

def get_scheduling_file_path(course_name: str) -> str:
    ensure_directories()
    safe_name = "".join(c for c in course_name if c.isalnum() or c in (' ', '_', '-')).strip()
    return os.path.join(SCHEDULING_DIR, f"{safe_name}_scheduling.json")

def get_review_logs_file_path(course_name: str) -> str:
    ensure_directories()
    safe_name = "".join(c for c in course_name if c.isalnum() or c in (' ', '_', '-')).strip()
    return os.path.join(SCHEDULING_DIR, f"{safe_name}_reviews.json")

def list_courses_info() -> List[Dict[str, Any]]:
    """
    Recursively list all available courses (.json files) and folders (containing folder_config.cfg or directories).
    Returns list of dicts: [{'name': 'Linear Algebra', 'folder_path': 'Math', 'is_folder': False}]
    """
    ensure_directories()
    items = []
    
    for root, dirs, files in os.walk(COURSES_DIR):
        rel_folder = os.path.relpath(root, COURSES_DIR)
        if rel_folder == ".":
            rel_folder = ""
        else:
            rel_folder = rel_folder.replace("\\", "/")

        if rel_folder:
            items.append({
                "name": os.path.basename(rel_folder),
                "folder_path": rel_folder,
                "is_folder": True
            })

        for file in files:
            if file.endswith(".json"):
                course_name = file[:-5]
                items.append({
                    "name": course_name,
                    "folder_path": rel_folder,
                    "is_folder": False
                })
    return items

def list_courses() -> List[str]:
    """List all course names."""
    return [c["name"] for c in list_courses_info() if not c.get("is_folder")]

def create_folder(folder_path: str):
    """Create a folder path and write folder_config.cfg to ensure folder persistence."""
    dir_path = os.path.join(COURSES_DIR, folder_path.strip("/\\"))
    os.makedirs(dir_path, exist_ok=True)
    cfg_path = os.path.join(dir_path, FOLDER_CONFIG_FILE)
    if not os.path.exists(cfg_path):
        with open(cfg_path, "w", encoding="utf-8") as f:
            f.write(f"[folder]\nname = {os.path.basename(folder_path)}\ntype = course_folder\n")

def save_course(course: Course):
    """Save course structure to Courses/ and FSRS scheduling state losslessly to scheduling/."""
    ensure_directories()
    course_path = get_course_file_path(course.name, course.folder_path)
    scheduling_path = get_scheduling_file_path(course.name)

    # Save graph structure
    with open(course_path, "w", encoding="utf-8") as f:
        json.dump(course.to_dict(), f, indent=2)

    # Save FSRS scheduling state natively using FSRSCard.to_dict()
    scheduling_data = {}
    for note in course.notes:
        for card in note.cards:
            if hasattr(card, "fsrs_card"):
                fc = card.fsrs_card
                if hasattr(fc, "to_dict"):
                    scheduling_data[str(card.item_id)] = fc.to_dict()

    with open(scheduling_path, "w", encoding="utf-8") as f:
        json.dump(scheduling_data, f, indent=2)

def load_course(course_name: str, folder_path: str = "") -> Course:
    """Load course graph structure and re-apply scheduling data accurately from scheduling/."""
    ensure_directories()
    
    if not folder_path:
        for cinfo in list_courses_info():
            if not cinfo.get("is_folder") and cinfo["name"] == course_name:
                folder_path = cinfo["folder_path"]
                break

    course_path = get_course_file_path(course_name, folder_path)
    scheduling_path = get_scheduling_file_path(course_name)

    if not os.path.exists(course_path):
        raise FileNotFoundError(f"Course file '{course_path}' not found.")

    with open(course_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    scheduling_data = {}
    if os.path.exists(scheduling_path):
        try:
            with open(scheduling_path, "r", encoding="utf-8") as f:
                scheduling_data = json.load(f)
        except Exception as e:
            print(f"Failed to load scheduling data for '{course_name}': {e}")

    notes = []
    for nd in data.get("notes", []):
        note = NoteNode(
            nd.get("note_id"),
            nd.get("title", "Untitled Note"),
            nd.get("x", 0.0),
            nd.get("y", 0.0),
            nd.get("tags", []),
            note_type=nd.get("note_type", "standard"),
            desired_retention=nd.get("desired_retention", 0.85)
        )

        for cd in nd.get("cards", []):
            ctype = cd.get("type", "Flashcard")
            cid = cd.get("item_id")
            if ctype == "Flashcard":
                card = Flashcard(cd.get("title", ""), cd.get("front", ""), cd.get("back", ""), item_id=cid)
            elif ctype == "ProofSequenceCard":
                card = ProofSequenceCard(cd.get("title", ""), cd.get("premise", ""), cd.get("steps", []), item_id=cid)
            elif ctype == "ClozeCard":
                card = ClozeCard(cd.get("title", ""), cd.get("text", cd.get("front", "")), item_id=cid)
            else:
                card = Flashcard(cd.get("title", ""), cd.get("front", ""), cd.get("back", ""), item_id=cid)

            # Restore FSRS state using FSRSCard.from_dict()
            raw_sched = scheduling_data.get(str(card.item_id)) or cd.get("fsrs_card")
            if raw_sched:
                try:
                    if "card_id" not in raw_sched:
                        raw_sched["card_id"] = card.item_id
                    if "step" not in raw_sched:
                        raw_sched["step"] = 0
                    if "state" not in raw_sched:
                        raw_sched["state"] = 1
                    card.fsrs_card = FSRSCard.from_dict(raw_sched)
                except Exception as ex:
                    print(f"Error restoring FSRS state for card {cid}: {ex}")

            note.add_card(card)
        notes.append(note)

    edges = [NoteEdge(ed["source_id"], ed["target_id"], ed.get("label", "")) for ed in data.get("edges", [])]
    return Course(course_name, notes, edges, folder_path=data.get("folder_path", folder_path))

def create_course(name: str, folder_path: str = "") -> Course:
    """Create a new empty Course and save it."""
    course = Course(name, folder_path=folder_path)
    save_course(course)
    return course

def delete_course(name: str, folder_path: str = ""):
    """Delete course and associated scheduling data files."""
    course_path = get_course_file_path(name, folder_path)
    scheduling_path = get_scheduling_file_path(name)
    logs_path = get_review_logs_file_path(name)

    if os.path.exists(course_path):
        os.remove(course_path)
    if os.path.exists(scheduling_path):
        os.remove(scheduling_path)
    if os.path.exists(logs_path):
        os.remove(logs_path)

def save_review_log(course_name: str, log_record: ReviewLogRecord):
    """Append a review log record to scheduling/<course_name>_reviews.json for FSRS optimization."""
    ensure_directories()
    logs_path = get_review_logs_file_path(course_name)
    logs = []
    if os.path.exists(logs_path):
        try:
            with open(logs_path, "r", encoding="utf-8") as f:
                logs = json.load(f)
        except Exception:
            logs = []
    
    logs.append(log_record.to_dict())
    with open(logs_path, "w", encoding="utf-8") as f:
        json.dump(logs, f, indent=2)

def pop_last_review_log(course_name: str) -> Optional[Dict[str, Any]]:
    """Remove and return the last review log record if undoing a rating."""
    logs_path = get_review_logs_file_path(course_name)
    if not os.path.exists(logs_path):
        return None
    try:
        with open(logs_path, "r", encoding="utf-8") as f:
            logs = json.load(f)
        if logs:
            popped = logs.pop()
            with open(logs_path, "w", encoding="utf-8") as f:
                json.dump(logs, f, indent=2)
            return popped
    except Exception:
        pass
    return None

def load_review_logs(course_name: str) -> List[ReviewLogRecord]:
    """Load review log history records for a course."""
    logs_path = get_review_logs_file_path(course_name)
    if not os.path.exists(logs_path):
        return []
    try:
        with open(logs_path, "r", encoding="utf-8") as f:
            data = json.load(f)
            return [ReviewLogRecord.from_dict(d) for d in data]
    except Exception:
        return []

def import_course_json(filepath: str, dest_folder: str = "") -> Course:
    """Import a course JSON file into the Courses directory."""
    with open(filepath, "r", encoding="utf-8") as f:
        data = json.load(f)

    name = data.get("name", os.path.splitext(os.path.basename(filepath))[0])
    data["name"] = name
    if dest_folder:
        data["folder_path"] = dest_folder

    course_path = get_course_file_path(name, dest_folder or data.get("folder_path", ""))
    with open(course_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)

    return load_course(name, dest_folder or data.get("folder_path", ""))

def export_course_json(course: Course, dest_filepath: str):
    """Export a course data structure to an external file without user-specific FSRS scheduling or due dates."""
    with open(dest_filepath, "w", encoding="utf-8") as f:
        json.dump(course.to_dict(include_scheduling=False), f, indent=2)

def export_course_package_zip(course: Course, dest_zip_path: str):
    """Export complete course package (.morphism / .zip) including graph structure, scheduling, and reviews."""
    save_course(course)
    course_path = get_course_file_path(course.name, course.folder_path)
    scheduling_path = get_scheduling_file_path(course.name)
    logs_path = get_review_logs_file_path(course.name)

    with zipfile.ZipFile(dest_zip_path, "w", zipfile.ZIP_DEFLATED) as zf:
        if os.path.exists(course_path):
            zf.write(course_path, arcname="course.json")
        if os.path.exists(scheduling_path):
            zf.write(scheduling_path, arcname="scheduling.json")
        if os.path.exists(logs_path):
            zf.write(logs_path, arcname="reviews.json")

def import_course_package_zip(zip_path: str, dest_folder: str = "") -> Course:
    """Import a complete course package (.morphism / .zip)."""
    with zipfile.ZipFile(zip_path, "r") as zf:
        course_data = json.loads(zf.read("course.json").decode("utf-8"))
        name = course_data.get("name", "Imported Course")
        if dest_folder:
            course_data["folder_path"] = dest_folder

        course_path = get_course_file_path(name, dest_folder or course_data.get("folder_path", ""))
        with open(course_path, "w", encoding="utf-8") as f:
            json.dump(course_data, f, indent=2)

        if "scheduling.json" in zf.namelist():
            sched_path = get_scheduling_file_path(name)
            with open(sched_path, "wb") as f:
                f.write(zf.read("scheduling.json"))

        if "reviews.json" in zf.namelist():
            reviews_path = get_review_logs_file_path(name)
            with open(reviews_path, "wb") as f:
                f.write(zf.read("reviews.json"))

    return load_course(name, dest_folder or course_data.get("folder_path", ""))

def import_raw_notes_into_course(course: Course, json_filepath: str) -> tuple[int, int]:
    """
    Import a list of raw AI-generated notes/cards and optional edges into an existing Course.
    Generates missing IDs and auto-positions notes on the canvas.
    Returns (notes_count, cards_count).
    """
    from models import generate_id64
    with open(json_filepath, "r", encoding="utf-8") as f:
        data = json.load(f)

    raw_notes = data.get("notes", [])
    raw_edges = data.get("edges", [])

    id_map = {}
    total_notes_added = 0
    total_cards_added = 0

    grid_col_count = 4
    spacing_x = 240.0
    spacing_y = 180.0

    existing_count = len(course.notes)

    for idx, nd in enumerate(raw_notes):
        note_id = generate_id64()
        orig_id = str(nd.get("note_id", idx))
        title = nd.get("title", f"Note {existing_count + idx + 1}")

        id_map[orig_id] = note_id
        id_map[str(idx)] = note_id
        id_map[title] = note_id

        col = (existing_count + idx) % grid_col_count
        row = (existing_count + idx) // grid_col_count
        x = 100.0 + col * spacing_x
        y = 100.0 + row * spacing_y

        note = NoteNode(
            note_id=note_id,
            title=title,
            x=x,
            y=y,
            tags=nd.get("tags", []),
            note_type=nd.get("note_type", "standard"),
            desired_retention=nd.get("desired_retention", 0.85)
        )

        for cd in nd.get("cards", []):
            ctype = cd.get("type", "Flashcard")
            card_id = generate_id64()
            ctitle = cd.get("title", "Card")
            
            if ctype == "Flashcard":
                card = Flashcard(ctitle, cd.get("front", ""), cd.get("back", ""), item_id=card_id)
            elif ctype == "ProofSequenceCard":
                card = ProofSequenceCard(ctitle, cd.get("premise", ""), cd.get("steps", []), item_id=card_id)
            elif ctype == "ClozeCard":
                card = ClozeCard(ctitle, cd.get("text", cd.get("front", "")), item_id=card_id)
            else:
                card = Flashcard(ctitle, cd.get("front", ""), cd.get("back", ""), item_id=card_id)

            note.add_card(card)
            total_cards_added += 1

        course.notes.append(note)
        total_notes_added += 1

    for ed in raw_edges:
        raw_src = str(ed.get("source_id", ""))
        raw_tgt = str(ed.get("target_id", ""))
        src_id = id_map.get(raw_src, raw_src)
        tgt_id = id_map.get(raw_tgt, raw_tgt)
        label = ed.get("label", "Prerequisite")

        if src_id and tgt_id and src_id != tgt_id:
            course.edges.append(NoteEdge(src_id, tgt_id, label))

    save_course(course)
    return total_notes_added, total_cards_added

def ensure_seed_courses():
    """Ensure at least one course container exists."""
    ensure_directories()
    info_list = list_courses_info()
    valid_courses = [c for c in info_list if not c.get("is_folder")]
    if valid_courses:
        return [c["name"] for c in valid_courses]

    c = Course("My Course")
    save_course(c)
    return ["My Course"]
