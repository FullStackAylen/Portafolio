---
name: visual-qa
description: >-
  Reproducible visual and accessibility QA for this portfolio: viewport sweeps at 360/768/1440,
  full keyboard-only navigation, prefers-reduced-motion passes, Spanish/English i18n checks,
  contrast and heading-order audits, axe-core and Lighthouse runs, bundle-size and 60fps
  animation verification. Use when verifying or reviewing a finished change, when asked to
  test, QA, review, audit or "check" the UI, before merging or declaring a task done, when a
  fix might have regressed another screen, or when producing a structured findings report
  with severity and file references. Read-only by default: it reports problems rather than
  fixing them, and it does not repeat the full project audit for unrelated areas.
argument-hint: "[scope, e.g. 'header', 'contact form', 'hero animation', 'everything changed']"
---

# Visual QA

Verificación reproducible **del cambio realizado**, no una auditoría completa del proyecto.

## Alcance — importante

- **Revisar solo lo que cambió** en esta tarea + sus puntos de integración.
- **No repetir** la auditoría general del proyecto ni re-listar deuda conocida.
- **Reportar, no corregir**: escribir hallazgos con severidad, archivo y línea; la
  corrección la hace el agente principal tras la aprobación.
- Si se pide una revisión amplia, usar el comando **`/audit-portfolio`** en su lugar.

## Procedure

### 1. Preparación
```
cd C:\Users\aylen\Desktop\Personal\Portafolio   # P mayúscula: con "personal" el build falla
npm run build                                    # debe compilar sin errores
```

### 2. Sweep de viewports (obligatorio, en este orden)

| Viewport | Qué se verifica |
|---|---|
| **360 × 740** | base móvil: sin scroll horizontal, sin solapes, nav funcional |
| **768 × 1024** | transición: no hay layout roto entre columnas |
| **1440 × 900** | desktop: jerarquía, medida de texto ≤65ch, ritmo vertical |

En cada uno: inspeccionar `document.documentElement.scrollWidth > innerWidth`
(`false` = sin desbordamiento).

### 3. Teclado (sin mouse)
`Tab` desde el inicio → skip-link → nav → contenido → formulario → pie.
Verificar: foco **siempre visible**, orden lógico, sin trampas, menú móvil abre/cierra
con `Enter`/`Space`/`Escape`, targets ≥ 44 × 44 px.

### 4. Reduced motion
DevTools → Rendering → `prefers-reduced-motion: reduce`.
Esperado: **cero movimiento**, contenido visible de inmediato, scroll instantáneo,
intro en composición final estática.

### 5. i18n
Cambiar ES ↔ EN recorriendo todas las secciones.
Verificar: sin `undefined`, sin claves crudas (`proyect_1`), sin texto cortado,
`html lang` coincide con el idioma activo.

### 6. Accesibilidad
- axe-core en cada viewport: **0 errores críticos/serios**.
- Un solo `h1`, sin saltos de nivel.
- Todos los inputs con `label htmlFor` + `id`.
- Imágenes con `alt` correcto (no `"Logo"` en un retrato).
- Controles interactivos son `button`/`a`, nunca `div` con `onClick`.
- Contraste AA: 4.5:1 texto normal, 3:1 grande/UI.

### 7. Rendimiento
- Lighthouse (móvil): comparar contra el baseline de Fase 0.
- Chrome Performance con CPU 6×: animaciones a **60 fps**, sin tareas > 50 ms.
- Bundle: JS gz ≤ 150 kB, CSS gz ≤ 10 kB.
- CLS < 0.1; imágenes con `width`/`height`.

### 8. Contenido (si aplica)
Confirmar que **no se introdujo información inventada**: ni métricas, ni roles, ni
fechas, ni logros. Todo dato nuevo debe provenir de `src/data/` o del propietario.

## Formato del reporte

```markdown
## Visual QA — <scope>

**Veredicto:** PASS | PASS con observaciones | FAIL

### Bloqueantes
| # | Severidad | Archivo:línea | Problema | Esperado |

### Observaciones (no bloquean)
| # | Archivo:línea | Problema | Sugerencia |

### Verificaciones ejecutadas
- [x] build / viewports 360·768·1440 / teclado / reduced-motion / i18n / axe / perf
- [ ] las que no aplicaron, con motivo
```

**Severidad:** `blocker` (impide usar la función) · `major` (WCAG AA, regresión,
presupuesto roto) · `minor` (inconsistencia, pulido).

## Checklist rápido

- [ ] Build compila (ruta `Personal`).
- [ ] 360 / 768 / 1440 sin desbordamiento.
- [ ] Teclado completo con foco visible.
- [ ] Reduced-motion: sin movimiento, todo visible.
- [ ] EN y ES sin claves faltantes.
- [ ] axe sin errores críticos.
- [ ] Lighthouse y bundle dentro de presupuesto.
- [ ] Cero contenido inventado.
