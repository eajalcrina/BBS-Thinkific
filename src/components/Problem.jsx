import FadeIn from './FadeIn.jsx'
import { motion } from 'framer-motion'

const items = [
  { n:'01', title:'Asimetría de información', body:'La falta de datos curados sobre bionegocios paraliza la inversión en la región.' },
  { n:'02', title:'Asimetría de valor', body:'En la Amazonía perdemos valor porque nadie enseña a diseñar modelos rentables que protejan la vida.' },
  { n:'03', title:'Déficit de especialización', body:'Los científicos no entienden el ROI. Los ejecutivos no entienden la biología molecular.' },
  { n:'04', title:'Capital en fuga', body:'El capital abandona la región por falta de valor agregado y marcos de gobernanza claros.' },
]

const orbsLime = [
  {x:6,y:6,r:2.2,f:'rgba(193,244,0,0.38)'},{x:15,y:5,r:1.6,f:'rgba(193,244,0,0.30)'},
  {x:16,y:14,r:2.5,f:'rgba(193,244,0,0.28)'},{x:6,y:15,r:1.8,f:'rgba(193,244,0,0.34)'},
  {x:11,y:11,r:1.4,f:'rgba(193,244,0,0.20)'}
]

export default function Problem() {
  return (
    <section className="sec on-dark" style={{ background:'var(--dark)', position:'relative', overflow:'hidden' }}>

      {/* CÉLULA COMPLETA izquierda — visible top:8% */}
      <div style={{ position:'absolute', top:'8%', left:'3%', width:105, height:105, borderRadius:'50%', background:'rgba(255,255,255,0.02)', border:'2px dashed rgba(255,255,255,0.14)', animation:'spin-ccw 30s linear infinite', transformOrigin:'center', pointerEvents:'none' }}>
        <motion.div animate={{ y:[0,-10,0] }} transition={{ duration:5.5, repeat:Infinity, ease:'easeInOut' }}
          style={{ position:'absolute', top:'35%', left:'38%', transform:'translate(-50%,-50%)', width:24, height:24, borderRadius:'50%', overflow:'hidden' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ display:'block' }}>
            <circle cx="12" cy="12" r="11" fill="rgba(193,244,0,0.55)"/>
            {orbsLime.map((o,i)=><circle key={i} cx={o.x} cy={o.y} r={o.r} fill={o.f}/>)}
          </svg>
        </motion.div>
      </div>

      {/* Burbuja pequeña suelta derecha — visible */}
      <div style={{ position:'absolute', bottom:'10%', right:'4%', width:62, height:62, borderRadius:'50%', background:'rgba(255,255,255,0.02)', border:'2px dashed rgba(255,255,255,0.10)', animation:'spin-cw 38s linear infinite', transformOrigin:'center', pointerEvents:'none' }}/>
      <motion.div animate={{ y:[0,-8,0] }} transition={{ duration:5, repeat:Infinity, ease:'easeInOut' }}
        style={{ position:'absolute', top:'30%', right:'12%', width:10, height:10, borderRadius:'50%', background:'rgba(193,244,0,0.6)', pointerEvents:'none' }}/>

      <div className="wrap" style={{ position:'relative', zIndex:2 }}>
        <FadeIn><div className="label white" style={{ marginBottom:'1rem' }}>El problema</div></FadeIn>
        <FadeIn delay={0.08}>
          <h2 className="t-out t-lg" style={{ marginBottom:'0.9rem', color:'var(--white)', maxWidth:700 }}>
            Las escuelas de negocios formaron a quienes <em style={{ fontStyle:'normal', color:'var(--lime)', fontWeight:700 }}>deterioraron</em> la región
          </h2>
        </FadeIn>
        <FadeIn delay={0.14}>
          <p className="lead" style={{ color:'var(--t-white2)', maxWidth:560, marginBottom:'3rem' }}>
            Existe una brecha crítica entre el descubrimiento científico de frontera y la construcción de modelos de bionegocios técnica y financieramente viables.
          </p>
        </FadeIn>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1.5rem' }} className="prob-grid">
          {items.map((p,i)=>(
            <FadeIn key={p.n} delay={0.08*i}>
              <motion.div whileHover={{ y:-6, background:'rgba(193,244,0,0.06)' }} transition={{ duration:0.2 }}
                style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:16, padding:'1.8rem 1.5rem', height:'100%', display:'flex', flexDirection:'column', gap:'0.7rem', cursor:'default', transition:'background 0.2s' }}>
                <div style={{ fontFamily:'var(--fbc)', fontSize:'2.5rem', fontWeight:700, color:'rgba(193,244,0,0.18)', lineHeight:1 }}>{p.n}</div>
                <h3 style={{ fontFamily:'var(--fout)', fontSize:'0.95rem', fontWeight:600, color:'var(--white)', lineHeight:1.35 }}>{p.title}</h3>
                <p style={{ fontSize:'0.85rem', lineHeight:1.65, color:'var(--t-white3)' }}>{p.body}</p>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* TRANSICIÓN FUSIONADA: dark → cream */}
      <div style={{ position:'absolute', bottom:-1, left:0, right:0, zIndex:1 }}>
        <svg viewBox="0 0 1440 110" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ width:'100%', height:110, display:'block' }}>
          <path d="M0,28 C180,88 420,10 720,72 C1020,105 1260,25 1440,55 L1440,110 L0,110 Z" fill="rgba(248,246,240,0.30)"/>
          <path d="M0,18 C200,80 440,5 720,65 C1000,100 1240,20 1440,48 L1440,110 L0,110 Z" fill="var(--cream)"/>
        </svg>
      </div>
      <style>{`
        @media(max-width:760px){.prob-grid{grid-template-columns:1fr 1fr!important}}
        @media(max-width:480px){.prob-grid{grid-template-columns:1fr!important}}
      `}</style>
    </section>
  )
}
