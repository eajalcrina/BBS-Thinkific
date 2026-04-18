import FadeIn from './FadeIn.jsx'
import { motion } from 'framer-motion'

const items = [
  { n:'01', title:'Asimetría de información', body:'La falta de datos curados sobre bionegocios paraliza la inversión en la región.' },
  { n:'02', title:'Asimetría de valor',        body:'En la Amazonía perdemos valor porque nadie enseña a diseñar modelos rentables que protejan la vida.' },
  { n:'03', title:'Déficit de especialización',body:'Los científicos no entienden el ROI. Los ejecutivos no entienden la biología molecular.' },
  { n:'04', title:'Capital en fuga',           body:'El capital abandona la región por falta de valor agregado y marcos de gobernanza claros.' },
]

export default function Problem() {
  return (
    <section id="problema" className="fro-sec" style={{ background:'var(--fro-bg-2)', borderTop:'1px solid var(--fro-line)', borderBottom:'1px solid var(--fro-line)' }}>
      <div className="fro-wrap">

        <FadeIn><div className="fro-eyebrow" style={{ marginBottom:'1.2rem' }}>El problema</div></FadeIn>

        <div className="prob-intro" style={{ display:'grid', gridTemplateColumns:'1.4fr 1fr', gap:'4rem', alignItems:'end', marginBottom:'4rem' }}>
          <FadeIn delay={0.08}>
            <h2 className="fro-h2" style={{ maxWidth:'10em' }}>
              Las escuelas de negocios formaron a quienes{' '}
              <span className="fro-italic-amber">deterioraron</span> la región
            </h2>
          </FadeIn>
          <FadeIn delay={0.14}>
            <p className="fro-lead" style={{ maxWidth:420 }}>
              Existe una brecha crítica entre el descubrimiento científico de frontera y la construcción de modelos de bionegocios técnica y financieramente viables.
            </p>
          </FadeIn>
        </div>

        <div className="prob-grid" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1.25rem' }}>
          {items.map((p,i) => (
            <FadeIn key={p.n} delay={0.08*i}>
              <motion.article
                whileHover={{ y:-4, borderColor:'rgba(255,200,0,0.35)' }}
                transition={{ duration:0.25, ease:[0.22,1,0.36,1] }}
                className="fro-card"
                style={{ padding:'1.8rem 1.5rem', height:'100%', display:'flex', flexDirection:'column', gap:'0.8rem' }}
              >
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                  <span style={{ fontFamily:'var(--fsyne)', fontWeight:700, fontSize:'0.85rem', letterSpacing:'0.16em', color:'var(--fro-amber)' }}>{p.n}</span>
                  <div aria-hidden style={{ flex:1, height:1, background:'var(--fro-line)', marginLeft:'0.8rem' }}/>
                </div>
                <h3 className="fro-h3">{p.title}</h3>
                <p className="fro-sm" style={{ color:'var(--fro-text-2)' }}>{p.body}</p>
              </motion.article>
            </FadeIn>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .prob-intro { grid-template-columns: 1fr !important; gap: 2rem !important; align-items: flex-start !important; }
          .prob-grid  { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 520px) {
          .prob-grid  { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
