#!/usr/bin/env bash
# ==============================================================================
# Morphism SRS Plus — Fast Launcher Script for Linux / macOS
# ==============================================================================
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

VENV_DIR="$SCRIPT_DIR/.venv"

# If venv doesn't exist, run setup.sh
if [ ! -d "$VENV_DIR" ]; then
    echo "Virtual environment not detected. Running initial setup..."
    bash "$SCRIPT_DIR/setup.sh"
    exit 0
fi

# Activate virtual environment
source "$VENV_DIR/bin/activate"

# Launch Morphism SRS Plus
exec python3 "$SCRIPT_DIR/main.py" "$@"
