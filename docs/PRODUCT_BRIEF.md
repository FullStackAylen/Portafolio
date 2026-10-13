# Product Brief — Portfolio de Aylén Rodríguez

> Documento de producto. Define **qué** se construye y **por qué**. El **cómo visual**
> está en `DESIGN_SYSTEM.md`; el **cómo se mueve**, en `ANIMATION_GUIDELINES.md`.
>
> ⚠️ Este documento **no contiene datos personales inventados**. Todo lo que aparece aquí
> como contenido es un *campo a completar por el propietario*, nunca un valor ficticio.

---

## 1. Objetivo

Convertir un portfolio técnico de una sola columna en una experiencia web premium que:

1. **Comunique competencia de frontend** por cómo está hecha, no por lo que dice.
2. **Presente proyectos como casos de estudio**, no como lista de links.
3. **Sea memorable en los primeros 5 segundos**: tipografía protagonista, formas que
   reaccionan al cursor y movimiento orgánico — sin caer en una demo de efectos.
4. **Siga siendo un portfolio útil**: rápido, accesible, indexable, mantenible.

El diseño es el argumento. Por eso rendimiento, accesibilidad y reduced-motion no son
restricciones del diseño: son parte del diseño.

### 1.1 Dirección creativa vigente

> **Cambio de dirección artística (2026-10), decisión del propietario.**

**Deja de ser protagonista**

- El **avión** y la intro narrativa "carta de vuelo". No se descarta el trabajo hecho:
  la base editorial (papel, tinta, reglas finas, monoespaciada, acento escaso) se
  conserva porque es lo que evita el aire de plantilla.

**Pasa a ser protagonista**

- La **tipografía** como elemento principal de la composición.
- Las **formas geométricas flotantes** y los **fondos generativos sutiles**.
- El **movimiento orgánico** y las formas que **reaccionan al cursor**.

**Debe sentirse** como el portfolio de una desarrolladora con identidad de diseño
propia. **No** debe sentirse como un dashboard, una plantilla SaaS ni una
demostración de efectos.

| Decisión | Estado | Dónde |
|---|---|---|
| 3 propuestas de hero + lenguaje de movimiento | ⬜ **sin aprobar** | `ANIMATION_GUIDELINES.md` §5 |
| Evaluación de la paleta en los dos fondos | ✅ hecha (ratios verificados) | `DESIGN_SYSTEM.md` §2.1 |
| Primera implementación pequeña y verificable | ⬜ definida, sin aprobar | `ROADMAP.md` Fase 4a |
| Código de la aplicación | ✅ **intacto** | sin cambios hasta aprobación |

### 1.2 Plataforma (verificada en el repositorio)

| | |
|---|---|
| Build | **Create React App** (`react-scripts 5.0.1`) — **hoy no hay Vite** |
| Código | GitHub (`FullStackAylen/Portafolio`, rama `master`) |
| Despliegue | Vercel (declarado por el propietario; no hay `vercel.json` en el repo) |
| Migración a Vite | Fase 9, opcional y al final (`ROADMAP.md`) |

---

## 2. Audiencia

| Perfil | Qué busca | Qué debe encontrar |
|---|---|---|
| Reclutador / recruiter técnico | Señales rápidas de nivel | Stack claro, orden, contacto en ≤ 2 scrolls |
| Tech lead / equipo de producto | Cómo resuelve problemas | Casos de estudio con contexto y decisiones |
| Cliente potencial | ¿Puede entregar? | Trabajo visible, canal de contacto directo |

**Prioridad de diseño:** móvil primero (el tráfico de un portfolio suele ser mayoritario
en móvil), después desktop como superficie de expresión.

---

## 3. Propuesta de valor

**Posicionamiento (texto a validar por el propietario):** desarrolladora de software con
base fuerte en el ecosistema .NET y experiencia frontend con React.

Lo que el sitio debe demostrar sin decirlo explícitamente: atención al detalle,
capacidad de construir interfaces con criterio, y dominio de las herramientas que usa.

**No debe:** prometer métricas que no existen, mostrar logos de clientes inventados,
ni usar lenguaje de marketing vacío ("apasionada del código", "results-driven").

---

## 4. Arquitectura de contenido

Secciones del sitio y su jerarquía:

| # | Sección | Propósito | Contenido requerido | Estado real |
|---|---|---|---|---|
| 0 | **Hero** | Impacto + identidad | Nombre, rol, display tipográfico, capa reactiva | ❌ No existe |
| 1 | **About** | Contexto humano | Presentación, cita propia | ✅ Existe (`i18n.js`) |
| 2 | **Experience** | Trayectoria | Timeline real | ❌ Componente vacío |
| 3 | **Skills** | Dimensión técnica | Lista agrupada por dominio | ✅ Existe (15 items) |
| 4 | **Projects** | Casos de estudio | Contexto, rol, stack, decisiones | ⚠️ Existe (2 proyectos, sin estructura de caso) |
| 5 | **Contact** | Conversación | Formulario funcional | ✅ Existe (EmailJS) |

### 4.1 Modelo de datos (objetivo)

```
src/data/
  profile.js     nombre, rol, resumen, enlaces
  projects.js    arreglo de casos de estudio
  skills.js      habilidades agrupadas por categoría

src/locales/
  en.json
  es.json        textos de UI + textos narrativos por sección
```

### 4.2 Esquema de un caso de estudio

```js
{
  id: 'farmacia',                 // estable, usado como key
  title: '',                      // ✅ existe en el código actual
  tagline: '',                    // una línea, aportada por el dueño
  stack: [],                      // ✅ tecnología real
  repo: '',                       // ✅ existe
  live: null,                     // URL si aplica
  problem: '',                    // ❌ lo aporta el dueño
  role: '',                       // ❌ lo aporta el dueño
  decisions: [],                  // ❌ lo aporta el dueño
  outcome: '',                    // ❌ lo aporta el dueño — SIN MÉTRICAS INVENTADAS
  status: 'published' | 'draft'   // 'draft' no se renderiza en producción
}
```

**Regla:** un caso de estudio sin `problem`/`role`/`outcome` reales se muestra en modo
resumido (título + stack + repo), **nunca** se rellena con texto genérico.

### 4.3 Contenido existente (verificable en el repo)

- Proyectos actuales: **Farmacia** (ADO.NET + MVC en Windows Forms) y **The crow makeup**
  (backend + frontend de ecommerce), con repositorio en GitHub.
- Skills actuales: C#, JavaScript, .NET, ASP.NET MVC Core, .NET MAUI, React JS, Git,
  SQL Server, Python, PHP, Laravel 8, WPF, Windows Forms, Web API, Blazor.
- Idiomas: **EN y ES**, con i18next. Hoy `lng: "en"` por defecto.

> Estos son los hechos que ya están en el código. Todo lo demás es material a entregar.

---

## 5. Idioma e i18n

- Dos idiomas completos: **es** y **en**. Sin cadenas sueltas en JSX.
- Selector de idioma accesible (botón + `aria-expanded`), no icono con `onClick`.
- `document.documentElement.lang` debe cambiar con el idioma (hoy queda en `en`).
- Regla de traducción: se traduce el *contenido*, no se traduce el código.

---

## 6. Voz y tono

- **Directa y técnica.** Primera persona, frases cortas, sin adjetivos de relleno.
- Los datos hablan: stack, decisiones, código. No adjetivos superlativos.
- Evitar clichés de portfolio: "pasión por la tecnología", "soy un apasionado…",
  "pixel-perfect", "results-driven".
- Incluir la cita personal solo si representa al propietario; si no, se elimina.

---

## 7. Criterios de éxito

**Cuantitativos (medibles)**

| Criterio | Umbral |
|---|---|
| Lighthouse Performance móvil | ≥ 90 |
| Lighthouse Accesibilidad | ≥ 95 |
| Lighthouse SEO | ≥ 95 |
| LCP | ≤ 2.5 s |
| CLS | < 0.1 |
| Errores axe-core críticos | 0 |
| Navegación completa con teclado | ✅ |
| Ambos idiomas sin claves faltantes | ✅ |

**Cualitativos**

- Un visitante entiende en 5 segundos: quién es, qué hace, cómo contactarla.
- Los proyectos se leen como decisiones, no como nombres sueltos.
- El hero se recuerda, pero no molesta a quien vuelve a visitar (es salteable y el
  contenido nunca espera a que la animación termine).
- El código se puede mantener sin re-leer la auditoría.

---

## 8. Alcance y no-alcance

**Incluido (fases aprobadas en ROADMAP)**

- Sistema de diseño con tokens, tipografía auto-hospedada, componentes base.
- Accesibilidad completa (keyboard, labels, focus, reduced-motion, i18n lang).
- Hero con tipografía protagonista y **una** capa viva reactiva al cursor (propuesta a
  elegir entre las 3 de `ANIMATION_GUIDELINES.md` §5).
- Reveals por scroll + movimiento orgánico sutil (capa ambiente con presupuesto duro).
- Proyectos como casos de estudio.
- SEO real (meta, OG, JSON-LD, sitemap).

**Fuera de alcance por ahora**

- Backend propio, CMS, blog, autenticación.
- WebGL / Three.js (coste en móvil sin retorno demostrado).
- Router multipágina (es un one-pager con anclas).
- PWA completa.
- Dark mode (posible fase futura; requiere definir tokens aparte).

---

## 9. Riesgos de producto

| Riesgo | Mitigación |
|---|---|
| El hero animado alarga el tiempo hasta el contenido | Legible a 800 ms, salteable, fallback estático |
| La capa viva (fondo generativo/geometría) cuesta rendimiento en móvil | Presupuesto duro de `ANIMATION_GUIDELINES.md` §6 + medición 60 fps por fase |
| El fondo mueve texto mientras se lee | La capa viva es decorativa y `aria-hidden`; contraste medido contra el peor caso |
| Animaciones degradan el móvil de gama media | Presupuestos de rendimiento + medición por fase |
| Contenido vacío (Experience sin datos) | Placeholder honesto o sección oculta; **nunca inventada** |
| El sitio se ve bien pero nadie lo encuentra | Fase de SEO con OG/JSON-LD y prerender |
| El rediseño envejece rápido | Sistema de tokens + movimiento con propósito, no tendencias |
