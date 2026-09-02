import { test } from 'node:test'
import assert from 'node:assert/strict'
import { buildEnvelope, notifyLead, sendBrevoEmail, appendSheetRow, getSheetValues } from '../api/_lib/lead-notify.js'

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
    segmento: 'senior',
    experiencia: 'mas-15',
    score: 17,
    scoreMax: 24,
    nivel: 'Liderando la multiplicación',
    pagina_origen: '/diagnostico/profesionales',
  })
  assert.equal(env.emailSubject, 'Diagnóstico Profesionales — Luis — Liderando la multiplicación')
  assert.equal(env.sheetTab, 'Diagnóstico Profesionales')
  assert.deepEqual(env.sheetRow.slice(1), [
    'Luis',
    'luis@example.com',
    '+51999888777',
    'senior',
    'mas-15',
    17,
    24,
    'Liderando la multiplicación',
    '/diagnostico/profesionales',
  ])
})

test('buildEnvelope: bbs-diagnostico-profesionales rejects an unknown segmento (writes empty, not the raw value)', () => {
  const env = buildEnvelope('bbs-diagnostico-profesionales', {
    nombre: 'Ana',
    segmento: 'no-es-un-segmento-real',
    score: 999,
    scoreMax: 999,
    pagina_origen: '/diagnostico/profesionales',
  })
  // índices de sheetRow: ts(0) nombre(1) email(2) whatsapp(3) segmento(4) experiencia(5) score(6) scoreMax(7) nivel(8) pagina_origen(9)
  assert.equal(env.sheetRow[4], '')
  assert.equal(env.sheetRow[6], '')
  assert.equal(env.sheetRow[7], '')
})

test('buildEnvelope: bbs-diagnostico-profesionales rejects a score outside the segmento\'s real range', () => {
  const env = buildEnvelope('bbs-diagnostico-profesionales', {
    nombre: 'Ana',
    segmento: 'junior', // max real es 21
    score: 50,
    scoreMax: 21,
    pagina_origen: '/diagnostico/profesionales',
  })
  // El segmento en sí era válido, se conserva para poder auditar la fila —
  // solo score/scoreMax se descartan, que es lo que corrompería el percentil.
  assert.equal(env.sheetRow[4], 'junior')
  assert.equal(env.sheetRow[6], '')
  assert.equal(env.sheetRow[7], '')
})

test('buildEnvelope: bbs-diagnostico-profesionales rejects a scoreMax that does not match the segmento', () => {
  const env = buildEnvelope('bbs-diagnostico-profesionales', {
    nombre: 'Ana',
    segmento: 'junior',
    score: 10,
    scoreMax: 24, // 24 es el máximo de senior, no de junior — payload inconsistente
    pagina_origen: '/diagnostico/profesionales',
  })
  assert.equal(env.sheetRow[4], 'junior')
  assert.equal(env.sheetRow[6], '')
  assert.equal(env.sheetRow[7], '')
})

test('buildEnvelope: bbs-diagnostico-profesionales rejects an unknown experiencia (writes empty, not the raw value)', () => {
  const env = buildEnvelope('bbs-diagnostico-profesionales', {
    nombre: 'Ana',
    segmento: 'senior',
    experiencia: 'algo-inventado',
    score: 10,
    scoreMax: 24,
    pagina_origen: '/diagnostico/profesionales',
  })
  // segmento/score/scoreMax son válidos e independientes de experiencia —
  // solo la columna experiencia se descarta.
  assert.equal(env.sheetRow[4], 'senior')
  assert.equal(env.sheetRow[5], '')
  assert.equal(env.sheetRow[6], 10)
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

test('buildEnvelope: truncates an oversized field instead of passing it through', () => {
  const longValue = 'x'.repeat(10000)
  const env = buildEnvelope('bbs-newsletter', { email: longValue, pagina_origen: '/' })
  assert.equal(env.sheetRow[1].length, 500)
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

test('sendBrevoEmail: returns false without throwing when BREVO_API_KEY is unset', async () => {
  const original = process.env.BREVO_API_KEY
  delete process.env.BREVO_API_KEY
  try {
    const result = await sendBrevoEmail('subject', '<p>html</p>')
    assert.equal(result, false)
  } finally {
    if (original !== undefined) process.env.BREVO_API_KEY = original
  }
})

test('appendSheetRow: returns false without throwing when GOOGLE_SHEET_ID is unset', async () => {
  const original = process.env.GOOGLE_SHEET_ID
  delete process.env.GOOGLE_SHEET_ID
  try {
    const result = await appendSheetRow('SomeTab', ['a', 'b'])
    assert.equal(result, false)
  } finally {
    if (original !== undefined) process.env.GOOGLE_SHEET_ID = original
  }
})

test('getSheetValues: returns [] without throwing when GOOGLE_SHEET_ID is unset', async () => {
  const original = process.env.GOOGLE_SHEET_ID
  delete process.env.GOOGLE_SHEET_ID
  try {
    const result = await getSheetValues('SomeTab')
    assert.deepEqual(result, [])
  } finally {
    if (original !== undefined) process.env.GOOGLE_SHEET_ID = original
  }
})

