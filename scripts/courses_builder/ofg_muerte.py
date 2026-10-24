"""
OFG Muerte - Ritos Funerarios en la Grecia Antigua (MED836)
Full Comprehensive Course Builder for Morphism SRS Plus.
Detailed coverage of anthropology, Homeric eschatology, canonical ritual triptych, Solon's laws, and presentation scripts.
"""

from morphism.core.models import Course, NoteNode, NoteEdge, Flashcard, ClozeCard, ProofSequenceCard

def build_ofg_muerte_course() -> Course:
    course = Course(name="OFG Muerte (Presentación y Guión)")

    # --------------------------------------------------------------------------
    # 0. Rúbrica Oficial de Evaluación MED836
    # --------------------------------------------------------------------------
    n0 = NoteNode("ofg_00", "Rúbrica de Evaluación MED836 y Criterios Orales", 80.0, 40.0, ["OFG", "Rúbrica", "Evaluación"])
    n0.add_card(ClozeCard("Criterios de Evaluación Oficial MED836",
        r"La rúbrica de evaluación para la ponencia oral universitaria exige:"
        r"\n1. <b>Ajuste cronométrico estricto:</b> La disertación debe durar exactamente {{c1::10 minutos (10:00)::tiempo asignado}} repartidos equitativamente entre los 4 expositores (2:30 c/u)."
        r"\n2. <b>Dominio conceptual:</b> Manejo fluido de los conceptos griegos sin lectura mecánica: {{c2::$\text{prothesis}, \text{ekphora}, \text{psyche}, \text{eidolon}, \text{miasma}, \text{dexiosis}, \text{mneme}$::terminología fundamental}}."
        r"\n3. <b>Integración con la medicina y bioética (MED836):</b> Analizar cómo los ritos antiguos ilustran la necesidad humana universal de {{c3::contención simbólica del duelo y dignidad del cadáver::nexo con la medicina contemporánea}}."))
    course.notes.append(n0)

    # --------------------------------------------------------------------------
    # 1. Antropología de la Muerte: Ritos de Paso
    # --------------------------------------------------------------------------
    n1 = NoteNode("ofg_01", "Antropología de la Muerte: Ritos de Paso", 380.0, 40.0, ["OFG", "Van Gennep", "Ritos de Paso"])
    n1.add_card(ClozeCard("El Esquema Tripartito de Arnold van Gennep",
        r"En la antropología clásica de Arnold van Gennep (1909), el funeral griego se estructura como el paradigma de los <b>ritos de paso</b> en tres fases:"
        r"\n1. <b>Fase Preliminar (Separación):</b> Ruptura del individuo con el mundo de los vivos: {{c1::La Prótesis (lavado, mortaja y velatorio en el oikos)::rito de separación}}."
        r"\n2. <b>Fase Liminar (Marginalidad / Tránsito):</b> El sujeto ya no pertenece a los vivos pero aún no ingresa al inframundo: {{c2::La Ékfora (cortejo fúnebre nocturno)::estado liminal}}."
        r"\n3. <b>Fase Postliminar (Reintegración):</b> El muerto se incorpora a los ancestros y la comunidad viva se restaura: {{c3::La Sepultura, libaciones y el Banquete Perideipnon::rito de reintegración}}."))
    n1.add_card(Flashcard("Concepto de Liminalidad y Peligro de la Transición",
        r"¿Por qué la fase liminar es considerada el momento más peligroso tanto para el difunto como para la comunidad en la cosmovisión griega?",
        r"Durante la liminalidad, el difunto carece de estatus social definido: ya no tiene cuerpo activo entre los vivos, pero su alma errante aún no cruza los ríos del Hades ni es aceptada por las sombras subterráneas.<br>"
        r"Para la comunidad, este estado intermedio genera una intensa contaminación ritual (<b>míasma</b>), ansiedad existencial y peligro de alteración del orden cósmico. Solo la conclusión rigurosa de los ritos prescritos (<b>ta nomizómena</b>) pacifica al espíritu y clausura la brecha liminal."))
    course.notes.append(n1)

    # --------------------------------------------------------------------------
    # 2. El Deber Sagrado de Sepultura: Homero y Sófocles
    # --------------------------------------------------------------------------
    n2 = NoteNode("ofg_02", "El Deber Sagrado de Sepultura: Patroclo y Antígona", 680.0, 40.0, ["OFG", "Homero", "Antígona"])
    n2.add_card(Flashcard("Patroclo y las Súplicas a Aquiles en la Ilíada",
        r"¿Qué mensaje le entrega la sombra de Patroclo a Aquiles en el canto XXIII de la Ilíada y cuál es su significado escatológico?",
        r"La sombra (eidolon) de Patroclo se aparece en sueños a Aquiles y le ruega:<br>"
        r"<i>«¿Duermes, Aquiles, y te has olvidado de mí?... Entiérrame cuanto antes, para que pueda pasar las puertas del Hades. Me apartan las sombras, imágenes de los difuntos, y no me dejan mezclarme con ellas más allá del río...»</i> (Ilíada XXIII, 69-74).<br>"
        r"<b>Significado:</b> Sin los ritos funerarios y la sepultura, el alma queda atrapada en el umbral liminal, desterrada tanto del mundo terrenal como del reposo subterráneo. El sepelio es un imperativo ético ineludible."))
    n2.add_card(ClozeCard("El Conflicto Trágico en Antígona de Sófocles",
        r"En la tragedia de Sófocles, Antígona desafía el decreto real de Creonte que prohibía sepultar a su hermano Polinices:"
        r"\n- El conflicto contrapone la ley positiva del Estado ({{c1::$\text{nomos}$::decreto humano}}) frente a las leyes sagradas eternas e inmutables de los dioses ({{c2::$\text{themis}$ / leyes divinas no escritas::deber cósmico}})."
        r"\n- Negar la sepultura es concebido como una agresión atroz contra el orden natural que atrae {{c3::el míasma (contaminación colectiva) sobre toda la polis::consecuencia sacrílega}}."))
    course.notes.append(n2)

    # --------------------------------------------------------------------------
    # 3. Escatología Homérica y Ontología de la Psyche
    # --------------------------------------------------------------------------
    n3 = NoteNode("ofg_03", "Escatología Homérica y Ontología de la Psyche", 980.0, 40.0, ["OFG", "Escatología", "Psyche"])
    n3.add_card(ClozeCard("Naturaleza de la Psyche en el Más Allá",
        r"En la concepción arcaica homérica:"
        r"\n- La muerte se produce cuando la {{c1::$\text{psyche}$ (aliento vital)::alma}} abandona el cuerpo por la boca o una herida abierta."
        r"\n- En el Hades, el alma subsiste únicamente como un {{c2::$\text{eidolon}$ (sombra o simulacro incorpóreo)::imagen espectral}}, semejante al humo o al reflejo en un sueño."
        r"\n- La sombra carece de fuerza física ({{c3::$\text{menos}$::vigor muscular}}) y de facultades cognitivas o memoria lúcida ({{c4::$\text{phrenes}$::entendimiento}}), a menos que beba de la sangre fresca de los sacrificios (Nekuia de Odisea XI)."))
    course.notes.append(n3)

    # --------------------------------------------------------------------------
    # 4. Geografía Mítica del Inframundo
    # --------------------------------------------------------------------------
    n4 = NoteNode("ofg_04", "Geografía Mítica del Hades y Caronte", 80.0, 240.0, ["OFG", "Hades", "Caronte"])
    n4.add_card(Flashcard("Los Cinco Ríos Sagrados del Hades",
        r"Mencione los 5 ríos del inframundo griego y su correspondencia alegórica.",
        r"1. <b>Estigia (Styx):</b> El río del odio sagrado, sobre el cual los mismos dioses prestan sus juramentos inviolables.<br>"
        r"2. <b>Aqueronte (Acheron):</b> El río de la aflicción y el dolor, que limita la entrada al reino subterráneo y por cuyas aguas transita la barca de Caronte.<br>"
        r"3. <b>Cocito (Cocytus):</b> El río de los lamentos y el llanto fúnebre.<br>"
        r"4. <b>Flegetonte / Piriflegetonte:</b> El río de fuego ardiente que rodea las profundidades del Tártaro.<br>"
        r"5. <b>Lete (Lethe):</b> El río del olvido, de cuyas aguas beben las almas para borrar todos sus recuerdos de la vida terrenal."))
    n4.add_card(ClozeCard("Caronte, el Óbolo Funerario y Hermes Psicopompo",
        r"Tránsito de las almas hacia el inframundo:"
        r"\n- <b>Hermes Psicopompo:</b> Divinidad encargada de {{c1::guiar y conducir las almas::guía psicopompo}} desde el mundo de la luz hasta las márgenes del Aqueronte."
        r"\n- <b>Caronte:</b> El adusto barquero que exige el pago de {{c2::un óbolo de bronce colocado en la boca o sobre los ojos del difunto::moneda funeraria}}."
        r"\n- Los insepultos o aquellos sin moneda quedan condenados a vagar {{c3::durante cien años en la orilla desolada::pena del insepulto}} antes de que se les permita cruzar."))
    course.notes.append(n4)

    # --------------------------------------------------------------------------
    # 5. El Tríptico Canónico: Fase I (Próthesis)
    # --------------------------------------------------------------------------
    n5 = NoteNode("ofg_05", "El Tríptico Ritual: Fase I - La Próthesis", 380.0, 240.0, ["OFG", "Próthesis", "Tríptico"])
    n5.add_card(ClozeCard("Liturgia Doméstica de la Próthesis",
        r"La primera etapa del funeral griego, la <b>Próthesis</b> (exposición pública del cadáver):"
        r"\n- Espacio: Ocurre al interior del {{c1::$\text{oikos}$ (hogar familiar)::espacio doméstico}} y se extiende por un día completo."
        r"\n- Preparación del cadáver (rol femenino exclusivo): Las mujeres de la familia cierran ojos y boca, lavan el cuerpo con agua caliente y perfumes, lo ungen con aceites y lo cubren con {{c2::mortajas blancas ($\text{chlaína}$)::vestidura fúnebre}}."
        r"\n- Colocación de una rama de laurel o jarra con agua ({{c3::$\text{ardánion}$::agua lustradora}}) en la puerta de la casa para advertir a los transeúntes sobre el míasma y permitir su purificación al salir."))
    n5.add_card(Flashcard("Liturgia del Dolor: Distinción entre Góos y Thrēnos",
        r"Distinga formalmente las dos expresiones poéticas y emocionales del lamento fúnebre durante la próthesis.",
        r"1. <b>Góos ($\gamma\acute{o}os$):</b> Lamento fúnebre visceral, improvisado y desgarrador entonado exclusivamente por las mujeres emparentadas con el difunto. Se acompaña de gestos físicos catárticos: rasgarse las mejillas hasta sangrar, golpearse el pecho y mesarse los cabellos.<br>"
        r"2. <b>Thrēnos ($\theta\rho\tilde{\eta}\nu os$):</b> Canto poético solemne, estructurado y compuesto por poetas o cantores profesionales contratados. Introduce templanza y orden reflexivo sobre la finitud de la vida, canalizando cívicamente el desborde pasional del góos."))
    course.notes.append(n5)

    # --------------------------------------------------------------------------
    # 6. El Tríptico Canónico: Fase II (Ékfora)
    # --------------------------------------------------------------------------
    n6 = NoteNode("ofg_06", "El Tríptico Ritual: Fase II - La Ékfora", 680.0, 240.0, ["OFG", "Ékfora", "Procesión"])
    n6.add_card(ClozeCard("La Procesión Cívica de la Ékfora",
        r"La segunda etapa, la <b>Ékfora</b> (traslado del cuerpo):"
        r"\n- Momento: Se realiza obligatoriamente {{c1::antes de la salida del sol::momento liminal crepuscular}} para evitar contaminar con el míasma los rayos de Helios y la actividad cívica de la polis."
        r"\n- Recorrido: El féretro es llevado en carro o andas desde el hogar doméstico hasta {{c2::la necrópolis extramuros (el Cerámico en Atenas)::cementerio fuera de las murallas}}."
        r"\n- Comitiva: Los hombres encabezan la procesión en solemne silencio cívico, seguidos por el féretro y las mujeres detrás con estrictas restricciones de edad y parentesco."))
    course.notes.append(n6)

    # --------------------------------------------------------------------------
    # 7. El Tríptico Canónico: Fase III (Sepultura y Banquete)
    # --------------------------------------------------------------------------
    n7 = NoteNode("ofg_07", "El Tríptico Ritual: Fase III - Sepultura y Banquete", 980.0, 240.0, ["OFG", "Sepultura", "Perídeipnon"])
    n7.add_card(Flashcard("Sepultura, Libaciones Choai y Banquete Perídeipnon",
        r"Describa los ritos de depósito corporal, ofrendas y el banquete post-sepulcral en la fase III.",
        r"1. <b>Depósito:</b> Puede ser <b>inhumación</b> (en sarcófagos de piedra o tierra) o <b>cremación</b> en pira de leña, tras la cual las cenizas se depositan en ánforas de bronce o cerámica.<br>"
        r"2. <b>Ajuar y Vasos Funerarios:</b> Se depositan ofrendas, armas, joyas y de manera paradigmática <b>lekythoi de fondo blanco</b> (vasos esbeltos pintados para contener aceites perfumados).<br>"
        r"3. <b>Libaciones ($\text{choaí}$):</b> Derramamiento de sustancias sagradas sobre la tumba para alimentar a las sombras subterráneas: miel, leche, vino puro, aceite y agua.<br>"
        r"4. <b>Banquete Reintegrador ($\text{Perídeipnon}$):</b> La comitiva regresa a la casa del difunto. Tras purificar el recinto, celebran una comida colectiva en honor al fallecido, marcando el retorno a la vida ordinaria de la comunidad."))
    course.notes.append(n7)

    # --------------------------------------------------------------------------
    # 8. Las Leyes Suntuarias de Solón (594 a.C.)
    # --------------------------------------------------------------------------
    n8 = NoteNode("ofg_08", "Las Leyes de Solón y la Política del Duelo", 80.0, 440.0, ["OFG", "Solón", "Legislación"])
    n8.add_card(ClozeCard("Restricciones Suntuarias y Contención Femenina",
        r"Las reformas legales de Solón en Atenas (594 a.C.) regularon severamente los rituales funerarios aristocráticos:"
        r"\n1. <b>Prohibición de automutilaciones:</b> Se vetó expresamente que las mujeres {{c1::se laceraran la carne, se golpearan el pecho con violencia y entonaran lamentos desmedidos::frenado del goos}}."
        r"\n2. <b>Restricción de aforo:</b> Solo podían asistir a la próthesis y cortejo mujeres {{c2::parientes de hasta segundo grado y mayores de 60 años::limitación de asistentes}}."
        r"\n3. <b>Motivación sociopolítica crucial:</b> Evitar que los clanes aristocráticos convirtieran el funeral en una exhibición de poder dinástico que {{c3::incitara facciones, lealtades privadas y venganzas de sangre ($\text{vendettas}$)::control estatal de la violencia}} frente a la supremacía de la polis democrática."))
    course.notes.append(n8)

    # --------------------------------------------------------------------------
    # 9. Arte Funerario: Las Estelas y la Dexiosis
    # --------------------------------------------------------------------------
    n9 = NoteNode("ofg_09", "Arte Funerario: Las Estelas y la Dexiosis", 380.0, 440.0, ["OFG", "Arte Funerario", "Dexiosis"])
    n9.add_card(Flashcard("El Motivo Escultórico de la Dexiosis",
        r"¿Qué representa el gesto de la dexiosis en las estelas funerarias clásicas de mármol del Cerámico ateniense?",
        r"La <b>dexiosis</b> ($\delta\varepsilon\xi\acute{\iota}\omega\sigma\iota\varsigma$) es el solemne apretón de manos derechas representado en altorrelieve entre la figura sentada (habitualmente el difunto) y una figura de pie (un familiar vivo: cónyuge, padre o hijo).<br>"
        r"<b>Significado simbólico:</b><br>"
        r"1. <b>Vínculo ininterrumpido:</b> Es a la vez un gesto de despedida definitiva y una promesa de lazo indisoluble más allá de la tumba.<br>"
        r"2. <b>Serenidad clásica (sophrosyne):</b> Los rostros no expresan desesperación desgarradora, sino una calma digna y melancólica.<br>"
        r"3. <b>Victoria de la memoria ($\text{mneme}$):</b> Inmortaliza la identidad civil y afectiva del difunto frente al olvido anónimo del Hades."))
    course.notes.append(n9)

    # --------------------------------------------------------------------------
    # 10. Calendario Post-Sepulcral y Antesterias
    # --------------------------------------------------------------------------
    n10 = NoteNode("ofg_10", "Calendario Post-Sepulcral y Fiestas Antesterias", 680.0, 440.0, ["OFG", "Antesterias", "Calendario"])
    n10.add_card(ClozeCard("Ciclo Temporal del Luto y Antesterias",
        r"Ritos post-funerarios en la tradición griega:"
        r"\n- Calendario ritual del duelo: Conmemoraciones periódicas en la tumba con ofrendas en el día {{c1::3 ($\text{trita}$), día 9 ($\text{enata}$) y día 30 ($\text{triakostia}$)::fechas del luto}}, clausurando el luto formal."
        r"\n- <b>Las Antesterias:</b> Festival dionisíaco de primavera cuya tercera jornada se llamaba el día de los {{c2::$\text{Chytroi}$ (las ollas de gachas)::día de los muertos}}."
        r"\n- En esa fecha, los espíritus de los muertos ascendían al mundo de los vivos. Al anochecer, los cabezas de familia los expulsaban con la célebre fórmula ritual apotropaica: {{c3::«¡Fuera Keres, que han terminado las Antesterias!»::despedida de espíritus}}."))
    course.notes.append(n10)

    # --------------------------------------------------------------------------
    # 11. Estructura de los 4 Expositores y Guión (10:00)
    # --------------------------------------------------------------------------
    n11 = NoteNode("ofg_11", "Distribución de los 4 Expositores y Guión Oral", 980.0, 440.0, ["OFG", "Guión", "Expositores"])
    n11.add_card(Flashcard("Cronograma Exacto de los 4 Expositores (10:00 Minutos)",
        r"Detalle la asignación temática y distribución temporal de los 4 expositores para la ponencia.",
        r"1. <b>Expositor 1 (00:00 - 02:30 | Slides 1 a 3):</b> Introducción y Escatología.<br>"
        r"Tema: La muerte como quiebre ontológico en la Hélade, modelo de Van Gennep, la psyche homérica y la topografía mítica del Hades.<br>"
        r"2. <b>Expositor 2 (02:30 - 05:00 | Slides 4 a 6):</b> La Arquitectura del Tríptico Ritual.<br>"
        r"Tema: Contención del míasma, la Próthesis en el oikos, la Ékfora antes del amanecer y la Sepultura/Banquete Perideipnon.<br>"
        r"3. <b>Expositor 3 (05:00 - 07:30 | Slides 7 a 9):</b> Conflicto Político, Leyes de Solón y Memoria.<br>"
        r"Tema: Restricciones de Solón al duelo aristocrático, estelas del Cerámico, motivo de la dexiosis y el discurso de Pericles.<br>"
        r"4. <b>Expositor 4 (07:30 - 10:00 | Slides 10 a 12):</b> Síntesis Ética y Conexión con MED836.<br>"
        r"Tema: Diálogo con el duelo contemporáneo, desamparo simbólico hospitalario y cierre formal en 10:00 exactos."))
    n11.add_card(ClozeCard("Banco de Preguntas Estratégicas para la Defensa Oral (Q&A)",
        r"Preparación para la ronda de preguntas del profesor y ayudantes:"
        r"\n- Pregunta: ¿Por qué Solón restringió el luto de las mujeres y no el de los hombres?"
        r"\n- Respuesta clave: Porque el lamento femenino ({{c1::$\text{góos}$::lamento visceral}}) era el vehículo emocional que movilizaba {{c2::el honor aristocrático del clan ($\text{génos}$) hacia venganzas de sangre::mecanismo faccioso}}, mientras que la polis naciente necesitaba imponer la ley comunitaria por encima de la venganza privada."
        r"\n- Pregunta: ¿Qué enseña la dexiosis a la bioética contemporánea?"
        r"\n- Respuesta clave: Que el final de la vida no es un fracaso técnico que deba ocultarse, sino un {{c3::acontecimiento relacional digno de memoria y despedida compartida::sentido bioético}}."))
    course.notes.append(n11)

    # --------------------------------------------------------------------------
    # Edges (Dependencias Pedagógicas)
    # --------------------------------------------------------------------------
    edges_def = [
        ("ofg_00", "ofg_01"), ("ofg_01", "ofg_02"), ("ofg_02", "ofg_03"),
        ("ofg_03", "ofg_04"), ("ofg_01", "ofg_05"), ("ofg_05", "ofg_06"),
        ("ofg_06", "ofg_07"), ("ofg_07", "ofg_08"), ("ofg_08", "ofg_09"),
        ("ofg_09", "ofg_10"), ("ofg_00", "ofg_11")
    ]
    for s, t in edges_def:
        course.edges.append(NoteEdge(source_id=s, target_id=t))

    return course
