import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

const LINKS = [
  ['#camino',   'El Camino'],
  ['#modulos',  'Módulos'],
  ['#incluye',  'Incluye'],
  ['#precios',  'Precios'],
  ['#faq',      'FAQ'],
]

const Logo = () => (
  <span style={{ fontFamily:'var(--fsyne)', fontWeight:700, fontSize:'1.05rem', letterSpacing:'-0.02em', color:'var(--fro-text)' }}>
    bio<span style={{ color:'var(--fro-amber)' }}>/</span>business
  </span>
)

export default function SprintNav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30)
    fn()
    window.addEventListener('scroll', fn, { passive:true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const smoothScroll = (id) => (e) => {
    e.preventDefault()
    document.querySelector(id)?.scrollIntoView({ behavior:'smooth' })
  }

  return (
    <>
      <motion.header
        initial={{ y:-60, opacity:0 }}
        animate={{ y:0, opacity:1 }}
        transition={{ duration:0.5, ease:[0.22,1,0.36,1] }}
        role="banner"
        style={{
          position:'sticky', top:0, zIndex:100,
          background: scrolled ? 'rgba(10,10,10,0.82)' : 'transparent',
          backdropFilter: scrolled ? 'saturate(140%) blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'saturate(140%) blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--fro-line)' : '1px solid transparent',
          transition: 'background 0.3s, border-color 0.3s',
        }}
      >
        <nav className="fro-wrap" aria-label="Principal — Sprint 01" style={{ height:70, display:'flex', alignItems:'center', justifyContent:'space-between', gap:'2rem' }}>
          {/* Left: back to BBS + product label */}
          <div style={{ display:'flex', alignItems:'center', gap:'0.9rem', flexShrink:0 }}>
            <Link
              to="/"
              aria-label="Volver a Bio Business School"
              style={{ display:'inline-flex', alignItems:'center', gap:'0.55rem', textDecoration:'none' }}
            >
              <span aria-hidden style={{ color:'var(--fro-text-3)', fontFamily:'var(--finter)', fontSize:'0.78rem', fontWeight:500, letterSpacing:'0.04em' }}>←</span>
              <Logo/>
            </Link>
            <span aria-hidden className="nav-divider" style={{ width:1, height:18, background:'var(--fro-line-2)' }}/>
            <span className="fro-chip nav-sprint-chip" style={{ padding:'0.28rem 0.6rem', fontSize:'0.62rem' }}>
              <span className="fro-dot" aria-hidden/>
              Sprint 01
            </span>
          </div>

          {/* Center: links */}
          <ul className="nav-ul" style={{ display:'flex', gap:'1.8rem', listStyle:'none' }}>
            {LINKS.map(([h, l]) => (
              <li key={h}>
                <a
                  href={h}
                  onClick={smoothScroll(h)}
                  style={{ fontFamily:'var(--finter)', fontSize:'0.82rem', fontWeight:500, color:'var(--fro-text-2)', textDecoration:'none', transition:'color 0.18s' }}
                  onMouseEnter={e => e.currentTarget.style.color='var(--fro-text)'}
                  onMouseLeave={e => e.currentTarget.style.color='var(--fro-text-2)'}
                >{l}</a>
              </li>
            ))}
          </ul>

          {/* Right: CTA + mobile burger */}
          <div style={{ display:'flex', alignItems:'center', gap:'0.6rem', flexShrink:0 }}>
            <a
              href="#precios"
              onClick={smoothScroll('#precios')}
              className="fro-btn fro-btn-amber nav-cta"
              style={{ padding:'0.58rem 1.1rem', fontSize:'0.8rem' }}
            >
              Inscribirme
              <span aria-hidden>→</span>
            </a>
            <button
              type="button"
              className="nav-burger"
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={open}
              aria-controls="sprint-mobile-menu"
              onClick={() => setOpen(v => !v)}
              style={{
                width:42, height:42, borderRadius:6,
                background:'transparent', border:'1px solid var(--fro-line-2)',
                color:'var(--fro-text)', cursor:'pointer',
                display:'none', alignItems:'center', justifyContent:'center',
              }}
            >
              <svg width="18" height="14" viewBox="0 0 18 14" aria-hidden>
                <rect y={open ? 6 : 0} width="18" height="1.6" fill="currentColor" style={{ transformOrigin:'center', transform: open?'rotate(45deg)':'none', transition:'transform 0.2s' }}/>
                <rect y="6" width="18" height="1.6" fill="currentColor" style={{ opacity: open?0:1, transition:'opacity 0.15s' }}/>
                <rect y={open ? 6 : 12} width="18" height="1.6" fill="currentColor" style={{ transformOrigin:'center', transform: open?'rotate(-45deg)':'none', transition:'transform 0.2s' }}/>
              </svg>
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="sprint-mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menú móvil"
            initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            transition={{ duration:0.2 }}
            style={{
              position:'fixed', inset:0, zIndex:99,
              background:'rgba(10,10,10,0.96)',
              backdropFilter:'blur(18px)', WebkitBackdropFilter:'blur(18px)',
              padding:'6rem 2rem 2rem',
            }}
          >
            <motion.ul
              initial="hidden" animate="show"
              variants={{ hidden:{}, show:{ transition:{ staggerChildren:0.04, delayChildren:0.08 } } }}
              style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:'1rem' }}
            >
              {LINKS.map(([h, l]) => (
                <motion.li key={h} variants={{ hidden:{ opacity:0, x:-20 }, show:{ opacity:1, x:0 } }}>
                  <a
                    href={h}
                    onClick={(e) => { setOpen(false); smoothScroll(h)(e); }}
                    style={{ display:'block', padding:'0.6rem 0', fontFamily:'var(--fsyne)', fontSize:'2rem', fontWeight:600, letterSpacing:'-0.02em', color:'var(--fro-text)', textDecoration:'none', borderBottom:'1px solid var(--fro-line)' }}
                  >
                    {l}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
            <div style={{ marginTop:'2rem' }}>
              <a
                href="#precios"
                onClick={(e) => { setOpen(false); smoothScroll('#precios')(e); }}
                className="fro-btn fro-btn-amber fro-btn-lg fro-btn-full"
              >
                Inscribirme al Sprint 01 <span aria-hidden>→</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 900px) {
          .nav-ul { display: none !important; }
          .nav-burger { display: inline-flex !important; }
          .nav-cta {
            padding: 0.48rem 0.85rem !important;
            font-size: 0.74rem !important;
          }
          .nav-cta span[aria-hidden] { display: none; }
        }
        @media (max-width: 520px) {
          .nav-divider, .nav-sprint-chip { display: none !important; }
        }
        @media (max-width: 340px) {
          .nav-cta { display: none !important; }
        }
      `}</style>
    </>
  )
}
