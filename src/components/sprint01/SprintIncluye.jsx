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
  { emoji:'🎯', text:'$40 de descuento directo en el Bootcamp 101 — lo que pagas en el Sprint se descuenta del siguiente nivel' },
  { emoji:'🎙️', text:'Sesión privada de Q&A post-Sesión 04 — 30 minutos adicionales con Eddie, Lorenzo y expertos' },
  { emoji:'🏅', text:'Badge "Biotech Sprint Founder" — insignia digital de primera cohorte, compartible en LinkedIn' },
]

export default function SprintIncluye() {
  return (
    <section
      id="incluye"
      className="fro-sec"
      style={{ background:'var(--fro-bg-2)', borderTop:'1px solid var(--fro-line)', borderBottom:'1px solid var(--fro-line)' }}
    >
      <div className="fro-wrap">
        <FadeIn><div className="fro-eyebrow" style={{ marginBottom:'1.2rem' }}>Todo lo que incluye</div></FadeIn>

        <FadeIn delay={0.06}>
          <h2 className="fro-h2" style={{ maxWidth:'16em', marginBottom:'2.2rem' }}>
            Tu inscripción incluye mucho más{' '}
            <span className="fro-italic-amber">que un curso</span>
          </h2>
        </FadeIn>

        <style>{`
          .incluye-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; align-items: start; }
          @media (max-width: 860px) { .incluye-grid { grid-template-columns: 1fr; } }
        `}</style>

        <div className="incluye-grid">
          {/* Left: for all */}
          <FadeIn delay={0.1}>
            <div className="fro-card" style={{ padding:0, overflow:'hidden' }}>
              <div style={{ padding:'0.9rem 1.2rem', borderBottom:'1px solid var(--fro-line)', display:'flex', alignItems:'center', gap:'0.55rem' }}>
                <span aria-hidden style={{ width:10, height:10, borderRadius:'50%', background:'var(--fro-text-3)' }}/>
                <span style={{ fontFamily:'var(--finter)', fontSize:'0.68rem', fontWeight:700, letterSpacing:'0.16em', textTransform:'uppercase', color:'var(--fro-text-2)' }}>
                  Para todos los participantes
                </span>
              </div>
              <ul style={{ listStyle:'none', padding:'0.8rem 1.2rem' }}>
                {checkItems.map((item, i, a) => (
                  <li key={i} style={{ padding:'0.55rem 0', borderBottom: i<a.length-1 ? '1px solid var(--fro-line)' : 'none', display:'flex', gap:'0.6rem', alignItems:'flex-start', fontSize:'0.88rem', color:'var(--fro-text-2)', lineHeight:1.55 }}>
                    <span aria-hidden style={{ color:'var(--fro-amber)', fontWeight:700, flexShrink:0 }}>✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          {/* Right: early bird */}
          <FadeIn delay={0.18}>
            <div className="fro-card" style={{ padding:0, overflow:'hidden', borderColor:'var(--fro-amber-25)' }}>
              <div style={{ padding:'0.9rem 1.2rem', borderBottom:'1px solid var(--fro-amber-25)', background:'var(--fro-amber-08)', display:'flex', alignItems:'center', gap:'0.55rem' }}>
                <span aria-hidden style={{ width:10, height:10, borderRadius:'50%', background:'var(--fro-amber)' }}/>
                <span style={{ fontFamily:'var(--finter)', fontSize:'0.68rem', fontWeight:700, letterSpacing:'0.16em', textTransform:'uppercase', color:'var(--fro-amber)' }}>
                  Solo Early Bird ⚡
                </span>
              </div>
              <ul style={{ listStyle:'none', padding:'0.4rem 1.2rem 1rem' }}>
                {earlyBirdItems.map((item, i) => (
                  <li key={i} style={{ padding:'0.65rem 0', fontSize:'0.88rem', color:'var(--fro-text-2)', lineHeight:1.55, display:'flex', gap:'0.6rem', alignItems:'flex-start' }}>
                    <span aria-hidden style={{ fontSize:'1rem', flexShrink:0 }}>{item.emoji}</span>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="fro-sm" style={{ marginTop:'1rem', padding:'0.8rem 1rem', borderRadius:8, background:'rgba(255,255,255,0.03)', border:'1px solid var(--fro-line)' }}>
              Comunidad 404 Tech Found y Biobuilders Starter: acceso a precio especial exclusivo para miembros.
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={0.3}>
          <div style={{ textAlign:'center', marginTop:'2.5rem' }}>
            <a
              href="#precios"
              className="fro-btn fro-btn-amber fro-btn-lg"
              onClick={e => { e.preventDefault(); document.querySelector('#precios')?.scrollIntoView({ behavior:'smooth' }) }}
            >
              Inscribirme ahora <span aria-hidden>→</span>
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
