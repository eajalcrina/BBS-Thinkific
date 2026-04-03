import FadeIn from '../FadeIn.jsx'

export default function SprintHero() {
  const smoothScroll = (selector) => (e) => {
    e.preventDefault()
    document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section style={{ background: 'var(--rose)', position: 'relative', overflow: 'hidden' }}>
      <style>{`@media(max-width:860px){.sprint-hero-grid{grid-template-columns:1fr!important}}`}</style>

      {/* Decorative circles */}
      <div style={{ position: 'absolute', top: '-18%', right: '-6%', width: 480, height: 480, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-14%', left: '-7%', width: 380, height: 380, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '16%', right: '11%', width: 110, height: 110, borderRadius: '50%', background: 'var(--lime)', opacity: 0.15, pointerEvents: 'none' }} className="float-y" />

      <div className="wrap sec" style={{ position: 'relative' }}>
        {/* Top row: label + co-branding */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <FadeIn><div className="label white">Curso especializado · Primera cohorte · 2026</div></FadeIn>
          <FadeIn delay={0.1}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <img src="/logo-red.png" alt="BBS" style={{ height: 19, width: 'auto', filter: 'brightness(0) invert(1)', opacity: 0.9 }} />
              <span style={{ fontFamily: 'var(--fbc)', fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.72)' }}>× 404 Tech Found</span>
            </div>
          </FadeIn>
        </div>

        {/* Grid */}
        <div className="sprint-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '3rem', alignItems: 'start' }}>
          {/* Left column */}
          <div>
            <FadeIn>
              <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '1.4rem', flexWrap: 'wrap' }}>
                <span className="badge badge-lime">⚡ Early Bird</span>
                <span className="badge badge-white">4 semanas · Online</span>
                <span className="badge badge-white">DeepTech + Business</span>
              </div>
            </FadeIn>

            <FadeIn delay={0.08}>
              <h1 style={{ fontFamily: 'var(--fout)', fontWeight: 300, fontSize: 'clamp(2.8rem,6vw,5.5rem)', lineHeight: 0.9, color: 'var(--white)', marginBottom: '0.35rem', letterSpacing: '-0.02em' }}>
                BIOTECH<br /><strong style={{ fontWeight: 800, color: 'var(--lime)' }}>SPRINT 01</strong>
              </h1>
            </FadeIn>

            <FadeIn delay={0.12}>
              <p style={{ fontFamily: 'var(--fbc)', fontSize: '0.88rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', marginBottom: '1.4rem' }}>
                Del Problema a la Inversión: Construye tu Biotech en 4 Pasos
              </p>
            </FadeIn>

            <FadeIn delay={0.16}>
              <p style={{ fontFamily: 'var(--fdm)', fontStyle: 'italic', fontSize: '1.02rem', color: 'rgba(255,255,255,0.85)', marginBottom: '1.2rem', lineHeight: 1.7 }}>
                "Cuatro semanas. Cuatro pasos. Una biotech con chances reales."
              </p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p style={{ fontSize: '0.92rem', color: 'rgba(255,255,255,0.78)', lineHeight: 1.75, marginBottom: '2rem', maxWidth: 520, fontWeight: 300 }}>
                Ya sabes que el biotech es el futuro. Ahora necesitas saber qué hacer con eso. El Biotech Sprint 01 te acompaña a construir el esqueleto de tu propio biotech en 4 semanas. No sales con conocimiento. Sales con un documento.
              </p>
            </FadeIn>

            <FadeIn delay={0.24}>
              <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                <a href="#precios" className="btn btn-lime btn-lg" onClick={smoothScroll('#precios')}>
                  Inscribirme al Sprint 01 →
                </a>
                <a href="#incluye" className="btn btn-outline-white" onClick={smoothScroll('#incluye')}>
                  Ver qué incluye
                </a>
              </div>
            </FadeIn>
          </div>

          {/* Right column: stats card */}
          <FadeIn delay={0.18} y={36}>
            <div style={{ background: 'var(--white)', borderRadius: 20, boxShadow: '0 24px 64px rgba(14,14,14,0.25)', overflow: 'hidden' }}>
              {/* Lime bar */}
              <div style={{ background: 'var(--lime)', padding: '0.6rem 1.2rem' }}>
                <span style={{ fontFamily: 'var(--fbc)', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--dark)' }}>Sprint 01 · Resumen</span>
              </div>

              {/* Stat rows */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.9rem 1.2rem' }}>
                <span style={{ fontFamily: 'var(--fbc)', fontSize: '0.62rem', textTransform: 'uppercase', color: 'var(--t-dark3)', letterSpacing: '0.08em', fontWeight: 600 }}>Early Bird</span>
                <span style={{ fontFamily: 'var(--fbc)', fontSize: '2.4rem', fontWeight: 800, color: 'var(--dark)', lineHeight: 1 }}>$40 USD</span>
              </div>
              <div style={{ height: 1, background: 'rgba(14,14,14,0.08)', margin: '0 1.2rem' }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.9rem 1.2rem' }}>
                <span style={{ fontFamily: 'var(--fbc)', fontSize: '0.62rem', textTransform: 'uppercase', color: 'var(--t-dark3)', letterSpacing: '0.08em', fontWeight: 600 }}>Duración</span>
                <span style={{ fontFamily: 'var(--fbc)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--dark)', lineHeight: 1 }}>30+ horas</span>
              </div>
              <div style={{ height: 1, background: 'rgba(14,14,14,0.08)', margin: '0 1.2rem' }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.9rem 1.2rem' }}>
                <span style={{ fontFamily: 'var(--fbc)', fontSize: '0.62rem', textTransform: 'uppercase', color: 'var(--t-dark3)', letterSpacing: '0.08em', fontWeight: 600 }}>Entregable</span>
                <span style={{ fontFamily: 'var(--fbc)', fontSize: '1rem', fontWeight: 600, color: 'var(--rose)', lineHeight: 1 }}>Starter Kit</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Bottom wave to dark */}
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ width: '100%', height: 60, display: 'block' }}>
        <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="var(--dark)" />
      </svg>
    </section>
  )
}
