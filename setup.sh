#!/usr/bin/env bash
# ==============================================================================
# Morphism SRS Plus - Setup & Launch Script (Linux / macOS)
# Creates a Python virtual environment, installs dependencies, & runs the app.
# ==============================================================================

set -e

# ANSI Color Codes
BLUE='\033[0;34m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}====================================================${NC}"
echo -e "${CYAN}       ⚡ Morphism SRS Plus Setup & Launcher ⚡    ${NC}"
echo -e "${BLUE}====================================================${NC}"

# Detect OS
OS_NAME=$(uname -s)
echo -e "${YELLOW}Detected OS:${NC} ${OS_NAME}"

# Detect Python 3 executable
if command -v python3 >/dev/null 2>&1; then
    PYTHON_BIN="python3"
elif command -v python >/dev/null 2>&1; then
    PYTHON_BIN="python"
else
    echo -e "${RED}Error: Python 3 is not installed or not found in PATH.${NC}"
    echo "Please install Python 3 (https://www.python.org/downloads/) and try again."
    exit 1
fi

echo -e "${GREEN}Using Python:${NC} $($PYTHON_BIN --version)"

# Create virtual environment if not present
VENV_DIR=".venv"
if [ ! -d "$VENV_DIR" ]; then
    echo -e "${YELLOW}Creating Python virtual environment in ${VENV_DIR}...${NC}"
    # Use --system-site-packages to leverage system PySide6 if installed
    $PYTHON_BIN -m venv --system-site-packages "$VENV_DIR"
    echo -e "${GREEN}Virtual environment created successfully!${NC}"
fi

# Activate virtual environment
echo -e "${YELLOW}Activating virtual environment...${NC}"
source "$VENV_DIR/bin/activate"

# Upgrade pip and install requirements
echo -e "${YELLOW}Installing / Verifying dependencies from requirements.txt...${NC}"
pip install -r requirements.txt --quiet

echo -e "${GREEN}Dependencies verified successfully!${NC}"

# Ensure permissions
chmod +x run.sh 2>/dev/null || true
chmod +x install_desktop.sh 2>/dev/null || true

echo -e "${BLUE}====================================================${NC}"
echo -e "${GREEN}🚀 Launching Morphism SRS Plus...${NC}"
echo -e "${BLUE}====================================================${NC}"

# Run main application
exec python3 main.py "$@"
