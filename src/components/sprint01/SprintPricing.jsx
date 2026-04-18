import FadeIn from '../FadeIn.jsx'

const checklist = [
  '4 sesiones en vivo de 90 min',
  '30+ horas de contenido',
  'Biotech Business Starter Kit',
  'Certificado BBS × 404 Tech Found',
  'Membresía Starter incluida',
]

const schedule = [
  { label:'4 módulos asincrónicos',  value:'24h' },
  { label:'4 sesiones en vivo',      value:'6h' },
  { label:'Bienvenida + Evaluación', value:'45 min' },
  { label:'Total',                   value:'30+ horas' },
]

export default function SprintPricing() {
  return (
    <section
      id="precios"
      className="fro-sec"
      style={{ background:'var(--fro-bg-2)', borderTop:'1px solid var(--fro-line)', borderBottom:'1px solid var(--fro-line)', position:'relative', overflow:'hidden' }}
    >
      {/* amber glow */}
      <div aria-hidden style={{
        position:'absolute', right:'-10%', top:'10%',
        width:'520px', height:'520px',
        background:'radial-gradient(circle, rgba(255,200,0,0.10), transparent 60%)',
        filter:'blur(32px)', pointerEvents:'none', zIndex:0,
      }}/>

      <div className="fro-wrap" style={{ position:'relative', zIndex:1, textAlign:'center' }}>
        <FadeIn>
          <div className="fro-eyebrow" style={{ marginBottom:'1.2rem', justifyContent:'center' }}>
            Precios de lanzamiento · Q2 2026
          </div>
        </FadeIn>

        <FadeIn delay={0.06}>
          <h2 className="fro-h2" style={{ marginBottom:'1rem' }}>
            Invierte en tu{' '}
            <span className="fro-italic-amber">primer biotech</span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className="fro-lead" style={{ maxWidth:520, margin:'0 auto 2.5rem' }}>
            La primera cohorte define el estándar. Los cupos son limitados.
          </p>
        </FadeIn>

        <FadeIn delay={0.16}>
          <div
            className="fro-card"
            style={{ maxWidth:440, margin:'0 auto', padding:0, overflow:'hidden', textAlign:'left', borderColor:'var(--fro-amber-25)' }}
          >
            {/* Header bar */}
            <div style={{ padding:'0.8rem 1.2rem', background:'var(--fro-amber)', color:'var(--fro-bg)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <span style={{ fontFamily:'var(--finter)', fontSize:'0.72rem', fontWeight:600, letterSpacing:'0.14em', textTransform:'uppercase' }}>Precios de lanzamiento</span>
              <span style={{ fontFamily:'var(--finter)', fontSize:'0.72rem', fontWeight:500 }}>Q2 2026</span>
            </div>

            <div style={{ padding:'1.4rem 1.2rem' }}>
              {/* Price tiers */}
              <div style={{ border:'1px solid var(--fro-line)', borderRadius:8, overflow:'hidden', marginBottom:'1.2rem' }}>
                {/* Regular */}
                <div style={{ padding:'0.8rem 1rem', background:'rgba(255,255,255,0.02)', borderBottom:'1px solid var(--fro-line)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <span style={{ fontFamily:'var(--finter)', fontSize:'0.68rem', fontWeight:500, letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--fro-text-3)' }}>Precio regular</span>
                  <span style={{ fontFamily:'var(--fsyne)', fontWeight:500, fontSize:'1rem', color:'var(--fro-text-3)', textDecoration:'line-through' }}>$55</span>
                </div>

                {/* Early Bird */}
                <div style={{ padding:'1rem', background:'var(--fro-amber-08)', borderBottom:'1px solid var(--fro-line)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <div>
                    <div style={{ fontFamily:'var(--finter)', fontSize:'0.7rem', fontWeight:700, letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--fro-amber)' }}>Early Bird</div>
                    <div style={{ fontSize:'0.72rem', color:'var(--fro-text-3)', marginTop:'0.1rem' }}>Primeros 100 inscritos o 72h</div>
                  </div>
                  <div style={{ fontFamily:'var(--fsyne)', fontWeight:700, fontSize:'2.6rem', color:'var(--fro-text)', lineHeight:1, letterSpacing:'-0.03em' }}>$40</div>
                </div>

                {/* Community */}
                <div style={{ padding:'0.85rem 1rem', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <div>
                    <div style={{ fontFamily:'var(--finter)', fontSize:'0.66rem', fontWeight:500, letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--fro-text-3)' }}>Comunidad 404 / Starter</div>
                    <div style={{ fontSize:'0.7rem', color:'var(--fro-text-4)', marginTop:'0.1rem', fontStyle:'italic' }}>Precio especial para miembros</div>
                  </div>
                  <div style={{ fontFamily:'var(--finter)', fontSize:'0.78rem', fontWeight:600, color:'var(--fro-amber)' }}>Consultar</div>
                </div>
              </div>

              {/* Checklist */}
              <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:'0.4rem', marginBottom:'1.2rem' }}>
                {checklist.map((item) => (
                  <li key={item} style={{ fontSize:'0.82rem', color:'var(--fro-text-2)', display:'flex', alignItems:'flex-start', gap:'0.5rem', lineHeight:1.5 }}>
                    <span aria-hidden style={{ color:'var(--fro-amber)', fontWeight:700, flexShrink:0 }}>✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <a
                href="https://mpago.la/1v59m8j"
                target="_blank"
                rel="noopener noreferrer"
                className="fro-btn fro-btn-amber fro-btn-full fro-btn-lg"
                style={{ marginBottom:'0.6rem' }}
              >
                Inscribirme — Early Bird $40
                <span aria-hidden>→</span>
              </a>

              <p style={{ textAlign:'center', fontSize:'0.72rem', color:'var(--fro-text-3)', margin:0 }}>
                ⚡ Vacantes limitadas · Primera cohorte Q2 2026
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Schedule table */}
        <FadeIn delay={0.22}>
          <div style={{ marginTop:'2.8rem' }}>
            <div className="fro-eyebrow" style={{ justifyContent:'center', marginBottom:'1rem' }}>
              Carga horaria
            </div>

            <div style={{ display:'flex', flexDirection:'column', maxWidth:340, margin:'0 auto' }}>
              {schedule.map((row, i, a) => {
                const isLast = i === a.length - 1
                return (
                  <div key={row.label} style={{
                    display:'flex', justifyContent:'space-between',
                    padding:'0.5rem 0', fontSize:'0.86rem',
                    fontFamily:'var(--finter)',
                    color: isLast ? 'var(--fro-amber)' : 'var(--fro-text-2)',
                    fontWeight: isLast ? 600 : 400,
                    borderBottom: isLast ? 'none' : '1px solid var(--fro-line)',
                  }}>
                    <span>{row.label}</span>
                    <span style={{ fontFamily:'var(--fsyne)', fontWeight: isLast ? 700 : 500 }}>{row.value}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
