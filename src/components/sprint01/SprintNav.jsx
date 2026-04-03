import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const links = [
  ['#camino', 'El Camino'],
  ['#modulos', 'Módulos'],
  ['#incluye', 'Incluye'],
  ['#precios', 'Precios'],
  ['#faq', 'FAQ'],
]

export default function SprintNav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const scrollTo = (e, id) => {
    e.preventDefault()
    document.querySelector(id)?.scrollIntoView({ behavior:'smooth' })
  }

  return (
    <motion.nav
      initial={{ y:-70, opacity:0 }}
      animate={{ y:0, opacity:1 }}
      transition={{ duration:0.55, ease:[0.22,1,0.36,1] }}
      style={{
        position:'sticky', top:0, zIndex:100,
        background: scrolled ? 'rgba(255,255,255,0.95)' : 'rgba(243,39,105,0.95)',
        borderBottom: scrolled ? '1px solid rgba(0,0,0,0.08)' : 'none',
        backdropFilter:'blur(14px)',
        transition:'background 0.4s, border-color 0.4s',
      }}
    >
      <div className="wrap" style={{ height:64, display:'flex', alignItems:'center', justifyContent:'space-between', gap:'1.5rem' }}>
        {/* Left: back + logo */}
        <div style={{ display:'flex', alignItems:'center', gap:'1rem', flexShrink:0 }}>
          <Link to="/" style={{
            fontFamily:'var(--fbc)', fontSize:'0.72rem', fontWeight:600,
            letterSpacing:'0.06em', textTransform:'uppercase', textDecoration:'none',
            color: scrolled ? 'var(--t-dark3)' : 'rgba(255,255,255,0.6)',
            transition:'color 0.18s',
          }}>← BBS</Link>
          <div style={{
            width:1, height:20,
            background: scrolled ? 'rgba(14,14,14,0.12)' : 'rgba(255,255,255,0.25)',
          }}/>
          <div style={{ display:'flex', alignItems:'center', gap:'0.5rem' }}>
            <img src="/logo-red.png" alt="BBS"
              style={{
                height:18, width:'auto',
                filter: scrolled ? 'none' : 'brightness(0) invert(1)',
                opacity: scrolled ? 1 : 0.9,
              }}/>
            <span style={{
              fontFamily:'var(--fbc)', fontSize:'0.68rem', fontWeight:600,
              letterSpacing:'0.08em', textTransform:'uppercase',
              color: scrolled ? 'var(--t-dark3)' : 'rgba(255,255,255,0.6)',
            }}>Sprint 01</span>
          </div>
        </div>

        {/* Center: links */}
        <ul style={{ display:'flex', gap:'1.6rem', listStyle:'none' }} className="nav-ul">
          {links.map(([h, l]) => (
            <li key={h}>
              <a href={h} onClick={(e) => scrollTo(e, h)}
                style={{
                  fontFamily:'var(--fbc)', fontSize:'0.78rem', fontWeight:600,
                  letterSpacing:'0.08em', textTransform:'uppercase',
                  color: scrolled ? 'rgba(14,14,14,0.6)' : 'rgba(255,255,255,0.7)',
                  textDecoration:'none', transition:'color 0.18s',
                }}
                onMouseEnter={e => e.target.style.color = scrolled ? 'var(--dark)' : 'var(--white)'}
                onMouseLeave={e => e.target.style.color = scrolled ? 'rgba(14,14,14,0.6)' : 'rgba(255,255,255,0.7)'}
              >{l}</a>
            </li>
          ))}
        </ul>

        {/* Right: CTA */}
        <a href="#precios" onClick={(e) => scrollTo(e, '#precios')}
          className={scrolled ? 'btn btn-rose' : 'btn btn-lime'}
          style={{ padding:'0.45rem 1.3rem', fontSize:'0.78rem', flexShrink:0, borderRadius:'50px' }}
        >Inscribirme →</a>
      </div>
      <style>{`@media(max-width:860px){.nav-ul{display:none!important}}`}</style>
    </motion.nav>
  )
}
