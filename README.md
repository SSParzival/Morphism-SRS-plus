# Morphism SRS — Prototype 2: Master Architecture & Engineering Specification (Whitepaper)

> [!IMPORTANT]
> **Alcance del Documento**: Este repositorio contiene la **Especificación Técnica Completa (Whitepaper & Plan de Implementación)** para **Morphism SRS Prototype 2**. Fue diseñado desde cero analizando la arquitectura, limitaciones y deuda técnica del Prototipo 1 (`New SRS Project`), incorporando todos los requerimientos de [`Future_version.md`](file:///c:/repos/Morphism%20SRS%20proto2/Future_version.md), las revisiones de diseño del autor y auditando a fondo la propuesta [`morphism_srs_schema.sql`](file:///c:/repos/Morphism%20SRS%20proto2/morphism_srs_schema.sql).

---

## 1. Visión Ejecutiva y Mejoras de Arquitectura

**Morphism SRS** es un sistema de repetición espaciada (SRS) de próxima generación especializado en **Matemáticas, Física, Lógica Formal y Demostraciones Secuenciales**, construido sobre **Python 3.11+**, **PySide6 (Qt6)**, **SQLite 3 (WAL + STRICT + FTS5)**, **FSRS (Free Spaced Repetition Scheduler)** y **MathJax 3 100% Offline con renderizado SVG y compatibilidad gráfica**.

El **Prototipo 1** validó exitosamente el concepto central (grafos dirigidos de prerrequisitos, secuencias de pasos encadenados $A_1 \to \dots \to A_n$, renderizado LaTeX offline y curvas de decaimiento FSRS), pero acumuló deuda técnica y fricciones operativas que se resuelven en esta versión:

| Problema en Prototipo 1 | Causa Raíz Identificada en el Código | Solución Arquitectónica en Prototipo 2 |
| :--- | :--- | :--- |
| **1. Lag severo en la pantalla de Review con muchas tarjetas/pasos** | En `review_view.py`, cada paso de una nota serial reconstruía el HTML de **todos** los pasos previos ($A_1 \dots A_{k-1}$) más el actual, sobrescribía `container.innerHTML` y ejecutaba `MathJax.typesetPromise` sobre todo el contenedor ($O(N^2)$ pasadas de MathJax por sesión). Además, nunca se invocaba `MathJax.typesetClear()`, acumulando nodos huérfanos en la memoria interna de MathJax. | **DOM Incremental Append-Only + Caché SVG + Virtualización CSS**: Los pasos previos ya renderizados se mueven al contenedor de historial mediante `appendChild` **sin re-ejecutar MathJax** ($O(1)$ por paso). Uso estricto de `MathJax.typesetClear([node])` y `content-visibility: auto`. |
| **2. Joint Retrievability ($P(\bigcap A_i) = \prod R_i$) distorsionaba el scheduling** | Multiplicar $R_i(t)$ hace que una nota con 10 tarjetas al $90\%$ tenga retención conjunta $0.90^{10} = 34.8\% \ll 85\%$, marcando la nota como vencida casi instantáneamente tras estudiarla. | **FSRS Individual por Tarjeta + Métricas Analíticas**: El scheduling se rige por cada tarjeta. Para el nodo se calculan y muestran en UI **Bottleneck Retrievability** ($R_{\min} = \min_i R_i$), **Mean Retrievability** ($\bar{R}$) y **Joint Retrievability** ($P(\bigcap A_i)$) como analítica opcional sin forzar vencimientos artificiales. |
| **3. Spaghetti code en modelos: `card_type` redundante y modos dispersos** | Existían `ProofSequenceCard` (con `card_steps`), `Flashcard`, y 3 modos de nota (`standard`, `serial_sequence`, `serial_sequence_single`). Las tarjetas sabían si eran "proofs" y duplicaban lógica. | **Deprecación de `ProofSequenceCard` y Unificación Limpia**: Cada tarjeta es una entidad simple (`title`, `front`, `back`). La nota define el modo de estudio: `standard`, `serial` (paso a paso encadenado) o `cloze` (donde las tarjetas condicionan en el contexto de las demás). |
| **4. Estilos CSS / QSS inconsistentes, ilegibles y rotura de pantallas pequeñas** | Reglas `setStyleSheet(...)` hardcodeadas en 10 archivos `.py`, colores duplicados en HTML embebido y ventanas con tamaños fijos gigantes (ej. 1120x820) que colapsan en monitores 720p / laptops compactas. | **Motor de Temas Basado en Tokens (`ThemeManager`) + Tamaños Relativos (% de QScreen)**: Ventanas dimensionadas según `QGuiApplication.primaryScreen().availableGeometry()` con scrollbars siempre funcionales. Tokens JSON únicos sincronizados con QSS y CSS WebEngine. |
| **5. Problemas con MathJax Offline, diagramas conmutativos y rutas de imágenes** | `course_storage.py` descargaba `tex-chtml.js`, pero `review_view.py` cargaba `tex-svg.js`. Las imágenes usaban rutas locales absolutas y los diagramas conmutativos fallaban en MathJax. | **Bóveda `MediaVault` en AppData con soporte nativo de SVG** + protocolo `morphism://`: Soporte de imágenes y diagramas vectoriales SVG externos (tikz/quiver/inkscape), almacenamiento `SHA-256` y MathJax SVG 100% offline. |
| **6. Bugs con `<` y `>` en texto matemático interpretados como HTML** | Usar `<` o `>` fuera de etiquetas rompía el renderizado o truncaba texto al confundirse con tags HTML. | **Sanitizador y Parser de Texto Seguro**: Sanitización automática de `<`, `>` y `&` fuera de tags HTML seguros conocidos (`<b>`, `<i>`, `<br>`, `<ul>`, `<li>`, `<table>`, `<img>`, `<span>`, `<div>`). |
| **7. Falta de `Ctrl+Z` (Deshacer) y borrado masivo tedioso** | Si el usuario calificaba una tarjeta por error o borraba notas, no había forma de deshacer. Borrar 20 notas requería 20 confirmaciones individuales en el grafo. | **Pila `QUndoStack` Global + `NoteBrowserView`**: Deshacer calificación (`Ctrl+Z`), deshacer movimientos/borrados y selección masiva con casillas de verificación para borrado en lote en una transacción SQL. |
| **8. Compartición de Mazos y Sincronización Multi-Dispositivo** | El esquema numérico simple dependía de secuencias locales frágiles al fusionar cursos de distintos usuarios. | **IDs de 64-bit y soporte UUID canónico**: Identificadores universales (`uuid` / `id64`) que permiten importar, exportar y sincronizar cursos sin colisiones. |

---

## 2. Mapa Maestro de la Especificación

La especificación técnica se organiza en los siguientes documentos en [`specs/`](file:///c:/repos/Morphism%20SRS%20proto2/specs):

1. **[`specs/01_ARCHITECTURE_AND_PROJECT_STRUCTURE.md`](file:///c:/repos/Morphism%20SRS%20proto2/specs/01_ARCHITECTURE_AND_PROJECT_STRUCTURE.md)**
   - Compatibilidad multiplataforma completa de AppData (`Windows`, `Linux XDG`, `macOS Application Support`).
   - Bóveda `MediaVault` con soporte vectorial de primer nivel para **SVG** (diagramas conmutativos, categorías, grafos vectoriales) y mapas de bits.
   - Pila de comandos `QUndoStack` para soporte transversal de **`Ctrl+Z` (Deshacer)** en calificaciones y acciones del canvas/browser.
   - Reglas de escalabilidad y ventanas con geometría relativa al monitor (protección para pantallas 720p / 1366x768).

2. **[`specs/02_DATABASE_AND_SQL_SPECIFICATION.md`](file:///c:/repos/Morphism%20SRS%20proto2/specs/02_DATABASE_AND_SQL_SPECIFICATION.md)**
   - Deprecación de `ProofSequenceCard` y `card_type`: modelo relacional unificado donde toda tarjeta es simplemente una `card`, y la nota gobierna el flujo (`review_mode IN ('standard', 'serial', 'cloze')`).
   - Eliminación de `content_kind` arbitrario en favor del sistema unificado de **Tags Estandarizados**.
   - Identificadores UUID y 64-bit para compartición segura de mazos.
   - Jerarquía de carpetas anidadas (`course_folders` con `parent_id`), reemplazo de `sort_order` por `display_order`, configuración de FSRS a nivel Global y de Carpeta.
   - Soporte de papelera (*Soft Delete* con `deleted_at`) y cascada limpia para borrados masivos.

3. **[`specs/03_THEMING_QSS_AND_CSS_ARCHITECTURE.md`](file:///c:/repos/Morphism%20SRS%20proto2/specs/03_THEMING_QSS_AND_CSS_ARCHITECTURE.md)**
   - Sistema de Diseño Modular basado en **Design Tokens (`theme_tokens.json`)**.
   - Clases de estilo semánticas basadas en Tags matemáticos estandarizados (`tag-theorem`, `tag-definition`, `tag-proof`).
   - Parser sanitizador que previene bugs de caracteres menores y mayores (`<` y `>`) que no sean tags HTML válidos.
   - Dimensionamiento elástico para pantallas compactas y altas resoluciones.

4. **[`specs/04_MATHJAX_AND_WEBENGINE_PERFORMANCE.md`](file:///c:/repos/Morphism%20SRS%20proto2/specs/04_MATHJAX_AND_WEBENGINE_PERFORMANCE.md)**
   - Motor **Zero-Lag Review Renderer**: DOM incremental para secuencias seriales ($O(1)$ estricto).
   - Renderizado y visualización de diagramas conmutativos SVG de alta fidelidad.
   - MathJax 3 SVG offline (`tex-svg-full.js`), `MathJax.typesetClear()` selectivo y virtualización CSS (`content-visibility: auto`).

5. **[`specs/05_SCHEDULING_AND_REVIEW_ENGINE.md`](file:///c:/repos/Morphism%20SRS%20proto2/specs/05_SCHEDULING_AND_REVIEW_ENGINE.md)**
   - Planificación FSRS individual por tarjeta en modos `standard`, `serial` y `cloze`.
   - Métricas visuales analíticas: $R_{\min}$ (cuello de botella), $\bar{R}$ (promedio) y retención conjunta $P(\bigcap A_i)$ con fines puramente estadísticos.
   - **Sesiones de Auto-Estudio Global** (todo lo vencido) y **Sesiones de Estudio Personalizado / Filtrado** (por carpeta, tag, retención, etc.).
   - Mecánica transaccional de **`Ctrl+Z` (Undo Last Rating)** que restaura `state_before_json` y revierte `review_logs`.

6. **[`specs/06_DSL_COMPILER_AND_IMPORT_EXPORT.md`](file:///c:/repos/Morphism%20SRS%20proto2/specs/06_DSL_COMPILER_AND_IMPORT_EXPORT.md)**
   - Sintaxis actualizada de Morphism DSL (`.mdsl`): uso de `MODE standard | serial | cloze` y directivas `@tags` normalizadas (sin `KIND`).
   - Parser inmune a escapes de LaTeX y sanitizador de operadores relacionales `<` y `>`.
   - Empaquetado portable `.mpkg` con soporte de diagramas SVG incluidos.

7. **[`specs/07_UI_VIEWS_AND_MASS_BROWSER_SPEC.md`](file:///c:/repos/Morphism%20SRS%20proto2/specs/07_UI_VIEWS_AND_MASS_BROWSER_SPEC.md)**
   - Formas diferenciadas en el **Graph Explorer**: **Rectángulos** para notas `standard`, **Rombos** para notas `serial` y **Círculos / Elipses** para notas `cloze`.
   - Selección masiva (*Rubber-Band Marquee* en grafo y tabla multi-check en el Browser) para operaciones de borrado en lote en una sola transacción.
   - Diálogos y vistas dimensionadas con ratios relativos al tamaño disponible del monitor (pantallas 720p seguras).

8. **[`specs/08_MOBILE_COMPANION_AND_ROADMAP.md`](file:///c:/repos/Morphism%20SRS%20proto2/specs/08_MOBILE_COMPANION_AND_ROADMAP.md)**
   - Estrategia móvil bajo demanda: el servidor web local se levanta **exclusivamente** mientras la ventana del código QR o sesión móvil está abierta y se apaga automáticamente al cerrarla.
   - Gestión de mazos introductorios ubicada en el backlog `TODO` (sin comprometer desarrollo prematuro).
   - Plan de implementación estructurado en fases verificables.
