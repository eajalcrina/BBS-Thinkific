import { useEffect, useState } from 'react'

export default function PantallaTransicion({ mensajes, onComplete }) {
  const [indice, setIndice] = useState(0)

  useEffect(() => {
    const stepMs = 650
    const intervalo = setInterval(() => {
      setIndice(i => Math.min(i + 1, mensajes.length - 1))
    }, stepMs)

    const timeout = setTimeout(onComplete, mensajes.length * stepMs)

    return () => {
      clearInterval(intervalo)
      clearTimeout(timeout)
    }
  }, [mensajes, onComplete])

  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <div>
        <div style={{ width: 220, height: 3, background: 'var(--fro-line)', borderRadius: 2, margin: '0 auto 1.4rem', overflow: 'hidden' }}>
          <div style={{ height: '100%', background: 'var(--fro-amber)', width: `${((indice + 1) / mensajes.length) * 100}%`, transition: 'width 0.3s var(--ease)' }} />
        </div>
        <p className="fro-sm" style={{ fontFamily: 'var(--fbc)', letterSpacing: '0.04em' }}>{mensajes[indice]}</p>
      </div>
    </div>
  )
}
