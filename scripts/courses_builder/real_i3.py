"""
Análisis Real (I3) - MAT2514
Full Comprehensive Course Builder for Morphism SRS Plus.
Detailed coverage of Clases 27 to 31, all 16 canonical guide problems, and the official proof writing decalogue.
"""

from morphism.core.models import Course, NoteNode, NoteEdge, Flashcard, ClozeCard, ProofSequenceCard

def build_analisis_real_course() -> Course:
    course = Course(name="Análisis Real (I3)")

    # --------------------------------------------------------------------------
    # 0. Decálogo de Demostraciones y Rúbrica Oficial
    # --------------------------------------------------------------------------
    n0 = NoteNode("ar_00", "Decálogo para Escribir Demostraciones MAT2514", 80.0, 40.0, ["Real", "Rúbrica", "Decálogo"])
    n0.add_card(ClozeCard("La Rúbrica Oficial de 4 Puntos por Demostración",
        r"En MAT2514, cada problema de 16 puntos asigna 4 puntos (25% del puntaje) exclusivamente a la estructura de la escritura:"
        r"<br>1. <b>Apertura (1 pt):</b> Declarar qué se va a probar y la estrategia formal (ej: {{c1::«Fijemos $\varepsilon > 0$. Buscamos $N \in \mathbb{N}$ tal que...» o «Por contradicción, supongamos...»}})."
        r"<br>2. <b>Justificación (1 pt):</b> Citar {{c2::cada teorema o hipótesis por su nombre oficial}} (ej: «Puesto que $K$ es compacto, por Weierstrass...»)."
        r"<br>3. <b>Hilado (1 pt):</b> Conectar deductivamente las proposiciones evitando {{c3::yuxtaponer fórmulas huérfanas sin conectores lógicos}}."
        r"<br>4. <b>Cierre (1 pt):</b> Declarar formalmente el final: {{c4::«Por lo tanto, la propiedad se cumple para todo $x \in K$. Q.E.D.»}}."))
    n0.add_card(Flashcard("Las 7 Intuiciones Nucleares de la I3",
        r"Mencione las 7 intuiciones visuales de la I3 y su efecto técnico operativo.",
        r"1. <b>Compacidad:</b> «Finito disfrazado»: de todo recubrimiento abierto se extrae subrecubrimiento finito. Weierstrass y Heine-Cantor.<br>"
        r"2. <b>Conexidad:</b> «Sin grietas»: el espacio no se puede partir en dos abiertos disjuntos no vacíos. Mapeos continuos preservan conexidad.<br>"
        r"3. <b>Convergencia Uniforme:</b> «Tubo rígido»: para $n \ge N$, todas las curvas $f_n(x)$ caen en la banda $[f(x)-\varepsilon, f(x)+\varepsilon]$ para todo $x$ a la vez.<br>"
        r"4. <b>Equicontinuidad:</b> «Oscilación coordinada»: una misma lupa $\delta(\varepsilon)$ controla la pendiente de todas las infinitas funciones a la vez.<br>"
        r"5. <b>Arzelà–Ascoli:</b> «Compacidad en dimensión infinita»: la bola cerrada no es compacta en $C(K)$; equicontinuidad + acotación garantizan subsucesión convergente.<br>"
        r"6. <b>Stone–Weierstrass:</b> «ADN algebraico»: si un subconjunto cerrado bajo sumas y productos separa puntos y no se anula, es denso en $C(X)$.<br>"
        r"7. <b>Punto Fijo de Banach:</b> «Imán métrico»: una contracción $k < 1$ en un espacio métrico completo colapsa cualquier semilla hacia un punto fijo único."))
    n0.add_card(ProofSequenceCard("Equivalencia Darboux Implica Riemann para Funciones Acotadas",
        r"Demuestre que si una función acotada $f: [a, b] \to \mathbb{R}$ es Darboux integrable ($I = \underline{\int}_a^b f = \overline{\int}_a^b f$), entonces $f$ es Riemann integrable en el sentido clásico.",
        [
            r"Fijemos $\varepsilon > 0$. Por hipótesis de Darboux integrabilidad, existe una partición $P = (x_i)_{i=0}^n$ tal que $U(P, f) - L(P, f) < \varepsilon / 2$.",
            r"Definamos la oscilación global $M - m = \sup f - \inf f$. Si $M = m$, la función es constante y el resultado es trivial. Si $M > m$, definimos $\delta = \min\left(\min_{1\le i\le n} \Delta x_i, \; \frac{\varepsilon/2}{(M - m)(n - 1)}\right) > 0$.",
            r"Sea $P' = (y_k)_{k=0}^{n'}$ cualquier partición con norma $\|P'\| < \delta$ y etiquetas arbitrarias $t_k \in [y_{k-1}, y_k]$. Clasificamos los índices de $P'$ en dos familias: $J = \{k : \exists i \text{ tal que } [y_{k-1}, y_k] \subseteq [x_{i-1}, x_i]\}$ y los intervalos que cruzan algún nodo interno $G = \{k : \exists i \text{ tal que } x_i \in (y_{k-1}, y_k)\}$.",
            r"Notamos que como $P$ tiene $n - 1$ puntos interiores, a lo más $n - 1$ intervalos de $P'$ pueden contener dichos puntos: $|G| \le n - 1$. Por ende, $\sum_{k \in G} \Delta y_k \le (n - 1)\|P'\| < (n - 1)\delta \le \frac{\varepsilon/2}{M - m}$.",
            r"Considerando el refinamiento común $P^* = P \cup P'$, se tiene $|I - S(P', f)| \le |I - S(P^*, f)| + |S(P^*, f) - S(P', f)|$.",
            r"Como $L(P, f) \le S(P^*, f) \le U(P, f)$, el primer término satisface $|I - S(P^*, f)| \le U(P, f) - L(P, f) < \varepsilon / 2$. El segundo término difiere solo en los intervalos de $G$, acotado por $(M - m)\sum_{k \in G} \Delta y_k < (M - m)\frac{\varepsilon/2}{M - m} = \varepsilon / 2$.",
            r"Concluyendo: $|I - S(P', f)| < \varepsilon/2 + \varepsilon/2 = \varepsilon$ para toda partición $P'$ con $\|P'\| < \delta$, demostrando que $f$ es Riemann integrable con integral $I \quad \blacksquare$."
        ]))
    course.notes.append(n0)

    # --------------------------------------------------------------------------
    # 1. Convergencia Puntual vs Uniforme y Criterio del Supremo
    # --------------------------------------------------------------------------
    n1 = NoteNode("ar_01", "Convergencia Puntual y Uniforme", 380.0, 40.0, ["Real", "Convergencia", "Supremo"])
    n1.add_card(ClozeCard("Definición Cuantificada de Convergencia Uniforme",
        r"Dada una sucesión de funciones $f_n: E \to \mathbb{R}$:"
        r"<br>- Convergencia puntual ($f_n \to f$ en $E$): $$\forall x \in E, \; \forall \varepsilon > 0, \; \exists N(x, \varepsilon) \in \mathbb{N}, \; \forall n \ge N \implies |f_n(x) - f(x)| < \varepsilon$$"
        r"<br>- Convergencia uniforme ($f_n \rightrightarrows f$ en $E$): $$\forall \varepsilon > 0, \; \exists N(\varepsilon) \in \mathbb{N}, \; \forall n \ge N, \; \forall x \in E \implies {{c1::|f_n(x) - f(x)| < \varepsilon}}$$"
        r"<br>- Criterio del Supremo: $f_n \rightrightarrows f$ en $E \iff {{c2::\lim_{n\to\infty} \sup_{x \in E} |f_n(x) - f(x)| = 0}}$."))
    n1.add_card(Flashcard("Romper Convergencia Uniforme: Evaluación en Sucesión Móvil",
        r"¿Cómo se utiliza una sucesión de puntos móviles $x_n \in E$ para demostrar que una sucesión de funciones no converge uniformemente?",
        r"Si $f_n(x) \to f(x)$ puntualmente en $E$, para demostrar que $f_n \not\rightrightarrows f$ en $E$ basta encontrar una sucesión de puntos $x_n \in E$ tal que:<br>"
        r"$$\lim_{n \to \infty} |f_n(x_n) - f(x_n)| \ne 0 \quad (\text{o } \limsup_{n \to \infty} |f_n(x_n) - f(x_n)| \ge c > 0)$$<br>"
        r"Ejemplo canónico: $f_n(x) = \frac{n x}{1 + n^2 x^2}$ en $[0, 1]$. Para cada $x$ fijo, $f_n(x) \to 0$.<br>"
        r"Evaluando en $x_n = \frac{1}{n} \in [0, 1]$: $f_n(1/n) = \frac{n(1/n)}{1 + n^2(1/n^2)} = \frac{1}{1 + 1} = \frac{1}{2} \not\to 0$.<br>"
        r"Por lo tanto, la convergencia <b>no</b> es uniforme en $[0, 1]$."))
    course.notes.append(n1)

    # --------------------------------------------------------------------------
    # 2. Dependencia del Dominio y Acotación
    # --------------------------------------------------------------------------
    n2 = NoteNode("ar_02", "Dependencia del Dominio y Acotación", 680.0, 40.0, ["Real", "Dominio", "Acotación"])
    n2.add_card(ClozeCard("Convergencia Uniforme en Subintervalos Compactos",
        r"Para la familia $f_n(x) = \frac{n x}{1 + n^2 x^2}$:"
        r"<br>1. En $[0, 1]$, la convergencia <b>no</b> es uniforme pues el pico de altura $1/2$ ocurre en $x_n = 1/n \to 0$."
        r"<br>2. Sin embargo, en cualquier subintervalo compacto $[a, 1]$ con $a > 0$:"
        r"<br>Para $n$ tal que $1/n < a$, la función es decreciente en $[a, 1]$, luego: $$\sup_{x \in [a, 1]} |f_n(x)| = f_n(a) = {{c1::\frac{n a}{1 + n^2 a^2}}} \le \frac{n a}{n^2 a^2} = {{c2::\frac{1}{n a} \to 0}}$$"
        r"<br>Por lo tanto, $f_n \rightrightarrows 0$ uniformemente en {{c3::$[a, 1]$ para todo $a > 0$}}."))
    n2.add_card(ProofSequenceCard("Límite Uniforme de Funciones Acotadas es Acotado",
        r"Demuestre que si $f_n: E \to \mathbb{R}$ son funciones acotadas y $f_n \rightrightarrows f$ uniformemente en $E$, entonces el límite $f$ es acotado.",
        [
            r"Por definición de convergencia uniforme con $\varepsilon = 1$: existe $N \in \mathbb{N}$ tal que para todo $x \in E$, $|f_N(x) - f(x)| < 1$.",
            r"Puesto que $f_N$ es acotada por hipótesis, existe $M_N < \infty$ tal que $|f_N(x)| \le M_N$ para todo $x \in E$.",
            r"Aplicando la desigualdad triangular: $|f(x)| = |f(x) - f_N(x) + f_N(x)| \le |f(x) - f_N(x)| + |f_N(x)|$.",
            r"Sustituyendo las cotas: $|f(x)| < 1 + M_N$ para todo $x \in E$.",
            r"Por lo tanto, $f$ es acotada en $E$ por la constante $M = M_N + 1 \quad \blacksquare$."
        ]))
    course.notes.append(n2)

    # --------------------------------------------------------------------------
    # 3. Test M de Weierstrass y Criterio de Cauchy Uniforme
    # --------------------------------------------------------------------------
    n3 = NoteNode("ar_03", "Test M de Weierstrass y Cauchy Uniforme", 980.0, 40.0, ["Real", "Weierstrass M", "Series"])
    n3.add_card(ClozeCard("Criterio M de Weierstrass para Series de Funciones",
        r"Sea $\sum_{n=1}^\infty f_n(x)$ una serie de funciones en $E$. Si existe una sucesión de constantes reales $M_n \ge 0$ tales que:"
        r"<br>1. $|f_n(x)| \le M_n$ para todo $x \in E$ y todo $n \in \mathbb{N}$."
        r"<br>2. La serie numérica converge: $$\sum_{n=1}^\infty M_n < \infty$$"
        r"<br>Entonces la serie de funciones $\sum f_n(x)$ converge {{c1::absoluta y uniformemente en $E$}}."
        r"<br>Si además cada $f_n$ es continua, la suma $S(x) = \sum f_n(x)$ es {{c2::continua en $E$}}."))
    n3.add_card(Flashcard("Criterio de Cauchy Uniforme",
        r"Enuncie el Criterio de Cauchy Uniforme y explique por qué es fundamental para probar convergencia uniforme sin conocer el límite a priori.",
        r"<b>Enunciado:</b> Una sucesión de funciones $f_n: E \to \mathbb{R}$ converge uniformemente en $E$ si y solo si:<br>"
        r"$$\forall \varepsilon > 0, \; \exists N \in \mathbb{N}, \; \forall n, m \ge N, \; \forall x \in E \implies |f_n(x) - f_m(x)| < \varepsilon$$<br>"
        r"<b>Importancia metodológica:</b> Permite demostrar que una sucesión o serie converge uniformemente directamente a partir de sus términos algebraicos, sin necesidad de calcular explícitamente ni adivinar la función límite $f(x)$."))
    course.notes.append(n3)

    # --------------------------------------------------------------------------
    # 4. Teorema de Continuidad del Límite Uniforme (Técnica eps/3)
    # --------------------------------------------------------------------------
    n4 = NoteNode("ar_04", "Continuidad del Límite Uniforme y Técnica eps/3", 80.0, 240.0, ["Real", "Continuidad", "eps/3"])
    n4.add_card(ProofSequenceCard("Demostración del Teorema de Continuidad del Límite Uniforme",
        r"Demuestre que si $f_n \in C(E)$ y $f_n \rightrightarrows f$ uniformemente en $E$, entonces $f \in C(E)$.",
        [
            r"Sea $x_0 \in E$ arbitrario y fijemos $\varepsilon > 0$. Deseamos hallar $\delta > 0$ tal que $d(x, x_0) < \delta \implies |f(x) - f(x_0)| < \varepsilon$.",
            r"Por convergencia uniforme: existe $N \in \mathbb{N}$ tal que para todo $x \in E$, $|f_N(x) - f(x)| < \varepsilon/3$.",
            r"Puesto que $f_N$ es continua en $x_0$: existe $\delta > 0$ tal que $d(x, x_0) < \delta \implies |f_N(x) - f_N(x_0)| < \varepsilon/3$.",
            r"Descomponer mediante desigualdad triangular insertando $f_N(x)$ y $f_N(x_0)$:<br>$|f(x) - f(x_0)| \le |f(x) - f_N(x)| + |f_N(x) - f_N(x_0)| + |f_N(x_0) - f(x_0)|$.",
            r"Para todo $x$ con $d(x, x_0) < \delta$: $|f(x) - f(x_0)| < \frac{\varepsilon}{3} + \frac{\varepsilon}{3} + \frac{\varepsilon}{3} = \varepsilon$.",
            r"Por lo tanto, $f$ es continua en $x_0$, y como $x_0$ fue arbitrario, $f$ es continua en todo $E \quad \blacksquare$."
        ]))
    n4.add_card(ClozeCard("Punto Móvil en Convergencia Uniforme",
        r"Si $f_n \rightrightarrows f$ uniformemente en $E$ y $f$ es continua, entonces para <b>toda</b> sucesión $x_n \to x_0$ en $E$:"
        r"<br>$$\lim_{n\to\infty} f_n(x_n) = {{c1::f(x_0)}}$$"
        r"<br>Demostración por descomposición triangular:"
        r"<br>$|f_n(x_n) - f(x_0)| \le |f_n(x_n) - f(x_n)| + |f(x_n) - f(x_0)| \le {{c2::\|f_n - f\|_\infty + |f(x_n) - f(x_0)| \to 0}}$."))
    course.notes.append(n4)

    # --------------------------------------------------------------------------
    # 5. Teorema de Dini y Fallas de Hipótesis
    # --------------------------------------------------------------------------
    n5 = NoteNode("ar_05", "Teorema de Dini y Fallas de Hipótesis", 380.0, 240.0, ["Real", "Dini", "Monotonía"])
    n5.add_card(ClozeCard("Las 3 Hipótesis Indispensables del Teorema de Dini",
        r"Sea $K$ un espacio métrico y $f_n: K \to \mathbb{R}$ una sucesión de funciones continuas. El Teorema de Dini garantiza que $f_n \rightrightarrows f$ uniformemente si se cumplen <b>exactamente</b> estas 3 hipótesis:"
        r"<br>1. El dominio $K$ es {{c1::compacto}}."
        r"<br>2. La sucesión es {{c2::monótona puntual}} ($f_n(x) \le f_{n+1}(x)$ o viceversa para todo $x$)."
        r"<br>3. La función límite puntual $f$ es {{c3::continua en $K$}}."))
    n5.add_card(Flashcard("Los 3 Contraejemplos si Falla una Hipótesis de Dini",
        r"Muestre tres contraejemplos donde falla exactamente una de las hipótesis de Dini y la convergencia deja de ser uniforme.",
        r"1. <b>Falla Compacidad:</b> $f_n(x) = \frac{1}{1 + n x}$ en $(0, 1)$ (abierto). Es monótona decreciente, límite $f(0) = 0$ continuo en $(0,1)$, pero no uniforme pues $\sup |f_n| = 1$.<br>"
        r"2. <b>Falla Monotonía:</b> $f_n(x) = \frac{n x}{1 + n^2 x^2}$ en $[0, 1]$ (compacto). Dominio compacto, límite continuo $f \equiv 0$, pero para $x$ fijo $f_n(x)$ primero crece y luego decrece (no monótona); $f_n(1/n) = 1/2 \not\to 0$.<br>"
        r"3. <b>Falla Continuidad del Límite:</b> $f_n(x) = x^n$ en $[0, 1]$ (compacto). Monótona decreciente, pero el límite puntual $f(x) = 0$ en $[0,1)$ y $f(1)=1$ es discontinuo."))
    n5.add_card(ProofSequenceCard("Demostración Topológica del Teorema de Dini",
        r"Demuestre el Teorema de Dini: Si $K$ es un espacio métrico compacto y $(f_n)_{n=1}^\infty \subset C(K)$ es una sucesión monótona decreciente que converge puntualmente a $0$, entonces $f_n \rightrightarrows 0$ uniformemente en $K$.",
        [
            r"Fijemos $\varepsilon > 0$. Para cada $n \in \mathbb{N}$, definamos el subconjunto de nivel $E_n = \{x \in K : f_n(x) < \varepsilon\} = f_n^{-1}((-\infty, \varepsilon))$.",
            r"Puesto que cada $f_n$ es continua en $K$ y $(-\infty, \varepsilon)$ es abierto en $\mathbb{R}$, cada $E_n$ es un subconjunto abierto de $K$.",
            r"Por la hipótesis de monotonía decreciente ($f_{n+1}(x) \le f_n(x)$ para todo $x$), si $x \in E_n$ entonces $f_{n+1}(x) \le f_n(x) < \varepsilon \implies x \in E_{n+1}$. Así, la familia forma una cadena anidada de abiertos: $E_1 \subseteq E_2 \subseteq \dots \subseteq E_n \subseteq \dots$",
            r"Como $f_n(x) \to 0$ puntualmente para cada $x \in K$, existe algún $n_x$ tal que $f_{n_x}(x) < \varepsilon$, lo que implica $x \in E_{n_x}$. Por consiguiente, la unión recubre todo el espacio: $\bigcup_{n=1}^\infty E_n = K$.",
            r"Dado que $K$ es compacto, todo recubrimiento abierto admite un subrecubrimiento finito: existen índices $n_1 < \dots < N$ tales que $K \subseteq \bigcup_{i=1}^m E_{n_i} = E_N$.",
            r"Por lo tanto $E_N = K$. Para todo $n \ge N$ y todo $x \in K$: $0 \le f_n(x) \le f_N(x) < \varepsilon$. Concluimos que $\|f_n\|_\infty < \varepsilon$ para todo $n \ge N$, probando que $f_n \rightrightarrows 0$ uniformemente en $K \quad \blacksquare$."
        ]))
    course.notes.append(n5)

    # --------------------------------------------------------------------------
    # 6. Espacios Funcionales: C(K) y C^1([a,b])
    # --------------------------------------------------------------------------
    n6 = NoteNode("ar_06", "Espacios Funcionales: Completitud de C(K) y C1", 680.0, 240.0, ["Real", "Banach", "Completitud"])
    n6.add_card(Flashcard("Completitud del Espacio de Banach (C(K), ||.||_inf)",
        r"Demuestre que para cualquier espacio métrico compacto $K$, el espacio $C(K, \mathbb{R})$ con la norma del supremo $\|f\|_\infty = \max_{x \in K}|f(x)|$ es un espacio métrico completo (espacio de Banach).",
        r"1. Sea $(f_n)$ una sucesión de Cauchy en $(C(K), \|\cdot\|_\infty)$. Para cada $\varepsilon > 0$, existe $N$ tal que $\forall n, m \ge N$, $\sup_{x \in K}|f_n(x) - f_m(x)| < \varepsilon$.<br>"
        r"2. Para cada $x \in K$ fijo: $|f_n(x) - f_m(x)| \le \|f_n - f_m\|_\infty < \varepsilon$, luego $(f_n(x))$ es una sucesión de Cauchy en $\mathbb{R}$.<br>"
        r"3. Por completitud de $\mathbb{R}$, existe el límite puntual $f(x) = \lim_{n\to\infty} f_n(x)$.<br>"
        r"4. Tomando $m \to \infty$ en la desigualdad de Cauchy: $|f_n(x) - f(x)| \le \varepsilon$ para todo $n \ge N$ y todo $x \in K$, lo que prueba que $f_n \rightrightarrows f$ uniformemente.<br>"
        r"5. Por el teorema de continuidad del límite uniforme, $f$ es continua en $K$, luego $f \in C(K)$. Así, $C(K)$ es completo $\blacksquare$."))
    n6.add_card(ClozeCard("El Espacio C1([a,b]): Completo en su Norma, Incompleto en Norma Infinito",
        r"En el espacio de funciones continuamente diferenciables $C^1([a, b])$:"
        r"<br>- Con la norma natural $\|f\|_{C^1} = {{c1::\|f\|_\infty + \|f'\|_\infty}}$, el espacio es {{c2::completo (espacio de Banach)}}."
        r"<br>- Con la norma del supremo $\|\cdot\|_\infty$, el espacio $C^1([a, b])$ es {{c3::incompleto y denso en $C([a, b])$}}, pues existen sucesiones de funciones $C^1$ (como aproximaciones suaves de $|x|$) que convergen uniformemente a funciones que no son derivables."))
    course.notes.append(n6)

    # --------------------------------------------------------------------------
    # 7. Paso al Límite bajo Integrales y Derivadas
    # --------------------------------------------------------------------------
    n7 = NoteNode("ar_07", "Integración y Diferenciación Término a Término", 980.0, 240.0, ["Real", "Integración", "Diferenciación"])
    n7.add_card(ClozeCard("Intercambio de Límite e Integral de Riemann",
        r"Si $f_n \in \mathcal{R}([a, b])$ y $f_n \rightrightarrows f$ uniformemente en $[a, b]$:"
        r"<br>1. La función límite $f$ es integrable Riemann: $f \in \mathcal{R}([a, b])$."
        r"<br>2. El límite conmuta con la integral: $$\lim_{n\to\infty} \int_a^b f_n(x) dx = {{c1::\int_a^b f(x) dx = \int_a^b \lim_{n\to\infty} f_n(x) dx}}$$."
        r"<br>Cota del error de integración: $$\left|\int_a^b f_n(x) dx - \int_a^b f(x) dx\right| \le {{c2::(b - a) \|f_n - f\|_\infty \to 0}}$$."))
    n7.add_card(Flashcard("Teorema de Diferenciación Término a Término",
        r"¿Cuáles son las hipótesis rigurosas para derivar término a término una sucesión de funciones diferenciables?",
        r"Sean $f_n: [a, b] \to \mathbb{R}$ funciones diferenciables tales que:<br>"
        r"1. Las <b>derivadas</b> convergen <b>uniformemente</b> a una función $g$: $f_n' \rightrightarrows g$ en $[a, b]$.<br>"
        r"2. Existe <b>al menos un punto</b> $x_0 \in [a, b]$ donde la sucesión de valores converge: $f_n(x_0) \to c \in \mathbb{R}$.<br>"
        r"<b>Conclusión:</b> $f_n$ converge uniformemente en todo $[a, b]$ a una función diferenciable $f$, y $f'(x) = g(x) = \lim_{n\to\infty} f_n'(x)$."))
    course.notes.append(n7)

    # --------------------------------------------------------------------------
    # 8. Equicontinuidad y Teorema de Arzelà-Ascoli
    # --------------------------------------------------------------------------
    n8 = NoteNode("ar_08", "Equicontinuidad y Teorema de Arzelà-Ascoli", 80.0, 440.0, ["Real", "Equicontinuidad", "Arzelà-Ascoli"])
    n8.add_card(ClozeCard("Definición de Equicontinuidad",
        r"Sea $(X, d)$ un espacio métrico. Una familia de funciones $\mathcal{F} \subset C(X)$ es equicontinua en $x_0 \in X$ si:"
        r"<br>$$\forall \varepsilon > 0, \; \exists \delta > 0, \; \forall f \in \mathcal{F}, \; \forall x \in X \implies d(x, x_0) < \delta \implies {{c1::|f(x) - f(x_0)| < \varepsilon}}$$"
        r"<br>La clave metodológica es que $\delta$ depende exclusivamente de $\varepsilon$ y $x_0$, pero es <b>común para toda la familia infinita</b> $\mathcal{F}$."
        r"<br>Si cada $f \in \mathcal{F}$ es $L$-Lipschitz con una misma constante $L$: $$|f(x) - f(y)| \le L d(x, y) \implies \delta = {{c2::\frac{\varepsilon}{L}}}$$ luego toda familia uniformemente Lipschitz es equicontinua."))
    n8.add_card(ProofSequenceCard("Teorema de Arzelà-Ascoli en Espacios Métricos Compactos",
        r"Enuncie la caracterización de relativa compacidad en $C(K)$ dada por el Teorema de Arzelà-Ascoli.",
        [
            r"Sea $K$ un espacio métrico compacto y $\mathcal{F} \subset C(K, \mathbb{R})$.",
            r"$\mathcal{F}$ es relativamente compacto en $(C(K), \|\cdot\|_\infty)$ (su clausura $\overline{\mathcal{F}}$ es compacta) si y solo si:",
            r"Condición 1: $\mathcal{F}$ es equicontinua en todo punto de $K$.",
            r"Condición 2: $\mathcal{F}$ es puntualmente acotada: $\forall x \in K$, $\sup_{f \in \mathcal{F}}|f(x)| < \infty$ (lo cual implica acotación uniforme gracias a la compacidad de $K$).",
            r"Consecuencia secuencial: Toda sucesión $(f_n) \subset \mathcal{F}$ acotada y equicontinua en $K$ compacto admite una subsucesión $(f_{n_k})$ que converge uniformemente en $K \quad \blacksquare$."
        ]))
    n8.add_card(Flashcard("Método Diagonal de Cantor en la Demostración de Arzelà-Ascoli",
        r"¿Cómo opera el método de selección diagonal de Cantor para extraer una subsucesión convergente sobre un conjunto numerable denso $D = \{x_1, x_2, \dots\} \subset K$?",
        r"1. <b>Paso base en $x_1$:</b> Al ser puntualmente acotada, $(f_n(x_1))_{n=1}^\infty$ es acotada en $\mathbb{R}$. Por Bolzano-Weierstrass, existe subsucesión $(f_{1, k})_k$ que converge en $x_1$.<br>"
        r"2. <b>Paso inductivo en $x_m$:</b> A partir de $(f_{m-1, k})_k$, evaluamos en $x_m$ y extraemos una sub-subsucesión $(f_{m, k})_k$ que converge en $x_m$ preservando convergencia en $x_1, \dots, x_{m-1}$.<br>"
        r"3. <b>Sucesión diagonal:</b> Definimos $\phi_k = f_{k, k}$ (el $k$-ésimo término de la $k$-ésima subsucesión).<br>"
        r"4. <b>Convergencia en todo $D$:</b> Para cualquier $x_m$ fijo, al ser $(\phi_k)_{k\ge m}$ subsucesión de $(f_{m, k})$, converge en $x_m$. Así, $\phi_k(x)$ converge puntualmente para todo $x \in D$.<br>"
        r"5. <b>Extensión a $K$:</b> Por equicontinuidad de la familia y compacidad de $K$, la convergencia sobre el conjunto denso $D$ fuerza convergencia uniforme en todo $K$."))
    course.notes.append(n8)

    # --------------------------------------------------------------------------
    # 9. Necesidad de Dominio Compacto en Arzelà-Ascoli
    # --------------------------------------------------------------------------
    n9 = NoteNode("ar_09", "Necesidad de Compacidad en Arzelà-Ascoli", 380.0, 440.0, ["Real", "Arzelà-Ascoli", "Contraejemplos"])
    n9.add_card(Flashcard("Familia Equicontinua y Puntualmente Acotada pero No Uniformemente Acotada en R",
        r"Construya un contraejemplo que demuestre que si el dominio $X$ no es compacto, una familia puede ser equicontinua y puntualmente acotada sin ser uniformemente acotada ni relativamente compacta.",
        r"Considere la familia de funciones $f_n: \mathbb{R} \to \mathbb{R}$ definidas por $f_n(x) = \sin(x) + n \cdot \mathbf{1}_{\{x \ge n\}} \cdot (x - n)$ o simplemente $f_n(x) = \frac{x}{n} + n \cdot \dots$, o de forma más limpia:<br>"
        r"$$f_n(x) = \arctan(x - n) \quad \text{en } \mathbb{R}$$<br>"
        r"1. <b>Equicontinuidad:</b> $|f_n'(x)| = \frac{1}{1 + (x-n)^2} \le 1$. Como todas son 1-Lipschitz, la familia es equicontinua.<br>"
        r"2. <b>Puntualmente acotada:</b> Para cada $x \in \mathbb{R}$ fijo, $|f_n(x)| \le \pi/2$.<br>"
        r"3. <b>Falla de convergencia uniforme:</b> $f_n(x) \to -\pi/2$ puntualmente para todo $x$, pero evaluando en $x_n = n$: $f_n(n) = \arctan(0) = 0 \ne -\pi/2$. Ninguna subsucesión puede converger uniformemente en $\mathbb{R}$.<br>"
        r"Esto demuestra que la compacidad del dominio es <b>estrictamente necesaria</b>."))
    course.notes.append(n9)

    # --------------------------------------------------------------------------
    # 10. Operadores Integrales Compactos
    # --------------------------------------------------------------------------
    n10 = NoteNode("ar_10", "Operadores Integrales de Fredholm y Arzelà-Ascoli", 680.0, 440.0, ["Real", "Operadores", "Fredholm"])
    n10.add_card(ClozeCard("Regularización Equicontinua por Operadores Integrales",
        r"Sea $k: [a, b] \times [a, b] \to \mathbb{R}$ un núcleo continuo. Se define el operador integral de Fredholm $T: C([a, b]) \to C([a, b])$ por: $$(T f)(x) = \int_a^b k(x, y) f(y) dy$$"
        r"<br>1. Como $[a, b] \times [a, b]$ es compacto, $k$ es uniformemente continuo por Heine-Cantor: dado $\varepsilon > 0$, existe $\delta > 0$ tal que $|x_1 - x_2| < \delta \implies |k(x_1, y) - k(x_2, y)| < \frac{\varepsilon}{(b - a) M}$."
        r"<br>2. Si $B = \{f \in C([a, b]) : \|f\|_\infty \le M\}$ es la bola cerrada acotada, entonces la imagen $T(B)$ es {{c1::equicontinua y uniformemente acotada}}."
        r"<br>3. Por el Teorema de Arzelà-Ascoli, el operador integral $T$ es un {{c2::operador compacto}} (transforma conjuntos acotados en relativamente compactos)."))
    course.notes.append(n10)

    # --------------------------------------------------------------------------
    # 11. Teoremas de Stone-Weierstrass
    # --------------------------------------------------------------------------
    n11 = NoteNode("ar_11", "Teorema de Densidad de Stone-Weierstrass", 980.0, 440.0, ["Real", "Stone-Weierstrass", "Densidad"])
    n11.add_card(ClozeCard("Hipótesis del Teorema de Stone-Weierstrass",
        r"Sea $X$ un espacio métrico compacto. Una subálgebra $\mathcal{A} \subset C(X, \mathbb{R})$ es densa en $(C(X), \|\cdot\|_\infty)$ ($\overline{\mathcal{A}} = C(X)$) si cumple las dos condiciones canónicas:"
        r"<br>1. <b>Separa puntos:</b> $$\forall x \ne y \in X, \; \exists f \in \mathcal{A} \implies {{c1::f(x) \ne f(y)}}$$"
        r"<br>2. <b>No se anula idénticamente en ningún punto:</b> $$\forall x \in X, \; \exists g \in \mathcal{A} \implies {{c2::g(x) \ne 0}}$$"
        r"(Si $\mathcal{A}$ contiene a las funciones constantes, la condición 2 se satisface de forma automática)."))
    n11.add_card(Flashcard("Aplicación Canónica: Polinomios Pares Aproximan Funciones Pares",
        r"Demuestre mediante Stone-Weierstrass que el álgebra de polinomios pares $\mathcal{A} = \text{span}\{x^{2k} : k \ge 0\}$ es densa en el espacio de funciones pares continuas $C_{\text{par}}([-1, 1]) = \{f \in C([-1, 1]) : f(-x) = f(x)\}$.",
        r"1. Considere el mapeo cociente $\phi(x) = x^2 = t$, que identifica cada par $\{-x, x\}$ y mapea $[-1, 1]$ sobre el intervalo compacto $[0, 1]$.<br>"
        r"2. Toda función par $f \in C_{\text{par}}([-1, 1])$ se factoriza como $f(x) = g(x^2) = g(t)$, donde $g \in C([0, 1])$.<br>"
        r"3. Los polinomios ordinarios en la variable $t$ (que corresponden a polinomios pares en $x$) forman un álgebra $\mathcal{A}_t = \mathbb{R}[t]$ en $C([0, 1])$.<br>"
        r"4. $\mathcal{A}_t$ contiene a las constantes ($t^0 = 1$) y separa puntos en $[0, 1]$ ($t_1 \ne t_2 \implies t$).<br>"
        r"5. Por Stone-Weierstrass, los polinomios en $t$ son densos en $C([0, 1])$.<br>"
        r"6. Por lo tanto, para todo $\varepsilon > 0$, existe $P(t)$ tal que $|g(t) - P(t)| < \varepsilon$, lo que equivale a $|f(x) - P(x^2)| < \varepsilon$ en $[-1, 1] \quad \blacksquare$."))
    course.notes.append(n11)

    # --------------------------------------------------------------------------
    # 12. Productos Tensoriales y Grados Acotados
    # --------------------------------------------------------------------------
    n12 = NoteNode("ar_12", "Productos Tensoriales y Grados Acotados", 80.0, 640.0, ["Real", "Stone-Weierstrass", "Polinomios"])
    n12.add_card(ClozeCard("Densidad de Productos g(x)h(y) en C(X x Y)",
        r"Sean $X$ e $Y$ espacios métricos compactos. Considere el conjunto de sumas finitas de funciones separables: $$\mathcal{A} = \left\{\sum_{i=1}^m g_i(x) h_i(y) : g_i \in C(X), h_i \in C(Y), m \in \mathbb{N}\right\}$$"
        r"<br>- $\mathcal{A}$ es una subálgebra de $C(X \times Y, \mathbb{R})$ que contiene a las constantes ($1 \cdot 1 = 1$)."
        r"<br>- Si $(x_1, y_1) \ne (x_2, y_2)$, supongamos $x_1 \ne x_2$. Por Urysohn existe $g \in C(X)$ con $g(x_1) \ne g(x_2)$, luego $F(x, y) = g(x) \cdot 1$ separa los puntos."
        r"<br>- Por el Teorema de Stone-Weierstrass, $\mathcal{A}$ es {{c1::densa en $C(X \times Y, \mathbb{R})$}} bajo la norma del supremo."))
    n12.add_card(Flashcard("Grados Acotados: Límite Uniforme de Polinomios de Grado <= d",
        r"Demuestre que si una sucesión de polinomios $(P_n)_{n=1}^\infty$ con grado $\deg(P_n) \le d$ converge uniformemente en $[a, b]$ a una función $f$, entonces $f$ es necesariamente un polinomio de grado $\le d$.",
        r"1. El conjunto de polinomios de grado a lo más $d$, $\mathcal{P}_d = \text{span}\{1, x, x^2, \dots, x^d\}$, es un subespacio vectorial de dimensión finita ($d + 1$) dentro de $C([a, b])$.<br>"
        r"2. En cualquier espacio normado, todo subespacio vectorial de <b>dimensión finita</b> es topológicamente <b>cerrado</b>.<br>"
        r"3. Como $P_n \in \mathcal{P}_d$ para todo $n$ y $P_n \rightrightarrows f$ uniformemente (es decir, en la norma $\|\cdot\|_\infty$), el límite $f$ debe pertenecer a la clausura de $\mathcal{P}_d$.<br>"
        r"4. Dado que $\mathcal{P}_d$ es cerrado, $\overline{\mathcal{P}_d} = \mathcal{P}_d \implies f \in \mathcal{P}_d$. Por lo tanto, $f$ es un polinomio de grado $\le d \quad \blacksquare$."))
    course.notes.append(n12)

    # --------------------------------------------------------------------------
    # 13. Teorema del Punto Fijo de Banach
    # --------------------------------------------------------------------------
    n13 = NoteNode("ar_13", "Contracciones y Punto Fijo de Banach", 380.0, 640.0, ["Real", "Banach", "Punto Fijo"])
    n13.add_card(ClozeCard("Definición de Contracción y Teorema de Banach",
        r"Sea $(X, d)$ un espacio métrico <b>completo</b> no vacío. Una aplicación $T: X \to X$ es una contracción estricta si existe $k \in [0, 1)$ tal que:"
        r"<br>$$d(T(x), T(y)) \le {{c1::k \cdot d(x, y)}} \quad \forall x, y \in X$$"
        r"<br>El Teorema del Punto Fijo de Banach asegura que:"
        r"<br>1. Existe un {{c2::único punto fijo}} $x^* \in X$ tal que $T(x^*) = x^*$."
        r"<br>2. Para <b>cualquier</b> semilla inicial $x_0 \in X$, la sucesión iterativa $x_{n+1} = T(x_n)$ converge a $x^*$: $$\lim_{n\to\infty} x_n = x^*$$."))
    n13.add_card(Flashcard("Cotas de Error a Priori y a Posteriori de Banach",
        r"Escriba las cotas analíticas del error $d(x_n, x^*)$ en el Teorema del Punto Fijo de Banach.",
        r"1. <b>Estimación a priori (depende solo del primer paso $d(x_0, x_1)$):</b><br>"
        r"$$d(x_n, x^*) \le \frac{k^n}{1 - k} d(x_0, x_1)$$<br>"
        r"Permite calcular el número mínimo de iteraciones $n$ necesarias para garantizar un error menor a $\varepsilon$ antes de empezar a iterar.<br>"
        r"2. <b>Estimación a posteriori (depende del paso actual $d(x_{n-1}, x_n)$):</b><br>"
        r"$$d(x_n, x^*) \le \frac{k}{1 - k} d(x_n, x_{n-1})$$<br>"
        r"Permite detener la iteración numérica en tiempo real cuando la diferencia entre pasos consecutivos cae por debajo del umbral deseado."))
    n13.add_card(Flashcard("Lema de Grönwall y Demostración de Unicidad en Picard-Lindelöf",
        r"Enuncie la desigualdad integral de Grönwall y demuestre cómo garantiza la unicidad global de la solución al problema de Cauchy $y' = f(t, y), y(t_0) = y_0$ con $f$ Lipschitz en $y$.",
        r"1. <b>Lema de Grönwall:</b> Si $u(t) \ge 0$ es continua y satisface $u(t) \le \alpha + \beta \int_{t_0}^t u(s) ds$ con $\alpha \ge 0, \beta > 0$ para todo $t \ge t_0$, entonces $u(t) \le \alpha e^{\beta(t - t_0)}$. En particular, si $\alpha = 0$, se deduce que $u(t) \equiv 0$.<br>"
        r"2. <b>Aplicación al problema de Cauchy:</b> Sean $y_1(t)$ y $y_2(t)$ dos soluciones continuas de $y(t) = y_0 + \int_{t_0}^t f(s, y(s)) ds$. Restando ambas expresiones:<br>"
        r"$$|y_1(t) - y_2(t)| \le \int_{t_0}^t |f(s, y_1(s)) - f(s, y_2(s))| ds \le L \int_{t_0}^t |y_1(s) - y_2(s)| ds$$<br>"
        r"3. <b>Conclusión de unicidad:</b> Tomando $u(t) = |y_1(t) - y_2(t)|$, tenemos $u(t) \le 0 + L \int_{t_0}^t u(s) ds$. Por Grönwall con $\alpha = 0$, $u(t) \le 0 \cdot e^{L(t - t_0)} = 0$, lo que implica $y_1(t) = y_2(t)$ para todo $t \ge t_0 \quad \blacksquare$."))
    course.notes.append(n13)

    # --------------------------------------------------------------------------
    # 14. Contraejemplos y Potencias Contractivas
    # --------------------------------------------------------------------------
    n14 = NoteNode("ar_14", "Contraejemplos de Punto Fijo y Potencias Contractivas", 680.0, 640.0, ["Real", "Punto Fijo", "Volterra"])
    n14.add_card(Flashcard("Contraejemplo: Desigualdad Débil d(T(x), T(y)) < d(x, y) Sin Punto Fijo",
        r"Muestre que la condición débil $d(T(x), T(y)) < d(x, y)$ para todo $x \ne y$ en un espacio métrico completo no garantiza la existencia de punto fijo si el dominio no es compacto.",
        r"Considere el espacio métrico completo $X = [1, \infty)$ con la distancia usual, y la función:<br>"
        r"$$T(x) = x + \frac{1}{x}$$<br>"
        r"1. <b>Derivada:</b> $T'(x) = 1 - \frac{1}{x^2}$. Para todo $x \in (1, \infty)$, $0 < T'(x) < 1$.<br>"
        r"2. Por el Teorema del Valor Medio: $|T(x) - T(y)| = T'(\xi)|x - y| < |x - y|$ para todo $x \ne y$.<br>"
        r"3. Sin embargo, no existe constante $k < 1$ estricta, pues $\sup_{x \ge 1} T'(x) = 1$.<br>"
        r"4. Ecuación de punto fijo: $T(x^*) = x^* \implies x^* + \frac{1}{x^*} = x^* \implies \frac{1}{x^*} = 0$, que <b>no tiene solución</b> en $[1, \infty)$.<br>"
        r"(Nota: En cambio, por el Teorema de Edelstein, si el espacio es <b>compacto</b>, la condición estricta $d(T(x), T(y)) < d(x, y)$ sí garantiza punto fijo único)."))
    n14.add_card(ClozeCard("Teorema del Iterado Contractivo (T^m es Contracción)",
        r"Sea $(X, d)$ un espacio métrico completo y $T: X \to X$ una aplicación tal que para algún entero $m \ge 1$, el iterado $T^m$ es una contracción estricta:"
        r"<br>$$d(T^m(x), T^m(y)) \le k d(x, y) \quad (k < 1)$$"
        r"<br>Entonces $T$ posee un {{c1::único punto fijo}} $x^* \in X$ ($T(x^*) = x^*$)!"
        r"<br>Demostración: Por Banach, $T^m$ tiene punto fijo único $x^*$. Entonces: $$T^m(T(x^*)) = T(T^m(x^*)) = {{c2::T(x^*)}}$$"
        r"<br>Por unicidad del punto fijo de $T^m$, debe ser $T(x^*) = x^*$. Esta técnica es el motor fundamental para resolver {{c3::ecuaciones integrales de Volterra y el teorema de Picard-Lindelöf}}."))
    course.notes.append(n14)

    # --------------------------------------------------------------------------
    # Edges (Dependencias Pedagógicas)
    # --------------------------------------------------------------------------
    edges_def = [
        ("ar_00", "ar_01"), ("ar_01", "ar_02"), ("ar_01", "ar_03"), ("ar_02", "ar_04"),
        ("ar_03", "ar_04"), ("ar_04", "ar_05"), ("ar_04", "ar_06"), ("ar_05", "ar_06"),
        ("ar_04", "ar_07"), ("ar_06", "ar_08"), ("ar_08", "ar_09"), ("ar_08", "ar_10"),
        ("ar_06", "ar_11"), ("ar_11", "ar_12"), ("ar_06", "ar_13"), ("ar_13", "ar_14")
    ]
    for s, t in edges_def:
        course.edges.append(NoteEdge(source_id=s, target_id=t))

    return course
