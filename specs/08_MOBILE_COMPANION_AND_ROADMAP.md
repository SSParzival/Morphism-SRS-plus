# 08 — Arquitectura de App Móvil de Estudio, Onboarding de Testers y Plan de Implementación

> [!IMPORTANT]
> Este documento especifica:
> 1. La estrategia de estudio móvil: **Servidor local bajo demanda** (se activa exclusivamente mientras el diálogo del código QR está abierto y se apaga de inmediato al cerrarlo, evitando servidores 24/7 o deuda técnica innecesaria).
> 2. Gestión de mazos introductorios en el backlog `TODO` (sin comprometer desarrollo prematuro).
> 3. Hoja de ruta por fases verificables (Fases 0 a 7).

---

## 1. Estrategia Móvil Bajo Demanda (On-Demand Local Session)

> **Respuesta a tu observación**: *No sé si sea buena la idea de usar un webserver... me preocupa que termine siendo algo con mucho legacy... que el server solo se levante mientras se muestre un código QR.*

Tu enfoque es exactamente el más limpio y libre de deuda técnica:
1. **Cero Procesos 24/7 en Segundo Plano**:
   La aplicación de escritorio **no corre ningún servidor permanente**. No hay servicios en segundo plano ni consumo de batería/recursos cuando la app está en reposo.
2. **Servidor Temporal Exclusivo para la Ventana del Código QR**:
   - En la barra de herramientas existe el botón `📱 Study on Phone`.
   - Al hacer clic, se abre un diálogo modal que:
     1. Levanta un servidor HTTP local en un puerto efímero.
     2. Muestra un **código QR** con la URL local (`http://192.168.x.x:port`).
     3. El usuario escanea el QR con su teléfono, estudia sus tarjetas pendientes en la interfaz web responsive y, al terminar:
     4. **Al cerrar el diálogo del código QR en la PC, el servidor HTTP se destruye y se apaga inmediatamente**.
3. **Ubicación en el Ciclo de Desarrollo**:
   Tal como indicas, esta funcionalidad se ubica al **final del ciclo de desarrollo (Fase 7)**, una vez que la versión de escritorio esté 100% pulida y funcional.

---

## 2. Mazos Semilla en Carpeta `TODO`

> **Respuesta a tu observación**: *Creo que los premade decks no los haré todavía... déjalo en una carpeta como 'TODO' para tenerlo en cuenta.*

- La creación de mazos de fábrica preinstalados se traslada a la carpeta **`resources/TODO/seed_decks/`** como recordatorio futuro.
- En la primera ejecución de la aplicación, el sistema simplemente inicia con un curso vacío limpio o te permite importar tus propios archivos existentes mediante el botón `📥 Import...` o el migrador del Prototipo 1.

---

## 3. Plan Maestro de Implementación por Fases (Roadmap)

```mermaid
flowchart TD
    P0["FASE 0: Estructura, AppData & Esquema SQLite v2 (morphism.db)"]
    P1["FASE 1: Capa de Dominio, SchedulerEngine (FSRS v2) & Repositorios"]
    P2["FASE 2: ThemeManager, Design Tokens & Esquema URL morphism://"]
    P3["FASE 3: Compilador DSL (.mdsl), MediaVault (SVG) & Migrador Proto 1"]
    P4["FASE 4: Review Screen Zero-Lag (review_renderer.js + Undo Rating Ctrl+Z)"]
    P5["FASE 5: Graph Explorer v2 (Rectángulos, Rombos, Círculos) & Note Browser Masivo"]
    P6["FASE 6: Node Editor v2, Scratchbook DSL Studio & Gráficos de Estadísticas"]
    P7["FASE 7: Servidor Móvil On-Demand (QR Temporal) & Empaquetado Release"]

    P0 --> P1 --> P2 --> P3 --> P4 --> P5 --> P6 --> P7
```

### Resumen de Fases:
- **Fase 0**: `platformdirs` para Windows/Linux/macOS, esquema SQL v2 (`schema_v2.sql`), tablas con UUIDs, `media_assets` (SVG/PNG) y tests de integración de base de datos.
- **Fase 1**: Modelos `Card` unificados (sin `card_type` redundante), `Note` con `standard/serial/cloze`, catálogo de tags estándar y `SchedulerEngine` con cálculo de $R_{\min}$, $\bar{R}$ y $P(\bigcap A_i)$.
- **Fase 2**: Sistema de temas con Design Tokens, hojas QSS elásticas (adaptables a 720p) y esquema seguro `morphism://`.
- **Fase 3**: Compilador DSL con sanitización de `<` y `>` y migrador automático desde `New SRS Project`.
- **Fase 4**: Pantalla de repaso con DOM incremental $O(1)$, `MathJax.typesetClear()` selectivo y soporte de **`Ctrl+Z`** para deshacer calificaciones.
- **Fase 5**: Lienzo de grafo con formas diferenciadas (rectángulos, rombos y elipses), multi-selección Marquee y tabla masiva en `NoteBrowserView`.
- **Fase 6**: Editores con pegado directo de imágenes (`Ctrl+V`), Scratchbook con compilador DSL en vivo y estadísticas completas.
- **Fase 7**: Módulo de sincronización/estudio móvil temporal por código QR y generación de ejecutables de distribución.
