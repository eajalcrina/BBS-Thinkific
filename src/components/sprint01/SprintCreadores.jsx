import FadeIn from '../FadeIn.jsx'

const cards = [
  {
    logo: <img src="/logo-red.png" alt="BBS" style={{ height: 22, filter: 'brightness(0) invert(1)', opacity: 0.8 }} />,
    title: 'Bio Business School',
    description: 'Plataforma de inteligencia estratégica para bionegocios rentables en América Latina, liderada por Eddie Ajalcriña (CEO) y Lorenzo Ortiz (CIO) — emprendedores e inversionistas con experiencia real en la Amazonía y ecosistemas críticos de la región.',
  },
  {
    logo: <span style={{ fontFamily: 'var(--fbc)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--lime)' }}>404</span>,
    title: '404 Tech Found',
    description: 'Asociación peruana líder en promoción de tecnologías profundas, con una comunidad activa de jóvenes científicos, tecnólogos e investigadores de frontera. Aporta el rigor técnico y la validación científica que diferencia este programa.',
  },
]

export default function SprintCreadores() {
  return (
    <section
      id="creadores"
      className="sec"
      style={{ background: 'var(--dark)', position: 'relative' }}
    >
      <div className="wrap">
        <FadeIn>
          {/* Label */}
          <div style={{
            fontFamily: 'var(--fbc)', fontSize: '0.68rem', fontWeight: 600,
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'var(--lime)', display: 'inline-flex',
            alignItems: 'center', gap: '0.55rem', marginBottom: '1.2rem',
          }}>
            <span style={{ width: 18, height: 1.5, background: 'var(--lime)', display: 'block' }} />
            Creado por
          </div>

          {/* Title */}
          <h2 style={{
            fontFamily: 'var(--fout)', fontWeight: 300,
            fontSize: 'clamp(1.3rem,2vw,1.9rem)', color: 'var(--white)',
            marginBottom: '0.8rem',
          }}>
            Bio Business School × 404 Tech Found
          </h2>

          {/* Quote */}
          <p style={{
            fontFamily: 'var(--fdm)', fontSize: '0.95rem', fontStyle: 'italic',
            color: 'rgba(255,255,255,0.7)', marginBottom: '2rem',
          }}>
            "Juntos, construimos el programa que no existía."
          </p>
        </FadeIn>

        {/* Cards grid */}
        <style>{`
          .creadores-grid{display:grid;grid-template-columns:1fr 1fr;gap:1.5rem}
          @media(max-width:760px){.creadores-grid{grid-template-columns:1fr}}
        `}</style>

        <div className="creadores-grid">
          {cards.map((card, i) => (
            <FadeIn key={i}>
              <div style={{
                background: 'var(--dark2)', borderRadius: 16, padding: '1.6rem',
              }}>
                <div>{card.logo}</div>
                <div style={{
                  fontFamily: 'var(--fbc)', fontSize: '0.75rem', textTransform: 'uppercase',
                  fontWeight: 600, letterSpacing: '0.1em', color: 'var(--lime)',
                  margin: '0.8rem 0 0.6rem',
                }}>
                  {card.title}
                </div>
                <p style={{
                  fontSize: '0.84rem', color: 'var(--t-white2)', lineHeight: 1.65, margin: 0,
                }}>
                  {card.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Bottom wave to cream */}
      <div style={{ position: 'absolute', bottom: -1, left: 0, right: 0 }}>
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ width: '100%', height: 60, display: 'block' }}>
          <path d="M0,30 C360,0 1080,60 1440,30 L1440,60 L0,60 Z" fill="var(--cream)" />
        </svg>
      </div>
    </section>
  )
}
