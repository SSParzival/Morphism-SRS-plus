// Touch & Mobile Interactive Knowledge Graph Canvas for Morphism SRS Plus

class TouchGraphView {
    constructor(canvas, options = {}) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.options = options;

        this.notes = [];
        this.edges = [];
        this.selectedNote = null;
        this.searchQuery = "";

        // Transform state
        this.offsetX = 60;
        this.offsetY = 100;
        this.scale = 0.9;
        this.minScale = 0.25;
        this.maxScale = 3.0;

        // Interaction state
        this.draggedNode = null;
        this.isPanning = false;
        this.startPanX = 0;
        this.startPanY = 0;
        this.pointers = new Map();
        this.initialPinchDistance = null;
        this.initialScale = 1.0;
        this.dragStartTime = 0;
        this.dragStartPos = { x: 0, y: 0 };

        // Dimensions of node cards
        this.nodeWidth = 220;
        this.nodeHeight = 76;
        this.nodeRadius = 10;

        this._setupEvents();
        this.resize();
    }

    resize() {
        const dpr = window.devicePixelRatio || 1;
        const rect = this.canvas.getBoundingClientRect();
        this.dpr = dpr;
        this.cssWidth = rect.width;
        this.cssHeight = rect.height;
        this.canvas.width = Math.round(rect.width * dpr);
        this.canvas.height = Math.round(rect.height * dpr);
        this.render();
    }

    setData(notes, edges) {
        this.notes = notes || [];
        this.edges = edges || [];
        this.render();
    }

    setSearchQuery(q) {
        this.searchQuery = (q || "").trim().toLowerCase();
        this.render();
    }

    _setupEvents() {
        window.addEventListener('resize', () => this.resize());

        this.canvas.addEventListener('pointerdown', (e) => this._onPointerDown(e));
        this.canvas.addEventListener('pointermove', (e) => this._onPointerMove(e));
        this.canvas.addEventListener('pointerup', (e) => this._onPointerUp(e));
        this.canvas.addEventListener('pointercancel', (e) => this._onPointerUp(e));
        this.canvas.addEventListener('wheel', (e) => this._onWheel(e), { passive: false });
    }

    _screenToWorld(screenX, screenY) {
        return {
            x: (screenX - this.offsetX) / this.scale,
            y: (screenY - this.offsetY) / this.scale
        };
    }

    _findNodeAt(worldX, worldY) {
        for (let i = this.notes.length - 1; i >= 0; i--) {
            const n = this.notes[i];
            const nx = n.x || 0;
            const ny = n.y || 0;
            if (worldX >= nx && worldX <= nx + this.nodeWidth &&
                worldY >= ny && worldY <= ny + this.nodeHeight) {
                return n;
            }
        }
        return null;
    }

    _onPointerDown(e) {
        this.canvas.setPointerCapture(e.pointerId);
        this.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

        if (this.pointers.size === 1) {
            const rect = this.canvas.getBoundingClientRect();
            const sx = e.clientX - rect.left;
            const sy = e.clientY - rect.top;
            const world = this._screenToWorld(sx, sy);
            const clicked = this._findNodeAt(world.x, world.y);

            this.dragStartTime = Date.now();
            this.dragStartPos = { x: e.clientX, y: e.clientY };

            if (clicked) {
                this.draggedNode = clicked;
                this.nodeDragOffset = { x: world.x - (clicked.x || 0), y: world.y - (clicked.y || 0) };
            } else {
                this.isPanning = true;
                this.startPanX = e.clientX - this.offsetX;
                this.startPanY = e.clientY - this.offsetY;
            }
        } else if (this.pointers.size === 2) {
            // Pinch to zoom initiated
            this.draggedNode = null;
            this.isPanning = false;
            const pts = Array.from(this.pointers.values());
            this.initialPinchDistance = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
            this.initialScale = this.scale;
        }
    }

    _onPointerMove(e) {
        if (!this.pointers.has(e.pointerId)) return;
        this.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

        if (this.pointers.size === 1) {
            const rect = this.canvas.getBoundingClientRect();
            const sx = e.clientX - rect.left;
            const sy = e.clientY - rect.top;

            if (this.draggedNode) {
                const world = this._screenToWorld(sx, sy);
                this.draggedNode.x = Math.round(world.x - this.nodeDragOffset.x);
                this.draggedNode.y = Math.round(world.y - this.nodeDragOffset.y);
                this.render();
            } else if (this.isPanning) {
                this.offsetX = e.clientX - this.startPanX;
                this.offsetY = e.clientY - this.startPanY;
                this.render();
            }
        } else if (this.pointers.size === 2 && this.initialPinchDistance) {
            const pts = Array.from(this.pointers.values());
            const currentDist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
            const factor = currentDist / this.initialPinchDistance;
            this.scale = Math.max(this.minScale, Math.min(this.maxScale, this.initialScale * factor));
            this.render();
        }
    }

    _onPointerUp(e) {
        this.pointers.delete(e.pointerId);

        const dist = Math.hypot(e.clientX - this.dragStartPos.x, e.clientY - this.dragStartPos.y);
        const duration = Date.now() - this.dragStartTime;

        // Detect Tap
        if (dist < 8 && duration < 300) {
            const rect = this.canvas.getBoundingClientRect();
            const sx = e.clientX - rect.left;
            const sy = e.clientY - rect.top;
            const world = this._screenToWorld(sx, sy);
            const clicked = this._findNodeAt(world.x, world.y);

            this.selectedNote = clicked;
            if (this.options.onNodeSelected) {
                this.options.onNodeSelected(clicked);
            }
        }

        if (this.pointers.size === 0) {
            this.draggedNode = null;
            this.isPanning = false;
            this.initialPinchDistance = null;
            if (this.options.onNodeMoved) {
                this.options.onNodeMoved();
            }
        } else if (this.pointers.size === 1) {
            const remaining = Array.from(this.pointers.values())[0];
            this.isPanning = true;
            this.startPanX = remaining.x - this.offsetX;
            this.startPanY = remaining.y - this.offsetY;
        }

        this.render();
    }

    _onWheel(e) {
        e.preventDefault();
        const factor = e.deltaY < 0 ? 1.1 : 0.9;
        this.scale = Math.max(this.minScale, Math.min(this.maxScale, this.scale * factor));
        this.render();
    }

    zoomIn() {
        this.scale = Math.min(this.maxScale, this.scale * 1.2);
        this.render();
    }

    zoomOut() {
        this.scale = Math.max(this.minScale, this.scale * 0.8);
        this.render();
    }

    fitAll() {
        if (!this.notes || this.notes.length === 0) return;
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
        for (const n of this.notes) {
            minX = Math.min(minX, n.x || 0);
            minY = Math.min(minY, n.y || 0);
            maxX = Math.max(maxX, (n.x || 0) + this.nodeWidth);
            maxY = Math.max(maxY, (n.y || 0) + this.nodeHeight);
        }

        const rect = this.canvas.getBoundingClientRect();
        const w = rect.width;
        const h = rect.height;

        const boundsW = (maxX - minX) + 100;
        const boundsH = (maxY - minY) + 100;

        this.scale = Math.max(this.minScale, Math.min(1.2, Math.min(w / boundsW, h / boundsH)));
        this.offsetX = (w - boundsW * this.scale) / 2 - minX * this.scale + 50 * this.scale;
        this.offsetY = (h - boundsH * this.scale) / 2 - minY * this.scale + 50 * this.scale;
        this.render();
    }

    autoArrange() {
        if (!this.notes || this.notes.length === 0) return;

        const inDegree = {};
        const adj = {};
        for (const n of this.notes) {
            inDegree[n.note_id] = 0;
            adj[n.note_id] = [];
        }

        for (const e of this.edges) {
            if (adj[e.source_id] && inDegree[e.target_id] !== undefined) {
                adj[e.source_id].push(e.target_id);
                inDegree[e.target_id] += 1;
            }
        }

        const levels = {};
        const queue = [];
        for (const n of this.notes) {
            if (inDegree[n.note_id] === 0) {
                levels[n.note_id] = 0;
                queue.push(n.note_id);
            }
        }

        let visitedCount = 0;
        while (queue.length > 0) {
            const u = queue.shift();
            visitedCount++;
            for (const v of adj[u] || []) {
                levels[v] = Math.max(levels[v] || 0, (levels[u] || 0) + 1);
                inDegree[v]--;
                if (inDegree[v] === 0) {
                    queue.push(v);
                }
            }
        }

        let maxL = 0;
        for (const n of this.notes) {
            if (levels[n.note_id] === undefined) levels[n.note_id] = 0;
            maxL = Math.max(maxL, levels[n.note_id]);
        }

        const byLevel = {};
        for (const n of this.notes) {
            const l = levels[n.note_id];
            if (!byLevel[l]) byLevel[l] = [];
            byLevel[l].push(n);
        }

        const colSpacing = 280;
        const rowSpacing = 110;

        for (const lvl in byLevel) {
            const list = byLevel[lvl];
            list.forEach((n, idx) => {
                n.x = 60 + parseInt(lvl) * colSpacing;
                n.y = 80 + idx * rowSpacing;
            });
        }

        this.fitAll();
    }

    render() {
        const ctx = this.ctx;
        const dpr = this.dpr || 1;
        const w = this.cssWidth || (this.canvas.width / dpr);
        const h = this.cssHeight || (this.canvas.height / dpr);
        const appTheme = window.AppTheme || {};
        const theme = {
            canvas_bg: appTheme.canvas_bg || appTheme.bg_color || "#000000",
            grid_color: appTheme.grid_color || appTheme.border_color || "#1C1024",
            node_bg_start: appTheme.node_bg_start || appTheme.card_bg || "#171019",
            node_bg_end: appTheme.node_bg_end || appTheme.surface_bg || "#07030A",
            node_border: appTheme.node_border || "#80D6A3",
            due_border: appTheme.due_border || "#F02A8C",
            edge_color: appTheme.edge_color || "#B47AD0",
            text: appTheme.text || "#F7F1F8",
            accent: appTheme.accent || "#F02A8C"
        };

        ctx.save();
        ctx.scale(dpr, dpr); // Retina & high-DPI scaling

        ctx.fillStyle = theme.canvas_bg;
        ctx.fillRect(0, 0, w, h);

        // Draw dot grid
        ctx.fillStyle = theme.grid_color;
        const gridStep = 40 * this.scale;
        const startX = (this.offsetX % gridStep);
        const startY = (this.offsetY % gridStep);
        for (let x = startX; x < w; x += gridStep) {
            for (let y = startY; y < h; y += gridStep) {
                ctx.beginPath();
                ctx.arc(x, y, 1.5, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        ctx.translate(this.offsetX, this.offsetY);
        ctx.scale(this.scale, this.scale);

        // Map for fast position lookup
        const nodeMap = new Map();
        for (const n of this.notes) {
            nodeMap.set(n.note_id, n);
        }

        // Draw edges
        ctx.strokeStyle = theme.edge_color || "#B47AD0";
        ctx.lineWidth = 2.5;
        for (const edge of this.edges) {
            const src = nodeMap.get(edge.source_id);
            const tgt = nodeMap.get(edge.target_id);
            if (src && tgt) {
                const sx = (src.x || 0) + this.nodeWidth;
                const sy = (src.y || 0) + this.nodeHeight / 2;
                const tx = (tgt.x || 0);
                const ty = (tgt.y || 0) + this.nodeHeight / 2;

                const dx = Math.max(40, (tx - sx) / 2);

                ctx.beginPath();
                ctx.moveTo(sx, sy);
                ctx.bezierCurveTo(sx + dx, sy, tx - dx, ty, tx, ty);
                ctx.stroke();

                // Arrow head
                const arrowSize = 8;
                ctx.fillStyle = theme.accent || "#F02A8C";
                ctx.beginPath();
                ctx.moveTo(tx, ty);
                ctx.lineTo(tx - arrowSize * 1.5, ty - arrowSize);
                ctx.lineTo(tx - arrowSize * 1.5, ty + arrowSize);
                ctx.closePath();
                ctx.fill();
            }
        }

        // Draw notes
        for (const note of this.notes) {
            const nx = note.x || 0;
            const ny = note.y || 0;
            const isSelected = this.selectedNote && this.selectedNote.note_id === note.note_id;
            const isDue = note.isDue;
            const matchesSearch = this.searchQuery && (
                note.title.toLowerCase().includes(this.searchQuery) ||
                (note.tags && note.tags.some(t => t.toLowerCase().includes(this.searchQuery)))
            );

            const mode = this._getNoteMode(note);

            // Search highlight glow
            if (matchesSearch) {
                ctx.save();
                ctx.shadowColor = theme.accent || "#F02A8C";
                ctx.shadowBlur = 20;
                ctx.fillStyle = theme.accent || "#F02A8C";
                this._drawNodeShape(ctx, nx, ny, this.nodeWidth, this.nodeHeight, mode, 3);
                ctx.fill();
                ctx.restore();
            }

            // Node gradient
            const grad = ctx.createLinearGradient(nx, ny, nx, ny + this.nodeHeight);
            grad.addColorStop(0, isDue ? "#2d0b16" : (theme.node_bg_start || "#171019"));
            grad.addColorStop(1, isDue ? "#16050b" : (theme.node_bg_end || "#07030A"));

            ctx.fillStyle = grad;
            this._drawNodeShape(ctx, nx, ny, this.nodeWidth, this.nodeHeight, mode, 0);
            ctx.fill();

            // Border
            ctx.lineWidth = isSelected ? 3.5 : 2;
            ctx.strokeStyle = isSelected ? (theme.accent || "#F02A8C") : (isDue ? (theme.due_border || "#FF667D") : (theme.node_border || "#80D6A3"));
            if (isSelected) {
                ctx.setLineDash([6, 4]);
            } else {
                ctx.setLineDash([]);
            }
            ctx.stroke();
            ctx.setLineDash([]);

            // Note Title (Support 2-line wrapping & robust truncation)
            ctx.fillStyle = theme.text || "#F7F1F8";
            ctx.font = "bold 13px -apple-system, Roboto, sans-serif";
            const title = note.title || "Untitled";
            const isMultiline = this._drawNodeTitle(ctx, title, nx + 14, ny + 12, this.nodeWidth - 28, isDue);

            // Subtitle / cards info
            const cardCount = note.cards ? note.cards.length : 0;
            const typeLabel = mode === "serial" ? "⚡ Serial Seq" : (mode === "cloze" ? "✂️ Cloze" : "🧩 Standard");
            ctx.fillStyle = isDue ? "#FF8B9D" : "#94a3b8";
            ctx.font = "11px -apple-system, Roboto, sans-serif";
            const subY = isMultiline ? (ny + 58) : (ny + 46);
            ctx.fillText(`${typeLabel} • ${cardCount} card(s)`, nx + 14, subY);

            // Due Badge
            if (isDue) {
                ctx.fillStyle = theme.accent || "#F02A8C";
                this._drawRoundRect(ctx, nx + this.nodeWidth - 46, ny + 10, 36, 18, 4);
                ctx.fill();
                ctx.fillStyle = "#ffffff";
                ctx.font = "bold 10px sans-serif";
                ctx.fillText("DUE", nx + this.nodeWidth - 38, ny + 23);
            }
        }

        ctx.restore();
    }

    _drawNodeTitle(ctx, title, x, y, maxWidth, isDue) {
        ctx.save();
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        const line1Max = isDue ? (maxWidth - 36) : maxWidth;

        // If title fits entirely on single line
        if (ctx.measureText(title).width <= line1Max) {
            ctx.fillText(title, x, y + 6);
            ctx.restore();
            return false;
        }

        // Try two-line wrap
        const words = title.split(/\s+/);
        let line1 = "";
        let line2 = "";
        let idx = 0;

        while (idx < words.length) {
            const candidate = line1 ? (line1 + " " + words[idx]) : words[idx];
            if (ctx.measureText(candidate).width <= line1Max) {
                line1 = candidate;
                idx++;
            } else {
                break;
            }
        }

        if (!line1 && words.length > 0) {
            line1 = words[0];
            idx = 1;
        }

        line2 = words.slice(idx).join(" ");

        // Draw line 1 (truncated if single word was huge)
        this._drawTruncatedTextTop(ctx, line1, x, y + 2, line1Max);

        // Draw line 2 if remaining words exist
        if (line2) {
            this._drawTruncatedTextTop(ctx, line2, x, y + 19, maxWidth);
            ctx.restore();
            return true;
        }

        ctx.restore();
        return false;
    }

    _getNoteMode(note) {
        if (note.review_mode) return note.review_mode;
        if (note.note_type === "serial_sequence" || note.note_type === "serial") return "serial";
        if (note.note_type === "cloze") return "cloze";
        if (note.cards && note.cards.length > 0) {
            if (note.cards.some(c => c.type === "ProofSequenceCard")) return "serial";
            if (note.cards.some(c => c.type === "ClozeCard")) return "cloze";
        }
        return "standard";
    }

    _drawNodeShape(ctx, x, y, w, h, mode, pad = 0) {
        const px = x - pad;
        const py = y - pad;
        const pw = w + pad * 2;
        const ph = h + pad * 2;

        ctx.beginPath();
        if (mode === "cloze") {
            // Pill / Ellipse shape matching Proto 2 Cloze Note
            this._drawRoundRect(ctx, px, py, pw, ph, ph / 2);
        } else if (mode === "serial") {
            // Diamond-beveled hexagon shape matching Proto 2 Serial Proof Sequence
            const bevel = 18;
            ctx.moveTo(px + bevel, py);
            ctx.lineTo(px + pw - bevel, py);
            ctx.lineTo(px + pw, py + ph / 2);
            ctx.lineTo(px + pw - bevel, py + ph);
            ctx.lineTo(px + bevel, py + ph);
            ctx.lineTo(px, py + ph / 2);
            ctx.closePath();
        } else {
            // Standard rounded rectangle matching Proto 2 Standard Note
            this._drawRoundRect(ctx, px, py, pw, ph, this.nodeRadius + (pad > 0 ? 2 : 0));
        }
    }

    _drawRoundRect(ctx, x, y, width, height, radius) {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
    }

    _drawTruncatedTextTop(ctx, text, x, y, maxWidth) {
        let str = text;
        if (ctx.measureText(str).width > maxWidth) {
            while (str.length > 0 && ctx.measureText(str + '...').width > maxWidth) {
                str = str.slice(0, -1);
            }
            str += '...';
        }
        ctx.fillText(str, x, y);
    }

    _drawTruncatedText(ctx, text, x, y, maxWidth) {
        let str = text;
        if (ctx.measureText(str).width > maxWidth) {
            while (str.length > 0 && ctx.measureText(str + '...').width > maxWidth) {
                str = str.slice(0, -1);
            }
            str += '...';
        }
        ctx.fillText(str, x, y);
    }
}
