// Morphism SRS Plus Mobile Application Controller
// Optimized for Android touch screens & tablets

const THEMES = {
    bisexual_midnight: {
        name: "Bisexual Midnight 💖💜💙",
        bg_color: "#000000",
        surface_bg: "#0B0710",
        card_bg: "#171019",
        border_color: "#3D2148",
        accent: "#F02A8C",
        accent_hover: "#FF70B7",
        edge_color: "#B47AD0",
        text: "#F7F1F8",
        text_muted: "#806F86",
        node_border: "#80D6A3",
        due_border: "#FF667D",
        good_btn: "#1C3C28",
        good_border: "#80D6A3",
        good_text: "#A5E6BC"
    },
    catppuccin_mocha: {
        name: "Catppuccin Mocha ☕",
        bg_color: "#1e1e2e",
        surface_bg: "#181825",
        card_bg: "#313244",
        border_color: "#45475a",
        accent: "#cba6f7",
        accent_hover: "#f5c2e7",
        edge_color: "#89b4fa",
        text: "#cdd6f4",
        text_muted: "#a6adc8",
        node_border: "#a6e3a1",
        due_border: "#f38ba8",
        good_btn: "#1e3a2f",
        good_border: "#a6e3a1",
        good_text: "#a6e3a1"
    },
    nord: {
        name: "Nord ❄️",
        bg_color: "#2e3440",
        surface_bg: "#3b4252",
        card_bg: "#434c5e",
        border_color: "#4c566a",
        accent: "#88c0d0",
        accent_hover: "#81a1c1",
        edge_color: "#b48ead",
        text: "#eceff4",
        text_muted: "#d8dee9",
        node_border: "#a3be8c",
        due_border: "#bf616a",
        good_btn: "#2c3e35",
        good_border: "#a3be8c",
        good_text: "#a3be8c"
    },
    dracula: {
        name: "Dracula 🧛",
        bg_color: "#282a36",
        surface_bg: "#21222c",
        card_bg: "#44475a",
        border_color: "#6272a4",
        accent: "#bd93f9",
        accent_hover: "#ff79c6",
        edge_color: "#8be9fd",
        text: "#f8f8f2",
        text_muted: "#6272a4",
        node_border: "#50fa7b",
        due_border: "#ff5555",
        good_btn: "#1f3a2b",
        good_border: "#50fa7b",
        good_text: "#50fa7b"
    },
    dark_modern: {
        name: "Dark Modern 🌌",
        bg_color: "#0b0f19",
        surface_bg: "#111827",
        card_bg: "#1f2937",
        border_color: "#374151",
        accent: "#6366f1",
        accent_hover: "#818cf8",
        edge_color: "#38bdf8",
        text: "#f9fafb",
        text_muted: "#9ca3af",
        node_border: "#10b981",
        due_border: "#ef4444",
        good_btn: "#064e3b",
        good_border: "#10b981",
        good_text: "#10b981"
    },
    github_light: {
        name: "GitHub Light ☀️",
        bg_color: "#ffffff",
        surface_bg: "#f6f8fa",
        card_bg: "#ffffff",
        border_color: "#d0d7de",
        accent: "#0969da",
        accent_hover: "#218bff",
        edge_color: "#8250df",
        text: "#1f2328",
        text_muted: "#656d76",
        node_border: "#1a7f37",
        due_border: "#cf222e",
        good_btn: "#dafbe1",
        good_border: "#1a7f37",
        good_text: "#1a7f37"
    }
};

const SEED_COURSES = [
    {
        name: "Linear Algebra & Dual Spaces",
        notes: [
            {
                note_id: "101",
                title: "Vector Spaces & Axioms",
                x: 60,
                y: 100,
                note_type: "standard",
                desired_retention: 0.85,
                tags: ["algebra", "foundations"],
                cards: [
                    {
                        item_id: "1001",
                        type: "Flashcard",
                        title: "Vector Space Axiom: Distributivity",
                        front: "Let $V$ be a vector space over $\\mathbb{R}$. State the distributivity of scalar multiplication over vector addition.",
                        back: "$$a(u + v) = au + av \\quad \\forall a \\in \\mathbb{R}, \\; \\forall u, v \\in V$$"
                    },
                    {
                        item_id: "1002",
                        type: "ClozeCard",
                        title: "Definition of Subspace",
                        text: "A subset $W \\subseteq V$ is a subspace if it contains {{c1::the zero vector $0 \\in W$::zero condition}} and is closed under {{c2::addition and scalar multiplication::closure condition}}."
                    }
                ]
            },
            {
                note_id: "102",
                title: "Linear Transformations & Kernels",
                x: 360,
                y: 80,
                note_type: "standard",
                desired_retention: 0.85,
                tags: ["transformations"],
                cards: [
                    {
                        item_id: "1003",
                        type: "Flashcard",
                        title: "Kernel Definition",
                        front: "What is the Kernel (null space) of a linear map $T: V \\to W$?",
                        back: "$$\\ker(T) = \\{v \\in V \\mid T(v) = 0_W\\}$$"
                    },
                    {
                        item_id: "1004",
                        type: "ClozeCard",
                        title: "Rank-Nullity Theorem",
                        text: "For a finite-dimensional vector space $V$, the Rank-Nullity theorem states: {{c1::$\\dim(\\ker T) + \\dim(\\mathrm{im} \\; T) = \\dim V$::Fundamental Dimension Formula}}."
                    }
                ]
            },
            {
                note_id: "103",
                title: "Dual Space $V^*$ & Annihilators",
                x: 660,
                y: 120,
                note_type: "serial_sequence",
                desired_retention: 0.85,
                tags: ["duality"],
                cards: [
                    {
                        item_id: "1005",
                        type: "ProofSequenceCard",
                        title: "Dual Space Definition",
                        premise: "Define the algebraic dual space $V^*$.",
                        steps: [
                            "$V^* = \\mathrm{Hom}(V, \\mathbb{R})$, the set of all linear functionals $f: V \\to \\mathbb{R}$.",
                            "If $\\dim V = n < \\infty$, then $\\dim V^* = n$.",
                            "Dual basis $f_1, \\dots, f_n$ satisfies $f_i(v_j) = \\delta_{ij}$ (Kronecker delta)."
                        ]
                    }
                ]
            }
        ],
        edges: [
            { source_id: "101", target_id: "102", label: "Prerequisite" },
            { source_id: "102", target_id: "103", label: "Prerequisite" }
        ]
    },
    {
        name: "Metric Spaces & Compactness",
        notes: [
            {
                note_id: "201",
                title: "Metric Space Axioms",
                x: 80,
                y: 120,
                note_type: "standard",
                desired_retention: 0.90,
                tags: ["topology"],
                cards: [
                    {
                        item_id: "2001",
                        type: "ClozeCard",
                        title: "Triangle Inequality",
                        text: "In a metric space $(X, d)$, the triangle inequality states that {{c1::$d(x, z) \\le d(x, y) + d(y, z)$::inequality}} for all $x, y, z \\in X$."
                    }
                ]
            },
            {
                note_id: "202",
                title: "Compactness & Heine-Borel",
                x: 380,
                y: 120,
                note_type: "standard",
                desired_retention: 0.90,
                tags: ["compactness"],
                cards: [
                    {
                        item_id: "2002",
                        type: "Flashcard",
                        title: "Open Cover Definition of Compactness",
                        front: "Define what it means for a metric space $(X, d)$ to be compact.",
                        back: "A metric space $X$ is compact if every open cover $\\mathcal{U} = \\{U_\\alpha\\}$ of $X$ contains a finite subcover: $$X = \\bigcup_{i=1}^k U_{\\alpha_i}$$"
                    }
                ]
            }
        ],
        edges: [
            { source_id: "201", target_id: "202", label: "Prerequisite" }
        ]
    }
];

class MorphismApp {
    constructor() {
        this.scheduler = new FSRSScheduler(0.85);
        this.courses = [];
        this.currentCourse = null;
        this.activeThemeId = "bisexual_midnight";

        // Review state
        this.reviewQueue = [];
        this.totalInSession = 0;
        this.currentReviewCard = null;
        this.currentReviewNote = null;
        this.isShowingBack = false;
        this.selectedGraphNote = null;
        this.serialPastSteps = [];
        this.reviewUndoStack = [];
        this.sessionStats = { count: 0, ratings: { 1: 0, 2: 0, 3: 0, 4: 0 }, start: null };

        this._loadStorage();
        this._initUI();
    }

    _loadStorage() {
        // Theme
        const savedTheme = localStorage.getItem("morphism_theme");
        if (savedTheme && THEMES[savedTheme]) {
            this.activeThemeId = savedTheme;
        }

        // Courses
        const savedCourses = localStorage.getItem("morphism_courses");
        if (savedCourses) {
            try {
                this.courses = JSON.parse(savedCourses);
            } catch (e) {
                this.courses = JSON.parse(JSON.stringify(SEED_COURSES));
            }
        } else {
            this.courses = JSON.parse(JSON.stringify(SEED_COURSES));
        }

        const activeName = localStorage.getItem("morphism_active_course");
        this.currentCourse = this.courses.find(c => c.name === activeName) || this.courses[0];
    }

    _saveStorage() {
        localStorage.setItem("morphism_theme", this.activeThemeId);
        localStorage.setItem("morphism_courses", JSON.stringify(this.courses));
        if (this.currentCourse) {
            localStorage.setItem("morphism_active_course", this.currentCourse.name);
        }
    }

    _initUI() {
        this._applyTheme(this.activeThemeId);

        // Canvas Graph View
        const canvas = document.getElementById('graph-canvas');
        this.graphView = new TouchGraphView(canvas, {
            onNodeSelected: (note) => this._onGraphNodeClicked(note),
            onNodeMoved: () => this._saveStorage()
        });

        this._updateCourseData();

        // Setup Tab Navigation
        document.querySelectorAll('.nav-tab').forEach(btn => {
            btn.addEventListener('click', () => {
                const tab = btn.dataset.tab;
                this.switchTab(tab);
            });
        });

        // Header controls
        document.getElementById('lbl-active-course').addEventListener('click', () => {
            this.switchTab('courses');
        });
        document.getElementById('btn-open-guide').addEventListener('click', () => {
            document.getElementById('modal-guide').classList.add('open');
        });
        document.getElementById('btn-theme-selector').addEventListener('click', () => {
            this._showThemeDialog();
        });

        // Review Action Buttons
        document.getElementById('btn-show-answer').addEventListener('click', () => this.showAnswer());
        document.getElementById('btn-undo').addEventListener('click', () => this.undoRating());

        document.getElementById('btn-again').addEventListener('click', () => this.rateCurrentCard(Rating.Again));
        document.getElementById('btn-hard').addEventListener('click', () => this.rateCurrentCard(Rating.Hard));
        document.getElementById('btn-good').addEventListener('click', () => this.rateCurrentCard(Rating.Good));
        document.getElementById('btn-easy').addEventListener('click', () => this.rateCurrentCard(Rating.Easy));

        // Graph controls
        document.getElementById('txt-graph-search').addEventListener('input', (e) => {
            this.graphView.setSearchQuery(e.target.value);
        });
        document.getElementById('btn-fit-graph').addEventListener('click', () => this.graphView.fitAll());
        document.getElementById('btn-auto-layout').addEventListener('click', () => this.graphView.autoArrange());
        document.getElementById('btn-review-due').addEventListener('click', () => this.startDueReview());
        document.getElementById('btn-add-note').addEventListener('click', () => this._openAddNoteModal());

        // Add Note confirmation
        document.getElementById('btn-confirm-add-note').addEventListener('click', () => this._saveNewNoteFromModal());

        // Note details modal buttons
        document.getElementById('btn-delete-node').addEventListener('click', () => this._deleteSelectedNode());
        document.getElementById('btn-add-card-to-node').addEventListener('click', () => this._addCardToSelectedNode());

        // Courses page actions
        document.getElementById('btn-new-course').addEventListener('click', () => this._promptNewCourse());
        document.getElementById('btn-reset-demo-courses').addEventListener('click', () => this._resetDemoCourses());

        // File import
        const fileInput = document.getElementById('file-import-course');
        fileInput.addEventListener('change', (e) => this._handleFileImport(e));

        // Scratchbook
        this._setupScratchbook();

        // Render stats initially
        this._updateStatsView();
    }

    _applyTheme(themeId) {
        this.activeThemeId = themeId;
        const theme = THEMES[themeId] || THEMES.bisexual_midnight;
        window.AppTheme = theme;

        const root = document.documentElement;
        root.style.setProperty('--bg-color', theme.bg_color);
        root.style.setProperty('--surface-bg', theme.surface_bg);
        root.style.setProperty('--card-bg', theme.card_bg);
        root.style.setProperty('--border-color', theme.border_color);
        root.style.setProperty('--accent', theme.accent);
        root.style.setProperty('--accent-hover', theme.accent_hover);
        root.style.setProperty('--text-color', theme.text);
        root.style.setProperty('--text-muted', theme.text_muted);

        if (this.graphView) {
            this.graphView.render();
        }
    }

    _showThemeDialog() {
        const dialog = document.getElementById('modal-theme');
        const list = document.getElementById('theme-options-list');
        list.innerHTML = "";

        for (const [id, t] of Object.entries(THEMES)) {
            const item = document.createElement('div');
            item.className = `theme-option ${id === this.activeThemeId ? 'active' : ''}`;
            item.style.cursor = "pointer";
            item.innerHTML = `<span>${t.name}</span> <span style="display:inline-block; width:18px; height:18px; border-radius:50%; background:${t.accent};"></span>`;
            item.onclick = () => {
                this._applyTheme(id);
                this._saveStorage();
                dialog.classList.remove('open');
            };
            list.appendChild(item);
        }
        dialog.classList.add('open');
    }

    switchTab(tabId) {
        document.querySelectorAll('.nav-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tabId));
        document.querySelectorAll('.view-page').forEach(p => p.classList.toggle('active', p.id === `view-${tabId}`));

        if (tabId === 'graph') {
            setTimeout(() => {
                this.graphView.resize();
            }, 50);
        } else if (tabId === 'stats') {
            this._updateStatsView();
        } else if (tabId === 'courses') {
            this._updateCoursesList();
        }
    }

    _updateCourseData() {
        if (!this.currentCourse) return;

        // Compute isDue for notes
        const now = new Date();
        let totalDue = 0;

        for (const note of this.currentCourse.notes) {
            let noteDue = false;
            for (const c of (note.cards || [])) {
                const fsrsCard = new FSRSCard(c.fsrs || {});
                if (!fsrsCard.last_review || fsrsCard.due <= now) {
                    noteDue = true;
                    totalDue++;
                }
            }
            note.isDue = noteDue;
        }

        document.getElementById('lbl-active-course').textContent = this.currentCourse.name;
        document.getElementById('badge-due-count').textContent = totalDue;
        const fabDue = document.getElementById('fab-due-count');
        if (fabDue) fabDue.textContent = totalDue;

        this.graphView.setData(this.currentCourse.notes, this.currentCourse.edges);
    }

    _onGraphNodeClicked(note) {
        if (!note) return;
        this.selectedGraphNote = note;
        const modal = document.getElementById('modal-node-details');
        document.getElementById('modal-node-title').textContent = note.title;

        // Calculate joint retention P(∩ A_i)
        let productR = 1.0;
        const now = new Date();
        for (const c of (note.cards || [])) {
            const fc = new FSRSCard(c.fsrs || {});
            productR *= this.scheduler.getCardRetrievability(fc, now);
        }
        const pctR = Math.round(productR * 100);

        document.getElementById('modal-node-info').innerHTML = `
            <div><b>Tipo:</b> ${note.note_type === 'serial_sequence' ? '📜 Secuencia Serial' : '🧩 Concepto Estándar'}</div>
            <div><b>Tarjetas:</b> ${note.cards ? note.cards.length : 0}</div>
            <div><b>Retención Conjunta P(∩ A_i):</b> <span style="color:var(--accent); font-weight:bold;">${pctR}%</span></div>
            <div><b>Estado:</b> ${note.isDue ? '<span style="color:#FF667D; font-weight:bold;">Pendiente de repaso (DUE)</span>' : '<span style="color:#80D6A3; font-weight:bold;">Al día</span>'}</div>
        `;

        // Render card previews
        const previewBox = document.getElementById('modal-node-cards-preview');
        previewBox.innerHTML = "";
        (note.cards || []).forEach((c, idx) => {
            const p = document.createElement('div');
            p.style.cssText = "background:rgba(255,255,255,0.04); border-left:3px solid var(--accent); padding:6px 10px; margin-bottom:6px; border-radius:4px; font-size:12px;";
            const typeIcon = c.type === 'ClozeCard' ? '🧩' : (c.type === 'ProofSequenceCard' ? '📜' : '📄');
            p.innerHTML = `<b>#${idx+1} ${typeIcon} ${c.title || 'Tarjeta'}</b>: ${(c.front || c.text || c.premise || '').substring(0, 50)}...`;
            previewBox.appendChild(p);
        });

        document.getElementById('btn-review-this-node').onclick = () => {
            modal.classList.remove('open');
            this.startNoteReview(note);
        };

        modal.classList.add('open');
    }

    _deleteSelectedNode() {
        if (!this.selectedGraphNote || !this.currentCourse) return;
        if (!confirm(`¿Eliminar la nota '${this.selectedGraphNote.title}' y sus conexiones?`)) return;

        const nid = this.selectedGraphNote.note_id;
        this.currentCourse.notes = this.currentCourse.notes.filter(n => n.note_id !== nid);
        this.currentCourse.edges = this.currentCourse.edges.filter(e => e.source_id !== nid && e.target_id !== nid);
        this._saveStorage();
        this._updateCourseData();
        document.getElementById('modal-node-details').classList.remove('open');
    }

    _addCardToSelectedNode() {
        if (!this.selectedGraphNote) return;
        const front = prompt("Pregunta o texto de la nueva tarjeta (puedes usar cloze {{c1::respuesta::pista}}):");
        if (!front) return;
        const back = prompt("Respuesta / Solución:");
        const isCloze = front.includes("{{") && front.includes("}}");
        const newCard = {
            item_id: String(Date.now()),
            type: isCloze ? "ClozeCard" : "Flashcard",
            title: isCloze ? `Definición ${(this.selectedGraphNote.cards || []).length + 1}` : `Tarjeta ${(this.selectedGraphNote.cards || []).length + 1}`,
            front: front,
            text: front,
            back: back || ""
        };
        if (!this.selectedGraphNote.cards) this.selectedGraphNote.cards = [];
        this.selectedGraphNote.cards.push(newCard);
        this._saveStorage();
        this._updateCourseData();
        this._onGraphNodeClicked(this.selectedGraphNote);
    }

    startDueReview() {
        const queue = [];
        const now = new Date();
        for (const note of this.currentCourse.notes) {
            for (const card of (note.cards || [])) {
                const fc = new FSRSCard(card.fsrs || {});
                if (!fc.last_review || fc.due <= now) {
                    queue.push({ card, note });
                }
            }
        }

        if (queue.length === 0) {
            alert("🎉 ¡No hay tarjetas pendientes de repaso en este curso!");
            return;
        }

        this.reviewQueue = queue;
        this.totalInSession = queue.length;
        this.sessionStats = { count: 0, ratings: { 1: 0, 2: 0, 3: 0, 4: 0 }, start: new Date() };
        this.reviewUndoStack = [];
        this.switchTab('review');
        this._loadNextCard();
    }

    startNoteReview(note) {
        const queue = (note.cards || []).map(c => ({ card: c, note: note }));
        if (queue.length === 0) {
            alert("Esta nota no contiene tarjetas para repasar.");
            return;
        }
        this.reviewQueue = queue;
        this.totalInSession = queue.length;
        this.sessionStats = { count: 0, ratings: { 1: 0, 2: 0, 3: 0, 4: 0 }, start: new Date() };
        this.reviewUndoStack = [];
        this.switchTab('review');
        this._loadNextCard();
    }

    _loadNextCard() {
        if (!this.reviewQueue || this.reviewQueue.length === 0) {
            this._showSessionComplete();
            return;
        }

        const item = this.reviewQueue[0];
        this.currentReviewCard = item.card;
        this.currentReviewNote = item.note;
        this.isShowingBack = false;

        document.getElementById('review-empty-state').style.display = 'none';
        document.getElementById('review-card-container').style.display = 'block';
        document.getElementById('review-bottom-controls').style.display = 'flex';
        document.getElementById('btn-show-answer').style.display = 'flex';
        document.getElementById('rating-buttons-row').style.display = 'none';

        document.getElementById('btn-undo').disabled = this.reviewUndoStack.length === 0;

        // Progress bar
        const reviewedSoFar = this.sessionStats.count;
        const total = Math.max(1, this.totalInSession);
        const pct = Math.min(100, Math.round((reviewedSoFar / total) * 100));
        document.getElementById('review-progress-fill').style.width = `${pct}%`;

        // Header info & Type Chip
        document.getElementById('review-card-note-title').textContent = `${this.currentReviewNote.title}`;
        const typeChip = document.getElementById('review-card-type-chip');
        if (this.currentReviewCard.type === 'ClozeCard') {
            typeChip.textContent = "🧩 Cloze";
        } else if (this.currentReviewCard.type === 'ProofSequenceCard') {
            typeChip.textContent = "📜 Demostración";
        } else {
            typeChip.textContent = "📄 Flashcard";
        }

        // Front HTML
        this._renderCardFront();
    }

    _renderCardFront() {
        const card = this.currentReviewCard;
        const frontContainer = document.getElementById('review-front-content');
        const backContainer = document.getElementById('review-back-content');
        backContainer.innerHTML = "";
        backContainer.style.display = 'none';

        if (card.type === 'ClozeCard') {
            const raw = card.text || "";
            const frontHtml = raw.replace(/\{\{c\d+::(.*?)\}\}/gs, (match, p1) => {
                const parts = p1.split("::", 1);
                const hint = parts.length > 1 ? parts[1].trim() : "...";
                return `<span class="cloze-bracket" onclick="window.app.showAnswer()">[${hint}]</span>`;
            });
            frontContainer.innerHTML = `<div class="card-title">${card.title}</div><div class="card-body">${frontHtml}</div>`;
        } else if (card.type === 'ProofSequenceCard') {
            frontContainer.innerHTML = `<div class="card-title">${card.title}</div><div class="card-body"><strong>Premisa / Teorema a demostrar:</strong><br>${card.premise}</div>`;
        } else {
            frontContainer.innerHTML = `<div class="card-title">${card.title || 'Pregunta'}</div><div class="card-body">${card.front || ''}</div>`;
        }

        this._typesetMath();
    }

    showAnswer() {
        if (!this.currentReviewCard || this.isShowingBack) return;
        this.isShowingBack = true;

        const card = this.currentReviewCard;
        const backContainer = document.getElementById('review-back-content');
        backContainer.style.display = 'block';

        if (card.type === 'ClozeCard') {
            const raw = card.text || "";
            const backHtml = raw.replace(/\{\{c\d+::(.*?)\}\}/gs, (match, p1) => {
                const answer = p1.split("::", 1)[0];
                return `<span class="cloze-revealed">${answer}</span>`;
            });
            backContainer.innerHTML = `<hr class="divider"><div class="card-body">${backHtml}</div>`;
        } else if (card.type === 'ProofSequenceCard') {
            const steps = (card.steps || []).map((s, idx) => `<li class="proof-step"><b>Paso ${idx+1}:</b> ${s}</li>`).join("");
            backContainer.innerHTML = `<hr class="divider"><div class="card-body"><strong>Demostración Completa:</strong><ol class="proof-list" style="padding-left:18px; margin-top:8px;">${steps}</ol></div>`;
        } else {
            backContainer.innerHTML = `<hr class="divider"><div class="card-body">${card.back || ''}</div>`;
        }

        // Show rating buttons with forecasts
        const fc = new FSRSCard(card.fsrs || {});
        const forecasts = this.scheduler.getIntervalForecasts(fc);

        document.getElementById('btn-show-answer').style.display = 'none';
        document.getElementById('rating-buttons-row').style.display = 'grid';

        document.getElementById('forecast-again').textContent = forecasts[Rating.Again];
        document.getElementById('forecast-hard').textContent = forecasts[Rating.Hard];
        document.getElementById('forecast-good').textContent = forecasts[Rating.Good];
        document.getElementById('forecast-easy').textContent = forecasts[Rating.Easy];

        this._typesetMath();
    }

    rateCurrentCard(rating) {
        if (!this.currentReviewCard) return;

        const card = this.currentReviewCard;
        const preFsrs = JSON.parse(JSON.stringify(card.fsrs || {}));

        // Push undo snapshot
        this.reviewUndoStack.push({
            card: card,
            preFsrs: preFsrs,
            queueItem: this.reviewQueue[0]
        });

        const currentFSRSCard = new FSRSCard(card.fsrs || {});
        const updatedFSRSCard = this.scheduler.reviewCard(currentFSRSCard, rating);
        card.fsrs = updatedFSRSCard.toDict();

        // Update session stats
        this.sessionStats.count++;
        this.sessionStats.ratings[rating]++;

        this._saveStorage();
        this._updateCourseData();

        // Remove from queue
        this.reviewQueue.shift();
        this._loadNextCard();
    }

    undoRating() {
        if (!this.reviewUndoStack || this.reviewUndoStack.length === 0) return;

        const last = this.reviewUndoStack.pop();
        last.card.fsrs = last.preFsrs;
        this.reviewQueue.unshift(last.queueItem);

        this.sessionStats.count = Math.max(0, this.sessionStats.count - 1);
        this._saveStorage();
        this._updateCourseData();

        this._loadNextCard();
    }

    _showSessionComplete() {
        document.getElementById('review-card-container').style.display = 'none';
        document.getElementById('review-bottom-controls').style.display = 'none';
        const empty = document.getElementById('review-empty-state');
        empty.style.display = 'block';

        const mins = this.sessionStats.start ? Math.max(1, Math.round((new Date() - this.sessionStats.start) / 60000)) : 1;
        empty.innerHTML = `
            <div style="font-size:42px; margin-bottom:12px;">🎉</div>
            <div style="font-size:22px; font-weight:bold; color:var(--accent); margin-bottom:8px;">¡Sesión Completada!</div>
            <div style="color:var(--text-color); margin-bottom:16px;">Has repasado <b>${this.sessionStats.count} tarjetas</b> en ~<b>${mins} min</b>.</div>
            <div style="display:flex; justify-content:center; gap:12px; margin-bottom:20px; font-weight:bold;">
                <span style="color:#FF667D;">Again: ${this.sessionStats.ratings[1]}</span>
                <span style="color:#F7C873;">Hard: ${this.sessionStats.ratings[2]}</span>
                <span style="color:#80D6A3;">Good: ${this.sessionStats.ratings[3]}</span>
                <span style="color:#78A9FF;">Easy: ${this.sessionStats.ratings[4]}</span>
            </div>
            <div style="font-style:italic; font-size:13px; color:var(--text-muted); margin-bottom:24px; padding:0 20px;">
                "Mathematics is not about numbers, equations, computations, or algorithms: it is about understanding." — William Paul Thurston
            </div>
            <button class="btn-primary" onclick="window.app.switchTab('graph')">🗺️ Volver al Explorador</button>
        `;
    }

    _typesetMath() {
        if (window.MathJax && window.MathJax.typesetPromise) {
            window.MathJax.typesetPromise().catch(err => console.log(err));
        }
    }

    _setupScratchbook() {
        const txt = document.getElementById('scratch-editor');
        const prev = document.getElementById('scratch-preview');
        const count = document.getElementById('scratch-counter');
        const btnClear = document.getElementById('btn-clear-scratch');

        txt.value = localStorage.getItem("morphism_scratch") || "\\textbf{Apuntes rápidos / Teorema:}\n\nSea $f: X \\to Y$ continua y $X$ compacto. Entonces $f(X)$ es compacto.";

        const update = () => {
            const val = txt.value;
            localStorage.setItem("morphism_scratch", val);
            prev.innerHTML = val.replace(/\n/g, '<br>');
            count.textContent = `${val.length} car.`;
            this._typesetMath();
        };

        txt.addEventListener('input', update);
        if (btnClear) {
            btnClear.onclick = () => {
                if (confirm("¿Limpiar el borrador?")) {
                    txt.value = "";
                    update();
                }
            };
        }
        update();
    }

    insertMath(snippet) {
        const txt = document.getElementById('scratch-editor');
        if (!txt) return;
        const start = txt.selectionStart;
        const end = txt.selectionEnd;
        txt.value = txt.value.substring(0, start) + snippet + txt.value.substring(end);
        txt.selectionStart = txt.selectionEnd = start + snippet.length;
        txt.focus();
        txt.dispatchEvent(new Event('input'));
    }

    _updateStatsView() {
        if (!this.currentCourse) return;

        let totalCards = 0;
        let dueCards = 0;
        const now = new Date();

        for (const note of this.currentCourse.notes) {
            for (const c of (note.cards || [])) {
                totalCards++;
                const fc = new FSRSCard(c.fsrs || {});
                if (!fc.last_review || fc.due <= now) {
                    dueCards++;
                }
            }
        }

        document.getElementById('stat-total-cards').textContent = totalCards;
        document.getElementById('stat-due-cards').textContent = dueCards;
        document.getElementById('stat-notes-count').textContent = this.currentCourse.notes.length;
        document.getElementById('stat-retention').textContent = `${Math.round(this.scheduler.desiredRetention * 100)}%`;

        // Render Activity Grid
        const grid = document.getElementById('stats-heatmap-grid');
        grid.innerHTML = "";
        for (let i = 0; i < 70; i++) {
            const cell = document.createElement('div');
            cell.style.cssText = "aspect-ratio:1; background:var(--surface-bg); border-radius:3px;";
            const rnd = Math.random();
            if (rnd > 0.8) {
                cell.style.background = 'var(--accent)';
                cell.style.opacity = '1';
            } else if (rnd > 0.5) {
                cell.style.background = 'var(--border-color)';
                cell.style.opacity = '0.7';
            } else {
                cell.style.opacity = '0.25';
            }
            grid.appendChild(cell);
        }
    }

    _updateCoursesList() {
        const list = document.getElementById('courses-list-container');
        list.innerHTML = "";

        this.courses.forEach(c => {
            const isCurrent = this.currentCourse && this.currentCourse.name === c.name;
            const div = document.createElement('div');
            div.className = `course-card ${isCurrent ? 'active-course' : ''}`;
            div.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <div style="font-weight:bold; font-size:16px; color:var(--text-color);">${c.name}</div>
                    ${isCurrent ? '<span style="font-size:11px; font-weight:bold; color:var(--accent); border:1px solid var(--accent); padding:2px 8px; border-radius:10px;">ACTIVO</span>' : ''}
                </div>
                <div style="font-size:13px; color:var(--text-muted); margin:6px 0;">${c.notes.length} conceptos matemáticos</div>
                <div style="display:flex; gap:8px; margin-top:10px;">
                    <button class="btn-sm btn-primary" onclick="window.app._selectCourse('${c.name}')">${isCurrent ? 'Abrir Grafo' : 'Seleccionar'}</button>
                    <button class="btn-sm btn-outline" onclick="window.app._exportCourseJson('${c.name}')">Exportar JSON</button>
                    ${!isCurrent && this.courses.length > 1 ? `<button class="btn-sm btn-outline" style="color:#FF667D; border-color:#FF667D;" onclick="window.app._deleteCourse('${c.name}')">🗑️</button>` : ''}
                </div>
            `;
            list.appendChild(div);
        });
    }

    _selectCourse(name) {
        const found = this.courses.find(c => c.name === name);
        if (found) {
            this.currentCourse = found;
            this._saveStorage();
            this._updateCourseData();
            this.switchTab('graph');
        }
    }

    _deleteCourse(name) {
        if (!confirm(`¿Eliminar el curso '${name}'?`)) return;
        this.courses = this.courses.filter(c => c.name !== name);
        if (this.currentCourse.name === name) {
            this.currentCourse = this.courses[0];
        }
        this._saveStorage();
        this._updateCourseData();
        this._updateCoursesList();
    }

    _promptNewCourse() {
        const name = prompt("Nombre del nuevo curso (ej: Cálculo Multivariable):");
        if (!name || !name.trim()) return;
        const newC = {
            name: name.trim(),
            notes: [
                {
                    note_id: String(Date.now()),
                    title: "Introducción y Definición 1",
                    x: 80,
                    y: 100,
                    note_type: "standard",
                    cards: [
                        {
                            item_id: String(Date.now() + 1),
                            type: "Flashcard",
                            title: "Definición Básica",
                            front: "Concepto inicial...",
                            back: "Demostración o respuesta..."
                        }
                    ]
                }
            ],
            edges: []
        };
        this.courses.push(newC);
        this.currentCourse = newC;
        this._saveStorage();
        this._updateCourseData();
        this.switchTab('graph');
    }

    _resetDemoCourses() {
        if (!confirm("¿Restaurar los cursos de demostración de Álgebra Lineal y Espacios Métricos?")) return;
        this.courses = JSON.parse(JSON.stringify(SEED_COURSES));
        this.currentCourse = this.courses[0];
        this._saveStorage();
        this._updateCourseData();
        this._updateCoursesList();
    }

    _exportCourseJson(name) {
        const found = this.courses.find(c => c.name === name);
        if (!found) return;
        const blob = new Blob([JSON.stringify(found, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${name.replace(/\s+/g, '_')}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    _handleFileImport(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const data = JSON.parse(event.target.result);
                if (data.notes && Array.isArray(data.notes)) {
                    data.name = data.name || file.name.replace(/\.[^/.]+$/, "");
                    this.courses.push(data);
                    this.currentCourse = data;
                    this._saveStorage();
                    this._updateCourseData();
                    alert(`✓ Curso '${data.name}' importado correctamente!`);
                    this.switchTab('graph');
                } else {
                    alert("El archivo no tiene el formato de curso Morphism.");
                }
            } catch (err) {
                alert(`Error al leer archivo: ${err.message}`);
            }
        };
        reader.readAsText(file);
    }

    _openAddNoteModal() {
        const modal = document.getElementById('modal-add-note');
        document.getElementById('inp-note-title').value = "";
        document.getElementById('inp-card-front').value = "";
        document.getElementById('inp-card-back').value = "";
        modal.classList.add('open');
    }

    _saveNewNoteFromModal() {
        const title = document.getElementById('inp-note-title').value.trim();
        if (!title) {
            alert("Por favor introduce un título para la nota.");
            return;
        }

        const noteType = document.getElementById('inp-note-type').value;
        const front = document.getElementById('inp-card-front').value.trim();
        const back = document.getElementById('inp-card-back').value.trim();

        const isCloze = front.includes("{{") && front.includes("}}");
        const cardType = noteType === "serial_sequence" ? "ProofSequenceCard" : (isCloze ? "ClozeCard" : "Flashcard");

        const newNote = {
            note_id: String(Date.now()),
            title: title,
            x: 100 + Math.random() * 200,
            y: 100 + Math.random() * 200,
            note_type: noteType,
            cards: [
                {
                    item_id: String(Date.now() + 1),
                    type: cardType,
                    title: `Tarjeta 1 - ${title}`,
                    front: front || "Enunciado del teorema...",
                    text: front || "Enunciado con {{c1::cloze}}",
                    premise: front || "Premisa del teorema...",
                    steps: back ? back.split("\n").filter(s => s.trim()) : ["Paso 1 de la demostración..."],
                    back: back || "Demostración completa..."
                }
            ]
        };

        this.currentCourse.notes.push(newNote);
        this._saveStorage();
        this._updateCourseData();
        document.getElementById('modal-add-note').classList.remove('open');
        this.graphView.fitAll();
    }
}

// Global initialization
window.addEventListener('DOMContentLoaded', () => {
    window.app = new MorphismApp();
});
