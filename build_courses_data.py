#!/usr/bin/env python3
"""Root launcher for build_courses_data script."""
import os
import sys
import subprocess

script_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "scripts", "build_courses_data.py")
if __name__ == "__main__":
    sys.exit(subprocess.call([sys.executable, script_path] + sys.argv[1:]))
