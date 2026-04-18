import { motion } from 'framer-motion'
import FadeIn from '../FadeIn.jsx'
import { trackCta } from '../../lib/analytics.js'

const st = { hidden:{}, show:{ transition:{ staggerChildren:0.09, delayChildren:0.12 } } }
const it = { hidden:{ opacity:0, y:32 }, show:{ opacity:1, y:0, transition:{ duration:0.75, ease:[0.22,1,0.36,1] } } }

export default function SprintHero() {
  const smoothScroll = (selector) => (e) => {
    e.preventDefault()
    document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="top"
      aria-label="Biotech Sprint 01 — Del Problema a la Inversión"
      style={{ position:'relative', overflow:'hidden', background:'var(--fro-bg)', color:'var(--fro-text)' }}
    >
      {/* subtle grid background */}
      <div aria-hidden style={{
        position:'absolute', inset:0,
        backgroundImage:'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
        backgroundSize:'80px 80px',
        maskImage:'radial-gradient(ellipse at 50% 40%, rgba(0,0,0,0.9), transparent 70%)',
        WebkitMaskImage:'radial-gradient(ellipse at 50% 40%, rgba(0,0,0,0.9), transparent 70%)',
        pointerEvents:'none', zIndex:0,
      }}/>

      {/* amber glow */}
      <div aria-hidden style={{
        position:'absolute', right:'-20%', top:'15%',
        width:'720px', height:'720px',
        background:'radial-gradient(circle, rgba(255,200,0,0.14), transparent 60%)',
        filter:'blur(24px)', pointerEvents:'none', zIndex:0,
      }}/>

      {/* hero body */}
      <div className="fro-wrap" style={{ position:'relative', zIndex:2, padding:'5rem 2rem 4rem', minHeight:'calc(100vh - 70px)', display:'flex', alignItems:'center' }}>
        <motion.div variants={st} initial="hidden" animate="show" style={{ width:'100%' }}>

          {/* eyebrows row */}
          <motion.div variants={it} style={{ display:'flex', alignItems:'center', gap:'1rem', marginBottom:'2.2rem', flexWrap:'wrap' }}>
            <span className="fro-chip">
              <span className="fro-dot" aria-hidden/>
              Curso especializado · Primera cohorte 2026
            </span>
            <span className="hero-sub" style={{ color:'var(--fro-text-3)', fontSize:'0.75rem', letterSpacing:'0.14em', textTransform:'uppercase', fontWeight:500 }}>
              BBS × 404 Tech Found
            </span>
          </motion.div>

          {/* chips row */}
          <motion.div variants={it} style={{ display:'flex', gap:'0.5rem', marginBottom:'1.4rem', flexWrap:'wrap' }}>
            <span className="fro-chip"><span aria-hidden>⚡</span> Early Bird</span>
            <span className="fro-chip-plain">4 semanas · Online</span>
            <span className="fro-chip-plain">DeepTech + Business</span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            variants={it}
            className="fro-display hero-title"
            style={{ fontSize:'clamp(2.6rem, 8.4vw, 9.2rem)', marginBottom:'1rem' }}
            aria-label="Biotech Sprint 01"
          >
            <span aria-hidden>
              Biotech<br/>
              <span className="fro-italic-amber">Sprint 01</span><span style={{ color:'var(--fro-amber)' }}>.</span>
            </span>
          </motion.h1>

          <motion.p
            variants={it}
            className="fro-eyebrow amber"
            style={{ marginBottom:'1.6rem' }}
          >
            Del Problema a la Inversión · Construye tu Biotech en 4 Pasos
          </motion.p>

          <div className="hero-grid" style={{ display:'grid', gridTemplateColumns:'1.2fr 1fr', gap:'3rem', alignItems:'end', marginTop:'2.5rem' }}>
            <motion.div variants={it}>
              <p className="fro-body" style={{ fontSize:'1.02rem', fontStyle:'italic', color:'var(--fro-text)', marginBottom:'1rem', maxWidth:560 }}>
                "Cuatro semanas. Cuatro pasos. Una biotech con chances reales."
              </p>
              <p className="fro-body" style={{ fontSize:'0.98rem', maxWidth:560 }}>
                Ya sabes que el biotech es el futuro. Ahora necesitas saber qué hacer con eso. El Biotech Sprint 01 te acompaña a construir el esqueleto de tu propio biotech en 4 semanas. No sales con conocimiento — sales con un documento.
              </p>
            </motion.div>

            <motion.div variants={it} style={{ display:'flex', flexDirection:'column', gap:'0.8rem', alignItems:'flex-start' }}>
              <a
                href="#precios"
                onClick={(e) => { trackCta('sprint_hero_inscribir', 'sprint01_hero', '#precios'); smoothScroll('#precios')(e); }}
                className="fro-btn fro-btn-amber fro-btn-lg"
              >
                Inscribirme al Sprint 01
                <span aria-hidden style={{ fontSize:'1.05rem' }}>→</span>
              </a>
              <a
                href="#incluye"
                onClick={(e) => { trackCta('sprint_hero_incluye', 'sprint01_hero', '#incluye'); smoothScroll('#incluye')(e); }}
                className="fro-btn fro-btn-ghost fro-btn-lg"
              >
                Ver qué incluye
                <span aria-hidden style={{ fontSize:'1.05rem' }}>↓</span>
              </a>
            </motion.div>
          </div>

          {/* stat row */}
          <motion.div variants={it} className="hero-stats" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'2rem', marginTop:'4.5rem', paddingTop:'2.5rem', borderTop:'1px solid var(--fro-line)' }}>
            {[
              ['$40',   'Early Bird · USD'],
              ['30+',   'horas de programa'],
              ['4',     'módulos con entregable'],
              ['Q2',    'Primera cohorte · 2026'],
            ].map(([n,l]) => (
              <div key={l}>
                <div style={{ fontFamily:'var(--fsyne)', fontWeight:600, fontSize:'2.4rem', letterSpacing:'-0.03em', color:'var(--fro-text)', lineHeight:1 }}>{n}</div>
                <div style={{ fontFamily:'var(--finter)', fontSize:'0.78rem', color:'var(--fro-text-2)', marginTop:'0.5rem', lineHeight:1.45 }}>{l}</div>
              </div>
            ))}
          </motion.div>

        </motion.div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .hero-grid { grid-template-columns: 1fr !important; align-items: flex-start !important; gap: 2rem !important; }
          .hero-stats { grid-template-columns: 1fr 1fr !important; gap: 1.6rem !important; }
        }
        @media (max-width: 520px) {
          .hero-sub { display: none; }
        }
      `}</style>
    </section>
  )
}
