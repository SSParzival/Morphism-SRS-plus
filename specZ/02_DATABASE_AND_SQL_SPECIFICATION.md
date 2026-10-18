# 02 — Auditoría del Esquema SQL, Diseño SQLite v2 y Capa de Persistencia

> [!IMPORTANT]
> Este documento contiene la **revisión técnica completa** del esquema de base de datos, incorporando las decisiones de diseño solicitadas:
> 1. **Deprecación total de `ProofSequenceCard` y `card_type`**: Se elimina la duplicación de tipos en tarjetas.
> 2. **Simplificación y extensión de modos de nota**: `review_mode IN ('standard', 'serial', 'cloze')`.
> 3. **Eliminación de `content_kind`** arbitrario en favor de una **lista estandarizada de Tags matemáticos**.
> 4. **Identificadores UUID (y enteros de 64-bit)** para exportación y compartición de mazos sin colisiones.
> 5. **Configuración de FSRS a nivel Global y de Carpeta (`course_folders`)**.
> 6. **Reemplazo de `sort_order` por `display_order`** para evitar confusiones de nombres.
> 7. **Soporte de jerarquía de carpetas anidadas (carpetas padre)** ya validado.

---

## 1. Decisiones de Simplificación y Modelo Relacional v2

### 1.1 Deprecación de `ProofSequenceCard` y Reducción a Tarjetas Atómicas
En el Prototipo 1 existía código espagueti donde:
- La tarjeta tenía `card_type = 'proof_sequence'` y guardaba pasos dentro de un array o en `card_steps`.
- Al mismo tiempo, existían notas de tipo `serial_sequence` y `serial_sequence_single` que guardaban pasos como tarjetas individuales.

**Regla de Diseño v2**:
- Se **elimina** `card_type` de la tabla `cards`.
- Se **elimina** la tabla `card_steps`.
- Toda tarjeta en Morphism SRS es simplemente una `card` compuesta por `(title, front, back)`.
- Una tarjeta **nunca** sabe si forma parte de una nota estándar, serial o cloze; su única responsabilidad es contener contenido atómico para evaluar retención.
- La **Nota (`notes`)** es quien define el flujo pedagógico mediante su `review_mode`.

---

### 1.2 Modos de Nota: `standard`, `serial` y `cloze`

La columna `notes.review_mode` se restringe a:
```sql
review_mode TEXT NOT NULL DEFAULT 'standard' CHECK (review_mode IN ('standard', 'serial', 'cloze'))
```

| Modo de Nota | Semántica de Estudio | Comportamiento del Scheduler |
| :--- | :--- | :--- |
| **`standard`** | Colección de tarjetas conceptuales independientes (ej. definiciones de un capítulo). | Cada tarjeta se programa independientemente según FSRS. La nota está vencida si al menos una tarjeta está vencida. |
| **`serial`** | Demostración encadenada paso a paso ($A_1 \to A_2 \to \dots \to A_n$). | Cada paso es una tarjeta con FSRS propio. Al estudiar, el estudiante visualiza los pasos previos dominados como contexto histórico y se evalúan los pasos que están vencidos. |
| **`cloze`** | Enunciados donde se ocultan partes clave o donde cada tarjeta condiciona en el contexto de todas las demás (estilo Anki Cloze / Oclusión condicional). | Las tarjetas comparten el contexto global de la nota pero se evalúan con oclusiones independientes. |

---

### 1.3 Eliminación de `content_kind` y Sistema de Tags Estandarizados

> **Respuesta a tu observación**: *`content_kind "definition | theorem | proof | exercise"` creo que no debería usarse. Es arbitrario decir que una nota necesariamente debe ser uno de estos, mejor unificar con tags.*

1. **Eliminación**: Se remueve la columna `content_kind` de la tabla `notes`.
2. **Unificación con Tags**: La naturaleza epistemológica de una nota se gestiona mediante el sistema relacional `tags` y `note_tags`.
3. **Catálogo Estándar de Tags (`specs/tags_default.csv`)**: Para evitar fragmentación terminológica (`#teorema`, `#teor`, `#theorem`), la aplicación provee un catálogo base de etiquetas estándar preconfiguradas en inglés bajo formato canónico `snake_case` (`name_of_tag_with_underscores`), definido en `specs/tags_default.csv` (2,000 tags matemáticos y científicos rigurosamente curados y sin duplicados semánticos).
   - **Tipos Epistémicos**: `definition`, `theorem`, `lemma`, `corollary`, `proposition`, `proof`, `exercise`, `example`, `counterexample`, `axiom`, etc.
   - **Campos y Teorías**: `abstract_algebra`, `algebraic_topology`, `real_analysis`, `complex_analysis`, `differential_geometry`, `category_theory`, `mathematical_logic`, etc.
   - **Carga en Base de Datos**: No se insertan de forma rígida (*hardcoded*) en el DDL, sino que el servicio de inicialización / migraciones importa `specs/tags_default.csv` marcando `is_standard = 1`. El usuario puede crear libremente tags personalizados adicionales (`is_standard = 0`).
4. **Vínculo con Estilos Visuales**: En lugar de depender de `content_kind`, las clases CSS (`.math-theorem`, `.math-definition`) se aplican automáticamente en el renderizador si la nota posee la etiqueta estandarizada correspondiente (o mediante directivas de bloque en el DSL).

---

### 1.4 Identificadores UUID y 64-bit para Compartición de Mazos

Para garantizar que un usuario pueda exportar un mazo a un archivo `.mpkg` o compartirlo en un repositorio público, y que otro usuario pueda importarlo sin riesgo de colisión de claves numéricas con sus propias notas:
- Toda entidad principal (`notes`, `cards`, `courses`, `course_folders`, `media_assets`) incorpora una columna **`uuid TEXT NOT NULL UNIQUE`** (generada como UUID v4 canónico).
- Las claves primarias relacionales locales siguen siendo enteros rápidos (`INTEGER PRIMARY KEY`) para rendimiento óptimo de JOINs en SQLite, pero la columna `uuid` actúa como identificador universal e inmutable durante importaciones, exportaciones y sincronización.

---

### 1.5 Configuración de FSRS a Nivel Global y de Carpeta (`course_folders`)

> **Respuesta a tu observación**: *La optimización de FSRS me parece que sería mejor a nivel global o de Folder.*

En el esquema v2:
1. `course_folders` incorpora `scheduler_preset_id INTEGER REFERENCES scheduler_presets(id)`.
2. Si un curso tiene `scheduler_preset_id IS NULL`, hereda automáticamente el preset de su carpeta padre (`folder_id`); si la carpeta no tiene override, hereda del preset Global del sistema.
3. De esta forma, el usuario puede fijar pesos optimizados de FSRS globalmente para toda la aplicación, o establecer un preset con retención más estricta (ej. 90%) para la carpeta de *Exámenes Finales* sin tener que configurar curso por curso.

---

### 1.6 Nomenclatura Clara: Reemplazo de `sort_order` por `display_order`

Para evitar la ambigüedad con el orden de ordenamiento (ascendente vs descendente):
- Las columnas `sort_order` en `course_folders`, `courses`, `course_notes` y `scratch_pages` se renombran a **`display_order`**, indicando claramente que determinan la posición manual de visualización del elemento.

---

## 2. Esquema DDL SQLite v2 Definitivo

```sql
-- ============================================================================
-- Morphism SRS Prototype 2 — Canonical SQLite Schema (v2 Refined)
-- Target: SQLite >= 3.38 (STRICT tables, FTS5, Recursive CTEs, WAL mode)
-- ============================================================================

PRAGMA foreign_keys = ON;
PRAGMA busy_timeout = 5000;
PRAGMA synchronous = NORMAL;

BEGIN;

-- ----------------------------------------------------------------------------
-- 1. SCHEDULER PRESETS (Configuración Global o por Carpeta)
-- ----------------------------------------------------------------------------
CREATE TABLE scheduler_presets (
    id                      INTEGER PRIMARY KEY,
    uuid                    TEXT NOT NULL UNIQUE,
    name                    TEXT NOT NULL COLLATE NOCASE UNIQUE CHECK (length(trim(name)) > 0),
    scheduler_name          TEXT NOT NULL DEFAULT 'fsrs',
    scheduler_version       TEXT NOT NULL DEFAULT '5.0',
    desired_retention       REAL NOT NULL DEFAULT 0.85 CHECK (desired_retention >= 0.70 AND desired_retention <= 0.99),
    maximum_interval_days   INTEGER NOT NULL DEFAULT 36500 CHECK (maximum_interval_days >= 1),
    enable_fuzzing          INTEGER NOT NULL DEFAULT 1 CHECK (enable_fuzzing IN (0, 1)),
    weights_json            TEXT NOT NULL DEFAULT '[]' CHECK (json_valid(weights_json)),
    created_at              TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
    updated_at              TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
) STRICT;

INSERT INTO scheduler_presets (id, uuid, name, desired_retention)
VALUES (1, '00000000-0000-0000-0000-000000000001', 'Global Default (R=85%)', 0.85);

-- ----------------------------------------------------------------------------
-- 2. IMPORT BATCHES
-- ----------------------------------------------------------------------------
CREATE TABLE import_batches (
    id                      INTEGER PRIMARY KEY,
    uuid                    TEXT NOT NULL UNIQUE,
    source                  TEXT NOT NULL DEFAULT 'manual'
                            CHECK (source IN ('manual', 'dsl', 'ai_json', 'mpkg', 'proto1_migration', 'seed')),
    label                   TEXT NOT NULL DEFAULT '',
    source_text             TEXT,
    metadata_json           TEXT NOT NULL DEFAULT '{}' CHECK (json_valid(metadata_json)),
    created_at              TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
) STRICT;

-- ----------------------------------------------------------------------------
-- 3. CARPETAS ANIDADAS Y CURSOS (Con Soporte de Carpetas Padre)
-- ----------------------------------------------------------------------------
CREATE TABLE course_folders (
    id                      INTEGER PRIMARY KEY,
    uuid                    TEXT NOT NULL UNIQUE,
    parent_id               INTEGER REFERENCES course_folders(id) ON DELETE RESTRICT,
    scheduler_preset_id     INTEGER REFERENCES scheduler_presets(id) ON DELETE SET NULL,
    name                    TEXT NOT NULL CHECK (length(trim(name)) > 0),
    display_order           INTEGER NOT NULL DEFAULT 0,
    created_at              TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
    updated_at              TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
    CHECK (parent_id IS NULL OR parent_id <> id)
) STRICT;

CREATE UNIQUE INDEX uq_folder_siblings
    ON course_folders(coalesce(parent_id, -1), name COLLATE NOCASE);

-- Prevención estricta de ciclos en la jerarquía de carpetas
CREATE TRIGGER trg_course_folders_prevent_cycles
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

CREATE TABLE courses (
    id                      INTEGER PRIMARY KEY,
    uuid                    TEXT NOT NULL UNIQUE,
    folder_id               INTEGER REFERENCES course_folders(id) ON DELETE SET NULL,
    scheduler_preset_id     INTEGER REFERENCES scheduler_presets(id) ON DELETE SET NULL,
    title                   TEXT NOT NULL CHECK (length(trim(title)) > 0),
    description             TEXT NOT NULL DEFAULT '',
    color_hex               TEXT NOT NULL DEFAULT '#6366f1',
    display_order           INTEGER NOT NULL DEFAULT 0,
    archived_at             TEXT,
    created_at              TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
    updated_at              TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
) STRICT;

CREATE UNIQUE INDEX uq_course_names_in_folder
    ON courses(coalesce(folder_id, -1), title COLLATE NOCASE);

-- ----------------------------------------------------------------------------
-- 4. NOTAS Y MEMBRESÍA EN EL GRAFO (course_notes)
-- ----------------------------------------------------------------------------
CREATE TABLE notes (
    id                      INTEGER PRIMARY KEY,
    uuid                    TEXT NOT NULL UNIQUE,
    title                   TEXT NOT NULL CHECK (length(trim(title)) > 0),
    review_mode             TEXT NOT NULL DEFAULT 'standard'
                            CHECK (review_mode IN ('standard', 'serial', 'cloze')),
    desired_retention       REAL CHECK (desired_retention IS NULL OR (desired_retention >= 0.70 AND desired_retention <= 0.99)),
    import_batch_id         INTEGER REFERENCES import_batches(id) ON DELETE SET NULL,
    archived_at             TEXT,
    deleted_at              TEXT, -- Papelera (Soft Delete)
    created_at              TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
    updated_at              TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
) STRICT;

CREATE INDEX ix_notes_active ON notes(deleted_at, archived_at);
CREATE INDEX ix_notes_mode ON notes(review_mode);

CREATE TABLE course_notes (
    course_id               INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    note_id                 INTEGER NOT NULL REFERENCES notes(id) ON DELETE CASCADE,
    x                       REAL NOT NULL DEFAULT 0.0,
    y                       REAL NOT NULL DEFAULT 0.0,
    is_pinned               INTEGER NOT NULL DEFAULT 0 CHECK (is_pinned IN (0, 1)),
    display_order           INTEGER NOT NULL DEFAULT 0,
    added_at                TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
    PRIMARY KEY (course_id, note_id)
) STRICT;

CREATE INDEX ix_course_notes_by_note ON course_notes(note_id);

-- ----------------------------------------------------------------------------
-- 5. TARJETAS ATÓMICAS (Sin card_type redundante ni card_steps)
-- ----------------------------------------------------------------------------
CREATE TABLE cards (
    id                      INTEGER PRIMARY KEY,
    uuid                    TEXT NOT NULL UNIQUE,
    note_id                 INTEGER NOT NULL REFERENCES notes(id) ON DELETE CASCADE,
    position                INTEGER NOT NULL DEFAULT 0 CHECK (position >= 0),
    content_version         INTEGER NOT NULL DEFAULT 1 CHECK (content_version >= 1),
    title                   TEXT NOT NULL DEFAULT '',
    front                   TEXT NOT NULL DEFAULT '',
    back                    TEXT NOT NULL DEFAULT '',
    import_batch_id         INTEGER REFERENCES import_batches(id) ON DELETE SET NULL,
    is_suspended            INTEGER NOT NULL DEFAULT 0 CHECK (is_suspended IN (0, 1)),
    archived_at             TEXT,
    deleted_at              TEXT,
    created_at              TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
    updated_at              TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
) STRICT;

CREATE INDEX ix_cards_note_position ON cards(note_id, position, id);
CREATE INDEX ix_cards_active ON cards(deleted_at, is_suspended);

CREATE TABLE card_revisions (
    card_id                 INTEGER NOT NULL REFERENCES cards(id) ON DELETE CASCADE,
    version                 INTEGER NOT NULL CHECK (version >= 1),
    title                   TEXT NOT NULL,
    front                   TEXT NOT NULL,
    back                    TEXT NOT NULL,
    recorded_at             TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
    PRIMARY KEY (card_id, version)
) STRICT;

-- Tabla virtual FTS5 para búsqueda instantánea en el Browser
CREATE VIRTUAL TABLE cards_fts USING fts5(
    title,
    front,
    back,
    content='cards',
    content_rowid='id',
    tokenize='unicode61 remove_diacritics 2'
);

CREATE TRIGGER trg_cards_fts_insert AFTER INSERT ON cards BEGIN
    INSERT INTO cards_fts(rowid, title, front, back) VALUES (NEW.id, NEW.title, NEW.front, NEW.back);
END;

CREATE TRIGGER trg_cards_fts_delete AFTER DELETE ON cards BEGIN
    INSERT INTO cards_fts(cards_fts, rowid, title, front, back) VALUES ('delete', OLD.id, OLD.title, OLD.front, OLD.back);
END;

CREATE TRIGGER trg_cards_fts_update AFTER UPDATE OF title, front, back ON cards BEGIN
    INSERT INTO cards_fts(cards_fts, rowid, title, front, back) VALUES ('delete', OLD.id, OLD.title, OLD.front, OLD.back);
    INSERT INTO cards_fts(rowid, title, front, back) VALUES (NEW.id, NEW.title, NEW.front, NEW.back);
END;

-- ----------------------------------------------------------------------------
-- 6. ENLACES DEL GRAFO Y TAGS ESTANDARIZADOS
-- ----------------------------------------------------------------------------
CREATE TABLE note_links (
    id                      INTEGER PRIMARY KEY,
    uuid                    TEXT NOT NULL UNIQUE,
    source_note_id          INTEGER NOT NULL REFERENCES notes(id) ON DELETE CASCADE,
    target_note_id          INTEGER NOT NULL REFERENCES notes(id) ON DELETE CASCADE,
    scope_course_id         INTEGER REFERENCES courses(id) ON DELETE CASCADE,
    relation_type           TEXT NOT NULL DEFAULT 'prerequisite'
                            CHECK (relation_type IN ('prerequisite', 'related', 'uses', 'generalizes', 'interferes')),
    label                   TEXT NOT NULL DEFAULT '',
    strength                REAL CHECK (strength IS NULL OR (strength >= 0.0 AND strength <= 1.0)),
    created_at              TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
    CHECK (source_note_id <> target_note_id),
    FOREIGN KEY (scope_course_id, source_note_id) REFERENCES course_notes(course_id, note_id) ON DELETE CASCADE,
    FOREIGN KEY (scope_course_id, target_note_id) REFERENCES course_notes(course_id, note_id) ON DELETE CASCADE
) STRICT;

CREATE UNIQUE INDEX uq_note_links_scope_relation
    ON note_links(source_note_id, target_note_id, relation_type, coalesce(scope_course_id, -1));

CREATE TABLE tags (
    id                      INTEGER PRIMARY KEY,
    name                    TEXT NOT NULL COLLATE NOCASE UNIQUE CHECK (length(trim(name)) > 0),
    is_standard             INTEGER NOT NULL DEFAULT 0 CHECK (is_standard IN (0, 1)),
    color_hex               TEXT NOT NULL DEFAULT '#38bdf8'
) STRICT;

-- NOTA: El catálogo estándar (2,000 tags científicos en formato name_with_underscores)
-- NO se inserta de forma fija en este DDL. Se carga automáticamente durante la inicialización 
-- del repositorio / base de datos leyendo el archivo `specs/tags_default.csv` con is_standard=1.

CREATE TABLE note_tags (
    note_id                 INTEGER NOT NULL REFERENCES notes(id) ON DELETE CASCADE,
    tag_id                  INTEGER NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (note_id, tag_id)
) STRICT;

CREATE INDEX ix_note_tags_tag ON note_tags(tag_id);

-- ----------------------------------------------------------------------------
-- 7. BÓVEDA DE MEDIOS (Soporte Nativo SVG, PNG, WebP)
-- ----------------------------------------------------------------------------
CREATE TABLE media_assets (
    sha256                  TEXT PRIMARY KEY CHECK (length(sha256) = 64),
    ext                     TEXT NOT NULL CHECK (ext IN ('svg', 'png', 'jpg', 'jpeg', 'webp', 'gif')),
    mime_type               TEXT NOT NULL,
    byte_size               INTEGER NOT NULL CHECK (byte_size >= 0),
    original_name           TEXT NOT NULL DEFAULT '',
    created_at              TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
) STRICT;

CREATE TABLE card_media (
    card_id                 INTEGER NOT NULL REFERENCES cards(id) ON DELETE CASCADE,
    media_sha256            TEXT NOT NULL REFERENCES media_assets(sha256) ON DELETE RESTRICT,
    PRIMARY KEY (card_id, media_sha256)
) STRICT;

CREATE INDEX ix_card_media_sha256 ON card_media(media_sha256);

-- ----------------------------------------------------------------------------
-- 8. ESTADO FSRS MUTABLE E HISTORIAL INMUTABLE
-- ----------------------------------------------------------------------------
CREATE TABLE card_schedules (
    card_id                 INTEGER PRIMARY KEY REFERENCES cards(id) ON DELETE CASCADE,
    state                   INTEGER NOT NULL DEFAULT 0 CHECK (state IN (0, 1, 2, 3)), -- 0=New, 1=Learn, 2=Review, 3=Relearn
    step                    INTEGER NOT NULL DEFAULT 0 CHECK (step >= 0),
    due_at                  TEXT,
    last_review_at          TEXT,
    stability               REAL,
    difficulty              REAL,
    reps                    INTEGER NOT NULL DEFAULT 0 CHECK (reps >= 0),
    lapses                  INTEGER NOT NULL DEFAULT 0 CHECK (lapses >= 0),
    scheduler_state_json    TEXT NOT NULL DEFAULT '{}' CHECK (json_valid(scheduler_state_json)),
    updated_at              TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
) STRICT;

CREATE INDEX ix_card_schedules_state_due ON card_schedules(state, due_at);

CREATE TRIGGER trg_cards_init_schedule AFTER INSERT ON cards BEGIN
    INSERT OR IGNORE INTO card_schedules (card_id, state, step, due_at)
    VALUES (NEW.id, 0, 0, NEW.created_at);
END;

CREATE TABLE review_sessions (
    id                      INTEGER PRIMARY KEY,
    uuid                    TEXT NOT NULL UNIQUE,
    course_id               INTEGER REFERENCES courses(id) ON DELETE SET NULL,
    note_id                 INTEGER REFERENCES notes(id) ON DELETE SET NULL,
    mode                    TEXT NOT NULL DEFAULT 'standard',
    started_at              TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
    ended_at                TEXT
) STRICT;

CREATE TABLE review_logs (
    id                      INTEGER PRIMARY KEY,
    card_id                 INTEGER REFERENCES cards(id) ON DELETE SET NULL,
    historical_card_id      INTEGER NOT NULL,
    session_id              INTEGER REFERENCES review_sessions(id) ON DELETE SET NULL,
    reviewed_at             TEXT NOT NULL,
    rating                  INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 4),
    elapsed_days            REAL,
    scheduled_days          REAL,
    fsrs_state              INTEGER,
    stability               REAL,
    difficulty              REAL,
    card_content_version    INTEGER NOT NULL DEFAULT 1,
    sequence_position       INTEGER,
    response_time_ms        INTEGER,
    state_before_json       TEXT CHECK (state_before_json IS NULL OR json_valid(state_before_json)),
    state_after_json        TEXT CHECK (state_after_json IS NULL OR json_valid(state_after_json))
) STRICT;

CREATE INDEX ix_logs_card_time ON review_logs(card_id, reviewed_at);
CREATE INDEX ix_logs_hist_card_time ON review_logs(historical_card_id, reviewed_at);
CREATE INDEX ix_logs_time ON review_logs(reviewed_at);

-- ----------------------------------------------------------------------------
-- 9. SCRATCHBOOK Y SINCRONIZACIÓN
-- ----------------------------------------------------------------------------
CREATE TABLE scratch_pages (
    id                      INTEGER PRIMARY KEY,
    uuid                    TEXT NOT NULL UNIQUE,
    course_id               INTEGER REFERENCES courses(id) ON DELETE SET NULL,
    title                   TEXT NOT NULL COLLATE NOCASE UNIQUE CHECK (length(trim(title)) > 0),
    page_mode               TEXT NOT NULL DEFAULT 'html_math' CHECK (page_mode IN ('html_math', 'dsl_script')),
    body                    TEXT NOT NULL DEFAULT '',
    display_order           INTEGER NOT NULL DEFAULT 0,
    created_at              TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
    updated_at              TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
) STRICT;

CREATE TABLE sync_oplog (
    seq_id                  INTEGER PRIMARY KEY AUTOINCREMENT,
    entity_table            TEXT NOT NULL,
    entity_uuid             TEXT NOT NULL,
    operation               TEXT NOT NULL CHECK (operation IN ('UPSERT', 'DELETE')),
    changed_at              TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
) STRICT;

PRAGMA user_version = 2;
COMMIT;
```
