from __future__ import annotations

from dataclasses import dataclass
import re
import sqlite3
from typing import Any


@dataclass
class BrowserRowItem:
    card_id: int
    note_id: int
    course_id: int
    course_name: str
    note_title: str
    review_mode: str
    step_order: int
    card_title: str
    front_html: str
    back_html: str
    state: int
    stability: float | None
    difficulty: float | None
    due_at: str
    last_review_at: str | None
    lapses: int
    is_suspended: bool
    tags_csv: str


class BrowserRepository:
    """Repository for the Mass Card Browser with FTS5 and token query parsing."""

    TOKEN_RE = re.compile(r'([a-zA-Z_]+):(?:"([^"]+)"|(\S+))')

    def __init__(self, conn: sqlite3.Connection) -> None:
        self.conn = conn

    def search_cards(
        self,
        query_text: str = "",
        course_id: int | None = None,
        folder_id: int | None = None,
        tag_filter: str | None = None,
        state_filter: int | None = None,
        review_mode_filter: str | None = None,
        suspended_filter: bool | None = None,
        limit: int = 2000,
    ) -> list[BrowserRowItem]:
        clauses: list[str] = ["1=1"]
        params: list[Any] = []

        free_text = query_text.strip()
        for match in self.TOKEN_RE.finditer(query_text):
            key = match.group(1).lower()
            val = (match.group(2) or match.group(3) or "").strip()
            if not val:
                continue
            if key == "course":
                clauses.append("LOWER(co.name) LIKE ?")
                params.append(f"%{val.lower()}%")
            elif key == "tag":
                clauses.append(
                    """
                    EXISTS (
                        SELECT 1 FROM note_tags nt
                        JOIN tags tg ON tg.id = nt.tag_id
                        WHERE nt.note_id = n.id AND LOWER(tg.name) LIKE ?
                    )
                    """
                )
                params.append(f"%{val.lower()}%")
            elif key == "mode":
                clauses.append("LOWER(n.review_mode) = ?")
                params.append(val.lower())
            elif key == "is":
                v_low = val.lower()
                if v_low == "due":
                    clauses.append("cs.state > 0 AND cs.due_at <= strftime('%Y-%m-%dT%H:%M:%fZ', 'now')")
                elif v_low == "new":
                    clauses.append("cs.state = 0")
                elif v_low == "learning":
                    clauses.append("cs.state IN (1, 3)")
                elif v_low == "review":
                    clauses.append("cs.state = 2")
                elif v_low == "suspended":
                    clauses.append("cs.is_suspended = 1")
            elif key in ("prop", "lapses"):
                if val.startswith(">"):
                    try:
                        clauses.append("cs.lapses > ?")
                        params.append(int(val[1:]))
                    except ValueError:
                        pass

        free_text = self.TOKEN_RE.sub("", free_text).strip()

        if course_id is not None:
            clauses.append("n.course_id = ?")
            params.append(course_id)

        if folder_id is not None:
            clauses.append(
                """
                co.folder_id IN (
                    WITH RECURSIVE tree(id) AS (
                        SELECT ?
                        UNION ALL
                        SELECT f.id FROM course_folders f JOIN tree t ON f.parent_id = t.id
                    )
                    SELECT id FROM tree
                )
                """
            )
            params.append(folder_id)

        if tag_filter:
            clauses.append(
                """
                EXISTS (
                    SELECT 1 FROM note_tags nt
                    JOIN tags tg ON tg.id = nt.tag_id
                    WHERE nt.note_id = n.id AND tg.name = ?
                )
                """
            )
            params.append(tag_filter.lower())

        if state_filter is not None:
            clauses.append("cs.state = ?")
            params.append(state_filter)

        if review_mode_filter:
            clauses.append("n.review_mode = ?")
            params.append(review_mode_filter)

        if suspended_filter is not None:
            clauses.append("cs.is_suspended = ?")
            params.append(1 if suspended_filter else 0)

        if free_text:
            safe_tokens = [re.sub(r'[^\w\\]+', '', tok) for tok in free_text.split() if tok]
            fts_query = " AND ".join(f'"{tok}"*' for tok in safe_tokens if tok)
            if fts_query:
                clauses.append(
                    """
                    (
                        c.id IN (SELECT rowid FROM cards_fts WHERE cards_fts MATCH ?)
                        OR LOWER(n.title) LIKE ?
                    )
                    """
                )
                params.extend([fts_query, f"%{free_text.lower()}%"])
            else:
                clauses.append("(LOWER(n.title) LIKE ? OR LOWER(c.front_html) LIKE ? OR LOWER(c.back_html) LIKE ?)")
                like_str = f"%{free_text.lower()}%"
                params.extend([like_str, like_str, like_str])

        where_sql = " AND ".join(clauses)
        params.append(limit)

        rows = self.conn.execute(
            f"""
            SELECT
                c.id AS card_id,
                n.id AS note_id,
                co.id AS course_id,
                co.name AS course_name,
                n.title AS note_title,
                n.review_mode AS review_mode,
                c.step_order AS step_order,
                c.title AS card_title,
                c.front_html AS front_html,
                c.back_html AS back_html,
                cs.state AS state,
                cs.stability AS stability,
                cs.difficulty AS difficulty,
                cs.due_at AS due_at,
                cs.last_review_at AS last_review_at,
                cs.lapses AS lapses,
                cs.is_suspended AS is_suspended,
                COALESCE((
                    SELECT GROUP_CONCAT(tg.name, ', ')
                    FROM note_tags nt
                    JOIN tags tg ON tg.id = nt.tag_id
                    WHERE nt.note_id = n.id
                ), '') AS tags_csv
            FROM cards c
            JOIN notes n ON n.id = c.note_id
            JOIN courses co ON co.id = n.course_id
            JOIN card_schedules cs ON cs.card_id = c.id
            WHERE {where_sql}
            ORDER BY co.display_order ASC, n.title ASC, c.step_order ASC
            LIMIT ?;
            """,
            params,
        ).fetchall()

        return [
            BrowserRowItem(
                card_id=int(r["card_id"]),
                note_id=int(r["note_id"]),
                course_id=int(r["course_id"]),
                course_name=str(r["course_name"]),
                note_title=str(r["note_title"]),
                review_mode=str(r["review_mode"]),
                step_order=int(r["step_order"]),
                card_title=str(r["card_title"]),
                front_html=str(r["front_html"]),
                back_html=str(r["back_html"]),
                state=int(r["state"]),
                stability=float(r["stability"]) if r["stability"] is not None else None,
                difficulty=float(r["difficulty"]) if r["difficulty"] is not None else None,
                due_at=str(r["due_at"]),
                last_review_at=str(r["last_review_at"]) if r["last_review_at"] is not None else None,
                lapses=int(r["lapses"]),
                is_suspended=bool(r["is_suspended"]),
                tags_csv=str(r["tags_csv"]),
            )
            for r in rows
        ]
