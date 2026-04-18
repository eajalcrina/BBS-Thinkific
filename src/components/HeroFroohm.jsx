import { motion } from 'framer-motion'

const st = { hidden:{}, show:{ transition:{ staggerChildren:0.09, delayChildren:0.12 } } }
const it = { hidden:{ opacity:0, y:32 }, show:{ opacity:1, y:0, transition:{ duration:0.75, ease:[0.22,1,0.36,1] } } }

const MARQUEE = ['Bionegocios', 'Biotecnología', 'Amazonía', 'Inteligencia Estratégica', 'América Latina', 'Capital Regenerativo']

const STATS = [
  ['+18',   'Años de experiencia regional'],
  ['01',    'Playbook'],
  ['02',    'Comunidades de práctica'],
  ['LATAM', 'Red de Bio/Builders'],
]

export default function HeroFroohm() {
  return (
    <section id="top" aria-label="Bionegocios rentables para América Latina" style={{ position:'relative', overflow:'hidden', background:'var(--fro-bg)', color:'var(--fro-text)' }}>

      {/* subtle grid background */}
      <div aria-hidden style={{
        position:'absolute', inset:0,
        backgroundImage:'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
        backgroundSize:'80px 80px',
        maskImage:'radial-gradient(ellipse at 50% 40%, rgba(0,0,0,0.9), transparent 70%)',
        WebkitMaskImage:'radial-gradient(ellipse at 50% 40%, rgba(0,0,0,0.9), transparent 70%)',
        pointerEvents:'none', zIndex:0
      }}/>

      {/* amber glow */}
      <div aria-hidden style={{
        position:'absolute', right:'-20%', top:'15%',
        width:'720px', height:'720px',
        background:'radial-gradient(circle, rgba(255,200,0,0.14), transparent 60%)',
        filter:'blur(24px)', pointerEvents:'none', zIndex:0
      }}/>

      {/* hero body */}
      <div className="fro-wrap" style={{ position:'relative', zIndex:2, padding:'5rem 2rem 4rem', minHeight:'calc(100vh - 70px)', display:'flex', alignItems:'center' }}>
        <motion.div variants={st} initial="hidden" animate="show" style={{ width:'100%' }}>

          <motion.div variants={it} style={{ display:'flex', alignItems:'center', gap:'1rem', marginBottom:'2.2rem', flexWrap:'wrap' }}>
            <span className="fro-chip">
              <span className="fro-dot" aria-hidden/>
              Lanzamiento 2026 · Lima, Perú
            </span>
            <span className="hero-sub" style={{ color:'var(--fro-text-3)', fontSize:'0.75rem', letterSpacing:'0.14em', textTransform:'uppercase', fontWeight:500 }}>
              Vol. 01 — Bio Business
            </span>
          </motion.div>

          <motion.h1
            variants={it}
            className="fro-display hero-title"
            style={{ fontSize:'clamp(2.6rem, 8.4vw, 9.2rem)', marginBottom:'1.8rem' }}
            aria-label="Bionegocios rentables para América Latina."
          >
            <span aria-hidden>
              Bionegocios<br/>
              <span className="fro-italic-amber">rentables</span>{' '}
              <span style={{ color:'var(--fro-text-2)' }}>para</span><br/>
              América Latina<span style={{ color:'var(--fro-amber)' }}>.</span>
            </span>
          </motion.h1>

          <div className="hero-grid" style={{ display:'grid', gridTemplateColumns:'1.2fr 1fr', gap:'3rem', alignItems:'end', marginTop:'3rem' }}>
            <motion.p variants={it} className="fro-body" style={{ fontSize:'1.02rem', maxWidth:560 }}>
              No somos una escuela de negocios. Somos la plataforma de inteligencia estratégica que convierte la biodiversidad de América Latina en activos económicos de impacto global.
            </motion.p>

            <motion.div variants={it} style={{ display:'flex', flexDirection:'column', gap:'0.8rem', alignItems:'flex-start' }}>
              <a href="/sprint01" className="fro-btn fro-btn-amber fro-btn-lg">
                Descubrir Biotech Sprint 01
                <span aria-hidden style={{ fontSize:'1.05rem' }}>→</span>
              </a>
              <a href="#libro" className="fro-btn fro-btn-ghost fro-btn-lg">
                Bio Business Playbook Vol. 1
                <span aria-hidden style={{ fontSize:'1.05rem' }}>↗</span>
              </a>
            </motion.div>
          </div>

          {/* stat row */}
          <motion.div variants={it} className="hero-stats" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'2rem', marginTop:'4.5rem', paddingTop:'2.5rem', borderTop:'1px solid var(--fro-line)' }}>
            {STATS.map(([n,l]) => (
              <div key={l}>
                <div style={{ fontFamily:'var(--fsyne)', fontWeight:600, fontSize:'2.4rem', letterSpacing:'-0.03em', color:'var(--fro-text)', lineHeight:1 }}>{n}</div>
                <div style={{ fontFamily:'var(--finter)', fontSize:'0.78rem', color:'var(--fro-text-2)', marginTop:'0.5rem', lineHeight:1.45 }}>{l}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* marquee */}
      <div className="fro-marquee" style={{ position:'relative', zIndex:2 }} aria-hidden>
        <div className="fro-marquee-track">
          <span>{MARQUEE.map(t => <span key={t}>{t}</span>)}</span>
          <span>{MARQUEE.map(t => <span key={t+'_b'}>{t}</span>)}</span>
        </div>
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
