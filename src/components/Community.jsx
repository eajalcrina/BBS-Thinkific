import { useState } from 'react'
import FadeIn from './FadeIn.jsx'
import { Halo, Cell, Membrane, Dot, ORBS_ROSE, ORBS_DARK } from './CellSystem.jsx'

const COUNTRY_CODES = [
  {code:'+51',flag:'🇵🇪',name:'PE'},{code:'+57',flag:'🇨🇴',name:'CO'},{code:'+56',flag:'🇨🇱',name:'CL'},
  {code:'+52',flag:'🇲🇽',name:'MX'},{code:'+54',flag:'🇦🇷',name:'AR'},{code:'+55',flag:'🇧🇷',name:'BR'},
  {code:'+593',flag:'🇪🇨',name:'EC'},{code:'+591',flag:'🇧🇴',name:'BO'},{code:'+595',flag:'🇵🇾',name:'PY'},
  {code:'+598',flag:'🇺🇾',name:'UY'},{code:'+58',flag:'🇻🇪',name:'VE'},{code:'+1',flag:'🇺🇸',name:'US'},
  {code:'+34',flag:'🇪🇸',name:'ES'},
]
const WHATSAPP_URL = 'https://chat.whatsapp.com/GSDVsK013hnErk7SWgUIqB?mode=gi_t'
const WHATSAPP_PRO = 'https://wa.me/51974620309?text=soy%20un%20empresario%20y%20estoy%20buscando%20soporte%20para%20escalar%20mi%20bionegocio.'

export default function Community() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [dialCode, setDialCode] = useState('+51')
  const [phone, setPhone] = useState('')
  const [country, setCountry] = useState('')
  const [plan, setPlan] = useState('')
  const [err, setErr] = useState(false)
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)

  const normalizedEmail = email.trim().toLowerCase()
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)

  const submit = async () => {
    if (!firstName || !lastName || !validEmail) { setErr(true); return }
    setLoading(true)
    setErr(false)

    try {
      // Simular envío a endpoint (o usar fetch real si existe)
      await new Promise(r => setTimeout(r, 1500))
      
      console.log('Biobuilder signup:', { firstName, lastName, email: normalizedEmail, phone: phone ? `${dialCode}${phone}` : '', country, plan })
      
      setDone(true)
      setTimeout(() => {
        window.open(WHATSAPP_URL, '_blank')
      }, 2500)
    } catch (e) {
      setErr(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="comunidad" style={{ background: 'linear-gradient(160deg, var(--lime) 0%, #E8FF80 40%, var(--lime-lt) 100%)', position: 'relative', overflow: 'hidden' }}>
      
      {/* ── Bioluminescence (CellSystem) ── */}
      <Halo bottom="-40%" left="-12%"  size={255} fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.14)" delay={0}/>
      <Halo top="-32%"    right="-8%"  size={175} fill="rgba(14,14,14,.03)"    stroke="rgba(14,14,14,.07)"    delay={3} ccw/>

      <Cell top="7%"    left="3%"   size={110} mb="rgba(255,255,255,.09)" mf="rgba(255,255,255,.40)" spd="spin-cw 26s"   nb={25} nf="rgba(243,39,105,.28)" orbs={ORBS_ROSE()} delay={0}/>
      <Cell bottom="8%" right="3%"  size={65}  mb="rgba(255,255,255,.05)" mf="rgba(255,255,255,.20)" spd="spin-ccw 38s"  nb={15} nf="rgba(14,14,14,.30)"   orbs={ORBS_DARK()} delay={1.5}/>
      <Cell top="20%"   right="22%" size={50}  mb="rgba(255,255,255,.04)" mf="rgba(255,255,255,.18)" spd="spin-slow 48s" nb={12} nf="rgba(14,14,14,.24)"   orbs={ORBS_DARK()} delay={2.5}/>
      
      <Membrane top="48%"  right="38%" size={26} mb="rgba(255,255,255,.04)" mf="rgba(255,255,255,.16)" spd="spin-ccw 62s"  delay={2}/>
      <Dot top="34%"    right="8%"  size={9} fill="rgba(14,14,14,.18)"    anim="float-x" delay={1}/>
      <Dot bottom="24%" left="36%"  size={8} fill="rgba(255,255,255,.55)" anim="float-y" delay={2}/>

      {/* Top wave from white */}
      <div style={{ position: 'absolute', top: -1, left: 0, right: 0, zIndex: 1 }}>
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ width: '100%', height: 60, display: 'block' }}>
          <path d="M0,30 C360,0 1080,60 1440,30 L1440,0 L0,0 Z" fill="var(--white)" />
        </svg>
      </div>

      <div className="wrap sec" style={{ position: 'relative', paddingTop: '7rem', zIndex: 2 }}>
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
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start', marginBottom: '3rem' }} className="comm-grid">
            {/* Plans Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Starter Card */}
              <div style={{ background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(10px)', borderRadius: 20, padding: '1.5rem', boxShadow: '0 8px 32px rgba(14,14,14,0.08)', border: '1px solid rgba(255,255,255,0.4)', transition: 'all 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(193,244,0,0.6)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; e.currentTarget.style.transform = 'none' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.9rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                      <span style={{ fontFamily: 'var(--fout)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--dark)' }}>Starter</span>
                      <span className="badge badge-lime">Gratis</span>
                    </div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--t-dark2)', lineHeight: 1.5 }}>Para profesionales que inician. Clínicas mensuales, Radar de fondos, BBS Library.</div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: '1rem' }}>
                    <div style={{ fontFamily: 'var(--fbc)', fontSize: '2rem', fontWeight: 800, color: 'var(--dark)', lineHeight: 1 }}>$0</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--t-dark3)' }}>/mes</div>
                  </div>
                </div>
              </div>

              {/* PRO Card */}
              <a href={WHATSAPP_PRO} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', background: 'var(--dark)', borderRadius: 20, padding: '1.5rem', boxShadow: '0 12px 40px rgba(14,14,14,0.25)', border: '1px solid rgba(255,255,255,0.1)', transition: 'all 0.3s', display: 'block' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 20px 50px rgba(14,14,14,0.4)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(14,14,14,0.25)' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.9rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                      <span style={{ fontFamily: 'var(--fout)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--white)' }}>PRO</span>
                      <span className="badge" style={{ background: 'rgba(193,244,0,0.2)', color: 'var(--lime)', border: '1px solid rgba(193,244,0,0.3)' }}>Empresarial</span>
                    </div>
                    <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>4h/mes consultoría 1:1, Investment Matchmaking, Masterclasses avanzadas, podcast privado.</div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: '1rem' }}>
                    <div style={{ fontFamily: 'var(--fbc)', fontSize: '2rem', fontWeight: 800, color: 'var(--lime)', lineHeight: 1 }}>$87</div>
                    <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)' }}>/mes</div>
                  </div>
                </div>
                <div style={{ paddingTop: '0.75rem', borderTop: '1px dashed rgba(255,255,255,0.15)', fontSize: '0.72rem', color: 'var(--lime)', display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}>
                  <span>↗</span> Consultar por WhatsApp
                </div>
              </a>

              {/* Note */}
              <div style={{ background: 'rgba(14,14,14,0.06)', borderRadius: 12, padding: '1.2rem', fontSize: '0.82rem', lineHeight: 1.6, color: 'var(--t-dark2)', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--dark)', fontWeight: 900, flexShrink: 0 }}>→</span>
                <span>Todo suscriptor al <strong>Biotech Sprint 01</strong> se integra automáticamente a la comunidad Starter sin costo adicional.</span>
              </div>
            </div>

            {/* Form Column */}
            <div style={{ position: 'relative' }}>
              {!done ? (
                <div style={{ background: 'var(--white)', borderRadius: 24, padding: '2.5rem', boxShadow: '0 24px 64px rgba(14,14,14,0.15)', border: '1px solid rgba(14,14,14,0.02)' }}>
                  <div style={{ fontFamily: 'var(--fout)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--dark)', marginBottom: '0.5rem' }}>Registro de Membresía</div>
                  <p style={{ fontSize: '0.88rem', color: 'var(--t-dark2)', marginBottom: '1.8rem', lineHeight: 1.5 }}>Completa tus datos para activar tu acceso gratuito a la red de Biobuilders.</p>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                      <input type="text" value={firstName} onChange={e => { setFirstName(e.target.value); setErr(false) }} placeholder="Nombre" className={`field ${err && !firstName ? 'field-err' : ''}`} style={{ background: 'var(--bg-light)', border: '1px solid rgba(14,14,14,0.08)' }} />
                      <input type="text" value={lastName} onChange={e => { setLastName(e.target.value); setErr(false) }} placeholder="Apellido" className={`field ${err && !lastName ? 'field-err' : ''}`} style={{ background: 'var(--bg-light)', border: '1px solid rgba(14,14,14,0.08)' }} />
                    </div>
                    
                    <input type="email" value={email} onChange={e => { setEmail(e.target.value); setErr(false) }} placeholder="Correo electrónico" className={`field ${err && !validEmail ? 'field-err' : ''}`} style={{ background: 'var(--bg-light)', border: '1px solid rgba(14,14,14,0.08)' }} />
                    
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <select value={dialCode} onChange={e => setDialCode(e.target.value)} className="field" style={{ width: 105, flexShrink: 0, WebkitAppearance: 'none', background: 'var(--bg-light)', border: '1px solid rgba(14,14,14,0.08)' }}>
                        {COUNTRY_CODES.map(c => (<option key={c.code + c.name} value={c.code}>{c.flag} {c.code}</option>))}
                      </select>
                      <input type="tel" value={phone} onChange={e => setPhone(e.target.value.replace(/\D/g, ''))} placeholder="WhatsApp" className="field" style={{ flex: 1, background: 'var(--bg-light)', border: '1px solid rgba(14,14,14,0.08)' }} />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                      <input type="text" value={country} onChange={e => setCountry(e.target.value)} placeholder="País" className="field" style={{ background: 'var(--bg-light)', border: '1px solid rgba(14,14,14,0.08)' }} />
                      <select value={plan} onChange={e => setPlan(e.target.value)} className="field" style={{ background: 'var(--bg-light)', border: '1px solid rgba(14,14,14,0.08)', color: plan ? 'var(--dark)' : 'rgba(14,14,14,0.4)' }}>
                        <option value="" disabled>Interés</option>
                        <option value="starter">Membresía Starter</option>
                        <option value="pro">Membresía PRO</option>
                        <option value="curso">Biotech Sprint</option>
                      </select>
                    </div>

                    {err && <p style={{ fontSize: '0.8rem', color: 'var(--rose)', margin: '0.2rem 0', fontWeight: 600 }}>Por favor completa los campos requeridos.</p>}
                    
                    <button className="btn btn-rose btn-full btn-lg" onClick={submit} disabled={loading} style={{ height: 54, marginTop: '0.5rem', boxShadow: '0 8px 24px rgba(243,39,105,0.25)', opacity: loading ? 0.7 : 1 }}>
                      {loading ? 'Procesando...' : 'Unirme a la comunidad →'}
                    </button>
                    
                    <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--t-dark3)', marginTop: '0.5rem' }}>Acceso inmediato al grupo de WhatsApp al finalizar.</p>
                  </div>
                </div>
              ) : (
                <div style={{ background: 'var(--white)', borderRadius: 24, padding: '4rem 2.5rem', boxShadow: '0 24px 64px rgba(14,14,14,0.15)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1.2rem' }}>
                  <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--lime)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', boxShadow: '0 8px 24px rgba(193,244,0,0.3)' }}>✓</div>
                  <div>
                    <strong style={{ fontFamily: 'var(--fout)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--dark)', display: 'block', marginBottom: '0.5rem' }}>¡Bienvenido/a, Biobuilder!</strong>
                    <p style={{ fontSize: '0.95rem', color: 'var(--t-dark2)', lineHeight: 1.6 }}>Recibimos tus datos con éxito. En breve recibirás un correo con tus credenciales.</p>
                  </div>
                  <div style={{ width: '100%', height: '1px', background: 'rgba(14,14,14,0.06)', margin: '0.5rem 0' }}></div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--t-dark3)' }}>Redirigiendo al grupo exclusivo de WhatsApp...</p>
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-dark btn-lg btn-full" style={{ height: 50 }}>Ir al grupo ahora →</a>
                </div>
              )}
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Bottom wave to dark footer */}
      <div style={{ position: 'relative', marginTop: 80, zIndex: 1 }}>
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ width: '100%', height: 60, display: 'block' }}>
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="var(--dark)" />
        </svg>
      </div>

      <style>{`
        @media(max-width:960px){
          .comm-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </section>
  )
}
