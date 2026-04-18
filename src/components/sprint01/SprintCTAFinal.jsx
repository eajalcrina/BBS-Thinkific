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
      className="fro-sec"
      style={{ background:'var(--fro-bg)', position:'relative', overflow:'hidden' }}
    >
      {/* amber glow */}
      <div aria-hidden style={{
        position:'absolute', left:'-15%', top:'10%',
        width:'620px', height:'620px',
        background:'radial-gradient(circle, rgba(255,200,0,0.14), transparent 60%)',
        filter:'blur(28px)', pointerEvents:'none', zIndex:0,
      }}/>

      <div className="fro-wrap" style={{ position:'relative', zIndex:1, textAlign:'center' }}>
        <FadeIn>
          <div className="fro-eyebrow amber" style={{ marginBottom:'1.2rem', justifyContent:'center' }}>
            El momento es ahora
          </div>
        </FadeIn>

        <FadeIn delay={0.06}>
          <h2 className="fro-h2" style={{ marginBottom:'2rem' }}>
            Empieza tu biotech{' '}
            <span className="fro-italic-amber">hoy.</span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <ul style={{
            listStyle:'none',
            display:'inline-flex', flexDirection:'column', gap:'0.55rem',
            textAlign:'left', marginBottom:'2.2rem', padding:0,
          }}>
            {checklistItems.map((item, i) => (
              <li key={i} style={{
                display:'flex', gap:'0.7rem', alignItems:'flex-start',
                fontFamily:'var(--finter)', fontSize:'0.92rem', color:'var(--fro-text-2)', lineHeight:1.55,
              }}>
                <span aria-hidden style={{ color:'var(--fro-amber)', fontWeight:700, flexShrink:0 }}>✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </FadeIn>

        <FadeIn delay={0.16}>
          <p className="fro-body" style={{ maxWidth:640, margin:'0 auto 1.8rem' }}>
            No existe en el mundo de habla hispana un programa que integre todo esto en menos de $55 USD.
          </p>
        </FadeIn>

        <FadeIn delay={0.22}>
          <div style={{ display:'flex', gap:'0.8rem', justifyContent:'center', flexWrap:'wrap' }}>
            <a
              href="https://mpago.la/1v59m8j"
              target="_blank"
              rel="noopener noreferrer"
              className="fro-btn fro-btn-amber fro-btn-lg"
            >
              Inscribirme al Sprint 01
              <span aria-hidden>→</span>
            </a>
            <a
              href="#precios"
              onClick={e => { e.preventDefault(); document.querySelector('#precios')?.scrollIntoView({ behavior:'smooth' }) }}
              className="fro-btn fro-btn-ghost fro-btn-lg"
            >
              Ver precios
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={0.28}>
          <p style={{
            fontFamily:'var(--finter)', fontSize:'0.72rem', fontWeight:600,
            letterSpacing:'0.14em', textTransform:'uppercase',
            color:'var(--fro-amber)', marginTop:'1.4rem',
          }}>
            ⚡ Vacantes limitadas — Primera cohorte
          </p>
        </FadeIn>

        <FadeIn delay={0.32}>
          <p style={{ fontSize:'0.82rem', color:'var(--fro-text-3)', marginTop:'1.6rem' }}>
            ¿Preguntas? Escríbenos a{' '}
            <a
              href="mailto:biobusiness@redesignlab.org"
              style={{ color:'var(--fro-text-2)', textDecoration:'none', borderBottom:'1px solid var(--fro-line-2)' }}
            >
              biobusiness@redesignlab.org
            </a>
          </p>
        </FadeIn>

        <FadeIn delay={0.36}>
          <p style={{
            fontFamily:'var(--finter)', fontSize:'0.7rem',
            color:'var(--fro-text-4)', letterSpacing:'0.08em', marginTop:'0.8rem',
          }}>
            #BiotechSprint01 · #CienciaQueConstruye · #BBS404
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
