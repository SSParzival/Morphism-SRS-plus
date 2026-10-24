from __future__ import annotations

from http import HTTPStatus
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
import json
import secrets
import socket
import sqlite3
import threading
from urllib.parse import parse_qs, urlparse

from morphism_srs.controllers.event_bus import EventBus
from morphism_srs.controllers.review_controller import ReviewController
from morphism_srs.domain.enums import RatingEnum
from morphism_srs.storage.media_vault import MediaVault


MOBILE_PWA_HTML = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>Morphism SRS Mobile Companion</title>
<style>
  :root {
    --bg: #1e1e2e; --surface: #313244; --text: #cdd6f4;
    --accent: #89b4fa; --danger: #f38ba8; --warn: #f9e2af; --ok: #a6e3a1; --info: #89dceb;
  }
  * { box-sizing: border-box; }
  body { margin: 0; padding: 14px; background: var(--bg); color: var(--text); font-family: system-ui, sans-serif; }
  .top-bar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; gap: 8px; flex-wrap: wrap; }
  .badge { background: var(--surface); color: var(--accent); padding: 4px 10px; border-radius: 6px; font-weight: 700; font-size: 13px; }
  .card-box { background: var(--surface); border-radius: 12px; padding: 16px; min-height: 220px; margin-bottom: 14px; }
  .sib-box { background: rgba(0,0,0,0.22); border-left: 3px solid var(--info); padding: 8px 10px; border-radius: 6px; margin-bottom: 8px; font-size: 14px; }
  .btn-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
  button { padding: 12px 8px; border-radius: 8px; border: 1px solid var(--accent); background: var(--surface); color: var(--text); font-weight: 700; font-size: 14px; }
  .btn-primary { width: 100%; background: var(--accent); color: #11111b; margin-bottom: 10px; }
  .btn-again { border-color: var(--danger); color: var(--danger); }
  .btn-hard { border-color: var(--warn); color: var(--warn); }
  .btn-good { border-color: var(--ok); color: var(--ok); }
  .btn-easy { border-color: var(--info); color: var(--info); }
</style>
<script>
  window.MathJax = {
    tex: { inlineMath: [['$','$'], ['\\\\(','\\\\)']], displayMath: [['$$','$$'], ['\\\\[','\\\\]']] },
    svg: { fontCache: 'local' }
  };
</script>
<script src="/vendor/mathjax/tex-svg-full.js"></script>
</head>
<body>
  <div class="top-bar">
    <span id="status-badge" class="badge">Connecting...</span>
    <div>
      <button onclick="checkoutOffline()">Check-Out Offline</button>
      <button onclick="checkinOffline()">Sync Check-In</button>
    </div>
  </div>
  <div id="card-container" class="card-box">Loading queue...</div>
  <button id="reveal-btn" class="btn-primary" onclick="revealAnswer()">Show Answer</button>
  <div id="rating-row" class="btn-row" style="display:none;">
    <button class="btn-again" onclick="submitRating(1)">Again</button>
    <button class="btn-hard" onclick="submitRating(2)">Hard</button>
    <button class="btn-good" onclick="submitRating(3)">Good</button>
    <button class="btn-easy" onclick="submitRating(4)">Easy</button>
  </div>
<script>
  const TOKEN = new URLSearchParams(window.location.search).get("token") || "";
  let currentCard = null;
  let offlineBundle = JSON.parse(localStorage.getItem("morphism_offline_bundle") || "null");
  let offlineLogs = JSON.parse(localStorage.getItem("morphism_offline_logs") || "[]");

  function typeset() {
    if (window.MathJax && window.MathJax.typesetPromise) {
      window.MathJax.typesetPromise([document.getElementById("card-container")]);
    }
  }

  async function loadCurrent() {
    if (offlineBundle && offlineBundle.cards && offlineBundle.cards.length > 0) {
      currentCard = offlineBundle.cards[0];
      document.getElementById("status-badge").textContent = "OFFLINE (" + offlineBundle.cards.length + " left, " + offlineLogs.length + " logged)";
      renderCard(currentCard, false);
      return;
    }
    const res = await fetch("/api/current?token=" + encodeURIComponent(TOKEN));
    const data = await res.json();
    if (!data.has_card) {
      document.getElementById("status-badge").textContent = "Queue Complete";
      document.getElementById("card-container").innerHTML = "<h3>All due cards reviewed!</h3>";
      document.getElementById("reveal-btn").style.display = "none";
      document.getElementById("rating-row").style.display = "none";
      return;
    }
    currentCard = data;
    document.getElementById("status-badge").textContent = "LIVE (" + data.remaining + " left)";
    renderCard(data, false);
  }

  function renderCard(c, showBack) {
    let html = "<div><strong>" + (c.note_title || "") + "</strong> [" + (c.review_mode || "standard").toUpperCase() + "]</div><hr>";
    if (c.premise_html) html += "<div class='sib-box'>" + c.premise_html + "</div>";
    (c.siblings || []).forEach(s => {
      html += "<div class='sib-box'><b>Step " + (s.step_order + 1) + ":</b> " + s.front_html + "<br><i>" + s.back_html + "</i></div>";
    });
    html += "<div style='margin-top:10px;font-size:16px;'>" + (c.front_html || "").replaceAll("morphism://media/", "/media/") + "</div>";
    if (showBack) {
      html += "<hr><div style='margin-top:10px;font-size:16px;'>" + (c.back_html || "").replaceAll("morphism://media/", "/media/") + "</div>";
    }
    document.getElementById("card-container").innerHTML = html;
    document.getElementById("reveal-btn").style.display = showBack ? "none" : "block";
    document.getElementById("rating-row").style.display = showBack ? "grid" : "none";
    typeset();
  }

  function revealAnswer() {
    if (currentCard) renderCard(currentCard, true);
  }

  async function submitRating(r) {
    if (offlineBundle && offlineBundle.cards && offlineBundle.cards.length > 0) {
      const done = offlineBundle.cards.shift();
      offlineLogs.push({ card_id: done.card_id, rating: r });
      localStorage.setItem("morphism_offline_bundle", JSON.stringify(offlineBundle));
      localStorage.setItem("morphism_offline_logs", JSON.stringify(offlineLogs));
      loadCurrent();
      return;
    }
    await fetch("/api/rate?token=" + encodeURIComponent(TOKEN), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating: r })
    });
    loadCurrent();
  }

  async function checkoutOffline() {
    const res = await fetch("/api/checkout?token=" + encodeURIComponent(TOKEN));
    const bundle = await res.json();
    offlineBundle = bundle;
    offlineLogs = [];
    localStorage.setItem("morphism_offline_bundle", JSON.stringify(offlineBundle));
    localStorage.setItem("morphism_offline_logs", "[]");
    alert("Checked out " + (bundle.cards ? bundle.cards.length : 0) + " cards to phone localStorage! You can now study offline.");
    loadCurrent();
  }

  async function checkinOffline() {
    if (!offlineLogs || offlineLogs.length === 0) {
      alert("No offline reviews pending Check-In.");
      return;
    }
    const res = await fetch("/api/checkin?token=" + encodeURIComponent(TOKEN), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ logs: offlineLogs })
    });
    const out = await res.json();
    localStorage.removeItem("morphism_offline_bundle");
    localStorage.removeItem("morphism_offline_logs");
    offlineBundle = null;
    offlineLogs = [];
    alert("Synced " + (out.synced || 0) + " offline reviews back to Desktop SQLite!");
    loadCurrent();
  }

  loadCurrent();
</script>
</body>
</html>
"""


def get_lan_ip() -> str:
    try:
        with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
            s.connect(("8.8.8.8", 80))
            return str(s.getsockname()[0])
    except Exception:
        return "127.0.0.1"


class EphemeralMobileServer:
    """
    Ephemeral LAN HTTP server that runs ONLY while MobileQRDialog is open.
    Supports Live Remote Review and Offline Check-Out / Check-In batch sync.
    """

    def __init__(
        self,
        conn: sqlite3.Connection,
        review_controller: ReviewController,
        media_vault: MediaVault,
        mathjax_js_bytes: bytes,
        event_bus: EventBus,
    ) -> None:
        self.conn = conn
        self.review_controller = review_controller
        self.media_vault = media_vault
        self.mathjax_js_bytes = mathjax_js_bytes
        self.event_bus = event_bus
        self.token = secrets.token_urlsafe(18)
        self._httpd: ThreadingHTTPServer | None = None
        self._thread: threading.Thread | None = None
        self.port: int = 0
        self._lock = threading.Lock()

    def start(self) -> str:
        if self._httpd is not None:
            return self.url

        parent = self

        class Handler(BaseHTTPRequestHandler):
            def log_message(self, format: str, *args) -> None:
                return  # Silent ephemeral server

            def _check_token(self) -> bool:
                qs = parse_qs(urlparse(self.path).query)
                tok = (qs.get("token") or [""])[0]
                return secrets.compare_digest(tok, parent.token)

            def _send_json(self, obj: dict, status: int = 200) -> None:
                body = json.dumps(obj, ensure_ascii=False).encode("utf-8")
                self.send_response(status)
                self.send_header("Content-Type", "application/json; charset=utf-8")
                self.send_header("Content-Length", str(len(body)))
                self.end_headers()
                self.wfile.write(body)

            def do_GET(self) -> None:
                parsed = urlparse(self.path)
                path = parsed.path

                if path == "/vendor/mathjax/tex-svg-full.js":
                    self.send_response(HTTPStatus.OK)
                    self.send_header("Content-Type", "text/javascript; charset=utf-8")
                    self.send_header("Content-Length", str(len(parent.mathjax_js_bytes)))
                    self.end_headers()
                    self.wfile.write(parent.mathjax_js_bytes)
                    return

                if path.startswith("/media/"):
                    fname = path.removeprefix("/media/")
                    resolved = parent.media_vault.resolve_path(fname)
                    if resolved and resolved.is_file():
                        data = resolved.read_bytes()
                        mime = parent.media_vault.get_mime_type(resolved)
                        self.send_response(HTTPStatus.OK)
                        self.send_header("Content-Type", mime)
                        self.send_header("Content-Length", str(len(data)))
                        self.end_headers()
                        self.wfile.write(data)
                    else:
                        self.send_error(HTTPStatus.NOT_FOUND)
                    return

                if not self._check_token():
                    self.send_error(HTTPStatus.FORBIDDEN, "Invalid or missing session token")
                    return

                if path in ("/", "/index.html"):
                    html_bytes = MOBILE_PWA_HTML.encode("utf-8")
                    self.send_response(HTTPStatus.OK)
                    self.send_header("Content-Type", "text/html; charset=utf-8")
                    self.send_header("Content-Length", str(len(html_bytes)))
                    self.end_headers()
                    self.wfile.write(html_bytes)
                    return

                if path == "/api/current":
                    with parent._lock:
                        if parent.review_controller.remaining_count() == 0:
                            parent.review_controller.start_auto_study()
                        ctx = parent.review_controller.current_prompt_context()
                        if ctx is None:
                            self._send_json({"has_card": False})
                            return
                        self._send_json(
                            {
                                "has_card": True,
                                "card_id": ctx.card.id,
                                "note_title": ctx.note.title,
                                "review_mode": ctx.review_mode.value,
                                "premise_html": ctx.note.premise_html,
                                "front_html": ctx.card.front_html,
                                "back_html": ctx.card.back_html,
                                "remaining": parent.review_controller.remaining_count(),
                                "siblings": [
                                    {
                                        "step_order": s.step_order,
                                        "title": s.title,
                                        "front_html": s.front_html,
                                        "back_html": s.back_html,
                                        "position": s.position,
                                    }
                                    for s in ctx.conditioning_siblings
                                ],
                            }
                        )
                    return

                if path == "/api/checkout":
                    with parent._lock:
                        if parent.review_controller.remaining_count() == 0:
                            parent.review_controller.start_auto_study()
                        cards_bundle = []
                        saved_idx = parent.review_controller._current_index
                        for i in range(saved_idx, len(parent.review_controller._queue)):
                            parent.review_controller._current_index = i
                            ctx = parent.review_controller.current_prompt_context()
                            if ctx:
                                cards_bundle.append(
                                    {
                                        "card_id": ctx.card.id,
                                        "note_title": ctx.note.title,
                                        "review_mode": ctx.review_mode.value,
                                        "premise_html": ctx.note.premise_html,
                                        "front_html": ctx.card.front_html,
                                        "back_html": ctx.card.back_html,
                                        "siblings": [
                                            {
                                                "step_order": s.step_order,
                                                "title": s.title,
                                                "front_html": s.front_html,
                                                "back_html": s.back_html,
                                                "position": s.position,
                                            }
                                            for s in ctx.conditioning_siblings
                                        ],
                                    }
                                )
                        parent.review_controller._current_index = saved_idx
                        self._send_json({"cards": cards_bundle})
                    return

                self.send_error(HTTPStatus.NOT_FOUND)

            def do_POST(self) -> None:
                if not self._check_token():
                    self.send_error(HTTPStatus.FORBIDDEN)
                    return
                parsed = urlparse(self.path)
                length = int(self.headers.get("Content-Length", "0"))
                raw = self.rfile.read(length) if length > 0 else b"{}"
                payload = json.loads(raw.decode("utf-8"))

                if parsed.path == "/api/rate":
                    rating_val = int(payload.get("rating", 3))
                    with parent._lock:
                        parent.review_controller.submit_rating(RatingEnum(rating_val))
                    self._send_json({"ok": True})
                    return

                if parsed.path == "/api/checkin":
                    logs = payload.get("logs", [])
                    synced = 0
                    with parent._lock:
                        for item in logs:
                            cid = int(item.get("card_id", 0))
                            r_val = int(item.get("rating", 3))
                            card = parent.review_controller.card_repo.get_by_id(cid)
                            if card and card.id:
                                parent.review_controller._queue = [card]
                                parent.review_controller._current_index = 0
                                parent.review_controller.submit_rating(RatingEnum(r_val))
                                synced += 1
                    parent.event_bus.courses_updated.emit()
                    self._send_json({"ok": True, "synced": synced})
                    return

                self.send_error(HTTPStatus.NOT_FOUND)

        self._httpd = ThreadingHTTPServer(("0.0.0.0", 0), Handler)
        self.port = int(self._httpd.server_address[1])
        self._thread = threading.Thread(target=self._httpd.serve_forever, daemon=True)
        self._thread.start()
        return self.url

    @property
    def url(self) -> str:
        ip = get_lan_ip()
        return f"http://{ip}:{self.port}/?token={self.token}"

    def stop(self) -> None:
        if self._httpd is not None:
            try:
                self._httpd.shutdown()
                self._httpd.server_close()
            finally:
                self._httpd = None
                self._thread = None
