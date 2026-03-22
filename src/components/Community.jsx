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
    <section id="comunidad" style={{ background:'var(--lime)', position:'relative', overflow:'hidden' }}>

      {/* ── Halos ── */}
      <Halo bottom="-40%" left="-12%"  size={255} fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.14)" delay={0}/>
      <Halo top="-32%"    right="-8%"  size={175} fill="rgba(14,14,14,.03)"    stroke="rgba(14,14,14,.07)"    delay={3} ccw/>

      {/* ── Células ── */}
      <Cell top="7%"    left="3%"   size={110} mb="rgba(255,255,255,.09)" mf="rgba(255,255,255,.40)" spd="spin-cw 26s"   nb={25} nf="rgba(243,39,105,.28)" orbs={ORBS_ROSE()} delay={0}/>
      <Cell bottom="8%" right="3%"  size={65}  mb="rgba(255,255,255,.05)" mf="rgba(255,255,255,.20)" spd="spin-ccw 38s"  nb={15} nf="rgba(14,14,14,.30)"   orbs={ORBS_DARK()} delay={1.5}/>
      <Cell top="20%"   right="22%" size={50}  mb="rgba(255,255,255,.04)" mf="rgba(255,255,255,.18)" spd="spin-slow 48s" nb={12} nf="rgba(14,14,14,.24)"   orbs={ORBS_DARK()} delay={2.5}/>
      <Cell bottom="18%" left="30%" size={36}  mb="rgba(255,255,255,.04)" mf="rgba(255,255,255,.16)" spd="spin-cw 56s"   nb={8}  nf="rgba(243,39,105,.22)" orbs={ORBS_ROSE()} delay={3.5}/>

      {/* ── Membranas ── */}
      <Membrane top="48%"  right="38%" size={26} mb="rgba(255,255,255,.04)" mf="rgba(255,255,255,.16)" spd="spin-ccw 62s"  delay={2}/>
      <Membrane top="15%"  left="42%"  size={18} mb="rgba(14,14,14,.02)"    mf="rgba(14,14,14,.08)"    spd="spin-slow 68s" delay={5}/>

      {/* ── Puntos ── */}
      <Dot top="34%"    right="8%"  size={9} fill="rgba(14,14,14,.18)"    anim="float-x" delay={1}/>
      <Dot bottom="24%" left="36%"  size={8} fill="rgba(255,255,255,.55)" anim="float-y" delay={2}/>
      <Dot top="58%"    right="34%" size={6} fill="rgba(14,14,14,.14)"    anim="float-d" delay={3.5}/>

      <div className="wrap sec" style={{ position:'relative', paddingTop:'5rem' }}>
        <FadeIn><div className="label lime" style={{ marginBottom:'1rem' }}>Comunidad</div></FadeIn>
        <FadeIn delay={0.08}><h2 className="t-out t-lg" style={{ marginBottom:'0.9rem', color:'var(--dark)' }}>Únete a los <em style={{ fontStyle:'normal', color:'var(--rose)', fontWeight:700 }}>Biobuilders</em></h2></FadeIn>
        <FadeIn delay={0.14}><p className="lead" style={{ color:'var(--t-dark2)', maxWidth:540, marginBottom:'2.5rem' }}>Elige tu perfil y forma parte de la red de bio-builders de América Latina.</p></FadeIn>

        <FadeIn delay={0.18}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.25rem', marginBottom:'1.25rem' }} className="comm-cards">
            <div style={{ background:'var(--white)', borderRadius:20, padding:'1.5rem', boxShadow:'0 8px 28px rgba(14,14,14,0.10)', border:'2px solid transparent', transition:'border-color 0.2s', display:'flex', flexDirection:'column', gap:'0.75rem' }}
              onMouseEnter={e=>e.currentTarget.style.borderColor='rgba(193,244,0,0.6)'}
              onMouseLeave={e=>e.currentTarget.style.borderColor='transparent'}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                <div><div style={{ display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'0.35rem' }}><span style={{ fontFamily:'var(--fout)', fontSize:'1.55rem', fontWeight:700, color:'var(--dark)', lineHeight:1.1 }}>Emprendedores</span><span className="badge badge-lime">Gratis</span></div><div style={{ fontFamily:'var(--fbc)', fontSize:'2rem', fontWeight:800, color:'var(--dark)', lineHeight:1 }}>$0<span style={{ fontSize:'0.9rem', fontWeight:400, color:'var(--t-dark3)', marginLeft:3 }}>/mes</span></div></div>
              </div>
              <p style={{ fontSize:'0.82rem', color:'var(--t-dark2)', lineHeight:1.65, margin:0 }}>Dirigido a jóvenes y no tan jóvenes que están iniciando su camino como emprendedores de bionegocios y buscan herramientas que los ayuden a vender desde el primer día.</p>
              <div style={{ marginTop:'auto', paddingTop:'0.75rem', borderTop:'1px dashed rgba(14,14,14,0.10)', fontFamily:'var(--fbc)', fontSize:'0.68rem', fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase', color:'rgba(100,140,0,0.8)', display:'flex', alignItems:'center', gap:'0.4rem' }}>Regístrate abajo sin costo</div>
            </div>
            <a href={WHATSAPP_PRO} target="_blank" rel="noopener noreferrer"
              style={{ textDecoration:'none', background:'var(--dark)', borderRadius:20, padding:'1.5rem', boxShadow:'0 8px 28px rgba(14,14,14,0.20)', display:'flex', flexDirection:'column', gap:'0.75rem', transition:'all 0.25s' }}
              onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow='0 16px 40px rgba(14,14,14,0.32)'; }}
              onMouseLeave={e=>{ e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='0 8px 28px rgba(14,14,14,0.20)'; }}>
              <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'0.35rem' }}><span style={{ fontFamily:'var(--fout)', fontSize:'1.55rem', fontWeight:700, color:'var(--white)', lineHeight:1.1 }}>Empresarios</span><span style={{ fontFamily:'var(--fbc)', fontSize:'0.6rem', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--lime)', opacity:0.85 }}>↗ WA</span></div>
              <div style={{ fontFamily:'var(--fbc)', fontSize:'1rem', fontWeight:700, color:'var(--lime)', letterSpacing:'0.06em', textTransform:'uppercase', lineHeight:1 }}>Asesoría personalizada</div>
              <p style={{ fontSize:'0.82rem', color:'rgba(255,255,255,0.88)', lineHeight:1.65, margin:0 }}>Dirigido a empresarios que enfrentan a diario los desafíos de sacar adelante sus bionegocios y lograr ventas a nivel nacional e internacional.</p>
              <div style={{ marginTop:'auto', paddingTop:'0.75rem', borderTop:'1px dashed rgba(255,255,255,0.12)', fontSize:'0.72rem', color:'rgba(255,255,255,0.38)', display:'flex', alignItems:'center', gap:'0.4rem' }}><span>💬</span> Toca para consultar por WhatsApp</div>
            </a>
          </div>

          {!done ? (
            <div>
              <div style={{ display:'flex', alignItems:'center', gap:'0.6rem', marginBottom:'0.85rem' }}>
                <span style={{ background:'var(--dark)', color:'var(--lime)', fontFamily:'var(--fbc)', fontSize:'0.68rem', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', padding:'0.3rem 0.9rem', borderRadius:50, whiteSpace:'nowrap' }}>Formulario Emprendedores</span>
                <span style={{ fontSize:'0.78rem', color:'var(--t-dark2)' }}>Empieza hoy sin costo</span>
              </div>
              <div style={{ background:'var(--white)', borderRadius:20, padding:'2rem', boxShadow:'0 16px 48px rgba(14,14,14,0.12)' }}>
                <div style={{ fontFamily:'var(--fout)', fontSize:'1.3rem', fontWeight:600, color:'var(--dark)', marginBottom:'0.25rem' }}>Regístrate gratis</div>
                <p style={{ fontSize:'0.85rem', color:'var(--t-dark2)', marginBottom:'1.3rem' }}>Empieza con la membresía Emprendedores sin costo. Te contactamos con los accesos.</p>
                <div style={{ display:'flex', flexDirection:'column', gap:'0.65rem' }}>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.65rem' }}>
                    <input type="text" value={firstName} onChange={e=>{setFirstName(e.target.value);setErr(false)}} placeholder="Nombres" className={`field${err&&!firstName?' field-err':''}`}/>
                    <input type="text" value={lastName} onChange={e=>{setLastName(e.target.value);setErr(false)}} placeholder="Apellidos" className={`field${err&&!lastName?' field-err':''}`}/>
                  </div>
                  <input type="email" value={email} onChange={e=>{setEmail(e.target.value);setErr(false)}} placeholder="Correo electrónico" className={`field${err&&!validEmail?' field-err':''}`}/>
                  <div style={{ display:'flex', gap:'0.5rem' }}>
                    <select value={dialCode} onChange={e=>setDialCode(e.target.value)} className="field" style={{ width:110, flexShrink:0, WebkitAppearance:'none', paddingRight:'0.5rem' }}>{COUNTRY_CODES.map(c=>(<option key={c.code+c.name} value={c.code}>{c.flag} {c.code}</option>))}</select>
                    <input type="tel" value={phone} onChange={e=>setPhone(e.target.value.replace(/\D/g,''))} placeholder="Celular" className="field" style={{ flex:1 }}/>
                  </div>
                  <input type="text" value={country} onChange={e=>setCountry(e.target.value)} placeholder="País" className="field"/>
                  {err&&<p style={{ fontSize:'0.78rem', color:'var(--rose)', margin:'0.1rem 0' }}>Completa nombres, apellidos y correo para continuar.</p>}
                  <button className="btn btn-rose btn-full btn-lg" onClick={submit} disabled={loading} style={{ opacity:loading?0.7:1, cursor:loading?'not-allowed':'pointer' }}>{loading?'Enviando...':'Unirme a los Biobuilders →'}</button>
                  <p style={{ textAlign:'center', fontSize:'0.72rem', color:'var(--t-dark3)' }}>Sin spam · Sin tarjeta · Solo bionegocios</p>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ background:'var(--white)', borderRadius:20, padding:'3rem 2rem', boxShadow:'0 16px 48px rgba(14,14,14,0.12)', display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center', gap:'1rem' }}>
              <div style={{ width:60, height:60, borderRadius:'50%', background:'var(--lime)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.6rem' }}>✓</div>
              <strong style={{ fontFamily:'var(--fout)', fontSize:'1.2rem', fontWeight:600, color:'var(--dark)' }}>¡Bienvenido/a a los Biobuilders!</strong>
              <p style={{ fontSize:'0.9rem', color:'var(--t-dark2)', lineHeight:1.65 }}>Recibimos tus datos. En las próximas 48h te enviamos tus accesos a la comunidad Emprendedores.</p>
              <p style={{ fontSize:'0.82rem', color:'var(--t-dark3)' }}>Redirigiendo al grupo de WhatsApp...</p>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-dark btn-lg">Ir al grupo ahora →</a>
            </div>
          )}
        </FadeIn>
      </div>

      <div style={{ position:'relative', marginTop:60 }}>
        <svg viewBox="0 0 1440 110" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ width:'100%', height:110, display:'block' }}>
          <path d="M0,72 C200,20 440,92 720,38 C1000,2 1240,78 1440,48 L1440,110 L0,110 Z" fill="rgba(14,14,14,0.28)"/>
          <path d="M0,84 C220,40 455,100 740,52 C1020,18 1260,88 1440,60 L1440,110 L0,110 Z" fill="var(--dark)"/>
        </svg>
      </div>
      <style>{`@media(max-width:860px){.comm-cards{grid-template-columns:1fr!important}}`}</style>
    </section>
  )
}
