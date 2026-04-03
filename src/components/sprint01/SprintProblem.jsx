import FadeIn from '../FadeIn.jsx'

export default function SprintProblem() {
  return (
    <section style={{ background: 'var(--dark)', position: 'relative', overflow: 'hidden' }}>
      <div className="wrap sec" style={{ position: 'relative' }}>
        <FadeIn>
          <div className="label lime">El problema</div>
        </FadeIn>

        <FadeIn delay={0.08}>
          <h2 style={{ fontFamily: 'var(--fout)', fontWeight: 300, fontSize: 'clamp(1.8rem,3vw,3rem)', color: 'var(--white)', lineHeight: 1.15, marginBottom: '1.4rem', maxWidth: 680 }}>
            La mayoría de cursos de biotech tienen un mismo defecto
          </h2>
        </FadeIn>

        <FadeIn delay={0.14}>
          <p style={{ fontSize: '0.95rem', color: 'var(--t-white2)', maxWidth: 680, lineHeight: 1.75, marginBottom: '2rem' }}>
            La mayoría de los cursos disponibles en habla hispana tienen un mismo defecto: te enseñan temas en paralelo, sin conexión causal entre ellos. Aprendes sobre el mercado global, luego sobre casos regionales, luego sobre modelos de negocio — pero nunca queda claro cómo se conecta todo.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div style={{ background: 'rgba(243,39,105,0.12)', borderLeft: '4px solid var(--rose)', borderRadius: 12, padding: '1.2rem 1.5rem', maxWidth: 680, marginBottom: '2rem' }}>
            <p style={{ fontFamily: 'var(--fout)', fontWeight: 600, fontSize: '1.1rem', color: 'var(--white)', margin: 0, lineHeight: 1.5 }}>
              El resultado: mucho conocimiento, poca acción.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.26}>
          <p style={{ fontSize: '0.95rem', maxWidth: 680, lineHeight: 1.75, margin: 0 }}>
            <span style={{ color: 'var(--t-white2)' }}>El Biotech Sprint 01 está diseñado como </span>
            <span style={{ color: 'var(--lime)', fontWeight: 600 }}>un camino, no como una lista de temas.</span>
          </p>
        </FadeIn>
      </div>

      {/* Bottom wave to cream */}
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ width: '100%', height: 60, display: 'block' }}>
        <path d="M0,30 C360,0 1080,60 1440,30 L1440,60 L0,60 Z" fill="var(--cream)" />
      </svg>
    </section>
  )
}
