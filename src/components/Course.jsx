import FadeIn from './FadeIn.jsx'

const features = [
  '8 semanas de aprendizaje dual: DeepTech aplicado + Business Design',
  'Co-diseñado con 404 Tech Found — validación técnica y científica',
  'Masterclasses con expertos regionales en biotecnología e inversión',
  'Proyecto de bionegocio real: construyes mientras aprendes',
  'Membresía Starter Biobuilders incluida durante el curso',
  'Red de pares y contactos en América Latina',
]

const included = [
  '8 módulos especializados en video',
  'Sesiones en vivo con mentores',
  'Plantillas y frameworks propietarios BBS',
  'Certificado BBS + 404 Tech Found',
  'Membresía Starter Biobuilders incluida',
]

export default function Course() {
  return (
    <section id="curso" className="section" style={{ position: 'relative' }}>
      {/* subtle rose ambient */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(243,39,105,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div className="wrap">
        <FadeIn>
          <div className="eyebrow rose" style={{ marginBottom: '0.6rem' }}>Curso especializado · Oferta de lanzamiento</div>
        </FadeIn>
        <FadeIn delay={0.08}>
          <p className="body" style={{ maxWidth: 520, marginBottom: '2rem', color: 'var(--text-mid)' }}>
            El primer paso concreto para convertirte en BioBuilder. Ocho semanas que integran ciencia de frontera y diseño de bionegocios rentables.
          </p>
        </FadeIn>

        <FadeIn delay={0.12}>
          <div style={{ background: 'var(--bg2)', border: '1px solid rgba(243,39,105,0.25)', borderRadius: 8, overflow: 'hidden', position: 'relative' }}>
            {/* rose top accent line */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'var(--rose)' }} />

            {/* top bar */}
            <div style={{ background: 'rgba(243,39,105,0.06)', borderBottom: '1px solid rgba(243,39,105,0.14)', padding: '0.9rem 2.2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.6rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                <span className="tag tag-rose">⚡ Lanzamiento 2026</span>
                <span style={{ fontFamily: 'var(--fd)', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--rose)' }}>
                  Curso especializado · 8 semanas · Online
                </span>
              </div>
              <span style={{ fontFamily: 'var(--fd)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--text-lo)' }}>
                Co-creado con <span style={{ color: 'var(--text-mid)' }}>404 Tech Found</span>
              </span>
            </div>

            {/* body */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 0 }} className="course-body">
              <div style={{ padding: '2.5rem 2.2rem', borderRight: '1px solid var(--line)' }}>
                <h2 style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: 'clamp(2.4rem, 5vw, 4rem)', lineHeight: 0.9, color: '#fff', marginBottom: '0.35rem' }}>
                  BIOTECH<br /><em style={{ fontStyle: 'normal', color: 'var(--rose)' }}>SPRINT 01</em>
                </h2>
                <p style={{ fontFamily: 'var(--fd)', fontSize: '0.9rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-lo)', marginBottom: '1.5rem' }}>
                  Del laboratorio al mercado
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginBottom: '1.6rem' }}>
                  {['DeepTech', 'Business Design', 'Bioeconomía', '8 semanas', 'Online'].map(p => (
                    <span key={p} style={{ background: 'rgba(243,39,105,0.08)', border: '1px solid rgba(243,39,105,0.18)', padding: '0.22rem 0.65rem', borderRadius: 2, fontFamily: 'var(--fd)', fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'rgba(243,39,105,0.85)' }}>{p}</span>
                  ))}
                </div>

                <p className="body" style={{ marginBottom: '1.4rem', maxWidth: 480 }}>
                  Aprende a convertir conocimiento biotecnológico en modelos de negocio técnica y financieramente viables. Diseñado para científicos, emprendedores y profesionales que quieren liderar la próxima generación de bionegocios en LATAM.
                </p>

                <ul className="feat-list rose">
                  {features.map(f => (
                    <li key={f} style={{ color: 'var(--text-mid)' }}>
                      <span style={{ color: 'var(--rose)', fontWeight: 700, flexShrink: 0 }}>→</span>{f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* pricing sidebar */}
              <div style={{ padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', background: 'rgba(243,39,105,0.03)' }}>
                {/* price stack */}
                <div style={{ background: 'var(--bg3)', border: '1px solid rgba(243,39,105,0.18)', borderRadius: 6, overflow: 'hidden', marginBottom: '1.4rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.85rem 1.1rem', borderBottom: '1px solid var(--line)' }}>
                    <div style={{ fontFamily: 'var(--fd)', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-lo)' }}>Precio regular</div>
                    <div style={{ fontFamily: 'var(--fd)', fontSize: '1rem', fontWeight: 600, color: 'var(--text-lo)', textDecoration: 'line-through' }}>$55</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.1rem', borderBottom: '1px solid var(--line)', background: 'rgba(243,39,105,0.07)' }}>
                    <div>
                      <div style={{ fontFamily: 'var(--fd)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--rose)' }}>Early Bird</div>
                      <div style={{ fontSize: '0.68rem', color: 'var(--text-lo)', marginTop: '0.12rem' }}>Precio especial de lanzamiento</div>
                    </div>
                    <div style={{ fontFamily: 'var(--fd)', fontSize: '2.6rem', fontWeight: 700, color: 'var(--rose)', lineHeight: 1 }}>$40</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.85rem 1.1rem' }}>
                    <div>
                      <div style={{ fontFamily: 'var(--fd)', fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-lo)' }}>Comunidad 404 & Starter</div>
                      <div style={{ fontSize: '0.68rem', color: 'var(--text-lo)', marginTop: '0.1rem' }}>Miembros 404 Tech Found y Biobuilders Starter</div>
                    </div>
                    <div style={{ fontFamily: 'var(--fd)', fontSize: '1.6rem', fontWeight: 700, color: 'rgba(243,39,105,0.75)', lineHeight: 1 }}>$35</div>
                  </div>
                </div>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.42rem', marginBottom: '1.5rem' }}>
                  {included.map(inc => (
                    <li key={inc} style={{ fontSize: '0.8rem', color: 'var(--text-mid)', display: 'flex', alignItems: 'flex-start', gap: '0.45rem', lineHeight: 1.45 }}>
                      <span style={{ color: 'var(--rose)', fontWeight: 700, flexShrink: 0 }}>✓</span>{inc}
                    </li>
                  ))}
                </ul>

                <a href="#" className="btn btn-rose btn-full btn-lg" style={{ marginBottom: '0.6rem' }}>
                  Inscribirme al Sprint 01 →
                </a>
                <p style={{ textAlign: 'center', fontSize: '0.73rem', color: 'var(--text-lo)' }}>
                  Cupos limitados · Primera cohorte Q2 2026
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>

      <style>{`
        @media (max-width: 860px) { .course-body { grid-template-columns: 1fr !important; } .course-body > div:first-child { border-right: none !important; border-bottom: 1px solid var(--line); } }
      `}</style>
    </section>
  )
}
