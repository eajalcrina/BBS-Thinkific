import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function FAQAccordion({ items }) {
  const [open, setOpen] = useState(null)

  return (
    <div style={{ display:'flex', flexDirection:'column' }}>
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <div key={i} style={{ borderBottom:'1px solid var(--fro-line)' }}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              style={{
                width:'100%', background:'none', border:'none', cursor:'pointer',
                display:'flex', alignItems:'center', justifyContent:'space-between',
                padding:'1.25rem 0', gap:'1rem', textAlign:'left', color:'var(--fro-text)',
              }}
            >
              <span style={{
                fontFamily:'var(--fsyne)', fontWeight:600, fontSize:'1rem',
                letterSpacing:'-0.01em', color:'var(--fro-text)',
              }}>{item.q}</span>
              <motion.span
                aria-hidden
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration:0.2 }}
                style={{ color:'var(--fro-amber)', fontSize:'1.3rem', fontWeight:300, flexShrink:0, lineHeight:1 }}
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
                  <p className="fro-body" style={{ paddingBottom:'1.3rem', fontSize:'0.92rem', margin:0 }}>
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
