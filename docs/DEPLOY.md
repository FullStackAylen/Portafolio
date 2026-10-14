# Deploy — Vercel (guía operativa)

> Cómo se despliega el portfolio, qué secretos vive dónde y qué hace el agente con
> acceso a la CLI. Fuente: AGENTS §6 (seguridad) y el trabajo de las fases 1–7 (2026-10).

---

## 1. Arquitectura del deploy

- **Repo en GitHub** → Vercel detecta el proyecto y buildea con **CRA** (`npm run build`).
  Cada `git push` a la rama principal dispara un deploy automático.
- Build de Vercel usa la **raíz del repo**; `build/` está en `.gitignore` (se genera en CI).
- Comando de build: `npm run build` (default de Vercel para CRA).
  ⚠️ En Windows local, usar siempre la ruta `Personal` con P mayúscula (AGENTS §2).

## 2. Variables de entorno (obligatorias en Vercel)

El código lee EmailJS de `process.env.REACT_APP_*`. `.env` **no** viaja al repo
(.gitignore), por lo que **Vercel no las tiene salvo que se carguen a mano**.

| Variable | Valor |
|---|---|
| `REACT_APP_EMAILJS_SERVICE_ID` | del dashboard de EmailJS |
| `REACT_APP_EMAILJS_TEMPLATE_ID` | del dashboard de EmailJS |
| `REACT_APP_EMAILJS_PUBLIC_KEY` | del dashboard de EmailJS |

Dónde: vercel.com → proyecto → **Settings → Environment Variables** → agregar las 3 →
**Redeploy** (un deploy nuevo; agregarlas no redeployea solo).

> CRA las embebe en el bundle JS: son **semi-públicas por diseño de EmailJS**. El riesgo
> no es exponerlas en el bundle, sino que queden en el historial de git — por eso la
> rotación (§3).

## 3. Seguridad: rotación de claves (una vez)

Las claves viejas quedaron en el historial de git **antes** de la Fase 1a. Checklist:

1. En el dashboard de EmailJS: **regenerar** la public key; verificar service/template.
2. Actualizar `.env` local con los valores nuevos.
3. Actualizar las 3 vars en Vercel y redeployear.
4. Verificar en producción: enviar un mail de prueba desde el formulario.

## 4. Acceso del agente a la CLI de Vercel (Opción A — aprobada 2026-10)

El agente puede operar Vercel **sin ver secretos** vía login interactivo:

```bash
npx vercel login                        # device flow: el dueño autentica en el navegador
npx vercel link --yes --project my-portafolio   # linkea el dir local al proyecto
npx vercel env ls                       # listar env vars (no muestra valores)
npx vercel env add NAME production      # el VALOR va por stdin, nunca por el chat:
  #   $val = (Get-Content .env | Select-String "^NAME=").ToString().Split('=')[1]
  #   $val | npx vercel env add NAME production
npx vercel ls --prod                    # listar deploys de producción
npx vercel redeploy <deployment-url>    # rebuild con las env vars actuales
npx vercel logs                         # logs de build/runtime
npx vercel logout                       # cerrar sesión al terminar
```

**Gotas de la CLI (64.0.2, verificado 2026-10):**
- `redeploy` **no** acepta `--prod` ni `--yes`; solo la URL del deployment.
- `vercel link` crea `.env.local` (OIDC) y `.vercel/`; ambos **van en `.gitignore`**
  (la CLI lo hace solo, pero verificar).
- Proyecto en Vercel: **`aylenros-projects/my-portafolio`**.
- La URL `*.vercel.app` del deployment está **detrás de Vercel Authentication**
  (Standard Protection): curl/PowerShell reciben la página de login. Para verificar
  por HTTP se usa el dominio custom (cuando resuelve) o se desactiva la protección en
  Project → Settings → Deployment Protection.

Reglas de este acceso (AGENTS §6):

- **El dueño escribe los valores secretos** (env vars): van directo a `.env` local o al
  prompt de `vercel env add`; nunca por el chat.
- `.vercel/` (credenciales del link) **se agrega a `.gitignore` antes** del primer
  `vercel link`.
- El agente **no** toca: dominios, billing, borrados de proyecto ni settings de cuenta.
- Cierre de sesión cuando el trabajo termine: `npx vercel logout` (o revocar el token
  en vercel.com/account/tokens).

Alternativas **no** usadas: token de servicio de larga vida (más riesgo, peor revocación)
y el MCP de Vercel (overkill para estas tareas; AGENTS §12 pide justificación).

## 4.1 Hallazgo (2026-10-14) y resolución: sin dominio custom, URL de Vercel

El alias de producción declarado era `https://aylenrodriguez.dev`, pero:

- DNS contra 8.8.8.8 → **NXDOMAIN** (sin A, sin CNAME, sin NS, sin SOA).
- RDAP del registry `.dev` → **404** (control con `dart.dev` sí devuelve registro
  completo ⇒ el método es válido). Otros dominios de la cuenta: `aylenrodriguez.tech`
  también NXDOMAIN; solo `myprofessionalprofile.com` resuelve (parking del registrar,
  sin DNS a Vercel).

**Decisión del propietario (2026-10-14):** no registrar dominio de pago por ahora →
usar la **URL estable de Vercel**.

**Cambios aplicados:**
1. `ssoProtection` del proyecto cambiado a `only_previews` (antes
   `prod_deployment_urls_and_all_previews`: bloqueaba con login la producción).
2. Producción = **`https://my-portafolio-beige.vercel.app`** (alias estable).
3. `og:url`, `canonical`, `twitter:url`, `sitemap.xml` y `robots.txt` apuntan a esa URL
   (`public/index.html`, `public/sitemap.xml`, `public/robots.txt`).
4. Env vars EmailJS cargadas en Vercel y **verificadas embebidas** en el bundle
   publicado (comparación contra `.env` sin imprimir valores).

**Limpieza pendiente (opcional, requiere confirmación):** el proyecto tiene 10 dominios
enganchados, casi todos muertos (NXDOMAIN) o sin verificar. `aylenrodriguez.dev` no se
puede borrar hasta eliminar antes el redirect 308 de `www.aylenrodriguez.dev`. Si se
recupera un dominio propio en el futuro: registrar → agregar en Vercel → repuntar
`og:url`/`canonical`/`sitemap.xml`.

## 5. Checklist post-deploy

- [ ] `https://<dominio>` carga y el hero se ve (fonts vendored cargando, no fallback).
- [ ] Formulario de contacto: enviar mail de prueba ⇒ llega al inbox (env vars OK).
- [ ] Cambio de idioma EN/ES funciona en producción.
- [ ] `og:url`/`canonical`/`sitemap.xml` presentes **una vez definido el dominio**
      (pendiente de la Fase 7 — bloqueados por el dueño).
- [ ] Lighthouse en la URL de producción (mobile): sin regresión vs. local.

## 6. Rollback

Vercel guarda el historial de deploys: vercel.com → proyecto → **Deployments** →
"…" del deploy bueno → **Promote to Production**. También
`npx vercel rollback` desde la CLI.
