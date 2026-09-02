import { useState } from 'react'
import { trackForm } from '../lib/analytics.js'

const Logo = () => (
  <span style={{ fontFamily:'var(--fbc)', fontWeight:700, fontSize:'1.15rem', letterSpacing:'-0.01em', color:'var(--fro-text)' }}>
    bio<span style={{ color:'var(--fro-amber)' }}>/</span>business
  </span>
)

const YEAR = new Date().getFullYear()

function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  async function handleSubmit(e) {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    trackForm('bbs-newsletter', 'submit')
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          form: 'bbs-newsletter',
          data: { email, pagina_origen: window.location.pathname },
        }),
      })
      if (!res.ok) throw new Error('request_failed')
      setStatus('success')
      trackForm('bbs-newsletter', 'success')
      setEmail('')
    } catch {
      setStatus('error')
      trackForm('bbs-newsletter', 'error')
    }
  }

  if (status === 'success') {
    return <p className="fro-sm" style={{ color:'var(--fro-amber)' }}>Listo, ya estás suscrito.</p>
  }

  return (
    <form onSubmit={handleSubmit} style={{ display:'flex', gap:'0.6rem', flexWrap:'wrap', maxWidth:380 }}>
      <input
        type="email"
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="tu@correo.com"
        aria-label="Correo electrónico"
        className="fro-field"
        style={{ flex:'1 1 200px' }}
      />
      <button type="submit" disabled={status==='loading'} className="fro-btn fro-btn-amber" style={{ flexShrink:0 }}>
        {status === 'loading' ? 'Enviando…' : 'Suscribirme'}
      </button>
      {status === 'error' && (
        <p className="fro-sm" style={{ color:'var(--fro-danger)', width:'100%' }}>No se pudo enviar, intenta de nuevo.</p>
      )}
    </form>
  )
}

export default function Footer() {
  return (
    <footer role="contentinfo" style={{ background:'var(--fro-bg)', borderTop:'1px solid var(--fro-line)' }}>
      <div className="fro-wrap" style={{ padding:'4rem 2rem 2rem' }}>

        <div className="footer-grid" style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1.4fr', gap:'3rem', marginBottom:'3rem' }}>
          <div>
            <Logo/>
            <p className="fro-sm" style={{ marginTop:'0.8rem', maxWidth:300 }}>
              Una propuesta de Eddie Ajalcriña y Lorenzo Ortiz — Powered by{' '}
              <a
                href="https://redesignlab.org/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color:'var(--fro-text-2)', textDecoration:'none', borderBottom:'1px solid var(--fro-line-2)' }}
              >Redesign Lab</a>.
            </p>
            <a
              href="mailto:biobusiness@redesignlab.org"
              style={{ display:'inline-block', marginTop:'0.6rem', fontSize:'0.85rem', color:'var(--fro-text-2)', textDecoration:'none' }}
            >
              biobusiness@redesignlab.org
            </a>
          </div>

          <nav aria-label="Navegación">
            <h4 className="fro-eyebrow" style={{ fontSize:'0.68rem', marginBottom:'1rem' }}>Explorar</h4>
            <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:'0.5rem' }}>
              {[
                ['Profesionales', '/#profesionales'],
                ['Empresas', '/#empresas'],
                ['Comunidad', '/#comunidad'],
              ].map(([l,h]) => (
                <li key={l}>
                  <a href={h} style={{ fontSize:'0.85rem', color:'var(--fro-text-2)', textDecoration:'none' }}>{l}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h4 className="fro-eyebrow" style={{ fontSize:'0.68rem', marginBottom:'1rem' }}>No te pierdas las novedades de BBS.</h4>
            <NewsletterForm/>
          </div>
        </div>

        <div style={{ borderTop:'1px solid var(--fro-line)', paddingTop:'1.5rem', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'1rem' }}>
          <p style={{ fontSize:'0.76rem', color:'var(--fro-text-3)' }}>© {YEAR} Bio Business School</p>
          <a href="/privacidad" style={{ fontSize:'0.76rem', color:'var(--fro-text-3)', textDecoration:'none' }}>Privacidad</a>
        </div>
      </div>

      <style>{`
        @media(max-width: 860px){ .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 2rem !important; } }
        @media(max-width: 520px){ .footer-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  )
}
