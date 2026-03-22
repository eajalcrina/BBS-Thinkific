import FadeIn from './FadeIn.jsx'
import { motion } from 'framer-motion'
import CellCanvas from './CellCanvas.jsx'

const LiIcon = () => (
  <svg viewBox="0 0 24 24" width="11" height="11" fill="currentColor" style={{ flexShrink:0 }}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

const founders = [
  {
    name:    'Eddie Ajalcriña',
    role:    'CEO & Co-Fundador',
    photo:   '/eddie.jpg',
    bio:     'Estratega con +18 años liderando bionegocios rentables en la Amazonía y ecosistemas críticos de América Latina.',
    credentials: [
      'MBA ESAN · Maestría Biocomercio PUCP',
      '+18 años en compañías regionales, inversión de impacto y Go-to-Market',
      'Ex-Coordinador Unión Europea en Perú',
    ],
    li: 'https://www.linkedin.com/in/eddieajalcrina/',
    glowColor: 'rgba(193,244,0,0.20)',
  },
  {
    name:    'Lorenzo Ortiz',
    role:    'COO & Co-Fundador',
    photo:   '/lorenzo.jpg',
    bio:     'Estratega e inversionista con visión única para construir bionegocios de impacto regional integrando finanzas y territorio.',
    credentials: [
      'MIT Business Analytics · Ing. Industrial UNT',
      '+12 años en dirección de operaciones, estrategia y finanzas',
      'Singularity University LATAM Fellow',
    ],
    li: 'https://www.linkedin.com/in/lorenzoortiz/',
    glowColor: 'rgba(193,244,0,0.20)',
  },
]

export default function Team() {
  return (
    <section id="equipo" className="sec-t on-dark"
      style={{ background:'var(--dark)', position:'relative', overflow:'hidden' }}>

      <CellCanvas palette="dark"/>

      <div className="wrap" style={{ position:'relative', zIndex:2 }}>
        <FadeIn>
          <div className="label white" style={{ marginBottom:'1rem' }}>El equipo</div>
        </FadeIn>
        <FadeIn delay={0.08}>
          <h2 className="t-out t-md" style={{ marginBottom:'0.8rem', color:'var(--white)' }}>
            Hacemos que invertir en negocios sostenibles sea{' '}
            <em style={{ fontStyle:'normal', color:'var(--lime)', fontWeight:700 }}>buen negocio</em>
          </h2>
        </FadeIn>
        <FadeIn delay={0.14}>
          <p className="lead" style={{ color:'var(--t-white2)', maxWidth:520, marginBottom:'2.5rem' }}>
            Emprendedores, estrategas e inversionistas. Hemos estado en ambos lados de la mesa.
          </p>
        </FadeIn>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.5rem' }} className="team-grid">
          {founders.map((f, i) => (
            <FadeIn key={f.name} delay={0.1 + i * 0.12}>
              <motion.div
                whileHover={{ y:-6 }}
                transition={{ duration:0.3, ease:[0.22,1,0.36,1] }}
                style={{ background:'#111', border:'1px solid rgba(255,255,255,.07)',
                  borderRadius:18, overflow:'hidden', cursor:'default' }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = `0 20px 60px ${f.glowColor}`}
                onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}>

                {/* ── FOTO GRANDE VERTICAL ── */}
                <div style={{ position:'relative', height:240, overflow:'hidden', background:'rgba(255,255,255,.04)' }}>
                  <motion.img
                    src={f.photo}
                    alt={f.name}
                    style={{ width:'100%', height:'100%', objectFit:'cover',
                      objectPosition:'center top', display:'block',
                      filter:'grayscale(10%) brightness(0.92)' }}
                    whileHover={{ scale:1.04, filter:'grayscale(0%) brightness(1.02)' }}
                    transition={{ duration:0.5 }}/>

                  {/* Gradiente inferior — transición suave a la sección info */}
                  <div style={{ position:'absolute', bottom:0, left:0, right:0, height:90,
                    background:'linear-gradient(to bottom, transparent, #111)' }}/>

                  {/* Etiqueta ROL como pill lime sobre la foto */}
                  <div style={{ position:'absolute', bottom:14, left:14 }}>
                    <span style={{ fontFamily:'var(--fbc)', fontSize:'0.60rem', fontWeight:700,
                      letterSpacing:'0.14em', textTransform:'uppercase',
                      color:'#0E0E0E', background:'#C1F400',
                      padding:'4px 10px', borderRadius:50 }}>
                      {f.role}
                    </span>
                  </div>

                  {/* Célula decorativa esquina superior derecha */}
                  <div style={{ position:'absolute', top:10, right:10, width:32, height:32,
                    borderRadius:'50%', background:'rgba(193,244,0,.10)',
                    border:'1px dashed rgba(193,244,0,.30)' }}>
                    <div style={{ position:'absolute', top:'50%', left:'50%',
                      transform:'translate(-50%,-50%)', width:10, height:10,
                      borderRadius:'50%', background:'rgba(193,244,0,.35)' }}/>
                  </div>
                </div>

                {/* ── INFO ── */}
                <div style={{ padding:'18px 20px 20px', display:'flex',
                  flexDirection:'column', gap:'0.75rem' }}>

                  {/* Nombre */}
                  <div style={{ fontFamily:'var(--fout)', fontSize:'1.25rem',
                    fontWeight:700, color:'var(--white)', lineHeight:1.2 }}>
                    {f.name}
                  </div>

                  {/* Bio */}
                  <p style={{ fontSize:'0.82rem', color:'rgba(255,255,255,0.72)',
                    lineHeight:1.65, margin:0 }}>
                    {f.bio}
                  </p>

                  {/* Separador */}
                  <div style={{ width:'100%', height:1,
                    background:'rgba(255,255,255,.06)' }}/>

                  {/* Credenciales */}
                  <ul style={{ listStyle:'none', display:'flex',
                    flexDirection:'column', gap:'0.35rem' }}>
                    {f.credentials.map((c, ci) => (
                      <li key={ci} style={{ display:'flex', alignItems:'flex-start',
                        gap:'0.5rem', fontSize:'0.76rem',
                        color:'rgba(255,255,255,0.68)', lineHeight:1.5 }}>
                        <span style={{ color:'var(--lime)', fontWeight:700,
                          flexShrink:0, marginTop:'0.05rem' }}>—</span>
                        {c}
                      </li>
                    ))}
                  </ul>

                  {/* Botón LinkedIn — lime */}
                  <div style={{ paddingTop:'0.25rem' }}>
                    <a href={f.li} target="_blank" rel="noopener noreferrer"
                      style={{ display:'inline-flex', alignItems:'center', gap:'0.45rem',
                        fontFamily:'var(--fbc)', fontSize:'0.63rem', fontWeight:700,
                        letterSpacing:'0.1em', textTransform:'uppercase',
                        textDecoration:'none', color:'var(--lime)',
                        border:'1px solid rgba(193,244,0,.40)',
                        padding:'0.35rem 0.9rem', borderRadius:50,
                        background:'rgba(193,244,0,.06)',
                        transition:'all 0.2s' }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = 'rgba(193,244,0,.14)'
                        e.currentTarget.style.borderColor = 'rgba(193,244,0,.70)'
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = 'rgba(193,244,0,.06)'
                        e.currentTarget.style.borderColor = 'rgba(193,244,0,.40)'
                      }}>
                      <LiIcon/> LinkedIn
                    </a>
                  </div>

                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>

      <style>{`
        @media(max-width:760px){
          .team-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
