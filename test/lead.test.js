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
