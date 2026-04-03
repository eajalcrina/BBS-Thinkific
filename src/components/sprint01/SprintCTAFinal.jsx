import FadeIn from '../FadeIn.jsx'

const checklistItems = [
  'Ciencia de frontera explicada para fundadores',
  'Casos reales latinoamericanos con fundadores en vivo',
  'Diseño de modelo de negocio con feedback en tiempo real',
  'Fundraising con acceso a 30+ fondos activos en LATAM',
  'Un entregable integrador: tu Biotech Business Starter Kit',
]

export default function SprintCTAFinal() {
  return (
    <section
      className="sec"
      style={{
        background: 'var(--rose)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative circle */}
      <div style={{
        position: 'absolute', top: '20%', left: '-60px',
        width: 260, height: 260, borderRadius: '50%',
        background: 'rgba(193,244,0,0.07)', pointerEvents: 'none',
        animation: 'float-y 6s ease-in-out infinite',
      }} />
      <style>{`
        @keyframes float-y{0%,100%{transform:translateY(0)}50%{transform:translateY(-18px)}}
      `}</style>

      <div className="wrap" style={{ textAlign: 'center' }}>
        <FadeIn>
          {/* Title */}
          <h2 style={{
            fontFamily: 'var(--fout)', fontWeight: 300,
            fontSize: 'clamp(2rem,4vw,3.5rem)', color: 'var(--white)',
            marginBottom: '1rem',
          }}>
            El momento es ahora
          </h2>

          {/* Checklist */}
          <div style={{
            display: 'inline-flex', flexDirection: 'column', gap: '0.5rem',
            textAlign: 'left', marginBottom: '2rem',
          }}>
            {checklistItems.map((item, i) => (
              <div key={i} style={{
                fontSize: '0.88rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.6,
              }}>
                ✅ {item}
              </div>
            ))}
          </div>

          {/* Paragraph */}
          <p style={{
            fontSize: '0.92rem', color: 'rgba(255,255,255,0.7)',
            marginBottom: '1.5rem', maxWidth: 640, margin: '0 auto 1.5rem',
          }}>
            No existe en el mundo de habla hispana un programa que integre todo esto en menos de $55 USD.
          </p>

          {/* CTA */}
          <a
            href="https://mpago.la/1v59m8j"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-lime btn-lg"
          >
            Inscribirme al Sprint 01 →
          </a>

          {/* FOMO */}
          <p style={{
            fontFamily: 'var(--fbc)', fontSize: '0.75rem', fontWeight: 600,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            color: 'var(--lime)', marginTop: '1rem',
          }}>
            ⚡ Vacantes limitadas por lanzamiento — Primera cohorte
          </p>

          {/* Contact */}
          <p style={{
            fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', marginTop: '1.5rem',
          }}>
            ¿Preguntas? Escríbenos a{' '}
            <a href="mailto:bbs@redesignlab.org" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'underline' }}>
              bbs@redesignlab.org
            </a>
          </p>

          {/* Hashtags */}
          <p style={{
            fontFamily: 'var(--fbc)', fontSize: '0.68rem',
            color: 'rgba(255,255,255,0.35)', letterSpacing: '0.06em',
            marginTop: '0.8rem',
          }}>
            #BiotechSprint01 · #CienciaQueConstruye · #BBS404
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
