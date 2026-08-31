import FadeIn from './FadeIn.jsx'
import { trackCta } from '../lib/analytics.js'
import { withUtm, CAMPAIGNS } from '../lib/utm.js'

const WHATSAPP_URL = 'https://chat.whatsapp.com/EnVjmCxvR6Q6TaUORbLAj8'

export default function ComunidadBiobuilders() {
  const href = withUtm(WHATSAPP_URL, { campaign: CAMPAIGNS.COMMUNITY, content: 'home_comunidad' })
  return (
    <section id="comunidad" className="fro-sec" style={{ background:'var(--fro-bg)' }}>
      <div className="fro-wrap">
        <FadeIn><div className="fro-eyebrow amber" style={{ marginBottom:'1.2rem' }}>Únete a los Biobuilders</div></FadeIn>
        <FadeIn delay={0.08}>
          <h2 className="fro-h2" style={{ marginBottom:'1.4rem', maxWidth:760 }}>
            La red que venimos construyendo, curando y haciendo crecer
          </h2>
        </FadeIn>
        <FadeIn delay={0.14}>
          <p className="fro-lead" style={{ maxWidth:680, marginBottom:'2.2rem' }}>
            No es un producto que se vende. Es la comunidad de quienes están comprometidos con transformar la región desde su expertise, sea el mundo corporativo, el emprendimiento o la inversión. Todo egresado de cualquiera de los 6 programas se suma automáticamente. Ahí compartimos noticias del sector, convocatorias de empleo, fuentes de financiamiento no reembolsable, y los primeros accesos a nuevos lanzamientos.
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
