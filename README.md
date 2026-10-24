# Morphism SRS Plus ⚡

**Morphism SRS Plus** is an advanced, high-performance, cross-platform Spaced Repetition System designed specifically for **Mathematics, Formal Logic, and Proof Sequences**. 

It builds upon the original *Morphism SRS* by adding full Linux desktop integration, an extensible **JSON-based Theme Engine**, bundled offline MathJax 3 vector rendering and Chart.js analytics, **Cloze Deletion** cards, real-time graph search, **Undo Rating**, course package exports (`.morphism`), and numerous efficiency optimizations.

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

## 📄 License & Credits

- Distributed under the **GPL-3.0 License**.
- Based on the original [Morphism-SRS](https://github.com/VAMarques/Morphism-SRS) by VAMarques.
- Enhanced and maintained as **Morphism SRS Plus**.
