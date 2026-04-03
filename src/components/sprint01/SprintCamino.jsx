import FadeIn from '../FadeIn.jsx'

const modules = [
  { num: '01', question: '¿Qué problema quiero resolver?' },
  { num: '02', question: '¿Con qué tecnología se resuelve?' },
  { num: '03', question: '¿Cómo se convierte en negocio?' },
  { num: '04', question: '¿Cómo se financia?' },
]

function Connector() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: 2, height: 28, background: 'var(--rose)', opacity: 0.3 }} />
      <span style={{ color: 'var(--rose)', opacity: 0.5, fontSize: '0.8rem', lineHeight: 1 }}>↓</span>
    </div>
  )
}

export default function SprintCamino() {
  return (
    <section id="camino" style={{ background: 'var(--cream)', position: 'relative', paddingBottom: 60 }}>
      <div className="wrap sec">
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <FadeIn>
            <div className="label">La lógica detrás del Sprint</div>
          </FadeIn>

          <FadeIn delay={0.06}>
            <h2 style={{ fontFamily: 'var(--fout)', fontWeight: 300, fontSize: 'clamp(1.8rem,3vw,3rem)', color: 'var(--dark)', lineHeight: 1.15, marginBottom: '1rem' }}>
              El Camino del Fundador
            </h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p style={{ fontSize: '0.92rem', color: 'var(--t-dark2)', maxWidth: 620, lineHeight: 1.7, margin: '0 auto' }}>
              Cada módulo responde una pregunta que el módulo anterior dejó abierta. Cada respuesta produce un entregable. Cada entregable es el insumo del módulo siguiente.
            </p>
          </FadeIn>
        </div>

        {/* Vertical diagram */}
        <div style={{ maxWidth: 420, margin: '0 auto' }}>
          {modules.map((mod, i) => (
            <div key={mod.num}>
              <FadeIn delay={i * 0.08}>
                <div style={{
                  background: 'var(--white)',
                  borderRadius: 14,
                  borderLeft: '4px solid var(--rose)',
                  padding: '1.2rem 1.4rem',
                  display: 'flex',
                  gap: '0.8rem',
                  alignItems: 'center',
                  boxShadow: '0 4px 16px rgba(14,14,14,0.06)',
                }}>
                  <div style={{
                    width: 32,
                    height: 32,
                    minWidth: 32,
                    borderRadius: '50%',
                    background: 'var(--rose)',
                    color: 'var(--white)',
                    fontFamily: 'var(--fbc)',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    {mod.num}
                  </div>
                  <span style={{ fontFamily: 'var(--fout)', fontWeight: 500, fontSize: '0.95rem', color: 'var(--dark)' }}>
                    {mod.question}
                  </span>
                </div>
              </FadeIn>

              {i < modules.length - 1 && <Connector />}
            </div>
          ))}

          {/* Connector to final card */}
          <Connector />

          {/* Final card: Starter Kit */}
          <FadeIn delay={0.32}>
            <div style={{
              background: 'var(--lime)',
              borderRadius: 14,
              padding: '1.4rem 1.6rem',
              textAlign: 'center',
              boxShadow: '0 8px 24px rgba(193,244,0,0.3)',
            }}>
              <div style={{ fontSize: '1.4rem', marginBottom: '0.4rem' }}>🎯</div>
              <div style={{ fontFamily: 'var(--fbc)', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--dark)', marginBottom: '0.3rem' }}>
                BIOTECH BUSINESS STARTER KIT
              </div>
              <p style={{ fontFamily: 'var(--fdm)', fontSize: '0.82rem', color: 'rgba(14,14,14,0.65)', margin: 0, lineHeight: 1.5 }}>
                Tu entregable final: el esqueleto completo de tu biotech
              </p>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Bottom wave to white */}
      <div style={{ position: 'absolute', bottom: -1, left: 0, right: 0 }}>
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ width: '100%', height: 60, display: 'block' }}>
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="var(--white)" />
        </svg>
      </div>
    </section>
  )
}
