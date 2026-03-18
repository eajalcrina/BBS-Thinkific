import { motion } from 'framer-motion'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } }
}
const item = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
}

export default function Hero() {
  return (
    <section className="section" style={{ minHeight: '88vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
      {/* ambient glow */}
      <div style={{ position: 'absolute', top: '-15%', right: '-8%', width: 640, height: 640, background: 'radial-gradient(circle, rgba(197,252,0,0.04) 0%, transparent 68%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(243,39,105,0.03) 0%, transparent 68%)', pointerEvents: 'none' }} />

      <div className="wrap" style={{ width: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', alignItems: 'center', gap: '4.5rem' }} className="hero-grid">
          <motion.div variants={container} initial="hidden" animate="show">
            <motion.div variants={item}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(197,252,0,0.08)', border: '1px solid rgba(197,252,0,0.22)', padding: '0.28rem 0.8rem', borderRadius: 2, fontFamily: 'var(--fd)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--lime)', marginBottom: '1.4rem' }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--lime)', animation: 'blink 2s infinite', display: 'inline-block' }} />
                Lanzamiento 2026 · Lima, Perú
              </div>
            </motion.div>

            <motion.h1 variants={item} className="t-display t-xl" style={{ marginBottom: '1.3rem' }}>
              Bionegocios<br /><em className="t-em">rentables</em><br />para<br />América Latina
            </motion.h1>

            <motion.p variants={item} className="lead" style={{ maxWidth: 480, marginBottom: '2rem' }}>
              No somos una escuela de negocios tradicional. Somos la plataforma de inteligencia estratégica que transforma la biodiversidad de la región en activos económicos de alto impacto.
            </motion.p>

            <motion.div variants={item} style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap', marginBottom: '2.2rem' }}>
              <a href="#curso" className="btn btn-lime btn-lg">Ver Biotech Sprint 01 →</a>
              <a href="#biobuilder" className="btn btn-ghost btn-lg">¿Qué es un BioBuilder?</a>
            </motion.div>

            <motion.div variants={item} style={{ display: 'flex', alignItems: 'center', gap: '1.8rem', flexWrap: 'wrap' }}>
              {['Curso especializado 8 semanas', 'Co-creado con 404 Tech Found', 'Comunidad gratuita'].map(t => (
                <span key={t} style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.8rem', color: 'var(--text-lo)' }}>
                  <span style={{ color: 'var(--lime)', fontWeight: 700 }}>✓</span> {t}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* stats panel */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ background: 'var(--bg2)', border: '1px solid var(--line2)', borderRadius: 6, overflow: 'hidden' }}
            className="hero-panel"
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'var(--line)' }}>
              {[['55M', 'Años de evolución biológica'], ['ALC', 'Foco en América Latina'], ['2026', 'Año de lanzamiento']].map(([n, l], i) => (
                <div key={n} style={{ background: i === 2 ? 'var(--bg3)' : 'var(--bg2)', padding: '1.4rem 1.5rem', gridColumn: i === 2 ? '1/-1' : 'auto' }}>
                  <div style={{ fontFamily: 'var(--fd)', fontSize: '2.5rem', fontWeight: 700, color: 'var(--lime)', lineHeight: 1 }}>{n}</div>
                  <div style={{ fontFamily: 'var(--fd)', fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-lo)', marginTop: '0.25rem' }}>{l}</div>
                </div>
              ))}
            </div>
            <blockquote style={{ padding: '1.2rem 1.5rem', paddingLeft: '2rem', fontStyle: 'italic', fontSize: '0.84rem', lineHeight: 1.68, color: 'var(--text-mid)', borderTop: '1px solid var(--line)', position: 'relative' }}>
              <span style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: 'var(--lime)' }} />
              "Nuestro propósito es rediseñar la arquitectura de los negocios para transformar la economía de América Latina desde sus raíces."
            </blockquote>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-panel { display: none !important; }
        }
      `}</style>
    </section>
  )
}
