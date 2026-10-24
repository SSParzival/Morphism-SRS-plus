# Morphism SRS Plus ⚡

<div align="center">

[![Fork of VAMarques/Morphism-SRS](https://img.shields.io/badge/Fork_of-VAMarques%2FMorphism--SRS-blue?logo=github&style=flat-square)](https://github.com/VAMarques/Morphism-SRS)
[![GitHub Repository](https://img.shields.io/badge/GitHub-SSParzival%2FMorphism--SRS--plus-181717?logo=github&style=flat-square)](https://github.com/SSParzival/Morphism-SRS-plus)
[![Python 3.10+](https://img.shields.io/badge/Python-3.10%20%7C%203.11%20%7C%203.12%20%7C%203.14-3776AB?logo=python&logoColor=white&style=flat-square)](https://www.python.org/)
[![GUI Framework](https://img.shields.io/badge/GUI-PySide6%20%7C%20Qt%206-41CD52?logo=qt&logoColor=white&style=flat-square)](https://www.qt.io/)
[![Android Release](https://img.shields.io/badge/Android-APK%20Release%20Ready-3DDC84?logo=android&logoColor=white&style=flat-square)](morphism-srs-plus.apk)
[![FSRS Engine](https://img.shields.io/badge/Algorithm-FSRS%20v5-blueviolet?style=flat-square)](https://github.com/open-spaced-repetition/fsrs)
[![License: GPL-3.0](https://img.shields.io/badge/License-GPL--3.0-orange.svg?style=flat-square)](LICENSE)

**An advanced, high-performance, cross-platform Spaced Repetition System designed specifically for Mathematics, Formal Logic, and Multi-Step Proof Sequences.**

[✨ Features](#-whats-new-in-morphism-srs-plus) •
[🎨 Themes](#-built-in-json-themes) •
[🚀 Desktop Setup](#-quick-start-on-linux) •
[📲 Android APK](#-android-mobile-app) •
[🏗️ Architecture](#️-clean-modular-architecture) •
[📚 Course Catalog](#-enriched-exam-courses-included)

</div>

---

## 🌟 What's New in Morphism SRS Plus

| Feature | Original Morphism SRS | Morphism SRS Plus ⚡ |
| :--- | :--- | :--- |
| **Theme System** | Hardcoded dark CSS | **Configurable JSON Theme Engine** (`themes/*.json`) with 8 built-in themes (featuring **Bisexual Midnight** default) + live on-the-fly switching |
| **Linux & Wayland** | Relative paths break; high CPU canvas; RADV warnings | Native Wayland & KDE Plasma 6 support, fractional scale `PassThrough`, OpenGL viewport hardware acceleration, XDG cache compliance, `.desktop` & menu launcher |
| **Offline Vector MathJax** | CDN fallback / Missing `tex-svg.js` | **100% Bundled Offline MathJax 3 SVG bundle** (`assets/tex-svg.js`) |
| **Retrievability Plots** | Missing `chart.js` (blank graphs) | **Bundled Chart.js 4.4 UMD** (`assets/chart.js`), fully rendered decay curves & histograms |
| **Card Types** | Flashcards, Proof Sequence | Flashcards, Proof Sequence, and **Cloze Deletion (`{{c1::answer::hint}}`)** |
| **Review Session UX** | No undo, abrupt exit | **Undo Last Rating (`Ctrl+Z`)**, **Session Completion Summary** with statistics & quotes |
| **Graph Explorer** | Manual panning only | **Real-Time Graph Search Bar**, Zoom Controls (`Zoom In`, `Zoom Out`, `1:1`, `Fit View`), Middle-click canvas drag, Cycle-safe auto layout |
| **Course Portability** | Manual file copying | **Single-file `.morphism` / `.zip` Course Package** import & export |
| **Scratchbook** | Basic text editor | Live preview with theme variables, word & char counter, export to `.md` / `.html` |

---

## 🎨 Built-in JSON Themes

Configure or add themes simply by editing or dropping `.json` files into the `themes/` directory!

The app automatically detects all themes and provides instant live switching from the top toolbar:

1. **Bisexual Midnight 💖💜💙 (Default)**: Deep pure black `#000000` background with glowing pink (`#F02A8C`), deep violet (`#3D2148`), and subtle blue (`#78A9FF`) accents matching VS Code and Alacritty.
2. **Dark Modern (Obsidian)**: Deep obsidian background with sleek indigo glow.
3. **Catppuccin Mocha**: Elegant pastel dark theme beloved by developers and Linux users.
4. **Nord (Arctic)**: Arctic slate and cold blue palette designed for calm study.
5. **Dracula**: Classic high-contrast dark theme with vibrant purple and cyan accents.
6. **Tokyo Night**: Sleek cyberpunk theme inspired by Tokyo nightlife.
7. **Solarized Dark**: Warm, low-contrast palette gentle on the eyes during late-night proof sessions.
8. **GitHub Light**: Crystal clear, high-contrast light theme engineered for daytime study.

### Creating a Custom JSON Theme
Create a file `themes/my_custom_theme.json`:
```json
{
  "id": "my_theme",
  "name": "My Custom Theme",
  "is_dark": true,
  "colors": {
    "window_bg": "#121212",
    "surface_bg": "#1e1e1e",
    "header_bg": "#181818",
    "border": "#333333",
    "accent": "#bb86fc",
    "text_primary": "#ffffff",
    "text_muted": "#aaaaaa"
  },
  "graph": {
    "canvas_bg": "#121212",
    "edge_color": "#bb86fc",
    "node_border": "#03dac6"
  }
}
```
Reload the app or select it from the top `🎨 Theme` dropdown!

---

## 🚀 Quick Start on Linux

### 1. Fast Launcher
Run the automated launcher:
```bash
./setup.sh
```
`setup.sh` will:
- Verify Python 3 (supports Python 3.10 through 3.14+).
- Create a virtual environment using `--system-site-packages` (avoiding redundant Qt re-downloads).
- Verify all dependencies (`PySide6`, `fsrs`).
- Launch Morphism SRS Plus immediately.

Subsequent launches can use:
```bash
./run.sh
```

### 2. Install to Linux Applications Menu
To integrate Morphism SRS Plus directly into your desktop environment (GNOME, KDE Plasma, XFCE, Cinnamon, etc.):
```bash
./install_desktop.sh
```
This installs `morphism-srs-plus.desktop` and the high-resolution vector icon into `~/.local/share/applications` and `~/.local/share/icons`. You can then launch it from your application menu or system search!

---

## 📱 Android App (.apk)

**Morphism SRS Plus** includes a lightweight, native, and high-performance Android application (< 1 MB!) designed specifically for mobile touch screens.

### Features on Android:
- **Bisexual Midnight 💖💜💙** preinstalled by default (pure `#000000` AMOLED background, neon pink `#F02A8C` and violet accents).
- **Interactive Multi-Touch Canvas**: Pinch-to-zoom (2 fingers), pan (1 finger), auto-arrange, and real-time concept search.
- **Offline MathJax 3 Vector Math**: Render complex equations, integrals, matrices, and dual spaces with zero latency.
- **Full FSRS Scheduling**: Client-side Free Spaced Repetition Scheduler (`Again`, `Hard`, `Good`, `Easy`) with interval forecasts.
- **Course Interoperability**: Seamlessly import and export `.json` and `.morphism` courses between your Linux PC and Android phone.
- **Cloze & Proof Sequences**: Tap-to-reveal clozes and incremental step-by-step proofs.

### 📲 Installing on your Android phone:
1. Copy [`morphism-srs-plus.apk`](file:///home/ssparzival/Proyectos/GitHub/Morphism-SRS-plus/morphism-srs-plus.apk) to your phone (via USB, Telegram, Google Drive, or local network).
2. Tap the `.apk` file to install it!
3. Alternatively, install via ADB:
   ```bash
   adb install morphism-srs-plus.apk
   ```

### 🛠️ Rebuilding the APK:
A self-contained build script is included that bootstraps the lightweight toolchain and builds the signed APK in under 2 seconds:
```bash
./build_apk.sh
```

---

## 🪟 Windows Setup

1. Open PowerShell or Command Prompt in the repository folder:
   ```powershell
   python -m venv .venv
   .\.venv\Scripts\activate
   pip install -r requirements.txt
   python main.py
   ```

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Context | Action |
| :--- | :--- | :--- |
| **Alt + 1 / 2 / 3 / 4** | Global | Switch Ledger View: **Courses**, **Explorer**, **Review**, **Stats** |
| **Ctrl + F** or **Ctrl + K** | Global | Jump to Explorer search bar & filter notes in real-time |
| **Ctrl + S** | Global | Save active course and scheduling state |
| **Ctrl + N** | Explorer | Create a new Note dialog |
| **Ctrl + +** / **Ctrl + -** | Explorer | Zoom canvas in / out |
| **Ctrl + 0** | Explorer | Reset canvas zoom to 1:1 |
| **Ctrl + Shift + F** | Explorer | Fit all nodes cleanly into viewport |
| **Middle Click Drag** | Explorer | Smooth high-frequency canvas panning |
| **Space** / **Return** | Review | Reveal Solution (Front) / Rate **Good** (Back) |
| **Ctrl + Z** | Review | **Undo Last Rating** & restore card state |
| **1** / **2** / **3** / **4** | Review | Rate **Again**, **Hard**, **Good**, **Easy** |
| **Ctrl + Shift + K** | Editor | Insert **Cloze Deletion** `{{c1::answer}}` |
| **Ctrl + M** | Editor | Insert Math display block `$$ ... $$` |
| **Ctrl + /** | Editor | Insert Fraction `\frac{a}{b}` |
| **Ctrl + B** / **Ctrl + I** | Editor | Bold `<b>...</b>` / Italic `<i>...</i>` |
| **Ctrl + Return** | Editor | Insert `<br>` line break |

---

## 🧩 Cloze Deletions in Mathematics

Morphism SRS Plus introduces first-class Cloze Deletion cards:
- Syntax: `{{c1::answer::hint}}` or `{{c1::answer}}`
- Example:
  ```latex
  A topological space $(X, \tau)$ is {{c1::compact::property}} if every open cover has a finite subcover.
  ```
- **Front:** Displays `[...]` or `[property]`.
- **Back:** Reveals the highlighted solution with full MathJax LaTeX typesetting.

---

## 🏗️ Clean Modular Architecture

Morphism SRS Plus has been reorganized into a modular, clean package hierarchy with backward-compatible root entry points:

```
Morphism-SRS-plus/
├── src/
│   └── morphism/
│       ├── core/                      # Domain logic, models, storage, themes, FSRS scheduler
│       │   ├── app_paths.py           # Canonical paths & XDG compliance
│       │   ├── course_storage.py      # JSON serialization & .morphism course packages
│       │   ├── models.py              # Course, NoteNode, Flashcard, ClozeCard, ProofSequenceCard
│       │   ├── scheduler_manager.py   # FSRS engine adapter & interval calculations
│       │   ├── theme_manager.py       # JSON theme loader & dynamic QSS generator
│       │   └── styles.py              # Theme styling bridge
│       ├── ui/
│       │   ├── views/                 # Full-window interactive views
│       │   │   ├── graph_view.py      # OpenGL-accelerated node/edge canvas with zoom & search
│       │   │   ├── review_view.py     # Flashcard, Proof sequence & Cloze review widget
│       │   │   ├── courses_widget.py  # Drag-and-drop course and folder organizer
│       │   │   └── stats_widget.py    # Retrievability charts & study heatmap
│       │   └── dialogs/               # Modeless & modal dialogs
│       │       ├── node_editor_dialog.py        # MathJax live preview card & node editor
│       │       ├── scratchbook_dialog.py        # Side-by-side scratchpad with vector preview
│       │       ├── retrievability_plot_dialog.py# Chart.js decay curve analyzer
│       │       └── due_forecast_dialog.py       # Future due date calendar forecast
│       └── app.py                     # Main application window & Qt lifecycle
├── scripts/
│   ├── courses_builder/               # Modular exam course builders
│   │   ├── em_i2.py                   # Electricidad y Magnetismo I2 (FIS1533)
│   │   ├── real_i3.py                 # Análisis Real I3 (MAT2514)
│   │   ├── quimica_i2.py              # Química para Ingenieros I2 (QIM100E)
│   │   ├── ofg_muerte.py              # Ritos Funerarios Grecia Antigua (MED836)
│   │   └── base_84.py                 # Base foundational syllabus definitions
│   ├── generate_massive_courses.py    # Complete exam course compiler
│   ├── update_android_app.py          # Android seed courses & asset synchronization
│   ├── build_apk.sh                   # Standalone Android APK build toolchain
│   ├── run.sh                         # Linux/macOS launcher
│   ├── setup.sh                       # Virtual environment & dependency installer
│   └── install_desktop.sh             # Linux XDG desktop integration
├── android/                           # Complete Android AAPT2/D8 source tree
├── Courses/                           # 4 enriched official courses (JSON format)
├── themes/                            # JSON theme definitions (including Bisexual Midnight)
├── tests/                             # Headless & unit test suite
├── morphism-srs-plus.apk              # Pre-compiled standalone Android APK
├── main.py                            # Clean application entry point
├── run.sh                             # Fast root launcher
└── build_apk.sh                       # Root APK compilation shortcut
```

---

## 📚 Enriched Exam Courses Included

The repository comes preloaded with 4 comprehensive courses matching the official syllabi, guides, and exam rubrics:

1. **⚡ Electricidad y Magnetismo (I2) — FIS1533**
   - Polarización y cargas ligadas $\rho_b = -\nabla \cdot \mathbf{P}$, $\sigma_b = \mathbf{P} \cdot \hat{n}$, neutralidad global.
   - Desplazamiento $\mathbf{D}$, condiciones de frontera y capacitancia multicapa.
   - Fuerzas en dieléctricos (a $Q$ cte vs a $V$ cte), resistencia por rebanado geométrico ($RC = \rho \varepsilon$).
   - Transitorios RC con balance energético riguroso (teorema del 50% de disipación Joule).
   - Fuerza de Lorentz, trabajo nulo, efecto Hall, ciclotrón, selector de Wien y espectrómetro de masas.
   - Ley de Biot-Savart vectorial de 5 pasos, espiras, arcos y cables infinitos.
   - Ley de Ampère, cilindros con $J(r) = C r^k$, solenoide y toroide.
   - Magnetismo en la materia: $\mathbf{M}$, corrientes ligadas, campo auxiliar $\mathbf{H}$ y potencial vector $\mathbf{A}$.
   - Inducción de Faraday-Lenz, FEM de movimiento, frenado magnético, autoinductancia y transitorios RL.
   - Rúbrica oficial FIS1533, doctrina de arrastre de error (*error-carrying*) y parametrización de rescate $I_0$.

2. **📐 Análisis Real (I3) — MAT2514**
   - Decálogo oficial de demostraciones: Apertura, Justificación, Hilado y Cierre (4/16 pts).
   - Las 7 intuiciones nucleares y radar de diagnóstico rápido de la I3.
   - Convergencia puntual vs uniforme, criterio del supremo, evaluación en sucesiones móviles $x_n = c/n$.
   - Teorema de continuidad del límite uniforme (técnica $\varepsilon/3$) y Test M de Weierstrass.
   - Teorema de Dini y desglose exhaustivo de sus 3 hipótesis con contraejemplos.
   - Completitud de $(C(K), \|\cdot\|_\infty)$ y propiedades del espacio $C^1([a, b])$.
   - Integración y diferenciación término a término bajo convergencia uniforme.
   - Equicontinuidad, familias uniformemente Lipschitz y Teorema de Arzelà-Ascoli en compactos.
   - Operadores integrales compactos de Fredholm.
   - Teorema de Stone-Weierstrass: polinomios pares, funciones bivariadas y productos tensoriales.
   - Teorema del Punto Fijo de Banach, cotas de error a priori/a posteriori, iterados contractivos y Picard-Lindelöf.

3. **🧪 Química para Ingenieros (I2) — QIM100E**
   - Unidades de concentración ($M, m, X_i$, \% m/m, \% m/v) y dilución $C_1 V_1 = C_2 V_2$.
   - Velocidad diferencial estequiométrica, leyes de velocidad y método de velocidades iniciales.
   - Cinética integrada de orden 0, 1 y 2, gráficos de linealización y vida media $t_{1/2}$.
   - Condiciones de pseudo-primer orden ($[B]_0 \gg [A]_0$).
   - Ecuación de Arrhenius, perfiles de energía potencial, complejo activado y catálisis.
   - Equilibrio químico: $K_c, K_p = K_c(RT)^{\Delta n_{\text{gas}}}$, cociente $Q$ y Le Chatelier.
   - Efecto térmico vía Ecuación de Van 't Hoff para reacciones endotérmicas y exotérmicas.
   - Ácido-Base: autoionización del agua, $K_w$, ácidos y bases débiles, tabla ICE y regla del 5%.
   - Hidrólisis de sales, disoluciones amortiguadoras (Henderson-Hasselbalch) y adición de ácidos/bases fuertes.
   - Curvas de titulación, punto de semi-equivalencia ($\text{pH} = \text{p}K_a$) y punto de equivalencia.
   - Método del ión-electrón en medio ácido y básico, celdas galvánicas, potenciales $E^\circ$ y Nernst.
   - Relaciones termodinámicas ($\Delta G^\circ = -n F E^\circ = -RT \ln K$) y electrólisis de Faraday.

4. **🏺 OFG Muerte (Presentación y Guión: Ritos Funerarios en la Grecia Antigua) — MED836**
   - Rúbrica oficial MED836 y cronograma exacto de 10:00 minutos para 4 expositores (2:30 c/u).
   - Antropología de los ritos de paso (Arnold van Gennep): Separación, Liminalidad y Reintegración.
   - El deber sagrado de sepultura: Patroclo y Aquiles en la Ilíada; la tragedia de Antígona (themis vs nomos).
   - Escatología homérica: ontología de la $\text{psyche}$ como $\text{eidolon}$ sin fuerza ($\text{menos}$) ni razón ($\text{phrenes}$).
   - Geografía del Hades: los 5 ríos (Estigia, Aqueronte, Cocito, Flegetonte, Lete), Caronte, óbolo y Hermes Psicopompo.
   - El Tríptico Ritual Canónico: Próthesis en el oikos, lamentos $\text{góos}$ vs $\text{thrēnos}$, Ékfora presolar y Sepultura/Perídeipnon.
   - Leyes suntuarias de Solón (594 a.C.): contención del luto femenino y neutralización de venganzas aristocráticas.
   - Arte funerario en el Cerámico: estelas de mármol y el motivo de la $\text{dexiosis}$ (apretón de manos vivo-muerto).
   - Calendario del luto post-sepulcral (trita, enata, triakostia) y Fiestas Antesterias (día de los Chytroi).
   - Guión de locución diapositiva por diapositiva con marcas visuales de coordinación y banco de preguntas para la defensa (Q&A).

---

## 📄 License & Credits

- Distributed under the **GPL-3.0 License**.
- Based on the original [Morphism-SRS](https://github.com/VAMarques/Morphism-SRS) by VAMarques.
- Enhanced and maintained as **Morphism SRS Plus** by SSParzival.
