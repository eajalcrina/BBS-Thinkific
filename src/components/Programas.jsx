import FadeIn from './FadeIn.jsx'
import { trackCta } from '../lib/analytics.js'

const PROGRAMAS = [
  {
    slug: 'ia-nuevos-profesionales',
    titulo: 'IA para Nuevos Profesionales',
    audiencia: 'Jóvenes profesionales',
    nota: 'La IA no va a reemplazar a los jóvenes profesionales que la dominen con criterio propio. Va a reemplazar a los que crecieron sin desarrollarlo.',
    precio: 'S/ 297',
    status: 'live',
  },
  {
    slug: 'ia-profesionales-senior',
    titulo: 'IA para Profesionales Senior',
    audiencia: 'Profesionales senior',
    nota: 'Tu experiencia no está en riesgo por la IA. Está en riesgo si nadie aprende a multiplicarla con ella.',
    precio: 'S/ 497',
    status: 'reserve',
  },
  {
    slug: 'negocios-regenerativos',
    titulo: 'Construcción de Negocios Regenerativos',
    audiencia: 'Emprendimientos y pymes',
    nota: 'Tener buena intención regenerativa no basta. Este programa es la ingeniería detrás del negocio que sí funciona.',
    precio: 'S/ 597',
    status: 'reserve',
  },
  {
    slug: 'marcas-regenerativas',
    titulo: 'Construcción de Marcas Regenerativas',
    audiencia: 'Emprendimientos y pymes',
    nota: 'Tener una causa real no basta si tu marca suena igual a las cien que dicen tener lo mismo.',
    precio: 'S/ 597',
    status: 'live',
  },
  {
    slug: 'economia-circular-industria',
    titulo: 'Economía Circular para la Industria',
    audiencia: 'Gran industria',
    nota: 'No lo hacemos porque lo pida un reporte de sostenibilidad. Lo hacemos porque hay industrias que ya no pueden darse el lujo de desperdiciar.',
    precio: 'S/ 797',
    status: 'reserve',
  },
  {
    slug: 'capital-de-impacto',
    titulo: 'Capital de Impacto',
    audiencia: 'Empresas grandes y pymes',
    nota: 'El capital no huye de la región por falta de buenos proyectos. Huye por falta de preparación para levantarlo.',
    precio: 'S/ 997',
    status: 'reserve',
  },
]

export default function Programas() {
  return (
    <section id="programas" className="fro-sec fro-bg-white fro-on-light">
      <div className="fro-wrap">
        <FadeIn><div className="fro-eyebrow" style={{ marginBottom:'1.2rem' }}>Cursos especializados</div></FadeIn>
        <FadeIn delay={0.08}>
          <h2 className="fro-h2" style={{ marginBottom:'1rem', maxWidth:760 }}>
            No es un catálogo extenso. Es lo primero que hay que resolver.
          </h2>
        </FadeIn>
        <FadeIn delay={0.14}>
          <p className="fro-lead" style={{ maxWidth:640, marginBottom:'3rem' }}>
            Seis programas curados, no seis cursos genéricos. Cada uno es la expresión directa de lo que creemos que hay que resolver primero, para cada tipo de audiencia. Un mes, cuatro sesiones en vivo, sin relleno.
          </p>
        </FadeIn>

        <div className="programas-grid" style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:'1.4rem' }}>
          {PROGRAMAS.map((p, i) => (
            <FadeIn key={p.slug} delay={0.18 + i*0.05}>
              <a
                href={`/programas/${p.slug}`}
                onClick={() => trackCta(`programa_${p.slug}`, 'home_programas', `/programas/${p.slug}`)}
                className={p.status === 'live' ? 'fro-card fro-card-live' : 'fro-card'}
                style={{ display:'flex', flexDirection:'column', padding:'1.6rem', height:'100%', textDecoration:'none' }}
              >
                {p.status === 'live' && (
                  <span style={{ alignSelf:'flex-start', background:'#0A0A0A', color:'var(--fro-amber)', fontSize:'0.6rem', fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', padding:'0.28rem 0.6rem', borderRadius:20, marginBottom:'0.9rem' }}>
                    Disponible ahora
                  </span>
                )}
                <div className="fro-sm" style={{ marginBottom:'0.8rem', textTransform:'uppercase', letterSpacing:'0.1em', fontSize:'0.68rem' }}>{p.audiencia}</div>
                <h3 className="fro-h3" style={{ marginBottom:'0.8rem', fontSize:'1.1rem' }}>{p.titulo}</h3>
                <p className="fro-body" style={{ fontSize:'0.86rem', marginBottom:0 }}>{p.nota}</p>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:'auto', paddingTop:'1.4rem' }}>
                  <span className="fro-chip-outline">{p.precio}</span>
                  <span className="fro-card-cta" style={{ fontSize:'0.82rem', fontWeight:600 }}>Ver programa →</span>
                </div>
              </a>
            </FadeIn>
          ))}
        </div>
      </div>
      <style>{`
        @media(max-width: 960px){ .programas-grid { grid-template-columns: 1fr 1fr !important; } }
        @media(max-width: 640px){ .programas-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}
