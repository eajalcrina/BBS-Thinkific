import FadeIn from './FadeIn.jsx'
import { trackCta } from '../lib/analytics.js'

const CARDS = [
  {
    href: '/diagnostico/profesionales',
    id: 'profesionales',
    titulo: '¿Eres profesional?',
    nota: 'Descubre qué tan preparado estás frente a la disrupción de la IA, y qué programa es tu siguiente paso.',
    cta: 'Haz tu autodiagnóstico',
  },
  {
    href: '/diagnostico/empresas',
    id: 'empresas',
    titulo: '¿Tienes un negocio?',
    nota: 'Evalúa en qué momento estás, de la marca al capital, y qué programa te ayuda a avanzar.',
    cta: 'Evalúa tu momento',
  },
]

export default function DiagnosticoCTA() {
  return (
    <section id="diagnostico" className="fro-sec fro-bg-white fro-on-light">
      <div className="fro-wrap">
        <FadeIn><div className="fro-eyebrow" style={{ marginBottom:'1.2rem' }}>Autodiagnóstico gratuito</div></FadeIn>
        <FadeIn delay={0.08}>
          <h2 className="fro-h2" style={{ marginBottom:'2.6rem', maxWidth:760 }}>
            ¿Descubre qué necesitas para avanzar en tu camino como profesional o empresario?
          </h2>
        </FadeIn>

        <div className="diag-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.4rem' }}>
          {CARDS.map((c, i) => (
            <FadeIn key={c.href} delay={0.14 + i*0.08}>
              <a
                href={c.href}
                onClick={() => trackCta(`diagnostico_${c.id}`, 'home_diagnostico', c.href)}
                className="fro-card"
                style={{ display:'block', padding:'2rem', height:'100%', textDecoration:'none' }}
              >
                <h3 className="fro-h3" style={{ marginBottom:'0.9rem' }}>{c.titulo}</h3>
                <p className="fro-body" style={{ marginBottom:'1.4rem' }}>{c.nota}</p>
                <span className="fro-mark-amber fro-card-cta" style={{ fontSize:'0.88rem', fontWeight:700 }}>{c.cta} →</span>
              </a>
            </FadeIn>
          ))}
        </div>
      </div>
      <style>{`@media(max-width: 720px){ .diag-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  )
}
