---
name: portfolio-ux-ui
description: >-
  UX/UI and content-structure guidance for this portfolio project: section hierarchy,
  case-study layouts, empty and draft states, i18n-aware copy, mobile-first composition,
  the protagonist-typography hero with its decorative cursor-reactive layer, and adherence
  to the project's token-based design system including per-ground contrast rules. Use when
  designing, laying out, restructuring or critiquing any section or component of the
  portfolio (hero, about, skills, projects/case studies, contact, header/nav, footer), when
  deciding content hierarchy or what to show on mobile, when writing or reviewing UI copy
  in Spanish or English, when a screen looks inconsistent or generic, when handling missing
  or pending content, or when asked about visual identity, typography, color, spacing or
  component states. Not for backend work, build tooling or animation timing details.
argument-hint: "[section or screen, e.g. 'projects case study', 'contact form', 'hero layout']"
---

# Portfolio UX/UI

Guía de diseño y estructura de contenido **específica de este portfolio**.
No reimplementa el sistema visual: lo aplica desde `docs/DESIGN_SYSTEM.md`.

> **Dirección creativa vigente (2026-10):** el avión dejó de ser el protagonista. El hero
> es **tipografía protagonista** + **una** capa reactiva decorativa al cursor. Las 3
> propuestas están en `ANIMATION_GUIDELINES.md` §5 (ninguna aprobada aún). La paleta se
> conserva, con reglas por fondo en `DESIGN_SYSTEM.md` §2.1 — **el acento como texto es
> `signal-ink` sobre papel y `signal` sobre tinta**.

## Fuentes de verdad (leer primero)

1. `../../../AGENTS.md` — estándares, prohibiciones y definition of done.
2. `../../../docs/DESIGN_SYSTEM.md` — tokens, tipografía, componentes, estados.
3. `../../../docs/PRODUCT_BRIEF.md` — audiencia, modelo de contenido, voz.
4. `../../../docs/ROADMAP.md` — en qué fase se está y qué está aprobado.

Si el diseño pedido contradice esos documentos, **no lo implementes**: reportá el
conflicto y esperá decisión.

## Workflow

1. **Identificá la fase.** Si el rediseño aún no está aprobado en ROADMAP, parar y
   consultar. No implementar rediseño visual sin visto bueno.
2. **Definí la jerarquía antes que la forma.** ¿Qué debe ver el visitante primero,
   segundo, tercero? Escribí el orden en una línea antes de tocar CSS.
3. **Mobile-first:** diseñá a 360 px y agregá complejidad hacia arriba. Cada decisión
   de layout debe explicar cómo se comporta en una sola columna.
4. **Aplicá tokens, nunca valores sueltos.** Si necesitás un valor que no existe en el
   sistema, es una señal de que falta un token — agregarlo a `DESIGN_SYSTEM.md` es
   parte del trabajo.
5. **Definí todos los estados:** default, hover, focus-visible, active, disabled,
   loading, empty, error. Un componente sin estados está incompleto.
6. **Verificá contraste** de cada texto nuevo (AA: 4.5:1 normal, 3:1 grande/UI).
7. **Verificá i18n:** el copy tiene que funcionar en ES y EN (la traducción suele ser
   15-30% más larga; probá con el string más largo).

## Reglas de contenido — críticas

- **Nunca inventar** experiencia, métricas, resultados, clientes, fechas ni logros.
- Un campo sin contenido real queda **vacío, en modo `draft`, u oculto** — y se reporta
  como pendiente.
- No rellenar estados vacíos con texto plausible. Usar copy honesto:
  *"Esta sección estará disponible próximamente."*
- Todo texto visible pasa por `t('clave')` y existe en `src/locales/en.json` **y**
  `es.json`.
- Voz directa y técnica. Prohibido: "apasionada del código", "results-driven",
  "pixel-perfect", adjetivos de marketing sin evidencia.

## Patrones de layout

| Sección | Patrón |
|---|---|
| Hero | `100svh` (min 560px), `h1` con el nombre + display protagonista + identidad + CTA scroll + **una** capa reactiva decorativa (propuesta pendiente) |
| About | 2 columnas ≥768px (retrato \| texto), 1 columna en móvil, medida 65ch |
| Skills | Pills agrupadas por dominio, no una lista plana de 15 items |
| Projects | Jerarquía: destacado + resto. Card clicable en su totalidad |
| Contact | Formulario ≤ 600px, labels visibles, feedback inline con `aria-live` |
| Todas | `SectionHeading` (kicker + h2 + regla) — patrón invariante |

## Checklist de entrega

- [ ] Mobile-first probado a 360 px antes que a 1440 px.
- [ ] Jerarquía de encabezados correcta (un `h1`, sin saltos).
- [ ] Todos los estados definidos (incluidos vacío y error).
- [ ] Contraste AA verificado.
- [ ] Copy EN/ES completo, sin claves faltantes ni `undefined`.
- [ ] Cero contenido inventado.
- [ ] Sin valores hardcodeados fuera de tokens.
- [ ] La capa viva (si hay) es decorativa, `aria-hidden` y el contraste del texto se
      midió contra el **peor caso** del fondo.
- [ ] Fase aprobada en ROADMAP antes de implementar.

## Errores conocidos de este código (no repetir)

- Selectores globales en CSS de componente (`About.css` redefine `h2`/`p`).
- `.container` y `.nav-links` genéricos → colisiones.
- Nav móvil apilado sin hamburguesa.
- `scale(1.05)` en hover con `cursor:pointer` en cards donde solo el enlace navega.
- Labels sin `htmlFor`, feedback con `alert()`.
- Foto con `alt="Logo"`.
- Ritmo vertical distinto por sección (50/40/0 px).
- Fondo animado detrás de texto sin verificar el contraste contra el **peor caso**.
- Efectos apilados "porque queda premium": acumulación sin jerarquía = plantilla SaaS o
  demo de efectos, que es exactamente lo que este portfolio no debe ser.
