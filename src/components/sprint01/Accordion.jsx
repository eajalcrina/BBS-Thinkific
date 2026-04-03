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
      {items.map((item, i) => (
        <div key={i} style={{ borderBottom:'1px solid rgba(255,255,255,0.08)' }}>
          <button
            onClick={() => toggle(i)}
            style={{
              width:'100%', background:'none', border:'none', cursor:'pointer',
              display:'flex', alignItems:'center', justifyContent:'space-between',
              padding:'1.3rem 0', gap:'1rem', textAlign:'left',
            }}
          >
            <span style={{ display:'flex', alignItems:'center', gap:'0.8rem', flex:1 }}>
              {item.badge && (
                <span style={{
                  fontFamily:'var(--fbc)', fontSize:'0.65rem', fontWeight:700,
                  letterSpacing:'0.1em', textTransform:'uppercase',
                  background:'var(--rose)', color:'var(--white)',
                  width:32, height:32, borderRadius:'50%',
                  display:'inline-flex', alignItems:'center', justifyContent:'center', flexShrink:0,
                }}>{item.badge}</span>
              )}
              <span style={{
                fontFamily:'var(--fout)', fontWeight:500, fontSize:'1.15rem',
                color:'var(--t-white)', letterSpacing:'-0.01em',
              }}>{item.title}</span>
            </span>
            <motion.span
              animate={{ rotate: open.includes(i) ? 45 : 0 }}
              transition={{ duration:0.2 }}
              style={{ color:'var(--lime)', fontSize:'1.4rem', fontWeight:300, flexShrink:0, lineHeight:1 }}
            >+</motion.span>
          </button>
          <AnimatePresence initial={false}>
            {open.includes(i) && (
              <motion.div
                initial={{ height:0, opacity:0 }}
                animate={{ height:'auto', opacity:1 }}
                exit={{ height:0, opacity:0 }}
                transition={{ duration:0.3, ease:[0.22,1,0.36,1] }}
                style={{ overflow:'hidden' }}
              >
                <div style={{ paddingBottom:'1.5rem', paddingLeft: item.badge ? '2.8rem' : 0 }}>
                  {item.content}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}
