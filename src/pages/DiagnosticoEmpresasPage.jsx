import { useState, useCallback, useEffect } from 'react'
import Nav from '../components/Nav.jsx'
import Footer from '../components/Footer.jsx'
import PantallaBienvenida from '../components/diagnostico/PantallaBienvenida.jsx'
import PreguntaScreen from '../components/diagnostico/PreguntaScreen.jsx'
import CapturaDatos from '../components/diagnostico/CapturaDatos.jsx'
import PantallaTransicion from '../components/diagnostico/PantallaTransicion.jsx'
import PantallaResultadoEmpresas from '../components/diagnostico/PantallaResultadoEmpresas.jsx'
import { trackCta, trackForm } from '../lib/analytics.js'
import { QUESTIONS, SECTOR_QUESTION, calcularResultado } from '../data/diagnosticoEmpresas.js'

const FASES = {
  BIENVENIDA: 'bienvenida',
  PREGUNTAS: 'preguntas',
  CAPTURA: 'captura',
  TRANSICION: 'transicion',
  RESULTADO: 'resultado',
}

// Las 10 pantallas de pregunta en un orden fijo, sin bifurcación: las 9
// puntuadas (Marca, Negocio, Capital) y la de sector al final.
const TODAS_LAS_PREGUNTAS = [...QUESTIONS, SECTOR_QUESTION]

// Constante de módulo — referencia estable entre renders. PantallaTransicion
// depende de `mensajes` en su useEffect; un array literal inline en el JSX
// de abajo se recrearía en cada re-render y reiniciaría el temporizador de
// 2.6s (mismo bug ya corregido una vez en DiagnosticoProfesionalesPage.jsx —
// ver su commit "fix(diagnostico): stabilize the mensajes array reference").
const MENSAJES_TRANSICION = [
  'Evaluando tu marca...',
  'Analizando tu modelo de negocio...',
  'Revisando tu preparación para capital...',
  'Generando tu resultado...',
]

export default function DiagnosticoEmpresasPage() {
  const [fase, setFase] = useState(FASES.BIENVENIDA)
  const [respuestas, setRespuestas] = useState({})
  const [sector, setSector] = useState(null)
  const [preguntaIndex, setPreguntaIndex] = useState(0)
  const [resultado, setResultado] = useState(null)

  useEffect(() => {
    const pageUrl = 'https://biobusinessschool.org/diagnostico/empresas'
    const pageTitle = 'Autodiagnóstico: ¿en qué momento está tu negocio? | Bio Business School'
    const pageDesc = 'Evalúa en 4 minutos en qué momento está tu negocio — de la marca al capital — y qué programa de Bio Business School te ayuda a avanzar.'

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
    trackCta('diagnostico_empresas_iniciar', 'diagnostico_empresas', '/diagnostico/empresas')
    setFase(FASES.PREGUNTAS)
  }

  function handleAnswer(pregunta, valor) {
    if (pregunta.id === SECTOR_QUESTION.id) {
      // La pregunta de sector no puntúa — `valor` aquí es directamente
      // el sector ('general'|'industria'), ver el mapeo de opciones más abajo.
      setSector(valor)
    } else {
      setRespuestas(r => ({ ...r, [pregunta.id]: valor }))
    }

    if (preguntaIndex + 1 < TODAS_LAS_PREGUNTAS.length) {
      setPreguntaIndex(preguntaIndex + 1)
    } else {
      setFase(FASES.CAPTURA)
    }
  }

  function handleCaptura(datosContacto) {
    trackForm('bbs-diagnostico-empresas', 'submit')
    const calculado = calcularResultado(respuestas, sector)
    setResultado(calculado)
    setFase(FASES.TRANSICION)

    fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        form: 'bbs-diagnostico-empresas',
        data: {
          nombre: datosContacto.nombre,
          email: datosContacto.email,
          whatsapp: datosContacto.whatsapp,
          sector: calculado.sector,
          marcaScore: calculado.marcaScore,
          negocioScore: calculado.negocioScore,
          capitalScore: calculado.capitalScore,
          scoreTotal: calculado.scoreTotal,
          scoreMax: calculado.scoreMax,
          resultado: calculado.resultado,
          secundario: calculado.secundario || '',
          pagina_origen: window.location.pathname,
        },
      }),
    })
      .then(res => {
        trackForm('bbs-diagnostico-empresas', res.ok ? 'success' : 'error')
      })
      .catch(() => {
        trackForm('bbs-diagnostico-empresas', 'error')
      })
  }

  const handleTransicionComplete = useCallback(() => {
    setFase(FASES.RESULTADO)
  }, [])

  const preguntaActual = TODAS_LAS_PREGUNTAS[preguntaIndex]
  const esPreguntaDeSector = preguntaActual && preguntaActual.id === SECTOR_QUESTION.id

  return (
    <>
      <Nav />
      <main id="main" style={{ minHeight: '70vh' }}>
        {fase === FASES.BIENVENIDA && (
          <PantallaBienvenida
            eyebrow="AUTODIAGNÓSTICO GRATUITO · EMPRESAS DE IMPACTO"
            titulo="¿En qué momento está tu negocio — de la marca al capital?"
            descripcion="No medimos si tienes buena intención regenerativa. Medimos si esa intención ya se tradujo en marca, modelo de negocio y capital, o dónde se está quedando."
            meta={
              <>
                10 preguntas · 4 minutos · Resultado inmediato con análisis por dimensión.
                <br />
                Tu email se pide antes del resultado, no antes de empezar.
              </>
            }
            ctaTexto="Evaluar mi momento"
            onStart={handleStart}
          />
        )}

        {fase === FASES.PREGUNTAS && preguntaActual && (
          <PreguntaScreen
            pregunta={
              esPreguntaDeSector
                ? { pregunta: preguntaActual.pregunta, opciones: preguntaActual.opciones.map(o => ({ texto: o.texto, valor: o.sector })) }
                : preguntaActual
            }
            numero={preguntaIndex + 1}
            total={TODAS_LAS_PREGUNTAS.length}
            onAnswer={valor => handleAnswer(preguntaActual, valor)}
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
          <PantallaResultadoEmpresas resultado={resultado} />
        )}
      </main>
      <Footer />
    </>
  )
}
