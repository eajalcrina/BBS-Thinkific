import FadeIn from '../FadeIn.jsx'

const modules = [
  { num: '01', question: '¿Qué problema quiero resolver?' },
  { num: '02', question: '¿Con qué tecnología se resuelve?' },
  { num: '03', question: '¿Cómo se convierte en negocio?' },
  { num: '04', question: '¿Cómo se financia?' },
]

function Connector() {
  return (
    <div aria-hidden style={{ display:'flex', flexDirection:'column', alignItems:'center', height:28 }}>
      <div style={{ width:1, height:'100%', background:'var(--fro-line-2)' }}/>
    </div>
  )
}

export default function SprintCamino() {
  return (
    <section id="camino" className="fro-sec" style={{ background:'var(--fro-bg)' }}>
      <div className="fro-wrap">

        <div style={{ textAlign:'center', marginBottom:'3rem' }}>
          <FadeIn>
            <div className="fro-eyebrow" style={{ marginBottom:'1rem', justifyContent:'center' }}>
              La lógica detrás del Sprint
            </div>
          </FadeIn>

          <FadeIn delay={0.06}>
            <h2 className="fro-h2" style={{ marginBottom:'1rem' }}>
              El Camino del <span className="fro-italic-amber">Fundador</span>
            </h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="fro-lead" style={{ maxWidth:620, margin:'0 auto' }}>
              Cada módulo responde una pregunta que el módulo anterior dejó abierta. Cada respuesta produce un entregable. Cada entregable es el insumo del módulo siguiente.
            </p>
          </FadeIn>
        </div>

        {/* Vertical diagram */}
        <div style={{ maxWidth:460, margin:'0 auto' }}>
          {modules.map((mod, i) => (
            <div key={mod.num}>
              <FadeIn delay={i * 0.08}>
                <div
                  className="fro-card"
                  style={{
                    borderLeft:'3px solid var(--fro-amber)',
                    padding:'1.1rem 1.3rem',
                    display:'flex',
                    gap:'0.9rem',
                    alignItems:'center',
                  }}
                >
                  <div style={{
                    width:34, height:34, minWidth:34, borderRadius:'50%',
                    background:'var(--fro-amber)', color:'var(--fro-bg)',
                    fontFamily:'var(--fsyne)', fontSize:'0.75rem', fontWeight:700,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    letterSpacing:'0.04em',
                  }}>
                    {mod.num}
                  </div>
                  <span style={{ fontFamily:'var(--fsyne)', fontWeight:500, fontSize:'0.98rem', color:'var(--fro-text)', lineHeight:1.35 }}>
                    {mod.question}
                  </span>
                </div>
              </FadeIn>

              {i < modules.length - 1 && <Connector />}
            </div>
          ))}

          {/* Connector + final card */}
          <Connector />

          <FadeIn delay={0.32}>
            <div
              style={{
                background:'var(--fro-amber)',
                color:'var(--fro-bg)',
                borderRadius:10,
                padding:'1.4rem 1.6rem',
                textAlign:'center',
                boxShadow:'0 10px 30px rgba(255,200,0,0.18)',
              }}
            >
              <div aria-hidden style={{ fontFamily:'var(--fsyne)', fontSize:'0.7rem', fontWeight:700, letterSpacing:'0.18em', textTransform:'uppercase', opacity:0.65, marginBottom:'0.4rem' }}>
                Tu entregable final
              </div>
              <div style={{ fontFamily:'var(--fsyne)', fontWeight:700, fontSize:'1.1rem', letterSpacing:'-0.01em', marginBottom:'0.35rem' }}>
                BIOTECH BUSINESS STARTER KIT
              </div>
              <p style={{ fontFamily:'var(--finter)', fontSize:'0.85rem', margin:0, lineHeight:1.55, opacity:0.78 }}>
                El esqueleto completo de tu biotech, construido semana a semana.
              </p>
            </div>
          </FadeIn>
        </div>

      </div>
    </section>
  )
}
