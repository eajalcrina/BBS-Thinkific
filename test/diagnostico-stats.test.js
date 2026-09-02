import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createHandler } from '../api/diagnostico-stats.js'

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

function headerRow() {
  return ['timestamp', 'nombre', 'email', 'whatsapp', 'segmento', 'experiencia', 'score', 'scoreMax', 'nivel', 'pagina_origen']
}

function dataRow(segmento, score) {
  return ['2026-09-01', 'Test', 'test@example.com', '', segmento, '5-15', String(score), '21', 'Nivel', '/diagnostico/profesionales']
}

test('rejects non-GET methods with 405', async () => {
  const handler = createHandler(async () => [])
  const res = createMockRes()
  await handler({ method: 'POST', query: {} }, res)
  assert.equal(res.statusCode, 405)
})

test('rejects missing tipo/segmento/score with 400', async () => {
  const handler = createHandler(async () => [])
  const res = createMockRes()
  await handler({ method: 'GET', query: { tipo: 'profesionales', segmento: 'junior' } }, res)
  assert.equal(res.statusCode, 400)
})

test('rejects an unknown tipo with 400', async () => {
  const handler = createHandler(async () => [])
  const res = createMockRes()
  await handler({ method: 'GET', query: { tipo: 'no-existe', segmento: 'junior', score: '10' } }, res)
  assert.equal(res.statusCode, 400)
})

test('returns insufficientData with fewer than 20 matching rows', async () => {
  const rows = [headerRow(), dataRow('junior', 5), dataRow('junior', 10), dataRow('senior', 20)]
  const handler = createHandler(async () => rows)
  const res = createMockRes()
  await handler({ method: 'GET', query: { tipo: 'profesionales', segmento: 'junior', score: '8' } }, res)
  assert.equal(res.statusCode, 200)
  assert.equal(res.body.insufficientData, true)
  assert.equal(res.body.muestraTotal, 2)
})

test('computes a real percentile with 20+ matching rows, filtered by segmento', async () => {
  const rows = [headerRow()]
  // 19 junior rows scoring 0, 1 junior row scoring 20 => 20 junior rows total
  for (let i = 0; i < 19; i++) rows.push(dataRow('junior', 0))
  rows.push(dataRow('junior', 20))
  // decoy senior rows must never affect the junior calculation
  for (let i = 0; i < 25; i++) rows.push(dataRow('senior', 0))

  const handler = createHandler(async () => rows)
  const res = createMockRes()
  await handler({ method: 'GET', query: { tipo: 'profesionales', segmento: 'junior', score: '20' } }, res)
  assert.equal(res.statusCode, 200)
  assert.equal(res.body.insufficientData, undefined)
  assert.equal(res.body.muestraTotal, 20)
  assert.equal(res.body.percentil, 95) // beats 19 of 20 => round(19/20*100) = 95
})

test('exactly 19 matching rows is still insufficientData (boundary just below the threshold)', async () => {
  const rows = [headerRow()]
  for (let i = 0; i < 19; i++) rows.push(dataRow('junior', i))

  const handler = createHandler(async () => rows)
  const res = createMockRes()
  await handler({ method: 'GET', query: { tipo: 'profesionales', segmento: 'junior', score: '10' } }, res)
  assert.equal(res.statusCode, 200)
  assert.equal(res.body.insufficientData, true)
  assert.equal(res.body.muestraTotal, 19)
})

test('rejects an empty score with 400 instead of silently treating it as 0', async () => {
  const handler = createHandler(async () => [])
  const res = createMockRes()
  await handler({ method: 'GET', query: { tipo: 'profesionales', segmento: 'junior', score: '' } }, res)
  assert.equal(res.statusCode, 400)
})

test('degrades to insufficientData if readValues resolves with something other than an array', async () => {
  const handler = createHandler(async () => null)
  const res = createMockRes()
  await handler({ method: 'GET', query: { tipo: 'profesionales', segmento: 'junior', score: '10' } }, res)
  assert.equal(res.statusCode, 200)
  assert.equal(res.body.insufficientData, true)
  assert.equal(res.body.muestraTotal, 0)
})

test('an empty score cell in a stored row is excluded from the sample, not counted as a zero', async () => {
  const rows = [headerRow()]
  for (let i = 0; i < 19; i++) rows.push(dataRow('junior', 10))
  // one row with a genuinely empty score cell (e.g. a malformed /api/lead
  // submission that omitted `score`) — must not be silently treated as 0
  rows.push(['2026-09-01', 'Test', 'test@example.com', '', 'junior', '5-15', '', '21', 'Nivel', '/diagnostico/profesionales'])

  const handler = createHandler(async () => rows)
  const res = createMockRes()
  await handler({ method: 'GET', query: { tipo: 'profesionales', segmento: 'junior', score: '10' } }, res)
  assert.equal(res.statusCode, 200)
  // Only 19 of the 20 rows have a real score — still below the threshold.
  assert.equal(res.body.insufficientData, true)
  assert.equal(res.body.muestraTotal, 19)
})

test('a tied score does not count as "beaten" — percentile uses strictly-less-than', async () => {
  const rows = [headerRow()]
  for (let i = 0; i < 15; i++) rows.push(dataRow('junior', 5)) // ties with the query
  for (let i = 0; i < 5; i++) rows.push(dataRow('junior', 20)) // strictly higher

  const handler = createHandler(async () => rows)
  const res = createMockRes()
  await handler({ method: 'GET', query: { tipo: 'profesionales', segmento: 'junior', score: '5' } }, res)
  assert.equal(res.statusCode, 200)
  assert.equal(res.body.muestraTotal, 20)
  // 0 of 20 scored strictly less than 5 (15 tie, 5 are higher) => 0th percentile
  assert.equal(res.body.percentil, 0)
})

test('never hard-errors when readValues throws — returns insufficientData instead', async () => {
  const handler = createHandler(async () => {
    throw new Error('Sheets down')
  })
  const res = createMockRes()
  await handler({ method: 'GET', query: { tipo: 'profesionales', segmento: 'junior', score: '10' } }, res)
  assert.equal(res.statusCode, 200)
  assert.equal(res.body.insufficientData, true)
  assert.equal(res.body.muestraTotal, 0)
})
