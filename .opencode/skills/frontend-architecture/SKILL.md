---
name: frontend-architecture
description: >-
  Frontend architecture and code-structure decisions for this React 18 + Create React App
  portfolio: folder layout, component and file naming, data and i18n content layers, CSS
  scoping and token strategy, state management, dependency policy, security rules, and the
  phased migration path from CRA to Vite. Use when creating, moving, renaming or refactoring
  files and modules; when deciding where new content, translations, hooks or styles live;
  when adding or removing a dependency; when fixing build, ESLint or bundler issues; when
  touching EmailJS, forms or environment variables; or when reviewing code for structure,
  maintainability, security or performance budgets. Not for visual design or animation
  timing decisions.
argument-hint: "[task or area, e.g. 'add a section', 'move project data', 'replace CRA', 'env vars']"
---

# Frontend Architecture

Arquitectura y estructura de código **de este proyecto**. La fuente de normas es
`../../../AGENTS.md` — esta skill explica *dónde va cada cosa*, no duplica sus reglas.

## Estructura objetivo

```
src/
  components/   PascalCase, un componente por archivo
  data/         contenido real: profile.js, projects.js, skills.js
  locales/      en.json, es.json
  styles/       tokens.css + un CSS por componente
  hooks/        useReveal, useParallax, usePrefersReducedMotion
  utils/        helpers puros, sin DOM
```

**Hoy el proyecto tiene:** `components/` (6), `styles/` (6), `Assets/`, `i18n.js` con
cadenas inline, datos embebidos en los componentes, y `Experience.js` vacío.

## Dónde va cada cosa

| Contenido | Ubicación | Hoy |
|---|---|---|
| Texto narrativo (ES/EN) | `src/locales/{es,en}.json` | ❌ en `src/i18n.js` |
| Datos reales (proyectos, skills, perfil) | `src/data/*.js` | ❌ inline en componentes |
| Variables de diseño | `src/styles/tokens.css` | ❌ dispersos en CSS |
| Estilo de componente | `src/styles/<Component>.css` | ✅ patrón ya seguido |
| Hooks reutilizables | `src/hooks/` | ❌ no existe |
| Claves de servicio | `.env` (`REACT_APP_*`) | ❌ hardcodeadas |

## Workflow al agregar una sección

1. Verificar que la fase está **aprobada** en `../../../docs/ROADMAP.md`.
2. Crear `src/components/<Seccion>.js` + `src/styles/<Seccion>.css`.
3. Agregar claves a **ambos** `locales/*.json` antes del JSX.
4. Registrar el contenido en `src/data/` si es dato real.
5. Insertar en `App.js` dentro del orden del brief (`PRODUCT_BRIEF.md` §4).
6. Usar `SectionHeading` y tokens; sin selectores de elementos globales.
7. Ejecutar la verificación de `AGENTS.md` §10.

## Reglas estructurales

- **CSS scoped**: ningún elemento (`h2`, `p`, `button`) se selecciona a nivel global
  fuera de `tokens.css`/reset. Causa los bugs actuales.
- **Sin dependencias nuevas** sin justificación escrita (qué problema resuelve,
  costo de bundle, mantenimiento) y aprobación.
- **Estilos sin preprocesador**: CSS puro + tokens. Sin Tailwind/Sass/CSS-in-JS
  salvo aprobación de fase.
- **Sin router**: es un one-pager con anclas y `scroll-padding-top`.
- **Sin estado global**: `useState` + hooks. Sin Redux/Zustand salvo aprobación.
- **Keys estables** en listas, nunca `index`.
- **i18n obligatoria** para todo texto visible.

## Seguridad

- `.env` con `REACT_APP_*`, ya en `.gitignore`. **Nunca** secretos en el repo.
- EmailJS: migrar `emailjs-com` (deprecado) → `@emailjs/browser` en Fase 1.
  Agregar honeypot antispam y feedback `aria-live` (sin `alert()`).
- `target="_blank"` → `rel="noopener noreferrer"` (ya correcto en Projects).
- Sin `dangerouslySetInnerHTML`, `eval` ni `new Function`.

## Presupuestos que condicionan decisiones

| Métrica | Tope | Baseline |
|---|---|---|
| JS principal gz | ≤ 150 kB | 100.38 kB |
| CSS gz | ≤ 10 kB | 1.36 kB |
| LCP / CLS / TBT | ≤ 2.5 s / < 0.1 / ≤ 200 ms | sin medir (Fase 0) |

Cada dependencia nueva se evalúa contra estos números.

## Migración CRA → Vite (Fase 9)

- Solo al final, con el diseño estabilizado. Nunca en paralelo con cambios visuales.
- Mantener estructura de carpetas y comportamiento.
- Documentar los comandos nuevos en `AGENTS.md` §2.
- **`npm run eject` está prohibido** (irreversible).

## Deuda técnica conocida (prioridad de Fase 1)

1. `emailjs-com` deprecado y claves hardcodeadas.
2. `framer-motion` + `motion` duplicados → unificar (requiere aprobación).
3. `web-vitals` y `@testing-library/*` instalados sin uso.
4. Colisiones CSS globales (`.container`, `h2`, `p`).
5. Datos y traducciones hardcodeados en componentes.
6. `Experience.js` renderiza vacío.
7. Sensibilidad de mayúsculas Windows/CRA → usar ruta `Personal`.

## Checklist de entrega

- [ ] Archivos en la ubicación correcta según la estructura objetivo.
- [ ] Sin selectores globales en CSS de componente.
- [ ] Sin dependencias nuevas no justificadas.
- [ ] Sin secretos en el repo.
- [ ] Claves i18n presentes en EN y ES.
- [ ] `npm run build` compila (ruta `Personal`).
- [ ] Presupuestos de bundle respetados.
