import FadeIn from '../FadeIn.jsx'

const checklist = [
  '4 sesiones en vivo de 90 min',
  '30+ horas de contenido',
  'Biotech Business Starter Kit',
  'Certificado BBS × 404 Tech Found',
  'Membresía Starter incluida',
]

const schedule = [
  { label: '4 módulos asincrónicos', value: '24h' },
  { label: '4 sesiones en vivo', value: '6h' },
  { label: 'Bienvenida + Evaluación', value: '45 min' },
  { label: 'Total', value: '30+ horas' },
]

export default function SprintPricing() {
  return (
    <section
      id="precios"
      className="sec"
      style={{
        background: 'var(--rose)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative circles */}
      <div style={{
        position: 'absolute', top: '-120px', right: '-80px',
        width: 320, height: 320, borderRadius: '50%',
        background: 'rgba(255,255,255,0.06)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '60px', left: '-60px',
        width: 220, height: 220, borderRadius: '50%',
        background: 'rgba(193,244,0,0.08)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: '40%', right: '15%',
        width: 140, height: 140, borderRadius: '50%',
        background: 'rgba(255,255,255,0.04)', pointerEvents: 'none',
      }} />

      <div className="wrap" style={{ textAlign: 'center' }}>
        <FadeIn>
          {/* Label */}
          <div style={{
            fontFamily: 'var(--fbc)', fontSize: '0.68rem', fontWeight: 600,
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.8)', display: 'inline-flex',
            alignItems: 'center', gap: '0.55rem', marginBottom: '1.2rem',
          }}>
            <span style={{ width: 18, height: 1.5, background: 'rgba(255,255,255,0.8)', display: 'block' }} />
            Precios de lanzamiento · Q2 2026
          </div>

          {/* Title */}
          <h2 style={{
            fontFamily: 'var(--fout)', fontWeight: 300,
            fontSize: 'clamp(1.8rem,3vw,3rem)', color: 'var(--white)',
            marginBottom: '0.8rem',
          }}>
            Invierte en tu primer biotech
          </h2>

          {/* Subtitle */}
          <p style={{
            fontSize: '0.95rem', color: 'rgba(255,255,255,0.75)',
            maxWidth: 480, margin: '0 auto',
          }}>
            La primera cohorte define el estándar. Los cupos son limitados.
          </p>
        </FadeIn>

        {/* Pricing Card */}
        <FadeIn>
          <div style={{
            maxWidth: 400, margin: '2.5rem auto 0',
            background: 'var(--white)', borderRadius: 20,
            overflow: 'hidden',
            boxShadow: '0 24px 64px rgba(14,14,14,0.25)',
            textAlign: 'left',
          }}>
            {/* Lime top bar */}
            <div style={{
              background: 'var(--lime)', padding: '0.7rem 1.4rem',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <span style={{
                fontFamily: 'var(--fbc)', fontSize: '0.7rem', fontWeight: 700,
                textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--dark)',
              }}>Precios de lanzamiento</span>
              <span style={{
                fontFamily: 'var(--fbc)', fontSize: '0.7rem', fontWeight: 600,
                color: 'var(--dark)', opacity: 0.6,
              }}>Q2 2026</span>
            </div>

            {/* Price tiers */}
            <div style={{ padding: '1.5rem' }}>
              <div style={{
                border: '1px solid rgba(14,14,14,0.08)', borderRadius: 12,
                overflow: 'hidden', marginBottom: '1.4rem',
              }}>
                {/* Tier 1 - Regular (informational) */}
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '0.9rem 1rem', background: 'var(--cream)',
                  borderBottom: '1px solid rgba(14,14,14,0.06)',
                }}>
                  <span style={{
                    fontFamily: 'var(--fbc)', fontSize: '0.65rem',
                    textTransform: 'uppercase', color: 'var(--t-dark3)',
                  }}>Precio regular</span>
                  <span style={{
                    fontFamily: 'var(--fbc)', fontSize: '1rem', fontWeight: 600,
                    color: 'var(--t-dark3)', textDecoration: 'line-through',
                  }}>$55</span>
                </div>

                {/* Tier 2 - Early Bird (active) */}
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '1rem', background: 'rgba(193,244,0,0.08)',
                  borderBottom: '1px solid rgba(14,14,14,0.06)',
                }}>
                  <div>
                    <div style={{
                      fontFamily: 'var(--fbc)', fontSize: '0.68rem', fontWeight: 700,
                      textTransform: 'uppercase', color: 'var(--rose)',
                    }}>Early Bird</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--t-dark3)' }}>
                      Primeros 100 inscritos o 72h
                    </div>
                  </div>
                  <span style={{
                    fontFamily: 'var(--fbc)', fontSize: '2.8rem', fontWeight: 800,
                    color: 'var(--dark)',
                  }}>$40</span>
                </div>

                {/* Tier 3 - Community (informational, no price shown) */}
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '0.9rem 1rem',
                }}>
                  <div>
                    <div style={{
                      fontFamily: 'var(--fbc)', fontSize: '0.65rem',
                      textTransform: 'uppercase', color: 'var(--t-dark3)',
                    }}>Comunidad 404 & Starter</div>
                    <div style={{
                      fontSize: '0.68rem', color: 'var(--t-dark3)', fontStyle: 'italic',
                    }}>Miembros acceden a precio especial</div>
                  </div>
                  <span style={{
                    fontFamily: 'var(--fbc)', fontSize: '0.78rem', fontWeight: 600,
                    color: 'var(--rose)',
                  }}>Precio especial</span>
                </div>
              </div>

              {/* Checklist */}
              <ul style={{
                listStyle: 'none', display: 'flex', flexDirection: 'column',
                gap: '0.4rem', padding: 0, margin: '0 0 1.2rem',
              }}>
                {checklist.map((item, i) => (
                  <li key={i} style={{
                    fontSize: '0.8rem', color: 'var(--t-dark2)',
                    display: 'flex', gap: '0.45rem',
                  }}>
                    <span style={{ color: 'var(--rose)', flexShrink: 0 }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="https://mpago.la/1v59m8j"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-dark btn-full btn-lg"
                style={{ marginBottom: '0.5rem' }}
              >
                Inscribirme — Early Bird $40 →
              </a>

              {/* Note */}
              <p style={{
                textAlign: 'center', fontSize: '0.72rem', color: 'var(--t-dark3)',
                margin: 0,
              }}>
                ⚡ Vacantes limitadas por lanzamiento · Primera cohorte Q2 2026
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Schedule table */}
        <FadeIn>
          <div style={{ marginTop: '2.5rem', color: 'white', textAlign: 'center' }}>
            <div style={{
              fontFamily: 'var(--fbc)', fontSize: '0.75rem', textTransform: 'uppercase',
              letterSpacing: '0.1em', color: 'rgba(255,255,255,0.6)', marginBottom: '0.8rem',
            }}>Carga horaria</div>

            <div style={{
              display: 'flex', flexDirection: 'column', maxWidth: 320, margin: '0 auto',
            }}>
              {schedule.map((row, i) => {
                const isLast = i === schedule.length - 1
                return (
                  <div key={i} style={{
                    display: 'flex', justifyContent: 'space-between',
                    padding: '0.3rem 0', fontSize: '0.82rem',
                    color: isLast ? 'var(--lime)' : 'rgba(255,255,255,0.7)',
                    fontWeight: isLast ? 600 : 400,
                    borderBottom: isLast ? 'none' : '1px solid rgba(255,255,255,0.1)',
                  }}>
                    <span>{row.label}</span>
                    <span>{row.value}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Bottom wave to dark */}
      <div style={{ position: 'absolute', bottom: -1, left: 0, right: 0 }}>
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ width: '100%', height: 60, display: 'block' }}>
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="var(--dark)" />
        </svg>
      </div>
    </section>
  )
}
