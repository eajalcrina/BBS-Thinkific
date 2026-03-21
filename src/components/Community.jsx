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
      window.location.href = 'https://chat.whatsapp.com/GSDVsK013hnErk7SWgUIqB?mode=gi_t'
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

              href="https://wa.me/51974620309?text=Hola%2C%20equipo%20Bio%20Business%20School%2C%20estoy%20interesado%20en%20escalar%20mi%20bionegocio"
  target="_blank"
  rel="noopener noreferrer"
  style={{ textDecoration:'none', display:'block' }}
>
  <div style={{ background:'var(--dark)', borderRadius:20, padding:'1.5rem', boxShadow:'0 8px 32px rgba(14,14,14,0.2)', border:'2px solid transparent', transition:'border-color 0.2s, transform 0.2s', cursor:'pointer' }}
    onMouseEnter={e=>{ e.currentTarget.style.borderColor='var(--lime)'; e.currentTarget.style.transform='translateY(-3px)' }}
    onMouseLeave={e=>{ e.currentTarget.style.borderColor='transparent'; e.currentTarget.style.transform='translateY(0)' }}
  >
    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'0.9rem' }}>
      <div>
        <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'0.3rem' }}>
          <div style={{ fontFamily:'var(--fout)', fontSize:'1.2rem', fontWeight:600, color:'var(--white)' }}>PRO</div>
          <span style={{ background:'var(--lime)', color:'var(--dark)', fontFamily:'var(--fbc)', fontSize:'0.58rem', fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', padding:'0.2rem 0.6rem', borderRadius:50 }}>Contáctanos →</span>
        </div>
        <div style={{ fontSize:'0.8rem', color:'var(--t-white2)', lineHeight:1.5 }}>4h/mes consultoría 1:1, Investment Matchmaking, Masterclasses avanzadas, podcast privado.</div>
      </div>
      <div style={{ textAlign:'right', flexShrink:0, marginLeft:'1rem' }}>
        <div style={{ fontFamily:'var(--fbc)', fontSize:'2rem', fontWeight:800, color:'var(--lime)', lineHeight:1 }}>$87</div>
        <div style={{ fontSize:'0.72rem', color:'var(--t-white3)' }}>/mes</div>
      </div>
    </div>
    <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', background:'rgba(193,244,0,0.08)', borderRadius:10, padding:'0.6rem 0.9rem', marginTop:'0.3rem' }}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--lime)"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      <span style={{ fontFamily:'var(--fbc)', fontSize:'0.72rem', fontWeight:600, color:'var(--lime)', letterSpacing:'0.08em', textTransform:'uppercase' }}>Escribir por WhatsApp</span>
    </div>
  </div>
</a>

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
                    <input type="text" value={firstName} onChange={e => { setFirstName(e.target.value); setErr(false) }} placeholder="Nombres" className={`field${err && !firstName ? ' field-err' : ''}`} />
                    <input type="text" value={lastName} onChange={e => { setLastName(e.target.value); setErr(false) }} placeholder="Apellidos" className={`field${err && !lastName ? ' field-err' : ''}`} />
                  </div>
                  <input type="email" value={email} onChange={e => { setEmail(e.target.value); setErr(false) }} placeholder="Correo electrónico" className={`field${err && !validEmail ? ' field-err' : ''}`} />
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <select value={dialCode} onChange={e => setDialCode(e.target.value)} className="field" style={{ width: 110, flexShrink: 0, WebkitAppearance: 'none', paddingRight: '0.5rem' }}>
                      {COUNTRY_CODES.map(c => (
                        <option key={c.code + c.name} value={c.code}>{c.flag} {c.code}</option>
                      ))}
                    </select>
                    <input type="tel" value={phone} onChange={e => setPhone(e.target.value.replace(/\D/g, ''))} placeholder="Celular" className="field" style={{ flex: 1 }} />
                  </div>
                  <input type="text" value={country} onChange={e => setCountry(e.target.value)} placeholder="País" className="field" />
                  {err && (
                    <p style={{ fontSize: '0.78rem', color: 'var(--rose)', margin: '0.1rem 0' }}>
                      Completa nombres, apellidos y correo para continuar.
                    </p>
                  )}
                  <button className="btn btn-rose btn-full btn-lg" onClick={submit} disabled={loading} style={{ opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}>
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
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-dark btn-lg">Ir al grupo ahora →</a>
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
