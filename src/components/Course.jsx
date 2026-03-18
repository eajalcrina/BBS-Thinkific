import FadeIn from './FadeIn.jsx'
import { motion } from 'framer-motion'

const features = [
  '8 semanas de aprendizaje dual: DeepTech aplicado + Business Design',
  'Co-diseñado con 404 Tech Found — validación técnica y científica',
  'Masterclasses con expertos regionales en biotecnología e inversión',
  'Proyecto de bionegocio real: construyes mientras aprendes',
  'Membresía Starter Biobuilders incluida durante el curso',
  'Red de pares y contactos en América Latina',
]
const included = ['8 módulos en video','Sesiones en vivo con mentores','Frameworks propietarios BBS','Certificado BBS + 404 Tech Found','Membresía Starter incluida']

export default function Course() {
  return (
    <section id="curso" className="on-rose" style={{ background:'var(--rose)', position:'relative', overflow:'hidden' }}>
      {/* Decorative circles */}
      <div style={{ position:'absolute', top:'-20%', right:'-5%', width:500, height:500, borderRadius:'50%', background:'rgba(255,255,255,0.06)', pointerEvents:'none' }}/>
      <div style={{ position:'absolute', bottom:'-15%', left:'-8%', width:400, height:400, borderRadius:'50%', background:'rgba(255,255,255,0.04)', pointerEvents:'none' }}/>
      <div style={{ position:'absolute', top:'15%', right:'12%', width:120, height:120, borderRadius:'50%', background:'var(--lime)', opacity:0.15, pointerEvents:'none' }} className="float-y"/>

      {/* Top wave from cream */}
      <div style={{ position:'absolute', top:-1, left:0, right:0 }}>
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ width:'100%', height:60, display:'block' }}>
          <path d="M0,30 C360,0 1080,60 1440,30 L1440,0 L0,0 Z" fill="var(--cream)"/>
        </svg>
      </div>

      <div className="wrap sec" style={{ position:'relative', paddingTop:'6rem' }}>
        {/* Header */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'2.5rem', flexWrap:'wrap', gap:'1rem' }}>
          <FadeIn><div className="label white">Curso especializado · Lanzamiento 2026</div></FadeIn>
          <FadeIn delay={0.1}>
            <div style={{ display:'flex', alignItems:'center', gap:'0.6rem' }}>
              <img src="/logo-red.png" alt="BBS" style={{ height:19, width:'auto', filter:'brightness(0) invert(1)', opacity:0.9 }}/>
              <span style={{ fontFamily:'var(--fbc)', fontSize:'0.72rem', fontWeight:500, letterSpacing:'0.08em', textTransform:'uppercase', color:'rgba(255,255,255,0.7)' }}>× 404 Tech Found</span>
            </div>
          </FadeIn>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 340px', gap:'3rem', alignItems:'start' }} className="course-grid">
          {/* Left */}
          <div>
            <FadeIn>
              <div style={{ display:'flex', gap:'0.6rem', marginBottom:'1.4rem', flexWrap:'wrap' }}>
                <span className="badge badge-lime">⚡ Early Bird</span>
                <span className="badge badge-white">8 semanas · Online</span>
                <span className="badge badge-white">DeepTech + Business</span>
              </div>
            </FadeIn>
            <FadeIn delay={0.08}>
              <h2 style={{ fontFamily:'var(--fout)', fontWeight:300, fontSize:'clamp(2.4rem,5vw,4.5rem)', lineHeight:0.9, color:'var(--white)', marginBottom:'0.35rem', letterSpacing:'-0.02em' }}>
                BIOTECH<br/><strong style={{ fontWeight:800, color:'var(--lime)' }}>SPRINT 01</strong>
              </h2>
            </FadeIn>
            <FadeIn delay={0.12}>
              <p style={{ fontFamily:'var(--fbc)', fontSize:'0.9rem', letterSpacing:'0.1em', textTransform:'uppercase', color:'rgba(255,255,255,0.6)', marginBottom:'1.6rem' }}>Del laboratorio al mercado</p>
            </FadeIn>
            <FadeIn delay={0.16}>
              <p style={{ fontSize:'1rem', color:'rgba(255,255,255,0.82)', lineHeight:1.75, marginBottom:'1.8rem', maxWidth:500, fontWeight:300 }}>
                Aprende a convertir conocimiento biotecnológico en modelos de negocio técnica y financieramente viables. Diseñado para científicos, emprendedores y profesionales de LATAM.
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <ul className="feat on-rose-bg">
                {features.map(f=>(
                  <li key={f}>
                    <span style={{ color:'var(--lime)', fontWeight:700, flexShrink:0 }}>→</span>
                    <span style={{ color:'rgba(255,255,255,0.82)' }}>{f}</span>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>

          {/* Right: Pricing card */}
          <FadeIn delay={0.15}>
            <div style={{ background:'var(--white)', borderRadius:20, overflow:'hidden', boxShadow:'0 24px 64px rgba(14,14,14,0.25)' }}>
              {/* Lime top bar */}
              <div style={{ background:'var(--lime)', padding:'0.7rem 1.4rem', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <span style={{ fontFamily:'var(--fbc)', fontSize:'0.7rem', fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--dark)' }}>Precios de lanzamiento</span>
                <span style={{ fontFamily:'var(--fbc)', fontSize:'0.7rem', fontWeight:600, color:'var(--dark)', opacity:0.6 }}>Q2 2026</span>
              </div>

              <div style={{ padding:'1.5rem' }}>
                {/* Price stack */}
                <div style={{ display:'flex', flexDirection:'column', gap:0, marginBottom:'1.4rem', border:'1px solid rgba(14,14,14,0.08)', borderRadius:12, overflow:'hidden' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'0.9rem 1rem', background:'var(--cream)', borderBottom:'1px solid rgba(14,14,14,0.06)' }}>
                    <div>
                      <div style={{ fontFamily:'var(--fbc)', fontSize:'0.65rem', fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--t-dark3)' }}>Precio regular</div>
                    </div>
                    <div style={{ fontFamily:'var(--fbc)', fontSize:'1rem', fontWeight:600, color:'var(--t-dark3)', textDecoration:'line-through' }}>$55</div>
                  </div>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'1rem', background:'rgba(193,244,0,0.08)', borderBottom:'1px solid rgba(14,14,14,0.06)' }}>
                    <div>
                      <div style={{ fontFamily:'var(--fbc)', fontSize:'0.68rem', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--rose)' }}>Early Bird</div>
                      <div style={{ fontSize:'0.7rem', color:'var(--t-dark3)', marginTop:'0.1rem' }}>Precio especial de lanzamiento</div>
                    </div>
                    <div style={{ fontFamily:'var(--fbc)', fontSize:'2.8rem', fontWeight:800, color:'var(--dark)', lineHeight:1 }}>$40</div>
                  </div>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'0.9rem 1rem' }}>
                    <div>
                      <div style={{ fontFamily:'var(--fbc)', fontSize:'0.65rem', fontWeight:600, letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--t-dark3)' }}>Comunidad 404 & Starter</div>
                      <div style={{ fontSize:'0.68rem', color:'var(--t-dark3)', marginTop:'0.1rem', lineHeight:1.4 }}>Miembros 404 y Biobuilders Starter</div>
                    </div>
                    <div style={{ fontFamily:'var(--fbc)', fontSize:'1.6rem', fontWeight:700, color:'var(--rose)', lineHeight:1 }}>$35</div>
                  </div>
                </div>

                <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:'0.4rem', marginBottom:'1.2rem' }}>
                  {included.map(inc=>(
                    <li key={inc} style={{ fontSize:'0.8rem', color:'var(--t-dark2)', display:'flex', alignItems:'flex-start', gap:'0.45rem', lineHeight:1.45 }}>
                      <span style={{ color:'var(--rose)', fontWeight:700, flexShrink:0 }}>✓</span>{inc}
                    </li>
                  ))}
                </ul>

                <a href="https://biobusinessschool.org/sprint01" className="btn btn-dark btn-full btn-lg" style={{ marginBottom:'0.5rem' }}>
                  Inscribirme al Sprint 01 →
                </a>
                <p style={{ textAlign:'center', fontSize:'0.72rem', color:'var(--t-dark3)' }}>Cupos limitados · Primera cohorte Q2 2026</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Bottom wave */}
      <div style={{ position:'absolute', bottom:-1, left:0, right:0 }}>
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ width:'100%', height:60, display:'block' }}>
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="var(--white)"/>
        </svg>
      </div>
      <style>{`@media(max-width:860px){.course-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  )
}
