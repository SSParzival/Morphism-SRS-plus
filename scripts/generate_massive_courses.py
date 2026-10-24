#!/usr/bin/env python3
"""
Enhanced Generator Script for Morphism SRS Plus:
Combines the base syllabus with comprehensive exam-focused expansions,
problem-solving archetypes, official grading rubrics, and primary sources:
1. Electricidad y Magnetismo (I2) - FIS1533
2. Análisis Real (I3) - MAT2514
3. Química para Ingenieros (I2) - QIM100E
4. OFG Muerte (Presentación y Guión: Ritos Funerarios en la Grecia Antigua) - MED836
"""

import os
import sys
import json

# Ensure project root, src, and scripts are on sys.path
_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
_SRC = os.path.join(_ROOT, "src")
_SCRIPTS = os.path.dirname(os.path.abspath(__file__))
for p in [_ROOT, _SRC, _SCRIPTS]:
    if p not in sys.path:
        sys.path.insert(0, p)

from morphism.core.models import Course, NoteNode, NoteEdge, Flashcard, ClozeCard, ProofSequenceCard
from morphism.core.course_storage import save_course, COURSES_DIR

# Import base 84-node generator and specialized modular builders
import courses_builder.base_84 as base_builder
from courses_builder.em_i2 import build_electricidad_magnetismo_course as build_em_modular
from courses_builder.real_i3 import build_analisis_real_course as build_real_modular
from courses_builder.quimica_i2 import build_quimica_course as build_quimica_modular
from courses_builder.ofg_muerte import build_ofg_muerte_course as build_ofg_modular

def merge_courses(base_course: Course, extra_course: Course) -> Course:
    """Merge notes, cards, and edges from extra_course into base_course, preserving uniqueness."""
    existing_note_ids = {n.note_id: n for n in base_course.notes}
    
    for note in extra_course.notes:
        if note.note_id in existing_note_ids:
            # Append cards that are not duplicates
            existing_cards = existing_note_ids[note.note_id].cards
            existing_titles = {getattr(c, "title", "") for c in existing_cards}
            for card in note.cards:
                if getattr(card, "title", "") not in existing_titles:
                    existing_cards.append(card)
        else:
            base_course.notes.append(note)
            existing_note_ids[note.note_id] = note

    existing_edges = {(e.source_id, e.target_id) for e in base_course.edges}
    for edge in extra_course.edges:
        if (edge.source_id, edge.target_id) not in existing_edges:
            # Verify both source and target exist
            if edge.source_id in existing_note_ids and edge.target_id in existing_note_ids:
                base_course.edges.append(edge)
                existing_edges.add((edge.source_id, edge.target_id))

    return base_course

def main():
    print("==================================================================")
    print("🚀 Generating Complete, Massive High-Coverage Courses for Morphism Plus")
    print("==================================================================")
    os.makedirs(COURSES_DIR, exist_ok=True)

    # 1. Electricidad y Magnetismo (I2)
    c_em = merge_courses(base_builder.build_electricidad_magnetismo_course(), build_em_modular())
    save_course(c_em)
    print(f"✔ Saved: {c_em.name} -> {len(c_em.notes)} notes, {sum(len(n.cards) for n in c_em.notes)} cards, {len(c_em.edges)} edges")

    # 2. Análisis Real (I3)
    c_ar = merge_courses(base_builder.build_analisis_real_course(), build_real_modular())
    save_course(c_ar)
    print(f"✔ Saved: {c_ar.name} -> {len(c_ar.notes)} notes, {sum(len(n.cards) for n in c_ar.notes)} cards, {len(c_ar.edges)} edges")

    # 3. Química para Ingenieros (I2)
    c_quim = merge_courses(base_builder.build_quimica_course(), build_quimica_modular())
    save_course(c_quim)
    print(f"✔ Saved: {c_quim.name} -> {len(c_quim.notes)} notes, {sum(len(n.cards) for n in c_quim.notes)} cards, {len(c_quim.edges)} edges")

    # 4. OFG Muerte (Presentación y Guión)
    c_ofg = merge_courses(base_builder.build_ofg_muerte_course(), build_ofg_modular())
    save_course(c_ofg)
    print(f"✔ Saved: {c_ofg.name} -> {len(c_ofg.notes)} notes, {sum(len(n.cards) for n in c_ofg.notes)} cards, {len(c_ofg.edges)} edges")

    # Seed Courses JSON for mobile app
    seed_data = [
        c_em.to_dict(include_scheduling=False),
        c_ar.to_dict(include_scheduling=False),
        c_quim.to_dict(include_scheduling=False),
        c_ofg.to_dict(include_scheduling=False)
    ]
    seed_json_path = os.path.join(_ROOT, "android/app/src/main/assets/seed_courses.json")
    with open(seed_json_path, "w", encoding="utf-8") as f:
        json.dump(seed_data, f, indent=2, ensure_ascii=False)
    print(f"✔ Exported seed courses JSON to: {seed_json_path}")

    total_notes = len(c_em.notes) + len(c_ar.notes) + len(c_quim.notes) + len(c_ofg.notes)
    total_cards = sum(sum(len(n.cards) for n in c.notes) for c in [c_em, c_ar, c_quim, c_ofg])
    total_edges = len(c_em.edges) + len(c_ar.edges) + len(c_quim.edges) + len(c_ofg.edges)
    print("==================================================================")
    print(f"🎉 TOTALS: {total_notes} Notes | {total_cards} Cards | {total_edges} Edges across 4 subjects!")
    print("==================================================================")

if __name__ == "__main__":
    main()
