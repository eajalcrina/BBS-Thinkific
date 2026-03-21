import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const Logo = ({ onLime }) => (
  <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '1.15rem', letterSpacing: '0.04em', lineHeight: 1, userSelect: 'none' }}>
    <span style={{ fontWeight: 700, color: onLime ? 'var(--dark)' : 'var(--dark)' }}>BIO_BUSINESS</span>
    <span style={{ fontWeight: 400, fontStyle: 'italic', color: onLime ? 'var(--dark)' : 'var(--rose)', marginLeft: '0.3em' }}>SCHOOL</span>
  </span>
)

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <motion.nav
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: scrolled ? 'rgba(255,255,255,0.95)' : 'rgba(193,244,0,0.95)',
        borderBottom: scrolled ? '1px solid rgba(0,0,0,0.08)' : 'none',
        backdropFilter: 'blur(14px)',
        transition: 'background 0.4s, border-color 0.4s',
      }}
    >
      <div className="wrap" style={{ height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem' }}>
        <a href="#" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}>
          <Logo onLime={!scrolled} />
        </a>
        <ul style={{ display: 'flex', gap: '1.8rem', listStyle: 'none' }} className="nav-ul">
          {[['#biobuilder','BioBuilder'],['#curso','Sprint 01'],['#libro','Playbook'],['#comunidad','Comunidad'],['#equipo','Equipo']].map(([h, l]) => (
            <li key={h}>
              <a href={h}
                style={{ fontFamily: 'var(--fbc)', fontSize: '0.82rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: scrolled ? 'rgba(14,14,14,0.65)' : 'rgba(14,14,14,0.7)', textDecoration: 'none', transition: 'color 0.18s' }}
                onMouseEnter={e => e.target.style.color = 'var(--dark)'}
                onMouseLeave={e => e.target.style.color = scrolled ? 'rgba(14,14,14,0.65)' : 'rgba(14,14,14,0.7)'}
              >{l}</a>
            </li>
          ))}
        </ul>
        <a href="#comunidad" className="btn btn-dark" style={{ padding: '0.45rem 1.3rem', fontSize: '0.78rem', flexShrink: 0, borderRadius: '50px' }}>
          Únete gratis →
        </a>
      </div>
      <style>{`@media(max-width:860px){.nav-ul{display:none!important}}`}</style>
    </motion.nav>
  )
}
