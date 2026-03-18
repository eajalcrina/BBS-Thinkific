import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
export default function FadeIn({ children, delay=0, y=28, x=0, className='', style={} }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once:true, margin:'-60px' })
  return (
    <motion.div ref={ref} className={className} style={style}
      initial={{ opacity:0, y, x }}
      animate={inView ? { opacity:1, y:0, x:0 } : { opacity:0, y, x }}
      transition={{ duration:0.7, delay, ease:[0.22,1,0.36,1] }}
    >{children}</motion.div>
  )
}
