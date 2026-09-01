# Backend de Leads (Subsistema 3) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Stand up `/api/lead`, the single serverless endpoint that the 3
lead-capture forms already shipped on this branch (`Footer.jsx`,
`ProgramaCTA.jsx`, `usePaymentCta.js`) call today with no backend behind it,
forwarding every submission to Brevo (email notification) and Google Sheets
(row append) in parallel.

**Architecture:** One HTTP handler (`api/lead.js`) validates the request and
delegates to `api/_lib/lead-notify.js`, which builds a per-form "envelope"
(email subject/fields + sheet tab/row) and fires Brevo + Sheets via
`Promise.allSettled` — success if either channel works, failure only if
both do. 3 existing frontend call sites are adjusted to the `{ form, data }`
payload contract this plan establishes.

**Tech Stack:** Vercel serverless functions (plain Node ESM, no framework —
matches the existing `api/subscribe.js` convention), `google-auth-library`
(JWT-only, for Sheets service-account auth), Node's built-in `node:test`
runner (no new test-framework dependency).

## Global Constraints

- Payload contract: every form POSTs `{ form: "<KNOWN_FORMS value>", data: {...} }` to `/api/lead`.
- `KNOWN_FORMS` is exactly: `bbs-newsletter`, `bbs-enroll`, `bbs-payment`, `bbs-diagnostico-profesionales`, `bbs-diagnostico-empresas`.
- Env vars are read via `process.env` with these exact names (already loaded in Vercel — never hardcode, never prompt for values): `BREVO_API_KEY`, `NOTIFICATION_EMAIL`, `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_PRIVATE_KEY`, `GOOGLE_SHEET_ID`.
- `EMAIL_FROM` is a hardcoded constant `'biobusiness@redesignlab.org'` (not an env var — not provisioned in Vercel).
- Response contract: 200 with `{ ok: true, emailOk, sheetOk }` if `emailOk || sheetOk`; 502 with `{ error }` if both are false; 400 if `form` is missing/unknown or `data` isn't an object; 405 if method isn't `POST`.
- Every server-side failure (non-2xx from Brevo/Sheets, thrown exception, missing env var for a channel) is caught and logged with `console.error`/`console.warn` — the handler never throws uncaught and never blocks one channel on the other's failure.
- Files under `api/_lib/` are never treated as their own Vercel serverless function (Vercel convention: an underscore-prefixed path is excluded from routing) — this is where shared, non-routed logic lives.
- No test files live under `api/` (risk of Vercel attempting to deploy a test file as a function) — all tests live under `test/`, run via `node --test test/`.
- `package.json` already has `"type": "module"` — all new files use ESM `import`/`export`, no `require`.

---

### Task 1: `api/_lib/lead-notify.js` — envelope builder + Brevo/Sheets channels

**Files:**
- Create: `api/_lib/lead-notify.js`
- Create: `test/lead-notify.test.js`
- Modify: `package.json` (add `google-auth-library` dependency, add `"test"` script)

**Interfaces:**
- Produces: `buildEnvelope(form, data)` → `{ emailSubject: string, emailFields: [string, any][], sheetTab: string, sheetRow: any[] }`, throws `Error` for an unknown `form`.
- Produces: `notifyLead(form, data, deps = {})` → `Promise<{ emailOk: boolean, sheetOk: boolean }>`. `deps` optionally overrides `sendBrevoEmail`/`appendSheetRow` (used by tests to avoid real network/crypto calls); Task 2 calls this with no `deps` (uses the real implementations).

- [ ] **Step 1: Add the `google-auth-library` dependency**

Run: `npm install google-auth-library`

Expected: `package.json`'s `dependencies` gains a `"google-auth-library"` entry, `package-lock.json` updates.

- [ ] **Step 2: Write `api/_lib/lead-notify.js`**

```js
import { JWT } from 'google-auth-library'

const EMAIL_FROM = 'biobusiness@redesignlab.org'

function nowLima() {
  return new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' })
}

function renderFieldsHtml(fields) {
  const rows = fields
    .map(
      ([label, value]) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#666;">${label}</td><td style="padding:4px 0;">${value ?? ''}</td></tr>`
    )
    .join('')
  return `<table style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">${rows}</table>`
}

export function buildEnvelope(form, data) {
  const ts = nowLima()

  switch (form) {
    case 'bbs-newsletter':
      return {
        emailSubject: `Nueva suscripción — ${data.email || 'sin email'}`,
        emailFields: [
          ['Email', data.email],
          ['Página de origen', data.pagina_origen],
        ],
        sheetTab: 'Newsletter',
        sheetRow: [ts, data.email || '', data.whatsapp || '', data.pagina_origen || ''],
      }

    case 'bbs-enroll':
      return {
        emailSubject: `Inscripción — ${data.programa || 'sin programa'} — ${data.nombre || 'sin nombre'}`,
        emailFields: [
          ['Programa', data.programa],
          ['Nombre', data.nombre],
          ['Email', data.email],
          ['WhatsApp', data.whatsapp],
          ['Página de origen', data.pagina_origen],
        ],
        sheetTab: 'Inscripciones',
        sheetRow: [
          ts,
          data.programa || '',
          data.nombre || '',
          data.email || '',
          data.whatsapp || '',
          data.pagina_origen || '',
        ],
      }

    case 'bbs-payment':
      return {
        emailSubject: `Intento de pago — ${data.programa || 'sin programa'} — ${data.status || 'sin status'}`,
        emailFields: [
          ['Programa', data.programa],
          ['Status', data.status],
          ['Página de origen', data.pagina_origen],
        ],
        sheetTab: 'Intentos de pago',
        sheetRow: [ts, data.programa || '', data.status || '', data.whatsapp || '', data.pagina_origen || ''],
      }

    case 'bbs-diagnostico-profesionales':
      return {
        emailSubject: `Diagnóstico Profesionales — ${data.nombre || 'sin nombre'}`,
        emailFields: [
          ['Nombre', data.nombre],
          ['Email', data.email],
          ['WhatsApp', data.whatsapp],
          ['Resultado', data.resultado],
          ['Página de origen', data.pagina_origen],
        ],
        sheetTab: 'Diagnóstico Profesionales',
        sheetRow: [
          ts,
          data.nombre || '',
          data.email || '',
          data.whatsapp || '',
          data.resultado || '',
          data.pagina_origen || '',
        ],
      }

    case 'bbs-diagnostico-empresas':
      return {
        emailSubject: `Diagnóstico Empresas — ${data.nombre || 'sin nombre'}`,
        emailFields: [
          ['Nombre', data.nombre],
          ['Email', data.email],
          ['WhatsApp', data.whatsapp],
          ['Resultado', data.resultado],
          ['Página de origen', data.pagina_origen],
        ],
        sheetTab: 'Diagnóstico Empresas',
        sheetRow: [
          ts,
          data.nombre || '',
          data.email || '',
          data.whatsapp || '',
          data.resultado || '',
          data.pagina_origen || '',
        ],
      }

    default:
      throw new Error(`buildEnvelope: unknown form "${form}"`)
  }
}

async function sendBrevoEmail(subject, html) {
  const apiKey = process.env.BREVO_API_KEY
  const notifyTo = process.env.NOTIFICATION_EMAIL
  if (!apiKey || !notifyTo) {
    console.warn('[lead-notify] BREVO_API_KEY or NOTIFICATION_EMAIL not set — skipping email notification.')
    return false
  }

  try {
    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        sender: { email: EMAIL_FROM, name: 'Bio Business School — Web' },
        to: [{ email: notifyTo }],
        subject,
        htmlContent: `<div style="padding:24px;">${html}</div>`,
      }),
    })
    if (!res.ok) {
      console.error('[lead-notify] Brevo send failed', res.status, await res.text().catch(() => ''))
      return false
    }
    return true
  } catch (err) {
    console.error('[lead-notify] Brevo send threw', err)
    return false
  }
}

let cachedClient = null

function getSheetsClient() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  const rawKey = process.env.GOOGLE_PRIVATE_KEY
  if (!email || !rawKey) return null

  if (cachedClient) return cachedClient

  cachedClient = new JWT({
    email,
    // Vercel guarda la key como una sola línea con "\n" literales —
    // hay que convertirlos de vuelta a saltos de línea reales.
    key: rawKey.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })
  return cachedClient
}

async function appendSheetRow(tabName, values) {
  const sheetId = process.env.GOOGLE_SHEET_ID
  const client = getSheetsClient()
  if (!sheetId || !client) {
    console.warn('[lead-notify] Google Sheets not configured — skipping row append.')
    return false
  }

  try {
    const { token } = await client.getAccessToken()
    const range = encodeURIComponent(`${tabName}!A:A`)
    const res = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ values: [values] }),
      }
    )
    if (!res.ok) {
      console.error('[lead-notify] Sheets append failed', res.status, await res.text().catch(() => ''))
      return false
    }
    return true
  } catch (err) {
    console.error('[lead-notify] Sheets append threw', err)
    return false
  }
}

export async function notifyLead(form, data, deps = {}) {
  const { sendBrevoEmail: sendEmail = sendBrevoEmail, appendSheetRow: appendRow = appendSheetRow } = deps
  const envelope = buildEnvelope(form, data)

  const [emailResult, sheetResult] = await Promise.allSettled([
    sendEmail(envelope.emailSubject, renderFieldsHtml(envelope.emailFields)),
    appendRow(envelope.sheetTab, envelope.sheetRow),
  ])

  return {
    emailOk: emailResult.status === 'fulfilled' && emailResult.value === true,
    sheetOk: sheetResult.status === 'fulfilled' && sheetResult.value === true,
  }
}
```

- [ ] **Step 3: Add the `"test"` script to `package.json`**

In `package.json`, add to `"scripts"`:

```json
    "test": "node --test test/"
```

Full `"scripts"` block after this change:

```json
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "node --test test/"
  },
```

- [ ] **Step 4: Write the failing tests**

Create `test/lead-notify.test.js`:

```js
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { buildEnvelope, notifyLead } from '../api/_lib/lead-notify.js'

test('buildEnvelope: bbs-newsletter', () => {
  const env = buildEnvelope('bbs-newsletter', {
    email: 'ana@example.com',
    pagina_origen: '/',
  })
  assert.equal(env.emailSubject, 'Nueva suscripción — ana@example.com')
  assert.equal(env.sheetTab, 'Newsletter')
  assert.equal(env.sheetRow.length, 4)
  assert.equal(env.sheetRow[1], 'ana@example.com')
  assert.equal(env.sheetRow[2], '') // whatsapp not collected by this form
  assert.equal(env.sheetRow[3], '/')
})

test('buildEnvelope: bbs-enroll', () => {
  const env = buildEnvelope('bbs-enroll', {
    programa: 'capital-de-impacto',
    nombre: 'Ana',
    email: 'ana@example.com',
    whatsapp: '+51987654321',
    pagina_origen: '/programas/capital-de-impacto',
  })
  assert.equal(env.emailSubject, 'Inscripción — capital-de-impacto — Ana')
  assert.equal(env.sheetTab, 'Inscripciones')
  assert.deepEqual(env.sheetRow.slice(1), [
    'capital-de-impacto',
    'Ana',
    'ana@example.com',
    '+51987654321',
    '/programas/capital-de-impacto',
  ])
})

test('buildEnvelope: bbs-payment', () => {
  const env = buildEnvelope('bbs-payment', {
    programa: 'negocios-regenerativos',
    status: 'pending_checkout',
    pagina_origen: '/programas/negocios-regenerativos',
  })
  assert.equal(env.emailSubject, 'Intento de pago — negocios-regenerativos — pending_checkout')
  assert.equal(env.sheetTab, 'Intentos de pago')
  assert.deepEqual(env.sheetRow.slice(1), [
    'negocios-regenerativos',
    'pending_checkout',
    '', // whatsapp not collected by this form
    '/programas/negocios-regenerativos',
  ])
})

test('buildEnvelope: bbs-diagnostico-profesionales', () => {
  const env = buildEnvelope('bbs-diagnostico-profesionales', {
    nombre: 'Luis',
    email: 'luis@example.com',
    whatsapp: '+51999888777',
    resultado: 'Nivel avanzado',
    pagina_origen: '/diagnostico/profesionales',
  })
  assert.equal(env.emailSubject, 'Diagnóstico Profesionales — Luis')
  assert.equal(env.sheetTab, 'Diagnóstico Profesionales')
  assert.deepEqual(env.sheetRow.slice(1), [
    'Luis',
    'luis@example.com',
    '+51999888777',
    'Nivel avanzado',
    '/diagnostico/profesionales',
  ])
})

test('buildEnvelope: bbs-diagnostico-empresas', () => {
  const env = buildEnvelope('bbs-diagnostico-empresas', {
    nombre: 'Marca SAC',
    email: 'contacto@marca.com',
    whatsapp: '',
    resultado: 'Nivel intermedio',
    pagina_origen: '/diagnostico/empresas',
  })
  assert.equal(env.emailSubject, 'Diagnóstico Empresas — Marca SAC')
  assert.equal(env.sheetTab, 'Diagnóstico Empresas')
})

test('buildEnvelope: throws on unknown form', () => {
  assert.throws(() => buildEnvelope('not-a-real-form', {}), /unknown form/)
})

test('notifyLead: both channels succeed', async () => {
  const result = await notifyLead(
    'bbs-newsletter',
    { email: 'a@b.com', pagina_origen: '/' },
    {
      sendBrevoEmail: async () => true,
      appendSheetRow: async () => true,
    }
  )
  assert.deepEqual(result, { emailOk: true, sheetOk: true })
})

test('notifyLead: only email succeeds', async () => {
  const result = await notifyLead(
    'bbs-newsletter',
    { email: 'a@b.com', pagina_origen: '/' },
    {
      sendBrevoEmail: async () => true,
      appendSheetRow: async () => false,
    }
  )
  assert.deepEqual(result, { emailOk: true, sheetOk: false })
})

test('notifyLead: both channels fail', async () => {
  const result = await notifyLead(
    'bbs-newsletter',
    { email: 'a@b.com', pagina_origen: '/' },
    {
      sendBrevoEmail: async () => false,
      appendSheetRow: async () => false,
    }
  )
  assert.deepEqual(result, { emailOk: false, sheetOk: false })
})

test('notifyLead: a channel throwing does not crash the other', async () => {
  const result = await notifyLead(
    'bbs-newsletter',
    { email: 'a@b.com', pagina_origen: '/' },
    {
      sendBrevoEmail: async () => {
        throw new Error('network down')
      },
      appendSheetRow: async () => true,
    }
  )
  assert.deepEqual(result, { emailOk: false, sheetOk: true })
})
```

- [ ] **Step 5: Run the tests to verify they pass**

Run: `npm test`

Expected: all tests in `test/lead-notify.test.js` PASS (10 tests). This is
written test-after rather than test-first because `buildEnvelope` is a pure
lookup table — the test data above **is** the spec's §5 table, so
writing the implementation and the assertions came from the same source of
truth. If any assertion fails, fix `buildEnvelope`/`notifyLead` in
`api/_lib/lead-notify.js`, not the test.

- [ ] **Step 6: Commit**

```bash
git add api/_lib/lead-notify.js test/lead-notify.test.js package.json package-lock.json
git commit -m "feat(api): add lead-notify — Brevo + Sheets envelope builder"
```

---

### Task 2: `api/lead.js` — HTTP handler

**Files:**
- Create: `api/lead.js`
- Create: `test/lead.test.js`

**Interfaces:**
- Consumes: `notifyLead(form, data, deps)` from `api/_lib/lead-notify.js` (Task 1).
- Produces: `createHandler(notify)` — factory used by tests to inject a fake
  `notify` function; `export default createHandler()` — the real handler
  Vercel invokes, using the real `notifyLead`.
- Produces: `KNOWN_FORMS` (exported array of the 5 valid `form` values).

- [ ] **Step 1: Write `api/lead.js`**

```js
import { notifyLead } from './_lib/lead-notify.js'

export const KNOWN_FORMS = [
  'bbs-newsletter',
  'bbs-enroll',
  'bbs-payment',
  'bbs-diagnostico-profesionales',
  'bbs-diagnostico-empresas',
]

export function createHandler(notify = notifyLead) {
  return async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' })
    }

    const { form, data } = req.body || {}
    if (!form || !KNOWN_FORMS.includes(form) || typeof data !== 'object' || data === null) {
      return res.status(400).json({ error: 'Missing or invalid "form"/"data".' })
    }

    const result = await notify(form, data)

    // El email es la garantía de "no perder el lead" — se trata como éxito
    // en cuanto uno de los dos canales funcione. Solo se reporta error duro
    // al usuario cuando AMBOS canales fallan.
    if (!result.emailOk && !result.sheetOk) {
      return res.status(502).json({ error: 'No pudimos procesar la solicitud.' })
    }

    return res.status(200).json({ ok: true, ...result })
  }
}

export default createHandler()
```

- [ ] **Step 2: Write the failing tests**

Create `test/lead.test.js`:

```js
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createHandler, KNOWN_FORMS } from '../api/lead.js'

function createMockRes() {
  return {
    statusCode: null,
    body: null,
    status(code) {
      this.statusCode = code
      return this
    },
    json(payload) {
      this.body = payload
      return this
    },
  }
}

test('KNOWN_FORMS has exactly the 5 BBS form types', () => {
  assert.deepEqual(KNOWN_FORMS, [
    'bbs-newsletter',
    'bbs-enroll',
    'bbs-payment',
    'bbs-diagnostico-profesionales',
    'bbs-diagnostico-empresas',
  ])
})

test('rejects non-POST methods with 405', async () => {
  const handler = createHandler(async () => ({ emailOk: true, sheetOk: true }))
  const res = createMockRes()
  await handler({ method: 'GET' }, res)
  assert.equal(res.statusCode, 405)
})

test('rejects a missing form with 400', async () => {
  const handler = createHandler(async () => ({ emailOk: true, sheetOk: true }))
  const res = createMockRes()
  await handler({ method: 'POST', body: { data: {} } }, res)
  assert.equal(res.statusCode, 400)
})

test('rejects an unknown form with 400', async () => {
  const handler = createHandler(async () => ({ emailOk: true, sheetOk: true }))
  const res = createMockRes()
  await handler({ method: 'POST', body: { form: 'not-real', data: {} } }, res)
  assert.equal(res.statusCode, 400)
})

test('rejects non-object data with 400', async () => {
  const handler = createHandler(async () => ({ emailOk: true, sheetOk: true }))
  const res = createMockRes()
  await handler({ method: 'POST', body: { form: 'bbs-newsletter', data: 'oops' } }, res)
  assert.equal(res.statusCode, 400)
})

test('returns 200 when at least one channel succeeds', async () => {
  const handler = createHandler(async () => ({ emailOk: true, sheetOk: false }))
  const res = createMockRes()
  await handler(
    { method: 'POST', body: { form: 'bbs-newsletter', data: { email: 'a@b.com' } } },
    res
  )
  assert.equal(res.statusCode, 200)
  assert.deepEqual(res.body, { ok: true, emailOk: true, sheetOk: false })
})

test('returns 502 when both channels fail', async () => {
  const handler = createHandler(async () => ({ emailOk: false, sheetOk: false }))
  const res = createMockRes()
  await handler(
    { method: 'POST', body: { form: 'bbs-newsletter', data: { email: 'a@b.com' } } },
    res
  )
  assert.equal(res.statusCode, 502)
})

test('passes form and data through to notify unchanged', async () => {
  let received = null
  const handler = createHandler(async (form, data) => {
    received = { form, data }
    return { emailOk: true, sheetOk: true }
  })
  const res = createMockRes()
  const data = { programa: 'capital-de-impacto', status: 'pending_checkout', pagina_origen: '/x' }
  await handler({ method: 'POST', body: { form: 'bbs-payment', data } }, res)
  assert.equal(received.form, 'bbs-payment')
  assert.deepEqual(received.data, data)
})
```

- [ ] **Step 3: Run the tests to verify they pass**

Run: `npm test`

Expected: all tests in both `test/lead-notify.test.js` and `test/lead.test.js`
PASS (18 tests total). If a `lead.test.js` assertion fails, fix
`api/lead.js`.

- [ ] **Step 4: Commit**

```bash
git add api/lead.js test/lead.test.js
git commit -m "feat(api): add /api/lead HTTP handler"
```

---

### Task 3: Adapt the 3 existing frontend call sites to `{ form, data }`

**Files:**
- Modify: `src/components/Footer.jsx`
- Modify: `src/components/programa/ProgramaCTA.jsx`
- Modify: `src/components/programa/usePaymentCta.js`

**Interfaces:**
- Consumes: the `{ form, data }` contract and `bbs-payment`'s `status`
  field established in Task 1/2 — no code from those tasks is imported
  here (these are separate frontend/backend runtimes), but the payload
  shape must match exactly what `api/lead.js` validates and
  `buildEnvelope` reads.

This repo has no test framework for React components (established in
subsystems 1 and 2) — verification for this task is `npm run build` +
manual read-back of the diff, matching prior subsystems' convention.

- [ ] **Step 1: Update `src/components/Footer.jsx`**

In `NewsletterForm`'s `handleSubmit`, change the `fetch` call's `body`.

Before:
```js
        body: JSON.stringify({ form: 'bbs-newsletter', email, pagina_origen: window.location.pathname }),
```

After:
```js
        body: JSON.stringify({
          form: 'bbs-newsletter',
          data: { email, pagina_origen: window.location.pathname },
        }),
```

- [ ] **Step 2: Update `src/components/programa/ProgramaCTA.jsx`**

In `InlineEnrollForm`'s `handleSubmit`, change the `fetch` call's `body`.

Before:
```js
        body: JSON.stringify({
          form: 'bbs-enroll',
          programa: programa.slug,
          nombre: values.nombre,
          email: values.email,
          whatsapp: values.whatsapp,
          pagina_origen: window.location.pathname,
        }),
```

After:
```js
        body: JSON.stringify({
          form: 'bbs-enroll',
          data: {
            programa: programa.slug,
            nombre: values.nombre,
            email: values.email,
            whatsapp: values.whatsapp,
            pagina_origen: window.location.pathname,
          },
        }),
```

- [ ] **Step 3: Update `src/components/programa/usePaymentCta.js`**

In `handleClick`, change both the `trackCta` call's form-id string (for
consistency with the new form name) and the `fetch` call's `body`.

Before:
```js
  async function handleClick() {
    trackCta(`programa_${programa.slug}_pagar`, 'programa_cta', programa.mercadopagoUrl || 'pending')

    if (programa.mercadopagoUrl) {
      window.location.href = programa.mercadopagoUrl
      return
    }

    setStatus('loading')
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          form: 'bbs-enroll',
          programa: programa.slug,
          intento_pago: true,
          pagina_origen: window.location.pathname,
        }),
      })
      if (!res.ok) throw new Error('request_failed')
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }
```

After:
```js
  async function handleClick() {
    trackCta(`programa_${programa.slug}_pagar`, 'programa_cta', programa.mercadopagoUrl || 'pending')

    if (programa.mercadopagoUrl) {
      window.location.href = programa.mercadopagoUrl
      return
    }

    setStatus('loading')
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          form: 'bbs-payment',
          data: {
            programa: programa.slug,
            status: 'pending_checkout',
            pagina_origen: window.location.pathname,
          },
        }),
      })
      if (!res.ok) throw new Error('request_failed')
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }
```

Nothing else in this file changes — the `status` state variable used for UI
(`idle/loading/sent/error`) is a separate, pre-existing concern from the new
`status: 'pending_checkout'` field now sent inside `data`; do not conflate
them.

- [ ] **Step 4: Run the build to verify nothing broke**

Run: `npm run build`

Expected: succeeds with the same module/chunk output as before this task
(no new warnings, no errors).

- [ ] **Step 5: Commit**

```bash
git add src/components/Footer.jsx src/components/programa/ProgramaCTA.jsx src/components/programa/usePaymentCta.js
git commit -m "refactor(leads): adapt frontend call sites to { form, data } contract"
```

---

### Task 4: `.env.local.example` + final wiring verification

**Files:**
- Create: `.env.local.example`

**Interfaces:**
- Consumes: nothing new — this task verifies Tasks 1–3 together.

- [ ] **Step 1: Create `.env.local.example`**

```bash
# Backend de leads (/api/lead) — variables ya cargadas en Vercel
# (Production, Preview, Development). Esta plantilla es solo referencia
# para desarrollo local; no contiene valores reales, no se pegan secretos
# en este archivo.

BREVO_API_KEY=
NOTIFICATION_EMAIL=
GOOGLE_SERVICE_ACCOUNT_EMAIL=
GOOGLE_PRIVATE_KEY=
GOOGLE_SHEET_ID=
```

- [ ] **Step 2: Run the full test suite**

Run: `npm test`

Expected: all 18 tests pass (10 from `test/lead-notify.test.js`, 8 from
`test/lead.test.js`).

- [ ] **Step 3: Run the build**

Run: `npm run build`

Expected: succeeds, same as Task 3's check (the `api/` directory doesn't
participate in the Vite build — this confirms the frontend changes didn't
regress anything else).

- [ ] **Step 4: Grep-verify no `/api/lead` call site still uses the old flat payload shape**

Run: `grep -n "form: 'bbs-" src/components/Footer.jsx src/components/programa/ProgramaCTA.jsx src/components/programa/usePaymentCta.js`

Expected output: 3 matches (one `form:` key per file), each immediately
followed on a later line by `data: {` in the same object literal — confirms
Task 3 left no call site sending a flat (un-nested) payload.

- [ ] **Step 5: Grep-verify no secret is hardcoded anywhere in `api/`**

Run: `grep -rn "BREVO_API_KEY\|GOOGLE_PRIVATE_KEY\|GOOGLE_SERVICE_ACCOUNT_EMAIL\|GOOGLE_SHEET_ID\|NOTIFICATION_EMAIL" api/`

Expected: every match is a `process.env.<NAME>` read inside
`api/_lib/lead-notify.js` — no literal key/email/ID value assigned to any
of these names.

- [ ] **Step 6: Commit**

```bash
git add .env.local.example
git commit -m "chore(leads): add .env.local.example for /api/lead"
```

---

## Notes for the final reviewer (not a task — context only)

- **Not verifiable without live credentials/deploy:** a real Brevo email
  delivering to `NOTIFICATION_EMAIL`, and a real row landing in the
  `bbs-web-leads` spreadsheet, both require the actual Vercel-deployed
  environment (this plan's tests inject fakes for `sendBrevoEmail`/
  `appendSheetRow` precisely because no local credential exists to call
  the real APIs). Per spec §9, that end-to-end confirmation happens after
  deploy, coordinated with Eddie — it is out of scope for task review.
- **`GOOGLE_SERVICE_ACCOUNT_EMAIL` naming:** the spec flags a prior typo in
  this Vercel env var name (now corrected). Nothing in this plan can verify
  the deployed value — confirm by checking Vercel's dashboard directly, or
  by watching for a `[lead-notify] Google Sheets not configured` log line
  in production despite the var appearing set.
- **Diagnostic forms' schema is provisional** (spec §5, §11) —
  `bbs-diagnostico-profesionales`/`bbs-diagnostico-empresas` have no
  frontend caller yet (subsystem 4). Task 1's `buildEnvelope` cases for
  them are forward-provisioned per Eddie's explicit request; expect them to
  be revisited once subsystem 4 is brainstormed.
