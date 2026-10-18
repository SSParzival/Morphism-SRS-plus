# TODO — Especificación de Mazos Semilla Introductorios y Onboarding de Testers

> [!NOTE]
> Este documento contiene el diseño conceptual y la planificación de los **Mazos Semilla Preinstalados (Starter Decks)** y la estrategia para conseguir usuarios testers.
> **Estado**: Pospuesto en el backlog para ser abordado una vez que el motor principal de Morphism SRS Prototype 2 esté completamente desarrollado y estabilizado.

---

## 1. Visión y Objetivos

El propósito de los mazos semilla es evitar que un usuario nuevo o un tester abra la aplicación y se encuentre con un lienzo en blanco intimidante. Debe permitir que cualquier estudiante de matemáticas, física o ciencias de la computación pueda comenzar una sesión de estudio interactiva en menos de 2 minutos tras abrir el programa por primera vez.

---

## 2. Catálogo de Mazos Semilla Planificados

Cuando se decida implementar esta característica, se empaquetarán en `resources/seed_courses/` (como archivos `.mpkg` o `.mdsl`) los siguientes 3 cursos iniciales:

### 2.1 Mazo 1: `🌟 Morphism SRS — Tutorial Interactivo`
Un curso guiado de 5 notas que enseña las características del programa a medida que las estudias:
- **Nota 1 (`standard`) — Fundamentos del Grafo y Atajos**:
  - Explica la navegación del lienzo infinito, zoom, atajos principales (`Space` para revelar/aprobar, `1-4` para calificar, `Ctrl+Z` para deshacer).
- **Nota 2 (`serial`) — Cómo Funciona una Demostración Serial**:
  - Una demostración sencilla en 3 pasos que muestra cómo los pasos previos dominados ($A_1, A_2$) quedan visibles en el panel de historial superior (`#past-steps-list`) mientras se evalúa el paso activo $A_3$.
- **Nota 3 (`cloze`) — Cómo Funcionan las Oclusiones Condicionadas**:
  - Muestra un teorema con partes oclusas que condicionan en el contexto global de la nota.
- **Nota 4 (`standard`) — Creación de Notas con el Compilador DSL**:
  - Muestra la sintaxis `NEW NOTE`, `CARD`, `FRONT`, `BACK`, `LINK` y cómo redactar fórmulas LaTeX sin escapar barras invertidas.
- **Nota 5 (`standard`) — Bóveda de Medios y Diagramas Vectoriales SVG**:
  - Muestra un diagrama conmutativo en formato `.svg` renderizado nítidamente.

### 2.2 Mazo 2: `📐 Fundamentos de Análisis Real (Rudin / Stein)`
Una selección curada y pedagógicamente estructurada de notas ya creadas en el Prototipo 1:
- Espacios Métricos y Topología en $\mathbb{R}^n$ (Puntos interiores, adherencia, conjuntos abiertos y cerrados).
- Teorema de Compacidad de Heine-Borel (Demostración serial de 4 pasos).
- Continuidad Uniforme y Teorema de Heine-Cantor.
- Integral de Riemann vs Integral de Lebesgue (Definición de medida exterior $m_*$ y subaditividad numerable).
- Teorema Fundamental del Cálculo.

### 2.3 Mazo 3: `⚡ Álgebra Lineal y Teoría de Operadores`
Demostraciones fundamentales de longitud media (2 a 4 pasos):
- Teorema de la Dimensión (Rango-Nulidad).
- Existencia y Unicidad de la Descomposición en Valores Singulares (SVD).
- Teorema Espectral para Operadores Autoadjuntos.

---

## 3. Protocolo de Onboarding de Testers

1. **Distribución "Zero-Setup"**:
   - Generación de un instalador portable para Windows (`.zip` / `.exe`) y paquete Linux (`AppImage`) mediante PyInstaller, para que los testers no necesiten instalar Python, crear entornos virtuales ni ejecutar comandos de terminal.
2. **First-Run Wizard**:
   - Al detectar que `morphism.db` está recién creada, la aplicación ofrece:
     - `[✓] Instalar cursos de ejemplo y tutorial guiado (Recomendado)`
     - `[ ] Iniciar con un lienzo en blanco`
3. **Mecanismo de Feedback Directo**:
   - Botón en la barra de menú `Ayuda -> Reportar Bug o Sugerencia` que abre un issue prediseñado en el repositorio de GitHub con la versión del sistema operativo y los últimos logs de `morphism.log`.
