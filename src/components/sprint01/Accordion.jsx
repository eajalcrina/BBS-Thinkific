import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Accordion({ items, allowMultiple = false, defaultOpen = 0 }) {
  const [open, setOpen] = useState(defaultOpen !== null ? [defaultOpen] : [])

  const toggle = (i) => {
    if (allowMultiple) {
      setOpen(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i])
    } else {
      setOpen(prev => prev.includes(i) ? [] : [i])
    }
  }

  return (
    <div style={{ display:'flex', flexDirection:'column' }}>
      {items.map((item, i) => {
        const isOpen = open.includes(i)
        return (
          <div key={i} style={{ borderBottom:'1px solid var(--fro-line)' }}>
            <button
              onClick={() => toggle(i)}
              aria-expanded={isOpen}
              style={{
                width:'100%', background:'none', border:'none', cursor:'pointer',
                display:'flex', alignItems:'center', justifyContent:'space-between',
                padding:'1.3rem 0', gap:'1rem', textAlign:'left', color:'var(--fro-text)',
              }}
            >
              <span style={{ display:'flex', alignItems:'center', gap:'0.9rem', flex:1 }}>
                {item.badge && (
                  <span style={{
                    fontFamily:'var(--fsyne)', fontSize:'0.7rem', fontWeight:700,
                    letterSpacing:'0.06em', textTransform:'uppercase',
                    background:'var(--fro-amber)', color:'var(--fro-bg)',
                    width:32, height:32, borderRadius:'50%',
                    display:'inline-flex', alignItems:'center', justifyContent:'center', flexShrink:0,
                  }}>{item.badge}</span>
                )}
                <span style={{
                  fontFamily:'var(--fsyne)', fontWeight:600, fontSize:'1.1rem',
                  color:'var(--fro-text)', letterSpacing:'-0.01em',
                }}>{item.title}</span>
              </span>
              <motion.span
                aria-hidden
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration:0.2 }}
                style={{ color:'var(--fro-amber)', fontSize:'1.4rem', fontWeight:300, flexShrink:0, lineHeight:1 }}
              >+</motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height:0, opacity:0 }}
                  animate={{ height:'auto', opacity:1 }}
                  exit={{ height:0, opacity:0 }}
                  transition={{ duration:0.3, ease:[0.22,1,0.36,1] }}
                  style={{ overflow:'hidden' }}
                >
                  <div style={{ paddingBottom:'1.5rem', paddingLeft: item.badge ? '2.9rem' : 0 }}>
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
