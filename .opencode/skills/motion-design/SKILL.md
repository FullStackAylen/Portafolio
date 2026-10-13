---
name: motion-design
description: >-
  Motion design and animation implementation for this portfolio: scroll reveals, parallax,
  stagger, hover micro-interactions, the protagonist-typography hero with its
  cursor-reactive generative layer (the Campo / Órbita / Marea proposals, pending
  approval), and prefers-reduced-motion fallbacks. Applies the project's animation token
  budgets (durations, easings, ambient-layer and pointer budgets, performance limits) and
  delegates library-specific API questions to the installed motion skill. Use when adding,
  tuning or reviewing any animation, transition, keyframe, scroll-linked or cursor-linked
  effect, or the hero entrance; when choosing durations or easings; when a screen feels
  janky, slow or over-animated; when implementing reduced-motion behaviour; or when
  deciding whether an effect earns its bundle cost. Not for visual hierarchy, typography
  or colour decisions (use portfolio-ux-ui).
argument-hint: "[what should move, e.g. 'hero intro', 'reveal projects', 'parallax background']"
---

# Motion Design

Guía de movimiento **de este proyecto**. Aplica `../../../docs/ANIMATION_GUIDELINES.md`.
Para APIs, ejemplos y documentación de la librería, usar la skill **`motion`** (o el MCP
`motion`) — no duplicar acá documentación que ya está instalada.

## Orden de consulta

1. `../../../AGENTS.md` §8-9 — presupuestos y reglas duras.
2. `../../../docs/ANIMATION_GUIDELINES.md` — tokens de duración/easing y patrones.
3. Skill **`motion`** / MCP `motion` — cómo se implementa concretamente
   (`useScroll`, `whileInView`, `pathLength`, `MotionConfig`, springs).
4. `../../../docs/ROADMAP.md` — la fase aprobada actual.

## Workflow

1. **Justificá la animación en una frase.** ¿Comunica jerarquía, causalidad o
   continuidad? Si no hay respuesta, no se anima.
2. **Elegí el patrón aprobado** (reveal / parallax / stagger / micro-interacción /
   beat de intro) en lugar de inventar uno nuevo.
3. **Respetá los tokens**: duración y easing salen de la tabla de la guía. No se
   escriben números mágicos en el componente.
4. **Implementá el fallback primero**: estado final visible por defecto, luego la
   animación como viaje. Nunca al revés.
5. **Medí**: Performance a 60 fps con CPU 6× antes y después.
6. **Probá con `prefers-reduced-motion: reduce`.**

## Presupuestos (resumen)

| Concepto | Límite |
|---|---|
| Hover / press | 140–180 ms, `scale ≤ 1.02` |
| Menú / toggle | 200–260 ms |
| Reveal por scroll | 400–480 ms, `once: true`, `amount: 0.3` |
| Stagger | 70 ms por hijo, máx 8 hijos / 600 ms totales |
| Parallax | ≤ 10% de desplazamiento, máx 2 capas por sección |
| Entrada del hero | ≤ 1600 ms, legible a 800 ms, salteable |
| Capa ambiente | 1 capa en movimiento; ≤ 8% o 24px; pausa fuera de viewport |
| Reacción al cursor | solo `hover: hover` + `pointer: fine`; spring amortiguado |
| Propiedades animadas | `transform`, `opacity`, `pathLength` únicamente |

## Hero y capa viva — especificación

> ⏳ **El avión y la intro narrativa quedaron descartados** (cambio de dirección 2026-10,
> `PRODUCT_BRIEF.md` §1.1). Las 3 propuestas de hero y su lenguaje de movimiento viven en
> `ANIMATION_GUIDELINES.md` §5 — **A "Campo"** · **B "Órbita"** · **C "Marea"**. Ninguna
> está aprobada: no se implementa ninguna sin elección del propietario.

Duras, válidas para las tres:

- Entrada **≤ 1600 ms**, legible a 800 ms, un solo pase, salteable (clic / `Enter` / scroll).
- Scroll y teclado activos desde el frame 1; el LCP no depende de la animación.
- Canvas 2D escrito a mano, SVG o Motion. **Sin Lottie, WebGL ni GSAP** sin aprobación.
- **Una sola** capa viva en movimiento por viewport; `aria-hidden`, decorativa.
- Reduce-motion: composición final estática y capa viva sin movimiento.

## Cursor y capa ambiente — presupuesto

| Concepto | Límite |
|---|---|
| Capas en movimiento / viewport | **1** |
| Reacción al cursor | solo `hover: hover` + `pointer: fine` |
| Desplazamiento por forma | ≤ 8% de su tamaño o 24px |
| Amortiguación | spring `stiffness 60–120 / damping 14–20` |
| Partículas canvas | ≤ 1200 desktop · ≤ 400 táctil · DPR ≤ 2 |
| Loop | **1** `requestAnimationFrame`, cero `setState` por frame |
| Pausa | fuera de viewport (`IntersectionObserver`) · `document.hidden` · reduce-motion |

## Reglas de rendimiento

- Cero `setState` en handlers de scroll → MotionValues (`useScroll`/`useTransform`).
- Cero animación de `width`/`height`/`top`/`margin`/`left`.
- Cero `box-shadow` ni `filter` en loops; `will-change` temporal.
- Un solo `MotionConfig reducedMotion="user"` en la raíz (`App.js`).
- Máximo una animación focal por viewport.

## Errores conocidos de este código (no repetir)

- `h2` con `fadeInUp` CSS ejecutándose **al montar** → el usuario nunca lo ve.
  Reemplazar por `whileInView`.
- `scale(1.05)`/`scale(1.1)` en hover → excede el límite de `1.02`.
- `<main>` con `opacity 0→1` de 1 s → retrasa la lectura sin aportar.
- Falta `MotionConfig reducedMotion="user"`: hoy todo se anima igual.
- Reacción al cursor hecha con `setState` → re-render por frame. Usar refs/MotionValues.
- Mover o deformar **texto** con el cursor: solo la capa de fondo se mueve.
- Canvas sin pausa fuera de viewport ni `document.hidden` → batería y CPU al pedo.

## Checklist de entrega

- [ ] Animación justificada en una frase.
- [ ] Tokens de duración/easing respetados.
- [ ] Estado final visible sin animación (fallback).
- [ ] `prefers-reduced-motion` verificado.
- [ ] 60 fps en CPU 6× throttle; sin tareas largas > 50 ms.
- [ ] Capa viva dentro del presupuesto (1 capa, pausas, partículas, DPR ≤ 2).
- [ ] CLS 0 y LCP sin regresión.
- [ ] Bundle total ≤ 150 kB gz.
