import { useEffect, useState } from 'react'
import { usePaymentCta } from './usePaymentCta.js'

export default function FloatingCtaBar({ programa }) {
  const [visible, setVisible] = useState(false)
  const [footerVisible, setFooterVisible] = useState(false)
  const { label, status, handleClick } = usePaymentCta(programa)

  useEffect(() => {
    function onScroll() { setVisible(window.scrollY > 520) }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const footer = document.querySelector('footer[role="contentinfo"]')
    if (!footer) return
    const observer = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { rootMargin: '0px' }
    )
    observer.observe(footer)
    return () => observer.disconnect()
  }, [])

  if (!visible || footerVisible) return null

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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <span className="fro-sm" style={{ color: 'var(--fro-text-2)' }}>{programa.titulo}</span>
          <button type="button" onClick={handleClick} disabled={status === 'loading'} className="fro-btn fro-btn-amber fro-btn-wrap">
            {status === 'loading' ? 'Un momento…' : label}
          </button>
        </div>
        {status === 'sent' && (
          <p className="fro-sm" style={{ color: 'var(--fro-amber)' }}>
            Estamos activando los pagos — dejamos tu registro guardado, te contactamos para completar la inscripción.
          </p>
        )}
        {status === 'error' && (
          <p className="fro-sm" style={{ color: 'var(--fro-danger)' }}>No se pudo enviar, intenta de nuevo.</p>
        )}
      </div>
    </div>
  )
}
