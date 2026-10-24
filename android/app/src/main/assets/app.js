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
                "title": "Dieléctricos y Polarización",
                "x": 100.0,
                "y": 100.0,
                "tags": [
                    "EM",
                    "Dieléctricos",
                    "Polarización"
                ],
                "note_type": "standard",
                "desired_retention": 0.88,
                "cards": [
                    {
                        "item_id": 1879936200183680512,
                        "type": "ClozeCard",
                        "title": "Vector de Polarización y Cargas Ligadas",
                        "text": "El vector polarización $\\mathbf{P}$ representa el momento dipolar por unidad de volumen. Las densidades de carga ligada se definen como:\n- Densidad volumétrica ligada: $\\rho_b = {{c1::-\\nabla \\cdot \\mathbf{P}::divergencia de P}}$\n- Densidad superficial ligada: $\\sigma_b = {{c2::\\mathbf{P} \\cdot \\hat{n}::producto escalar con la normal exterior}}$"
                    },
                    {
                        "item_id": 1879936200185082341,
                        "type": "Flashcard",
                        "title": "Neutro Global: Carga Ligada Total Nula",
                        "front": "Demuestre rigurosamente que la carga ligada neta de cualquier dieléctrico neutro de volumen $V$ y superficie cerrada $S = \\partial V$ es idénticamente cero.",
                        "back": "Por definición, la carga ligada total es la suma de las contribuciones volumétrica y superficial:<br>$$Q_{b,\\text{tot}} = \\iiint_V \\rho_b \\, dV + \\iint_S \\sigma_b \\, dA = -\\iiint_V (\\nabla \\cdot \\mathbf{P}) \\, dV + \\iint_S (\\mathbf{P} \\cdot \\hat{n}) \\, dA$$<br>Aplicando el <b>Teorema de la Divergencia de Gauss</b> al primer término:<br>$$\\iiint_V (\\nabla \\cdot \\mathbf{P}) \\, dV = \\iint_S (\\mathbf{P} \\cdot \\hat{n}) \\, dA$$<br>Restando ambos términos se obtiene exactamente:<br>$$Q_{b,\\text{tot}} = -\\iint_S (\\mathbf{P} \\cdot \\hat{n}) \\, dA + \\iint_S (\\mathbf{P} \\cdot \\hat{n}) \\, dA = 0 \\quad \\blacksquare$$"
                    },
                    {
                        "item_id": 1879936200185802094,
                        "type": "Flashcard",
                        "title": "Dieléctrico LHI y Constante Dieléctrica",
                        "front": "¿Cómo se define un medio Lineal, Homogéneo e Isótropo (LHI) y cuáles son las relaciones entre $\\mathbf{P}$, $\\mathbf{E}$, $\\chi_e$ y $\\kappa$?",
                        "back": "En un dieléctrico LHI:<br>1. <b>Lineal e Isótropo:</b> $\\mathbf{P} = \\varepsilon_0 \\chi_e \\mathbf{E}$, donde $\\chi_e$ es la susceptibilidad eléctrica escalar.<br>2. <b>Homogéneo:</b> $\\chi_e$ es constante e independiente de la posición.<br>3. <b>Permitividad eléctrica del medio:</b> $\\varepsilon = \\varepsilon_0 (1 + \\chi_e) = \\varepsilon_0 \\kappa$, donde $\\kappa = 1 + \\chi_e$ es la constante dieléctrica relativa (adimensional, $\\kappa \\ge 1$).<br>4. El campo eléctrico efectivo total en el interior del dieléctrico se reduce en un factor $\\kappa$: $\\mathbf{E} = \\mathbf{E}_0 / \\kappa$."
                    },
                    {
                        "item_id": 1879936200186779739,
                        "type": "ProofSequenceCard",
                        "title": "Derivación del Potencial Electrostático de un Dieléctrico",
                        "premise": "Demostrar que el potencial electrostático generado en todo punto $\\mathbf{r}$ por un volumen polarizado $\\mathbf{P}(\\mathbf{r}')$ equivale a la superposición de densidades $\\rho_b$ y $\\sigma_b$.",
                        "steps": [
                            "El potencial dipolar elemental es $dV = \\frac{1}{4\\pi\\varepsilon_0} \\frac{d\\mathbf{p} \\cdot \\hat{\\mathcal{R}}}{\\mathcal{R}^2} = \\frac{1}{4\\pi\\varepsilon_0} \\frac{\\mathbf{P}(\\mathbf{r}') \\cdot (\\mathbf{r} - \\mathbf{r}')}{|\\mathbf{r} - \\mathbf{r}'|^3} dV'$.",
                            "Usar la identidad vectorial respecto a las coordenadas primadas: $\\nabla'\\left(\\frac{1}{|\\mathbf{r}-\\mathbf{r}'|}\\right) = \\frac{\\mathbf{r}-\\mathbf{r}'}{|\\mathbf{r}-\\mathbf{r}'|^3}$.",
                            "Aplicar la regla del producto para divergencias: $\\mathbf{P} \\cdot \\nabla'\\left(\\frac{1}{\\mathcal{R}}\\right) = \\nabla' \\cdot \\left(\\frac{\\mathbf{P}}{\\mathcal{R}}\\right) - \\frac{\\nabla' \\cdot \\mathbf{P}}{\\mathcal{R}}$.",
                            "Integrar sobre el volumen $V'$ y usar el Teorema de Gauss en el primer término: $\\int_V \\nabla' \\cdot \\left(\\frac{\\mathbf{P}}{\\mathcal{R}}\\right) dV' = \\oint_S \\frac{\\mathbf{P} \\cdot \\hat{n}'}{\\mathcal{R}} dA'$.",
                            "Identificar $\\sigma_b = \\mathbf{P} \\cdot \\hat{n}'$ y $\\rho_b = -\\nabla' \\cdot \\mathbf{P}$, concluyendo: $V(\\mathbf{r}) = \\frac{1}{4\\pi\\varepsilon_0} \\oint_S \\frac{\\sigma_b}{\\mathcal{R}} dA' + \\frac{1}{4\\pi\\varepsilon_0} \\int_V \\frac{\\rho_b}{\\mathcal{R}} dV'$."
                        ]
                    }
                ]
            },
            {
                "note_id": "em_02",
                "title": "Desplazamiento Eléctrico D y Ley de Gauss",
                "x": 440.0,
                "y": 100.0,
                "tags": [
                    "EM",
                    "Gauss",
                    "Desplazamiento"
                ],
                "note_type": "standard",
                "desired_retention": 0.88,
                "cards": [
                    {
                        "item_id": 1879936200187811531,
                        "type": "ClozeCard",
                        "title": "Ley de Gauss Generalizada",
                        "text": "La Ley de Gauss en medios dieléctricos en términos de cargas libres es:\n- Forma diferencial: $\\nabla \\cdot \\mathbf{D} = {{c1::\\rho_f::densidad de carga libre}}$\n- Forma integral: $\\oint_{\\partial V} \\mathbf{D} \\cdot d\\mathbf{A} = {{c2::Q_{f,\\text{enc}}::carga libre encerrada}}$\nEl vector desplazamiento se define como $\\mathbf{D} = {{c3::\\varepsilon_0 \\mathbf{E} + \\mathbf{P}::relación D, E, P}}$."
                    },
                    {
                        "item_id": 1879936200189232628,
                        "type": "ClozeCard",
                        "title": "Condiciones de Borde en Interfaces Dieléctricas",
                        "text": "En la interfaz entre dos dieléctricos 1 y 2:\n1. Continuidad tangencial del campo eléctrico: ${{c1::E_{1t} - E_{2t} = 0::componente tangencial continua}}$ (debido a $\\nabla \\times \\mathbf{E} = \\mathbf{0}$).\n2. Salto de la componente normal de $\\mathbf{D}$: ${{c2::D_{1n} - D_{2n} = \\sigma_f::salto normal dado por sigma_f}}$ donde $\\sigma_f$ es la densidad de carga libre superficial en el borde."
                    },
                    {
                        "item_id": 1879936200190290511,
                        "type": "Flashcard",
                        "title": "Esfera Dieléctrica en Campo Uniforme Exterior",
                        "front": "Una esfera dieléctrica LHI de radio $R$ y permitividad $\\varepsilon$ se sumerge en un campo uniforme externo $\\mathbf{E}_0$. ¿Cuál es el campo eléctrico $\\mathbf{E}_{\\text{int}}$ y la polarización $\\mathbf{P}$ en su interior?",
                        "back": "Por solución de la ecuación de Laplace con armónicos esféricos:<br>1. El campo eléctrico interior es <b>rigurosamente uniforme</b>:<br>$$\\mathbf{E}_{\\text{int}} = \\frac{3}{\\kappa + 2} \\mathbf{E}_0 = \\frac{3\\varepsilon_0}{\\varepsilon + 2\\varepsilon_0} \\mathbf{E}_0$$<br>2. La polarización interior es también constante:<br>$$\\mathbf{P} = 3\\varepsilon_0 \\left(\\frac{\\kappa - 1}{\\kappa + 2}\\right) \\mathbf{E}_0$$<br>Nota: Al ser $\\mathbf{P}$ uniforme en el interior, $\\rho_b = -\\nabla \\cdot \\mathbf{P} = 0$, existiendo únicamente carga ligada superficial $\\sigma_b = \\mathbf{P} \\cdot \\hat{r} = P \\cos\\theta$."
                    }
                ]
            },
            {
                "note_id": "em_03",
                "title": "Capacitancia y Energía en Dieléctricos",
                "x": 780.0,
                "y": 100.0,
                "tags": [
                    "EM",
                    "Capacitancia",
                    "Energía",
                    "Fuerza"
                ],
                "note_type": "standard",
                "desired_retention": 0.88,
                "cards": [
                    {
                        "item_id": 1879936200191269931,
                        "type": "ClozeCard",
                        "title": "Densidad de Energía Electrostática",
                        "text": "En un medio dieléctrico lineal, la densidad volumétrica de energía electrostática $u_E$ es:\n$$u_E = {{c1::\\frac{1}{2} \\mathbf{D} \\cdot \\mathbf{E} = \\frac{1}{2} \\varepsilon E^2::densidad de energía}}$$\nY la energía total almacenada en el volumen es $U = \\iiint_V u_E \\, dV$."
                    },
                    {
                        "item_id": 1879936200192506001,
                        "type": "ProofSequenceCard",
                        "title": "Fuerza sobre un Dieléctrico a Voltaje Constante",
                        "premise": "Calcular la fuerza horizontal ejercida sobre una lámina dieléctrica de ancho $w$ y espesor $d$ que se introduce una distancia $x$ entre las placas de un capacitor conectado a una batería de voltaje fijo $V$.",
                        "steps": [
                            "La capacitancia equivalente es la suma en paralelo de la región con aire $(L-x)$ y con dieléctrico $x$: $C(x) = \\frac{\\varepsilon_0 w(L-x)}{d} + \\frac{\\varepsilon w x}{d} = \\frac{w}{d}[\\varepsilon_0 L + (\\varepsilon - \\varepsilon_0)x]$.",
                            "La energía electrostática almacenada en el capacitor es $U(x) = \\frac{1}{2} C(x) V^2$.",
                            "A potencial constante, la batería aporta un trabajo $dW_{\\text{fuente}} = V dq = V^2 dC$, lo que hace que $F_x = +\\left(\\frac{\\partial U}{\\partial x}\\right)_V = +\\frac{1}{2} V^2 \\frac{dC}{dx}$.",
                            "Derivando respecto a $x$: $\\frac{dC}{dx} = \\frac{w(\\varepsilon - \\varepsilon_0)}{d} = \\frac{\\varepsilon_0 w (\\kappa - 1)}{d}$.",
                            "Resultado: $F_x = \\frac{\\varepsilon_0 w (\\kappa - 1) V^2}{2d} > 0$. La placa experimenta siempre una fuerza que tiende a introducirla hacia el interior del capacitor."
                        ]
                    },
                    {
                        "item_id": 1879936200193564243,
                        "type": "Flashcard",
                        "title": "Capacitor con Dieléctricos en Capas (Serie vs Paralelo)",
                        "front": "¿Cómo se combinan las capas dieléctricas si son (a) perpendiculares al campo eléctrico, o (b) paralelas al campo eléctrico?",
                        "back": "(a) <b>Perpendiculares a $\\mathbf{E}$ (capas apiladas en espesor):</b> Se modelan como capacitores en <b>serie</b>:<br>$$\\frac{1}{C_{\\text{eq}}} = \\sum_{i} \\frac{1}{C_i} = \\sum_{i} \\frac{d_i}{\\varepsilon_i A}$$<br>(b) <b>Paralelas a $\\mathbf{E}$ (capas yuxtapuestas en área):</b> Se modelan como capacitores en <b>paralelo</b>:<br>$$C_{\\text{eq}} = \\sum_{i} C_i = \\sum_{i} \\frac{\\varepsilon_i A_i}{d}$$"
                    }
                ]
            },
            {
                "note_id": "em_04",
                "title": "Corriente, Ohm Puntual y Teorema Dual RC",
                "x": 100.0,
                "y": 360.0,
                "tags": [
                    "EM",
                    "Corriente",
                    "Drude",
                    "Ohm",
                    "Teorema Dual"
                ],
                "note_type": "standard",
                "desired_retention": 0.88,
                "cards": [
                    {
                        "item_id": 1879936200193734968,
                        "type": "ClozeCard",
                        "title": "Ley de Ohm Puntual y Densidad de Corriente",
                        "text": "La corriente eléctrica total a través de una superficie $S$ es $I = \\iint_S \\mathbf{J} \\cdot d\\mathbf{A}$.\nLa densidad de corriente es $\\mathbf{J} = {{c1::n q \\mathbf{v}_d::densidad microscópica}}$.\nLa Ley de Ohm puntual es:\n$$\\mathbf{J} = {{c2::\\sigma \\mathbf{E}::conductividad por campo}} = \\frac{1}{\\rho_e}\\mathbf{E}$$"
                    },
                    {
                        "item_id": 1879936200195023975,
                        "type": "Flashcard",
                        "title": "Modelo de Drude para la Conductividad Eléctrica",
                        "front": "Deduzca a partir de la dinámica de colisiones del modelo de Drude la expresión para la conductividad eléctrica $\\sigma$ en función de $n, q, \\tau, m$.",
                        "back": "Bajo un campo eléctrico $\\mathbf{E}$, cada portador de carga experimenta una fuerza $\\mathbf{F} = q\\mathbf{E}$ y sufre colisiones aleatorias caracterizadas por un tiempo medio libre $\\tau$.<br>1. La velocidad de deriva adquirida entre choques es:<br>$$\\mathbf{v}_d = \\frac{q \\mathbf{E}}{m} \\tau$$<br>2. La densidad de corriente eléctrica generada por $n$ portadores por unidad de volumen es:<br>$$\\mathbf{J} = n q \\mathbf{v}_d = n q \\left(\\frac{q \\mathbf{E} \\tau}{m}\\right) = \\left(\\frac{n q^2 \\tau}{m}\\right) \\mathbf{E}$$<br>3. Comparando con la ley de Ohm puntual $\\mathbf{J} = \\sigma \\mathbf{E}$, se deduce rigurosamente:<br>$$\\sigma = \\frac{n q^2 \\tau}{m} \\quad \\blacksquare$$"
                    },
                    {
                        "item_id": 1879936200197363882,
                        "type": "Flashcard",
                        "title": "Teorema Dual Resistencia-Capacitancia (RC = epsilon / sigma)",
                        "front": "Enuncie y demuestre el Teorema Dual entre Resistencia y Capacitancia para dos conductores de geometría arbitraria sumergidos en un medio conductor dieléctrico homogéneo.",
                        "back": "<b>Enunciado:</b> Para cualquier geometría de conductores inmersos en un medio con conductividad $\\sigma$ y permitividad $\\varepsilon$, el producto de la resistencia $R$ entre ellos y la capacitancia $C$ con el mismo dieléctrico es constante:<br>$$R \\cdot C = \\frac{\\varepsilon}{\\sigma} = \\rho_e \\varepsilon$$<br><b>Demostración:</b><br>1. $C = \\frac{Q_f}{V} = \\frac{\\oint_S \\mathbf{D} \\cdot d\\mathbf{A}}{\\int_1^2 \\mathbf{E} \\cdot d\\boldsymbol{\\ell}} = \\frac{\\varepsilon \\oint_S \\mathbf{E} \\cdot d\\mathbf{A}}{\\int_1^2 \\mathbf{E} \\cdot d\\boldsymbol{\\ell}}$.<br>2. $R = \\frac{V}{I} = \\frac{\\int_1^2 \\mathbf{E} \\cdot d\\boldsymbol{\\ell}}{\\iint_S \\mathbf{J} \\cdot d\\mathbf{A}} = \\frac{\\int_1^2 \\mathbf{E} \\cdot d\\boldsymbol{\\ell}}{\\sigma \\iint_S \\mathbf{E} \\cdot d\\mathbf{A}}$.<br>3. Multiplicando ambas expresiones, las integrales de $\\mathbf{E}$ se cancelan idénticamente:<br>$$R \\cdot C = \\left(\\frac{\\int \\mathbf{E} \\cdot d\\boldsymbol{\\ell}}{\\sigma \\oint \\mathbf{E} \\cdot d\\mathbf{A}}\\right) \\cdot \\left(\\frac{\\varepsilon \\oint \\mathbf{E} \\cdot d\\mathbf{A}}{\\int \\mathbf{E} \\cdot d\\boldsymbol{\\ell}}\\right) = \\frac{\\varepsilon}{\\sigma} \\quad \\blacksquare$$"
                    }
                ]
            },
            {
                "note_id": "em_05",
                "title": "Circuitos DC y Transitorios RC",
                "x": 440.0,
                "y": 360.0,
                "tags": [
                    "EM",
                    "Circuitos",
                    "Thévenin",
                    "RC",
                    "Transitorio"
                ],
                "note_type": "standard",
                "desired_retention": 0.88,
                "cards": [
                    {
                        "item_id": 1879936200198563871,
                        "type": "ClozeCard",
                        "title": "Carga de un Capacitor RC y Constante de Tiempo",
                        "text": "En un circuito serie $RC$ con fuente DC de fem $\\mathcal{E}$ inicialmente descargado:\n- Carga temporal: $q(t) = {{c1::C\\mathcal{E}(1 - e^{-t/RC})::evolución de la carga}}$\n- Corriente temporal: $i(t) = {{c2::\\frac{\\mathcal{E}}{R} e^{-t/RC}::evolución de la corriente}}$\n- Constante de tiempo del circuito: $\\tau = {{c3::RC::constante de tiempo}}$."
                    },
                    {
                        "item_id": 1879936200199849289,
                        "type": "ProofSequenceCard",
                        "title": "Balance de Energía en Carga RC: El Factor del 50%",
                        "premise": "Demostrar que durante la carga completa de un capacitor desde $q=0$ hasta $q=C\\mathcal{E}$, exactamente el 50% de la energía suministrada por la fuente se disipa en forma de calor en la resistencia, independientemente del valor de $R$.",
                        "steps": [
                            "La energía total suministrada por la fuente ideal es $W_{\\text{fuente}} = \\int_0^\\infty \\mathcal{E} \\, i(t) \\, dt = \\mathcal{E} \\int_0^\\infty i(t) \\, dt = \\mathcal{E} Q_{\\text{final}} = C \\mathcal{E}^2$.",
                            "La energía electrostática final almacenada en el campo del capacitor es $U_C = \\frac{1}{2} \\frac{Q^2}{C} = \\frac{1}{2} C \\mathcal{E}^2$.",
                            "La energía térmica disipada por efecto Joule en la resistencia es $E_R = \\int_0^\\infty i(t)^2 R \\, dt = R \\int_0^\\infty \\left(\\frac{\\mathcal{E}}{R} e^{-t/RC}\\right)^2 dt = \\frac{\\mathcal{E}^2}{R} \\int_0^\\infty e^{-2t/RC} dt$.",
                            "Evaluando la integral exponencial: $\\int_0^\\infty e^{-2t/RC} dt = \\left[-\\frac{RC}{2} e^{-2t/RC}\\right]_0^\\infty = \\frac{RC}{2}$.",
                            "Por lo tanto, $E_R = \\frac{\\mathcal{E}^2}{R} \\left(\\frac{RC}{2}\\right) = \\frac{1}{2} C \\mathcal{E}^2$. Se comprueba rigurosamente que $W_{\\text{fuente}} = U_C + E_R$ y $E_R = \\frac{1}{2} W_{\\text{fuente}}$."
                        ]
                    },
                    {
                        "item_id": 1879936200200195702,
                        "type": "Flashcard",
                        "title": "Teorema de Máxima Transferencia de Potencia",
                        "front": "¿Bajo qué condición una resistencia de carga $R_L$ conectada a una red lineal de Thévenin $(V_{th}, R_{th})$ disipa la máxima potencia posible, y cuánto vale dicha potencia máxima?",
                        "back": "<b>Condición:</b> $R_L = R_{th}$ (la resistencia de carga debe ser igual a la resistencia interna de Thévenin).<br><b>Potencia Máxima:</b><br>$$P_{\\max} = \\frac{V_{th}^2}{4 R_{th}}$$<br>Demostración rápida: $P(R_L) = I^2 R_L = \\frac{V_{th}^2 R_L}{(R_{th} + R_L)^2}$. Derivando respecto a $R_L$ e igualando a cero: $(R_{th}+R_L)^2 - 2R_L(R_{th}+R_L) = 0 \\implies R_{th} - R_L = 0$."
                    }
                ]
            },
            {
                "note_id": "em_06",
                "title": "Fuerza de Lorentz y Efecto Hall",
                "x": 780.0,
                "y": 360.0,
                "tags": [
                    "EM",
                    "Lorentz",
                    "Ciclotrón",
                    "Hall"
                ],
                "note_type": "standard",
                "desired_retention": 0.88,
                "cards": [
                    {
                        "item_id": 1879936200201159598,
                        "type": "ClozeCard",
                        "title": "Fuerza de Lorentz y Trabajo Magnético Nulo",
                        "text": "La fuerza electromagnética sobre una carga puntual $q$ con velocidad $\\mathbf{v}$ es $\\mathbf{F} = {{c1::q(\\mathbf{E} + \\mathbf{v} \\times \\mathbf{B})::fuerza de Lorentz}}一路.\nLa potencia ejercida por el campo magnético es $P_B = \\mathbf{F}_B \\cdot \\mathbf{v} = {{c2::0::trabajo nulo}}$, por lo que el campo magnético {{c3::nunca altera la energía cinética ni la rapidez::efecto sobre la rapidez}} de una partícula cargada."
                    },
                    {
                        "item_id": 1879936200202421400,
                        "type": "ClozeCard",
                        "title": "Radio de Giro Ciclotrón y Frecuencia de Larmor",
                        "text": "En un campo magnético uniforme $\\mathbf{B}$ ortogonal a la velocidad $\\mathbf{v}_\\perp$:\n- Radio ciclotrónico: $r_c = {{c1::\\frac{m v_\\perp}{|q| B}::radio de Larmor}}$\n- Frecuencia angular ciclotrón: $\\omega_c = {{c2::\\frac{|q| B}{m}::frecuencia angular}}$\n- Período de revolución: $T = {{c3::\\frac{2\\pi m}{|q| B}::período de giro}}$ (independiente de la velocidad $v$)."
                    },
                    {
                        "item_id": 1879936200203147910,
                        "type": "Flashcard",
                        "title": "Voltaje de Hall y Coeficiente de Hall",
                        "front": "Explique el origen físico del Efecto Hall en una cinta conductora y deduzca el voltaje transversal de Hall $\\Delta V_H$.",
                        "back": "1. <b>Origen físico:</b> Portadores con carga $q$ que circulan con velocidad de deriva $v_d$ bajo un campo magnético transversal $\\mathbf{B}$ experimentan una deflexión lateral por la fuerza magnética $\\mathbf{F}_B = q(\\mathbf{v}_d \\times \\mathbf{B})$.<br>2. Se acumula carga en las caras laterales hasta que el campo eléctrico transversal de Hall resultante $\\mathbf{E}_H$ equilibra la fuerza magnética:<br>$$q E_H = q v_d B \\implies E_H = v_d B$$<br>3. Como la corriente es $I = n q v_d w t$ (donde $w$ es el ancho y $t$ el espesor en la dirección de $\\mathbf{B}$):<br>$$v_d = \\frac{I}{n q w t}$$<br>4. El voltaje transversal de Hall medido entre las caras de ancho $w$ es:<br>$$\\Delta V_H = E_H w = v_d B w = \\frac{I B}{n q t} = R_H \\frac{I B}{t}$$<br>donde $R_H = \\frac{1}{nq}$ es el <b>coeficiente de Hall</b>, cuyo signo revela directamente si los portadores mayoritarios son electrones ($q<0$) o huecos ($q>0$)."
                    }
                ]
            },
            {
                "note_id": "em_07",
                "title": "Fuerzas y Torques sobre Espiras",
                "x": 100.0,
                "y": 620.0,
                "tags": [
                    "EM",
                    "Torque",
                    "Dipolo",
                    "Espira"
                ],
                "note_type": "standard",
                "desired_retention": 0.88,
                "cards": [
                    {
                        "item_id": 1879936200204697211,
                        "type": "ClozeCard",
                        "title": "Fuerza de Laplace sobre Elemento de Corriente",
                        "text": "La fuerza sobre un elemento de línea de corriente $d\\boldsymbol{\\ell}$ en presencia de campo magnético $\\mathbf{B}$ es:\n$$d\\mathbf{F} = {{c1::I \\, d\\boldsymbol{\\ell} \\times \\mathbf{B}::fuerza diferencial de Laplace}}$$\nPara un circuito cerrado completo en un campo uniforme $\\mathbf{B}$, la fuerza neta es ${{c2::\\mathbf{0} (cero)::fuerza neta}}."
                    },
                    {
                        "item_id": 1879936200205353395,
                        "type": "ClozeCard",
                        "title": "Momento Dipolar, Torque y Energía Potencial",
                        "text": "Para una espira plana de área vectorial $\\mathbf{A} = A \\hat{n}$ que transporta corriente $I$:\n- Momento dipolar magnético: $\\boldsymbol{\\mu} = {{c1::I \\mathbf{A} = I A \\hat{n}::definición de dipolo}}$\n- Torque magnético en campo uniforme: $\\boldsymbol{\\tau} = {{c2::\\boldsymbol{\\mu} \\times \\mathbf{B}::torque vectorial}}$\n- Energía potencial dipolar: $U = {{c3::-\\boldsymbol{\\mu} \\cdot \\mathbf{B}::energía potencial}}$."
                    },
                    {
                        "item_id": 1879936200207216659,
                        "type": "Flashcard",
                        "title": "Fuerza Neta sobre Dipolo en Campo No Uniforme",
                        "front": "¿Cuál es la fuerza neta $\\mathbf{F}$ experimentada por un dipolo magnético $\\boldsymbol{\\mu}$ inmerso en un campo magnético espacialmente inhomogéneo $\\mathbf{B}(\\mathbf{r})$?",
                        "back": "A partir del gradiente de la energía potencial $U = -\\boldsymbol{\\mu} \\cdot \\mathbf{B}$:<br>$$\\mathbf{F} = -\\nabla U = \\nabla (\\boldsymbol{\\mu} \\cdot \\mathbf{B})$$<br>Si $\\boldsymbol{\\mu}$ es constante y usando $\\nabla \\times \\mathbf{B} = \\mathbf{0}$ en la región sin corrientes libres, se reduce a:<br>$$\\mathbf{F} = (\\boldsymbol{\\mu} \\cdot \\nabla) \\mathbf{B}$$<br>Conclusión: Los dipolos magnéticos son atraídos hacia regiones de campo más intenso si están alineados paralelamente ($\\boldsymbol{\\mu} \\parallel \\mathbf{B}$), y repelidos si son antiparalelos."
                    }
                ]
            },
            {
                "note_id": "em_08",
                "title": "Ley de Biot-Savart y Aplicaciones",
                "x": 440.0,
                "y": 620.0,
                "tags": [
                    "EM",
                    "Biot-Savart",
                    "Espira",
                    "Helmholtz"
                ],
                "note_type": "standard",
                "desired_retention": 0.88,
                "cards": [
                    {
                        "item_id": 1879936200207545727,
                        "type": "ClozeCard",
                        "title": "Ley Fundamental de Biot-Savart",
                        "text": "El campo magnético elemental generado por una corriente $I$ a distancia $\\mathbf{r}$ es:\n$$d\\mathbf{B} = {{c1::\\frac{\\mu_0 I}{4\\pi} \\frac{d\\boldsymbol{\\ell} \\times \\hat{r}}{r^2} = \\frac{\\mu_0 I}{4\\pi} \\frac{d\\boldsymbol{\\ell} \\times \\mathbf{r}}{r^3}::fórmula diferencial de Biot-Savart}}$$\ndonde $\\mu_0 = 4\\pi \\times 10^{-7} \\, \\text{T}\\cdot\\text{m/A}$."
                    },
                    {
                        "item_id": 1879936200209099581,
                        "type": "ProofSequenceCard",
                        "title": "Campo en el Eje de una Espira Circular",
                        "premise": "Calcular el campo magnético $B_z(z)$ en un punto sobre el eje de simetría a distancia $z$ del plano de una espira circular de radio $R$ con corriente $I$.",
                        "steps": [
                            "Cada elemento de corriente $I d\\boldsymbol{\\ell}$ está a una distancia $r = \\sqrt{R^2 + z^2}$ del punto de observación en el eje.",
                            "Como $d\\boldsymbol{\\ell}$ es perpendicular al vector posición relativo, el módulo elemental es $dB = \\frac{\\mu_0 I d\\ell}{4\\pi (R^2+z^2)}$.",
                            "Por simetría azimutal circular, las componentes radiales perpendiculares al eje se cancelan por pares opuestos diametrales ($\\oint dB_\\perp = 0$).",
                            "La proyección a lo largo del eje $z$ es $dB_z = dB \\cos\\theta = dB \\frac{R}{\\sqrt{R^2+z^2}} = \\frac{\\mu_0 I R}{4\\pi (R^2+z^2)^{3/2}} d\\ell$.",
                            "Integrando sobre la longitud total de la espira $\\oint d\\ell = 2\\pi R$: $B_z = \\frac{\\mu_0 I R^2}{2(R^2+z^2)^{3/2}}$. En el centro ($z=0$): $B_z = \\frac{\\mu_0 I}{2R}$."
                        ]
                    },
                    {
                        "item_id": 1879936200209862589,
                        "type": "Flashcard",
                        "title": "Bobinas de Helmholtz: Campo Óptimamente Homogéneo",
                        "front": "¿Qué configuración tienen las Bobinas de Helmholtz y por qué la separación $d = R$ logra un campo magnético de extrema uniformidad?",
                        "back": "<b>Configuración:</b> Dos espiras idénticas de radio $R$ y corriente $I$ dispuestas coaxialmente y separadas por una distancia exacta $d = R$.<br><b>Propiedad Matemática:</b> En el punto medio equidistante $z = 0$ entre ambas bobinas:<br>1. Por simetría par, la primera derivada es nula: $\\frac{dB}{dz} = 0$.<br>2. La segunda derivada es $\\frac{d^2 B}{dz^2} \\propto (4d^2 - R^2 - 3z^2)$. Al fijar la separación $d = R$, se anula idénticamente la segunda derivada: $\\frac{d^2 B}{dz^2}\\Big|_{z=0} = 0$.<br>3. El desarrollo de Taylor carece de términos de orden 1, 2 y 3, por lo que el campo es uniforme hasta fluctuaciones de orden 4 ($O(z^4)$), proporcionando la máxima homogeneidad experimental."
                    }
                ]
            },
            {
                "note_id": "em_09",
                "title": "Ley de Ampère y Simetrías",
                "x": 780.0,
                "y": 620.0,
                "tags": [
                    "EM",
                    "Ampère",
                    "Solenoide",
                    "Toroide"
                ],
                "note_type": "standard",
                "desired_retention": 0.88,
                "cards": [
                    {
                        "item_id": 1879936200211255637,
                        "type": "ClozeCard",
                        "title": "Ley de Ampère en Formas Integral y Diferencial",
                        "text": "La Ley de Ampère establece que la circulación del campo magnético a lo largo de un lazo cerrado $\\mathcal{C}$ es proporcional a la corriente neta enlazada:\n- Forma integral: $\\oint_{\\mathcal{C}} \\mathbf{B} \\cdot d\\boldsymbol{\\ell} = {{c1::\\mu_0 I_{\\text{enc}}::forma integral}}$\n- Forma diferencial: $\\nabla \\times \\mathbf{B} = {{c2::\\mu_0 \\mathbf{J}::rotacional del campo magnético}}$."
                    },
                    {
                        "item_id": 1879936200211745241,
                        "type": "Flashcard",
                        "title": "Campo Magnético en un Cilindro Conductor Infinito",
                        "front": "Calcule el campo magnético $\\mathbf{B}(r)$ en todo el espacio para un cilindro largo de radio $R$ por el que fluye una corriente total $I$ uniformemente distribuida.",
                        "back": "Elegimos una curva amperiana circular de radio $r$ centrada en el eje. Por simetría, $\\oint \\mathbf{B} \\cdot d\\boldsymbol{\\ell} = B(r) \\cdot 2\\pi r$.<br>1. <b>Para $r < R$ (interior):</b><br>$$I_{\\text{enc}} = I \\frac{\\pi r^2}{\\pi R^2} = I \\frac{r^2}{R^2} \\implies B(r) \\cdot 2\\pi r = \\mu_0 I \\frac{r^2}{R^2} \\implies B(r) = \\frac{\\mu_0 I r}{2\\pi R^2} \\, \\hat{\\phi}$$<br>2. <b>Para $r \\ge R$ (exterior):</b><br>$$I_{\\text{enc}} = I \\implies B(r) \\cdot 2\\pi r = \\mu_0 I \\implies B(r) = \\frac{\\mu_0 I}{2\\pi r} \\, \\hat{\\phi}$$<br>El campo crece linealmente hasta la superficie $r=R$ donde vale $\\frac{\\mu_0 I}{2\\pi R}$, y luego decae como $1/r$."
                    },
                    {
                        "item_id": 1879936200212583018,
                        "type": "ClozeCard",
                        "title": "Campos en Solenoide y Toroide Ideales",
                        "text": "1. Solenoide ideal de $n$ vueltas por unidad de longitud: En su interior $B = {{c1::\\mu_0 n I::campo interior solenoide}}$, y en el exterior $B \\approx 0$.\n2. Toroide circular de $N$ espiras y radio medio $r$: En el núcleo interior $B(r) = {{c2::\\frac{\\mu_0 N I}{2\\pi r}::campo de toroide}}$."
                    }
                ]
            },
            {
                "note_id": "em_10",
                "title": "Magnetismo en la Materia y Campo H",
                "x": 280.0,
                "y": 880.0,
                "tags": [
                    "EM",
                    "Magnetización",
                    "Campo H",
                    "Corrientes Ligadas"
                ],
                "note_type": "standard",
                "desired_retention": 0.88,
                "cards": [
                    {
                        "item_id": 1879936200213872805,
                        "type": "ClozeCard",
                        "title": "Magnetización y Corrientes Ligadas",
                        "text": "La magnetización $\\mathbf{M}$ es el momento dipolar magnético por unidad de volumen. Sus corrientes ligadas equivalentes son:\n- Corriente volumétrica ligada: $\\mathbf{J}_b = {{c1::\\nabla \\times \\mathbf{M}::rotacional de M}}$\n- Corriente superficial ligada: $\\mathbf{K}_b = {{c2::\\mathbf{M} \\times \\hat{n}::producto cruz con la normal exterior}}$."
                    },
                    {
                        "item_id": 1879936200215808409,
                        "type": "Flashcard",
                        "title": "Campo Auxiliar H y Medios Magnéticos Lineales",
                        "front": "¿Cómo se define el campo magnético auxiliar $\\mathbf{H}$, cuál es su Ley de Ampère correspondiente y cómo se relaciona con $\\mathbf{B}$ en medios lineales?",
                        "back": "1. <b>Definición:</b> $\\mathbf{H} = \\frac{\\mathbf{B}}{\\mu_0} - \\mathbf{M}$.<br>2. <b>Ley de Ampère en medios materiales:</b> Regida únicamente por corrientes <b>libres</b>:<br>$$\\nabla \\times \\mathbf{H} = \\mathbf{J}_f \\quad \\iff \\quad \\oint \\mathbf{H} \\cdot d\\boldsymbol{\\ell} = I_{f,\\text{enc}}$$<br>3. <b>Medios Magnéticos Lineales e Isótropos:</b><br>$$\\mathbf{M} = \\chi_m \\mathbf{H} \\implies \\mathbf{B} = \\mu_0 (\\mathbf{H} + \\mathbf{M}) = \\mu_0 (1 + \\chi_m) \\mathbf{H} = \\mu \\mathbf{H}$$<br>donde $\\chi_m$ es la susceptibilidad magnética y $\\mu = \\mu_0 \\mu_r = \\mu_0(1+\\chi_m)$ es la permeabilidad magnética del medio."
                    },
                    {
                        "item_id": 1879936200216679889,
                        "type": "Flashcard",
                        "title": "Diamagnetismo, Paramagnetismo y Ferromagnetismo",
                        "front": "Compare brevemente las características físicas de los materiales diamagnéticos, paramagnéticos y ferromagnéticos.",
                        "back": "1. <b>Diamagnetismo:</b> $\\chi_m < 0$ (muy débil, $\\sim -10^{-5}$), $\\mu_r \\lesssim 1$. Surge de la precesión de Larmor inducida por el campo externo que se opone a él (Ley de Lenz atómica). Presente en todos los materiales, independiente de $T$.<br>2. <b>Paramagnetismo:</b> $\\chi_m > 0$ (pequeño, $\\sim 10^{-4}$), $\\mu_r \\gtrsim 1$. Dipolos permanentes que se alinean a favor del campo externo; decae con la temperatura según la Ley de Curie ($\\chi_m \\propto 1/T$).<br>3. <b>Ferromagnetismo:</b> $\\chi_m \\gg 1$ (no lineal, hasta $10^5$). Interacción de canje cuántico que alinea dominios magnéticos espontáneamente; presenta memoria magnética (ciclo de histéresis, magnetización remanente y campo coercitivo) por debajo de la temperatura de Curie $T_C$."
                    }
                ]
            },
            {
                "note_id": "em_11",
                "title": "Inducción de Faraday y Ley de Lenz",
                "x": 620.0,
                "y": 880.0,
                "tags": [
                    "EM",
                    "Faraday",
                    "Lenz",
                    "Inductancia"
                ],
                "note_type": "standard",
                "desired_retention": 0.88,
                "cards": [
                    {
                        "item_id": 1879936200218755712,
                        "type": "ClozeCard",
                        "title": "Ley de Faraday-Lenz y Ecuación de Maxwell-Faraday",
                        "text": "La fuerza electromotriz inducida en un circuito es opuesta al cambio temporal del flujo magnético $\\Phi_B = \\iint \\mathbf{B} \\cdot d\\mathbf{A}$:\n- Forma integral: $\\mathcal{E} = \\oint \\mathbf{E}_{\\text{ind}} \\cdot d\\boldsymbol{\\ell} = {{c1::-\\frac{d\\Phi_B}{dt}::Ley de Faraday-Lenz}}$\n- Forma diferencial: $\\nabla \\times \\mathbf{E} = {{c2::-\\frac{\\partial \\mathbf{B}}{\\partial t}::ecuación de Maxwell-Faraday}}$."
                    },
                    {
                        "item_id": 1879936200219110398,
                        "type": "ProofSequenceCard",
                        "title": "FEM de Movimiento en Barra Conductora Deslizante",
                        "premise": "Una barra conductora de longitud $L$ se desplaza a velocidad constante $v$ perpendicular a rieles paralelos en un campo magnético uniforme $\\mathbf{B} = B\\hat{k}$. Probar la equivalencia entre la fuerza de Lorentz y la Ley de Faraday.",
                        "steps": [
                            "Método de Lorentz: Cada electrón libre en la barra experimenta una fuerza magnética $\\mathbf{f}_m = q(\\mathbf{v} \\times \\mathbf{B}) = -e (v\\hat{i} \\times B\\hat{k}) = e v B \\hat{j}$.",
                            "El campo de fuerza magnética no electrostático por unidad de carga es $\\mathbf{E}_m = \\mathbf{v} \\times \\mathbf{B} = -v B \\hat{j}$.",
                            "La FEM inducida de movimiento a lo largo de la barra es $\\mathcal{E} = \\int_0^L (\\mathbf{v} \\times \\mathbf{B}) \\cdot d\\boldsymbol{\\ell} = v B L$.",
                            "Método de Faraday: El área del circuito cerrado delimitado por los rieles y la barra en la posición $x(t)$ es $A(t) = L \\cdot x(t)$.",
                            "El flujo magnético es $\\Phi_B(t) = B \\cdot A(t) = B L x(t)$. Aplicando la derivada temporal: $\\mathcal{E} = -\\frac{d\\Phi_B}{dt} = -B L \\frac{dx}{dt} = -B L v$, demostrando la absoluta coincidencia entre ambos enfoques."
                        ]
                    },
                    {
                        "item_id": 1879936200220473018,
                        "type": "ClozeCard",
                        "title": "Autoinductancia y Densidad de Energía Magnética",
                        "text": "La autoinductancia de un circuito que almacena flujo propio es $L = {{c1::\\frac{N \\Phi_B}{I}::definición de autoinductancia}}$.\nLa energía total acumulada en el campo magnético del inductor es $U_B = {{c2::\\frac{1}{2} L I^2::energía en inductor}}$ y su densidad volumétrica en el vacío es $u_B = {{c3::\\frac{B^2}{2\\mu_0}::densidad de energía magnética}}$."
                    }
                ]
            }
        ],
        "edges": [
            {
                "source_id": "em_01",
                "target_id": "em_02",
                "label": "Polarización a Desplazamiento D"
            },
            {
                "source_id": "em_02",
                "target_id": "em_03",
                "label": "Gauss a Capacitancia y Energía"
            },
            {
                "source_id": "em_01",
                "target_id": "em_04",
                "label": "Dieléctricos a Conducción"
            },
            {
                "source_id": "em_04",
                "target_id": "em_05",
                "label": "Ohm Microscópica a Circuitos RC"
            },
            {
                "source_id": "em_06",
                "target_id": "em_07",
                "label": "Lorentz a Espiras y Torques"
            },
            {
                "source_id": "em_07",
                "target_id": "em_08",
                "label": "Momentos Dipolares a Biot-Savart"
            },
            {
                "source_id": "em_08",
                "target_id": "em_09",
                "label": "Biot-Savart a Ley de Ampère"
            },
            {
                "source_id": "em_09",
                "target_id": "em_10",
                "label": "Ampère libre a Campo H"
            },
            {
                "source_id": "em_08",
                "target_id": "em_11",
                "label": "Campos Magnéticos a Inducción de Faraday"
            },
            {
                "source_id": "em_09",
                "target_id": "em_11",
                "label": "Flujo Amperiano a FEM de Faraday"
            }
        ]
    },
    {
        "name": "Análisis Real (I3)",
        "folder_path": "",
        "notes": [
            {
                "note_id": "ar_01",
                "title": "Espacios Métricos y Continuidad Global",
                "x": 100.0,
                "y": 100.0,
                "tags": [
                    "Análisis Real",
                    "Topología",
                    "Continuidad"
                ],
                "note_type": "standard",
                "desired_retention": 0.88,
                "cards": [
                    {
                        "item_id": 1879936200222325151,
                        "type": "ClozeCard",
                        "title": "Caracterización Topológica Global de Continuidad",
                        "text": "Sea $f: X \\to Y$ una aplicación entre espacios métricos. Son equivalentes:\n1. $f$ es continua en todo $X$.\n2. Para todo conjunto abierto $V \\subset Y$, la preimagen $f^{-1}(V)$ es {{c1::abierta en X::preimagen de abiertos}}.\n3. Para todo conjunto cerrado $F \\subset Y$, la preimagen $f^{-1}(F)$ es {{c2::cerrada en X::preimagen de cerrados}}.\n4. Para todo subconjunto $A \\subset X$, se cumple la inclusión topológica: ${{c3::f(\\overline{A}) \\subset \\overline{f(A)}::preservación de clausuras}}$."
                    },
                    {
                        "item_id": 1879936200223575558,
                        "type": "Flashcard",
                        "title": "Funciones Lipschitzianas y Hölderianas",
                        "front": "Defina rigurosamente las clases de funciones Lipschitz y Hölder y explique su relación con la continuidad uniforme.",
                        "back": "1. <b>Lipschitz:</b> Una función $f: X \\to Y$ es Lipschitz con constante $L \\ge 0$ si $\\forall x, x' \\in X$:<br>$$d_Y(f(x), f(x')) \\le L \\cdot d_X(x, x')$$<br>2. <b>Hölder:</b> Es Hölder con exponente $\\alpha \\in (0, 1]$ y constante $C \\ge 0$ si:<br>$$d_Y(f(x), f(x')) \\le C \\cdot d_X(x, x')^\\alpha$$<br>3. <b>Propiedad clave:</b> Toda función Lipschitz (y toda función Hölder) es <b>incondicionalmente uniformemente continua</b> en $X$. Basta elegir $\\delta = \\varepsilon / L$ (o $\\delta = (\\varepsilon / C)^{1/\\alpha}$), el cual es idéntico e independiente de los puntos evaluados."
                    },
                    {
                        "item_id": 1879936200224407464,
                        "type": "ClozeCard",
                        "title": "Homeomorfismo e Invariantes Topológicos",
                        "text": "Una biyección continua $f: X \\to Y$ cuya inversa $f^{-1}: Y \\to X$ es también continua se denomina {{c1::homeomorfismo::isomorfismo topológico}}.\nLas propiedades geométricas preservadas bajo homeomorfismos son los invariantes topológicos, destacando principalmente la {{c2::compacidad y la conexidad::invariantes topológicos principales}}."
                    }
                ]
            },
            {
                "note_id": "ar_02",
                "title": "Función Distancia y Separación de Urysohn",
                "x": 440.0,
                "y": 100.0,
                "tags": [
                    "Análisis Real",
                    "Distancia",
                    "Urysohn",
                    "Separación"
                ],
                "note_type": "standard",
                "desired_retention": 0.88,
                "cards": [
                    {
                        "item_id": 1879936200225746350,
                        "type": "ProofSequenceCard",
                        "title": "La Función Distancia a un Conjunto es 1-Lipschitz",
                        "premise": "Para cualquier subconjunto no vacío $A \\subset X$, demostrar que la función $d_A: X \\to \\mathbb{R}$ dada por $d_A(x) = d(x, A) = \\inf_{a \\in A} d(x, a)$ cumple $|d(x, A) - d(y, A)| \\le d(x, y)$ para todo $x, y \\in X$.",
                        "steps": [
                            "Sea $a \\in A$ arbitrario. Por la desigualdad triangular métrica en $X$: $d(x, a) \\le d(x, y) + d(y, a)$.",
                            "Tomar el ínfimo sobre todos los elementos $a \\in A$ en el miembro derecho: $d(x, a) \\le d(x, y) + \\inf_{a' \\in A} d(y, a') = d(x, y) + d(y, A)$.",
                            "Como esta cota es válida para todo $a \\in A$, tomando ínfimo sobre $a$ en el lado izquierdo: $d(x, A) \\le d(x, y) + d(y, A)$.",
                            "Restando $d(y, A)$ se obtiene: $d(x, A) - d(y, A) \\le d(x, y)$.",
                            "Por estricta simetría intercambiando los papeles de $x$ e $y$: $d(y, A) - d(x, A) \\le d(x, y)$.",
                            "Combinando ambas desigualdades se concluye rigurosamente: $|d(x, A) - d(y, A)| \\le d(x, y)$, es decir, $d(\\cdot, A)$ es 1-Lipschitz (y por tanto continua)."
                        ]
                    },
                    {
                        "item_id": 1879936200226633083,
                        "type": "Flashcard",
                        "title": "Lema de Urysohn Métrico Elemental",
                        "front": "Sean $A, B \\subset X$ dos conjuntos cerrados y disjuntos en un espacio métrico ($A \\cap B = \\emptyset$). Construya explícitamente una función continua $f: X \\to [0, 1]$ tal que $f|_A \\equiv 0$ y $f|_B \\equiv 1$.",
                        "back": "Como $A$ y $B$ son cerrados y disjuntos, para ningún punto se puede anular simultáneamente la distancia a ambos: $d(x, A) + d(x, B) > 0$ para todo $x \\in X$.<br>Se define la función de Urysohn:<br>$$f(x) = \\frac{d(x, A)}{d(x, A) + d(x, B)}$$<br>1. Si $x \\in A \\implies d(x, A) = 0 \\implies f(x) = 0$.<br>2. Si $x \\in B \\implies d(x, B) = 0 \\implies f(x) = \\frac{d(x, A)}{d(x, A) + 0} = 1$.<br>3. Como las funciones distancia son 1-Lipschitz y el denominador nunca se anula, $f$ es continua en todo $X$ con imagen contenida en $[0, 1]$."
                    },
                    {
                        "item_id": 1879936200227463537,
                        "type": "ClozeCard",
                        "title": "Separación Estricta entre Compacto y Cerrado",
                        "text": "Si $K \\subset X$ es compacto, $F \\subset X$ es cerrado y $K \\cap F = \\emptyset$, entonces la distancia entre ambos conjuntos satisface:\n$$\\text{dist}(K, F) = \\inf_{x \\in K} d(x, F) {{c1::> 0 (es estrictamente positiva)::cota de separación}}$$\nEsto se debe a que la función continua $x \\mapsto d(x, F)$ alcanza su mínimo en el compacto $K$ y dicho mínimo no puede ser cero pues $K \\cap F = \\emptyset$."
                    }
                ]
            },
            {
                "note_id": "ar_03",
                "title": "Continuidad y Compacidad: Weierstrass",
                "x": 780.0,
                "y": 100.0,
                "tags": [
                    "Análisis Real",
                    "Compacidad",
                    "Weierstrass",
                    "Extremos"
                ],
                "note_type": "standard",
                "desired_retention": 0.88,
                "cards": [
                    {
                        "item_id": 1879936200229167237,
                        "type": "ClozeCard",
                        "title": "Preservación de Compacidad bajo Continuidad",
                        "text": "Si $f: X \\to Y$ es continua y $K \\subset X$ es un conjunto compacto, entonces la imagen directa $f(K)$ es {{c1::un subconjunto compacto en Y::propiedad de la imagen}}.\nDemostración: Cualquier recubrimiento abierto de $f(K)$ genera por preimágenes continuas un recubrimiento abierto de $K$, del cual se extrae un subrecubrimiento finito."
                    },
                    {
                        "item_id": 1879936200229370628,
                        "type": "Flashcard",
                        "title": "Teorema de Weierstrass de los Valores Extremos",
                        "front": "Demuestre que toda función continua $f: K \\to \\mathbb{R}$ sobre un espacio métrico compacto no vacío $K$ es acotada y alcanza su máximo y mínimo absoluto.",
                        "back": "1. Por preservación de compacidad, la imagen $f(K) \\subset \\mathbb{R}$ es compacta.<br>2. Por el Teorema de Heine-Borel en $\\mathbb{R}$, un subconjunto de $\\mathbb{R}$ es compacto si y sólo si es <b>cerrado y acotado</b>.<br>3. Al ser $f(K)$ acotado, existen su supremo finito $M = \\sup f(K)$ y su ínfimo finito $m = \\inf f(K)$.<br>4. Al ser $f(K)$ cerrado, contiene a todos sus puntos de adherencia, luego $M \\in f(K)$ y $m \\in f(K)$.<br>5. Por lo tanto, existen puntos $x_{\\max}, x_{\\min} \\in K$ tales que $f(x_{\\max}) = M$ y $f(x_{\\min}) = m$."
                    },
                    {
                        "item_id": 1879936200230979457,
                        "type": "ClozeCard",
                        "title": "Inversa Continua sobre Compactos",
                        "text": "Sea $K$ un espacio métrico compacto y $f: K \\to Y$ una aplicación continua y biyectiva. Entonces la función inversa $f^{-1}: Y \\to K$ es {{c1::automáticamente continua (f es un homeomorfismo)::continuidad forzada}}.\nJustificación: Para probar que $(f^{-1})^{-1}(F) = f(F)$ es cerrado en $Y$ cuando $F$ es cerrado en $K$, basta notar que todo cerrado en un compacto es compacto, y su imagen continua $f(F)$ es compacta, luego cerrada."
                    }
                ]
            },
            {
                "note_id": "ar_04",
                "title": "Continuidad Uniforme y Heine-Cantor",
                "x": 100.0,
                "y": 360.0,
                "tags": [
                    "Análisis Real",
                    "Uniforme Continuidad",
                    "Heine-Cantor"
                ],
                "note_type": "standard",
                "desired_retention": 0.88,
                "cards": [
                    {
                        "item_id": 1879936200231478982,
                        "type": "ProofSequenceCard",
                        "title": "Demostración del Teorema de Heine-Cantor",
                        "premise": "Demostrar que toda función continua $f: K \\to Y$ definida sobre un espacio métrico compacto $K$ es uniformemente continua.",
                        "steps": [
                            "Sea $\\varepsilon > 0$. Por continuidad puntual, para cada punto $p \\in K$ existe un radio $\\delta_p > 0$ tal que $d_K(x, p) < \\delta_p \\implies d_Y(f(x), f(p)) < \\varepsilon / 2$.",
                            "Considerar la familia de bolas abiertas $\\{B(p, \\delta_p / 2)\\}_{p \\in K}$. Al cubrir cada punto de $K$, forma un recubrimiento abierto de $K$.",
                            "Por compacidad de $K$, existe un subrecubrimiento finito centrado en los puntos $\\{p_1, p_2, \\dots, p_N\\}$.",
                            "Definir $\\delta = \\min_{1 \\le i \\le N} \\frac{\\delta_{p_i}}{2} > 0$. El mínimo existe y es estrictamente positivo por ser un conjunto finito de números positivos.",
                            "Sean $x, x' \\in K$ con $d_K(x, x') < \\delta$. Como $x$ pertenece a alguna bola del subrecubrimiento, existe $k$ tal que $d_K(x, p_k) < \\frac{\\delta_{p_k}}{2}$.",
                            "Por desigualdad triangular: $d_K(x', p_k) \\le d_K(x', x) + d_K(x, p_k) < \\delta + \\frac{\\delta_{p_k}}{2} \\le \\frac{\\delta_{p_k}}{2} + \\frac{\\delta_{p_k}}{2} = \\delta_{p_k}$.",
                            "Finalmente, por desigualdad triangular en el codominio $Y$: $d_Y(f(x), f(x')) \\le d_Y(f(x), f(p_k)) + d_Y(f(p_k), f(x')) < \\frac{\\varepsilon}{2} + \\frac{\\varepsilon}{2} = \\varepsilon$. Como $\\delta$ no depende de $x$ ni $x'$, $f$ es uniformemente continua."
                        ]
                    },
                    {
                        "item_id": 1879936200232531331,
                        "type": "ClozeCard",
                        "title": "Teorema de Extensión Única al Completado",
                        "text": "Sea $D \\subset X$ un subconjunto denso ($\\overline{D} = X$) y sea $Y$ un espacio métrico completo. Si $f: D \\to Y$ es uniformemente continua, entonces existe {{c1::una única extensión continua \\tilde{f}: X \\to Y::existencia y unicidad}} y dicha extensión es también {{c2::uniformemente continua::regularidad de la extensión}}."
                    }
                ]
            },
            {
                "note_id": "ar_05",
                "title": "Conexidad, TVI y Punto Fijo 1D",
                "x": 440.0,
                "y": 360.0,
                "tags": [
                    "Análisis Real",
                    "Conexidad",
                    "TVI",
                    "Punto Fijo"
                ],
                "note_type": "standard",
                "desired_retention": 0.88,
                "cards": [
                    {
                        "item_id": 1879936200233683677,
                        "type": "ClozeCard",
                        "title": "Definición de Conexidad y Subconjuntos Conexos de R",
                        "text": "Un espacio métrico $X$ es conexo si sus únicos subconjuntos simultáneamente abiertos y cerrados (clopen) son:\n$${{c1::\\emptyset \\text{ y } X::subconjuntos clopen}}$$\nEn la recta real $\\mathbb{R}$, un conjunto $E \\subset \\mathbb{R}$ es conexo si y sólo si es {{c2::un intervalo::caracterización en R}}."
                    },
                    {
                        "item_id": 1879936200236547923,
                        "type": "Flashcard",
                        "title": "Teorema del Valor Intermedio (TVI Generalizado)",
                        "front": "Enuncie y demuestre el Teorema del Valor Intermedio para una función continua $f: X \\to \\mathbb{R}$ sobre un espacio métrico conexo arbitrario $X$.",
                        "back": "<b>Enunciado:</b> Si $X$ es un espacio métrico conexo, $f: X \\to \\mathbb{R}$ es continua, y para $a, b \\in X$ con $f(a) < c < f(b)$, existe $x \\in X$ tal que $f(x) = c$.<br><b>Demostración:</b><br>1. Como $X$ es conexo y $f$ es continua, la imagen directa $f(X)$ es un subconjunto conexo de $\\mathbb{R}$.<br>2. Los únicos subconjuntos conexos de $\\mathbb{R}$ son los intervalos.<br>3. Puesto que $f(a), f(b) \\in f(X)$ y $f(X)$ es un intervalo, todo punto intermedio $c$ comprendido entre $f(a)$ y $f(b)$ pertenece necesariamente a $f(X)$.<br>4. Por lo tanto, existe $x \\in X$ tal que $f(x) = c$."
                    },
                    {
                        "item_id": 1879936200237400395,
                        "type": "ProofSequenceCard",
                        "title": "Teorema del Punto Fijo en 1D",
                        "premise": "Demostrar que toda función continua $f: [a, b] \\to [a, b]$ posee al menos un punto fijo $x^* \\in [a, b]$ tal que $f(x^*) = x^*$.",
                        "steps": [
                            "Definir la función auxiliar continua $g: [a, b] \\to \\mathbb{R}$ mediante $g(x) = f(x) - x$.",
                            "Como el codominio de $f$ es $[a, b]$, se cumple $f(a) \\ge a \\implies g(a) = f(a) - a \\ge 0$.",
                            "Similarmente, para el extremo derecho $f(b) \\le b \\implies g(b) = f(b) - b \\le 0$.",
                            "Si $g(a) = 0$, $a$ es punto fijo; si $g(b) = 0$, $b$ es punto fijo.",
                            "Si $g(a) > 0$ y $g(b) < 0$, por el Teorema de Bolzano existe $x^* \\in (a, b)$ tal que $g(x^*) = 0$.",
                            "Conclusión: $f(x^*) - x^* = 0 \\iff f(x^*) = x^*$."
                        ]
                    }
                ]
            },
            {
                "note_id": "ar_06",
                "title": "Convergencia Puntual y Uniforme",
                "x": 780.0,
                "y": 360.0,
                "tags": [
                    "Análisis Real",
                    "Convergencia",
                    "Norma Infinito",
                    "Cauchy"
                ],
                "note_type": "standard",
                "desired_retention": 0.88,
                "cards": [
                    {
                        "item_id": 1879936200238061195,
                        "type": "ClozeCard",
                        "title": "Norma del Supremo y Convergencia Uniforme",
                        "text": "Una sucesión de funciones $f_n: X \\to Y$ converge uniformemente a $f$ si y sólo si:\n$$\\lim_{n \\to \\infty} \\|f_n - f\\|_\\infty = \\lim_{n \\to \\infty} {{c1::\\sup_{x \\in X} d_Y(f_n(x), f(x)) = 0::definición con norma del supremo}}$$\nLa diferencia esencial con la puntual es que el índice $N(\\varepsilon)$ depende únicamente de $\\varepsilon$ y {{c2::no depende del punto x::independencia de x}}."
                    },
                    {
                        "item_id": 1879936200239362650,
                        "type": "Flashcard",
                        "title": "Criterio de Puntos Móviles (Mobile Points) para Descartar Convergencia Uniforme",
                        "front": "¿En qué consiste el Criterio de Puntos Móviles para probar que una sucesión de funciones $f_n$ NO converge uniformemente a $f$?",
                        "back": "<b>Criterio:</b> Si existe una subsucesión o sucesión de puntos $(x_n) \\subset X$ y una constante $c > 0$ tal que:<br>$$d_Y(f_n(x_n), f(x_n)) \\ge c > 0 \\quad \\forall n$$<br>entonces $\\|f_n - f\\|_\\infty = \\sup_{x \\in X} d_Y(f_n(x), f(x)) \\ge d_Y(f_n(x_n), f(x_n)) \\ge c > 0$, lo que impide que $\\|f_n - f\\|_\\infty \\to 0$.<br><b>Ejemplo clásico:</b> $f_n(x) = x^n$ en $[0, 1)$ con límite puntual $f \\equiv 0$. Tomando $x_n = (1/2)^{1/n} \\in [0, 1)$, se tiene $f_n(x_n) = 1/2 \\not\\to 0$, descartando la convergencia uniforme."
                    },
                    {
                        "item_id": 1879936200239994385,
                        "type": "Flashcard",
                        "title": "Criterio de Cauchy Uniforme",
                        "front": "Enuncie el Criterio de Cauchy Uniforme y explique el papel de la completitud del codominio.",
                        "back": "<b>Enunciado:</b> Sea $Y$ un espacio métrico completo. Una sucesión de funciones $f_n: X \\to Y$ converge uniformemente en $X$ si y sólo si satisface la condición de Cauchy uniforme:<br>$$\\forall \\varepsilon > 0, \\, \\exists N \\in \\mathbb{N} : \\forall n, m \\ge N, \\quad \\|f_n - f_m\\|_\\infty = \\sup_{x \\in X} d_Y(f_n(x), f_m(x)) < \\varepsilon$$<br>La completitud de $Y$ garantiza que para cada $x$ fijado, la sucesión numérica $(f_n(x))$ tiene un límite $f(x) \\in Y$, y la cota uniforme sobre $m$ asegura que $\\|f_n - f\\|_\\infty \\le \\varepsilon$ al tomar $m \\to \\infty$."
                    }
                ]
            },
            {
                "note_id": "ar_07",
                "title": "Transferencia de Continuidad y Test M",
                "x": 100.0,
                "y": 620.0,
                "tags": [
                    "Análisis Real",
                    "Continuidad Límite",
                    "Test M",
                    "Series"
                ],
                "note_type": "standard",
                "desired_retention": 0.88,
                "cards": [
                    {
                        "item_id": 1879936200241425414,
                        "type": "ProofSequenceCard",
                        "title": "Teorema de Transferencia de Continuidad",
                        "premise": "Demostrar que si $f_n: X \\to Y$ son funciones continuas y $f_n \\to f$ uniformemente en $X$, entonces la función límite $f$ es continua en $X$.",
                        "steps": [
                            "Sea $x_0 \\in X$ y sea $\\varepsilon > 0$ arbitrario.",
                            "Por convergencia uniforme, existe un índice $N$ tal que $\\forall n \\ge N$, $d_Y(f_n(x), f(x)) < \\varepsilon / 3$ para TODO $x \\in X$.",
                            "Fijamos el índice $n = N$. Como la función $f_N$ es continua en $x_0$, existe $\\delta > 0$ tal que $d_X(x, x_0) < \\delta \\implies d_Y(f_N(x), f_N(x_0)) < \\varepsilon / 3$.",
                            "Aplicando la desigualdad triangular de tres términos para cualquier $x$ con $d_X(x, x_0) < \\delta$: $d_Y(f(x), f(x_0)) \\le d_Y(f(x), f_N(x)) + d_Y(f_N(x), f_N(x_0)) + d_Y(f_N(x_0), f(x_0))$.",
                            "Acotando cada término: $d_Y(f(x), f(x_0)) < \\frac{\\varepsilon}{3} + \\frac{\\varepsilon}{3} + \\frac{\\varepsilon}{3} = \\varepsilon$. Esto prueba la continuidad de $f$ en $x_0$."
                        ]
                    },
                    {
                        "item_id": 1879936200242140232,
                        "type": "ClozeCard",
                        "title": "Criterio M de Weierstrass para Series de Funciones",
                        "text": "Sea $\\sum_{n=1}^\\infty f_n(x)$ una serie de funciones en $X$. Si existe una sucesión de constantes reales $M_n \\ge 0$ tales que:\n1. $|f_n(x)| \\le M_n$ para todo $x \\in X$ y todo $n$, y\n2. $\\sum_{n=1}^\\infty M_n < \\infty$ converge,\nentonces la serie $\\sum f_n(x)$ converge {{c1::absoluta y uniformemente en X::tipo de convergencia}}."
                    }
                ]
            },
            {
                "note_id": "ar_08",
                "title": "Teorema de Dini y Monotonía",
                "x": 440.0,
                "y": 620.0,
                "tags": [
                    "Análisis Real",
                    "Dini",
                    "Monotonía",
                    "Compacidad"
                ],
                "note_type": "standard",
                "desired_retention": 0.88,
                "cards": [
                    {
                        "item_id": 1879936200243678293,
                        "type": "ClozeCard",
                        "title": "Enunciado del Teorema de Dini",
                        "text": "Sea $K$ un espacio métrico compacto y sea $f_n: K \\to \\mathbb{R}$ una sucesión de funciones continuas tal que:\n1. $f_n(x) \\to f(x)$ puntualmente en $K$,\n2. La función límite $f: K \\to \\mathbb{R}$ es {{c1::continua en K::hipótesis sobre el límite}},\n3. La convergencia es monótona: $f_{n+1}(x) \\le f_n(x)$ (o viceversa) $\\forall x \\in K$.\nEntonces la convergencia es forzosamente {{c2::uniforme en K::consecuencia fundamental}}."
                    },
                    {
                        "item_id": 1879936200244948362,
                        "type": "Flashcard",
                        "title": "Contraejemplo de Dini sin Compacidad",
                        "front": "Muestre un ejemplo concreto donde las hipótesis de continuidad y monotonía de Dini se cumplen pero la convergencia NO es uniforme debido a la no-compacidad del dominio.",
                        "back": "Considerar el intervalo abierto $(0, 1)$ (que no es compacto) y las funciones:<br>$$f_n(x) = \\frac{1}{1 + n x}$$<br>1. Cada $f_n$ es continua y monótona decreciente hacia $f(x) = 0$.<br>2. El límite $f \\equiv 0$ es trivialmente continuo.<br>3. Sin embargo, para todo $n$:<br>$$\\|f_n - 0\\|_\\infty = \\sup_{x \\in (0, 1)} \\frac{1}{1 + nx} = 1 \\not\\to 0$$<br>La convergencia NO es uniforme. Falla la compacidad de $(0, 1)$."
                    }
                ]
            },
            {
                "note_id": "ar_09",
                "title": "Equicontinuidad y Arzelà-Ascoli",
                "x": 780.0,
                "y": 620.0,
                "tags": [
                    "Análisis Real",
                    "Arzelà-Ascoli",
                    "Equicontinuidad",
                    "Precompacidad"
                ],
                "note_type": "standard",
                "desired_retention": 0.88,
                "cards": [
                    {
                        "item_id": 1879936200245572801,
                        "type": "ClozeCard",
                        "title": "Definición de Familia Equicontinua",
                        "text": "Una familia de funciones $\\mathcal{F} \\subset C(X, Y)$ es equicontinua en $x_0 \\in X$ si para todo $\\varepsilon > 0$, existe $\\delta > 0$ tal que para TODA función $f \\in \\mathcal{F}$:\n$$d_X(x, x_0) < \\delta \\implies {{c1::d_Y(f(x), f(x_0)) < \\varepsilon::el mismo delta para toda la familia}}$$"
                    },
                    {
                        "item_id": 1879936200246612298,
                        "type": "Flashcard",
                        "title": "Teorema de Arzelà-Ascoli (Condición Necesaria y Suficiente)",
                        "front": "Enuncie rigurosamente el Teorema de Arzelà-Ascoli para espacios métricos compactos.",
                        "back": "<b>Teorema de Arzelà-Ascoli:</b> Sea $K$ un espacio métrico compacto. Una familia de funciones $\\mathcal{F} \\subset C(K, \\mathbb{R})$ es <b>relativamente compacta</b> (es decir, su clausura en $(C(K), \\|\\cdot\\|_\\infty)$ es compacta, o equivalentemente toda sucesión en $\\mathcal{F}$ tiene una subsucesión uniformemente convergente) si y sólo si:<br>1. $\\mathcal{F}$ es <b>puntualmente acotada</b>: $\\forall x \\in K, \\, \\sup_{f \\in \\mathcal{F}} |f(x)| < \\infty$ (en compactos esto implica acotación uniforme).<br>2. $\\mathcal{F}$ es <b>equicontinua</b> en $K$."
                    },
                    {
                        "item_id": 1879936200247936275,
                        "type": "ProofSequenceCard",
                        "title": "Esquema Demostrativo de Arzelà-Ascoli",
                        "premise": "Resumir los pasos esenciales de la demostración del Teorema de Arzelà-Ascoli.",
                        "steps": [
                            "Paso 1 (Separabilidad): Como $K$ es compacto, es separable. Existe un subconjunto numerable y denso $D = \\{q_1, q_2, \\dots\\} \\subset K$.",
                            "Paso 2 (Proceso Diagonal de Cantor): Dado que $(f_n(q_k))$ está acotada en $\\mathbb{R}$ para cada $q_k$, por Bolzano-Weierstrass y argumento diagonal de Cantor existe una subsucesión $(f_{n_j})$ que converge puntualmente en todo punto de $D$.",
                            "Paso 3 (Red finita por compacidad): Dado $\\varepsilon > 0$, por equicontinuidad existe $\\delta > 0$ tal que $d(x, y) < \\delta \\implies |f(x) - f(y)| < \\varepsilon / 3$ para toda función de la familia. Cubrir $K$ con un número finito de bolas $B(q_1, \\delta), \\dots, B(q_m, \\delta)$ centradas en $D$.",
                            "Paso 4 (Cauchy Uniforme): Como la subsucesión converge en los finitos centros $q_1, \\dots, q_m$, para $j, k \\ge N$ se cumple $|f_{n_j}(q_r) - f_{n_k}(q_r)| < \\varepsilon / 3$.",
                            "Paso 5 (Aproximación global): Para cualquier $x \\in K$, tomando el centro más cercano $q_r$: $|f_{n_j}(x) - f_{n_k}(x)| \\le |f_{n_j}(x) - f_{n_j}(q_r)| + |f_{n_j}(q_r) - f_{n_k}(q_r)| + |f_{n_k}(q_r) - f_{n_k}(x)| < \\varepsilon$, demostrando convergencia uniforme."
                        ]
                    }
                ]
            },
            {
                "note_id": "ar_10",
                "title": "Densidad de Stone-Weierstrass",
                "x": 280.0,
                "y": 880.0,
                "tags": [
                    "Análisis Real",
                    "Stone-Weierstrass",
                    "Densidad",
                    "Álgebra"
                ],
                "note_type": "standard",
                "desired_retention": 0.88,
                "cards": [
                    {
                        "item_id": 1879936200248635432,
                        "type": "ClozeCard",
                        "title": "Teorema de Stone-Weierstrass",
                        "text": "Sea $K$ un espacio métrico compacto. Una subálgebra $\\mathcal{A} \\subset C(K, \\mathbb{R})$ es densa con respecto a la norma del supremo $\\|\\cdot\\|_\\infty$ si y sólo si cumple dos condiciones:\n1. {{c1::Separa puntos::condición 1}}: $\\forall x \\neq y \\in K, \\, \\exists f \\in \\mathcal{A} : f(x) \\neq f(y)$.\n2. {{c2::Contiene las funciones constantes::condición 2}}: $\\mathbf{1} \\in \\mathcal{A}$."
                    },
                    {
                        "item_id": 1879936200249761249,
                        "type": "Flashcard",
                        "title": "Teorema Clásico de Aproximación de Weierstrass",
                        "front": "¿Cuál es la versión original del Teorema de Weierstrass en $[a, b]$ y cómo se deduce de Stone-Weierstrass?",
                        "back": "<b>Teorema Clásico de Weierstrass:</b> Todo función continua $f: [a, b] \\to \\mathbb{R}$ puede ser aproximada uniformemente por polinomios algebraicos con la precisión que se desee: $\\forall \\varepsilon > 0, \\, \\exists P(x) \\in \\mathbb{R}[x]$ tal que $\\|f - P\\|_\\infty < \\varepsilon$.<br><b>Deducción:</b> El conjunto de polinomios $\\mathcal{A} = \\mathbb{R}[x]$ forma una subálgebra de $C([a, b], \\mathbb{R})$. Separa puntos (pues $P(x) = x$ asigna valores distintos a puntos distintos) y contiene las constantes ($P(x) = c$). Por Stone-Weierstrass, $\\overline{\\mathcal{A}} = C([a, b], \\mathbb{R})$."
                    }
                ]
            },
            {
                "note_id": "ar_11",
                "title": "Punto Fijo de Banach y Contracciones",
                "x": 620.0,
                "y": 880.0,
                "tags": [
                    "Análisis Real",
                    "Banach",
                    "Punto Fijo",
                    "Contracciones"
                ],
                "note_type": "standard",
                "desired_retention": 0.88,
                "cards": [
                    {
                        "item_id": 1879936200250295718,
                        "type": "ClozeCard",
                        "title": "Definición de Aplicación Contractiva",
                        "text": "Sea $(X, d)$ un espacio métrico. Una aplicación $T: X \\to X$ es una contracción estricta si existe una constante de Lipschitz $k$ que cumple:\n$$d(T(x), T(y)) \\le k \\cdot d(x, y) \\quad \\forall x, y \\in X, \\quad \\text{con } {{c1::0 \\le k < 1::rango de la constante k}}$$"
                    },
                    {
                        "item_id": 1879936200251570286,
                        "type": "ProofSequenceCard",
                        "title": "Demostración del Teorema del Punto Fijo de Banach",
                        "premise": "Sea $(X, d)$ un espacio métrico completo no vacío y sea $T: X \\to X$ una contracción con constante $k < 1$. Demostrar la existencia, unicidad y convergencia de las iteradas $x_{n+1} = T(x_n)$ hacia el punto fijo $x^*$.",
                        "steps": [
                            "Paso 1: Por inducción inmediata, $d(x_{n+1}, x_n) = d(T(x_n), T(x_{n-1})) \\le k d(x_n, x_{n-1}) \\le k^n d(x_1, x_0)$.",
                            "Paso 2: Para $m > n$, por desigualdad triangular: $d(x_m, x_n) \\le \\sum_{j=n}^{m-1} d(x_{j+1}, x_j) \\le d(x_1, x_0) \\sum_{j=n}^{m-1} k^j$.",
                            "Paso 3: Sumando la serie geométrica: $d(x_m, x_n) \\le \\frac{k^n}{1-k} d(x_1, x_0)$. Al tender $n \\to \\infty$, el lado derecho va a 0, probando que $(x_n)$ es de Cauchy.",
                            "Paso 4: Por completitud de $X$, existe $x^* = \\lim_{n \\to \\infty} x_n$. Por continuidad de $T$: $T(x^*) = T(\\lim x_n) = \\lim T(x_n) = \\lim x_{n+1} = x^*$.",
                            "Paso 5: Unicidad: Si $T(y^*) = y^*$, entonces $d(x^*, y^*) = d(T(x^*), T(y^*)) \\le k d(x^*, y^*) \\implies (1-k) d(x^*, y^*) \\le 0 \\implies x^* = y^*$."
                        ]
                    },
                    {
                        "item_id": 1879936200252973883,
                        "type": "Flashcard",
                        "title": "Cotas de Error de Banach A Priori y A Posteriori",
                        "front": "¿Cuáles son las cotas de error a priori y a posteriori para la aproximación $x_n$ en el Teorema del Punto Fijo de Banach?",
                        "back": "1. <b>Cota A Priori</b> (calculada antes de iterar, depende únicamente del paso inicial):<br>$$d(x_n, x^*) \\le \\frac{k^n}{1 - k} d(x_0, x_1)$$<br>2. <b>Cota A Posteriori</b> (calculada paso a paso durante el algoritmo computacional):<br>$$d(x_n, x^*) \\le \\frac{k}{1 - k} d(x_n, x_{n-1})$$"
                    }
                ]
            }
        ],
        "edges": [
            {
                "source_id": "ar_01",
                "target_id": "ar_02",
                "label": "Topología Abierta a Función Distancia"
            },
            {
                "source_id": "ar_01",
                "target_id": "ar_03",
                "label": "Continuidad Global a Compacidad"
            },
            {
                "source_id": "ar_03",
                "target_id": "ar_04",
                "label": "Compacidad a Heine-Cantor"
            },
            {
                "source_id": "ar_01",
                "target_id": "ar_05",
                "label": "Topología Métrica a Conexidad y TVI"
            },
            {
                "source_id": "ar_01",
                "target_id": "ar_06",
                "label": "Espacios Métricos a Convergencia Uniforme"
            },
            {
                "source_id": "ar_06",
                "target_id": "ar_07",
                "label": "Norma del Supremo a Transferencia de Continuidad"
            },
            {
                "source_id": "ar_06",
                "target_id": "ar_08",
                "label": "Convergencia Uniforme a Teorema de Dini"
            },
            {
                "source_id": "ar_04",
                "target_id": "ar_09",
                "label": "Heine-Cantor a Arzelà-Ascoli"
            },
            {
                "source_id": "ar_07",
                "target_id": "ar_09",
                "label": "Continuidad Límite a Precompacidad en C(K)"
            },
            {
                "source_id": "ar_03",
                "target_id": "ar_10",
                "label": "Compacidad a Densidad de Stone-Weierstrass"
            },
            {
                "source_id": "ar_01",
                "target_id": "ar_11",
                "label": "Completitud a Contracciones de Banach"
            }
        ]
    },
    {
        "name": "Química para Ingenieros (I2)",
        "folder_path": "",
        "notes": [
            {
                "note_id": "quim_01",
                "title": "Cinética y Leyes de Velocidad Integradas",
                "x": 100.0,
                "y": 100.0,
                "tags": [
                    "Química",
                    "Cinética",
                    "Órdenes de Reacción"
                ],
                "note_type": "standard",
                "desired_retention": 0.88,
                "cards": [
                    {
                        "item_id": 1879936200254820033,
                        "type": "ClozeCard",
                        "title": "Leyes de Velocidad Integradas: Orden 0, 1 y 2",
                        "text": "Para reactivo $A$ con constante $k$:\n- <b>Orden 0:</b> $[A]_t = {{c1::[A]_0 - kt::orden 0}}$, $t_{1/2} = {{c2::\\frac{[A]_0}{2k}::vida media orden 0}}$, lineal en $[A]$ vs $t$.\n- <b>Orden 1:</b> $\\ln[A]_t = {{c3::\\ln[A]_0 - kt::orden 1}}$, $t_{1/2} = {{c4::\\frac{\\ln 2}{k} \\approx \\frac{0.693}{k}::vida media orden 1}}$ (independiente de $[A]_0$), lineal en $\\ln[A]$ vs $t$.\n- <b>Orden 2:</b> $\\frac{1}{[A]_t} = {{c5::\\frac{1}{[A]_0} + kt::orden 2}}$, $t_{1/2} = {{c6::\\frac{1}{k[A]_0}::vida media orden 2}}$, lineal en $\\frac{1}{[A]}$ vs $t$."
                    },
                    {
                        "item_id": 1879936200255605327,
                        "type": "Flashcard",
                        "title": "Unidades de la Constante de Velocidad k",
                        "front": "¿Cuáles son las unidades del sistema internacional de la constante de velocidad $k$ para órdenes globales $0, 1, 2$ y para un orden general $n$?",
                        "back": "La ley general es $v = k [A]^n$, con $[v] = \\text{M}\\cdot\\text{s}^{-1} = \\text{mol}\\cdot\\text{L}^{-1}\\cdot\\text{s}^{-1}$.<br>1. <b>Orden General $n$:</b> $[k] = \\text{M}^{1-n} \\cdot \\text{s}^{-1} = \\text{mol}^{1-n} \\cdot \\text{L}^{n-1} \\cdot \\text{s}^{-1}$.<br>2. <b>Orden 0:</b> $[k] = \\text{M}\\cdot\\text{s}^{-1}$.<br>3. <b>Orden 1:</b> $[k] = \\text{s}^{-1}$ (frecuencia pura).<br>4. <b>Orden 2:</b> $[k] = \\text{M}^{-1}\\cdot\\text{s}^{-1} = \\text{L}\\cdot\\text{mol}^{-1}\\cdot\\text{s}^{-1}$."
                    }
                ]
            },
            {
                "note_id": "quim_02",
                "title": "Mecanismos y Ecuación de Arrhenius",
                "x": 440.0,
                "y": 100.0,
                "tags": [
                    "Química",
                    "Arrhenius",
                    "Mecanismos",
                    "Energía Activación"
                ],
                "note_type": "standard",
                "desired_retention": 0.88,
                "cards": [
                    {
                        "item_id": 1879936200257548823,
                        "type": "ClozeCard",
                        "title": "Ecuación de Arrhenius Exponencial y Lineal",
                        "text": "La constante de velocidad varía con la temperatura según:\n$$k = {{c1::A e^{-E_a/(RT)}::forma exponencial}}$$\nForma linealizada de Arrhenius:\n$$\\ln k = {{c2::\\ln A - \\frac{E_a}{R}\\frac{1}{T}::forma linealizada}}$$\nEl gráfico de $\\ln k$ vs $1/T$ tiene pendiente negativa $m = {{c3::-\\frac{E_a}{R}::pendiente}}."
                    },
                    {
                        "item_id": 1879936200258102773,
                        "type": "Flashcard",
                        "title": "Arrhenius para Dos Temperaturas Distintas",
                        "front": "Escriba la ecuación de Arrhenius para comparar dos constantes $k_1$ y $k_2$ medidas a temperaturas absolutas $T_1$ y $T_2$.",
                        "back": "Restando las ecuaciones linealizadas:<br>$$\\ln\\left(\\frac{k_2}{k_1}\\right) = -\\frac{E_a}{R} \\left(\\frac{1}{T_2} - \\frac{1}{T_1}\\right) = \\frac{E_a}{R} \\left(\\frac{T_2 - T_1}{T_1 T_2}\\right)$$<br>donde $R = 8.314 \\, \\text{J}\\cdot\\text{mol}^{-1}\\cdot\\text{K}^{-1}$ y las temperaturas $T_1, T_2$ deben expresarse obligatoriamente en <b>Kelvin</b>."
                    },
                    {
                        "item_id": 1879936200260618444,
                        "type": "ClozeCard",
                        "title": "Etapa Determinante y Estado Estacionario (SSA)",
                        "text": "En un mecanismo multietapa, la velocidad global está gobernada por la etapa {{c1::más lenta (RDS)::etapa limitante}}.\nPara intermediarios reactivos muy inestables $I$, la Aproximación de Estado Estacionario (SSA) establece que: $$\\frac{d[I]}{dt} \\approx {{c2::0::derivada nula}}$$"
                    }
                ]
            },
            {
                "note_id": "quim_03",
                "title": "Catálisis y Estado de Transición",
                "x": 780.0,
                "y": 100.0,
                "tags": [
                    "Química",
                    "Catálisis",
                    "Complejo Activado"
                ],
                "note_type": "standard",
                "desired_retention": 0.88,
                "cards": [
                    {
                        "item_id": 1879936200261251829,
                        "type": "Flashcard",
                        "title": "Efecto Termodinámico vs Cinético del Catalizador",
                        "front": "¿Qué altera y qué NO altera un catalizador químico en una reacción reversible?",
                        "back": "1. <b>SÍ altera:</b> Disminuye la energía de activación $E_a$ al proveer una nueva ruta mecanicista con un complejo activado de menor energía. Incrementa en el mismo factor la velocidad directa $v_{\\text{dir}}$ y la inversa $v_{\\text{inv}}$. Acelera el tiempo requerido para alcanzar el equilibrio.<br>2. <b>NO altera:</b> La energía libre de Gibbs de la reacción ($\\Delta G^\\circ$), la entalpía ($\\Delta H^\\circ$), la entropía ($\\Delta S^\\circ$), ni la constante de equilibrio ($K_{\\text{eq}}$). Las concentraciones finales de equilibrio permanecen estrictamente intactas."
                    },
                    {
                        "item_id": 1879936200262221761,
                        "type": "ClozeCard",
                        "title": "Catálisis Homogénea vs Heterogénea",
                        "text": "En la catálisis {{c1::homogénea::tipo 1}}, el catalizador se encuentra en la misma fase física que los reactivos (ej. catálisis ácida acuosa).\nEn la catálisis {{c2::heterogénea::tipo 2}}, el catalizador opera en una fase distinta (ej. gases reactivos adsorbidos sobre platino sólido)."
                    }
                ]
            },
            {
                "note_id": "quim_04",
                "title": "Equilibrio Químico: Kc, Kp y Cociente Q",
                "x": 100.0,
                "y": 360.0,
                "tags": [
                    "Química",
                    "Equilibrio",
                    "Kc",
                    "Kp",
                    "Cociente Q"
                ],
                "note_type": "standard",
                "desired_retention": 0.88,
                "cards": [
                    {
                        "item_id": 1879936200263667482,
                        "type": "ClozeCard",
                        "title": "Relación entre Kp y Kc para Gases",
                        "text": "Para una reacción $aA(g) + bB(g) \\rightleftharpoons cC(g) + dD(g)$, la relación entre constantes es:\n$$K_p = {{c1::K_c (RT)^{\\Delta n_{(g)}}::fórmula Kp Kc}}$$\ndonde $\\Delta n_{(g)} = {{c2::(c+d) - (a+b)::cambio de moles gaseosos}}$."
                    },
                    {
                        "item_id": 1879936200264832354,
                        "type": "Flashcard",
                        "title": "Criterio de Evolución Espontánea con el Cociente Q",
                        "front": "Explique hacia dónde evoluciona espontáneamente una mezcla de reacción comparando $Q$ frente a $K$.",
                        "back": "1. <b>$Q < K$:</b> La concentración de productos es menor que en el equilibrio. La reacción evoluciona espontáneamente hacia la <b>derecha</b> ($\\to$, sentido directo, produciendo productos).<br>2. <b>$Q = K$:</b> El sistema se encuentra en <b>equilibrio dinámico</b> microscópico ($v_{\\text{dir}} = v_{\\text{inv}}$). No hay cambio macroscópico neto.<br>3. <b>$Q > K$:</b> Hay exceso de productos relativo a reactivos. La reacción evoluciona espontáneamente hacia la <b>izquierda</b> ($\\leftarrow$, sentido inverso, consumiendo productos y regenerando reactivos)."
                    },
                    {
                        "item_id": 1879936200265921157,
                        "type": "ClozeCard",
                        "title": "Actividad de Sólidos y Líquidos Puros en K",
                        "text": "En las expresiones matemáticas de $K_c$ y $K_p$, los sólidos puros y los solventes/líquidos puros {{c1::NO se incluyen (tienen actividad unitaria igual a 1)::regla de inclusión}}."
                    }
                ]
            },
            {
                "note_id": "quim_05",
                "title": "Principio de Le Châtelier y van 't Hoff",
                "x": 440.0,
                "y": 360.0,
                "tags": [
                    "Química",
                    "Le Châtelier",
                    "van 't Hoff",
                    "Perturbaciones"
                ],
                "note_type": "standard",
                "desired_retention": 0.88,
                "cards": [
                    {
                        "item_id": 1879936200266673336,
                        "type": "ClozeCard",
                        "title": "Efecto de Presión y Gases Inertes",
                        "text": "Al comprimir una mezcla gaseosa en equilibrio aumentando la presión total:\n- El sistema se desplaza hacia el miembro con {{c1::menor número de moles gaseosos::dirección del desplazamiento}}.\n- Si se añade un gas inerte (ej. He o Ar) a volumen constante, el equilibrio {{c2::NO se altera en absoluto::efecto a volumen constante}} pues las presiones parciales de los reactivos no cambian."
                    },
                    {
                        "item_id": 1879936200267996787,
                        "type": "Flashcard",
                        "title": "Efecto de la Temperatura y Ecuación de van 't Hoff",
                        "front": "¿Cómo afecta un aumento de temperatura a la constante de equilibrio $K$ en reacciones endotérmicas vs exotérmicas?",
                        "back": "La temperatura es la <b>única variable</b> que altera el valor numérico de $K$. Por la ecuación de van 't Hoff:<br>$$\\ln\\left(\\frac{K_2}{K_1}\\right) = -\\frac{\\Delta H^\\circ}{R}\\left(\\frac{1}{T_2} - \\frac{1}{T_1}\\right) = \\frac{\\Delta H^\\circ}{R}\\left(\\frac{T_2 - T_1}{T_1 T_2}\\right)$$<br>1. <b>Endotérmica ($\\Delta H^\\circ > 0$):</b> El calor actúa como reactivo. Aumentar $T$ incrementa el valor de $K$ (desplaza hacia productos).<br>2. <b>Exotérmica ($\\Delta H^\\circ < 0$):</b> El calor actúa como producto. Aumentar $T$ disminuye el valor de $K$ (desplaza hacia reactivos)."
                    }
                ]
            },
            {
                "note_id": "quim_06",
                "title": "Equilibrio Ácido-Base, pH y Disociación",
                "x": 780.0,
                "y": 360.0,
                "tags": [
                    "Química",
                    "Ácido-Base",
                    "pH",
                    "pOH",
                    "Ka"
                ],
                "note_type": "standard",
                "desired_retention": 0.88,
                "cards": [
                    {
                        "item_id": 1879936200268211045,
                        "type": "ClozeCard",
                        "title": "Autoionización del Agua y Relación pH-pOH",
                        "text": "A $25^\\circ\\text{C}$:\n- $K_w = [\\text{H}_3\\text{O}^+][\\text{OH}^-] = {{c1::1.0 \\times 10^{-14}::valor de Kw}}$\n- Relación fundamental: $\\text{pH} + \\text{pOH} = {{c2::14.0::suma}}$\n- Para pares ácido-base conjugados: $K_a \\cdot K_b = {{c3::K_w::producto Ka Kb}}$ y $\\text{p}K_a + \\text{p}K_b = {{c4::14::suma pKa pKb}}$."
                    },
                    {
                        "item_id": 1879936200269131270,
                        "type": "Flashcard",
                        "title": "Cálculo de pH en Ácido Débil Monoprótico",
                        "front": "¿Bajo qué criterio es válida la aproximación $[\\text{H}^+] = \\sqrt{K_a C_0}$ para un ácido débil monoprótico $HA$?",
                        "back": "Para $HA + \\text{H}_2\\text{O} \\rightleftharpoons A^- + \\text{H}_3\\text{O}^+$, el equilibrio exacto es:<br>$$K_a = \\frac{x^2}{C_0 - x}$$<br>1. La aproximación $C_0 - x \\approx C_0$ es válida si el grado de disociación es menor al 5% (regla del 5%), lo que equivale a la condición:<br>$$\\frac{C_0}{K_a} > 400$$<br>2. En dicho caso: $x = [\\text{H}^+] = \\sqrt{K_a C_0}$, lo que implica:<br>$$\\text{pH} = \\frac{1}{2}(\\text{p}K_a - \\log_{10} C_0)$$<br>Si $\\frac{C_0}{K_a} \\le 400$, es obligatorio resolver la ecuación cuadrática completa: $x^2 + K_a x - K_a C_0 = 0$."
                    }
                ]
            },
            {
                "note_id": "quim_07",
                "title": "Soluciones Buffer y Henderson-Hasselbalch",
                "x": 100.0,
                "y": 620.0,
                "tags": [
                    "Química",
                    "Buffer",
                    "Henderson-Hasselbalch",
                    "Amortiguador"
                ],
                "note_type": "standard",
                "desired_retention": 0.88,
                "cards": [
                    {
                        "item_id": 1879936200270509779,
                        "type": "ClozeCard",
                        "title": "Ecuación de Henderson-Hasselbalch",
                        "text": "El pH de una solución amortiguadora de ácido débil $HA$ y su sal $A^-$ se calcula como:\n$$\\text{pH} = {{c1::\\text{p}K_a + \\log_{10}\\left(\\frac{[A^-]}{[HA]}\\right)::ecuación de Henderson-Hasselbalch}}$$\nLa máxima capacidad reguladora se logra cuando $[A^-] = [HA]$, donde $\\text{pH} = {{c2::\\text{p}K_a::pH en máxima capacidad}}$."
                    },
                    {
                        "item_id": 1879936200271745703,
                        "type": "Flashcard",
                        "title": "Mecanismo de Amortiguamiento y Rango Útil",
                        "front": "Explique químicamente cómo reacciona un buffer acetato ($\\text{CH}_3\\text{COOH}/\\text{CH}_3\\text{COO}^-$) ante la adición de $\\text{H}^+$ y $\\text{OH}^-$, y cuál es su rango de amortiguamiento útil.",
                        "back": "1. <b>Adición de ácido fuerte ($\\text{H}^+$):</b> Reacciona con la base conjugada del buffer:<br>$$\\text{CH}_3\\text{COO}^- + \\text{H}^+ \\to \\text{CH}_3\\text{COOH}$$<br>Los iones $\\text{H}^+$ se transforman en ácido débil poco disociado, impidiendo la caída brusca de pH.<br>2. <b>Adición de base fuerte ($\\text{OH}^-$):</b> Reacciona con el ácido débil:<br>$$\\text{CH}_3\\text{COOH} + \\text{OH}^- \\to \\text{CH}_3\\text{COO}^- + \\text{H}_2\\text{O}$$<br>3. <b>Rango útil:</b> El buffer es efectivo en el intervalo $\\text{pH} = \\text{p}K_a \\pm 1$, correspondiente a relaciones de concentración entre 1:10 y 10:1."
                    }
                ]
            },
            {
                "note_id": "quim_08",
                "title": "Titulaciones y Curvas de Neutralización",
                "x": 440.0,
                "y": 620.0,
                "tags": [
                    "Química",
                    "Titulación",
                    "Equivalencia",
                    "Semiequivalencia"
                ],
                "note_type": "standard",
                "desired_retention": 0.88,
                "cards": [
                    {
                        "item_id": 1879936200273804612,
                        "type": "ClozeCard",
                        "title": "pH en el Punto de Equivalencia",
                        "text": "A $25^\\circ\\text{C}$ en el punto de equivalencia:\n- Ácido fuerte con Base fuerte: $\\text{pH} = {{c1::7.0 (neutro)::pH fuerte-fuerte}}$\n- Ácido débil con Base fuerte: $\\text{pH} {{c2::> 7.0 (básico)::pH débil-fuerte}}$ debido a la hidrólisis del anión ($A^- + \\text{H}_2\\text{O} \\rightleftharpoons HA + \\text{OH}^-$).\n- Base débil con Ácido fuerte: $\\text{pH} {{c3::< 7.0 (ácido)::pH fuerte-débil}}$ por hidrólisis del catión conjugado."
                    },
                    {
                        "item_id": 1879936200274793809,
                        "type": "Flashcard",
                        "title": "Punto de Semiequivalencia en Ácido Débil",
                        "front": "¿Qué propiedad notable ocurre exactamente en el punto de semiequivalencia ($V = V_{\\text{eq}} / 2$) durante la titulación de un ácido débil con base fuerte?",
                        "back": "En el punto de semiequivalencia se ha neutralizado exactamente la mitad del ácido débil inicial, por lo que:<br>$$[HA] = [A^-]$$<br>Aplicando la ecuación de Henderson-Hasselbalch:<br>$$\\text{pH} = \\text{p}K_a + \\log_{10}(1) = \\text{p}K_a$$<br>Por lo tanto, el pH experimental medido en el punto de semiequivalencia permite determinar directamente el $\\text{p}K_a$ del ácido analizado."
                    }
                ]
            },
            {
                "note_id": "quim_09",
                "title": "Redox y Método Ion-Electrón",
                "x": 780.0,
                "y": 620.0,
                "tags": [
                    "Química",
                    "Redox",
                    "Ion-Electrón",
                    "Oxidación",
                    "Reducción"
                ],
                "note_type": "standard",
                "desired_retention": 0.88,
                "cards": [
                    {
                        "item_id": 1879936200275847659,
                        "type": "ClozeCard",
                        "title": "Definiciones de Oxidación, Reducción y Electrodos",
                        "text": "- <b>Oxidación:</b> {{c1::Pérdida de electrones::electrones en oxidación}} (aumento de estado de oxidación). Ocurre en el {{c2::Ánodo::electrodo de oxidación}} (vocal-vocal).\n- <b>Reducción:</b> {{c3::Ganancia de electrones::electrones en reducción}} (disminución de estado de oxidación). Ocurre en el {{c4::Cátodo::electrodo de reducción}} (consonante-consonante)."
                    },
                    {
                        "item_id": 1879936200276637612,
                        "type": "ProofSequenceCard",
                        "title": "Balanceo Redox por Ion-Electrón en Medio Ácido",
                        "premise": "Balancear la reacción entre ion permanganato e ion oxalato en medio ácido: $\\text{MnO}_4^- + \\text{C}_2\\text{O}_4^{2-} \\to \\text{Mn}^{2+} + \\text{CO}_2$.",
                        "steps": [
                            "Semirreacción de oxidación: $\\text{C}_2\\text{O}_4^{2-} \\to 2\\text{CO}_2 + 2e^-$.",
                            "Semirreacción de reducción: $\\text{MnO}_4^- \\to \\text{Mn}^{2+}$.",
                            "Balancear oxígenos con 4 moléculas de agua: $\\text{MnO}_4^- \\to \\text{Mn}^{2+} + 4\\text{H}_2\\text{O}$.",
                            "Balancear hidrógenos con 8 protones: $\\text{MnO}_4^- + 8\\text{H}^+ \\to \\text{Mn}^{2+} + 4\\text{H}_2\\text{O}$.",
                            "Balancear cargas eléctricas añadiendo 5 electrones: $\\text{MnO}_4^- + 8\\text{H}^+ + 5e^- \\to \\text{Mn}^{2+} + 4\\text{H}_2\\text{O}$.",
                            "Multiplicar la oxidación por 5 y la reducción por 2 para igualar 10 electrones: $2\\text{MnO}_4^- + 16\\text{H}^+ + 5\\text{C}_2\\text{O}_4^{2-} \\to 2\\text{Mn}^{2+} + 10\\text{CO}_2 + 8\\text{H}_2\\text{O}$."
                        ]
                    }
                ]
            },
            {
                "note_id": "quim_10",
                "title": "Electroquímica, Nernst y Faraday",
                "x": 440.0,
                "y": 880.0,
                "tags": [
                    "Química",
                    "Electroquímica",
                    "Nernst",
                    "Faraday",
                    "Fem"
                ],
                "note_type": "standard",
                "desired_retention": 0.88,
                "cards": [
                    {
                        "item_id": 1879936200277628272,
                        "type": "ClozeCard",
                        "title": "FEM Estándar y Energía Libre de Gibbs",
                        "text": "La fuerza electromotriz estándar de celda es $E^\\circ_{\\text{celda}} = E^\\circ_{\\text{cátodo}} - E^\\circ_{\\text{ánodo}}$.\nSu relación termodinámica con la energía libre de Gibbs es:\n$$\\Delta G^\\circ = {{c1::-n F E^\\circ_{\\text{celda}}::relación Delta G y fem}}$$\nUna reacción redox es espontánea si $E^\\circ_{\\text{celda}} {{c2::> 0::condición de fem}}$ ($\\Delta G^\\circ < 0$)."
                    },
                    {
                        "item_id": 1879936200278767832,
                        "type": "Flashcard",
                        "title": "Ecuación de Nernst a 25°C y Constante de Equilibrio",
                        "front": "Escriba la Ecuación de Nernst a $25^\\circ\\text{C}$ para condiciones no estándar y su relación con la constante de equilibrio $K$.",
                        "back": "1. <b>Ecuación de Nernst a $298.15 \\, \\text{K}$:</b><br>$$E_{\\text{celda}} = E^\\circ_{\\text{celda}} - \\frac{0.0592}{n} \\log_{10} Q$$<br>2. <b>En el equilibrio dinámico:</b> La celda deja de producir corriente ($E_{\\text{celda}} = 0$) y $Q = K$:<br>$$0 = E^\\circ_{\\text{celda}} - \\frac{0.0592}{n} \\log_{10} K \\implies E^\\circ_{\\text{celda}} = \\frac{0.0592}{n} \\log_{10} K$$<br>lo que permite calcular constantes de equilibrio gigantescas o diminutas a partir de simples voltajes estándar."
                    },
                    {
                        "item_id": 1879936200279790263,
                        "type": "ClozeCard",
                        "title": "Leyes de Faraday de la Electrólisis",
                        "text": "La masa depositada en un electrodo por electrólisis de corriente $I$ durante un tiempo $t$ es:\n$$m = {{c1::\\frac{M \\cdot I \\cdot t}{n F}::fórmula de Faraday}}$$\ndonde $M$ es la masa molar, $F = 96485 \\, \\text{C/mol}$ y $n$ son los moles de electrones intercambiados por mol de sustancia depositada."
                    }
                ]
            }
        ],
        "edges": [
            {
                "source_id": "quim_01",
                "target_id": "quim_02",
                "label": "Cinética Integrada a Ecuación de Arrhenius"
            },
            {
                "source_id": "quim_02",
                "target_id": "quim_03",
                "label": "Energía de Activación a Catálisis"
            },
            {
                "source_id": "quim_01",
                "target_id": "quim_04",
                "label": "Velocidades a Equilibrio Dinámico"
            },
            {
                "source_id": "quim_04",
                "target_id": "quim_05",
                "label": "Constante de Equilibrio a Le Châtelier"
            },
            {
                "source_id": "quim_04",
                "target_id": "quim_06",
                "label": "Equilibrio a Disociación Ácido-Base"
            },
            {
                "source_id": "quim_06",
                "target_id": "quim_07",
                "label": "Pares Conjugados a Soluciones Buffer"
            },
            {
                "source_id": "quim_06",
                "target_id": "quim_08",
                "label": "Disociación a Titulaciones"
            },
            {
                "source_id": "quim_07",
                "target_id": "quim_08",
                "label": "Buffer a Zona Amortiguadora en Titulación"
            },
            {
                "source_id": "quim_09",
                "target_id": "quim_10",
                "label": "Balanceo Redox a FEM y Ecuación de Nernst"
            },
            {
                "source_id": "quim_04",
                "target_id": "quim_10",
                "label": "Cociente Q y K a Potencial de Celda"
            }
        ]
    },
    {
        "name": "OFG Muerte (Presentación y Guión)",
        "folder_path": "",
        "notes": [
            {
                "note_id": "ofg_01",
                "title": "Cosmovisión Homérica y Finitud Radical",
                "x": 100.0,
                "y": 100.0,
                "tags": [
                    "OFG Muerte",
                    "Homero",
                    "Hades",
                    "Escatología"
                ],
                "note_type": "standard",
                "desired_retention": 0.88,
                "cards": [
                    {
                        "item_id": 1879936200282288329,
                        "type": "ClozeCard",
                        "title": "El Inframundo Homérico y la Psyche como Sombra",
                        "text": "En la escatología arcaica griega, el Hades no contempla recompensas ni castigos morales.\nLa <i>psyche</i> subsiste únicamente como {{c1::un <i>eidolon</i> (sombra vaporosa desprovista de fuerza vital y memoria)::naturaleza del alma}} en los Prados Asfódelos."
                    },
                    {
                        "item_id": 1879936200283037733,
                        "type": "Flashcard",
                        "title": "La Sentencia Trágica de Aquiles en la Odisea",
                        "front": "¿Cuál es la célebre afirmación de Aquiles en el Canto XI de la <i>Odisea</i> y qué revela sobre la concepción griega de la muerte?",
                        "back": "Aquiles proclama a Odiseo:<br><i>«No intentes consolarme de la muerte, noble Odiseo. Preferiría ser siervo en la tierra de un labrador pobre antes que reinar sobre todos los muertos extintos.»</i><br><b>Interpretación:</b> La muerte en el mundo arcaico es un <b>despojo ontológico radical</b>. No hay consuelo teológico ni paraíso. Por eso, el único sentido y rescate posible frente al abismo radica en la memoria comunitaria viva (*mneme*) que preserva las hazañas del héroe."
                    },
                    {
                        "item_id": 1879936200284290732,
                        "type": "ClozeCard",
                        "title": "Finalidad Social del Rito Funerario Griego",
                        "text": "El ritual funerario griego no persigue la salvación del alma en el Más Allá, sino {{c1::la recomposición, orden y protección de la comunidad de los vivos::propósito central del rito}}."
                    }
                ]
            },
            {
                "note_id": "ofg_02",
                "title": "Dialéctica Sagrada: Míasma vs Ta Nomizómena",
                "x": 440.0,
                "y": 100.0,
                "tags": [
                    "OFG Muerte",
                    "Míasma",
                    "Purificación",
                    "Deber Religioso"
                ],
                "note_type": "standard",
                "desired_retention": 0.88,
                "cards": [
                    {
                        "item_id": 1879936200285522154,
                        "type": "ClozeCard",
                        "title": "Míasma y Ta Nomizómena",
                        "text": "- La contaminación e impureza ritual generada por el cadáver humano se denomina {{c1::*míasma*::impureza sagrada}}.\n- Los deberes consuetudinarios y honras debidas al difunto son {{c2::*ta nomizómena*::deber ritual}}."
                    },
                    {
                        "item_id": 1879936200286882983,
                        "type": "Flashcard",
                        "title": "La Tensión Dialéctica Sagrada en el Duelo Helénico",
                        "front": "¿En qué consiste la paradoja irresoluble entre el <i>míasma</i> y <i>ta nomizómena</i>?",
                        "back": "El cadáver en descomposición emana una impureza religiosa destructiva (*míasma*) que mancilla el orden cívico y cósmico. Sin embargo, el único modo de aplacar a los dioses y restituir el orden (*ta nomizómena*) exige que los parientes más cercanos toquen, laven, unjan y vistan directamente ese mismo cuerpo contaminante. El contacto con lo impuro es el único camino hacia la purificación y la piedad comunitaria."
                    },
                    {
                        "item_id": 1879936200287751810,
                        "type": "ClozeCard",
                        "title": "El Ardánion Purificador a la Entrada del Oikos",
                        "text": "A la puerta de la casa del difunto se colocaba {{c1::el *ardánion* (ánfora con agua traída de otra fuente)::ánfora exterior}} para que los visitantes se purificaran antes de retornar al espacio cívico."
                    }
                ]
            },
            {
                "note_id": "ofg_03",
                "title": "Fase I: La Próthesis",
                "x": 780.0,
                "y": 100.0,
                "tags": [
                    "OFG Muerte",
                    "Próthesis",
                    "Góos",
                    "Mujeres"
                ],
                "note_type": "standard",
                "desired_retention": 0.88,
                "cards": [
                    {
                        "item_id": 1879936200288294048,
                        "type": "ClozeCard",
                        "title": "La Próthesis y el Papel Femenino",
                        "text": "La primera fase ritual del funeral griego es la {{c1::*próthesis*::primera fase}}, el velatorio doméstico en el *oikos*.\nEl protagonismo absoluto recae en {{c2::las mujeres de la familia::protagonistas del velatorio}}, quienes lavan el cuerpo, lo ungen con perfumes, lo visten de blanco y entonan el {{c3::*góos* (lamento fúnebre desgarrador)::lamento cantado}}."
                    },
                    {
                        "item_id": 1879936200289556942,
                        "type": "Flashcard",
                        "title": "Orientación y Gestualidad en la Próthesis",
                        "front": "¿Cómo se disponía el cadáver en la <i>kline</i> y cuáles eran los gestos corporales codificados del lamento femenino?",
                        "back": "1. <b>Disposición:</b> El cuerpo reposaba sobre el lecho mortuorio (*kline*) con los pies apuntando rigurosamente hacia la puerta de salida de la casa, simbolizando su inminente partida del mundo de los vivos.<br>2. <b>Gestualidad ritualizada:</b> Las parientes rodeaban el lecho rasgándose las mejillas con las uñas, mesándose violentamente los cabellos y golpeándose el pecho al compás de cantos antifonales. Esta somatización del dolor no era caos, sino una canalización catártica culturalmente normada."
                    }
                ]
            },
            {
                "note_id": "ofg_04",
                "title": "Fase II: La Ékfora",
                "x": 100.0,
                "y": 360.0,
                "tags": [
                    "OFG Muerte",
                    "Ékfora",
                    "Cortejo",
                    "Cerámico",
                    "Polis"
                ],
                "note_type": "standard",
                "desired_retention": 0.88,
                "cards": [
                    {
                        "item_id": 1879936200290808550,
                        "type": "ClozeCard",
                        "title": "Definición y Horario de la Ékfora",
                        "text": "El traslado público del cadáver hacia el cementerio extramuros (el Cerámico) se denomina {{c1::*ékfora*::segunda fase}}.\nDebía realizarse estrictamente antes del alba para {{c2::evitar que los rayos sagrados del dios Helios fueran contaminados por el *míasma*::motivo del horario}}."
                    },
                    {
                        "item_id": 1879936200291751333,
                        "type": "Flashcard",
                        "title": "La Ékfora como Frontera Cívica y Conflicto Político",
                        "front": "¿Por qué la <i>ékfora</i> constituía el momento de mayor tensión política entre los linajes aristocráticos y la <i>polis</i>?",
                        "back": "Durante la <i>ékfora</i> el luto privado salía a las calles de la ciudad. Los linajes aristocráticos (*eupátridas*) utilizaban el cortejo procesional para desplegar su riqueza, carros, caballos y séquitos de plañideras contratadas, convirtiendo las exequias en demostraciones de poder dinástico y faccioso que amenazaban la cohesión democrática y avivaban disputas de sangre."
                    }
                ]
            },
            {
                "note_id": "ofg_05",
                "title": "Fase III: Sepultura y Perídeipnon",
                "x": 440.0,
                "y": 360.0,
                "tags": [
                    "OFG Muerte",
                    "Sepultura",
                    "Choai",
                    "Perídeipnon"
                ],
                "note_type": "standard",
                "desired_retention": 0.88,
                "cards": [
                    {
                        "item_id": 1879936200292602886,
                        "type": "ClozeCard",
                        "title": "Libaciones Choai y Banquete Fúnebre",
                        "text": "- Las libaciones de vino, miel, leche y aceite sobre la tumba se denominan {{c1::*choai*::ofrendas líquidas}}.\n- El banquete formal de retorno en el *oikos* purificado se llama {{c2::*perídeipnon*::banquete fúnebre}}, donde el difunto actúa simbólicamente como anfitrión de honor."
                    },
                    {
                        "item_id": 1879936200294186073,
                        "type": "Flashcard",
                        "title": "Función Psicosocial del Perídeipnon",
                        "front": "¿Qué función psicológica y comunitaria cumplía el <i>perídeipnon</i> en la resolución del duelo?",
                        "back": "El <i>perídeipnon</i> señala la clausura del duelo agudo y el vencimiento de la contaminación (*míasma*). Al sentarse juntos a comer tras lavar sus cuerpos, los familiares restauran el apetito biológico y reafirman su pacto social. El difunto es despedido solemnemente pero su ausencia ya no paraliza al grupo: la comunidad reasume su vida productiva y reproductiva en la <i>polis</i>."
                    }
                ]
            },
            {
                "note_id": "ofg_06",
                "title": "Arqueología: Lekythos y Óbolo",
                "x": 780.0,
                "y": 360.0,
                "tags": [
                    "OFG Muerte",
                    "Arqueología",
                    "Lekythos",
                    "Óbolo",
                    "Caronte"
                ],
                "note_type": "standard",
                "desired_retention": 0.88,
                "cards": [
                    {
                        "item_id": 1879936200295172133,
                        "type": "ClozeCard",
                        "title": "El Lekythos de Fondo Blanco",
                        "text": "El vaso cerámico exclusivo para ofrendas funerarias con pinturas de Hermes Psicopompo y Caronte es el {{c1::*lekythos* (lécito)::vaso funerario}}."
                    },
                    {
                        "item_id": 1879936200296539317,
                        "type": "Flashcard",
                        "title": "La Economía Ritual del Lekythos con Cámara Ciega",
                        "front": "¿Qué hallazgo arqueológico reveló el interior de muchos *lekythoi* de fondo blanco y qué demuestra sobre la economía funeraria?",
                        "back": "Las excavaciones revelaron que muchos *lekythoi* áticos poseían una <b>cámara ciega interior</b>: una pequeña cápsula en el cuello que contenía apenas una fracción del aceite o perfume de lujo, manteniendo el resto del vaso vacío. Esto demuestra el pragmatismo ático: la familia cumplía con el decoro sagrado y la apariencia exterior requerida por la piedad comunitaria sin incurrir en un gasto económico ruinoso."
                    },
                    {
                        "item_id": 1879936200298231299,
                        "type": "Flashcard",
                        "title": "El Significado Real del Óbolo Fúnebre",
                        "front": "¿Por qué el óbolo depositado en la boca del cadáver NO era un simple peaje mercantil para Caronte?",
                        "back": "Lejos de una mera transacción comercial, el óbolo operaba como una <b>credencial cívica y moral</b>. Demostraba que el muerto no había perecido en el desamparo ni como un paria insepulto: poseía parientes legítimos con solvencia moral y cívica que habían ejecutado rigurosamente los deberes sagrados (*ta nomizómena*), acreditando su estatus de ciudadano con honras fúnebres completas."
                    }
                ]
            },
            {
                "note_id": "ofg_07",
                "title": "Leyes de Solón (594 a.C.) y Control del Luto",
                "x": 100.0,
                "y": 620.0,
                "tags": [
                    "OFG Muerte",
                    "Solón",
                    "Leyes Suntuarias",
                    "Polis",
                    "Política"
                ],
                "note_type": "standard",
                "desired_retention": 0.88,
                "cards": [
                    {
                        "item_id": 1879936200298899686,
                        "type": "ClozeCard",
                        "title": "Reformas Suntuarias de Solón",
                        "text": "En el 594 a.C., las leyes de Solón regularon el duelo:\n- Prohibieron {{c1::desgarrarse las mejillas con las uñas::prohibición corporal}} y contratar plañideras profesionales ajenas al *oikos*.\n- Limitaron las vestiduras mortuorias a un máximo de {{c2::tres mantos::límite de mantos}} y prohibieron el sacrificio de {{c3::bueyes::animal prohibido}} en la tumba."
                    },
                    {
                        "item_id": 1879936200300544223,
                        "type": "Flashcard",
                        "title": "El Sentido Político de las Reformas de Solón",
                        "front": "¿Cuál fue el verdadero objetivo político de Solón al restringir la visibilidad y el llanto de las mujeres en los funerales?",
                        "back": "Las disputas aristocráticas y las <b>venganzas de sangre</b> (*vendettas* clánicas) encontraban su mecha en los velorios públicos, donde el llanto exacerbado de las mujeres incitaba a los parientes masculinos a la revancha violenta. Al subordinar y privatizar el luto en el hogar y prohibir las exhibiciones de poder aristocrático, Solón neutralizó el tribalismo nobiliario y consolidó el monopolio cívico de la <i>polis</i> y la ley común."
                    }
                ]
            },
            {
                "note_id": "ofg_08",
                "title": "Dexiosis y la Serenidad Clásica",
                "x": 440.0,
                "y": 620.0,
                "tags": [
                    "OFG Muerte",
                    "Dexiosis",
                    "Hegeso",
                    "Ethos",
                    "Mneme"
                ],
                "note_type": "standard",
                "desired_retention": 0.88,
                "cards": [
                    {
                        "item_id": 1879936200300648642,
                        "type": "ClozeCard",
                        "title": "El Motivo de la Dexiosis",
                        "text": "En las estelas de mármol del siglo IV a.C., el gesto solemne de unión de manos entre el difunto y el allegado vivo se denomina {{c1::*dexiosis*::motivo del apretón de manos}}.\nRepresenta una despedida amorosa teñida de serena dignidad, conectando el mundo terrenal con el Hades sin desesperación violenta."
                    },
                    {
                        "item_id": 1879936200302305702,
                        "type": "Flashcard",
                        "title": "El Ethos Clásico en la Estela de Hegeso",
                        "front": "¿Cómo se refleja la serenidad clásica en la Célebre Estela de Hegeso (Cerámico de Atenas)?",
                        "back": "Hegeso aparece sentada en un sillón elegante contemplando con calma una joya que extrae de un cofre sostenido por su esclava en pie. No hay lágrimas, cadáveres ni agonía. El arte clásico ático elige recordar a la difunta en la cumbre de su belleza y armonía ética (*kalokagathía*), inmortalizando su memoria (*mneme*) ante los ojos cívicos de la posteridad."
                    }
                ]
            },
            {
                "note_id": "ofg_09",
                "title": "Guión de Exposición: Turnos y Minutaje",
                "x": 780.0,
                "y": 620.0,
                "tags": [
                    "OFG Muerte",
                    "Guión",
                    "Exposición",
                    "Minutaje",
                    "Cronograma"
                ],
                "note_type": "standard",
                "desired_retention": 0.88,
                "cards": [
                    {
                        "item_id": 1879936200302809465,
                        "type": "Flashcard",
                        "title": "Estructura Coral de los 4 Expositores (10:00 Exactos)",
                        "front": "¿Cómo se distribuyen los 4 turnos cronométricos de la presentación de 10 minutos (2:30 por expositor)?",
                        "back": "1. <b>Turno I (Expositor 1, 0:00 - 2:30, Láminas 1-3):</b> Apertura formal, despojo ontológico en la <i>Odisea</i> y dialéctica sagrada (*míasma* vs. *ta nomizómena*). Relevo fluido.<br>2. <b>Turno II (Expositor 2, 2:30 - 5:00, Láminas 4-6):</b> Tríptico procesal en la arqueología (*próthesis*, *ékfora*, sepultura, libaciones *choai* y banquete *perídeipnon*). Relevo fluido.<br>3. <b>Turno III (Expositor 3, 5:00 - 7:30, Láminas 7-9):</b> Arqueología del *lekythos* (cámara ciega y óbolo), leyes suntuarias de Solón (594 a.C.) y estética de la memoria (*dexiosis*). Relevo fluido.<br>4. <b>Turno IV (Expositor 4, 7:30 - 10:00, Láminas 10-12):</b> Diálogo formativo con el presente, Tres Tesis Vertebrales y dinamización activa del plenario de discusión."
                    },
                    {
                        "item_id": 1879936200303853126,
                        "type": "ClozeCard",
                        "title": "Regla Estricta de Locución Sin Preguntas Retóricas",
                        "text": "A lo largo del desarrollo de las láminas 1 a 11 está estrictamente {{c1::prohibido formular preguntas retóricas (debe ser 100% afirmativo y directo)::regla de locución}}.\nLas preguntas sólo deben formularse en la lámina 12 final para abrir el debate colectivo."
                    }
                ]
            },
            {
                "note_id": "ofg_10",
                "title": "Conclusiones y Preguntas de Debate",
                "x": 440.0,
                "y": 880.0,
                "tags": [
                    "OFG Muerte",
                    "Conclusiones",
                    "Debate",
                    "Tesis"
                ],
                "note_type": "standard",
                "desired_retention": 0.88,
                "cards": [
                    {
                        "item_id": 1879936200305684935,
                        "type": "Flashcard",
                        "title": "Las Tres Tesis Vertebrales de la Finitud Helénica",
                        "front": "Sintetice las tres tesis académicas conclusivas de la investigación sobre la muerte en la Grecia clásica.",
                        "back": "1. <b>Tesis 1:</b> El rito no es una salvación individual del alma, sino una tecnología ritual colectiva imprescindible para sanar y recomponer la comunidad de los vivos.<br>2. <b>Tesis 2:</b> La regulación del duelo por Solón representa el nacimiento de la política cívica moderna, subordinando la venganza clánica al imperio de la ley común.<br>3. <b>Tesis 3:</b> Frente al ocultamiento e higienización médica moderna de la muerte, los griegos asumieron la finitud afrontando directamente la materia impura y sublimándola mediante gestos corporales compartidos y arte de la memoria imperecedera."
                    },
                    {
                        "item_id": 1879936200306384328,
                        "type": "ClozeCard",
                        "title": "Problema Deliberativo para el Plenario",
                        "text": "¿En qué medida el confinamiento hospitalario aséptico de la agonía en la sociedad moderna ha sumido al doliente en un estado de {{c1::desamparo simbólico::diagnóstico del duelo moderno}} frente al poder curativo del rito colectivo ancestral?"
                    }
                ]
            }
        ],
        "edges": [
            {
                "source_id": "ofg_01",
                "target_id": "ofg_02",
                "label": "Escatología a Dialéctica del Míasma"
            },
            {
                "source_id": "ofg_02",
                "target_id": "ofg_03",
                "label": "Deber Ritual a Velatorio Doméstico"
            },
            {
                "source_id": "ofg_03",
                "target_id": "ofg_04",
                "label": "Próthesis a Ékfora Procesional"
            },
            {
                "source_id": "ofg_04",
                "target_id": "ofg_05",
                "label": "Cortejo a Sepultura y Banquete"
            },
            {
                "source_id": "ofg_02",
                "target_id": "ofg_06",
                "label": "Ofrendas Sagradas a Arqueología Material"
            },
            {
                "source_id": "ofg_04",
                "target_id": "ofg_07",
                "label": "Cortejo Aristocrático a Leyes de Solón"
            },
            {
                "source_id": "ofg_05",
                "target_id": "ofg_08",
                "label": "Sepultura a Monumentos y Dexiosis"
            },
            {
                "source_id": "ofg_03",
                "target_id": "ofg_09",
                "label": "Fases Prácticas a Guión y Minutaje"
            },
            {
                "source_id": "ofg_07",
                "target_id": "ofg_09",
                "label": "Historia y Política a Estructura Oral"
            },
            {
                "source_id": "ofg_08",
                "target_id": "ofg_10",
                "label": "Memoria Fúnebre a Conclusiones y Debate"
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
