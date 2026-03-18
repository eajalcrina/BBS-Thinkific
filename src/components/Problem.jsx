import FadeIn from './FadeIn.jsx'
const items = [
  { n:'01', title:'Asimetría de información', body:'La falta de datos curados sobre bionegocios paraliza la inversión en la región.' },
  { n:'02', title:'Asimetría de valor', body:'En la Amazonía perdemos valor porque nadie enseña a diseñar modelos rentables que protejan la vida.' },
  { n:'03', title:'Déficit de especialización', body:'Los científicos no entienden el ROI. Los ejecutivos no entienden la biología molecular.' },
  { n:'04', title:'Capital en fuga', body:'El capital abandona la región por falta de valor agregado y marcos de gobernanza claros.' },
]
export default function Problem() {
  return (
    <section className="sec" style={{ position:'relative' }}>
      <div style={{ position:'absolute', bottom:'0', left:'50%', transform:'translateX(-50%)', width:800, height:400,
        background:'radial-gradient(ellipse, rgba(243,39,105,0.04) 0%, transparent 70%)',
        filter:'blur(40px)', pointerEvents:'none' }}/>
      <div className="wrap" style={{ position:'relative' }}>
        <FadeIn><div className="label" style={{ marginBottom:'1rem' }}>El problema</div></FadeIn>
        <FadeIn delay={0.08}>
          <h2 className="t-out t-lg" style={{ marginBottom:'0.9rem', maxWidth:680 }}>
            Las escuelas de negocios formaron a quienes <span className="hl-rose">deterioraron</span> la región
          </h2>
        </FadeIn>
        <FadeIn delay={0.14}>
          <p className="lead" style={{ maxWidth:560, marginBottom:'3rem' }}>
            Existe una brecha crítica entre el descubrimiento científico de frontera y la construcción de modelos de bionegocios técnica y financieramente viables.
          </p>
        </FadeIn>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1px', background:'var(--b1)', border:'1px solid var(--b1)', borderRadius:10, overflow:'hidden' }} className="prob-grid">
          {items.map((p,i) => (
            <FadeIn key={p.n} delay={0.06*i}>
              <div className="glass" style={{ padding:'2rem 1.6rem', height:'100%', display:'flex', flexDirection:'column', gap:'0.7rem', transition:'background 0.2s', cursor:'default', borderRadius:0, border:'none' }}
                onMouseEnter={e=>{e.currentTarget.style.background='rgba(20,20,40,0.8)'}}
                onMouseLeave={e=>{e.currentTarget.style.background='rgba(12,12,26,0.7)'}}
              >
                <div style={{ fontFamily:'var(--fbc)', fontSize:'3rem', fontWeight:700, color:'rgba(200,240,0,0.09)', lineHeight:1 }}>{p.n}</div>
                <h3 style={{ fontFamily:'var(--fout)', fontSize:'0.95rem', fontWeight:600, letterSpacing:'0.02em', color:'var(--t1)' }}>{p.title}</h3>
                <p className="body" style={{ color:'var(--t3)' }}>{p.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:760px){.prob-grid{grid-template-columns:1fr 1fr!important}}@media(max-width:480px){.prob-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  )
}
