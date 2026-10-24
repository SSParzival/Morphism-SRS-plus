"""Backward compatibility shim for scratchbook_dialog."""
import os
import sys

_SRC = os.path.join(os.path.dirname(os.path.abspath(__file__)), "src")
if _SRC not in sys.path:
    sys.path.insert(0, _SRC)

from morphism.ui.dialogs.scratchbook_dialog import *
