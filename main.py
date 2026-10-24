#!/usr/bin/env python3
"""
Morphism SRS Plus — Desktop Application Entry Point
"""
import sys
import os

SRC_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "src")
if SRC_DIR not in sys.path:
    sys.path.insert(0, SRC_DIR)

from morphism.app import MainWindow, HelpGuideDialog, main

if __name__ == "__main__":
    main()
