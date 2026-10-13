---
description: Read-only audit of the portfolio — stack, UX, accessibility, performance, motion and SEO, with a prioritized findings report
---

Audit $ARGUMENTS

Ejecutá una auditoría **estrictamente de solo lectura** de este portfolio. No modifiques
archivos, no instales dependencias, no reemplaces componentes. Reportá hallazgos y esperá
aprobación antes de tocar código.

## Alcance

- `$ARGUMENTS` define el alcance: una fase (`fase 4`), una sección (`hero`,
  `contact form`), o vacío ⇒ proyecto completo.
- Si el alcance es una sola sección, **no re-audites el resto**: acotá el reporte a esa
  sección y a lo que pudo romper.

## Fuentes obligatorias (leer primero)

1. `AGENTS.md` — estándares y presupuestos.
2. `docs/ROADMAP.md` — en qué fase se está y qué ya fue auditado.
3. `docs/PRODUCT_BRIEF.md`, `docs/DESIGN_SYSTEM.md`, `docs/ANIMATION_GUIDELINES.md`.
4. Skills relevantes: `frontend-architecture`, `portfolio-ux-ui`, `motion-design`,
   `visual-qa`.

## Procedimiento

### A. Estado técnico
1. `package.json` / lock: dependencias, scripts, deprecados, duplicados.
2. Estructura de carpetas: componentes, estilos, datos, i18n; detectar código muerto.
3. **Build**: `npm run build` desde
   `C:\Users\aylen\Desktop\Personal\Portafolio` — ⚠️ `Personal` en mayúscula
   (con `personal` minúscula ESLint falla por conflicto de rutas).
4. Registrar tamaño gz de JS/CSS como baseline (actual: 100.38 kB JS / 1.36 kB CSS).

### B. Diseño y UX
5. Sistemas de estilo: selectores globales, colisiones, ritmo vertical, anchos.
6. Jerarquía de contenido, affordance de componentes, estados faltantes.
7. Consistencia mobile-first vs. desktop.

### C. Accesibilidad (WCAG 2.1 AA)
8. Headings, labels, roles, `alt`, foco visible, navegación con teclado.
9. Contraste, `aria-*`, feedback sin `alert()`, `html lang` vs. i18n.
10. `prefers-reduced-motion`.

### D. Rendimiento y responsive
11. Presupuestos de `AGENTS.md` §8 vs. valores reales.
12. Viewports 360 / 768 / 1440: desbordamientos, solapes, targets.
13. Assets: peso de imágenes, dimensiones, fuentes cargadas vs. usadas.

### E. Motion
14. Qué animaciones existen, **cuándo se disparan** (montar vs. viewport) y si aportan.
15. Adherencia a `ANIMATION_GUIDELINES.md`: duraciones, escalas de hover, reduced-motion.

### F. SEO
16. Title, description, OG/Twitter, canonical, manifest, favicon, JSON-LD, sitemap,
    prerender, `lang`.

### G. Contenido
17. **Verificar que nada esté inventado.** Listar campos pendientes del propietario
    (no rellenarlos).

## Formato del reporte

```markdown
# Auditoría — <alcance> · <fecha>

## 1. Stack, dependencias y comandos
## 2. Estructura y arquitectura
## 3. Diseño, componentes y UX/UI
## 4. Rendimiento, accesibilidad, responsive y SEO
## 5. Animaciones actuales y potencial
## 6. Conservar / refactorizar / eliminar / incorporar
## 7. Herramientas y librerías adecuadas al stack
## 8. Plan por fases pequeñas y verificables

### Tabla de hallazgos
| # | Severidad | Archivo:línea | Hallazgo | Impacto | Recomendación |
```

Severidad: `blocker` · `major` · `minor` · `info`.

## Reglas

- **Nada de ediciones** de ningún tipo.
- **Nada de contenido inventado** (experiencia, métricas, resultados).
- **Nada de dependencias ni MCP nuevos**: solo recomendaciones con justificación.
- Cada recomendación indica fase del ROADMAP o se marca "fuera de alcance".
- Cerrá con **"Espero aprobación antes de modificar código"**.
