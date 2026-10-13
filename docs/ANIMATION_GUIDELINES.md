# Animation Guidelines — Portfolio

> Norma de movimiento. Todo lo animado en este proyecto pasa por acá.
> Relacionado: `DESIGN_SYSTEM.md` (qué forma tiene), `AGENTS.md` §8-9 (presupuestos).
>
> Stack: `framer-motion@11` hoy, `motion@14` instalado. Antes de escribir animación,
> consultar la skill `motion` / el MCP `motion` (docs oficiales actualizadas).
>
> **Dirección vigente (2026-10):** cambio de dirección artística — el avión deja de ser
> el protagonista (`PRODUCT_BRIEF.md` §1.1). El hero pasa a ser tipografía protagonista
> + **una** capa reactiva al cursor. Las 3 propuestas y sus reglas están en **§5**;
> ninguna está aprobada todavía.

---

## 1. Principios

1. **El movimiento explica, no decora.** Cada animación debe responder: ¿qué causa?
   ¿qué jerarquía comunica? ¿qué continuidad conserva? Si no tiene respuesta, se elimina.
2. **Máximo una animación focal por viewport.** Dos movimientos compitiendo = ruido.
3. **El contenido manda sobre el movimiento.** Si la animación falla, se retrasa o el
   usuario reduce movimiento, **el contenido está visible igual**.
4. **Consistencia**: mismo patrón para mismo significado (un reveal es un reveal, en
   todas las secciones).
5. **Movimiento con propósito, no con moda.** Nada entra solo porque "queda premium".

---

## 2. Tokens de movimiento

```css
--motion-instant:     80ms;   /* color, borde */
--motion-quick:      140ms;   /* hover, press, focus */
--motion-base:       240ms;   /* menús, toggles, pills */
--motion-emphasis:   420ms;   /* reveals, entradas de tarjeta */
--motion-cinematic:  900ms;   /* beats del hero */

--ease-standard:  cubic-bezier(0.2, 0, 0, 1);   /* default */
--ease-in:        cubic-bezier(0.4, 0, 1, 1);   /* salidas */
--ease-out:       cubic-bezier(0, 0, 0.2, 1);   /* entradas */
```

**Easings de Motion (React)**

| Uso | Config |
|---|---|
| UI response (menú, botón) | `ease: [0.2, 0, 0, 1]`, `duration: 0.24` |
| Reveal de contenido | `ease: [0, 0, 0.2, 1]`, `duration: 0.42` |
| Elemento que "cae" en su lugar | `type: 'spring', stiffness: 380, damping: 28` |
| Header / barra que aparece | `type: 'spring', stiffness: 120, damping: 20` *(actual, válido)* |

**Prohibido:** `ease: 'linear'` en entradas visibles, `bounce` en UI seria, duraciones
entre 600–900 ms fuera del hero (zona de "se siente lento").

---

## 3. Duraciones por tipo de interacción

| Intención | Duración | Detalle |
|---|---|---|
| Hover / press | 140–180 ms | `translateY(-2px)` o `scale(1.02)` **máx** |
| Aparición de menú | 200–260 ms | `opacity` + `y: 8→0` o `scale(0.98)` |
| Reveal por scroll | 400–480 ms | `opacity 0→1` + `y: 20→0` |
| Stagger de grupo | +70 ms por hijo | **máx. 8 hijos / 600 ms totales** |
| Cambio de sección (layout) | 300–400 ms | `layoutId`, sin `AnimatePresence` pesado |
| Transición de imagen/tarjeta | 350–500 ms | `clip-path` o `scale` |
| Beat del hero | 700–900 ms | solo dentro de la entrada del hero |
| **Entrada del hero** | **≤ 1600 ms** | ver §5 — interno; el tope global sigue en 2600 ms |

⚠️ **Corrección del código actual**: `.profile-image:hover { scale(1.05) }` y
`.project:hover { scale(1.05) }`, `.nav-links li:hover { scale(1.1) }` exceden el
límite de `1.02`. Bajar a `1.02` / `translateY(-2px)`.

---

## 4. Patrones aprobados

### 4.1 Reveal por scroll
```jsx
const reveal = {
  initial:  { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.42, ease: [0, 0, 0.2, 1] }
};
```
- **`once: true`** siempre: no re-animar al subir.
- Los `h2` actuales usan `fadeInUp` CSS que se ejecuta **al montar**, no al entrar en
  viewport → el usuario nunca lo ve. Se reemplaza por `whileInView`.

### 4.2 Parallax
```jsx
const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
```
- **Desplazamiento ≤ 10%** de la altura del elemento.
- Suavizar con `useSpring(y, { stiffness: 100, damping: 20 })` si hay jitter.
- Solo `transform`. Nunca `top`/`background-position`.
- **Máximo 2 capas con parallax por sección**; prohibido en todo el scroll de la página.

### 4.3 Stagger
`delayChildren: 0.05`, `staggerChildren: 0.07`. Si el grupo supera 8 elementos, agrupar
(pills por fila) para no pasar de 600 ms totales.

### 4.4 Micro-interacciones
- Botón: `whileTap={{ scale: 0.98 }}` a 140 ms.
- Link activo del nav: `layoutId="nav-underline"` (el subrayado viaja).
- Cards: `whileHover={{ y: -2 }}`, `whileFocus` equivalente.
- Envío de formulario: spinner + texto; **nunca** animación que oculte el resultado.

---

## 5. Hero y lenguaje de movimiento — 3 propuestas *(pendientes de aprobación)*

> **Cambio de dirección (2026-10) — decisión del propietario** (ver
> `PRODUCT_BRIEF.md` §1.1). El avión y la intro narrativa dejan de ser el elemento
> protagonista y quedan **reemplazados** por las tres propuestas de abajo.
> **Ninguna está aprobada todavía**: no se implementa ninguna sin visto bueno.

### 5.1 Las tres propuestas

| | **A — "Campo"** | **B — "Órbita"** | **C — "Marea"** |
|---|---|---|---|
| Composición | Editorial asimétrica: display enorme en 2 líneas + bloque de datos en mono; detrás, **campo de puntos generativo** | **Capas**: 3–4 primitivas geométricas (anillo, arco, cuadrado, regla) flotando a distintas profundidades; el nombre las atraviesa | **Tipografía a escala extrema** ocupando el viewport; una línea de contorno SVG que se curva hacia el cursor |
| Paleta | Papel `#F4F2ED` + tinta + `signal-ink` | **Tinta `#14161A`** + papel + `signal` (requiere los tokens de `DESIGN_SYSTEM.md` §2.1) | Papel + bandas `surface-sunk`; acento `signal` |
| Tipografía | Display + mono de datos | Display con pesos mezclados + etiquetas mono | Display extremo (`clamp` hasta ~14vw), una palabra en contorno |
| Cursor | **Repulsión** en el campo (radio 100–160 px, retorno amortiguado); los puntos cercanos viran a `signal` | **Atracción magnética por capas** (cada capa con su rigidez ⇒ sensación de profundidad); la forma más cercana acerca ≤ 1.02 | **Repulsión tipográfica** (las palabras se separan del cursor con spring) + punto de control del SVG que sigue al cursor |
| Movimiento principal | Entrada: revelado del display por máscara, línea a línea (stagger 70 ms) + densificación del campo (900 ms). Después, solo reacción al cursor | Entrada: springs escalonados de las primitivas; luego deriva lenta y amortiguada | Entrada: revelado palabra por palabra + la línea de contorno "respira" hacia el cursor |
| Riesgo principal | Coste del canvas en gama media | Tendencia a parecer plantilla SaaS o landing 3D | Legibilidad y coste de animar letra por letra; la longitud EN/ES cambia la composición |

### 5.2 Reglas duras — válidas para las tres propuestas

1. **No bloquea**: scroll, teclado y clics disponibles desde el frame 1.
2. **Salteable** la entrada: clic, `Enter` o scroll ⇒ estado final.
3. **Legible a 800 ms**; entrada total **≤ 1600 ms** (presupuesto interno más estricto
   que el ≤ 2600 ms de `AGENTS.md` §9). Un solo pase, sin narrativa en loop.
4. **LCP protegido**: el `h1` debe ser pintable sin esperar la animación.
5. **Fallback sin JS**: composición completa y estática.
6. **Reduced motion**: composición final estática y capa viva sin movimiento (§8).
7. **La capa viva es decorativa**: `aria-hidden`, `pointer-events: none` sobre el texto
   y contraste medido contra el **peor caso** del fondo (`DESIGN_SYSTEM.md` §2.1).
8. Implementación: **Motion + canvas 2D escrito a mano, o SVG**. Sin Lottie, WebGL,
   Three.js ni GSAP salvo aprobación escrita (coste sin retorno demostrado).
9. El texto del hero **no se anima carácter por carácter** si supera dos palabras.

### 5.3 Estado de la selección

| | |
|---|---|
| Propuesta elegida | ⬜ **pendiente del propietario** |
| Recomendación y justificación | entregada en la conversación de esta sesión |
| Primera implementación pequeña y verificable | `ROADMAP.md` → Fase 4a |

---

## 6. Cursor y capa ambiente

Norma para **toda** interacción de puntero y para los fondos generativos / geometría
flotante. Romper este presupuesto bloquea la fase.

### 6.1 Dispositivos

- La reacción al cursor aplica **solo** con `@media (hover: hover) and (pointer: fine)`.
- En táctil: capa **estática o ausente**; nunca hace falta el hover para entender algo.
- El cursor nativo **nunca se oculta** (`cursor: none` está prohibido). Un seguidor
  decorativo opcional es `aria-hidden` y no sustituye al puntero.

### 6.2 Presupuesto de la capa ambiente

| Concepto | Límite |
|---|---|
| Capas en movimiento por viewport | **1** (máx. 2 capas, la segunda estática) |
| Desplazamiento máximo por forma | ≤ 8% de su tamaño o 24px, lo que sea menor |
| Amortiguación | spring `stiffness 60–120, damping 14–20` (nunca sin damping) |
| Radio de influencia del cursor | 100–160 px |
| Puntos/partículas (canvas) | ≤ 1200 en desktop · ≤ 400 en táctil |
| DPR del canvas | `min(devicePixelRatio, 2)` |
| Frecuencia | **1** loop `requestAnimationFrame`; cero `setState` por frame |
| Pausa | fuera de viewport (`IntersectionObserver`) · `document.hidden` · reduce-motion |

### 6.3 Prohibido

- Mover o deformar **texto mientras se lee**: solo la capa de fondo se mueve.
- Reacción al cursor con `setState` (usar refs, MotionValues o el propio canvas).
- Arrastrar el scroll, interceptar rueda/`touchmove` o cambiar el puntero nativo.
- Más de una capa ambiente en movimiento a la vez.

---

## 7. Scroll y parallax global

- Scroll suave: `lenis` es el candidato (≈5 kB, MIT) — **requiere aprobación**; si no,
  `scroll-behavior: smooth` nativo con `@media (prefers-reduced-motion)` que lo desactiva.
- Un solo `useScroll` por sección referenciado a `ref` (no a window) cuando sea posible.
- Prohibido `setState` en handlers de scroll (re-render por frame).
- Sticky header: transición de sombra/borde al pasar el scroll, ≤ 200 ms.

---

## 8. Reducción de movimiento (`prefers-reduced-motion`)

**Implementación obligatoria en `App.js`:**
```jsx
<MotionConfig reducedMotion="user">…</MotionConfig>
```

**Qué se hace en modo reduce**

| Elemento | Comportamiento |
|---|---|
| Entrada del hero | Sin revelado. Composición final estática, visible de inmediato |
| Capa ambiente (campo, geometría, cursor) | **Detenida**: sin canvas animado y sin reacción al puntero |
| Reveals | `opacity` inmediata, sin `y`; o sin animación |
| Parallax | Desactivado por completo (`usePrefersReducedMotion`) |
| Stagger | Todos los hijos a la vez, `duration: 0` |
| Hover | Solo cambio de color/borde; sin `translate` ni `scale` |
| Scroll suave | `behavior: 'auto'` |

**Invariantes**
- **Nunca** ocultar contenido esperando animación: el estado final es el estado por
  defecto, la animación es el viaje.
- Un usuario con reduce-motion debe poder completar **toda** la tarea (contacto,
  navegación, ver proyectos) sin ningún movimiento.
- No sustituir una animación por otra más intensa.

---

## 9. Rendimiento

**Presupuesto por animación**

- 60 fps sostenidos en gama media (throttling 4× en DevTools).
- Ninguna tarea larga > 50 ms durante la intro.
- 0 layout shift (CLS < 0.1) causado por animación.
- Sin repaints de `box-shadow`, `filter` o `background-position` en loops.

**Reglas**

1. Animar **solo** `transform`, `opacity` y `pathLength`. `filter: blur()` solo en
   elementos pequeños y nunca en scroll.
2. `will-change` se agrega **durante** y se retira **al terminar**.
3. Elementos fuera del viewport → `content-visibility: auto` o render diferido.
4. No animar nodos con texto largo carácter por carácter (coste de layout).
5. Medir **antes y después**: DevTools → Performance → grabar con `CPU 6× throttle`.
   Guardar la comparación en el reporte de la fase.

---

## 10. Qué NO hacer

- [ ] Loop infinito que **no** sea la capa ambiente (§6) — y la capa ambiente sin las
      pausas obligatorias de §6.2 (fuera de viewport, pestaña oculta, reduce-motion).
- [ ] Parallax en todos los elementos de la página.
- [ ] Scroll-jacking (secuestrar la rueda del mouse).
- [ ] Preload que impide hacer scroll (> 3 s).
- [ ] Efectos que solo funcionan con hover (móvil queda sin feedback).
- [ ] Animar propiedades de layout (`width`, `height`, `top`, `margin`, `left`).
- [ ] Contenido que aparece solo cuando la animación termina (bloquea lectura).
- [ ] Introducir GSAP, Three.js o Lottie sin justificación y aprobación escrita.

---

## 11. Verificación de toda animación

1. `prefers-reduced-motion: reduce` → sin movimiento, todo visible.
2. Grabación Performance a 60 fps (móvil simulado, CPU 6×).
3. Teclado: la animación no atrapa foco ni impide `Tab`.
4. Móvil real o emulador de gama media: sin tirones.
5. `npm run build` compila y presupuestos de `AGENTS.md` §8 respetados.
6. Sin regresión de LCP respecto del baseline de la Fase 0.
