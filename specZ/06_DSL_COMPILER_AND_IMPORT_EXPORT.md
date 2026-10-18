# 06 — Compilador DSL de Notas/Cursos (`.mdsl`) y Sistema de Importación/Exportación (`.mpkg`)

> [!IMPORTANT]
> Este documento actualiza la especificación del compilador DSL (`.mdsl`) y del empaquetador `.mpkg`, incorporando:
> 1. Eliminación de `KIND` en favor de tags estandarizados (`TAGS ...`).
> 2. Modos simplificados: `MODE standard | serial | cloze`.
> 3. Tratamiento seguro de caracteres menores y mayores (`<` y `>`) que evita bugs al escribir desigualdades matemáticas.
> 4. Soporte para inserción y empaquetado de diagramas vectoriales **SVG**.

---

## 1. Ejemplo de Sintaxis Actualizada del DSL (`.mdsl`)

```text
# ============================================================================
# Morphism DSL (.mdsl) — Análisis Matemático
# ============================================================================

COURSE "Análisis Real I"
FOLDER "Matemáticas/Análisis"

# ----------------------------------------------------------------------------
# 1. Nota Estándar (Definiciones independientes)
# ----------------------------------------------------------------------------
NEW NOTE "Medida Exterior de Lebesgue"
MODE standard
TAGS definicion, analisis, medida, ch1

CARD 1 "Definición de Medida Exterior m*(E)"
FRONT
Sea $E \subset \mathbb{R}^d$. ¿Cómo se define la <strong>medida exterior de Lebesgue</strong> $m_*(E)$ mediante recubrimientos por cubos cerrados?
BACK
Se define como el ínfimo de las sumas de volúmenes de cubos cerrados $Q_j$:
$$m_*(E) = \inf \left\{ \sum_{j=1}^{\infty} |Q_j| : E \subset \bigcup_{j=1}^{\infty} Q_j \right\}$$

# ----------------------------------------------------------------------------
# 2. Nota Serial (Demostración de Teorema paso a paso)
# ----------------------------------------------------------------------------
NEW NOTE "Demo: Subaditividad Numerable de la Medida Exterior"
MODE serial
TAGS teorema, demostracion, analisis, medida, ch1
RETENTION 0.88

CARD 1 "Paso 1: Reducción al caso finito y elección de recubrimiento"
FRONT
Sea $E = \bigcup_{j=1}^\infty E_j$. Si asumimos que $m_*(E_j) < \infty$ para todo $j$, dado $\varepsilon > 0$, ¿cómo acotamos cada $E_j$?
BACK
Por definición de ínfimo, para cada $j$ existen cubos $\{Q_{j,k}\}_{k=1}^\infty$ tales que:
$$\sum_{k=1}^{\infty} |Q_{j,k}| \le m_*(E_j) + \frac{\varepsilon}{2^j}$$
Nótese que para todo índice se cumple $m_*(E_j) < \infty$.

CARD 2 "Paso 2: Conclusión al hacer límite ε -> 0"
FRONT
¿Cómo concluimos que $m_*(E) \le \sum_{j=1}^\infty m_*(E_j)$?
BACK
Sumando sobre todo $j$, el recubrimiento doble cubre a $E$. Como $\varepsilon > 0$ es arbitrario, haciendo $\varepsilon \to 0$ se obtiene la desigualdad deseada. $\blacksquare$

# ----------------------------------------------------------------------------
# 3. Nota Cloze (Oclusión Condicionada)
# ----------------------------------------------------------------------------
NEW NOTE "Propiedades de Continuidad Uniforme"
MODE cloze
TAGS teorema, analisis, topologia

CARD 1 "Teorema de Heine-Cantor (Hipótesis)"
FRONT
Todo espacio métrico compacto $K$ cumple que si $f: K \to M$ es continua, entonces $f$ es {{c1::uniformemente continua}}.
BACK
La compacidad garantiza que de todo recubrimiento por bolas de radio $\delta/2$ se extrae un subrecubrimiento finito.

# ----------------------------------------------------------------------------
# 4. Enlaces de Prerrequisitos entre Notas
# ----------------------------------------------------------------------------
LINK "Medida Exterior de Lebesgue" -> "Demo: Subaditividad Numerable de la Medida Exterior"
```

---

## 2. Gramática EBNF Actualizada

```ebnf
Document        ::= ( BlankLine | Comment | Directive | NoteBlock | LinkStmt )* ;

Directive       ::= CourseStmt | FolderStmt | DefaultTagsStmt | DefaultModeStmt ;
CourseStmt      ::= "COURSE" QuotedString EOL ;
FolderStmt      ::= "FOLDER" QuotedString EOL ;
DefaultTagsStmt ::= "DEFAULT_TAGS" TagList EOL ;
DefaultModeStmt ::= "DEFAULT_MODE" ReviewMode EOL ;

NoteBlock       ::= ("NEW NOTE" | "NOTE") QuotedString EOL
                    NoteMetaStmt*
                    CardBlock+ ;

NoteMetaStmt    ::= ("MODE" ReviewMode EOL)
                  | ("TAGS" TagList EOL)
                  | ("RETENTION" FloatNumber EOL)
                  | ("POS" FloatNumber FloatNumber EOL) ;

ReviewMode      ::= "standard" | "serial" | "cloze" ;

CardBlock       ::= "CARD" [Integer] [QuotedString] EOL
                    "FRONT" EOL
                    RawContentBlock
                    "BACK" EOL
                    RawContentBlock ;

LinkStmt        ::= "LINK" QuotedString ["->"] QuotedString ["TYPE" RelationType] ["LABEL" QuotedString] EOL ;
RelationType    ::= "prerequisite" | "related" | "uses" | "generalizes" | "interferes" ;

TagList         ::= Identifier ("," Identifier)* ;
```

---

## 3. Integración con Diagramas Conmutativos SVG en `.mpkg`

Al exportar un curso en formato **`.mpkg`**:
1. El compilador inspecciona todas las etiquetas `<img src="morphism://media/<hash>.ext">`.
2. Incluye tanto imágenes rasterizadas (`.png`, `.webp`) como archivos vectoriales **`.svg`** en la carpeta `media/` interna del archivo ZIP.
3. El archivo `manifest.json` registra los UUIDs canónicos de notas y tarjetas, garantizando que el mazo pueda compartirse en repositorios públicos sin colisionar con mazos de otros usuarios.
