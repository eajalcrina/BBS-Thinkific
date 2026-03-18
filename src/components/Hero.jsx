import { motion } from 'framer-motion'

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } }
const item    = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22,1,0.36,1] } } }

export default function Hero() {
  return (
    <section className="section" style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
      {/* Multi-layer ambient */}
      <div style={{ position:'absolute', top:'-20%', right:'-12%', width:700, height:700,
        background:'radial-gradient(circle, rgba(187,238,0,0.045) 0%, transparent 65%)', pointerEvents:'none' }} />
      <div style={{ position:'absolute', bottom:'-10%', left:'-8%', width:500, height:500,
        background:'radial-gradient(circle, rgba(243,39,105,0.03) 0%, transparent 65%)', pointerEvents:'none' }} />

      {/* Faint grid lines */}
      <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)', backgroundSize:'80px 80px', pointerEvents:'none' }} />

      <div className="container" style={{ width:'100%', position:'relative' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 420px', alignItems:'center', gap:'5rem' }} className="hero-grid">

          {/* LEFT */}
          <motion.div variants={stagger} initial="hidden" animate="show">
            <motion.div variants={item} style={{ marginBottom:'1.6rem' }}>
              <div style={{ display:'inline-flex', alignItems:'center', gap:'0.5rem', background:'var(--lime-glow)', border:'1px solid var(--lime-mid)', padding:'0.28rem 0.85rem', borderRadius:2, fontFamily:'var(--fd)', fontSize:'0.68rem', fontWeight:500, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--lime)' }}>
                <span style={{ width:5, height:5, borderRadius:'50%', background:'var(--lime)', display:'inline-block', animation:'blink 2s infinite' }} />
                Lanzamiento 2026 · Lima, Perú
              </div>
            </motion.div>

            <motion.h1 variants={item} className="t-display t-xl" style={{ marginBottom:'1.5rem' }}>
              Bionegocios<br />
              <span className="hl">rentables</span><br />
              para<br />
              América Latina
            </motion.h1>

            <motion.div variants={item} style={{ width:48, height:2, background:'var(--lime)', marginBottom:'1.6rem', transformOrigin:'left' }} />

            <motion.p variants={item} className="body-l" style={{ maxWidth:500, marginBottom:'2.2rem' }}>
              No somos una escuela de negocios. Somos la plataforma de inteligencia estratégica que convierte la biodiversidad de América Latina en activos económicos de impacto global.
            </motion.p>

            <motion.div variants={item} style={{ display:'flex', gap:'0.85rem', flexWrap:'wrap', marginBottom:'2.4rem' }}>
              <a href="#curso" className="btn btn-primary btn-lg">Ver Biotech Sprint 01 →</a>
              <a href="#biobuilder" className="btn btn-ghost btn-lg">¿Qué es un BioBuilder?</a>
            </motion.div>

            <motion.div variants={item} style={{ display:'flex', gap:'2rem', flexWrap:'wrap', paddingTop:'1.5rem', borderTop:'1px solid var(--border)' }}>
              {[['$55','Precio regular del curso'],['$0','Membresía Starter'],['Q2 2026','Primera cohorte']].map(([val, lbl]) => (
                <div key={val}>
                  <div style={{ fontFamily:'var(--fd)', fontSize:'1.6rem', fontWeight:700, color:'var(--lime)', lineHeight:1 }}>{val}</div>
                  <div style={{ fontSize:'0.75rem', color:'var(--text-3)', marginTop:'0.2rem' }}>{lbl}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT panel */}
          <motion.div
            initial={{ opacity:0, x:50 }} animate={{ opacity:1, x:0 }}
            transition={{ duration:0.85, delay:0.45, ease:[0.22,1,0.36,1] }}
            style={{ background:'var(--bg-2)', border:'1px solid var(--border-2)', borderRadius:8, overflow:'hidden' }}
            className="hero-panel"
          >
            {/* stats grid */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:1, background:'var(--border)' }}>
              {[['55M','años de evolución biológica'],['ALC','América Latina y el Caribe'],['2026','año de lanzamiento']].map(([n,l],i) => (
                <div key={n} style={{ background: i===2?'var(--bg-3)':'var(--bg-2)', padding:'1.4rem 1.5rem', gridColumn:i===2?'1/-1':undefined }}>
                  <div style={{ fontFamily:'var(--fd)', fontSize:'2.4rem', fontWeight:700, color:'var(--lime)', lineHeight:1 }}>{n}</div>
                  <div style={{ fontFamily:'var(--fd)', fontSize:'0.66rem', fontWeight:500, letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--text-3)', marginTop:'0.25rem' }}>{l}</div>
                </div>
              ))}
            </div>
            {/* quote */}
            <blockquote style={{ padding:'1.3rem 1.5rem', paddingLeft:'2rem', fontStyle:'italic', fontSize:'0.84rem', lineHeight:1.7, color:'var(--text-2)', borderTop:'1px solid var(--border)', position:'relative' }}>
              <span style={{ position:'absolute', left:0, top:0, bottom:0, width:3, background:'var(--lime)' }} />
              "Nuestro propósito es rediseñar la arquitectura de los negocios para transformar la economía de América Latina desde sus raíces."
            </blockquote>
            {/* trust */}
            <div style={{ padding:'1rem 1.5rem', borderTop:'1px solid var(--border)', display:'flex', flexDirection:'column', gap:'0.5rem' }}>
              {['Co-creado con 404 Tech Found','Comunidad Starter gratuita','Primera cohorte Q2 2026'].map(t => (
                <div key={t} style={{ display:'flex', alignItems:'center', gap:'0.5rem', fontSize:'0.78rem', color:'var(--text-3)' }}>
                  <span style={{ color:'var(--lime)', fontWeight:700, fontSize:'0.7rem' }}>✓</span>{t}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      <style>{`@media(max-width:960px){.hero-grid{grid-template-columns:1fr!important}.hero-panel{display:none!important}}`}</style>
    </section>
  )
}
