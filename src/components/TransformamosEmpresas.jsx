import FadeIn from './FadeIn.jsx'
import { trackCta } from '../lib/analytics.js'
import { PROGRAMAS } from '../data/programas.js'

const SLUGS = ['negocios-regenerativos', 'marcas-regenerativas', 'economia-circular-industria', 'capital-de-impacto']
const PROGRAMAS_EMPRESAS = SLUGS.map(slug => PROGRAMAS.find(p => p.slug === slug)).filter(Boolean)

export default function TransformamosEmpresas() {
  return (
    <section id="empresas" className="fro-sec fro-bg-light fro-on-light">
      <div className="fro-wrap">
        <FadeIn><div className="fro-eyebrow" style={{ marginBottom:'1.2rem' }}>Para negocios</div></FadeIn>
        <FadeIn delay={0.06}>
          <h2 className="fro-h2" style={{ marginBottom:'1rem', maxWidth:640 }}>Transformamos empresas</h2>
        </FadeIn>
        <FadeIn delay={0.12}>
          <p className="fro-lead" style={{ maxWidth:680, marginBottom:'3rem' }}>
            Fortalecer el negocio primero es lo que realmente prepara a una empresa para escalar y acceder a capital. No al revés.
          </p>
        </FadeIn>

        <div className="transf-grid-empresas" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.6rem', alignItems:'start' }}>
          <FadeIn delay={0.16}>
            <a
              href="/diagnostico/empresas"
              onClick={() => trackCta('diagnostico_empresas', 'home_transformamos_empresas', '/diagnostico/empresas')}
              className="fro-card"
              style={{ display:'block', padding:'2rem', height:'100%', textDecoration:'none' }}
            >
              <h3 className="fro-h3" style={{ marginBottom:'0.9rem' }}>Antes de salir a levantar capital, hay que saber qué fortalecer primero</h3>
              <p className="fro-body" style={{ marginBottom:'1.4rem' }}>
                Este diagnóstico te da una radiografía honesta de tu negocio en minutos, como la vería un inversionista.
              </p>
              <span className="fro-mark-amber fro-card-cta" style={{ fontSize:'0.88rem', fontWeight:700 }}>Evalúa tu negocio →</span>
            </a>
          </FadeIn>

          <div className="empresas-cards-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' }}>
            {PROGRAMAS_EMPRESAS.map((p, i) => (
              <FadeIn key={p.slug} delay={0.22 + i*0.05}>
                <a
                  href={`/programas/${p.slug}`}
                  onClick={() => trackCta(`programa_${p.slug}`, 'home_transformamos_empresas', `/programas/${p.slug}`)}
                  className={p.status === 'live' ? 'fro-card fro-card-live' : 'fro-card'}
                  style={{ display:'flex', flexDirection:'column', padding:'1.2rem', height:'100%', textDecoration:'none' }}
                >
                  {p.status === 'live' && (
                    <span style={{ alignSelf:'flex-start', background:'#0A0A0A', color:'var(--fro-amber)', fontSize:'0.6rem', fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', padding:'0.28rem 0.6rem', borderRadius:20, marginBottom:'0.7rem' }}>
                      Disponible ahora
                    </span>
                  )}
                  <div className="fro-sm" style={{ marginBottom:'0.5rem', textTransform:'uppercase', letterSpacing:'0.1em', fontSize:'0.66rem' }}>{p.audiencia}</div>
                  <h3 className="fro-h3" style={{ marginBottom:'0.5rem', fontSize:'0.98rem' }}>{p.titulo}</h3>
                  <p className="fro-body" style={{ fontSize:'0.82rem', marginBottom:0 }}>{p.notaCard}</p>
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:'1rem' }}>
                    {p.tagHome ? <span className="fro-chip-outline">{p.tagHome}</span> : <span/>}
                    <span className="fro-card-cta" style={{ fontSize:'0.78rem', fontWeight:600 }}>Ver programa →</span>
                  </div>
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @media(max-width: 860px){ .transf-grid-empresas { grid-template-columns: 1fr !important; } }
        @media(max-width: 560px){ .empresas-cards-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}
