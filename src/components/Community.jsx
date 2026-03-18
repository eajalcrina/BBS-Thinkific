import { useState } from 'react'
import FadeIn from './FadeIn.jsx'

export default function Community() {
  const [name,setName]=useState(''), [email,setEmail]=useState(''), [country,setCountry]=useState(''), [plan,setPlan]=useState(''), [err,setErr]=useState(false), [done,setDone]=useState(false)
  const submit = () => {
    const ok=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    if (!name||!ok){setErr(true);return}
    setErr(false);setDone(true)
  }
  const inp = (isErr=false) => ({ background:'rgba(255,255,255,0.04)', border:`1px solid ${isErr?'rgba(243,39,105,0.55)':'var(--b2)'}`, borderRadius:3, color:'#fff', fontFamily:'var(--fdm)', fontSize:'0.88rem', padding:'0.75rem 1rem', width:'100%', outline:'none', transition:'border-color 0.18s' })

  return (
    <section id="comunidad" className="sec-t" style={{ position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', top:'30%', left:'50%', transform:'translateX(-50%)', width:700, height:400,
        background:'radial-gradient(ellipse, rgba(200,240,0,0.04) 0%, transparent 70%)',
        filter:'blur(50px)', pointerEvents:'none' }}/>
      <div className="wrap" style={{ position:'relative' }}>
        <FadeIn><div className="label" style={{ marginBottom:'1rem' }}>Comunidad</div></FadeIn>
        <FadeIn delay={0.08}>
          <h2 className="t-out t-md" style={{ marginBottom:'0.9rem' }}>
            Únete a los <span className="hl">Biobuilders</span>
          </h2>
        </FadeIn>
        <FadeIn delay={0.14}>
          <p className="lead" style={{ maxWidth:540, marginBottom:'2.5rem' }}>
            La membresía Starter es <strong style={{ color:'var(--lime)' }}>gratuita</strong>. Forma parte de la red de bio-builders de América Latina y accede a inteligencia, comunidad y recursos para construir bionegocios que no fallan.
          </p>
        </FadeIn>

        <FadeIn delay={0.18}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', border:'1px solid var(--b2)', borderRadius:12, overflow:'hidden' }} className="comm-grid">
            {/* Left */}
            <div className="glass" style={{ padding:'2.5rem 2.2rem', borderRight:'1px solid var(--b1)', display:'flex', flexDirection:'column', borderRadius:0, border:'none' }}>
              <div className="label dim" style={{ marginBottom:'1rem' }}>Planes de membresía</div>
              <div style={{ display:'flex', flexDirection:'column', gap:'0.85rem', marginBottom:'1.3rem' }}>
                {/* Starter */}
                <div style={{ background:'rgba(12,12,26,0.6)', border:'1px solid var(--b2)', borderRadius:7, padding:'1.1rem 1.2rem', display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:'1rem', transition:'border-color 0.2s' }}
                  onMouseEnter={e=>e.currentTarget.style.borderColor='var(--b3)'}
                  onMouseLeave={e=>e.currentTarget.style.borderColor='var(--b2)'}
                >
                  <div>
                    <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'0.3rem' }}>
                      <span style={{ fontFamily:'var(--fout)', fontSize:'1.1rem', fontWeight:600, color:'#fff' }}>Starter</span>
                      <span className="badge badge-lime" style={{ fontSize:'0.58rem' }}>Gratis</span>
                    </div>
                    <div className="sm" style={{ color:'var(--t2)' }}>Para profesionales que inician. Clínicas mensuales, Radar de fondos, BBS Library y pitch feedback.</div>
                  </div>
                  <div style={{ textAlign:'right', flexShrink:0 }}>
                    <div style={{ fontFamily:'var(--fbc)', fontSize:'1.6rem', fontWeight:700, color:'var(--lime)', lineHeight:1 }}>$0</div>
                    <div className="sm">/mes</div>
                  </div>
                </div>
                {/* PRO */}
                <div style={{ background:'rgba(200,240,0,0.04)', border:'1px solid rgba(200,240,0,0.2)', borderRadius:7, padding:'1.1rem 1.2rem', display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:'1rem', transition:'border-color 0.2s' }}
                  onMouseEnter={e=>e.currentTarget.style.borderColor='rgba(200,240,0,0.38)'}
                  onMouseLeave={e=>e.currentTarget.style.borderColor='rgba(200,240,0,0.2)'}
                >
                  <div>
                    <div style={{ fontFamily:'var(--fout)', fontSize:'1.1rem', fontWeight:600, color:'#fff', marginBottom:'0.3rem' }}>PRO</div>
                    <div className="sm" style={{ color:'var(--t2)' }}>Para fundadores en operación. 4h/mes consultoría 1:1, Investment Matchmaking, Masterclasses avanzadas, podcast privado.</div>
                  </div>
                  <div style={{ textAlign:'right', flexShrink:0 }}>
                    <div style={{ fontFamily:'var(--fbc)', fontSize:'1.6rem', fontWeight:700, color:'var(--lime)', lineHeight:1 }}>$87</div>
                    <div className="sm">/mes</div>
                  </div>
                </div>
              </div>
              <div style={{ display:'flex', alignItems:'flex-start', gap:'0.6rem', background:'var(--lime10)', border:'1px solid var(--lime20)', borderRadius:5, padding:'0.78rem 1rem', fontSize:'0.8rem', lineHeight:1.55, color:'var(--t2)' }}>
                <span style={{ color:'var(--lime)', flexShrink:0, fontWeight:700 }}>→</span>
                Todo suscriptor al curso Biotech Sprint 01 se integra automáticamente a la comunidad Starter, sin costo adicional.
              </div>
            </div>

            {/* Right: form */}
            <div style={{ padding:'2.5rem 2.2rem', background:'var(--bg3)', display:'flex', flexDirection:'column' }}>
              {!done ? (
                <>
                  <div style={{ fontFamily:'var(--fout)', fontSize:'1.15rem', fontWeight:600, color:'#fff', marginBottom:'0.25rem' }}>Regístrate gratis</div>
                  <p className="sm" style={{ marginBottom:'1.1rem', color:'var(--t2)' }}>Empieza con la membresía Starter sin costo. Te contactamos con los accesos.</p>
                  <div style={{ display:'flex', flexDirection:'column', gap:'0.65rem' }}>
                    <input type="text" value={name} onChange={e=>{setName(e.target.value);setErr(false)}} placeholder="Nombre completo" style={inp()}/>
                    <input type="email" value={email} onChange={e=>{setEmail(e.target.value);setErr(false)}} placeholder="Correo electrónico" style={inp(err&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))}/>
                    <input type="text" value={country} onChange={e=>setCountry(e.target.value)} placeholder="País" style={inp()}/>
                    <select value={plan} onChange={e=>setPlan(e.target.value)}
                      style={{ ...inp(), color:plan?'#fff':'rgba(255,255,255,0.35)', WebkitAppearance:'none' }}>
                      <option value="" disabled>¿Qué te interesa?</option>
                      <option value="starter">Membresía Starter (gratis)</option>
                      <option value="pro">Membresía PRO — $87/mes</option>
                      <option value="curso">Curso Biotech Sprint 01</option>
                      <option value="todo">Todo lo anterior</option>
                    </select>
                    <button className="btn btn-lime btn-full" style={{ padding:'0.9rem', fontSize:'0.92rem', borderRadius:3 }} onClick={submit}>
                      Unirme a los Biobuilders →
                    </button>
                    <p className="sm" style={{ textAlign:'center' }}>Sin spam · Sin tarjeta · Solo bionegocios</p>
                  </div>
                </>
              ) : (
                <div style={{ display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center', padding:'2.5rem 1rem', gap:'0.8rem', flex:1, justifyContent:'center' }}>
                  <div style={{ width:52, height:52, borderRadius:'50%', background:'var(--lime10)', border:'2px solid var(--lime)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.4rem', color:'var(--lime)' }}>✓</div>
                  <strong style={{ fontFamily:'var(--fout)', fontSize:'1.1rem', fontWeight:600, color:'#fff', letterSpacing:'-0.01em' }}>¡Bienvenido/a a los Biobuilders!</strong>
                  <p className="body" style={{ color:'var(--t2)' }}>Recibimos tus datos. En las próximas 48h te enviamos tus accesos a la comunidad Starter.</p>
                </div>
              )}
            </div>
          </div>
        </FadeIn>
      </div>
      <style>{`@media(max-width:860px){.comm-grid{grid-template-columns:1fr!important}.comm-grid>div:first-child{border-right:none!important;border-bottom:1px solid var(--b1)}}`}</style>
    </section>
  )
}
