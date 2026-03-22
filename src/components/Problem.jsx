import FadeIn from './FadeIn.jsx'
import { motion } from 'framer-motion'
import CellCanvas from './CellCanvas.jsx'

const items = [
  { n:'01', title:'Asimetría de información', body:'La falta de datos curados sobre bionegocios paraliza la inversión en la región.' },
  { n:'02', title:'Asimetría de valor', body:'En la Amazonía perdemos valor porque nadie enseña a diseñar modelos rentables que protejan la vida.' },
  { n:'03', title:'Déficit de especialización', body:'Los científicos no entienden el ROI. Los ejecutivos no entienden la biología molecular.' },
  { n:'04', title:'Capital en fuga', body:'El capital abandona la región por falta de valor agregado y marcos de gobernanza claros.' },
]

export default function Problem() {
  return (
    <section className="sec on-dark" style={{ background:'var(--dark)', position:'relative', overflow:'hidden' }}>

      <CellCanvas palette="dark"/>

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
                style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:16, padding:'1.8rem 1.5rem', height:'100%', display:'flex', flexDirection:'column', gap:'0.6rem', cursor:'default', transition:'background 0.2s' }}>
                <div style={{ fontFamily:'var(--fbc)', fontSize:'2.8rem', fontWeight:700, color:'rgba(193,244,0,0.30)', lineHeight:0.9 }}>{p.n}</div>
                <h3 style={{ fontFamily:'var(--fout)', fontSize:'1.05rem', fontWeight:700, color:'var(--white)', lineHeight:1.3 }}>{p.title}</h3>
                <p style={{ fontSize:'0.85rem', lineHeight:1.65, color:'var(--t-white3)' }}>{p.body}</p>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>

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
