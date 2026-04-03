import FadeIn from '../FadeIn.jsx'

const checkItems = [
  '4 sesiones en vivo de 90 min con especialistas',
  '30+ horas de material curado en plataforma BBS',
  'Grabaciones disponibles 30 días',
  'Certificado digital BBS × 404 Tech Found (30h)',
  'Biotech Business Starter Kit completo',
  'Bio Business Model Canvas — plantilla propietaria',
  'Simulador de Unit Economics (Google Sheets)',
  'Radar de Fondos LATAM 2026 — 30+ fondos',
  'Pitch Deck Template — 8 slides editables',
  'Extracto exclusivo del Bio Business Playbook',
]

const earlyBirdItems = [
  { emoji: '🎯', text: '$40 de descuento directo en el Bootcamp 101 — lo que pagas en el Sprint se descuenta del siguiente nivel' },
  { emoji: '🎙️', text: 'Sesión privada de Q&A post-Sesión 04 — 30 minutos adicionales con Eddie, Lorenzo y expertos' },
  { emoji: '🏅', text: 'Badge "Biotech Sprint Founder" — insignia digital de primera cohorte, compartible en LinkedIn' },
]

export default function SprintIncluye() {
  return (
    <section className="sec" id="incluye" style={{ background: 'var(--cream)' }}>
      <style>{`
        .incluye-grid{display:grid;grid-template-columns:1fr 1fr;gap:2.5rem;align-items:start}
        @media(max-width:860px){.incluye-grid{grid-template-columns:1fr}}
      `}</style>

      <div className="wrap">
        <FadeIn>
          <p className="label">Todo lo que incluye</p>
          <h2 style={{
            fontFamily: 'var(--fout)',
            fontWeight: 300,
            fontSize: 'clamp(1.8rem, 3vw, 3rem)',
            color: 'var(--dark)',
            marginBottom: '2rem',
          }}>
            Tu inscripción incluye mucho más que un curso
          </h2>
        </FadeIn>

        <div className="incluye-grid">
          {/* Left column */}
          <FadeIn delay={0.1}>
            <p style={{
              fontFamily: 'var(--fbc)',
              fontSize: '0.78rem',
              textTransform: 'uppercase',
              fontWeight: 700,
              letterSpacing: '0.1em',
              color: 'var(--dark)',
              marginBottom: '1rem',
            }}>
              Para todos los participantes
            </p>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: 0, margin: 0 }}>
              {checkItems.map((item, i) => (
                <li key={i} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', lineHeight: 1.5 }}>
                  <span style={{ color: 'var(--rose)', fontWeight: 700, flexShrink: 0 }}>✓</span>
                  <span style={{ color: 'var(--t-dark2)', fontSize: '0.86rem' }}>{item}</span>
                </li>
              ))}
            </ul>
          </FadeIn>

          {/* Right column */}
          <FadeIn delay={0.2}>
            <div style={{
              background: 'var(--white)',
              border: '2px solid var(--lime)',
              borderRadius: 16,
              padding: '1.6rem',
              boxShadow: '0 8px 24px rgba(193,244,0,0.15)',
            }}>
              <p style={{
                fontFamily: 'var(--fbc)',
                fontSize: '0.78rem',
                textTransform: 'uppercase',
                fontWeight: 700,
                color: 'var(--dark)',
                marginBottom: '1.2rem',
              }}>
                Solo Early Bird ⚡
              </p>

              {earlyBirdItems.map((item, i) => (
                <p key={i} style={{
                  fontSize: '0.86rem',
                  color: 'var(--t-dark2)',
                  lineHeight: 1.6,
                  marginBottom: '0.8rem',
                }}>
                  <span style={{ fontSize: '1.1rem' }}>{item.emoji}</span> {item.text}
                </p>
              ))}
            </div>

            <div style={{
              background: 'rgba(14,14,14,0.04)',
              borderRadius: 12,
              padding: '1rem 1.2rem',
              marginTop: '1rem',
            }}>
              <p style={{ fontSize: '0.82rem', color: 'var(--t-dark3)', margin: 0 }}>
                Comunidad 404 Tech Found y Biobuilders Starter: acceso a precio especial exclusivo para miembros
              </p>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.3}>
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <a
              href="#precios"
              className="btn btn-rose"
              onClick={e => {
                e.preventDefault()
                document.querySelector('#precios')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Inscribirme ahora →
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
