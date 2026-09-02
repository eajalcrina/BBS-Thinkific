import FadeIn from './FadeIn.jsx'
import { trackCta } from '../lib/analytics.js'
import { PROGRAMAS } from '../data/programas.js'

const SLUGS = ['ia-nuevos-profesionales', 'ia-profesionales-senior']
const PROGRAMAS_PROFESIONALES = SLUGS.map(slug => PROGRAMAS.find(p => p.slug === slug))

export default function TransformamosProfesionales() {
  return (
    <section id="profesionales" className="fro-sec fro-bg-white fro-on-light">
      <div className="fro-wrap">
        <FadeIn><div className="fro-eyebrow" style={{ marginBottom:'1.2rem' }}>Para personas</div></FadeIn>
        <FadeIn delay={0.06}>
          <h2 className="fro-h2" style={{ marginBottom:'1rem', maxWidth:640 }}>Transformamos profesionales</h2>
        </FadeIn>
        <FadeIn delay={0.12}>
          <p className="fro-lead" style={{ maxWidth:680, marginBottom:'3rem' }}>
            El criterio y la experiencia siguen siendo la ventaja que ninguna IA puede reemplazar. El riesgo no es usarla, es no saber dominarla.
          </p>
        </FadeIn>

        <div className="transf-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.6rem', alignItems:'start' }}>
          <FadeIn delay={0.16}>
            <a
              href="/diagnostico/profesionales"
              onClick={() => trackCta('diagnostico_profesionales', 'home_transformamos_profesionales', '/diagnostico/profesionales')}
              className="fro-card"
              style={{ display:'block', padding:'2rem', height:'100%', textDecoration:'none' }}
            >
              <h3 className="fro-h3" style={{ marginBottom:'0.9rem' }}>¿Dominas la IA, o la IA te está dominando a ti?</h3>
              <p className="fro-body" style={{ marginBottom:'1.4rem' }}>
                Antes de elegir un programa, descubre en qué nivel estás — una evaluación real, no un quiz de tres preguntas.
              </p>
              <span className="fro-mark-amber fro-card-cta" style={{ fontSize:'0.88rem', fontWeight:700 }}>Haz tu autodiagnóstico →</span>
            </a>
          </FadeIn>

          <div style={{ display:'flex', flexDirection:'column', gap:'1.2rem' }}>
            {PROGRAMAS_PROFESIONALES.map((p, i) => (
              <FadeIn key={p.slug} delay={0.22 + i*0.06}>
                <a
                  href={`/programas/${p.slug}`}
                  onClick={() => trackCta(`programa_${p.slug}`, 'home_transformamos_profesionales', `/programas/${p.slug}`)}
                  className={p.status === 'live' ? 'fro-card fro-card-live' : 'fro-card'}
                  style={{ display:'flex', flexDirection:'column', padding:'1.4rem', textDecoration:'none' }}
                >
                  {p.status === 'live' && (
                    <span style={{ alignSelf:'flex-start', background:'#0A0A0A', color:'var(--fro-amber)', fontSize:'0.6rem', fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', padding:'0.28rem 0.6rem', borderRadius:20, marginBottom:'0.8rem' }}>
                      Disponible ahora
                    </span>
                  )}
                  <div className="fro-sm" style={{ marginBottom:'0.6rem', textTransform:'uppercase', letterSpacing:'0.1em', fontSize:'0.68rem' }}>{p.audiencia}</div>
                  <h3 className="fro-h3" style={{ marginBottom:'0.6rem', fontSize:'1.05rem' }}>{p.titulo}</h3>
                  <p className="fro-body" style={{ fontSize:'0.86rem', marginBottom:0 }}>{p.notaCard}</p>
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:'1.2rem' }}>
                    {p.tagHome ? <span className="fro-chip-outline">{p.tagHome}</span> : <span/>}
                    <span className="fro-card-cta" style={{ fontSize:'0.82rem', fontWeight:600 }}>Ver programa →</span>
                  </div>
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
      <style>{`@media(max-width: 860px){ .transf-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  )
}
