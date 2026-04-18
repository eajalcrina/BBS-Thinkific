import FadeIn from '../FadeIn.jsx'
import { motion } from 'framer-motion'

const cards = [
  { icon: '01', title: 'Problem Statement Card', desc: 'Define el problema que quieres atacar, el mercado afectado y por qué América Latina tiene ventaja en ese problema.' },
  { icon: '02', title: 'Tech Stack Card',        desc: 'La tecnología más prometedora para resolver tu problema, con evaluación de madurez y costo de acceso estimado.' },
  { icon: '03', title: 'Bio Business Model Canvas', desc: 'Canvas de 8 dimensiones adaptado al biotech latinoamericano: propuesta de valor, flujos de ingreso, activos científicos.' },
  { icon: '04', title: 'Fundraising Roadmap',    desc: 'Fuentes de capital priorizadas + borrador de elevator pitch + los 3 próximos pasos accionables.' },
]

export default function SprintStarterKit() {
  return (
    <section
      id="starterkit"
      className="fro-sec"
      style={{ background:'var(--fro-bg-3)', borderTop:'1px solid var(--fro-line)', borderBottom:'1px solid var(--fro-line)' }}
    >
      <div className="fro-wrap">
        <div style={{ textAlign:'center', marginBottom:'2.5rem' }}>
          <FadeIn>
            <div className="fro-eyebrow" style={{ marginBottom:'1rem', justifyContent:'center' }}>
              Tu entregable final
            </div>
          </FadeIn>

          <FadeIn delay={0.06}>
            <h2 className="fro-h2" style={{ marginBottom:'1rem' }}>
              Biotech Business <span className="fro-italic-amber">Starter Kit</span>
            </h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="fro-lead" style={{ maxWidth:640, margin:'0 auto' }}>
              El entregable que ningún otro programa de la región ofrece: cuatro piezas construidas semana a semana que forman el esqueleto completo de tu biotech.
            </p>
          </FadeIn>
        </div>

        <style>{`
          .sk-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.2rem; }
          @media (max-width: 760px) { .sk-grid { grid-template-columns: 1fr; } }
        `}</style>

        <div className="sk-grid">
          {cards.map((c, i) => (
            <FadeIn key={c.title} delay={i * 0.06}>
              <motion.article
                whileHover={{ y:-4, borderColor:'rgba(255,200,0,0.35)' }}
                transition={{ duration:0.25, ease:[0.22,1,0.36,1] }}
                className="fro-card"
                style={{ padding:'1.8rem 1.5rem', height:'100%', display:'flex', flexDirection:'column', gap:'0.75rem' }}
              >
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                  <span style={{ fontFamily:'var(--fsyne)', fontWeight:700, fontSize:'0.85rem', letterSpacing:'0.16em', color:'var(--fro-amber)' }}>{c.icon}</span>
                  <div aria-hidden style={{ flex:1, height:1, background:'var(--fro-line)', marginLeft:'0.8rem' }}/>
                </div>
                <h3 className="fro-h3">{c.title}</h3>
                <p className="fro-sm" style={{ color:'var(--fro-text-2)' }}>{c.desc}</p>
              </motion.article>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <p className="fro-sm" style={{ textAlign:'center', marginTop:'2.2rem', maxWidth:620, marginLeft:'auto', marginRight:'auto' }}>
            El Starter Kit es también el insumo directo para aplicar al Bootcamp 101 — el siguiente nivel del ecosistema BBS × 404.
          </p>
        </FadeIn>

        <FadeIn delay={0.35}>
          <div style={{ textAlign:'center', marginTop:'1.6rem' }}>
            <a
              className="fro-btn fro-btn-ghost fro-btn-lg"
              href="#modulos"
              onClick={e => { e.preventDefault(); document.querySelector('#modulos')?.scrollIntoView({ behavior:'smooth' }) }}
            >
              Ver los 4 módulos <span aria-hidden>→</span>
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
