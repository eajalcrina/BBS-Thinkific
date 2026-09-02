import { useState, useCallback, useEffect } from 'react'
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

// Constante de módulo — referencia estable entre renders. PantallaTransicion
// depende de `mensajes` en su useEffect; un array literal inline en el JSX
// de abajo se recrearía en cada re-render (ej. cuando `percentil` resuelve
// en paralelo durante la transición, ver handleCaptura) y reiniciaría el
// temporizador de 2.6s — el mismo bug que ya se corrigió una vez para
// `onComplete` con useCallback, reintroducido por esta prop si no se hace
// igual de estable.
const MENSAJES_TRANSICION = [
  'Evaluando tu criterio propio...',
  'Analizando tu relación con el aprendizaje...',
  'Calculando tu proyección de crecimiento...',
  'Generando tu resultado...',
]

export default function DiagnosticoProfesionalesPage() {
  const [fase, setFase] = useState(FASES.BIENVENIDA)
  const [segmento, setSegmento] = useState(null)
  const [experiencia, setExperiencia] = useState(null)
  const [respuestas, setRespuestas] = useState({})
  const [preguntaIndex, setPreguntaIndex] = useState(0)
  const [resultado, setResultado] = useState(null)
  const [percentil, setPercentil] = useState(null)

  const preguntas = segmento === 'junior' ? JUNIOR_QUESTIONS : SENIOR_QUESTIONS

  useEffect(() => {
    const pageUrl = 'https://biobusinessschool.org/diagnostico/profesionales'
    const pageTitle = 'Autodiagnóstico: ¿Qué tan preparado estás frente a la IA? | Bio Business School'
    const pageDesc = 'Descubre en 3 minutos qué tan preparado estás frente a la disrupción de la IA, y qué programa de Bio Business School es tu siguiente paso.'

    const prevTitle = document.title
    document.title = pageTitle

    const metaDesc = document.querySelector('meta[name="description"]')
    const prevDesc = metaDesc ? metaDesc.getAttribute('content') : null
    if (metaDesc) metaDesc.setAttribute('content', pageDesc)

    const canonicalLink = document.querySelector('link[rel="canonical"]')
    const prevCanonical = canonicalLink ? canonicalLink.getAttribute('href') : null
    if (canonicalLink) canonicalLink.setAttribute('href', pageUrl)

    const ogUrl = document.querySelector('meta[property="og:url"]')
    const prevOgUrl = ogUrl ? ogUrl.getAttribute('content') : null
    if (ogUrl) ogUrl.setAttribute('content', pageUrl)

    const ogTitle = document.querySelector('meta[property="og:title"]')
    const prevOgTitle = ogTitle ? ogTitle.getAttribute('content') : null
    if (ogTitle) ogTitle.setAttribute('content', pageTitle)

    const ogDesc = document.querySelector('meta[property="og:description"]')
    const prevOgDesc = ogDesc ? ogDesc.getAttribute('content') : null
    if (ogDesc) ogDesc.setAttribute('content', pageDesc)

    window.scrollTo(0, 0)

    return () => {
      document.title = prevTitle
      if (metaDesc && prevDesc) metaDesc.setAttribute('content', prevDesc)
      if (canonicalLink && prevCanonical) canonicalLink.setAttribute('href', prevCanonical)
      if (ogUrl && prevOgUrl) ogUrl.setAttribute('content', prevOgUrl)
      if (ogTitle && prevOgTitle) ogTitle.setAttribute('content', prevOgTitle)
      if (ogDesc && prevOgDesc) ogDesc.setAttribute('content', prevOgDesc)
    }
  }, [])

  function handleStart() {
    trackCta('diagnostico_profesionales_iniciar', 'diagnostico_profesionales', '/diagnostico/profesionales')
    setFase(FASES.SEGMENTACION)
  }

  function handleSegmento({ segmento: valorSegmento, experiencia: valorExperiencia }) {
    setSegmento(valorSegmento)
    setExperiencia(valorExperiencia)
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
          experiencia,
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

  // useCallback con deps vacías: PantallaTransicion depende de esta
  // referencia en su useEffect. Si `percentil` resuelve durante la
  // transición (fetch en paralelo, ver handleCaptura), este componente
  // re-renderiza — una función declarada normal se recrearía en cada
  // render, reiniciando el temporizador de 2.6s en vez de dejarlo correr.
  const handleTransicionComplete = useCallback(() => {
    setFase(FASES.RESULTADO)
  }, [])

  return (
    <>
      <Nav />
      <main id="main" style={{ minHeight: '70vh' }}>
        {fase === FASES.BIENVENIDA && (
          <PantallaBienvenida
            eyebrow="AUTODIAGNÓSTICO GRATUITO · IA PARA PROFESIONALES"
            titulo="¿Qué tan preparado estás frente a la disrupción de la IA?"
            descripcion="No medimos si usas IA o no. Medimos si la estás usando para desarrollar criterio propio, o para dejar que piense por ti."
            meta={
              <>
                8 preguntas · 3 minutos · Resultado inmediato con análisis por dimensión.
                <br />
                Tu email se pide antes del resultado, no antes de empezar.
              </>
            }
            ctaTexto="Iniciar diagnóstico"
            onStart={handleStart}
          />
        )}

        {fase === FASES.SEGMENTACION && (
          <PreguntaScreen
            pregunta={{
              pregunta: SEGMENTO_QUESTION.pregunta,
              opciones: SEGMENTO_QUESTION.opciones.map(o => ({ texto: o.texto, valor: { segmento: o.segmento, experiencia: o.experiencia } })),
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

        {fase === FASES.TRANSICION && (
          <PantallaTransicion
            mensajes={MENSAJES_TRANSICION}
            onComplete={handleTransicionComplete}
          />
        )}

        {fase === FASES.RESULTADO && resultado && (
          <PantallaResultado resultado={resultado} percentil={percentil} />
        )}
      </main>
      <Footer />
    </>
  )
}
