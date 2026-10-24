"""
Química para Ingenieros (I2) - QIM100E
Full Comprehensive Course Builder for Morphism SRS Plus.
Detailed coverage of Cinética Química, Equilibrio Químico, Ácido-Base, and Redox/Electroquímica.
"""

from morphism.core.models import Course, NoteNode, NoteEdge, Flashcard, ClozeCard, ProofSequenceCard

def build_quimica_course() -> Course:
    course = Course(name="Química para Ingenieros (I2)")

    # --------------------------------------------------------------------------
    # 0. Unidades de Concentración y Dilución
    # --------------------------------------------------------------------------
    n0 = NoteNode("quim_00", "Disoluciones: Unidades de Concentración y Dilución", 80.0, 40.0, ["Química", "Disoluciones", "Concentración"])
    n0.add_card(ClozeCard("Fórmulas Fundamentales de Concentración",
        r"Definiciones de unidades de concentración para mezclas homogéneas:"
        r"\n- Molaridad ($M$): $$M = {{c1::\frac{n_{\text{soluto}}}{V_{\text{disolución (L)}}}::moles por litro de disolución}}$$"
        r"\n- Molalidad ($m$): $$m = {{c2::\frac{n_{\text{soluto}}}{m_{\text{disolvente (kg)}}}::moles por kg de disolvente}}$$ (no varía con la temperatura)."
        r"\n- Fracción Molar ($X_A$): $$X_A = {{c3::\frac{n_A}{n_{\text{total}}}::fracción adimensional}}$$ con $\sum X_i = 1$."
        r"\n- Ley de Dilución: $$C_1 V_1 = {{c4::C_2 V_2::conservación de moles de soluto}}$$."))
    course.notes.append(n0)

    # --------------------------------------------------------------------------
    # 1. Velocidad de Reacción y Ley Diferencial
    # --------------------------------------------------------------------------
    n1 = NoteNode("quim_01", "Velocidad de Reacción y Expresiones Estequiométricas", 380.0, 40.0, ["Química", "Cinética", "Velocidad"])
    n1.add_card(ClozeCard("Expresión Diferencial de la Velocidad de Reacción",
        r"Para una reacción química general: $$a A + b B \longrightarrow c C + d D$$"
        r"\nLa velocidad de reacción instantánea $v$ se define normalizada por los coeficientes estequiométricos:"
        r"\n$$v = {{c1::-\frac{1}{a}\frac{d[A]}{dt} = -\frac{1}{b}\frac{d[B]}{dt} = +\frac{1}{c}\frac{d[C]}{dt} = +\frac{1}{d}\frac{d[D]}{dt}::expresión diferencial estequiométrica}}$$"
        r"\nLos signos negativos en reactivos indican que {{c2::se consumen::disminución temporal}}, y los positivos en productos indican que {{c3::se forman::aparición temporal}}."))
    n1.add_card(Flashcard("Ley Experimental de Velocidad y Órdenes de Reacción",
        r"Explique la diferencia fundamental entre los órdenes de reacción ($m, n$) y los coeficientes estequiométricos ($a, b$) en la ley de velocidad $v = k [A]^m [B]^n$.",
        r"1. <b>Ley de Velocidad:</b> $v = k [A]^m [B]^n$, donde $k$ es la constante de velocidad, $m$ es el orden parcial respecto a $A$, $n$ es el orden parcial respecto a $B$, y $(m + n)$ es el <b>orden global</b>.<br>"
        r"2. <b>Diferencia crucial:</b> Los órdenes de reacción $m$ y $n$ <b>no</b> tienen por qué coincidir con los coeficientes estequiométricos $a$ y $b$. Los órdenes son parámetros puramente <b>experimentales</b> determinados por el mecanismo de reacción y el paso determinante de la velocidad (RDS).<br>"
        r"3. Solo en <b>reacciones elementales</b> (un solo choque molecular directo) los órdenes coinciden con la molecularidad estequiométrica."))
    course.notes.append(n1)

    # --------------------------------------------------------------------------
    # 2. Método de Velocidades Iniciales y Unidades de k
    # --------------------------------------------------------------------------
    n2 = NoteNode("quim_02", "Método de Velocidades Iniciales y Unidades de k", 680.0, 40.0, ["Química", "Cinética", "Constante k"])
    n2.add_card(ClozeCard("Unidades de la Constante de Velocidad k",
        r"Dado que la velocidad siempre tiene unidades de $[v] = M \cdot s^{-1} = \frac{\text{mol}}{\text{L}\cdot s}$, las unidades de $k$ dependen estrictamente del <b>orden global</b> $n_{\text{glob}}$:"
        r"\n$$[k] = {{c1::M^{1 - n_{\text{glob}}} \cdot s^{-1} = \left(\frac{\text{mol}}{\text{L}}\right)^{1 - n_{\text{glob}}} \cdot s^{-1}::unidades de k}}$$"
        r"\n- Orden 0: $[k] = M \cdot s^{-1}$."
        r"\n- Orden 1: $[k] = s^{-1}$."
        r"\n- Orden 2: $[k] = M^{-1} \cdot s^{-1} = \text{L}\cdot\text{mol}^{-1}\cdot s^{-1}$."))
    n2.add_card(Flashcard("Determinación de Órdenes por Cociente de Experimentos",
        r"Si al duplicar la concentración $[A]_0$ manteniendo $[B]_0$ constante la velocidad inicial se cuadruplica, ¿cuál es el orden parcial respecto a $A$?",
        r"Por la ley de velocidad: $\frac{v_2}{v_1} = \left(\frac{[A]_2}{[A]_1}\right)^m$.<br>"
        r"Sustituyendo los datos: $4 = (2)^m \implies 2^2 = 2^m \implies m = 2$.<br>"
        r"Por lo tanto, la reacción es de <b>segundo orden</b> respecto a $A$."))
    course.notes.append(n2)

    # --------------------------------------------------------------------------
    # 3. Leyes de Velocidad Integradas: Orden 0, 1 y 2
    # --------------------------------------------------------------------------
    n3 = NoteNode("quim_03", "Leyes Cinéticas Integradas y Vida Media", 980.0, 40.0, ["Química", "Cinética", "Vida Media"])
    n3.add_card(ClozeCard("Comparativa de Leyes Integradas y Linealización",
        r"Ecuaciones integradas de concentración vs tiempo para $A \to \text{productos}$:"
        r"\n- <b>Orden 0:</b> $[A]_t = {{c1::[A]_0 - kt::ecuación orden 0}}$ | Gráfico lineal: $[A]$ vs $t$ (pendiente $-k$) | Vida media: $t_{1/2} = {{c2::\frac{[A]_0}{2k}::vida media orden 0}}$."
        r"\n- <b>Orden 1:</b> $\ln[A]_t = {{c3::\ln[A]_0 - kt::ecuación orden 1}}$ | Gráfico lineal: $\ln[A]$ vs $t$ (pendiente $-k$) | Vida media: $t_{1/2} = {{c4::\frac{\ln 2}{k} \approx \frac{0.693}{k}::vida media orden 1}}$ (independiente de $[A]_0$!)."
        r"\n- <b>Orden 2:</b> $\frac{1}{[A]_t} = {{c5::\frac{1}{[A]_0} + kt::ecuación orden 2}}$ | Gráfico lineal: $\frac{1}{[A]}$ vs $t$ (pendiente $+k$) | Vida media: $t_{1/2} = {{c6::\frac{1}{k[A]_0}::vida media orden 2}}$."))
    course.notes.append(n3)

    # --------------------------------------------------------------------------
    # 4. Condiciones de Pseudo-Primer Orden
    # --------------------------------------------------------------------------
    n4 = NoteNode("quim_04", "Condiciones de Pseudo-Primer Orden", 80.0, 240.0, ["Química", "Cinética", "Pseudo-Orden"])
    n4.add_card(Flashcard("Estrategia de Exceso de Reactivo para Pseudo-Orden",
        r"Explique cómo se diseñan las condiciones experimentales de pseudo-primer orden para estudiar reacciones de orden superior como $v = k [A] [B]$.",
        r"1. <b>Reactivo en gran exceso:</b> Se fija $[B]_0 \gg [A]_0$ (por ejemplo, $[B]_0$ cien veces mayor que $[A]_0$).<br>"
        r"2. A medida que avanza la reacción y $[A]$ se consume por completo, la concentración $[B]$ prácticamente no varía: $[B]_t \approx [B]_0 = \text{constante}$.<br>"
        r"3. La ley de velocidad se simplifica a: $v = k_{\text{obs}}[A]$, donde $k_{\text{obs}} = k [B]_0$ es la constante aparente de pseudo-primer orden.<br>"
        r"4. Esto permite utilizar las ecuaciones lineales simples de primer orden ($\ln[A]$ vs $t$) para hallar $k_{\text{obs}}$, y repitiendo el experimento a distintos $[B]_0$ se despeja la constante real $k$."))
    course.notes.append(n4)

    # --------------------------------------------------------------------------
    # 5. Teoría de Arrhenius y Perfiles Energéticos
    # --------------------------------------------------------------------------
    n5 = NoteNode("quim_05", "Ecuación de Arrhenius y Energía de Activación", 380.0, 240.0, ["Química", "Arrhenius", "Energía Activación"])
    n5.add_card(ClozeCard("Ecuación de Arrhenius y Linealización",
        r"Dependencia de la constante de velocidad con la temperatura absoluta $T$:"
        r"\n$$k = {{c1::A e^{-E_a / RT}::ecuación de Arrhenius}}$$"
        r"\n- $E_a$: Energía de activación (energía mínima requerida para formar el complejo activado)."
        r"\n- $A$: Factor preexponencial de frecuencia (frecuencia de colisiones con orientación espacial favorable)."
        r"\n- Linealización: $$\ln k = {{c2::\ln A - \frac{E_a}{R}\left(\frac{1}{T}\right)::forma lineal de Arrhenius}}$$ (gráfico $\ln k$ vs $1/T$ tiene pendiente $-\frac{E_a}{R}$)."
        r"\n- Ecuación de dos temperaturas: $$\ln\left(\frac{k_2}{k_1}\right) = {{c3::-\frac{E_a}{R}\left(\frac{1}{T_2} - \frac{1}{T_1}\right) = \frac{E_a}{R}\left(\frac{T_2 - T_1}{T_1 T_2}\right)::fórmula de 2 puntos}}$$."))
    n5.add_card(Flashcard("Perfiles de Energía Potencial y Catálisis",
        r"¿Cómo se relacionan las energías de activación directa e inversa con el cambio de entalpía $\Delta H$, y cuál es el efecto exacto de un catalizador?",
        r"1. <b>Relación entálpica:</b> $\Delta H_{\text{reacción}} = E_{a,\text{directa}} - E_{a,\text{inversa}}$.<br>"
        r"Si $E_{a,\text{dir}} > E_{a,\text{inv}} \implies \Delta H > 0$ (endotérmica).<br>"
        r"Si $E_{a,\text{dir}} < E_{a,\text{inv}} \implies \Delta H < 0$ (exotérmica).<br>"
        r"2. <b>Efecto del catalizador:</b> Ofrece una ruta mecanística alterna con una menor energía de activación ($E_a' < E_a$), aumentando $k$ drásticamente.<br>"
        r"3. <b>Invariantes:</b> Un catalizador <b>no</b> modifica el $\Delta H$ de la reacción, <b>no</b> altera las energías iniciales ni finales, y <b>no</b> cambia la constante de equilibrio $K$."))
    course.notes.append(n5)

    # --------------------------------------------------------------------------
    # 6. Constantes de Equilibrio Kc y Kp
    # --------------------------------------------------------------------------
    n6 = NoteNode("quim_06", "Equilibrio Químico: Constantes Kc y Kp", 680.0, 240.0, ["Química", "Equilibrio", "Kc y Kp"])
    n6.add_card(ClozeCard("Relación Fundamental entre Kc y Kp",
        r"Para una reacción en fase gaseosa: $a A(g) + b B(g) \rightleftharpoons c C(g) + d D(g)$:"
        r"\n- Constante en concentraciones molares: $$K_c = \frac{[C]^c [D]^d}{[A]^a [B]^b}$$"
        r"\n- Constante en presiones parciales: $$K_p = \frac{P_C^c P_D^d}{P_A^a P_B^b}$$"
        r"\n- Relación termodinámica ideal: $$K_p = {{c1::K_c (R T)^{\Delta n_{\text{gas}}}::conversión Kc a Kp}}$$"
        r"donde $\Delta n_{\text{gas}} = {{c2::(c + d) - (a + b)::variación de moles gaseosos}}$$, y $R = 0.08206 \text{ atm}\cdot\text{L}/(\text{mol}\cdot\text{K})$."))
    n6.add_card(Flashcard("Equilibrios Heterogéneos y Omisión de Sólidos y Líquidos Puros",
        r"¿Por qué los sólidos puros (s) y los líquidos puros (l) no se incluyen en las expresiones de $K_c$ o $K_p$?",
        r"En termodinámica química, las constantes de equilibrio se escriben en términos de <b>actividades químicas</b> ($a_i$).<br>"
        r"Para sólidos puros y líquidos puros bajo presiones ordinarias, la concentración molar es constante (su densidad dividida por la masa molar no cambia) y su actividad estándar es idéntica a la unidad: $a_{\text{sólido}} = 1$, $a_{\text{líquido}} = 1$.<br>"
        r"Ejemplo: Para $\text{CaCO}_3(s) \rightleftharpoons \text{CaO}(s) + \text{CO}_2(g)$, $K_c = [\text{CO}_2]$ y $K_p = P_{\text{CO}_2}$."))
    course.notes.append(n6)

    # --------------------------------------------------------------------------
    # 7. Cociente de Reacción Q y Principio de Le Chatelier
    # --------------------------------------------------------------------------
    n7 = NoteNode("quim_07", "Cociente Q y Principio de Le Chatelier", 980.0, 240.0, ["Química", "Le Chatelier", "Cociente Q"])
    n7.add_card(ClozeCard("Comparación Q vs K y Sentido Espontáneo de Avance",
        r"El cociente de reacción $Q$ tiene la misma forma matemática que $K$, pero evaluado con las concentraciones instantáneas no necesariamente en equilibrio:"
        r"\n- Si $Q < K$: Existen menos productos de los requeridos; la reacción neta avanza hacia la {{c1::derecha (productos)::sentido directo}} ($\longrightarrow$)."
        r"\n- Si $Q > K$: Existen más productos de los debidos; la reacción neta retrocede hacia la {{c2::izquierda (reactivos)::sentido inverso}} ($\longleftarrow$)."
        r"\n- Si $Q = K$: El sistema se encuentra en {{c3::equilibrio químico dinámico::estado estacionario}}."))
    n7.add_card(Flashcard("Perturbaciones de Le Chatelier: Presión, Volumen y Gas Inerte",
        r"Analice el desplazamiento del equilibrio por el Principio de Le Chatelier ante: 1) Disminución de volumen (aumento de presión), 2) Adición de gas inerte a volumen constante, 3) Adición de gas inerte a presión constante.",
        r"1. <b>Disminución de volumen ($P \uparrow$):</b> El sistema se desplaza hacia el lado con <b>menor número de moles gaseosos</b> ($\Delta n_{\text{gas}}$ menor) para aliviar el aumento de presión.<br>"
        r"2. <b>Gas inerte a $V = \text{cte}$ (recipiente rígido):</b> La presión total aumenta, pero las presiones parciales de cada gas reaccionante ($P_i = n_i R T / V$) <b>permanecen idénticas</b>. $Q$ no cambia, por lo que el equilibrio <b>no se desplaza</b>.<br>"
        r"3. <b>Gas inerte a $P = \text{cte}$ (émbolo móvil):</b> El volumen total debe expandirse. Esto diluye las concentraciones y disminuye las presiones parciales, desplazando el equilibrio hacia el lado con <b>mayor número de moles gaseosos</b>."))
    course.notes.append(n7)

    # --------------------------------------------------------------------------
    # 8. Efecto Térmico: Ecuación de Van 't Hoff
    # --------------------------------------------------------------------------
    n8 = NoteNode("quim_08", "Temperatura en el Equilibrio y Ecuación de Van 't Hoff", 80.0, 440.0, ["Química", "Van 't Hoff", "Termodinámica"])
    n8.add_card(ClozeCard("Ecuación de Van 't Hoff y Termodinámica",
        r"La única perturbación que altera el valor numérico de la constante de equilibrio $K$ es el cambio de <b>temperatura</b>:"
        r"\n$$\ln\left(\frac{K_2}{K_1}\right) = {{c1::-\frac{\Delta H^\circ}{R}\left(\frac{1}{T_2} - \frac{1}{T_1}\right)::ecuación de Van 't Hoff}}$$"
        r"\n- Reacción Endotérmica ($\Delta H^\circ > 0$, el calor actúa como reactivo): Al aumentar $T \implies$ {{c2::$K$ aumenta y se desplaza a productos::comportamiento endotérmico}}."
        r"\n- Reacción Exotérmica ($\Delta H^\circ < 0$, el calor actúa como producto): Al aumentar $T \implies$ {{c3::$K$ disminuye y se desplaza a reactivos::comportamiento exotérmico}}."))
    course.notes.append(n8)

    # --------------------------------------------------------------------------
    # 9. Autoionización del Agua y Ácidos Fuertes
    # --------------------------------------------------------------------------
    n9 = NoteNode("quim_09", "Autoionización del Agua y Escalas de pH y pOH", 380.0, 440.0, ["Química", "Ácido-Base", "pH"])
    n9.add_card(ClozeCard("Autoionización del Agua y Kw",
        r"En disolución acuosa a $25^\circ\text{C}$:"
        r"\n$$2 \text{H}_2\text{O}(l) \rightleftharpoons \text{H}_3\text{O}^+(aq) + \text{OH}^-(aq)$$"
        r"\n- Producto iónico del agua: $$K_w = [\text{H}^+][\text{OH}^-] = {{c1::1.0 \times 10^{-14}::valor de Kw a 25C}}$$"
        r"\n- Escalas logarítmicas: $\text{pH} = -\log[\text{H}^+]$ y $\text{pOH} = -\log[\text{OH}^-]$."
        r"\n- Relación fundamental: $$\text{pH} + \text{pOH} = {{c2::14.00::suma a 25C}}$$ (a mayor temperatura, como la disociación es endotérmica, $K_w$ aumenta y el pH neutro disminuye)."))
    course.notes.append(n9)

    # --------------------------------------------------------------------------
    # 10. Ácidos y Bases Débiles y Regla del 5%
    # --------------------------------------------------------------------------
    n10 = NoteNode("quim_10", "Ácidos Débiles, Tabla ICE y Regla del 5%", 680.0, 440.0, ["Química", "Ácidos Débiles", "Tabla ICE"])
    n10.add_card(ClozeCard("Tabla ICE y la Regla del 5%",
        r"Para un ácido monoprótico débil: $\text{HA} + \text{H}_2\text{O} \rightleftharpoons \text{H}_3\text{O}^+ + \text{A}^-$ con concentración inicial $C_0$:"
        r"\nPor tabla ICE en equilibrio: $[\text{HA}] = C_0 - x$, $[\text{H}^+] = x$, $[\text{A}^-] = x$."
        r"\n$$K_a = \frac{x^2}{C_0 - x}$$"
        r"\n- <b>Regla del 5% / Criterio de los 400:</b> Si {{c1::$\frac{C_0}{K_a} > 400$::criterio de aproximación}}, se puede despreciar $x$ frente a $C_0$ ($C_0 - x \approx C_0$):"
        r"\n$$x = [\text{H}^+] \approx {{c2::\sqrt{K_a C_0}::fórmula simplificada}}$$."
        r"\nSi el porcentaje de ionización $\alpha = \frac{x}{C_0}\times 100\% > 5\%$, debe resolverse la ecuación cuadrática exacta."))
    n10.add_card(Flashcard("Relación entre Pares Ácido-Base Conjugados",
        r"Deduzca la relación entre la constante de acidez $K_a$ de un ácido débil y la constante de basicidad $K_b$ de su base conjugada.",
        r"1. Ácido: $\text{HA} + \text{H}_2\text{O} \rightleftharpoons \text{H}_3\text{O}^+ + \text{A}^-$, con $K_a = \frac{[\text{H}_3\text{O}^+][\text{A}^-]}{[\text{HA}]}$.<br>"
        r"2. Base conjugada: $\text{A}^- + \text{H}_2\text{O} \rightleftharpoons \text{HA} + \text{OH}^-$, con $K_b = \frac{[\text{HA}][\text{OH}^-]}{[\text{A}^-]}$.<br>"
        r"3. Multiplicando ambas constantes:<br>"
        r"$$K_a \cdot K_b = \left(\frac{[\text{H}_3\text{O}^+][\text{A}^-]}{[\text{HA}]}\right)\left(\frac{[\text{HA}][\text{OH}^-]}{[\text{A}^-]}\right) = [\text{H}_3\text{O}^+][\text{OH}^-] = K_w$$<br>"
        r"4. Tomando $-\log$: $\text{p}K_a + \text{p}K_b = \text{p}K_w = 14.00$ a $25^\circ\text{C}$."))
    course.notes.append(n10)

    # --------------------------------------------------------------------------
    # 11. Hidrólisis de Sales
    # --------------------------------------------------------------------------
    n11 = NoteNode("quim_11", "Hidrólisis de Sales Ácidas y Básicas", 980.0, 440.0, ["Química", "Hidrólisis", "Sales"])
    n11.add_card(Flashcard("Diagnóstico del Comportamiento Ácido-Base de Sales",
        r"Clasifique el carácter de las disoluciones acuosas de: 1) NaCl, 2) NH4Cl, 3) CH3COONa, 4) NH4F.",
        r"1. <b>NaCl (Ácido fuerte HCl + Base fuerte NaOH):</b> Ningún ión se hidroliza. Disolución <b>neutra</b> ($\text{pH} = 7$).<br>"
        r"2. <b>NH4Cl (Ácido fuerte HCl + Base débil NH3):</b> El catión amonio se hidroliza: $\text{NH}_4^+ + \text{H}_2\text{O} \rightleftharpoons \text{NH}_3 + \text{H}_3\text{O}^+$. Disolución <b>ácida</b> ($\text{pH} < 7$). Constante: $K_a = K_w / K_{b,\text{NH}_3}$.<br>"
        r"3. <b>CH3COONa (Ácido débil CH3COOH + Base fuerte NaOH):</b> El anión acetato se hidroliza: $\text{CH}_3\text{COO}^- + \text{H}_2\text{O} \rightleftharpoons \text{CH}_3\text{COOH} + \text{OH}^-$. Disolución <b>básica</b> ($\text{pH} > 7$). Constante: $K_b = K_w / K_{a,\text{acético}}$.<br>"
        r"4. <b>NH4F (Ácido débil + Base débil):</b> Ambos se hidrolizan; se comparan $K_a(\text{NH}_4^+)$ y $K_b(\text{F}^-)$. Si $K_a > K_b$ ácida, si $K_b > K_a$ básica."))
    course.notes.append(n11)

    # --------------------------------------------------------------------------
    # 12. Disoluciones Amortiguadoras (Buffers)
    # --------------------------------------------------------------------------
    n12 = NoteNode("quim_12", "Disoluciones Buffer y Henderson-Hasselbalch", 80.0, 640.0, ["Química", "Buffer", "Henderson-Hasselbalch"])
    n12.add_card(ClozeCard("Ecuación de Henderson-Hasselbalch",
        r"Para un sistema amortiguador compuesto por un ácido débil $\text{HA}$ y su base conjugada $\text{A}^-$:"
        r"\n- Ecuación de Henderson-Hasselbalch: $$\text{pH} = {{c1::\text{p}K_a + \log\left(\frac{[\text{A}^-]}{[\text{HA}]}\right) = \text{p}K_a + \log\left(\frac{n_{\text{base}}}{n_{\text{ácido}}}\right)::ecuación reguladora}}$$."
        r"\n- Máxima capacidad amortiguadora: Ocurre cuando $[\text{HA}] = [\text{A}^-]$, donde $\log(1) = 0 \implies \text{pH} = {{c2::\text{p}K_a::pH de máxima capacidad}}$."
        r"\n- Rango eficaz de amortiguación: $$\text{pH} = {{c3::\text{p}K_a \pm 1::intervalo de amortiguación}}$$."))
    n12.add_card(Flashcard("Perturbación Cuantitativa de Buffers ante Adición de Ácido/Base Fuerte",
        r"Explique la metodología de dos pasos para calcular el nuevo pH de un buffer tras agregar una cantidad estequiométrica $n_{\text{agregada}}$ de base fuerte (OH-) o ácido fuerte (H+).",
        r"1. <b>Paso 1: Estequiometría de Neutralización Completa (moles):</b><br>"
        r"- Si se agrega $\text{OH}^-$: Reacciona con el ácido débil: $\text{HA} + \text{OH}^- \longrightarrow \text{A}^- + \text{H}_2\text{O}$.<br>"
        r"Nuevos moles: $n_{\text{HA}}' = n_{\text{HA}} - n_{\text{OH}^-}$, y $n_{\text{A}^-}' = n_{\text{A}^-} + n_{\text{OH}^-}$.<br>"
        r"- Si se agrega $\text{H}^+$: Reacciona con la base conjugada: $\text{A}^- + \text{H}^+ \longrightarrow \text{HA}$.<br>"
        r"Nuevos moles: $n_{\text{A}^-}' = n_{\text{A}^-} - n_{\text{H}^+}$, y $n_{\text{HA}}' = n_{\text{HA}} + n_{\text{H}^+}$.<br>"
        r"2. <b>Paso 2: Recalcular pH con Henderson-Hasselbalch:</b><br>"
        r"$$\text{pH}' = \text{p}K_a + \log\left(\frac{n_{\text{A}^-}'}{n_{\text{HA}}'}\right)$$"))
    course.notes.append(n12)

    # --------------------------------------------------------------------------
    # 13. Curvas de Titulación Ácido-Base
    # --------------------------------------------------------------------------
    n13 = NoteNode("quim_13", "Curvas de Titulación y Puntos de Equivalencia", 380.0, 640.0, ["Química", "Titulación", "Equivalencia"])
    n13.add_card(Flashcard("Las 4 Regiones de Titulación de Ácido Débil con Base Fuerte",
        r"Describa los 4 puntos clave en la curva de titulación de un ácido débil HA con una base fuerte NaOH.",
        r"1. <b>Punto Inicial ($V_{\text{NaOH}} = 0$):</b> Disolución simple de ácido débil. Se calcula con $K_a$ y tabla ICE: $[\text{H}^+] \approx \sqrt{K_a C_0}$.<br>"
        r"2. <b>Región Buffer / Zona Amortiguadora:</b> Coexisten $\text{HA}$ y $\text{A}^-$. En el <b>punto de semi-equivalencia</b> ($V = V_{\text{eq}}/2$), $[\text{HA}] = [\text{A}^-] \implies \text{pH} = \text{p}K_a$.<br>"
        r"3. <b>Punto de Equivalencia ($V = V_{\text{eq}}$):</b> Todo el $\text{HA}$ se neutralizó formando la sal básica $\text{A}^-$. El $\text{pH} > 7$ por hidrólisis: $[\text{OH}^-] \approx \sqrt{K_b C_{\text{sal}}}$.<br>"
        r"4. <b>Exceso de Titulante ($V > V_{\text{eq}}$):</b> El pH está dominado por el $\text{NaOH}$ fuerte remanente: $[\text{OH}^-] = \frac{n_{\text{NaOH exceso}}}{V_{\text{total}}}$."))
    course.notes.append(n13)

    # --------------------------------------------------------------------------
    # 14. Balanceo Redox por Método del Ión-Electrón
    # --------------------------------------------------------------------------
    n14 = NoteNode("quim_14", "Balanceo Redox por el Método del Ión-Electrón", 680.0, 640.0, ["Química", "Redox", "Ión-Electrón"])
    n14.add_card(ProofSequenceCard("Algoritmo de 7 Pasos para Balancear Reacciones Redox en Medio Ácido y Básico",
        r"Describa la secuencia estandarizada del método del ión-electrón para balancear cualquier reacción redox.",
        [
            r"1. Identificar estados de oxidación y separar la reacción global en las dos semirreacciones: semirreacción de oxidación y semirreacción de reducción.",
            r"2. Balancear todos los átomos distintos de oxígeno e hidrógeno mediante coeficientes estequiométricos.",
            r"3. Balancear los átomos de oxígeno añadiendo moléculas de agua $\text{H}_2\text{O}$ al lado deficitario.",
            r"4. Balancear los átomos de hidrógeno añadiendo protones $\text{H}^+$ al lado opuesto (balance en medio ácido).",
            r"5. Si el medio es básico: Neutralizar todos los $\text{H}^+$ sumando una cantidad idéntica de $\text{OH}^-$ a ambos lados de la ecuación, combinando $\text{H}^+ + \text{OH}^- \to \text{H}_2\text{O}$ y cancelando aguas excedentes.",
            r"6. Balancear las cargas netas agregando electrones $e^-$ al lado más positivo.",
            r"7. Multiplicar cada semirreacción por factores enteros mínimos para igualar el número de electrones ganados y perdidos, y sumarlas cancelando electrones e intermediarios $\blacksquare$."
        ]))
    course.notes.append(n14)

    # --------------------------------------------------------------------------
    # 15. Celdas Galvánicas y Potenciales Estándar
    # --------------------------------------------------------------------------
    n15 = NoteNode("quim_15", "Celdas Galvánicas y Potenciales Estándar E0", 980.0, 640.0, ["Química", "Electroquímica", "Celdas Galvánicas"])
    n15.add_card(ClozeCard("Componentes Canónicos de una Celda Galvánica",
        r"En una celda electroquímica espontánea (galvánica o voltaica):"
        r"\n- <b>Ánodo:</b> Electrodo con polaridad {{c1::negativa (-)::signo de ánodo}}, donde ocurre siempre la {{c2::oxidación::proceso anódico}} ($A \to A^{n+} + n e^-$)."
        r"\n- <b>Cátodo:</b> Electrodo con polaridad {{c3::positiva (+)::signo de cátodo}}, donde ocurre siempre la {{c4::reducción::proceso catódico}} ($C^{m+} + m e^- \to C$)."
        r"\n- <b>Puente Salino:</b> Mantiene la neutralidad eléctrica permitiendo que los {{c5::aniones migren al ánodo y los cationes al cátodo::flujo iónico}}."
        r"\n- Potencial estándar de celda: $$E^\circ_{\text{celda}} = {{c6::E^\circ_{\text{cátodo}} - E^\circ_{\text{ánodo}}::potencial estándar}}$$ (utilizando siempre los potenciales de reducción de tabla)."))
    course.notes.append(n15)

    # --------------------------------------------------------------------------
    # 16. Termodinámica Electroquímica y Ecuación de Nernst
    # --------------------------------------------------------------------------
    n16 = NoteNode("quim_16", "Nernst, Termodinámica y Leyes de Faraday", 80.0, 840.0, ["Química", "Nernst", "Faraday"])
    n16.add_card(ClozeCard("Relaciones Termodinámicas Fundamentales",
        r"Interconexión entre electroquímica y termodinámica química:"
        r"\n- Energía Libre de Gibbs estándar: $$\Delta G^\circ = {{c1::-n F E^\circ_{\text{celda}}::energía libre}}$$ con $F = 96485 \text{ C/mol } e^-$."
        r"\nPara que una reacción sea espontánea: $\Delta G^\circ < 0 \iff E^\circ_{\text{celda}} > 0$."
        r"\n- Relación con la constante de equilibrio a $25^\circ\text{C}$ ($298.15\text{ K}$): $$E^\circ_{\text{celda}} = {{c2::\frac{0.0592}{n}\log K::potencial estándar vs K}}$$"
        r"\n- Ecuación de Nernst para condiciones no estándar: $$E = {{c3::E^\circ - \frac{0.0592}{n}\log Q::ecuación de Nernst}}$$"
        r"\nEn el equilibrio químico: $E = 0$ y $Q = K$."))
    n16.add_card(Flashcard("Leyes de Electrólisis de Faraday",
        r"Escriba la fórmula para calcular la masa $m$ de sustancia depositada o liberada en un electrodo durante una electrólisis con corriente $I$ durante un tiempo $t$.",
        r"1. <b>Carga eléctrica total transferida:</b> $q = I \cdot t$ (con $I$ en amperios y $t$ en segundos).<br>"
        r"2. <b>Moles de electrones transferidos:</b> $n_e = \frac{q}{F} = \frac{I \cdot t}{F}$, donde $F = 96485 \text{ C/mol}$.<br>"
        r"3. <b>Moles de sustancia depositada:</b> Cada mol de sustancia requiere $n$ moles de electrones según la semirreacción de reducción ($M^{n+} + n e^- \to M$), luego $n_{\text{metal}} = \frac{n_e}{n} = \frac{I \cdot t}{n F}$.<br>"
        r"4. <b>Masa depositada:</b><br>"
        r"$$m = n_{\text{metal}} \cdot M_m = \frac{M_m \cdot I \cdot t}{n \cdot F}$$ (donde $M_m$ es la masa molar del elemento depositado)."))
    course.notes.append(n16)

    # --------------------------------------------------------------------------
    # Edges (Dependencias Pedagógicas)
    # --------------------------------------------------------------------------
    edges_def = [
        ("quim_00", "quim_01"), ("quim_01", "quim_02"), ("quim_02", "quim_03"),
        ("quim_03", "quim_04"), ("quim_03", "quim_05"), ("quim_01", "quim_06"),
        ("quim_06", "quim_07"), ("quim_07", "quim_08"), ("quim_00", "quim_09"),
        ("quim_09", "quim_10"), ("quim_10", "quim_11"), ("quim_10", "quim_12"),
        ("quim_12", "quim_13"), ("quim_00", "quim_14"), ("quim_14", "quim_15"),
        ("quim_15", "quim_16")
    ]
    for s, t in edges_def:
        course.edges.append(NoteEdge(source_id=s, target_id=t))

    return course
