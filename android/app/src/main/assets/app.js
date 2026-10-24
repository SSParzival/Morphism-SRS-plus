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
        "name": "Electricidad y Magnetismo (I2)",
        "folder_path": "",
        "notes": [
            {
                "note_id": "em_01",
                "title": "Álgebra Vectorial y Operadores Curvilíneos",
                "x": 80.0,
                "y": 80.0,
                "tags": [
                    "EM",
                    "Vectores",
                    "Operadores"
                ],
                "note_type": "standard",
                "desired_retention": 0.85,
                "cards": [
                    {
                        "item_id": 1879945979985957868,
                        "type": "ClozeCard",
                        "title": "Regla BAC-CAB e Identidades de Rotacional",
                        "text": "Triple producto vectorial: $$\\mathbf{A} \\times (\\mathbf{B} \\times \\mathbf{C}) = {{c1::\\mathbf{B}(\\mathbf{A}\\cdot\\mathbf{C}) - \\mathbf{C}(\\mathbf{A}\\cdot\\mathbf{B})::regla BAC-CAB}}$$\\nIdentidades diferenciales nulas: $\\nabla \\times (\\nabla f) = {{c2::\\mathbf{0}::rotacional del gradiente}}$ y $\\nabla \\cdot (\\nabla \\times \\mathbf{A}) = {{c3::0::divergencia del rotacional}}$."
                    },
                    {
                        "item_id": 1879945979986290243,
                        "type": "Flashcard",
                        "title": "Operadores en Coordenadas Cilíndricas y Esféricas",
                        "front": "Escriba la divergencia $\\nabla \\cdot \\mathbf{A}$ en cilíndricas y esféricas.",
                        "back": "1. <b>Cilíndricas $(r, \\theta, z)$:</b> $\\nabla \\cdot \\mathbf{A} = \\frac{1}{r}\\partial_r(r A_r) + \\frac{1}{r}\\partial_\\theta A_\\theta + \\partial_z A_z$.<br>2. <b>Esféricas $(r, \\theta, \\phi)$:</b> $\\nabla \\cdot \\mathbf{A} = \\frac{1}{r^2}\\partial_r(r^2 A_r) + \\frac{1}{r\\sin\\theta}\\partial_\\theta(\\sin\\theta A_\\theta) + \\frac{1}{r\\sin\\theta}\\partial_\\phi A_\\phi$."
                    },
                    {
                        "item_id": 1879945979988141288,
                        "type": "ClozeCard",
                        "title": "Laplaciano Vectorial y Teorema de Stokes",
                        "text": "El laplaciano de un campo vectorial se descompone como: $$\\nabla^2 \\mathbf{A} = {{c1::\\nabla(\\nabla \\cdot \\mathbf{A}) - \\nabla \\times (\\nabla \\times \\mathbf{A})::descomposición de laplaciano vectorial}}$$\\nTeorema de Stokes: $\\oint_{\\partial S} \\mathbf{A} \\cdot d\\boldsymbol{\\ell} = {{c2::\\iint_S (\\nabla \\times \\mathbf{A}) \\cdot d\\mathbf{S}::integral de rotacional}}$."
                    },
                    {
                        "item_id": 1879945980032709743,
                        "type": "ClozeCard",
                        "title": "Identidades Vectoriales y Regla BAC-CAB",
                        "text": "Identidades fundamentales para campos vectoriales en electrodinámica:\\n- Regla BAC-CAB: $$\\mathbf{A} \\times (\\mathbf{B} \\times \\mathbf{C}) = {{c1::\\mathbf{B}(\\mathbf{A}\\cdot\\mathbf{C}) - \\mathbf{C}(\\mathbf{A}\\cdot\\mathbf{B})::producto vectorial triple}}$$\\n- Identidades nulas: $\\nabla \\times (\\nabla f) = {{c2::\\mathbf{0}::rotacional del gradiente}}$ y $\\nabla \\cdot (\\nabla \\times \\mathbf{A}) = {{c3::0::divergencia del rotacional}}$.\\n- Laplaciano vectorial: $\\nabla^2 \\mathbf{A} = {{c4::\\nabla(\\nabla \\cdot \\mathbf{A}) - \\nabla \\times (\\nabla \\times \\mathbf{A})::descomposición laplaciana}}$."
                    },
                    {
                        "item_id": 1879945980034789709,
                        "type": "Flashcard",
                        "title": "Operadores Diferenciales en Cilíndricas y Esféricas",
                        "front": "Escriba la divergencia $\\nabla \\cdot \\mathbf{A}$ y el rotacional $\\nabla \\times \\mathbf{A}$ en coordenadas cilíndricas $(r, \\theta, z)$.",
                        "back": "1. <b>Divergencia Cilíndrica:</b><br>$$\\nabla \\cdot \\mathbf{A} = \\frac{1}{r}\\frac{\\partial(r A_r)}{\\partial r} + \\frac{1}{r}\\frac{\\partial A_\\theta}{\\partial \\theta} + \\frac{\\partial A_z}{\\partial z}$$<br>2. <b>Rotacional Cilíndrico:</b><br>$$\\nabla \\times \\mathbf{A} = \\left(\\frac{1}{r}\\frac{\\partial A_z}{\\partial \\theta} - \\frac{\\partial A_\\theta}{\\partial z}\\right)\\hat{r} + \\left(\\frac{\\partial A_r}{\\partial z} - \\frac{\\partial A_z}{\\partial r}\\right)\\hat{\\theta} + \\frac{1}{r}\\left(\\frac{\\partial(r A_\\theta)}{\\partial r} - \\frac{\\partial A_r}{\\partial \\theta}\\right)\\hat{z}$$"
                    }
                ]
            },
            {
                "note_id": "em_02",
                "title": "Polarización P y Cargas Ligadas",
                "x": 380.0,
                "y": 80.0,
                "tags": [
                    "EM",
                    "Polarización",
                    "Cargas Ligadas"
                ],
                "note_type": "standard",
                "desired_retention": 0.85,
                "cards": [
                    {
                        "item_id": 1879945979989299952,
                        "type": "ClozeCard",
                        "title": "Definición de Cargas Ligadas",
                        "text": "A partir del vector polarización $\\mathbf{P}$:\\n- Densidad volumétrica ligada: $\\rho_b = {{c1::-\\nabla \\cdot \\mathbf{P}::densidad volumétrica}}$\\n- Densidad superficial ligada: $\\sigma_b = {{c2::\\mathbf{P} \\cdot \\hat{n}::densidad superficial en la interfaz}}$."
                    },
                    {
                        "item_id": 1879945979989975112,
                        "type": "ProofSequenceCard",
                        "title": "Carga Ligada Total Nula en Dieléctricos Neutros",
                        "premise": "Demostrar que la carga ligada neta de un dieléctrico neutro cerrado es idénticamente cero.",
                        "steps": [
                            "Carga ligada total: $Q_{b,\\text{tot}} = \\iiint_V \\rho_b \\, dV + \\iint_{\\partial V} \\sigma_b \\, dA$.",
                            "Sustituyendo definiciones: $Q_{b,\\text{tot}} = -\\iiint_V (\\nabla \\cdot \\mathbf{P}) \\, dV + \\iint_{\\partial V} (\\mathbf{P} \\cdot \\hat{n}) \\, dA$.",
                            "Por el Teorema de Gauss: $\\iiint_V (\\nabla \\cdot \\mathbf{P}) \\, dV = \\iint_{\\partial V} (\\mathbf{P} \\cdot \\hat{n}) \\, dA$.",
                            "Restando ambas integrales: $Q_{b,\\text{tot}} = 0$."
                        ]
                    },
                    {
                        "item_id": 1879945979990556123,
                        "type": "Flashcard",
                        "title": "Potencial Electrostático de un Dipolo Puntual",
                        "front": "¿Cuál es el potencial $V(\\mathbf{r})$ y campo $\\mathbf{E}(\\mathbf{r})$ de un dipolo puntual $\\mathbf{p}$ en el origen?",
                        "back": "1. <b>Potencial:</b> $V(\\mathbf{r}) = \\frac{1}{4\\pi\\varepsilon_0}\\frac{\\mathbf{p}\\cdot\\hat{r}}{r^2} = \\frac{1}{4\\pi\\varepsilon_0}\\frac{\\mathbf{p}\\cdot\\mathbf{r}}{r^3}$.<br>2. <b>Campo Eléctrico:</b> $\\mathbf{E}(\\mathbf{r}) = -\\nabla V = \\frac{1}{4\\pi\\varepsilon_0}\\frac{3(\\mathbf{p}\\cdot\\hat{r})\\hat{r} - \\mathbf{p}}{r^3}$."
                    },
                    {
                        "item_id": 1879945980037077916,
                        "type": "ProofSequenceCard",
                        "title": "Neutralidad Neta de Dieléctricos Neutros",
                        "premise": "Demuestre rigurosamente que la carga ligada neta de un dieléctrico neutro de volumen $V$ y frontera $\\partial V$ es idénticamente cero.",
                        "steps": [
                            "Carga ligada total por definición: $Q_{b,\\text{tot}} = \\iiint_V \\rho_b \\, dV + \\iint_{\\partial V} \\sigma_b \\, dA$.",
                            "Sustituir las relaciones constitutivas: $Q_{b,\\text{tot}} = -\\iiint_V (\\nabla \\cdot \\mathbf{P}) \\, dV + \\iint_{\\partial V} (\\mathbf{P} \\cdot \\hat{n}) \\, dA$.",
                            "Aplicar el Teorema de la Divergencia de Gauss al término volumétrico: $\\iiint_V (\\nabla \\cdot \\mathbf{P}) \\, dV = \\iint_{\\partial V} (\\mathbf{P} \\cdot \\hat{n}) \\, dA$.",
                            "Restando ambas integrales: $Q_{b,\\text{tot}} = -\\iint_{\\partial V} (\\mathbf{P} \\cdot \\hat{n}) \\, dA + \\iint_{\\partial V} (\\mathbf{P} \\cdot \\hat{n}) \\, dA = 0 \\quad \\blacksquare$."
                        ]
                    }
                ]
            },
            {
                "note_id": "em_03",
                "title": "Desplazamiento Eléctrico D y Ley de Gauss",
                "x": 680.0,
                "y": 80.0,
                "tags": [
                    "EM",
                    "Gauss",
                    "Desplazamiento"
                ],
                "note_type": "standard",
                "desired_retention": 0.85,
                "cards": [
                    {
                        "item_id": 1879945979992244012,
                        "type": "ClozeCard",
                        "title": "Ley de Gauss en Dieléctricos",
                        "text": "El vector desplazamiento se define como $\\mathbf{D} = {{c1::\\varepsilon_0 \\mathbf{E} + \\mathbf{P}::relación D, E, P}}$.\\nLey de Gauss en dieléctricos: $\\nabla \\cdot \\mathbf{D} = {{c2::\\rho_f::solo carga libre}}$ y $\\oint \\mathbf{D} \\cdot d\\mathbf{A} = {{c3::Q_{f,\\text{enc}}::carga libre encerrada}}$."
                    },
                    {
                        "item_id": 1879945979993347912,
                        "type": "Flashcard",
                        "title": "Relaciones Constitutivas en Medios LHI",
                        "front": "En un dieléctrico Lineal, Homogéneo e Isótropo (LHI), ¿cuáles son las relaciones entre $\\mathbf{P}, \\mathbf{E}, \\mathbf{D}, \\chi_e, \\kappa$ y $\\varepsilon$?",
                        "back": "1. $\\mathbf{P} = \\varepsilon_0 \\chi_e \\mathbf{E} = (\\varepsilon - \\varepsilon_0)\\mathbf{E}$.<br>2. $\\mathbf{D} = \\varepsilon \\mathbf{E} = \\kappa \\varepsilon_0 \\mathbf{E}$.<br>3. $\\kappa = \\varepsilon_r = 1 + \\chi_e$ y $\\varepsilon = \\kappa \\varepsilon_0$."
                    },
                    {
                        "item_id": 1879945980037884182,
                        "type": "ClozeCard",
                        "title": "Ley de Gauss Generalizada",
                        "text": "El vector desplazamiento eléctrico se define como: $$\\mathbf{D} = {{c1::\\varepsilon_0 \\mathbf{E} + \\mathbf{P}::relación D, E, P}}$$\\nLa Ley de Gauss en dieléctricos depende <b>exclusivamente</b> de las cargas libres:\\n- Forma diferencial: $\\nabla \\cdot \\mathbf{D} = {{c2::\\rho_f::densidad de carga libre}}$\\n- Forma integral: $\\oint_{\\partial V} \\mathbf{D} \\cdot d\\mathbf{A} = {{c3::Q_{f,\\text{enc}}::carga libre total encerrada}}$."
                    },
                    {
                        "item_id": 1879945980039055370,
                        "type": "Flashcard",
                        "title": "Cálculo de E a partir de D en Medios LHI",
                        "front": "¿Cómo se relacionan $\\mathbf{D}, \\mathbf{E}, \\mathbf{P}$ en un medio Lineal, Homogéneo e Isótropo (LHI) con susceptibilidad $\\chi_e$ y permitividad relativa $\\kappa$?",
                        "back": "1. $\\mathbf{P} = \\varepsilon_0 \\chi_e \\mathbf{E}$.<br>2. $\\mathbf{D} = \\varepsilon_0 \\mathbf{E} + \\varepsilon_0 \\chi_e \\mathbf{E} = \\varepsilon_0 (1 + \\chi_e)\\mathbf{E} = \\kappa \\varepsilon_0 \\mathbf{E} = \\varepsilon \\mathbf{E}$.<br>3. Constante dieléctrica: $\\kappa = \\varepsilon_r = 1 + \\chi_e$, permitividad del medio: $\\varepsilon = \\kappa \\varepsilon_0$.<br>4. Por lo tanto: $\\mathbf{E} = \\frac{\\mathbf{D}}{\\kappa \\varepsilon_0}$, y $\\mathbf{P} = \\frac{\\chi_e}{1+\\chi_e}\\mathbf{D} = \\left(1 - \\frac{1}{\\kappa}\\right)\\mathbf{D}$."
                    }
                ]
            },
            {
                "note_id": "em_04",
                "title": "Condiciones de Borde y Refracción de Líneas",
                "x": 980.0,
                "y": 80.0,
                "tags": [
                    "EM",
                    "Condiciones de Borde",
                    "Interfaces"
                ],
                "note_type": "standard",
                "desired_retention": 0.85,
                "cards": [
                    {
                        "item_id": 1879945979993882552,
                        "type": "ClozeCard",
                        "title": "Continuidad y Salto en la Interfaz",
                        "text": "En la interfaz entre dos dieléctricos:\\n- Componente tangencial: ${{c1::E_{1t} - E_{2t} = 0::continuidad tangencial}}$ (pues $\\nabla \\times \\mathbf{E} = \\mathbf{0}$).\\n- Componente normal: ${{c2::D_{1n} - D_{2n} = \\sigma_f::salto normal por carga libre}}$.\\nSi no hay carga libre ($\\sigma_f = 0$): $D_{1n} = D_{2n} \\iff \\varepsilon_1 E_{1n} = \\varepsilon_2 E_{2n}$."
                    },
                    {
                        "item_id": 1879945979995605524,
                        "type": "Flashcard",
                        "title": "Ley de Refracción de Líneas de Campo Eléctrico",
                        "front": "Deduzca la relación entre los ángulos de incidencia y refracción $(\\theta_1, \\theta_2)$ respecto a la normal en una interfaz sin cargas libres.",
                        "back": "Por condiciones de borde:<br>1. $E_{1t} = E_{2t} \\implies E_1 \\sin\\theta_1 = E_2 \\sin\\theta_2$.<br>2. $D_{1n} = D_{2n} \\implies \\varepsilon_1 E_1 \\cos\\theta_1 = \\varepsilon_2 E_2 \\cos\\theta_2$.<br>3. Dividiendo ambas ecuaciones:<br>$$\\frac{\\tan\\theta_1}{\\tan\\theta_2} = \\frac{\\varepsilon_1}{\\varepsilon_2} = \\frac{\\kappa_1}{\\kappa_2}$$"
                    },
                    {
                        "item_id": 1879945979996393135,
                        "type": "ClozeCard",
                        "title": "Interfaz Conductor-Dieléctrico",
                        "text": "En la superficie de un conductor ideal en equilibrio en contacto con dieléctrico $\\varepsilon$:\\n- Campo tangencial: $E_t = {{c1::0::conductor equipotencial}}$.\\n- Campo normal exterior: $E_n = {{c2::\\frac{\\sigma_f}{\\varepsilon}::campo en superficie con dieléctrico}}$."
                    },
                    {
                        "item_id": 1879945980040592468,
                        "type": "ClozeCard",
                        "title": "Discontinuidad Normal y Continuidad Tangencial",
                        "text": "En la interfaz entre dos medios dieléctricos (medio 1 y medio 2), con normal $\\hat{n}_{1\\to 2}$ apuntando hacia el medio 2:\\n- Componente normal de $\\mathbf{D}$: $$D_{2n} - D_{1n} = {{c1::\\sigma_f::densidad superficial de carga libre}}$$Si la interfaz no tiene carga libre ($\\sigma_f = 0$): $D_{1n} = D_{2n}$ (continuo).\\n- Componente tangencial de $\\mathbf{E}$: $$E_{2t} - E_{1t} = {{c2::0::siempre continuo}}$$ (consecuencia de $\\nabla \\times \\mathbf{E} = \\mathbf{0}$).\\n- Ley de refracción de líneas de campo: $$\\frac{\\tan\\theta_1}{\\tan\\theta_2} = {{c3::\\frac{\\varepsilon_1}{\\varepsilon_2}::razón de permitividades}}$$ (donde $\\theta$ es el ángulo respecto a la normal)."
                    }
                ]
            },
            {
                "note_id": "em_05",
                "title": "Esferas y Cilindros Dieléctricos",
                "x": 1280.0,
                "y": 80.0,
                "tags": [
                    "EM",
                    "Esfera",
                    "Cilindro",
                    "Laplace"
                ],
                "note_type": "standard",
                "desired_retention": 0.85,
                "cards": [
                    {
                        "item_id": 1879945979997153501,
                        "type": "Flashcard",
                        "title": "Campo Interior y Polarización en Esfera Dieléctrica",
                        "front": "Para una esfera dieléctrica LHI de permitividad $\\varepsilon$ en campo uniforme exterior $\\mathbf{E}_0$, calcule $\\mathbf{E}_{\\text{int}}$ y $\\mathbf{P}$.",
                        "back": "1. <b>Campo Interior Uniforme:</b> $\\mathbf{E}_{\\text{int}} = \\frac{3}{\\kappa + 2} \\mathbf{E}_0 = \\frac{3\\varepsilon_0}{\\varepsilon + 2\\varepsilon_0} \\mathbf{E}_0$.<br>2. <b>Polarización Interior:</b> $\\mathbf{P} = 3\\varepsilon_0 \\left(\\frac{\\kappa - 1}{\\kappa + 2}\\right) \\mathbf{E}_0$.<br>3. <b>Cargas Ligadas:</b> $\\rho_b = 0$, y $\\sigma_b = P \\cos\\theta$."
                    },
                    {
                        "item_id": 1879945979998965850,
                        "type": "ClozeCard",
                        "title": "Cilindro Dieléctrico en Campo Transversal",
                        "text": "Para un cilindro dieléctrico infinito en campo uniforme perpendicular $\\mathbf{E}_0$:\\n- Campo eléctrico interior: $\\mathbf{E}_{\\text{int}} = {{c1::\\frac{2}{\\kappa + 1} \\mathbf{E}_0::campo interior cilindro}}$\\n- Polarización interior: $\\mathbf{P} = {{c2::2\\varepsilon_0 \\frac{\\kappa - 1}{\\kappa + 1} \\mathbf{E}_0::polarización cilindro}}$."
                    },
                    {
                        "item_id": 1879945980040969439,
                        "type": "Flashcard",
                        "title": "Estratificación Serie vs Paralelo en Placas Planas",
                        "front": "Considere un condensador de placas planas paralelas de área $A$ y separación $d$. Compare cómo modelar la capacitancia equivalente si el dieléctrico se divide: a) en rebanadas paralelas a las placas, b) en rebanadas perpendiculares a las placas.",
                        "back": "1. <b>Paralelo a las placas (Serie):</b> Las líneas de campo cruzan sucesivamente ambos dieléctricos. $D$ es continuo. Las diferencias de potencial se suman: $\\Delta V = \\Delta V_1 + \\Delta V_2$.<br>$$\\frac{1}{C_{\\text{eq}}} = \\frac{1}{C_1} + \\frac{1}{C_2} = \\frac{d_1}{\\kappa_1 \\varepsilon_0 A} + \\frac{d_2}{\\kappa_2 \\varepsilon_0 A}$$<br>2. <b>Perpendicular a las placas (Paralelo):</b> Ambas regiones comparten la misma diferencia de potencial $\\Delta V_0$. Las cargas libres se reparten: $Q_{\\text{tot}} = Q_1 + Q_2$.<br>$$C_{\\text{eq}} = C_1 + C_2 = \\frac{\\kappa_1 \\varepsilon_0 A_1}{d} + \\frac{\\kappa_2 \\varepsilon_0 A_2}{d}$$"
                    },
                    {
                        "item_id": 1879945980042204776,
                        "type": "ClozeCard",
                        "title": "Dieléctrico Inhomogéneo Continuo",
                        "text": "Para un condensador plano con permitividad dependiente de la posición $\\kappa(x)$ entre $x = 0$ y $x = d$:\\nComo $D$ es constante en $x$: $E(x) = \\frac{D}{\\varepsilon_0 \\kappa(x)} = \\frac{Q}{\\varepsilon_0 A \\kappa(x)}$.\\nLa diferencia de potencial es: $$\\Delta V = \\int_0^d E(x) dx = \\frac{Q}{\\varepsilon_0 A} {{c1::\\int_0^d \\frac{dx}{\\kappa(x)}::integral de rebanado}}$$\\nPor lo tanto, la capacitancia es: $$C = \\frac{\\varepsilon_0 A}{\\int_0^d \\frac{dx}{\\kappa(x)}}$$."
                    }
                ]
            },
            {
                "note_id": "em_06",
                "title": "Capacitancia y Medios Multicapa",
                "x": 80.0,
                "y": 340.0,
                "tags": [
                    "EM",
                    "Capacitancia",
                    "Multicapa"
                ],
                "note_type": "standard",
                "desired_retention": 0.85,
                "cards": [
                    {
                        "item_id": 1879945979999825113,
                        "type": "ClozeCard",
                        "title": "Capas Dieléctricas en Serie vs Paralelo",
                        "text": "En capacitores de placas paralelas:\\n- Capas perpendiculares a $\\mathbf{E}$ (apiladas en espesor): suman en {{c1::serie::serie o paralelo}}, $\\frac{1}{C} = \\sum \\frac{d_i}{\\varepsilon_i A}$.\\n- Capas paralelas a $\\mathbf{E}$ (yuxtapuestas en área): suman en {{c2::paralelo::serie o paralelo}}, $C = \\sum \\frac{\\varepsilon_i A_i}{d}$."
                    },
                    {
                        "item_id": 1879945980001814170,
                        "type": "Flashcard",
                        "title": "Capacitancia Cilíndrica y Esférica con Dieléctrico",
                        "front": "Escriba la capacitancia de un cable coaxial ($a < b$, largo $L$) y de un capacitor esférico ($a < b$) llenos de dieléctrico $\\varepsilon$.",
                        "back": "1. <b>Cilíndrico:</b> $C = \\frac{2\\pi \\varepsilon L}{\\ln(b/a)}$.<br>2. <b>Esférico:</b> $C = 4\\pi \\varepsilon \\frac{ab}{b - a}$."
                    },
                    {
                        "item_id": 1879945980042945892,
                        "type": "ClozeCard",
                        "title": "Fuerza a Carga Constante vs a Voltaje Constante",
                        "text": "Cálculo de la fuerza mecánica sobre una placa dieléctrica que penetra una distancia $x$ en un condensador:\\n- Condensador desconectado ($Q = \\text{cte}$): $$F_x = {{c1::-\\left(\\frac{\\partial U}{\\partial x}\\right)_Q::derivada negativa de la energía}}$$ con $U = \\frac{Q^2}{2 C(x)} \\implies F_x = +\\frac{Q^2}{2 C^2}\\frac{dC}{dx} = +\\frac{1}{2}V^2 \\frac{dC}{dx}$.\\n- Condensador conectado a batería ($V = \\text{cte}$): $$F_x = {{c2::+\\left(\\frac{\\partial U}{\\partial x}\\right)_V::derivada positiva de la energía}} = {{c3::+\\frac{1}{2}V^2 \\frac{dC}{dx}::fuerza neta idéntica}}$$.\\n¡En ambos casos la fuerza neta es <b>atractiva</b> hacia el interior del condensador!"
                    },
                    {
                        "item_id": 1879945980044435907,
                        "type": "ProofSequenceCard",
                        "title": "Deducción de la Fuerza a Voltaje Constante con Trabajo de la Fuente",
                        "premise": "Demuestre por balance de trabajo virtual que $F_x = +\\left(\\frac{\\partial U}{\\partial x}\\right)_V = \\frac{1}{2}V^2 \\frac{dC}{dx}$ cuando el condensador está conectado a una batería de voltaje $V_0$.",
                        "steps": [
                            "Por el principio de conservación de energía: $d W_{\\text{mec}} + d U = d W_{\\text{batería}}$, donde $d W_{\\text{mec}} = -F_x dx$.",
                            "El trabajo entregado por la batería al transferir carga $dQ$ es: $d W_{\\text{batería}} = V_0 dQ = V_0 (V_0 dC) = V_0^2 dC$.",
                            "La variación de energía electrostática almacenada es: $dU = d\\left(\\frac{1}{2}C V_0^2\\right) = \\frac{1}{2}V_0^2 dC$.",
                            "Sustituyendo: $-F_x dx + \\frac{1}{2}V_0^2 dC = V_0^2 dC \\implies F_x dx = \\frac{1}{2}V_0^2 dC \\implies F_x = +\\frac{1}{2}V_0^2 \\frac{dC}{dx} \\quad \\blacksquare$."
                        ]
                    }
                ]
            },
            {
                "note_id": "em_07",
                "title": "Energía y Fuerzas sobre Dieléctricos",
                "x": 380.0,
                "y": 340.0,
                "tags": [
                    "EM",
                    "Energía",
                    "Fuerza Virtual"
                ],
                "note_type": "standard",
                "desired_retention": 0.85,
                "cards": [
                    {
                        "item_id": 1879945980002749203,
                        "type": "ClozeCard",
                        "title": "Fuerza Electrostática: Carga vs Voltaje Constante",
                        "text": "Por el método del trabajo virtual, la fuerza sobre un dieléctrico móvil es:\\n- A carga constante $Q$: $F_x = {{c1::-\\left(\\frac{\\partial U}{\\partial x}\\right)_Q::derivada a Q fijo}}$\\n- A voltaje constante $V$: $F_x = {{c2::+\\left(\\frac{\\partial U}{\\partial x}\\right)_V = +\\frac{1}{2} V^2 \\frac{dC}{dx}::derivada a V fijo}}$.\\nEl dieléctrico es siempre {{c3::succionado hacia el interior del capacitor::dirección de la fuerza}}."
                    },
                    {
                        "item_id": 1879945980003627546,
                        "type": "ProofSequenceCard",
                        "title": "Fuerza sobre Placa Dieléctrica Parcialmente Insertada",
                        "premise": "Calcular la fuerza $F_x$ sobre una lámina dieléctrica de ancho $w$ y espesor $d$ insertada distancia $x$ a voltaje fijo $V$.",
                        "steps": [
                            "Capacitancia total: $C(x) = \\frac{\\varepsilon_0 w (L - x)}{d} + \\frac{\\varepsilon w x}{d} = \\frac{w}{d}[\\varepsilon_0 L + (\\varepsilon - \\varepsilon_0)x]$.",
                            "A voltaje constante $V$, $F_x = +\\frac{1}{2} V^2 \\frac{dC}{dx}$.",
                            "Derivando: $\\frac{dC}{dx} = \\frac{w(\\varepsilon - \\varepsilon_0)}{d} = \\frac{\\varepsilon_0 w (\\kappa - 1)}{d}$.",
                            "Resultado: $F_x = \\frac{\\varepsilon_0 w (\\kappa - 1) V^2}{2d} > 0$ (fuerza atractiva hacia el interior)."
                        ]
                    },
                    {
                        "item_id": 1879945980004300015,
                        "type": "ClozeCard",
                        "title": "Presión Electrostática en Conductor",
                        "text": "La fuerza por unidad de área (presión electrostática hacia el exterior) en la superficie de un conductor cargado es:\\n$$P_{\\text{es}} = {{c1::\\frac{\\sigma^2}{2\\varepsilon_0} = \\frac{1}{2} \\varepsilon_0 E^2::presión electrostática}}$$\\nSiempre está dirigida hacia {{c2::el exterior del conductor::dirección de la presión}} independientemente del signo de $\\sigma$."
                    },
                    {
                        "item_id": 1879945980045775451,
                        "type": "ClozeCard",
                        "title": "Ecuación de Continuidad y Corriente Eléctrica",
                        "text": "Definición y principios fundamentales de corrientes eléctricas:\\n- Corriente total que atraviesa una superficie $S$: $$I = \\iint_S {{c1::\\mathbf{J} \\cdot d\\mathbf{A}::flujo de la densidad de corriente}}$$\\n- Densidad microscópica de corriente: $$\\mathbf{J} = {{c2::n q \\mathbf{v}_d::densidad portadores por carga por velocidad de deriva}}$$\\n- Ecuación de continuidad (conservación local de la carga): $$\\nabla \\cdot \\mathbf{J} = {{c3::-\\frac{\\partial \\rho}{\\partial t}::tasa de vaciamiento de carga}}$$.\\nEn corriente estacionaria ($\\partial\\rho/\\partial t = 0$): $\\nabla \\cdot \\mathbf{J} = 0$."
                    }
                ]
            },
            {
                "note_id": "em_08",
                "title": "Corriente y Ecuación de Continuidad",
                "x": 680.0,
                "y": 340.0,
                "tags": [
                    "EM",
                    "Corriente",
                    "Densidad J",
                    "Continuidad"
                ],
                "note_type": "standard",
                "desired_retention": 0.85,
                "cards": [
                    {
                        "item_id": 1879945980005119794,
                        "type": "ClozeCard",
                        "title": "Ecuación de Continuidad y Tiempo de Relajación",
                        "text": "Conservación de la carga: $\\nabla \\cdot \\mathbf{J} + {{c1::\\frac{\\partial \\rho}{\\partial t}::derivada temporal de carga}} = 0$.\\nEn un conductor óhmico homogéneo: $\\rho(t) = \\rho_0 e^{-t/\\tau_{\\text{rel}}}$ con tiempo de relajación $\\tau_{\\text{rel}} = {{c2::\\frac{\\varepsilon}{\\sigma}::tiempo de relajación de carga}}$."
                    },
                    {
                        "item_id": 1879945980046822975,
                        "type": "Flashcard",
                        "title": "Modelo Microscópico de Drude para la Conductividad",
                        "front": "Deduzca la relación entre conductividad eléctrica $\\sigma$, densidad de portadores $n$, masa $m$, carga $q$ y tiempo medio de colisión $\\tau$ en el modelo de Drude.",
                        "back": "1. En estado estacionario, el arrastre eléctrico se equilibra con el frenado por colisiones:<br>$$q \\mathbf{E} - \\frac{m \\mathbf{v}_d}{\\tau} = \\mathbf{0} \\implies \\mathbf{v}_d = \\frac{q \\tau}{m}\\mathbf{E}$$<br>2. Sustituyendo en la densidad de corriente $\\mathbf{J} = n q \\mathbf{v}_d$:<br>$$\\mathbf{J} = n q \\left(\\frac{q \\tau}{m}\\mathbf{E}\\right) = \\left(\\frac{n q^2 \\tau}{m}\\right)\\mathbf{E} = \\sigma \\mathbf{E}$$<br>3. Conductividad de Drude: $\\sigma = \\frac{n q^2 \\tau}{m}$, y resistividad: $\\rho = \\frac{1}{\\sigma} = \\frac{m}{n q^2 \\tau}$."
                    },
                    {
                        "item_id": 1879945980047753815,
                        "type": "ClozeCard",
                        "title": "Teorema Dual de Resistencia y Capacitancia (RC = rho * eps)",
                        "text": "Para cualquier estructura conductora con dos electrodos inmersos en un medio con resistividad uniforme $\\rho$ y permitividad dieléctrica $\\varepsilon$:\\n- La resistencia $R$ y la capacitancia $C$ satisfacen la relación universal: $$R \\cdot C = {{c1::\\rho \\varepsilon = \\frac{\\varepsilon}{\\sigma}::producto invariante geométrico}}$$\\nEjemplo: En un cilindro coaxial hueco de longitud $L$ con radios $a$ y $b$ ($b > a$):\\n$$C = \\frac{2\\pi \\varepsilon L}{\\ln(b/a)} \\implies R = {{c2::\\frac{\\rho \\ln(b/a)}{2\\pi L}::resistencia coaxial radial}}$$."
                    }
                ]
            },
            {
                "note_id": "em_09",
                "title": "Modelo de Drude y Teorema Dual RC",
                "x": 980.0,
                "y": 340.0,
                "tags": [
                    "EM",
                    "Drude",
                    "Ohm",
                    "Teorema Dual"
                ],
                "note_type": "standard",
                "desired_retention": 0.85,
                "cards": [
                    {
                        "item_id": 1879945980006337169,
                        "type": "ClozeCard",
                        "title": "Conductividad de Drude y Teorema Dual RC",
                        "text": "Conductividad microscópica según Drude: $\\sigma = {{c1::\\frac{n q^2 \\tau}{m}::conductividad de Drude}}$.\\nTeorema Dual RC entre resistencia y capacitancia para cualquier geometría en medio LHI:\\n$$R \\cdot C = {{c2::\\frac{\\varepsilon}{\\sigma} = \\rho_e \\varepsilon::producto RC geométrico}}$$"
                    },
                    {
                        "item_id": 1879945980007801256,
                        "type": "Flashcard",
                        "title": "Resistencia de Puesta a Tierra Semiesférica",
                        "front": "Calcule la resistencia de puesta a tierra de un electrodo semiesférico de radio $a$ enterrado en suelo con conductividad $\\sigma$.",
                        "back": "1. Por simetría radial, la corriente $I$ fluye por la semiesfera de área $2\\pi r^2$: $J(r) = \\frac{I}{2\\pi r^2}$.<br>2. Campo eléctrico: $E(r) = \\frac{J}{\\sigma} = \\frac{I}{2\\pi \\sigma r^2}$.<br>3. Diferencia de potencial hasta el infinito: $V = \\int_a^\\infty E(r) dr = \\frac{I}{2\\pi \\sigma a}$.<br>4. Resistencia de tierra: $R = \\frac{V}{I} = \\frac{1}{2\\pi \\sigma a}$."
                    },
                    {
                        "item_id": 1879945980048617397,
                        "type": "ClozeCard",
                        "title": "Carga de un Condensador en Circuito RC",
                        "text": "Considere un circuito con fuente de FEM $\\mathcal{E}$, resistencia $R$ y condensador $C$ inicialmente descargado ($q(0) = 0$):\\n- Ecuación diferencial por Kirchhoff: $$\\mathcal{E} - R\\frac{dq}{dt} - \\frac{q}{C} = 0$$\\n- Carga en función del tiempo: $$q(t) = {{c1::C\\mathcal{E}(1 - e^{-t/RC})::evolución temporal de carga}}$$\\n- Corriente en función del tiempo: $$i(t) = \\frac{dq}{dt} = {{c2::\\frac{\\mathcal{E}}{R}e^{-t/RC}::corriente exponencial decreciente}}$$\\n- Constante de tiempo: $\\tau = {{c3::RC::tiempo característico}}$."
                    },
                    {
                        "item_id": 1879945980049596662,
                        "type": "ProofSequenceCard",
                        "title": "Balance Energético en Carga RC: El Teorema del 50%",
                        "premise": "Demuestre rigurosamente que al cargar completamente un condensador desde una fuente de FEM constante $\\mathcal{E}$, exactamente el 50% de la energía entregada por la fuente se disipa en la resistencia, sin importar el valor de $R$.",
                        "steps": [
                            "Carga final acumulada: $Q_{\\text{fin}} = C\\mathcal{E}$. Trabajo entregado por la fuente: $W_{\\text{fem}} = \\int_0^\\infty \\mathcal{E} i(t) dt = \\mathcal{E} Q_{\\text{fin}} = C\\mathcal{E}^2$.",
                            "Energía electrostática almacenada en el condensador al final: $U_C = \\frac{1}{2}\\frac{Q_{\\text{fin}}^2}{C} = \\frac{1}{2}C\\mathcal{E}^2$.",
                            "Energía total disipada en la resistencia por efecto Joule: $U_R = \\int_0^\\infty i(t)^2 R \\, dt = R \\int_0^\\infty \\left(\\frac{\\mathcal{E}}{R}e^{-t/RC}\\right)^2 dt = \\frac{\\mathcal{E}^2}{R}\\int_0^\\infty e^{-2t/RC}dt$.",
                            "Evaluando la integral: $\\int_0^\\infty e^{-2t/RC}dt = \\left[-\\frac{RC}{2}e^{-2t/RC}\\right]_0^\\infty = \\frac{RC}{2} \\implies U_R = \\frac{\\mathcal{E}^2}{R}\\cdot\\frac{RC}{2} = \\frac{1}{2}C\\mathcal{E}^2$.",
                            "Por lo tanto: $W_{\\text{fem}} = U_C + U_R = \\frac{1}{2}C\\mathcal{E}^2 + \\frac{1}{2}C\\mathcal{E}^2$, disipándose exactamente el 50% en calor $\\blacksquare$."
                        ]
                    }
                ]
            },
            {
                "note_id": "em_10",
                "title": "Circuitos DC y Equivalentes de Thévenin",
                "x": 1280.0,
                "y": 340.0,
                "tags": [
                    "EM",
                    "Circuitos",
                    "Thévenin",
                    "Norton"
                ],
                "note_type": "standard",
                "desired_retention": 0.85,
                "cards": [
                    {
                        "item_id": 1879945980008550728,
                        "type": "ClozeCard",
                        "title": "Equivalentes de Thévenin, Norton y Máxima Potencia",
                        "text": "Equivalentes de red lineal:\\n- Thévenin: Fuente $V_{th}$ en serie con $R_{th}$.\\n- Norton: Fuente de corriente $I_N = {{c1::\\frac{V_{th}}{R_{th}}::corriente Norton}}$ en paralelo con $R_{th}$.\\n- Condición de máxima potencia transferida a $R_L$: $R_L = {{c2::R_{th}::condición}}$ con $P_{\\max} = {{c3::\\frac{V_{th}^2}{4 R_{th}}::potencia máxima}}$."
                    },
                    {
                        "item_id": 1879945980050322268,
                        "type": "ClozeCard",
                        "title": "Fuerza de Lorentz y Trabajo Nulo",
                        "text": "Fuerza total sobre una carga $q$ con velocidad $\\mathbf{v}$ en presencia de campos $\\mathbf{E}$ y $\\mathbf{B}$:\\n$$\\mathbf{F} = {{c1::q(\\mathbf{E} + \\mathbf{v} \\times \\mathbf{B})::ecuación de Lorentz}}$$\\n- Trabajo de la fuerza magnética sobre la carga: $$dW_B = \\mathbf{F}_B \\cdot d\\mathbf{r} = q(\\mathbf{v} \\times \\mathbf{B}) \\cdot (\\mathbf{v} dt) = {{c2::0::trabajo idénticamente nulo}}$$Por lo tanto, un campo magnético estático <b>nunca</b> altera la energía cinética de una partícula; solo curva su trayectoria."
                    },
                    {
                        "item_id": 1879945980052189876,
                        "type": "Flashcard",
                        "title": "Dispositivos Electromagnéticos Canónicos",
                        "front": "Escriba las ecuaciones de operación para: 1) Selector de velocidades de Wien, 2) Radio de ciclotrón y frecuencia angular, 3) Espectrómetro de masas de Bainbridge.",
                        "back": "1. <b>Selector de Wien ($\\mathbf{E} \\perp \\mathbf{B}$ cruzados):</b> Condición de no desviación $q E = q v B \\implies v = \\frac{E}{B}$.<br>2. <b>Ciclotrón ($\\mathbf{v} \\perp \\mathbf{B}$ uniforme):</b> Fuerza centrípeta $q v B = \\frac{m v^2}{r} \\implies$ radio $r = \\frac{m v}{q B}$ y frecuencia angular $\\omega_c = \\frac{q B}{m}$ (independiente de la velocidad a régimen no relativista).<br>3. <b>Espectrómetro de Bainbridge:</b> Tras salir del selector de Wien, la partícula ingresa a un campo $B'$ puro. Radio $R = \\frac{m v}{q B'} = \\frac{m E}{q B B'} \\implies \\frac{m}{q} = \\frac{q B B' R}{E}$."
                    }
                ]
            },
            {
                "note_id": "em_11",
                "title": "Transitorios RC y Balance Energético",
                "x": 80.0,
                "y": 600.0,
                "tags": [
                    "EM",
                    "RC",
                    "Transitorio",
                    "50%"
                ],
                "note_type": "standard",
                "desired_retention": 0.85,
                "cards": [
                    {
                        "item_id": 1879945980009852312,
                        "type": "ProofSequenceCard",
                        "title": "Balance de Energía del 50% en Carga RC",
                        "premise": "Demostrar que en la carga de un condensador desde 0 hasta $C\\mathcal{E}$, el 50% de la energía de la fuente se disipa en calor.",
                        "steps": [
                            "Energía entregada por la fuente: $W_{\\text{fuente}} = \\int_0^\\infty \\mathcal{E} i(t) dt = \\mathcal{E} Q_{\\text{final}} = C \\mathcal{E}^2$.",
                            "Energía almacenada en el capacitor: $U_C = \\frac{1}{2} C \\mathcal{E}^2$.",
                            "Energía disipada por Joule en la resistencia: $E_R = \\int_0^\\infty i(t)^2 R dt = \\frac{\\mathcal{E}^2}{R} \\int_0^\\infty e^{-2t/RC} dt$.",
                            "Evaluando la integral: $\\int_0^\\infty e^{-2t/RC} dt = \\frac{RC}{2} \\implies E_R = \\frac{1}{2} C \\mathcal{E}^2$.",
                            "Se verifica estrictamente: $W_{\\text{fuente}} = U_C + E_R$ con $E_R = 50\\% W_{\\text{fuente}}$."
                        ]
                    },
                    {
                        "item_id": 1879945980010625865,
                        "type": "Flashcard",
                        "title": "Comportamiento en Transitorios: t=0+ vs t->infinito",
                        "front": "¿Cómo se modelan los capacitores e inductores en $t=0^+$ y en $t \\to \\infty$?",
                        "back": "1. <b>Capacitor:</b><br>- En $t=0^+$: <b>Cortocircuito</b> ($\\Delta V_C = 0$).<br>- En $t\\to\\infty$: <b>Circuito abierto</b> ($i_C = 0$).<br><br>2. <b>Inductor:</b><br>- En $t=0^+$: <b>Circuito abierto</b> ($i_L = 0$).<br>- En $t\\to\\infty$: <b>Cortocircuito</b> ($\\Delta V_L = 0$)."
                    },
                    {
                        "item_id": 1879945980054280210,
                        "type": "ClozeCard",
                        "title": "Voltaje Hall y Coeficiente Hall",
                        "text": "En una cinta conductora de espesor $t$ y ancho $w$ por la que fluye corriente $I$ inmersa en campo magnético perpendicular $B$:\\n- Campo eléctrico transversal de equilibrio (Hall): $E_H = v_d B$.\\n- Voltaje transversal Hall: $$V_H = E_H w = v_d B w = {{c1::\\frac{I B}{n q t}::voltaje Hall}}$$.\\n- Coeficiente Hall: $$R_H = {{c2::\\frac{1}{n q}::coeficiente Hall}}$$.\\n- Significado físico crucial: El signo medido de $V_H$ permite distinguir si los portadores mayoritarios de carga son {{c3::electrones negativos ($q < 0$) o huecos positivos ($q > 0$)::tipo de portador}}."
                    }
                ]
            },
            {
                "note_id": "em_12",
                "title": "Fuerza de Lorentz y Movimiento Helicoidal",
                "x": 380.0,
                "y": 600.0,
                "tags": [
                    "EM",
                    "Lorentz",
                    "Ciclotrón",
                    "Larmor"
                ],
                "note_type": "standard",
                "desired_retention": 0.85,
                "cards": [
                    {
                        "item_id": 1879945980011734484,
                        "type": "ClozeCard",
                        "title": "Fuerza de Lorentz y Radio Ciclotrónico",
                        "text": "Fuerza total: $\\mathbf{F} = q(\\mathbf{E} + \\mathbf{v}\\times\\mathbf{B})$.\\nLa potencia del campo magnético es $P = \\mathbf{F}_B \\cdot \\mathbf{v} = {{c1::0::potencia nula}}$, por lo que {{c2::nunca altera la energía cinética::efecto magnético}}.\\nRadio ciclotrón: $r_c = {{c3::\\frac{m v_\\perp}{q B}::radio ciclotrón}}$, período: $T = {{c4::\\frac{2\\pi m}{q B}::período}}$."
                    },
                    {
                        "item_id": 1879945980012766810,
                        "type": "Flashcard",
                        "title": "Paso de la Trayectoria Helicoidal",
                        "front": "Si una partícula entra a un campo $\\mathbf{B}$ con ángulo $\\alpha$ respecto a las líneas de campo, ¿cuál es el paso de avance $p$?",
                        "back": "1. Componente paralela constante: $v_\\parallel = v \\cos\\alpha$.<br>2. Período de giro en el plano transversal: $T = \\frac{2\\pi m}{q B}$.<br>3. Paso helicoidal: $p = v_\\parallel T = \\frac{2\\pi m v \\cos\\alpha}{q B}$."
                    },
                    {
                        "item_id": 1879945980055260858,
                        "type": "ProofSequenceCard",
                        "title": "Fuerza Magnética Neta Nula en Espira Cerrada en Campo Uniforme",
                        "premise": "Demuestre que la fuerza magnética neta que experimenta cualquier espira conductora cerrada de geometría arbitraria en un campo magnético uniforme $\\mathbf{B}_0$ es idénticamente cero.",
                        "steps": [
                            "Fuerza sobre un elemento diferencial: $d\\mathbf{F} = I d\\boldsymbol{\\ell} \\times \\mathbf{B}_0$.",
                            "Fuerza total integrando sobre la curva cerrada $C$: $\\mathbf{F}_{\\text{net}} = \\oint_C I d\\boldsymbol{\\ell} \\times \\mathbf{B}_0$.",
                            "Dado que $I$ y $\\mathbf{B}_0$ son constantes espaciales, se extraen del producto: $\\mathbf{F}_{\\text{net}} = I \\left(\\oint_C d\\boldsymbol{\\ell}\\right) \\times \\mathbf{B}_0$.",
                            "La integral de línea de un diferencial exacto sobre una curva cerrada es nula: $\\oint_C d\\boldsymbol{\\ell} = \\mathbf{0}$.",
                            "Por lo tanto: $\\mathbf{F}_{\\text{net}} = I \\cdot \\mathbf{0} \\times \\mathbf{B}_0 = \\mathbf{0} \\quad \\blacksquare$."
                        ]
                    },
                    {
                        "item_id": 1879945980056302486,
                        "type": "ClozeCard",
                        "title": "Torque y Momento Dipolar Magnético",
                        "text": "Para una espira conductora de área vectorial $\\mathbf{A} = A \\hat{n}$ y corriente $I$:\\n- Momento dipolar magnético: $$\\mathbf{m} = {{c1::I \\mathbf{A} = I A \\hat{n}::momento dipolar magnético}}$$\\n- Torque magnético en campo uniforme $\\mathbf{B}$: $$\\boldsymbol{\\tau} = {{c2::\\mathbf{m} \\times \\mathbf{B}::torque magnético}}$$\\n- Energía potencial dipolar: $$U = {{c3::-\\mathbf{m} \\cdot \\mathbf{B}::energía dipolar}}$$.\\n- Fuerza sobre un dipolo en campo magnético <b>no uniforme</b>: $$\\mathbf{F} = {{c4::\\nabla(\\mathbf{m} \\cdot \\mathbf{B})::fuerza sobre dipolo}}$$."
                    }
                ]
            },
            {
                "note_id": "em_13",
                "title": "Efecto Hall y Selector de Wien",
                "x": 680.0,
                "y": 600.0,
                "tags": [
                    "EM",
                    "Hall",
                    "Wien",
                    "Portadores"
                ],
                "note_type": "standard",
                "desired_retention": 0.85,
                "cards": [
                    {
                        "item_id": 1879945980014167007,
                        "type": "ClozeCard",
                        "title": "Fórmulas del Efecto Hall y Selector",
                        "text": "- Selector de velocidades con $\\mathbf{E} \\perp \\mathbf{B}$: velocidad filtrada $v = {{c1::\\frac{E}{B}::velocidad de Wien}}$.\\n- Voltaje de Hall en cinta de espesor $t$: $\\Delta V_H = {{c2::\\frac{I B}{n q t} = R_H \\frac{I B}{t}::voltaje de Hall}}$.\\n- Coeficiente de Hall: $R_H = {{c3::\\frac{1}{nq}::coeficiente RH}}$, cuyo signo revela el tipo de portadores mayoritarios."
                    },
                    {
                        "item_id": 1879945980057280415,
                        "type": "ClozeCard",
                        "title": "Fórmula Vectorial de Biot-Savart",
                        "text": "Campo magnético generado por un elemento de corriente $I d\\boldsymbol{\\ell}'$ ubicado en $\\mathbf{r}'$ evaluado en el punto $\\mathbf{r}$:\\n$$d\\mathbf{B}(\\mathbf{r}) = \\frac{\\mu_0 I}{4\\pi} {{c1::\\frac{d\\boldsymbol{\\ell}' \\times (\\mathbf{r} - \\mathbf{r}')}{|\\mathbf{r} - \\mathbf{r}'|^3}::expresión fundamental de Biot-Savart}}$$\\nEn términos del vector unitario de separación $\\hat{\\boldsymbol{\\mathcal{R}}} = \\frac{\\mathbf{r}-\\mathbf{r}'}{|\\mathbf{r}-\\mathbf{r}'|}$:\\n$$d\\mathbf{B}(\\mathbf{r}) = \\frac{\\mu_0 I}{4\\pi}\\frac{d\\boldsymbol{\\ell}' \\times \\hat{\\boldsymbol{\\mathcal{R}}}}{\\mathcal{R}^2}$$."
                    },
                    {
                        "item_id": 1879945980058116619,
                        "type": "Flashcard",
                        "title": "Los 5 Pasos Infalibles para Resolver Biot-Savart en Examen",
                        "front": "Explique la metodología paso a paso para calcular el campo de Biot-Savart sin equivocarse en signos ni factores geométricos.",
                        "back": "1. <b>Parametrizar la fuente:</b> Vector posición $\\mathbf{r}'$ y elemento vectorial tangente $d\\boldsymbol{\\ell}'$.<br>2. <b>Parametrizar el punto de campo:</b> Vector posición $\\mathbf{r}$.<br>3. <b>Construir vector separación y módulo:</b> $\\boldsymbol{\\mathcal{R}} = \\mathbf{r} - \\mathbf{r}'$, y calcular $|\\boldsymbol{\\mathcal{R}}|^3 = [(\\Delta x)^2 + (\\Delta y)^2 + (\\Delta z)^2]^{3/2}$.<br>4. <b>Producto cruz vectorial:</b> Calcular $d\\boldsymbol{\\ell}' \\times \\boldsymbol{\\mathcal{R}}$ por determinantes; simplificar usando simetría de componentes impares.<br>5. <b>Integrar componente por componente:</b> Integrar entre los límites de la fuente con la tabla de integrales estándar."
                    }
                ]
            },
            {
                "note_id": "em_14",
                "title": "Fuerzas y Torques sobre Espiras y Dipolos",
                "x": 980.0,
                "y": 600.0,
                "tags": [
                    "EM",
                    "Laplace",
                    "Dipolo",
                    "Torque"
                ],
                "note_type": "standard",
                "desired_retention": 0.85,
                "cards": [
                    {
                        "item_id": 1879945980015375716,
                        "type": "ClozeCard",
                        "title": "Fuerza y Torque sobre Espiras",
                        "text": "Fuerza elemental sobre corriente: $d\\mathbf{F} = {{c1::I d\\boldsymbol{\\ell} \\times \\mathbf{B}::fuerza diferencial}}$.\\nPara una espira plana de área vectorial $\\mathbf{A}$ con corriente $I$:\\n- Momento dipolar: $\\boldsymbol{\\mu} = {{c2::I \\mathbf{A}::momento dipolar}}$\\n- Torque: $\\boldsymbol{\\tau} = {{c3::\\boldsymbol{\\mu} \\times \\mathbf{B}::torque}}$\\n- Energía potencial: $U = {{c4::-\\boldsymbol{\\mu} \\cdot \\mathbf{B}::energía potencial}}$."
                    },
                    {
                        "item_id": 1879945980059346697,
                        "type": "Flashcard",
                        "title": "Segmento Recto y Cable Infinito",
                        "front": "Escriba el campo magnético $\\mathbf{B}$ generado por un segmento rectilíneo finito a distancia perpendicular $d$, y deduzca el límite para un hilo infinito.",
                        "back": "1. <b>Segmento finito entre ángulos $\\theta_1$ y $\\theta_2$:</b><br>$$B = \\frac{\\mu_0 I}{4\\pi d}(\\sin\\theta_2 - \\sin\\theta_1)$$ (donde los ángulos se miden respecto a la normal al cable).<br>2. <b>Cable rectilíneo infinito:</b> Hacia un extremo $\\theta_1 = -\\pi/2$ ($\\sin\\theta_1 = -1$) y hacia el otro $\\theta_2 = +\\pi/2$ ($\\sin\\theta_2 = +1$):<br>$$B = \\frac{\\mu_0 I}{4\\pi d}(1 - (-1)) = \\frac{\\mu_0 I}{2\\pi d}$$ con dirección azimutal $\\hat{\\phi}$ según la regla de la mano derecha."
                    },
                    {
                        "item_id": 1879945980059677952,
                        "type": "ClozeCard",
                        "title": "Espira Circular en el Eje de Simetría",
                        "text": "Para una espira circular de radio $R$ con corriente $I$ centrada en el origen sobre el plano $xy$:\\n- Campo magnético en cualquier punto $z$ sobre su eje de simetría: $$\\mathbf{B}(z) = {{c1::\\frac{\\mu_0 I R^2}{2(R^2 + z^2)^{3/2}}\\hat{z}::campo axial de espira circular}}$$\\n- En el centro de la espira ($z = 0$): $$\\mathbf{B}(0) = {{c2::\\frac{\\mu_0 I}{2R}\\hat{z}::campo en el centro}}$$\\n- Arco circular plano de ángulo $\\Delta\\phi$ en su centro de curvatura: $$B = {{c3::\\frac{\\mu_0 I \\Delta\\phi}{4\\pi R}::campo de arco planar}}$$."
                    }
                ]
            },
            {
                "note_id": "em_15",
                "title": "Ley de Biot-Savart y Alambres Conductores",
                "x": 1280.0,
                "y": 600.0,
                "tags": [
                    "EM",
                    "Biot-Savart",
                    "Alambres"
                ],
                "note_type": "standard",
                "desired_retention": 0.85,
                "cards": [
                    {
                        "item_id": 1879945980016521768,
                        "type": "ClozeCard",
                        "title": "Fórmulas de Biot-Savart para Alambres",
                        "text": "Ley de Biot-Savart: $d\\mathbf{B} = \\frac{\\mu_0 I}{4\\pi}\\frac{d\\boldsymbol{\\ell}\\times\\hat{r}}{r^2}$.\\n- Segmento finito entre $\\theta_1$ y $\\theta_2$: $B = {{c1::\\frac{\\mu_0 I}{4\\pi d}(\\sin\\theta_2 - \\sin\\theta_1)::segmento finito}}$.\\n- Hilo infinito: $B = {{c2::\\frac{\\mu_0 I}{2\\pi d}::hilo infinito}}$.\\n- Puntos colineales en la prolongación del alambre: $B = {{c3::0::campo nulo en prolongación}}$."
                    },
                    {
                        "item_id": 1879945980061329234,
                        "type": "ClozeCard",
                        "title": "Ley de Ampère en Formas Integral y Diferencial",
                        "text": "La Ley de Ampère para magnetostática relaciona la circulación del campo magnético con la corriente libre encerrada:\\n- Forma integral: $$\\oint_C \\mathbf{B} \\cdot d\\boldsymbol{\\ell} = {{c1::\\mu_0 I_{\\text{enc}} = \\mu_0 \\iint_S \\mathbf{J} \\cdot d\\mathbf{A}::circulación amperiana}}$$\\n- Forma diferencial (rotacional): $$\\nabla \\times \\mathbf{B} = {{c2::\\mu_0 \\mathbf{J}::rotacional en corrientes estacionarias}}$$\\nPara que la ley permita despejar $|\\mathbf{B}|$ algebraicamente, el lazo amperiano $C$ debe satisfacer simetría tal que $\\mathbf{B}$ sea {{c3::paralelo y constante a lo largo de $C$::condición de desacoplamiento}}."
                    },
                    {
                        "item_id": 1879945980062365593,
                        "type": "Flashcard",
                        "title": "Cilindro con Densidad de Corriente No Uniforme J(r)",
                        "front": "Un conductor cilíndrico de radio $R$ conduce corriente con densidad $\\mathbf{J}(r) = C r^k \\hat{z}$. Calcule el campo $\\mathbf{B}(r)$ en el interior ($r < R$) y en el exterior ($r > R$).",
                        "back": "1. <b>Interior ($r < R$):</b> Lazo circular amperiano de radio $r$.<br>$$I_{\\text{enc}}(r) = \\int_0^{2\\pi}\\int_0^r (C r'^k) r' dr' d\\theta = 2\\pi C \\frac{r^{k+2}}{k+2}$$<br>Por Ampère: $B(r)\\cdot 2\\pi r = \\mu_0 I_{\\text{enc}}(r) \\implies B_{\\text{int}}(r) = \\frac{\\mu_0 C}{k+2}r^{k+1} \\hat{\\theta}$.<br>2. <b>Exterior ($r \\ge R$):</b> Encerra la corriente total $I_{\\text{tot}} = 2\\pi C \\frac{R^{k+2}}{k+2}$:<br>$$B_{\\text{ext}}(r)\\cdot 2\\pi r = \\mu_0 I_{\\text{tot}} \\implies B_{\\text{ext}}(r) = \\frac{\\mu_0 I_{\\text{tot}}}{2\\pi r}\\hat{\\theta}$$."
                    }
                ]
            },
            {
                "note_id": "em_16",
                "title": "Espiras Circulares y Bobinas de Helmholtz",
                "x": 80.0,
                "y": 860.0,
                "tags": [
                    "EM",
                    "Espira",
                    "Helmholtz",
                    "Biot-Savart"
                ],
                "note_type": "standard",
                "desired_retention": 0.85,
                "cards": [
                    {
                        "item_id": 1879945980018412322,
                        "type": "ProofSequenceCard",
                        "title": "Campo en el Eje de Espira Circular",
                        "premise": "Calcular el campo axial $B_z(z)$ de una espira circular de radio $R$ con corriente $I$.",
                        "steps": [
                            "Distancia al punto de observación en el eje: $r = \\sqrt{R^2 + z^2}$.",
                            "Módulo del campo diferencial: $dB = \\frac{\\mu_0 I d\\ell}{4\\pi (R^2+z^2)}$.",
                            "Por simetría circular, las componentes radiales se anulan: $\\oint dB_\\perp = 0$.",
                            "Componente axial: $dB_z = dB \\cos\\theta = dB \\frac{R}{\\sqrt{R^2+z^2}} = \\frac{\\mu_0 I R}{4\\pi (R^2+z^2)^{3/2}} d\\ell$.",
                            "Integrando sobre la espira ($2\\pi R$): $B_z = \\frac{\\mu_0 I R^2}{2(R^2+z^2)^{3/2}}$. En el centro ($z=0$): $B = \\frac{\\mu_0 I}{2R}$."
                        ]
                    },
                    {
                        "item_id": 1879945980019616094,
                        "type": "Flashcard",
                        "title": "Bobinas de Helmholtz: Campo Óptimamente Homogéneo",
                        "front": "¿Por qué en las bobinas de Helmholtz la separación óptima entre bobinas es $d = R$?",
                        "back": "En el punto medio $z=0$ entre ambas bobinas coaxiales:<br>1. Por simetría par, la primera derivada es nula: $\\frac{dB}{dz} = 0$.<br>2. La segunda derivada es proporcional a $(4d^2 - R^2)$. Fijando $d=R$, se anula idénticamente: $\\frac{d^2 B}{dz^2} = 0$.<br>3. Las variaciones espaciales son de orden cuatro ($O(z^4)$), logrando la máxima uniformidad magnética experimental."
                    },
                    {
                        "item_id": 1879945980020038939,
                        "type": "ClozeCard",
                        "title": "Campo en el Centro de un Arco Circular",
                        "text": "Para un arco circular de radio $R$ que subtiende un ángulo $\\alpha$ (en radianes) con corriente $I$:\\n$$B_{\\text{centro}} = {{c1::\\frac{\\mu_0 I \\alpha}{4\\pi R}::campo de arco circular}}$$\\nSi es una espira completa ($\\alpha = 2\\pi$): $B = \\frac{\\mu_0 I}{2R}$."
                    },
                    {
                        "item_id": 1879945980063476857,
                        "type": "ClozeCard",
                        "title": "Magnetización M y Corrientes Ligadas",
                        "text": "En un material magnético con magnetización $\\mathbf{M}$ (momento dipolar magnético por volumen):\\n- Densidad volumétrica de corriente ligada: $$\\mathbf{J}_b = {{c1::\\nabla \\times \\mathbf{M}::rotacional de la magnetización}}$$\\n- Densidad superficial de corriente ligada: $$\\mathbf{K}_b = {{c2::\\mathbf{M} \\times \\hat{n}::producto cruz con la normal exterior}}$$\\n- Campo auxiliar $\\mathbf{H}$ (depende solo de corrientes libres): $$\\mathbf{H} = {{c3::\\frac{\\mathbf{B}}{\\mu_0} - \\mathbf{M}::definición del campo H}}$$ y $\\oint_C \\mathbf{H} \\cdot d\\boldsymbol{\\ell} = I_{f,\\text{enc}}$."
                    },
                    {
                        "item_id": 1879945980064509426,
                        "type": "Flashcard",
                        "title": "Medios Magnéticos Lineales: Diamagnetismo, Paramagnetismo y Ferromagnetismo",
                        "front": "Explique las relaciones constitutivas $\\mathbf{M} = \\chi_m \\mathbf{H}$ y $\\mathbf{B} = \\mu \\mathbf{H}$, distinguiendo las tres clases de materiales magnéticos.",
                        "back": "1. <b>Relaciones constitutivas:</b> $\\mathbf{B} = \\mu_0(\\mathbf{H} + \\mathbf{M}) = \\mu_0(1 + \\chi_m)\\mathbf{H} = \\mu \\mathbf{H}$, donde $\\chi_m$ es la susceptibilidad y $\\mu = \\mu_0 \\mu_r = \\mu_0(1+\\chi_m)$ es la permeabilidad.<br>2. <b>Diamagnetismo ($\\chi_m < 0$, $\\chi_m \\sim -10^{-5}$):</b> Se opone débilmente a $\\mathbf{B}$. Presente en todos los átomos por la ley de Lenz a nivel orbital.<br>3. <b>Paramagnetismo ($\\chi_m > 0$, $\\chi_m \\sim +10^{-4}$):</b> Los dipolos atómicos permanentes se alinean a favor de $\\mathbf{B}$. Disminuye con la temperatura ($T^{-1}$, Ley de Curie).<br>4. <b>Ferromagnetismo ($\\mu \\gg \\mu_0$, histéresis):</b> Dominios magnéticos acoplados cuánticamente (canje); no lineal."
                    }
                ]
            },
            {
                "note_id": "em_17",
                "title": "Fuerzas entre Conductores y Espiras Coplanares",
                "x": 380.0,
                "y": 860.0,
                "tags": [
                    "EM",
                    "Fuerza Magnética",
                    "Espira Coplanar"
                ],
                "note_type": "standard",
                "desired_retention": 0.85,
                "cards": [
                    {
                        "item_id": 1879945980020965680,
                        "type": "ClozeCard",
                        "title": "Fuerza entre Hilos Paralelos",
                        "text": "Fuerza por unidad de longitud entre dos conductores paralelos separados distancia $d$:\\n$$\\frac{F}{L} = {{c1::\\frac{\\mu_0 I_1 I_2}{2\\pi d}::fuerza por longitud}}$$\\n- Corrientes en el mismo sentido: se {{c2::atraen::atracción o repulsión}}.\\n- Corrientes en sentidos opuestos: se {{c3::repelen::atracción o repulsión}}."
                    },
                    {
                        "item_id": 1879945980022125615,
                        "type": "Flashcard",
                        "title": "Fuerza Neta sobre Espira Coplanar a Hilo Infinito",
                        "front": "Una espira rectangular de lados $a$ (paralelo) y $b$ (perpendicular) con corriente $I_2$ se sitúa a distancia $d$ de un hilo largo con corriente $I_1$. Calcule la fuerza neta.",
                        "back": "1. Los lados perpendiculares sufren fuerzas opuestas que se cancelan vectorialmente.<br>2. Lado cercano (atracción): $F_1 = \\frac{\\mu_0 I_1 I_2 a}{2\\pi d}$.<br>3. Lado lejano (repulsión): $F_2 = \\frac{\\mu_0 I_1 I_2 a}{2\\pi (d+b)}$.<br>4. Fuerza Neta Atractiva:<br>$$F_{\\text{net}} = \\frac{\\mu_0 I_1 I_2 a b}{2\\pi d(d+b)}$$"
                    },
                    {
                        "item_id": 1879945980065775604,
                        "type": "ClozeCard",
                        "title": "Definición y Propiedades del Potencial Vector A",
                        "text": "Como la divergencia del campo magnético es nula ($\\nabla \\cdot \\mathbf{B} = 0$), existe un potencial vector $\\mathbf{A}$ tal que:\\n$$\\mathbf{B} = {{c1::\\nabla \\times \\mathbf{A}::rotacional del potencial vector}}$$\\n- Gauge de Coulomb (norma estándar en magnetostática): $$\\nabla \\cdot \\mathbf{A} = {{c2::0::divergencia nula de A}}$$\\n- Ecuación de Poisson para $\\mathbf{A}$: $$\\nabla^2 \\mathbf{A} = {{c3::-\\mu_0 \\mathbf{J}::ecuación diferencial de Poisson}}$$\\n- Flujo magnético a través de superficie $S$ con borde $\\partial S$ (por Stokes): $$\\Phi_B = \\iint_S \\mathbf{B} \\cdot d\\mathbf{A} = {{c4::\\oint_{\\partial S} \\mathbf{A} \\cdot d\\boldsymbol{\\ell}::circulación de A}}$$."
                    }
                ]
            },
            {
                "note_id": "em_18",
                "title": "Ley de Ampère y Medios de Alta Simetría",
                "x": 680.0,
                "y": 860.0,
                "tags": [
                    "EM",
                    "Ampère",
                    "Solenoide",
                    "Toroide"
                ],
                "note_type": "standard",
                "desired_retention": 0.85,
                "cards": [
                    {
                        "item_id": 1879945980023246754,
                        "type": "ClozeCard",
                        "title": "Formas de la Ley de Ampère",
                        "text": "- Integral: $\\oint_{\\mathcal{C}} \\mathbf{B} \\cdot d\\boldsymbol{\\ell} = {{c1::\\mu_0 I_{\\text{enc}}::forma integral}}$\\n- Diferencial: $\\nabla \\times \\mathbf{B} = {{c2::\\mu_0 \\mathbf{J}::rotacional de B}}$.\\n- En solenoide ideal de $n$ espiras/metro: interior $B = {{c3::\\mu_0 n I::interior solenoide}}$, exterior $B \\approx 0$.\\n- En toroide de $N$ espiras y radio medio $r$: $B(r) = {{c4::\\frac{\\mu_0 N I}{2\\pi r}::toroide}}$."
                    },
                    {
                        "item_id": 1879945980066368251,
                        "type": "ClozeCard",
                        "title": "Ley de Faraday y Ley de Lenz",
                        "text": "Principios fundamentales de la inducción electromagnética:\\n- Ley de Faraday: La fuerza electromotriz inducida en un circuito cerrado es igual al negativo de la tasa de cambio del flujo magnético: $$\\mathcal{E} = {{c1::-\\frac{d\\Phi_B}{dt}::tasa de variación del flujo}}$$ donde $\\Phi_B = \\iint_S \\mathbf{B} \\cdot d\\mathbf{A}$.\\n- Ley de Lenz: El signo negativo indica que la corriente inducida genera un campo magnético que {{c2::se opone al cambio del flujo magnético original::principio de conservación energética}}.\\n- Forma diferencial de Maxwell-Faraday: $$\\nabla \\times \\mathbf{E} = {{c3::-\\frac{\\partial \\mathbf{B}}{\\partial t}::campo eléctrico no conservativo}}$$."
                    },
                    {
                        "item_id": 1879945980067053930,
                        "type": "ProofSequenceCard",
                        "title": "Mecanismo Dual de Inducción: FEM de Movimiento vs Campo Eléctrico Inducido",
                        "premise": "Distinga formalmente los dos mecanismos físicos que producen FEM en la ley de Faraday.",
                        "steps": [
                            "Variación total del flujo: $\\frac{d\\Phi_B}{dt} = \\frac{d}{dt}\\iint_S \\mathbf{B} \\cdot d\\mathbf{A}$.",
                            "Por la regla de Leibniz para fronteras móviles: $\\frac{d}{dt}\\iint_S \\mathbf{B} \\cdot d\\mathbf{A} = \\iint_S \\frac{\\partial \\mathbf{B}}{\\partial t}\\cdot d\\mathbf{A} - \\oint_{\\partial S} (\\mathbf{v} \\times \\mathbf{B})\\cdot d\\boldsymbol{\\ell}$.",
                            "Mecanismo 1 (FEM de movimiento): Circuito en movimiento en campo estático $\\mathbf{B}$; la fuerza de Lorentz sobre portadores móviles produce $\\mathcal{E}_{\\text{mov}} = \\oint (\\mathbf{v} \\times \\mathbf{B})\\cdot d\\boldsymbol{\\ell}$.",
                            "Mecanismo 2 (Campo eléctrico inducido): Circuito en reposo en campo variable $\\mathbf{B}(t)$; la variación temporal de $\\mathbf{B}$ engendra un campo no conservativo $\\mathbf{E}_{\\text{ind}}$ tal que $\\mathcal{E}_{\\text{ind}} = \\oint \\mathbf{E}_{\\text{ind}}\\cdot d\\boldsymbol{\\ell} = -\\iint_S \\frac{\\partial \\mathbf{B}}{\\partial t}\\cdot d\\mathbf{A} \\quad \\blacksquare$."
                        ]
                    }
                ]
            },
            {
                "note_id": "em_19",
                "title": "Magnetismo en la Materia y Campo H",
                "x": 980.0,
                "y": 860.0,
                "tags": [
                    "EM",
                    "Magnetización",
                    "Campo H",
                    "Materiales"
                ],
                "note_type": "standard",
                "desired_retention": 0.85,
                "cards": [
                    {
                        "item_id": 1879945980024675854,
                        "type": "ClozeCard",
                        "title": "Magnetización y Campo Auxiliar H",
                        "text": "A partir del vector magnetización $\\mathbf{M}$:\\n- Corriente volumétrica ligada: $\\mathbf{J}_b = {{c1::\\nabla \\times \\mathbf{M}::rotacional de M}}$\\n- Corriente superficial ligada: $\\mathbf{K}_b = {{c2::\\mathbf{M} \\times \\hat{n}::salto superficial}}$\\n- Campo auxiliar: $\\mathbf{H} = {{c3::\\frac{\\mathbf{B}}{\\mu_0} - \\mathbf{M}::definición de H}}$, con $\\oint \\mathbf{H} \\cdot d\\boldsymbol{\\ell} = I_{f,\\text{enc}}$."
                    },
                    {
                        "item_id": 1879945980025022839,
                        "type": "Flashcard",
                        "title": "Condiciones de Borde en Interfaces Magnéticas",
                        "front": "¿Cuáles son las condiciones de frontera para $\\mathbf{B}$ y $\\mathbf{H}$ en la interfaz entre dos medios magnéticos?",
                        "back": "1. <b>Componente normal de $\\mathbf{B}$:</b> Es estrictamente continua:<br>$$B_{1n} - B_{2n} = 0 \\iff B_{1n} = B_{2n}$$<br>(debido a $\\nabla \\cdot \\mathbf{B} = 0$, no existen monopolos magnéticos).<br>2. <b>Componente tangencial de $\\mathbf{H}$:</b> Salto determinado por la corriente libre superficial $\\mathbf{K}_f$:<br>$$\\mathbf{H}_{1t} - \\mathbf{H}_{2t} = \\mathbf{K}_f \\times \\hat{n}$$<br>Si no hay corrientes libres superficiales ($\\mathbf{K}_f = \\mathbf{0}$): $H_{1t} = H_{2t}$."
                    },
                    {
                        "item_id": 1879945980068507850,
                        "type": "ClozeCard",
                        "title": "Barra Deslizante en Rieles con Resistencia",
                        "text": "Una barra conductora de masa $m$ y longitud $L$ se desliza a velocidad inicial $v_0$ sobre rieles paralelos sin fricción conectados por una resistencia $R$, en un campo magnético uniforme perpendicular $B \\hat{z}$:\\n- FEM inducida por movimiento: $$\\mathcal{E} = {{c1::B L v::fuerza electromotriz}}$$.\\n- Corriente inducida: $$I = \\frac{\\mathcal{E}}{R} = \\frac{B L v}{R}$$.\\n- Fuerza magnética de frenado sobre la barra: $$F_x = -I L B = {{c2::-\\frac{B^2 L^2}{R}v::fuerza retardadora proporcional a v}}$$.\\n- Ecuación de movimiento: $m \\frac{dv}{dt} = -\\frac{B^2 L^2}{R}v \\implies v(t) = {{c3::v_0 e^{-t/\\tau_m}::decaimiento exponencial}}$$, con tiempo característico $\\tau_m = \\frac{m R}{B^2 L^2}$."
                    }
                ]
            },
            {
                "note_id": "em_20",
                "title": "Inducción Electromagnética y Ley de Faraday",
                "x": 1280.0,
                "y": 860.0,
                "tags": [
                    "EM",
                    "Faraday",
                    "Lenz",
                    "Inducción"
                ],
                "note_type": "standard",
                "desired_retention": 0.85,
                "cards": [
                    {
                        "item_id": 1879945980026842416,
                        "type": "ClozeCard",
                        "title": "Leyes de Faraday y Lenz",
                        "text": "Fuerza electromotriz inducida en circuito cerrado:\\n$$\\mathcal{E} = \\oint \\mathbf{E} \\cdot d\\boldsymbol{\\ell} = {{c1::-\\frac{d\\Phi_B}{dt}::Ley de Faraday-Lenz}}$$\\nForma diferencial de Maxwell-Faraday:\\n$$\\nabla \\times \\mathbf{E} = {{c2::-\\frac{\\partial \\mathbf{B}}{\\partial t}::rotacional del campo eléctrico inducido}}$$\\nEl signo negativo de Lenz impone que la corriente inducida {{c3::se opone al cambio de flujo::regla de Lenz}}."
                    },
                    {
                        "item_id": 1879945980069587117,
                        "type": "Flashcard",
                        "title": "Definición de Autoinductancia L e Inductancia Mutua M",
                        "front": "Defina inductancia propia $L$, inductancia mutua $M_{12}$, y exprese la autoinductancia de un solenoide ideal de $n$ vueltas/metro, longitud $\\ell$ y sección $A$.",
                        "back": "1. <b>Autoinductancia:</b> $L = \\frac{N \\Phi_B}{I}$. La FEM autoinducida es $\\mathcal{E}_L = -L \\frac{di}{dt}$.<br>2. <b>Inductancia de solenoide ideal:</b> Con $B = \\mu_0 n I$ y flujo por vuelta $\\Phi_1 = B A = \\mu_0 n I A$:<br>$$L = \\frac{N (B A)}{I} = \\frac{(n \\ell)(\\mu_0 n I A)}{I} = \\mu_0 n^2 A \\ell = \\mu_0 n^2 V$$<br>3. <b>Inductancia Mutua y Reciprocidad:</b> $M_{12} = \\frac{N_2 \\Phi_{21}}{I_1} = M_{21} = M$.<br>4. <b>Densidad de energía magnética:</b> $u_B = \\frac{B^2}{2\\mu_0}$, y energía total $U_B = \\frac{1}{2} L I^2$."
                    },
                    {
                        "item_id": 1879945980071131076,
                        "type": "ClozeCard",
                        "title": "Transitorio RL Serie",
                        "text": "En un circuito con fuente $\\mathcal{E}$, resistencia $R$ e inductor $L$ cerrado en $t = 0$ con $i(0) = 0$:\\n- Ecuación diferencial: $$\\mathcal{E} - L\\frac{di}{dt} - R i = 0$$\\n- Crecimiento de corriente: $$i(t) = {{c1::\\frac{\\mathcal{E}}{R}(1 - e^{-t/\\tau_L})::corriente en circuito RL}}$$ donde la constante inductiva es $\\tau_L = {{c2::\\frac{L}{R}::constante de tiempo RL}}$.\\n- Desconexión de la fuente: $$i(t) = {{c3::I_0 e^{-t/\\tau_L}::decaimiento de corriente}}$$."
                    }
                ]
            },
            {
                "note_id": "em_21",
                "title": "FEM de Movimiento y Rieles Deslizantes",
                "x": 380.0,
                "y": 1120.0,
                "tags": [
                    "EM",
                    "FEM de Movimiento",
                    "Rieles"
                ],
                "note_type": "standard",
                "desired_retention": 0.85,
                "cards": [
                    {
                        "item_id": 1879945980028047237,
                        "type": "ProofSequenceCard",
                        "title": "Conservación de Energía en Barra Deslizante sobre Rieles",
                        "premise": "Demostrar que la potencia mecánica suministrada a una barra deslizante perpendicular a rieles coincide con la disipada por Joule.",
                        "steps": [
                            "FEM inducida de movimiento: $\\mathcal{E} = v B L$, corriente $I = \\frac{\\mathcal{E}}{R} = \\frac{v B L}{R}$.",
                            "Fuerza magnética de frenado de Lorentz: $F_m = I L B = \\frac{v B^2 L^2}{R}$.",
                            "Potencia mecánica requerida: $P_{\\text{mec}} = F_m v = \\frac{v^2 B^2 L^2}{R}$.",
                            "Potencia disipada en la resistencia: $P_{\\text{dis}} = I^2 R = \\left(\\frac{v B L}{R}\\right)^2 R = \\frac{v^2 B^2 L^2}{R}$.",
                            "Se verifica estrictamente: $P_{\\text{mec}} = P_{\\text{dis}}$."
                        ]
                    },
                    {
                        "item_id": 1879945980028548786,
                        "type": "Flashcard",
                        "title": "Disco de Faraday (Generador Homopolar)",
                        "front": "Un disco conductor de radio $R$ gira con velocidad angular constante $\\omega$ en un campo magnético uniforme paralelo a su eje $\\mathbf{B} = B\\hat{z}$. Calcule la FEM inducida entre el centro y el borde.",
                        "back": "1. Cada elemento radial a distancia $r$ se mueve a velocidad $v(r) = \\omega r$.<br>2. Campo eléctrico de Lorentz de movimiento: $\\mathbf{E}_m = \\mathbf{v} \\times \\mathbf{B} = (\\omega r \\hat{\\theta}) \\times (B \\hat{z}) = \\omega r B \\hat{r}$.<br>3. La FEM entre el eje y el borde del disco es:<br>$$\\mathcal{E} = \\int_0^R \\mathbf{E}_m \\cdot d\\mathbf{r} = \\int_0^R \\omega B r \\, dr = \\frac{1}{2} B \\omega R^2$$"
                    },
                    {
                        "item_id": 1879945980072823205,
                        "type": "Flashcard",
                        "title": "Las 3 Integrales Clásicas de Biot-Savart en Examen",
                        "front": "Escriba los resultados de las 3 integrales indefinidas más recurrentes en problemas de electrostática y Biot-Savart.",
                        "back": "1. <b>Integral tipo Biot-Savart transversal:</b><br>$$\\int \\frac{dx}{(x^2 + a^2)^{3/2}} = \\frac{x}{a^2 \\sqrt{x^2 + a^2}} + C$$<br>2. <b>Integral tipo Biot-Savart con numerador $x$:</b><br>$$\\int \\frac{x \\, dx}{(x^2 + a^2)^{3/2}} = -\\frac{1}{\\sqrt{x^2 + a^2}} + C$$<br>3. <b>Integral logarítmica de alambre:</b><br>$$\\int \\frac{dx}{\\sqrt{x^2 + a^2}} = \\ln\\left(x + \\sqrt{x^2 + a^2}\\right) + C$$"
                    },
                    {
                        "item_id": 1879945980073740485,
                        "type": "ClozeCard",
                        "title": "Análisis Dimensional y Unidades SI en Electromagnetismo",
                        "text": "Unidades fundamentales para verificar dimensiones en la I2:\\n- Campo Eléctrico: $[\\mathbf{E}] = {{c1::\\text{V/m} = \\text{N/C}::unidades de E}}$\\n- Desplazamiento Eléctrico: $[\\mathbf{D}] = {{c2::\\text{C/m}^2::unidades de D}}$\\n- Campo Magnético: $[\\mathbf{B}] = {{c3::\\text{T} = \\frac{\\text{N}}{\\text{A}\\cdot\\text{m}} = \\frac{\\text{kg}}{\\text{s}^2\\cdot\\text{A}}::unidades de B}}$\\n- Campo Auxiliar H: $[\\mathbf{H}] = {{c4::\\text{A/m}::unidades de H}}$\\n- Inductancia: $[L] = {{c5::\\text{H} = \\Omega \\cdot \\text{s} = \\frac{\\text{T}\\cdot\\text{m}^2}{\\text{A}}::unidades de inductancia}}$."
                    }
                ]
            },
            {
                "note_id": "em_22",
                "title": "Inductancia, Reciprocidad y Transitorios RL",
                "x": 680.0,
                "y": 1120.0,
                "tags": [
                    "EM",
                    "Inductancia",
                    "Reciprocidad",
                    "RL"
                ],
                "note_type": "standard",
                "desired_retention": 0.85,
                "cards": [
                    {
                        "item_id": 1879945980029296425,
                        "type": "ClozeCard",
                        "title": "Inductancia y Densidad de Energía Magnética",
                        "text": "- Teorema de reciprocidad: ${{c1::M_{12} = M_{21} = M::igualdad de inductancias mutuas}}$.\\n- Energía en un inductor: $U_B = {{c2::\\frac{1}{2} L I^2::energía inductor}}$.\\n- Densidad volumétrica de energía magnética: $u_B = {{c3::\\frac{B^2}{2\\mu_0} = \\frac{1}{2}\\mathbf{B}\\cdot\\mathbf{H}::densidad magnética}}$.\\n- Constante de tiempo de circuito RL: $\\tau_L = {{c4::\\frac{L}{R}::constante de tiempo RL}}$."
                    }
                ]
            },
            {
                "note_id": "em_00",
                "title": "Filosofía de Corrección FIS1533 y Rescate de Puntos",
                "x": 80.0,
                "y": 40.0,
                "tags": [
                    "EM",
                    "Rúbrica",
                    "Estrategia"
                ],
                "note_type": "standard",
                "desired_retention": 0.85,
                "cards": [
                    {
                        "item_id": 1879945980030759705,
                        "type": "ClozeCard",
                        "title": "Doctrina Oficial de Arrastre de Error (Error-Carrying)",
                        "text": "En las pautas de corrección de FIS1533:\\n1. Si cometes un error algebraico en la parte (a), pero en la parte (b) utilizas tu resultado erróneo con {{c1::la metodología y ecuaciones correctas::consistencia formal}}, recibes {{c2::el 100% del puntaje metodológico::puntaje completo}} de la parte (b).\\n2. <b>Parametrización de Emergencia:</b> Si te bloqueas en una integral complicada, define formalmente {{c3::$I_0 = \\int \\dots$::constante intermedia}} y continúa resolviendo las partes siguientes en función de $I_0$ para salvar hasta el {{c4::80% del puntaje total::máximo puntaje rescatable}}."
                    },
                    {
                        "item_id": 1879945980031522608,
                        "type": "Flashcard",
                        "title": "Protocolo Universal de 4 Pasos para Todo Ejercicio de la I2",
                        "front": "¿Cuáles son los 4 pasos sistemáticos indispensables para abordar cualquier problema de FIS1533 asegurando el máximo puntaje?",
                        "back": "1. <b>Diagrama y Sistema de Coordenadas:</b> Dibujar el sistema, elegir el origen, explicitar vectores unitarios ($\\hat{r}, \\hat{\\theta}, \\hat{\\phi}, \\hat{z}$) y sentidos de corriente.<br>2. <b>Ecuación Física Fundamental:</b> Escribir la ley matriz aplicable en forma diferencial o integral (Gauss, Biot-Savart, Ampère, Faraday, Ohm, Kirchhoff).<br>3. <b>Condiciones de Borde / Simetría / Integración:</b> Justificar cancelaciones por simetría impar o condiciones de interfaz.<br>4. <b>Sanity Checks:</b> Verificación dimensional y análisis de límites asintóticos ($r \\to 0$, $r \\to \\infty$, $z \\gg R$)."
                    }
                ]
            }
        ],
        "edges": [
            {
                "source_id": "em_01",
                "target_id": "em_02",
                "label": "Operadores a Polarización"
            },
            {
                "source_id": "em_02",
                "target_id": "em_03",
                "label": "Polarización a Desplazamiento"
            },
            {
                "source_id": "em_03",
                "target_id": "em_04",
                "label": "Gauss a Condiciones de Borde"
            },
            {
                "source_id": "em_04",
                "target_id": "em_05",
                "label": "Bordes a Esfera Dieléctrica"
            },
            {
                "source_id": "em_03",
                "target_id": "em_06",
                "label": "D a Capacitancia Multicapa"
            },
            {
                "source_id": "em_06",
                "target_id": "em_07",
                "label": "Capacitancia a Fuerzas Virtuales"
            },
            {
                "source_id": "em_02",
                "target_id": "em_08",
                "label": "Cargas a Densidad de Corriente"
            },
            {
                "source_id": "em_08",
                "target_id": "em_09",
                "label": "Continuidad a Modelo de Drude"
            },
            {
                "source_id": "em_09",
                "target_id": "em_10",
                "label": "Resistencia a Thévenin"
            },
            {
                "source_id": "em_10",
                "target_id": "em_11",
                "label": "Thévenin a Transitorios RC"
            },
            {
                "source_id": "em_01",
                "target_id": "em_12",
                "label": "Fuerzas a Dinámica de Lorentz"
            },
            {
                "source_id": "em_12",
                "target_id": "em_13",
                "label": "Lorentz a Efecto Hall"
            },
            {
                "source_id": "em_12",
                "target_id": "em_14",
                "label": "Lorentz a Espiras y Torques"
            },
            {
                "source_id": "em_14",
                "target_id": "em_15",
                "label": "Corrientes a Biot-Savart"
            },
            {
                "source_id": "em_15",
                "target_id": "em_16",
                "label": "Biot-Savart a Espiras y Helmholtz"
            },
            {
                "source_id": "em_15",
                "target_id": "em_17",
                "label": "Biot-Savart a Fuerzas entre Hilos"
            },
            {
                "source_id": "em_16",
                "target_id": "em_18",
                "label": "Biot-Savart a Ley de Ampère"
            },
            {
                "source_id": "em_18",
                "target_id": "em_19",
                "label": "Ampère libre a Magnetización M"
            },
            {
                "source_id": "em_16",
                "target_id": "em_20",
                "label": "Flujo Magnético a Faraday-Lenz"
            },
            {
                "source_id": "em_20",
                "target_id": "em_21",
                "label": "Faraday a FEM de Movimiento"
            },
            {
                "source_id": "em_20",
                "target_id": "em_22",
                "label": "Faraday a Autoinductancia y Energía"
            },
            {
                "source_id": "em_00",
                "target_id": "em_01",
                "label": ""
            },
            {
                "source_id": "em_03",
                "target_id": "em_05",
                "label": ""
            },
            {
                "source_id": "em_05",
                "target_id": "em_06",
                "label": ""
            },
            {
                "source_id": "em_01",
                "target_id": "em_07",
                "label": ""
            },
            {
                "source_id": "em_07",
                "target_id": "em_08",
                "label": ""
            },
            {
                "source_id": "em_06",
                "target_id": "em_09",
                "label": ""
            },
            {
                "source_id": "em_01",
                "target_id": "em_10",
                "label": ""
            },
            {
                "source_id": "em_10",
                "target_id": "em_12",
                "label": ""
            },
            {
                "source_id": "em_13",
                "target_id": "em_14",
                "label": ""
            },
            {
                "source_id": "em_01",
                "target_id": "em_15",
                "label": ""
            },
            {
                "source_id": "em_16",
                "target_id": "em_17",
                "label": ""
            },
            {
                "source_id": "em_13",
                "target_id": "em_18",
                "label": ""
            },
            {
                "source_id": "em_18",
                "target_id": "em_20",
                "label": ""
            },
            {
                "source_id": "em_14",
                "target_id": "em_21",
                "label": ""
            },
            {
                "source_id": "em_17",
                "target_id": "em_21",
                "label": ""
            }
        ]
    },
    {
        "name": "Análisis Real (I3)",
        "folder_path": "",
        "notes": [
            {
                "note_id": "ar_01",
                "title": "Espacios Métricos y Topología Relativa",
                "x": 80.0,
                "y": 80.0,
                "tags": [
                    "Análisis Real",
                    "Topología",
                    "Abiertos",
                    "Cerrados"
                ],
                "note_type": "standard",
                "desired_retention": 0.85,
                "cards": [
                    {
                        "item_id": 1879945980076819756,
                        "type": "ClozeCard",
                        "title": "Axiomas Métricos y Topología Relativa",
                        "text": "Axiomas métricos: no negatividad, separación $d(x, y)=0 \\iff x=y$, simetría y {{c1::desigualdad triangular $d(x, z) \\le d(x, y) + d(y, z)$::desigualdad triangular}}.\\nEn subespacio $S \\subseteq X$, un conjunto $U_S$ es abierto relativo si y sólo si ${{c2::U_S = U \\cap S::abierto relativo}}$ con $U$ abierto en $X$."
                    },
                    {
                        "item_id": 1879945980078274591,
                        "type": "Flashcard",
                        "title": "Bolas en la Métrica Discreta",
                        "front": "Sea $X$ dotado de la métrica discreta $d(x, y) = 1$ si $x \\ne y$ y $0$ si $x = y$. Describa las bolas abiertas $B(x, r)$ para $r \\le 1$ y $r > 1$.",
                        "back": "1. <b>Para $r \\le 1$:</b> $B(x, r) = \\{y \\in X : d(x, y) < r\\} = \\{x\\}$ (el singleton individual). En consecuencia, todo subconjunto de $X$ es abierto (y por ende también cerrado).<br>2. <b>Para $r > 1$:</b> $B(x, r) = X$ (todo el espacio métrico)."
                    },
                    {
                        "item_id": 1879945980116778517,
                        "type": "ClozeCard",
                        "title": "Definición Cuantificada de Convergencia Uniforme",
                        "text": "Dada una sucesión de funciones $f_n: E \\to \\mathbb{R}$:\\n- Convergencia puntual ($f_n \\to f$ en $E$): $$\\forall x \\in E, \\; \\forall \\varepsilon > 0, \\; \\exists N(x, \\varepsilon) \\in \\mathbb{N}, \\; \\forall n \\ge N \\implies |f_n(x) - f(x)| < \\varepsilon$$\\n- Convergencia uniforme ($f_n \\rightrightarrows f$ en $E$): $$\\forall \\varepsilon > 0, \\; \\exists N(\\varepsilon) \\in \\mathbb{N}, \\; \\forall n \\ge N, \\; \\forall x \\in E \\implies {{c1::|f_n(x) - f(x)| < \\varepsilon::cota universal en todo E}}$$\\n- Criterio del Supremo: $f_n \\rightrightarrows f$ en $E \\iff {{c2::\\lim_{n\\to\\infty} \\sup_{x \\in E} |f_n(x) - f(x)| = 0::norma infinito tiende a cero}}$."
                    },
                    {
                        "item_id": 1879945980117944421,
                        "type": "Flashcard",
                        "title": "Romper Convergencia Uniforme: Evaluación en Sucesión Móvil",
                        "front": "¿Cómo se utiliza una sucesión de puntos móviles $x_n \\in E$ para demostrar que una sucesión de funciones no converge uniformemente?",
                        "back": "Si $f_n(x) \\to f(x)$ puntualmente en $E$, para demostrar que $f_n \\not\\rightrightarrows f$ en $E$ basta encontrar una sucesión de puntos $x_n \\in E$ tal que:<br>$$\\lim_{n \\to \\infty} |f_n(x_n) - f(x_n)| \\ne 0 \\quad (\\text{o } \\limsup_{n \\to \\infty} |f_n(x_n) - f(x_n)| \\ge c > 0)$$<br>Ejemplo canónico: $f_n(x) = \\frac{n x}{1 + n^2 x^2}$ en $[0, 1]$. Para cada $x$ fijo, $f_n(x) \\to 0$.<br>Evaluando en $x_n = \\frac{1}{n} \\in [0, 1]$: $f_n(1/n) = \\frac{n(1/n)}{1 + n^2(1/n^2)} = \\frac{1}{1 + 1} = \\frac{1}{2} \\not\\to 0$.<br>Por lo tanto, la convergencia <b>no</b> es uniforme en $[0, 1]$."
                    }
                ]
            },
            {
                "note_id": "ar_02",
                "title": "Caracterizaciones de Continuidad Global",
                "x": 380.0,
                "y": 80.0,
                "tags": [
                    "Análisis Real",
                    "Continuidad",
                    "Preimágenes"
                ],
                "note_type": "standard",
                "desired_retention": 0.85,
                "cards": [
                    {
                        "item_id": 1879945980078550406,
                        "type": "ClozeCard",
                        "title": "Cuatro Caracterizaciones Equivalentes de Continuidad",
                        "text": "Para $f: X \\to Y$, son equivalentes:\\n(i) $\\forall U \\subseteq Y$ abierto $\\implies f^{-1}(U)$ es {{c1::abierto en X::preimagen de abiertos}}.\\n(ii) $\\forall F \\subseteq Y$ cerrado $\\implies f^{-1}(F)$ es {{c2::cerrado en X::preimagen de cerrados}}.\\n(iii) $\\forall A \\subseteq X \\implies f(\\overline{A}) \\subseteq {{c3::\\overline{f(A)}::preservación de clausuras}}$.\\n(iv) Continuidad secuencial: $x_n \\to x_0 \\implies f(x_n) \\to f(x_0)$."
                    },
                    {
                        "item_id": 1879945980080511413,
                        "type": "Flashcard",
                        "title": "Falla de Conexidad en Preimágenes",
                        "front": "¿Preserva la continuidad la conexidad en preimágenes? Muestre un contraejemplo donde $V$ es conexo pero $f^{-1}(V)$ es disconexo.",
                        "back": "<b>Respuesta:</b> NO. La continuidad preserva conexidad en la <b>imagen directa</b> ($f(X)$ es conexo), pero NO en preimágenes.<br><b>Contraejemplo:</b> $f: \\mathbb{R} \\to \\mathbb{R}$ dada por $f(x) = x^2$ es continua. El intervalo $V = (1, 4)$ es conexo en $\\mathbb{R}$.<br>Sin embargo, su preimagen es:<br>$$f^{-1}((1, 4)) = (-2, -1) \\cup (1, 2)$$<br>la cual es unión disjunta de dos abiertos no vacíos, luego es <b>disconexa</b>."
                    },
                    {
                        "item_id": 1879945980118452176,
                        "type": "ClozeCard",
                        "title": "Convergencia Uniforme en Subintervalos Compactos",
                        "text": "Para la familia $f_n(x) = \\frac{n x}{1 + n^2 x^2}$:\\n1. En $[0, 1]$, la convergencia <b>no</b> es uniforme pues el pico de altura $1/2$ ocurre en $x_n = 1/n \\to 0$.\\n2. Sin embargo, en cualquier subintervalo compacto $[a, 1]$ con $a > 0$:\\nPara $n$ tal que $1/n < a$, la función es decreciente en $[a, 1]$, luego: $$\\sup_{x \\in [a, 1]} |f_n(x)| = f_n(a) = {{c1::\\frac{n a}{1 + n^2 a^2}::valor en el extremo a}} \\le \\frac{n a}{n^2 a^2} = {{c2::\\frac{1}{n a} \\to 0::cota uniforme}}$$\\nPor lo tanto, $f_n \\rightrightarrows 0$ uniformemente en {{c3::$[a, 1]$ para todo $a > 0$::subdominio que excluye el origen}}."
                    },
                    {
                        "item_id": 1879945980119494763,
                        "type": "ProofSequenceCard",
                        "title": "Límite Uniforme de Funciones Acotadas es Acotado",
                        "premise": "Demuestre que si $f_n: E \\to \\mathbb{R}$ son funciones acotadas y $f_n \\rightrightarrows f$ uniformemente en $E$, entonces el límite $f$ es acotado.",
                        "steps": [
                            "Por definición de convergencia uniforme con $\\varepsilon = 1$: existe $N \\in \\mathbb{N}$ tal que para todo $x \\in E$, $|f_N(x) - f(x)| < 1$.",
                            "Puesto que $f_N$ es acotada por hipótesis, existe $M_N < \\infty$ tal que $|f_N(x)| \\le M_N$ para todo $x \\in E$.",
                            "Aplicando la desigualdad triangular: $|f(x)| = |f(x) - f_N(x) + f_N(x)| \\le |f(x) - f_N(x)| + |f_N(x)|$.",
                            "Sustituyendo las cotas: $|f(x)| < 1 + M_N$ para todo $x \\in E$.",
                            "Por lo tanto, $f$ es acotada en $E$ por la constante $M = M_N + 1 \\quad \\blacksquare$."
                        ]
                    }
                ]
            },
            {
                "note_id": "ar_03",
                "title": "Condiciones Lipschitz y Hölder",
                "x": 680.0,
                "y": 80.0,
                "tags": [
                    "Análisis Real",
                    "Lipschitz",
                    "Hölder"
                ],
                "note_type": "standard",
                "desired_retention": 0.85,
                "cards": [
                    {
                        "item_id": 1879945980080573164,
                        "type": "ClozeCard",
                        "title": "Funciones Lipschitz y Hölder",
                        "text": "- Lipschitz: $d_Y(f(x), f(x')) \\le L d_X(x, x') \\implies$ uniformemente continua con $\\delta = {{c1::\\varepsilon / L::delta Lipschitz}}$.\\n- Hölder de orden $\\alpha \\in (0, 1]$: $d_Y(f(x), f(x')) \\le C (d_X(x, x'))^\\alpha \\implies$ uniformemente continua con $\\delta = {{c2::(\\varepsilon / C)^{1/\\alpha}::delta Hölder}}$.\\n- Refutación secuencial: $f$ es discontinua si existe $x_n \\to x_0$ con {{c3::f(x_n) \\not\\to f(x_0)::falla secuencial}}."
                    },
                    {
                        "item_id": 1879945980082494180,
                        "type": "Flashcard",
                        "title": "Función Hölder no Lipschitziana",
                        "front": "Muestre que la función $f(x) = \\sqrt{x}$ en $[0, 1]$ es $1/2$-Hölder continua pero NO es Lipschitziana.",
                        "back": "1. <b>Hölder $\\alpha = 1/2$:</b> Para $x, y \\ge 0$, se cumple $|\\sqrt{x} - \\sqrt{y}| \\le \\sqrt{|x - y|}$. Por ende es $1/2$-Hölder con constante $C = 1$.<br>2. <b>No Lipschitz:</b> Evaluando en $y = 0$: $\\frac{|f(x) - f(0)|}{|x - 0|} = \\frac{\\sqrt{x}}{x} = \\frac{1}{\\sqrt{x}} \\to \\infty$ cuando $x \\to 0^+$. Al no ser el cociente acotado, no existe constante $L$ finita."
                    },
                    {
                        "item_id": 1879945980120514794,
                        "type": "ClozeCard",
                        "title": "Criterio M de Weierstrass para Series de Funciones",
                        "text": "Sea $\\sum_{n=1}^\\infty f_n(x)$ una serie de funciones en $E$. Si existe una sucesión de constantes reales $M_n \\ge 0$ tales que:\\n1. $|f_n(x)| \\le M_n$ para todo $x \\in E$ y todo $n \\in \\mathbb{N}$.\\n2. La serie numérica converge: $$\\sum_{n=1}^\\infty M_n < \\infty$$\\nEntonces la serie de funciones $\\sum f_n(x)$ converge {{c1::absoluta y uniformemente en $E$::doble convergencia}}.\\nSi además cada $f_n$ es continua, la suma $S(x) = \\sum f_n(x)$ es {{c2::continua en $E$::preservación de continuidad}}."
                    },
                    {
                        "item_id": 1879945980122151032,
                        "type": "Flashcard",
                        "title": "Criterio de Cauchy Uniforme",
                        "front": "Enuncie el Criterio de Cauchy Uniforme y explique por qué es fundamental para probar convergencia uniforme sin conocer el límite a priori.",
                        "back": "<b>Enunciado:</b> Una sucesión de funciones $f_n: E \\to \\mathbb{R}$ converge uniformemente en $E$ si y solo si:<br>$$\\forall \\varepsilon > 0, \\; \\exists N \\in \\mathbb{N}, \\; \\forall n, m \\ge N, \\; \\forall x \\in E \\implies |f_n(x) - f_m(x)| < \\varepsilon$$<br><b>Importancia metodológica:</b> Permite demostrar que una sucesión o serie converge uniformemente directamente a partir de sus términos algebraicos, sin necesidad de calcular explícitamente ni adivinar la función límite $f(x)$."
                    }
                ]
            },
            {
                "note_id": "ar_04",
                "title": "Álgebra Continua y Coincidencia en Densos",
                "x": 980.0,
                "y": 80.0,
                "tags": [
                    "Análisis Real",
                    "Álgebra",
                    "Densidad"
                ],
                "note_type": "standard",
                "desired_retention": 0.85,
                "cards": [
                    {
                        "item_id": 1879945980083419658,
                        "type": "Flashcard",
                        "title": "Teorema de Coincidencia en Subconjuntos Densos",
                        "front": "Sean $f, g: X \\to Y$ continuas con $Y$ métrico. Pruebe que $\\{x : f(x) = g(x)\\}$ es cerrado y que si coinciden en un denso $D$, coinciden en todo $X$.",
                        "back": "1. La función $h(x) = d_Y(f(x), g(x))$ es continua. El conjunto de coincidencia es $E = h^{-1}(\\{0\\})$, que es cerrado por ser preimagen de un cerrado.<br>2. Si $f|_D = g|_D$, entonces $D \\subseteq E$. Tomando clausuras: $X = \\overline{D} \\subseteq \\overline{E} = E$, por lo que $E = X$, demostrando $f \\equiv g$."
                    },
                    {
                        "item_id": 1879945980123847481,
                        "type": "ProofSequenceCard",
                        "title": "Demostración del Teorema de Continuidad del Límite Uniforme",
                        "premise": "Demuestre que si $f_n \\in C(E)$ y $f_n \\rightrightarrows f$ uniformemente en $E$, entonces $f \\in C(E)$.",
                        "steps": [
                            "Sea $x_0 \\in E$ arbitrario y fijemos $\\varepsilon > 0$. Deseamos hallar $\\delta > 0$ tal que $d(x, x_0) < \\delta \\implies |f(x) - f(x_0)| < \\varepsilon$.",
                            "Por convergencia uniforme: existe $N \\in \\mathbb{N}$ tal que para todo $x \\in E$, $|f_N(x) - f(x)| < \\varepsilon/3$.",
                            "Puesto que $f_N$ es continua en $x_0$: existe $\\delta > 0$ tal que $d(x, x_0) < \\delta \\implies |f_N(x) - f_N(x_0)| < \\varepsilon/3$.",
                            "Descomponer mediante desigualdad triangular insertando $f_N(x)$ y $f_N(x_0)$:<br>$|f(x) - f(x_0)| \\le |f(x) - f_N(x)| + |f_N(x) - f_N(x_0)| + |f_N(x_0) - f(x_0)|$.",
                            "Para todo $x$ con $d(x, x_0) < \\delta$: $|f(x) - f(x_0)| < \\frac{\\varepsilon}{3} + \\frac{\\varepsilon}{3} + \\frac{\\varepsilon}{3} = \\varepsilon$.",
                            "Por lo tanto, $f$ es continua en $x_0$, y como $x_0$ fue arbitrario, $f$ es continua en todo $E \\quad \\blacksquare$."
                        ]
                    },
                    {
                        "item_id": 1879945980125307136,
                        "type": "ClozeCard",
                        "title": "Punto Móvil en Convergencia Uniforme",
                        "text": "Si $f_n \\rightrightarrows f$ uniformemente en $E$ y $f$ es continua, entonces para <b>toda</b> sucesión $x_n \\to x_0$ en $E$:\\n$$\\lim_{n\\to\\infty} f_n(x_n) = {{c1::f(x_0)::límite conjunto}}$$\\nDemostración por descomposición triangular:\\n$|f_n(x_n) - f(x_0)| \\le |f_n(x_n) - f(x_n)| + |f(x_n) - f(x_0)| \\le {{c2::\\|f_n - f\\|_\\infty + |f(x_n) - f(x_0)| \\to 0::suma de infinitésimos}}$."
                    }
                ]
            },
            {
                "note_id": "ar_05",
                "title": "Función Distancia d(x, A) y Clausura",
                "x": 1280.0,
                "y": 80.0,
                "tags": [
                    "Análisis Real",
                    "Distancia",
                    "1-Lipschitz",
                    "Clausura"
                ],
                "note_type": "standard",
                "desired_retention": 0.85,
                "cards": [
                    {
                        "item_id": 1879945980084005009,
                        "type": "ProofSequenceCard",
                        "title": "Demostración de que d(x, A) es 1-Lipschitz",
                        "premise": "Demostrar que $|d(x, A) - d(y, A)| \\le d(x, y)$ para todo $x, y \\in X$.",
                        "steps": [
                            "Para cualquier $a \\in A$, por desigualdad triangular: $d(x, a) \\le d(x, y) + d(y, a)$.",
                            "Tomando ínfimo sobre $a \\in A$ en la derecha: $d(x, a) \\le d(x, y) + d(y, A)$.",
                            "Tomando ínfimo sobre $a$ a la izquierda: $d(x, A) \\le d(x, y) + d(y, A) \\implies d(x, A) - d(y, A) \\le d(x, y)$.",
                            "Por simetría intercambiando $x$ e $y$: $d(y, A) - d(x, A) \\le d(x, y)$.",
                            "Conclusión: $|d(x, A) - d(y, A)| \\le d(x, y)$, probando que $d(\\cdot, A)$ es 1-Lipschitz."
                        ]
                    },
                    {
                        "item_id": 1879945980085484302,
                        "type": "ClozeCard",
                        "title": "Clausura Topológica con la Distancia",
                        "text": "Un punto $x$ pertenece a la clausura $\\overline{A}$ si y sólo si:\\n$$d(x, A) = {{c1::0::distancia nula}}$$\\nSi $A$ es cerrado: $x \\in A \\iff d(x, A) = 0$."
                    },
                    {
                        "item_id": 1879945980125657841,
                        "type": "ClozeCard",
                        "title": "Las 3 Hipótesis Indispensables del Teorema de Dini",
                        "text": "Sea $K$ un espacio métrico y $f_n: K \\to \\mathbb{R}$ una sucesión de funciones continuas. El Teorema de Dini garantiza que $f_n \\rightrightarrows f$ uniformemente si se cumplen <b>exactamente</b> estas 3 hipótesis:\\n1. El dominio $K$ es {{c1::compacto::condición topológica fundamental}}.\\n2. La sucesión es {{c2::monótona puntual::creciente o decreciente}} ($f_n(x) \\le f_{n+1}(x)$ o viceversa para todo $x$).\\n3. La función límite puntual $f$ es {{c3::continua en $K$::regularidad del límite}}."
                    },
                    {
                        "item_id": 1879945980126800729,
                        "type": "Flashcard",
                        "title": "Los 3 Contraejemplos si Falla una Hipótesis de Dini",
                        "front": "Muestre tres contraejemplos donde falla exactamente una de las hipótesis de Dini y la convergencia deja de ser uniforme.",
                        "back": "1. <b>Falla Compacidad:</b> $f_n(x) = \\frac{1}{1 + n x}$ en $(0, 1)$ (abierto). Es monótona decreciente, límite $f(0) = 0$ continuo en $(0,1)$, pero no uniforme pues $\\sup |f_n| = 1$.<br>2. <b>Falla Monotonía:</b> $f_n(x) = \\frac{n x}{1 + n^2 x^2}$ en $[0, 1]$ (compacto). Dominio compacto, límite continuo $f \\equiv 0$, pero para $x$ fijo $f_n(x)$ primero crece y luego decrece (no monótona); $f_n(1/n) = 1/2 \\not\\to 0$.<br>3. <b>Falla Continuidad del Límite:</b> $f_n(x) = x^n$ en $[0, 1]$ (compacto). Monótona decreciente, pero el límite puntual $f(x) = 0$ en $[0,1)$ y $f(1)=1$ es discontinuo."
                    }
                ]
            },
            {
                "note_id": "ar_06",
                "title": "Separación de Urysohn y Compacto-Cerrado",
                "x": 80.0,
                "y": 340.0,
                "tags": [
                    "Análisis Real",
                    "Urysohn",
                    "Separación"
                ],
                "note_type": "standard",
                "desired_retention": 0.85,
                "cards": [
                    {
                        "item_id": 1879945980087219633,
                        "type": "Flashcard",
                        "title": "Construcción Explícita del Lema de Urysohn Métrico",
                        "front": "Dados dos cerrados disjuntos $A, B \\subset X$, construya una función continua que separe $f|_A \\equiv 0$ y $f|_B \\equiv 1$.",
                        "back": "Como $A \\cap B = \\emptyset$ y son cerrados, $d(x, A) + d(x, B) > 0 \\quad \\forall x \\in X$.<br>Se define:<br>$$f(x) = \\frac{d(x, A)}{d(x, A) + d(x, B)}$$<br>1. $x \\in A \\implies d(x, A) = 0 \\implies f(x) = 0$.<br>2. $x \\in B \\implies d(x, B) = 0 \\implies f(x) = 1$.<br>3. Es continua por ser cociente de funciones 1-Lipschitz con denominador no nulo."
                    },
                    {
                        "item_id": 1879945980088030138,
                        "type": "ClozeCard",
                        "title": "Separación entre Compacto y Cerrado Disjuntos",
                        "text": "Si $K$ es compacto, $F$ es cerrado y $K \\cap F = \\emptyset$:\\n$$\\text{dist}(K, F) = \\inf_{x \\in K, y \\in F} d(x, y) {{c1::> 0 (es estrictamente positiva)::cota de separación}}$$\\nFalla si ninguno es compacto: $y = 0$ y $x y = 1$ en $\\mathbb{R}^2$ tienen distancia {{c2::0 (cero)::distancia asintótica}}."
                    },
                    {
                        "item_id": 1879945980127941047,
                        "type": "Flashcard",
                        "title": "Completitud del Espacio de Banach (C(K), ||.||_inf)",
                        "front": "Demuestre que para cualquier espacio métrico compacto $K$, el espacio $C(K, \\mathbb{R})$ con la norma del supremo $\\|f\\|_\\infty = \\max_{x \\in K}|f(x)|$ es un espacio métrico completo (espacio de Banach).",
                        "back": "1. Sea $(f_n)$ una sucesión de Cauchy en $(C(K), \\|\\cdot\\|_\\infty)$. Para cada $\\varepsilon > 0$, existe $N$ tal que $\\forall n, m \\ge N$, $\\sup_{x \\in K}|f_n(x) - f_m(x)| < \\varepsilon$.<br>2. Para cada $x \\in K$ fijo: $|f_n(x) - f_m(x)| \\le \\|f_n - f_m\\|_\\infty < \\varepsilon$, luego $(f_n(x))$ es una sucesión de Cauchy en $\\mathbb{R}$.<br>3. Por completitud de $\\mathbb{R}$, existe el límite puntual $f(x) = \\lim_{n\\to\\infty} f_n(x)$.<br>4. Tomando $m \\to \\infty$ en la desigualdad de Cauchy: $|f_n(x) - f(x)| \\le \\varepsilon$ para todo $n \\ge N$ y todo $x \\in K$, lo que prueba que $f_n \\rightrightarrows f$ uniformemente.<br>5. Por el teorema de continuidad del límite uniforme, $f$ es continua en $K$, luego $f \\in C(K)$. Así, $C(K)$ es completo $\\blacksquare$."
                    },
                    {
                        "item_id": 1879945980128813631,
                        "type": "ClozeCard",
                        "title": "El Espacio C1([a,b]): Completo en su Norma, Incompleto en Norma Infinito",
                        "text": "En el espacio de funciones continuamente diferenciables $C^1([a, b])$:\\n- Con la norma natural $\\|f\\|_{C^1} = {{c1::\\|f\\|_\\infty + \\|f'\\|_\\infty::norma C1}}$, el espacio es {{c2::completo (espacio de Banach)::propiedad métrica}}.\\n- Con la norma del supremo $\\|\\cdot\\|_\\infty$, el espacio $C^1([a, b])$ es {{c3::incompleto y denso en $C([a, b])$::falta de completitud}}, pues existen sucesiones de funciones $C^1$ (como aproximaciones suaves de $|x|$) que convergen uniformemente a funciones que no son derivables."
                    }
                ]
            },
            {
                "note_id": "ar_07",
                "title": "Continuidad y Teorema de Weierstrass",
                "x": 380.0,
                "y": 340.0,
                "tags": [
                    "Análisis Real",
                    "Compacidad",
                    "Weierstrass"
                ],
                "note_type": "standard",
                "desired_retention": 0.85,
                "cards": [
                    {
                        "item_id": 1879945980088964127,
                        "type": "ClozeCard",
                        "title": "Preservación de Compacidad y Teorema de Extremos",
                        "text": "Si $f: X \\to Y$ es continua y $K \\subseteq X$ es compacto, $f(K)$ es {{c1::compacto en Y::propiedad de la imagen}}.\\nTeorema de Weierstrass: Toda $f: K \\to \\mathbb{R}$ continua sobre un compacto no vacío es acotada y {{c2::alcanza su máximo y su mínimo absoluto::extremos globales}}."
                    },
                    {
                        "item_id": 1879945980129923415,
                        "type": "ClozeCard",
                        "title": "Intercambio de Límite e Integral de Riemann",
                        "text": "Si $f_n \\in \\mathcal{R}([a, b])$ y $f_n \\rightrightarrows f$ uniformemente en $[a, b]$:\\n1. La función límite $f$ es integrable Riemann: $f \\in \\mathcal{R}([a, b])$.\\n2. El límite conmuta con la integral: $$\\lim_{n\\to\\infty} \\int_a^b f_n(x) dx = {{c1::\\int_a^b f(x) dx = \\int_a^b \\lim_{n\\to\\infty} f_n(x) dx::intercambio formal}}$$.\\nCota del error de integración: $$\\left|\\int_a^b f_n(x) dx - \\int_a^b f(x) dx\\right| \\le {{c2::(b - a) \\|f_n - f\\|_\\infty \\to 0::estimación por longitud del intervalo}}$$."
                    },
                    {
                        "item_id": 1879945980131636000,
                        "type": "Flashcard",
                        "title": "Teorema de Diferenciación Término a Término",
                        "front": "¿Cuáles son las hipótesis rigurosas para derivar término a término una sucesión de funciones diferenciables?",
                        "back": "Sean $f_n: [a, b] \\to \\mathbb{R}$ funciones diferenciables tales que:<br>1. Las <b>derivadas</b> convergen <b>uniformemente</b> a una función $g$: $f_n' \\rightrightarrows g$ en $[a, b]$.<br>2. Existe <b>al menos un punto</b> $x_0 \\in [a, b]$ donde la sucesión de valores converge: $f_n(x_0) \\to c \\in \\mathbb{R}$.<br><b>Conclusión:</b> $f_n$ converge uniformemente en todo $[a, b]$ a una función diferenciable $f$, y $f'(x) = g(x) = \\lim_{n\\to\\infty} f_n'(x)$."
                    }
                ]
            },
            {
                "note_id": "ar_08",
                "title": "Inversa Continua sobre Compactos",
                "x": 680.0,
                "y": 340.0,
                "tags": [
                    "Análisis Real",
                    "Homeomorfismo",
                    "Inversa Continua"
                ],
                "note_type": "standard",
                "desired_retention": 0.85,
                "cards": [
                    {
                        "item_id": 1879945980090415381,
                        "type": "Flashcard",
                        "title": "Teorema de la Inversa Continua sobre Compactos",
                        "front": "Demuestre que si $K$ es compacto y $f: K \\to Y$ es continua y biyectiva, entonces $f^{-1}: Y \\to K$ es continua.",
                        "back": "Para probar que $g = f^{-1}$ es continua, se prueba que la preimagen de cualquier cerrado $F \\subseteq K$ es cerrada:<br>$g^{-1}(F) = f(F)$.<br>1. $F$ cerrado en compacto $K \\implies F$ es compacto.<br>2. $f$ continua $\\implies f(F)$ es compacto en $Y$.<br>3. En todo espacio métrico, compacto implica cerrado $\\implies f(F)$ es cerrado en $Y$. Por ende, $f^{-1}$ es continua."
                    },
                    {
                        "item_id": 1879945980091299599,
                        "type": "Flashcard",
                        "title": "Contraejemplo: Falla de Inversa Continua sin Compacidad",
                        "front": "Muestre una biyección continua con inversa discontinua por no ser el dominio compacto.",
                        "back": "$f: [0, 2\\pi) \\to S^1, \\quad t \\mapsto (\\cos t, \\sin t)$.<br>1. $f$ es continua y biyectiva.<br>2. Su inversa $f^{-1}$ es discontinua en $(1, 0)$: puntos con $t_n = 2\\pi - 1/n$ tienden a $(1, 0)$, pero $f^{-1} \\to 2\\pi \\ne 0$."
                    },
                    {
                        "item_id": 1879945980132804298,
                        "type": "ClozeCard",
                        "title": "Definición de Equicontinuidad",
                        "text": "Sea $(X, d)$ un espacio métrico. Una familia de funciones $\\mathcal{F} \\subset C(X)$ es equicontinua en $x_0 \\in X$ si:\\n$$\\forall \\varepsilon > 0, \\; \\exists \\delta > 0, \\; \\forall f \\in \\mathcal{F}, \\; \\forall x \\in X \\implies d(x, x_0) < \\delta \\implies {{c1::|f(x) - f(x_0)| < \\varepsilon::lupa universal}}$$\\nLa clave metodológica es que $\\delta$ depende exclusivamente de $\\varepsilon$ y $x_0$, pero es <b>común para toda la familia infinita</b> $\\mathcal{F}$.\\nSi cada $f \\in \\mathcal{F}$ es $L$-Lipschitz con una misma constante $L$: $$|f(x) - f(y)| \\le L d(x, y) \\implies \\delta = {{c2::\\frac{\\varepsilon}{L}::delta uniforme}}$$ luego toda familia uniformemente Lipschitz es equicontinua."
                    },
                    {
                        "item_id": 1879945980133783022,
                        "type": "ProofSequenceCard",
                        "title": "Teorema de Arzelà-Ascoli en Espacios Métricos Compactos",
                        "premise": "Enuncie la caracterización de relativa compacidad en $C(K)$ dada por el Teorema de Arzelà-Ascoli.",
                        "steps": [
                            "Sea $K$ un espacio métrico compacto y $\\mathcal{F} \\subset C(K, \\mathbb{R})$.",
                            "$\\mathcal{F}$ es relativamente compacto en $(C(K), \\|\\cdot\\|_\\infty)$ (su clausura $\\overline{\\mathcal{F}}$ es compacta) si y solo si:",
                            "Condición 1: $\\mathcal{F}$ es equicontinua en todo punto de $K$.",
                            "Condición 2: $\\mathcal{F}$ es puntualmente acotada: $\\forall x \\in K$, $\\sup_{f \\in \\mathcal{F}}|f(x)| < \\infty$ (lo cual implica acotación uniforme gracias a la compacidad de $K$).",
                            "Consecuencia secuencial: Toda sucesión $(f_n) \\subset \\mathcal{F}$ acotada y equicontinua en $K$ compacto admite una subsucesión $(f_{n_k})$ que converge uniformemente en $K \\quad \\blacksquare$."
                        ]
                    }
                ]
            },
            {
                "note_id": "ar_09",
                "title": "Continuidad Uniforme y Heine-Cantor",
                "x": 980.0,
                "y": 340.0,
                "tags": [
                    "Análisis Real",
                    "Uniforme Continuidad",
                    "Heine-Cantor"
                ],
                "note_type": "standard",
                "desired_retention": 0.85,
                "cards": [
                    {
                        "item_id": 1879945980092578291,
                        "type": "ProofSequenceCard",
                        "title": "Demostración Rigurosa de Heine-Cantor",
                        "premise": "Demostrar que toda función continua sobre un compacto es uniformemente continua.",
                        "steps": [
                            "Dado $\\varepsilon > 0$, por continuidad en cada $p \\in K$ existe $\\delta_p > 0$ con $d(x, p) < \\delta_p \\implies d(f(x), f(p)) < \\varepsilon / 2$.",
                            "Las bolas abiertas $\\{B(p, \\delta_p / 2)\\}_{p \\in K}$ forman un recubrimiento abierto de $K$.",
                            "Por compacidad, existe un subrecubrimiento finito centrado en $\\{p_1, \\dots, p_N\\}$.",
                            "Sea $\\delta = \\min_{1 \\le i \\le N} \\frac{\\delta_{p_i}}{2} > 0$ (mínimo de conjunto finito estrictamente positivo).",
                            "Si $d(x, x') < \\delta$, $x \\in B(p_k, \\delta_{p_k}/2) \\implies d(x', p_k) < \\delta + \\delta_{p_k}/2 \\le \\delta_{p_k}$.",
                            "Por desigualdad triangular: $d(f(x), f(x')) \\le d(f(x), f(p_k)) + d(f(p_k), f(x')) < \\frac{\\varepsilon}{2} + \\frac{\\varepsilon}{2} = \\varepsilon$."
                        ]
                    },
                    {
                        "item_id": 1879945980093413644,
                        "type": "ClozeCard",
                        "title": "Funciones Periódicas Continuas en R",
                        "text": "Toda función $f: \\mathbb{R} \\to \\mathbb{R}$ continua y periódica es {{c1::uniformemente continua en todo R::propiedad global}}.\\nDemostración: Por Heine-Cantor es uniformemente continua en el intervalo compacto $[0, 2T]$, y la periodicidad extiende el mismo $\\delta$ a todo $\\mathbb{R}$."
                    },
                    {
                        "item_id": 1879945980134616311,
                        "type": "Flashcard",
                        "title": "Familia Equicontinua y Puntualmente Acotada pero No Uniformemente Acotada en R",
                        "front": "Construya un contraejemplo que demuestre que si el dominio $X$ no es compacto, una familia puede ser equicontinua y puntualmente acotada sin ser uniformemente acotada ni relativamente compacta.",
                        "back": "Considere la familia de funciones $f_n: \\mathbb{R} \\to \\mathbb{R}$ definidas por $f_n(x) = \\sin(x) + n \\cdot \\mathbf{1}_{\\{x \\ge n\\}} \\cdot (x - n)$ o simplemente $f_n(x) = \\frac{x}{n} + n \\cdot \\dots$, o de forma más limpia:<br>$$f_n(x) = \\arctan(x - n) \\quad \\text{en } \\mathbb{R}$$<br>1. <b>Equicontinuidad:</b> $|f_n'(x)| = \\frac{1}{1 + (x-n)^2} \\le 1$. Como todas son 1-Lipschitz, la familia es equicontinua.<br>2. <b>Puntualmente acotada:</b> Para cada $x \\in \\mathbb{R}$ fijo, $|f_n(x)| \\le \\pi/2$.<br>3. <b>Falla de convergencia uniforme:</b> $f_n(x) \\to -\\pi/2$ puntualmente para todo $x$, pero evaluando en $x_n = n$: $f_n(n) = \\arctan(0) = 0 \\ne -\\pi/2$. Ninguna subsucesión puede converger uniformemente en $\\mathbb{R}$.<br>Esto demuestra que la compacidad del dominio es <b>estrictamente necesaria</b>."
                    }
                ]
            },
            {
                "note_id": "ar_10",
                "title": "Extensión Única al Completado",
                "x": 1280.0,
                "y": 340.0,
                "tags": [
                    "Análisis Real",
                    "Extensión",
                    "Completitud"
                ],
                "note_type": "standard",
                "desired_retention": 0.85,
                "cards": [
                    {
                        "item_id": 1879945980095010048,
                        "type": "ClozeCard",
                        "title": "Teorema de Extensión Única al Completado",
                        "text": "Si $D \\subset X$ es denso ($\\overline{D} = X$), $Y$ es completo y $f: D \\to Y$ es uniformemente continua:\\nExiste {{c1::una única extensión continua $\\tilde{f}: X \\to Y$::existencia y unicidad}} y además es {{c2::uniformemente continua::regularidad}} en todo $X$."
                    },
                    {
                        "item_id": 1879945980135284704,
                        "type": "ClozeCard",
                        "title": "Regularización Equicontinua por Operadores Integrales",
                        "text": "Sea $k: [a, b] \\times [a, b] \\to \\mathbb{R}$ un núcleo continuo. Se define el operador integral de Fredholm $T: C([a, b]) \\to C([a, b])$ por: $$(T f)(x) = \\int_a^b k(x, y) f(y) dy$$\\n1. Como $[a, b] \\times [a, b]$ es compacto, $k$ es uniformemente continuo por Heine-Cantor: dado $\\varepsilon > 0$, existe $\\delta > 0$ tal que $|x_1 - x_2| < \\delta \\implies |k(x_1, y) - k(x_2, y)| < \\frac{\\varepsilon}{(b - a) M}$.\\n2. Si $B = \\{f \\in C([a, b]) : \\|f\\|_\\infty \\le M\\}$ es la bola cerrada acotada, entonces la imagen $T(B)$ es {{c1::equicontinua y uniformemente acotada::propiedades de Arzelà-Ascoli}}.\\n3. Por el Teorema de Arzelà-Ascoli, el operador integral $T$ es un {{c2::operador compacto::transformación compacta}} (transforma conjuntos acotados en relativamente compactos)."
                    }
                ]
            },
            {
                "note_id": "em_conexidad",
                "title": "Conexidad Topológica e Intervalos",
                "x": 80.0,
                "y": 600.0,
                "tags": [
                    "Análisis Real",
                    "Conexidad",
                    "Clopen",
                    "Intervalos"
                ],
                "note_type": "standard",
                "desired_retention": 0.85,
                "cards": [
                    {
                        "item_id": 1879945980096264499,
                        "type": "ClozeCard",
                        "title": "Definición de Conexidad e Intervalos en R",
                        "text": "Un espacio métrico $X$ es conexo si sus únicos subconjuntos clopen son {{c1::$\\emptyset$ y $X$::subconjuntos clopen}}.\\nEn $\\mathbb{R}$, un conjunto $E \\subseteq \\mathbb{R}$ es conexo si y sólo si es {{c2::un intervalo::caracterización en R}}.\\nSi $f$ es continua y $X$ es conexo, $f(X)$ es {{c3::conexo::imagen conexa}}."
                    }
                ]
            },
            {
                "note_id": "ar_12",
                "title": "TVI, Punto Fijo 1D e Invarianza por Corte",
                "x": 380.0,
                "y": 600.0,
                "tags": [
                    "Análisis Real",
                    "TVI",
                    "Punto Fijo",
                    "Corte"
                ],
                "note_type": "standard",
                "desired_retention": 0.85,
                "cards": [
                    {
                        "item_id": 1879945980097315035,
                        "type": "ProofSequenceCard",
                        "title": "Teorema del Punto Fijo en 1D",
                        "premise": "Demostrar que toda función continua $f: [a, b] \\to [a, b]$ posee al menos un punto fijo.",
                        "steps": [
                            "Definir $g(x) = f(x) - x$ continua en $[a, b]$.",
                            "Como $f(a) \\in [a, b]$, $f(a) \\ge a \\implies g(a) \\ge 0$.",
                            "Como $f(b) \\in [a, b]$, $f(b) \\le b \\implies g(b) \\le 0$.",
                            "Por el Teorema de Bolzano, existe $x^* \\in [a, b]$ con $g(x^*) = 0 \\iff f(x^*) = x^*$."
                        ]
                    },
                    {
                        "item_id": 1879945980097567103,
                        "type": "Flashcard",
                        "title": "Invarianza Topológica por Remoción de Puntos (Corte)",
                        "front": "Demuestre que $[0, 1)$ no es homeomorfo a $(0, 1)$ y que $\\mathbb{R}$ no es homeomorfo a $\\mathbb{R}^2$.",
                        "back": "1. <b>$[0, 1)$ vs $(0, 1)$:</b> Removiendo el punto $0$, $[0, 1)\\setminus\\{0\\} = (0, 1)$ es <b>conexo</b>. Pero remover cualquier punto $f(0)$ en $(0, 1)$ produce dos intervalos disjuntos, conjunto <b>disconexo</b>.<br>2. <b>$\\mathbb{R}$ vs $\\mathbb{R}^2$:</b> $\\mathbb{R}\\setminus\\{p\\}$ tiene 2 componentes conexas, mientras que $\\mathbb{R}^2\\setminus\\{q\\}$ permanece <b>conexo</b>."
                    },
                    {
                        "item_id": 1879945980138963032,
                        "type": "ClozeCard",
                        "title": "Densidad de Productos g(x)h(y) en C(X x Y)",
                        "text": "Sean $X$ e $Y$ espacios métricos compactos. Considere el conjunto de sumas finitas de funciones separables: $$\\mathcal{A} = \\left\\{\\sum_{i=1}^m g_i(x) h_i(y) : g_i \\in C(X), h_i \\in C(Y), m \\in \\mathbb{N}\\right\\}$$\\n- $\\mathcal{A}$ es una subálgebra de $C(X \\times Y, \\mathbb{R})$ que contiene a las constantes ($1 \\cdot 1 = 1$).\\n- Si $(x_1, y_1) \\ne (x_2, y_2)$, supongamos $x_1 \\ne x_2$. Por Urysohn existe $g \\in C(X)$ con $g(x_1) \\ne g(x_2)$, luego $F(x, y) = g(x) \\cdot 1$ separa los puntos.\\n- Por el Teorema de Stone-Weierstrass, $\\mathcal{A}$ es {{c1::densa en $C(X \\times Y, \\mathbb{R})$::densidad de funciones separables}} bajo la norma del supremo."
                    },
                    {
                        "item_id": 1879945980140124533,
                        "type": "Flashcard",
                        "title": "Grados Acotados: Límite Uniforme de Polinomios de Grado <= d",
                        "front": "Demuestre que si una sucesión de polinomios $(P_n)_{n=1}^\\infty$ con grado $\\deg(P_n) \\le d$ converge uniformemente en $[a, b]$ a una función $f$, entonces $f$ es necesariamente un polinomio de grado $\\le d$.",
                        "back": "1. El conjunto de polinomios de grado a lo más $d$, $\\mathcal{P}_d = \\text{span}\\{1, x, x^2, \\dots, x^d\\}$, es un subespacio vectorial de dimensión finita ($d + 1$) dentro de $C([a, b])$.<br>2. En cualquier espacio normado, todo subespacio vectorial de <b>dimensión finita</b> es topológicamente <b>cerrado</b>.<br>3. Como $P_n \\in \\mathcal{P}_d$ para todo $n$ y $P_n \\rightrightarrows f$ uniformemente (es decir, en la norma $\\|\\cdot\\|_\\infty$), el límite $f$ debe pertenecer a la clausura de $\\mathcal{P}_d$.<br>4. Dado que $\\mathcal{P}_d$ es cerrado, $\\overline{\\mathcal{P}_d} = \\mathcal{P}_d \\implies f \\in \\mathcal{P}_d$. Por lo tanto, $f$ es un polinomio de grado $\\le d \\quad \\blacksquare$."
                    }
                ]
            },
            {
                "note_id": "ar_13",
                "title": "Arcoconexidad y Curva Seno del Topólogo",
                "x": 680.0,
                "y": 600.0,
                "tags": [
                    "Análisis Real",
                    "Arcoconexidad",
                    "Seno del Topólogo"
                ],
                "note_type": "standard",
                "desired_retention": 0.85,
                "cards": [
                    {
                        "item_id": 1879945980099338921,
                        "type": "ClozeCard",
                        "title": "Arcoconexidad vs Conexidad",
                        "text": "Todo espacio arcoconexo es {{c1::conexo::implicación}}.\\nEl recíproco es falso: El contraejemplo clásico es {{c2::la curva seno del topólogo::contraejemplo}}, la cual es conexa pero no arcoconexa."
                    },
                    {
                        "item_id": 1879945980140751917,
                        "type": "ClozeCard",
                        "title": "Definición de Contracción y Teorema de Banach",
                        "text": "Sea $(X, d)$ un espacio métrico <b>completo</b> no vacío. Una aplicación $T: X \\to X$ es una contracción estricta si existe $k \\in [0, 1)$ tal que:\\n$$d(T(x), T(y)) \\le {{c1::k \\cdot d(x, y)::condición de contracción Lipschitz}} \\quad \\forall x, y \\in X$$\\nEl Teorema del Punto Fijo de Banach asegura que:\\n1. Existe un {{c2::único punto fijo::existencia y unicidad}} $x^* \\in X$ tal que $T(x^*) = x^*$.\\n2. Para <b>cualquier</b> semilla inicial $x_0 \\in X$, la sucesión iterativa $x_{n+1} = T(x_n)$ converge a $x^*$: $$\\lim_{n\\to\\infty} x_n = x^*$$."
                    },
                    {
                        "item_id": 1879945980142916093,
                        "type": "Flashcard",
                        "title": "Cotas de Error a Priori y a Posteriori de Banach",
                        "front": "Escriba las cotas analíticas del error $d(x_n, x^*)$ en el Teorema del Punto Fijo de Banach.",
                        "back": "1. <b>Estimación a priori (depende solo del primer paso $d(x_0, x_1)$):</b><br>$$d(x_n, x^*) \\le \\frac{k^n}{1 - k} d(x_0, x_1)$$<br>Permite calcular el número mínimo de iteraciones $n$ necesarias para garantizar un error menor a $\\varepsilon$ antes de empezar a iterar.<br>2. <b>Estimación a posteriori (depende del paso actual $d(x_{n-1}, x_n)$):</b><br>$$d(x_n, x^*) \\le \\frac{k}{1 - k} d(x_n, x_{n-1})$$<br>Permite detener la iteración numérica en tiempo real cuando la diferencia entre pasos consecutivos cae por debajo del umbral deseado."
                    }
                ]
            },
            {
                "note_id": "ar_14",
                "title": "Convergencia Uniforme y Norma del Supremo",
                "x": 980.0,
                "y": 600.0,
                "tags": [
                    "Análisis Real",
                    "Convergencia",
                    "Norma Infinito"
                ],
                "note_type": "standard",
                "desired_retention": 0.85,
                "cards": [
                    {
                        "item_id": 1879945980099700754,
                        "type": "ClozeCard",
                        "title": "Convergencia Uniforme con Norma Infinito",
                        "text": "Una sucesión $f_n: X \\to Y$ converge uniformemente a $f$ si y sólo si:\\n$$\\lim_{n \\to \\infty} \\|f_n - f\\|_\\infty = \\lim_{n \\to \\infty} {{c1::\\sup_{x \\in X} d_Y(f_n(x), f(x)) = 0::límite de la norma infinito}}$$\\nEl índice $N(\\varepsilon)$ es {{c2::independiente del punto x::independencia de x}}."
                    },
                    {
                        "item_id": 1879945980143565626,
                        "type": "Flashcard",
                        "title": "Contraejemplo: Desigualdad Débil d(T(x), T(y)) < d(x, y) Sin Punto Fijo",
                        "front": "Muestre que la condición débil $d(T(x), T(y)) < d(x, y)$ para todo $x \\ne y$ en un espacio métrico completo no garantiza la existencia de punto fijo si el dominio no es compacto.",
                        "back": "Considere el espacio métrico completo $X = [1, \\infty)$ con la distancia usual, y la función:<br>$$T(x) = x + \\frac{1}{x}$$<br>1. <b>Derivada:</b> $T'(x) = 1 - \\frac{1}{x^2}$. Para todo $x \\in (1, \\infty)$, $0 < T'(x) < 1$.<br>2. Por el Teorema del Valor Medio: $|T(x) - T(y)| = T'(\\xi)|x - y| < |x - y|$ para todo $x \\ne y$.<br>3. Sin embargo, no existe constante $k < 1$ estricta, pues $\\sup_{x \\ge 1} T'(x) = 1$.<br>4. Ecuación de punto fijo: $T(x^*) = x^* \\implies x^* + \\frac{1}{x^*} = x^* \\implies \\frac{1}{x^*} = 0$, que <b>no tiene solución</b> en $[1, \\infty)$.<br>(Nota: En cambio, por el Teorema de Edelstein, si el espacio es <b>compacto</b>, la condición estricta $d(T(x), T(y)) < d(x, y)$ sí garantiza punto fijo único)."
                    },
                    {
                        "item_id": 1879945980144948641,
                        "type": "ClozeCard",
                        "title": "Teorema del Iterado Contractivo (T^m es Contracción)",
                        "text": "Sea $(X, d)$ un espacio métrico completo y $T: X \\to X$ una aplicación tal que para algún entero $m \\ge 1$, el iterado $T^m$ es una contracción estricta:\\n$$d(T^m(x), T^m(y)) \\le k d(x, y) \\quad (k < 1)$$\\nEntonces $T$ posee un {{c1::único punto fijo::punto fijo único}} $x^* \\in X$ ($T(x^*) = x^*$)!\\nDemostración: Por Banach, $T^m$ tiene punto fijo único $x^*$. Entonces: $$T^m(T(x^*)) = T(T^m(x^*)) = {{c2::T(x^*)::conmutatividad del iterado}}$$\\nPor unicidad del punto fijo de $T^m$, debe ser $T(x^*) = x^*$. Esta técnica es el motor fundamental para resolver {{c3::ecuaciones integrales de Volterra y el teorema de Picard-Lindelöf::aplicación diferencial}}."
                    }
                ]
            },
            {
                "note_id": "ar_15",
                "title": "Cauchy Uniforme y Puntos Móviles",
                "x": 1280.0,
                "y": 600.0,
                "tags": [
                    "Análisis Real",
                    "Cauchy",
                    "Puntos Móviles"
                ],
                "note_type": "standard",
                "desired_retention": 0.85,
                "cards": [
                    {
                        "item_id": 1879945980100755422,
                        "type": "Flashcard",
                        "title": "Criterio de Puntos Móviles para Refutar Convergencia Uniforme",
                        "front": "¿Cómo se refuta la convergencia uniforme mediante puntos móviles?",
                        "back": "Basta encontrar una sucesión de puntos $(x_n) \\subset X$ tal que $|f_n(x_n) - f(x_n)| \\ge \\varepsilon_0 > 0 \\quad \\forall n$.<br><b>Ejemplo:</b> $f_n(x) = \\frac{n x}{1 + n^2 x^2}$ en $[0, 1]$. El límite puntual es $0$. Tomando $x_n = 1/n$: $f_n(1/n) = 1/2 \\not\\to 0$."
                    }
                ]
            },
            {
                "note_id": "ar_16",
                "title": "Transferencia de Continuidad (Técnica eps/3)",
                "x": 80.0,
                "y": 860.0,
                "tags": [
                    "Análisis Real",
                    "Continuidad Límite",
                    "eps/3"
                ],
                "note_type": "standard",
                "desired_retention": 0.85,
                "cards": [
                    {
                        "item_id": 1879945980102143601,
                        "type": "ProofSequenceCard",
                        "title": "Demostración de Continuidad del Límite Uniforme",
                        "premise": "Demostrar que el límite uniforme de funciones continuas es continuo.",
                        "steps": [
                            "Dado $\\varepsilon > 0$, existe $N$ tal que $\\forall n \\ge N$, $d(f_n(x), f(x)) < \\varepsilon / 3$ para todo $x$.",
                            "Fijando $n = N$, por continuidad de $f_N$ en $x_0$ existe $\\delta > 0$ con $d(x, x_0) < \\delta \\implies d(f_N(x), f_N(x_0)) < \\varepsilon / 3$.",
                            "Por desigualdad triangular: $d(f(x), f(x_0)) \\le d(f(x), f_N(x)) + d(f_N(x), f_N(x_0)) + d(f_N(x_0), f(x_0))$.",
                            "Acotando: $d(f(x), f(x_0)) < \\frac{\\varepsilon}{3} + \\frac{\\varepsilon}{3} + \\frac{\\varepsilon}{3} = \\varepsilon$."
                        ]
                    }
                ]
            },
            {
                "note_id": "ar_17",
                "title": "Test M de Weierstrass y Espacio C(K)",
                "x": 380.0,
                "y": 860.0,
                "tags": [
                    "Análisis Real",
                    "Test M",
                    "Series",
                    "Completitud"
                ],
                "note_type": "standard",
                "desired_retention": 0.85,
                "cards": [
                    {
                        "item_id": 1879945980103345505,
                        "type": "ClozeCard",
                        "title": "Criterio M de Weierstrass y Completitud",
                        "text": "Si $|f_n(x)| \\le M_n$ con $\\sum M_n < \\infty$, la serie $\\sum f_n(x)$ converge {{c1::absoluta y uniformemente en X::tipo de convergencia}}.\\nEl espacio métrico $(C(K, \\mathbb{R}), \\|\\cdot\\|_\\infty)$ sobre un compacto $K$ es un espacio de Banach, es decir, es {{c2::completo::completitud métrica}}."
                    }
                ]
            },
            {
                "note_id": "ar_18",
                "title": "Teorema de Dini y Fallas de Hipótesis",
                "x": 680.0,
                "y": 860.0,
                "tags": [
                    "Análisis Real",
                    "Dini",
                    "Monotonía",
                    "Contraejemplos"
                ],
                "note_type": "standard",
                "desired_retention": 0.85,
                "cards": [
                    {
                        "item_id": 1879945980104288786,
                        "type": "ClozeCard",
                        "title": "Hipótesis del Teorema de Dini",
                        "text": "Teorema de Dini: Si $K$ es compacto, $f_n$ continuas, $f_n \\to f$ puntualmente con $f$ continua y la convergencia es monótona ($f_{n+1} \\le f_n$), entonces la convergencia es forzosamente {{c1::uniforme en K::consecuencia}}."
                    },
                    {
                        "item_id": 1879945980106715114,
                        "type": "Flashcard",
                        "title": "Catálogo de Fallas de Hipótesis de Dini",
                        "front": "Muestre las 3 fallas clásicas de Dini: (1) Sin compacidad, (2) Sin monotonía, (3) Límite discontinuo.",
                        "back": "1. <b>Sin compacidad:</b> $f_n(x) = \\frac{1}{1 + nx}$ en $(0, 1)$ decrece a $0$, pero $\\|f_n\\|_\\infty = 1 \\not\\to 0$.<br>2. <b>Sin monotonía:</b> $f_n(x) = x^n - x^{2n}$ en $[0, 1]$ converge a $0$, pero $\\|f_n\\|_\\infty = 1/4 \\not\\to 0$.<br>3. <b>Límite discontinuo:</b> $f_n(x) = \\frac{1}{1 + x^n}$ en $[0, 1]$ monótona, pero $f(1)=1/2 \\ne 1$."
                    }
                ]
            },
            {
                "note_id": "ar_19",
                "title": "Equicontinuidad y Arzelà-Ascoli",
                "x": 980.0,
                "y": 860.0,
                "tags": [
                    "Análisis Real",
                    "Arzelà-Ascoli",
                    "Equicontinuidad",
                    "Precompacidad"
                ],
                "note_type": "standard",
                "desired_retention": 0.85,
                "cards": [
                    {
                        "item_id": 1879945980106894776,
                        "type": "ClozeCard",
                        "title": "Teorema de Arzelà-Ascoli",
                        "text": "En compacto $K$, una familia $\\mathcal{F} \\subset C(K, \\mathbb{R})$ es relativamente compacta si y sólo si:\\n1. Es {{c1::puntualmente acotada::condición 1}} ($\\forall x \\in K, \\sup_{f \\in \\mathcal{F}} |f(x)| < \\infty$).\\n2. Es {{c2::equicontinua en K::condición 2}}."
                    },
                    {
                        "item_id": 1879945980108465212,
                        "type": "ProofSequenceCard",
                        "title": "Esquema Demostrativo de Arzelà-Ascoli",
                        "premise": "Resumir la demostración de Arzelà-Ascoli usando Cantor y redes finitas.",
                        "steps": [
                            "Por compacidad, existe subconjunto denso numerable $D = \\{q_1, q_2, \\dots\\} \\subset K$.",
                            "Por argumento diagonal de Cantor, se extrae una subsucesión $(f_{n_k})$ convergente en todo $D$.",
                            "Dado $\\varepsilon > 0$, por equicontinuidad existe $\\delta > 0$ con $|f(x) - f(y)| < \\varepsilon / 3$.",
                            "Cubrir el compacto $K$ con finitas bolas $B(q_1, \\delta), \\dots, B(q_m, \\delta)$.",
                            "Por Cauchy en los finitos centros y desigualdad triangular de 3 términos: $|f_{n_k}(x) - f_{n_j}(x)| < \\varepsilon$ para todo $x \\in K$."
                        ]
                    }
                ]
            },
            {
                "note_id": "ar_20",
                "title": "Densidad de Stone-Weierstrass",
                "x": 1280.0,
                "y": 860.0,
                "tags": [
                    "Análisis Real",
                    "Stone-Weierstrass",
                    "Subálgebra",
                    "Densidad"
                ],
                "note_type": "standard",
                "desired_retention": 0.85,
                "cards": [
                    {
                        "item_id": 1879945980109063083,
                        "type": "ClozeCard",
                        "title": "Enunciado de Stone-Weierstrass",
                        "text": "Una subálgebra $\\mathcal{A} \\subset C(K, \\mathbb{R})$ sobre un compacto $K$ es densa si y sólo si:\\n1. {{c1::Separa puntos::condición 1}}: $\\forall x \\ne y \\implies \\exists f \\in \\mathcal{A} : f(x) \\ne f(y)$.\\n2. {{c2::Contiene las funciones constantes::condición 2}}: $\\mathbf{1} \\in \\mathcal{A}$."
                    },
                    {
                        "item_id": 1879945980110024562,
                        "type": "Flashcard",
                        "title": "Subálgebra que no Separa Puntos",
                        "front": "Muestre una subálgebra que no sea densa en $C([-1, 1], \\mathbb{R})$ por no separar puntos.",
                        "back": "Polinomios pares $\\mathcal{A} = \\{P(x^2)\\}$. No separan $x$ y $-x$, por lo que es imposible aproximar funciones impares como $g(x) = x$ ($\\|x - P(x^2)\\|_\\infty \\ge 1$)."
                    }
                ]
            },
            {
                "note_id": "ar_21",
                "title": "Aproximación de Weierstrass y Fourier",
                "x": 380.0,
                "y": 1120.0,
                "tags": [
                    "Análisis Real",
                    "Weierstrass",
                    "Fourier"
                ],
                "note_type": "standard",
                "desired_retention": 0.85,
                "cards": [
                    {
                        "item_id": 1879945980111072648,
                        "type": "ClozeCard",
                        "title": "Densidad Polinomial y Trigonométrica",
                        "text": "- Polinomios $\\mathbb{R}[x]$ son densos en $(C([a, b], \\mathbb{R}), \\|\\cdot\\|_\\infty)$.\\n- Polinomios trigonométricos son densos en el espacio de funciones continuas y {{c1::periódicas de período $2\\pi$::clase de funciones}}."
                    }
                ]
            },
            {
                "note_id": "ar_22",
                "title": "Punto Fijo de Banach y Teorema de Edelstein",
                "x": 680.0,
                "y": 1120.0,
                "tags": [
                    "Análisis Real",
                    "Banach",
                    "Edelstein",
                    "Contracciones"
                ],
                "note_type": "standard",
                "desired_retention": 0.85,
                "cards": [
                    {
                        "item_id": 1879945980112044662,
                        "type": "ProofSequenceCard",
                        "title": "Punto Fijo de Banach y Cotas de Error",
                        "premise": "Probar la convergencia de iteradas $x_{n+1} = T(x_n)$ para contracción $k < 1$ en espacio completo.",
                        "steps": [
                            "Por inducción, $d(x_{n+1}, x_n) \\le k^n d(x_1, x_0)$.",
                            "Sumando la serie geométrica: $d(x_m, x_n) \\le \\frac{k^n}{1 - k} d(x_1, x_0) \\to 0$, luego $(x_n)$ es de Cauchy.",
                            "Por completitud existe $x^* = \\lim x_n$, y por continuidad $T(x^*) = x^*$.",
                            "Unicidad: $d(x^*, y^*) = d(Tx^*, Ty^*) \\le k d(x^*, y^*) \\implies (1 - k)d(x^*, y^*) \\le 0 \\implies x^* = y^*$."
                        ]
                    },
                    {
                        "item_id": 1879945980113925036,
                        "type": "Flashcard",
                        "title": "Teorema de Edelstein en Espacios Compactos",
                        "front": "Enuncie el Teorema de Edelstein de contracción débil.",
                        "back": "Sea $K$ <b>compacto</b> y $T: K \\to K$ tal que $d(Tx, Ty) < d(x, y) \\quad \\forall x \\ne y$.<br>Entonces $T$ tiene un único punto fijo $x^* \\in K$.<br>Demostración: $\\varphi(x) = d(x, Tx)$ es continua en el compacto $K$ y alcanza su mínimo en $x^*$. Si $Tx^* \\ne x^*$, $\\varphi(Tx^*) < \\varphi(x^*)$, contradicción."
                    }
                ]
            },
            {
                "note_id": "ar_00",
                "title": "Decálogo para Escribir Demostraciones MAT2514",
                "x": 80.0,
                "y": 40.0,
                "tags": [
                    "Real",
                    "Rúbrica",
                    "Decálogo"
                ],
                "note_type": "standard",
                "desired_retention": 0.85,
                "cards": [
                    {
                        "item_id": 1879945980114436463,
                        "type": "ClozeCard",
                        "title": "La Rúbrica Oficial de 4 Puntos por Demostración",
                        "text": "En MAT2514, cada problema de 16 puntos asigna 4 puntos (25% del puntaje) exclusivamente a la estructura de la escritura:\\n1. <b>Apertura (1 pt):</b> Declarar qué se va a probar y la estrategia formal (ej: {{c1::«Fijemos $\\varepsilon > 0$. Buscamos $N \\in \\mathbb{N}$ tal que...» o «Por contradicción, supongamos...»::declaración inicial}}).\\n2. <b>Justificación (1 pt):</b> Citar {{c2::cada teorema o hipótesis por su nombre oficial::fundamentación deductiva}} (ej: «Puesto que $K$ es compacto, por Weierstrass...»).\\n3. <b>Hilado (1 pt):</b> Conectar deductivamente las proposiciones evitando {{c3::yuxtaponer fórmulas huérfanas sin conectores lógicos::vicios de redacción}}.\\n4. <b>Cierre (1 pt):</b> Declarar formalmente el final: {{c4::«Por lo tanto, la propiedad se cumple para todo $x \\in K$. Q.E.D.»::conclusión explícita}}."
                    },
                    {
                        "item_id": 1879945980115830396,
                        "type": "Flashcard",
                        "title": "Las 7 Intuiciones Nucleares de la I3",
                        "front": "Mencione las 7 intuiciones visuales de la I3 y su efecto técnico operativo.",
                        "back": "1. <b>Compacidad:</b> «Finito disfrazado»: de todo recubrimiento abierto se extrae subrecubrimiento finito. Weierstrass y Heine-Cantor.<br>2. <b>Conexidad:</b> «Sin grietas»: el espacio no se puede partir en dos abiertos disjuntos no vacíos. Mapeos continuos preservan conexidad.<br>3. <b>Convergencia Uniforme:</b> «Tubo rígido»: para $n \\ge N$, todas las curvas $f_n(x)$ caen en la banda $[f(x)-\\varepsilon, f(x)+\\varepsilon]$ para todo $x$ a la vez.<br>4. <b>Equicontinuidad:</b> «Oscilación coordinada»: una misma lupa $\\delta(\\varepsilon)$ controla la pendiente de todas las infinitas funciones a la vez.<br>5. <b>Arzelà–Ascoli:</b> «Compacidad en dimensión infinita»: la bola cerrada no es compacta en $C(K)$; equicontinuidad + acotación garantizan subsucesión convergente.<br>6. <b>Stone–Weierstrass:</b> «ADN algebraico»: si un subconjunto cerrado bajo sumas y productos separa puntos y no se anula, es denso en $C(X)$.<br>7. <b>Punto Fijo de Banach:</b> «Imán métrico»: una contracción $k < 1$ en un espacio métrico completo colapsa cualquier semilla hacia un punto fijo único."
                    }
                ]
            },
            {
                "note_id": "ar_11",
                "title": "Teorema de Densidad de Stone-Weierstrass",
                "x": 980.0,
                "y": 440.0,
                "tags": [
                    "Real",
                    "Stone-Weierstrass",
                    "Densidad"
                ],
                "note_type": "standard",
                "desired_retention": 0.85,
                "cards": [
                    {
                        "item_id": 1879945980136606719,
                        "type": "ClozeCard",
                        "title": "Hipótesis del Teorema de Stone-Weierstrass",
                        "text": "Sea $X$ un espacio métrico compacto. Una subálgebra $\\mathcal{A} \\subset C(X, \\mathbb{R})$ es densa en $(C(X), \\|\\cdot\\|_\\infty)$ ($\\overline{\\mathcal{A}} = C(X)$) si cumple las dos condiciones canónicas:\\n1. <b>Separa puntos:</b> $$\\forall x \\ne y \\in X, \\; \\exists f \\in \\mathcal{A} \\implies {{c1::f(x) \\ne f(y)::separación de puntos}}$$\\n2. <b>No se anula idénticamente en ningún punto:</b> $$\\forall x \\in X, \\; \\exists g \\in \\mathcal{A} \\implies {{c2::g(x) \\ne 0::no anulación}}$$(Si $\\mathcal{A}$ contiene a las funciones constantes, la condición 2 se satisface de forma automática)."
                    },
                    {
                        "item_id": 1879945980137857650,
                        "type": "Flashcard",
                        "title": "Aplicación Canónica: Polinomios Pares Aproximan Funciones Pares",
                        "front": "Demuestre mediante Stone-Weierstrass que el álgebra de polinomios pares $\\mathcal{A} = \\text{span}\\{x^{2k} : k \\ge 0\\}$ es densa en el espacio de funciones pares continuas $C_{\\text{par}}([-1, 1]) = \\{f \\in C([-1, 1]) : f(-x) = f(x)\\}$.",
                        "back": "1. Considere el mapeo cociente $\\phi(x) = x^2 = t$, que identifica cada par $\\{-x, x\\}$ y mapea $[-1, 1]$ sobre el intervalo compacto $[0, 1]$.<br>2. Toda función par $f \\in C_{\\text{par}}([-1, 1])$ se factoriza como $f(x) = g(x^2) = g(t)$, donde $g \\in C([0, 1])$.<br>3. Los polinomios ordinarios en la variable $t$ (que corresponden a polinomios pares en $x$) forman un álgebra $\\mathcal{A}_t = \\mathbb{R}[t]$ en $C([0, 1])$.<br>4. $\\mathcal{A}_t$ contiene a las constantes ($t^0 = 1$) y separa puntos en $[0, 1]$ ($t_1 \\ne t_2 \\implies t$).<br>5. Por Stone-Weierstrass, los polinomios en $t$ son densos en $C([0, 1])$.<br>6. Por lo tanto, para todo $\\varepsilon > 0$, existe $P(t)$ tal que $|g(t) - P(t)| < \\varepsilon$, lo que equivale a $|f(x) - P(x^2)| < \\varepsilon$ en $[-1, 1] \\quad \\blacksquare$."
                    }
                ]
            }
        ],
        "edges": [
            {
                "source_id": "ar_01",
                "target_id": "ar_02",
                "label": "Topología Abierta a Continuidad Global"
            },
            {
                "source_id": "ar_02",
                "target_id": "ar_03",
                "label": "Continuidad a Lipschitz y Hölder"
            },
            {
                "source_id": "ar_02",
                "target_id": "ar_04",
                "label": "Continuidad a Coincidencia en Densos"
            },
            {
                "source_id": "ar_01",
                "target_id": "ar_05",
                "label": "Métrica a Función Distancia"
            },
            {
                "source_id": "ar_05",
                "target_id": "ar_06",
                "label": "Distancia a Urysohn y Separación"
            },
            {
                "source_id": "ar_02",
                "target_id": "ar_07",
                "label": "Continuidad a Compacidad y Weierstrass"
            },
            {
                "source_id": "ar_07",
                "target_id": "ar_08",
                "label": "Compacidad a Inversa Continua"
            },
            {
                "source_id": "ar_07",
                "target_id": "ar_09",
                "label": "Compacidad a Heine-Cantor"
            },
            {
                "source_id": "ar_09",
                "target_id": "ar_10",
                "label": "Heine-Cantor a Extensión Única"
            },
            {
                "source_id": "ar_01",
                "target_id": "em_conexidad",
                "label": "Topología a Conexidad e Intervalos"
            },
            {
                "source_id": "em_conexidad",
                "target_id": "ar_12",
                "label": "Conexidad a TVI y Punto Fijo 1D"
            },
            {
                "source_id": "em_conexidad",
                "target_id": "ar_13",
                "label": "Conexidad a Arcoconexidad"
            },
            {
                "source_id": "ar_01",
                "target_id": "ar_14",
                "label": "Métricas a Convergencia Uniforme"
            },
            {
                "source_id": "ar_14",
                "target_id": "ar_15",
                "label": "Norma Infinito a Puntos Móviles"
            },
            {
                "source_id": "ar_14",
                "target_id": "ar_16",
                "label": "Uniformidad a Transferencia de Continuidad"
            },
            {
                "source_id": "ar_16",
                "target_id": "ar_17",
                "label": "Límite Continuo a Test M y Espacio C(K)"
            },
            {
                "source_id": "ar_14",
                "target_id": "ar_18",
                "label": "Convergencia a Teorema de Dini"
            },
            {
                "source_id": "ar_09",
                "target_id": "ar_19",
                "label": "Heine-Cantor a Arzelà-Ascoli"
            },
            {
                "source_id": "ar_17",
                "target_id": "ar_19",
                "label": "C(K) Completo a Precompacidad"
            },
            {
                "source_id": "ar_07",
                "target_id": "ar_20",
                "label": "Compacidad a Stone-Weierstrass"
            },
            {
                "source_id": "ar_20",
                "target_id": "ar_21",
                "label": "Stone-Weierstrass a Polinomios Trigonométricos"
            },
            {
                "source_id": "ar_01",
                "target_id": "ar_22",
                "label": "Espacios Completos a Banach y Edelstein"
            },
            {
                "source_id": "ar_00",
                "target_id": "ar_01",
                "label": ""
            },
            {
                "source_id": "ar_01",
                "target_id": "ar_03",
                "label": ""
            },
            {
                "source_id": "ar_03",
                "target_id": "ar_04",
                "label": ""
            },
            {
                "source_id": "ar_04",
                "target_id": "ar_05",
                "label": ""
            },
            {
                "source_id": "ar_04",
                "target_id": "ar_06",
                "label": ""
            },
            {
                "source_id": "ar_04",
                "target_id": "ar_07",
                "label": ""
            },
            {
                "source_id": "ar_06",
                "target_id": "ar_08",
                "label": ""
            },
            {
                "source_id": "ar_08",
                "target_id": "ar_09",
                "label": ""
            },
            {
                "source_id": "ar_08",
                "target_id": "ar_10",
                "label": ""
            },
            {
                "source_id": "ar_06",
                "target_id": "ar_11",
                "label": ""
            },
            {
                "source_id": "ar_11",
                "target_id": "ar_12",
                "label": ""
            },
            {
                "source_id": "ar_06",
                "target_id": "ar_13",
                "label": ""
            },
            {
                "source_id": "ar_13",
                "target_id": "ar_14",
                "label": ""
            }
        ]
    },
    {
        "name": "Química para Ingenieros (I2)",
        "folder_path": "",
        "notes": [
            {
                "note_id": "quim_01",
                "title": "Velocidad de Reacción y Ley Diferencial",
                "x": 80.0,
                "y": 80.0,
                "tags": [
                    "Química",
                    "Cinética",
                    "Velocidad"
                ],
                "note_type": "standard",
                "desired_retention": 0.85,
                "cards": [
                    {
                        "item_id": 1879945980148089609,
                        "type": "ClozeCard",
                        "title": "Definición Estequiométrica de Velocidad",
                        "text": "Para $aA + bB \\to cC + dD$:\\n$$v = {{c1::-\\frac{1}{a}\\frac{d[A]}{dt} = -\\frac{1}{b}\\frac{d[B]}{dt} = \\frac{1}{c}\\frac{d[C]}{dt} = \\frac{1}{d}\\frac{d[D]}{dt}::definición estequiométrica}}$$\\nLey diferencial general: $v = k [A]^x [B]^y$, donde $x, y$ se obtienen {{c2::experimentalmente::determinación experimental}}."
                    },
                    {
                        "item_id": 1879945980149181004,
                        "type": "Flashcard",
                        "title": "Estequiometría de Velocidad en Reacción N2O5",
                        "front": "Para $2\\text{N}_2\\text{O}_5 \\to 4\\text{NO}_2 + \\text{O}_2$, exprese la relación entre la velocidad de desaparición de reactivo y aparición de productos.",
                        "back": "$$v = -\\frac{1}{2}\\frac{d[\\text{N}_2\\text{O}_5]}{dt} = \\frac{1}{4}\\frac{d[\\text{NO}_2]}{dt} = \\frac{d[\\text{O}_2]}{dt}$$<br>Por ende: $\\frac{d[\\text{NO}_2]}{dt} = -2\\frac{d[\\text{N}_2\\text{O}_5]}{dt}$, es decir, el dióxido de nitrógeno aparece al doble de rapidez con que desaparece el pentóxido de dinitrógeno."
                    },
                    {
                        "item_id": 1879945980183283069,
                        "type": "ClozeCard",
                        "title": "Expresión Diferencial de la Velocidad de Reacción",
                        "text": "Para una reacción química general: $$a A + b B \\longrightarrow c C + d D$$\\nLa velocidad de reacción instantánea $v$ se define normalizada por los coeficientes estequiométricos:\\n$$v = {{c1::-\\frac{1}{a}\\frac{d[A]}{dt} = -\\frac{1}{b}\\frac{d[B]}{dt} = +\\frac{1}{c}\\frac{d[C]}{dt} = +\\frac{1}{d}\\frac{d[D]}{dt}::expresión diferencial estequiométrica}}$$\\nLos signos negativos en reactivos indican que {{c2::se consumen::disminución temporal}}, y los positivos en productos indican que {{c3::se forman::aparición temporal}}."
                    },
                    {
                        "item_id": 1879945980183802249,
                        "type": "Flashcard",
                        "title": "Ley Experimental de Velocidad y Órdenes de Reacción",
                        "front": "Explique la diferencia fundamental entre los órdenes de reacción ($m, n$) y los coeficientes estequiométricos ($a, b$) en la ley de velocidad $v = k [A]^m [B]^n$.",
                        "back": "1. <b>Ley de Velocidad:</b> $v = k [A]^m [B]^n$, donde $k$ es la constante de velocidad, $m$ es el orden parcial respecto a $A$, $n$ es el orden parcial respecto a $B$, y $(m + n)$ es el <b>orden global</b>.<br>2. <b>Diferencia crucial:</b> Los órdenes de reacción $m$ y $n$ <b>no</b> tienen por qué coincidir con los coeficientes estequiométricos $a$ y $b$. Los órdenes son parámetros puramente <b>experimentales</b> determinados por el mecanismo de reacción y el paso determinante de la velocidad (RDS).<br>3. Solo en <b>reacciones elementales</b> (un solo choque molecular directo) los órdenes coinciden con la molecularidad estequiométrica."
                    }
                ]
            },
            {
                "note_id": "quim_02",
                "title": "Método de Velocidades Iniciales y Unidades de k",
                "x": 380.0,
                "y": 80.0,
                "tags": [
                    "Química",
                    "Velocidades Iniciales",
                    "Órdenes"
                ],
                "note_type": "standard",
                "desired_retention": 0.85,
                "cards": [
                    {
                        "item_id": 1879945980150060452,
                        "type": "ClozeCard",
                        "title": "Unidades de la Constante de Velocidad k",
                        "text": "Para reacción de orden global $n$:\\n$$[k] = {{c1::\\text{M}^{1-n} \\cdot \\text{s}^{-1} = \\text{mol}^{1-n} \\cdot \\text{L}^{n-1} \\cdot \\text{s}^{-1}::unidades generales}}$$\\n- Orden 0: $[k] = {{c2::\\text{M}\\cdot\\text{s}^{-1}::orden 0}}$\\n- Orden 1: $[k] = {{c3::\\text{s}^{-1}::orden 1}}$\\n- Orden 2: $[k] = {{c4::\\text{M}^{-1}\\cdot\\text{s}^{-1}::orden 2}}$."
                    },
                    {
                        "item_id": 1879945980151226426,
                        "type": "Flashcard",
                        "title": "Algoritmo: Método de Velocidades Iniciales",
                        "front": "¿Cómo se determinan los órdenes parciales en una tabla de ensayos experimentales?",
                        "back": "1. Elegir dos ensayos donde cambie $[A]$ y los demás reactivos se mantengan constantes.<br>2. Cociente de velocidades: $\\frac{v_2}{v_1} = \\left(\\frac{[A]_2}{[A]_1}\\right)^x \\implies x = \\frac{\\ln(v_2/v_1)}{\\ln([A]_2/[A]_1)}$.<br>3. Despejar $k = \\frac{v_0}{[A]_0^x [B]_0^y}$ y asignar sus unidades estrictas $\\text{M}^{1-n}\\text{s}^{-1}$."
                    },
                    {
                        "item_id": 1879945980185638030,
                        "type": "Flashcard",
                        "title": "Determinación de Órdenes por Cociente de Experimentos",
                        "front": "Si al duplicar la concentración $[A]_0$ manteniendo $[B]_0$ constante la velocidad inicial se cuadruplica, ¿cuál es el orden parcial respecto a $A$?",
                        "back": "Por la ley de velocidad: $\\frac{v_2}{v_1} = \\left(\\frac{[A]_2}{[A]_1}\\right)^m$.<br>Sustituyendo los datos: $4 = (2)^m \\implies 2^2 = 2^m \\implies m = 2$.<br>Por lo tanto, la reacción es de <b>segundo orden</b> respecto a $A$."
                    }
                ]
            },
            {
                "note_id": "quim_03",
                "title": "Cinética de Orden Cero",
                "x": 680.0,
                "y": 80.0,
                "tags": [
                    "Química",
                    "Orden 0",
                    "Vida Media"
                ],
                "note_type": "standard",
                "desired_retention": 0.85,
                "cards": [
                    {
                        "item_id": 1879945980152468432,
                        "type": "ClozeCard",
                        "title": "Leyes de Orden Cero",
                        "text": "Para reacción de orden 0 ($v = k$):\\n- Concentración temporal: $[A]_t = {{c1::[A]_0 - kt::ley integrada orden 0}}$\\n- Vida media: $t_{1/2} = {{c2::\\frac{[A]_0}{2k}::vida media orden 0}}$\\n- Gráfico lineal: $[A]$ vs $t$ con pendiente {{c3::-k::pendiente de orden 0}}."
                    },
                    {
                        "item_id": 1879945980187196677,
                        "type": "ClozeCard",
                        "title": "Comparativa de Leyes Integradas y Linealización",
                        "text": "Ecuaciones integradas de concentración vs tiempo para $A \\to \\text{productos}$:\\n- <b>Orden 0:</b> $[A]_t = {{c1::[A]_0 - kt::ecuación orden 0}}$ | Gráfico lineal: $[A]$ vs $t$ (pendiente $-k$) | Vida media: $t_{1/2} = {{c2::\\frac{[A]_0}{2k}::vida media orden 0}}$.\\n- <b>Orden 1:</b> $\\ln[A]_t = {{c3::\\ln[A]_0 - kt::ecuación orden 1}}$ | Gráfico lineal: $\\ln[A]$ vs $t$ (pendiente $-k$) | Vida media: $t_{1/2} = {{c4::\\frac{\\ln 2}{k} \\approx \\frac{0.693}{k}::vida media orden 1}}$ (independiente de $[A]_0$!).\\n- <b>Orden 2:</b> $\\frac{1}{[A]_t} = {{c5::\\frac{1}{[A]_0} + kt::ecuación orden 2}}$ | Gráfico lineal: $\\frac{1}{[A]}$ vs $t$ (pendiente $+k$) | Vida media: $t_{1/2} = {{c6::\\frac{1}{k[A]_0}::vida media orden 2}}$."
                    }
                ]
            },
            {
                "note_id": "quim_04",
                "title": "Cinética de Primer Orden y Decaimiento",
                "x": 980.0,
                "y": 80.0,
                "tags": [
                    "Química",
                    "Orden 1",
                    "Vida Media"
                ],
                "note_type": "standard",
                "desired_retention": 0.85,
                "cards": [
                    {
                        "item_id": 1879945980153701976,
                        "type": "ClozeCard",
                        "title": "Leyes de Primer Orden",
                        "text": "Para reacción de orden 1 ($v = k[A]$):\\n- Concentración: $\\ln[A]_t = {{c1::\\ln[A]_0 - kt \\iff [A]_t = [A]_0 e^{-kt}::forma integrada orden 1}}$\\n- Vida media: $t_{1/2} = {{c2::\\frac{\\ln 2}{k} \\approx \\frac{0.6931}{k}::vida media orden 1}}$ ({{c3::independiente de [A]_0::propiedad fundamental}}).\\n- Gráfico lineal: $\\ln[A]$ vs $t$ con pendiente $-k$."
                    },
                    {
                        "item_id": 1879945980154615508,
                        "type": "Flashcard",
                        "title": "Datación por Carbono-14",
                        "front": "Deduzca la fórmula para calcular la edad $t$ de un fósil a partir de su actividad remanente $A_t$ y su vida media $t_{1/2}$.",
                        "back": "El decaimiento radiactivo es cinéticamente de primer orden puro:<br>$$k = \\frac{\\ln 2}{t_{1/2}}$$<br>De la ley integrada: $\\ln(A_t / A_0) = -k t \\implies t = \\frac{1}{k}\\ln\\left(\\frac{A_0}{A_t}\\right) = \\frac{t_{1/2}}{\\ln 2} \\ln\\left(\\frac{A_0}{A_t}\\right)$."
                    },
                    {
                        "item_id": 1879945980187743716,
                        "type": "Flashcard",
                        "title": "Estrategia de Exceso de Reactivo para Pseudo-Orden",
                        "front": "Explique cómo se diseñan las condiciones experimentales de pseudo-primer orden para estudiar reacciones de orden superior como $v = k [A] [B]$.",
                        "back": "1. <b>Reactivo en gran exceso:</b> Se fija $[B]_0 \\gg [A]_0$ (por ejemplo, $[B]_0$ cien veces mayor que $[A]_0$).<br>2. A medida que avanza la reacción y $[A]$ se consume por completo, la concentración $[B]$ prácticamente no varía: $[B]_t \\approx [B]_0 = \\text{constante}$.<br>3. La ley de velocidad se simplifica a: $v = k_{\\text{obs}}[A]$, donde $k_{\\text{obs}} = k [B]_0$ es la constante aparente de pseudo-primer orden.<br>4. Esto permite utilizar las ecuaciones lineales simples de primer orden ($\\ln[A]$ vs $t$) para hallar $k_{\\text{obs}}$, y repitiendo el experimento a distintos $[B]_0$ se despeja la constante real $k$."
                    }
                ]
            },
            {
                "note_id": "quim_05",
                "title": "Cinética de Segundo Orden",
                "x": 1280.0,
                "y": 80.0,
                "tags": [
                    "Química",
                    "Orden 2",
                    "Vida Media"
                ],
                "note_type": "standard",
                "desired_retention": 0.85,
                "cards": [
                    {
                        "item_id": 1879945980155231250,
                        "type": "ClozeCard",
                        "title": "Leyes de Segundo Orden",
                        "text": "Para orden 2 ($v = k[A]^2$):\\n- Integrada: $\\frac{1}{[A]_t} = {{c1::\\frac{1}{[A]_0} + kt::forma integrada orden 2}}$\\n- Vida media: $t_{1/2} = {{c2::\\frac{1}{k[A]_0}::vida media orden 2}}$\\n- Gráfico lineal: $1/[A]$ vs $t$ con pendiente {{c3::+k (positiva)::pendiente positiva}}."
                    },
                    {
                        "item_id": 1879945980188795116,
                        "type": "ClozeCard",
                        "title": "Ecuación de Arrhenius y Linealización",
                        "text": "Dependencia de la constante de velocidad con la temperatura absoluta $T$:\\n$$k = {{c1::A e^{-E_a / RT}::ecuación de Arrhenius}}$$\\n- $E_a$: Energía de activación (energía mínima requerida para formar el complejo activado).\\n- $A$: Factor preexponencial de frecuencia (frecuencia de colisiones con orientación espacial favorable).\\n- Linealización: $$\\ln k = {{c2::\\ln A - \\frac{E_a}{R}\\left(\\frac{1}{T}\\right)::forma lineal de Arrhenius}}$$ (gráfico $\\ln k$ vs $1/T$ tiene pendiente $-\\frac{E_a}{R}$).\\n- Ecuación de dos temperaturas: $$\\ln\\left(\\frac{k_2}{k_1}\\right) = {{c3::-\\frac{E_a}{R}\\left(\\frac{1}{T_2} - \\frac{1}{T_1}\\right) = \\frac{E_a}{R}\\left(\\frac{T_2 - T_1}{T_1 T_2}\\right)::fórmula de 2 puntos}}$$."
                    },
                    {
                        "item_id": 1879945980190649403,
                        "type": "Flashcard",
                        "title": "Perfiles de Energía Potencial y Catálisis",
                        "front": "¿Cómo se relacionan las energías de activación directa e inversa con el cambio de entalpía $\\Delta H$, y cuál es el efecto exacto de un catalizador?",
                        "back": "1. <b>Relación entálpica:</b> $\\Delta H_{\\text{reacción}} = E_{a,\\text{directa}} - E_{a,\\text{inversa}}$.<br>Si $E_{a,\\text{dir}} > E_{a,\\text{inv}} \\implies \\Delta H > 0$ (endotérmica).<br>Si $E_{a,\\text{dir}} < E_{a,\\text{inv}} \\implies \\Delta H < 0$ (exotérmica).<br>2. <b>Efecto del catalizador:</b> Ofrece una ruta mecanística alterna con una menor energía de activación ($E_a' < E_a$), aumentando $k$ drásticamente.<br>3. <b>Invariantes:</b> Un catalizador <b>no</b> modifica el $\\Delta H$ de la reacción, <b>no</b> altera las energías iniciales ni finales, y <b>no</b> cambia la constante de equilibrio $K$."
                    }
                ]
            },
            {
                "note_id": "quim_06",
                "title": "Ecuación de Arrhenius y Dependencia Térmica",
                "x": 80.0,
                "y": 340.0,
                "tags": [
                    "Química",
                    "Arrhenius",
                    "Ea",
                    "Temperatura"
                ],
                "note_type": "standard",
                "desired_retention": 0.85,
                "cards": [
                    {
                        "item_id": 1879945980156864936,
                        "type": "ClozeCard",
                        "title": "Ecuación de Arrhenius",
                        "text": "Ecuación de Arrhenius:\\n$$k = {{c1::A e^{-E_a/(RT)}::forma exponencial de Arrhenius}}$$\\nLinealizada: $\\ln k = \\ln A - \\frac{E_a}{R}\\frac{1}{T}$ con pendiente {{c2::-E_a/R::pendiente de Arrhenius}}.\\nDos temperaturas: $\\ln(k_2/k_1) = {{c3::\\frac{E_a}{R}\\left(\\frac{1}{T_1} - \\frac{1}{T_2}\\right)::dos temperaturas}}$."
                    },
                    {
                        "item_id": 1879945980157215787,
                        "type": "Flashcard",
                        "title": "Regla de Duplicación cada 10°C",
                        "front": "Si una reacción duplica su velocidad al pasar de $20^\\circ\\text{C}$ a $30^\\circ\\text{C}$ ($k_2/k_1 = 2$), calcule $E_a$.",
                        "back": "$T_1 = 293.15\\,\\text{K}$ y $T_2 = 303.15\\,\\text{K}$.<br>$\\ln 2 = \\frac{E_a}{8.314}\\left(\\frac{10}{293.15 \\times 303.15}\\right) \\implies E_a \\approx 51.2\\,\\text{kJ/mol}$."
                    },
                    {
                        "item_id": 1879945980191617209,
                        "type": "ClozeCard",
                        "title": "Relación Fundamental entre Kc y Kp",
                        "text": "Para una reacción en fase gaseosa: $a A(g) + b B(g) \\rightleftharpoons c C(g) + d D(g)$:\\n- Constante en concentraciones molares: $$K_c = \\frac{[C]^c [D]^d}{[A]^a [B]^b}$$\\n- Constante en presiones parciales: $$K_p = \\frac{P_C^c P_D^d}{P_A^a P_B^b}$$\\n- Relación termodinámica ideal: $$K_p = {{c1::K_c (R T)^{\\Delta n_{\\text{gas}}}::conversión Kc a Kp}}$$donde $\\Delta n_{\\text{gas}} = {{c2::(c + d) - (a + b)::variación de moles gaseosos}}$$, y $R = 0.08206 \\text{ atm}\\cdot\\text{L}/(\\text{mol}\\cdot\\text{K})$."
                    },
                    {
                        "item_id": 1879945980191883918,
                        "type": "Flashcard",
                        "title": "Equilibrios Heterogéneos y Omisión de Sólidos y Líquidos Puros",
                        "front": "¿Por qué los sólidos puros (s) y los líquidos puros (l) no se incluyen en las expresiones de $K_c$ o $K_p$?",
                        "back": "En termodinámica química, las constantes de equilibrio se escriben en términos de <b>actividades químicas</b> ($a_i$).<br>Para sólidos puros y líquidos puros bajo presiones ordinarias, la concentración molar es constante (su densidad dividida por la masa molar no cambia) y su actividad estándar es idéntica a la unidad: $a_{\\text{sólido}} = 1$, $a_{\\text{líquido}} = 1$.<br>Ejemplo: Para $\\text{CaCO}_3(s) \\rightleftharpoons \\text{CaO}(s) + \\text{CO}_2(g)$, $K_c = [\\text{CO}_2]$ y $K_p = P_{\\text{CO}_2}$."
                    }
                ]
            },
            {
                "note_id": "quim_07",
                "title": "Mecanismos de Reacción, RDS y SSA",
                "x": 380.0,
                "y": 340.0,
                "tags": [
                    "Química",
                    "Mecanismos",
                    "RDS",
                    "SSA"
                ],
                "note_type": "standard",
                "desired_retention": 0.85,
                "cards": [
                    {
                        "item_id": 1879945980158764267,
                        "type": "ClozeCard",
                        "title": "Etapa Limitante y Estado Estacionario",
                        "text": "- La velocidad global está gobernada por la etapa {{c1::más lenta (Rate Determining Step, RDS)::etapa limitante}}.\\n- Para intermediarios reactivos inestables $I$: $\\frac{d[I]}{dt} \\approx {{c2::0 (Aproximación de Estado Estacionario, SSA)::derivada nula}}$.\\n- Si $[B]_0 \\gg [A]_0$, se sigue cinética de {{c3::pseudo-primer orden::pseudo orden}} con $k_{\\text{obs}} = k[B]_0^y$."
                    },
                    {
                        "item_id": 1879945980193343515,
                        "type": "ClozeCard",
                        "title": "Comparación Q vs K y Sentido Espontáneo de Avance",
                        "text": "El cociente de reacción $Q$ tiene la misma forma matemática que $K$, pero evaluado con las concentraciones instantáneas no necesariamente en equilibrio:\\n- Si $Q < K$: Existen menos productos de los requeridos; la reacción neta avanza hacia la {{c1::derecha (productos)::sentido directo}} ($\\longrightarrow$).\\n- Si $Q > K$: Existen más productos de los debidos; la reacción neta retrocede hacia la {{c2::izquierda (reactivos)::sentido inverso}} ($\\longleftarrow$).\\n- Si $Q = K$: El sistema se encuentra en {{c3::equilibrio químico dinámico::estado estacionario}}."
                    },
                    {
                        "item_id": 1879945980194792901,
                        "type": "Flashcard",
                        "title": "Perturbaciones de Le Chatelier: Presión, Volumen y Gas Inerte",
                        "front": "Analice el desplazamiento del equilibrio por el Principio de Le Chatelier ante: 1) Disminución de volumen (aumento de presión), 2) Adición de gas inerte a volumen constante, 3) Adición de gas inerte a presión constante.",
                        "back": "1. <b>Disminución de volumen ($P \\uparrow$):</b> El sistema se desplaza hacia el lado con <b>menor número de moles gaseosos</b> ($\\Delta n_{\\text{gas}}$ menor) para aliviar el aumento de presión.<br>2. <b>Gas inerte a $V = \\text{cte}$ (recipiente rígido):</b> La presión total aumenta, pero las presiones parciales de cada gas reaccionante ($P_i = n_i R T / V$) <b>permanecen idénticas</b>. $Q$ no cambia, por lo que el equilibrio <b>no se desplaza</b>.<br>3. <b>Gas inerte a $P = \\text{cte}$ (émbolo móvil):</b> El volumen total debe expandirse. Esto diluye las concentraciones y disminuye las presiones parciales, desplazando el equilibrio hacia el lado con <b>mayor número de moles gaseosos</b>."
                    }
                ]
            },
            {
                "note_id": "quim_08",
                "title": "Catálisis y Complejo Activado",
                "x": 680.0,
                "y": 340.0,
                "tags": [
                    "Química",
                    "Catálisis",
                    "Complejo Activado"
                ],
                "note_type": "standard",
                "desired_retention": 0.85,
                "cards": [
                    {
                        "item_id": 1879945980160029441,
                        "type": "Flashcard",
                        "title": "Rol del Catalizador: Qué Altera y Qué NO Altera",
                        "front": "En una reacción reversible, ¿qué magnitudes altera y cuáles NO altera un catalizador?",
                        "back": "1. <b>SÍ altera:</b> Disminuye $E_a$; incrementa $k_{\\text{dir}}$ y $k_{\\text{inv}}$ en el mismo factor; acelera el tiempo de llegada al equilibrio.<br>2. <b>NO altera:</b> $\\Delta G^\\circ$, $\\Delta H^\\circ$, $K_{\\text{eq}}$ ni las concentraciones finales de equilibrio. No se consume."
                    },
                    {
                        "item_id": 1879945980194961138,
                        "type": "ClozeCard",
                        "title": "Ecuación de Van 't Hoff y Termodinámica",
                        "text": "La única perturbación que altera el valor numérico de la constante de equilibrio $K$ es el cambio de <b>temperatura</b>:\\n$$\\ln\\left(\\frac{K_2}{K_1}\\right) = {{c1::-\\frac{\\Delta H^\\circ}{R}\\left(\\frac{1}{T_2} - \\frac{1}{T_1}\\right)::ecuación de Van 't Hoff}}$$\\n- Reacción Endotérmica ($\\Delta H^\\circ > 0$, el calor actúa como reactivo): Al aumentar $T \\implies$ {{c2::$K$ aumenta y se desplaza a productos::comportamiento endotérmico}}.\\n- Reacción Exotérmica ($\\Delta H^\\circ < 0$, el calor actúa como producto): Al aumentar $T \\implies$ {{c3::$K$ disminuye y se desplaza a reactivos::comportamiento exotérmico}}."
                    }
                ]
            },
            {
                "note_id": "quim_09",
                "title": "Constantes de Equilibrio Kc y Kp",
                "x": 980.0,
                "y": 340.0,
                "tags": [
                    "Química",
                    "Equilibrio",
                    "Kc",
                    "Kp"
                ],
                "note_type": "standard",
                "desired_retention": 0.85,
                "cards": [
                    {
                        "item_id": 1879945980160925702,
                        "type": "ClozeCard",
                        "title": "Relación entre Kp y Kc",
                        "text": "Para reacción gaseosa $aA(g) + bB(g) \\rightleftharpoons cC(g) + dD(g)$:\\n$$K_p = {{c1::K_c (RT)^{\\Delta n_{(g)}}::conversión Kp Kc}}$$\\ndonde $\\Delta n_{(g)} = {{c2::(c + d) - (a + b)::moles de gas productos menos reactivos}}$.\\nSi $\\Delta n_{(g)} = 0 \\implies K_p {{c3::= K_c::igualdad}}$."
                    },
                    {
                        "item_id": 1879945980196423434,
                        "type": "ClozeCard",
                        "title": "Autoionización del Agua y Kw",
                        "text": "En disolución acuosa a $25^\\circ\\text{C}$:\\n$$2 \\text{H}_2\\text{O}(l) \\rightleftharpoons \\text{H}_3\\text{O}^+(aq) + \\text{OH}^-(aq)$$\\n- Producto iónico del agua: $$K_w = [\\text{H}^+][\\text{OH}^-] = {{c1::1.0 \\times 10^{-14}::valor de Kw a 25C}}$$\\n- Escalas logarítmicas: $\\text{pH} = -\\log[\\text{H}^+]$ y $\\text{pOH} = -\\log[\\text{OH}^-]$.\\n- Relación fundamental: $$\\text{pH} + \\text{pOH} = {{c2::14.00::suma a 25C}}$$ (a mayor temperatura, como la disociación es endotérmica, $K_w$ aumenta y el pH neutro disminuye)."
                    }
                ]
            },
            {
                "note_id": "quim_10",
                "title": "Cociente de Reacción Q y Espontaneidad",
                "x": 1280.0,
                "y": 340.0,
                "tags": [
                    "Química",
                    "Cociente Q",
                    "Evolución Espontánea"
                ],
                "note_type": "standard",
                "desired_retention": 0.85,
                "cards": [
                    {
                        "item_id": 1879945980161580924,
                        "type": "ClozeCard",
                        "title": "Criterio de Evolución con Q",
                        "text": "- Si $Q < K$: La reacción avanza hacia la {{c1::derecha (hacia productos)::sentido directo}}.\\n- Si $Q = K$: Sistema en {{c2::equilibrio dinámico::equilibrio}}.\\n- Si $Q > K$: La reacción avanza hacia la {{c3::izquierda (hacia reactivos)::sentido inverso}}.\\nRegla de sólidos y líquidos puros: Tienen actividad 1 y {{c4::NO se incluyen en K::exclusión de sólidos}}."
                    },
                    {
                        "item_id": 1879945980197617912,
                        "type": "ClozeCard",
                        "title": "Tabla ICE y la Regla del 5%",
                        "text": "Para un ácido monoprótico débil: $\\text{HA} + \\text{H}_2\\text{O} \\rightleftharpoons \\text{H}_3\\text{O}^+ + \\text{A}^-$ con concentración inicial $C_0$:\\nPor tabla ICE en equilibrio: $[\\text{HA}] = C_0 - x$, $[\\text{H}^+] = x$, $[\\text{A}^-] = x$.\\n$$K_a = \\frac{x^2}{C_0 - x}$$\\n- <b>Regla del 5% / Criterio de los 400:</b> Si {{c1::$\\frac{C_0}{K_a} > 400$::criterio de aproximación}}, se puede despreciar $x$ frente a $C_0$ ($C_0 - x \\approx C_0$):\\n$$x = [\\text{H}^+] \\approx {{c2::\\sqrt{K_a C_0}::fórmula simplificada}}$$.\\nSi el porcentaje de ionización $\\alpha = \\frac{x}{C_0}\\times 100\\% > 5\\%$, debe resolverse la ecuación cuadrática exacta."
                    },
                    {
                        "item_id": 1879945980198448383,
                        "type": "Flashcard",
                        "title": "Relación entre Pares Ácido-Base Conjugados",
                        "front": "Deduzca la relación entre la constante de acidez $K_a$ de un ácido débil y la constante de basicidad $K_b$ de su base conjugada.",
                        "back": "1. Ácido: $\\text{HA} + \\text{H}_2\\text{O} \\rightleftharpoons \\text{H}_3\\text{O}^+ + \\text{A}^-$, con $K_a = \\frac{[\\text{H}_3\\text{O}^+][\\text{A}^-]}{[\\text{HA}]}$.<br>2. Base conjugada: $\\text{A}^- + \\text{H}_2\\text{O} \\rightleftharpoons \\text{HA} + \\text{OH}^-$, con $K_b = \\frac{[\\text{HA}][\\text{OH}^-]}{[\\text{A}^-]}$.<br>3. Multiplicando ambas constantes:<br>$$K_a \\cdot K_b = \\left(\\frac{[\\text{H}_3\\text{O}^+][\\text{A}^-]}{[\\text{HA}]}\\right)\\left(\\frac{[\\text{HA}][\\text{OH}^-]}{[\\text{A}^-]}\\right) = [\\text{H}_3\\text{O}^+][\\text{OH}^-] = K_w$$<br>4. Tomando $-\\log$: $\\text{p}K_a + \\text{p}K_b = \\text{p}K_w = 14.00$ a $25^\\circ\\text{C}$."
                    }
                ]
            },
            {
                "note_id": "quim_11",
                "title": "Termodinámica: Relación entre Delta G° y K",
                "x": 80.0,
                "y": 600.0,
                "tags": [
                    "Química",
                    "Termodinámica",
                    "Delta G",
                    "Equilibrio"
                ],
                "note_type": "standard",
                "desired_retention": 0.85,
                "cards": [
                    {
                        "item_id": 1879945980163098601,
                        "type": "ClozeCard",
                        "title": "Energía Libre y Constante de Equilibrio",
                        "text": "$$\\Delta G^\\circ = {{c1::-RT \\ln K::relación Delta G y K}} \\iff K = {{c2::\\exp\\left(-\\frac{\\Delta G^\\circ}{RT}\\right)::K exponencial}}$$\\nBajo condiciones no estándar:\\n$$\\Delta G = {{c3::\\Delta G^\\circ + RT \\ln Q::Delta G no estándar}}$$\\nEn el equilibrio: $\\Delta G = {{c4::0::Delta G en equilibrio}}$."
                    },
                    {
                        "item_id": 1879945980200331754,
                        "type": "Flashcard",
                        "title": "Diagnóstico del Comportamiento Ácido-Base de Sales",
                        "front": "Clasifique el carácter de las disoluciones acuosas de: 1) NaCl, 2) NH4Cl, 3) CH3COONa, 4) NH4F.",
                        "back": "1. <b>NaCl (Ácido fuerte HCl + Base fuerte NaOH):</b> Ningún ión se hidroliza. Disolución <b>neutra</b> ($\\text{pH} = 7$).<br>2. <b>NH4Cl (Ácido fuerte HCl + Base débil NH3):</b> El catión amonio se hidroliza: $\\text{NH}_4^+ + \\text{H}_2\\text{O} \\rightleftharpoons \\text{NH}_3 + \\text{H}_3\\text{O}^+$. Disolución <b>ácida</b> ($\\text{pH} < 7$). Constante: $K_a = K_w / K_{b,\\text{NH}_3}$.<br>3. <b>CH3COONa (Ácido débil CH3COOH + Base fuerte NaOH):</b> El anión acetato se hidroliza: $\\text{CH}_3\\text{COO}^- + \\text{H}_2\\text{O} \\rightleftharpoons \\text{CH}_3\\text{COOH} + \\text{OH}^-$. Disolución <b>básica</b> ($\\text{pH} > 7$). Constante: $K_b = K_w / K_{a,\\text{acético}}$.<br>4. <b>NH4F (Ácido débil + Base débil):</b> Ambos se hidrolizan; se comparan $K_a(\\text{NH}_4^+)$ y $K_b(\\text{F}^-)$. Si $K_a > K_b$ ácida, si $K_b > K_a$ básica."
                    }
                ]
            },
            {
                "note_id": "quim_12",
                "title": "Principio de Le Châtelier (Presión y Concentración)",
                "x": 380.0,
                "y": 600.0,
                "tags": [
                    "Química",
                    "Le Châtelier",
                    "Presión",
                    "Gases Inertes"
                ],
                "note_type": "standard",
                "desired_retention": 0.85,
                "cards": [
                    {
                        "item_id": 1879945980164397385,
                        "type": "Flashcard",
                        "title": "Efecto de Compresión y Gases Inertes",
                        "front": "Analice según Le Châtelier: (1) Reducción de volumen, y (2) Adición de gas inerte a volumen constante.",
                        "back": "1. <b>Reducción de volumen:</b> Aumenta la presión; se desplaza hacia el lado con <b>menor número de moles gaseosos</b>.<br>2. <b>Gas inerte a volumen constante:</b> Las presiones parciales de reactivos y productos no cambian; $Q$ permanece intacto y el equilibrio <b>NO se desplaza</b>."
                    },
                    {
                        "item_id": 1879945980201237291,
                        "type": "ClozeCard",
                        "title": "Ecuación de Henderson-Hasselbalch",
                        "text": "Para un sistema amortiguador compuesto por un ácido débil $\\text{HA}$ y su base conjugada $\\text{A}^-$:\\n- Ecuación de Henderson-Hasselbalch: $$\\text{pH} = {{c1::\\text{p}K_a + \\log\\left(\\frac{[\\text{A}^-]}{[\\text{HA}]}\\right) = \\text{p}K_a + \\log\\left(\\frac{n_{\\text{base}}}{n_{\\text{ácido}}}\\right)::ecuación reguladora}}$$.\\n- Máxima capacidad amortiguadora: Ocurre cuando $[\\text{HA}] = [\\text{A}^-]$, donde $\\log(1) = 0 \\implies \\text{pH} = {{c2::\\text{p}K_a::pH de máxima capacidad}}$.\\n- Rango eficaz de amortiguación: $$\\text{pH} = {{c3::\\text{p}K_a \\pm 1::intervalo de amortiguación}}$$."
                    },
                    {
                        "item_id": 1879945980203089754,
                        "type": "Flashcard",
                        "title": "Perturbación Cuantitativa de Buffers ante Adición de Ácido/Base Fuerte",
                        "front": "Explique la metodología de dos pasos para calcular el nuevo pH de un buffer tras agregar una cantidad estequiométrica $n_{\\text{agregada}}$ de base fuerte (OH-) o ácido fuerte (H+).",
                        "back": "1. <b>Paso 1: Estequiometría de Neutralización Completa (moles):</b><br>- Si se agrega $\\text{OH}^-$: Reacciona con el ácido débil: $\\text{HA} + \\text{OH}^- \\longrightarrow \\text{A}^- + \\text{H}_2\\text{O}$.<br>Nuevos moles: $n_{\\text{HA}}' = n_{\\text{HA}} - n_{\\text{OH}^-}$, y $n_{\\text{A}^-}' = n_{\\text{A}^-} + n_{\\text{OH}^-}$.<br>- Si se agrega $\\text{H}^+$: Reacciona con la base conjugada: $\\text{A}^- + \\text{H}^+ \\longrightarrow \\text{HA}$.<br>Nuevos moles: $n_{\\text{A}^-}' = n_{\\text{A}^-} - n_{\\text{H}^+}$, y $n_{\\text{HA}}' = n_{\\text{HA}} + n_{\\text{H}^+}$.<br>2. <b>Paso 2: Recalcular pH con Henderson-Hasselbalch:</b><br>$$\\text{pH}' = \\text{p}K_a + \\log\\left(\\frac{n_{\\text{A}^-}'}{n_{\\text{HA}}'}\\right)$$"
                    }
                ]
            },
            {
                "note_id": "quim_13",
                "title": "Temperatura en Equilibrio y Ecuación de van 't Hoff",
                "x": 680.0,
                "y": 600.0,
                "tags": [
                    "Química",
                    "van 't Hoff",
                    "Temperatura"
                ],
                "note_type": "standard",
                "desired_retention": 0.85,
                "cards": [
                    {
                        "item_id": 1879945980165592359,
                        "type": "ClozeCard",
                        "title": "Ecuación de van 't Hoff",
                        "text": "La temperatura es la ÚNICA variable que cambia el valor de $K$:\\n$$\\ln\\left(\\frac{K_2}{K_1}\\right) = {{c1::\\frac{\\Delta H^\\circ}{R}\\left(\\frac{T_2 - T_1}{T_1 T_2}\\right)::van 't Hoff}}$$\\n- Endotérmica ($\\Delta H^\\circ > 0$): Aumentar $T$ {{c2::aumenta K (favorece productos)::efecto endotérmico}}.\\n- Exotérmica ($\\Delta H^\\circ < 0$): Aumentar $T$ {{c3::disminuye K (favorece reactivos)::efecto exotérmico}}."
                    },
                    {
                        "item_id": 1879945980203804783,
                        "type": "Flashcard",
                        "title": "Las 4 Regiones de Titulación de Ácido Débil con Base Fuerte",
                        "front": "Describa los 4 puntos clave en la curva de titulación de un ácido débil HA con una base fuerte NaOH.",
                        "back": "1. <b>Punto Inicial ($V_{\\text{NaOH}} = 0$):</b> Disolución simple de ácido débil. Se calcula con $K_a$ y tabla ICE: $[\\text{H}^+] \\approx \\sqrt{K_a C_0}$.<br>2. <b>Región Buffer / Zona Amortiguadora:</b> Coexisten $\\text{HA}$ y $\\text{A}^-$. En el <b>punto de semi-equivalencia</b> ($V = V_{\\text{eq}}/2$), $[\\text{HA}] = [\\text{A}^-] \\implies \\text{pH} = \\text{p}K_a$.<br>3. <b>Punto de Equivalencia ($V = V_{\\text{eq}}$):</b> Todo el $\\text{HA}$ se neutralizó formando la sal básica $\\text{A}^-$. El $\\text{pH} > 7$ por hidrólisis: $[\\text{OH}^-] \\approx \\sqrt{K_b C_{\\text{sal}}}$.<br>4. <b>Exceso de Titulante ($V > V_{\\text{eq}}$):</b> El pH está dominado por el $\\text{NaOH}$ fuerte remanente: $[\\text{OH}^-] = \\frac{n_{\\text{NaOH exceso}}}{V_{\\text{total}}}$."
                    }
                ]
            },
            {
                "note_id": "quim_14",
                "title": "Grado de Disociación Gaseosa alpha",
                "x": 980.0,
                "y": 600.0,
                "tags": [
                    "Química",
                    "Disociación",
                    "alpha"
                ],
                "note_type": "standard",
                "desired_retention": 0.85,
                "cards": [
                    {
                        "item_id": 1879945980167158368,
                        "type": "Flashcard",
                        "title": "Deducción de Kp con Grado de Disociación alpha",
                        "front": "Para $\\ce{A(g) <=> B(g) + C(g)}$ a presión $P_{\\text{tot}}$, deduzca $K_p$ en función de $\\alpha$ y $P_{\\text{tot}}$.",
                        "back": "1. Moles en equilibrio: $n_A = n_0(1-\\alpha)$, $n_B = n_C = n_0\\alpha$. Total: $n_{\\text{tot}} = n_0(1+\\alpha)$.<br>2. Fracciones molares: $X_A = \\frac{1-\\alpha}{1+\\alpha}$, $X_B = X_C = \\frac{\\alpha}{1+\\alpha}$.<br>3. Constante $K_p$:<br>$$K_p = \\frac{P_B P_C}{P_A} = \\frac{\\left(\\frac{\\alpha}{1+\\alpha} P_{\\text{tot}}\\right)^2}{\\frac{1-\\alpha}{1+\\alpha} P_{\\text{tot}}} = \\frac{\\alpha^2}{1-\\alpha^2} P_{\\text{tot}}$$"
                    },
                    {
                        "item_id": 1879945980204326238,
                        "type": "ProofSequenceCard",
                        "title": "Algoritmo de 7 Pasos para Balancear Reacciones Redox en Medio Ácido y Básico",
                        "premise": "Describa la secuencia estandarizada del método del ión-electrón para balancear cualquier reacción redox.",
                        "steps": [
                            "1. Identificar estados de oxidación y separar la reacción global en las dos semirreacciones: semirreacción de oxidación y semirreacción de reducción.",
                            "2. Balancear todos los átomos distintos de oxígeno e hidrógeno mediante coeficientes estequiométricos.",
                            "3. Balancear los átomos de oxígeno añadiendo moléculas de agua $\\text{H}_2\\text{O}$ al lado deficitario.",
                            "4. Balancear los átomos de hidrógeno añadiendo protones $\\text{H}^+$ al lado opuesto (balance en medio ácido).",
                            "5. Si el medio es básico: Neutralizar todos los $\\text{H}^+$ sumando una cantidad idéntica de $\\text{OH}^-$ a ambos lados de la ecuación, combinando $\\text{H}^+ + \\text{OH}^- \\to \\text{H}_2\\text{O}$ y cancelando aguas excedentes.",
                            "6. Balancear las cargas netas agregando electrones $e^-$ al lado más positivo.",
                            "7. Multiplicar cada semirreacción por factores enteros mínimos para igualar el número de electrones ganados y perdidos, y sumarlas cancelando electrones e intermediarios $\\blacksquare$."
                        ]
                    }
                ]
            },
            {
                "note_id": "quim_15",
                "title": "Autoionización del Agua, pH y pOH",
                "x": 1280.0,
                "y": 600.0,
                "tags": [
                    "Química",
                    "Ácido-Base",
                    "pH",
                    "Kw"
                ],
                "note_type": "standard",
                "desired_retention": 0.85,
                "cards": [
                    {
                        "item_id": 1879945980167679065,
                        "type": "ClozeCard",
                        "title": "Constante Kw y Relación pH-pOH",
                        "text": "A $25^\\circ\\text{C}$:\\n- $K_w = [\\text{H}^+][\\text{OH}^-] = {{c1::1.0 \\times 10^{-14}::valor de Kw}}$\\n- $\\text{pH} + \\text{pOH} = {{c2::14.00::suma}}$\\n- Pares conjugados: $K_a \\cdot K_b = {{c3::K_w::producto Ka y Kb}}$ y $\\text{p}K_a + \\text{p}K_b = 14.00$."
                    },
                    {
                        "item_id": 1879945980169124620,
                        "type": "Flashcard",
                        "title": "Variación de Kw con la Temperatura",
                        "front": "La autoionización del agua es endotérmica ($\\Delta H^\\circ > 0$). A $50^\\circ\\text{C}$, $K_w = 5.5 \\times 10^{-14}$. Calcule el pH neutro.",
                        "back": "En agua pura neutra: $[\\text{H}^+] = [\\text{OH}^-] = \\sqrt{K_w} = \\sqrt{5.5 \\times 10^{-14}} \\approx 2.345 \\times 10^{-7}\\,\\text{M}$.<br>$$\\text{pH} = -\\log_{10}(2.345 \\times 10^{-7}) \\approx 6.63$$<br>El agua sigue siendo <b>estrictamente neutra</b> a pesar de tener $\\text{pH} = 6.63$, porque $[\\text{H}^+] = [\\text{OH}^-]$."
                    },
                    {
                        "item_id": 1879945980205426272,
                        "type": "ClozeCard",
                        "title": "Componentes Canónicos de una Celda Galvánica",
                        "text": "En una celda electroquímica espontánea (galvánica o voltaica):\\n- <b>Ánodo:</b> Electrodo con polaridad {{c1::negativa (-)::signo de ánodo}}, donde ocurre siempre la {{c2::oxidación::proceso anódico}} ($A \\to A^{n+} + n e^-$).\\n- <b>Cátodo:</b> Electrodo con polaridad {{c3::positiva (+)::signo de cátodo}}, donde ocurre siempre la {{c4::reducción::proceso catódico}} ($C^{m+} + m e^- \\to C$).\\n- <b>Puente Salino:</b> Mantiene la neutralidad eléctrica permitiendo que los {{c5::aniones migren al ánodo y los cationes al cátodo::flujo iónico}}.\\n- Potencial estándar de celda: $$E^\\circ_{\\text{celda}} = {{c6::E^\\circ_{\\text{cátodo}} - E^\\circ_{\\text{ánodo}}::potencial estándar}}$$ (utilizando siempre los potenciales de reducción de tabla)."
                    }
                ]
            },
            {
                "note_id": "quim_16",
                "title": "Ácidos Débiles y Regla del 5%",
                "x": 80.0,
                "y": 860.0,
                "tags": [
                    "Química",
                    "Ácido Débil",
                    "Ka",
                    "Regla del 5%"
                ],
                "note_type": "standard",
                "desired_retention": 0.85,
                "cards": [
                    {
                        "item_id": 1879945980169852159,
                        "type": "Flashcard",
                        "title": "Cálculo de pH y Criterio de la Regla del 5%",
                        "front": "Para un ácido débil $HA$ ($C_0, K_a$), ¿cuándo vale $[\\text{H}^+] \\approx \\sqrt{K_a C_0}$?",
                        "back": "1. <b>Regla del 5%:</b> Válida si $\\alpha = x/C_0 < 0.05$, equivalente a:<br>$$\\frac{C_0}{K_a} > 400$$<br>En tal caso: $[\\text{H}^+] \\approx \\sqrt{K_a C_0} \\implies \\text{pH} = \\frac{1}{2}(\\text{p}K_a - \\log_{10} C_0)$.<br>2. <b>Si $\\frac{C_0}{K_a} \\le 400$:</b> Obligatorio resolver la cuadrática exacta: $x^2 + K_a x - K_a C_0 = 0$."
                    },
                    {
                        "item_id": 1879945980171065955,
                        "type": "ClozeCard",
                        "title": "Ácidos Polipróticos",
                        "text": "Para un ácido poliprótico como $\\ce{H3PO4}$ donde $K_{a1} \\gg K_{a2} \\gg K_{a3}$:\\n- El pH está gobernado casi exclusivamente por {{c1::la primera disociación Ka1::primera disociación}}.\\n- La concentración del anión divalente es $[\\ce{HPO4^{2-}}] \\approx {{c2::K_{a2}::Ka2}}$."
                    },
                    {
                        "item_id": 1879945980207363668,
                        "type": "ClozeCard",
                        "title": "Relaciones Termodinámicas Fundamentales",
                        "text": "Interconexión entre electroquímica y termodinámica química:\\n- Energía Libre de Gibbs estándar: $$\\Delta G^\\circ = {{c1::-n F E^\\circ_{\\text{celda}}::energía libre}}$$ con $F = 96485 \\text{ C/mol } e^-$.\\nPara que una reacción sea espontánea: $\\Delta G^\\circ < 0 \\iff E^\\circ_{\\text{celda}} > 0$.\\n- Relación con la constante de equilibrio a $25^\\circ\\text{C}$ ($298.15\\text{ K}$): $$E^\\circ_{\\text{celda}} = {{c2::\\frac{0.0592}{n}\\log K::potencial estándar vs K}}$$\\n- Ecuación de Nernst para condiciones no estándar: $$E = {{c3::E^\\circ - \\frac{0.0592}{n}\\log Q::ecuación de Nernst}}$$\\nEn el equilibrio químico: $E = 0$ y $Q = K$."
                    },
                    {
                        "item_id": 1879945980208209281,
                        "type": "Flashcard",
                        "title": "Leyes de Electrólisis de Faraday",
                        "front": "Escriba la fórmula para calcular la masa $m$ de sustancia depositada o liberada en un electrodo durante una electrólisis con corriente $I$ durante un tiempo $t$.",
                        "back": "1. <b>Carga eléctrica total transferida:</b> $q = I \\cdot t$ (con $I$ en amperios y $t$ en segundos).<br>2. <b>Moles de electrones transferidos:</b> $n_e = \\frac{q}{F} = \\frac{I \\cdot t}{F}$, donde $F = 96485 \\text{ C/mol}$.<br>3. <b>Moles de sustancia depositada:</b> Cada mol de sustancia requiere $n$ moles de electrones según la semirreacción de reducción ($M^{n+} + n e^- \\to M$), luego $n_{\\text{metal}} = \\frac{n_e}{n} = \\frac{I \\cdot t}{n F}$.<br>4. <b>Masa depositada:</b><br>$$m = n_{\\text{metal}} \\cdot M_m = \\frac{M_m \\cdot I \\cdot t}{n \\cdot F}$$ (donde $M_m$ es la masa molar del elemento depositado)."
                    }
                ]
            },
            {
                "note_id": "quim_17",
                "title": "Hidrólisis de Sales Básicas y Ácidas",
                "x": 380.0,
                "y": 860.0,
                "tags": [
                    "Química",
                    "Hidrólisis",
                    "Sal Básica",
                    "Sal Ácida"
                ],
                "note_type": "standard",
                "desired_retention": 0.85,
                "cards": [
                    {
                        "item_id": 1879945980172179337,
                        "type": "ClozeCard",
                        "title": "Fórmulas de Hidrólisis de Sales",
                        "text": "Para concentración de sal $C_s$:\\n- Sal básica ($A^-$): $K_b = \\frac{K_w}{K_a}$, $[\\text{OH}^-] \\approx {{c1::\\sqrt{K_b C_s} = \\sqrt{\\frac{K_w}{K_a} C_s}::OH en sal básica}}$.\\n- Sal ácida ($BH^+$): $K_a = \\frac{K_w}{K_b}$, $[\\text{H}^+] \\approx {{c2::\\sqrt{K_a C_s} = \\sqrt{\\frac{K_w}{K_b} C_s}::H en sal ácida}}$.\\n- Sales de ácido fuerte y base fuerte (ej. $\\ce{NaCl}$): no se hidrolizan, $\\text{pH} = {{c3::7.00::neutro}}$."
                    }
                ]
            },
            {
                "note_id": "quim_18",
                "title": "Soluciones Buffer y Henderson-Hasselbalch",
                "x": 680.0,
                "y": 860.0,
                "tags": [
                    "Química",
                    "Buffer",
                    "Henderson-Hasselbalch"
                ],
                "note_type": "standard",
                "desired_retention": 0.85,
                "cards": [
                    {
                        "item_id": 1879945980173610761,
                        "type": "ClozeCard",
                        "title": "Ecuación de Henderson-Hasselbalch",
                        "text": "Para amortiguador de ácido débil $HA$ y su sal $A^-$:\\n$$\\text{pH} = {{c1::\\text{p}K_a + \\log_{10}\\left(\\frac{[A^-]}{[HA]}\\right) = \\text{p}K_a + \\log_{10}\\left(\\frac{n_{A^-}}{n_{HA}}\\right)::Henderson-Hasselbalch}}$$\\nMáxima capacidad amortiguadora: cuando $[A^-] = [HA]$, donde $\\text{pH} = {{c2::\\text{p}K_a::pH óptimo}}$.\\nRango de amortiguamiento útil: $\\text{pH} = {{c3::\\text{p}K_a \\pm 1::rango de efectividad}}$."
                    }
                ]
            },
            {
                "note_id": "quim_19",
                "title": "Perturbación Estequiométrica de Buffers",
                "x": 980.0,
                "y": 860.0,
                "tags": [
                    "Química",
                    "Perturbación",
                    "Buffer",
                    "Neutralización"
                ],
                "note_type": "standard",
                "desired_retention": 0.85,
                "cards": [
                    {
                        "item_id": 1879945980174797757,
                        "type": "ProofSequenceCard",
                        "title": "Cálculo de pH tras Perturbar un Buffer con Ácido o Base Fuerte",
                        "premise": "Determinar el nuevo pH de un buffer tras agregar ácido o base fuerte.",
                        "steps": [
                            "Paso 1 (Neutralización): Si se añade ácido fuerte $H^+$, reacciona con la base conjugada: $A^- + H^+ \\to HA$.",
                            "Paso 2 (Actualización de moles): $n'_{A^-} = n_{A^-} - n_{H^+}$ y $n'_{HA} = n_{HA} + n_{H^+}$.",
                            "Paso 3 (Alternativa con base fuerte $OH^-$): Reacciona con el ácido débil: $HA + OH^- \\to A^- + H_2O \\implies n'_{HA} = n_{HA} - n_{OH^-}$ y $n'_{A^-} = n_{A^-} + n_{OH^-}$.",
                            "Paso 4 (Henderson-Hasselbalch): $\\text{pH}_{\\text{nuevo}} = \\text{p}K_a + \\log_{10}\\left(\\frac{n'_{A^-}}{n'_{HA}}\\right)$."
                        ]
                    }
                ]
            },
            {
                "note_id": "quim_20",
                "title": "Titulaciones y Puntos de Equivalencia",
                "x": 1280.0,
                "y": 860.0,
                "tags": [
                    "Química",
                    "Titulación",
                    "Equivalencia",
                    "Semiequivalencia"
                ],
                "note_type": "standard",
                "desired_retention": 0.85,
                "cards": [
                    {
                        "item_id": 1879945980175028253,
                        "type": "Flashcard",
                        "title": "Puntos Notables en Curva de Titulación Ácido Débil - Base Fuerte",
                        "front": "Describa el pH en los 4 puntos clave de titulación de $HA$ con $\\ce{NaOH}$.",
                        "back": "1. <b>Inicio ($V_b = 0$):</b> Ácido débil solo $\\implies [\\text{H}^+] \\approx \\sqrt{K_a C_0}$.<br>2. <b>Semiequivalencia ($V_b = V_{\\text{eq}}/2$):</b> $[HA] = [A^-] \\implies \\mathbf{\\text{pH} = \\text{p}K_a}$.<br>3. <b>Equivalencia ($V_b = V_{\\text{eq}}$):</b> Todo es sal $A^-$, pH <b>básico ($\\text{pH} > 7$)</b> por hidrólisis: $[\\text{OH}^-] = \\sqrt{K_b C_{\\text{sal}}}$.<br>4. <b>Exceso ($V_b > V_{\\text{eq}}$):</b> Dominado por el exceso de $\\text{OH}^-$ fuerte."
                    }
                ]
            },
            {
                "note_id": "quim_21",
                "title": "Balanceo Redox por Ion-Electrón",
                "x": 380.0,
                "y": 1120.0,
                "tags": [
                    "Química",
                    "Redox",
                    "Ion-Electrón",
                    "Balanceo"
                ],
                "note_type": "standard",
                "desired_retention": 0.85,
                "cards": [
                    {
                        "item_id": 1879945980176447963,
                        "type": "ProofSequenceCard",
                        "title": "Algoritmo de Balanceo Ion-Electrón",
                        "premise": "Pasos algorítmicos para balancear semirreacciones redox.",
                        "steps": [
                            "Paso 1: Dividir en oxidación y reducción; balancear elementos distintos de O y H.",
                            "Paso 2: Balancear O agregando $\\text{H}_2\\text{O}$ al lado deficiente.",
                            "Paso 3: Balancear H agregando $\\text{H}^+$ al lado deficiente.",
                            "Paso 4: Balancear carga agregando electrones $e^-$ al lado más positivo.",
                            "Paso 5 (Si es medio básico): Agregar tantos $\\text{OH}^-$ a ambos lados como $\\text{H}^+$ haya, formar $\\text{H}_2\\text{O}$ y simplificar.",
                            "Paso 6: Multiplicar por factores cruzados para igualar electrones y sumar."
                        ]
                    },
                    {
                        "item_id": 1879945980177415119,
                        "type": "ClozeCard",
                        "title": "Conceptos de Oxidación y Reducción",
                        "text": "- <b>Oxidación:</b> {{c1::Pérdida de electrones::electrones}} (aumento de estado de oxidación). Ocurre en el {{c2::Ánodo::electrodo de oxidación}} (vocal-vocal); actúa como agente reductor.\\n- <b>Reducción:</b> {{c3::Ganancia de electrones::electrones}} (disminución de estado de oxidación). Ocurre en el {{c4::Cátodo::electrodo de reducción}} (consonante-consonante); actúa como agente oxidante."
                    }
                ]
            },
            {
                "note_id": "quim_22",
                "title": "Celdas Galvánicas, Nernst y Faraday",
                "x": 680.0,
                "y": 1120.0,
                "tags": [
                    "Química",
                    "Celdas",
                    "Nernst",
                    "Faraday"
                ],
                "note_type": "standard",
                "desired_retention": 0.85,
                "cards": [
                    {
                        "item_id": 1879945980178219121,
                        "type": "ClozeCard",
                        "title": "Potencial de Celda, Nernst y Ley de Faraday",
                        "text": "Potencial estándar: $E^\\circ_{\\text{celda}} = E^\\circ_{\\text{cátodo}} - E^\\circ_{\\text{ánodo}}$, con $\\Delta G^\\circ = {{c1::-n F E^\\circ_{\\text{celda}}::relación fundamental}}$.\\nEcuación de Nernst a $25^\\circ\\text{C}$:\\n$$E_{\\text{celda}} = {{c2::E^\\circ_{\\text{celda}} - \\frac{0.0592}{n}\\log_{10} Q::ecuación de Nernst}}$$\\nMasa depositada por electrólisis: $m = {{c3::\\frac{M \\cdot I \\cdot t}{n F}::fórmula de Faraday}}$ ($F = 96485\\,\\text{C/mol}$).\\nEn equilibrio: $E_{\\text{celda}} = 0 \\implies E^\\circ_{\\text{celda}} = {{c4::\\frac{0.0592}{n}\\log_{10} K::cálculo de K}}$."
                    },
                    {
                        "item_id": 1879945980180041464,
                        "type": "Flashcard",
                        "title": "Celdas de Concentración y Puente Salino",
                        "front": "¿Cómo funciona una celda de concentración y cuál es la función del puente salino?",
                        "back": "1. <b>Celda de Concentración:</b> Electrodos idénticos sumergidos en soluciones del mismo catión pero a distinta concentración ($E^\\circ_{\\text{celda}} = 0$). Funciona espontáneamente por gradiente de entropía hacia la igualación de concentraciones:<br>$$E = -\\frac{0.0592}{n} \\log_{10}\\left(\\frac{[C]_{\\text{dil}}}{[C]_{\\text{conc}}}\\right) > 0$$<br>2. <b>Puente Salino ($\\ce{KCl}$ o $\\ce{KNO3}$):</b> Cierra el circuito eléctrico manteniendo la electroneutralidad: los aniones migran al ánodo y los cationes al cátodo, evitando la acumulación de cargas que detendría la corriente."
                    }
                ]
            },
            {
                "note_id": "quim_00",
                "title": "Disoluciones: Unidades de Concentración y Dilución",
                "x": 80.0,
                "y": 40.0,
                "tags": [
                    "Química",
                    "Disoluciones",
                    "Concentración"
                ],
                "note_type": "standard",
                "desired_retention": 0.85,
                "cards": [
                    {
                        "item_id": 1879945980181645563,
                        "type": "ClozeCard",
                        "title": "Fórmulas Fundamentales de Concentración",
                        "text": "Definiciones de unidades de concentración para mezclas homogéneas:\\n- Molaridad ($M$): $$M = {{c1::\\frac{n_{\\text{soluto}}}{V_{\\text{disolución (L)}}}::moles por litro de disolución}}$$\\n- Molalidad ($m$): $$m = {{c2::\\frac{n_{\\text{soluto}}}{m_{\\text{disolvente (kg)}}}::moles por kg de disolvente}}$$ (no varía con la temperatura).\\n- Fracción Molar ($X_A$): $$X_A = {{c3::\\frac{n_A}{n_{\\text{total}}}::fracción adimensional}}$$ con $\\sum X_i = 1$.\\n- Ley de Dilución: $$C_1 V_1 = {{c4::C_2 V_2::conservación de moles de soluto}}$$."
                    }
                ]
            }
        ],
        "edges": [
            {
                "source_id": "quim_01",
                "target_id": "quim_02",
                "label": "Diferencial a Velocidades Iniciales"
            },
            {
                "source_id": "quim_02",
                "target_id": "quim_03",
                "label": "Órdenes a Cinética Orden 0"
            },
            {
                "source_id": "quim_02",
                "target_id": "quim_04",
                "label": "Órdenes a Cinética Orden 1"
            },
            {
                "source_id": "quim_02",
                "target_id": "quim_05",
                "label": "Órdenes a Cinética Orden 2"
            },
            {
                "source_id": "quim_04",
                "target_id": "quim_06",
                "label": "Cinética a Dependencia Térmica Arrhenius"
            },
            {
                "source_id": "quim_06",
                "target_id": "quim_07",
                "label": "Arrhenius a Mecanismos y RDS"
            },
            {
                "source_id": "quim_06",
                "target_id": "quim_08",
                "label": "Ea a Catálisis y Complejo Activado"
            },
            {
                "source_id": "quim_01",
                "target_id": "quim_09",
                "label": "Velocidades a Constantes de Equilibrio"
            },
            {
                "source_id": "quim_09",
                "target_id": "quim_10",
                "label": "Kc y Kp a Cociente de Reacción Q"
            },
            {
                "source_id": "quim_09",
                "target_id": "quim_11",
                "label": "Constante K a Termodinámica Delta G"
            },
            {
                "source_id": "quim_10",
                "target_id": "quim_12",
                "label": "Equilibrio a Le Châtelier"
            },
            {
                "source_id": "quim_11",
                "target_id": "quim_13",
                "label": "Termodinámica a Ecuación de van 't Hoff"
            },
            {
                "source_id": "quim_09",
                "target_id": "quim_14",
                "label": "Kp a Disociación Gaseosa alpha"
            },
            {
                "source_id": "quim_10",
                "target_id": "quim_15",
                "label": "Equilibrio a Autoionización Kw"
            },
            {
                "source_id": "quim_15",
                "target_id": "quim_16",
                "label": "Kw a Ácidos Débiles y Regla del 5%"
            },
            {
                "source_id": "quim_16",
                "target_id": "quim_17",
                "label": "Ka a Hidrólisis de Sales"
            },
            {
                "source_id": "quim_16",
                "target_id": "quim_18",
                "label": "Ácido Débil a Ecuación de Henderson-Hasselbalch"
            },
            {
                "source_id": "quim_18",
                "target_id": "quim_19",
                "label": "Buffer a Perturbación con Ácido/Base Fuerte"
            },
            {
                "source_id": "quim_18",
                "target_id": "quim_20",
                "label": "Zona Buffer a Curvas de Titulación"
            },
            {
                "source_id": "quim_01",
                "target_id": "quim_21",
                "label": "Estequiometría a Balanceo Ion-Electrón"
            },
            {
                "source_id": "quim_21",
                "target_id": "quim_22",
                "label": "Balanceo a Celdas Galvánicas y Nernst"
            },
            {
                "source_id": "quim_10",
                "target_id": "quim_22",
                "label": "Cociente Q a Ecuación de Nernst"
            },
            {
                "source_id": "quim_00",
                "target_id": "quim_01",
                "label": ""
            },
            {
                "source_id": "quim_03",
                "target_id": "quim_04",
                "label": ""
            },
            {
                "source_id": "quim_03",
                "target_id": "quim_05",
                "label": ""
            },
            {
                "source_id": "quim_01",
                "target_id": "quim_06",
                "label": ""
            },
            {
                "source_id": "quim_07",
                "target_id": "quim_08",
                "label": ""
            },
            {
                "source_id": "quim_00",
                "target_id": "quim_09",
                "label": ""
            },
            {
                "source_id": "quim_10",
                "target_id": "quim_11",
                "label": ""
            },
            {
                "source_id": "quim_12",
                "target_id": "quim_13",
                "label": ""
            },
            {
                "source_id": "quim_00",
                "target_id": "quim_14",
                "label": ""
            },
            {
                "source_id": "quim_14",
                "target_id": "quim_15",
                "label": ""
            }
        ]
    },
    {
        "name": "OFG Muerte (Presentación y Guión)",
        "folder_path": "",
        "notes": [
            {
                "note_id": "ofg_01",
                "title": "Antropología de la Muerte: Ritos de Paso",
                "x": 80.0,
                "y": 80.0,
                "tags": [
                    "OFG Muerte",
                    "Antropología",
                    "Van Gennep"
                ],
                "note_type": "standard",
                "desired_retention": 0.85,
                "cards": [
                    {
                        "item_id": 1879945980211472141,
                        "type": "ClozeCard",
                        "title": "El Modelo de Van Gennep en el Funeral Griego",
                        "text": "Según Arnold van Gennep, el funeral es un rito de paso tripartito:\\n1. Fase de {{c1::Separación::fase 1}} (aislamiento del cadáver impuro en el *oikos*).\\n2. Fase Liminar o de {{c2::Transición::fase 2}} (el cortejo de la *ékfora* en la frontera urbana).\\n3. Fase de {{c3::Reintegración / Agregación::fase 3}} (sepultura y banquete *perídeipnon*, reconstituyendo la comunidad viva)."
                    },
                    {
                        "item_id": 1879945980236674260,
                        "type": "ClozeCard",
                        "title": "El Esquema Tripartito de Arnold van Gennep",
                        "text": "En la antropología clásica de Arnold van Gennep (1909), el funeral griego se estructura como el paradigma de los <b>ritos de paso</b> en tres fases:\\n1. <b>Fase Preliminar (Separación):</b> Ruptura del individuo con el mundo de los vivos: {{c1::La Prótesis (lavado, mortaja y velatorio en el oikos)::rito de separación}}.\\n2. <b>Fase Liminar (Marginalidad / Tránsito):</b> El sujeto ya no pertenece a los vivos pero aún no ingresa al inframundo: {{c2::La Ékfora (cortejo fúnebre nocturno)::estado liminal}}.\\n3. <b>Fase Postliminar (Reintegración):</b> El muerto se incorpora a los ancestros y la comunidad viva se restaura: {{c3::La Sepultura, libaciones y el Banquete Perideipnon::rito de reintegración}}."
                    },
                    {
                        "item_id": 1879945980237644644,
                        "type": "Flashcard",
                        "title": "Concepto de Liminalidad y Peligro de la Transición",
                        "front": "¿Por qué la fase liminar es considerada el momento más peligroso tanto para el difunto como para la comunidad en la cosmovisión griega?",
                        "back": "Durante la liminalidad, el difunto carece de estatus social definido: ya no tiene cuerpo activo entre los vivos, pero su alma errante aún no cruza los ríos del Hades ni es aceptada por las sombras subterráneas.<br>Para la comunidad, este estado intermedio genera una intensa contaminación ritual (<b>míasma</b>), ansiedad existencial y peligro de alteración del orden cósmico. Solo la conclusión rigurosa de los ritos prescritos (<b>ta nomizómena</b>) pacifica al espíritu y clausura la brecha liminal."
                    }
                ]
            },
            {
                "note_id": "ofg_02",
                "title": "Escatología Homérica y la Sombra sin Fuerza",
                "x": 380.0,
                "y": 80.0,
                "tags": [
                    "OFG Muerte",
                    "Homero",
                    "Hades",
                    "Eidolon"
                ],
                "note_type": "standard",
                "desired_retention": 0.85,
                "cards": [
                    {
                        "item_id": 1879945980212020638,
                        "type": "ClozeCard",
                        "title": "La Psyche en el Hades como Eidolon",
                        "text": "En la épica homérica arcaica, la *psyche* subsiste en el Hades como:\\n$$\\text{Un } {{c1::*eidolon*::sombra homérica}}$$\\nUna sombra vaporosa desprovista de fuerza vital ({{c2::*menos*::fuerza vital}}) y de sangre, en un letargo desposeído."
                    },
                    {
                        "item_id": 1879945980213069548,
                        "type": "Flashcard",
                        "title": "La Sentencia Trágica de Aquiles en la Odisea",
                        "front": "¿Cuál es la afirmación de Aquiles en la Nekyia (Odisea XI) y su implicancia?",
                        "back": "Aquiles proclama:<br><i>«Preferiría ser siervo en la tierra de un campesino pobre y sin tierra antes que reinar sobre todos los muertos extintos.»</i><br><br>Demuestra el <b>despojo ontológico absoluto</b> de la muerte arcaica: no hay premios morales; el rito busca rescatar la memoria viva (*mneme*)."
                    },
                    {
                        "item_id": 1879945980238627684,
                        "type": "Flashcard",
                        "title": "Patroclo y las Súplicas a Aquiles en la Ilíada",
                        "front": "¿Qué mensaje le entrega la sombra de Patroclo a Aquiles en el canto XXIII de la Ilíada y cuál es su significado escatológico?",
                        "back": "La sombra (eidolon) de Patroclo se aparece en sueños a Aquiles y le ruega:<br><i>«¿Duermes, Aquiles, y te has olvidado de mí?... Entiérrame cuanto antes, para que pueda pasar las puertas del Hades. Me apartan las sombras, imágenes de los difuntos, y no me dejan mezclarme con ellas más allá del río...»</i> (Ilíada XXIII, 69-74).<br><b>Significado:</b> Sin los ritos funerarios y la sepultura, el alma queda atrapada en el umbral liminal, desterrada tanto del mundo terrenal como del reposo subterráneo. El sepelio es un imperativo ético ineludible."
                    },
                    {
                        "item_id": 1879945980239760982,
                        "type": "ClozeCard",
                        "title": "El Conflicto Trágico en Antígona de Sófocles",
                        "text": "En la tragedia de Sófocles, Antígona desafía el decreto real de Creonte que prohibía sepultar a su hermano Polinices:\\n- El conflicto contrapone la ley positiva del Estado ({{c1::$\\text{nomos}$::decreto humano}}) frente a las leyes sagradas eternas e inmutables de los dioses ({{c2::$\\text{themis}$ / leyes divinas no escritas::deber cósmico}}).\\n- Negar la sepultura es concebido como una agresión atroz contra el orden natural que atrae {{c3::el míasma (contaminación colectiva) sobre toda la polis::consecuencia sacrílega}}."
                    }
                ]
            },
            {
                "note_id": "ofg_03",
                "title": "El Deber Sagrado de Sepultura: Patroclo y Antígona",
                "x": 680.0,
                "y": 80.0,
                "tags": [
                    "OFG Muerte",
                    "Fuentes Primarias",
                    "Patroclo",
                    "Antígona"
                ],
                "note_type": "standard",
                "desired_retention": 0.85,
                "cards": [
                    {
                        "item_id": 1879945980213797997,
                        "type": "Flashcard",
                        "title": "El Reclamo del Fantasma de Patroclo",
                        "front": "¿Qué implora la sombra insepulta de Patroclo a Aquiles en Ilíada XXIII?",
                        "back": "<i>«¡Sepúltame cuanto antes para que pueda cruzar las puertas del Hades!»</i><br>Mientras el cuerpo carezca de sepultura, las sombras ya cruzadas le impiden vadear el río, dejándolo vagar errante en la frontera liminar."
                    },
                    {
                        "item_id": 1879945980215203860,
                        "type": "ClozeCard",
                        "title": "El Conflicto Sagrado en Antígona de Sófocles",
                        "text": "Antígona desafía al rey Creonte apelando a:\\n{{c1::Las leyes no escritas e inmutables de los dioses (*ágrapta nómina*)::ley divina}}\\nque ordenan honrar al cadáver de su hermano por encima de cualquier prohibición civil."
                    },
                    {
                        "item_id": 1879945980240445377,
                        "type": "ClozeCard",
                        "title": "Naturaleza de la Psyche en el Más Allá",
                        "text": "En la concepción arcaica homérica:\\n- La muerte se produce cuando la {{c1::$\\text{psyche}$ (aliento vital)::alma}} abandona el cuerpo por la boca o una herida abierta.\\n- En el Hades, el alma subsiste únicamente como un {{c2::$\\text{eidolon}$ (sombra o simulacro incorpóreo)::imagen espectral}}, semejante al humo o al reflejo en un sueño.\\n- La sombra carece de fuerza física ({{c3::$\\text{menos}$::vigor muscular}}) y de facultades cognitivas o memoria lúcida ({{c4::$\\text{phrenes}$::entendimiento}}), a menos que beba de la sangre fresca de los sacrificios (Nekuia de Odisea XI)."
                    }
                ]
            },
            {
                "note_id": "ofg_04",
                "title": "Dialéctica Sagrada: Míasma vs Ta Nomizómena",
                "x": 980.0,
                "y": 80.0,
                "tags": [
                    "OFG Muerte",
                    "Míasma",
                    "Purificación",
                    "Ta Nomizómena"
                ],
                "note_type": "standard",
                "desired_retention": 0.85,
                "cards": [
                    {
                        "item_id": 1879945980215889638,
                        "type": "ClozeCard",
                        "title": "Definición de Míasma y Ta Nomizómena",
                        "text": "- {{c1::*Míasma*::impureza}}: La contaminación religiosa corruptora que emana del cadáver en descomposición.\\n- {{c2::*Ta nomizómena*::deber consuetudinario}}: Las honras fúnebres sagradas debidas por piedad.\\n- El cántaro en la entrada para purificación con agua ajena es el {{c3::*ardánion*::ánfora purificadora}}."
                    },
                    {
                        "item_id": 1879945980241809071,
                        "type": "Flashcard",
                        "title": "Los Cinco Ríos Sagrados del Hades",
                        "front": "Mencione los 5 ríos del inframundo griego y su correspondencia alegórica.",
                        "back": "1. <b>Estigia (Styx):</b> El río del odio sagrado, sobre el cual los mismos dioses prestan sus juramentos inviolables.<br>2. <b>Aqueronte (Acheron):</b> El río de la aflicción y el dolor, que limita la entrada al reino subterráneo y por cuyas aguas transita la barca de Caronte.<br>3. <b>Cocito (Cocytus):</b> El río de los lamentos y el llanto fúnebre.<br>4. <b>Flegetonte / Piriflegetonte:</b> El río de fuego ardiente que rodea las profundidades del Tártaro.<br>5. <b>Lete (Lethe):</b> El río del olvido, de cuyas aguas beben las almas para borrar todos sus recuerdos de la vida terrenal."
                    },
                    {
                        "item_id": 1879945980242544379,
                        "type": "ClozeCard",
                        "title": "Caronte, el Óbolo Funerario y Hermes Psicopompo",
                        "text": "Tránsito de las almas hacia el inframundo:\\n- <b>Hermes Psicopompo:</b> Divinidad encargada de {{c1::guiar y conducir las almas::guía psicopompo}} desde el mundo de la luz hasta las márgenes del Aqueronte.\\n- <b>Caronte:</b> El adusto barquero que exige el pago de {{c2::un óbolo de bronce colocado en la boca o sobre los ojos del difunto::moneda funeraria}}.\\n- Los insepultos o aquellos sin moneda quedan condenados a vagar {{c3::durante cien años en la orilla desolada::pena del insepulto}} antes de que se les permita cruzar."
                    }
                ]
            },
            {
                "note_id": "ofg_05",
                "title": "Fase I: La Próthesis y el Oikos",
                "x": 1280.0,
                "y": 80.0,
                "tags": [
                    "OFG Muerte",
                    "Próthesis",
                    "Kline",
                    "Preparación"
                ],
                "note_type": "standard",
                "desired_retention": 0.85,
                "cards": [
                    {
                        "item_id": 1879945980217080850,
                        "type": "ClozeCard",
                        "title": "Disposición del Difunto sobre la Kline",
                        "text": "En la *próthesis*:\\n- El cadáver se lava, se unge con ungüentos y se viste de blanco sobre el lecho mortuorio llamado {{c1::*kline*::lecho fúnebre}}.\\n- Los pies se orientan apuntando hacia {{c2::la puerta exterior de la casa::orientación corporal}}."
                    },
                    {
                        "item_id": 1879945980244584654,
                        "type": "ClozeCard",
                        "title": "Liturgia Doméstica de la Próthesis",
                        "text": "La primera etapa del funeral griego, la <b>Próthesis</b> (exposición pública del cadáver):\\n- Espacio: Ocurre al interior del {{c1::$\\text{oikos}$ (hogar familiar)::espacio doméstico}} y se extiende por un día completo.\\n- Preparación del cadáver (rol femenino exclusivo): Las mujeres de la familia cierran ojos y boca, lavan el cuerpo con agua caliente y perfumes, lo ungen con aceites y lo cubren con {{c2::mortajas blancas ($\\text{chlaína}$)::vestidura fúnebre}}.\\n- Colocación de una rama de laurel o jarra con agua ({{c3::$\\text{ardánion}$::agua lustradora}}) en la puerta de la casa para advertir a los transeúntes sobre el míasma y permitir su purificación al salir."
                    },
                    {
                        "item_id": 1879945980246222463,
                        "type": "Flashcard",
                        "title": "Liturgia del Dolor: Distinción entre Góos y Thrēnos",
                        "front": "Distinga formalmente las dos expresiones poéticas y emocionales del lamento fúnebre durante la próthesis.",
                        "back": "1. <b>Góos ($\\gamma\\acute{o}os$):</b> Lamento fúnebre visceral, improvisado y desgarrador entonado exclusivamente por las mujeres emparentadas con el difunto. Se acompaña de gestos físicos catárticos: rasgarse las mejillas hasta sangrar, golpearse el pecho y mesarse los cabellos.<br>2. <b>Thrēnos ($\\theta\\rho\\tilde{\\eta}\\nu os$):</b> Canto poético solemne, estructurado y compuesto por poetas o cantores profesionales contratados. Introduce templanza y orden reflexivo sobre la finitud de la vida, canalizando cívicamente el desborde pasional del góos."
                    }
                ]
            },
            {
                "note_id": "ofg_06",
                "title": "Liturgia del Dolor: Góos vs Thrēnos",
                "x": 80.0,
                "y": 340.0,
                "tags": [
                    "OFG Muerte",
                    "Mujeres",
                    "Góos",
                    "Thrēnos"
                ],
                "note_type": "standard",
                "desired_retention": 0.85,
                "cards": [
                    {
                        "item_id": 1879945980218700012,
                        "type": "Flashcard",
                        "title": "Diferencia entre Góos y Thrēnos",
                        "front": "Distinga antropológicamente entre el *góos* y el *thrēnos*.",
                        "back": "1. <b>El *Góos* (Lamento Femenino):</b> Improvisado, desgarrador y antifonal de las parientes, con somatización extrema (rasgarse mejillas, mesarse cabellos, golpearse el pecho).<br>2. <b>El *Thrēnos* (Canto Poético Masculino):</b> Composición coral formal de poetas profesionales que exalta la virtud cívica (*areté*) y el linaje con distanciamiento solemne."
                    },
                    {
                        "item_id": 1879945980246499973,
                        "type": "ClozeCard",
                        "title": "La Procesión Cívica de la Ékfora",
                        "text": "La segunda etapa, la <b>Ékfora</b> (traslado del cuerpo):\\n- Momento: Se realiza obligatoriamente {{c1::antes de la salida del sol::momento liminal crepuscular}} para evitar contaminar con el míasma los rayos de Helios y la actividad cívica de la polis.\\n- Recorrido: El féretro es llevado en carro o andas desde el hogar doméstico hasta {{c2::la necrópolis extramuros (el Cerámico en Atenas)::cementerio fuera de las murallas}}.\\n- Comitiva: Los hombres encabezan la procesión en solemne silencio cívico, seguidos por el féretro y las mujeres detrás con estrictas restricciones de edad y parentesco."
                    }
                ]
            },
            {
                "note_id": "ofg_07",
                "title": "Fase II: La Ékfora y la Frontera Cívica",
                "x": 380.0,
                "y": 340.0,
                "tags": [
                    "OFG Muerte",
                    "Ékfora",
                    "Cortejo",
                    "Cerámico"
                ],
                "note_type": "standard",
                "desired_retention": 0.85,
                "cards": [
                    {
                        "item_id": 1879945980219669651,
                        "type": "ClozeCard",
                        "title": "Temporalidad Sagrada de la Ékfora",
                        "text": "El traslado procesional del cuerpo a la necrópolis (el Cerámico) se llama {{c1::*ékfora*::segunda fase}}.\\nDebía realizarse forzosamente {{c2::antes de la salida del sol (de madrugada)::momento temporal}} para impedir que los rayos sagrados de Helios fueran mancillados por el *míasma*."
                    },
                    {
                        "item_id": 1879945980247761221,
                        "type": "Flashcard",
                        "title": "Sepultura, Libaciones Choai y Banquete Perídeipnon",
                        "front": "Describa los ritos de depósito corporal, ofrendas y el banquete post-sepulcral en la fase III.",
                        "back": "1. <b>Depósito:</b> Puede ser <b>inhumación</b> (en sarcófagos de piedra o tierra) o <b>cremación</b> en pira de leña, tras la cual las cenizas se depositan en ánforas de bronce o cerámica.<br>2. <b>Ajuar y Vasos Funerarios:</b> Se depositan ofrendas, armas, joyas y de manera paradigmática <b>lekythoi de fondo blanco</b> (vasos esbeltos pintados para contener aceites perfumados).<br>3. <b>Libaciones ($\\text{choaí}$):</b> Derramamiento de sustancias sagradas sobre la tumba para alimentar a las sombras subterráneas: miel, leche, vino puro, aceite y agua.<br>4. <b>Banquete Reintegrador ($\\text{Perídeipnon}$):</b> La comitiva regresa a la casa del difunto. Tras purificar el recinto, celebran una comida colectiva en honor al fallecido, marcando el retorno a la vida ordinaria de la comunidad."
                    }
                ]
            },
            {
                "note_id": "ofg_08",
                "title": "Conflicto Político: Ostentación Aristocrática",
                "x": 680.0,
                "y": 340.0,
                "tags": [
                    "OFG Muerte",
                    "Polis",
                    "Aristocracia",
                    "Vendettas"
                ],
                "note_type": "standard",
                "desired_retention": 0.85,
                "cards": [
                    {
                        "item_id": 1879945980220235117,
                        "type": "Flashcard",
                        "title": "La Ékfora como Detonante de Guerra Civil Facciosa",
                        "front": "¿Por qué los cortejos fúnebres aristocráticos amenazaban el orden cívico?",
                        "back": "Las familias nobles (*eupátridas*) convertían la *ékfora* en propaganda dinástica, desfilando con carros de lujo y plañideras contratadas, usando el llanto para instigar venganzas de sangre (*vendettas* clánicas) entre familias rivales, amenazando la paz de la *polis*."
                    },
                    {
                        "item_id": 1879945980249284823,
                        "type": "ClozeCard",
                        "title": "Restricciones Suntuarias y Contención Femenina",
                        "text": "Las reformas legales de Solón en Atenas (594 a.C.) regularon severamente los rituales funerarios aristocráticos:\\n1. <b>Prohibición de automutilaciones:</b> Se vetó expresamente que las mujeres {{c1::se laceraran la carne, se golpearan el pecho con violencia y entonaran lamentos desmedidos::frenado del goos}}.\\n2. <b>Restricción de aforo:</b> Solo podían asistir a la próthesis y cortejo mujeres {{c2::parientes de hasta segundo grado y mayores de 60 años::limitación de asistentes}}.\\n3. <b>Motivación sociopolítica crucial:</b> Evitar que los clanes aristocráticos convirtieran el funeral en una exhibición de poder dinástico que {{c3::incitara facciones, lealtades privadas y venganzas de sangre ($\\text{vendettas}$)::control estatal de la violencia}} frente a la supremacía de la polis democrática."
                    }
                ]
            },
            {
                "note_id": "ofg_09",
                "title": "Fase III: Depósito Corporal e Inhumación",
                "x": 980.0,
                "y": 340.0,
                "tags": [
                    "OFG Muerte",
                    "Sepultura",
                    "Inhumación",
                    "Cremación"
                ],
                "note_type": "standard",
                "desired_retention": 0.85,
                "cards": [
                    {
                        "item_id": 1879945980221323404,
                        "type": "ClozeCard",
                        "title": "Inhumación Predominante en el Ática",
                        "text": "En la Atenas arcaica y clásica la práctica funeraria abrumadoramente dominante fue la {{c1::inhumación en tierra o sarcófago::práctica dominante}}, explicada arqueológicamente por {{c2::la grave escasez de madera para piras en el Ática::motivo ecológico-económico}}."
                    },
                    {
                        "item_id": 1879945980249650522,
                        "type": "Flashcard",
                        "title": "El Motivo Escultórico de la Dexiosis",
                        "front": "¿Qué representa el gesto de la dexiosis en las estelas funerarias clásicas de mármol del Cerámico ateniense?",
                        "back": "La <b>dexiosis</b> ($\\delta\\varepsilon\\xi\\acute{\\iota}\\omega\\sigma\\iota\\varsigma$) es el solemne apretón de manos derechas representado en altorrelieve entre la figura sentada (habitualmente el difunto) y una figura de pie (un familiar vivo: cónyuge, padre o hijo).<br><b>Significado simbólico:</b><br>1. <b>Vínculo ininterrumpido:</b> Es a la vez un gesto de despedida definitiva y una promesa de lazo indisoluble más allá de la tumba.<br>2. <b>Serenidad clásica (sophrosyne):</b> Los rostros no expresan desesperación desgarradora, sino una calma digna y melancólica.<br>3. <b>Victoria de la memoria ($\\text{mneme}$):</b> Inmortaliza la identidad civil y afectiva del difunto frente al olvido anónimo del Hades."
                    }
                ]
            },
            {
                "note_id": "ofg_10",
                "title": "Libaciones Choai y Banquete Perídeipnon",
                "x": 1280.0,
                "y": 340.0,
                "tags": [
                    "OFG Muerte",
                    "Choai",
                    "Perídeipnon",
                    "Reintegración"
                ],
                "note_type": "standard",
                "desired_retention": 0.85,
                "cards": [
                    {
                        "item_id": 1879945980222861703,
                        "type": "ClozeCard",
                        "title": "Libaciones y Banquete de Reintegración",
                        "text": "- Libaciones sobre la tumba (vino puro, leche, miel y aceite): {{c1::*choai*::ofrendas líquidas}}.\\n- Banquete formal en el hogar purificado: {{c2::*perídeipnon*::banquete fúnebre}}, donde el difunto es el {{c3::anfitrión de honor::papel simbólico}}."
                    },
                    {
                        "item_id": 1879945980250961685,
                        "type": "ClozeCard",
                        "title": "Ciclo Temporal del Luto y Antesterias",
                        "text": "Ritos post-funerarios en la tradición griega:\\n- Calendario ritual del duelo: Conmemoraciones periódicas en la tumba con ofrendas en el día {{c1::3 ($\\text{trita}$), día 9 ($\\text{enata}$) y día 30 ($\\text{triakostia}$)::fechas del luto}}, clausurando el luto formal.\\n- <b>Las Antesterias:</b> Festival dionisíaco de primavera cuya tercera jornada se llamaba el día de los {{c2::$\\text{Chytroi}$ (las ollas de gachas)::día de los muertos}}.\\n- En esa fecha, los espíritus de los muertos ascendían al mundo de los vivos. Al anochecer, los cabezas de familia los expulsaban con la célebre fórmula ritual apotropaica: {{c3::«¡Fuera Keres, que han terminado las Antesterias!»::despedida de espíritus}}."
                    }
                ]
            },
            {
                "note_id": "ofg_11",
                "title": "Arqueología: Lekythoi y la Cámara Ciega",
                "x": 80.0,
                "y": 600.0,
                "tags": [
                    "OFG Muerte",
                    "Arqueología",
                    "Lekythos",
                    "Cámara Ciega"
                ],
                "note_type": "standard",
                "desired_retention": 0.85,
                "cards": [
                    {
                        "item_id": 1879945980223237672,
                        "type": "Flashcard",
                        "title": "Economía Ritual de la Cámara Ciega en Lekythoi",
                        "front": "¿Qué reveló el hallazgo arqueológico de la cámara ciega en los lekythoi de fondo blanco?",
                        "back": "Muchos lekythoi contenían una pequeña cápsula sellada en el cuello que retenía apenas unas gotas de perfume costoso, manteniendo el resto del vaso vacío.<br>Demuestra el pragmatismo ático: cumplir el decoro sagrado exterior sin incurrir en un gasto económico ruinoso."
                    },
                    {
                        "item_id": 1879945980251489437,
                        "type": "Flashcard",
                        "title": "Cronograma Exacto de los 4 Expositores (10:00 Minutos)",
                        "front": "Detalle la asignación temática y distribución temporal de los 4 expositores para la ponencia.",
                        "back": "1. <b>Expositor 1 (00:00 - 02:30 | Slides 1 a 3):</b> Introducción y Escatología.<br>Tema: La muerte como quiebre ontológico en la Hélade, modelo de Van Gennep, la psyche homérica y la topografía mítica del Hades.<br>2. <b>Expositor 2 (02:30 - 05:00 | Slides 4 a 6):</b> La Arquitectura del Tríptico Ritual.<br>Tema: Contención del míasma, la Próthesis en el oikos, la Ékfora antes del amanecer y la Sepultura/Banquete Perideipnon.<br>3. <b>Expositor 3 (05:00 - 07:30 | Slides 7 a 9):</b> Conflicto Político, Leyes de Solón y Memoria.<br>Tema: Restricciones de Solón al duelo aristocrático, estelas del Cerámico, motivo de la dexiosis y el discurso de Pericles.<br>4. <b>Expositor 4 (07:30 - 10:00 | Slides 10 a 12):</b> Síntesis Ética y Conexión con MED836.<br>Tema: Diálogo con el duelo contemporáneo, desamparo simbólico hospitalario y cierre formal en 10:00 exactos."
                    },
                    {
                        "item_id": 1879945980253362263,
                        "type": "ClozeCard",
                        "title": "Banco de Preguntas Estratégicas para la Defensa Oral (Q&A)",
                        "text": "Preparación para la ronda de preguntas del profesor y ayudantes:\\n- Pregunta: ¿Por qué Solón restringió el luto de las mujeres y no el de los hombres?\\n- Respuesta clave: Porque el lamento femenino ({{c1::$\\text{góos}$::lamento visceral}}) era el vehículo emocional que movilizaba {{c2::el honor aristocrático del clan ($\\text{génos}$) hacia venganzas de sangre::mecanismo faccioso}}, mientras que la polis naciente necesitaba imponer la ley comunitaria por encima de la venganza privada.\\n- Pregunta: ¿Qué enseña la dexiosis a la bioética contemporánea?\\n- Respuesta clave: Que el final de la vida no es un fracaso técnico que deba ocultarse, sino un {{c3::acontecimiento relacional digno de memoria y despedida compartida::sentido bioético}}."
                    }
                ]
            },
            {
                "note_id": "ofg_12",
                "title": "El Óbolo Funerario y Caronte",
                "x": 380.0,
                "y": 600.0,
                "tags": [
                    "OFG Muerte",
                    "Óbolo",
                    "Caronte",
                    "Moneda"
                ],
                "note_type": "standard",
                "desired_retention": 0.85,
                "cards": [
                    {
                        "item_id": 1879945980225190535,
                        "type": "ClozeCard",
                        "title": "Sentido Moral del Óbolo de Caronte",
                        "text": "La moneda colocada en la boca o mano del difunto era el óbolo.\\nLejos de un mero peaje mercantil para Caronte, funcionaba como una {{c1::credencial cívica y moral::función simbólica}} que acreditaba que el muerto tenía {{c2::parientes solventes que ejecutaron las honras sagradas::prueba de honras}}."
                    }
                ]
            },
            {
                "note_id": "ofg_13",
                "title": "Topografía del Inframundo: Ríos Sagrados",
                "x": 680.0,
                "y": 600.0,
                "tags": [
                    "OFG Muerte",
                    "Hades",
                    "Ríos",
                    "Hermes"
                ],
                "note_type": "standard",
                "desired_retention": 0.85,
                "cards": [
                    {
                        "item_id": 1879945980225807348,
                        "type": "ClozeCard",
                        "title": "Los Ríos del Hades y el Guía de Almas",
                        "text": "El dios que conduce las almas al inframundo es {{c1::Hermes Psicopompo::guía de almas}}.\\nLos ríos sagrados del Hades son:\\n- El {{c2::Aqueronte::río del dolor}} (del dolor).\\n- La {{c3::Estigia::río del juramento}} (del juramento sagrado e inviolable).\\n- El {{c4::Lete::río del olvido}} (del olvido).\\n- El Flegetonte (de fuego) y el Cocito (de los lamentos)."
                    }
                ]
            },
            {
                "note_id": "ofg_14",
                "title": "Leyes de Solón (594 a.C.) y la Ley Común",
                "x": 980.0,
                "y": 600.0,
                "tags": [
                    "OFG Muerte",
                    "Solón",
                    "Leyes Suntuarias",
                    "Polis"
                ],
                "note_type": "standard",
                "desired_retention": 0.85,
                "cards": [
                    {
                        "item_id": 1879945980227490529,
                        "type": "Flashcard",
                        "title": "Las Reformas Suntuarias de Solón (594 a.C.)",
                        "front": "Enumere las restricciones que impuso Solón al duelo y su objetivo político.",
                        "back": "1. <b>Medidas:</b> Prohibió arañarse las mejillas con las uñas; prohibió plañideras profesionales; limitó el ajuar a 3 mantos; prohibió inmolar bueyes; ordenó cortejos nocturnos en silencio.<br>2. <b>Objetivo político:</b> Subordinar el poder tribal de los linajes aristocráticos al imperio de la ley de la *polis*, erradicando las venganzas de sangre y consolidando la paz democrática."
                    }
                ]
            },
            {
                "note_id": "ofg_15",
                "title": "Calendario Post-Sepulcral y Antesterias",
                "x": 1280.0,
                "y": 600.0,
                "tags": [
                    "OFG Muerte",
                    "Calendario",
                    "Antesterias",
                    "Chytroi"
                ],
                "note_type": "standard",
                "desired_retention": 0.85,
                "cards": [
                    {
                        "item_id": 1879945980228708664,
                        "type": "ClozeCard",
                        "title": "Hitos del Luto y Fiesta de los Chytroi",
                        "text": "Visitas del calendario fúnebre: al tercer día ({{c1::*trita*::tercer día}}), noveno día ({{c2::*énata*::noveno día}}), trigésimo (*triakostia*) y al año (*eníausia*).\\nEn las fiestas Antesterias se celebraba el día de los {{c3::*Chytroi* (las ollas)::día de sombras}}, ofreciendo gachas a las sombras que visitaban la ciudad."
                    }
                ]
            },
            {
                "note_id": "ofg_16",
                "title": "Arte de la Memoria: Dexiosis y Ethos Clásico",
                "x": 80.0,
                "y": 860.0,
                "tags": [
                    "OFG Muerte",
                    "Dexiosis",
                    "Hegeso",
                    "Ethos"
                ],
                "note_type": "standard",
                "desired_retention": 0.85,
                "cards": [
                    {
                        "item_id": 1879945980229454831,
                        "type": "ClozeCard",
                        "title": "El Motivo Iconográfico de la Dexiosis",
                        "text": "En las estelas fúnebres de mármol del Cerámico, el apretón solemne de manos entre el difunto y el deudo se llama {{c1::*dexiosis*::apretón de manos}}.\\nEncarna el *ethos* sereno y la {{c2::*kalokagathía*::virtud y belleza clásica}}, preservando la memoria imperecedera (*mneme*)."
                    },
                    {
                        "item_id": 1879945980231419314,
                        "type": "Flashcard",
                        "title": "Análisis Formal de la Estela de Hegeso",
                        "front": "Describa la Estela de Hegeso y explique por qué rechaza el patetismo de la muerte biológica.",
                        "back": "Hegeso aparece sentada contemplando con calma una joya extraída de un cofre que le sostiene su esclava.<br>No hay expresiones de enfermedad, dolor ni putrefacción: el arte clásico ático eterniza a la persona en la plenitud de su armonía cívica y belleza imperecedera, neutralizando el horror de la tumba."
                    }
                ]
            },
            {
                "note_id": "ofg_17",
                "title": "Diálogo Contemporáneo: Desamparo Simbólico",
                "x": 380.0,
                "y": 860.0,
                "tags": [
                    "OFG Muerte",
                    "Modernidad",
                    "Hospital",
                    "Desamparo Simbólico"
                ],
                "note_type": "standard",
                "desired_retention": 0.85,
                "cards": [
                    {
                        "item_id": 1879945980232439082,
                        "type": "Flashcard",
                        "title": "Muerte Ritual Helénica vs Muerte Hospitalaria Moderna",
                        "front": "Compare la tecnología ritual griega con la gestión hospitalaria contemporánea.",
                        "back": "1. <b>Grecia Antigua:</b> La muerte se vive en el hogar y en la calle; el dolor se materializa y somatiza colectivamente; los ritos recomponen a la comunidad.<br>2. <b>Modernidad Hospitalaria:</b> Confinamiento a pabellones asépticos y morgues profesionales; la muerte se higieniza y se oculta; el doliente queda en un profundo <b>desamparo simbólico</b>."
                    }
                ]
            },
            {
                "note_id": "ofg_18",
                "title": "Guión Cronométrico (10:00) y Preguntas de Debate",
                "x": 680.0,
                "y": 860.0,
                "tags": [
                    "OFG Muerte",
                    "Guión",
                    "Exposición",
                    "Cronograma"
                ],
                "note_type": "standard",
                "desired_retention": 0.85,
                "cards": [
                    {
                        "item_id": 1879945980232719734,
                        "type": "ClozeCard",
                        "title": "Estructura Cronométrica de 4 Expositores",
                        "text": "Distribución estricta de la ponencia (10:00 exactos, 2:30 por expositor):\\n- Turno I (0:00 - 2:30): {{c1::Expositor 1::turno 1}} (Finitud homérica, Odisea, míasma vs ta nomizómena).\\n- Turno II (2:30 - 5:00): {{c2::Expositor 2::turno 2}} (Próthesis, ékfora, sepultura, choai y perídeipnon).\\n- Turno III (5:00 - 7:30): {{c3::Expositor 3::turno 3}} (Lekythos, cámara ciega, leyes de Solón y dexiosis).\\n- Turno IV (7:30 - 10:00): {{c4::Expositor 4::turno 4}} (Desamparo contemporáneo, Tres Tesis y plenario)."
                    },
                    {
                        "item_id": 1879945980234563057,
                        "type": "Flashcard",
                        "title": "Las Tres Tesis Vertebrales Finales",
                        "front": "Enuncie las tres tesis académicas conclusivas de la ponencia.",
                        "back": "1. <b>Tesis 1:</b> El rito no es salvación individual ultraterrena, sino una tecnología psicosocial indispensable para recomponer y proteger a la comunidad de los vivos.<br>2. <b>Tesis 2:</b> Las reformas de Solón (594 a.C.) marcan el nacimiento de la política cívica al someter el dolor tribal al imperio de la ley común.<br>3. <b>Tesis 3:</b> Frente al aislamiento higienizado moderno, la experiencia helénica demuestra que el duelo requiere ser visibilizado, corporeizado y ritualizado colectivamente."
                    }
                ]
            },
            {
                "note_id": "ofg_00",
                "title": "Rúbrica de Evaluación MED836 y Criterios Orales",
                "x": 80.0,
                "y": 40.0,
                "tags": [
                    "OFG",
                    "Rúbrica",
                    "Evaluación"
                ],
                "note_type": "standard",
                "desired_retention": 0.85,
                "cards": [
                    {
                        "item_id": 1879945980235054070,
                        "type": "ClozeCard",
                        "title": "Criterios de Evaluación Oficial MED836",
                        "text": "La rúbrica de evaluación para la ponencia oral universitaria exige:\\n1. <b>Ajuste cronométrico estricto:</b> La disertación debe durar exactamente {{c1::10 minutos (10:00)::tiempo asignado}} repartidos equitativamente entre los 4 expositores (2:30 c/u).\\n2. <b>Dominio conceptual:</b> Manejo fluido de los conceptos griegos sin lectura mecánica: {{c2::$\\text{prothesis}, \\text{ekphora}, \\text{psyche}, \\text{eidolon}, \\text{miasma}, \\text{dexiosis}, \\text{mneme}$::terminología fundamental}}.\\n3. <b>Integración con la medicina y bioética (MED836):</b> Analizar cómo los ritos antiguos ilustran la necesidad humana universal de {{c3::contención simbólica del duelo y dignidad del cadáver::nexo con la medicina contemporánea}}."
                    }
                ]
            }
        ],
        "edges": [
            {
                "source_id": "ofg_01",
                "target_id": "ofg_02",
                "label": "Antropología a Escatología Homérica"
            },
            {
                "source_id": "ofg_02",
                "target_id": "ofg_03",
                "label": "Hades a Deber Sagrado de Sepultura"
            },
            {
                "source_id": "ofg_03",
                "target_id": "ofg_04",
                "label": "Deber Sagrado a Dialéctica del Míasma"
            },
            {
                "source_id": "ofg_04",
                "target_id": "ofg_05",
                "label": "Míasma a Fase I Próthesis"
            },
            {
                "source_id": "ofg_05",
                "target_id": "ofg_06",
                "label": "Próthesis a Protagonismo Femenino y Góos"
            },
            {
                "source_id": "ofg_05",
                "target_id": "ofg_07",
                "label": "Próthesis a Fase II Ékfora"
            },
            {
                "source_id": "ofg_07",
                "target_id": "ofg_08",
                "label": "Ékfora a Conflicto Aristocrático"
            },
            {
                "source_id": "ofg_07",
                "target_id": "ofg_09",
                "label": "Ékfora a Fase III Sepultura"
            },
            {
                "source_id": "ofg_09",
                "target_id": "ofg_10",
                "label": "Sepultura a Choai y Perídeipnon"
            },
            {
                "source_id": "ofg_04",
                "target_id": "ofg_11",
                "label": "Ofrendas a Arqueología del Lekythos"
            },
            {
                "source_id": "ofg_09",
                "target_id": "ofg_12",
                "label": "Cultura Material a Óbolo de Caronte"
            },
            {
                "source_id": "ofg_02",
                "target_id": "ofg_13",
                "label": "Escatología a Ríos del Hades y Hermes"
            },
            {
                "source_id": "ofg_08",
                "target_id": "ofg_14",
                "label": "Conflicto Faccioso a Reformas de Solón"
            },
            {
                "source_id": "ofg_10",
                "target_id": "ofg_15",
                "label": "Perídeipnon a Calendario Post-Sepulcral"
            },
            {
                "source_id": "ofg_09",
                "target_id": "ofg_16",
                "label": "Monumentos a Dexiosis y Ethos"
            },
            {
                "source_id": "ofg_01",
                "target_id": "ofg_17",
                "label": "Ritos de Paso a Desamparo Moderno"
            },
            {
                "source_id": "ofg_06",
                "target_id": "ofg_18",
                "label": "Liturgia a Guión de Exposición Oral"
            },
            {
                "source_id": "ofg_14",
                "target_id": "ofg_18",
                "label": "Solón a Tesis y Cronograma de Ponencia"
            },
            {
                "source_id": "ofg_17",
                "target_id": "ofg_18",
                "label": "Crítica Contemporánea a Debate Final"
            },
            {
                "source_id": "ofg_00",
                "target_id": "ofg_01",
                "label": ""
            },
            {
                "source_id": "ofg_01",
                "target_id": "ofg_05",
                "label": ""
            },
            {
                "source_id": "ofg_06",
                "target_id": "ofg_07",
                "label": ""
            },
            {
                "source_id": "ofg_08",
                "target_id": "ofg_09",
                "label": ""
            },
            {
                "source_id": "ofg_00",
                "target_id": "ofg_11",
                "label": ""
            }
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
        const savedCourses = localStorage.getItem("morphism_courses_v4");
        if (savedCourses) {
            try {
                this.courses = JSON.parse(savedCourses);
            } catch (e) {
                this.courses = JSON.parse(JSON.stringify(SEED_COURSES));
            }
        } else {
            this.courses = JSON.parse(JSON.stringify(SEED_COURSES));
        }

        const activeName = localStorage.getItem("morphism_active_course_v4");
        this.currentCourse = this.courses.find(c => c.name === activeName) || this.courses[0];
    }

    _saveStorage() {
        localStorage.setItem("morphism_theme", this.activeThemeId);
        localStorage.setItem("morphism_courses_v4", JSON.stringify(this.courses));
        if (this.currentCourse) {
            localStorage.setItem("morphism_active_course_v4", this.currentCourse.name);
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
                const parts = p1.split("::");
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
                const answer = p1.split("::")[0];
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
        if (!confirm("¿Restaurar los 4 cursos oficiales (Electricidad y Magnetismo I2, Análisis Real I3, Química I2 y OFG Muerte)?")) return;
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
