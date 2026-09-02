import { useState } from 'react'
import Nav from '../components/Nav.jsx'
import Footer from '../components/Footer.jsx'
import PantallaBienvenida from '../components/diagnostico/PantallaBienvenida.jsx'
import PreguntaScreen from '../components/diagnostico/PreguntaScreen.jsx'
import CapturaDatos from '../components/diagnostico/CapturaDatos.jsx'
import PantallaTransicion from '../components/diagnostico/PantallaTransicion.jsx'
import PantallaResultado from '../components/diagnostico/PantallaResultado.jsx'
import { trackCta, trackForm } from '../lib/analytics.js'
import { SEGMENTO_QUESTION, JUNIOR_QUESTIONS, SENIOR_QUESTIONS, calcularResultado } from '../data/diagnosticoProfesionales.js'

const FASES = {
  BIENVENIDA: 'bienvenida',
  SEGMENTACION: 'segmentacion',
  PREGUNTAS: 'preguntas',
  CAPTURA: 'captura',
  TRANSICION: 'transicion',
  RESULTADO: 'resultado',
}

export default function DiagnosticoProfesionalesPage() {
  const [fase, setFase] = useState(FASES.BIENVENIDA)
  const [segmento, setSegmento] = useState(null)
  const [respuestas, setRespuestas] = useState({})
  const [preguntaIndex, setPreguntaIndex] = useState(0)
  const [resultado, setResultado] = useState(null)
  const [percentil, setPercentil] = useState(null)

  const preguntas = segmento === 'junior' ? JUNIOR_QUESTIONS : SENIOR_QUESTIONS

  function handleStart() {
    trackCta('diagnostico_profesionales_iniciar', 'diagnostico_profesionales', '/diagnostico/profesionales')
    setFase(FASES.SEGMENTACION)
  }

  function handleSegmento(valorSegmento) {
    setSegmento(valorSegmento)
    setPreguntaIndex(0)
    setFase(FASES.PREGUNTAS)
  }

  function handleAnswer(valor) {
    const pregunta = preguntas[preguntaIndex]
    const nuevasRespuestas = { ...respuestas, [pregunta.id]: valor }
    setRespuestas(nuevasRespuestas)

    if (preguntaIndex + 1 < preguntas.length) {
      setPreguntaIndex(preguntaIndex + 1)
    } else {
      setFase(FASES.CAPTURA)
    }
  }

  function handleCaptura(datosContacto) {
    trackForm('bbs-diagnostico-profesionales', 'submit')
    const calculado = calcularResultado(segmento, respuestas)
    setResultado(calculado)
    setFase(FASES.TRANSICION)

    fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        form: 'bbs-diagnostico-profesionales',
        data: {
          nombre: datosContacto.nombre,
          email: datosContacto.email,
          whatsapp: datosContacto.whatsapp,
          segmento,
          score: calculado.score,
          scoreMax: calculado.scoreMax,
          nivel: calculado.nivel,
          pagina_origen: window.location.pathname,
        },
      }),
    })
      .then(res => {
        trackForm('bbs-diagnostico-profesionales', res.ok ? 'success' : 'error')
      })
      .catch(() => {
        trackForm('bbs-diagnostico-profesionales', 'error')
      })

    fetch(`/api/diagnostico-stats?tipo=profesionales&segmento=${segmento}&score=${calculado.score}`)
      .then(res => (res.ok ? res.json() : null))
      .then(data => {
        if (data) setPercentil(data)
      })
      .catch(() => {})
  }

  function handleTransicionComplete() {
    setFase(FASES.RESULTADO)
  }

  return (
    <>
      <Nav />
      <main id="main" style={{ minHeight: '70vh' }}>
        {fase === FASES.BIENVENIDA && <PantallaBienvenida onStart={handleStart} />}

        {fase === FASES.SEGMENTACION && (
          <PreguntaScreen
            pregunta={{
              pregunta: SEGMENTO_QUESTION.pregunta,
              opciones: SEGMENTO_QUESTION.opciones.map(o => ({ texto: o.texto, valor: o.segmento })),
            }}
            numero={1}
            total={1}
            onAnswer={handleSegmento}
          />
        )}

        {fase === FASES.PREGUNTAS && (
          <PreguntaScreen
            pregunta={preguntas[preguntaIndex]}
            numero={preguntaIndex + 1}
            total={preguntas.length}
            onAnswer={handleAnswer}
          />
        )}

        {fase === FASES.CAPTURA && <CapturaDatos onSubmit={handleCaptura} />}

        {fase === FASES.TRANSICION && <PantallaTransicion onComplete={handleTransicionComplete} />}

        {fase === FASES.RESULTADO && resultado && (
          <PantallaResultado resultado={resultado} percentil={percentil} />
        )}
      </main>
      <Footer />
    </>
  )
}
