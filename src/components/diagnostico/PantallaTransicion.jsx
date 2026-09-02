import { useEffect, useState } from 'react'

const MENSAJES = [
  'Evaluando tu criterio propio...',
  'Analizando tu relación con el aprendizaje...',
  'Calculando tu proyección de crecimiento...',
  'Generando tu resultado...',
]

export default function PantallaTransicion({ onComplete }) {
  const [indice, setIndice] = useState(0)

  useEffect(() => {
    const stepMs = 650
    const intervalo = setInterval(() => {
      setIndice(i => Math.min(i + 1, MENSAJES.length - 1))
    }, stepMs)

    const timeout = setTimeout(onComplete, MENSAJES.length * stepMs)

    return () => {
      clearInterval(intervalo)
      clearTimeout(timeout)
    }
  }, [onComplete])

  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <div>
        <div style={{ width: 220, height: 3, background: 'var(--fro-line)', borderRadius: 2, margin: '0 auto 1.4rem', overflow: 'hidden' }}>
          <div style={{ height: '100%', background: 'var(--fro-amber)', width: `${((indice + 1) / MENSAJES.length) * 100}%`, transition: 'width 0.3s var(--ease)' }} />
        </div>
        <p className="fro-sm" style={{ fontFamily: 'var(--fbc)', letterSpacing: '0.04em' }}>{MENSAJES[indice]}</p>
      </div>
    </div>
  )
}
