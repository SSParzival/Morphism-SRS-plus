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
                        "item_id": 1879938278674071547,
                        "type": "ClozeCard",
                        "title": "Regla BAC-CAB e Identidades de Rotacional",
                        "text": "Triple producto vectorial: $$\\mathbf{A} \\times (\\mathbf{B} \\times \\mathbf{C}) = {{c1::\\mathbf{B}(\\mathbf{A}\\cdot\\mathbf{C}) - \\mathbf{C}(\\mathbf{A}\\cdot\\mathbf{B})::regla BAC-CAB}}$$\\nIdentidades diferenciales nulas: $\\nabla \\times (\\nabla f) = {{c2::\\mathbf{0}::rotacional del gradiente}}$ y $\\nabla \\cdot (\\nabla \\times \\mathbf{A}) = {{c3::0::divergencia del rotacional}}$."
                    },
                    {
                        "item_id": 1879938278674720312,
                        "type": "Flashcard",
                        "title": "Operadores en Coordenadas Cilíndricas y Esféricas",
                        "front": "Escriba la divergencia $\\nabla \\cdot \\mathbf{A}$ en cilíndricas y esféricas.",
                        "back": "1. <b>Cilíndricas $(r, \\theta, z)$:</b> $\\nabla \\cdot \\mathbf{A} = \\frac{1}{r}\\partial_r(r A_r) + \\frac{1}{r}\\partial_\\theta A_\\theta + \\partial_z A_z$.<br>2. <b>Esféricas $(r, \\theta, \\phi)$:</b> $\\nabla \\cdot \\mathbf{A} = \\frac{1}{r^2}\\partial_r(r^2 A_r) + \\frac{1}{r\\sin\\theta}\\partial_\\theta(\\sin\\theta A_\\theta) + \\frac{1}{r\\sin\\theta}\\partial_\\phi A_\\phi$."
                    },
                    {
                        "item_id": 1879938278676516424,
                        "type": "ClozeCard",
                        "title": "Laplaciano Vectorial y Teorema de Stokes",
                        "text": "El laplaciano de un campo vectorial se descompone como: $$\\nabla^2 \\mathbf{A} = {{c1::\\nabla(\\nabla \\cdot \\mathbf{A}) - \\nabla \\times (\\nabla \\times \\mathbf{A})::descomposición de laplaciano vectorial}}$$\\nTeorema de Stokes: $\\oint_{\\partial S} \\mathbf{A} \\cdot d\\boldsymbol{\\ell} = {{c2::\\iint_S (\\nabla \\times \\mathbf{A}) \\cdot d\\mathbf{S}::integral de rotacional}}$."
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
                        "item_id": 1879938278676986408,
                        "type": "ClozeCard",
                        "title": "Definición de Cargas Ligadas",
                        "text": "A partir del vector polarización $\\mathbf{P}$:\\n- Densidad volumétrica ligada: $\\rho_b = {{c1::-\\nabla \\cdot \\mathbf{P}::densidad volumétrica}}$\\n- Densidad superficial ligada: $\\sigma_b = {{c2::\\mathbf{P} \\cdot \\hat{n}::densidad superficial en la interfaz}}$."
                    },
                    {
                        "item_id": 1879938278677845183,
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
                        "item_id": 1879938278679168114,
                        "type": "Flashcard",
                        "title": "Potencial Electrostático de un Dipolo Puntual",
                        "front": "¿Cuál es el potencial $V(\\mathbf{r})$ y campo $\\mathbf{E}(\\mathbf{r})$ de un dipolo puntual $\\mathbf{p}$ en el origen?",
                        "back": "1. <b>Potencial:</b> $V(\\mathbf{r}) = \\frac{1}{4\\pi\\varepsilon_0}\\frac{\\mathbf{p}\\cdot\\hat{r}}{r^2} = \\frac{1}{4\\pi\\varepsilon_0}\\frac{\\mathbf{p}\\cdot\\mathbf{r}}{r^3}$.<br>2. <b>Campo Eléctrico:</b> $\\mathbf{E}(\\mathbf{r}) = -\\nabla V = \\frac{1}{4\\pi\\varepsilon_0}\\frac{3(\\mathbf{p}\\cdot\\hat{r})\\hat{r} - \\mathbf{p}}{r^3}$."
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
                        "item_id": 1879938278680553574,
                        "type": "ClozeCard",
                        "title": "Ley de Gauss en Dieléctricos",
                        "text": "El vector desplazamiento se define como $\\mathbf{D} = {{c1::\\varepsilon_0 \\mathbf{E} + \\mathbf{P}::relación D, E, P}}$.\\nLey de Gauss en dieléctricos: $\\nabla \\cdot \\mathbf{D} = {{c2::\\rho_f::solo carga libre}}$ y $\\oint \\mathbf{D} \\cdot d\\mathbf{A} = {{c3::Q_{f,\\text{enc}}::carga libre encerrada}}$."
                    },
                    {
                        "item_id": 1879938278681800662,
                        "type": "Flashcard",
                        "title": "Relaciones Constitutivas en Medios LHI",
                        "front": "En un dieléctrico Lineal, Homogéneo e Isótropo (LHI), ¿cuáles son las relaciones entre $\\mathbf{P}, \\mathbf{E}, \\mathbf{D}, \\chi_e, \\kappa$ y $\\varepsilon$?",
                        "back": "1. $\\mathbf{P} = \\varepsilon_0 \\chi_e \\mathbf{E} = (\\varepsilon - \\varepsilon_0)\\mathbf{E}$.<br>2. $\\mathbf{D} = \\varepsilon \\mathbf{E} = \\kappa \\varepsilon_0 \\mathbf{E}$.<br>3. $\\kappa = \\varepsilon_r = 1 + \\chi_e$ y $\\varepsilon = \\kappa \\varepsilon_0$."
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
                        "item_id": 1879938278682028105,
                        "type": "ClozeCard",
                        "title": "Continuidad y Salto en la Interfaz",
                        "text": "En la interfaz entre dos dieléctricos:\\n- Componente tangencial: ${{c1::E_{1t} - E_{2t} = 0::continuidad tangencial}}$ (pues $\\nabla \\times \\mathbf{E} = \\mathbf{0}$).\\n- Componente normal: ${{c2::D_{1n} - D_{2n} = \\sigma_f::salto normal por carga libre}}$.\\nSi no hay carga libre ($\\sigma_f = 0$): $D_{1n} = D_{2n} \\iff \\varepsilon_1 E_{1n} = \\varepsilon_2 E_{2n}$."
                    },
                    {
                        "item_id": 1879938278684977268,
                        "type": "Flashcard",
                        "title": "Ley de Refracción de Líneas de Campo Eléctrico",
                        "front": "Deduzca la relación entre los ángulos de incidencia y refracción $(\\theta_1, \\theta_2)$ respecto a la normal en una interfaz sin cargas libres.",
                        "back": "Por condiciones de borde:<br>1. $E_{1t} = E_{2t} \\implies E_1 \\sin\\theta_1 = E_2 \\sin\\theta_2$.<br>2. $D_{1n} = D_{2n} \\implies \\varepsilon_1 E_1 \\cos\\theta_1 = \\varepsilon_2 E_2 \\cos\\theta_2$.<br>3. Dividiendo ambas ecuaciones:<br>$$\\frac{\\tan\\theta_1}{\\tan\\theta_2} = \\frac{\\varepsilon_1}{\\varepsilon_2} = \\frac{\\kappa_1}{\\kappa_2}$$"
                    },
                    {
                        "item_id": 1879938278685788357,
                        "type": "ClozeCard",
                        "title": "Interfaz Conductor-Dieléctrico",
                        "text": "En la superficie de un conductor ideal en equilibrio en contacto con dieléctrico $\\varepsilon$:\\n- Campo tangencial: $E_t = {{c1::0::conductor equipotencial}}$.\\n- Campo normal exterior: $E_n = {{c2::\\frac{\\sigma_f}{\\varepsilon}::campo en superficie con dieléctrico}}$."
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
                        "item_id": 1879938278686525253,
                        "type": "Flashcard",
                        "title": "Campo Interior y Polarización en Esfera Dieléctrica",
                        "front": "Para una esfera dieléctrica LHI de permitividad $\\varepsilon$ en campo uniforme exterior $\\mathbf{E}_0$, calcule $\\mathbf{E}_{\\text{int}}$ y $\\mathbf{P}$.",
                        "back": "1. <b>Campo Interior Uniforme:</b> $\\mathbf{E}_{\\text{int}} = \\frac{3}{\\kappa + 2} \\mathbf{E}_0 = \\frac{3\\varepsilon_0}{\\varepsilon + 2\\varepsilon_0} \\mathbf{E}_0$.<br>2. <b>Polarización Interior:</b> $\\mathbf{P} = 3\\varepsilon_0 \\left(\\frac{\\kappa - 1}{\\kappa + 2}\\right) \\mathbf{E}_0$.<br>3. <b>Cargas Ligadas:</b> $\\rho_b = 0$, y $\\sigma_b = P \\cos\\theta$."
                    },
                    {
                        "item_id": 1879938278687881281,
                        "type": "ClozeCard",
                        "title": "Cilindro Dieléctrico en Campo Transversal",
                        "text": "Para un cilindro dieléctrico infinito en campo uniforme perpendicular $\\mathbf{E}_0$:\\n- Campo eléctrico interior: $\\mathbf{E}_{\\text{int}} = {{c1::\\frac{2}{\\kappa + 1} \\mathbf{E}_0::campo interior cilindro}}$\\n- Polarización interior: $\\mathbf{P} = {{c2::2\\varepsilon_0 \\frac{\\kappa - 1}{\\kappa + 1} \\mathbf{E}_0::polarización cilindro}}$."
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
                        "item_id": 1879938278688749438,
                        "type": "ClozeCard",
                        "title": "Capas Dieléctricas en Serie vs Paralelo",
                        "text": "En capacitores de placas paralelas:\\n- Capas perpendiculares a $\\mathbf{E}$ (apiladas en espesor): suman en {{c1::serie::serie o paralelo}}, $\\frac{1}{C} = \\sum \\frac{d_i}{\\varepsilon_i A}$.\\n- Capas paralelas a $\\mathbf{E}$ (yuxtapuestas en área): suman en {{c2::paralelo::serie o paralelo}}, $C = \\sum \\frac{\\varepsilon_i A_i}{d}$."
                    },
                    {
                        "item_id": 1879938278690259228,
                        "type": "Flashcard",
                        "title": "Capacitancia Cilíndrica y Esférica con Dieléctrico",
                        "front": "Escriba la capacitancia de un cable coaxial ($a < b$, largo $L$) y de un capacitor esférico ($a < b$) llenos de dieléctrico $\\varepsilon$.",
                        "back": "1. <b>Cilíndrico:</b> $C = \\frac{2\\pi \\varepsilon L}{\\ln(b/a)}$.<br>2. <b>Esférico:</b> $C = 4\\pi \\varepsilon \\frac{ab}{b - a}$."
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
                        "item_id": 1879938278691182238,
                        "type": "ClozeCard",
                        "title": "Fuerza Electrostática: Carga vs Voltaje Constante",
                        "text": "Por el método del trabajo virtual, la fuerza sobre un dieléctrico móvil es:\\n- A carga constante $Q$: $F_x = {{c1::-\\left(\\frac{\\partial U}{\\partial x}\\right)_Q::derivada a Q fijo}}$\\n- A voltaje constante $V$: $F_x = {{c2::+\\left(\\frac{\\partial U}{\\partial x}\\right)_V = +\\frac{1}{2} V^2 \\frac{dC}{dx}::derivada a V fijo}}$.\\nEl dieléctrico es siempre {{c3::succionado hacia el interior del capacitor::dirección de la fuerza}}."
                    },
                    {
                        "item_id": 1879938278691699595,
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
                        "item_id": 1879938278692614805,
                        "type": "ClozeCard",
                        "title": "Presión Electrostática en Conductor",
                        "text": "La fuerza por unidad de área (presión electrostática hacia el exterior) en la superficie de un conductor cargado es:\\n$$P_{\\text{es}} = {{c1::\\frac{\\sigma^2}{2\\varepsilon_0} = \\frac{1}{2} \\varepsilon_0 E^2::presión electrostática}}$$\\nSiempre está dirigida hacia {{c2::el exterior del conductor::dirección de la presión}} independientemente del signo de $\\sigma$."
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
                        "item_id": 1879938278693571896,
                        "type": "ClozeCard",
                        "title": "Ecuación de Continuidad y Tiempo de Relajación",
                        "text": "Conservación de la carga: $\\nabla \\cdot \\mathbf{J} + {{c1::\\frac{\\partial \\rho}{\\partial t}::derivada temporal de carga}} = 0$.\\nEn un conductor óhmico homogéneo: $\\rho(t) = \\rho_0 e^{-t/\\tau_{\\text{rel}}}$ con tiempo de relajación $\\tau_{\\text{rel}} = {{c2::\\frac{\\varepsilon}{\\sigma}::tiempo de relajación de carga}}$."
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
                        "item_id": 1879938278694690010,
                        "type": "ClozeCard",
                        "title": "Conductividad de Drude y Teorema Dual RC",
                        "text": "Conductividad microscópica según Drude: $\\sigma = {{c1::\\frac{n q^2 \\tau}{m}::conductividad de Drude}}$.\\nTeorema Dual RC entre resistencia y capacitancia para cualquier geometría en medio LHI:\\n$$R \\cdot C = {{c2::\\frac{\\varepsilon}{\\sigma} = \\rho_e \\varepsilon::producto RC geométrico}}$$"
                    },
                    {
                        "item_id": 1879938278696667522,
                        "type": "Flashcard",
                        "title": "Resistencia de Puesta a Tierra Semiesférica",
                        "front": "Calcule la resistencia de puesta a tierra de un electrodo semiesférico de radio $a$ enterrado en suelo con conductividad $\\sigma$.",
                        "back": "1. Por simetría radial, la corriente $I$ fluye por la semiesfera de área $2\\pi r^2$: $J(r) = \\frac{I}{2\\pi r^2}$.<br>2. Campo eléctrico: $E(r) = \\frac{J}{\\sigma} = \\frac{I}{2\\pi \\sigma r^2}$.<br>3. Diferencia de potencial hasta el infinito: $V = \\int_a^\\infty E(r) dr = \\frac{I}{2\\pi \\sigma a}$.<br>4. Resistencia de tierra: $R = \\frac{V}{I} = \\frac{1}{2\\pi \\sigma a}$."
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
                        "item_id": 1879938278697223465,
                        "type": "ClozeCard",
                        "title": "Equivalentes de Thévenin, Norton y Máxima Potencia",
                        "text": "Equivalentes de red lineal:\\n- Thévenin: Fuente $V_{th}$ en serie con $R_{th}$.\\n- Norton: Fuente de corriente $I_N = {{c1::\\frac{V_{th}}{R_{th}}::corriente Norton}}$ en paralelo con $R_{th}$.\\n- Condición de máxima potencia transferida a $R_L$: $R_L = {{c2::R_{th}::condición}}$ con $P_{\\max} = {{c3::\\frac{V_{th}^2}{4 R_{th}}::potencia máxima}}$."
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
                        "item_id": 1879938278697733821,
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
                        "item_id": 1879938278699717085,
                        "type": "Flashcard",
                        "title": "Comportamiento en Transitorios: t=0+ vs t->infinito",
                        "front": "¿Cómo se modelan los capacitores e inductores en $t=0^+$ y en $t \\to \\infty$?",
                        "back": "1. <b>Capacitor:</b><br>- En $t=0^+$: <b>Cortocircuito</b> ($\\Delta V_C = 0$).<br>- En $t\\to\\infty$: <b>Circuito abierto</b> ($i_C = 0$).<br><br>2. <b>Inductor:</b><br>- En $t=0^+$: <b>Circuito abierto</b> ($i_L = 0$).<br>- En $t\\to\\infty$: <b>Cortocircuito</b> ($\\Delta V_L = 0$)."
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
                        "item_id": 1879938278700695659,
                        "type": "ClozeCard",
                        "title": "Fuerza de Lorentz y Radio Ciclotrónico",
                        "text": "Fuerza total: $\\mathbf{F} = q(\\mathbf{E} + \\mathbf{v}\\times\\mathbf{B})$.\\nLa potencia del campo magnético es $P = \\mathbf{F}_B \\cdot \\mathbf{v} = {{c1::0::potencia nula}}$, por lo que {{c2::nunca altera la energía cinética::efecto magnético}}.\\nRadio ciclotrón: $r_c = {{c3::\\frac{m v_\\perp}{q B}::radio ciclotrón}}$, período: $T = {{c4::\\frac{2\\pi m}{q B}::período}}$."
                    },
                    {
                        "item_id": 1879938278700989016,
                        "type": "Flashcard",
                        "title": "Paso de la Trayectoria Helicoidal",
                        "front": "Si una partícula entra a un campo $\\mathbf{B}$ con ángulo $\\alpha$ respecto a las líneas de campo, ¿cuál es el paso de avance $p$?",
                        "back": "1. Componente paralela constante: $v_\\parallel = v \\cos\\alpha$.<br>2. Período de giro en el plano transversal: $T = \\frac{2\\pi m}{q B}$.<br>3. Paso helicoidal: $p = v_\\parallel T = \\frac{2\\pi m v \\cos\\alpha}{q B}$."
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
                        "item_id": 1879938278703868708,
                        "type": "ClozeCard",
                        "title": "Fórmulas del Efecto Hall y Selector",
                        "text": "- Selector de velocidades con $\\mathbf{E} \\perp \\mathbf{B}$: velocidad filtrada $v = {{c1::\\frac{E}{B}::velocidad de Wien}}$.\\n- Voltaje de Hall en cinta de espesor $t$: $\\Delta V_H = {{c2::\\frac{I B}{n q t} = R_H \\frac{I B}{t}::voltaje de Hall}}$.\\n- Coeficiente de Hall: $R_H = {{c3::\\frac{1}{nq}::coeficiente RH}}$, cuyo signo revela el tipo de portadores mayoritarios."
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
                        "item_id": 1879938278704476448,
                        "type": "ClozeCard",
                        "title": "Fuerza y Torque sobre Espiras",
                        "text": "Fuerza elemental sobre corriente: $d\\mathbf{F} = {{c1::I d\\boldsymbol{\\ell} \\times \\mathbf{B}::fuerza diferencial}}$.\\nPara una espira plana de área vectorial $\\mathbf{A}$ con corriente $I$:\\n- Momento dipolar: $\\boldsymbol{\\mu} = {{c2::I \\mathbf{A}::momento dipolar}}$\\n- Torque: $\\boldsymbol{\\tau} = {{c3::\\boldsymbol{\\mu} \\times \\mathbf{B}::torque}}$\\n- Energía potencial: $U = {{c4::-\\boldsymbol{\\mu} \\cdot \\mathbf{B}::energía potencial}}$."
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
                        "item_id": 1879938278705526634,
                        "type": "ClozeCard",
                        "title": "Fórmulas de Biot-Savart para Alambres",
                        "text": "Ley de Biot-Savart: $d\\mathbf{B} = \\frac{\\mu_0 I}{4\\pi}\\frac{d\\boldsymbol{\\ell}\\times\\hat{r}}{r^2}$.\\n- Segmento finito entre $\\theta_1$ y $\\theta_2$: $B = {{c1::\\frac{\\mu_0 I}{4\\pi d}(\\sin\\theta_2 - \\sin\\theta_1)::segmento finito}}$.\\n- Hilo infinito: $B = {{c2::\\frac{\\mu_0 I}{2\\pi d}::hilo infinito}}$.\\n- Puntos colineales en la prolongación del alambre: $B = {{c3::0::campo nulo en prolongación}}$."
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
                        "item_id": 1879938278706874840,
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
                        "item_id": 1879938278707247877,
                        "type": "Flashcard",
                        "title": "Bobinas de Helmholtz: Campo Óptimamente Homogéneo",
                        "front": "¿Por qué en las bobinas de Helmholtz la separación óptima entre bobinas es $d = R$?",
                        "back": "En el punto medio $z=0$ entre ambas bobinas coaxiales:<br>1. Por simetría par, la primera derivada es nula: $\\frac{dB}{dz} = 0$.<br>2. La segunda derivada es proporcional a $(4d^2 - R^2)$. Fijando $d=R$, se anula idénticamente: $\\frac{d^2 B}{dz^2} = 0$.<br>3. Las variaciones espaciales son de orden cuatro ($O(z^4)$), logrando la máxima uniformidad magnética experimental."
                    },
                    {
                        "item_id": 1879938278708872907,
                        "type": "ClozeCard",
                        "title": "Campo en el Centro de un Arco Circular",
                        "text": "Para un arco circular de radio $R$ que subtiende un ángulo $\\alpha$ (en radianes) con corriente $I$:\\n$$B_{\\text{centro}} = {{c1::\\frac{\\mu_0 I \\alpha}{4\\pi R}::campo de arco circular}}$$\\nSi es una espira completa ($\\alpha = 2\\pi$): $B = \\frac{\\mu_0 I}{2R}$."
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
                        "item_id": 1879938278709756708,
                        "type": "ClozeCard",
                        "title": "Fuerza entre Hilos Paralelos",
                        "text": "Fuerza por unidad de longitud entre dos conductores paralelos separados distancia $d$:\\n$$\\frac{F}{L} = {{c1::\\frac{\\mu_0 I_1 I_2}{2\\pi d}::fuerza por longitud}}$$\\n- Corrientes en el mismo sentido: se {{c2::atraen::atracción o repulsión}}.\\n- Corrientes en sentidos opuestos: se {{c3::repelen::atracción o repulsión}}."
                    },
                    {
                        "item_id": 1879938278710813211,
                        "type": "Flashcard",
                        "title": "Fuerza Neta sobre Espira Coplanar a Hilo Infinito",
                        "front": "Una espira rectangular de lados $a$ (paralelo) y $b$ (perpendicular) con corriente $I_2$ se sitúa a distancia $d$ de un hilo largo con corriente $I_1$. Calcule la fuerza neta.",
                        "back": "1. Los lados perpendiculares sufren fuerzas opuestas que se cancelan vectorialmente.<br>2. Lado cercano (atracción): $F_1 = \\frac{\\mu_0 I_1 I_2 a}{2\\pi d}$.<br>3. Lado lejano (repulsión): $F_2 = \\frac{\\mu_0 I_1 I_2 a}{2\\pi (d+b)}$.<br>4. Fuerza Neta Atractiva:<br>$$F_{\\text{net}} = \\frac{\\mu_0 I_1 I_2 a b}{2\\pi d(d+b)}$$"
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
                        "item_id": 1879938278712045979,
                        "type": "ClozeCard",
                        "title": "Formas de la Ley de Ampère",
                        "text": "- Integral: $\\oint_{\\mathcal{C}} \\mathbf{B} \\cdot d\\boldsymbol{\\ell} = {{c1::\\mu_0 I_{\\text{enc}}::forma integral}}$\\n- Diferencial: $\\nabla \\times \\mathbf{B} = {{c2::\\mu_0 \\mathbf{J}::rotacional de B}}$.\\n- En solenoide ideal de $n$ espiras/metro: interior $B = {{c3::\\mu_0 n I::interior solenoide}}$, exterior $B \\approx 0$.\\n- En toroide de $N$ espiras y radio medio $r$: $B(r) = {{c4::\\frac{\\mu_0 N I}{2\\pi r}::toroide}}$."
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
                        "item_id": 1879938278712595334,
                        "type": "ClozeCard",
                        "title": "Magnetización y Campo Auxiliar H",
                        "text": "A partir del vector magnetización $\\mathbf{M}$:\\n- Corriente volumétrica ligada: $\\mathbf{J}_b = {{c1::\\nabla \\times \\mathbf{M}::rotacional de M}}$\\n- Corriente superficial ligada: $\\mathbf{K}_b = {{c2::\\mathbf{M} \\times \\hat{n}::salto superficial}}$\\n- Campo auxiliar: $\\mathbf{H} = {{c3::\\frac{\\mathbf{B}}{\\mu_0} - \\mathbf{M}::definición de H}}$, con $\\oint \\mathbf{H} \\cdot d\\boldsymbol{\\ell} = I_{f,\\text{enc}}$."
                    },
                    {
                        "item_id": 1879938278713659771,
                        "type": "Flashcard",
                        "title": "Condiciones de Borde en Interfaces Magnéticas",
                        "front": "¿Cuáles son las condiciones de frontera para $\\mathbf{B}$ y $\\mathbf{H}$ en la interfaz entre dos medios magnéticos?",
                        "back": "1. <b>Componente normal de $\\mathbf{B}$:</b> Es estrictamente continua:<br>$$B_{1n} - B_{2n} = 0 \\iff B_{1n} = B_{2n}$$<br>(debido a $\\nabla \\cdot \\mathbf{B} = 0$, no existen monopolos magnéticos).<br>2. <b>Componente tangencial de $\\mathbf{H}$:</b> Salto determinado por la corriente libre superficial $\\mathbf{K}_f$:<br>$$\\mathbf{H}_{1t} - \\mathbf{H}_{2t} = \\mathbf{K}_f \\times \\hat{n}$$<br>Si no hay corrientes libres superficiales ($\\mathbf{K}_f = \\mathbf{0}$): $H_{1t} = H_{2t}$."
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
                        "item_id": 1879938278714912743,
                        "type": "ClozeCard",
                        "title": "Leyes de Faraday y Lenz",
                        "text": "Fuerza electromotriz inducida en circuito cerrado:\\n$$\\mathcal{E} = \\oint \\mathbf{E} \\cdot d\\boldsymbol{\\ell} = {{c1::-\\frac{d\\Phi_B}{dt}::Ley de Faraday-Lenz}}$$\\nForma diferencial de Maxwell-Faraday:\\n$$\\nabla \\times \\mathbf{E} = {{c2::-\\frac{\\partial \\mathbf{B}}{\\partial t}::rotacional del campo eléctrico inducido}}$$\\nEl signo negativo de Lenz impone que la corriente inducida {{c3::se opone al cambio de flujo::regla de Lenz}}."
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
                        "item_id": 1879938278716392552,
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
                        "item_id": 1879938278716923528,
                        "type": "Flashcard",
                        "title": "Disco de Faraday (Generador Homopolar)",
                        "front": "Un disco conductor de radio $R$ gira con velocidad angular constante $\\omega$ en un campo magnético uniforme paralelo a su eje $\\mathbf{B} = B\\hat{z}$. Calcule la FEM inducida entre el centro y el borde.",
                        "back": "1. Cada elemento radial a distancia $r$ se mueve a velocidad $v(r) = \\omega r$.<br>2. Campo eléctrico de Lorentz de movimiento: $\\mathbf{E}_m = \\mathbf{v} \\times \\mathbf{B} = (\\omega r \\hat{\\theta}) \\times (B \\hat{z}) = \\omega r B \\hat{r}$.<br>3. La FEM entre el eje y el borde del disco es:<br>$$\\mathcal{E} = \\int_0^R \\mathbf{E}_m \\cdot d\\mathbf{r} = \\int_0^R \\omega B r \\, dr = \\frac{1}{2} B \\omega R^2$$"
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
                        "item_id": 1879938278718037922,
                        "type": "ClozeCard",
                        "title": "Inductancia y Densidad de Energía Magnética",
                        "text": "- Teorema de reciprocidad: ${{c1::M_{12} = M_{21} = M::igualdad de inductancias mutuas}}$.\\n- Energía en un inductor: $U_B = {{c2::\\frac{1}{2} L I^2::energía inductor}}$.\\n- Densidad volumétrica de energía magnética: $u_B = {{c3::\\frac{B^2}{2\\mu_0} = \\frac{1}{2}\\mathbf{B}\\cdot\\mathbf{H}::densidad magnética}}$.\\n- Constante de tiempo de circuito RL: $\\tau_L = {{c4::\\frac{L}{R}::constante de tiempo RL}}$."
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
                        "item_id": 1879938278896550983,
                        "type": "ClozeCard",
                        "title": "Axiomas Métricos y Topología Relativa",
                        "text": "Axiomas métricos: no negatividad, separación $d(x, y)=0 \\iff x=y$, simetría y {{c1::desigualdad triangular $d(x, z) \\le d(x, y) + d(y, z)$::desigualdad triangular}}.\\nEn subespacio $S \\subseteq X$, un conjunto $U_S$ es abierto relativo si y sólo si ${{c2::U_S = U \\cap S::abierto relativo}}$ con $U$ abierto en $X$."
                    },
                    {
                        "item_id": 1879938278897405475,
                        "type": "Flashcard",
                        "title": "Bolas en la Métrica Discreta",
                        "front": "Sea $X$ dotado de la métrica discreta $d(x, y) = 1$ si $x \\ne y$ y $0$ si $x = y$. Describa las bolas abiertas $B(x, r)$ para $r \\le 1$ y $r > 1$.",
                        "back": "1. <b>Para $r \\le 1$:</b> $B(x, r) = \\{y \\in X : d(x, y) < r\\} = \\{x\\}$ (el singleton individual). En consecuencia, todo subconjunto de $X$ es abierto (y por ende también cerrado).<br>2. <b>Para $r > 1$:</b> $B(x, r) = X$ (todo el espacio métrico)."
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
                        "item_id": 1879938278898228464,
                        "type": "ClozeCard",
                        "title": "Cuatro Caracterizaciones Equivalentes de Continuidad",
                        "text": "Para $f: X \\to Y$, son equivalentes:\\n(i) $\\forall U \\subseteq Y$ abierto $\\implies f^{-1}(U)$ es {{c1::abierto en X::preimagen de abiertos}}.\\n(ii) $\\forall F \\subseteq Y$ cerrado $\\implies f^{-1}(F)$ es {{c2::cerrado en X::preimagen de cerrados}}.\\n(iii) $\\forall A \\subseteq X \\implies f(\\overline{A}) \\subseteq {{c3::\\overline{f(A)}::preservación de clausuras}}$.\\n(iv) Continuidad secuencial: $x_n \\to x_0 \\implies f(x_n) \\to f(x_0)$."
                    },
                    {
                        "item_id": 1879938278899339423,
                        "type": "Flashcard",
                        "title": "Falla de Conexidad en Preimágenes",
                        "front": "¿Preserva la continuidad la conexidad en preimágenes? Muestre un contraejemplo donde $V$ es conexo pero $f^{-1}(V)$ es disconexo.",
                        "back": "<b>Respuesta:</b> NO. La continuidad preserva conexidad en la <b>imagen directa</b> ($f(X)$ es conexo), pero NO en preimágenes.<br><b>Contraejemplo:</b> $f: \\mathbb{R} \\to \\mathbb{R}$ dada por $f(x) = x^2$ es continua. El intervalo $V = (1, 4)$ es conexo en $\\mathbb{R}$.<br>Sin embargo, su preimagen es:<br>$$f^{-1}((1, 4)) = (-2, -1) \\cup (1, 2)$$<br>la cual es unión disjunta de dos abiertos no vacíos, luego es <b>disconexa</b>."
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
                        "item_id": 1879938278900909733,
                        "type": "ClozeCard",
                        "title": "Funciones Lipschitz y Hölder",
                        "text": "- Lipschitz: $d_Y(f(x), f(x')) \\le L d_X(x, x') \\implies$ uniformemente continua con $\\delta = {{c1::\\varepsilon / L::delta Lipschitz}}$.\\n- Hölder de orden $\\alpha \\in (0, 1]$: $d_Y(f(x), f(x')) \\le C (d_X(x, x'))^\\alpha \\implies$ uniformemente continua con $\\delta = {{c2::(\\varepsilon / C)^{1/\\alpha}::delta Hölder}}$.\\n- Refutación secuencial: $f$ es discontinua si existe $x_n \\to x_0$ con {{c3::f(x_n) \\not\\to f(x_0)::falla secuencial}}."
                    },
                    {
                        "item_id": 1879938278901449630,
                        "type": "Flashcard",
                        "title": "Función Hölder no Lipschitziana",
                        "front": "Muestre que la función $f(x) = \\sqrt{x}$ en $[0, 1]$ es $1/2$-Hölder continua pero NO es Lipschitziana.",
                        "back": "1. <b>Hölder $\\alpha = 1/2$:</b> Para $x, y \\ge 0$, se cumple $|\\sqrt{x} - \\sqrt{y}| \\le \\sqrt{|x - y|}$. Por ende es $1/2$-Hölder con constante $C = 1$.<br>2. <b>No Lipschitz:</b> Evaluando en $y = 0$: $\\frac{|f(x) - f(0)|}{|x - 0|} = \\frac{\\sqrt{x}}{x} = \\frac{1}{\\sqrt{x}} \\to \\infty$ cuando $x \\to 0^+$. Al no ser el cociente acotado, no existe constante $L$ finita."
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
                        "item_id": 1879938278903361675,
                        "type": "Flashcard",
                        "title": "Teorema de Coincidencia en Subconjuntos Densos",
                        "front": "Sean $f, g: X \\to Y$ continuas con $Y$ métrico. Pruebe que $\\{x : f(x) = g(x)\\}$ es cerrado y que si coinciden en un denso $D$, coinciden en todo $X$.",
                        "back": "1. La función $h(x) = d_Y(f(x), g(x))$ es continua. El conjunto de coincidencia es $E = h^{-1}(\\{0\\})$, que es cerrado por ser preimagen de un cerrado.<br>2. Si $f|_D = g|_D$, entonces $D \\subseteq E$. Tomando clausuras: $X = \\overline{D} \\subseteq \\overline{E} = E$, por lo que $E = X$, demostrando $f \\equiv g$."
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
                        "item_id": 1879938278905017103,
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
                        "item_id": 1879938278905839765,
                        "type": "ClozeCard",
                        "title": "Clausura Topológica con la Distancia",
                        "text": "Un punto $x$ pertenece a la clausura $\\overline{A}$ si y sólo si:\\n$$d(x, A) = {{c1::0::distancia nula}}$$\\nSi $A$ es cerrado: $x \\in A \\iff d(x, A) = 0$."
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
                        "item_id": 1879938278907441957,
                        "type": "Flashcard",
                        "title": "Construcción Explícita del Lema de Urysohn Métrico",
                        "front": "Dados dos cerrados disjuntos $A, B \\subset X$, construya una función continua que separe $f|_A \\equiv 0$ y $f|_B \\equiv 1$.",
                        "back": "Como $A \\cap B = \\emptyset$ y son cerrados, $d(x, A) + d(x, B) > 0 \\quad \\forall x \\in X$.<br>Se define:<br>$$f(x) = \\frac{d(x, A)}{d(x, A) + d(x, B)}$$<br>1. $x \\in A \\implies d(x, A) = 0 \\implies f(x) = 0$.<br>2. $x \\in B \\implies d(x, B) = 0 \\implies f(x) = 1$.<br>3. Es continua por ser cociente de funciones 1-Lipschitz con denominador no nulo."
                    },
                    {
                        "item_id": 1879938278907499396,
                        "type": "ClozeCard",
                        "title": "Separación entre Compacto y Cerrado Disjuntos",
                        "text": "Si $K$ es compacto, $F$ es cerrado y $K \\cap F = \\emptyset$:\\n$$\\text{dist}(K, F) = \\inf_{x \\in K, y \\in F} d(x, y) {{c1::> 0 (es estrictamente positiva)::cota de separación}}$$\\nFalla si ninguno es compacto: $y = 0$ y $x y = 1$ en $\\mathbb{R}^2$ tienen distancia {{c2::0 (cero)::distancia asintótica}}."
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
                        "item_id": 1879938278909505838,
                        "type": "ClozeCard",
                        "title": "Preservación de Compacidad y Teorema de Extremos",
                        "text": "Si $f: X \\to Y$ es continua y $K \\subseteq X$ es compacto, $f(K)$ es {{c1::compacto en Y::propiedad de la imagen}}.\\nTeorema de Weierstrass: Toda $f: K \\to \\mathbb{R}$ continua sobre un compacto no vacío es acotada y {{c2::alcanza su máximo y su mínimo absoluto::extremos globales}}."
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
                        "item_id": 1879938278909957113,
                        "type": "Flashcard",
                        "title": "Teorema de la Inversa Continua sobre Compactos",
                        "front": "Demuestre que si $K$ es compacto y $f: K \\to Y$ es continua y biyectiva, entonces $f^{-1}: Y \\to K$ es continua.",
                        "back": "Para probar que $g = f^{-1}$ es continua, se prueba que la preimagen de cualquier cerrado $F \\subseteq K$ es cerrada:<br>$g^{-1}(F) = f(F)$.<br>1. $F$ cerrado en compacto $K \\implies F$ es compacto.<br>2. $f$ continua $\\implies f(F)$ es compacto en $Y$.<br>3. En todo espacio métrico, compacto implica cerrado $\\implies f(F)$ es cerrado en $Y$. Por ende, $f^{-1}$ es continua."
                    },
                    {
                        "item_id": 1879938278911571785,
                        "type": "Flashcard",
                        "title": "Contraejemplo: Falla de Inversa Continua sin Compacidad",
                        "front": "Muestre una biyección continua con inversa discontinua por no ser el dominio compacto.",
                        "back": "$f: [0, 2\\pi) \\to S^1, \\quad t \\mapsto (\\cos t, \\sin t)$.<br>1. $f$ es continua y biyectiva.<br>2. Su inversa $f^{-1}$ es discontinua en $(1, 0)$: puntos con $t_n = 2\\pi - 1/n$ tienden a $(1, 0)$, pero $f^{-1} \\to 2\\pi \\ne 0$."
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
                        "item_id": 1879938278912519786,
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
                        "item_id": 1879938278913700463,
                        "type": "ClozeCard",
                        "title": "Funciones Periódicas Continuas en R",
                        "text": "Toda función $f: \\mathbb{R} \\to \\mathbb{R}$ continua y periódica es {{c1::uniformemente continua en todo R::propiedad global}}.\\nDemostración: Por Heine-Cantor es uniformemente continua en el intervalo compacto $[0, 2T]$, y la periodicidad extiende el mismo $\\delta$ a todo $\\mathbb{R}$."
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
                        "item_id": 1879938278913784851,
                        "type": "ClozeCard",
                        "title": "Teorema de Extensión Única al Completado",
                        "text": "Si $D \\subset X$ es denso ($\\overline{D} = X$), $Y$ es completo y $f: D \\to Y$ es uniformemente continua:\\nExiste {{c1::una única extensión continua $\\tilde{f}: X \\to Y$::existencia y unicidad}} y además es {{c2::uniformemente continua::regularidad}} en todo $X$."
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
                        "item_id": 1879938278915468427,
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
                        "item_id": 1879938278916184454,
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
                        "item_id": 1879938278916971858,
                        "type": "Flashcard",
                        "title": "Invarianza Topológica por Remoción de Puntos (Corte)",
                        "front": "Demuestre que $[0, 1)$ no es homeomorfo a $(0, 1)$ y que $\\mathbb{R}$ no es homeomorfo a $\\mathbb{R}^2$.",
                        "back": "1. <b>$[0, 1)$ vs $(0, 1)$:</b> Removiendo el punto $0$, $[0, 1)\\setminus\\{0\\} = (0, 1)$ es <b>conexo</b>. Pero remover cualquier punto $f(0)$ en $(0, 1)$ produce dos intervalos disjuntos, conjunto <b>disconexo</b>.<br>2. <b>$\\mathbb{R}$ vs $\\mathbb{R}^2$:</b> $\\mathbb{R}\\setminus\\{p\\}$ tiene 2 componentes conexas, mientras que $\\mathbb{R}^2\\setminus\\{q\\}$ permanece <b>conexo</b>."
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
                        "item_id": 1879938278918846783,
                        "type": "ClozeCard",
                        "title": "Arcoconexidad vs Conexidad",
                        "text": "Todo espacio arcoconexo es {{c1::conexo::implicación}}.\\nEl recíproco es falso: El contraejemplo clásico es {{c2::la curva seno del topólogo::contraejemplo}}, la cual es conexa pero no arcoconexa."
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
                        "item_id": 1879938278919194120,
                        "type": "ClozeCard",
                        "title": "Convergencia Uniforme con Norma Infinito",
                        "text": "Una sucesión $f_n: X \\to Y$ converge uniformemente a $f$ si y sólo si:\\n$$\\lim_{n \\to \\infty} \\|f_n - f\\|_\\infty = \\lim_{n \\to \\infty} {{c1::\\sup_{x \\in X} d_Y(f_n(x), f(x)) = 0::límite de la norma infinito}}$$\\nEl índice $N(\\varepsilon)$ es {{c2::independiente del punto x::independencia de x}}."
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
                        "item_id": 1879938278920763176,
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
                        "item_id": 1879938278922185530,
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
                        "item_id": 1879938278923363889,
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
                        "item_id": 1879938278924265897,
                        "type": "ClozeCard",
                        "title": "Hipótesis del Teorema de Dini",
                        "text": "Teorema de Dini: Si $K$ es compacto, $f_n$ continuas, $f_n \\to f$ puntualmente con $f$ continua y la convergencia es monótona ($f_{n+1} \\le f_n$), entonces la convergencia es forzosamente {{c1::uniforme en K::consecuencia}}."
                    },
                    {
                        "item_id": 1879938278925734849,
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
                        "item_id": 1879938278926462979,
                        "type": "ClozeCard",
                        "title": "Teorema de Arzelà-Ascoli",
                        "text": "En compacto $K$, una familia $\\mathcal{F} \\subset C(K, \\mathbb{R})$ es relativamente compacta si y sólo si:\\n1. Es {{c1::puntualmente acotada::condición 1}} ($\\forall x \\in K, \\sup_{f \\in \\mathcal{F}} |f(x)| < \\infty$).\\n2. Es {{c2::equicontinua en K::condición 2}}."
                    },
                    {
                        "item_id": 1879938278927707536,
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
                        "item_id": 1879938278928433664,
                        "type": "ClozeCard",
                        "title": "Enunciado de Stone-Weierstrass",
                        "text": "Una subálgebra $\\mathcal{A} \\subset C(K, \\mathbb{R})$ sobre un compacto $K$ es densa si y sólo si:\\n1. {{c1::Separa puntos::condición 1}}: $\\forall x \\ne y \\implies \\exists f \\in \\mathcal{A} : f(x) \\ne f(y)$.\\n2. {{c2::Contiene las funciones constantes::condición 2}}: $\\mathbf{1} \\in \\mathcal{A}$."
                    },
                    {
                        "item_id": 1879938278930027586,
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
                        "item_id": 1879938278931522484,
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
                        "item_id": 1879938278931832688,
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
                        "item_id": 1879938278933263466,
                        "type": "Flashcard",
                        "title": "Teorema de Edelstein en Espacios Compactos",
                        "front": "Enuncie el Teorema de Edelstein de contracción débil.",
                        "back": "Sea $K$ <b>compacto</b> y $T: K \\to K$ tal que $d(Tx, Ty) < d(x, y) \\quad \\forall x \\ne y$.<br>Entonces $T$ tiene un único punto fijo $x^* \\in K$.<br>Demostración: $\\varphi(x) = d(x, Tx)$ es continua en el compacto $K$ y alcanza su mínimo en $x^*$. Si $Tx^* \\ne x^*$, $\\varphi(Tx^*) < \\varphi(x^*)$, contradicción."
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
                        "item_id": 1879938278936403810,
                        "type": "ClozeCard",
                        "title": "Definición Estequiométrica de Velocidad",
                        "text": "Para $aA + bB \\to cC + dD$:\\n$$v = {{c1::-\\frac{1}{a}\\frac{d[A]}{dt} = -\\frac{1}{b}\\frac{d[B]}{dt} = \\frac{1}{c}\\frac{d[C]}{dt} = \\frac{1}{d}\\frac{d[D]}{dt}::definición estequiométrica}}$$\\nLey diferencial general: $v = k [A]^x [B]^y$, donde $x, y$ se obtienen {{c2::experimentalmente::determinación experimental}}."
                    },
                    {
                        "item_id": 1879938278937265679,
                        "type": "Flashcard",
                        "title": "Estequiometría de Velocidad en Reacción N2O5",
                        "front": "Para $2\\text{N}_2\\text{O}_5 \\to 4\\text{NO}_2 + \\text{O}_2$, exprese la relación entre la velocidad de desaparición de reactivo y aparición de productos.",
                        "back": "$$v = -\\frac{1}{2}\\frac{d[\\text{N}_2\\text{O}_5]}{dt} = \\frac{1}{4}\\frac{d[\\text{NO}_2]}{dt} = \\frac{d[\\text{O}_2]}{dt}$$<br>Por ende: $\\frac{d[\\text{NO}_2]}{dt} = -2\\frac{d[\\text{N}_2\\text{O}_5]}{dt}$, es decir, el dióxido de nitrógeno aparece al doble de rapidez con que desaparece el pentóxido de dinitrógeno."
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
                        "item_id": 1879938278937936309,
                        "type": "ClozeCard",
                        "title": "Unidades de la Constante de Velocidad k",
                        "text": "Para reacción de orden global $n$:\\n$$[k] = {{c1::\\text{M}^{1-n} \\cdot \\text{s}^{-1} = \\text{mol}^{1-n} \\cdot \\text{L}^{n-1} \\cdot \\text{s}^{-1}::unidades generales}}$$\\n- Orden 0: $[k] = {{c2::\\text{M}\\cdot\\text{s}^{-1}::orden 0}}$\\n- Orden 1: $[k] = {{c3::\\text{s}^{-1}::orden 1}}$\\n- Orden 2: $[k] = {{c4::\\text{M}^{-1}\\cdot\\text{s}^{-1}::orden 2}}$."
                    },
                    {
                        "item_id": 1879938278939506649,
                        "type": "Flashcard",
                        "title": "Algoritmo: Método de Velocidades Iniciales",
                        "front": "¿Cómo se determinan los órdenes parciales en una tabla de ensayos experimentales?",
                        "back": "1. Elegir dos ensayos donde cambie $[A]$ y los demás reactivos se mantengan constantes.<br>2. Cociente de velocidades: $\\frac{v_2}{v_1} = \\left(\\frac{[A]_2}{[A]_1}\\right)^x \\implies x = \\frac{\\ln(v_2/v_1)}{\\ln([A]_2/[A]_1)}$.<br>3. Despejar $k = \\frac{v_0}{[A]_0^x [B]_0^y}$ y asignar sus unidades estrictas $\\text{M}^{1-n}\\text{s}^{-1}$."
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
                        "item_id": 1879938278940736375,
                        "type": "ClozeCard",
                        "title": "Leyes de Orden Cero",
                        "text": "Para reacción de orden 0 ($v = k$):\\n- Concentración temporal: $[A]_t = {{c1::[A]_0 - kt::ley integrada orden 0}}$\\n- Vida media: $t_{1/2} = {{c2::\\frac{[A]_0}{2k}::vida media orden 0}}$\\n- Gráfico lineal: $[A]$ vs $t$ con pendiente {{c3::-k::pendiente de orden 0}}."
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
                        "item_id": 1879938278941702387,
                        "type": "ClozeCard",
                        "title": "Leyes de Primer Orden",
                        "text": "Para reacción de orden 1 ($v = k[A]$):\\n- Concentración: $\\ln[A]_t = {{c1::\\ln[A]_0 - kt \\iff [A]_t = [A]_0 e^{-kt}::forma integrada orden 1}}$\\n- Vida media: $t_{1/2} = {{c2::\\frac{\\ln 2}{k} \\approx \\frac{0.6931}{k}::vida media orden 1}}$ ({{c3::independiente de [A]_0::propiedad fundamental}}).\\n- Gráfico lineal: $\\ln[A]$ vs $t$ con pendiente $-k$."
                    },
                    {
                        "item_id": 1879938278942183151,
                        "type": "Flashcard",
                        "title": "Datación por Carbono-14",
                        "front": "Deduzca la fórmula para calcular la edad $t$ de un fósil a partir de su actividad remanente $A_t$ y su vida media $t_{1/2}$.",
                        "back": "El decaimiento radiactivo es cinéticamente de primer orden puro:<br>$$k = \\frac{\\ln 2}{t_{1/2}}$$<br>De la ley integrada: $\\ln(A_t / A_0) = -k t \\implies t = \\frac{1}{k}\\ln\\left(\\frac{A_0}{A_t}\\right) = \\frac{t_{1/2}}{\\ln 2} \\ln\\left(\\frac{A_0}{A_t}\\right)$."
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
                        "item_id": 1879938278944108519,
                        "type": "ClozeCard",
                        "title": "Leyes de Segundo Orden",
                        "text": "Para orden 2 ($v = k[A]^2$):\\n- Integrada: $\\frac{1}{[A]_t} = {{c1::\\frac{1}{[A]_0} + kt::forma integrada orden 2}}$\\n- Vida media: $t_{1/2} = {{c2::\\frac{1}{k[A]_0}::vida media orden 2}}$\\n- Gráfico lineal: $1/[A]$ vs $t$ con pendiente {{c3::+k (positiva)::pendiente positiva}}."
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
                        "item_id": 1879938278945081273,
                        "type": "ClozeCard",
                        "title": "Ecuación de Arrhenius",
                        "text": "Ecuación de Arrhenius:\\n$$k = {{c1::A e^{-E_a/(RT)}::forma exponencial de Arrhenius}}$$\\nLinealizada: $\\ln k = \\ln A - \\frac{E_a}{R}\\frac{1}{T}$ con pendiente {{c2::-E_a/R::pendiente de Arrhenius}}.\\nDos temperaturas: $\\ln(k_2/k_1) = {{c3::\\frac{E_a}{R}\\left(\\frac{1}{T_1} - \\frac{1}{T_2}\\right)::dos temperaturas}}$."
                    },
                    {
                        "item_id": 1879938278945776082,
                        "type": "Flashcard",
                        "title": "Regla de Duplicación cada 10°C",
                        "front": "Si una reacción duplica su velocidad al pasar de $20^\\circ\\text{C}$ a $30^\\circ\\text{C}$ ($k_2/k_1 = 2$), calcule $E_a$.",
                        "back": "$T_1 = 293.15\\,\\text{K}$ y $T_2 = 303.15\\,\\text{K}$.<br>$\\ln 2 = \\frac{E_a}{8.314}\\left(\\frac{10}{293.15 \\times 303.15}\\right) \\implies E_a \\approx 51.2\\,\\text{kJ/mol}$."
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
                        "item_id": 1879938278947219950,
                        "type": "ClozeCard",
                        "title": "Etapa Limitante y Estado Estacionario",
                        "text": "- La velocidad global está gobernada por la etapa {{c1::más lenta (Rate Determining Step, RDS)::etapa limitante}}.\\n- Para intermediarios reactivos inestables $I$: $\\frac{d[I]}{dt} \\approx {{c2::0 (Aproximación de Estado Estacionario, SSA)::derivada nula}}$.\\n- Si $[B]_0 \\gg [A]_0$, se sigue cinética de {{c3::pseudo-primer orden::pseudo orden}} con $k_{\\text{obs}} = k[B]_0^y$."
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
                        "item_id": 1879938278947421644,
                        "type": "Flashcard",
                        "title": "Rol del Catalizador: Qué Altera y Qué NO Altera",
                        "front": "En una reacción reversible, ¿qué magnitudes altera y cuáles NO altera un catalizador?",
                        "back": "1. <b>SÍ altera:</b> Disminuye $E_a$; incrementa $k_{\\text{dir}}$ y $k_{\\text{inv}}$ en el mismo factor; acelera el tiempo de llegada al equilibrio.<br>2. <b>NO altera:</b> $\\Delta G^\\circ$, $\\Delta H^\\circ$, $K_{\\text{eq}}$ ni las concentraciones finales de equilibrio. No se consume."
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
                        "item_id": 1879938278948834660,
                        "type": "ClozeCard",
                        "title": "Relación entre Kp y Kc",
                        "text": "Para reacción gaseosa $aA(g) + bB(g) \\rightleftharpoons cC(g) + dD(g)$:\\n$$K_p = {{c1::K_c (RT)^{\\Delta n_{(g)}}::conversión Kp Kc}}$$\\ndonde $\\Delta n_{(g)} = {{c2::(c + d) - (a + b)::moles de gas productos menos reactivos}}$.\\nSi $\\Delta n_{(g)} = 0 \\implies K_p {{c3::= K_c::igualdad}}$."
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
                        "item_id": 1879938278950336447,
                        "type": "ClozeCard",
                        "title": "Criterio de Evolución con Q",
                        "text": "- Si $Q < K$: La reacción avanza hacia la {{c1::derecha (hacia productos)::sentido directo}}.\\n- Si $Q = K$: Sistema en {{c2::equilibrio dinámico::equilibrio}}.\\n- Si $Q > K$: La reacción avanza hacia la {{c3::izquierda (hacia reactivos)::sentido inverso}}.\\nRegla de sólidos y líquidos puros: Tienen actividad 1 y {{c4::NO se incluyen en K::exclusión de sólidos}}."
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
                        "item_id": 1879938278951011792,
                        "type": "ClozeCard",
                        "title": "Energía Libre y Constante de Equilibrio",
                        "text": "$$\\Delta G^\\circ = {{c1::-RT \\ln K::relación Delta G y K}} \\iff K = {{c2::\\exp\\left(-\\frac{\\Delta G^\\circ}{RT}\\right)::K exponencial}}$$\\nBajo condiciones no estándar:\\n$$\\Delta G = {{c3::\\Delta G^\\circ + RT \\ln Q::Delta G no estándar}}$$\\nEn el equilibrio: $\\Delta G = {{c4::0::Delta G en equilibrio}}$."
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
                        "item_id": 1879938278952193751,
                        "type": "Flashcard",
                        "title": "Efecto de Compresión y Gases Inertes",
                        "front": "Analice según Le Châtelier: (1) Reducción de volumen, y (2) Adición de gas inerte a volumen constante.",
                        "back": "1. <b>Reducción de volumen:</b> Aumenta la presión; se desplaza hacia el lado con <b>menor número de moles gaseosos</b>.<br>2. <b>Gas inerte a volumen constante:</b> Las presiones parciales de reactivos y productos no cambian; $Q$ permanece intacto y el equilibrio <b>NO se desplaza</b>."
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
                        "item_id": 1879938278954548033,
                        "type": "ClozeCard",
                        "title": "Ecuación de van 't Hoff",
                        "text": "La temperatura es la ÚNICA variable que cambia el valor de $K$:\\n$$\\ln\\left(\\frac{K_2}{K_1}\\right) = {{c1::\\frac{\\Delta H^\\circ}{R}\\left(\\frac{T_2 - T_1}{T_1 T_2}\\right)::van 't Hoff}}$$\\n- Endotérmica ($\\Delta H^\\circ > 0$): Aumentar $T$ {{c2::aumenta K (favorece productos)::efecto endotérmico}}.\\n- Exotérmica ($\\Delta H^\\circ < 0$): Aumentar $T$ {{c3::disminuye K (favorece reactivos)::efecto exotérmico}}."
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
                        "item_id": 1879938278955427097,
                        "type": "Flashcard",
                        "title": "Deducción de Kp con Grado de Disociación alpha",
                        "front": "Para $\\ce{A(g) <=> B(g) + C(g)}$ a presión $P_{\\text{tot}}$, deduzca $K_p$ en función de $\\alpha$ y $P_{\\text{tot}}$.",
                        "back": "1. Moles en equilibrio: $n_A = n_0(1-\\alpha)$, $n_B = n_C = n_0\\alpha$. Total: $n_{\\text{tot}} = n_0(1+\\alpha)$.<br>2. Fracciones molares: $X_A = \\frac{1-\\alpha}{1+\\alpha}$, $X_B = X_C = \\frac{\\alpha}{1+\\alpha}$.<br>3. Constante $K_p$:<br>$$K_p = \\frac{P_B P_C}{P_A} = \\frac{\\left(\\frac{\\alpha}{1+\\alpha} P_{\\text{tot}}\\right)^2}{\\frac{1-\\alpha}{1+\\alpha} P_{\\text{tot}}} = \\frac{\\alpha^2}{1-\\alpha^2} P_{\\text{tot}}$$"
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
                        "item_id": 1879938278956434504,
                        "type": "ClozeCard",
                        "title": "Constante Kw y Relación pH-pOH",
                        "text": "A $25^\\circ\\text{C}$:\\n- $K_w = [\\text{H}^+][\\text{OH}^-] = {{c1::1.0 \\times 10^{-14}::valor de Kw}}$\\n- $\\text{pH} + \\text{pOH} = {{c2::14.00::suma}}$\\n- Pares conjugados: $K_a \\cdot K_b = {{c3::K_w::producto Ka y Kb}}$ y $\\text{p}K_a + \\text{p}K_b = 14.00$."
                    },
                    {
                        "item_id": 1879938278957672176,
                        "type": "Flashcard",
                        "title": "Variación de Kw con la Temperatura",
                        "front": "La autoionización del agua es endotérmica ($\\Delta H^\\circ > 0$). A $50^\\circ\\text{C}$, $K_w = 5.5 \\times 10^{-14}$. Calcule el pH neutro.",
                        "back": "En agua pura neutra: $[\\text{H}^+] = [\\text{OH}^-] = \\sqrt{K_w} = \\sqrt{5.5 \\times 10^{-14}} \\approx 2.345 \\times 10^{-7}\\,\\text{M}$.<br>$$\\text{pH} = -\\log_{10}(2.345 \\times 10^{-7}) \\approx 6.63$$<br>El agua sigue siendo <b>estrictamente neutra</b> a pesar de tener $\\text{pH} = 6.63$, porque $[\\text{H}^+] = [\\text{OH}^-]$."
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
                        "item_id": 1879938278957968558,
                        "type": "Flashcard",
                        "title": "Cálculo de pH y Criterio de la Regla del 5%",
                        "front": "Para un ácido débil $HA$ ($C_0, K_a$), ¿cuándo vale $[\\text{H}^+] \\approx \\sqrt{K_a C_0}$?",
                        "back": "1. <b>Regla del 5%:</b> Válida si $\\alpha = x/C_0 < 0.05$, equivalente a:<br>$$\\frac{C_0}{K_a} > 400$$<br>En tal caso: $[\\text{H}^+] \\approx \\sqrt{K_a C_0} \\implies \\text{pH} = \\frac{1}{2}(\\text{p}K_a - \\log_{10} C_0)$.<br>2. <b>Si $\\frac{C_0}{K_a} \\le 400$:</b> Obligatorio resolver la cuadrática exacta: $x^2 + K_a x - K_a C_0 = 0$."
                    },
                    {
                        "item_id": 1879938278959772514,
                        "type": "ClozeCard",
                        "title": "Ácidos Polipróticos",
                        "text": "Para un ácido poliprótico como $\\ce{H3PO4}$ donde $K_{a1} \\gg K_{a2} \\gg K_{a3}$:\\n- El pH está gobernado casi exclusivamente por {{c1::la primera disociación Ka1::primera disociación}}.\\n- La concentración del anión divalente es $[\\ce{HPO4^{2-}}] \\approx {{c2::K_{a2}::Ka2}}$."
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
                        "item_id": 1879938278960420510,
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
                        "item_id": 1879938278961306295,
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
                        "item_id": 1879938278962584984,
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
                        "item_id": 1879938278963850412,
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
                        "item_id": 1879938278964985302,
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
                        "item_id": 1879938278965996832,
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
                        "item_id": 1879938278966753364,
                        "type": "ClozeCard",
                        "title": "Potencial de Celda, Nernst y Ley de Faraday",
                        "text": "Potencial estándar: $E^\\circ_{\\text{celda}} = E^\\circ_{\\text{cátodo}} - E^\\circ_{\\text{ánodo}}$, con $\\Delta G^\\circ = {{c1::-n F E^\\circ_{\\text{celda}}::relación fundamental}}$.\\nEcuación de Nernst a $25^\\circ\\text{C}$:\\n$$E_{\\text{celda}} = {{c2::E^\\circ_{\\text{celda}} - \\frac{0.0592}{n}\\log_{10} Q::ecuación de Nernst}}$$\\nMasa depositada por electrólisis: $m = {{c3::\\frac{M \\cdot I \\cdot t}{n F}::fórmula de Faraday}}$ ($F = 96485\\,\\text{C/mol}$).\\nEn equilibrio: $E_{\\text{celda}} = 0 \\implies E^\\circ_{\\text{celda}} = {{c4::\\frac{0.0592}{n}\\log_{10} K::cálculo de K}}$."
                    },
                    {
                        "item_id": 1879938278967947221,
                        "type": "Flashcard",
                        "title": "Celdas de Concentración y Puente Salino",
                        "front": "¿Cómo funciona una celda de concentración y cuál es la función del puente salino?",
                        "back": "1. <b>Celda de Concentración:</b> Electrodos idénticos sumergidos en soluciones del mismo catión pero a distinta concentración ($E^\\circ_{\\text{celda}} = 0$). Funciona espontáneamente por gradiente de entropía hacia la igualación de concentraciones:<br>$$E = -\\frac{0.0592}{n} \\log_{10}\\left(\\frac{[C]_{\\text{dil}}}{[C]_{\\text{conc}}}\\right) > 0$$<br>2. <b>Puente Salino ($\\ce{KCl}$ o $\\ce{KNO3}$):</b> Cierra el circuito eléctrico manteniendo la electroneutralidad: los aniones migran al ánodo y los cationes al cátodo, evitando la acumulación de cargas que detendría la corriente."
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
                        "item_id": 1879938278970358439,
                        "type": "ClozeCard",
                        "title": "El Modelo de Van Gennep en el Funeral Griego",
                        "text": "Según Arnold van Gennep, el funeral es un rito de paso tripartito:\\n1. Fase de {{c1::Separación::fase 1}} (aislamiento del cadáver impuro en el *oikos*).\\n2. Fase Liminar o de {{c2::Transición::fase 2}} (el cortejo de la *ékfora* en la frontera urbana).\\n3. Fase de {{c3::Reintegración / Agregación::fase 3}} (sepultura y banquete *perídeipnon*, reconstituyendo la comunidad viva)."
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
                        "item_id": 1879938278971184162,
                        "type": "ClozeCard",
                        "title": "La Psyche en el Hades como Eidolon",
                        "text": "En la épica homérica arcaica, la *psyche* subsiste en el Hades como:\\n$$\\text{Un } {{c1::*eidolon*::sombra homérica}}$$\\nUna sombra vaporosa desprovista de fuerza vital ({{c2::*menos*::fuerza vital}}) y de sangre, en un letargo desposeído."
                    },
                    {
                        "item_id": 1879938278972187377,
                        "type": "Flashcard",
                        "title": "La Sentencia Trágica de Aquiles en la Odisea",
                        "front": "¿Cuál es la afirmación de Aquiles en la Nekyia (Odisea XI) y su implicancia?",
                        "back": "Aquiles proclama:<br><i>«Preferiría ser siervo en la tierra de un campesino pobre y sin tierra antes que reinar sobre todos los muertos extintos.»</i><br><br>Demuestra el <b>despojo ontológico absoluto</b> de la muerte arcaica: no hay premios morales; el rito busca rescatar la memoria viva (*mneme*)."
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
                        "item_id": 1879938278974242191,
                        "type": "Flashcard",
                        "title": "El Reclamo del Fantasma de Patroclo",
                        "front": "¿Qué implora la sombra insepulta de Patroclo a Aquiles en Ilíada XXIII?",
                        "back": "<i>«¡Sepúltame cuanto antes para que pueda cruzar las puertas del Hades!»</i><br>Mientras el cuerpo carezca de sepultura, las sombras ya cruzadas le impiden vadear el río, dejándolo vagar errante en la frontera liminar."
                    },
                    {
                        "item_id": 1879938278975467144,
                        "type": "ClozeCard",
                        "title": "El Conflicto Sagrado en Antígona de Sófocles",
                        "text": "Antígona desafía al rey Creonte apelando a:\\n{{c1::Las leyes no escritas e inmutables de los dioses (*ágrapta nómina*)::ley divina}}\\nque ordenan honrar al cadáver de su hermano por encima de cualquier prohibición civil."
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
                        "item_id": 1879938278976395852,
                        "type": "ClozeCard",
                        "title": "Definición de Míasma y Ta Nomizómena",
                        "text": "- {{c1::*Míasma*::impureza}}: La contaminación religiosa corruptora que emana del cadáver en descomposición.\\n- {{c2::*Ta nomizómena*::deber consuetudinario}}: Las honras fúnebres sagradas debidas por piedad.\\n- El cántaro en la entrada para purificación con agua ajena es el {{c3::*ardánion*::ánfora purificadora}}."
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
                        "item_id": 1879938278976773702,
                        "type": "ClozeCard",
                        "title": "Disposición del Difunto sobre la Kline",
                        "text": "En la *próthesis*:\\n- El cadáver se lava, se unge con ungüentos y se viste de blanco sobre el lecho mortuorio llamado {{c1::*kline*::lecho fúnebre}}.\\n- Los pies se orientan apuntando hacia {{c2::la puerta exterior de la casa::orientación corporal}}."
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
                        "item_id": 1879938278978571881,
                        "type": "Flashcard",
                        "title": "Diferencia entre Góos y Thrēnos",
                        "front": "Distinga antropológicamente entre el *góos* y el *thrēnos*.",
                        "back": "1. <b>El *Góos* (Lamento Femenino):</b> Improvisado, desgarrador y antifonal de las parientes, con somatización extrema (rasgarse mejillas, mesarse cabellos, golpearse el pecho).<br>2. <b>El *Thrēnos* (Canto Poético Masculino):</b> Composición coral formal de poetas profesionales que exalta la virtud cívica (*areté*) y el linaje con distanciamiento solemne."
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
                        "item_id": 1879938278979239247,
                        "type": "ClozeCard",
                        "title": "Temporalidad Sagrada de la Ékfora",
                        "text": "El traslado procesional del cuerpo a la necrópolis (el Cerámico) se llama {{c1::*ékfora*::segunda fase}}.\\nDebía realizarse forzosamente {{c2::antes de la salida del sol (de madrugada)::momento temporal}} para impedir que los rayos sagrados de Helios fueran mancillados por el *míasma*."
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
                        "item_id": 1879938278979853646,
                        "type": "Flashcard",
                        "title": "La Ékfora como Detonante de Guerra Civil Facciosa",
                        "front": "¿Por qué los cortejos fúnebres aristocráticos amenazaban el orden cívico?",
                        "back": "Las familias nobles (*eupátridas*) convertían la *ékfora* en propaganda dinástica, desfilando con carros de lujo y plañideras contratadas, usando el llanto para instigar venganzas de sangre (*vendettas* clánicas) entre familias rivales, amenazando la paz de la *polis*."
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
                        "item_id": 1879938278981718838,
                        "type": "ClozeCard",
                        "title": "Inhumación Predominante en el Ática",
                        "text": "En la Atenas arcaica y clásica la práctica funeraria abrumadoramente dominante fue la {{c1::inhumación en tierra o sarcófago::práctica dominante}}, explicada arqueológicamente por {{c2::la grave escasez de madera para piras en el Ática::motivo ecológico-económico}}."
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
                        "item_id": 1879938278982212696,
                        "type": "ClozeCard",
                        "title": "Libaciones y Banquete de Reintegración",
                        "text": "- Libaciones sobre la tumba (vino puro, leche, miel y aceite): {{c1::*choai*::ofrendas líquidas}}.\\n- Banquete formal en el hogar purificado: {{c2::*perídeipnon*::banquete fúnebre}}, donde el difunto es el {{c3::anfitrión de honor::papel simbólico}}."
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
                        "item_id": 1879938278983520011,
                        "type": "Flashcard",
                        "title": "Economía Ritual de la Cámara Ciega en Lekythoi",
                        "front": "¿Qué reveló el hallazgo arqueológico de la cámara ciega en los lekythoi de fondo blanco?",
                        "back": "Muchos lekythoi contenían una pequeña cápsula sellada en el cuello que retenía apenas unas gotas de perfume costoso, manteniendo el resto del vaso vacío.<br>Demuestra el pragmatismo ático: cumplir el decoro sagrado exterior sin incurrir en un gasto económico ruinoso."
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
                        "item_id": 1879938278984339347,
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
                        "item_id": 1879938278985868794,
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
                        "item_id": 1879938278986616608,
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
                        "item_id": 1879938278987518196,
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
                        "item_id": 1879938278988456148,
                        "type": "ClozeCard",
                        "title": "El Motivo Iconográfico de la Dexiosis",
                        "text": "En las estelas fúnebres de mármol del Cerámico, el apretón solemne de manos entre el difunto y el deudo se llama {{c1::*dexiosis*::apretón de manos}}.\\nEncarna el *ethos* sereno y la {{c2::*kalokagathía*::virtud y belleza clásica}}, preservando la memoria imperecedera (*mneme*)."
                    },
                    {
                        "item_id": 1879938278989509609,
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
                        "item_id": 1879938278991225543,
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
                        "item_id": 1879938278992455717,
                        "type": "ClozeCard",
                        "title": "Estructura Cronométrica de 4 Expositores",
                        "text": "Distribución estricta de la ponencia (10:00 exactos, 2:30 por expositor):\\n- Turno I (0:00 - 2:30): {{c1::Expositor 1::turno 1}} (Finitud homérica, Odisea, míasma vs ta nomizómena).\\n- Turno II (2:30 - 5:00): {{c2::Expositor 2::turno 2}} (Próthesis, ékfora, sepultura, choai y perídeipnon).\\n- Turno III (5:00 - 7:30): {{c3::Expositor 3::turno 3}} (Lekythos, cámara ciega, leyes de Solón y dexiosis).\\n- Turno IV (7:30 - 10:00): {{c4::Expositor 4::turno 4}} (Desamparo contemporáneo, Tres Tesis y plenario)."
                    },
                    {
                        "item_id": 1879938278994236022,
                        "type": "Flashcard",
                        "title": "Las Tres Tesis Vertebrales Finales",
                        "front": "Enuncie las tres tesis académicas conclusivas de la ponencia.",
                        "back": "1. <b>Tesis 1:</b> El rito no es salvación individual ultraterrena, sino una tecnología psicosocial indispensable para recomponer y proteger a la comunidad de los vivos.<br>2. <b>Tesis 2:</b> Las reformas de Solón (594 a.C.) marcan el nacimiento de la política cívica al someter el dolor tribal al imperio de la ley común.<br>3. <b>Tesis 3:</b> Frente al aislamiento higienizado moderno, la experiencia helénica demuestra que el duelo requiere ser visibilizado, corporeizado y ritualizado colectivamente."
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
