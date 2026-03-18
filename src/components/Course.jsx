import FadeIn from './FadeIn.jsx'

const features = [
  '8 semanas de aprendizaje dual: DeepTech aplicado + Business Design',
  'Co-diseñado con 404 Tech Found — validación técnica y científica',
  'Masterclasses con expertos regionales en biotecnología e inversión',
  'Proyecto de bionegocio real: construyes mientras aprendes',
  'Membresía Starter Biobuilders incluida durante el curso',
  'Red de pares y contactos en América Latina',
]
const included = [
  '8 módulos especializados en video',
  'Sesiones en vivo con mentores',
  'Plantillas y frameworks propietarios BBS',
  'Certificado BBS + 404 Tech Found',
  'Membresía Starter incluida',
]

export default function Course() {
  return (
    <section id="curso" className="section" style={{position:'relative', overflow:'hidden'}}>
      {/* Rose ambient glow for this section */}
      <div style={{position:'absolute', top:0, left:0, right:0, bottom:0,
        background:'radial-gradient(ellipse 70% 55% at 50% 0%, rgba(243,39,105,0.06) 0%, transparent 70%)',
        pointerEvents:'none'}}/>

      <div className="container" style={{position:'relative'}}>
        {/* Section header */}
        <FadeIn>
          <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'2rem', flexWrap:'wrap', gap:'1rem'}}>
            <div className="label rose">Curso especializado · Lanzamiento</div>
            <div style={{display:'flex', alignItems:'center', gap:'0.6rem'}}>
              <img src="/logo-red.png" alt="BBS" style={{height:18, width:'auto', opacity:0.9}}/>
              <span style={{fontFamily:'var(--fd)', fontSize:'0.72rem', fontWeight:500, letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--text-3)'}}>× 404 Tech Found</span>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div style={{background:'var(--bg-2)', border:'1px solid rgba(243,39,105,0.22)', borderRadius:8, overflow:'hidden', position:'relative'}}>
            {/* rose top bar */}
            <div style={{height:2, background:'linear-gradient(90deg, var(--rose) 0%, rgba(243,39,105,0.3) 100%)'}}/>

            {/* Top meta bar */}
            <div style={{background:'rgba(243,39,105,0.05)', borderBottom:'1px solid rgba(243,39,105,0.12)', padding:'0.9rem 2.2rem', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'0.6rem'}}>
              <div style={{display:'flex', alignItems:'center', gap:'0.6rem', flexWrap:'wrap'}}>
                <span className="badge badge-rose">⚡ Early Bird 2026</span>
                <span style={{fontFamily:'var(--fd)', fontSize:'0.78rem', fontWeight:500, letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--rose)'}}>Curso especializado · 8 semanas · Online</span>
              </div>
              <span style={{fontFamily:'var(--fd)', fontSize:'0.72rem', fontWeight:500, letterSpacing:'0.07em', textTransform:'uppercase', color:'var(--text-3)'}}>
                Co-creado con <span style={{color:'var(--text-2)'}}>404 Tech Found</span>
              </span>
            </div>

            {/* Body */}
            <div style={{display:'grid', gridTemplateColumns:'1fr 320px'}} className="course-body">
              {/* Left */}
              <div style={{padding:'2.6rem 2.2rem', borderRight:'1px solid var(--border)'}}>
                <h2 style={{fontFamily:'var(--fd)', fontWeight:400, fontSize:'clamp(2.4rem,5vw,4.2rem)', lineHeight:0.9, color:'#fff', marginBottom:'0.35rem'}}>
                  BIOTECH<br/>
                  <span style={{fontWeight:700, color:'var(--rose)'}}>SPRINT 01</span>
                </h2>
                <p style={{fontFamily:'var(--fd)', fontSize:'0.88rem', fontWeight:400, letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--text-3)', marginBottom:'1.5rem'}}>
                  Del laboratorio al mercado
                </p>

                <div style={{display:'flex', flexWrap:'wrap', gap:'0.4rem', marginBottom:'1.6rem'}}>
                  {['DeepTech','Business Design','Bioeconomía','8 semanas','Online'].map(p=>(
                    <span key={p} style={{background:'rgba(243,39,105,0.08)', border:'1px solid rgba(243,39,105,0.18)', padding:'0.2rem 0.65rem', borderRadius:2, fontFamily:'var(--fd)', fontSize:'0.65rem', fontWeight:600, letterSpacing:'0.07em', textTransform:'uppercase', color:'rgba(243,39,105,0.85)'}}>{p}</span>
                  ))}
                </div>

                <p className="body-m" style={{marginBottom:'1.6rem', maxWidth:480}}>
                  Aprende a convertir conocimiento biotecnológico en modelos de negocio técnica y financieramente viables. Diseñado para científicos, emprendedores y profesionales que quieren liderar la próxima generación de bionegocios en LATAM.
                </p>

                <ul className="feat rose">
                  {features.map(f=>(
                    <li key={f} style={{color:'var(--text-2)'}}>
                      <span style={{color:'var(--rose)',fontWeight:700,flexShrink:0}}>→</span>{f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right pricing */}
              <div style={{padding:'2.6rem 2rem', background:'rgba(243,39,105,0.03)', display:'flex', flexDirection:'column'}}>
                {/* Price stack */}
                <div style={{background:'var(--bg-3)', border:'1px solid rgba(243,39,105,0.18)', borderRadius:6, overflow:'hidden', marginBottom:'1.4rem'}}>
                  <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0.85rem 1.1rem', borderBottom:'1px solid var(--border)'}}>
                    <div style={{fontFamily:'var(--fd)', fontSize:'0.7rem', fontWeight:500, letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--text-3)'}}>Precio regular</div>
                    <div style={{fontFamily:'var(--fd)', fontSize:'1rem', fontWeight:600, color:'var(--text-3)', textDecoration:'line-through'}}>$55</div>
                  </div>
                  <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'1.1rem 1.1rem', borderBottom:'1px solid var(--border)', background:'rgba(243,39,105,0.07)'}}>
                    <div>
                      <div style={{fontFamily:'var(--fd)', fontSize:'0.7rem', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--rose)'}}>Early Bird</div>
                      <div style={{fontSize:'0.68rem', color:'var(--text-3)', marginTop:'0.1rem'}}>Precio especial de lanzamiento</div>
                    </div>
                    <div style={{fontFamily:'var(--fd)', fontSize:'3rem', fontWeight:700, color:'var(--rose)', lineHeight:1}}>$40</div>
                  </div>
                  <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0.85rem 1.1rem'}}>
                    <div>
                      <div style={{fontFamily:'var(--fd)', fontSize:'0.68rem', fontWeight:600, letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--text-3)'}}>Comunidad 404 & Starter</div>
                      <div style={{fontSize:'0.68rem', color:'var(--text-3)', marginTop:'0.1rem', lineHeight:1.4}}>Miembros 404 Tech Found y Biobuilders Starter</div>
                    </div>
                    <div style={{fontFamily:'var(--fd)', fontSize:'1.7rem', fontWeight:700, color:'rgba(243,39,105,0.65)', lineHeight:1}}>$35</div>
                  </div>
                </div>

                <ul style={{listStyle:'none', display:'flex', flexDirection:'column', gap:'0.4rem', marginBottom:'1.5rem'}}>
                  {included.map(inc=>(
                    <li key={inc} style={{fontSize:'0.8rem', color:'var(--text-2)', display:'flex', alignItems:'flex-start', gap:'0.45rem', lineHeight:1.45}}>
                      <span style={{color:'var(--rose)', fontWeight:700, flexShrink:0}}>✓</span>{inc}
                    </li>
                  ))}
                </ul>

                <a href="https://biobusinessschool.org/sprint01" className="btn btn-rose btn-full btn-lg" style={{marginBottom:'0.65rem'}}>
                  Inscribirme al Sprint 01 →
                </a>
                <p style={{textAlign:'center', fontSize:'0.72rem', color:'var(--text-3)'}}>Cupos limitados · Primera cohorte Q2 2026</p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
      <style>{`@media(max-width:860px){.course-body{grid-template-columns:1fr!important}.course-body>div:first-child{border-right:none!important;border-bottom:1px solid var(--border)}}`}</style>
    </section>
  )
}
