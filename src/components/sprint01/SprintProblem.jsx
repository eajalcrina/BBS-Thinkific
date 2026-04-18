import FadeIn from '../FadeIn.jsx'

export default function SprintProblem() {
  return (
    <section
      id="problema-sprint"
      className="fro-sec"
      style={{ background:'var(--fro-bg-2)', borderTop:'1px solid var(--fro-line)', borderBottom:'1px solid var(--fro-line)' }}
    >
      <div className="fro-wrap">
        <FadeIn><div className="fro-eyebrow" style={{ marginBottom:'1.2rem' }}>El problema</div></FadeIn>

        <FadeIn delay={0.08}>
          <h2 className="fro-h2" style={{ maxWidth:'14em', marginBottom:'1.6rem' }}>
            La mayoría de cursos de biotech tienen{' '}
            <span className="fro-italic-amber">un mismo defecto</span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.14}>
          <p className="fro-lead" style={{ maxWidth:680, marginBottom:'2rem' }}>
            La mayoría de los cursos disponibles en habla hispana tienen un mismo defecto: te enseñan temas en paralelo, sin conexión causal entre ellos. Aprendes sobre el mercado global, luego sobre casos regionales, luego sobre modelos de negocio — pero nunca queda claro cómo se conecta todo.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div
            className="fro-card"
            style={{
              borderLeft:'3px solid var(--fro-amber)',
              padding:'1.2rem 1.5rem',
              maxWidth:680,
              marginBottom:'2rem',
              background:'var(--fro-amber-08)',
              borderColor:'var(--fro-amber-25)',
            }}
          >
            <p style={{ fontFamily:'var(--fsyne)', fontWeight:600, fontSize:'1.1rem', color:'var(--fro-text)', margin:0, lineHeight:1.5 }}>
              El resultado: mucho conocimiento, poca acción.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.26}>
          <p className="fro-body" style={{ maxWidth:680, margin:0 }}>
            El Biotech Sprint 01 está diseñado como{' '}
            <span className="fro-italic-amber">un camino, no como una lista de temas.</span>
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
