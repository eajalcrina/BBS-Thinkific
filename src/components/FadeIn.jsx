import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
export default function FadeIn({ children, delay=0, y=28, x=0, scale=1, className='', style={} }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once:true, margin:'-60px' })
  return (
    <motion.div ref={ref} className={className} style={style}
      initial={{ opacity:0, y, x, scale: scale < 1 ? scale : undefined }}
      animate={inView ? { opacity:1, y:0, x:0, scale:1 } : { opacity:0, y, x, scale: scale < 1 ? scale : undefined }}
      transition={{ duration:0.65, delay, ease:[0.22,1,0.36,1] }}
    >{children}</motion.div>
  )
}
