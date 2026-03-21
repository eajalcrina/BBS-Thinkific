import { useState } from 'react'
import FadeIn from './FadeIn.jsx'

const COUNTRY_CODES = [
  { code: '+51', flag: '🇵🇪', name: 'PE' },
  { code: '+57', flag: '🇨🇴', name: 'CO' },
  { code: '+56', flag: '🇨🇱', name: 'CL' },
  { code: '+52', flag: '🇲🇽', name: 'MX' },
  { code: '+54', flag: '🇦🇷', name: 'AR' },
  { code: '+55', flag: '🇧🇷', name: 'BR' },
  { code: '+593', flag: '🇪🇨', name: 'EC' },
  { code: '+591', flag: '🇧🇴', name: 'BO' },
  { code: '+595', flag: '🇵🇾', name: 'PY' },
  { code: '+598', flag: '🇺🇾', name: 'UY' },
  { code: '+58', flag: '🇻🇪', name: 'VE' },
  { code: '+1',  flag: '🇺🇸', name: 'US' },
  { code: '+34', flag: '🇪🇸', name: 'ES' },
]

const WHATSAPP_URL = 'https://chat.whatsapp.com/GSDVsK013hnErk7SWgUIqB?mode=gi_t'

export default function Community() {
  const [firstName, setFirstName] = useState('')
  const [lastName,  setLastName]  = useState('')
  const [email,     setEmail]     = useState('')
  const [dialCode,  setDialCode]  = useState('+51')
  const [phone,     setPhone]     = useState('')
  const [country,   setCountry]   = useState('')
  const [err,       setErr]       = useState(false)
  const [done,      setDone]      = useState(false)
  const [loading,   setLoading]   = useState(false)

  const normalizedEmail = email.trim().toLowerCase()
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)

  const submit = async () => {
    if (!firstName || !lastName || !validEmail) { setErr(true); return }

    setLoading(true)

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          email: normalizedEmail,
          phone: phone ? `${dialCode}${phone}` : '',
          country
        })
      })

      if (!res.ok) { setErr(true); setLoading(false); return }

      setErr(false)
      setDone(true)

      setTimeout(() => {
        window.open(WHATSAPP_URL, '_blank')
      }, 2500)

    } catch {
      setErr(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="comunidad" style={{ background: 'linear-gradient(160deg, var(--lime) 0%, #E8FF80 40%, var(--lime-lt) 100%)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: -1, left: 0, right: 0 }}>
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ width: '100%', height: 60, display: 'block' }}>
          <path d="M0,30 C360,0 1080,60 1440,30 L1440,0 L0,0 Z" fill="var(--white)" />
        </svg>
      </div>

      <div style={{ position: 'absolute', top: '10%', right: '5%', width: 300, height: 300, borderRadius: '50%', background: 'rgba(243,39,105,0.1)', pointerEvents: 'none' }} className="float-y" />
      <div style={{ position: 'absolute', bottom: '5%', left: '3%', width: 200, height: 200, borderRadius: '50%', background: 'rgba(14,14,14,0.05)', pointerEvents: 'none' }} className="float-x" />

      <div className="wrap sec" style={{ position: 'relative', paddingTop: '7rem' }}>
        <FadeIn><div className="label lime" style={{ marginBottom: '1rem' }}>Comunidad</div></FadeIn>
        <FadeIn delay={0.08}>
          <h2 className="t-out t-lg" style={{ marginBottom: '0.9rem', color: 'var(--dark)' }}>
            Únete a los <em style={{ fontStyle: 'normal', color: 'var(--rose)', fontWeight: 700 }}>Biobuilders</em>
          </h2>
        </FadeIn>
        <FadeIn delay={0.14}>
          <p className="lead" style={{ color: 'var(--t-dark2)', maxWidth: 540, marginBottom: '2.5rem' }}>
            La membresía Starter es <strong style={{ color: 'var(--dark)', fontWeight: 700 }}>gratuita</strong>. Forma parte de la red de bio-builders de América Latina.
          </p>
        </FadeIn>

        <FadeIn delay={0.18}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start' }} className="comm-grid">

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div
                style={{ background: 'var(--white)', borderRadius: 20, padding: '1.5rem', boxShadow: '0 8px 32px rgba(14,14,14,0.1)', border: '2px solid transparent', transition: 'border-color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--lime-d)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'transparent'}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.9rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                      <span style={{ fontFamily: 'var(--fout)', fontSize: '1.2rem', fontWeight: 600, color: 'var(--dark)' }}>Starter</span>
                      <span className="badge badge-lime">Gratis</span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--t-dark2)', lineHeight: 1.5 }}>Para profesionales que inician. Clínicas mensuales, Radar de fondos, BBS Library.</div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: '1rem' }}>
                    <div style={{ fontFamily: 'var(--fbc)', fontSize: '2rem', fontWeight: 800, color: 'var(--dark)', lineHeight: 1 }}>$0</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--t-dark3)' }}>/mes</div>
                  </div>
                </div>
              </div>

              <div style={{ background: 'var(--dark)', borderRadius: 20, padding: '1.5rem', boxShadow: '0 8px 32px rgba(14,14,14,0.2)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.9rem' }}>
                  <div>
                    <div style={{ fontFamily: 'var(--fout)', fontSize: '1.2rem', fontWeight: 600, color: 'var(--white)', marginBottom: '0.3rem' }}>PRO</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--t-white2)', lineHeight: 1.5 }}>4h/mes consultoría 1:1, Investment Matchmaking, Masterclasses avanzadas, podcast privado.</div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: '1rem' }}>
                    <div style={{ fontFamily: 'var(--fbc)', fontSize: '2rem', fontWeight: 800, color: 'var(--lime)', lineHeight: 1 }}>$87</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--t-white3)' }}>/mes</div>
                  </div>
                </div>
              </div>

              <div style={{ background: 'rgba(14,14,14,0.08)', borderRadius: 12, padding: '1rem 1.2rem', fontSize: '0.82rem', lineHeight: 1.6, color: 'var(--t-dark2)', display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--dark)', fontWeight: 700, flexShrink: 0 }}>→</span>
                Todo suscriptor al Sprint 01 se integra automáticamente a la comunidad Starter, sin costo adicional.
              </div>
            </div>

            {!done ? (
              <div style={{ background: 'var(--white)', borderRadius: 20, padding: '2rem', boxShadow: '0 16px 48px rgba(14,14,14,0.12)' }}>
                <div style={{ fontFamily: 'var(--fout)', fontSize: '1.3rem', fontWeight: 600, color: 'var(--dark)', marginBottom: '0.25rem' }}>Regístrate gratis</div>
                <p style={{ fontSize: '0.85rem', color: 'var(--t-dark2)', marginBottom: '1.3rem' }}>Empieza con la membresía Starter sin costo. Te contactamos con los accesos.</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' }}>
                    <input
                      type="text"
                      value={firstName}
                      onChange={e => { setFirstName(e.target.value); setErr(false) }}
                      placeholder="Nombres"
                      className={`field${err && !firstName ? ' field-err' : ''}`}
                    />
                    <input
                      type="text"
                      value={lastName}
                      onChange={e => { setLastName(e.target.value); setErr(false) }}
                      placeholder="Apellidos"
                      className={`field${err && !lastName ? ' field-err' : ''}`}
                    />
                  </div>

                  <input
                    type="email"
                    value={email}
                    onChange={e => { setEmail(e.target.value); setErr(false) }}
                    placeholder="Correo electrónico"
                    className={`field${err && !validEmail ? ' field-err' : ''}`}
                  />

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <select
                      value={dialCode}
                      onChange={e => setDialCode(e.target.value)}
                      className="field"
                      style={{ width: 110, flexShrink: 0, WebkitAppearance: 'none', paddingRight: '0.5rem' }}
                    >
                      {COUNTRY_CODES.map(c => (
                        <option key={c.code + c.name} value={c.code}>{c.flag} {c.code}</option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      value={phone}
                      onChange={e => setPhone(e.target.value.replace(/\D/g, ''))}
                      placeholder="Celular"
                      className="field"
                      style={{ flex: 1 }}
                    />
                  </div>

                  <input
                    type="text"
                    value={country}
                    onChange={e => setCountry(e.target.value)}
                    placeholder="País"
                    className="field"
                  />

                  {err && (
                    <p style={{ fontSize: '0.78rem', color: 'var(--rose)', margin: '0.1rem 0' }}>
                      Completa nombres, apellidos y correo para continuar.
                    </p>
                  )}

                  <button
                    className="btn btn-rose btn-full btn-lg"
                    onClick={submit}
                    disabled={loading}
                    style={{ opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
                  >
                    {loading ? 'Enviando...' : 'Unirme a los Biobuilders →'}
                  </button>
                  <p style={{ textAlign: 'center', fontSize: '0.72rem', color: 'var(--t-dark3)' }}>Sin spam · Sin tarjeta · Solo bionegocios</p>
                </div>
              </div>
            ) : (
              <div style={{ background: 'var(--white)', borderRadius: 20, padding: '3rem 2rem', boxShadow: '0 16px 48px rgba(14,14,14,0.12)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1rem' }}>
                <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'var(--lime)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem' }}>✓</div>
                <strong style={{ fontFamily: 'var(--fout)', fontSize: '1.2rem', fontWeight: 600, color: 'var(--dark)' }}>¡Bienvenido/a a los Biobuilders!</strong>
                <p style={{ fontSize: '0.9rem', color: 'var(--t-dark2)', lineHeight: 1.65 }}>Recibimos tus datos. En las próximas 48h te enviamos tus accesos a la comunidad Starter.</p>
                <p style={{ fontSize: '0.82rem', color: 'var(--t-dark3)' }}>Redirigiendo al grupo de WhatsApp...</p>
                
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-dark btn-lg"
                >
                  Ir al grupo ahora →
                </a>
              </div>
            )}
          </div>
        </FadeIn>
      </div>

      <div style={{ position: 'relative', marginTop: 60 }}>
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ width: '100%', height: 60, display: 'block' }}>
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="var(--dark)" />
        </svg>
      </div>
      <style>{`@media(max-width:860px){.comm-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  )
}
