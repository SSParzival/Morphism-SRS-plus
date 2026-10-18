# 03 — Arquitectura de Estilos, Temas Modulares (QSS), Tags y Sanitización

> [!IMPORTANT]
> Este documento especifica:
> 1. El motor de temas desacoplado basado en tokens (`theme_tokens.json`) y hojas QSS modulares.
> 2. **Solución definitiva al bug de `<` y `>` en texto matemático**: Sanitizador HTML inteligente para evitar que símbolos como $a < b$ o $x > 0$ se interpreten como etiquetas HTML rotas.
> 3. Clases semánticas vinculadas al sistema de **Tags Estandarizados** (sin depender de `content_kind`).
> 4. Soporte para diagramas vectoriales SVG (conmutativos) con adaptación automática a tema claro/oscuro.

---

## 1. Solución Definitiva al Bug de `<` y `>` en Texto Matemático

> **Respuesta a tu observación**: *Hay algo que pasaba en el prototipo 1 y es que usar uno solo de `<` o `>` hacía bugs porque se interpretaba como HTML cuando este es meramente el uso de menor o igual, pero solo `<br>` o `<ul>` debe interpretarse como HTML.*

### 1.1 Causa del Problema en el Prototipo 1
En el Prototipo 1, el contenido de `front` y `back` se inyectaba directamente como una cadena cruda en `container.innerHTML = frontHtml`. Cuando el usuario escribía:
```text
Sea $\varepsilon > 0$ y $x < y$, considere...
```
El motor HTML de Chromium encontraba el `<` y asumía que comenzaba una etiqueta HTML desconocida `< y,="" considere...="">`, devorando el resto del párrafo y rompiendo el renderizado.

### 1.2 El Sanitizador de Texto Seguro (`SafeHtmlParser`)
En el Prototipo 2, todo texto ingresado por el usuario o compilado desde el DSL pasa por una función de normalización antes de guardarse o inyectarse en el DOM.

#### Algoritmo de Sanitización:
1. **Lista Blanca de Etiquetas HTML Permitidas**:
   Se define un conjunto estricto de tags válidos para formato de tarjetas:
   `b`, `i`, `u`, `code`, `pre`, `br`, `hr`, `p`, `span`, `div`, `ul`, `ol`, `li`, `table`, `thead`, `tbody`, `tr`, `th`, `td`, `img`, `strong`, `em`, `sub`, `sup`, `blockquote`.
2. **Preservación de Entornos Matemáticos**:
   El parser identifica delimitadores de matemáticas `$ ... $`, `$$ ... $$`, `\( ... \)`, `\[ ... \]`. Dentro de estos entornos, **MathJax procesa directamente los símbolos `<` y `>`** siempre que no estén envueltos en tags HTML malformados.
3. **Conversión Fuera de Tags Válidos**:
   Cualquier `<` que **no** vaya inmediatamente seguido por el nombre de una etiqueta de la lista blanca (ej. `<` seguido de un espacio, un número, una variable o una fórmula `$`) se convierte automáticamente a la entidad HTML segura **`&lt;`** (y `>` a **`&gt;`**).

```python
# Especificación del Sanitizador en morphism_srs/services/safe_html.py:
import re

ALLOWED_TAGS = {
    "b", "i", "u", "code", "pre", "br", "hr", "p", "span", "div",
    "ul", "ol", "li", "table", "thead", "tbody", "tr", "th", "td",
    "img", "strong", "em", "sub", "sup", "blockquote"
}

# Regex que detecta tags HTML legítimos (apertura, cierre o auto-cierre):
TAG_REGEX = re.compile(r'</?([a-zA-Z][a-zA-Z0-9]*)\b[^>]*>')

def sanitize_math_html(text: str) -> str:
    """
    Escapa < y > espurios que se usan como operadores matemáticos,
    preservando únicamente las etiquetas HTML válidas de la lista blanca.
    """
    tokens = []
    last_end = 0

    for match in TAG_REGEX.finditer(text):
        start, end = match.span()
        tag_name = match.group(1).lower()

        # Texto plano previo al tag
        plain_prefix = text[last_end:start]
        # Reemplazar < y > sueltos por entidades seguras
        plain_prefix = plain_prefix.replace("<", "&lt;").replace(">", "&gt;")
        tokens.append(plain_prefix)

        if tag_name in ALLOWED_TAGS:
            # Preservar tag HTML válido intacto
            tokens.append(match.group(0))
        else:
            # Si el tag no está en la lista blanca (ej. <x>), escaparlo
            tokens.append(match.group(0).replace("<", "&lt;").replace(">", "&gt;"))

        last_end = end

    # Resto del texto posterior
    tail = text[last_end:]
    tokens.append(tail.replace("<", "&lt;").replace(">", "&gt;"))

    return "".join(tokens)
```

**Resultado Garantizado**:
- `Sea $x < y$ y $a > b$` $\longrightarrow$ `Sea $x &lt; y$ y $a &gt; b$` (renderizado visual perfecto sin romper HTML).
- `<b>Enunciado:</b><br>Si $x < y$` $\longrightarrow$ `<b>Enunciado:</b><br>Si $x &lt; y$` (el `<b>` y el `<br>` se preservan intactos).

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
