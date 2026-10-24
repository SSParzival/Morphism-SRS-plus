-- ============================================================================
-- Morphism SRS Prototype 2 — Canonical SQLite Schema (Version 2)
-- Target: SQLite >= 3.38 (STRICT tables, FTS5, Recursive CTEs, WAL)
-- ============================================================================

CREATE TABLE IF NOT EXISTS app_meta (
    key         TEXT PRIMARY KEY,
    value_json  TEXT NOT NULL
) STRICT;

CREATE TABLE IF NOT EXISTS course_folders (
    id                  INTEGER PRIMARY KEY AUTOINCREMENT,
    uuid                TEXT NOT NULL UNIQUE,
    name                TEXT NOT NULL CHECK (length(trim(name)) > 0),
    parent_id           INTEGER REFERENCES course_folders(id) ON DELETE SET NULL,
    display_order       INTEGER NOT NULL DEFAULT 0,
    is_expanded         INTEGER NOT NULL DEFAULT 1 CHECK (is_expanded IN (0, 1)),
    fsrs_weights_json   TEXT,
    created_at          TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
    updated_at          TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
    CHECK (parent_id IS NULL OR parent_id <> id)
) STRICT;

CREATE TRIGGER IF NOT EXISTS trg_course_folders_prevent_cycles
BEFORE UPDATE OF parent_id ON course_folders
WHEN NEW.parent_id IS NOT NULL
BEGIN
    SELECT RAISE(ABORT, 'Cycle detected in course_folders hierarchy')
    WHERE EXISTS (
        WITH RECURSIVE ancestors(fid) AS (
            SELECT NEW.parent_id
            UNION ALL
            SELECT cf.parent_id FROM course_folders cf
            JOIN ancestors a ON cf.id = a.fid
            WHERE cf.parent_id IS NOT NULL
        )
        SELECT 1 FROM ancestors WHERE fid = OLD.id
    );
END;

CREATE TABLE IF NOT EXISTS courses (
    id                  INTEGER PRIMARY KEY AUTOINCREMENT,
    uuid                TEXT NOT NULL UNIQUE,
    name                TEXT NOT NULL UNIQUE CHECK (length(trim(name)) > 0),
    folder_id           INTEGER REFERENCES course_folders(id) ON DELETE SET NULL,
    description         TEXT NOT NULL DEFAULT '',
    color_hex           TEXT NOT NULL DEFAULT '#89b4fa',
    desired_retention   REAL NOT NULL DEFAULT 0.90 CHECK (desired_retention >= 0.70 AND desired_retention <= 0.99),
    display_order       INTEGER NOT NULL DEFAULT 0,
    is_archived         INTEGER NOT NULL DEFAULT 0 CHECK (is_archived IN (0, 1)),
    created_at          TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
    updated_at          TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
) STRICT;

CREATE INDEX IF NOT EXISTS idx_courses_folder ON courses(folder_id, display_order);

CREATE TABLE IF NOT EXISTS notes (
    id                  INTEGER PRIMARY KEY AUTOINCREMENT,
    uuid                TEXT NOT NULL UNIQUE,
    course_id           INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    external_key        TEXT,
    title               TEXT NOT NULL CHECK (length(trim(title)) > 0),
    premise_html        TEXT NOT NULL DEFAULT '',
    pos_x               REAL NOT NULL DEFAULT 0.0,
    pos_y               REAL NOT NULL DEFAULT 0.0,
    review_mode         TEXT NOT NULL DEFAULT 'standard' CHECK (review_mode IN ('standard', 'serial', 'cloze')),
    desired_retention   REAL CHECK (desired_retention IS NULL OR (desired_retention >= 0.70 AND desired_retention <= 0.99)),
    is_pinned           INTEGER NOT NULL DEFAULT 0 CHECK (is_pinned IN (0, 1)),
    created_at          TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
    updated_at          TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
    UNIQUE (course_id, external_key)
) STRICT;

CREATE INDEX IF NOT EXISTS idx_notes_course ON notes(course_id);
CREATE INDEX IF NOT EXISTS idx_notes_mode ON notes(review_mode);

CREATE TABLE IF NOT EXISTS cards (
    id                  INTEGER PRIMARY KEY AUTOINCREMENT,
    uuid                TEXT NOT NULL UNIQUE,
    note_id             INTEGER NOT NULL REFERENCES notes(id) ON DELETE CASCADE,
    step_order          INTEGER NOT NULL DEFAULT 0 CHECK (step_order >= 0),
    title               TEXT NOT NULL DEFAULT '',
    front_html          TEXT NOT NULL DEFAULT '',
    back_html           TEXT NOT NULL DEFAULT '',
    hint_html           TEXT NOT NULL DEFAULT '',
    created_at          TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
    updated_at          TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
) STRICT;

CREATE INDEX IF NOT EXISTS idx_cards_note_step ON cards(note_id, step_order);

CREATE TABLE IF NOT EXISTS card_schedules (
    card_id             INTEGER PRIMARY KEY REFERENCES cards(id) ON DELETE CASCADE,
    state               INTEGER NOT NULL DEFAULT 0 CHECK (state IN (0, 1, 2, 3)),
    step                INTEGER DEFAULT 0,
    stability           REAL,
    difficulty          REAL,
    due_at              TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
    last_review_at      TEXT,
    reps                INTEGER NOT NULL DEFAULT 0,
    lapses              INTEGER NOT NULL DEFAULT 0,
    scheduled_days      INTEGER NOT NULL DEFAULT 0,
    elapsed_days        INTEGER NOT NULL DEFAULT 0,
    is_suspended        INTEGER NOT NULL DEFAULT 0 CHECK (is_suspended IN (0, 1)),
    is_buried           INTEGER NOT NULL DEFAULT 0 CHECK (is_buried IN (0, 1))
) STRICT;

CREATE INDEX IF NOT EXISTS idx_schedules_due ON card_schedules(is_suspended, is_buried, state, due_at);

CREATE TRIGGER IF NOT EXISTS trg_cards_auto_schedule
AFTER INSERT ON cards
BEGIN
    INSERT OR IGNORE INTO card_schedules (card_id, state, step, due_at)
    VALUES (NEW.id, 0, 0, NEW.created_at);
END;

CREATE TABLE IF NOT EXISTS edges (
    id                  INTEGER PRIMARY KEY AUTOINCREMENT,
    uuid                TEXT NOT NULL UNIQUE,
    course_id           INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    source_note_id      INTEGER NOT NULL REFERENCES notes(id) ON DELETE CASCADE,
    target_note_id      INTEGER NOT NULL REFERENCES notes(id) ON DELETE CASCADE,
    label               TEXT NOT NULL DEFAULT '',
    weight              REAL NOT NULL DEFAULT 1.0,
    created_at          TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
    CHECK (source_note_id <> target_note_id),
    UNIQUE (source_note_id, target_note_id)
) STRICT;

CREATE INDEX IF NOT EXISTS idx_edges_course ON edges(course_id);
CREATE INDEX IF NOT EXISTS idx_edges_source ON edges(source_note_id);
CREATE INDEX IF NOT EXISTS idx_edges_target ON edges(target_note_id);

CREATE TABLE IF NOT EXISTS tags (
    id                  INTEGER PRIMARY KEY AUTOINCREMENT,
    name                TEXT NOT NULL COLLATE NOCASE UNIQUE CHECK (length(trim(name)) > 0),
    category            TEXT NOT NULL DEFAULT 'general',
    scope               TEXT NOT NULL DEFAULT 'standard',
    color_hex           TEXT NOT NULL DEFAULT '#cba6f7'
) STRICT;

CREATE TABLE IF NOT EXISTS note_tags (
    note_id             INTEGER NOT NULL REFERENCES notes(id) ON DELETE CASCADE,
    tag_id              INTEGER NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (note_id, tag_id)
) STRICT;

CREATE INDEX IF NOT EXISTS idx_note_tags_tag ON note_tags(tag_id);

CREATE TABLE IF NOT EXISTS review_logs (
    id                  INTEGER PRIMARY KEY AUTOINCREMENT,
    uuid                TEXT NOT NULL UNIQUE,
    card_id             INTEGER NOT NULL REFERENCES cards(id) ON DELETE CASCADE,
    rating              INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 4),
    reviewed_at         TEXT NOT NULL,
    duration_ms         INTEGER NOT NULL DEFAULT 0,
    prev_state          INTEGER NOT NULL DEFAULT 0,
    prev_step           INTEGER,
    prev_stability      REAL,
    prev_difficulty     REAL,
    prev_due_at         TEXT,
    prev_last_review_at TEXT,
    new_state           INTEGER NOT NULL DEFAULT 1,
    new_step            INTEGER,
    new_stability       REAL,
    new_difficulty      REAL,
    new_due_at          TEXT NOT NULL,
    elapsed_days        REAL NOT NULL DEFAULT 0.0,
    scheduled_days      REAL NOT NULL DEFAULT 0.0
) STRICT;

CREATE INDEX IF NOT EXISTS idx_review_logs_card ON review_logs(card_id, reviewed_at);
CREATE INDEX IF NOT EXISTS idx_review_logs_date ON review_logs(reviewed_at);

CREATE TABLE IF NOT EXISTS media_assets (
    sha256_hash         TEXT PRIMARY KEY CHECK (length(sha256_hash) = 64),
    original_name       TEXT NOT NULL DEFAULT '',
    mime_type           TEXT NOT NULL DEFAULT 'image/png',
    byte_size           INTEGER NOT NULL DEFAULT 0,
    created_at          TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
) STRICT;

CREATE TABLE IF NOT EXISTS scratchbook_pages (
    id                  INTEGER PRIMARY KEY AUTOINCREMENT,
    uuid                TEXT NOT NULL UNIQUE,
    title               TEXT NOT NULL DEFAULT 'Scratchpad',
    content_text        TEXT NOT NULL DEFAULT '',
    display_order       INTEGER NOT NULL DEFAULT 0,
    updated_at          TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
) STRICT;

CREATE TABLE IF NOT EXISTS sync_oplog (
    id                  INTEGER PRIMARY KEY AUTOINCREMENT,
    entity_table        TEXT NOT NULL,
    entity_uuid         TEXT NOT NULL,
    operation           TEXT NOT NULL,
    payload_json        TEXT NOT NULL DEFAULT '{}',
    created_at          TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
    device_id           TEXT NOT NULL DEFAULT 'desktop-local'
) STRICT;

CREATE VIRTUAL TABLE IF NOT EXISTS cards_fts USING fts5(
    title,
    front_html,
    back_html,
    hint_html,
    content='cards',
    content_rowid='id',
    tokenize='unicode61 remove_diacritics 2'
);

CREATE TRIGGER IF NOT EXISTS trg_cards_fts_insert AFTER INSERT ON cards BEGIN
    INSERT INTO cards_fts(rowid, title, front_html, back_html, hint_html)
    VALUES (NEW.id, NEW.title, NEW.front_html, NEW.back_html, NEW.hint_html);
END;

CREATE TRIGGER IF NOT EXISTS trg_cards_fts_delete AFTER DELETE ON cards BEGIN
    INSERT INTO cards_fts(cards_fts, rowid, title, front_html, back_html, hint_html)
    VALUES ('delete', OLD.id, OLD.title, OLD.front_html, OLD.back_html, OLD.hint_html);
END;

CREATE TRIGGER IF NOT EXISTS trg_cards_fts_update AFTER UPDATE OF title, front_html, back_html, hint_html ON cards BEGIN
    INSERT INTO cards_fts(cards_fts, rowid, title, front_html, back_html, hint_html)
    VALUES ('delete', OLD.id, OLD.title, OLD.front_html, OLD.back_html, OLD.hint_html);
    INSERT INTO cards_fts(rowid, title, front_html, back_html, hint_html)
    VALUES (NEW.id, NEW.title, NEW.front_html, NEW.back_html, NEW.hint_html);
END;
