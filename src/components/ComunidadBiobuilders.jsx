import FadeIn from './FadeIn.jsx'
import { trackCta } from '../lib/analytics.js'
import { withUtm, CAMPAIGNS } from '../lib/utm.js'

const WHATSAPP_URL = 'https://chat.whatsapp.com/EnVjmCxvR6Q6TaUORbLAj8'

export default function ComunidadBiobuilders() {
  const href = withUtm(WHATSAPP_URL, { campaign: CAMPAIGNS.COMMUNITY, content: 'home_comunidad' })
  return (
    <section id="comunidad" className="fro-sec" style={{ background:'var(--fro-bg)' }}>
      <div className="fro-wrap">
        <FadeIn><div className="fro-eyebrow amber" style={{ marginBottom:'1.2rem' }}>Biobuilders</div></FadeIn>
        <FadeIn delay={0.08}>
          <h2 className="fro-h2" style={{ marginBottom:'1.4rem', maxWidth:760 }}>
            Súmate a la comunidad
          </h2>
        </FadeIn>
        <FadeIn delay={0.14}>
          <p className="fro-lead" style={{ maxWidth:680, marginBottom:'2.2rem' }}>
            Súmate a la comunidad gratuita de profesionales que comparten nuestra visión de transformar América Latina y el Caribe, a través del desarrollo e inversión de industrias basadas en sistemas vivos. Recibe nuevas oportunidades de inversión, trabajo y financiamiento, entre otras.
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="fro-btn fro-btn-amber fro-btn-lg"
            onClick={() => trackCta('comunidad_whatsapp', 'home_comunidad', href)}
          >
            Únete por WhatsApp <span aria-hidden>→</span>
          </a>
          <p className="fro-sm" style={{ marginTop:'0.8rem' }}>Gratuito</p>
        </FadeIn>
      </div>
    </section>
  )
}
