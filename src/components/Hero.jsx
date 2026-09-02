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
            Transformamos América Latina con inteligencia territorial y artificial.
          </h1>
        </FadeIn>

        <FadeIn delay={0.14}>
          <p className="fro-lead" style={{ maxWidth:640, marginBottom:'1.2rem' }}>
            <span className="fro-italic-amber">Hola, somos Eddie y Lorenzo.</span> Después de años trabajando e invirtiendo en industrias basadas en sistemas vivos en la región, vimos algo claro: para ser más competitivos, tenemos que transformar dos cosas a la vez, a las personas y a las empresas. Por eso diseñamos programas 100% aplicativos, pensados para que cada participante salga con nuevas competencias y herramientas concretas para crecer y escalar negocios en la región.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="fro-sm" style={{ maxWidth:600, marginBottom:'2.4rem' }}>
            Los cursos han sido diseñados destilando nuestra experiencia como docentes y speakers en instituciones como MIT Professional Education, la Universidad de Chicago, CATIE e INCAE.
          </p>
        </FadeIn>

        <FadeIn delay={0.26}>
          <a
            href="#profesionales"
            className="fro-btn fro-btn-amber fro-btn-lg"
            onClick={() => trackCta('hero_ver_programas', 'home_hero', '#profesionales')}
          >
            Ver los 6 programas <span aria-hidden>→</span>
          </a>
        </FadeIn>
      </div>
    </section>
  )
}
