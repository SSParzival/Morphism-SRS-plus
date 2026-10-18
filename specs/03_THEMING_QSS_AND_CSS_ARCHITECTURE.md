# 03 — Arquitectura de Estilos, Temas Modulares (QSS), Tags y Sanitización

> [!IMPORTANT]
> Este documento especifica:
> 1. El motor de temas desacoplado basado en tokens (`theme_tokens.json`) y hojas QSS modulares.
> 2. **Solución definitiva al bug de `<` y `>` en texto matemático**: Sanitizador inteligente que convierte operadores de desigualdad a comandos LaTeX nativos **`\lt`** y **`\gt`**, evitando que colisionen con el parser HTML de Chromium o MathJax.
> 3. Clases semánticas vinculadas al sistema de **Tags Estandarizados** (sin depender de `content_kind`).
> 4. Soporte para diagramas vectoriales SVG (conmutativos) con adaptación automática a tema claro/oscuro.

---

## 1. Solución Definitiva al Bug de `<` y `>` en Texto Matemático: Conversión a `\lt` y `\gt`

> **Decisión de Diseño**: *En vez de convertir a `&lt;` y `&gt;`, es más seguro convertir a `\lt` y `\gt` (LaTeX nativo).*

### 1.1 Por qué `\lt` y `\gt` es la Solución Superior
En MathJax 3 y en el ecosistema LaTeX:
- `\lt` y `\gt` son los comandos canónicos de macro para representar los operadores de orden menor que ($<$) y mayor que ($>$).
- Cuando Chromium procesa código HTML dentro de un contenedor web, cualquier presencia del carácter literal `<` puede desencadenar la apertura de un tag HTML si no se maneja con cuidado extremo.
- Al convertir los operadores de orden matemático que no forman parte de tags HTML válidos directamente a **`\lt`** y **`\gt`**:
  1. **Inmunidad absoluta en HTML**: Para el motor de Chromium, la barra invertida `\` es texto ordinario, por lo que **nunca jamás intentará interpretar `\lt` como un tag HTML**.
  2. **Renderizado Matemático Perfecto en MathJax**: MathJax 3 soporta `\lt` y `\gt` de forma nativa tanto en modo inline (`$...$`, `\(...\)`) como en modo display (`$$...$$`, `\[...\]`), produciendo glifos idénticos a `<` y `>` con el espaciado tipográfico relacional adecuado (`\mathrel`).

### 1.2 Algoritmo de Sanitización (`SafeMathHtmlParser`)
Todo texto ingresado en el Editor, Scratchbook o compilado en el DSL pasa por el siguiente pipeline de normalización antes de guardarse en SQLite o enviarse al WebEngine:

1. **Lista Blanca de Etiquetas HTML de Formato**:
   `b`, `i`, `u`, `code`, `pre`, `br`, `hr`, `p`, `span`, `div`, `ul`, `ol`, `li`, `table`, `thead`, `tbody`, `tr`, `th`, `td`, `img`, `strong`, `em`, `sub`, `sup`, `blockquote`.
2. **Detección de Tags HTML Legítimos**:
   Cualquier patrón `<tag ...>` o `</tag>` que pertenezca a la lista blanca se conserva intacto.
3. **Conversión de Operadores `<` y `>` Fuera de Tags Válidos**:
   - Si el carácter `<` o `>` está **dentro de delimitadores matemáticos** (`$ ... $`, `$$ ... $$`, `\( ... \)`, `\[ ... \]`):
     - Se reemplaza por `\lt ` y `\gt ` (añadiendo un espacio separador seguro si va seguido de una letra, ej. `x \lt y`).
   - Si el carácter `<` o `>` está **fuera de delimitadores matemáticos** pero no corresponde a un tag de la lista blanca:
     - Si está en texto libre expresando una desigualdad (ej. `para todo n < 10`), se envuelve o convierte a `$n \lt 10$` o a la entidad segura según el contexto, garantizando que el texto nunca quede roto.

```python
# Especificación del Sanitizador en morphism_srs/services/safe_html.py:
import re

ALLOWED_TAGS = {
    "b", "i", "u", "code", "pre", "br", "hr", "p", "span", "div",
    "ul", "ol", "li", "table", "thead", "tbody", "tr", "th", "td",
    "img", "strong", "em", "sub", "sup", "blockquote"
}

TAG_REGEX = re.compile(r'</?([a-zA-Z][a-zA-Z0-9]*)\b[^>]*>')
MATH_BLOCK_REGEX = re.compile(r'(\$\$.*?\$\$|\$.*?\$|\\\[.*?\\\]|\\\(.*?\\\))', re.DOTALL)

def _replace_operators_in_math(math_text: str) -> str:
    """Convierte < y > en fórmulas matemáticas a sus macros nativas \\lt y \\gt."""
    # Preservar \lt y \gt existentes si ya estaban escritos
    math_text = re.sub(r'<\s*=', r'\\le ', math_text)
    math_text = re.sub(r'>\s*=', r'\\ge ', math_text)
    math_text = re.sub(r'<(?![a-zA-Z])', r'\\lt ', math_text)
    math_text = re.sub(r'>(?![a-zA-Z])', r'\\gt ', math_text)
    return math_text

def sanitize_math_html(text: str) -> str:
    """
    Sanitiza el contenido de tarjetas y notas:
    1. Preserva etiquetas HTML válidas de la lista blanca.
    2. Convierte operadores < y > dentro de matemáticas a \\lt y \\gt nativos de LaTeX.
    3. Escapa < y > sueltos fuera de tags HTML permitidos.
    """
    # Paso 1: Procesar bloques matemáticos convirtiendo < y > a \lt y \gt
    parts = []
    last_idx = 0
    for match in MATH_BLOCK_REGEX.finditer(text):
        start, end = match.span()
        parts.append(text[last_idx:start])
        parts.append(_replace_operators_in_math(match.group(0)))
        last_idx = end
    parts.append(text[last_idx:])
    text = "".join(parts)

    # Paso 2: Proteger tags HTML válidos y escapar caracteres < o > espurios fuera de tags
    tokens = []
    last_end = 0
    for match in TAG_REGEX.finditer(text):
        start, end = match.span()
        tag_name = match.group(1).lower()

        plain_prefix = text[last_end:start]
        # Reemplazar < y > fuera de tags por macros o entidades si quedaron fuera de $...$
        plain_prefix = plain_prefix.replace("<", "\\lt ").replace(">", "\\gt ")
        tokens.append(plain_prefix)

        if tag_name in ALLOWED_TAGS:
            tokens.append(match.group(0))
        else:
            # Tag desconocido: neutralizar para evitar inyección o corrupción
            tokens.append(match.group(0).replace("<", "\\lt ").replace(">", "\\gt "))
        last_end = end

    tail = text[last_end:]
    tokens.append(tail.replace("<", "\\lt ").replace(">", "\\gt "))
    return "".join(tokens)
```

**Ejemplos de Transformación**:
- Entrada: `Sea $\varepsilon > 0$ tal que $|x - x_0| < \delta$`
  $\longrightarrow$ Salida: `Sea $\varepsilon \gt 0$ tal que $|x - x_0| \lt \delta$`
- Entrada: `<b>Paso 1:</b> Si $x \le y$ y $a < b$`
  $\longrightarrow$ Salida: `<b>Paso 1:</b> Si $x \le y$ y $a \lt b$`
  *(El `<b>` se conserva intacto, y `<` se convierte limpiamente a `\lt`)*.

---

## 2. Clases Semánticas y Tags Estandarizados en CSS

Al eliminarse `content_kind`, el aspecto visual de las tarjetas y notas se apoya en los **Tags Estandarizados**:
- Cuando una nota posee el tag `#definicion`, el renderizador añade la clase `.tag-definicion`.
- Cuando posee `#teorema`, añade la clase `.tag-teorema`.
- Cuando posee `#demostracion`, añade la clase `.tag-demostracion`.

En `resources/web/css/review.css`:
```css
/* Bloques matemáticos decorados por Tag */
.active-card.tag-teorema {
    border-top: 4px solid var(--accent-primary);
}
.active-card.tag-definicion {
    border-top: 4px solid var(--accent-secondary);
}
.active-card.tag-demostracion {
    border-top: 4px solid var(--status-good-border);
}

/* Soporte para Diagramas Conmutativos SVG */
.commutative-diagram {
    display: block;
    margin: 14px auto;
    max-width: 95%;
    height: auto;
    border-radius: 6px;
    background: transparent;
}

/* Inversión sutil de color para SVG monocromáticos en tema oscuro */
[data-theme="dark"] .commutative-diagram.invert-on-dark {
    filter: invert(0.92) hue-rotate(180deg);
}
```

---

## 3. Selector de Formas en el Canvas del Grafo según `review_mode`

En el `GraphExplorerView`, las notas se diferencian visualmente de un vistazo según su modo de revisión:
- **`standard`**: **Rectángulo** con esquinas redondeadas (`QPainterPath.addRoundedRect`).
- **`serial`**: **Rombo** rotado o hexágono con bordes diagonales, simbolizando una secuencia dirigida.
- **`cloze`**: **Círculo / Elipse** (`QPainterPath.addEllipse`), simbolizando un núcleo conclusivo donde las tarjetas condicionan entre sí.
