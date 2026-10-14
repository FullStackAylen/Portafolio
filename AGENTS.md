# AGENTS.md — Instrucciones del proyecto

Portafolio profesional de Aylén Rodríguez. SPA en React construida con Create React App,
en proceso de rediseño hacia una experiencia premium (hero con tipografía protagonista y
capa reactiva, parallax, casos de estudio).

> **Este archivo es la fuente de verdad de estándares.** Si una instrucción de una skill,
> un agente o un comando contradice este archivo, manda este archivo.

---

## 1. Fuentes de verdad

| Qué | Dónde |
|---|---|
| Producto, audiencia, modelo de contenido | `docs/PRODUCT_BRIEF.md` |
| Sistema visual (tokens, tipografía, componentes) | `docs/DESIGN_SYSTEM.md` |
| Movimiento (duración, easing, rendimiento, reduced-motion) | `docs/ANIMATION_GUIDELINES.md` |
| Fases, estado y criterios de verificación | `docs/ROADMAP.md` |
| Auditoría técnica de partida (stack, deudas, riesgos) | conversación de auditoría inicial |

Consultá esos documentos antes de diseñar o animar algo. No reimplementes reglas que ya
están escritas: referencialas.

---

## 2. Stack real y comandos

```
React 18.3.1 · react-scripts 5.0.1 (CRA) · motion 14.2.0 (unificado en la Fase 1a;
antes también framer-motion) · i18next + react-i18next (EN/ES)
@emailjs/browser (claves en .env — ver §6) · react-icons 5.3.0
Fuentes self-hosted vendored en public/fonts/*.woff2 (@font-face en public/index.html;
@fontsource NO funciona con css-loader de CRA — probado)
CSS puro, sin preprocesador · JavaScript (sin TypeScript)
```

```bash
npm install          # dependencias
npm start            # dev server → http://localhost:3000
npm run build        # build de producción → /build (gitignorado)
npm test             # Jest (hoy sin tests)
node scripts/verify-static.js   # verificador estático (i18n, presupuestos, selectores)
```

### ⚠️ Windows + CRA: sensibilidad a mayúsculas

La carpeta en disco es `C:\Users\aylen\Desktop\Personal\Portafolio` (**P mayúscula**).
Ejecutá los comandos con esa ruta exacta. Con `...\personal\...` en minúscula,
ESLint resuelve dos rutas distintas y **el build falla**:

```
[eslint] Plugin "react" was conflicted between "package.json » ... » personal\..." and
         "BaseConfig » ... » Personal\..."
```

---

## 3. Regla de oro: no inventar contenido

**Prohibido fabricar experiencia profesional, métricas, resultados, clientes, fechas,
empleadores o logros.** Este es el error más caro que puede cometer este proyecto.

- Todo dato propio (proyectos, skills, texto personal) vive en `src/data/` y lo
  **escribe el propietario del sitio**.
- Si un campo de contenido falta, se deja **vacío o marcado como pendiente** y se avisa.
  Nunca se rellena con texto plausible.
- Las traducciones EN/ES viven en `src/locales/` y deben existir en **ambos** idiomas.
- Las descripciones de proyectos actuales (en `src/components/Projects.js`) son texto
  técnico escrito por el dueño: se conserva el hecho, se mejora la redacción **sin
  agregar hechos nuevos**.
- Los textos de UI (botones, labels, errores) son contenido localizable: van por i18n.

---

## 4. Estándares de código

**Estructura**

```
src/
  components/   Componentes PascalCase, un componente por archivo
  data/         Contenido real del sitio (profile, projects, skills)
  locales/      en.json, es.json
  styles/       Un CSS por componente + tokens.css (variables globales)
  hooks/        Hooks propios (useReveal, useParallax, usePrefersReducedMotion)
  utils/        Helpers puros, sin acceso a DOM
```

**Reglas**

1. Componentes funcionales con hooks. Sin clases, sin `React.createClass`.
2. **Nada de selectores de elementos globales** en CSS de componente (`h2`, `p`,
   `button` a secas están prohibidos fuera de `tokens.css`/reset). Causa los bugs de
   colisión actuales (`.container`, `h2` redefinido en `About.css`).
3. Naming de clases: bloque + elemento + modificador (`.case-card__title--featured`).
4. Ningún color, font-size, spacing ni duración hardcodeados: **solo tokens**.
5. Estado con `useState`; lógica compartida en hooks. Sin librerías de estado global
   salvo aprobación explícita.
6. Todo texto visible al usuario pasa por `t('clave')`. Sin strings sueltos en JSX.
7. Claves de `map` son **ids estables**, no `index`.
8. Sin `any`-style atajos: si se agrega TypeScript, es una fase aparte aprobada.
9. Comentarios solo para el "por qué", no para repetir el código.

---

## 5. Estándares de diseño

Se definen en `docs/DESIGN_SYSTEM.md`. Resumen ejecutable:

- **Tokens primero**: todo valor sale de `:root` en `styles/tokens.css`.
- **Un solo sistema tipográfico**: display + body + mono de sistema. Sin Google Fonts
  por `<link>`; las fuentes están **auto-hospedadas ya** (`public/fonts/*.woff2`,
  `@font-face` en `public/index.html` — Fase 2).
- **Contraste AA mínimo**: 4.5:1 en texto normal, 3:1 en texto grande y UI.
- **Mobile-first**: breakpoints `480 / 768 / 1024 / 1280`. Sin layouts que solo
  funcionen en desktop.
- **Progresivo**: el contenido es legible sin JavaScript y sin animaciones.
- **Sin tendencias gratuitas**: glassmorphism, neomorphism, gradientes arcoíris y
  blobs decorativos no entran sin justificación funcional.

---

## 6. Seguridad

1. **Ningún secreto en el repositorio.** Las claves de EmailJS van en `.env`
   (`REACT_APP_*` en CRA) y `.env` está en `.gitignore` (Fase 1a). **Pendiente del
   propietario:** rotar las claves (quedaron en el historial de git) y cargarlas en
   Vercel → Environment Variables antes del próximo deploy. Nota: CRA las embebe en el
   bundle público — son semi-públicas por diseño de EmailJS.
2. `.env`, tokens, cookies, `localStorage` con datos sensibles: **nunca** commiteados.
3. Sin `dangerouslySetInnerHTML` salvo sanitización explícita aprobada.
4. `target="_blank"` siempre con `rel="noopener noreferrer"`.
5. Sin eval, `new Function` ni inyección de strings a HTML.
6. Formulario de contacto: honeypot antispam y validación del lado del cliente.
   El backend (EmailJS) no puede validar, por eso el límite es de defensa en cliente.
7. **MCP y dependencias: agregar solo con justificación escrita** (qué problema resuelve,
   costo de bundle, mantenimiento). Ninguno nuevo sin aprobación.

---

## 7. Accesibilidad (WCAG 2.1 AA — obligatorio)

Checklist mínimo antes de dar una sección por terminada:

- [ ] Orden de encabezados correcto: un solo `h1`, sin saltos.
- [ ] Todos los `<input>`/`<textarea>` con `<label htmlFor>` + `id`.
- [ ] Controles interactivos son `<button>` o `<a>`: **nunca un `div`/icono con `onClick`**.
- [ ] Navegación completa con teclado; `:focus-visible` visible en todo control.
- [ ] `alt` descriptivo en imágenes informativas; `alt=""` en decorativas.
- [ ] `nav` con `aria-label`; menú móvil con `aria-expanded`/`aria-controls`.
- [ ] Feedback de formularios con `aria-live`, no con `alert()`.
- [ ] `prefers-reduced-motion` respetado (ver `ANIMATION_GUIDELINES.md`).
- [ ] `html lang` sincronizado con el idioma activo de i18n.
- [ ] Skip-link "saltar al contenido" como primer foco de la página.
- [ ] Sin información transmitida solo por color u hover.

---

## 8. Rendimiento

**Presupuestos (bloquean la entrega si se rompen)**

| Métrica | Tope |
|---|---|
| JS principal (gzip) | ≤ 150 kB *(actual: 115.23 kB)* |
| CSS (gzip) | ≤ 10 kB *(actual: 3.50 kB)* |
| LCP móvil | ≤ 2.5 s *(actual: mediana ~2376 ms; banda 2205–2507 por ruido de Lighthouse)* |
| CLS | < 0.1 *(actual: 0.000)* |
| TBT | ≤ 200 ms *(actual: ~27 ms)* |
| Imagen hero/foto | ≤ 120 kB, con `width`/`height` |

**Reglas**

1. Animar **solo `transform` y `opacity`**. Prohibido animar `width`, `height`, `top`,
   `margin`, `left` (layout thrash).
2. No animar `box-shadow` en loops: usar pseudo-elemento o `transform`.
3. `will-change` solo durante la animación, nunca permanente.
4. Scroll-linked con `useScroll`/`useTransform` (MotionValues), **no** con `setState`
   por cada frame ni `addEventListener('scroll')` sin `requestAnimationFrame`.
5. Imágenes: dimensiones explícitas, `loading="lazy"` fuera del fold, `srcset` cuando
   haya múltiples tamaños.
6. Fonts: `font-display: swap`, preload del peso crítico, cero familias sin usar.
   *(Poppins/Google Fonts se eliminó en la Fase 1a.)*
7. Medir antes y después de cada cambio de animación (Chrome DevTools → Performance).

---

## 9. Movimiento

Norma completa en `docs/ANIMATION_GUIDELINES.md`. Invariantes:

- Toda animación **comunica** jerarquía, causalidad o continuidad. Sin decoración sin
  propósito.
- **Máximo una animación focal por viewport.**
- Todo componente animado debe tener **fallback para `prefers-reduced-motion`**.
- El contenido **nunca** queda invisible esperando una animación: si JS falla o el
  usuario reduce movimiento, el contenido está visible de entrada.
- La intro cinematográfica no bloquea scroll, ni input, ni lento conexión: legible a
  los 800 ms, total ≤ 2600 ms, salteable.

---

## 10. Verificación (Definition of Done)

Ninguna tarea se da por terminada sin los 6 pasos:

1. `npm run build` → **compila sin errores** (con la ruta `Personal` en mayúscula).
2. Responsive en **360 px, 768 px y 1440 px** → sin scroll horizontal, sin solapes.
3. **Teclado**: skip-link → nav → contenido → formulario, con foco visible.
4. **`prefers-reduced-motion: reduce`** → sin movimiento, contenido visible.
5. **i18n**: probar EN y ES; ningún `undefined` ni string crudo.
6. **Presupuestos** de la sección 8 no superados.

Si la tarea toca animación, agregar: grabación de Performance a 60 fps en móvil simulado.
Si toca contenido: verificar que no se introdujo información inventada (sección 3).

---

## 11. Puertas de aprobación

- **No se implementa rediseño visual sin aprobación explícita.** La auditoría está
  entregada y pendiente de visto bueno; el plan por fases vive en `docs/ROADMAP.md`.
- Cada fase se aprueba y se verifica por separado. No saltar fases.
- Migración CRA → Vite: solo en la fase final aprobada.
- Agregar dependencias, MCP, fuentes o librerías de animación: requiere justificación
  y aprobación previa.
- `npm run eject`: **prohibido** (irreversible).
- No sobrescribir archivos existentes sin leerlos primero.

---

## 12. Política de dependencias y MCP

Los MCP activos son `context7` (docs de librerías) y `motion`/`motion-plus` (docs de
animación). **Ya son suficientes para este proyecto.** Un MCP nuevo se justifica con:
(1) qué trabajo concreto facilita, (2) por qué no alcanza con los existentes,
(3) impacto en seguridad y en el flujo de trabajo.
