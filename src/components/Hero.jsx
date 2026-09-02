import FadeIn from './FadeIn.jsx'
import { trackCta } from '../lib/analytics.js'

export default function Hero() {
  return (
    <section id="top" className="fro-sec" style={{ paddingTop:'8rem', background:'linear-gradient(160deg, var(--fro-bg) 0%, #131313 55%, var(--fro-bg-3) 100%)' }}>
      <div className="fro-wrap">
        <FadeIn>
          <div className="fro-chip" style={{ marginBottom:'1.8rem' }}>
            Plataforma de formación especializada
          </div>
        </FadeIn>

        <FadeIn delay={0.08}>
          <h1 className="fro-display" style={{ fontSize:'clamp(2.4rem, 6vw, 5.2rem)', maxWidth:920, marginBottom:'1.6rem' }}>
            Transformamos América Latina con inteligencia <span style={{ fontStyle:'italic', color:'var(--fro-amber)' }}>territorial</span> y artificial.
          </h1>
        </FadeIn>

        <FadeIn delay={0.14}>
          <p className="fro-lead" style={{ maxWidth:640, marginBottom:'1.2rem' }}>
            <span className="fro-italic-amber">Hola, somos Eddie y Lorenzo.</span> Después de años desarrollando industrias basadas en sistemas vivos, entendimos que para ser más competitivos, tenemos que transformar dos cosas a la vez, a los profesionales y a las empresas.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="fro-sm" style={{ maxWidth:600, marginBottom:'2.4rem' }}>
            Nuestros programas han sido diseñados basados en nuestra experiencia como docentes en instituciones educativas internacionales y con el respaldo del programa Claude Network Partner, para que cada participante obtenga competencias de clase mundial.
          </p>
        </FadeIn>

        <FadeIn delay={0.26}>
          <div style={{ display:'flex', gap:'1rem', flexWrap:'wrap' }}>
            <a
              href="#profesionales"
              className="fro-btn fro-btn-amber fro-btn-lg"
              onClick={() => trackCta('hero_ver_programas_profesionales', 'home_hero', '#profesionales')}
            >
              Programas para profesionales <span aria-hidden>→</span>
            </a>
            <a
              href="#empresas"
              className="fro-btn fro-btn-amber fro-btn-lg"
              onClick={() => trackCta('hero_ver_programas_empresas', 'home_hero', '#empresas')}
            >
              Programas para empresas <span aria-hidden>→</span>
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
