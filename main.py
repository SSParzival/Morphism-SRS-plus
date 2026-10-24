#!/usr/bin/env python3
"""
Morphism SRS Plus — Desktop Application Entry Point
Supports running Morphism SRS Plus (default) and Morphism SRS Proto 2 (--proto2).
"""
import sys
import os

SRC_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "src")
if SRC_DIR not in sys.path:
    sys.path.insert(0, SRC_DIR)

if __name__ == "__main__":
    if "--proto2" in sys.argv or "--v2" in sys.argv:
        from morphism_srs.app import main as main_v2
        filtered_args = [arg for arg in sys.argv if arg not in ("--proto2", "--v2")]
        sys.exit(main_v2(filtered_args))
    else:
        from morphism.app import main
        main()
