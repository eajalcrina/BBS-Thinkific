import { useState } from 'react'
import { trackCta, trackForm } from '../../lib/analytics.js'
import { withUtm, CAMPAIGNS } from '../../lib/utm.js'
import { usePaymentCta } from './usePaymentCta.js'

function buildWhatsAppUrl(titulo) {
  const msg = encodeURIComponent(`Hola, me interesa el curso ${titulo}`)
  const base = `https://wa.me/51974620309?text=${msg}`
  return withUtm(base, { campaign: CAMPAIGNS.PROGRAMA_WHATSAPP, content: titulo })
}

function InlineEnrollForm({ programa, dark }) {
  const [values, setValues] = useState({ nombre: '', email: '', whatsapp: '' })
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('loading')
    trackForm('bbs-enroll', 'submit')
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          form: 'bbs-enroll',
          programa: programa.slug,
          nombre: values.nombre,
          email: values.email,
          whatsapp: values.whatsapp,
          pagina_origen: window.location.pathname,
        }),
      })
      if (!res.ok) throw new Error('request_failed')
      setStatus('success')
      trackForm('bbs-enroll', 'success')
    } catch {
      setStatus('error')
      trackForm('bbs-enroll', 'error')
    }
  }

  if (status === 'success') {
    return (
      <p className="fro-sm" style={{ color: dark ? 'var(--fro-amber)' : 'var(--fro-ink)', marginTop: '0.9rem' }}>
        Listo, quedaste registrado. Te contactamos pronto.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: '1rem', maxWidth: 360 }}>
      <input required type="text" placeholder="Tu nombre" value={values.nombre}
        onChange={e => setValues(v => ({ ...v, nombre: e.target.value }))} className="fro-field" />
      <input required type="email" placeholder="tu@correo.com" value={values.email}
        onChange={e => setValues(v => ({ ...v, email: e.target.value }))} className="fro-field" />
      <input required type="tel" placeholder="WhatsApp (con código de país)" value={values.whatsapp}
        onChange={e => setValues(v => ({ ...v, whatsapp: e.target.value }))} className="fro-field" />
      <button type="submit" disabled={status === 'loading'} className="fro-btn fro-btn-amber" style={{ marginTop: '0.2rem' }}>
        {status === 'loading' ? 'Enviando…' : 'Confirmar registro'}
      </button>
      {status === 'error' && <p className="fro-sm" style={{ color: 'var(--fro-danger)' }}>No se pudo enviar, intenta de nuevo.</p>}
    </form>
  )
}

export default function ProgramaCTA({ programa, dark = false }) {
  const [showForm, setShowForm] = useState(false)
  const { label, status, handleClick } = usePaymentCta(programa)

  const outlineColor = dark ? 'var(--fro-line-2)' : 'var(--fro-ink)'
  const outlineText = dark ? 'var(--fro-text)' : 'var(--fro-ink)'
  const tertiaryColor = dark ? 'var(--fro-text-2)' : 'var(--fro-ink-2)'

  return (
    <div>
      <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <button type="button" onClick={handleClick} disabled={status === 'loading'} className="fro-btn fro-btn-amber fro-btn-lg">
          {status === 'loading' ? 'Un momento…' : label}
        </button>

        <button
          type="button"
          onClick={() => { setShowForm(v => !v); trackCta(`programa_${programa.slug}_inscribete`, 'programa_cta', 'form') }}
          className="fro-btn"
          style={{ border: `1.5px solid ${outlineColor}`, color: outlineText, background: 'transparent' }}
        >
          Inscríbete
        </button>

        <a
          href={buildWhatsAppUrl(programa.titulo)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackCta(`programa_${programa.slug}_whatsapp`, 'programa_cta', 'whatsapp')}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.86rem', fontWeight: 600, color: tertiaryColor, textDecoration: 'none' }}
        >
          <span aria-hidden>💬</span> Escríbenos por WhatsApp
        </a>
      </div>

      {status === 'sent' && (
        <p className="fro-sm" style={{ marginTop: '0.8rem', color: dark ? 'var(--fro-amber)' : 'var(--fro-ink)' }}>
          Estamos activando los pagos — dejamos tu registro guardado, te contactamos para completar la inscripción.
        </p>
      )}
      {status === 'error' && (
        <p className="fro-sm" style={{ marginTop: '0.8rem', color: 'var(--fro-danger)' }}>No se pudo enviar, intenta de nuevo.</p>
      )}

      {showForm && <InlineEnrollForm programa={programa} dark={dark} />}
    </div>
  )
}
