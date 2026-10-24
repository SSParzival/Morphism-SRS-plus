#!/usr/bin/env python3
"""Root launcher for update_android_app script."""
import os
import sys
import subprocess

script_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "scripts", "update_android_app.py")
if __name__ == "__main__":
    sys.exit(subprocess.call([sys.executable, script_path] + sys.argv[1:]))
