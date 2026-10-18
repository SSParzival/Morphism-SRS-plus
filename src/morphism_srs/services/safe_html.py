from __future__ import annotations

import re

ALLOWED_HTML_TAGS = {
    "br",
    "hr",
    "b",
    "strong",
    "i",
    "em",
    "u",
    "s",
    "sub",
    "sup",
    "ul",
    "ol",
    "li",
    "p",
    "div",
    "span",
    "code",
    "pre",
    "blockquote",
    "table",
    "thead",
    "tbody",
    "tr",
    "th",
    "td",
    "img",
    "svg",
    "path",
    "g",
    "rect",
    "circle",
    "ellipse",
    "line",
    "polyline",
    "polygon",
    "text",
    "defs",
    "marker",
    "use",
    "style",
}

# Match `<tag...>` or `</tag>` with NO leading whitespace after `<`
TAG_CANDIDATE_RE = re.compile(r"<(/?)([a-zA-Z][a-zA-Z0-9_:-]*)(\s[^<>]*|/?)>")


def sanitize_math_html(raw: str) -> str:
    r"""
    Safely preserves whitelisted HTML tags (like <br>, <ul>, <img>, <svg>) while
    converting mathematical comparison operators `<` and `>` (such as `$a < b$`
    or `$\langle x, y \rangle > 0$`) into native LaTeX commands `\lt ` and `\gt `.
    """
    if not raw:
        return ""

    preserved_tags: list[str] = []

    def _replace_valid_tag(match: re.Match[str]) -> str:
        tag_name = match.group(2).lower()
        if tag_name in ALLOWED_HTML_TAGS:
            idx = len(preserved_tags)
            preserved_tags.append(match.group(0))
            return f"\x00HTMLTAG_{idx}\x00"
        return match.group(0)

    step1 = TAG_CANDIDATE_RE.sub(_replace_valid_tag, raw)
    step2 = step1.replace("<", r"\lt ").replace(">", r"\gt ")

    def _restore_tag(match: re.Match[str]) -> str:
        idx = int(match.group(1))
        return preserved_tags[idx]

    return re.sub(r"\x00HTMLTAG_(\d+)\x00", _restore_tag, step2)
