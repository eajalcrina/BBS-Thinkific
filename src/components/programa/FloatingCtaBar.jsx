import { useEffect, useState } from 'react'
import { usePaymentCta } from './usePaymentCta.js'

export default function FloatingCtaBar({ programa }) {
  const [visible, setVisible] = useState(false)
  const { label, status, handleClick } = usePaymentCta(programa)

  useEffect(() => {
    function onScroll() { setVisible(window.scrollY > 520) }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <div
      role="region"
      aria-label="Barra de inscripción"
      style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 90,
        background: 'var(--fro-bg)', borderTop: '1px solid var(--fro-line)',
        padding: '0.9rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap',
      }}
    >
      <span className="fro-sm" style={{ color: 'var(--fro-text-2)' }}>{programa.titulo}</span>
      <button type="button" onClick={handleClick} disabled={status === 'loading'} className="fro-btn fro-btn-amber">
        {status === 'loading' ? 'Un momento…' : label}
      </button>
    </div>
  )
}
