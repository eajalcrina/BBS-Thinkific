import { motion } from 'framer-motion'

const st = { hidden:{}, show:{ transition:{ staggerChildren:0.08, delayChildren:0.15 } } }
const it = { hidden:{ opacity:0, y:36 }, show:{ opacity:1, y:0, transition:{ duration:0.7, ease:[0.22,1,0.36,1] } } }

export default function Hero() {
  return (
    <section style={{ background:'var(--lime)', position:'relative', overflow:'hidden', minHeight:'92vh', display:'flex', alignItems:'center' }}>
      <motion.div initial={{ opacity:0, scale:0 }} animate={{ opacity:1, scale:1 }} transition={{ delay:0.8, duration:0.6, ease:[0.22,1,0.36,1] }}
        style={{ position:'absolute', top:'12%', right:'8%', width:320, height:320, borderRadius:'50%', background:'rgba(243,39,105,0.12)', pointerEvents:'none' }} className="float-y"/>
      <motion.div initial={{ opacity:0, scale:0 }} animate={{ opacity:1, scale:1 }} transition={{ delay:0.9, duration:0.6, ease:[0.22,1,0.36,1] }}
        style={{ position:'absolute', bottom:'8%', right:'20%', width:180, height:180, borderRadius:'50%', background:'rgba(243,39,105,0.18)', pointerEvents:'none' }} className="float-y"/>
      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.2 }}
        style={{ position:'absolute', top:'25%', right:'15%', width:60, height:60, background:'var(--rose)', borderRadius:'50%', pointerEvents:'none' }} className="float-x"/>
      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.4 }}
        style={{ position:'absolute', bottom:'30%', right:'10%', width:20, height:20, background:'var(--dark)', borderRadius:'50%', pointerEvents:'none' }}/>

      <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(rgba(14,14,14,0.15) 1px, transparent 1px)', backgroundSize:'28px 28px', pointerEvents:'none', maskImage:'linear-gradient(to right, transparent, rgba(0,0,0,0.4) 30%, rgba(0,0,0,0.4) 70%, transparent)' }}/>

      <div className="wrap" style={{ width:'100%', position:'relative', paddingTop:'3rem', paddingBottom:'3rem' }}>
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

      <div style={{ position:'absolute', bottom:-1, left:0, right:0 }}>
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ width:'100%', height:60, display:'block' }}>
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="var(--white)"/>
        </svg>
      </div>
    </section>
  )
}
