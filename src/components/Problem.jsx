import FadeIn from './FadeIn.jsx'
const items = [
  { n:'01', title:'Asimetría de información', body:'La falta de datos curados sobre bionegocios paraliza la inversión en la región.' },
  { n:'02', title:'Asimetría de valor', body:'En la Amazonía perdemos valor porque nadie enseña a diseñar modelos rentables que protejan la vida.' },
  { n:'03', title:'Déficit de especialización', body:'Los científicos no entienden el ROI. Los ejecutivos no entienden la biología molecular.' },
  { n:'04', title:'Capital en fuga', body:'El capital abandona la región por falta de valor agregado y marcos de gobernanza claros.' },
]
export default function Problem() {
  return (
    <section className="sec on-dark" style={{ background:'var(--dark)', position:'relative', overflow:'hidden' }}>
      {/* Top wave */}
      <div style={{ position:'absolute', top:-1, left:0, right:0, zIndex:1 }}>
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ width:'100%', height:60, display:'block' }}>
          <path d="M0,30 C360,0 1080,60 1440,30 L1440,0 L0,0 Z" fill="var(--white)"/>
        </svg>
      </div>

      {/* Lime accent blob */}
      <div style={{ position:'absolute', top:'20%', right:'-5%', width:400, height:400, borderRadius:'50%',
        background:'radial-gradient(circle, rgba(193,244,0,0.08) 0%, transparent 70%)', pointerEvents:'none' }}/>

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
          {items.map((p,i) => (
            <FadeIn key={p.n} delay={0.08*i}>
              <motion.div
                whileHover={{ y:-6, background:'rgba(193,244,0,0.06)' }}
                transition={{ duration:0.2 }}
                style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:16, padding:'1.8rem 1.5rem', height:'100%', display:'flex', flexDirection:'column', gap:'0.7rem', cursor:'default', transition:'background 0.2s' }}
              >
                <div style={{ fontFamily:'var(--fbc)', fontSize:'2.5rem', fontWeight:700, color:'rgba(193,244,0,0.18)', lineHeight:1 }}>{p.n}</div>
                <h3 style={{ fontFamily:'var(--fout)', fontSize:'0.95rem', fontWeight:600, color:'var(--white)', lineHeight:1.35 }}>{p.title}</h3>
                <p style={{ fontSize:'0.85rem', lineHeight:1.65, color:'var(--t-white3)' }}>{p.body}</p>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Bottom wave */}
      <div style={{ position:'absolute', bottom:-1, left:0, right:0, zIndex:1 }}>
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ width:'100%', height:60, display:'block' }}>
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="var(--white)"/>
        </svg>
      </div>
      <style>{`
        @media(max-width:760px){.prob-grid{grid-template-columns:1fr 1fr!important}}
        @media(max-width:480px){.prob-grid{grid-template-columns:1fr!important}}
        .prob-grid > div > div { import { motion } }
      `}</style>
    </section>
  )
}
