import FadeIn from './FadeIn.jsx'

const items = [
  { n:'01', title:'Asimetría de información', body:'La falta de datos curados sobre bionegocios paraliza la inversión en la región.' },
  { n:'02', title:'Asimetría de valor', body:'En la Amazonía perdemos valor porque nadie enseña a diseñar modelos rentables que protejan la vida.' },
  { n:'03', title:'Déficit de especialización', body:'Los científicos no entienden el ROI. Los ejecutivos no entienden la biología molecular.' },
  { n:'04', title:'Capital en fuga', body:'El capital abandona la región por falta de valor agregado y marcos de gobernanza claros.' },
]

export default function Problem() {
  return (
    <section className="section">
      <div className="container">
        <FadeIn><div className="label" style={{marginBottom:'1rem'}}>El problema</div></FadeIn>
        <FadeIn delay={0.08}>
          <h2 className="t-display t-lg" style={{marginBottom:'0.9rem', maxWidth:700}}>
            Las escuelas de negocios formaron a quienes <span className="hl">deterioraron</span> la región
          </h2>
        </FadeIn>
        <FadeIn delay={0.14}>
          <p className="body-l" style={{maxWidth:560, marginBottom:'3rem'}}>
            Existe una brecha crítica entre el descubrimiento científico de frontera y la construcción de modelos de bionegocios técnica y financieramente viables.
          </p>
        </FadeIn>
        <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:1, background:'var(--border)', border:'1px solid var(--border)', borderRadius:6, overflow:'hidden'}} className="prob-grid">
          {items.map((p,i) => (
            <FadeIn key={p.n} delay={0.06*i}>
              <div style={{background:'var(--bg-2)', padding:'2rem 1.6rem', height:'100%', display:'flex', flexDirection:'column', gap:'0.7rem', transition:'background 0.2s', cursor:'default'}}
                onMouseEnter={e=>e.currentTarget.style.background='var(--bg-3)'}
                onMouseLeave={e=>e.currentTarget.style.background='var(--bg-2)'}
              >
                <div style={{fontFamily:'var(--fd)', fontSize:'3rem', fontWeight:700, color:'rgba(187,238,0,0.1)', lineHeight:1}}>{p.n}</div>
                <h3 style={{fontFamily:'var(--fd)', fontSize:'1rem', fontWeight:600, letterSpacing:'0.06em', textTransform:'uppercase', color:'var(--text-2)'}}>{p.title}</h3>
                <p style={{fontSize:'0.85rem', lineHeight:1.65, color:'var(--text-3)'}}>{p.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:760px){.prob-grid{grid-template-columns:1fr 1fr!important}}@media(max-width:480px){.prob-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  )
}
