#!/usr/bin/env python3
"""
Enhanced Generator Script for Morphism SRS Plus:
Generates 4 extensive, exam-focused courses:
1. Electricidad y Magnetismo (I2) [22 Notes, 52 Cards]
2. Análisis Real (I3) [22 Notes, 50 Cards]
3. Química para Ingenieros (I2) [22 Notes, 48 Cards]
4. OFG Muerte (Presentación y Guión) [18 Notes, 40 Cards]

Total: 84 Notes, ~190 Cards, 84 Edges.
"""

import os
import json
from morphism.core.models import Course, NoteNode, NoteEdge, Flashcard, ClozeCard, ProofSequenceCard
from morphism.core.course_storage import save_course, COURSES_DIR

# ==============================================================================
# CURSO 1: ELECTRICIDAD Y MAGNETISMO (I2)
# ==============================================================================
def build_electricidad_magnetismo_course() -> Course:
    course = Course(name="Electricidad y Magnetismo (I2)")

    # 1. Álgebra Vectorial y Operadores Curvilíneos
    n1 = NoteNode("em_01", "Álgebra Vectorial y Operadores Curvilíneos", 80.0, 80.0, ["EM", "Vectores", "Operadores"])
    n1.add_card(ClozeCard("Regla BAC-CAB e Identidades de Rotacional",
        r"Triple producto vectorial: $$\mathbf{A} \times (\mathbf{B} \times \mathbf{C}) = {{c1::\mathbf{B}(\mathbf{A}\cdot\mathbf{C}) - \mathbf{C}(\mathbf{A}\cdot\mathbf{B})}}$$"
        r"<br>Identidades diferenciales nulas: $\nabla \times (\nabla f) = {{c2::\mathbf{0}}}$ y $\nabla \cdot (\nabla \times \mathbf{A}) = {{c3::0}}$."))
    n1.add_card(Flashcard("Operadores en Coordenadas Cilíndricas y Esféricas",
        r"Escriba la divergencia $\nabla \cdot \mathbf{A}$ en cilíndricas y esféricas.",
        r"1. <b>Cilíndricas $(r, \theta, z)$:</b> $\nabla \cdot \mathbf{A} = \frac{1}{r}\partial_r(r A_r) + \frac{1}{r}\partial_\theta A_\theta + \partial_z A_z$.<br>"
        r"2. <b>Esféricas $(r, \theta, \phi)$:</b> $\nabla \cdot \mathbf{A} = \frac{1}{r^2}\partial_r(r^2 A_r) + \frac{1}{r\sin\theta}\partial_\theta(\sin\theta A_\theta) + \frac{1}{r\sin\theta}\partial_\phi A_\phi$."))
    n1.add_card(ClozeCard("Laplaciano Vectorial y Teorema de Stokes",
        r"El laplaciano de un campo vectorial se descompone como: $$\nabla^2 \mathbf{A} = {{c1::\nabla(\nabla \cdot \mathbf{A}) - \nabla \times (\nabla \times \mathbf{A})}}$$"
        r"<br>Teorema de Stokes: $\oint_{\partial S} \mathbf{A} \cdot d\boldsymbol{\ell} = {{c2::\iint_S (\nabla \times \mathbf{A}) \cdot d\mathbf{S}}}$."))
    course.notes.append(n1)

    # 2. Polarización P y Cargas Ligadas
    n2 = NoteNode("em_02", "Polarización P y Cargas Ligadas", 380.0, 80.0, ["EM", "Polarización", "Cargas Ligadas"])
    n2.add_card(ClozeCard("Definición de Cargas Ligadas",
        r"A partir del vector polarización $\mathbf{P}$:"
        r"<br>- Densidad volumétrica ligada: $\rho_b = {{c1::-\nabla \cdot \mathbf{P}}}$"
        r"<br>- Densidad superficial ligada: $\sigma_b = {{c2::\mathbf{P} \cdot \hat{n}}}$."))
    n2.add_card(ProofSequenceCard("Carga Ligada Total Nula en Dieléctricos Neutros",
        r"Demostrar que la carga ligada neta de un dieléctrico neutro cerrado es idénticamente cero.",
        [
            r"Carga ligada total: $Q_{b,\text{tot}} = \iiint_V \rho_b \, dV + \iint_{\partial V} \sigma_b \, dA$.",
            r"Sustituyendo definiciones: $Q_{b,\text{tot}} = -\iiint_V (\nabla \cdot \mathbf{P}) \, dV + \iint_{\partial V} (\mathbf{P} \cdot \hat{n}) \, dA$.",
            r"Por el Teorema de Gauss: $\iiint_V (\nabla \cdot \mathbf{P}) \, dV = \iint_{\partial V} (\mathbf{P} \cdot \hat{n}) \, dA$.",
            r"Restando ambas integrales: $Q_{b,\text{tot}} = 0$."
        ]))
    n2.add_card(Flashcard("Potencial Electrostático de un Dipolo Puntual",
        r"¿Cuál es el potencial $V(\mathbf{r})$ y campo $\mathbf{E}(\mathbf{r})$ de un dipolo puntual $\mathbf{p}$ en el origen?",
        r"1. <b>Potencial:</b> $V(\mathbf{r}) = \frac{1}{4\pi\varepsilon_0}\frac{\mathbf{p}\cdot\hat{r}}{r^2} = \frac{1}{4\pi\varepsilon_0}\frac{\mathbf{p}\cdot\mathbf{r}}{r^3}$.<br>"
        r"2. <b>Campo Eléctrico:</b> $\mathbf{E}(\mathbf{r}) = -\nabla V = \frac{1}{4\pi\varepsilon_0}\frac{3(\mathbf{p}\cdot\hat{r})\hat{r} - \mathbf{p}}{r^3}$."))
    course.notes.append(n2)

    # 3. Desplazamiento Eléctrico D y Ley de Gauss
    n3 = NoteNode("em_03", "Desplazamiento Eléctrico D y Ley de Gauss", 680.0, 80.0, ["EM", "Gauss", "Desplazamiento"])
    n3.add_card(ClozeCard("Ley de Gauss en Dieléctricos",
        r"El vector desplazamiento se define como $\mathbf{D} = {{c1::\varepsilon_0 \mathbf{E} + \mathbf{P}}}$."
        r"<br>Ley de Gauss en dieléctricos: $\nabla \cdot \mathbf{D} = {{c2::\rho_f}}$ y $\oint \mathbf{D} \cdot d\mathbf{A} = {{c3::Q_{f,\text{enc}}}}$."))
    n3.add_card(Flashcard("Relaciones Constitutivas en Medios LHI",
        r"En un dieléctrico Lineal, Homogéneo e Isótropo (LHI), ¿cuáles son las relaciones entre $\mathbf{P}, \mathbf{E}, \mathbf{D}, \chi_e, \kappa$ y $\varepsilon$?",
        r"1. $\mathbf{P} = \varepsilon_0 \chi_e \mathbf{E} = (\varepsilon - \varepsilon_0)\mathbf{E}$.<br>"
        r"2. $\mathbf{D} = \varepsilon \mathbf{E} = \kappa \varepsilon_0 \mathbf{E}$.<br>"
        r"3. $\kappa = \varepsilon_r = 1 + \chi_e$ y $\varepsilon = \kappa \varepsilon_0$."))
    course.notes.append(n3)

    # 4. Condiciones de Borde en Interfaces Dieléctricas
    n4 = NoteNode("em_04", "Condiciones de Borde y Refracción de Líneas", 980.0, 80.0, ["EM", "Condiciones de Borde", "Interfaces"])
    n4.add_card(ClozeCard("Continuidad y Salto en la Interfaz",
        r"En la interfaz entre dos dieléctricos:"
        r"<br>- Componente tangencial: ${{c1::E_{1t} - E_{2t} = 0}}$ (pues $\nabla \times \mathbf{E} = \mathbf{0}$)."
        r"<br>- Componente normal: ${{c2::D_{1n} - D_{2n} = \sigma_f}}$."
        r"<br>Si no hay carga libre ($\sigma_f = 0$): $D_{1n} = D_{2n} \iff \varepsilon_1 E_{1n} = \varepsilon_2 E_{2n}$."))
    n4.add_card(Flashcard("Ley de Refracción de Líneas de Campo Eléctrico",
        r"Deduzca la relación entre los ángulos de incidencia y refracción $(\theta_1, \theta_2)$ respecto a la normal en una interfaz sin cargas libres.",
        r"Por condiciones de borde:<br>"
        r"1. $E_{1t} = E_{2t} \implies E_1 \sin\theta_1 = E_2 \sin\theta_2$.<br>"
        r"2. $D_{1n} = D_{2n} \implies \varepsilon_1 E_1 \cos\theta_1 = \varepsilon_2 E_2 \cos\theta_2$.<br>"
        r"3. Dividiendo ambas ecuaciones:<br>"
        r"$$\frac{\tan\theta_1}{\tan\theta_2} = \frac{\varepsilon_1}{\varepsilon_2} = \frac{\kappa_1}{\kappa_2}$$"))
    n4.add_card(ClozeCard("Interfaz Conductor-Dieléctrico",
        r"En la superficie de un conductor ideal en equilibrio en contacto con dieléctrico $\varepsilon$:"
        r"<br>- Campo tangencial: $E_t = {{c1::0}}$."
        r"<br>- Campo normal exterior: $E_n = {{c2::\frac{\sigma_f}{\varepsilon}}}$."))
    course.notes.append(n4)

    # 5. Esfera y Cilindro Dieléctrico en Campo Exterior
    n5 = NoteNode("em_05", "Esferas y Cilindros Dieléctricos", 1280.0, 80.0, ["EM", "Esfera", "Cilindro", "Laplace"])
    n5.add_card(Flashcard("Campo Interior y Polarización en Esfera Dieléctrica",
        r"Para una esfera dieléctrica LHI de permitividad $\varepsilon$ en campo uniforme exterior $\mathbf{E}_0$, calcule $\mathbf{E}_{\text{int}}$ y $\mathbf{P}$.",
        r"1. <b>Campo Interior Uniforme:</b> $\mathbf{E}_{\text{int}} = \frac{3}{\kappa + 2} \mathbf{E}_0 = \frac{3\varepsilon_0}{\varepsilon + 2\varepsilon_0} \mathbf{E}_0$.<br>"
        r"2. <b>Polarización Interior:</b> $\mathbf{P} = 3\varepsilon_0 \left(\frac{\kappa - 1}{\kappa + 2}\right) \mathbf{E}_0$.<br>"
        r"3. <b>Cargas Ligadas:</b> $\rho_b = 0$, y $\sigma_b = P \cos\theta$."))
    n5.add_card(ClozeCard("Cilindro Dieléctrico en Campo Transversal",
        r"Para un cilindro dieléctrico infinito en campo uniforme perpendicular $\mathbf{E}_0$:"
        r"<br>- Campo eléctrico interior: $\mathbf{E}_{\text{int}} = {{c1::\frac{2}{\kappa + 1} \mathbf{E}_0}}$"
        r"<br>- Polarización interior: $\mathbf{P} = {{c2::2\varepsilon_0 \frac{\kappa - 1}{\kappa + 1} \mathbf{E}_0}}$."))
    course.notes.append(n5)

    # 6. Capacitancia con Dieléctricos Múltiples
    n6 = NoteNode("em_06", "Capacitancia y Medios Multicapa", 80.0, 340.0, ["EM", "Capacitancia", "Multicapa"])
    n6.add_card(ClozeCard("Capas Dieléctricas en Serie vs Paralelo",
        r"En capacitores de placas paralelas:"
        r"<br>- Capas perpendiculares a $\mathbf{E}$ (apiladas en espesor): suman en {{c1::serie}}, $\frac{1}{C} = \sum \frac{d_i}{\varepsilon_i A}$."
        r"<br>- Capas paralelas a $\mathbf{E}$ (yuxtapuestas en área): suman en {{c2::paralelo}}, $C = \sum \frac{\varepsilon_i A_i}{d}$."))
    n6.add_card(Flashcard("Capacitancia Cilíndrica y Esférica con Dieléctrico",
        r"Escriba la capacitancia de un cable coaxial ($a < b$, largo $L$) y de un capacitor esférico ($a < b$) llenos de dieléctrico $\varepsilon$.",
        r"1. <b>Cilíndrico:</b> $C = \frac{2\pi \varepsilon L}{\ln(b/a)}$.<br>"
        r"2. <b>Esférico:</b> $C = 4\pi \varepsilon \frac{ab}{b - a}$."))
    course.notes.append(n6)

    # 7. Energía Electrostática y Fuerzas Mecánicas
    n7 = NoteNode("em_07", "Energía y Fuerzas sobre Dieléctricos", 380.0, 340.0, ["EM", "Energía", "Fuerza Virtual"])
    n7.add_card(ClozeCard("Fuerza Electrostática: Carga vs Voltaje Constante",
        r"Por el método del trabajo virtual, la fuerza sobre un dieléctrico móvil es:"
        r"<br>- A carga constante $Q$: $F_x = {{c1::-\left(\frac{\partial U}{\partial x}\right)_Q}}$"
        r"<br>- A voltaje constante $V$: $F_x = {{c2::+\left(\frac{\partial U}{\partial x}\right)_V = +\frac{1}{2} V^2 \frac{dC}{dx}}}$."
        r"<br>El dieléctrico es siempre {{c3::succionado hacia el interior del capacitor}}."))
    n7.add_card(ProofSequenceCard("Fuerza sobre Placa Dieléctrica Parcialmente Insertada",
        r"Calcular la fuerza $F_x$ sobre una lámina dieléctrica de ancho $w$ y espesor $d$ insertada distancia $x$ a voltaje fijo $V$.",
        [
            r"Capacitancia total: $C(x) = \frac{\varepsilon_0 w (L - x)}{d} + \frac{\varepsilon w x}{d} = \frac{w}{d}[\varepsilon_0 L + (\varepsilon - \varepsilon_0)x]$.",
            r"A voltaje constante $V$, $F_x = +\frac{1}{2} V^2 \frac{dC}{dx}$.",
            r"Derivando: $\frac{dC}{dx} = \frac{w(\varepsilon - \varepsilon_0)}{d} = \frac{\varepsilon_0 w (\kappa - 1)}{d}$.",
            r"Resultado: $F_x = \frac{\varepsilon_0 w (\kappa - 1) V^2}{2d} > 0$ (fuerza atractiva hacia el interior)."
        ]))
    n7.add_card(ClozeCard("Presión Electrostática en Conductor",
        r"La fuerza por unidad de área (presión electrostática hacia el exterior) en la superficie de un conductor cargado es:"
        r"<br>$$P_{\text{es}} = {{c1::\frac{\sigma^2}{2\varepsilon_0} = \frac{1}{2} \varepsilon_0 E^2}}$$"
        r"<br>Siempre está dirigida hacia {{c2::el exterior del conductor}} independientemente del signo de $\sigma$."))
    course.notes.append(n7)

    # 8. Corriente Eléctrica, Densidad J y Continuidad
    n8 = NoteNode("em_08", "Corriente y Ecuación de Continuidad", 680.0, 340.0, ["EM", "Corriente", "Densidad J", "Continuidad"])
    n8.add_card(ClozeCard("Ecuación de Continuidad y Tiempo de Relajación",
        r"Conservación de la carga: $\nabla \cdot \mathbf{J} + {{c1::\frac{\partial \rho}{\partial t}}} = 0$."
        r"<br>En un conductor óhmico homogéneo: $\rho(t) = \rho_0 e^{-t/\tau_{\text{rel}}}$ con tiempo de relajación $\tau_{\text{rel}} = {{c2::\frac{\varepsilon}{\sigma}}}$."))
    course.notes.append(n8)

    # 9. Modelo de Drude, Ley de Ohm y Teorema Dual RC
    n9 = NoteNode("em_09", "Modelo de Drude y Teorema Dual RC", 980.0, 340.0, ["EM", "Drude", "Ohm", "Teorema Dual"])
    n9.add_card(ClozeCard("Conductividad de Drude y Teorema Dual RC",
        r"Conductividad microscópica según Drude: $\sigma = {{c1::\frac{n q^2 \tau}{m}}}$."
        r"<br>Teorema Dual RC entre resistencia y capacitancia para cualquier geometría en medio LHI:"
        r"<br>$$R \cdot C = {{c2::\frac{\varepsilon}{\sigma} = \rho_e \varepsilon}}$$"))
    n9.add_card(Flashcard("Resistencia de Puesta a Tierra Semiesférica",
        r"Calcule la resistencia de puesta a tierra de un electrodo semiesférico de radio $a$ enterrado en suelo con conductividad $\sigma$.",
        r"1. Por simetría radial, la corriente $I$ fluye por la semiesfera de área $2\pi r^2$: $J(r) = \frac{I}{2\pi r^2}$.<br>"
        r"2. Campo eléctrico: $E(r) = \frac{J}{\sigma} = \frac{I}{2\pi \sigma r^2}$.<br>"
        r"3. Diferencia de potencial hasta el infinito: $V = \int_a^\infty E(r) dr = \frac{I}{2\pi \sigma a}$.<br>"
        r"4. Resistencia de tierra: $R = \frac{V}{I} = \frac{1}{2\pi \sigma a}$."))
    course.notes.append(n9)

    # 10. Circuitos DC, Thévenin, Norton y Máxima Potencia
    n10 = NoteNode("em_10", "Circuitos DC y Equivalentes de Thévenin", 1280.0, 340.0, ["EM", "Circuitos", "Thévenin", "Norton"])
    n10.add_card(ClozeCard("Equivalentes de Thévenin, Norton y Máxima Potencia",
        r"Equivalentes de red lineal:"
        r"<br>- Thévenin: Fuente $V_{th}$ en serie con $R_{th}$."
        r"<br>- Norton: Fuente de corriente $I_N = {{c1::\frac{V_{th}}{R_{th}}}}$ en paralelo con $R_{th}$."
        r"<br>- Condición de máxima potencia transferida a $R_L$: $R_L = {{c2::R_{th}}}$ con $P_{\max} = {{c3::\frac{V_{th}^2}{4 R_{th}}}}$."))
    course.notes.append(n10)

    # 11. Transitorios RC y Balance Energético
    n11 = NoteNode("em_11", "Transitorios RC y Balance Energético", 80.0, 600.0, ["EM", "RC", "Transitorio", "50%"])
    n11.add_card(ProofSequenceCard("Balance de Energía del 50% en Carga RC",
        r"Demostrar que en la carga de un condensador desde 0 hasta $C\mathcal{E}$, el 50% de la energía de la fuente se disipa en calor.",
        [
            r"Energía entregada por la fuente: $W_{\text{fuente}} = \int_0^\infty \mathcal{E} i(t) dt = \mathcal{E} Q_{\text{final}} = C \mathcal{E}^2$.",
            r"Energía almacenada en el capacitor: $U_C = \frac{1}{2} C \mathcal{E}^2$.",
            r"Energía disipada por Joule en la resistencia: $E_R = \int_0^\infty i(t)^2 R dt = \frac{\mathcal{E}^2}{R} \int_0^\infty e^{-2t/RC} dt$.",
            r"Evaluando la integral: $\int_0^\infty e^{-2t/RC} dt = \frac{RC}{2} \implies E_R = \frac{1}{2} C \mathcal{E}^2$.",
            r"Se verifica estrictamente: $W_{\text{fuente}} = U_C + E_R$ con $E_R = 50\% W_{\text{fuente}}$."
        ]))
    n11.add_card(Flashcard("Comportamiento en Transitorios: t=0+ vs t->infinito",
        r"¿Cómo se modelan los capacitores e inductores en $t=0^+$ y en $t \to \infty$?",
        r"1. <b>Capacitor:</b><br>- En $t=0^+$: <b>Cortocircuito</b> ($\Delta V_C = 0$).<br>- En $t\to\infty$: <b>Circuito abierto</b> ($i_C = 0$).<br><br>"
        r"2. <b>Inductor:</b><br>- En $t=0^+$: <b>Circuito abierto</b> ($i_L = 0$).<br>- En $t\to\infty$: <b>Cortocircuito</b> ($\Delta V_L = 0$)."))
    course.notes.append(n11)

    # 12. Fuerza de Lorentz, Ciclotrón y Movimiento Helicoidal
    n12 = NoteNode("em_12", "Fuerza de Lorentz y Movimiento Helicoidal", 380.0, 600.0, ["EM", "Lorentz", "Ciclotrón", "Larmor"])
    n12.add_card(ClozeCard("Fuerza de Lorentz y Radio Ciclotrónico",
        r"Fuerza total: $\mathbf{F} = q(\mathbf{E} + \mathbf{v}\times\mathbf{B})$."
        r"<br>La potencia del campo magnético es $P = \mathbf{F}_B \cdot \mathbf{v} = {{c1::0}}$, por lo que {{c2::nunca altera la energía cinética}}."
        r"<br>Radio ciclotrón: $r_c = {{c3::\frac{m v_\perp}{q B}}}$, período: $T = {{c4::\frac{2\pi m}{q B}}}$."))
    n12.add_card(Flashcard("Paso de la Trayectoria Helicoidal",
        r"Si una partícula entra a un campo $\mathbf{B}$ con ángulo $\alpha$ respecto a las líneas de campo, ¿cuál es el paso de avance $p$?",
        r"1. Componente paralela constante: $v_\parallel = v \cos\alpha$.<br>"
        r"2. Período de giro en el plano transversal: $T = \frac{2\pi m}{q B}$.<br>"
        r"3. Paso helicoidal: $p = v_\parallel T = \frac{2\pi m v \cos\alpha}{q B}$."))
    course.notes.append(n12)

    # 13. Efecto Hall y Selector de Velocidades
    n13 = NoteNode("em_13", "Efecto Hall y Selector de Wien", 680.0, 600.0, ["EM", "Hall", "Wien", "Portadores"])
    n13.add_card(ClozeCard("Fórmulas del Efecto Hall y Selector",
        r"- Selector de velocidades con $\mathbf{E} \perp \mathbf{B}$: velocidad filtrada $v = {{c1::\frac{E}{B}}}$."
        r"<br>- Voltaje de Hall en cinta de espesor $t$: $\Delta V_H = {{c2::\frac{I B}{n q t} = R_H \frac{I B}{t}}}$."
        r"<br>- Coeficiente de Hall: $R_H = {{c3::\frac{1}{nq}}}$, cuyo signo revela el tipo de portadores mayoritarios."))
    course.notes.append(n13)

    # 14. Fuerza de Laplace, Espiras y Dipolos Magnéticos
    n14 = NoteNode("em_14", "Fuerzas y Torques sobre Espiras y Dipolos", 980.0, 600.0, ["EM", "Laplace", "Dipolo", "Torque"])
    n14.add_card(ClozeCard("Fuerza y Torque sobre Espiras",
        r"Fuerza elemental sobre corriente: $d\mathbf{F} = {{c1::I d\boldsymbol{\ell} \times \mathbf{B}}}$."
        r"<br>Para una espira plana de área vectorial $\mathbf{A}$ con corriente $I$:"
        r"<br>- Momento dipolar: $\boldsymbol{\mu} = {{c2::I \mathbf{A}}}$"
        r"<br>- Torque: $\boldsymbol{\tau} = {{c3::\boldsymbol{\mu} \times \mathbf{B}}}$"
        r"<br>- Energía potencial: $U = {{c4::-\boldsymbol{\mu} \cdot \mathbf{B}}}$."))
    course.notes.append(n14)

    # 15. Ley de Biot-Savart y Alambres Conductores
    n15 = NoteNode("em_15", "Ley de Biot-Savart y Alambres Conductores", 1280.0, 600.0, ["EM", "Biot-Savart", "Alambres"])
    n15.add_card(ClozeCard("Fórmulas de Biot-Savart para Alambres",
        r"Ley de Biot-Savart: $d\mathbf{B} = \frac{\mu_0 I}{4\pi}\frac{d\boldsymbol{\ell}\times\hat{r}}{r^2}$."
        r"<br>- Segmento finito entre $\theta_1$ y $\theta_2$: $B = {{c1::\frac{\mu_0 I}{4\pi d}(\sin\theta_2 - \sin\theta_1)}}$."
        r"<br>- Hilo infinito: $B = {{c2::\frac{\mu_0 I}{2\pi d}}}$."
        r"<br>- Puntos colineales en la prolongación del alambre: $B = {{c3::0}}$."))
    course.notes.append(n15)

    # 16. Espiras Circulares, Arcos y Bobinas de Helmholtz
    n16 = NoteNode("em_16", "Espiras Circulares y Bobinas de Helmholtz", 80.0, 860.0, ["EM", "Espira", "Helmholtz", "Biot-Savart"])
    n16.add_card(ProofSequenceCard("Campo en el Eje de Espira Circular",
        r"Calcular el campo axial $B_z(z)$ de una espira circular de radio $R$ con corriente $I$.",
        [
            r"Distancia al punto de observación en el eje: $r = \sqrt{R^2 + z^2}$.",
            r"Módulo del campo diferencial: $dB = \frac{\mu_0 I d\ell}{4\pi (R^2+z^2)}$.",
            r"Por simetría circular, las componentes radiales se anulan: $\oint dB_\perp = 0$.",
            r"Componente axial: $dB_z = dB \cos\theta = dB \frac{R}{\sqrt{R^2+z^2}} = \frac{\mu_0 I R}{4\pi (R^2+z^2)^{3/2}} d\ell$.",
            r"Integrando sobre la espira ($2\pi R$): $B_z = \frac{\mu_0 I R^2}{2(R^2+z^2)^{3/2}}$. En el centro ($z=0$): $B = \frac{\mu_0 I}{2R}$."
        ]))
    n16.add_card(Flashcard("Bobinas de Helmholtz: Campo Óptimamente Homogéneo",
        r"¿Por qué en las bobinas de Helmholtz la separación óptima entre bobinas es $d = R$?",
        r"En el punto medio $z=0$ entre ambas bobinas coaxiales:<br>"
        r"1. Por simetría par, la primera derivada es nula: $\frac{dB}{dz} = 0$.<br>"
        r"2. La segunda derivada es proporcional a $(4d^2 - R^2)$. Fijando $d=R$, se anula idénticamente: $\frac{d^2 B}{dz^2} = 0$.<br>"
        r"3. Las variaciones espaciales son de orden cuatro ($O(z^4)$), logrando la máxima uniformidad magnética experimental."))
    n16.add_card(ClozeCard("Campo en el Centro de un Arco Circular",
        r"Para un arco circular de radio $R$ que subtiende un ángulo $\alpha$ (en radianes) con corriente $I$:"
        r"<br>$$B_{\text{centro}} = {{c1::\frac{\mu_0 I \alpha}{4\pi R}}}$$"
        r"<br>Si es una espira completa ($\alpha = 2\pi$): $B = \frac{\mu_0 I}{2R}$."))
    course.notes.append(n16)

    # 17. Fuerzas entre Conductores Paralelos y Espiras Coplanares
    n17 = NoteNode("em_17", "Fuerzas entre Conductores y Espiras Coplanares", 380.0, 860.0, ["EM", "Fuerza Magnética", "Espira Coplanar"])
    n17.add_card(ClozeCard("Fuerza entre Hilos Paralelos",
        r"Fuerza por unidad de longitud entre dos conductores paralelos separados distancia $d$:"
        r"<br>$$\frac{F}{L} = {{c1::\frac{\mu_0 I_1 I_2}{2\pi d}}}$$"
        r"<br>- Corrientes en el mismo sentido: se {{c2::atraen}}."
        r"<br>- Corrientes en sentidos opuestos: se {{c3::repelen}}."))
    n17.add_card(Flashcard("Fuerza Neta sobre Espira Coplanar a Hilo Infinito",
        r"Una espira rectangular de lados $a$ (paralelo) y $b$ (perpendicular) con corriente $I_2$ se sitúa a distancia $d$ de un hilo largo con corriente $I_1$. Calcule la fuerza neta.",
        r"1. Los lados perpendiculares sufren fuerzas opuestas que se cancelan vectorialmente.<br>"
        r"2. Lado cercano (atracción): $F_1 = \frac{\mu_0 I_1 I_2 a}{2\pi d}$.<br>"
        r"3. Lado lejano (repulsión): $F_2 = \frac{\mu_0 I_1 I_2 a}{2\pi (d+b)}$.<br>"
        r"4. Fuerza Neta Atractiva:<br>$$F_{\text{net}} = \frac{\mu_0 I_1 I_2 a b}{2\pi d(d+b)}$$"))
    course.notes.append(n17)

    # 18. Ley de Ampère y Medios de Alta Simetría
    n18 = NoteNode("em_18", "Ley de Ampère y Medios de Alta Simetría", 680.0, 860.0, ["EM", "Ampère", "Solenoide", "Toroide"])
    n18.add_card(ClozeCard("Formas de la Ley de Ampère",
        r"- Integral: $\oint_{\mathcal{C}} \mathbf{B} \cdot d\boldsymbol{\ell} = {{c1::\mu_0 I_{\text{enc}}}}$"
        r"<br>- Diferencial: $\nabla \times \mathbf{B} = {{c2::\mu_0 \mathbf{J}}}$."
        r"<br>- En solenoide ideal de $n$ espiras/metro: interior $B = {{c3::\mu_0 n I}}$, exterior $B \approx 0$."
        r"<br>- En toroide de $N$ espiras y radio medio $r$: $B(r) = {{c4::\frac{\mu_0 N I}{2\pi r}}}$."))
    course.notes.append(n18)

    # 19. Magnetismo en la Materia y Campo H
    n19 = NoteNode("em_19", "Magnetismo en la Materia y Campo H", 980.0, 860.0, ["EM", "Magnetización", "Campo H", "Materiales"])
    n19.add_card(ClozeCard("Magnetización y Campo Auxiliar H",
        r"A partir del vector magnetización $\mathbf{M}$:"
        r"<br>- Corriente volumétrica ligada: $\mathbf{J}_b = {{c1::\nabla \times \mathbf{M}}}$"
        r"<br>- Corriente superficial ligada: $\mathbf{K}_b = {{c2::\mathbf{M} \times \hat{n}}}$"
        r"<br>- Campo auxiliar: $\mathbf{H} = {{c3::\frac{\mathbf{B}}{\mu_0} - \mathbf{M}}}$, con $\oint \mathbf{H} \cdot d\boldsymbol{\ell} = I_{f,\text{enc}}$."))
    n19.add_card(Flashcard("Condiciones de Borde en Interfaces Magnéticas",
        r"¿Cuáles son las condiciones de frontera para $\mathbf{B}$ y $\mathbf{H}$ en la interfaz entre dos medios magnéticos?",
        r"1. <b>Componente normal de $\mathbf{B}$:</b> Es estrictamente continua:<br>"
        r"$$B_{1n} - B_{2n} = 0 \iff B_{1n} = B_{2n}$$<br>"
        r"(debido a $\nabla \cdot \mathbf{B} = 0$, no existen monopolos magnéticos).<br>"
        r"2. <b>Componente tangencial de $\mathbf{H}$:</b> Salto determinado por la corriente libre superficial $\mathbf{K}_f$:<br>"
        r"$$\mathbf{H}_{1t} - \mathbf{H}_{2t} = \mathbf{K}_f \times \hat{n}$$<br>"
        r"Si no hay corrientes libres superficiales ($\mathbf{K}_f = \mathbf{0}$): $H_{1t} = H_{2t}$."))
    course.notes.append(n19)

    # 20. Inducción de Faraday y Ley de Lenz
    n20 = NoteNode("em_20", "Inducción Electromagnética y Ley de Faraday", 1280.0, 860.0, ["EM", "Faraday", "Lenz", "Inducción"])
    n20.add_card(ClozeCard("Leyes de Faraday y Lenz",
        r"Fuerza electromotriz inducida en circuito cerrado:"
        r"<br>$$\mathcal{E} = \oint \mathbf{E} \cdot d\boldsymbol{\ell} = {{c1::-\frac{d\Phi_B}{dt}}}$$"
        r"<br>Forma diferencial de Maxwell-Faraday:"
        r"<br>$$\nabla \times \mathbf{E} = {{c2::-\frac{\partial \mathbf{B}}{\partial t}}}$$"
        r"<br>El signo negativo de Lenz impone que la corriente inducida {{c3::se opone al cambio de flujo}}."))
    course.notes.append(n20)

    # 21. FEM de Movimiento y Rieles Deslizantes
    n21 = NoteNode("em_21", "FEM de Movimiento y Rieles Deslizantes", 380.0, 1120.0, ["EM", "FEM de Movimiento", "Rieles"])
    n21.add_card(ProofSequenceCard("Conservación de Energía en Barra Deslizante sobre Rieles",
        r"Demostrar que la potencia mecánica suministrada a una barra deslizante perpendicular a rieles coincide con la disipada por Joule.",
        [
            r"FEM inducida de movimiento: $\mathcal{E} = v B L$, corriente $I = \frac{\mathcal{E}}{R} = \frac{v B L}{R}$.",
            r"Fuerza magnética de frenado de Lorentz: $F_m = I L B = \frac{v B^2 L^2}{R}$.",
            r"Potencia mecánica requerida: $P_{\text{mec}} = F_m v = \frac{v^2 B^2 L^2}{R}$.",
            r"Potencia disipada en la resistencia: $P_{\text{dis}} = I^2 R = \left(\frac{v B L}{R}\right)^2 R = \frac{v^2 B^2 L^2}{R}$.",
            r"Se verifica estrictamente: $P_{\text{mec}} = P_{\text{dis}}$."
        ]))
    n21.add_card(Flashcard("Disco de Faraday (Generador Homopolar)",
        r"Un disco conductor de radio $R$ gira con velocidad angular constante $\omega$ en un campo magnético uniforme paralelo a su eje $\mathbf{B} = B\hat{z}$. Calcule la FEM inducida entre el centro y el borde.",
        r"1. Cada elemento radial a distancia $r$ se mueve a velocidad $v(r) = \omega r$.<br>"
        r"2. Campo eléctrico de Lorentz de movimiento: $\mathbf{E}_m = \mathbf{v} \times \mathbf{B} = (\omega r \hat{\theta}) \times (B \hat{z}) = \omega r B \hat{r}$.<br>"
        r"3. La FEM entre el eje y el borde del disco es:<br>"
        r"$$\mathcal{E} = \int_0^R \mathbf{E}_m \cdot d\mathbf{r} = \int_0^R \omega B r \, dr = \frac{1}{2} B \omega R^2$$"))
    course.notes.append(n21)

    # 22. Inductancia, Teorema de Reciprocidad y Transitorios RL
    n22 = NoteNode("em_22", "Inductancia, Reciprocidad y Transitorios RL", 680.0, 1120.0, ["EM", "Inductancia", "Reciprocidad", "RL"])
    n22.add_card(ClozeCard("Inductancia y Densidad de Energía Magnética",
        r"- Teorema de reciprocidad: ${{c1::M_{12} = M_{21} = M}}$."
        r"<br>- Energía en un inductor: $U_B = {{c2::\frac{1}{2} L I^2}}$."
        r"<br>- Densidad volumétrica de energía magnética: $u_B = {{c3::\frac{B^2}{2\mu_0} = \frac{1}{2}\mathbf{B}\cdot\mathbf{H}}}$."
        r"<br>- Constante de tiempo de circuito RL: $\tau_L = {{c4::\frac{L}{R}}}$."))
    course.notes.append(n22)

    # Edges EM
    em_edges = [
        ("em_01", "em_02", "Operadores a Polarización"),
        ("em_02", "em_03", "Polarización a Desplazamiento"),
        ("em_03", "em_04", "Gauss a Condiciones de Borde"),
        ("em_04", "em_05", "Bordes a Esfera Dieléctrica"),
        ("em_03", "em_06", "D a Capacitancia Multicapa"),
        ("em_06", "em_07", "Capacitancia a Fuerzas Virtuales"),
        ("em_02", "em_08", "Cargas a Densidad de Corriente"),
        ("em_08", "em_09", "Continuidad a Modelo de Drude"),
        ("em_09", "em_10", "Resistencia a Thévenin"),
        ("em_10", "em_11", "Thévenin a Transitorios RC"),
        ("em_01", "em_12", "Fuerzas a Dinámica de Lorentz"),
        ("em_12", "em_13", "Lorentz a Efecto Hall"),
        ("em_12", "em_14", "Lorentz a Espiras y Torques"),
        ("em_14", "em_15", "Corrientes a Biot-Savart"),
        ("em_15", "em_16", "Biot-Savart a Espiras y Helmholtz"),
        ("em_15", "em_17", "Biot-Savart a Fuerzas entre Hilos"),
        ("em_16", "em_18", "Biot-Savart a Ley de Ampère"),
        ("em_18", "em_19", "Ampère libre a Magnetización M"),
        ("em_16", "em_20", "Flujo Magnético a Faraday-Lenz"),
        ("em_20", "em_21", "Faraday a FEM de Movimiento"),
        ("em_20", "em_22", "Faraday a Autoinductancia y Energía")
    ]
    for s, t, lbl in em_edges:
        course.edges.append(NoteEdge(source_id=s, target_id=t, label=lbl))

    return course

# ==============================================================================
# CURSO 2: ANÁLISIS REAL (I3)
# ==============================================================================
def build_analisis_real_course() -> Course:
    course = Course(name="Análisis Real (I3)")

    # 1. Espacios Métricos y Topología Relativa
    n1 = NoteNode("ar_01", "Espacios Métricos y Topología Relativa", 80.0, 80.0, ["Análisis Real", "Topología", "Abiertos", "Cerrados"])
    n1.add_card(ClozeCard("Axiomas Métricos y Topología Relativa",
        r"Axiomas métricos: no negatividad, separación $d(x, y)=0 \iff x=y$, simetría y {{c1::desigualdad triangular $d(x, z) \le d(x, y) + d(y, z)$}}."
        r"<br>En subespacio $S \subseteq X$, un conjunto $U_S$ es abierto relativo si y sólo si ${{c2::U_S = U \cap S}}$ con $U$ abierto en $X$."))
    n1.add_card(Flashcard("Bolas en la Métrica Discreta",
        r"Sea $X$ dotado de la métrica discreta $d(x, y) = 1$ si $x \ne y$ y $0$ si $x = y$. Describa las bolas abiertas $B(x, r)$ para $r \le 1$ y $r > 1$.",
        r"1. <b>Para $r \le 1$:</b> $B(x, r) = \{y \in X : d(x, y) < r\} = \{x\}$ (el singleton individual). En consecuencia, todo subconjunto de $X$ es abierto (y por ende también cerrado).<br>"
        r"2. <b>Para $r > 1$:</b> $B(x, r) = X$ (todo el espacio métrico)."))
    course.notes.append(n1)

    # 2. Caracterizaciones Equivalentes de Continuidad Global
    n2 = NoteNode("ar_02", "Caracterizaciones de Continuidad Global", 380.0, 80.0, ["Análisis Real", "Continuidad", "Preimágenes"])
    n2.add_card(ClozeCard("Cuatro Caracterizaciones Equivalentes de Continuidad",
        r"Para $f: X \to Y$, son equivalentes:"
        r"<br>(i) $\forall U \subseteq Y$ abierto $\implies f^{-1}(U)$ es {{c1::abierto en X}}."
        r"<br>(ii) $\forall F \subseteq Y$ cerrado $\implies f^{-1}(F)$ es {{c2::cerrado en X}}."
        r"<br>(iii) $\forall A \subseteq X \implies f(\overline{A}) \subseteq {{c3::\overline{f(A)}}}$."
        r"<br>(iv) Continuidad secuencial: $x_n \to x_0 \implies f(x_n) \to f(x_0)$."))
    n2.add_card(Flashcard("Falla de Conexidad en Preimágenes",
        r"¿Preserva la continuidad la conexidad en preimágenes? Muestre un contraejemplo donde $V$ es conexo pero $f^{-1}(V)$ es disconexo.",
        r"<b>Respuesta:</b> NO. La continuidad preserva conexidad en la <b>imagen directa</b> ($f(X)$ es conexo), pero NO en preimágenes.<br>"
        r"<b>Contraejemplo:</b> $f: \mathbb{R} \to \mathbb{R}$ dada por $f(x) = x^2$ es continua. El intervalo $V = (1, 4)$ es conexo en $\mathbb{R}$.<br>"
        r"Sin embargo, su preimagen es:<br>$$f^{-1}((1, 4)) = (-2, -1) \cup (1, 2)$$<br>la cual es unión disjunta de dos abiertos no vacíos, luego es <b>disconexa</b>."))
    course.notes.append(n2)

    # 3. Discontinuidad Secuencial, Lipschitz y Hölder
    n3 = NoteNode("ar_03", "Condiciones Lipschitz y Hölder", 680.0, 80.0, ["Análisis Real", "Lipschitz", "Hölder"])
    n3.add_card(ClozeCard("Funciones Lipschitz y Hölder",
        r"- Lipschitz: $d_Y(f(x), f(x')) \le L d_X(x, x') \implies$ uniformemente continua con $\delta = {{c1::\varepsilon / L}}$."
        r"<br>- Hölder de orden $\alpha \in (0, 1]$: $d_Y(f(x), f(x')) \le C (d_X(x, x'))^\alpha \implies$ uniformemente continua con $\delta = {{c2::(\varepsilon / C)^{1/\alpha}}}$."
        r"<br>- Refutación secuencial: $f$ es discontinua si existe $x_n \to x_0$ con {{c3::f(x_n) \not\to f(x_0)}}."))
    n3.add_card(Flashcard("Función Hölder no Lipschitziana",
        r"Muestre que la función $f(x) = \sqrt{x}$ en $[0, 1]$ es $1/2$-Hölder continua pero NO es Lipschitziana.",
        r"1. <b>Hölder $\alpha = 1/2$:</b> Para $x, y \ge 0$, se cumple $|\sqrt{x} - \sqrt{y}| \le \sqrt{|x - y|}$. Por ende es $1/2$-Hölder con constante $C = 1$.<br>"
        r"2. <b>No Lipschitz:</b> Evaluando en $y = 0$: $\frac{|f(x) - f(0)|}{|x - 0|} = \frac{\sqrt{x}}{x} = \frac{1}{\sqrt{x}} \to \infty$ cuando $x \to 0^+$. Al no ser el cociente acotado, no existe constante $L$ finita."))
    course.notes.append(n3)

    # 4. Álgebra de Funciones Continuas y Conjuntos Densos
    n4 = NoteNode("ar_04", "Álgebra Continua y Coincidencia en Densos", 980.0, 80.0, ["Análisis Real", "Álgebra", "Densidad"])
    n4.add_card(Flashcard("Teorema de Coincidencia en Subconjuntos Densos",
        r"Sean $f, g: X \to Y$ continuas con $Y$ métrico. Pruebe que $\{x : f(x) = g(x)\}$ es cerrado y que si coinciden en un denso $D$, coinciden en todo $X$.",
        r"1. La función $h(x) = d_Y(f(x), g(x))$ es continua. El conjunto de coincidencia es $E = h^{-1}(\{0\})$, que es cerrado por ser preimagen de un cerrado.<br>"
        r"2. Si $f|_D = g|_D$, entonces $D \subseteq E$. Tomando clausuras: $X = \overline{D} \subseteq \overline{E} = E$, por lo que $E = X$, demostrando $f \equiv g$."))
    course.notes.append(n4)

    # 5. Función Distancia a un Conjunto y 1-Lipschitz
    n5 = NoteNode("ar_05", "Función Distancia d(x, A) y Clausura", 1280.0, 80.0, ["Análisis Real", "Distancia", "1-Lipschitz", "Clausura"])
    n5.add_card(ProofSequenceCard("Demostración de que d(x, A) es 1-Lipschitz",
        r"Demostrar que $|d(x, A) - d(y, A)| \le d(x, y)$ para todo $x, y \in X$.",
        [
            r"Para cualquier $a \in A$, por desigualdad triangular: $d(x, a) \le d(x, y) + d(y, a)$.",
            r"Tomando ínfimo sobre $a \in A$ en la derecha: $d(x, a) \le d(x, y) + d(y, A)$.",
            r"Tomando ínfimo sobre $a$ a la izquierda: $d(x, A) \le d(x, y) + d(y, A) \implies d(x, A) - d(y, A) \le d(x, y)$.",
            r"Por simetría intercambiando $x$ e $y$: $d(y, A) - d(x, A) \le d(x, y)$.",
            r"Conclusión: $|d(x, A) - d(y, A)| \le d(x, y)$, probando que $d(\cdot, A)$ es 1-Lipschitz."
        ]))
    n5.add_card(ClozeCard("Clausura Topológica con la Distancia",
        r"Un punto $x$ pertenece a la clausura $\overline{A}$ si y sólo si:"
        r"<br>$$d(x, A) = {{c1::0}}$$"
        r"<br>Si $A$ es cerrado: $x \in A \iff d(x, A) = 0$."))
    course.notes.append(n5)

    # 6. Separación Topológica: Lema de Urysohn Métrico
    n6 = NoteNode("ar_06", "Separación de Urysohn y Compacto-Cerrado", 80.0, 340.0, ["Análisis Real", "Urysohn", "Separación"])
    n6.add_card(Flashcard("Construcción Explícita del Lema de Urysohn Métrico",
        r"Dados dos cerrados disjuntos $A, B \subset X$, construya una función continua que separe $f|_A \equiv 0$ y $f|_B \equiv 1$.",
        r"Como $A \cap B = \emptyset$ y son cerrados, $d(x, A) + d(x, B) > 0 \quad \forall x \in X$.<br>"
        r"Se define:<br>$$f(x) = \frac{d(x, A)}{d(x, A) + d(x, B)}$$<br>"
        r"1. $x \in A \implies d(x, A) = 0 \implies f(x) = 0$.<br>"
        r"2. $x \in B \implies d(x, B) = 0 \implies f(x) = 1$.<br>"
        r"3. Es continua por ser cociente de funciones 1-Lipschitz con denominador no nulo."))
    n6.add_card(ClozeCard("Separación entre Compacto y Cerrado Disjuntos",
        r"Si $K$ es compacto, $F$ es cerrado y $K \cap F = \emptyset$:"
        r"<br>$$\text{dist}(K, F) = \inf_{x \in K, y \in F} d(x, y) {{c1::> 0 (es estrictamente positiva)}}$$"
        r"<br>Falla si ninguno es compacto: $y = 0$ y $x y = 1$ en $\mathbb{R}^2$ tienen distancia {{c2::0 (cero)}}."))
    course.notes.append(n6)

    # 7. Continuidad y Compacidad: Teorema de Weierstrass
    n7 = NoteNode("ar_07", "Continuidad y Teorema de Weierstrass", 380.0, 340.0, ["Análisis Real", "Compacidad", "Weierstrass"])
    n7.add_card(ClozeCard("Preservación de Compacidad y Teorema de Extremos",
        r"Si $f: X \to Y$ es continua y $K \subseteq X$ es compacto, $f(K)$ es {{c1::compacto en Y}}."
        r"<br>Teorema de Weierstrass: Toda $f: K \to \mathbb{R}$ continua sobre un compacto no vacío es acotada y {{c2::alcanza su máximo y su mínimo absoluto}}."))
    course.notes.append(n7)

    # 8. Inversa Continua sobre Compactos y Homeomorfismos
    n8 = NoteNode("ar_08", "Inversa Continua sobre Compactos", 680.0, 340.0, ["Análisis Real", "Homeomorfismo", "Inversa Continua"])
    n8.add_card(Flashcard("Teorema de la Inversa Continua sobre Compactos",
        r"Demuestre que si $K$ es compacto y $f: K \to Y$ es continua y biyectiva, entonces $f^{-1}: Y \to K$ es continua.",
        r"Para probar que $g = f^{-1}$ es continua, se prueba que la preimagen de cualquier cerrado $F \subseteq K$ es cerrada:<br>"
        r"$g^{-1}(F) = f(F)$.<br>"
        r"1. $F$ cerrado en compacto $K \implies F$ es compacto.<br>"
        r"2. $f$ continua $\implies f(F)$ es compacto en $Y$.<br>"
        r"3. En todo espacio métrico, compacto implica cerrado $\implies f(F)$ es cerrado en $Y$. Por ende, $f^{-1}$ es continua."))
    n8.add_card(Flashcard("Contraejemplo: Falla de Inversa Continua sin Compacidad",
        r"Muestre una biyección continua con inversa discontinua por no ser el dominio compacto.",
        r"$f: [0, 2\pi) \to S^1, \quad t \mapsto (\cos t, \sin t)$.<br>"
        r"1. $f$ es continua y biyectiva.<br>"
        r"2. Su inversa $f^{-1}$ es discontinua en $(1, 0)$: puntos con $t_n = 2\pi - 1/n$ tienden a $(1, 0)$, pero $f^{-1} \to 2\pi \ne 0$."))
    course.notes.append(n8)

    # 9. Continuidad Uniforme y Teorema de Heine-Cantor
    n9 = NoteNode("ar_09", "Continuidad Uniforme y Heine-Cantor", 980.0, 340.0, ["Análisis Real", "Uniforme Continuidad", "Heine-Cantor"])
    n9.add_card(ProofSequenceCard("Demostración Rigurosa de Heine-Cantor",
        r"Demostrar que toda función continua sobre un compacto es uniformemente continua.",
        [
            r"Dado $\varepsilon > 0$, por continuidad en cada $p \in K$ existe $\delta_p > 0$ con $d(x, p) < \delta_p \implies d(f(x), f(p)) < \varepsilon / 2$.",
            r"Las bolas abiertas $\{B(p, \delta_p / 2)\}_{p \in K}$ forman un recubrimiento abierto de $K$.",
            r"Por compacidad, existe un subrecubrimiento finito centrado en $\{p_1, \dots, p_N\}$.",
            r"Sea $\delta = \min_{1 \le i \le N} \frac{\delta_{p_i}}{2} > 0$ (mínimo de conjunto finito estrictamente positivo).",
            r"Si $d(x, x') < \delta$, $x \in B(p_k, \delta_{p_k}/2) \implies d(x', p_k) < \delta + \delta_{p_k}/2 \le \delta_{p_k}$.",
            r"Por desigualdad triangular: $d(f(x), f(x')) \le d(f(x), f(p_k)) + d(f(p_k), f(x')) < \frac{\varepsilon}{2} + \frac{\varepsilon}{2} = \varepsilon$."
        ]))
    n9.add_card(ClozeCard("Funciones Periódicas Continuas en R",
        r"Toda función $f: \mathbb{R} \to \mathbb{R}$ continua y periódica es {{c1::uniformemente continua en todo R}}."
        r"<br>Demostración: Por Heine-Cantor es uniformemente continua en el intervalo compacto $[0, 2T]$, y la periodicidad extiende el mismo $\delta$ a todo $\mathbb{R}$."))
    course.notes.append(n9)

    # 10. Extensión Única de Funciones Uniformemente Continuas
    n10 = NoteNode("ar_10", "Extensión Única al Completado", 1280.0, 340.0, ["Análisis Real", "Extensión", "Completitud"])
    n10.add_card(ClozeCard("Teorema de Extensión Única al Completado",
        r"Si $D \subset X$ es denso ($\overline{D} = X$), $Y$ es completo y $f: D \to Y$ es uniformemente continua:"
        r"<br>Existe {{c1::una única extensión continua $\tilde{f}: X \to Y$}} y además es {{c2::uniformemente continua}} en todo $X$."))
    course.notes.append(n10)

    # 11. Conexidad Topológica e Intervalos
    n11 = NoteNode("em_conexidad", "Conexidad Topológica e Intervalos", 80.0, 600.0, ["Análisis Real", "Conexidad", "Clopen", "Intervalos"])
    n11.add_card(ClozeCard("Definición de Conexidad e Intervalos en R",
        r"Un espacio métrico $X$ es conexo si sus únicos subconjuntos clopen son {{c1::$\emptyset$ y $X$}}."
        r"<br>En $\mathbb{R}$, un conjunto $E \subseteq \mathbb{R}$ es conexo si y sólo si es {{c2::un intervalo}}."
        r"<br>Si $f$ es continua y $X$ es conexo, $f(X)$ es {{c3::conexo}}."))
    course.notes.append(n11)

    # 12. TVI, Punto Fijo 1D e Invarianza por Corte
    n12 = NoteNode("ar_12", "TVI, Punto Fijo 1D e Invarianza por Corte", 380.0, 600.0, ["Análisis Real", "TVI", "Punto Fijo", "Corte"])
    n12.add_card(ProofSequenceCard("Teorema del Punto Fijo en 1D",
        r"Demostrar que toda función continua $f: [a, b] \to [a, b]$ posee al menos un punto fijo.",
        [
            r"Definir $g(x) = f(x) - x$ continua en $[a, b]$.",
            r"Como $f(a) \in [a, b]$, $f(a) \ge a \implies g(a) \ge 0$.",
            r"Como $f(b) \in [a, b]$, $f(b) \le b \implies g(b) \le 0$.",
            r"Por el Teorema de Bolzano, existe $x^* \in [a, b]$ con $g(x^*) = 0 \iff f(x^*) = x^*$."
        ]))
    n12.add_card(Flashcard("Invarianza Topológica por Remoción de Puntos (Corte)",
        r"Demuestre que $[0, 1)$ no es homeomorfo a $(0, 1)$ y que $\mathbb{R}$ no es homeomorfo a $\mathbb{R}^2$.",
        r"1. <b>$[0, 1)$ vs $(0, 1)$:</b> Removiendo el punto $0$, $[0, 1)\setminus\{0\} = (0, 1)$ es <b>conexo</b>. Pero remover cualquier punto $f(0)$ en $(0, 1)$ produce dos intervalos disjuntos, conjunto <b>disconexo</b>.<br>"
        r"2. <b>$\mathbb{R}$ vs $\mathbb{R}^2$:</b> $\mathbb{R}\setminus\{p\}$ tiene 2 componentes conexas, mientras que $\mathbb{R}^2\setminus\{q\}$ permanece <b>conexo</b>."))
    course.notes.append(n12)

    # 13. Arcoconexidad y Seno del Topólogo
    n13 = NoteNode("ar_13", "Arcoconexidad y Curva Seno del Topólogo", 680.0, 600.0, ["Análisis Real", "Arcoconexidad", "Seno del Topólogo"])
    n13.add_card(ClozeCard("Arcoconexidad vs Conexidad",
        r"Todo espacio arcoconexo es {{c1::conexo}}."
        r"<br>El recíproco es falso: El contraejemplo clásico es {{c2::la curva seno del topólogo}}, la cual es conexa pero no arcoconexa."))
    course.notes.append(n13)

    # 14. Convergencia Uniforme y Norma del Supremo
    n14 = NoteNode("ar_14", "Convergencia Uniforme y Norma del Supremo", 980.0, 600.0, ["Análisis Real", "Convergencia", "Norma Infinito"])
    n14.add_card(ClozeCard("Convergencia Uniforme con Norma Infinito",
        r"Una sucesión $f_n: X \to Y$ converge uniformemente a $f$ si y sólo si:"
        r"<br>$$\lim_{n \to \infty} \|f_n - f\|_\infty = \lim_{n \to \infty} {{c1::\sup_{x \in X} d_Y(f_n(x), f(x)) = 0}}$$"
        r"<br>El índice $N(\varepsilon)$ es {{c2::independiente del punto x}}."))
    course.notes.append(n14)

    # 15. Cauchy Uniforme y Puntos Móviles
    n15 = NoteNode("ar_15", "Cauchy Uniforme y Puntos Móviles", 1280.0, 600.0, ["Análisis Real", "Cauchy", "Puntos Móviles"])
    n15.add_card(Flashcard("Criterio de Puntos Móviles para Refutar Convergencia Uniforme",
        r"¿Cómo se refuta la convergencia uniforme mediante puntos móviles?",
        r"Basta encontrar una sucesión de puntos $(x_n) \subset X$ tal que $|f_n(x_n) - f(x_n)| \ge \varepsilon_0 > 0 \quad \forall n$.<br>"
        r"<b>Ejemplo:</b> $f_n(x) = \frac{n x}{1 + n^2 x^2}$ en $[0, 1]$. El límite puntual es $0$. Tomando $x_n = 1/n$: $f_n(1/n) = 1/2 \not\to 0$."))
    course.notes.append(n15)

    # 16. Transferencia de Continuidad (eps/3)
    n16 = NoteNode("ar_16", "Transferencia de Continuidad (Técnica eps/3)", 80.0, 860.0, ["Análisis Real", "Continuidad Límite", "eps/3"])
    n16.add_card(ProofSequenceCard("Demostración de Continuidad del Límite Uniforme",
        r"Demostrar que el límite uniforme de funciones continuas es continuo.",
        [
            r"Dado $\varepsilon > 0$, existe $N$ tal que $\forall n \ge N$, $d(f_n(x), f(x)) < \varepsilon / 3$ para todo $x$.",
            r"Fijando $n = N$, por continuidad de $f_N$ en $x_0$ existe $\delta > 0$ con $d(x, x_0) < \delta \implies d(f_N(x), f_N(x_0)) < \varepsilon / 3$.",
            r"Por desigualdad triangular: $d(f(x), f(x_0)) \le d(f(x), f_N(x)) + d(f_N(x), f_N(x_0)) + d(f_N(x_0), f(x_0))$.",
            r"Acotando: $d(f(x), f(x_0)) < \frac{\varepsilon}{3} + \frac{\varepsilon}{3} + \frac{\varepsilon}{3} = \varepsilon$."
        ]))
    course.notes.append(n16)

    # 17. Test M de Weierstrass y Espacio C(K)
    n17 = NoteNode("ar_17", "Test M de Weierstrass y Espacio C(K)", 380.0, 860.0, ["Análisis Real", "Test M", "Series", "Completitud"])
    n17.add_card(ClozeCard("Criterio M de Weierstrass y Completitud",
        r"Si $|f_n(x)| \le M_n$ con $\sum M_n < \infty$, la serie $\sum f_n(x)$ converge {{c1::absoluta y uniformemente en X}}."
        r"<br>El espacio métrico $(C(K, \mathbb{R}), \|\cdot\|_\infty)$ sobre un compacto $K$ es un espacio de Banach, es decir, es {{c2::completo}}."))
    course.notes.append(n17)

    # 18. Teorema de Dini y Fallas de Hipótesis
    n18 = NoteNode("ar_18", "Teorema de Dini y Fallas de Hipótesis", 680.0, 860.0, ["Análisis Real", "Dini", "Monotonía", "Contraejemplos"])
    n18.add_card(ClozeCard("Hipótesis del Teorema de Dini",
        r"Teorema de Dini: Si $K$ es compacto, $f_n$ continuas, $f_n \to f$ puntualmente con $f$ continua y la convergencia es monótona ($f_{n+1} \le f_n$), entonces la convergencia es forzosamente {{c1::uniforme en K}}."))
    n18.add_card(Flashcard("Catálogo de Fallas de Hipótesis de Dini",
        r"Muestre las 3 fallas clásicas de Dini: (1) Sin compacidad, (2) Sin monotonía, (3) Límite discontinuo.",
        r"1. <b>Sin compacidad:</b> $f_n(x) = \frac{1}{1 + nx}$ en $(0, 1)$ decrece a $0$, pero $\|f_n\|_\infty = 1 \not\to 0$.<br>"
        r"2. <b>Sin monotonía:</b> $f_n(x) = x^n - x^{2n}$ en $[0, 1]$ converge a $0$, pero $\|f_n\|_\infty = 1/4 \not\to 0$.<br>"
        r"3. <b>Límite discontinuo:</b> $f_n(x) = \frac{1}{1 + x^n}$ en $[0, 1]$ monótona, pero $f(1)=1/2 \ne 1$."))
    course.notes.append(n18)

    # 19. Equicontinuidad y Teorema de Arzelà-Ascoli
    n19 = NoteNode("ar_19", "Equicontinuidad y Arzelà-Ascoli", 980.0, 860.0, ["Análisis Real", "Arzelà-Ascoli", "Equicontinuidad", "Precompacidad"])
    n19.add_card(ClozeCard("Teorema de Arzelà-Ascoli",
        r"En compacto $K$, una familia $\mathcal{F} \subset C(K, \mathbb{R})$ es relativamente compacta si y sólo si:"
        r"<br>1. Es {{c1::puntualmente acotada}} ($\forall x \in K, \sup_{f \in \mathcal{F}} |f(x)| < \infty$)."
        r"<br>2. Es {{c2::equicontinua en K}}."))
    n19.add_card(ProofSequenceCard("Esquema Demostrativo de Arzelà-Ascoli",
        r"Resumir la demostración de Arzelà-Ascoli usando Cantor y redes finitas.",
        [
            r"Por compacidad, existe subconjunto denso numerable $D = \{q_1, q_2, \dots\} \subset K$.",
            r"Por argumento diagonal de Cantor, se extrae una subsucesión $(f_{n_k})$ convergente en todo $D$.",
            r"Dado $\varepsilon > 0$, por equicontinuidad existe $\delta > 0$ con $|f(x) - f(y)| < \varepsilon / 3$.",
            r"Cubrir el compacto $K$ con finitas bolas $B(q_1, \delta), \dots, B(q_m, \delta)$.",
            r"Por Cauchy en los finitos centros y desigualdad triangular de 3 términos: $|f_{n_k}(x) - f_{n_j}(x)| < \varepsilon$ para todo $x \in K$."
        ]))
    course.notes.append(n19)

    # 20. Teorema de Stone-Weierstrass
    n20 = NoteNode("ar_20", "Densidad de Stone-Weierstrass", 1280.0, 860.0, ["Análisis Real", "Stone-Weierstrass", "Subálgebra", "Densidad"])
    n20.add_card(ClozeCard("Enunciado de Stone-Weierstrass",
        r"Una subálgebra $\mathcal{A} \subset C(K, \mathbb{R})$ sobre un compacto $K$ es densa si y sólo si:"
        r"<br>1. {{c1::Separa puntos}}: $\forall x \ne y \implies \exists f \in \mathcal{A} : f(x) \ne f(y)$."
        r"<br>2. {{c2::Contiene las funciones constantes}}: $\mathbf{1} \in \mathcal{A}$."))
    n20.add_card(Flashcard("Subálgebra que no Separa Puntos",
        r"Muestre una subálgebra que no sea densa en $C([-1, 1], \mathbb{R})$ por no separar puntos.",
        r"Polinomios pares $\mathcal{A} = \{P(x^2)\}$. No separan $x$ y $-x$, por lo que es imposible aproximar funciones impares como $g(x) = x$ ($\|x - P(x^2)\|_\infty \ge 1$)."))
    course.notes.append(n20)

    # 21. Aproximación Polinomial y Polinomios Trigonométricos
    n21 = NoteNode("ar_21", "Aproximación de Weierstrass y Fourier", 380.0, 1120.0, ["Análisis Real", "Weierstrass", "Fourier"])
    n21.add_card(ClozeCard("Densidad Polinomial y Trigonométrica",
        r"- Polinomios $\mathbb{R}[x]$ son densos en $(C([a, b], \mathbb{R}), \|\cdot\|_\infty)$."
        r"<br>- Polinomios trigonométricos son densos en el espacio de funciones continuas y {{c1::periódicas de período $2\pi$}}."))
    course.notes.append(n21)

    # 22. Punto Fijo de Banach y Edelstein
    n22 = NoteNode("ar_22", "Punto Fijo de Banach y Teorema de Edelstein", 680.0, 1120.0, ["Análisis Real", "Banach", "Edelstein", "Contracciones"])
    n22.add_card(ProofSequenceCard("Punto Fijo de Banach y Cotas de Error",
        r"Probar la convergencia de iteradas $x_{n+1} = T(x_n)$ para contracción $k < 1$ en espacio completo.",
        [
            r"Por inducción, $d(x_{n+1}, x_n) \le k^n d(x_1, x_0)$.",
            r"Sumando la serie geométrica: $d(x_m, x_n) \le \frac{k^n}{1 - k} d(x_1, x_0) \to 0$, luego $(x_n)$ es de Cauchy.",
            r"Por completitud existe $x^* = \lim x_n$, y por continuidad $T(x^*) = x^*$.",
            r"Unicidad: $d(x^*, y^*) = d(Tx^*, Ty^*) \le k d(x^*, y^*) \implies (1 - k)d(x^*, y^*) \le 0 \implies x^* = y^*$."
        ]))
    n22.add_card(Flashcard("Teorema de Edelstein en Espacios Compactos",
        r"Enuncie el Teorema de Edelstein de contracción débil.",
        r"Sea $K$ <b>compacto</b> y $T: K \to K$ tal que $d(Tx, Ty) < d(x, y) \quad \forall x \ne y$.<br>"
        r"Entonces $T$ tiene un único punto fijo $x^* \in K$.<br>"
        r"Demostración: $\varphi(x) = d(x, Tx)$ es continua en el compacto $K$ y alcanza su mínimo en $x^*$. Si $Tx^* \ne x^*$, $\varphi(Tx^*) < \varphi(x^*)$, contradicción."))
    course.notes.append(n22)

    # Edges AR
    ar_edges = [
        ("ar_01", "ar_02", "Topología Abierta a Continuidad Global"),
        ("ar_02", "ar_03", "Continuidad a Lipschitz y Hölder"),
        ("ar_02", "ar_04", "Continuidad a Coincidencia en Densos"),
        ("ar_01", "ar_05", "Métrica a Función Distancia"),
        ("ar_05", "ar_06", "Distancia a Urysohn y Separación"),
        ("ar_02", "ar_07", "Continuidad a Compacidad y Weierstrass"),
        ("ar_07", "ar_08", "Compacidad a Inversa Continua"),
        ("ar_07", "ar_09", "Compacidad a Heine-Cantor"),
        ("ar_09", "ar_10", "Heine-Cantor a Extensión Única"),
        ("ar_01", "em_conexidad", "Topología a Conexidad e Intervalos"),
        ("em_conexidad", "ar_12", "Conexidad a TVI y Punto Fijo 1D"),
        ("em_conexidad", "ar_13", "Conexidad a Arcoconexidad"),
        ("ar_01", "ar_14", "Métricas a Convergencia Uniforme"),
        ("ar_14", "ar_15", "Norma Infinito a Puntos Móviles"),
        ("ar_14", "ar_16", "Uniformidad a Transferencia de Continuidad"),
        ("ar_16", "ar_17", "Límite Continuo a Test M y Espacio C(K)"),
        ("ar_14", "ar_18", "Convergencia a Teorema de Dini"),
        ("ar_09", "ar_19", "Heine-Cantor a Arzelà-Ascoli"),
        ("ar_17", "ar_19", "C(K) Completo a Precompacidad"),
        ("ar_07", "ar_20", "Compacidad a Stone-Weierstrass"),
        ("ar_20", "ar_21", "Stone-Weierstrass a Polinomios Trigonométricos"),
        ("ar_01", "ar_22", "Espacios Completos a Banach y Edelstein")
    ]
    for s, t, lbl in ar_edges:
        course.edges.append(NoteEdge(source_id=s, target_id=t, label=lbl))

    return course

# ==============================================================================
# CURSO 3: QUÍMICA PARA INGENIEROS (I2)
# ==============================================================================
def build_quimica_course() -> Course:
    course = Course(name="Química para Ingenieros (I2)")

    # 1. Velocidad de Reacción y Ecuación Diferencial
    n1 = NoteNode("quim_01", "Velocidad de Reacción y Ley Diferencial", 80.0, 80.0, ["Química", "Cinética", "Velocidad"])
    n1.add_card(ClozeCard("Definición Estequiométrica de Velocidad",
        r"Para $aA + bB \to cC + dD$:"
        r"<br>$$v = {{c1::-\frac{1}{a}\frac{d[A]}{dt} = -\frac{1}{b}\frac{d[B]}{dt} = \frac{1}{c}\frac{d[C]}{dt} = \frac{1}{d}\frac{d[D]}{dt}}}$$"
        r"<br>Ley diferencial general: $v = k [A]^x [B]^y$, donde $x, y$ se obtienen {{c2::experimentalmente}}."))
    n1.add_card(Flashcard("Estequiometría de Velocidad en Reacción N2O5",
        r"Para $2\text{N}_2\text{O}_5 \to 4\text{NO}_2 + \text{O}_2$, exprese la relación entre la velocidad de desaparición de reactivo y aparición de productos.",
        r"$$v = -\frac{1}{2}\frac{d[\text{N}_2\text{O}_5]}{dt} = \frac{1}{4}\frac{d[\text{NO}_2]}{dt} = \frac{d[\text{O}_2]}{dt}$$<br>"
        r"Por ende: $\frac{d[\text{NO}_2]}{dt} = -2\frac{d[\text{N}_2\text{O}_5]}{dt}$, es decir, el dióxido de nitrógeno aparece al doble de rapidez con que desaparece el pentóxido de dinitrógeno."))
    course.notes.append(n1)

    # 2. Método de las Velocidades Iniciales y Unidades de k
    n2 = NoteNode("quim_02", "Método de Velocidades Iniciales y Unidades de k", 380.0, 80.0, ["Química", "Velocidades Iniciales", "Órdenes"])
    n2.add_card(ClozeCard("Unidades de la Constante de Velocidad k",
        r"Para reacción de orden global $n$:"
        r"<br>$$[k] = {{c1::\text{M}^{1-n} \cdot \text{s}^{-1} = \text{mol}^{1-n} \cdot \text{L}^{n-1} \cdot \text{s}^{-1}}}$$"
        r"<br>- Orden 0: $[k] = {{c2::\text{M}\cdot\text{s}^{-1}}}$"
        r"<br>- Orden 1: $[k] = {{c3::\text{s}^{-1}}}$"
        r"<br>- Orden 2: $[k] = {{c4::\text{M}^{-1}\cdot\text{s}^{-1}}}$."))
    n2.add_card(Flashcard("Algoritmo: Método de Velocidades Iniciales",
        r"¿Cómo se determinan los órdenes parciales en una tabla de ensayos experimentales?",
        r"1. Elegir dos ensayos donde cambie $[A]$ y los demás reactivos se mantengan constantes.<br>"
        r"2. Cociente de velocidades: $\frac{v_2}{v_1} = \left(\frac{[A]_2}{[A]_1}\right)^x \implies x = \frac{\ln(v_2/v_1)}{\ln([A]_2/[A]_1)}$.<br>"
        r"3. Despejar $k = \frac{v_0}{[A]_0^x [B]_0^y}$ y asignar sus unidades estrictas $\text{M}^{1-n}\text{s}^{-1}$."))
    course.notes.append(n2)

    # 3. Cinética de Orden Cero
    n3 = NoteNode("quim_03", "Cinética de Orden Cero", 680.0, 80.0, ["Química", "Orden 0", "Vida Media"])
    n3.add_card(ClozeCard("Leyes de Orden Cero",
        r"Para reacción de orden 0 ($v = k$):"
        r"<br>- Concentración temporal: $[A]_t = {{c1::[A]_0 - kt}}$"
        r"<br>- Vida media: $t_{1/2} = {{c2::\frac{[A]_0}{2k}}}$"
        r"<br>- Gráfico lineal: $[A]$ vs $t$ con pendiente {{c3::-k}}."))
    course.notes.append(n3)

    # 4. Cinética de Primer Orden y Radiactividad
    n4 = NoteNode("quim_04", "Cinética de Primer Orden y Decaimiento", 980.0, 80.0, ["Química", "Orden 1", "Vida Media"])
    n4.add_card(ClozeCard("Leyes de Primer Orden",
        r"Para reacción de orden 1 ($v = k[A]$):"
        r"<br>- Concentración: $\ln[A]_t = {{c1::\ln[A]_0 - kt \iff [A]_t = [A]_0 e^{-kt}}}$"
        r"<br>- Vida media: $t_{1/2} = {{c2::\frac{\ln 2}{k} \approx \frac{0.6931}{k}}}$ ({{c3::independiente de [A]_0}})."
        r"<br>- Gráfico lineal: $\ln[A]$ vs $t$ con pendiente $-k$."))
    n4.add_card(Flashcard("Datación por Carbono-14",
        r"Deduzca la fórmula para calcular la edad $t$ de un fósil a partir de su actividad remanente $A_t$ y su vida media $t_{1/2}$.",
        r"El decaimiento radiactivo es cinéticamente de primer orden puro:<br>"
        r"$$k = \frac{\ln 2}{t_{1/2}}$$<br>"
        r"De la ley integrada: $\ln(A_t / A_0) = -k t \implies t = \frac{1}{k}\ln\left(\frac{A_0}{A_t}\right) = \frac{t_{1/2}}{\ln 2} \ln\left(\frac{A_0}{A_t}\right)$."))
    course.notes.append(n4)

    # 5. Cinética de Segundo Orden
    n5 = NoteNode("quim_05", "Cinética de Segundo Orden", 1280.0, 80.0, ["Química", "Orden 2", "Vida Media"])
    n5.add_card(ClozeCard("Leyes de Segundo Orden",
        r"Para orden 2 ($v = k[A]^2$):"
        r"<br>- Integrada: $\frac{1}{[A]_t} = {{c1::\frac{1}{[A]_0} + kt}}$"
        r"<br>- Vida media: $t_{1/2} = {{c2::\frac{1}{k[A]_0}}}$"
        r"<br>- Gráfico lineal: $1/[A]$ vs $t$ con pendiente {{c3::+k (positiva)}}."))
    course.notes.append(n5)

    # 6. Ecuación de Arrhenius y Dependencia Térmica
    n6 = NoteNode("quim_06", "Ecuación de Arrhenius y Dependencia Térmica", 80.0, 340.0, ["Química", "Arrhenius", "Ea", "Temperatura"])
    n6.add_card(ClozeCard("Ecuación de Arrhenius",
        r"Ecuación de Arrhenius:"
        r"<br>$$k = {{c1::A e^{-E_a/(RT)}}}$$"
        r"<br>Linealizada: $\ln k = \ln A - \frac{E_a}{R}\frac{1}{T}$ con pendiente {{c2::-E_a/R}}."
        r"<br>Dos temperaturas: $\ln(k_2/k_1) = {{c3::\frac{E_a}{R}\left(\frac{1}{T_1} - \frac{1}{T_2}\right)}}$."))
    n6.add_card(Flashcard("Regla de Duplicación cada 10°C",
        r"Si una reacción duplica su velocidad al pasar de $20^\circ\text{C}$ a $30^\circ\text{C}$ ($k_2/k_1 = 2$), calcule $E_a$.",
        r"$T_1 = 293.15\,\text{K}$ y $T_2 = 303.15\,\text{K}$.<br>"
        r"$\ln 2 = \frac{E_a}{8.314}\left(\frac{10}{293.15 \times 303.15}\right) \implies E_a \approx 51.2\,\text{kJ/mol}$."))
    course.notes.append(n6)

    # 7. Mecanismos de Reacción, RDS y SSA
    n7 = NoteNode("quim_07", "Mecanismos de Reacción, RDS y SSA", 380.0, 340.0, ["Química", "Mecanismos", "RDS", "SSA"])
    n7.add_card(ClozeCard("Etapa Limitante y Estado Estacionario",
        r"- La velocidad global está gobernada por la etapa {{c1::más lenta (Rate Determining Step, RDS)}}."
        r"<br>- Para intermediarios reactivos inestables $I$: $\frac{d[I]}{dt} \approx {{c2::0 (Aproximación de Estado Estacionario, SSA)}}$."
        r"<br>- Si $[B]_0 \gg [A]_0$, se sigue cinética de {{c3::pseudo-primer orden}} con $k_{\text{obs}} = k[B]_0^y$."))
    course.notes.append(n7)

    # 8. Catálisis y Complejo Activado
    n8 = NoteNode("quim_08", "Catálisis y Complejo Activado", 680.0, 340.0, ["Química", "Catálisis", "Complejo Activado"])
    n8.add_card(Flashcard("Rol del Catalizador: Qué Altera y Qué NO Altera",
        r"En una reacción reversible, ¿qué magnitudes altera y cuáles NO altera un catalizador?",
        r"1. <b>SÍ altera:</b> Disminuye $E_a$; incrementa $k_{\text{dir}}$ y $k_{\text{inv}}$ en el mismo factor; acelera el tiempo de llegada al equilibrio.<br>"
        r"2. <b>NO altera:</b> $\Delta G^\circ$, $\Delta H^\circ$, $K_{\text{eq}}$ ni las concentraciones finales de equilibrio. No se consume."))
    course.notes.append(n8)

    # 9. Constantes de Equilibrio Kc y Kp
    n9 = NoteNode("quim_09", "Constantes de Equilibrio Kc y Kp", 980.0, 340.0, ["Química", "Equilibrio", "Kc", "Kp"])
    n9.add_card(ClozeCard("Relación entre Kp y Kc",
        r"Para reacción gaseosa $aA(g) + bB(g) \rightleftharpoons cC(g) + dD(g)$:"
        r"<br>$$K_p = {{c1::K_c (RT)^{\Delta n_{(g)}}}}$$"
        r"<br>donde $\Delta n_{(g)} = {{c2::(c + d) - (a + b)}}$."
        r"<br>Si $\Delta n_{(g)} = 0 \implies K_p {{c3::= K_c}}$."))
    course.notes.append(n9)

    # 10. Cociente de Reacción Q y Espontaneidad
    n10 = NoteNode("quim_10", "Cociente de Reacción Q y Espontaneidad", 1280.0, 340.0, ["Química", "Cociente Q", "Evolución Espontánea"])
    n10.add_card(ClozeCard("Criterio de Evolución con Q",
        r"- Si $Q < K$: La reacción avanza hacia la {{c1::derecha (hacia productos)}}."
        r"<br>- Si $Q = K$: Sistema en {{c2::equilibrio dinámico}}."
        r"<br>- Si $Q > K$: La reacción avanza hacia la {{c3::izquierda (hacia reactivos)}}."
        r"<br>Regla de sólidos y líquidos puros: Tienen actividad 1 y {{c4::NO se incluyen en K}}."))
    course.notes.append(n10)

    # 11. Termodinámica: Relación entre Delta G° y K
    n11 = NoteNode("quim_11", "Termodinámica: Relación entre Delta G° y K", 80.0, 600.0, ["Química", "Termodinámica", "Delta G", "Equilibrio"])
    n11.add_card(ClozeCard("Energía Libre y Constante de Equilibrio",
        r"$$\Delta G^\circ = {{c1::-RT \ln K}} \iff K = {{c2::\exp\left(-\frac{\Delta G^\circ}{RT}\right)}}$$"
        r"<br>Bajo condiciones no estándar:"
        r"<br>$$\Delta G = {{c3::\Delta G^\circ + RT \ln Q}}$$"
        r"<br>En el equilibrio: $\Delta G = {{c4::0}}$."))
    course.notes.append(n11)

    # 12. Principio de Le Châtelier (Presión y Concentración)
    n12 = NoteNode("quim_12", "Principio de Le Châtelier (Presión y Concentración)", 380.0, 600.0, ["Química", "Le Châtelier", "Presión", "Gases Inertes"])
    n12.add_card(Flashcard("Efecto de Compresión y Gases Inertes",
        r"Analice según Le Châtelier: (1) Reducción de volumen, y (2) Adición de gas inerte a volumen constante.",
        r"1. <b>Reducción de volumen:</b> Aumenta la presión; se desplaza hacia el lado con <b>menor número de moles gaseosos</b>.<br>"
        r"2. <b>Gas inerte a volumen constante:</b> Las presiones parciales de reactivos y productos no cambian; $Q$ permanece intacto y el equilibrio <b>NO se desplaza</b>."))
    course.notes.append(n12)

    # 13. Temperatura en Equilibrio y Ecuación de van 't Hoff
    n13 = NoteNode("quim_13", "Temperatura en Equilibrio y Ecuación de van 't Hoff", 680.0, 600.0, ["Química", "van 't Hoff", "Temperatura"])
    n13.add_card(ClozeCard("Ecuación de van 't Hoff",
        r"La temperatura es la ÚNICA variable que cambia el valor de $K$:"
        r"<br>$$\ln\left(\frac{K_2}{K_1}\right) = {{c1::\frac{\Delta H^\circ}{R}\left(\frac{T_2 - T_1}{T_1 T_2}\right)}}$$"
        r"<br>- Endotérmica ($\Delta H^\circ > 0$): Aumentar $T$ {{c2::aumenta K (favorece productos)}}."
        r"<br>- Exotérmica ($\Delta H^\circ < 0$): Aumentar $T$ {{c3::disminuye K (favorece reactivos)}}."))
    course.notes.append(n13)

    # 14. Grado de Disociación Gaseosa alpha
    n14 = NoteNode("quim_14", "Grado de Disociación Gaseosa alpha", 980.0, 600.0, ["Química", "Disociación", "alpha"])
    n14.add_card(Flashcard("Deducción de Kp con Grado de Disociación alpha",
        r"Para $\ce{A(g) <=> B(g) + C(g)}$ a presión $P_{\text{tot}}$, deduzca $K_p$ en función de $\alpha$ y $P_{\text{tot}}$.",
        r"1. Moles en equilibrio: $n_A = n_0(1-\alpha)$, $n_B = n_C = n_0\alpha$. Total: $n_{\text{tot}} = n_0(1+\alpha)$.<br>"
        r"2. Fracciones molares: $X_A = \frac{1-\alpha}{1+\alpha}$, $X_B = X_C = \frac{\alpha}{1+\alpha}$.<br>"
        r"3. Constante $K_p$:<br>$$K_p = \frac{P_B P_C}{P_A} = \frac{\left(\frac{\alpha}{1+\alpha} P_{\text{tot}}\right)^2}{\frac{1-\alpha}{1+\alpha} P_{\text{tot}}} = \frac{\alpha^2}{1-\alpha^2} P_{\text{tot}}$$"))
    course.notes.append(n14)

    # 15. Autoionización del Agua, pH y pOH
    n15 = NoteNode("quim_15", "Autoionización del Agua, pH y pOH", 1280.0, 600.0, ["Química", "Ácido-Base", "pH", "Kw"])
    n15.add_card(ClozeCard("Constante Kw y Relación pH-pOH",
        r"A $25^\circ\text{C}$:"
        r"<br>- $K_w = [\text{H}^+][\text{OH}^-] = {{c1::1.0 \times 10^{-14}}}$"
        r"<br>- $\text{pH} + \text{pOH} = {{c2::14.00}}$"
        r"<br>- Pares conjugados: $K_a \cdot K_b = {{c3::K_w}}$ y $\text{p}K_a + \text{p}K_b = 14.00$."))
    n15.add_card(Flashcard("Variación de Kw con la Temperatura",
        r"La autoionización del agua es endotérmica ($\Delta H^\circ > 0$). A $50^\circ\text{C}$, $K_w = 5.5 \times 10^{-14}$. Calcule el pH neutro.",
        r"En agua pura neutra: $[\text{H}^+] = [\text{OH}^-] = \sqrt{K_w} = \sqrt{5.5 \times 10^{-14}} \approx 2.345 \times 10^{-7}\,\text{M}$.<br>"
        r"$$\text{pH} = -\log_{10}(2.345 \times 10^{-7}) \approx 6.63$$<br>"
        r"El agua sigue siendo <b>estrictamente neutra</b> a pesar de tener $\text{pH} = 6.63$, porque $[\text{H}^+] = [\text{OH}^-]$."))
    course.notes.append(n15)

    # 16. Ácidos Débiles y Regla del 5%
    n16 = NoteNode("quim_16", "Ácidos Débiles y Regla del 5%", 80.0, 860.0, ["Química", "Ácido Débil", "Ka", "Regla del 5%"])
    n16.add_card(Flashcard("Cálculo de pH y Criterio de la Regla del 5%",
        r"Para un ácido débil $HA$ ($C_0, K_a$), ¿cuándo vale $[\text{H}^+] \approx \sqrt{K_a C_0}$?",
        r"1. <b>Regla del 5%:</b> Válida si $\alpha = x/C_0 < 0.05$, equivalente a:<br>"
        r"$$\frac{C_0}{K_a} > 400$$<br>"
        r"En tal caso: $[\text{H}^+] \approx \sqrt{K_a C_0} \implies \text{pH} = \frac{1}{2}(\text{p}K_a - \log_{10} C_0)$.<br>"
        r"2. <b>Si $\frac{C_0}{K_a} \le 400$:</b> Obligatorio resolver la cuadrática exacta: $x^2 + K_a x - K_a C_0 = 0$."))
    n16.add_card(ClozeCard("Ácidos Polipróticos",
        r"Para un ácido poliprótico como $\ce{H3PO4}$ donde $K_{a1} \gg K_{a2} \gg K_{a3}$:"
        r"<br>- El pH está gobernado casi exclusivamente por {{c1::la primera disociación Ka1}}."
        r"<br>- La concentración del anión divalente es $[\ce{HPO4^{2-}}] \approx {{c2::K_{a2}}}$."))
    course.notes.append(n16)

    # 17. Hidrólisis de Sales Básicas y Ácidas
    n17 = NoteNode("quim_17", "Hidrólisis de Sales Básicas y Ácidas", 380.0, 860.0, ["Química", "Hidrólisis", "Sal Básica", "Sal Ácida"])
    n17.add_card(ClozeCard("Fórmulas de Hidrólisis de Sales",
        r"Para concentración de sal $C_s$:"
        r"<br>- Sal básica ($A^-$): $K_b = \frac{K_w}{K_a}$, $[\text{OH}^-] \approx {{c1::\sqrt{K_b C_s} = \sqrt{\frac{K_w}{K_a} C_s}}}$."
        r"<br>- Sal ácida ($BH^+$): $K_a = \frac{K_w}{K_b}$, $[\text{H}^+] \approx {{c2::\sqrt{K_a C_s} = \sqrt{\frac{K_w}{K_b} C_s}}}$."
        r"<br>- Sales de ácido fuerte y base fuerte (ej. $\ce{NaCl}$): no se hidrolizan, $\text{pH} = {{c3::7.00}}$."))
    course.notes.append(n17)

    # 18. Soluciones Buffer y Henderson-Hasselbalch
    n18 = NoteNode("quim_18", "Soluciones Buffer y Henderson-Hasselbalch", 680.0, 860.0, ["Química", "Buffer", "Henderson-Hasselbalch"])
    n18.add_card(ClozeCard("Ecuación de Henderson-Hasselbalch",
        r"Para amortiguador de ácido débil $HA$ y su sal $A^-$:"
        r"<br>$$\text{pH} = {{c1::\text{p}K_a + \log_{10}\left(\frac{[A^-]}{[HA]}\right) = \text{p}K_a + \log_{10}\left(\frac{n_{A^-}}{n_{HA}}\right)}}$$"
        r"<br>Máxima capacidad amortiguadora: cuando $[A^-] = [HA]$, donde $\text{pH} = {{c2::\text{p}K_a}}$."
        r"<br>Rango de amortiguamiento útil: $\text{pH} = {{c3::\text{p}K_a \pm 1}}$."))
    course.notes.append(n18)

    # 19. Perturbación Estequiométrica de Buffers
    n19 = NoteNode("quim_19", "Perturbación Estequiométrica de Buffers", 980.0, 860.0, ["Química", "Perturbación", "Buffer", "Neutralización"])
    n19.add_card(ProofSequenceCard("Cálculo de pH tras Perturbar un Buffer con Ácido o Base Fuerte",
        r"Determinar el nuevo pH de un buffer tras agregar ácido o base fuerte.",
        [
            r"Paso 1 (Neutralización): Si se añade ácido fuerte $H^+$, reacciona con la base conjugada: $A^- + H^+ \to HA$.",
            r"Paso 2 (Actualización de moles): $n'_{A^-} = n_{A^-} - n_{H^+}$ y $n'_{HA} = n_{HA} + n_{H^+}$.",
            r"Paso 3 (Alternativa con base fuerte $OH^-$): Reacciona con el ácido débil: $HA + OH^- \to A^- + H_2O \implies n'_{HA} = n_{HA} - n_{OH^-}$ y $n'_{A^-} = n_{A^-} + n_{OH^-}$.",
            r"Paso 4 (Henderson-Hasselbalch): $\text{pH}_{\text{nuevo}} = \text{p}K_a + \log_{10}\left(\frac{n'_{A^-}}{n'_{HA}}\right)$."
        ]))
    course.notes.append(n19)

    # 20. Titulaciones y Puntos de Equivalencia
    n20 = NoteNode("quim_20", "Titulaciones y Puntos de Equivalencia", 1280.0, 860.0, ["Química", "Titulación", "Equivalencia", "Semiequivalencia"])
    n20.add_card(Flashcard("Puntos Notables en Curva de Titulación Ácido Débil - Base Fuerte",
        r"Describa el pH en los 4 puntos clave de titulación de $HA$ con $\ce{NaOH}$.",
        r"1. <b>Inicio ($V_b = 0$):</b> Ácido débil solo $\implies [\text{H}^+] \approx \sqrt{K_a C_0}$.<br>"
        r"2. <b>Semiequivalencia ($V_b = V_{\text{eq}}/2$):</b> $[HA] = [A^-] \implies \mathbf{\text{pH} = \text{p}K_a}$.<br>"
        r"3. <b>Equivalencia ($V_b = V_{\text{eq}}$):</b> Todo es sal $A^-$, pH <b>básico ($\text{pH} > 7$)</b> por hidrólisis: $[\text{OH}^-] = \sqrt{K_b C_{\text{sal}}}$.<br>"
        r"4. <b>Exceso ($V_b > V_{\text{eq}}$):</b> Dominado por el exceso de $\text{OH}^-$ fuerte."))
    course.notes.append(n20)

    # 21. Balanceo Redox por Ion-Electrón
    n21 = NoteNode("quim_21", "Balanceo Redox por Ion-Electrón", 380.0, 1120.0, ["Química", "Redox", "Ion-Electrón", "Balanceo"])
    n21.add_card(ProofSequenceCard("Algoritmo de Balanceo Ion-Electrón",
        r"Pasos algorítmicos para balancear semirreacciones redox.",
        [
            r"Paso 1: Dividir en oxidación y reducción; balancear elementos distintos de O y H.",
            r"Paso 2: Balancear O agregando $\text{H}_2\text{O}$ al lado deficiente.",
            r"Paso 3: Balancear H agregando $\text{H}^+$ al lado deficiente.",
            r"Paso 4: Balancear carga agregando electrones $e^-$ al lado más positivo.",
            r"Paso 5 (Si es medio básico): Agregar tantos $\text{OH}^-$ a ambos lados como $\text{H}^+$ haya, formar $\text{H}_2\text{O}$ y simplificar.",
            r"Paso 6: Multiplicar por factores cruzados para igualar electrones y sumar."
        ]))
    n21.add_card(ClozeCard("Conceptos de Oxidación y Reducción",
        r"- <b>Oxidación:</b> {{c1::Pérdida de electrones}} (aumento de estado de oxidación). Ocurre en el {{c2::Ánodo}} (vocal-vocal); actúa como agente reductor."
        r"<br>- <b>Reducción:</b> {{c3::Ganancia de electrones}} (disminución de estado de oxidación). Ocurre en el {{c4::Cátodo}} (consonante-consonante); actúa como agente oxidante."))
    course.notes.append(n21)

    # 22. Celdas Galvánicas, Nernst y Faraday
    n22 = NoteNode("quim_22", "Celdas Galvánicas, Nernst y Faraday", 680.0, 1120.0, ["Química", "Celdas", "Nernst", "Faraday"])
    n22.add_card(ClozeCard("Potencial de Celda, Nernst y Ley de Faraday",
        r"Potencial estándar: $E^\circ_{\text{celda}} = E^\circ_{\text{cátodo}} - E^\circ_{\text{ánodo}}$, con $\Delta G^\circ = {{c1::-n F E^\circ_{\text{celda}}}}$."
        r"<br>Ecuación de Nernst a $25^\circ\text{C}$:"
        r"<br>$$E_{\text{celda}} = {{c2::E^\circ_{\text{celda}} - \frac{0.0592}{n}\log_{10} Q}}$$"
        r"<br>Masa depositada por electrólisis: $m = {{c3::\frac{M \cdot I \cdot t}{n F}}}$ ($F = 96485\,\text{C/mol}$)."
        r"<br>En equilibrio: $E_{\text{celda}} = 0 \implies E^\circ_{\text{celda}} = {{c4::\frac{0.0592}{n}\log_{10} K}}$."))
    n22.add_card(Flashcard("Celdas de Concentración y Puente Salino",
        r"¿Cómo funciona una celda de concentración y cuál es la función del puente salino?",
        r"1. <b>Celda de Concentración:</b> Electrodos idénticos sumergidos en soluciones del mismo catión pero a distinta concentración ($E^\circ_{\text{celda}} = 0$). Funciona espontáneamente por gradiente de entropía hacia la igualación de concentraciones:<br>"
        r"$$E = -\frac{0.0592}{n} \log_{10}\left(\frac{[C]_{\text{dil}}}{[C]_{\text{conc}}}\right) > 0$$<br>"
        r"2. <b>Puente Salino ($\ce{KCl}$ o $\ce{KNO3}$):</b> Cierra el circuito eléctrico manteniendo la electroneutralidad: los aniones migran al ánodo y los cationes al cátodo, evitando la acumulación de cargas que detendría la corriente."))
    course.notes.append(n22)

    # Edges Química
    quim_edges = [
        ("quim_01", "quim_02", "Diferencial a Velocidades Iniciales"),
        ("quim_02", "quim_03", "Órdenes a Cinética Orden 0"),
        ("quim_02", "quim_04", "Órdenes a Cinética Orden 1"),
        ("quim_02", "quim_05", "Órdenes a Cinética Orden 2"),
        ("quim_04", "quim_06", "Cinética a Dependencia Térmica Arrhenius"),
        ("quim_06", "quim_07", "Arrhenius a Mecanismos y RDS"),
        ("quim_06", "quim_08", "Ea a Catálisis y Complejo Activado"),
        ("quim_01", "quim_09", "Velocidades a Constantes de Equilibrio"),
        ("quim_09", "quim_10", "Kc y Kp a Cociente de Reacción Q"),
        ("quim_09", "quim_11", "Constante K a Termodinámica Delta G"),
        ("quim_10", "quim_12", "Equilibrio a Le Châtelier"),
        ("quim_11", "quim_13", "Termodinámica a Ecuación de van 't Hoff"),
        ("quim_09", "quim_14", "Kp a Disociación Gaseosa alpha"),
        ("quim_10", "quim_15", "Equilibrio a Autoionización Kw"),
        ("quim_15", "quim_16", "Kw a Ácidos Débiles y Regla del 5%"),
        ("quim_16", "quim_17", "Ka a Hidrólisis de Sales"),
        ("quim_16", "quim_18", "Ácido Débil a Ecuación de Henderson-Hasselbalch"),
        ("quim_18", "quim_19", "Buffer a Perturbación con Ácido/Base Fuerte"),
        ("quim_18", "quim_20", "Zona Buffer a Curvas de Titulación"),
        ("quim_01", "quim_21", "Estequiometría a Balanceo Ion-Electrón"),
        ("quim_21", "quim_22", "Balanceo a Celdas Galvánicas y Nernst"),
        ("quim_10", "quim_22", "Cociente Q a Ecuación de Nernst")
    ]
    for s, t, lbl in quim_edges:
        course.edges.append(NoteEdge(source_id=s, target_id=t, label=lbl))

    return course

# ==============================================================================
# CURSO 4: OFG MUERTE (PRESENTACIÓN Y GUIÓN)
# ==============================================================================
def build_ofg_muerte_course() -> Course:
    course = Course(name="OFG Muerte (Presentación y Guión)")

    # 1. Marco Antropológico y Ritos de Paso (Van Gennep)
    n1 = NoteNode("ofg_01", "Antropología de la Muerte: Ritos de Paso", 80.0, 80.0, ["OFG Muerte", "Antropología", "Van Gennep"])
    n1.add_card(ClozeCard("El Modelo de Van Gennep en el Funeral Griego",
        r"Según Arnold van Gennep, el funeral es un rito de paso tripartito:"
        r"<br>1. Fase de {{c1::Separación}} (aislamiento del cadáver impuro en el *oikos*)."
        r"<br>2. Fase Liminar o de {{c2::Transición}} (el cortejo de la *ékfora* en la frontera urbana)."
        r"<br>3. Fase de {{c3::Reintegración / Agregación}} (sepultura y banquete *perídeipnon*, reconstituyendo la comunidad viva)."))
    course.notes.append(n1)

    # 2. Escatología Homérica y Ontología de la Psyche
    n2 = NoteNode("ofg_02", "Escatología Homérica y la Sombra sin Fuerza", 380.0, 80.0, ["OFG Muerte", "Homero", "Hades", "Eidolon"])
    n2.add_card(ClozeCard("La Psyche en el Hades como Eidolon",
        r"En la épica homérica arcaica, la *psyche* subsiste en el Hades como:"
        r"<br>$$\text{Un } {{c1::*eidolon*}}$$"
        r"<br>Una sombra vaporosa desprovista de fuerza vital ({{c2::*menos*}}) y de sangre, en un letargo desposeído."))
    n2.add_card(Flashcard("La Sentencia Trágica de Aquiles en la Odisea",
        r"¿Cuál es la afirmación de Aquiles en la Nekyia (Odisea XI) y su implicancia?",
        r"Aquiles proclama:<br>"
        r"<i>«Preferiría ser siervo en la tierra de un campesino pobre y sin tierra antes que reinar sobre todos los muertos extintos.»</i><br><br>"
        r"Demuestra el <b>despojo ontológico absoluto</b> de la muerte arcaica: no hay premios morales; el rito busca rescatar la memoria viva (*mneme*)."))
    course.notes.append(n2)

    # 3. Deber Ineludible de Sepultura: Patroclo y Antígona
    n3 = NoteNode("ofg_03", "El Deber Sagrado de Sepultura: Patroclo y Antígona", 680.0, 80.0, ["OFG Muerte", "Fuentes Primarias", "Patroclo", "Antígona"])
    n3.add_card(Flashcard("El Reclamo del Fantasma de Patroclo",
        r"¿Qué implora la sombra insepulta de Patroclo a Aquiles en Ilíada XXIII?",
        r"<i>«¡Sepúltame cuanto antes para que pueda cruzar las puertas del Hades!»</i><br>"
        r"Mientras el cuerpo carezca de sepultura, las sombras ya cruzadas le impiden vadear el río, dejándolo vagar errante en la frontera liminar."))
    n3.add_card(ClozeCard("El Conflicto Sagrado en Antígona de Sófocles",
        r"Antígona desafía al rey Creonte apelando a:"
        r"<br>{{c1::Las leyes no escritas e inmutables de los dioses (*ágrapta nómina*)}}"
        r"<br>que ordenan honrar al cadáver de su hermano por encima de cualquier prohibición civil."))
    course.notes.append(n3)

    # 4. Dialéctica Sagrada: Míasma vs Ta Nomizómena
    n4 = NoteNode("ofg_04", "Dialéctica Sagrada: Míasma vs Ta Nomizómena", 980.0, 80.0, ["OFG Muerte", "Míasma", "Purificación", "Ta Nomizómena"])
    n4.add_card(ClozeCard("Definición de Míasma y Ta Nomizómena",
        r"- {{c1::*Míasma*}}: La contaminación religiosa corruptora que emana del cadáver en descomposición."
        r"<br>- {{c2::*Ta nomizómena*}}: Las honras fúnebres sagradas debidas por piedad."
        r"<br>- El cántaro en la entrada para purificación con agua ajena es el {{c3::*ardánion*}}."))
    course.notes.append(n4)

    # 5. Fase I: La Próthesis (Velatorio Doméstico)
    n5 = NoteNode("ofg_05", "Fase I: La Próthesis y el Oikos", 1280.0, 80.0, ["OFG Muerte", "Próthesis", "Kline", "Preparación"])
    n5.add_card(ClozeCard("Disposición del Difunto sobre la Kline",
        r"En la *próthesis*:"
        r"<br>- El cadáver se lava, se unge con ungüentos y se viste de blanco sobre el lecho mortuorio llamado {{c1::*kline*}}."
        r"<br>- Los pies se orientan apuntando hacia {{c2::la puerta exterior de la casa}}."))
    course.notes.append(n5)

    # 6. Protagonismo Femenino y Liturgia del Dolor: Góos vs Thrēnos
    n6 = NoteNode("ofg_06", "Liturgia del Dolor: Góos vs Thrēnos", 80.0, 340.0, ["OFG Muerte", "Mujeres", "Góos", "Thrēnos"])
    n6.add_card(Flashcard("Diferencia entre Góos y Thrēnos",
        r"Distinga antropológicamente entre el *góos* y el *thrēnos*.",
        r"1. <b>El *Góos* (Lamento Femenino):</b> Improvisado, desgarrador y antifonal de las parientes, con somatización extrema (rasgarse mejillas, mesarse cabellos, golpearse el pecho).<br>"
        r"2. <b>El *Thrēnos* (Canto Poético Masculino):</b> Composición coral formal de poetas profesionales que exalta la virtud cívica (*areté*) y el linaje con distanciamiento solemne."))
    course.notes.append(n6)

    # 7. Fase II: La Ékfora (Cortejo Nocturno)
    n7 = NoteNode("ofg_07", "Fase II: La Ékfora y la Frontera Cívica", 380.0, 340.0, ["OFG Muerte", "Ékfora", "Cortejo", "Cerámico"])
    n7.add_card(ClozeCard("Temporalidad Sagrada de la Ékfora",
        r"El traslado procesional del cuerpo a la necrópolis (el Cerámico) se llama {{c1::*ékfora*}}."
        r"<br>Debía realizarse forzosamente {{c2::antes de la salida del sol (de madrugada)}} para impedir que los rayos sagrados de Helios fueran mancillados por el *míasma*."))
    course.notes.append(n7)

    # 8. Conflicto Político de la Ékfora: Ostentación y Vendettas
    n8 = NoteNode("ofg_08", "Conflicto Político: Ostentación Aristocrática", 680.0, 340.0, ["OFG Muerte", "Polis", "Aristocracia", "Vendettas"])
    n8.add_card(Flashcard("La Ékfora como Detonante de Guerra Civil Facciosa",
        r"¿Por qué los cortejos fúnebres aristocráticos amenazaban el orden cívico?",
        r"Las familias nobles (*eupátridas*) convertían la *ékfora* en propaganda dinástica, desfilando con carros de lujo y plañideras contratadas, usando el llanto para instigar venganzas de sangre (*vendettas* clánicas) entre familias rivales, amenazando la paz de la *polis*."))
    course.notes.append(n8)

    # 9. Fase III: Sepultura, Inhumación vs Cremación en el Ática
    n9 = NoteNode("ofg_09", "Fase III: Depósito Corporal e Inhumación", 980.0, 340.0, ["OFG Muerte", "Sepultura", "Inhumación", "Cremación"])
    n9.add_card(ClozeCard("Inhumación Predominante en el Ática",
        r"En la Atenas arcaica y clásica la práctica funeraria abrumadoramente dominante fue la {{c1::inhumación en tierra o sarcófago}}, explicada arqueológicamente por {{c2::la grave escasez de madera para piras en el Ática}}."))
    course.notes.append(n9)

    # 10. Ofrendas Rituales: Libaciones Choai y Banquete Perídeipnon
    n10 = NoteNode("ofg_10", "Libaciones Choai y Banquete Perídeipnon", 1280.0, 340.0, ["OFG Muerte", "Choai", "Perídeipnon", "Reintegración"])
    n10.add_card(ClozeCard("Libaciones y Banquete de Reintegración",
        r"- Libaciones sobre la tumba (vino puro, leche, miel y aceite): {{c1::*choai*}}."
        r"<br>- Banquete formal en el hogar purificado: {{c2::*perídeipnon*}}, donde el difunto es el {{c3::anfitrión de honor}}."))
    course.notes.append(n10)

    # 11. Arqueología: Lekythoi y la Cámara Ciega
    n11 = NoteNode("ofg_11", "Arqueología: Lekythoi y la Cámara Ciega", 80.0, 600.0, ["OFG Muerte", "Arqueología", "Lekythos", "Cámara Ciega"])
    n11.add_card(Flashcard("Economía Ritual de la Cámara Ciega en Lekythoi",
        r"¿Qué reveló el hallazgo arqueológico de la cámara ciega en los lekythoi de fondo blanco?",
        r"Muchos lekythoi contenían una pequeña cápsula sellada en el cuello que retenía apenas unas gotas de perfume costoso, manteniendo el resto del vaso vacío.<br>"
        r"Demuestra el pragmatismo ático: cumplir el decoro sagrado exterior sin incurrir en un gasto económico ruinoso."))
    course.notes.append(n11)

    # 12. El Óbolo Funerario: Credencial Cívica y Moral
    n12 = NoteNode("ofg_12", "El Óbolo Funerario y Caronte", 380.0, 600.0, ["OFG Muerte", "Óbolo", "Caronte", "Moneda"])
    n12.add_card(ClozeCard("Sentido Moral del Óbolo de Caronte",
        r"La moneda colocada en la boca o mano del difunto era el óbolo."
        r"<br>Lejos de un mero peaje mercantil para Caronte, funcionaba como una {{c1::credencial cívica y moral}} que acreditaba que el muerto tenía {{c2::parientes solventes que ejecutaron las honras sagradas}}."))
    course.notes.append(n12)

    # 13. Topografía Sagrada del Hades: Ríos y Psicopompo
    n13 = NoteNode("ofg_13", "Topografía del Inframundo: Ríos Sagrados", 680.0, 600.0, ["OFG Muerte", "Hades", "Ríos", "Hermes"])
    n13.add_card(ClozeCard("Los Ríos del Hades y el Guía de Almas",
        r"El dios que conduce las almas al inframundo es {{c1::Hermes Psicopompo}}."
        r"<br>Los ríos sagrados del Hades son:"
        r"<br>- El {{c2::Aqueronte}} (del dolor)."
        r"<br>- La {{c3::Estigia}} (del juramento sagrado e inviolable)."
        r"<br>- El {{c4::Lete}} (del olvido)."
        r"<br>- El Flegetonte (de fuego) y el Cocito (de los lamentos)."))
    course.notes.append(n13)

    # 14. Reformas Suntuarias de Solón (594 a.C.)
    n14 = NoteNode("ofg_14", "Leyes de Solón (594 a.C.) y la Ley Común", 980.0, 600.0, ["OFG Muerte", "Solón", "Leyes Suntuarias", "Polis"])
    n14.add_card(Flashcard("Las Reformas Suntuarias de Solón (594 a.C.)",
        r"Enumere las restricciones que impuso Solón al duelo y su objetivo político.",
        r"1. <b>Medidas:</b> Prohibió arañarse las mejillas con las uñas; prohibió plañideras profesionales; limitó el ajuar a 3 mantos; prohibió inmolar bueyes; ordenó cortejos nocturnos en silencio.<br>"
        r"2. <b>Objetivo político:</b> Subordinar el poder tribal de los linajes aristocráticos al imperio de la ley de la *polis*, erradicando las venganzas de sangre y consolidando la paz democrática."))
    course.notes.append(n14)

    # 15. Calendario Post-Sepulcral y Antesterias
    n15 = NoteNode("ofg_15", "Calendario Post-Sepulcral y Antesterias", 1280.0, 600.0, ["OFG Muerte", "Calendario", "Antesterias", "Chytroi"])
    n15.add_card(ClozeCard("Hitos del Luto y Fiesta de los Chytroi",
        r"Visitas del calendario fúnebre: al tercer día ({{c1::*trita*}}), noveno día ({{c2::*énata*}}), trigésimo (*triakostia*) y al año (*eníausia*)."
        r"<br>En las fiestas Antesterias se celebraba el día de los {{c3::*Chytroi* (las ollas)}}, ofreciendo gachas a las sombras que visitaban la ciudad."))
    course.notes.append(n15)

    # 16. Estética Clásica de la Memoria: Dexiosis y la Estela de Hegeso
    n16 = NoteNode("ofg_16", "Arte de la Memoria: Dexiosis y Ethos Clásico", 80.0, 860.0, ["OFG Muerte", "Dexiosis", "Hegeso", "Ethos"])
    n16.add_card(ClozeCard("El Motivo Iconográfico de la Dexiosis",
        r"En las estelas fúnebres de mármol del Cerámico, el apretón solemne de manos entre el difunto y el deudo se llama {{c1::*dexiosis*}}."
        r"<br>Encarna el *ethos* sereno y la {{c2::*kalokagathía*}}, preservando la memoria imperecedera (*mneme*)."))
    n16.add_card(Flashcard("Análisis Formal de la Estela de Hegeso",
        r"Describa la Estela de Hegeso y explique por qué rechaza el patetismo de la muerte biológica.",
        r"Hegeso aparece sentada contemplando con calma una joya extraída de un cofre que le sostiene su esclava.<br>"
        r"No hay expresiones de enfermedad, dolor ni putrefacción: el arte clásico ático eterniza a la persona en la plenitud de su armonía cívica y belleza imperecedera, neutralizando el horror de la tumba."))
    course.notes.append(n16)

    # 17. Diálogo Crítico con la Modernidad: Desamparo Simbólico
    n17 = NoteNode("ofg_17", "Diálogo Contemporáneo: Desamparo Simbólico", 380.0, 860.0, ["OFG Muerte", "Modernidad", "Hospital", "Desamparo Simbólico"])
    n17.add_card(Flashcard("Muerte Ritual Helénica vs Muerte Hospitalaria Moderna",
        r"Compare la tecnología ritual griega con la gestión hospitalaria contemporánea.",
        r"1. <b>Grecia Antigua:</b> La muerte se vive en el hogar y en la calle; el dolor se materializa y somatiza colectivamente; los ritos recomponen a la comunidad.<br>"
        r"2. <b>Modernidad Hospitalaria:</b> Confinamiento a pabellones asépticos y morgues profesionales; la muerte se higieniza y se oculta; el doliente queda en un profundo <b>desamparo simbólico</b>."))
    course.notes.append(n17)

    # 18. Guión de Locución Cronométrico (10:00) y Debate del Plenario
    n18 = NoteNode("ofg_18", "Guión Cronométrico (10:00) y Preguntas de Debate", 680.0, 860.0, ["OFG Muerte", "Guión", "Exposición", "Cronograma"])
    n18.add_card(ClozeCard("Estructura Cronométrica de 4 Expositores",
        r"Distribución estricta de la ponencia (10:00 exactos, 2:30 por expositor):"
        r"<br>- Turno I (0:00 - 2:30): {{c1::Expositor 1}} (Finitud homérica, Odisea, míasma vs ta nomizómena)."
        r"<br>- Turno II (2:30 - 5:00): {{c2::Expositor 2}} (Próthesis, ékfora, sepultura, choai y perídeipnon)."
        r"<br>- Turno III (5:00 - 7:30): {{c3::Expositor 3}} (Lekythos, cámara ciega, leyes de Solón y dexiosis)."
        r"<br>- Turno IV (7:30 - 10:00): {{c4::Expositor 4}} (Desamparo contemporáneo, Tres Tesis y plenario)."))
    n18.add_card(Flashcard("Las Tres Tesis Vertebrales Finales",
        r"Enuncie las tres tesis académicas conclusivas de la ponencia.",
        r"1. <b>Tesis 1:</b> El rito no es salvación individual ultraterrena, sino una tecnología psicosocial indispensable para recomponer y proteger a la comunidad de los vivos.<br>"
        r"2. <b>Tesis 2:</b> Las reformas de Solón (594 a.C.) marcan el nacimiento de la política cívica al someter el dolor tribal al imperio de la ley común.<br>"
        r"3. <b>Tesis 3:</b> Frente al aislamiento higienizado moderno, la experiencia helénica demuestra que el duelo requiere ser visibilizado, corporeizado y ritualizado colectivamente."))
    course.notes.append(n18)

    # Edges OFG Muerte
    ofg_edges = [
        ("ofg_01", "ofg_02", "Antropología a Escatología Homérica"),
        ("ofg_02", "ofg_03", "Hades a Deber Sagrado de Sepultura"),
        ("ofg_03", "ofg_04", "Deber Sagrado a Dialéctica del Míasma"),
        ("ofg_04", "ofg_05", "Míasma a Fase I Próthesis"),
        ("ofg_05", "ofg_06", "Próthesis a Protagonismo Femenino y Góos"),
        ("ofg_05", "ofg_07", "Próthesis a Fase II Ékfora"),
        ("ofg_07", "ofg_08", "Ékfora a Conflicto Aristocrático"),
        ("ofg_07", "ofg_09", "Ékfora a Fase III Sepultura"),
        ("ofg_09", "ofg_10", "Sepultura a Choai y Perídeipnon"),
        ("ofg_04", "ofg_11", "Ofrendas a Arqueología del Lekythos"),
        ("ofg_09", "ofg_12", "Cultura Material a Óbolo de Caronte"),
        ("ofg_02", "ofg_13", "Escatología a Ríos del Hades y Hermes"),
        ("ofg_08", "ofg_14", "Conflicto Faccioso a Reformas de Solón"),
        ("ofg_10", "ofg_15", "Perídeipnon a Calendario Post-Sepulcral"),
        ("ofg_09", "ofg_16", "Monumentos a Dexiosis y Ethos"),
        ("ofg_01", "ofg_17", "Ritos de Paso a Desamparo Moderno"),
        ("ofg_06", "ofg_18", "Liturgia a Guión de Exposición Oral"),
        ("ofg_14", "ofg_18", "Solón a Tesis y Cronograma de Ponencia"),
        ("ofg_17", "ofg_18", "Crítica Contemporánea a Debate Final")
    ]
    for s, t, lbl in ofg_edges:
        course.edges.append(NoteEdge(source_id=s, target_id=t, label=lbl))

    return course

def main():
    print("==================================================================")
    print("🚀 Generating Massive High-Coverage Courses for Morphism Plus")
    print("==================================================================")
    os.makedirs(COURSES_DIR, exist_ok=True)

    c_em = build_electricidad_magnetismo_course()
    save_course(c_em)
    print(f"✔ Saved: {c_em.name} -> {len(c_em.notes)} notes, {sum(len(n.cards) for n in c_em.notes)} cards, {len(c_em.edges)} edges")

    c_ar = build_analisis_real_course()
    save_course(c_ar)
    print(f"✔ Saved: {c_ar.name} -> {len(c_ar.notes)} notes, {sum(len(n.cards) for n in c_ar.notes)} cards, {len(c_ar.edges)} edges")

    c_quim = build_quimica_course()
    save_course(c_quim)
    print(f"✔ Saved: {c_quim.name} -> {len(c_quim.notes)} notes, {sum(len(n.cards) for n in c_quim.notes)} cards, {len(c_quim.edges)} edges")

    c_ofg = build_ofg_muerte_course()
    save_course(c_ofg)
    print(f"✔ Saved: {c_ofg.name} -> {len(c_ofg.notes)} notes, {sum(len(n.cards) for n in c_ofg.notes)} cards, {len(c_ofg.edges)} edges")

    seed_data = [
        c_em.to_dict(include_scheduling=False),
        c_ar.to_dict(include_scheduling=False),
        c_quim.to_dict(include_scheduling=False),
        c_ofg.to_dict(include_scheduling=False)
    ]
    seed_json_path = "/home/ssparzival/Proyectos/GitHub/Morphism-SRS-plus/android/app/src/main/assets/seed_courses.json"
    with open(seed_json_path, "w", encoding="utf-8") as f:
        json.dump(seed_data, f, indent=2, ensure_ascii=False)
    print(f"✔ Exported seed courses JSON to: {seed_json_path}")

    total_notes = len(c_em.notes) + len(c_ar.notes) + len(c_quim.notes) + len(c_ofg.notes)
    total_cards = sum(sum(len(n.cards) for n in c.notes) for c in [c_em, c_ar, c_quim, c_ofg])
    total_edges = len(c_em.edges) + len(c_ar.edges) + len(c_quim.edges) + len(c_ofg.edges)
    print("==================================================================")
    print(f"🎉 TOTALS: {total_notes} Notes | {total_cards} Cards | {total_edges} Edges across 4 subjects!")
    print("==================================================================")

if __name__ == "__main__":
    main()
