from __future__ import annotations

from dataclasses import dataclass
import re


@dataclass
class DSLToken:
    kind: str  # DIRECTIVE | PROPERTY | STEP_HEADER | BLOCK_DELIM | TEXT
    line_num: int
    raw: str
    key: str = ""
    value: str = ""


class DSLLexer:
    """Line-oriented lexer for the .mdsl (Morphism Domain Specific Language) format."""

    DIRECTIVE_RE = re.compile(r"^\s*@([a-zA-Z_]+)\s*(.*?)\s*$")
    PROPERTY_RE = re.compile(r"^\s*([a-zA-Z_]+)\s*:\s*(.*?)\s*$")
    STEP_RE = re.compile(r"^\s*\[step\s*(\d+)?(?:\s*:\s*(.*?))?\]\s*$", re.IGNORECASE)

    def tokenize(self, source: str) -> list[DSLToken]:
        tokens: list[DSLToken] = []
        lines = source.splitlines()
        in_block = False

        for idx, line in enumerate(lines, start=1):
            stripped = line.strip()
            if stripped == "---":
                in_block = not in_block
                tokens.append(DSLToken(kind="BLOCK_DELIM", line_num=idx, raw=line))
                continue

            if not in_block:
                m_dir = self.DIRECTIVE_RE.match(line)
                if m_dir:
                    tokens.append(
                        DSLToken(
                            kind="DIRECTIVE",
                            line_num=idx,
                            raw=line,
                            key=m_dir.group(1).lower(),
                            value=m_dir.group(2),
                        )
                    )
                    continue

                m_prop = self.PROPERTY_RE.match(line)
                if m_prop and m_prop.group(1).lower() in {
                    "title",
                    "mode",
                    "tags",
                    "deps",
                    "premise",
                    "retention",
                    "pos",
                    "folder",
                    "color",
                    "description",
                    "q",
                    "a",
                    "h",
                }:
                    tokens.append(
                        DSLToken(
                            kind="PROPERTY",
                            line_num=idx,
                            raw=line,
                            key=m_prop.group(1).lower(),
                            value=m_prop.group(2),
                        )
                    )
                    continue

            m_step = self.STEP_RE.match(line)
            if m_step:
                tokens.append(
                    DSLToken(
                        kind="STEP_HEADER",
                        line_num=idx,
                        raw=line,
                        key=m_step.group(1) or "",
                        value=m_step.group(2) or "",
                    )
                )
                continue

            m_qa = self.PROPERTY_RE.match(line)
            if m_qa and m_qa.group(1).lower() in {"q", "a", "h", "front", "back", "hint"}:
                tokens.append(
                    DSLToken(
                        kind="PROPERTY",
                        line_num=idx,
                        raw=line,
                        key=m_qa.group(1).lower(),
                        value=m_qa.group(2),
                    )
                )
                continue

            tokens.append(DSLToken(kind="TEXT", line_num=idx, raw=line))

        return tokens
