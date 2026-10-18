# 05 — Motor de Planificación FSRS v2, Eliminación de Joint Retrievability y Sesiones de Repaso

> [!IMPORTANT]
> Este documento especifica el nuevo modelo matemático y algorítmico de planificación de **Morphism SRS Prototype 2**, cumpliendo el requerimiento #7 de [`Future_version.md`](file:///c:/repos/Morphism%20SRS%20proto2/Future_version.md):
> *"Eliminate joint retrievability. Joint retrievability goes to 0 extremely quick and is not feasible in general."*

---

## 1. Por qué se Elimina *Joint Retrievability* y Qué la Reemplaza

### 1.1 Análisis del Fallo Matemático en el Prototipo 1
En el Prototipo 1 (`models.py` líneas 220–250 y `main.py` líneas 371–398), una nota con $n$ tarjetas calculaba su retención conjunta asumiendo independencia:
$$P\left(\bigcap_{i=1}^n A_i\right) = \prod_{i=1}^n R_i(t)$$
y declaraba que la nota entera estaba vencida (`is_due = True`) en cuanto $\prod_{i=1}^n R_i(t) \le R_{\text{target}}$ (típicamente $0.85$).

**Consecuencia catastrófica**:
- Supongamos una nota `standard` de definiciones topológicas con $n = 10$ tarjetas, o una demostración `serial_sequence_single` de $n = 10$ pasos.
- Para que el producto $\prod_{i=1}^{10} R_i(t)$ sea mayor que $0.85$, cada tarjeta individual debe mantenerse por encima de:
  $$R_i(t) \ge (0.85)^{1/10} \approx 0.9839 \quad (98.4\%)$$
- Como la curva de olvido de FSRS decae de $100\%$ a $90\%$ a lo largo del intervalo programado $S$ (estabilidad), caer de $100\%$ a $98.4\%$ toma apenas una fracción diminuta del intervalo ($\approx 0.14 \cdot S$).
- Resultado: ¡Una nota con 10 tarjetas cuya estabilidad era de 30 días se marcaba como vencida (`🔥 Due`) **apenas unas horas después de haber sido repasada**, y a los pocos días su $P(\bigcap A_i)$ colapsaba cerca de $0\%$!

---

## 2. El Nuevo Modelo de Vencimiento y Métricas en Prototipo 2

### 2.1 Regla Canónica de Vencimiento (`is_due`)
En el Prototipo 2, el vencimiento de una tarjeta y de una nota se define **sin productos de probabilidades**:

1. **Vencimiento de una Tarjeta Individual ($c_i$)**:
   Una tarjeta activa (`deleted_at IS NULL AND archived_at IS NULL AND is_suspended = 0`) está **Due (Por Repasar)** en el instante $t_{\text{now}}$ si y solo si:
   $$\text{is\_due}(c_i, t_{\text{now}}) \iff \bigl(\text{state}(c_i) = 0 \text{ [New]}\bigr) \;\lor\; \bigl(\text{due\_at}(c_i) \le t_{\text{now}}\bigr)$$
   Donde $\text{due\_at}(c_i)$ es calculado directamente por FSRS para alcanzar la retención objetivo $R_{\text{target}}$ (por defecto $0.85$, configurable en `scheduler_presets` o por override en `notes.desired_retention`).

2. **Vencimiento de una Nota ($N = \{c_1, \dots, c_n\}$)**:
   Una nota está **Due** si y solo si **al menos una** de sus tarjetas activas está Due:
   $$\text{is\_due}(N, t_{\text{now}}) \iff \exists\, c_i \in N \text{ tal que } \text{is\_due}(c_i, t_{\text{now}}) = \text{True}$$

3. **Conteo de Tarjetas Vencidas en el Nodo del Grafo (`due_count`)**:
   $$\text{due\_count}(N, t_{\text{now}}) = \sum_{c_i \in N} \mathbb{I}\bigl(\text{is\_due}(c_i, t_{\text{now}})\bigr)$$
   *(En el Prototipo 1, `due_count()` devolvía erróneamente `len(self.cards)` cuando `is_due()` era verdadero, haciendo creer que las 10 tarjetas estaban vencidas cuando solo 1 lo estaba).*

### 2.2 Nuevas Métricas Analíticas de Nivel Nota (Sólo Informativas, No Alteran el Horario)
Para los gráficos de `RetrievabilityPlotDialog`, el inspector de nodos y las insignias del `GraphExplorerView`, reemplazamos $P(\bigcap A_i)$ por dos métricas bien condicionadas que **no dependen exponencialmente del número de tarjetas $n$**:

| Métrica | Fórmula Matemática | Interpretación Cognitiva y Uso en UI |
| :--- | :--- | :--- |
| **Bottleneck Retrievability ($R_{\min}$)** | $$R_{\min}(t) = \min_{1 \le i \le n} R_i(t)$$ | **El eslabón más débil**: En una demostración encadenada $A_1 \to \dots \to A_n$, tu capacidad de completar la demostración está limitada por el paso que peor recuerdas ($\min_i R_i$), **no** por el producto independiente. Se muestra en la insignia de las notas seriales (`🔗 Serial 8s \| R_min = 87%`). |
| **Mean Retrievability ($\bar{R}$)** | $$\bar{R}(t) = \frac{1}{n}\sum_{i=1}^n R_i(t)$$ | **Dominio promedio del tema**: En una nota `standard` de definiciones, indica qué porcentaje promedio de los conceptos del nodo se recuerda hoy. Se muestra en el `RetrievabilityPlotDialog` y en la tabla de pronóstico. |

---

## 3. Comportamiento de Encolado según el Modo de Nota (`review_mode`)

El Prototipo 2 soporta los tres modos de revisión definidos en el esquema SQL (`notes.review_mode`), con semántica precisa para cada uno:

```mermaid
stateDiagram-v2
    [*] --> EvaluateNoteMode: Usuario inicia repaso de Nota N

    state EvaluateNoteMode <<choice>>
    EvaluateNoteMode --> StandardMode: review_mode == 'standard'
    EvaluateNoteMode --> SerialSingleMode: review_mode == 'serial_sequence_single'
    EvaluateNoteMode --> SerialFullMode: review_mode == 'serial_sequence'

    state StandardMode {
        s1: Filtrar sólo tarjetas c_i donde is_due(c_i) == True
        s2: Ordenar por position ASC
        s3: Presentar cada tarjeta de forma independiente
        s1 --> s2 --> s3
    }

    state SerialSingleMode {
        ss1: Encontrar el primer índice k (0-indexed) donde is_due(c_k) == True
        ss2: Colocar pasos previos c_0 .. c_{k-1} en #past-steps-list (Contexto Dominado)
        ss3: Encolar para evaluación activa sólo los pasos vencidos desde k en adelante
        ss4: Al aprobar el paso activo c_j, promover c_j a #past-steps-list
        ss1 --> ss2 --> ss3 --> ss4
    }

    state SerialFullMode {
        sf1: Encolar todos los pasos c_0 .. c_{n-1} en orden estricto
        sf2: A medida que se aprueba c_j, se añade a #past-steps-list
        sf3: Solo actualiza FSRS en pasos que estaban vencidos o fallados (Again/Hard)
        sf1 --> sf2 --> sf3
    }
```

### 3.1 Modo 1: `standard` (Conceptos y Definiciones Independientes)
- **Qué entra en la cola**: Únicamente las tarjetas $c_i \in N$ que cumplen $\text{is\_due}(c_i, t_{\text{now}}) = \text{True}$.
- **Si el usuario hace doble clic en una nota `standard` que NO tiene tarjetas vencidas**:
  - La aplicación muestra un diálogo limpio: *"All $n$ cards in 'Topología en $\mathbb{R}^n$' are up to date ($R_{\min} = 93\%$). Do you want to run a Custom Practice Review anyway?"*
- **Comportamiento al calificar `Again (1)`**:
  - La tarjeta se actualiza en FSRS (pasando a `State.Learning` o `State.Relearning`) y **se re-inserta al final de la cola de la sesión actual** para asegurar que el usuario la domine antes de dar por terminada la sesión.

### 3.2 Modo 2: `serial_sequence_single` (Demostraciones por Pasos con Horario Individual — Modo Recomendado)
Este es el modo central de Morphism SRS para teoremas y problemas largos:
- Cada paso $A_1, A_2, \dots, A_n$ es una fila en `cards` ordenada por `position`.
- Supongamos una demostración de 6 pasos ($A_1 \dots A_6$) donde $A_1, A_2, A_3$ ya están dominados (vencen en 20 días), pero **$A_4$ y $A_6$ están vencidos hoy**, mientras que $A_5$ no está vencido:
  1. **Contexto Inicial**: Al abrir la nota, el primer paso vencido es $k = 4$ ($A_4$). Los pasos anteriores $A_1, A_2, A_3$ se cargan inmediatamente desplegados en el panel superior `#past-steps-list` (`📜 Mastered Previous Steps A_1 ... A_3`), para que el estudiante lea las hipótesis y lemas previos sin tener que calificarlos.
  2. **Evaluación de $A_4$**: Se muestra el frente de $A_4$. El estudiante piensa la demostración del paso 4, revela el reverso y califica:
     - Si califica **`Again (1)`**: El paso $A_4$ permanece como tarjeta activa (vuelve a ocultar el reverso para que lo reintente) o repite antes de avanzar.
     - Si califica **`Hard (2)`, `Good (3)` o `Easy (4)`**: $A_4$ se mueve en $O(1)$ al contenedor `#past-steps-list`.
  3. **Puente sobre pasos intermedios no vencidos ($A_5$)**:
     - Como el paso siguiente $A_6$ depende lógicamente de $A_5$, cuando hay un paso vencido posterior ($A_6$), el paso intermedio no vencido $A_5$ se incorpora automáticamente al contenedor `#past-steps-list` como contexto visible (con un botón opcional *"Re-test step $A_5$"* por si el usuario desea repasarlo también), y la sesión salta directamente a preguntar el paso vencido **$A_6$**.
     - De esta forma, el estudiante **siempre tiene visible toda la cadena deductiva $A_1 \dots A_{j-1}$ previa al paso $A_j$ que está respondiendo**, pero solo invierte tiempo calificando los pasos que realmente le tocan hoy según FSRS.

### 3.3 Modo 3: `serial_sequence` (Repaso de Cadena Completa)
- Para teoremas cortos donde el usuario desea recitar siempre los pasos $A_1 \to A_2 \to \dots \to A_n$ de principio a fin cuando cualquiera de sus pasos vence.
- Protección contra *Over-Reviewing* en FSRS: si el usuario ejecuta una revisión forzada (*Force Review / Cram*) de pasos que aún no estaban vencidos (`elapsed_days < 0.2 * scheduled_days`), el controlador permite elegir entre *"Scheduled Review"* (actualiza FSRS normalmente) o *"Practice Only"* (registra en `review_sessions` pero no infl artificialmente la estabilidad FSRS).

---

## 4. Ordenamiento Topológico en Sesiones Globales de Curso

Cuando el usuario inicia una sesión global de repaso para todo un Curso (`▶️ Review Due in Course`):
- En el Prototipo 1, `_start_global_review` simplemente iteraba `for note in self.notes:` en el orden arbitrario en que fueron creadas. Si el Teorema B dependía de la Definición A (`A -> B`), podía preguntarte primero el Teorema B antes de haber repasado la Definición A.
- En el Prototipo 2, `ReviewSessionController.build_course_queue(course_id)` ejecuta un **Ordenamiento Topológico (Algoritmo de Kahn sobre las aristas `relation_type = 'prerequisite'`)**:
  1. Calcula el nivel de profundidad topológica $\text{depth}(N)$ de cada nota con tarjetas vencidas en el grafo del curso.
  2. Ordena las notas por $(\text{depth}(N) \text{ ASC}, \text{sort\_order ASC}, R_{\min}(N) \text{ ASC})$.
  3. Así, **las definiciones y lemas base (raíces del DAG) se repasan siempre antes que los teoremas que dependen de ellos**.

---

## 5. Deshacer Calificación (`Undo Last Rating` — `Ctrl+Z` en Review)

Una característica indispensable en cualquier SRS moderno que faltaba en el Prototipo 1 es poder deshacer una calificación si el usuario presionó `1` o `Space` por accidente:
- Gracias a que la tabla `review_logs` en SQLite v2 almacena `state_before_json` y `card_schedules` guarda el estado exacto:
- Al presionar `Ctrl+Z` (o el botón `↩️ Undo` en la barra superior de Review):
  1. `ReviewSessionController` extrae el último `ReviewStepAction` de su pila de sesión.
  2. En una transacción SQLite:
     - Restaura `card_schedules` usando los valores exactos de `state_before_json`.
     - Elimina la fila recién creada en `review_logs`.
  3. Si la tarjeta había sido promovida a `#past-steps-list`, `MorphismReview.popLastPastStep()` elimina el último hijo de `#past-steps-list` y vuelve a colocar la tarjeta en `#active-card` en menos de `2 ms`.
