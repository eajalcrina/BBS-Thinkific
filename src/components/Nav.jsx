import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return (
    <motion.nav initial={{ y:-70, opacity:0 }} animate={{ y:0, opacity:1 }}
      transition={{ duration:0.55, ease:[0.22,1,0.36,1] }}
      style={{ position:'sticky', top:0, zIndex:100,
        background: scrolled ? 'rgba(7,8,16,0.97)' : 'rgba(7,8,16,0.7)',
        borderBottom:'1px solid rgba(255,255,255,0.06)',
        backdropFilter:'blur(18px)', transition:'background 0.3s' }}
    >
      <div className="wrap" style={{ height:64, display:'flex', alignItems:'center', justifyContent:'space-between', gap:'2rem' }}>
        <a href="#" style={{ display:'flex', alignItems:'center', textDecoration:'none', flexShrink:0 }}>
          <img src="/logo-green.png" alt="Bio Business School" style={{ height:21, width:'auto' }} />
        </a>
        <ul style={{ display:'flex', gap:'1.8rem', listStyle:'none' }} className="nav-ul">
          {[['#mision','Misión'],['#biobuilder','BioBuilder'],['#curso','Sprint 01'],['#libro','Playbook'],['#comunidad','Comunidad']].map(([h,l]) => (
            <li key={h}><a href={h}
              style={{ fontFamily:'var(--fbc)', fontSize:'0.8rem', fontWeight:600, letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--t3)', textDecoration:'none', transition:'color 0.18s' }}
              onMouseEnter={e=>e.target.style.color='var(--t1)'}
              onMouseLeave={e=>e.target.style.color='var(--t3)'}
            >{l}</a></li>
          ))}
        </ul>
        <a href="#comunidad" className="btn btn-lime" style={{ padding:'0.45rem 1.2rem', fontSize:'0.78rem', flexShrink:0 }}>Únete gratis →</a>
      </div>
      <style>{`@media(max-width:860px){.nav-ul{display:none!important}}`}</style>
    </motion.nav>
  )
}
