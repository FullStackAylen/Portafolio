---
description: Implement one approved roadmap phase or one portfolio section, in small verified steps, with a mandatory verification and report
---

Implementá $ARGUMENTS siguiendo el plan aprobado de este proyecto.

## Interpretación del argumento

- `"fase 4"`, `"fase 4 hero"` ⇒ una fase completa de `docs/ROADMAP.md`.
- `"contact form"`, `"skills pills"` ⇒ una sección/componente puntual.
- Si no queda claro qué hay que hacer, **preguntá antes de escribir código**.

## Precondiciones (verificar ANTES de empezar)

1. Leí `AGENTS.md` completo y la fase/elemento en `docs/ROADMAP.md`.
2. **La fase está aprobada.** Si figura como "Pendiente de aprobación", detenete y
   pedí visto bueno. No implementar rediseño visual sin aprobación explícita.
3. Leí los docs que aplican: `DESIGN_SYSTEM.md` (forma),
   `ANIMATION_GUIDELINES.md` (movimiento), `PRODUCT_BRIEF.md` (contenido).
4. Estado de git limpio o conocido (`git status`): si hay cambios ajenos sin commitear,
   reportá y esperá.
5. `npm run build` de partida compila (ruta `Personal`, P mayúscula).

## Procedimiento

### 1. Plan corto (antes de editar)
Escribí en 3-6 bullets qué archivos creás/modificás y por qué. Si un paso implica
**dependencia nueva, MCP nuevo, fuente nueva o cambio de fase**, pará y pedí aprobación.

### 2. Ejecución incremental
- Trabajá por sub-pasos verificables; no hagas el rediseño completo de una.
- **Contenido primero**: agregá las claves i18n (ES **y** EN) y los datos en
  `src/data/` antes del JSX.
- **Tokens, no valores sueltos**: si falta un token, agregalo a `tokens.css` y
  documentalo en `DESIGN_SYSTEM.md`.
- **Fallback antes que animación**: el contenido visible es el estado por defecto.
- Leé cualquier archivo antes de modificarlo. **No sobrescribas sin leer.**
- Si aparece contenido sin dato real (rol, métrica, resultado): campo `draft` o vacío,
  y reportalo. **Nunca inventar.**

### 3. Verificación obligatoria (`AGENTS.md` §10)
1. `npm run build` compila sin errores.
2. Viewports 360 / 768 / 1440: sin scroll horizontal ni solapes.
3. Teclado: skip-link → nav → contenido → formulario, foco visible.
4. `prefers-reduced-motion: reduce`: sin movimiento, todo visible.
5. i18n: EN y ES sin `undefined` ni claves crudas; `html lang` correcto.
6. Presupuestos: JS ≤ 150 kB gz · CSS ≤ 10 kB · LCP ≤ 2.5 s · CLS < 0.1.
7. Si hay animación: 60 fps con CPU 6× throttle y contenido legible sin esperarla.

### 4. Revisión independiente
Al terminar, ofrecé al usuario correr:
- agente **`design-reviewer`** (adherencia al sistema visual)
- agente **`qa-reviewer`** (checklist de QA y accesibilidad)

No auto-aprobés: los revisores reportan, el usuario decide.

### 5. Reporte final
```markdown
## Implementación — <scope>

**Estado:** completada | parcial | detenida

- Archivos creados/modificados (lista)
- Fase del ROADMAP y si estaba aprobada
- Verificaciones: [x]/[ ] con resultado
- Contenido pendiente del propietario (si aplica)
- Dependencias o config nuevas (con justificación) o "ninguna"
- Siguiente paso recomendado
```

## Límites duros

- ❌ `npm run eject`
- ❌ Dependencias, MCP, fuentes o librerías de animación sin aprobación escrita
- ❌ Migrar CRA → Vite fuera de la Fase 9
- ❌ Saltar fases del ROADMAP
- ❌ Contenido inventado (experiencia, métricas, clientes, fechas, resultados)
- ❌ Romper `AGENTS.md` §10 (verificación)
- ❌ Editar `.env`, claves de EmailJS o `opencode.json` salvo que la tarea lo pida

Si algo de estas reglas entra en conflicto con el pedido, **detenete y reportá el
conflicto** antes de continuar.
