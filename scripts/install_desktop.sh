#!/usr/bin/env bash
# ==============================================================================
# Morphism SRS Plus — Linux Desktop Integration Installer
# Installs .desktop launcher and high-res application icon
# ==============================================================================
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
APPS_DIR="${XDG_DATA_HOME:-$HOME/.local/share}/applications"
ICONS_DIR="${XDG_DATA_HOME:-$HOME/.local/share}/icons/hicolor/256x256/apps"

mkdir -p "$APPS_DIR"
mkdir -p "$ICONS_DIR"

# Copy Icon
if [ -f "$ROOT_DIR/icon.png" ]; then
    cp "$ROOT_DIR/icon.png" "$ICONS_DIR/morphism-srs-plus.png"
    echo "✓ Installed application icon to $ICONS_DIR/morphism-srs-plus.png"
fi

# Generate & Install Desktop Entry with absolute paths
DESKTOP_FILE="$APPS_DIR/morphism-srs-plus.desktop"
cat <<EOF > "$DESKTOP_FILE"
[Desktop Entry]
Version=1.0
Type=Application
Name=Morphism SRS Plus
GenericName=Spaced Repetition System
Comment=Spaced Repetition System for Mathematics, Logic, and Proof Sequences
Exec=/usr/bin/env bash "$ROOT_DIR/run.sh"
Path=$ROOT_DIR
Icon=$ICONS_DIR/morphism-srs-plus.png
Terminal=false
Categories=Education;Science;Math;
StartupNotify=true
StartupWMClass=morphism-srs-plus
Keywords=flashcards;srs;fsrs;math;latex;proof;graph;spaced-repetition;
EOF

chmod +x "$DESKTOP_FILE"
chmod +x "$ROOT_DIR/run.sh"

# Update desktop database if tool is available
if command -v update-desktop-database >/dev/null 2>&1; then
    update-desktop-database "$APPS_DIR" 2>/dev/null || true
fi

echo "=================================================================="
echo "🎉 Morphism SRS Plus desktop shortcut installed successfully!"
echo "You can now launch 'Morphism SRS Plus' directly from your"
echo "application menu / dashboard / launcher!"
echo "=================================================================="
