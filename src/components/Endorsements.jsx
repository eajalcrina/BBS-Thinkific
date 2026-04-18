import FadeIn from './FadeIn.jsx'

/**
 * Respaldan — sección de credibilidad institucional.
 * Mismo tratamiento que el marquee del hero: tira en loop infinito.
 */

const PARTNERS = [
  '404 Tech Found',
  'MIT Professional Education',
  'ESAN Graduate School',
  'Pontificia Universidad Católica del Perú',
  'Singularity University',
  'Unión Europea en Perú',
]

export default function Endorsements() {
  return (
    <section
      id="respaldan"
      className="fro-sec"
      style={{ background:'var(--fro-bg-3)', borderTop:'1px solid var(--fro-line)', borderBottom:'1px solid var(--fro-line)', padding:'6rem 0 0' }}
    >
      <div className="fro-wrap">
        <FadeIn><div className="fro-eyebrow" style={{ marginBottom:'1.2rem' }}>Respaldan este trabajo</div></FadeIn>

        <FadeIn delay={0.08}>
          <h2 className="fro-h2" style={{ maxWidth:'14em', marginBottom:'1rem' }}>
            Aliados y{' '}
            <span className="fro-italic-amber">referentes</span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.14}>
          <p className="fro-lead" style={{ maxWidth:560, marginBottom:'3rem' }}>
            Construimos sobre trayectoria real. Partners académicos, redes técnicas y credenciales del equipo fundador.
          </p>
        </FadeIn>
      </div>

      {/* Full-bleed marquee — mismo estilo que el del hero */}
      <FadeIn delay={0.2}>
        <div className="fro-marquee" aria-hidden>
          <div className="fro-marquee-track">
            <span>{PARTNERS.map(p => <span key={p}>{p}</span>)}</span>
            <span>{PARTNERS.map(p => <span key={p+'_b'}>{p}</span>)}</span>
          </div>
        </div>
      </FadeIn>

      <div className="fro-wrap">
        <FadeIn delay={0.3}>
          <p className="fro-sm" style={{ marginTop:'2.5rem', marginBottom:'2rem', textAlign:'center', maxWidth:540, marginLeft:'auto', marginRight:'auto', fontStyle:'italic' }}>
            Testimonios de nuestra primera cohorte se publicarán tras el lanzamiento Q2 2026.
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
