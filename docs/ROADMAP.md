# Roadmap — Rediseño del Portfolio

> Plan por fases pequeñas, verificables y aprobables por separado.
> **Ninguna fase arranca sin aprobación explícita de la anterior.**
> Fuente: auditoría técnica inicial del proyecto (2026).

---

## 🎬 Nueva dirección creativa (2026-10-14, aprobada por el propietario): "Netflix"

El propietario cambió la dirección creativa: el sitio pasa a ser **una experiencia tipo
Netflix** (fondo oscuro, rojo señal, tipografía display condensada, intro cinematográfica
 tipo "ta-dum", tarjetas de proyectos como catálogo). **Reemplaza por completo** la
dirección anterior "Campo/Órbita" sobre papel.

**Decisiones del propietario (2026-10):**
- Reemplazo total: todo el sitio en tema oscuro.
- Tipografía display: **Bebas Neue** (auto-hospedada, OFL) — Inter para texto, mono de sistema.
- Foto del hero: **pendiente del propietario** (hasta entonces, estado draft honesto con monograma).
- Skills: **datos reales de GitHub** vía `scripts/fetch-github.js` (la API no expone
  horas de trabajo: se muestran lenguajes, actividad y repos — nunca métricas inventadas).
- Contacto: sección útil tanto para ofrecer trabajo como para proponer proyectos.
- Sin dependencias ni MCPs nuevos: Motion + canvas 2D + fetch pre-build alcanzan.

| Fase | Nombre | Estado |
|---|---|---|
| **N1** | Dirección creativa: tokens oscuros + Bebas Neue | ✅ Hecha y verificada |
| N2 | Intro "ta-dum" + hero con foto/descripción | ✅ Hecha y verificada |
| N3 | Skills con datos reales de GitHub | ✅ Hecha y verificada |
| N4 | Catálogo de proyectos tipo Netflix | ✅ Hecha y verificada |
| N5 | Experiencia + contacto | ✅ Hecha y verificada |
| N6 | Pulido, verificación y presupuestos | ✅ Hecha y verificada |

**Resultado N6 (2026-10-14):** build OK · 58/58 claves i18n · JS 117.91 kB gz ·
CSS 4.50 kB gz · 18/18 checks estáticos. Docs actualizados: DESIGN_SYSTEM §2/§2.1/§3
(tema oscuro + Bebas Neue), AGENTS §2 (`npm run fetch:github`). `alt` de la foto de
About internacionalizado. Pendiente de verificación en vivo (viewports, teclado,
reduce-motion) cuando haya navegador de escritorio disponible.

### Actualización de contenido del propietario (2026-10-14, posterior a N6)

El propietario reemplazó todo el contenido real. Correcciones de integración hechas
(sin inventar nada, solo cableado + i18n):

- **Experience**: 2 experiencias reales (Janus Automation, Gestioner Soft). Los `\n\n`
  de los resúmenes se preservan como párrafos. Secciones enumeradas 01–05.
- **Projects**: proyectos nuevos (FinanceApp, Samaritana) con caseStudy COMPLETO
  (problem/role/stack/decisions/outcome). Se agregó render de `decisions` (faltaba),
  botón "Ver código" cuando hay `repository`, y cruce de meta GitHub por `repository`
  (el `link` ahora es el deploy, no el repo). Descripciones reescritas en i18n
  (`project_finance`, `project_samaritana`) — las claves viejas `proyect_1/2`
  describían proyectos que ya no existen. `TypeScript` duplicado removido del stack.
- **Skills**: lista ampliada a 31 pills. Stagger ahora dinámico (`0.6 / n`), siempre
  ≤ 600 ms totales (§4.3).
- **GitHub snapshot refrescado**: 8 commits/12m. `FinanceApp` → 404 (repo privado o
  inexistente): su card no muestra meta de GitHub pero el link al deploy funciona.
- **Pendiente del propietario**: `repository` de Samaritana (vacío en los datos).
- Build tras integración: 60/60 claves · JS 120.22 kB gz · CSS 4.52 kB gz · todo verde.

**Resultados N1–N5 (2026-10-14):** build OK · 57/57 claves i18n · JS 117.90 kB gz ·
CSS 4.50 kB gz (presupuestos: 150 / 10 kB). Bebas Neue auto-hospedada (13.7 kB woff2).
`npm run fetch:github` → snapshot real: 5 lenguajes (C# 50 %, JS 33 %), 9 repos,
7 commits/12 meses. `CaseStudyCard` reemplazado por `ProjectCard` (cover SVG + meta real).

---

## Estado actual (fases 0–9)

| Fase | Nombre | Estado |
|---|---|---|
| — | Infraestructura de contexto (docs, skills, agentes, comandos) | ✅ Completada |
| — | Auditoría técnica completa (solo lectura, con Lighthouse) | ✅ Completada |
| — | **Cambio de dirección creativa** (documentado, sin tocar código) | ✅ Completada |
| 0 | Base de trabajo y baseline | 🟡 Parcial *(baseline de Lighthouse capturado en la auditoría)* |
| **1a** | **Higiene técnica: seguridad y dependencias** | ✅ **Completada** |
| **1b** | **Higiene técnica: estructura y CSS** | ✅ **Completada** *(2026-10-14)* |
| **2** | **Sistema de diseño** | ✅ **Completada** *(2026-10-14)* |
| **3** | **Accesibilidad y UX base** | ✅ **Completada** *(2026-10-14)* · verificación en vivo pendiente |
| **4** | **Hero y lenguaje de movimiento** | 🟢 **Cubierta por 4a** *(hibridación A+B aprobada)* · scroll-padding quedó en Fase 3 |
| **4a** | **Primera implementación pequeña (campo + hero)** | 🟡 **Implementada y medida** · pendiente verificación en vivo |
| **5** | **Motion system de scroll** | ✅ **Completada** *(2026-10-14)* · verificación en vivo pendiente |
| **6** | **Proyectos como casos de estudio** | ✅ **Estructura completada** *(2026-10-14)* · campos `caseStudy` a completar por el propietario |
| **7** | **SEO y compartibilidad** | ✅ **Completada** *(2026-10-14)* · `og:url`/canonical/sitemap ahora apuntan a la URL de producción de Vercel (`DEPLOY.md` §4.1) |
| 8 | Testing y observabilidad | ⬜ Opcional *(no ejecutada)* |
| 9 | Migración a Vite | ⬜ Opcional / final *(no ejecutada)* |

**Plataforma verificada (2026-10):** el código corre sobre **Create React App**
(`react-scripts 5.0.1`); **no hay Vite** en el repo (`vite.config.*` ni `index.html` en
la raíz). El código está en GitHub y se despliega en Vercel. Vite queda como Fase 9.

**Sí se hizo (preparación):** `npm install` (motion), MCP `context7` + `motion`/`motion-plus`,
skill `motion`, este set de documentos, auditoría completa con Lighthouse y el cambio de
dirección creativa documentado en `PRODUCT_BRIEF.md` §1.1.

**Sí se hizo (fases ejecutadas):** **1a** (seguridad), **1b** (estructura/CSS), **2**
(sistema de diseño), **3** (accesibilidad/UX), **4a** (piloto hero), **5** (motion de
scroll), **6** (casos de estudio, estructura) y **7** (SEO). **No se hizo:** fases 8 y 9
(opcionales), migración a Vite, cero contenido inventado, sin dependencias nuevas sin
aprobar. El código sigue en CRA; los cambios **no están commiteados** — commit y push
los hace el propietario.

---

## Fase 0 — Base de trabajo

**Objetivo:** poder medir el antes y el después.

| | |
|---|---|
| **Entregables** | `npm install` ✅ · build verificado ✅ · **baseline de Lighthouse** (móvil y desktop) · snapshot de tamaño de bundle |
| **Verificación** | `npm run build` compila · baseline guardado en `docs/baselines/` |
| **Riesgo** | Sensibilidad de mayúsculas Windows/CRA → usar ruta `Personal` |
| **Pendiente** | ✅ **Baseline capturado en la auditoría (2026-10):** Lighthouse producción móvil = Performance **70** / Accesibilidad **93** / Best practices **100** / SEO **100**; LCP **3239 ms**, TBT **912 ms**, CLS **0.000**; JS **98.03 kB gz**, CSS **1.33 kB gz**, foto **121.9 kB**. Falta guardar el reporte en `docs/baselines/`. |

---

## Fase 1a — Higiene técnica: seguridad y dependencias ✅ *(completada 2026-10-13)*

**Objetivo:** eliminar deuda que frena todo lo demás. Cero impacto visual.

**Hecho**
1. ✅ `emailjs-com` → `@emailjs/browser` (API oficial: `send(..., { publicKey })`).
2. ✅ Claves EmailJS a `.env` (`REACT_APP_*`); `.env` agregado a `.gitignore`.
3. ✅ Eliminadas: `@testing-library/*` (3), `web-vitals`, `lucide-react`
   *(reintegrar en Fase 8/Fase 3 con aprobación; para el menú móvil alcanza `react-icons`)*.
4. ✅ Animación unificada: `framer-motion` → `motion/react` (3 imports) y `framer-motion` desinstalada.
5. ✅ Poppins (`<link>` de Google Fonts, sin usar) eliminado de `index.html`.

**Pendiente del propietario (bloquea el próximo deploy):** **(a)** rotar las claves de
EmailJS en el dashboard (quedaron en el historial de git) y actualizar `.env`;
**(b)** cargar `REACT_APP_EMAILJS_SERVICE_ID`, `REACT_APP_EMAILJS_TEMPLATE_ID` y
`REACT_APP_EMAILJS_PUBLIC_KEY` en Vercel → Settings → Environment Variables.

**Resultados medidos (Lighthouse CLI, producción, móvil emulado)**

| Métrica | Baseline Fase 0 | Tras 4a | Tras 1a |
|---|---|---|---|
| Performance | 70 | 81 | **87** |
| Accesibilidad | 93 | 96 | 96 |
| LCP | 3239 ms | 2610 ms | **2357 ms** ✅ ≤2500 |
| TBT | 912 ms | 615 ms | **448 ms** |
| FCP | 1507 ms | 1521 ms | **815 ms** |
| CLS | 0.000 | 0.000 | 0.000 |
| JS gz / CSS gz | 98.03 / 1.33 kB | 100.17 / 2.52 kB | **109.59** / 2.52 kB ✅ ≤150 |

El +9.42 kB de JS es el costo del unificado a `motion@14` (aún 27 % por debajo del
presupuesto; palanca futura: `LazyMotion`). `npm audit`: 109 vulnerabilidades, **todas
en el árbol build/dev de `react-scripts`** (jest, webpack-dev-server) — no viajan al
bundle desplegado; su resolución es la Fase 9 (Vite). Los 2 fallos de `color-contrast`
siguen siendo los preexistentes (About y Contact → Fases 2 y 3).

---

## Fase 1b — Higiene técnica: estructura y CSS ✅ *(completada 2026-10-14)*

**Objetivo:** mantenibilidad con **cero impacto visual**.

1. ✅ Extraer datos a `src/data/` (`skills.js`, `projects.js`) y traducciones a
   `src/locales/en.json|es.json` (`i18n.js` importa los JSON, sin `require` inline).
2. ✅ Resolver colisiones CSS globales (`.container` → `.header__container`; `h2`, `p`,
   `a`, `button` scopeados por componente).

**Verificación:** ✅ build OK · ✅ i18n 25/25 claves · ✅ cero selectores globales
(verificador estático) · Lighthouse **no bajó** (98 de performance tras la fase).

---

## Fase 2 — Sistema de diseño ✅ *(completada 2026-10-14)*

**Objetivo:** que exista un lenguaje visual coherente antes de animar nada.

**Hecho**
1. ✅ `src/styles/tokens.css` completo: color, espaciado, radios, shadows, z-index,
   motion (duraciones/easings) + `--header-offset`.
2. ✅ Tipografía auto-hospedada **vendored**: `public/fonts/*.woff2` + `@font-face` en
   `public/index.html` con `<link rel="preload" crossorigin>`.
   *(No `@fontsource` desde CSS: `css-loader` de CRA no resuelve `/public` desde CSS —
   probado y falló. Los paquetes `@fontsource-variable/*` se desinstalaron.)*
3. ✅ Escala fluida `clamp()` y ritmo vertical uniforme por sección.
4. ✅ Un solo ancho de contenedor.
5. ✅ Componentes base: `SectionHeading`, `Button` (estados), labels de form en Fase 3.

**Resultados:** contraste AA · sin hex ni px sueltos en CSS de componente · Lighthouse
a11y **100** (los 2 fallos preexistentes resueltos) · perf **99** · LCP **2054 ms**.

---

## Fase 3 — Accesibilidad y UX base ✅ *(completada 2026-10-14)*

**Objetivo:** WCAG 2.1 AA y navegación que funcione en móvil.

**Hecho**
1. ✅ Skip-link (#hero) + `:focus-visible` global + `scroll-padding-top` (App.css).
2. ✅ Header responsive real: hamburguesa `FaBars`/`FaTimes` + drawer + `aria-expanded`
   /`aria-controls` + `Escape` + clic fuera (`react-icons`, ya instalado).
3. ✅ `scroll-padding-top` para anclas bajo el header sticky.
4. ✅ Botón de idioma con `aria-current`; drawer se cierra con `Escape`.
5. ✅ Formulario: labels `htmlFor/id`, estados `idle/sending/success/error`, `aria-live`
   (`role=status/alert`), sin `alert()`, limpiar solo en éxito, honeypot `company`.
6. ✅ `MotionConfig reducedMotion="user"` en `App.js`.
7. ✅ `html lang` sincronizado con i18n. Alt de la foto corregido.

**Resultados:** Lighthouse a11y **100** · perf 98 · **verificación en vivo (teclado,
viewports, reduce-motion) pendiente — sin navegador de escritorio conectado.**

---

## Fase 4 — Hero y lenguaje de movimiento

**Objetivo:** el momento memorable, con la **nueva dirección creativa** — tipografía
protagonista + **una** capa reactiva al cursor (`PRODUCT_BRIEF.md` §1.1).
**Primera pieza de rediseño visible.**

> ✅ **Selección hecha (2026-10):** **A "Campo"** con detalles de **B "Órbita"**
> (hibridación aprobada por el propietario), implementada en la Fase 4a.
> El avión y la intro narrativa quedan **descartados**.

**Entregables (comunes a la propuesta elegida)**
1. Sección `Hero` con `h1` de nombre, display protagonista y capa reactiva única.
2. Entrada ≤ 1600 ms, legible a 800 ms, salteable, sin bloquear scroll ni teclado.
3. Capa viva conforme a `ANIMATION_GUIDELINES.md` §6 (1 capa en movimiento, pausas,
   DPR limitado, canvas sin dependencias).
4. Tokens de `DESIGN_SYSTEM.md` §2.1 **solo si** la propuesta elegida usa fondo tinta.
5. Fallback estático sin JS + modo reduce-motion + `scroll-padding-top` en `html`.
6. Header sin pisar el hero.

**Verificación:** LCP no empeora > 10% vs. baseline · 60 fps en CPU 6× (móvil simulado) ·
reduce-motion ⇒ composición final estática y sin capa viva en movimiento · teclado
completo · JS total ≤ 150 kB gz · contraste AA medido contra el **peor caso** del fondo.

---

## Fase 4a — Primera implementación pequeña *(piloto verificable)*

**Objetivo:** validar el lenguaje de movimiento en **una sola pieza** antes de
rediseñar el sitio entero. Es el primer código que se toca, y se revisa por separado.

**Alcance acotado — nada más se modifica**
1. `src/styles/tokens.css` con la paleta base (`DESIGN_SYSTEM.md` §2) y — solo si
   corresponde — las variantes sobre tinta (§2.1). *Adelanta lo mínimo de la Fase 2 que
   el hero necesita; el resto de la Fase 2 sigue pendiente.*
2. `src/components/Hero.js` + `Hero.css` con la composición del hero.
3. `src/components/ReactiveLayer.js`: canvas 2D **escrito a mano, sin dependencias
   nuevas**, con pausas (`IntersectionObserver`, `document.hidden`) y fallback.
4. `src/locales/en.json` y `src/locales/es.json` con las claves del hero — EN y ES
   completos.

**Fuera de alcance:** cualquier otra sección, el header, el formulario, el contenido y
la estructura de datos existente.

**Verificación**
1. `npm run build` compila · JS ≤ 150 kB gz · CSS ≤ 10 kB gz.
2. 360 / 768 / 1440 px sin scroll horizontal ni solapes.
3. Teclado: skip-link → hero → resto, con foco visible.
4. `prefers-reduced-motion: reduce` ⇒ estático y legible.
5. EN y ES sin claves faltantes ni `undefined`.
6. Grabación Performance a 60 fps (móvil simulado, CPU 6×).
7. Lighthouse: sin regresión de LCP vs. baseline de Fase 0.

**Resultados medidos (2026-10-13, Lighthouse CLI sobre build de producción, móvil emulado)**

| Métrica | Baseline (Fase 0) | Piloto 4a | Δ |
|---|---|---|---|
| Performance | 70 | **81** | ▲ +11 |
| Accesibilidad | 93 | **96** | ▲ +3 |
| Best practices / SEO | 100 / 100 | 100 / 100 | = |
| LCP | 3239 ms | **2610 ms** | ▲ −629 ms |
| TBT | 912 ms | **615 ms** | ▲ −297 ms |
| CLS | 0.000 | 0.000 | = |
| JS gz / CSS gz | 98.03 / 1.33 kB | 100.17 / 2.52 kB | +2.14 / +1.19 kB |

Los 2 fallos de `color-contrast` que quedan son **los preexistentes** (About y Contact,
Fases 2 y 3). El hero no agregó fallos de contraste, heading order ni ARIA.

**Pendiente (no ejecutado en esta sesión — sin navegador de escritorio conectado):**
verificación en vivo de 60 fps (Performance a CPU 6×), navegación por teclado y paso de
`prefers-reduced-motion`.

**Se revisa y se aprueba antes de arrancar la Fase 5.**

---

## Fase 5 — Motion system de scroll ✅ *(completada 2026-10-14)*

**Objetivo:** que todo el sitio respire con un mismo lenguaje.

**Hecho**
1. ✅ `Reveal.js`: `whileInView` + `once`, **fade 120 ms + slide 420 ms** (reveal
   partido: el contenido nunca espera a la cascada para ser visible), `y20`.
2. ✅ `fadeInUp` CSS reemplazado por reveals en viewport.
3. ✅ Parallax sutil ±12 px en el marco de foto de About (`usePrefersReducedMotion` lo
   apaga con `reduce`).
4. ✅ Stagger en pills de Skills: 35 ms × 15 = 525 ms (≤ 600).
5. ✅ Hovers corregidos a `1.02` máx.
6. ✅ `lenis`: **no incorporado** (requiere aprobación; no justificado).
7. ✅ `usePrefersReducedMotion.js` en `src/hooks/`.

**Resultados:** perf 98 · CLS 0 · **60 fps en CPU 6× y reveals en vivo pendientes de
verificación** (sin navegador conectado).

---

## Fase 6 — Proyectos como casos de estudio ✅ *(estructura completada 2026-10-14)*

**Objetivo:** que los proyectos se lean como decisiones, no como nombres.

**Hecho**
1. ✅ Esquema `caseStudy` en `src/data/projects.js` (campos **vacíos**, sin rellenar).
2. ✅ `CaseStudyCard.js` + CSS: card clicable completa (stretched link), borde punteado
   de estado `draft`, texto oculto "abre en una pestaña nueva".
3. ✅ Layout de listado con jerarquía (destacado vs. resto).
4. ✅ Estados `draft`/`empty` honestos + 7 claves i18n (EN/ES).
5. ⚠️ **El propietario completa** `problem`, `role`, `decisions`, `outcome` — **ningún
   campo fue rellenado con contenido inventado.**

**Verificación:** ✅ cero contenido inventado · ✅ EN/ES completos (44/44 claves) ·
navegación con teclado de la card → pendiente en vivo.

---

## Fase 7 — SEO y compartibilidad ✅ *(completada 2026-10-14)*

**Objetivo:** que el portfolio se encuentre y se vea bien al compartirlo.

**Hecho**
1. ✅ `title` + `meta description` reales en `public/index.html`.
2. ✅ Open Graph + Twitter Card + `theme-color`.
   ⚠️ `og:url` y `canonical` **pendientes del dominio definitivo** de producción.
3. ✅ `manifest.json` propio (borrados `logo192.png`/`logo512.png` de CRA).
4. ✅ Favicon propio `public/favicon.svg` (iniciales AR) · JSON-LD `Person`.
   `sitemap.xml` pendiente del dominio.
5. Evaluación de prerender: **no necesaria** — Lighthouse SEO 100 sin prerender;
   el preview en redes se re-verifica al conocerse el dominio.

**Verificación:** ✅ Lighthouse SEO **100** · preview y `html lang` → ver en vivo con
dominio.

---

## Fase 8 — Testing y observabilidad *(opcional — no ejecutada)*

**Entregables:** Vitest + Testing Library (form, nav, i18n) · Playwright E2E
(contacto, cambio de idioma, nav móvil) · `web-vitals` activo · Lighthouse CI.

**Verificación:** suites verdes en CI.

**Por qué no se ejecutó:** opcional en este ciclo; agregar dependencias de testing
requiere justificación y aprobación (AGENTS §12). Hoy la verificación estática vive en
`scripts/verify-static.js` (15 checks: build, i18n, presupuestos, selectores globales).

---

## Fase 9 — Migración a Vite *(opcional, al final)*

**Objetivo:** salir de CRA (deprecado) manteniendo estructura y comportamiento.

**Situación verificada (2026-10):** el proyecto **sigue en Create React App**
(`react-scripts 5.0.1`); no existe `vite.config.*` ni `index.html` en la raíz. La
migración sigue pendiente y **no se adelanta** mientras haya fases de diseño abiertas.

**Regla:** solo después de que el diseño esté estabilizado. No migrar en paralelo con
cambios visuales.

**Por qué no se ejecutó aún:** la migración renombra el prefijo de env vars
`REACT_APP_*` → `VITE_*`; hacerla antes de que el propietario cargue las claves de
EmailJS en Vercel obligaría a hacer el trabajo dos veces.

**Verificación:** build ≤ al actual en tamaño · todas las verificaciones de fases
anteriores pasan · dev server arranca · `npm start` documentado en `AGENTS.md`.

---

## Resultados acumulados (2026-10-14 — build de producción, Lighthouse CLI móvil)

| Métrica | Fase 0 (baseline) | Final | Tope (AGENTS §8) |
|---|---|---|---|
| Performance | 70 | **97–98** | — |
| Accesibilidad | 93 | **100** | — |
| Best practices / SEO | 100 / 100 | **100 / 100** | — |
| LCP | 3239 ms | **~2376 ms** (mediana; banda 2205–2507) | ≤ 2500 ✅ |
| TBT | 912 ms | **~27 ms** | ≤ 200 ✅ |
| CLS | 0.000 | **0.000** | < 0.1 ✅ |
| JS gz | 98.03 kB | **115.23 kB** | ≤ 150 ✅ |
| CSS gz | 1.33 kB | **3.50 kB** | ≤ 10 ✅ |

**Notas**
- La banda de LCP (2205–2507 ms) es **ruido del modelo de Lighthouse**: el mismo build
  repetido oscila; el diff de sub-procesos demostró que ningún cambio explica la
  variación. Mediana ~2376 ms.
- Verificación estática: `node scripts/verify-static.js` → **15/15** (i18n 44/44,
  cero selectores globales, un solo `h1`, presupuestos OK).
- **Pendiente en vivo** (sin navegador de escritorio conectado): viewports 360/768/1440,
  navegación por teclado, `prefers-reduced-motion`, grabación a 60 fps CPU 6×.

---

## Criterios globales de avance

Una fase se da por cerrada solo con:

1. `npm run build` ✅ (ruta `Personal` en mayúscula).
2. Verificación específica de la fase ✅.
3. Check de `AGENTS.md` §10 ✅.
4. **Aprobación explícita del propietario** ✅.

Y **siempre** se verifica: cero contenido inventado · sin dependencias nuevas no
justificadas · sin MCP nuevos · presupuestos de rendimiento respetados.
