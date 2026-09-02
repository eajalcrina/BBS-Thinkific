import { JWT } from 'google-auth-library'

const EMAIL_FROM = 'biobusiness@redesignlab.org'

function nowLima() {
  return new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' })
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function renderFieldsHtml(fields) {
  const rows = fields
    .map(
      ([label, value]) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#666;">${escapeHtml(label)}</td><td style="padding:4px 0;">${escapeHtml(value)}</td></tr>`
    )
    .join('')
  return `<table style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">${rows}</table>`
}

const MAX_FIELD_LENGTH = 500

function sanitizeData(data) {
  const clean = {}
  for (const [key, value] of Object.entries(data || {})) {
    clean[key] = typeof value === 'string' && value.length > MAX_FIELD_LENGTH
      ? value.slice(0, MAX_FIELD_LENGTH)
      : value
  }
  return clean
}

// /api/diagnostico-stats calcula un percentil real leyendo estas mismas
// filas — un `segmento`/`score` fuera de contrato (POST directo al
// endpoint, no a través del quiz) escribiría un dato que después se
// presenta como comparación real a otro usuario. Un `segmento`/`score`
// inválido se guarda vacío en vez del valor recibido, para que ese
// endpoint los descarte de la muestra igual que hace con una celda vacía.
const DIAGNOSTICO_SCORE_MAX = { junior: 21, senior: 24 }
const EXPERIENCIA_VALUES = ['menos-5', '5-15', 'mas-15']

function sanitizeExperiencia(experiencia) {
  return EXPERIENCIA_VALUES.includes(experiencia) ? experiencia : ''
}

function sanitizeDiagnosticoResult(segmento, score, scoreMax) {
  const maxEsperado = DIAGNOSTICO_SCORE_MAX[segmento]
  if (!maxEsperado) return { segmento: '', score: '', scoreMax: '' }

  const scoreNum = Number(score)
  const scoreMaxNum = Number(scoreMax)
  const valido = Number.isInteger(scoreNum) && scoreNum >= 0 && scoreNum <= maxEsperado && scoreMaxNum === maxEsperado

  return {
    segmento,
    score: valido ? scoreNum : '',
    scoreMax: valido ? scoreMaxNum : '',
  }
}

export function buildEnvelope(form, data) {
  data = sanitizeData(data)
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

    case 'bbs-diagnostico-profesionales': {
      const { segmento, score, scoreMax } = sanitizeDiagnosticoResult(data.segmento, data.score, data.scoreMax)
      const experiencia = sanitizeExperiencia(data.experiencia)
      return {
        emailSubject: `Diagnóstico Profesionales — ${data.nombre || 'sin nombre'} — ${data.nivel || 'sin nivel'}`,
        emailFields: [
          ['Nombre', data.nombre],
          ['Email', data.email],
          ['WhatsApp', data.whatsapp],
          ['Segmento', segmento],
          ['Experiencia', experiencia],
          ['Score', `${score}/${scoreMax}`],
          ['Nivel', data.nivel],
          ['Página de origen', data.pagina_origen],
        ],
        sheetTab: 'Diagnóstico Profesionales',
        sheetRow: [
          ts,
          data.nombre || '',
          data.email || '',
          data.whatsapp || '',
          segmento,
          experiencia,
          score,
          scoreMax,
          data.nivel || '',
          data.pagina_origen || '',
        ],
      }
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

export async function sendBrevoEmail(subject, html) {
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

export async function appendSheetRow(tabName, values) {
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
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`,
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


export async function getSheetValues(tabName) {
  const sheetId = process.env.GOOGLE_SHEET_ID
  const client = getSheetsClient()
  if (!sheetId || !client) {
    console.warn('[lead-notify] Google Sheets not configured — skipping row read.')
    return []
  }

  try {
    const { token } = await client.getAccessToken()
    const range = encodeURIComponent(`${tabName}!A:Z`)
    const res = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
    if (!res.ok) {
      console.error('[lead-notify] Sheets read failed', res.status, await res.text().catch(() => ''))
      return []
    }
    const body = await res.json()
    return body.values || []
  } catch (err) {
    console.error('[lead-notify] Sheets read threw', err)
    return []
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
