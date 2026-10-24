#!/usr/bin/env python3
"""Convenience launcher for Morphism SRS Prototype 2 from the repository root."""

from __future__ import annotations

import os
import sys

SRC_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "src")
if SRC_DIR not in sys.path:
    sys.path.insert(0, SRC_DIR)

from morphism_srs.app import main

if __name__ == "__main__":
    raise SystemExit(main())
