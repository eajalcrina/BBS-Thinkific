import FadeIn from '../FadeIn.jsx'
import Accordion from './Accordion.jsx'

function ModuleContent({ quote, bullets, liveText, deliverable }) {
  return (
    <div>
      <p style={{
        fontStyle:'italic', fontFamily:'var(--finter)',
        fontSize:'0.9rem', color:'var(--fro-text-2)', marginBottom:'1rem', lineHeight:1.6,
      }}>"{quote}"</p>

      <div style={{
        fontFamily:'var(--finter)', fontSize:'0.72rem',
        textTransform:'uppercase', color:'var(--fro-text-3)',
        letterSpacing:'0.14em', marginBottom:'0.7rem', fontWeight:500,
      }}>Qué cubre el módulo</div>

      <ul className="fro-feat" style={{ marginBottom:'1.1rem' }}>
        {bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>

      <div style={{
        background:'var(--fro-amber-08)', border:'1px solid var(--fro-amber-25)',
        borderRadius:8, padding:'0.75rem 1rem', marginBottom:'0.7rem',
        display:'flex', alignItems:'center', gap:'0.6rem', flexWrap:'wrap',
      }}>
        <span style={{ fontFamily:'var(--finter)', fontSize:'0.68rem', fontWeight:700, letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--fro-amber)' }}>
          🎙 90 min en vivo
        </span>
        <span style={{ fontFamily:'var(--finter)', fontSize:'0.84rem', color:'var(--fro-text-2)' }}>
          {liveText}
        </span>
      </div>

      <div style={{
        background:'rgba(255,255,255,0.03)',
        borderLeft:'3px solid var(--fro-amber)',
        borderRadius:'0 8px 8px 0',
        padding:'0.8rem 1rem',
      }}>
        <div style={{
          fontFamily:'var(--finter)', fontSize:'0.66rem',
          textTransform:'uppercase', letterSpacing:'0.14em',
          color:'var(--fro-text-3)', fontWeight:500, marginBottom:'0.2rem',
        }}>Tu entregable</div>
        <div style={{
          fontFamily:'var(--fsyne)', fontWeight:600,
          fontSize:'0.95rem', color:'var(--fro-text)', letterSpacing:'-0.01em',
        }}>{deliverable}</div>
      </div>
    </div>
  )
}

const modules = [
  {
    badge: '01',
    title: 'El Problema',
    quote: 'Los problemas más grandes del siglo ya tienen un ejército de científicos trabajando en ellos. ¿Cuál es el tuyo?',
    bullets: [
      'El mapa de grandes dominios de problema en biotech 2026',
      'Los problemas con mayor potencial para América Latina',
      'Framework de selección: cómo evaluar si un problema vale tu tiempo',
      'El rol estratégico de la biodiversidad latinoamericana',
    ],
    liveText: 'Sesión en vivo con especialista',
    deliverable: 'Problem Statement Card',
  },
  {
    badge: '02',
    title: 'La Tecnología',
    quote: 'No necesitas ser científico para entender qué tecnología usar. Necesitas saber qué tecnología ya resolvió problemas parecidos al tuyo.',
    bullets: [
      'Tecnologías con mayor trayectoria: biología sintética, fermentación de precisión, CRISPR, biomateriales, IA + biotech',
      'Cómo leer la madurez de una tecnología (TRL) sin ser científico',
      'La diferencia entre plataforma tecnológica y producto',
      'La biodiversidad latinoamericana como base de datos tecnológica',
    ],
    liveText: 'Sesión en vivo con especialista',
    deliverable: 'Tech Stack Card',
  },
  {
    badge: '03',
    title: 'El Modelo',
    quote: 'Tener la tecnología no es tener el negocio. El modelo es lo que convierte la ciencia en dinero.',
    bullets: [
      'Modelos de negocio dominantes: B2B ingredientes, licenciamiento, servicios de lab, producto diferenciado, SaaS bioinformática',
      'Unit economics en biotecnología: cómo calcular costos sin referencia de mercado',
      'Valorización de activos intangibles: cepas, formulaciones, datasets de biodiversidad',
      '4 casos de monetización real en América Latina',
    ],
    liveText: 'Workshop activo — participantes presentan su Canvas en vivo',
    deliverable: 'Bio Business Model Canvas',
  },
  {
    badge: '04',
    title: 'El Capital',
    quote: 'El capital ya está buscando proyectos como el tuyo. El problema es que no sabe que existes — y tú no sabes cómo hablarle.',
    bullets: [
      'Mapa de financiamiento por etapa: grants, aceleradoras, inversión ángel, VC de impacto',
      'Cómo piensa un inversor de biotech: de-risking científico, regulatorio y comercial',
      'Estructura del pitch: problema → tecnología → modelo → tracción → equipo → ask',
      'Radar de Fondos LATAM 2026 — 30+ fondos con tesis activas',
    ],
    liveText: 'Inversor real da feedback a un pitch en vivo',
    deliverable: 'Fundraising Roadmap',
  },
]

export default function SprintModulos() {
  const items = modules.map(m => ({
    badge: m.badge,
    title: m.title,
    content: (
      <ModuleContent
        quote={m.quote}
        bullets={m.bullets}
        liveText={m.liveText}
        deliverable={m.deliverable}
      />
    ),
  }))

  return (
    <section
      id="modulos"
      className="fro-sec"
      style={{ background:'var(--fro-bg)' }}
    >
      <div className="fro-wrap">
        <FadeIn><div className="fro-eyebrow" style={{ marginBottom:'1.2rem' }}>Programa · 4 módulos</div></FadeIn>

        <FadeIn delay={0.06}>
          <h2 className="fro-h2" style={{ marginBottom:'2rem', maxWidth:'16em' }}>
            Qué aprenderás y qué{' '}
            <span className="fro-italic-amber">construirás</span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.12}>
          <Accordion items={items} defaultOpen={0} />
        </FadeIn>

        <FadeIn delay={0.18}>
          <div style={{ textAlign:'center', marginTop:'2.5rem' }}>
            <a
              className="fro-btn fro-btn-amber fro-btn-lg"
              href="#precios"
              onClick={e => { e.preventDefault(); document.querySelector('#precios')?.scrollIntoView({ behavior:'smooth' }) }}
            >
              Ver precios e inscribirme <span aria-hidden>→</span>
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
