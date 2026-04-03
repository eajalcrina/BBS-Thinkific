import FadeIn from '../FadeIn.jsx'

const profiles = [
  {
    icon: '🧬',
    label: 'El Estudiante STEM',
    desc: 'Biotecnología, Biología, Ingeniería Química, Farmacia. Sabes hacer ciencia pero no sabes cómo convertirla en algo que el mercado quiera pagar.',
    quote: 'Por fin, el mapa del biotech que tu carrera nunca te enseñó.',
  },
  {
    icon: '🔄',
    label: 'El Profesional que pivotea',
    desc: '2–5 años en industrias tradicionales — agro, pesca, pharma, banca. El sector está cambiando y quieres estar del lado correcto.',
    quote: 'Entiende el sector que va a redefinir tu industria, antes de que lo haga sin ti.',
  },
  {
    icon: '🚀',
    label: 'El Emprendedor en etapa cero',
    desc: 'Tienes una idea de biotech. Necesitas saber si es viable, cómo estructurarla y — sobre todo — cómo financiarla.',
    quote: '4 semanas para saber si tu biotech tiene chances reales — y un roadmap para financiarlo.',
  },
  {
    icon: '🧠',
    label: 'El Curioso estratégico',
    desc: 'Economía, Administración, Derecho, Comunicación. Todo el mundo habla de biotech pero nadie lo explica en términos que puedas usar.',
    quote: 'Deja de escuchar hablar de biotech. Empieza a entenderlo tú mismo.',
  },
]

export default function SprintParaQuien() {
  return (
    <section
      className="sec"
      id="paraquien"
      style={{ background: 'var(--white)', position: 'relative', overflow: 'hidden' }}
    >
      <style>{`
        .pq-grid{display:grid;grid-template-columns:1fr 1fr;gap:1.2rem}
        @media(max-width:760px){.pq-grid{grid-template-columns:1fr}}
      `}</style>

      <div className="wrap">
        <FadeIn>
          <p style={{
            fontFamily: 'var(--fdm)',
            fontSize: '1rem',
            color: 'var(--t-dark2)',
            lineHeight: 1.7,
            textAlign: 'center',
            fontWeight: 300,
            maxWidth: 600,
            margin: '0 auto 1.2rem',
          }}>
            No necesitas ser biólogo. No necesitas tener una empresa. Necesitas querer construir algo con la biotecnología.
          </p>

          <h2 className="t-md" style={{
            fontFamily: 'var(--fout)',
            fontWeight: 300,
            color: 'var(--dark)',
            textAlign: 'center',
            marginBottom: '2rem',
          }}>
            ¿Para quién es este programa?
          </h2>
        </FadeIn>

        <div className="pq-grid">
          {profiles.map((p, i) => (
            <FadeIn key={i} delay={0.1 + i * 0.1}>
              <div style={{
                background: 'var(--cream)',
                borderRadius: 16,
                padding: '1.6rem',
              }}>
                <div style={{ fontSize: '1.8rem', marginBottom: '0.6rem' }}>{p.icon}</div>

                <p style={{
                  fontFamily: 'var(--fbc)',
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  color: 'var(--rose)',
                  marginBottom: '0.6rem',
                }}>
                  {p.label}
                </p>

                <p style={{
                  fontFamily: 'var(--fdm)',
                  fontSize: '0.86rem',
                  color: 'var(--t-dark2)',
                  lineHeight: 1.6,
                  marginBottom: '1rem',
                }}>
                  {p.desc}
                </p>

                <p style={{
                  fontFamily: 'var(--fdm)',
                  fontSize: '0.84rem',
                  fontStyle: 'italic',
                  color: 'var(--dark)',
                  borderLeft: '3px solid var(--rose)',
                  paddingLeft: '0.8rem',
                  lineHeight: 1.5,
                  margin: 0,
                }}>
                  {p.quote}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: -1, left: 0, right: 0 }}>
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ width: '100%', height: 60, display: 'block' }}>
          <path d="M0,30 C360,0 1080,60 1440,30 L1440,60 L0,60 Z" fill="var(--rose)" />
        </svg>
      </div>
    </section>
  )
}
