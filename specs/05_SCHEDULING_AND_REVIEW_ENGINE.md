# 05 — Motor de Planificación FSRS v2, Métricas Estadísticas y Sesiones Personalizadas

> [!IMPORTANT]
> Este documento especifica:
> 1. El scheduling FSRS individual por tarjeta en los modos simplificados: `standard`, `serial` y `cloze`.
> 2. **Conservación de Joint Retrievability ($P(\bigcap A_i)$) como métrica estadística** (junto a $R_{\min}$ y $\bar{R}$) sin interferir en el horario FSRS.
> 3. **Modalidades de Estudio**: **Auto-Estudio Global** (todo lo que está vencido) y **Estudio Personalizado / Filtrado** (por retención conjunta, cuello de botella, tags, fechas, etc., estilo Anki Custom Study).
> 4. Máquina de estados transaccional con soporte nativo de **`Ctrl+Z` (Undo Rating)**.

---

## 1. El Trío de Métricas de Retención para Notas

> **Respuesta a tu observación**: *Me parece que aunque Joint Retrieval es malo para scheduling, sí vale la pena meterlo como estadística junto a Bottleneck, etc.*

En el Prototipo 2 se conserva y muestra el panel comparativo completo en el inspector de notas y en el diálogo `RetrievabilityPlotDialog`:

| Métrica de la Nota | Expresión Matemática | Propósito y Comportamiento en UI |
| :--- | :--- | :--- |
| **Bottleneck Retrievability ($R_{\min}$)** | $$R_{\min}(t) = \min_{1 \le i \le n} R_i(t)$$ | **El eslabón más débil**: Determina la robustez de la demostración serial. Si un paso clave cayó a 40%, $R_{\min} = 40\%$ te alerta inmediatamente. |
| **Mean Retrievability ($\bar{R}$)** | $$\bar{R}(t) = \frac{1}{n}\sum_{i=1}^n R_i(t)$$ | **Nivel de dominio promedio**: Qué proporción global de los conceptos de la nota retienes en la memoria a largo plazo hoy. |
| **Joint Retrievability ($P(\bigcap A_i)$)** | $$P\left(\bigcap_{i=1}^n A_i\right) = \prod_{i=1}^n R_i(t)$$ | **Retención Conjunta Teórica**: Métrica estadística estricta para evaluar la probabilidad de recordar la totalidad de la nota simultáneamente sin asistencia externa. Se muestra en el gráfico y en estadísticas avanzadas, **sin forzar vencimientos artificiales en el calendario**. |

---

## 2. Planificación según Modos de Nota (`standard`, `serial`, `cloze`)

### 2.1 Modo `standard` (Tarjetas Independientes)
- Cada tarjeta $c_i$ acumula su propia estabilidad $S$ y dificultad $D$.
- Una tarjeta se programa para la fecha donde su retención estimada alcance el `desired_retention` del preset.
- Una nota está vencida si al menos una tarjeta está vencida.

### 2.2 Modo `serial` (Demostraciones Encadenadas Paso a Paso)
- Cada paso es una tarjeta con FSRS propio.
- Cuando la nota vence, el sistema busca el primer paso $A_k$ que está vencido.
- Los pasos previos $A_1 \dots A_{k-1}$ se muestran como **Contexto Histórico Dominado** en el panel `#past-steps-list` desplegable.
- El estudiante responde y califica $A_k$. Al aprobarlo, $A_k$ se traslada al historial y el sistema avanza al siguiente paso vencido.
- No se fuerza la repetición obligatoria de pasos dominados (aunque el usuario puede hacer clic en *"Re-test Step"* si desea auto-evaluarse).

### 2.3 Modo `cloze` (Tarjetas Condicionadas / Oclusiones)
- Diseñado para notas donde una misma proposición o teorema tiene múltiples partes oclusas que condicionan en el contexto general.
- Cada oclusión se programa con FSRS individual, pero al evaluarse se muestra el enunciado completo con la oclusión activa destacada y las demás reveladas o enmascaradas según la configuración.

---

## 3. Modalidades de Sesión: Auto-Estudio vs Estudio Personalizado

Inspirado en el sistema de *Custom Study* de Anki pero potenciado por el modelo relacional de SQLite y las métricas matemáticas de Morphism:

### 3.1 Modo "Auto-Estudio" (Global Due Review)
- Botón accesible desde la barra superior: **`▶️ Study Due Cards`**.
- Consulta automáticamente en SQLite todas las tarjetas activas de todos los cursos (o del curso activo) que cumplen:
  $$\text{state} = 0 \text{ (New)} \quad \lor \quad \text{due\_at} \le t_{\text{now}}$$
- Ordena la cola usando **Orden Topológico del Grafo**: las definiciones y lemas fundamentales se repasan antes que los teoremas que dependen de ellos.

### 3.2 Modo "Estudio Personalizado / Filtrado" (`Custom Study Session`)
Permite crear sesiones de repaso específicas sin alterar los horarios normales de FSRS (o actualizándolos según preferencia):

```text
+-----------------------------------------------------------------------+
| 🎯 Create Custom Study Session                                        |
+-----------------------------------------------------------------------+
| Scope:                                                                |
|   (•) Active Course ("Análisis Real")   ( ) Entire Folder ("Math")    |
|   ( ) Selected Notes in Browser (18 notes)                            |
|                                                                       |
| Filter Criteria:                                                      |
|   [ ] Only cards with Bottleneck R_min <= [ 70 ]%                     |
|   [ ] Only cards with Joint Retrieval P(∩) <= [ 50 ]%                 |
|   [ ] Cards due in the next [ 3 ] days (Early Review / Ahead)         |
|   [ ] Leeches only (Lapses >= [ 3 ])                                  |
|   [ ] Filter by Tags: [ #demostracion ] [ #ch1 ]                      |
|                                                                       |
| Rescheduling Mode:                                                    |
|   (•) Practice Only (Do not modify FSRS intervals)                    |
|   ( ) Update FSRS schedule normally                                   |
|                                                                       |
| [ Cancel ]                                     [ 🚀 Start Session (34)]|
+-----------------------------------------------------------------------+
```

---

## 4. Arquitectura de Deshacer Calificación (`Undo Rating` — `Ctrl+Z`)

Cada calificación en `ReviewWidget` ejecuta una transacción atómica que guarda la tupla:
$$(c_i, \text{log\_id}, \text{state\_before}, \text{state\_after}, \text{step\_promoted})$$
dentro de la pila de sesión de `ReviewSessionController`.

Al presionar **`Ctrl+Z`**:
1. Se recupera el último estado previo `state_before` de la memoria / transacción.
2. Se actualiza `card_schedules` con los valores previos exactos de estabilidad, dificultad y fecha de vencimiento.
3. Se elimina la fila recién insertada en `review_logs`.
4. En el frontend de Chromium, la tarjeta vuelve a la vista activa y, si se había promovido al panel de pasos previos `#past-steps-list`, se extrae del historial sin recargar la página.
