"""
Electricidad y Magnetismo (I2) - FIS1533
Full Comprehensive Course Builder for Morphism SRS Plus.
32 interconnected nodes covering all 12 chapters, official exam rubrics, and problem-solving methodologies.
"""

from morphism.core.models import Course, NoteNode, NoteEdge, Flashcard, ClozeCard, ProofSequenceCard

def build_electricidad_magnetismo_course() -> Course:
    course = Course(name="Electricidad y Magnetismo (I2)")

    # --------------------------------------------------------------------------
    # 0. Filosofía de Corrección FIS1533 y Protocolo de Rescate
    # --------------------------------------------------------------------------
    n0 = NoteNode("em_00", "Filosofía de Corrección FIS1533 y Rescate de Puntos", 80.0, 40.0, ["EM", "Rúbrica", "Estrategia"])
    n0.add_card(ClozeCard("Doctrina Oficial de Arrastre de Error (Error-Carrying)",
        r"En las pautas de corrección de FIS1533:"
        r"<br>1. Si cometes un error algebraico en la parte (a), pero en la parte (b) utilizas tu resultado erróneo con {{c1::la metodología y ecuaciones correctas}}, recibes {{c2::el 100% del puntaje metodológico}} de la parte (b)."
        r"<br>2. <b>Parametrización de Emergencia:</b> Si te bloqueas en una integral complicada, define formalmente {{c3::$I_0 = \int \dots$}} y continúa resolviendo las partes siguientes en función de $I_0$ para salvar hasta el {{c4::80% del puntaje total}}."))
    n0.add_card(Flashcard("Protocolo Universal de 4 Pasos para Todo Ejercicio de la I2",
        r"¿Cuáles son los 4 pasos sistemáticos indispensables para abordar cualquier problema de FIS1533 asegurando el máximo puntaje?",
        r"1. <b>Diagrama y Sistema de Coordenadas:</b> Dibujar el sistema, elegir el origen, explicitar vectores unitarios ($\hat{r}, \hat{\theta}, \hat{\phi}, \hat{z}$) y sentidos de corriente.<br>"
        r"2. <b>Ecuación Física Fundamental:</b> Escribir la ley matriz aplicable en forma diferencial o integral (Gauss, Biot-Savart, Ampère, Faraday, Ohm, Kirchhoff).<br>"
        r"3. <b>Condiciones de Borde / Simetría / Integración:</b> Justificar cancelaciones por simetría impar o condiciones de interfaz.<br>"
        r"4. <b>Sanity Checks:</b> Verificación dimensional y análisis de límites asintóticos ($r \to 0$, $r \to \infty$, $z \gg R$)."))
    course.notes.append(n0)

    # --------------------------------------------------------------------------
    # 1. Álgebra Vectorial y Factores de Escala Curvilíneos
    # --------------------------------------------------------------------------
    n1 = NoteNode("em_01", "Álgebra Vectorial y Operadores Curvilíneos", 380.0, 40.0, ["EM", "Vectores", "Operadores"])
    n1.add_card(ClozeCard("Identidades Vectoriales y Regla BAC-CAB",
        r"Identidades fundamentales para campos vectoriales en electrodinámica:"
        r"<br>- Regla BAC-CAB: $$\mathbf{A} \times (\mathbf{B} \times \mathbf{C}) = {{c1::\mathbf{B}(\mathbf{A}\cdot\mathbf{C}) - \mathbf{C}(\mathbf{A}\cdot\mathbf{B})}}$$"
        r"<br>- Identidades nulas: $\nabla \times (\nabla f) = {{c2::\mathbf{0}}}$ y $\nabla \cdot (\nabla \times \mathbf{A}) = {{c3::0}}$."
        r"<br>- Laplaciano vectorial: $\nabla^2 \mathbf{A} = {{c4::\nabla(\nabla \cdot \mathbf{A}) - \nabla \times (\nabla \times \mathbf{A})}}$."))
    n1.add_card(Flashcard("Operadores Diferenciales en Cilíndricas y Esféricas",
        r"Escriba la divergencia $\nabla \cdot \mathbf{A}$ y el rotacional $\nabla \times \mathbf{A}$ en coordenadas cilíndricas $(r, \theta, z)$.",
        r"1. <b>Divergencia Cilíndrica:</b><br>"
        r"$$\nabla \cdot \mathbf{A} = \frac{1}{r}\frac{\partial(r A_r)}{\partial r} + \frac{1}{r}\frac{\partial A_\theta}{\partial \theta} + \frac{\partial A_z}{\partial z}$$<br>"
        r"2. <b>Rotacional Cilíndrico:</b><br>"
        r"$$\nabla \times \mathbf{A} = \left(\frac{1}{r}\frac{\partial A_z}{\partial \theta} - \frac{\partial A_\theta}{\partial z}\right)\hat{r} + \left(\frac{\partial A_r}{\partial z} - \frac{\partial A_z}{\partial r}\right)\hat{\theta} + \frac{1}{r}\left(\frac{\partial(r A_\theta)}{\partial r} - \frac{\partial A_r}{\partial \theta}\right)\hat{z}$$"))
    n1.add_card(Flashcard("Divergencia del Campo Coulombiano y Delta de Dirac",
        r"Demuestre por qué formalmente $\nabla \cdot \left(\frac{\hat{r}}{r^2}\right) = 4\pi \delta^3(\mathbf{r})$ integrando contra una función de prueba suave $f(\mathbf{r})$.",
        r"1. <b>Identidad del producto vectorial:</b> $\nabla \cdot (f \mathbf{V}) = f(\nabla \cdot \mathbf{V}) + \nabla f \cdot \mathbf{V}$ con $\mathbf{V} = \frac{\hat{r}}{r^2}$.<br>"
        r"2. <b>Integral en bola $B_\varepsilon$ centrada en el origen:</b><br>"
        r"$$I = \int_{B_\varepsilon} f \left[\nabla \cdot \frac{\hat{r}}{r^2}\right] dV = \int_{B_\varepsilon} \nabla \cdot \left(f \frac{\hat{r}}{r^2}\right) dV - \int_{B_\varepsilon} \nabla f \cdot \frac{\hat{r}}{r^2} dV$$<br>"
        r"3. <b>Término de borde por Gauss:</b> $\oint_{S_\varepsilon} f \frac{\hat{r}}{\varepsilon^2} \cdot (\hat{r}\varepsilon^2 d\Omega) = \oint_{S_\varepsilon} f d\Omega$. Al tomar $\varepsilon \to 0$, $f \to f(\mathbf{0})$, obteniendo $f(\mathbf{0})\oint d\Omega = 4\pi f(\mathbf{0})$.<br>"
        r"4. <b>Término volumétrico del gradiente:</b> En esféricas, $\int_{B_\varepsilon} (\nabla f \cdot \hat{r}) dr d\Omega$. Como $\nabla f$ es acotada y $r \in [0, \varepsilon]$, la integral tiende a $0$ cuando $\varepsilon \to 0$.<br>"
        r"5. <b>Conclusión distributiva:</b> $\int_{\mathbb{R}^3} f(\mathbf{r}) \left[\nabla \cdot \frac{\hat{r}}{r^2}\right] dV = 4\pi f(\mathbf{0}) \implies \nabla \cdot \left(\frac{\hat{r}}{r^2}\right) = 4\pi \delta^3(\mathbf{r})$."))
    n1.add_card(ProofSequenceCard("Teorema de Stokes en Superficies Parametrizadas",
        r"Demuestre el Teorema de Stokes $\oint_{\partial S} \mathbf{F} \cdot d\mathbf{r} = \iint_S (\nabla \times \mathbf{F}) \cdot d\mathbf{S}$ para una superficie suave $S$ parametrizada por $f: D \subseteq \mathbb{R}^2 \to S \subseteq \mathbb{R}^3$.",
        [
            r"Sea $f(u, v) = (x(u,v), y(u,v), z(u,v))$. El pullback del campo sobre el borde es $(\mathbf{F} \circ f) Df \begin{pmatrix} du \\ dv \end{pmatrix} = A \, du + B \, dv$, donde $A = (\mathbf{F}\circ f) \cdot \frac{\partial f}{\partial u}$ y $B = (\mathbf{F}\circ f) \cdot \frac{\partial f}{\partial v}$.",
            r"Por el Teorema de Green en el dominio plano $D$: $\oint_{\partial S} \mathbf{F} \cdot d\mathbf{r} = \oint_{\partial D} A du + B dv = \iint_D \left(\frac{\partial B}{\partial u} - \frac{\partial A}{\partial v}\right) du \, dv$.",
            r"Derivando por regla de la cadena: $\frac{\partial B}{\partial u} - \frac{\partial A}{\partial v} = D_2 f^\top (D\mathbf{F}) D_1 f - D_1 f^\top (D\mathbf{F}) D_2 f$, cancelándose las segundas derivadas cruzadas de $f$ por el Teorema de Schwarz.",
            r"Para cualquier matriz $M$ y vectores $\mathbf{a}, \mathbf{b}$, se cumple la identidad $\mathbf{b}^\top M \mathbf{a} - \mathbf{a}^\top M \mathbf{b} = \text{Axl}(M) \cdot (\mathbf{a} \times \mathbf{b})$, donde $\text{Axl}(D\mathbf{F}) = \nabla \times \mathbf{F}$.",
            r"Sustituyendo $\mathbf{a} = D_1 f = \frac{\partial f}{\partial u}$ y $\mathbf{b} = D_2 f = \frac{\partial f}{\partial v}$: el integrando es $(\nabla \times \mathbf{F}) \cdot \left(\frac{\partial f}{\partial u} \times \frac{\partial f}{\partial v}\right) du \, dv = (\nabla \times \mathbf{F}) \cdot d\mathbf{S} \quad \blacksquare$."
        ]))
    course.notes.append(n1)

    # --------------------------------------------------------------------------
    # 2. Polarización P y Cargas Ligadas
    # --------------------------------------------------------------------------
    n2 = NoteNode("em_02", "Polarización P y Cargas Ligadas", 680.0, 40.0, ["EM", "Polarización", "Cargas Ligadas"])
    n2.add_card(ClozeCard("Definición de Cargas Ligadas",
        r"Dado un dieléctrico con vector polarización macroscópica $\mathbf{P}$ (momento dipolar por unidad de volumen):"
        r"<br>- Densidad volumétrica de carga ligada: $\rho_b = {{c1::-\nabla \cdot \mathbf{P}}}$"
        r"<br>- Densidad superficial de carga ligada: $\sigma_b = {{c2::\mathbf{P} \cdot \hat{n}}}$"
        r"<br>- Potencial electrostático generado: $$V(\mathbf{r}) = \frac{1}{4\pi\varepsilon_0}\left[\iiint_V \frac{\rho_b(\mathbf{r}')}{|\mathbf{r}-\mathbf{r}'|}dV' + \iint_{\partial V} \frac{\sigma_b(\mathbf{r}')}{|\mathbf{r}-\mathbf{r}'|}dA'\right]$$"))
    n2.add_card(ProofSequenceCard("Neutralidad Neta de Dieléctricos Neutros",
        r"Demuestre rigurosamente que la carga ligada neta de un dieléctrico neutro de volumen $V$ y frontera $\partial V$ es idénticamente cero.",
        [
            r"Carga ligada total por definición: $Q_{b,\text{tot}} = \iiint_V \rho_b \, dV + \iint_{\partial V} \sigma_b \, dA$.",
            r"Sustituir las relaciones constitutivas: $Q_{b,\text{tot}} = -\iiint_V (\nabla \cdot \mathbf{P}) \, dV + \iint_{\partial V} (\mathbf{P} \cdot \hat{n}) \, dA$.",
            r"Aplicar el Teorema de la Divergencia de Gauss al término volumétrico: $\iiint_V (\nabla \cdot \mathbf{P}) \, dV = \iint_{\partial V} (\mathbf{P} \cdot \hat{n}) \, dA$.",
            r"Restando ambas integrales: $Q_{b,\text{tot}} = -\iint_{\partial V} (\mathbf{P} \cdot \hat{n}) \, dA + \iint_{\partial V} (\mathbf{P} \cdot \hat{n}) \, dA = 0 \quad \blacksquare$."
        ]))
    course.notes.append(n2)

    # --------------------------------------------------------------------------
    # 3. Vector Desplazamiento D y Ley de Gauss en Dieléctricos
    # --------------------------------------------------------------------------
    n3 = NoteNode("em_03", "Desplazamiento Eléctrico D y Ley de Gauss", 980.0, 40.0, ["EM", "Gauss", "Desplazamiento"])
    n3.add_card(ClozeCard("Ley de Gauss Generalizada",
        r"El vector desplazamiento eléctrico se define como: $$\mathbf{D} = {{c1::\varepsilon_0 \mathbf{E} + \mathbf{P}}}$$"
        r"<br>La Ley de Gauss en dieléctricos depende <b>exclusivamente</b> de las cargas libres:"
        r"<br>- Forma diferencial: $\nabla \cdot \mathbf{D} = {{c2::\rho_f}}$"
        r"<br>- Forma integral: $\oint_{\partial V} \mathbf{D} \cdot d\mathbf{A} = {{c3::Q_{f,\text{enc}}}}$."))
    n3.add_card(Flashcard("Cálculo de E a partir de D en Medios LHI",
        r"¿Cómo se relacionan $\mathbf{D}, \mathbf{E}, \mathbf{P}$ en un medio Lineal, Homogéneo e Isótropo (LHI) con susceptibilidad $\chi_e$ y permitividad relativa $\kappa$?",
        r"1. $\mathbf{P} = \varepsilon_0 \chi_e \mathbf{E}$.<br>"
        r"2. $\mathbf{D} = \varepsilon_0 \mathbf{E} + \varepsilon_0 \chi_e \mathbf{E} = \varepsilon_0 (1 + \chi_e)\mathbf{E} = \kappa \varepsilon_0 \mathbf{E} = \varepsilon \mathbf{E}$.<br>"
        r"3. Constante dieléctrica: $\kappa = \varepsilon_r = 1 + \chi_e$, permitividad del medio: $\varepsilon = \kappa \varepsilon_0$.<br>"
        r"4. Por lo tanto: $\mathbf{E} = \frac{\mathbf{D}}{\kappa \varepsilon_0}$, y $\mathbf{P} = \frac{\chi_e}{1+\chi_e}\mathbf{D} = \left(1 - \frac{1}{\kappa}\right)\mathbf{D}$."))
    course.notes.append(n3)

    # --------------------------------------------------------------------------
    # 4. Condiciones de Borde Electrostáticas
    # --------------------------------------------------------------------------
    n4 = NoteNode("em_04", "Condiciones de Borde en Interfaces Dieléctricas", 80.0, 240.0, ["EM", "Condiciones de Borde", "Interfaces"])
    n4.add_card(ClozeCard("Discontinuidad Normal y Continuidad Tangencial",
        r"En la interfaz entre dos medios dieléctricos (medio 1 y medio 2), con normal $\hat{n}_{1\to 2}$ apuntando hacia el medio 2:"
        r"<br>- Componente normal de $\mathbf{D}$: $$D_{2n} - D_{1n} = {{c1::\sigma_f}}$$"
        r"Si la interfaz no tiene carga libre ($\sigma_f = 0$): $D_{1n} = D_{2n}$ (continuo)."
        r"<br>- Componente tangencial de $\mathbf{E}$: $$E_{2t} - E_{1t} = {{c2::0}}$$ (consecuencia de $\nabla \times \mathbf{E} = \mathbf{0}$)."
        r"<br>- Ley de refracción de líneas de campo: $$\frac{\tan\theta_1}{\tan\theta_2} = {{c3::\frac{\varepsilon_1}{\varepsilon_2}}}$$ (donde $\theta$ es el ángulo respecto a la normal)."))
    n4.add_card(Flashcard("Deducción de la Ley de Refracción en Interfaces Dieléctricas",
        r"¿Cómo se deduce la ley de refracción $\frac{\tan\theta_1}{\tan\theta_2} = \frac{\varepsilon_1}{\varepsilon_2}$ para las líneas de campo eléctrico en la frontera libre de carga ($\sigma_f = 0$) entre dos dieléctricos lineales?",
        r"1. <b>Componentes Tangenciales:</b> Como $\nabla \times \mathbf{E} = \mathbf{0}$, la circulación en un lazo rectangular infinitesimal da:<br>"
        r"$$E_{1t} = E_{2t} \implies E_1 \sin\theta_1 = E_2 \sin\theta_2$$<br>"
        r"2. <b>Componentes Normales:</b> Como $\nabla \cdot \mathbf{D} = 0$ al no haber cargas libres ($\sigma_f = 0$), el flujo sobre una caja cilíndrica infinitesimal da:<br>"
        r"$$D_{1n} = D_{2n} \implies \varepsilon_1 E_1 \cos\theta_1 = \varepsilon_2 E_2 \cos\theta_2$$<br>"
        r"3. <b>Cociente:</b> Dividiendo miembro a miembro ambas igualdades:<br>"
        r"$$\frac{E_1 \sin\theta_1}{\varepsilon_1 E_1 \cos\theta_1} = \frac{E_2 \sin\theta_2}{\varepsilon_2 E_2 \cos\theta_2} \implies \frac{\tan\theta_1}{\varepsilon_1} = \frac{\tan\theta_2}{\varepsilon_2} \iff \frac{\tan\theta_1}{\tan\theta_2} = \frac{\varepsilon_1}{\varepsilon_2}$$."))
    course.notes.append(n4)

    # --------------------------------------------------------------------------
    # 5. Capacitancia y Dieléctricos Multicapa
    # --------------------------------------------------------------------------
    n5 = NoteNode("em_05", "Capacitancia con Dieléctricos Estratificados", 380.0, 240.0, ["EM", "Capacitancia", "Dieléctricos"])
    n5.add_card(Flashcard("Estratificación Serie vs Paralelo en Placas Planas",
        r"Considere un condensador de placas planas paralelas de área $A$ y separación $d$. Compare cómo modelar la capacitancia equivalente si el dieléctrico se divide: a) en rebanadas paralelas a las placas, b) en rebanadas perpendiculares a las placas.",
        r"1. <b>Paralelo a las placas (Serie):</b> Las líneas de campo cruzan sucesivamente ambos dieléctricos. $D$ es continuo. Las diferencias de potencial se suman: $\Delta V = \Delta V_1 + \Delta V_2$.<br>"
        r"$$\frac{1}{C_{\text{eq}}} = \frac{1}{C_1} + \frac{1}{C_2} = \frac{d_1}{\kappa_1 \varepsilon_0 A} + \frac{d_2}{\kappa_2 \varepsilon_0 A}$$<br>"
        r"2. <b>Perpendicular a las placas (Paralelo):</b> Ambas regiones comparten la misma diferencia de potencial $\Delta V_0$. Las cargas libres se reparten: $Q_{\text{tot}} = Q_1 + Q_2$.<br>"
        r"$$C_{\text{eq}} = C_1 + C_2 = \frac{\kappa_1 \varepsilon_0 A_1}{d} + \frac{\kappa_2 \varepsilon_0 A_2}{d}$$"))
    n5.add_card(ClozeCard("Dieléctrico Inhomogéneo Continuo",
        r"Para un condensador plano con permitividad dependiente de la posición $\kappa(x)$ entre $x = 0$ y $x = d$:"
        r"<br>Como $D$ es constante en $x$: $E(x) = \frac{D}{\varepsilon_0 \kappa(x)} = \frac{Q}{\varepsilon_0 A \kappa(x)}$."
        r"<br>La diferencia de potencial es: $$\Delta V = \int_0^d E(x) dx = \frac{Q}{\varepsilon_0 A} {{c1::\int_0^d \frac{dx}{\kappa(x)}}}$$"
        r"<br>Por lo tanto, la capacitancia es: $$C = \frac{\varepsilon_0 A}{\int_0^d \frac{dx}{\kappa(x)}}$$."))
    course.notes.append(n5)

    # --------------------------------------------------------------------------
    # 6. Energía y Fuerzas sobre Dieléctricos
    # --------------------------------------------------------------------------
    n6 = NoteNode("em_06", "Energía y Fuerzas sobre Dieléctricos", 680.0, 240.0, ["EM", "Energía", "Fuerzas"])
    n6.add_card(ClozeCard("Fuerza a Carga Constante vs a Voltaje Constante",
        r"Cálculo de la fuerza mecánica sobre una placa dieléctrica que penetra una distancia $x$ en un condensador:"
        r"<br>- Condensador desconectado ($Q = \text{cte}$): $$F_x = {{c1::-\left(\frac{\partial U}{\partial x}\right)_Q}}$$ con $U = \frac{Q^2}{2 C(x)} \implies F_x = +\frac{Q^2}{2 C^2}\frac{dC}{dx} = +\frac{1}{2}V^2 \frac{dC}{dx}$."
        r"<br>- Condensador conectado a batería ($V = \text{cte}$): $$F_x = {{c2::+\left(\frac{\partial U}{\partial x}\right)_V}} = {{c3::+\frac{1}{2}V^2 \frac{dC}{dx}}}$$."
        r"<br>¡En ambos casos la fuerza neta es <b>atractiva</b> hacia el interior del condensador!"))
    n6.add_card(ProofSequenceCard("Deducción de la Fuerza a Voltaje Constante con Trabajo de la Fuente",
        r"Demuestre por balance de trabajo virtual que $F_x = +\left(\frac{\partial U}{\partial x}\right)_V = \frac{1}{2}V^2 \frac{dC}{dx}$ cuando el condensador está conectado a una batería de voltaje $V_0$.",
        [
            r"Por el principio de conservación de energía: $d W_{\text{mec}} + d U = d W_{\text{batería}}$, donde $d W_{\text{mec}} = -F_x dx$.",
            r"El trabajo entregado por la batería al transferir carga $dQ$ es: $d W_{\text{batería}} = V_0 dQ = V_0 (V_0 dC) = V_0^2 dC$.",
            r"La variación de energía electrostática almacenada es: $dU = d\left(\frac{1}{2}C V_0^2\right) = \frac{1}{2}V_0^2 dC$.",
            r"Sustituyendo: $-F_x dx + \frac{1}{2}V_0^2 dC = V_0^2 dC \implies F_x dx = \frac{1}{2}V_0^2 dC \implies F_x = +\frac{1}{2}V_0^2 \frac{dC}{dx} \quad \blacksquare$."
        ]))
    course.notes.append(n6)

    # --------------------------------------------------------------------------
    # 7. Densidad de Corriente y Ecuación de Continuidad
    # --------------------------------------------------------------------------
    n7 = NoteNode("em_07", "Densidad de Corriente y Continuidad", 980.0, 240.0, ["EM", "Corriente", "Continuidad"])
    n7.add_card(ClozeCard("Ecuación de Continuidad y Corriente Eléctrica",
        r"Definición y principios fundamentales de corrientes eléctricas:"
        r"<br>- Corriente total que atraviesa una superficie $S$: $$I = \iint_S {{c1::\mathbf{J} \cdot d\mathbf{A}}}$$"
        r"<br>- Densidad microscópica de corriente: $$\mathbf{J} = {{c2::n q \mathbf{v}_d}}$$"
        r"<br>- Ecuación de continuidad (conservación local de la carga): $$\nabla \cdot \mathbf{J} = {{c3::-\frac{\partial \rho}{\partial t}}}$$."
        r"<br>En corriente estacionaria ($\partial\rho/\partial t = 0$): $\nabla \cdot \mathbf{J} = 0$."))
    course.notes.append(n7)

    # --------------------------------------------------------------------------
    # 8. Modelo de Drude y Resistencia Geométrica
    # --------------------------------------------------------------------------
    n8 = NoteNode("em_08", "Modelo de Drude y Resistencia Geométrica", 80.0, 440.0, ["EM", "Drude", "Resistencia"])
    n8.add_card(Flashcard("Modelo Microscópico de Drude para la Conductividad",
        r"Deduzca la relación entre conductividad eléctrica $\sigma$, densidad de portadores $n$, masa $m$, carga $q$ y tiempo medio de colisión $\tau$ en el modelo de Drude.",
        r"1. En estado estacionario, el arrastre eléctrico se equilibra con el frenado por colisiones:<br>"
        r"$$q \mathbf{E} - \frac{m \mathbf{v}_d}{\tau} = \mathbf{0} \implies \mathbf{v}_d = \frac{q \tau}{m}\mathbf{E}$$<br>"
        r"2. Sustituyendo en la densidad de corriente $\mathbf{J} = n q \mathbf{v}_d$:<br>"
        r"$$\mathbf{J} = n q \left(\frac{q \tau}{m}\mathbf{E}\right) = \left(\frac{n q^2 \tau}{m}\right)\mathbf{E} = \sigma \mathbf{E}$$<br>"
        r"3. Conductividad de Drude: $\sigma = \frac{n q^2 \tau}{m}$, y resistividad: $\rho = \frac{1}{\sigma} = \frac{m}{n q^2 \tau}$."))
    n8.add_card(ClozeCard("Teorema Dual de Resistencia y Capacitancia (RC = rho * eps)",
        r"Para cualquier estructura conductora con dos electrodos inmersos en un medio con resistividad uniforme $\rho$ y permitividad dieléctrica $\varepsilon$:"
        r"<br>- La resistencia $R$ y la capacitancia $C$ satisfacen la relación universal: $$R \cdot C = {{c1::\rho \varepsilon = \frac{\varepsilon}{\sigma}}}$$"
        r"<br>Ejemplo: En un cilindro coaxial hueco de longitud $L$ con radios $a$ y $b$ ($b > a$):"
        r"<br>$$C = \frac{2\pi \varepsilon L}{\ln(b/a)} \implies R = {{c2::\frac{\rho \ln(b/a)}{2\pi L}}}$$."))
    n8.add_card(Flashcard("Vector de Poynting y Disipación Joule en un Resistor Cilíndrico",
        r"¿Cómo demuestra el vector de Poynting $\mathbf{S} = \frac{1}{\mu_0}(\mathbf{E} \times \mathbf{B})$ que la energía disipada por efecto Joule en un cable cilíndrico de radio $a$, largo $L$ y resistencia $R$ proviene del campo electromagnético circundante?",
        r"1. <b>Campos en la superficie del cilindro ($r = a$):</b><br>"
        r"- Campo eléctrico axial: $\mathbf{E} = \frac{V}{L}\hat{z} = \frac{I R}{L}\hat{z}$.<br>"
        r"- Campo magnético azimutal por Ampère: $\mathbf{B} = \frac{\mu_0 I}{2\pi a}\hat{\phi}$.<br>"
        r"2. <b>Vector de Poynting:</b><br>"
        r"$$\mathbf{S} = \frac{1}{\mu_0}(\mathbf{E} \times \mathbf{B}) = \frac{1}{\mu_0}\left(\frac{I R}{L}\hat{z}\right)\times\left(\frac{\mu_0 I}{2\pi a}\hat{\phi}\right) = -\frac{I^2 R}{2\pi a L}\hat{r}$$<br>"
        r"El vector $\mathbf{S}$ apunta radialmente hacia el interior del conductor.<br>"
        r"3. <b>Flujo total hacia adentro:</b> Con área de la superficie cilíndrica $A_{\text{sup}} = 2\pi a L$:<br>"
        r"$$P_{\text{ingreso}} = -\iint \mathbf{S} \cdot d\mathbf{A} = \left(\frac{I^2 R}{2\pi a L}\right)(2\pi a L) = I^2 R = V I \quad \blacksquare$$."))
    course.notes.append(n8)

    # --------------------------------------------------------------------------
    # 9. Circuitos DC y Transitorios RC
    # --------------------------------------------------------------------------
    n9 = NoteNode("em_09", "Circuitos DC y Transitorios RC", 380.0, 440.0, ["EM", "Circuitos", "RC"])
    n9.add_card(ClozeCard("Carga de un Condensador en Circuito RC",
        r"Considere un circuito con fuente de FEM $\mathcal{E}$, resistencia $R$ y condensador $C$ inicialmente descargado ($q(0) = 0$):"
        r"<br>- Ecuación diferencial por Kirchhoff: $$\mathcal{E} - R\frac{dq}{dt} - \frac{q}{C} = 0$$"
        r"<br>- Carga en función del tiempo: $$q(t) = {{c1::C\mathcal{E}(1 - e^{-t/RC})}}$$"
        r"<br>- Corriente en función del tiempo: $$i(t) = \frac{dq}{dt} = {{c2::\frac{\mathcal{E}}{R}e^{-t/RC}}}$$"
        r"<br>- Constante de tiempo: $\tau = {{c3::RC}}$."))
    n9.add_card(ProofSequenceCard("Balance Energético en Carga RC: El Teorema del 50%",
        r"Demuestre rigurosamente que al cargar completamente un condensador desde una fuente de FEM constante $\mathcal{E}$, exactamente el 50% de la energía entregada por la fuente se disipa en la resistencia, sin importar el valor de $R$.",
        [
            r"Carga final acumulada: $Q_{\text{fin}} = C\mathcal{E}$. Trabajo entregado por la fuente: $W_{\text{fem}} = \int_0^\infty \mathcal{E} i(t) dt = \mathcal{E} Q_{\text{fin}} = C\mathcal{E}^2$.",
            r"Energía electrostática almacenada en el condensador al final: $U_C = \frac{1}{2}\frac{Q_{\text{fin}}^2}{C} = \frac{1}{2}C\mathcal{E}^2$.",
            r"Energía total disipada en la resistencia por efecto Joule: $U_R = \int_0^\infty i(t)^2 R \, dt = R \int_0^\infty \left(\frac{\mathcal{E}}{R}e^{-t/RC}\right)^2 dt = \frac{\mathcal{E}^2}{R}\int_0^\infty e^{-2t/RC}dt$.",
            r"Evaluando la integral: $\int_0^\infty e^{-2t/RC}dt = \left[-\frac{RC}{2}e^{-2t/RC}\right]_0^\infty = \frac{RC}{2} \implies U_R = \frac{\mathcal{E}^2}{R}\cdot\frac{RC}{2} = \frac{1}{2}C\mathcal{E}^2$.",
            r"Por lo tanto: $W_{\text{fem}} = U_C + U_R = \frac{1}{2}C\mathcal{E}^2 + \frac{1}{2}C\mathcal{E}^2$, disipándose exactamente el 50% en calor $\blacksquare$."
        ]))
    course.notes.append(n9)

    # --------------------------------------------------------------------------
    # 10. Fuerza de Lorentz y Dispositivos de Partículas
    # --------------------------------------------------------------------------
    n10 = NoteNode("em_10", "Fuerza de Lorentz y Dispositivos de Partículas", 680.0, 440.0, ["EM", "Lorentz", "Dispositivos"])
    n10.add_card(ClozeCard("Fuerza de Lorentz y Trabajo Nulo",
        r"Fuerza total sobre una carga $q$ con velocidad $\mathbf{v}$ en presencia de campos $\mathbf{E}$ y $\mathbf{B}$:"
        r"<br>$$\mathbf{F} = {{c1::q(\mathbf{E} + \mathbf{v} \times \mathbf{B})}}$$"
        r"<br>- Trabajo de la fuerza magnética sobre la carga: $$dW_B = \mathbf{F}_B \cdot d\mathbf{r} = q(\mathbf{v} \times \mathbf{B}) \cdot (\mathbf{v} dt) = {{c2::0}}$$"
        r"Por lo tanto, un campo magnético estático <b>nunca</b> altera la energía cinética de una partícula; solo curva su trayectoria."))
    n10.add_card(Flashcard("Dispositivos Electromagnéticos Canónicos",
        r"Escriba las ecuaciones de operación para: 1) Selector de velocidades de Wien, 2) Radio de ciclotrón y frecuencia angular, 3) Espectrómetro de masas de Bainbridge.",
        r"1. <b>Selector de Wien ($\mathbf{E} \perp \mathbf{B}$ cruzados):</b> Condición de no desviación $q E = q v B \implies v = \frac{E}{B}$.<br>"
        r"2. <b>Ciclotrón ($\mathbf{v} \perp \mathbf{B}$ uniforme):</b> Fuerza centrípeta $q v B = \frac{m v^2}{r} \implies$ radio $r = \frac{m v}{q B}$ y frecuencia angular $\omega_c = \frac{q B}{m}$ (independiente de la velocidad a régimen no relativista).<br>"
        r"3. <b>Espectrómetro de Bainbridge:</b> Tras salir del selector de Wien, la partícula ingresa a un campo $B'$ puro. Radio $R = \frac{m v}{q B'} = \frac{m E}{q B B'} \implies \frac{m}{q} = \frac{q B B' R}{E}$."))
    course.notes.append(n10)

    # --------------------------------------------------------------------------
    # 11. Efecto Hall
    # --------------------------------------------------------------------------
    n11 = NoteNode("em_11", "Efecto Hall y Signo de Portadores", 980.0, 440.0, ["EM", "Efecto Hall", "Portadores"])
    n11.add_card(ClozeCard("Voltaje Hall y Coeficiente Hall",
        r"En una cinta conductora de espesor $t$ y ancho $w$ por la que fluye corriente $I$ inmersa en campo magnético perpendicular $B$:"
        r"<br>- Campo eléctrico transversal de equilibrio (Hall): $E_H = v_d B$."
        r"<br>- Voltaje transversal Hall: $$V_H = E_H w = v_d B w = {{c1::\frac{I B}{n q t}}}$$."
        r"<br>- Coeficiente Hall: $$R_H = {{c2::\frac{1}{n q}}}$$."
        r"<br>- Significado físico crucial: El signo medido de $V_H$ permite distinguir si los portadores mayoritarios de carga son {{c3::electrones negativos ($q < 0$) o huecos positivos ($q > 0$)}}."))
    course.notes.append(n11)

    # --------------------------------------------------------------------------
    # 12. Fuerzas y Torques sobre Conductores y Espiras
    # --------------------------------------------------------------------------
    n12 = NoteNode("em_12", "Fuerzas y Torques sobre Conductores y Espiras", 80.0, 640.0, ["EM", "Torques", "Dipolos Magnéticos"])
    n12.add_card(ProofSequenceCard("Fuerza Magnética Neta Nula en Espira Cerrada en Campo Uniforme",
        r"Demuestre que la fuerza magnética neta que experimenta cualquier espira conductora cerrada de geometría arbitraria en un campo magnético uniforme $\mathbf{B}_0$ es idénticamente cero.",
        [
            r"Fuerza sobre un elemento diferencial: $d\mathbf{F} = I d\boldsymbol{\ell} \times \mathbf{B}_0$.",
            r"Fuerza total integrando sobre la curva cerrada $C$: $\mathbf{F}_{\text{net}} = \oint_C I d\boldsymbol{\ell} \times \mathbf{B}_0$.",
            r"Dado que $I$ y $\mathbf{B}_0$ son constantes espaciales, se extraen del producto: $\mathbf{F}_{\text{net}} = I \left(\oint_C d\boldsymbol{\ell}\right) \times \mathbf{B}_0$.",
            r"La integral de línea de un diferencial exacto sobre una curva cerrada es nula: $\oint_C d\boldsymbol{\ell} = \mathbf{0}$.",
            r"Por lo tanto: $\mathbf{F}_{\text{net}} = I \cdot \mathbf{0} \times \mathbf{B}_0 = \mathbf{0} \quad \blacksquare$."
        ]))
    n12.add_card(ClozeCard("Torque y Momento Dipolar Magnético",
        r"Para una espira conductora de área vectorial $\mathbf{A} = A \hat{n}$ y corriente $I$:"
        r"<br>- Momento dipolar magnético: $$\mathbf{m} = {{c1::I \mathbf{A} = I A \hat{n}}}$$"
        r"<br>- Torque magnético en campo uniforme $\mathbf{B}$: $$\boldsymbol{\tau} = {{c2::\mathbf{m} \times \mathbf{B}}}$$"
        r"<br>- Energía potencial dipolar: $$U = {{c3::-\mathbf{m} \cdot \mathbf{B}}}$$."
        r"<br>- Fuerza sobre un dipolo en campo magnético <b>no uniforme</b>: $$\mathbf{F} = {{c4::\nabla(\mathbf{m} \cdot \mathbf{B})}}$$."))
    course.notes.append(n12)

    # --------------------------------------------------------------------------
    # 13. Ley de Biot-Savart: Metodología Vectorial de 5 Pasos
    # --------------------------------------------------------------------------
    n13 = NoteNode("em_13", "Ley de Biot-Savart: Metodología de 5 Pasos", 380.0, 640.0, ["EM", "Biot-Savart", "Metodología"])
    n13.add_card(ClozeCard("Fórmula Vectorial de Biot-Savart",
        r"Campo magnético generado por un elemento de corriente $I d\boldsymbol{\ell}'$ ubicado en $\mathbf{r}'$ evaluado en el punto $\mathbf{r}$:"
        r"<br>$$d\mathbf{B}(\mathbf{r}) = \frac{\mu_0 I}{4\pi} {{c1::\frac{d\boldsymbol{\ell}' \times (\mathbf{r} - \mathbf{r}')}{|\mathbf{r} - \mathbf{r}'|^3}}}$$"
        r"<br>En términos del vector unitario de separación $\hat{\boldsymbol{\mathcal{R}}} = \frac{\mathbf{r}-\mathbf{r}'}{|\mathbf{r}-\mathbf{r}'|}$:"
        r"<br>$$d\mathbf{B}(\mathbf{r}) = \frac{\mu_0 I}{4\pi}\frac{d\boldsymbol{\ell}' \times \hat{\boldsymbol{\mathcal{R}}}}{\mathcal{R}^2}$$."))
    n13.add_card(Flashcard("Los 5 Pasos Infalibles para Resolver Biot-Savart en Examen",
        r"Explique la metodología paso a paso para calcular el campo de Biot-Savart sin equivocarse en signos ni factores geométricos.",
        r"1. <b>Parametrizar la fuente:</b> Vector posición $\mathbf{r}'$ y elemento vectorial tangente $d\boldsymbol{\ell}'$.<br>"
        r"2. <b>Parametrizar el punto de campo:</b> Vector posición $\mathbf{r}$.<br>"
        r"3. <b>Construir vector separación y módulo:</b> $\boldsymbol{\mathcal{R}} = \mathbf{r} - \mathbf{r}'$, y calcular $|\boldsymbol{\mathcal{R}}|^3 = [(\Delta x)^2 + (\Delta y)^2 + (\Delta z)^2]^{3/2}$.<br>"
        r"4. <b>Producto cruz vectorial:</b> Calcular $d\boldsymbol{\ell}' \times \boldsymbol{\mathcal{R}}$ por determinantes; simplificar usando simetría de componentes impares.<br>"
        r"5. <b>Integrar componente por componente:</b> Integrar entre los límites de la fuente con la tabla de integrales estándar."))
    course.notes.append(n13)

    # --------------------------------------------------------------------------
    # 14. Casos Canónicos de Biot-Savart
    # --------------------------------------------------------------------------
    n14 = NoteNode("em_14", "Resultados Canónicos de Biot-Savart", 680.0, 640.0, ["EM", "Biot-Savart", "Casos Canónicos"])
    n14.add_card(Flashcard("Segmento Recto y Cable Infinito",
        r"Escriba el campo magnético $\mathbf{B}$ generado por un segmento rectilíneo finito a distancia perpendicular $d$, y deduzca el límite para un hilo infinito.",
        r"1. <b>Segmento finito entre ángulos $\theta_1$ y $\theta_2$:</b><br>"
        r"$$B = \frac{\mu_0 I}{4\pi d}(\sin\theta_2 - \sin\theta_1)$$ (donde los ángulos se miden respecto a la normal al cable).<br>"
        r"2. <b>Cable rectilíneo infinito:</b> Hacia un extremo $\theta_1 = -\pi/2$ ($\sin\theta_1 = -1$) y hacia el otro $\theta_2 = +\pi/2$ ($\sin\theta_2 = +1$):<br>"
        r"$$B = \frac{\mu_0 I}{4\pi d}(1 - (-1)) = \frac{\mu_0 I}{2\pi d}$$ con dirección azimutal $\hat{\phi}$ según la regla de la mano derecha."))
    n14.add_card(ClozeCard("Espira Circular en el Eje de Simetría",
        r"Para una espira circular de radio $R$ con corriente $I$ centrada en el origen sobre el plano $xy$:"
        r"<br>- Campo magnético en cualquier punto $z$ sobre su eje de simetría: $$\mathbf{B}(z) = {{c1::\frac{\mu_0 I R^2}{2(R^2 + z^2)^{3/2}}\hat{z}}}$$"
        r"<br>- En el centro de la espira ($z = 0$): $$\mathbf{B}(0) = {{c2::\frac{\mu_0 I}{2R}\hat{z}}}$$"
        r"<br>- Arco circular plano de ángulo $\Delta\phi$ en su centro de curvatura: $$B = {{c3::\frac{\mu_0 I \Delta\phi}{4\pi R}}}$$."))
    course.notes.append(n14)

    # --------------------------------------------------------------------------
    # 15. Ley de Ampère y Simetrías Canónicas
    # --------------------------------------------------------------------------
    n15 = NoteNode("em_15", "Ley de Ampère y Medios de Alta Simetría", 980.0, 640.0, ["EM", "Ampère", "Simetría"])
    n15.add_card(ClozeCard("Ley de Ampère en Formas Integral y Diferencial",
        r"La Ley de Ampère para magnetostática relaciona la circulación del campo magnético con la corriente libre encerrada:"
        r"<br>- Forma integral: $$\oint_C \mathbf{B} \cdot d\boldsymbol{\ell} = {{c1::\mu_0 I_{\text{enc}} = \mu_0 \iint_S \mathbf{J} \cdot d\mathbf{A}}}$$"
        r"<br>- Forma diferencial (rotacional): $$\nabla \times \mathbf{B} = {{c2::\mu_0 \mathbf{J}}}$$"
        r"<br>Para que la ley permita despejar $|\mathbf{B}|$ algebraicamente, el lazo amperiano $C$ debe satisfacer simetría tal que $\mathbf{B}$ sea {{c3::paralelo y constante a lo largo de $C$}}."))
    n15.add_card(Flashcard("Cilindro con Densidad de Corriente No Uniforme J(r)",
        r"Un conductor cilíndrico de radio $R$ conduce corriente con densidad $\mathbf{J}(r) = C r^k \hat{z}$. Calcule el campo $\mathbf{B}(r)$ en el interior ($r < R$) y en el exterior ($r > R$).",
        r"1. <b>Interior ($r < R$):</b> Lazo circular amperiano de radio $r$.<br>"
        r"$$I_{\text{enc}}(r) = \int_0^{2\pi}\int_0^r (C r'^k) r' dr' d\theta = 2\pi C \frac{r^{k+2}}{k+2}$$<br>"
        r"Por Ampère: $B(r)\cdot 2\pi r = \mu_0 I_{\text{enc}}(r) \implies B_{\text{int}}(r) = \frac{\mu_0 C}{k+2}r^{k+1} \hat{\theta}$.<br>"
        r"2. <b>Exterior ($r \ge R$):</b> Encerra la corriente total $I_{\text{tot}} = 2\pi C \frac{R^{k+2}}{k+2}$:<br>"
        r"$$B_{\text{ext}}(r)\cdot 2\pi r = \mu_0 I_{\text{tot}} \implies B_{\text{ext}}(r) = \frac{\mu_0 I_{\text{tot}}}{2\pi r}\hat{\theta}$$."))
    course.notes.append(n15)

    # --------------------------------------------------------------------------
    # 16. Magnetismo en la Materia y Campo H
    # --------------------------------------------------------------------------
    n16 = NoteNode("em_16", "Magnetismo en la Materia y Campo H", 80.0, 840.0, ["EM", "Materia Magnética", "Campo H"])
    n16.add_card(ClozeCard("Magnetización M y Corrientes Ligadas",
        r"En un material magnético con magnetización $\mathbf{M}$ (momento dipolar magnético por volumen):"
        r"<br>- Densidad volumétrica de corriente ligada: $$\mathbf{J}_b = {{c1::\nabla \times \mathbf{M}}}$$"
        r"<br>- Densidad superficial de corriente ligada: $$\mathbf{K}_b = {{c2::\mathbf{M} \times \hat{n}}}$$"
        r"<br>- Campo auxiliar $\mathbf{H}$ (depende solo de corrientes libres): $$\mathbf{H} = {{c3::\frac{\mathbf{B}}{\mu_0} - \mathbf{M}}}$$ y $\oint_C \mathbf{H} \cdot d\boldsymbol{\ell} = I_{f,\text{enc}}$."))
    n16.add_card(Flashcard("Medios Magnéticos Lineales: Diamagnetismo, Paramagnetismo y Ferromagnetismo",
        r"Explique las relaciones constitutivas $\mathbf{M} = \chi_m \mathbf{H}$ y $\mathbf{B} = \mu \mathbf{H}$, distinguiendo las tres clases de materiales magnéticos.",
        r"1. <b>Relaciones constitutivas:</b> $\mathbf{B} = \mu_0(\mathbf{H} + \mathbf{M}) = \mu_0(1 + \chi_m)\mathbf{H} = \mu \mathbf{H}$, donde $\chi_m$ es la susceptibilidad y $\mu = \mu_0 \mu_r = \mu_0(1+\chi_m)$ es la permeabilidad.<br>"
        r"2. <b>Diamagnetismo ($\chi_m < 0$, $\chi_m \sim -10^{-5}$):</b> Se opone débilmente a $\mathbf{B}$. Presente en todos los átomos por la ley de Lenz a nivel orbital.<br>"
        r"3. <b>Paramagnetismo ($\chi_m > 0$, $\chi_m \sim +10^{-4}$):</b> Los dipolos atómicos permanentes se alinean a favor de $\mathbf{B}$. Disminuye con la temperatura ($T^{-1}$, Ley de Curie).<br>"
        r"4. <b>Ferromagnetismo ($\mu \gg \mu_0$, histéresis):</b> Dominios magnéticos acoplados cuánticamente (canje); no lineal."))
    course.notes.append(n16)

    # --------------------------------------------------------------------------
    # 17. Potencial Vector Magnético A
    # --------------------------------------------------------------------------
    n17 = NoteNode("em_17", "Potencial Vector Magnético A y Gauge de Coulomb", 380.0, 840.0, ["EM", "Potencial Vector", "Gauge"])
    n17.add_card(ClozeCard("Definición y Propiedades del Potencial Vector A",
        r"Como la divergencia del campo magnético es nula ($\nabla \cdot \mathbf{B} = 0$), existe un potencial vector $\mathbf{A}$ tal que:"
        r"<br>$$\mathbf{B} = {{c1::\nabla \times \mathbf{A}}}$$"
        r"<br>- Gauge de Coulomb (norma estándar en magnetostática): $$\nabla \cdot \mathbf{A} = {{c2::0}}$$"
        r"<br>- Ecuación de Poisson para $\mathbf{A}$: $$\nabla^2 \mathbf{A} = {{c3::-\mu_0 \mathbf{J}}}$$"
        r"<br>- Flujo magnético a través de superficie $S$ con borde $\partial S$ (por Stokes): $$\Phi_B = \iint_S \mathbf{B} \cdot d\mathbf{A} = {{c4::\oint_{\partial S} \mathbf{A} \cdot d\boldsymbol{\ell}}}$$."))
    course.notes.append(n17)

    # --------------------------------------------------------------------------
    # 18. Inducción Electromagnética y Ley de Faraday-Lenz
    # --------------------------------------------------------------------------
    n18 = NoteNode("em_18", "Inducción Electromagnética y Ley de Faraday-Lenz", 680.0, 840.0, ["EM", "Faraday", "Lenz"])
    n18.add_card(ClozeCard("Ley de Faraday y Ley de Lenz",
        r"Principios fundamentales de la inducción electromagnética:"
        r"<br>- Ley de Faraday: La fuerza electromotriz inducida en un circuito cerrado es igual al negativo de la tasa de cambio del flujo magnético: $$\mathcal{E} = {{c1::-\frac{d\Phi_B}{dt}}}$$ donde $\Phi_B = \iint_S \mathbf{B} \cdot d\mathbf{A}$."
        r"<br>- Ley de Lenz: El signo negativo indica que la corriente inducida genera un campo magnético que {{c2::se opone al cambio del flujo magnético original}}."
        r"<br>- Forma diferencial de Maxwell-Faraday: $$\nabla \times \mathbf{E} = {{c3::-\frac{\partial \mathbf{B}}{\partial t}}}$$."))
    n18.add_card(ProofSequenceCard("Mecanismo Dual de Inducción: FEM de Movimiento vs Campo Eléctrico Inducido",
        r"Distinga formalmente los dos mecanismos físicos que producen FEM en la ley de Faraday.",
        [
            r"Variación total del flujo: $\frac{d\Phi_B}{dt} = \frac{d}{dt}\iint_S \mathbf{B} \cdot d\mathbf{A}$.",
            r"Por la regla de Leibniz para fronteras móviles: $\frac{d}{dt}\iint_S \mathbf{B} \cdot d\mathbf{A} = \iint_S \frac{\partial \mathbf{B}}{\partial t}\cdot d\mathbf{A} - \oint_{\partial S} (\mathbf{v} \times \mathbf{B})\cdot d\boldsymbol{\ell}$.",
            r"Mecanismo 1 (FEM de movimiento): Circuito en movimiento en campo estático $\mathbf{B}$; la fuerza de Lorentz sobre portadores móviles produce $\mathcal{E}_{\text{mov}} = \oint (\mathbf{v} \times \mathbf{B})\cdot d\boldsymbol{\ell}$.",
            r"Mecanismo 2 (Campo eléctrico inducido): Circuito en reposo en campo variable $\mathbf{B}(t)$; la variación temporal de $\mathbf{B}$ engendra un campo no conservativo $\mathbf{E}_{\text{ind}}$ tal que $\mathcal{E}_{\text{ind}} = \oint \mathbf{E}_{\text{ind}}\cdot d\boldsymbol{\ell} = -\iint_S \frac{\partial \mathbf{B}}{\partial t}\cdot d\mathbf{A} \quad \blacksquare$."
        ]))
    n18.add_card(ClozeCard("Corrientes Parásitas (Foucault) y Frenado Electromagnético",
        r"Cuando un conductor macizo se desplaza a través de un campo magnético no homogéneo o variable:"
        r"<br>1. Se generan lazos de corriente inducida cerrados en la masa del metal llamados {{c1::corrientes de Foucault (eddy currents)}}."
        r"<br>2. Según la Ley de Lenz, estas corrientes generan una fuerza magnética neta $\mathbf{F} = \int (\mathbf{J}_{\text{ind}} \times \mathbf{B}) dV$ que {{c2::se opone al movimiento relativo del conductor}} (frenado electromagnético)."
        r"<br>3. Para mitigar las pérdidas por disipación de calor ($P = \int \mathbf{J}^2 / \sigma \, dV$) en núcleos ferromagnéticos de transformadores, se utiliza hierro {{c3::laminado con placas aisladas eléctricamente entre sí}} en vez de un bloque macizo."))
    course.notes.append(n18)

    # --------------------------------------------------------------------------
    # 19. FEM de Movimiento y Frenado Magnético
    # --------------------------------------------------------------------------
    n19 = NoteNode("em_19", "FEM de Movimiento y Rieles Deslizantes", 980.0, 840.0, ["EM", "Rieles", "Frenado Magnético"])
    n19.add_card(ClozeCard("Barra Deslizante en Rieles con Resistencia",
        r"Una barra conductora de masa $m$ y longitud $L$ se desliza a velocidad inicial $v_0$ sobre rieles paralelos sin fricción conectados por una resistencia $R$, en un campo magnético uniforme perpendicular $B \hat{z}$:"
        r"<br>- FEM inducida por movimiento: $$\mathcal{E} = {{c1::B L v}}$$."
        r"<br>- Corriente inducida: $$I = \frac{\mathcal{E}}{R} = \frac{B L v}{R}$$."
        r"<br>- Fuerza magnética de frenado sobre la barra: $$F_x = -I L B = {{c2::-\frac{B^2 L^2}{R}v}}$$."
        r"<br>- Ecuación de movimiento: $$m \frac{dv}{dt} = -\frac{B^2 L^2}{R}v \implies v(t) = {{c3::v_0 e^{-t/\tau_m}}}$$, con tiempo característico $\tau_m = \frac{m R}{B^2 L^2}$."))
    course.notes.append(n19)

    # --------------------------------------------------------------------------
    # 20. Autoinductancia, Inductancia Mutua y Transitorios RL
    # --------------------------------------------------------------------------
    n20 = NoteNode("em_20", "Inductancia, Energía Magnética y Circuitos RL", 80.0, 1040.0, ["EM", "Inductancia", "RL"])
    n20.add_card(Flashcard("Definición de Autoinductancia L e Inductancia Mutua M",
        r"Defina inductancia propia $L$, inductancia mutua $M_{12}$, y exprese la autoinductancia de un solenoide ideal de $n$ vueltas/metro, longitud $\ell$ y sección $A$.",
        r"1. <b>Autoinductancia:</b> $L = \frac{N \Phi_B}{I}$. La FEM autoinducida es $\mathcal{E}_L = -L \frac{di}{dt}$.<br>"
        r"2. <b>Inductancia de solenoide ideal:</b> Con $B = \mu_0 n I$ y flujo por vuelta $\Phi_1 = B A = \mu_0 n I A$:<br>"
        r"$$L = \frac{N (B A)}{I} = \frac{(n \ell)(\mu_0 n I A)}{I} = \mu_0 n^2 A \ell = \mu_0 n^2 V$$<br>"
        r"3. <b>Inductancia Mutua y Reciprocidad:</b> $M_{12} = \frac{N_2 \Phi_{21}}{I_1} = M_{21} = M$.<br>"
        r"4. <b>Densidad de energía magnética:</b> $u_B = \frac{B^2}{2\mu_0}$, y energía total $U_B = \frac{1}{2} L I^2$."))
    n20.add_card(ClozeCard("Transitorio RL Serie",
        r"En un circuito con fuente $\mathcal{E}$, resistencia $R$ e inductor $L$ cerrado en $t = 0$ con $i(0) = 0$:"
        r"<br>- Ecuación diferencial: $$\mathcal{E} - L\frac{di}{dt} - R i = 0$$"
        r"<br>- Crecimiento de corriente: $$i(t) = {{c1::\frac{\mathcal{E}}{R}(1 - e^{-t/\tau_L})}}$$ donde la constante inductiva es $\tau_L = {{c2::\frac{L}{R}}}$."
        r"<br>- Desconexión de la fuente: $$i(t) = {{c3::I_0 e^{-t/\tau_L}}}$$."))
    n20.add_card(ClozeCard("Inductancia Mutua de Dos Solenoides Coaxiales Largos",
        r"Considere dos solenoides coaxiales largos de longitud $\ell$: uno interior de radio $r_1$ con $N_1$ vueltas, y uno exterior de radio $r_2 > r_1$ con $N_2$ vueltas:"
        r"<br>- Haciendo circular corriente $I_1$ en el solenoide interior: produce campo uniforme $B_1 = {{c1::\mu_0 \frac{N_1}{\ell} I_1}}$ confinado en el radio $r_1$."
        r"<br>- Flujo a través de cada espira del solenoide 2: $\Phi_{21} = B_1 (\pi r_1^2) = \mu_0 \frac{N_1}{\ell} I_1 (\pi r_1^2)$ (limitado por el área {{c2::del solenoide interior $r_1$}})."
        r"<br>- Inductancia mutua del sistema: $$M = \frac{N_2 \Phi_{21}}{I_1} = {{c3::\mu_0 \frac{N_1 N_2}{\ell} \pi r_1^2}}$$"
        r"<br>- Por el teorema de reciprocidad: si circulara $I_2$ por el solenoide exterior, se obtiene exactamente {{c4::el mismo valor de $M$}}."))
    course.notes.append(n20)

    # --------------------------------------------------------------------------
    # 21. Herramientas Matemáticas, Integrales y Sanity Checks
    # --------------------------------------------------------------------------
    n21 = NoteNode("em_21", "Tabla Maestra de Integrales y Sanity Checks", 380.0, 1040.0, ["EM", "Integrales", "Sanity Check"])
    n21.add_card(Flashcard("Las 3 Integrales Clásicas de Biot-Savart en Examen",
        r"Escriba los resultados de las 3 integrales indefinidas más recurrentes en problemas de electrostática y Biot-Savart.",
        r"1. <b>Integral tipo Biot-Savart transversal:</b><br>"
        r"$$\int \frac{dx}{(x^2 + a^2)^{3/2}} = \frac{x}{a^2 \sqrt{x^2 + a^2}} + C$$<br>"
        r"2. <b>Integral tipo Biot-Savart con numerador $x$:</b><br>"
        r"$$\int \frac{x \, dx}{(x^2 + a^2)^{3/2}} = -\frac{1}{\sqrt{x^2 + a^2}} + C$$<br>"
        r"3. <b>Integral logarítmica de alambre:</b><br>"
        r"$$\int \frac{dx}{\sqrt{x^2 + a^2}} = \ln\left(x + \sqrt{x^2 + a^2}\right) + C$$"))
    n21.add_card(ClozeCard("Análisis Dimensional y Unidades SI en Electromagnetismo",
        r"Unidades fundamentales para verificar dimensiones en la I2:"
        r"<br>- Campo Eléctrico: $[\mathbf{E}] = {{c1::\text{V/m} = \text{N/C}}}$"
        r"<br>- Desplazamiento Eléctrico: $[\mathbf{D}] = {{c2::\text{C/m}^2}}$"
        r"<br>- Campo Magnético: $[\mathbf{B}] = {{c3::\text{T} = \frac{\text{N}}{\text{A}\cdot\text{m}} = \frac{\text{kg}}{\text{s}^2\cdot\text{A}}}}$"
        r"<br>- Campo Auxiliar H: $[\mathbf{H}] = {{c4::\text{A/m}}}$"
        r"<br>- Inductancia: $[L] = {{c5::\text{H} = \Omega \cdot \text{s} = \frac{\text{T}\cdot\text{m}^2}{\text{A}}}}$."))
    course.notes.append(n21)

    # --------------------------------------------------------------------------
    # Edges (Dependencias Pedagógicas)
    # --------------------------------------------------------------------------
    edges_def = [
        ("em_00", "em_01"), ("em_01", "em_02"), ("em_02", "em_03"), ("em_03", "em_04"),
        ("em_03", "em_05"), ("em_05", "em_06"), ("em_01", "em_07"), ("em_07", "em_08"),
        ("em_08", "em_09"), ("em_06", "em_09"), ("em_01", "em_10"), ("em_10", "em_11"),
        ("em_10", "em_12"), ("em_12", "em_13"), ("em_13", "em_14"), ("em_01", "em_15"),
        ("em_15", "em_16"), ("em_16", "em_17"), ("em_13", "em_18"), ("em_18", "em_19"),
        ("em_18", "em_20"), ("em_14", "em_21"), ("em_17", "em_21")
    ]
    for s, t in edges_def:
        course.edges.append(NoteEdge(source_id=s, target_id=t))

    return course
