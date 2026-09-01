import FadeIn from './FadeIn.jsx'
import { trackCta } from '../lib/analytics.js'

const STATS = [
  ['+30 años combinados', ''],
  ['USD 1M', 'en grants'],
  ['USD 1.5M', 'en deuda de impacto'],
  ['USD 80M', 'en levantamiento de capital'],
]

export default function Hero() {
  return (
    <section id="top" className="fro-sec" style={{ paddingTop:'8rem', background:'linear-gradient(160deg, var(--fro-bg) 0%, #131313 55%, var(--fro-bg-3) 100%)' }}>
      <div className="fro-wrap">
        <FadeIn>
          <div className="fro-chip" style={{ marginBottom:'1.8rem' }}>
            Programas de formación especializada para Latam
          </div>
        </FadeIn>

        <FadeIn delay={0.08}>
          <h1 className="fro-display" style={{ fontSize:'clamp(2.4rem, 6vw, 5.2rem)', maxWidth:920, marginBottom:'1.6rem' }}>
            Transformamos América Latina y el Caribe con inteligencia artificial.
          </h1>
        </FadeIn>

        <FadeIn delay={0.14}>
          <p className="fro-lead" style={{ maxWidth:640, marginBottom:'1.2rem' }}>
            De Eddie Ajalcriña (Lima) y Lorenzo Ortiz (Bogotá), respaldados por Redesign Lab: formación especializada para que profesionales y empresas de industrias que dependen de sistemas vivos dominen la IA y lideren ese cambio, en toda la región.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="fro-sm" style={{ maxWidth:600, marginBottom:'2.4rem' }}>
            Antes de esto, ayudamos a diseñar programas de formación para instituciones como MIT Professional Education, la Universidad de Chicago, CATIE e INCAE. Aquí destilamos ese mismo nivel, para tu carrera o tu negocio.
          </p>
        </FadeIn>

        <FadeIn delay={0.26}>
          <a
            href="#programas"
            className="fro-btn fro-btn-amber fro-btn-lg"
            onClick={() => trackCta('hero_ver_programas', 'home_hero', '#programas')}
          >
            Ver los 6 programas <span aria-hidden>→</span>
          </a>
        </FadeIn>

        <FadeIn delay={0.34}>
          <div className="hero-stats" style={{ display:'flex', gap:'2.4rem', flexWrap:'wrap', marginTop:'3.6rem', paddingTop:'2.4rem', borderTop:'1px solid var(--fro-line)' }}>
            {STATS.map(([big, small]) => (
              <div key={big}>
                <div style={{ fontFamily:'var(--fsyne)', fontWeight:700, fontSize:'1.4rem', color:'var(--fro-text)' }}>{big}</div>
                {small && <div className="fro-sm">{small}</div>}
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
