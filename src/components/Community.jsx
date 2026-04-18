import { useState } from 'react'
import FadeIn from './FadeIn.jsx'

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
  const [firstName,setFirstName]=useState('')
  const [lastName,setLastName]=useState('')
  const [email,setEmail]=useState('')
  const [dialCode,setDialCode]=useState('+51')
  const [phone,setPhone]=useState('')
  const [country,setCountry]=useState('')
  const [err,setErr]=useState(false)
  const [done,setDone]=useState(false)
  const [loading,setLoading]=useState(false)
  const normalizedEmail=email.trim().toLowerCase()
  const validEmail=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)

  const submit=async()=>{
    if(!firstName||!lastName||!validEmail){setErr(true);return}
    setLoading(true)
    try{
      const res=await fetch('/api/subscribe',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({firstName,lastName,email:normalizedEmail,phone:phone?`${dialCode}${phone}`:'',country})})
      if(!res.ok){setErr(true);setLoading(false);return}
      setErr(false);setDone(true)
      setTimeout(()=>{window.open(WHATSAPP_URL,'_blank')},2500)
    }catch{setErr(true)}finally{setLoading(false)}
  }

  return (
    <section id="comunidad" className="fro-sec" style={{ background:'var(--fro-bg-2)', borderTop:'1px solid var(--fro-line)', borderBottom:'1px solid var(--fro-line)' }}>
      <div className="fro-wrap">

        <FadeIn><div className="fro-eyebrow" style={{ marginBottom:'1.2rem' }}>Comunidad</div></FadeIn>

        <FadeIn delay={0.08}>
          <h2 className="fro-h2" style={{ marginBottom:'1rem' }}>
            Únete a los <span className="fro-italic-amber">Bio/Builders</span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.14}>
          <p className="fro-lead" style={{ maxWidth:560, marginBottom:'2.5rem' }}>
            Elige tu perfil y forma parte de la red de bio-builders de América Latina.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="comm-cards" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem', marginBottom:'1.6rem' }}>

            {/* Emprendedores */}
            <div className="fro-card" style={{ padding:'1.6rem', display:'flex', flexDirection:'column', gap:'0.8rem', background:'var(--fro-surface)' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'0.5rem' }}>
                <h3 className="fro-h3" style={{ fontSize:'1.35rem' }}>Emprendedores</h3>
                <span className="fro-chip" style={{ fontSize:'0.62rem', padding:'0.28rem 0.6rem' }}>Gratis</span>
              </div>
              <div style={{ fontFamily:'var(--fsyne)', fontSize:'2rem', fontWeight:700, color:'var(--fro-text)', lineHeight:1, letterSpacing:'-0.03em' }}>
                $0<span style={{ fontSize:'0.9rem', fontWeight:400, color:'var(--fro-text-3)', marginLeft:4 }}>/mes</span>
              </div>
              <p className="fro-sm" style={{ color:'var(--fro-text-2)' }}>
                Dirigido a jóvenes y no tan jóvenes que están iniciando su camino como emprendedores de bionegocios y buscan herramientas que los ayuden a vender desde el primer día.
              </p>
              <div style={{ marginTop:'auto', paddingTop:'0.75rem', borderTop:'1px solid var(--fro-line)', fontFamily:'var(--finter)', fontSize:'0.68rem', fontWeight:600, letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--fro-amber)' }}>
                Regístrate abajo sin costo
              </div>
            </div>

            {/* Empresarios */}
            <a href={WHATSAPP_PRO} target="_blank" rel="noopener noreferrer" className="fro-card"
              style={{ textDecoration:'none', padding:'1.6rem', display:'flex', flexDirection:'column', gap:'0.8rem', background:'var(--fro-bg)', transition:'all 0.25s' }}
              onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.borderColor='var(--fro-amber-25)'; }}
              onMouseLeave={e=>{ e.currentTarget.style.transform='none'; e.currentTarget.style.borderColor='var(--fro-line)'; }}>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:'0.5rem' }}>
                <h3 className="fro-h3" style={{ fontSize:'1.35rem' }}>Empresarios</h3>
                <span style={{ fontFamily:'var(--finter)', fontSize:'0.6rem', fontWeight:700, letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--fro-amber)' }}>↗ WhatsApp</span>
              </div>
              <div style={{ fontFamily:'var(--finter)', fontSize:'0.9rem', fontWeight:600, color:'var(--fro-amber)', letterSpacing:'0.08em', textTransform:'uppercase' }}>
                Asesoría personalizada
              </div>
              <p className="fro-sm" style={{ color:'var(--fro-text-2)' }}>
                Dirigido a empresarios que enfrentan a diario los desafíos de sacar adelante sus bionegocios y lograr ventas a nivel nacional e internacional.
              </p>
              <div style={{ marginTop:'auto', paddingTop:'0.75rem', borderTop:'1px solid var(--fro-line)', fontSize:'0.7rem', color:'var(--fro-text-3)', display:'flex', alignItems:'center', gap:'0.4rem' }}>
                <span aria-hidden>💬</span> Toca para consultar por WhatsApp
              </div>
            </a>
          </div>

          {!done ? (
            <div>
              <div style={{ display:'flex', alignItems:'center', gap:'0.6rem', marginBottom:'0.9rem', flexWrap:'wrap' }}>
                <span className="fro-chip">Formulario Emprendedores</span>
                <span style={{ fontSize:'0.78rem', color:'var(--fro-text-3)' }}>Empieza hoy sin costo</span>
              </div>

              <form
                onSubmit={e => { e.preventDefault(); submit(); }}
                className="fro-card"
                style={{ padding:'1.8rem', background:'var(--fro-surface)' }}
                aria-labelledby="comm-form-title"
              >
                <h3 id="comm-form-title" className="fro-h3" style={{ marginBottom:'0.3rem' }}>Regístrate gratis</h3>
                <p className="fro-sm" style={{ color:'var(--fro-text-2)', marginBottom:'1.3rem' }}>
                  Empieza con la membresía Emprendedores sin costo. Te contactamos con los accesos.
                </p>

                <div style={{ display:'flex', flexDirection:'column', gap:'0.7rem' }}>
                  <div className="form-row" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.7rem' }}>
                    <input type="text" name="firstName" autoComplete="given-name" value={firstName} onChange={e=>{setFirstName(e.target.value);setErr(false)}} placeholder="Nombres" aria-label="Nombres" className={`fro-field${err&&!firstName?' fro-field-err':''}`} required/>
                    <input type="text" name="lastName" autoComplete="family-name" value={lastName} onChange={e=>{setLastName(e.target.value);setErr(false)}} placeholder="Apellidos" aria-label="Apellidos" className={`fro-field${err&&!lastName?' fro-field-err':''}`} required/>
                  </div>
                  <input type="email" name="email" autoComplete="email" value={email} onChange={e=>{setEmail(e.target.value);setErr(false)}} placeholder="Correo electrónico" aria-label="Correo electrónico" className={`fro-field${err&&!validEmail?' fro-field-err':''}`} required/>
                  <div style={{ display:'flex', gap:'0.5rem' }}>
                    <select value={dialCode} onChange={e=>setDialCode(e.target.value)} aria-label="Código de país" className="fro-field" style={{ width:120, flexShrink:0, appearance:'none', WebkitAppearance:'none', background:'rgba(255,255,255,0.04) url("data:image/svg+xml;utf8,<svg xmlns=%27http://www.w3.org/2000/svg%27 width=%2710%27 height=%276%27 viewBox=%270 0 10 6%27><path d=%27M1 1l4 4 4-4%27 stroke=%27%23888%27 fill=%27none%27/></svg>") no-repeat right 0.75rem center' }}>
                      {COUNTRY_CODES.map(c => (<option key={c.code+c.name} value={c.code} style={{ background:'var(--fro-bg-2)', color:'var(--fro-text)' }}>{c.flag} {c.code}</option>))}
                    </select>
                    <input type="tel" name="phone" autoComplete="tel" value={phone} onChange={e=>setPhone(e.target.value.replace(/\D/g,''))} placeholder="Celular" aria-label="Celular" className="fro-field" style={{ flex:1 }}/>
                  </div>
                  <input type="text" name="country" autoComplete="country-name" value={country} onChange={e=>setCountry(e.target.value)} placeholder="País" aria-label="País" className="fro-field"/>
                  {err && <p role="alert" style={{ fontSize:'0.78rem', color:'var(--fro-danger)', margin:'0.1rem 0' }}>Completa nombres, apellidos y correo para continuar.</p>}
                  <button type="submit" className="fro-btn fro-btn-amber fro-btn-full fro-btn-lg" disabled={loading} style={{ opacity:loading?0.7:1, cursor:loading?'not-allowed':'pointer' }}>
                    {loading?'Enviando...':'Unirme a los Bio/Builders →'}
                  </button>
                  <p style={{ textAlign:'center', fontSize:'0.72rem', color:'var(--fro-text-3)', lineHeight:1.55 }}>
                    Sin spam · Sin tarjeta · Solo bionegocios.<br/>
                    Al enviar, aceptas recibir comunicaciones de Bio Business School.{' '}
                    <a href="/privacidad" style={{ color:'var(--fro-text-2)', textDecoration:'underline' }}>Política de privacidad</a>.
                  </p>
                </div>
              </form>
            </div>
          ) : (
            <div className="fro-card" role="status" aria-live="polite" style={{ padding:'2.5rem 2rem', background:'var(--fro-surface)', display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center', gap:'1rem' }}>
              <div aria-hidden style={{ width:60, height:60, borderRadius:'50%', background:'var(--fro-amber)', color:'var(--fro-bg)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.6rem', fontWeight:700 }}>✓</div>
              <strong className="fro-h3">¡Bienvenido/a a los Bio/Builders!</strong>
              <p className="fro-body" style={{ maxWidth:400 }}>Recibimos tus datos. En las próximas 48h te enviamos tus accesos a la comunidad Emprendedores.</p>
              <p className="fro-sm">Redirigiendo al grupo de WhatsApp…</p>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="fro-btn fro-btn-amber fro-btn-lg">Ir al grupo ahora <span aria-hidden>→</span></a>
            </div>
          )}
        </FadeIn>
      </div>

      <style>{`
        @media(max-width: 860px){
          .comm-cards { grid-template-columns: 1fr !important; }
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
