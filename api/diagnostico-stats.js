import { getSheetValues } from './_lib/lead-notify.js'

const TAB_BY_TIPO = {
  profesionales: 'Diagnóstico Profesionales',
}

const MIN_SAMPLE_SIZE = 20
const SEGMENTO_COL = 4
const SCORE_COL = 5

export function createHandler(readValues = getSheetValues) {
  return async function handler(req, res) {
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' })
    }

    const { tipo, segmento, score } = req.query || {}
    const tab = TAB_BY_TIPO[tipo]
    const scoreNum = Number(score)

    if (!tab || !segmento || Number.isNaN(scoreNum)) {
      return res.status(400).json({ error: 'Missing or invalid "tipo"/"segmento"/"score".' })
    }

    let rows
    try {
      rows = await readValues(tab)
    } catch (err) {
      console.error('[diagnostico-stats] readValues threw', err)
      rows = []
    }

    const scores = (rows || [])
      .slice(1) // la primera fila son encabezados
      .filter(row => row[SEGMENTO_COL] === segmento)
      .map(row => Number(row[SCORE_COL]))
      .filter(n => !Number.isNaN(n))

    if (scores.length < MIN_SAMPLE_SIZE) {
      return res.status(200).json({ insufficientData: true, muestraTotal: scores.length })
    }

    const menores = scores.filter(s => s < scoreNum).length
    const percentil = Math.round((menores / scores.length) * 100)

    return res.status(200).json({ percentil, muestraTotal: scores.length })
  }
}

export default createHandler()
