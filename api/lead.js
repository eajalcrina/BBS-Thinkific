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
