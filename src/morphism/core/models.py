import time
import random
import uuid
import re
from abc import ABC, abstractmethod
from typing import List, Dict, Any, Optional
from datetime import datetime, timezone
from fsrs import Card as FSRSCard, Scheduler, Rating, State

def generate_id64() -> int:
    """Generate a unique 64-bit integer ID."""
    return (int(time.time() * 1000) << 20) | random.randint(0, (1 << 20) - 1)

def to_hex_id(val: Any) -> str:
    """Format any ID as 0x Hex representation (e.g. 0x19FA38B20D7)."""
    try:
        return f"0x{int(val):X}"
    except Exception:
        return f"0x{val}"

class ReviewLogRecord:
    """Record of a single card review event for FSRS optimization."""
    def __init__(self, card_id: int, rating: int, review_time: str, 
                 elapsed_days: int = 0, scheduled_days: int = 0, 
                 state: int = 0, stability: Optional[float] = None, 
                 difficulty: Optional[float] = None):
        self.card_id = card_id
        self.rating = rating
        self.review_time = review_time
        self.elapsed_days = elapsed_days
        self.scheduled_days = scheduled_days
        self.state = state
        self.stability = stability
        self.difficulty = difficulty

    def to_dict(self) -> Dict[str, Any]:
        return {
            "card_id": self.card_id,
            "rating": self.rating,
            "review_time": self.review_time,
            "elapsed_days": self.elapsed_days,
            "scheduled_days": self.scheduled_days,
            "state": self.state,
            "stability": self.stability,
            "difficulty": self.difficulty
        }

    @classmethod
    def from_dict(cls, d: Dict[str, Any]) -> 'ReviewLogRecord':
        return cls(
            card_id=d["card_id"],
            rating=d["rating"],
            review_time=d["review_time"],
            elapsed_days=d.get("elapsed_days", 0),
            scheduled_days=d.get("scheduled_days", 0),
            state=d.get("state", 0),
            stability=d.get("stability"),
            difficulty=d.get("difficulty")
        )

class ReviewObject(ABC):
    """Base class for anything that can be scheduled and reviewed."""
    
    def __init__(self, item_id: Optional[Any] = None):
        if item_id is not None:
            try:
                self.item_id = int(item_id)
            except ValueError:
                self.item_id = generate_id64()
        else:
            self.item_id = generate_id64()
            
        self.fsrs_card = FSRSCard()
        
    def get_hex_id(self) -> str:
        """Return 64-bit ID formatted as uppercase Hex representation (e.g. 0x19FA38B20D7)."""
        try:
            return f"0x{int(self.item_id):X}"
        except Exception:
            return f"0x{self.item_id}"

    @abstractmethod
    def get_title(self) -> str:
        """Short title or question header."""
        pass

    @abstractmethod
    def get_html_front(self) -> str:
        """HTML content for the front of the card."""
        pass

    @abstractmethod
    def get_html_back(self) -> str:
        """HTML content for the back / solution of the card."""
        pass

    def is_due(self) -> bool:
        """Check if the card is due for review."""
        now = datetime.now(timezone.utc)
        return self.fsrs_card.due <= now

    def get_state_name(self) -> str:
        """Human-readable FSRS state name."""
        if self.fsrs_card.last_review is None:
            return "New"
        if self.is_due():
            return "Due"
        state = self.fsrs_card.state
        if state == State.Learning:
            return "Learning"
        elif state == State.Review:
            return "Review"
        elif state == State.Relearning:
            return "Relearning"
        return "Review"

    def to_dict(self, include_scheduling: bool = True) -> Dict[str, Any]:
        """Serialize to dictionary for JSON storage."""
        d = {
            "item_id": self.item_id,
            "type": self.__class__.__name__
        }
        if include_scheduling:
            d["fsrs_card"] = self.fsrs_card.to_dict() if hasattr(self.fsrs_card, 'to_dict') else None
        return d


def format_html_content(raw: str) -> str:
    """Format content by normalizing literal escaped newlines and converting to <br>."""
    if not raw:
        return ""
    text = raw.replace(r"\r\n", "\n").replace(r"\n", "\n").replace("/n", "\n")
    parts = re.split(
        r"(\$\$[\s\S]*?\$\$|<div class=['\"]math-display-container['\"]>[\s\S]*?</div>|<table[\s\S]*?</table>|<pre[\s\S]*?</pre>|<ul[\s\S]*?</ul>|<ol[\s\S]*?</ol>)",
        text,
    )
    res = []
    for p in parts:
        if not p:
            continue
        if p.startswith("$$") and p.endswith("$$"):
            res.append(p)
        elif "math-display-container" in p or re.match(r"^<(table|pre|ul|ol)\b", p, re.I):
            res.append(p)
        else:
            res.append(p.replace("\n\n", "<br><br>").replace("\n", "<br>"))
    return "".join(res)


class Flashcard(ReviewObject):
    """Standard Flashcard with LaTeX MathJax support."""
    def __init__(self, title: str, front: str, back: str, item_id: Optional[Any] = None):
        super().__init__(item_id)
        self.title = title
        self.front = front
        self.back = back

    def get_title(self) -> str:
        return self.title

    def get_html_front(self) -> str:
        return f"<div class='card-title'>{self.title}</div><div class='card-body'>{format_html_content(self.front)}</div>"

    def get_html_back(self) -> str:
        return f"<div class='card-body'>{format_html_content(self.back)}</div>"

    def to_dict(self, include_scheduling: bool = True) -> Dict[str, Any]:
        d = super().to_dict(include_scheduling=include_scheduling)
        d.update({
            "title": self.title,
            "front": self.front,
            "back": self.back
        })
        return d


class ClozeCard(ReviewObject):
    """Cloze deletion card for definitions and formulas using {{c1::answer}} or {{c1::answer::hint}}."""
    def __init__(self, title: str, text: str, item_id: Optional[Any] = None):
        super().__init__(item_id)
        self.title = title
        self.text = text

    def get_title(self) -> str:
        return self.title

    @staticmethod
    def _replace_clozes(text: str, is_back: bool, in_math: bool = False, is_display: bool = False) -> str:
        pattern = re.compile(r"\{\{c(\d+)::")
        pieces = []
        last_idx = 0
        i = 0
        while i < len(text):
            m = pattern.search(text, i)
            if not m:
                break
            start = m.start()
            content_start = m.end()
            depth = 2
            j = content_start
            while j < len(text) and depth > 0:
                if text[j] == "{" and j + 1 < len(text) and text[j + 1] == "{":
                    depth += 2
                    j += 2
                elif text[j] == "{":
                    depth += 1
                    j += 1
                elif text[j] == "}" and depth > 2:
                    depth -= 1
                    j += 1
                elif text[j] == "}" and j + 1 < len(text) and text[j + 1] == "}" and depth == 2:
                    depth = 0
                    j += 2
                    break
                elif text[j] == "}":
                    depth -= 1
                    j += 1
                else:
                    j += 1

            if depth == 0:
                content = text[content_start : j - 2]
                prefix = text[last_idx:start]
                if in_math:
                    if prefix.strip():
                        pieces.append(f"$\\displaystyle {prefix}$" if is_display else f"${prefix}$")
                else:
                    pieces.append(prefix)

                c_parts = content.split("::", 1)
                if not is_back:
                    hint = c_parts[1].strip() if len(c_parts) > 1 else "..."
                    pieces.append(f"<span class='cloze-bracket'>[{hint}]</span>")
                else:
                    ans = c_parts[0].strip()
                    if in_math:
                        pieces.append(
                            f"<span class='cloze-revealed'>$\\displaystyle {ans}$</span>"
                            if is_display
                            else f"<span class='cloze-revealed'>${ans}$</span>"
                        )
                    else:
                        pieces.append(f"<span class='cloze-revealed'>{ans}</span>")
                last_idx = j
                i = j
            else:
                i = content_start

        suffix = text[last_idx:]
        if in_math:
            if suffix.strip():
                pieces.append(f"$\\displaystyle {suffix}$" if is_display else f"${suffix}$")
        else:
            pieces.append(suffix)
        return "".join(pieces)

    @staticmethod
    def _process_cloze_math(text: str, is_back: bool) -> str:
        if not text:
            return ""

        def math_repl(math_match):
            block = math_match.group(0)
            is_display = block.startswith("$$")
            delim = "$$" if is_display else "$"
            inner = block[len(delim) : -len(delim)]
            if not re.search(r"\{\{c\d+::", inner):
                return block

            res = ClozeCard._replace_clozes(inner, is_back=is_back, in_math=True, is_display=is_display)
            if is_display:
                return f"<div class='math-display-container'>{res}</div>"
            return res

        out = re.sub(r"(\$\$[\s\S]*?\$\$|\$[^\$]+?\$)", math_repl, text)
        return ClozeCard._replace_clozes(out, is_back=is_back, in_math=False, is_display=False)

    def get_html_front(self) -> str:
        front_text = format_html_content(self._process_cloze_math(self.text, is_back=False))
        return f"<div class='card-title'>{self.title}</div><div class='card-body'>{front_text}</div>"

    def get_html_back(self) -> str:
        back_text = format_html_content(self._process_cloze_math(self.text, is_back=True))
        return f"<div class='card-body'>{back_text}</div>"

    def to_dict(self, include_scheduling: bool = True) -> Dict[str, Any]:
        d = super().to_dict(include_scheduling=include_scheduling)
        d.update({
            "title": self.title,
            "text": self.text
        })
        return d


class ProofSequenceCard(ReviewObject):
    """Multi-step proof card where steps can be revealed incrementally."""
    def __init__(self, title: str, premise: str, steps: List[str], item_id: Optional[Any] = None):
        super().__init__(item_id)
        self.title = title
        self.premise = premise
        self.steps = steps  # List of step strings (LaTeX/HTML)
        self.current_revealed = 0

    def get_title(self) -> str:
        return self.title

    def get_html_front(self) -> str:
        return f"<div class='card-title'>{self.title}</div><div class='card-body'><strong>Premise / Goal:</strong><br>{format_html_content(self.premise)}</div>"

    def get_html_back(self) -> str:
        steps_html = "".join([f"<li class='proof-step'>Step {i+1}: {format_html_content(step)}</li>" for i, step in enumerate(self.steps)])
        return f"<div class='card-body'><strong>Complete Proof:</strong><ol class='proof-list'>{steps_html}</ol></div>"

    def to_dict(self, include_scheduling: bool = True) -> Dict[str, Any]:
        d = super().to_dict(include_scheduling=include_scheduling)
        d.update({
            "title": self.title,
            "premise": self.premise,
            "steps": self.steps
        })
        return d


class NoteNode:
    """A Node in the knowledge graph representing a 'Note' containing multiple cards/review objects."""
    def __init__(self, note_id: Optional[Any] = None, title: str = "New Note", x: float = 0.0, y: float = 0.0, 
                 tags: Optional[List[str]] = None, note_type: str = "standard", 
                 desired_retention: float = 0.85):
        if note_id is not None:
            try:
                self.note_id = str(int(note_id))
            except ValueError:
                self.note_id = str(note_id)
        else:
            self.note_id = str(generate_id64())

        self.title = title
        self.x = x
        self.y = y
        self.tags = tags or []
        self.cards: List[ReviewObject] = []
        self.note_type = note_type  # "standard", "serial_sequence", or "serial_sequence_single"
        self.desired_retention = desired_retention  # Target retention R for the note (e.g. 0.85)

    def is_serial_sequence(self) -> bool:
        return self.note_type in ("serial_sequence", "serial_sequence_single")

    def is_serial_sequence_single(self) -> bool:
        return self.note_type == "serial_sequence_single"

    def is_serial_sequence_full(self) -> bool:
        return self.note_type == "serial_sequence"

    def add_card(self, card: ReviewObject):
        self.cards.append(card)

    def matches_query(self, query: str) -> bool:
        """Check if note matches search query across title, tags, and card content."""
        q = query.lower().strip()
        if not q:
            return True
        if q in self.title.lower():
            return True
        if any(q in t.lower() for t in self.tags):
            return True
        for c in self.cards:
            if hasattr(c, 'title') and q in c.title.lower():
                return True
            if hasattr(c, 'front') and q in c.front.lower():
                return True
            if hasattr(c, 'back') and q in c.back.lower():
                return True
            if hasattr(c, 'premise') and q in c.premise.lower():
                return True
            if hasattr(c, 'text') and q in c.text.lower():
                return True
        return False

    def get_joint_retention(self, scheduler_manager=None) -> float:
        """
        Calculate joint retention P(∩ A_i) = ∏ R_i(t) for all cards in this note.
        """
        if not self.cards:
            return 1.0
        if scheduler_manager is not None:
            return scheduler_manager.get_note_retention(self.cards)
        if any(c.is_due() for c in self.cards):
            return 0.0
        return 1.0

    def is_due(self, scheduler_manager=None) -> bool:
        """
        Due if any card is New, any card's scheduled due timestamp has expired (intraday reviews),
        or joint retention P(∩ A_i) <= desired_retention.
        """
        if not self.cards:
            return False

        if any(c.fsrs_card.last_review is None for c in self.cards):
            return True

        if any(c.is_due() for c in self.cards):
            return True

        if scheduler_manager is not None:
            joint_r = self.get_joint_retention(scheduler_manager)
            return joint_r <= self.desired_retention

        return False

    def due_count(self, scheduler_manager=None) -> int:
        if self.is_due(scheduler_manager):
            return len(self.cards)
        return sum(1 for c in self.cards if c.is_due())

    def total_count(self) -> int:
        return len(self.cards)

    def to_dict(self, include_scheduling: bool = True) -> Dict[str, Any]:
        return {
            "note_id": self.note_id,
            "title": self.title,
            "x": self.x,
            "y": self.y,
            "tags": self.tags,
            "note_type": self.note_type,
            "desired_retention": self.desired_retention,
            "cards": [c.to_dict(include_scheduling=include_scheduling) for c in self.cards]
        }


class NoteEdge:
    """A directed edge in the graph indicating prerequisite or concept dependency."""
    def __init__(self, source_id: str, target_id: str, label: str = ""):
        self.source_id = str(source_id)
        self.target_id = str(target_id)
        self.label = label

    def to_dict(self) -> Dict[str, Any]:
        return {
            "source_id": self.source_id,
            "target_id": self.target_id,
            "label": self.label
        }


class Course:
    """A Course representing a full knowledge graph of notes and directed edges."""

    def __init__(self, name: str, notes: Optional[List[NoteNode]] = None, 
                 edges: Optional[List[NoteEdge]] = None, folder_path: str = ""):
        self.name = name
        self.notes: List[NoteNode] = notes or []
        self.edges: List[NoteEdge] = edges or []
        self.folder_path: str = folder_path  # Relative folder path e.g. "Math/Analysis"

    def get_note_by_id(self, note_id: str) -> Optional[NoteNode]:
        """Find note by ID."""
        for n in self.notes:
            if n.note_id == note_id:
                return n
        return None

    def find_notes(self, query: str) -> List[NoteNode]:
        """Search notes in the course by query string."""
        return [n for n in self.notes if n.matches_query(query)]

    def to_dict(self, include_scheduling: bool = True) -> Dict[str, Any]:
        return {
            "name": self.name,
            "folder_path": self.folder_path,
            "notes": [n.to_dict(include_scheduling=include_scheduling) for n in self.notes],
            "edges": [e.to_dict() for e in self.edges]
        }
