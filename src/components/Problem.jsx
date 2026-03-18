import FadeIn from './FadeIn.jsx'

const problems = [
  { n: '01', title: 'Asimetría de información', body: 'La falta de datos curados sobre bionegocios paraliza la inversión en la región.' },
  { n: '02', title: 'Asimetría de valor', body: 'En la Amazonía perdemos valor porque nadie enseña a diseñar modelos rentables que protejan la vida.' },
  { n: '03', title: 'Déficit de especialización', body: 'Los científicos no entienden el ROI. Los ejecutivos no entienden la biología molecular.' },
  { n: '04', title: 'Capital en fuga', body: 'El capital abandona la región por falta de valor agregado y marcos de gobernanza claros.' },
]

export default function Problem() {
  return (
    <section className="section">
      <div className="wrap">
        <FadeIn><div className="eyebrow" style={{ marginBottom: '0.75rem' }}>El problema</div></FadeIn>
        <FadeIn delay={0.08}>
          <h2 className="t-display t-lg" style={{ marginBottom: '0.9rem' }}>
            Las escuelas de negocios formaron<br />a quienes <em className="t-em">deterioraron</em> la región
          </h2>
        </FadeIn>
        <FadeIn delay={0.14}>
          <p className="lead" style={{ maxWidth: 560, marginBottom: '2.5rem' }}>
            Existe una brecha crítica entre el descubrimiento científico de frontera y la construcción de modelos de bionegocios técnica y financieramente viables.
          </p>
        </FadeIn>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'var(--line)', border: '1px solid var(--line)', borderRadius: 4, overflow: 'hidden' }} className="prob-grid">
          {problems.map((p, i) => (
            <FadeIn key={p.n} delay={0.06 * i}>
              <div
                style={{ background: 'var(--bg2)', padding: '1.8rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.6rem', height: '100%', transition: 'background 0.2s', cursor: 'default' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--bg3)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--bg2)'}
              >
                <div style={{ fontFamily: 'var(--fd)', fontSize: '2rem', fontWeight: 700, color: 'rgba(197,252,0,0.15)', lineHeight: 1, marginBottom: '0.2rem' }}>{p.n}</div>
                <h3 style={{ fontFamily: 'var(--fd)', fontSize: '0.95rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-hi)' }}>{p.title}</h3>
                <p style={{ fontSize: '0.85rem', lineHeight: 1.65, color: 'var(--text-mid)' }}>{p.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
      <style>{`@media (max-width: 760px) { .prob-grid { grid-template-columns: 1fr 1fr !important; } } @media (max-width: 480px) { .prob-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  )
}
