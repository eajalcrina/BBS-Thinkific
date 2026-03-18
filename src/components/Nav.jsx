import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#biobuilder', label: 'BioBuilder' },
    { href: '#curso', label: 'Biotech Sprint 01' },
    { href: '#libro', label: 'Playbook' },
    { href: '#comunidad', label: 'Comunidad' },
  ]

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: scrolled ? 'rgba(12,12,18,0.95)' : 'rgba(12,12,18,0.80)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        backdropFilter: 'blur(12px)',
        transition: 'background 0.3s',
      }}
    >
      <div className="wrap" style={{ height: 62, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem' }}>
        <a href="#" style={{ fontFamily: 'var(--fd)', fontSize: '1.3rem', fontWeight: 700, letterSpacing: '0.06em', color: '#fff', textDecoration: 'none', flexShrink: 0 }}>
          BIO_<span style={{ color: 'var(--lime)' }}>BUSINESS</span> SCHOOL
        </a>
        <ul style={{ display: 'flex', gap: '1.8rem', listStyle: 'none', margin: 0 }} className="nav-links-desktop">
          {links.map(l => (
            <li key={l.href}>
              <a href={l.href} style={{ fontFamily: 'var(--fd)', fontSize: '0.82rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-lo)', textDecoration: 'none', transition: 'color 0.18s' }}
                onMouseEnter={e => e.target.style.color = '#fff'}
                onMouseLeave={e => e.target.style.color = 'var(--text-lo)'}
              >{l.label}</a>
            </li>
          ))}
        </ul>
        <a href="#comunidad" className="btn btn-lime" style={{ flexShrink: 0, padding: '0.45rem 1.2rem', fontSize: '0.82rem' }}>
          Únete gratis →
        </a>
      </div>
      <style>{`
        @media (max-width: 860px) { .nav-links-desktop { display: none !important; } }
      `}</style>
    </motion.nav>
  )
}
