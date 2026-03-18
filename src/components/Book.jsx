import FadeIn from './FadeIn.jsx'
import { motion } from 'framer-motion'

const bookFeatures = [
  'Diseño de bionegocios rentables desde cero',
  'Modelos financieros para territorios complejos',
  'Gobernanza de origen y protección de biodiversidad',
  'Casos reales de la Amazonía y ecosistemas críticos',
]

export default function Book() {
  return (
    <section id="libro" className="section tight">
      <div className="wrap">
        <FadeIn><div className="eyebrow muted" style={{ marginBottom: '0.6rem' }}>Publicación · Vol. 1 de 3</div></FadeIn>

        {/* Editorial big layout */}
        <div style={{ position: 'relative', borderRadius: 10, overflow: 'hidden', background: 'var(--bg2)', border: '1px solid var(--line2)' }}>

          {/* top accent stripe */}
          <div style={{ height: 2, background: 'linear-gradient(90deg, var(--lime) 0%, rgba(197,252,0,0.2) 100%)' }} />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 480 }} className="book-grid">

            {/* LEFT: image panel */}
            <div style={{ position: 'relative', overflow: 'hidden', background: '#0a0a0a' }}>
              <motion.img
                src="/book-stack.jpg"
                alt="Bio Business Playbook"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'brightness(0.88) saturate(1.1)' }}
                initial={{ scale: 1.06, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              />
              {/* overlay gradient right-fade */}
              <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '40%', background: 'linear-gradient(90deg, transparent, var(--bg2))' }} />
              {/* price badge overlaid */}
              <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', background: 'var(--lime)', color: '#000', fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '1.6rem', padding: '0.5rem 1rem', borderRadius: 3, lineHeight: 1 }}>
                $25
              </div>
            </div>

            {/* RIGHT: content */}
            <FadeIn delay={0.15} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '3rem 2.5rem' }}>
              <div>
                <h2 className="t-display t-lg" style={{ marginBottom: '0.5rem' }}>
                  Bio Business<br /><em className="t-em">Playbook</em>
                </h2>
                <p style={{ fontFamily: 'var(--fd)', fontSize: '0.88rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--lime)', marginBottom: '1.5rem', opacity: 0.7 }}>
                  Vol. 1 — Design
                </p>
                <p className="body" style={{ marginBottom: '1rem' }}>
                  América Latina ha operado durante siglos como la despensa del mundo: exportando biomasa por poco valor mientras el valor real se captura en laboratorios extranjeros.
                </p>
                <p className="body" style={{ marginBottom: '1.6rem' }}>
                  Eddie Ajalcriña y Lorenzo Ortiz desglosan la ingeniería de negocios completa para construir empresas que destaquen y dominen el mercado global desde la biodiversidad de la región.
                </p>

                <ul className="feat-list" style={{ marginBottom: '2rem' }}>
                  {bookFeatures.map(f => <li key={f}>{f}</li>)}
                </ul>
              </div>

              <div>
                {/* reserve note */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', background: 'var(--lime-10)', border: '1px solid var(--lime-20)', borderRadius: 4, padding: '0.75rem 1rem', marginBottom: '1.4rem', fontSize: '0.8rem', lineHeight: 1.55, color: 'var(--text-mid)' }}>
                  <span style={{ color: 'var(--lime)', flexShrink: 0, marginTop: '0.05rem' }}>★</span>
                  <span>La copia impresa está disponible <strong style={{ color: 'var(--text-hi)' }}>previo registro</strong>. Déjanos tu correo y te avisamos cuando esté lista para envío en tu país.</span>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <a href="#" className="btn btn-lime">Comprar digital →</a>
                  <a href="#" className="btn btn-ghost">Reservar copia impresa</a>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
      <style>{`@media (max-width: 860px) { .book-grid { grid-template-columns: 1fr !important; } .book-grid > div:first-child { min-height: 260px !important; } }`}</style>
    </section>
  )
}
