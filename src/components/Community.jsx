import { useState } from 'react'
import FadeIn from './FadeIn.jsx'

export default function Community() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [country, setCountry] = useState('')
  const [plan, setPlan] = useState('')
  const [err, setErr] = useState(false)
  const [done, setDone] = useState(false)

  const submit = () => {
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    if (!name || !ok) { setErr(true); return }
    setErr(false)
    setDone(true)
  }

  return (
    <section id="comunidad" className="section tight">
      <div className="wrap">
        <FadeIn><div className="eyebrow" style={{ marginBottom: '0.6rem' }}>Comunidad</div></FadeIn>
        <FadeIn delay={0.08}>
          <h2 className="t-display t-md" style={{ marginBottom: '0.8rem' }}>
            Únete a los <em className="t-em">Biobuilders</em>
          </h2>
        </FadeIn>
        <FadeIn delay={0.14}>
          <p className="lead" style={{ maxWidth: 540, marginBottom: '2rem' }}>
            La membresía Starter es <strong style={{ color: 'var(--lime)' }}>gratuita</strong>. Forma parte de la red de bio-builders de América Latina y accede a inteligencia, comunidad y recursos para construir bionegocios que no fallan.
          </p>
        </FadeIn>

        <FadeIn delay={0.18}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', border: '1px solid var(--line2)', borderRadius: 8, overflow: 'hidden' }} className="comm-grid">
            {/* left: plans */}
            <div style={{ padding: '2.5rem 2.2rem', background: 'var(--bg2)', borderRight: '1px solid var(--line)', display: 'flex', flexDirection: 'column', gap: 0 }}>
              <div className="eyebrow muted" style={{ marginBottom: '0.7rem' }}>Planes de membresía</div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.2rem' }}>
                {/* Starter */}
                <div style={{ background: 'var(--bg3)', border: '1px solid var(--line2)', borderRadius: 5, padding: '1.1rem 1.2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                      <span style={{ fontFamily: 'var(--fd)', fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>Starter</span>
                      <span className="tag tag-lime" style={{ fontSize: '0.58rem' }}>Gratis</span>
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-mid)', lineHeight: 1.42 }}>Para profesionales que inician. Clínicas mensuales, Radar de fondos, BBS Library y pitch feedback.</div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontFamily: 'var(--fd)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--lime)', lineHeight: 1 }}>$0</div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-lo)', marginTop: '0.15rem' }}>/mes</div>
                  </div>
                </div>
                {/* PRO */}
                <div style={{ background: 'rgba(197,252,0,0.04)', border: '1px solid rgba(197,252,0,0.22)', borderRadius: 5, padding: '1.1rem 1.2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                  <div>
                    <div style={{ fontFamily: 'var(--fd)', fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '0.3rem' }}>PRO</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-mid)', lineHeight: 1.42 }}>Para fundadores en operación. 4h/mes consultoría 1:1, Investment Matchmaking, Masterclasses avanzadas, podcast privado.</div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontFamily: 'var(--fd)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--lime)', lineHeight: 1 }}>$87</div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-lo)', marginTop: '0.15rem' }}>/mes</div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', background: 'var(--lime-10)', border: '1px solid var(--lime-20)', borderRadius: 4, padding: '0.75rem 1rem', fontSize: '0.8rem', lineHeight: 1.55, color: 'var(--text-mid)' }}>
                <span style={{ color: 'var(--lime)', flexShrink: 0, fontWeight: 700 }}>→</span>
                Todo suscriptor al curso Biotech Sprint 01 se integra automáticamente a la comunidad Starter, sin costo adicional.
              </div>
            </div>

            {/* right: form */}
            <div style={{ padding: '2.5rem 2.2rem', background: 'var(--bg3)', display: 'flex', flexDirection: 'column' }}>
              {!done ? (
                <>
                  <div style={{ fontFamily: 'var(--fd)', fontSize: '1.15rem', fontWeight: 700, color: '#fff', marginBottom: '0.25rem' }}>Regístrate gratis</div>
                  <p className="small" style={{ marginBottom: '1.1rem', color: 'var(--text-mid)' }}>Empieza con la membresía Starter sin costo. Te contactamos con los accesos.</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                    {[
                      { id: 'name', val: name, set: setName, ph: 'Nombre completo', type: 'text' },
                      { id: 'email', val: email, set: setEmail, ph: 'Correo electrónico', type: 'email', isErr: err },
                      { id: 'country', val: country, set: setCountry, ph: 'País', type: 'text' },
                    ].map(f => (
                      <input key={f.id} type={f.type} value={f.val} onChange={e => { f.set(e.target.value); if (f.isErr) setErr(false) }} placeholder={f.ph}
                        style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${f.isErr ? 'rgba(243,39,105,0.55)' : 'var(--line2)'}`, borderRadius: 3, color: '#fff', fontFamily: 'var(--fb)', fontSize: '0.88rem', padding: '0.75rem 1rem', width: '100%', outline: 'none', transition: 'border-color 0.18s' }}
                      />
                    ))}
                    <select value={plan} onChange={e => setPlan(e.target.value)}
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--line2)', borderRadius: 3, color: plan ? '#fff' : 'rgba(255,255,255,0.4)', fontFamily: 'var(--fb)', fontSize: '0.88rem', padding: '0.75rem 1rem', width: '100%', outline: 'none', WebkitAppearance: 'none' }}>
                      <option value="" disabled>¿Qué te interesa?</option>
                      <option value="starter">Membresía Starter (gratis)</option>
                      <option value="pro">Membresía PRO — $87/mes</option>
                      <option value="curso">Curso Biotech Sprint 01</option>
                      <option value="todo">Todo lo anterior</option>
                    </select>
                    <button className="btn btn-lime btn-full" style={{ padding: '0.9rem', fontSize: '0.95rem', borderRadius: 3 }} onClick={submit}>
                      Unirme a los Biobuilders →
                    </button>
                    <p style={{ textAlign: 'center', fontSize: '0.7rem', color: 'var(--text-lo)' }}>Sin spam. Sin tarjeta. Solo bionegocios.</p>
                  </div>
                </>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '2rem 1rem', gap: '0.7rem' }}>
                  <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--lime-10)', border: '2px solid var(--lime)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', color: 'var(--lime)' }}>✓</div>
                  <strong style={{ fontFamily: 'var(--fd)', fontSize: '1.1rem', color: '#fff', letterSpacing: '0.04em' }}>¡Bienvenido/a a los Biobuilders!</strong>
                  <p style={{ fontSize: '0.84rem', color: 'var(--text-mid)', lineHeight: 1.6 }}>Recibimos tus datos. En las próximas 48h te enviamos tus accesos a la comunidad Starter.</p>
                </div>
              )}
            </div>
          </div>
        </FadeIn>
      </div>
      <style>{`@media (max-width: 860px) { .comm-grid { grid-template-columns: 1fr !important; } .comm-grid > div:first-child { border-right: none !important; border-bottom: 1px solid var(--line) !important; } }`}</style>
    </section>
  )
}
