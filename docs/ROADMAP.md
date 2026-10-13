# Roadmap — Rediseño del Portfolio

> Plan por fases pequeñas, verificables y aprobables por separado.
> **Ninguna fase arranca sin aprobación explícita de la anterior.**
> Fuente: auditoría técnica inicial del proyecto (2026).

---

## Estado actual

| Fase | Nombre | Estado |
|---|---|---|
| — | Infraestructura de contexto (docs, skills, agentes, comandos) | ✅ Completada |
| — | Auditoría técnica completa (solo lectura, con Lighthouse) | ✅ Completada |
| — | **Cambio de dirección creativa** (documentado, sin tocar código) | ✅ Completada |
| 0 | Base de trabajo y baseline | 🟡 Parcial *(baseline de Lighthouse capturado en la auditoría)* |
| 1 | Higiene técnica | ⬜ Pendiente de aprobación |
| 2 | Sistema de diseño | ⬜ Pendiente de aprobación |
| 3 | Accesibilidad y UX base | ⬜ Pendiente de aprobación |
| **4** | **Hero y lenguaje de movimiento** | ⬜ **Esperando elegir propuesta (A/B/C)** |
| **4a** | **Primera implementación pequeña (campo + hero)** | 🟡 **Implementada y medida** · pendiente verificación en vivo |
| 5 | Motion system de scroll | ⬜ Pendiente de aprobación |
| 6 | Proyectos como casos de estudio | ⬜ Pendiente de aprobación |
| 7 | SEO y compartibilidad | ⬜ Pendiente de aprobación |
| 8 | Testing y observabilidad | ⬜ Opcional |
| 9 | Migración a Vite | ⬜ Opcional / final |

**Plataforma verificada (2026-10):** el código corre sobre **Create React App**
(`react-scripts 5.0.1`); **no hay Vite** en el repo (`vite.config.*` ni `index.html` en
la raíz). El código está en GitHub y se despliega en Vercel. Vite queda como Fase 9.

**Sí se hizo (sesiones de preparación):** `npm install` (motion, lucide-react), MCP
`context7` + `motion`/`motion-plus`, skill `motion`, este set de documentos, auditoría
completa con Lighthouse y el cambio de dirección creativa documentado en
`PRODUCT_BRIEF.md` §1.1.

**No se hizo:** **ningún cambio de código, ni de estilo, ni de contenido.** La app sigue
idéntica al commit `cd2aaa7`.

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

## Fase 1 — Higiene técnica *(sin cambios visuales)*

**Objetivo:** eliminar deuda que frena todo lo demás. Cero impacto visual.

**Entregables**
1. Migrar `emailjs-com` → `@emailjs/browser` (paquete deprecado).
2. Claves de EmailJS a `.env` (`REACT_APP_*`), `.env` en `.gitignore`.
3. Eliminar dependencias muertas: `web-vitals`, `@testing-library/*` *(reintegrar en Fase 8)*.
4. Unificar animación: eliminar `framer-motion` en favor de `motion` **(requiere aprobación)**.
5. Extraer datos a `src/data/` y traducciones a `src/locales/`.
6. Resolver colisiones CSS globales (`.container`, `h2`, `p` redefinidos).
7. Eliminar la carga de Poppins sin usar.

**Verificación:** idéntico visualmente · `npm run build` OK · Lighthouse no baja ·
`grep` sin referencias a paquetes eliminados.

---

## Fase 2 — Sistema de diseño

**Objetivo:** que exista un lenguaje visual coherente antes de animar nada.

**Entregables**
1. `src/styles/tokens.css` con todos los tokens de `DESIGN_SYSTEM.md`.
2. Tipografía auto-hospedada (`@fontsource`: Space Grotesk + Inter).
3. Escala tipográfica fluida (`clamp`) y escala de espaciado de 4px.
4. Un solo ancho de contenedor y ritmo vertical uniforme por sección.
5. Componentes base: `SectionHeading`, `Button`, `FormField`.

**Verificación:** contraste AA en todos los textos · sin hex ni px sueltos en CSS ·
360/768/1440 px sin scroll horizontal · un solo sistema tipográfico cargado.

---

## Fase 3 — Accesibilidad y UX base

**Objetivo:** WCAG 2.1 AA y navegación que funcione en móvil.

**Entregables**
1. Skip-link + `:focus-visible` global.
2. Header responsive real (hamburguesa `lucide-react` + drawer + ARIA).
3. `scroll-padding-top` para anclas bajo el header sticky.
4. `LanguageSwitcher` como `<button>` con `aria-expanded`, cierre con `Escape`.
5. Formulario: labels asociados, estados `idle/sending/success/error`, `aria-live`,
   sin `alert()`, limpiar solo en éxito.
6. `MotionConfig reducedMotion="user"` en `App.js`.
7. `html lang` sincronizado con i18n.

**Verificación:** flujo completo con teclado · axe-core sin errores críticos ·
modo reduce-motion funcional · EN/ES sin claves faltantes.

---

## Fase 4 — Hero y lenguaje de movimiento

**Objetivo:** el momento memorable, con la **nueva dirección creativa** — tipografía
protagonista + **una** capa reactiva al cursor (`PRODUCT_BRIEF.md` §1.1).
**Primera pieza de rediseño visible.**

> ⏳ **Bloqueada en la selección:** elegir una de las 3 propuestas de
> `ANIMATION_GUIDELINES.md` §5 — **A "Campo"** · **B "Órbita"** · **C "Marea"**.
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

## Fase 5 — Motion system de scroll

**Objetivo:** que todo el sitio respire con un mismo lenguaje.

**Entregables**
1. Hook/componente `<Reveal>` (`whileInView`, `once`, 420 ms, stagger 70 ms).
2. Reemplazar el `fadeInUp` CSS actual (que se dispara al montar) por reveals en viewport.
3. Parallax sutil en 1–2 elementos por sección.
4. Stagger en pills de Skills.
5. Hover corregido a `1.02` máx (hoy `1.05`/`1.1`).
6. *Opcional:* `lenis` para smooth scroll — **requiere aprobación**.

**Verificación:** 60 fps móvil · 0 CLS por animación · reveals no re-disparan al subir ·
reduce-motion desactiva parallax y stagger.

---

## Fase 6 — Proyectos como casos de estudio

**Objetivo:** que los proyectos se lean como decisiones, no como nombres.

**Entregables**
1. Esquema de caso de estudio en `src/data/projects.js` (campos `draft` sin rellenar).
2. Componente `CaseStudyCard` con card completamente clicable (hoy la affordance rota).
3. Layout de listado con jerarquía (proyecto destacado vs. resto).
4. Estados `draft`/`empty` honestos.
5. ⚠️ **El propietario completa** `problem`, `role`, `decisions`, `outcome`.

**Verificación:** card navegable con teclado · sin "hover fantasma" ·
**cero contenido inventado** · EN/ES completos.

---

## Fase 7 — SEO y compartibilidad

**Objetivo:** que el portfolio se encuentre y se vea bien al compartirlo.

**Entregables**
1. `title` + `meta description` reales (hoy: "My Portfolio" / "Personal Portfolio").
2. Open Graph + Twitter Card + canonical + `theme-color`.
3. `manifest.json` propio (hoy: "Create React App Sample") y enlazado en el HTML.
4. Favicon propio, `sitemap.xml`, JSON-LD `Person`.
5. Evaluación de prerender para preview en redes.

**Verificación:** Lighthouse SEO ≥95 · preview correcto al compartir · `html lang` correcto.

---

## Fase 8 — Testing y observabilidad *(opcional)*

**Entregables:** Vitest + Testing Library (form, nav, i18n) · Playwright E2E
(contacto, cambio de idioma, nav móvil) · `web-vitals` activo · Lighthouse CI.

**Verificación:** suites verdes en CI.

---

## Fase 9 — Migración a Vite *(opcional, al final)*

**Objetivo:** salir de CRA (deprecado) manteniendo estructura y comportamiento.

**Situación verificada (2026-10):** el proyecto **sigue en Create React App**
(`react-scripts 5.0.1`); no existe `vite.config.*` ni `index.html` en la raíz. La
migración sigue pendiente y **no se adelanta** mientras haya fases de diseño abiertas.

**Regla:** solo después de que el diseño esté estabilizado. No migrar en paralelo con
cambios visuales.

**Verificación:** build ≤ al actual en tamaño · todas las verificaciones de fases
anteriores pasan · dev server arranca · `npm start` documentado en `AGENTS.md`.

---

## Criterios globales de avance

Una fase se da por cerrada solo con:

1. `npm run build` ✅ (ruta `Personal` en mayúscula).
2. Verificación específica de la fase ✅.
3. Check de `AGENTS.md` §10 ✅.
4. **Aprobación explícita del propietario** ✅.

Y **siempre** se verifica: cero contenido inventado · sin dependencias nuevas no
justificadas · sin MCP nuevos · presupuestos de rendimiento respetados.
