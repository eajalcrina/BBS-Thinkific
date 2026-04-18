import FadeIn from './FadeIn.jsx'
import { motion } from 'framer-motion'

const LiIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

const founders = [
  {
    name:       'Eddie Ajalcriña',
    role:       'CEO & Co-Fundador',
    photo:      '/eddie.jpg',
    bio:        'Estratega con +18 años liderando bionegocios rentables en la Amazonía y ecosistemas críticos de América Latina.',
    credentials:['MBA ESAN · Maestría Biocomercio PUCP','+18 años en compañías regionales, inversión de impacto y Go-to-Market','Ex-Coordinador Unión Europea en Perú'],
    li:         'https://www.linkedin.com/in/eddieajalcrina/',
  },
  {
    name:       'Lorenzo Ortiz',
    role:       'COO & Co-Fundador',
    photo:      '/lorenzo.jpg',
    bio:        'Estratega e inversionista con visión única para construir bionegocios de impacto regional integrando finanzas y territorio.',
    credentials:['MIT Business Analytics · Ing. Industrial UNT','+12 años en dirección de operaciones, estrategia y finanzas','Singularity University LATAM Fellow'],
    li:         'https://www.linkedin.com/in/lorenzoortiz/',
  },
]

export default function Team() {
  return (
    <section id="equipo" className="fro-sec" style={{ background:'var(--fro-bg)' }}>
      <div className="fro-wrap">

        <FadeIn><div className="fro-eyebrow" style={{ marginBottom:'1.2rem' }}>El equipo</div></FadeIn>

        <FadeIn delay={0.08}>
          <h2 className="fro-h2" style={{ marginBottom:'1rem', maxWidth:'14em' }}>
            Hacemos que invertir en bionegocios sea{' '}
            <span className="fro-italic-amber">un buen negocio</span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.14}>
          <p className="fro-lead" style={{ maxWidth:520, marginBottom:'3rem' }}>
            Emprendedores, estrategas e inversionistas. Hemos estado en ambos lados de la mesa.
          </p>
        </FadeIn>

        <div className="team-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.5rem' }}>
          {founders.map((f, i) => (
            <FadeIn key={f.name} delay={0.12 + i*0.08}>
              <motion.article
                whileHover={{ y:-4 }}
                transition={{ duration:0.25, ease:[0.22,1,0.36,1] }}
                className="fro-card"
                style={{ overflow:'hidden', background:'var(--fro-surface)' }}
              >
                <div className="founder-inner" style={{ display:'grid', gridTemplateColumns:'220px 1fr' }}>
                  <div style={{ position:'relative', overflow:'hidden', minHeight:300, background:'var(--fro-bg-2)' }}>
                    <motion.img
                      src={f.photo}
                      alt={`Retrato de ${f.name}, ${f.role} en Bio Business School`}
                      loading="lazy"
                      style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center top', display:'block', filter:'grayscale(30%) brightness(0.85)' }}
                      whileHover={{ scale:1.04, filter:'grayscale(0%) brightness(1)' }}
                      transition={{ duration:0.5 }}
                    />
                    <div aria-hidden style={{ position:'absolute', top:0, right:0, bottom:0, width:48, background:'linear-gradient(to right, transparent, var(--fro-surface))' }}/>
                  </div>

                  <div style={{ padding:'1.4rem 1.5rem', display:'flex', flexDirection:'column', gap:'0.7rem' }}>
                    <h3 style={{ fontFamily:'var(--fsyne)', fontSize:'1.3rem', fontWeight:700, letterSpacing:'-0.02em', color:'var(--fro-text)', lineHeight:1.1 }}>
                      {f.name}
                    </h3>

                    <div>
                      <span className="fro-chip">
                        {f.role}
                      </span>
                    </div>

                    <p className="fro-sm" style={{ color:'var(--fro-text-2)' }}>{f.bio}</p>

                    <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:'0.35rem' }}>
                      {f.credentials.map((c, ci) => (
                        <li key={ci} style={{ display:'flex', gap:'0.55rem', fontSize:'0.76rem', color:'var(--fro-text-3)', lineHeight:1.5 }}>
                          <span aria-hidden style={{ color:'var(--fro-amber)', fontWeight:700 }}>—</span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>

                    <div style={{ marginTop:'auto', paddingTop:'0.3rem' }}>
                      <a
                        href={f.li}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`LinkedIn de ${f.name}`}
                        title={`LinkedIn de ${f.name}`}
                        style={{
                          display:'inline-flex', alignItems:'center', justifyContent:'center',
                          width:34, height:34, borderRadius:6,
                          color:'var(--fro-amber)',
                          border:'1px solid var(--fro-amber-25)',
                          background:'var(--fro-amber-08)',
                          transition:'all 0.2s', textDecoration:'none',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background='var(--fro-amber)'; e.currentTarget.style.color='var(--fro-bg)'; }}
                        onMouseLeave={e => { e.currentTarget.style.background='var(--fro-amber-08)'; e.currentTarget.style.color='var(--fro-amber)'; }}
                      >
                        <LiIcon/>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.article>
            </FadeIn>
          ))}
        </div>
      </div>

      <style>{`
        @media(max-width: 900px){ .team-grid { grid-template-columns: 1fr !important; } }
        @media(max-width: 600px){ .founder-inner { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}
