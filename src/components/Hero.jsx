import { motion } from 'framer-motion'

const st = { hidden:{}, show:{ transition:{ staggerChildren:0.08, delayChildren:0.15 } } }
const it = { hidden:{ opacity:0, y:36 }, show:{ opacity:1, y:0, transition:{ duration:0.7, ease:[0.22,1,0.36,1] } } }

const CellSvg = ({ size, fill, orbs }) => (
  <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} xmlns="http://www.w3.org/2000/svg" style={{ display:'block' }}>
    <circle cx={size/2} cy={size/2} r={size/2 - 1} fill={fill}/>
    {orbs.map((o,i) => <circle key={i} cx={o.x} cy={o.y} r={o.r} fill={o.f}/>)}
  </svg>
)

const heroOrbs = [
  {x:14,y:14,r:4.5,f:'rgba(14,14,14,0.32)'},{x:30,y:12,r:3,f:'rgba(14,14,14,0.28)'},
  {x:34,y:28,r:5,f:'rgba(14,14,14,0.26)'},{x:16,y:32,r:3.5,f:'rgba(14,14,14,0.30)'},
  {x:24,y:20,r:2,f:'rgba(14,14,14,0.18)'},{x:10,y:26,r:2.5,f:'rgba(14,14,14,0.22)'}
]

export default function Hero() {
  return (
    <section style={{ background:'var(--lime)', position:'relative', overflow:'hidden', minHeight:'92vh', display:'flex', alignItems:'center' }}>

      {/* Burbujas punteadas giratorias */}
      <div style={{ position:'absolute', top:'-14%', right:'2%', width:240, height:240, borderRadius:'50%', background:'rgba(255,255,255,0.09)', border:'2px dashed rgba(255,255,255,0.52)', animation:'spin-cw 24s linear infinite', transformOrigin:'center', pointerEvents:'none' }}/>
      <div style={{ position:'absolute', bottom:'-8%', left:'2%', width:110, height:110, borderRadius:'50%', background:'rgba(255,255,255,0.06)', border:'2px dashed rgba(255,255,255,0.35)', animation:'spin-ccw 32s linear infinite', transformOrigin:'center', pointerEvents:'none' }}/>
      <div style={{ position:'absolute', bottom:'12%', right:'36%', width:65, height:65, borderRadius:'50%', background:'rgba(255,255,255,0.05)', border:'2px dashed rgba(255,255,255,0.25)', animation:'spin-cw 44s linear infinite', transformOrigin:'center', pointerEvents:'none' }}/>

      {/* Célula mediana con orgánulos — derecha */}
      <motion.div animate={{ y:[0,-12,0] }} transition={{ duration:5, repeat:Infinity, ease:'easeInOut' }}
        style={{ position:'absolute', top:'22%', right:'16%', width:46, height:46, borderRadius:'50%', overflow:'hidden', pointerEvents:'none' }}>
        <CellSvg size={46} fill="rgba(14,14,14,0.42)" orbs={heroOrbs}/>
      </motion.div>

      {/* Punto pequeño rojo — izquierda media */}
      <motion.div animate={{ x:[0,9,0] }} transition={{ duration:6, repeat:Infinity, ease:'easeInOut' }}
        style={{ position:'absolute', bottom:'20%', left:'8%', width:14, height:14, borderRadius:'50%', background:'#F32769', pointerEvents:'none' }}/>

      {/* Dot grid */}
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
