import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  QUESTIONS,
  SECTOR_QUESTION,
  calcularResultado,
} from '../src/data/diagnosticoEmpresas.js'

test('QUESTIONS has exactly 9 scored questions, each with 4 options valued 0-3', () => {
  assert.equal(QUESTIONS.length, 9)
  for (const q of QUESTIONS) {
    assert.equal(q.opciones.length, 4)
    assert.deepEqual(q.opciones.map(o => o.valor), [0, 1, 2, 3])
  }
})

test('SECTOR_QUESTION has 4 options, exactly one mapping to sector "industria"', () => {
  assert.equal(SECTOR_QUESTION.opciones.length, 4)
  const industriaCount = SECTOR_QUESTION.opciones.filter(o => o.sector === 'industria').length
  assert.equal(industriaCount, 1)
  const generalCount = SECTOR_QUESTION.opciones.filter(o => o.sector === 'general').length
  assert.equal(generalCount, 3)
})

function allZero(ids) {
  return Object.fromEntries(ids.map(id => [id, 0]))
}
function allMax(ids) {
  return Object.fromEntries(ids.map(id => [id, 3]))
}

const TODAS_LAS_PREGUNTAS_IDS = ['m1', 'm2', 'm3', 'n1', 'n2', 'n3', 'c1', 'c2', 'c3']

test('calcularResultado: all-zero answers, sector general, routes to marca (tie-break priority)', () => {
  const r = calcularResultado(allZero(TODAS_LAS_PREGUNTAS_IDS), 'general')
  assert.equal(r.marcaScore, 0)
  assert.equal(r.negocioScore, 0)
  assert.equal(r.capitalScore, 0)
  assert.equal(r.scoreTotal, 0)
  assert.equal(r.scoreMax, 27)
  assert.equal(r.resultado, 'marca')
})

test('calcularResultado: sector industria always wins, regardless of dimension scores', () => {
  const r = calcularResultado(allMax(TODAS_LAS_PREGUNTAS_IDS), 'industria')
  assert.equal(r.resultado, 'industria')
  assert.equal(r.contenido.programaSlug, 'economia-circular-industria')
})

test('calcularResultado: lowest dimension wins when there is no tie', () => {
  const respuestas = {
    m1: 3, m2: 3, m3: 3, // marca = 9
    n1: 1, n2: 1, n3: 1, // negocio = 3 (lowest)
    c1: 3, c2: 2, c3: 3, // capital = 8
  }
  const r = calcularResultado(respuestas, 'general')
  assert.equal(r.marcaScore, 9)
  assert.equal(r.negocioScore, 3)
  assert.equal(r.capitalScore, 8)
  assert.equal(r.resultado, 'negocio')
  assert.equal(r.contenido.programaSlug, 'negocios-regenerativos')
})

test('calcularResultado: tie between negocio and capital breaks toward negocio', () => {
  const respuestas = {
    m1: 3, m2: 3, m3: 3, // marca = 9
    n1: 1, n2: 1, n3: 1, // negocio = 3
    c1: 1, c2: 1, c3: 1, // capital = 3 (tied with negocio)
  }
  const r = calcularResultado(respuestas, 'general')
  assert.equal(r.negocioScore, 3)
  assert.equal(r.capitalScore, 3)
  assert.equal(r.resultado, 'negocio')
})

test('calcularResultado: secundario capital appears when capitalScore <= 3 and capital is not primary', () => {
  const respuestas = {
    m1: 0, m2: 0, m3: 0, // marca = 0 (lowest, primary)
    n1: 3, n2: 3, n3: 3, // negocio = 9
    c1: 1, c2: 1, c3: 1, // capital = 3 (<=3, triggers secundario)
  }
  const r = calcularResultado(respuestas, 'general')
  assert.equal(r.resultado, 'marca')
  assert.equal(r.secundario, 'capital')
  assert.equal(r.contenidoSecundario.programaSlug, 'capital-de-impacto')
})

test('calcularResultado: no secundario when capitalScore is above the threshold', () => {
  const respuestas = {
    m1: 0, m2: 0, m3: 0, // marca = 0 (primary)
    n1: 3, n2: 3, n3: 3,
    c1: 2, c2: 1, c3: 1, // capital = 4 (above the <=3 threshold)
  }
  const r = calcularResultado(respuestas, 'general')
  assert.equal(r.resultado, 'marca')
  assert.equal(r.secundario, null)
  assert.equal(r.contenidoSecundario, null)
})

test('calcularResultado: no secundario when capital is already the primary result', () => {
  const respuestas = {
    m1: 3, m2: 3, m3: 3,
    n1: 3, n2: 3, n3: 3,
    c1: 0, c2: 0, c3: 0, // capital = 0, both primary AND under the threshold
  }
  const r = calcularResultado(respuestas, 'general')
  assert.equal(r.resultado, 'capital')
  assert.equal(r.secundario, null)
})

test('calcularResultado: dimension percentages and lecturas match the score tercios', () => {
  const respuestas = {
    m1: 3, m2: 0, m3: 0, // marca = 3 -> brecha real, 33%
    n1: 2, n2: 2, n3: 2, // negocio = 6 -> en desarrollo, 67%
    c1: 3, c2: 3, c3: 3, // capital = 9 -> solido, 100%
  }
  const r = calcularResultado(respuestas, 'general')
  assert.deepEqual(r.dimensiones, [
    { nombre: 'Marca', porcentaje: 33, lectura: 'Tu marca aún no comunica lo que te hace distinto.' },
    { nombre: 'Negocio', porcentaje: 67, lectura: 'Tienes estructura básica — falta consolidarla.' },
    { nombre: 'Capital', porcentaje: 100, lectura: 'Tu preparación para levantar capital ya es competitiva.' },
  ])
})

test('calcularResultado: a missing answer counts as 0, never crashes', () => {
  const r = calcularResultado({ m1: 3 }, 'general')
  assert.equal(r.marcaScore, 3)
  assert.equal(r.negocioScore, 0)
  assert.equal(r.capitalScore, 0)
})
