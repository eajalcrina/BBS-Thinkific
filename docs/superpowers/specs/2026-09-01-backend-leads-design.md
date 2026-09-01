# Backend de leads (subsistema 3) — Design Spec

**Estado:** aprobado por Eddie, pendiente de plan de implementación.

## 1. Objetivo

Implementar `/api/lead` — el endpoint que reciben ya hoy 3 formularios en
producción en la rama `home-redesign` (`Footer.jsx`, `ProgramaCTA.jsx`,
`usePaymentCta.js`) sin que exista todavía backend. Replica exactamente el
patrón ya en producción en Redesign Lab (`app/api/lead/route.ts` +
`lib/lead-notify.ts`, documentado en
`Redesign Lab/redesignlab/docs/lead-capture-infrastructure.md`), adaptado a
una función serverless de Vercel plana (JS, sin framework — igual que el
`api/subscribe.js` histórico de este repo) y a los 5 formularios propios de
BBS.

## 2. Arquitectura

Un único endpoint recibe todos los formularios del sitio. Al recibir un
`POST`, dispara dos canales en paralelo, sin que uno bloquee al otro:

```
Formulario del sitio (front-end)
        │  POST /api/lead   { form, data }
        ▼
   api/lead.js  (valida "form" contra KNOWN_FORMS)
        │
        ▼
   notifyLead(form, data)   [api/_lib/lead-notify.js]
        │
        ├──► sendBrevoEmail()   ──► POST api.brevo.com/v3/smtp/email
        │        (notificación transaccional, no creación de contacto)
        └──► appendSheetRow()   ──► POST sheets.googleapis.com/.../append
                 (service account JWT, sin OAuth de usuario)

   Promise.allSettled([...])  → { emailOk, sheetOk }
   Éxito (200) si emailOk || sheetOk. Error 502 solo si ambos fallan.
```

**Decisión de arquitectura ya tomada (heredada de Redesign Lab):** no usar
Supabase ni ninguna base de datos dedicada. Fue descartado deliberadamente
allá por fallos silenciosos de un proyecto free pausado por inactividad —
el formulario mostraba éxito pero el dato nunca se guardaba. Brevo + Sheets
no dependen de un servicio que alguien tenga que mantener vivo.

## 3. Archivos

- **Crear** `api/lead.js` — handler HTTP. Valida método (`POST` únicamente,
  405 en cualquier otro), valida `form` contra `KNOWN_FORMS` y que `data`
  sea un objeto (400 si no), llama a `notifyLead()`, responde 200 (con
  `{ ok: true, emailOk, sheetOk }`) o 502 (`{ error: '...' }`) si ambos
  canales fallaron.
- **Crear** `api/_lib/lead-notify.js` — lógica de negocio: `buildEnvelope()`
  (arma asunto + campos de email y fila de sheet según `form`),
  `sendBrevoEmail()`, `appendSheetRow()`, `notifyLead()` (dispara ambos con
  `Promise.allSettled`). Server-only, nunca importado desde `src/`.
- **Crear** `.env.local.example` — plantilla con los 5 nombres de variable
  (sin valores) para referencia de desarrollo local.
- **Modificar** `src/components/Footer.jsx`,
  `src/components/programa/ProgramaCTA.jsx`,
  `src/components/programa/usePaymentCta.js` — ver §6.
- **Nueva dependencia npm:** `google-auth-library` (solo se usa el módulo
  `JWT` para autenticar como service account contra la API REST de Sheets
  vía `fetch` — no hace falta el paquete `googleapis` completo).

## 4. Contrato del payload

Todos los formularios mandan la misma forma:

```json
{ "form": "<uno de KNOWN_FORMS>", "data": { /* campos según el form */ } }
```

Esto reemplaza el formato plano que usan hoy los 3 call sites ya en
producción (`{ form, email, pagina_origen }` sin envolver) — ver §6. Se
adopta el contrato `{ form, data }` para calzar exactamente con el modelo
de Redesign Lab/Thousandfold.

`KNOWN_FORMS`:

```js
const KNOWN_FORMS = [
  'bbs-newsletter',
  'bbs-enroll',
  'bbs-diagnostico-profesionales',
  'bbs-diagnostico-empresas',
  'bbs-payment',
]
```

## 5. Los 5 formularios

| `form` | Pestaña del Sheet | Quién lo dispara hoy | Campos en `data` |
|---|---|---|---|
| `bbs-newsletter` | Newsletter | `Footer.jsx` (ya en prod) | `email`, `pagina_origen` |
| `bbs-enroll` | Inscripciones | `ProgramaCTA.jsx` → `InlineEnrollForm` (ya en prod) | `programa`, `nombre`, `email`, `whatsapp`, `pagina_origen` |
| `bbs-payment` | Intentos de pago | `usePaymentCta.js` (ya en prod, renombrado — ver §6.3) | `programa`, `status`, `pagina_origen` |
| `bbs-diagnostico-profesionales` | Diagnóstico Profesionales | **subsistema 4, aún no construido** — backend queda listo esperándolo | `nombre`, `email`, `whatsapp`, `resultado`, `pagina_origen` *(esquema provisional, se ajusta cuando se diseñe el subsistema 4)* |
| `bbs-diagnostico-empresas` | Diagnóstico Empresas | **subsistema 4, aún no construido** | mismos campos que arriba |

`whatsapp` es columna en las 5 pestañas del Sheet (campo propio de BBS, no
existe en el modelo base de Redesign Lab). Donde el formulario no lo
captura (`bbs-newsletter`, `bbs-payment` hoy), la columna queda vacía —
sigue siendo `form` de fricción mínima donde corresponde.

**`status` en `bbs-payment`:** hoy `usePaymentCta.js` se dispara cuando
alguien hace clic en "Pagar", pero ningún programa tiene todavía
`mercadopagoUrl` real — no es un pago que pueda ser `success`/`failed`.
Se usan 3 valores posibles: `"pending_checkout"` (estado actual — interés
registrado, checkout aún no disponible), y `"success"` / `"failed"`,
reservados para cuando haya un Mercado Pago real integrado. El código no
fuerza el valor — simplemente lo escribe tal cual lo mande el cliente en
la columna `status`, así que el día que se conecte Mercado Pago de verdad,
alcanza con que ese flujo mande `"success"`/`"failed"` sin tocar el
backend.

**Asuntos de email** (uno por `form`, con Nombre — o `email`/`programa` si no
hay nombre — interpolado):

- `bbs-newsletter` → `Nueva suscripción — {email}`
- `bbs-enroll` → `Inscripción — {programa} — {nombre}`
- `bbs-payment` → `Intento de pago — {programa} — {status}`
- `bbs-diagnostico-profesionales` → `Diagnóstico Profesionales — {nombre}`
- `bbs-diagnostico-empresas` → `Diagnóstico Empresas — {nombre}`

Columnas de cada fila del Sheet, `timestamp` (hora Lima, `es-PE`,
`America/Lima`) siempre primero, orden exacto por pestaña:

| Pestaña | Columnas (en orden) |
|---|---|
| Newsletter | `timestamp`, `email`, `whatsapp` *(vacía)*, `pagina_origen` |
| Inscripciones | `timestamp`, `programa`, `nombre`, `email`, `whatsapp`, `pagina_origen` |
| Intentos de pago | `timestamp`, `programa`, `status`, `whatsapp` *(vacía)*, `pagina_origen` |
| Diagnóstico Profesionales | `timestamp`, `nombre`, `email`, `whatsapp`, `resultado`, `pagina_origen` |
| Diagnóstico Empresas | `timestamp`, `nombre`, `email`, `whatsapp`, `resultado`, `pagina_origen` |

Cada Sheet tab necesita esa fila de encabezados creada a mano antes del
primer `append` (el código no crea encabezados, solo agrega filas).

## 6. Cambios en frontend

Los 3 call sites ya aprobados y en producción necesitan un ajuste chico
para calzar con el contrato `{ form, data }` — ningún campo cambia de
nombre, solo se anidan bajo `data`.

**6.1 `src/components/Footer.jsx`** (`NewsletterForm`) — el `fetch` body
pasa de
`{ form: 'bbs-newsletter', email, pagina_origen: window.location.pathname }`
a
`{ form: 'bbs-newsletter', data: { email, pagina_origen: window.location.pathname } }`.

**6.2 `src/components/programa/ProgramaCTA.jsx`** (`InlineEnrollForm`) —
mismo cambio: los 5 campos existentes (`programa`, `nombre`, `email`,
`whatsapp`, `pagina_origen`) se mueven bajo `data`, `form` se mantiene en
`'bbs-enroll'`.

**6.3 `src/components/programa/usePaymentCta.js`** — dos cambios:
1. `form` pasa de `'bbs-enroll'` a `'bbs-payment'` (formulario propio, ya
   no comparte tab/asunto con la inscripción real).
2. El body pasa de `{ form: 'bbs-enroll', programa, intento_pago: true,
   pagina_origen }` a
   `{ form: 'bbs-payment', data: { programa, status: 'pending_checkout',
   pagina_origen } }` — se elimina `intento_pago` (reemplazado por
   `status`).

Ninguno de los 3 cambia su lógica de `status` de UI (`idle/loading/
sent/error`) ni sus mensajes visibles — solo la forma del `body` que se
manda a `fetch`.

## 7. Variables de entorno

Ya cargadas en Vercel (Production, Preview, Development) por Eddie — el
código las lee vía `process.env.<NOMBRE>` exactamente con estos nombres,
nunca hardcodeadas ni pedidas por chat:

```
GOOGLE_SHEET_ID
GOOGLE_SERVICE_ACCOUNT_EMAIL
GOOGLE_PRIVATE_KEY
BREVO_API_KEY
NOTIFICATION_EMAIL
```

`EMAIL_FROM` no está entre las variables cargadas — queda como constante
en `api/_lib/lead-notify.js`, `biobusiness@redesignlab.org` (mismo remitente
que `NOTIFICATION_EMAIL`, ya verificado en Brevo).

**Nota de verificación:** hubo un error de tipeo previo en
`GOOGLE_SERVICE_ACCOUNT_EMAIL` (faltaba la "L" final) ya corregido en
Vercel, y `GOOGLE_PRIVATE_KEY` fue regenerada tras quedar expuesta
accidentalmente. El código usa el nombre exacto de arriba; esta sesión no
tiene forma de leer las variables reales desplegadas en Vercel para
confirmarlas — si tras el deploy los logs muestran
`[lead-notify] Google Sheets not configured`, lo primero a revisar es que
el nombre en el dashboard de Vercel sea carácter por carácter
`GOOGLE_SERVICE_ACCOUNT_EMAIL`.

`GOOGLE_PRIVATE_KEY` llega desde Vercel como una sola línea con `\n`
literales — el código hace `.replace(/\\n/g, '\n')` antes de usarla,
igual que en Redesign Lab.

## 8. Manejo de errores

- Cada canal (`sendBrevoEmail`, `appendSheetRow`) atrapa sus propios
  errores y devuelve `false` en vez de lanzar — nunca tira una excepción
  no controlada.
- Si falta alguna variable de entorno de un canal, ese canal se salta con
  un `console.warn` (server-side, nunca expuesto al cliente) y devuelve
  `false` — no bloquea al otro canal.
- Cualquier fallo real (status HTTP no-2xx de Brevo o de Sheets, excepción
  de red) se loguea con `console.error` incluyendo el status y el cuerpo
  de la respuesta fallida, para poder diagnosticar sin depender de que el
  usuario reporte el problema.
- El endpoint responde 200 si `emailOk || sheetOk`; 502 solo si ambos
  fallaron; 400 si `form` no está en `KNOWN_FORMS` o `data` no es un
  objeto; 405 si el método no es `POST`.
- Los 3 call sites del frontend ya tratan `!res.ok` como error (muestran
  su mensaje de error existente) — no necesitan cambios de esta lógica,
  solo el payload (§6).

## 9. Testing / verificación

Este repo no tiene framework de tests (mismo criterio que los subsistemas
1 y 2), y no hay CLI de Vercel instalada localmente para levantar
funciones serverless en dev. Verificación:

1. `npm run build` — sanity check de que nada rompe el build de Vite (el
   directorio `api/` no participa del build de Vite, pero confirma que el
   resto del repo sigue sano).
2. Un script chico, no comprometido a git (`scripts/smoke-test-lead.mjs`
   o similar, en el directorio de trabajo del implementador), que importa
   el handler de `api/lead.js` directamente y lo invoca con un `req`/`res`
   simulado (objetos planos con los métodos mínimos que el handler usa:
   `req.method`, `req.body`, `res.status().json()`) — sin necesitar
   `vercel dev`. Cubre los 5 tipos de formulario más los casos de error
   (método no-POST, `form` inválido, ambos canales fallando por falta de
   env vars).
3. Con las credenciales reales ya cargadas en Vercel, un test end-to-end
   real (deploy a preview o producción + enviar cada uno de los 3
   formularios ya en producción desde el sitio) confirma el flujo
   completo — esto lo hace Eddie o se coordina como parte del QA final,
   no es parte de la verificación automática del implementador.

## 10. Checklist de aceptación (QA)

- [ ] `/api/lead` recibe los 5 tipos de formulario y escribe en la pestaña
      correspondiente del spreadsheet `bbs-web-leads`.
- [ ] El campo `whatsapp` llega y se guarda correctamente donde el
      formulario lo captura; queda vacío donde no aplica.
- [ ] Para `bbs-payment`, la columna `status` refleja el valor que mande
      el cliente (`pending_checkout` hoy).
- [ ] Notificación por Brevo llega a `NOTIFICATION_EMAIL` en un envío de
      prueba por cada uno de los 5 formularios (los 2 de diagnóstico se
      prueban con payloads simulados, ya que su UI no existe aún).
- [ ] Si Brevo falla pero Sheets responde OK (o viceversa), el frontend
      sigue mostrando éxito al usuario y el lead no se pierde.
- [ ] Ningún valor sensible queda hardcodeado — todo vía `process.env`.
- [ ] Tras el primer deploy, Eddie hace un Redeploy manual en Vercel para
      que las variables de entorno ya cargadas tomen efecto (paso manual
      suyo, fuera del alcance del código).

## 11. Fuera de alcance

- Que Brevo también le mande al **usuario** un correo con el resultado de
  su diagnóstico (no solo la notificación interna al equipo) — requiere
  una plantilla transaccional separada. No bloquea este subsistema; queda
  para cuando se diseñe el subsistema 4.
- El schema definitivo de `bbs-diagnostico-profesionales` /
  `bbs-diagnostico-empresas` — el de §5 es provisional y se ajusta sin
  fricción cuando se brainstorme el subsistema 4 (agregar un campo nuevo a
  `data` y a las columnas de esa pestaña no requiere tocar la arquitectura
  del endpoint).
- Integración real de Mercado Pago (`mercadopagoUrl`, webhooks de
  success/failed) — subsistema separado, no incluido aquí.
