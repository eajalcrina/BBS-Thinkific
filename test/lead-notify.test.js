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
