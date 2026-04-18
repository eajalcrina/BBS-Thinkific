import FadeIn from './FadeIn.jsx'
import { motion } from 'framer-motion'

/**
 * Respaldan — sección de credibilidad institucional.
 * Por ahora listamos afiliaciones reales del equipo fundador + partner principal.
 * Cuando lleguen testimonios o logos adicionales, extender `partners` y/o `quotes`.
 */

const partners = [
  { name: '404 Tech Found', role: 'Partner académico · Biotech LATAM' },
  { name: 'MIT Professional Education', role: 'Credencial fundador · Business Analytics' },
  { name: 'ESAN Graduate School', role: 'Credencial fundador · MBA' },
  { name: 'Pontificia Universidad Católica del Perú', role: 'Credencial fundador · Maestría Biocomercio' },
  { name: 'Singularity University', role: 'Credencial fundador · LATAM Fellow' },
  { name: 'Unión Europea en Perú', role: 'Trayectoria · Ex-coordinación' },
]

export default function Endorsements() {
  return (
    <section
      id="respaldan"
      className="fro-sec"
      style={{ background:'var(--fro-bg-3)', borderTop:'1px solid var(--fro-line)', borderBottom:'1px solid var(--fro-line)' }}
    >
      <div className="fro-wrap">
        <FadeIn><div className="fro-eyebrow" style={{ marginBottom:'1.2rem' }}>Respaldan este trabajo</div></FadeIn>

        <FadeIn delay={0.08}>
          <h2 className="fro-h2" style={{ maxWidth:'14em', marginBottom:'1rem' }}>
            Aliados y{' '}
            <span className="fro-italic-amber">referentes</span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.14}>
          <p className="fro-lead" style={{ maxWidth:560, marginBottom:'3rem' }}>
            Construimos sobre trayectoria real. Partners académicos, redes técnicas y credenciales del equipo fundador.
          </p>
        </FadeIn>

        <style>{`
          .endorse-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1rem;
          }
          @media (max-width: 860px) { .endorse-grid { grid-template-columns: 1fr 1fr; } }
          @media (max-width: 520px) { .endorse-grid { grid-template-columns: 1fr; } }
        `}</style>

        <div className="endorse-grid">
          {partners.map((p, i) => (
            <FadeIn key={p.name} delay={0.18 + i * 0.04}>
              <motion.div
                whileHover={{ y:-3, borderColor:'rgba(255,200,0,0.35)' }}
                transition={{ duration:0.22, ease:[0.22,1,0.36,1] }}
                className="fro-card"
                style={{ padding:'1.3rem 1.4rem', height:'100%', display:'flex', flexDirection:'column', gap:'0.55rem' }}
              >
                <div style={{ fontFamily:'var(--fsyne)', fontWeight:700, fontSize:'1rem', color:'var(--fro-text)', letterSpacing:'-0.01em', lineHeight:1.3 }}>
                  {p.name}
                </div>
                <div style={{ fontFamily:'var(--finter)', fontSize:'0.74rem', color:'var(--fro-text-3)', letterSpacing:'0.04em', textTransform:'uppercase', fontWeight:500 }}>
                  {p.role}
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.5}>
          <p className="fro-sm" style={{ marginTop:'2.5rem', textAlign:'center', maxWidth:540, margin:'2.5rem auto 0', fontStyle:'italic' }}>
            Testimonios de nuestra primera cohorte se publicarán tras el lanzamiento Q2 2026.
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
