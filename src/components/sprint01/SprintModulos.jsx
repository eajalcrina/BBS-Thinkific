import FadeIn from '../FadeIn.jsx'
import Accordion from './Accordion.jsx'

function ModuleContent({ quote, bullets, liveText, deliverable }) {
  return (
    <div>
      <p style={{
        fontStyle: 'italic', fontFamily: 'var(--fdm)',
        fontSize: '0.88rem', color: 'var(--t-white3)', marginBottom: '1rem',
      }}>"{quote}"</p>

      <div style={{
        fontFamily: 'var(--fbc)', fontSize: '0.72rem',
        textTransform: 'uppercase', color: 'var(--t-white3)',
        letterSpacing: '0.1em', marginBottom: '0.6rem',
      }}>Qué cubre el módulo:</div>

      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem', padding: 0, margin: 0 }}>
        {bullets.map((b, i) => (
          <li key={i} style={{ display: 'flex', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--t-white2)' }}>
            <span style={{ color: 'var(--lime)', fontWeight: 700, flexShrink: 0 }}>→</span>
            {b}
          </li>
        ))}
      </ul>

      <div style={{
        background: 'rgba(193,244,0,0.06)', borderRadius: 10,
        padding: '0.8rem 1rem', marginTop: '1rem',
        display: 'flex', alignItems: 'center', gap: '0.6rem',
      }}>
        <span style={{ fontFamily: 'var(--fbc)', fontSize: '0.7rem' }}>🎙️ 90 min</span>
        <span style={{ fontSize: '0.82rem', color: 'var(--t-white2)' }}>{liveText}</span>
      </div>

      <div style={{
        background: 'rgba(243,39,105,0.08)',
        borderLeft: '3px solid var(--rose)',
        borderRadius: '0 10px 10px 0',
        padding: '0.8rem 1rem', marginTop: '0.8rem',
      }}>
        <div style={{
          fontFamily: 'var(--fbc)', fontSize: '0.68rem',
          textTransform: 'uppercase', color: 'var(--t-white3)',
        }}>Tu entregable:</div>
        <div style={{
          fontFamily: 'var(--fout)', fontWeight: 600,
          fontSize: '0.92rem', color: 'var(--white)',
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
    <section className="sec" id="modulos" style={{ background: 'var(--dark)', position: 'relative' }}>
      <div className="wrap">
        <FadeIn>
          <div style={{
            fontFamily: 'var(--fbc)', fontSize: '0.68rem', fontWeight: 600,
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'var(--lime)', display: 'inline-flex',
            alignItems: 'center', gap: '0.55rem',
          }}>
            <span style={{ width: 18, height: 1.5, background: 'var(--lime)', display: 'inline-block' }} />
            Programa · 4 módulos
          </div>
        </FadeIn>

        <FadeIn delay={0.06}>
          <h2 style={{
            fontFamily: 'var(--fout)', fontWeight: 300,
            fontSize: 'clamp(1.8rem,3vw,3rem)',
            color: 'var(--white)',
          }}>
            Qué aprenderás y qué construirás
          </h2>
        </FadeIn>

        <FadeIn delay={0.12}>
          <Accordion items={items} defaultOpen={0} />
        </FadeIn>

        <FadeIn delay={0.18}>
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <a
              className="btn btn-lime"
              href="#precios"
              onClick={e => { e.preventDefault(); document.querySelector('#precios')?.scrollIntoView({ behavior: 'smooth' }) }}
            >
              Ver precios e inscribirme →
            </a>
          </div>
        </FadeIn>
      </div>

      <div style={{ position: 'absolute', bottom: -1, left: 0, right: 0 }}>
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ width: '100%', height: 60, display: 'block' }}>
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="var(--cream)" />
        </svg>
      </div>
    </section>
  )
}
