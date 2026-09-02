import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  SEGMENTO_QUESTION,
  JUNIOR_QUESTIONS,
  SENIOR_QUESTIONS,
  calcularResultado,
} from '../src/data/diagnosticoProfesionales.js'

test('SEGMENTO_QUESTION has exactly the junior/senior split', () => {
  assert.equal(SEGMENTO_QUESTION.opciones.length, 2)
  assert.equal(SEGMENTO_QUESTION.opciones[0].segmento, 'junior')
  assert.equal(SEGMENTO_QUESTION.opciones[1].segmento, 'senior')
})

test('JUNIOR_QUESTIONS has exactly 7 questions, each with 4 options valued 0-3', () => {
  assert.equal(JUNIOR_QUESTIONS.length, 7)
  for (const q of JUNIOR_QUESTIONS) {
    assert.equal(q.opciones.length, 4)
    assert.deepEqual(q.opciones.map(o => o.valor), [0, 1, 2, 3])
  }
})

test('SENIOR_QUESTIONS has exactly 8 questions, each with 4 options valued 0-3', () => {
  assert.equal(SENIOR_QUESTIONS.length, 8)
  for (const q of SENIOR_QUESTIONS) {
    assert.equal(q.opciones.length, 4)
    assert.deepEqual(q.opciones.map(o => o.valor), [0, 1, 2, 3])
  }
})

function allZero(ids) {
  return Object.fromEntries(ids.map(id => [id, 0]))
}
function allMax(ids) {
  return Object.fromEntries(ids.map(id => [id, 3]))
}

test('calcularResultado: junior minimum score (0) lands in Techo de cristal activo', () => {
  const r = calcularResultado('junior', allZero(['j1', 'j2', 'j3', 'j4', 'j5', 'j6', 'j7']))
  assert.equal(r.score, 0)
  assert.equal(r.scoreMax, 21)
  assert.equal(r.nivel, 'Techo de cristal activo')
})

test('calcularResultado: junior boundary score 6 still Techo de cristal activo, 7 is En construcción', () => {
  const respuestas6 = { j1: 3, j2: 3, ...allZero(['j3', 'j4', 'j5', 'j6', 'j7']) }
  assert.equal(calcularResultado('junior', respuestas6).score, 6)
  assert.equal(calcularResultado('junior', respuestas6).nivel, 'Techo de cristal activo')

  const respuestas7 = { j1: 3, j2: 3, j3: 1, ...allZero(['j4', 'j5', 'j6', 'j7']) }
  assert.equal(calcularResultado('junior', respuestas7).score, 7)
  assert.equal(calcularResultado('junior', respuestas7).nivel, 'En construcción')
})

test('calcularResultado: junior boundary score 14 vs 15', () => {
  const r14 = calcularResultado('junior', { j1: 3, j2: 3, j3: 3, j4: 3, j5: 2, j6: 0, j7: 0 })
  assert.equal(r14.score, 14)
  assert.equal(r14.nivel, 'En construcción')

  const r15 = calcularResultado('junior', { j1: 3, j2: 3, j3: 3, j4: 3, j5: 3, j6: 0, j7: 0 })
  assert.equal(r15.score, 15)
  assert.equal(r15.nivel, 'Liderando el cambio')
})

test('calcularResultado: junior maximum score (21) is Liderando el cambio', () => {
  const r = calcularResultado('junior', allMax(['j1', 'j2', 'j3', 'j4', 'j5', 'j6', 'j7']))
  assert.equal(r.score, 21)
  assert.equal(r.nivel, 'Liderando el cambio')
  assert.equal(r.contenido.programaSlug, 'ia-nuevos-profesionales')
})

test('calcularResultado: junior dimension percentages', () => {
  const r = calcularResultado('junior', { j1: 3, j2: 3, j3: 3, j4: 0, j5: 0, j6: 0, j7: 0 })
  assert.deepEqual(r.dimensiones, [
    { nombre: 'Criterio propio', porcentaje: 100 },
    { nombre: 'Aprendizaje activo', porcentaje: 0 },
    { nombre: 'Proyección de crecimiento', porcentaje: 0 },
  ])
})

test('calcularResultado: senior minimum score (0) lands in Experiencia en riesgo de invisibilidad', () => {
  const r = calcularResultado('senior', allZero(['s1', 's2', 's3', 's4', 's5', 's6', 's7', 's8']))
  assert.equal(r.score, 0)
  assert.equal(r.scoreMax, 24)
  assert.equal(r.nivel, 'Experiencia en riesgo de invisibilidad')
})

test('calcularResultado: senior boundary score 8 vs 9', () => {
  const r8 = calcularResultado('senior', { s1: 3, s2: 3, s3: 2, ...allZero(['s4', 's5', 's6', 's7', 's8']) })
  assert.equal(r8.score, 8)
  assert.equal(r8.nivel, 'Experiencia en riesgo de invisibilidad')

  const r9 = calcularResultado('senior', { s1: 3, s2: 3, s3: 3, ...allZero(['s4', 's5', 's6', 's7', 's8']) })
  assert.equal(r9.score, 9)
  assert.equal(r9.nivel, 'Multiplicando, pero no del todo')
})

test('calcularResultado: senior boundary score 16 vs 17', () => {
  const r16 = calcularResultado('senior', { s1: 3, s2: 3, s3: 3, s4: 3, s5: 3, s6: 1, s7: 0, s8: 0 })
  assert.equal(r16.score, 16)
  assert.equal(r16.nivel, 'Multiplicando, pero no del todo')

  const r17 = calcularResultado('senior', { s1: 3, s2: 3, s3: 3, s4: 3, s5: 3, s6: 2, s7: 0, s8: 0 })
  assert.equal(r17.score, 17)
  assert.equal(r17.nivel, 'Liderando la multiplicación')
})

test('calcularResultado: senior maximum score (24) is Liderando la multiplicación', () => {
  const r = calcularResultado('senior', allMax(['s1', 's2', 's3', 's4', 's5', 's6', 's7', 's8']))
  assert.equal(r.score, 24)
  assert.equal(r.nivel, 'Liderando la multiplicación')
  assert.equal(r.contenido.programaSlug, 'ia-profesionales-senior')
})

test('calcularResultado: senior dimension percentages', () => {
  const r = calcularResultado('senior', { s1: 3, s2: 3, s3: 0, s4: 0, s5: 0, s6: 0, s7: 0, s8: 0 })
  assert.deepEqual(r.dimensiones, [
    { nombre: 'Amplificación de criterio', porcentaje: 100 },
    { nombre: 'Sistematización y mentoría', porcentaje: 0 },
    { nombre: 'Posicionamiento y visibilidad', porcentaje: 0 },
    { nombre: 'Proyección de independencia', porcentaje: 0 },
  ])
})

test('calcularResultado: a missing answer counts as 0, never crashes', () => {
  const r = calcularResultado('junior', { j1: 3 })
  assert.equal(r.score, 3)
})
