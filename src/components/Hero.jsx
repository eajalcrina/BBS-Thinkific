import { motion } from 'framer-motion'
import CellCanvas from './CellCanvas.jsx'

const st = { hidden:{}, show:{ transition:{ staggerChildren:0.08, delayChildren:0.15 } } }
const it = { hidden:{ opacity:0, y:36 }, show:{ opacity:1, y:0, transition:{ duration:0.7, ease:[0.22,1,0.36,1] } } }

export default function Hero() {
  return (
    <section style={{ background:'var(--lime)', position:'relative', overflow:'hidden', minHeight:'92vh', display:'flex', alignItems:'center' }}>

      <CellCanvas palette="lime"/>

      {/* Dot grid */}
      <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(rgba(14,14,14,0.10) 1px, transparent 1px)', backgroundSize:'28px 28px', pointerEvents:'none', zIndex:1, maskImage:'linear-gradient(to right, transparent, rgba(0,0,0,0.3) 30%, rgba(0,0,0,0.3) 70%, transparent)' }}/>

      <div className="wrap" style={{ width:'100%', position:'relative', zIndex:2, paddingTop:'3rem', paddingBottom:'7rem' }}>
        <motion.div variants={st} initial="hidden" animate="show" style={{ maxWidth:780 }}>
          <motion.div variants={it} style={{ marginBottom:'2rem' }}>
            <span className="badge badge-dark">
              <span style={{ width:6, height:6, borderRadius:'50%', background:'var(--lime)', display:'inline-block', animation:'blink 2s infinite' }}/>
              Lanzamiento 2026 · Lima, Perú
            </span>
          </motion.div>
          <motion.h1 variants={it} className="t-out t-xl" style={{ marginBottom:'1.8rem', color:'var(--dark)' }}>
            Bionegocios<br/>
            <span style={{ color:'var(--rose)', fontWeight:700 }}>rentables</span><br/>
            para América Latina
          </motion.h1>
          <motion.div variants={it}>
            <div style={{ width:80, height:4, background:'var(--dark)', borderRadius:2, marginBottom:'2rem' }}/>
          </motion.div>
          <motion.p variants={it} className="lead on-lime" style={{ maxWidth:560, marginBottom:'2.5rem', fontFamily:'var(--fout)' }}>
            No somos una escuela de negocios. Somos la plataforma de inteligencia estratégica que convierte la biodiversidad de América Latina en activos económicos de impacto global.
          </motion.p>
          <motion.div variants={it} style={{ display:'flex', gap:'1rem', flexWrap:'wrap' }}>
            <a href="#curso" className="btn btn-rose btn-lg">Ver Biotech Sprint 01 →</a>
            <a href="#libro" className="btn btn-outline btn-lg">Descubre el Bio Business Playbook vol. 1</a>
          </motion.div>
        </motion.div>
      </div>

      <div style={{ position:'absolute', bottom:-1, left:0, right:0, zIndex:5 }}>
        <svg viewBox="0 0 1440 110" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ width:'100%', height:110, display:'block' }}>
          <path d="M0,82 C180,30 420,100 720,40 C1020,8 1260,85 1440,58 L1440,110 L0,110 Z" fill="rgba(14,14,14,0.28)"/>
          <path d="M0,92 C220,48 460,108 740,58 C1020,22 1260,95 1440,68 L1440,110 L0,110 Z" fill="var(--dark)"/>
        </svg>
      </div>
    </section>
  )
}
