import { motion } from 'framer-motion'

const st = { hidden:{}, show:{ transition:{ staggerChildren:0.08, delayChildren:0.15 } } }
const it = { hidden:{ opacity:0, y:36 }, show:{ opacity:1, y:0, transition:{ duration:0.7, ease:[0.22,1,0.36,1] } } }

const heroOrbs = [
  {x:12,y:12,r:4,f:'rgba(14,14,14,0.30)'},{x:28,y:11,r:3,f:'rgba(14,14,14,0.26)'},
  {x:31,y:26,r:4.5,f:'rgba(14,14,14,0.24)'},{x:14,y:30,r:3.5,f:'rgba(14,14,14,0.28)'},
  {x:22,y:20,r:2,f:'rgba(14,14,14,0.18)'}
]

export default function Hero() {
  return (
    <section style={{ background:'var(--lime)', position:'relative', overflow:'hidden', minHeight:'92vh', display:'flex', alignItems:'center' }}>

      {/* CÉLULA COMPLETA — visible en top:8% right:3% */}
      <div style={{ position:'absolute', top:'8%', right:'3%', width:190, height:190, borderRadius:'50%', background:'rgba(255,255,255,0.09)', border:'2px dashed rgba(255,255,255,0.52)', animation:'spin-cw 24s linear infinite', transformOrigin:'center', pointerEvents:'none' }}>
        <motion.div animate={{ y:[0,-12,0] }} transition={{ duration:5, repeat:Infinity, ease:'easeInOut' }}
          style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:42, height:42, borderRadius:'50%', overflow:'hidden' }}>
          <svg width="42" height="42" viewBox="0 0 42 42" xmlns="http://www.w3.org/2000/svg" style={{ display:'block' }}>
            <circle cx="21" cy="21" r="20" fill="rgba(14,14,14,0.42)"/>
            {heroOrbs.map((o,i)=><circle key={i} cx={o.x} cy={o.y} r={o.r} fill={o.f}/>)}
          </svg>
        </motion.div>
      </div>

      {/* Burbuja pequeña suelta izquierda — visible */}
      <div style={{ position:'absolute', bottom:'18%', left:'4%', width:70, height:70, borderRadius:'50%', background:'rgba(255,255,255,0.06)', border:'2px dashed rgba(255,255,255,0.35)', animation:'spin-ccw 32s linear infinite', transformOrigin:'center', pointerEvents:'none' }}/>
      <motion.div animate={{ x:[0,9,0] }} transition={{ duration:6, repeat:Infinity, ease:'easeInOut' }}
        style={{ position:'absolute', bottom:'32%', left:'12%', width:12, height:12, borderRadius:'50%', background:'#F32769', pointerEvents:'none' }}/>

      {/* Dot grid */}
      <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(rgba(14,14,14,0.15) 1px, transparent 1px)', backgroundSize:'28px 28px', pointerEvents:'none', maskImage:'linear-gradient(to right, transparent, rgba(0,0,0,0.4) 30%, rgba(0,0,0,0.4) 70%, transparent)' }}/>

      <div className="wrap" style={{ width:'100%', position:'relative', paddingTop:'3rem', paddingBottom:'7rem' }}>
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

      {/* TRANSICIÓN FUSIONADA: lime → dark */}
      <div style={{ position:'absolute', bottom:-1, left:0, right:0, zIndex:5 }}>
        <svg viewBox="0 0 1440 110" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ width:'100%', height:110, display:'block' }}>
          <path d="M0,82 C180,30 420,100 720,40 C1020,8 1260,85 1440,58 L1440,110 L0,110 Z" fill="rgba(14,14,14,0.28)"/>
          <path d="M0,92 C220,48 460,108 740,58 C1020,22 1260,95 1440,68 L1440,110 L0,110 Z" fill="var(--dark)"/>
        </svg>
      </div>
    </section>
  )
}
