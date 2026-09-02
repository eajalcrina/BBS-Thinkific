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

    if (!tab || !segmento || score === undefined || score === '' || Number.isNaN(scoreNum)) {
      return res.status(400).json({ error: 'Missing or invalid "tipo"/"segmento"/"score".' })
    }

    // Todo lo que sigue nunca debe tirar un error duro — cualquier falla en
    // la lectura o en el cómputo se degrada a "insufficientData" en vez de
    // propagar una excepción o, peor, un percentil calculado sobre datos
    // corruptos.
    try {
      const rowsRaw = await readValues(tab)
      const rows = Array.isArray(rowsRaw) ? rowsRaw : []

      const scores = rows
        .slice(1) // la primera fila son encabezados
        .filter(row => row[SEGMENTO_COL] === segmento)
        // Una celda vacía ('' o undefined) es "sin score", no un score de 0
        // — Number('') === 0 la contaría como un cero real y sesgaría el
        // percentil, exactamente lo que este endpoint existe para evitar.
        .map(row => (row[SCORE_COL] === '' || row[SCORE_COL] == null ? NaN : Number(row[SCORE_COL])))
        .filter(n => !Number.isNaN(n))

      if (scores.length < MIN_SAMPLE_SIZE) {
        return res.status(200).json({ insufficientData: true, muestraTotal: scores.length })
      }

      const menores = scores.filter(s => s < scoreNum).length
      const percentil = Math.round((menores / scores.length) * 100)

      return res.status(200).json({ percentil, muestraTotal: scores.length })
    } catch (err) {
      console.error('[diagnostico-stats] failed to compute percentile', err)
      return res.status(200).json({ insufficientData: true, muestraTotal: 0 })
    }
  }
}

export default createHandler()
