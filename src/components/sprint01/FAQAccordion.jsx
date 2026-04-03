import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function FAQAccordion({ items }) {
  const [open, setOpen] = useState(null)

  return (
    <div style={{ display:'flex', flexDirection:'column' }}>
      {items.map((item, i) => (
        <div key={i} style={{ borderBottom:'1px solid rgba(14,14,14,0.08)' }}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            style={{
              width:'100%', background:'none', border:'none', cursor:'pointer',
              display:'flex', alignItems:'center', justifyContent:'space-between',
              padding:'1.2rem 0', gap:'1rem', textAlign:'left',
            }}
          >
            <span style={{
              fontFamily:'var(--fbc)', fontWeight:600, fontSize:'0.88rem',
              letterSpacing:'0.04em', textTransform:'uppercase',
              color:'var(--dark)',
            }}>{item.q}</span>
            <motion.span
              animate={{ rotate: open === i ? 45 : 0 }}
              transition={{ duration:0.2 }}
              style={{ color:'var(--rose)', fontSize:'1.3rem', fontWeight:300, flexShrink:0, lineHeight:1 }}
            >+</motion.span>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                initial={{ height:0, opacity:0 }}
                animate={{ height:'auto', opacity:1 }}
                exit={{ height:0, opacity:0 }}
                transition={{ duration:0.3, ease:[0.22,1,0.36,1] }}
                style={{ overflow:'hidden' }}
              >
                <p style={{
                  paddingBottom:'1.3rem', fontFamily:'var(--fdm)',
                  fontSize:'0.88rem', lineHeight:1.7, color:'var(--t-dark2)',
                }}>{item.a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}
