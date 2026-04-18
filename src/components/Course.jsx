import FadeIn from './FadeIn.jsx'

const features = [
  '8 semanas de aprendizaje dual: DeepTech aplicado + Business Design',
  'Co-diseñado con 404 Tech Found — validación técnica y científica',
  'Masterclasses con expertos regionales en biotecnología e inversión',
  'Proyecto de bionegocio real: construyes mientras aprendes',
  'Membresía Emprendedores Bio/Builders incluida durante el curso',
  'Red de pares y contactos en América Latina',
]
const included = [
  '8 módulos en video',
  'Sesiones en vivo con mentores',
  'Frameworks propietarios BBS',
  'Certificado BBS + 404 Tech Found',
  'Membresía Emprendedores incluida',
]

const LogosHeader = () => (
  <div style={{ display:'flex', alignItems:'center', gap:'0.8rem', flexWrap:'wrap' }}>
    <span style={{ fontFamily:'var(--fsyne)', fontWeight:700, fontSize:'0.95rem', letterSpacing:'-0.02em', color:'var(--fro-text)' }}>
      bio<span style={{ color:'var(--fro-amber)' }}>/</span>business
    </span>
    <span aria-hidden style={{ color:'var(--fro-text-3)', fontSize:'0.9rem' }}>×</span>
    <span style={{ fontFamily:'var(--fsyne)', fontWeight:700, fontSize:'0.95rem', letterSpacing:'-0.02em', color:'var(--fro-text)' }}>
      404 <span style={{ color:'var(--fro-amber)', fontWeight:500, fontStyle:'italic' }}>Tech Found</span>
    </span>
  </div>
)

export default function Course() {
  return (
    <section id="curso" className="fro-sec" style={{ background:'var(--fro-bg-3)', borderTop:'1px solid var(--fro-line)', borderBottom:'1px solid var(--fro-line)' }}>
      <div className="fro-wrap">

        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'2.5rem', flexWrap:'wrap', gap:'1rem' }}>
          <FadeIn><div className="fro-eyebrow">Curso especializado · Lanzamiento 2026</div></FadeIn>
          <FadeIn delay={0.08}><LogosHeader/></FadeIn>
        </div>

        <div className="course-grid" style={{ display:'grid', gridTemplateColumns:'1fr 380px', gap:'3rem', alignItems:'start' }}>

          <div>
            <FadeIn>
              <div style={{ display:'flex', gap:'0.5rem', marginBottom:'1.6rem', flexWrap:'wrap' }}>
                <span className="fro-chip"><span aria-hidden>⚡</span> Early Bird</span>
                <span className="fro-chip-plain">8 semanas · Online</span>
                <span className="fro-chip-plain">DeepTech + Business</span>
              </div>
            </FadeIn>

            <FadeIn delay={0.08}>
              <h2 className="fro-display" style={{ fontSize:'clamp(2.4rem, 5.4vw, 5rem)', marginBottom:'0.6rem' }}>
                BIOTECH<br/>
                <span className="fro-italic-amber">Sprint 01</span>
              </h2>
            </FadeIn>

            <FadeIn delay={0.12}>
              <p className="fro-eyebrow amber" style={{ marginBottom:'1.8rem' }}>
                Combinamos Ciencia + Negocios
              </p>
            </FadeIn>

            <FadeIn delay={0.16}>
              <p className="fro-lead" style={{ maxWidth:540, marginBottom:'2rem' }}>
                Aprende a convertir conocimiento biotecnológico en modelos de negocio técnica y financieramente viables. Diseñado para científicos, emprendedores y profesionales de LATAM.
              </p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <ul className="fro-feat">{features.map(f => <li key={f}>{f}</li>)}</ul>
            </FadeIn>
          </div>

          <FadeIn delay={0.15}>
            <div className="fro-card" style={{ padding:0, overflow:'hidden', background:'var(--fro-bg-2)' }}>
              <div style={{ padding:'0.8rem 1.2rem', display:'flex', justifyContent:'space-between', alignItems:'center', background:'var(--fro-amber)', color:'var(--fro-bg)' }}>
                <span style={{ fontFamily:'var(--finter)', fontSize:'0.72rem', fontWeight:600, letterSpacing:'0.14em', textTransform:'uppercase' }}>Precios de lanzamiento</span>
                <span style={{ fontFamily:'var(--finter)', fontSize:'0.72rem', fontWeight:500 }}>Q2 2026</span>
              </div>

              <div style={{ padding:'1.4rem 1.2rem' }}>
                <div style={{ border:'1px solid var(--fro-line)', borderRadius:8, overflow:'hidden', marginBottom:'1.2rem' }}>
                  <div style={{ padding:'0.8rem 1rem', background:'rgba(255,255,255,0.02)', borderBottom:'1px solid var(--fro-line)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                    <span style={{ fontFamily:'var(--finter)', fontSize:'0.68rem', fontWeight:500, letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--fro-text-3)' }}>Precio regular</span>
                    <span style={{ fontFamily:'var(--fsyne)', fontWeight:500, fontSize:'1rem', color:'var(--fro-text-3)', textDecoration:'line-through' }}>$55</span>
                  </div>

                  <div style={{ padding:'1rem', background:'var(--fro-amber-08)', borderBottom:'1px solid var(--fro-line)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                    <div>
                      <div style={{ fontFamily:'var(--finter)', fontSize:'0.7rem', fontWeight:600, letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--fro-amber)' }}>Early Bird</div>
                      <div style={{ fontSize:'0.72rem', color:'var(--fro-text-3)', marginTop:'0.1rem' }}>Precio especial de lanzamiento</div>
                    </div>
                    <div style={{ fontFamily:'var(--fsyne)', fontWeight:700, fontSize:'2.6rem', color:'var(--fro-text)', lineHeight:1, letterSpacing:'-0.03em' }}>$40</div>
                  </div>

                  <div style={{ padding:'0.85rem 1rem', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                    <div>
                      <div style={{ fontFamily:'var(--finter)', fontSize:'0.66rem', fontWeight:500, letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--fro-text-3)' }}>Comunidad 404 / Emprendedores</div>
                      <div style={{ fontSize:'0.7rem', color:'var(--fro-text-4)', marginTop:'0.1rem' }}>Precio especial para miembros</div>
                    </div>
                    <div style={{ fontFamily:'var(--finter)', fontSize:'0.78rem', fontWeight:600, color:'var(--fro-amber)' }}>Consultar</div>
                  </div>
                </div>

                <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:'0.4rem', marginBottom:'1.2rem' }}>
                  {included.map(inc => (
                    <li key={inc} style={{ fontSize:'0.82rem', color:'var(--fro-text-2)', display:'flex', alignItems:'flex-start', gap:'0.5rem', lineHeight:1.5 }}>
                      <span aria-hidden style={{ color:'var(--fro-amber)', fontWeight:700, flexShrink:0 }}>✓</span>
                      {inc}
                    </li>
                  ))}
                </ul>

                <a href="/sprint01" className="fro-btn fro-btn-amber fro-btn-full fro-btn-lg" style={{ marginBottom:'0.6rem' }}>
                  Inscribirme al Sprint 01
                  <span aria-hidden>→</span>
                </a>
                <p style={{ textAlign:'center', fontSize:'0.72rem', color:'var(--fro-text-3)' }}>
                  ⚡ Vacantes limitadas por lanzamiento · Primera cohorte Q2 2026
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      <style>{`
        @media(max-width: 960px){
          .course-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
