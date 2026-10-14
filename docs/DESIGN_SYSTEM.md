# Design System — Portfolio

> Sistema visual propio, específico de este proyecto. No es una lista de tendencias:
> cada decisión tiene una razón y un límite.
>
> Fuentes de verdad relacionadas: `PRODUCT_BRIEF.md` (qué), `ANIMATION_GUIDELINES.md`
> (cómo se mueve), `AGENTS.md` (estándares).

---

## 1. Concepto rector

**"Precisión viva"** — base editorial instrumental + **una** capa reactiva.

El sitio se sostiene sobre una base **precisa y sobria**: fondo papel cálido, tinta casi
negra, etiquetas en monoespaciada con códigos, reglas finas de 1px, amplio espacio en
blanco y **una única señal naranja** usada con la escasez de una luz de pista. Sobre esa
base vive **una sola capa viva**: formas geométricas o texturas generativas que
reaccionan al cursor con movimiento orgánico y amortiguado.

> **Cambio de dirección (2026-10) — decisión del propietario.** El avión y la intro
> narrativa **dejan de ser el elemento visual protagonista**. No se descarta lo hecho:
> la base (paleta, tipografía, reglas, escasez del acento) se conserva porque es lo que
> impide que el sitio se parezca a una plantilla. La expresión del hero y del movimiento
> se define en `ANIMATION_GUIDELINES.md` §5 — **3 propuestas, ninguna aprobada todavía**.

**Por qué esta base y no otra**

1. **Identidad sin ruido:** el detalle está en los tipos, las reglas y la
   micro-tipografía, no en la cantidad de efectos. Es lo que separa un portfolio con
   criterio de una plantilla SaaS o de una demo de efectos.
2. **Escalable y mantenible:** se apoya en reglas (grid, escala, contraste), no en
   tendencias (glassmorphism, blobs) que envejecen mal y cuestan rendimiento.
3. **Rinde bien en móvil:** jerarquía tipográfica y espacio en blanco; la capa viva se
   reduce o desaparece en pantallas táctiles y con movimiento reducido.
4. **Le da sentido a la interacción:** las formas no flotan porque sí — responden al
   cursor porque comunican que la interfaz está viva y es manipulable.

**Explícitamente fuera de concepto:** glassmorphism, neomorphism, gradientes arcoíris,
blobs de color sin función, fondos 3D, ilustraciones cartoon, emojis decorativos,
marquesinas sin función, **acumulación de efectos sin jerarquía** (un portfolio no es una
demo), y cualquier animación que oculte contenido mientras ocurre.

---

## 2. Tokens de color

Archivo: `src/styles/tokens.css`. **Ningún color hardcodeado fuera de tokens.**

> **Dirección vigente (N1, 2026-10-14): tema oscuro completo estilo Netflix**
> (decisión del propietario, ROADMAP). La paleta sobre papel de la dirección anterior
> quedó reemplazada; los ratios se recalcularon sobre `--color-canvas: #141414`.

```css
:root {
  /* Superficies */
  --color-canvas:       #141414;  /* página (Netflix) */
  --color-surface:      #1F1F1F;  /* tarjetas, formulario, drawer */
  --color-surface-sunk: #0B0B0B;  /* fondos de inputs, pills, covers */

  /* Tinta */
  --color-ink:       #FFFFFF;     /* títulos y texto principal  18.4:1 */
  --color-ink-muted: #B3B3B3;     /* texto secundario            8.8:1 */
  --color-line:      #333333;     /* reglas y bordes (no-texto) */

  /* Señal — el rojo Netflix */
  --color-signal:      #E50914;   /* UI, display grande, bordes   3.8:1 */
  --color-signal-ink:  #FF4D4D;   /* acento COMO TEXTO            5.6:1 */
  --color-signal-deep: #B20710;   /* hover de primarios */

  /* Instrumento — datos y enlaces */
  --color-instrument:  #8AB4D8;   /* kickers, metadata            8.4:1 */

  /* Estados */
  --color-success:     #46D369;   /* 9.5:1 */
  --color-danger:      #FF6B6B;   /* 6.6:1 */
  --color-focus-ring:  #FFFFFF;   /* 17.9:1 — visible sobre todo */
}
```

**Reglas de uso**

| Umbral AA (WCAG 2.1) | Ratio mínimo |
|---|---|
| Texto normal (< 18.66px / < 24px bold) | **4.5:1** |
| Texto grande (≥ 24px, o ≥ 18.66px bold) | **3:1** |
| Componentes de UI, iconos, borde de foco | **3:1** |

Verificar con DevTools (contrast picker) o axe-core **antes** de aprobar cualquier color
nuevo. Los ratios listados arriba son los de cada token sobre `--color-canvas`.

| Token | Uso permitido | Uso prohibido |
|---|---|---|
| `--color-signal` | fondos de botón (con texto ink), iconos, bordes, display ≥ 24px | texto corrido (< 24px) |
| `--color-signal-ink` | texto de acento, links en hover | fondos grandes |
| `--color-instrument` | kickers, etiquetas de datos, metadata | — |
| `--color-ink-muted` | texto secundario (≥ 16px) | — |

- **Blanco sobre `--color-signal` (botones primarios): 4.79:1 ✅** — el rojo puro con
  texto blanco pasa AA para texto normal.
- **Nunca** color puro de marca sobre otro color de marca (contraste no garantizado).
- **Nunca** información solo por color: siempre acompaña icono, texto o forma.

### 2.1 Ratios verificados (tema oscuro)

| Texto / acento | Sobre canvas `#141414` | Sobre surface `#1F1F1F` |
|---|---|---|
| `--color-ink` `#FFFFFF` | **18.4:1** ✅ | **16.6:1** ✅ |
| `--color-ink-muted` `#B3B3B3` | **8.8:1** ✅ | **7.9:1** ✅ |
| `--color-signal-ink` `#FF4D4D` | **5.6:1** ✅ | **5.1:1** ✅ |
| `--color-signal` `#E50914` | **3.8:1** ⚠️ solo UI / texto ≥ 24px | **3.4:1** ⚠️ ídem |
| `--color-instrument` `#8AB4D8` | **8.4:1** ✅ | **7.6:1** ✅ |
| `--color-line` `#333333` | no-texto | no-texto |
| ink `#FFFFFF` sobre signal `#E50914` | **4.8:1** ✅ (botones) | — |

4. **El contraste se mide contra el peor caso**: si la capa viva va detrás de texto, el
   ratio se calcula con el pixel de fondo más oscuro/claro que puede tocar el texto.

---

## 3. Tipografía

**Sistema de 3 voces, 0 pesos muertos** (actualizado en N1):

| Rol | Fuente | Pesos | Por qué |
|---|---|---|---|
| Display | **Bebas Neue** (OFL) | **solo 400** | Condensada de impacto, evoca títulos de catálogo; sustituye a Space Grotesk y a la propietaria Netflix Sans |
| Texto | **Inter** | 400, 500, 600 | Máxima legibilidad en párrafo largo y UI |
| Datos | **`ui-monospace, SFMono-Regular, Menlo, monospace`** | 400 | Sistema → **0 kB**, perfecta para códigos/etiquetas |

⚠️ **Bebas Neue solo tiene el peso 400**: nunca pedir `font-weight` alto en display
(el navegador sintetiza un falso bold). Bebas es cap-height: en tamaños chicos se ve
más pequeña — compensar con `font-size` ~30 % mayor que con Inter.

**Auto-hospedado (Fase 2 ✅, actualizado N1)**: los `.woff2` están en `public/fonts/` y el
`@font-face` + `<link rel="preload" crossorigin>` viven en `public/index.html`
*(no en CSS: `css-loader` de CRA no resuelve `/public` desde CSS — probado; `@fontsource`
se descartó)*. Prohibido `<link>` a Google Fonts: bloquea el render y expone datos del
visitante. Space Grotesk se eliminó en N1 (cero familias sin usar).

### Escala fluida (base 16px)

| Token | Valor | Uso |
|---|---|---|
| `--text-display` | `clamp(3rem, 1.6rem + 9vw, 7.5rem)` | Palabra PORTFOLIO en el hero |
| `--text-h1` | `clamp(2rem, 1.5rem + 3vw, 3.5rem)` | Título de sección |
| `--text-h2` | `clamp(1.5rem, 1.3rem + 1.2vw, 2.25rem)` | Subtítulos, título de caso |
| `--text-body` | `clamp(1rem, 0.98rem + 0.1vw, 1.125rem)` | Párrafo |
| `--text-label` | `0.8125rem` | Kickers, labels, metadata |
| `--text-mono` | `0.875rem` | Coordenadas, stack, cifras |

- `--kicker`: `uppercase`, `letter-spacing: .09em`, `--text-label`, color `--color-instrument`.
- Interlineado: display `0.95`, títulos `1.1`, cuerpo `1.65`.
- **Medida de lectura**: párrafos máximo `65ch`.
- Sin `text-transform` en títulos largos (perjudica legibilidad).

---

## 4. Espaciado, radios y elevación

**Escala de 4px** (solo estos valores):

```
--space-1:  4px    --space-2:  8px    --space-3: 12px    --space-4: 16px
--space-6: 24px    --space-8: 32px    --space-12: 48px   --space-16: 64px
--space-24: 96px   --space-32: 128px
```

**Ritmo vertical de sección:** `padding-block: clamp(4rem, 9vw, 8rem);`
*(Hoy: About 50px, Skills 40px, Projects 0 → ritmo irregular. Se unifica.)*

**Radios**

```css
--radius-none: 0;      /* reglas, ticks, imágenes "de carta" */
--radius-sm:   6px;     /* inputs, botones */
--radius-md:   12px;    /* tarjetas */
--radius-pill: 999px;   /* pills de stack */
```

**Elevación** — sombras planas y bajas (papel, no plástico):

```css
--shadow-1: 0 1px 2px rgba(20,22,26,.06), 0 1px 1px rgba(20,22,26,.04);
--shadow-2: 0 8px 24px -8px rgba(20,22,26,.16);   /* hover / cards elevadas */
```

Máximo **2 niveles**. Nunca sombras multicapa decorativas.

---

## 5. Layout y grid

| Token | Valor |
|---|---|
| `--container-max` | `1200px` |
| `--gutter` | `clamp(1.25rem, 4vw, 2.5rem)` |
| `--measure` | `65ch` |
| Breakpoints | `480 / 768 / 1024 / 1280` (mobile-first) |

- **Una sola medida de contenedor** para todas las secciones (hoy hay 1200/800/600/full).
- `scroll-padding-top` en `html` = altura del header sticky, para que las anclas no
  queden tapadas.
- Móvil es la base: se diseña a 360px y se *añade* complejidad hacia arriba.
- Z-index en escala única (`--z-header: 100`, `--z-overlay: 200`, `--z-modal: 300`)
  — prohibido el `z-index: 9999` improvisado.

---

## 6. Componentes base

Cada componente define: variantes, estados y reglas de accesibilidad.

### 6.1 `SectionHeading`
`kicker` (mono, uppercase) + `h2` + regla de 1px `--color-line` con tick inicial.
Es la firma del concepto: aparece en **todas** las secciones, sin excepción.

### 6.2 `Button`
| Variante | Estilo |
|---|---|
| `primary` | fondo **`--color-signal-ink`**, texto `--color-surface`, radius `--radius-sm` |
| `ghost` | borde 1px `--color-line`, texto `--color-ink` |
| `quiet` | texto solo, subrayado `--color-signal` en hover |

> ⚠️ Corrección (2026-10): el primario **no** puede usar `--color-signal` como fondo con
> texto `--color-surface`: el contraste es **3.68:1** y **falla AA** para texto normal.
> Con `--color-signal-ink` da **5.94:1** ✅. (`--color-signal` queda para display ≥ 24px,
> iconos y gráficos, según §2.2.)

Estados: `default / hover / focus-visible / active / disabled`.
`focus-visible`: `outline: 2px solid var(--color-focus-ring); outline-offset: 3px`.
Nunca borrar el outline sin reemplazo.

### 6.3 `CaseStudyCard`
- **Toda la card es clicable** (`<a>` envolviendo, o `::after` extendido): hoy la card
  tiene `cursor:pointer` pero solo el enlace navega — affordance roto.
- Variante `draft`: renderiza título + stack + repo, oculta campos pendientes.
- Estados: `hover` (`translateY(-2px)`), `focus-visible` (ring), nunca `scale > 1.02`.

### 6.4 `SkillPill`
Pill `--radius-pill`, fondo `--color-surface-sunk`, texto `--color-ink`.
Sin `box-shadow` individual (hoy cada pill tiene sombra → ruido visual).

### 6.5 `FormField`
`label` **siempre visible** + `htmlFor/id`, `hint` opcional, `error` con
`aria-describedby` + `aria-invalid`, estado `aria-live="polite"` para el envío.
Sin `alert()`. Placeholder nunca sustituye al label.

### 6.6 `Header` + `Nav`
- Desktop: barra sticky con blur de fondo (`backdrop-filter` con fallback sólido).
- Móvil: **botón hamburguesa real** (`react-icons`: `FaBars`/`FaTimes`) con `aria-expanded`,
  drawer animado, cierre con `Escape` y al elegir destino.
  *(Hoy el nav se apila verticalmente y no hay menú: bug de la auditoría.)*
- Link activo marcado con `layoutId` (subrayado que viaja).

### 6.7 `LanguageSwitcher`
`<button>` con el idioma actual marcado con `aria-current`, cierre del drawer con
`Escape` y al elegir destino. *(Implementado en la Fase 3 con `react-icons`; sin
`aria-haspopup` porque alterna EN↔ES directamente.)*

### 6.8 `Hero`
Ocupa `100svh` con mínimo `560px`. Contenido: kicker, **tipografía display como
protagonista** (nombre + rol; la palabra PORTFOLIO se mantiene como elemento display
solo si la propuesta elegida lo incluye), línea de identidad, CTA de scroll, y como
máximo **una** capa reactiva de fondo — ✅ propuesta **A "Campo" + detalles de B
"Órbita"** aprobada e implementada en la Fase 4a (`ANIMATION_GUIDELINES.md` §5.3).

Reglas: el `h1` con el nombre es el primer elemento del DOM; el hero **se lee completo
sin animación y sin JS**; la capa viva es decorativa.

### 6.9 `ReactiveLayer` (capa viva de fondo)
Contrato visual: **decorativa, nunca portadora de información.**

- Detrás del contenido, `pointer-events: none` sobre el texto, `aria-hidden="true"`.
- A lo sumo **2 capas** por viewport y **una sola con movimiento focal**.
- Colores solo de tokens (`§2` y `§2.1`); sin colores nuevos sueltos.
- Si se superpone a texto, contraste verificado contra el **peor caso** del fondo.
- En táctil (`hover: none`) y en `prefers-reduced-motion`: **estática o ausente**.
- Comportamiento, presupuesto y pausa: `ANIMATION_GUIDELINES.md` §6.

---

## 7. Iconografía

- Set: **`react-icons`** (`react-icons/hi`/`fi`…, ya instalado). `lucide-react` se
  desinstaló en la Fase 1a — no reinstalar sin aprobación (AGENTS §12). Estilo lineal
  coherente, trazo fino.
- Tamaño consistente: `18px` en UI, `24px` en headers de tarjeta.
- Decorativos → `aria-hidden="true"`. Informativos → `role="img"` + `aria-label`.
- Sin emojis como iconos. Sin iconos de múltiples sets mezclados.

---

## 8. Estados vacíos y de error

Todo componente con contenido dinámico define:

| Estado | Regla |
|---|---|
| `loading` | Skeleton estático (sin shimmer infinito), `aria-busy` |
| `empty` | Mensaje honesto: *"Esta sección estará disponible próximamente"* |
| `error` | Texto + acción de reintento, `role="alert"` |
| `draft` | Contenido pendiente: se oculta o se muestra resumido |

**Prohibido** rellenar estados vacíos con texto inventado.

---

## 9. Checklist de adhesión

- [ ] Todos los valores salen de tokens (sin hex, px de fuente o duraciones sueltas).
- [ ] Sin selectores de elementos globales en CSS de componente.
- [ ] Contraste AA verificado en cada texto nuevo.
- [ ] Mobile-first: probado a 360px antes que a 1440px.
- [ ] Todos los estados (hover/focus/disabled/error/vacío) definidos.
- [ ] Un `SectionHeading` por sección, mismo patrón.
- [ ] Sin efecto que no se pueda justificar con una frase de razón.
- [ ] La capa viva (si hay) es decorativa, `aria-hidden`, ≤ 2 capas y estática con
      `prefers-reduced-motion`.
