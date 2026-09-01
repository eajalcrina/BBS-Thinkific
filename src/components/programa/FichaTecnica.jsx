import FadeIn from '../FadeIn.jsx'

export default function FichaTecnica({ programa }) {
  return (
    <section className="fro-sec fro-bg-white fro-on-light">
      <div className="fro-wrap">
        <FadeIn><div className="fro-eyebrow" style={{ marginBottom: '1.2rem' }}>Por qué existe este programa</div></FadeIn>
        <FadeIn delay={0.06}>
          <p className="fro-lead" style={{ maxWidth: 760, marginBottom: '3rem' }}>{programa.notaExtendida}</p>
        </FadeIn>

        <FadeIn delay={0.1}><div className="fro-eyebrow" style={{ marginBottom: '1.4rem' }}>Ficha técnica</div></FadeIn>

        <div className="ficha-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
          <FadeIn delay={0.14}>
            <h3 className="fro-h3" style={{ marginBottom: '0.5rem', fontSize: '1rem' }}>Dirigido a</h3>
            <p className="fro-body">{programa.dirigidoA}</p>
            {programa.dirigidoAItems && (
              <ul className="fro-feat" style={{ marginTop: '0.7rem' }}>
                {programa.dirigidoAItems.map(t => <li key={t}>{t}</li>)}
              </ul>
            )}
          </FadeIn>
          <FadeIn delay={0.18}>
            <h3 className="fro-h3" style={{ marginBottom: '0.5rem', fontSize: '1rem' }}>Objetivo</h3>
            <p className="fro-body">{programa.objetivo}</p>
          </FadeIn>
        </div>

        <FadeIn delay={0.22}>
          <h3 className="fro-h3" style={{ marginBottom: '0.5rem', fontSize: '1rem' }}>Formato</h3>
          <p className="fro-body" style={{ marginBottom: '2rem' }}>1 mes · 4 sesiones sincrónicas de 1.5h vía Meet/Zoom · alta intensidad, enfoque aplicado.</p>
        </FadeIn>

        <FadeIn delay={0.26}>
          <h3 className="fro-h3" style={{ marginBottom: '0.8rem', fontSize: '1rem' }}>Temas clave</h3>
          <ul className="fro-feat" style={{ marginBottom: '2rem' }}>
            {programa.temasClave.map(t => <li key={t}>{t}</li>)}
          </ul>
        </FadeIn>

        <FadeIn delay={0.3}>
          <h3 className="fro-h3" style={{ marginBottom: '0.5rem', fontSize: '1rem' }}>Outcome</h3>
          <p className="fro-body">{programa.outcome}</p>
        </FadeIn>
      </div>
      <style>{`@media(max-width: 720px){ .ficha-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  )
}
