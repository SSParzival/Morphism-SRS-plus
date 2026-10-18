from __future__ import annotations

from dataclasses import dataclass, field
import sqlite3

from morphism_srs.domain.enums import NoteReviewMode
from morphism_srs.domain.models import CardModel, CourseModel, EdgeModel, NoteModel
from morphism_srs.services.dsl_compiler.parser import DSLCourseAST, DSLParser
from morphism_srs.services.dsl_compiler.validator import DSLDiagnostic, DSLValidator
from morphism_srs.services.layout_service import LayoutService
from morphism_srs.services.safe_html import sanitize_math_html
from morphism_srs.storage.repositories.course_repo import CourseRepository
from morphism_srs.storage.repositories.folder_repo import FolderRepository
from morphism_srs.storage.repositories.note_repo import NoteRepository
from morphism_srs.storage.unit_of_work import UnitOfWork


@dataclass
class DSLCompilationResult:
    ast: DSLCourseAST
    diagnostics: list[DSLDiagnostic] = field(default_factory=list)
    course_id: int | None = None
    notes_created: int = 0
    notes_updated: int = 0
    edges_created: int = 0

    @property
    def has_errors(self) -> bool:
        return any(d.severity == "error" for d in self.diagnostics)


class DSLCompiler:
    """Compiles .mdsl source into SQLite v2 courses, notes, cards, tags, and auto-laid-out DAG edges."""

    def __init__(self, conn: sqlite3.Connection) -> None:
        self.conn = conn
        self.parser = DSLParser()
        self.validator = DSLValidator()
        self.folder_repo = FolderRepository(conn)
        self.course_repo = CourseRepository(conn)
        self.note_repo = NoteRepository(conn)

    def check_only(self, source: str) -> DSLCompilationResult:
        ast = self.parser.parse(source)
        known_tags = {t.name for t in self.note_repo.list_all_tags(limit=5000)}
        diags = self.validator.validate(ast, known_tags=known_tags)
        return DSLCompilationResult(ast=ast, diagnostics=diags)

    def compile_and_commit(
        self,
        source: str,
        target_course_id: int | None = None,
        auto_layout: bool = True,
    ) -> DSLCompilationResult:
        res = self.check_only(source)
        if res.has_errors:
            return res

        ast = res.ast
        with UnitOfWork(self.conn):
            course: CourseModel | None = None
            if target_course_id is not None:
                course = self.course_repo.get_by_id(target_course_id)
            if course is None and ast.course_name:
                course = self.course_repo.get_by_name(ast.course_name)
            if course is None:
                folder_id = None
                if ast.folder_path:
                    parts = [p for p in ast.folder_path.replace("\\", "/").split("/") if p.strip()]
                    folder_id = self.folder_repo.ensure_folder_path(parts)
                course = self.course_repo.create(
                    CourseModel(
                        name=ast.course_name or "Compiled DSL Course",
                        folder_id=folder_id,
                        color_hex=ast.color_hex or "#89b4fa",
                        description=ast.description,
                    )
                )

            assert course.id is not None
            res.course_id = course.id

            key_to_note_id: dict[str, int] = {}
            unpositioned_ids: set[int] = set()

            for dsl_note in ast.notes:
                existing = self.note_repo.get_by_external_key(course.id, dsl_note.external_key)
                mode_enum = NoteReviewMode(dsl_note.mode)
                premise_clean = sanitize_math_html(dsl_note.premise)

                if existing is None:
                    cards = [
                        CardModel(
                            step_order=idx,
                            title=c.title,
                            front_html=sanitize_math_html(c.front),
                            back_html=sanitize_math_html(c.back),
                            hint_html=sanitize_math_html(c.hint),
                        )
                        for idx, c in enumerate(dsl_note.cards)
                    ]
                    px, py = dsl_note.pos if dsl_note.pos is not None else (0.0, 0.0)
                    created = self.note_repo.create(
                        NoteModel(
                            course_id=course.id,
                            external_key=dsl_note.external_key,
                            title=dsl_note.title or dsl_note.external_key,
                            premise_html=premise_clean,
                            pos_x=px,
                            pos_y=py,
                            review_mode=mode_enum,
                            desired_retention=dsl_note.retention,
                            tags=dsl_note.tags,
                            cards=cards,
                        )
                    )
                    assert created.id is not None
                    key_to_note_id[dsl_note.external_key] = created.id
                    if dsl_note.pos is None:
                        unpositioned_ids.add(created.id)
                    res.notes_created += 1
                else:
                    assert existing.id is not None
                    existing.title = dsl_note.title or existing.title
                    existing.premise_html = premise_clean
                    existing.review_mode = mode_enum
                    existing.desired_retention = dsl_note.retention
                    existing.tags = dsl_note.tags
                    if dsl_note.pos is not None:
                        existing.pos_x, existing.pos_y = dsl_note.pos

                    new_cards: list[CardModel] = []
                    for idx, dc in enumerate(dsl_note.cards):
                        if idx < len(existing.cards):
                            ec = existing.cards[idx]
                            ec.step_order = idx
                            ec.title = dc.title
                            ec.front_html = sanitize_math_html(dc.front)
                            ec.back_html = sanitize_math_html(dc.back)
                            ec.hint_html = sanitize_math_html(dc.hint)
                            new_cards.append(ec)
                        else:
                            new_cards.append(
                                CardModel(
                                    note_id=existing.id,
                                    step_order=idx,
                                    title=dc.title,
                                    front_html=sanitize_math_html(dc.front),
                                    back_html=sanitize_math_html(dc.back),
                                    hint_html=sanitize_math_html(dc.hint),
                                )
                            )
                    existing.cards = new_cards
                    self.note_repo.update(existing, sync_cards=True)
                    key_to_note_id[dsl_note.external_key] = existing.id
                    res.notes_updated += 1

            for dsl_note in ast.notes:
                dst_id = key_to_note_id.get(dsl_note.external_key)
                if dst_id is None:
                    continue
                for dep_key in dsl_note.deps:
                    src_id = key_to_note_id.get(dep_key)
                    if src_id is None:
                        ext_existing = self.note_repo.get_by_external_key(course.id, dep_key)
                        if ext_existing and ext_existing.id is not None:
                            src_id = ext_existing.id
                    if src_id is not None and src_id != dst_id:
                        edge = self.note_repo.create_edge(
                            EdgeModel(course_id=course.id, source_note_id=src_id, target_note_id=dst_id)
                        )
                        if edge is not None:
                            res.edges_created += 1

            if auto_layout and unpositioned_ids:
                all_notes = self.note_repo.list_by_course(course.id, include_children=False)
                all_edges = self.note_repo.list_edges_by_course(course.id)
                computed = LayoutService.compute_layered_layout(
                    note_ids=[n.id for n in all_notes if n.id is not None],
                    edges=[(e.source_note_id, e.target_note_id) for e in all_edges],
                )
                filtered = {nid: xy for nid, xy in computed.items() if nid in unpositioned_ids}
                self.note_repo.update_positions_bulk(filtered)

        return res

    @staticmethod
    def decompile_course(
        course: CourseModel,
        notes: list[NoteModel],
        edges: list[EdgeModel],
        folder_path: str = "",
    ) -> str:
        """Decompiles a CourseModel and its notes/edges into a clean .mdsl string."""
        lines: list[str] = [f'@course "{course.name}"']
        if folder_path:
            lines.append(f'@folder "{folder_path}"')
        lines.append("")

        id_to_key: dict[int, str] = {}
        for idx, n in enumerate(notes, start=1):
            key = n.external_key or f"note_{n.id or idx}"
            if n.id is not None:
                id_to_key[n.id] = key

        incoming_deps: dict[int, list[str]] = {n.id: [] for n in notes if n.id is not None}
        for e in edges:
            if e.target_note_id in incoming_deps and e.source_note_id in id_to_key:
                incoming_deps[e.target_note_id].append(id_to_key[e.source_note_id])

        for idx, n in enumerate(notes, start=1):
            key = n.external_key or f"note_{n.id or idx}"
            lines.append(f"@note {key}")
            lines.append(f'title: "{n.title}"')
            lines.append(f"mode: {n.review_mode.value}")
            if n.tags:
                lines.append(f"tags: [{', '.join(n.tags)}]")
            deps = incoming_deps.get(n.id or -1, [])
            if deps:
                lines.append(f"deps: [{', '.join(deps)}]")
            if n.premise_html.strip():
                lines.append(f"premise: {n.premise_html.strip()}")
            if n.desired_retention is not None:
                lines.append(f"retention: {n.desired_retention:.2f}")
            lines.append(f"pos: [{n.pos_x:.1f}, {n.pos_y:.1f}]")
            lines.append("---")
            for c_idx, c in enumerate(n.cards, start=1):
                if len(n.cards) > 1 or c.title:
                    header_title = f": {c.title}" if c.title else ""
                    lines.append(f"[step {c_idx}{header_title}]")
                lines.append(f"Q: {c.front_html}")
                lines.append(f"A: {c.back_html}")
                if c.hint_html.strip():
                    lines.append(f"H: {c.hint_html}")
            lines.append("---")
            lines.append("")

        return "\n".join(lines)
