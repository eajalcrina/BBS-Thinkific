import FadeIn from '../FadeIn.jsx'
import { motion } from 'framer-motion'

const cards = [
  {
    tag: 'BBS',
    title: 'Bio Business School',
    description: 'Plataforma de inteligencia estratégica para bionegocios rentables en América Latina, liderada por Eddie Ajalcriña (CEO) y Lorenzo Ortiz (COO) — emprendedores e inversionistas con experiencia real en la Amazonía y ecosistemas críticos de la región.',
  },
  {
    tag: '404',
    title: '404 Tech Found',
    description: 'Asociación peruana líder en promoción de tecnologías profundas, con una comunidad activa de jóvenes científicos, tecnólogos e investigadores de frontera. Aporta el rigor técnico y la validación científica que diferencia este programa.',
  },
]

export default function SprintCreadores() {
  return (
    <section
      id="creadores"
      className="fro-sec"
      style={{ background:'var(--fro-bg)' }}
    >
      <div className="fro-wrap">
        <FadeIn><div className="fro-eyebrow" style={{ marginBottom:'1.2rem' }}>Creado por</div></FadeIn>

        <FadeIn delay={0.06}>
          <h2 className="fro-h2" style={{ marginBottom:'0.8rem' }}>
            Bio Business School{' '}
            <span className="fro-italic-amber">× 404 Tech Found</span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.12}>
          <p className="fro-lead" style={{ fontStyle:'italic', marginBottom:'2.5rem', maxWidth:640 }}>
            "Juntos, construimos el programa que no existía."
          </p>
        </FadeIn>

        <style>{`
          .creadores-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
          @media (max-width: 760px) { .creadores-grid { grid-template-columns: 1fr; } }
        `}</style>

        <div className="creadores-grid">
          {cards.map((card, i) => (
            <FadeIn key={card.tag} delay={0.14 + i * 0.08}>
              <motion.article
                whileHover={{ y:-4, borderColor:'rgba(255,200,0,0.35)' }}
                transition={{ duration:0.25, ease:[0.22,1,0.36,1] }}
                className="fro-card"
                style={{ padding:'1.8rem', height:'100%' }}
              >
                <div aria-hidden style={{
                  display:'inline-flex', alignItems:'center', justifyContent:'center',
                  fontFamily:'var(--fsyne)', fontSize:'1.4rem', fontWeight:800, letterSpacing:'-0.02em',
                  color:'var(--fro-amber)',
                  padding:'0.4rem 0.8rem', borderRadius:6,
                  background:'var(--fro-amber-08)', border:'1px solid var(--fro-amber-25)',
                  marginBottom:'1rem',
                }}>
                  {card.tag}
                </div>
                <div style={{ fontFamily:'var(--finter)', fontSize:'0.72rem', fontWeight:700, letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--fro-text-2)', marginBottom:'0.6rem' }}>
                  {card.title}
                </div>
                <p className="fro-body" style={{ fontSize:'0.9rem', margin:0 }}>
                  {card.description}
                </p>
              </motion.article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
