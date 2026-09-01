import FadeIn from '../FadeIn.jsx'
import { trackOutbound } from '../../lib/analytics.js'

export default function RizomaBlock({ rizoma }) {
  if (!rizoma) return null
  return (
    <section className="fro-sec fro-bg-light fro-on-light">
      <div className="fro-wrap">
        <FadeIn><div className="fro-eyebrow" style={{ marginBottom: '1.2rem' }}>Diagnóstico complementario</div></FadeIn>
        <FadeIn delay={0.06}>
          <p className="fro-lead" style={{ maxWidth: 760, marginBottom: '1.6rem' }}>{rizoma.texto}</p>
        </FadeIn>
        <FadeIn delay={0.12}>
          <a
            href={rizoma.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackOutbound(rizoma.href, 'rizoma_diagnostico')}
            className="fro-btn"
            style={{ border: '1.5px solid var(--fro-ink)', color: 'var(--fro-ink)', background: 'transparent' }}
          >
            {rizoma.cta}
          </a>
        </FadeIn>
      </div>
    </section>
  )
}
