import FadeIn from './FadeIn.jsx'
import { trackOutbound } from '../lib/analytics.js'

const FOUNDERS = [
  { name: 'Eddie Ajalcriña', role: 'CEO & Co-Fundador', photo: '/eddie.jpg', linkedin: 'https://www.linkedin.com/in/eddieajalcrina/' },
  { name: 'Lorenzo Ortiz', role: 'COO & Co-Fundador', photo: '/lorenzo.jpg', linkedin: 'https://www.linkedin.com/in/lorenzoortiz/' },
]

export default function RespaldoInstitucional() {
  return (
    <section id="respaldo" className="fro-sec-t" style={{ background:'var(--fro-bg)' }}>
      <div className="fro-wrap">
        <FadeIn><div className="fro-eyebrow amber" style={{ marginBottom:'1.2rem' }}>Quién está detrás</div></FadeIn>
        <FadeIn delay={0.08}>
          <p className="fro-lead" style={{ maxWidth:820, marginBottom:'2.4rem' }}>
            Bio Business School nace de Redesign Lab, la empresa que fundamos y desde la cual hemos desarrollado distintas iniciativas de transformación económica en la región. Antes de este proyecto, hemos ayudado a diseñar y ejecutar programas de formación para instituciones como MIT Professional Education, la Universidad de Chicago, CATIE e INCAE. Somos Claude Network Partners, porque creemos que la inteligencia artificial es indispensable para este proceso. Y seguimos sumando alianzas que refuercen la misma tesis.
          </p>
        </FadeIn>

        <FadeIn delay={0.16}>
          <div style={{ display:'flex', gap:'2.2rem', flexWrap:'wrap' }}>
            {FOUNDERS.map(f => (
              <a
                key={f.name}
                href={f.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackOutbound(f.linkedin, f.name)}
                style={{ display:'flex', alignItems:'center', gap:'0.9rem', textDecoration:'none' }}
              >
                <img
                  src={f.photo}
                  alt={f.name}
                  width="56"
                  height="56"
                  style={{ width:56, height:56, borderRadius:'50%', objectFit:'cover', border:'1px solid var(--fro-line-2)', flexShrink:0 }}
                />
                <div>
                  <div style={{ fontFamily:'var(--fsyne)', fontWeight:700, fontSize:'0.95rem', color:'var(--fro-text)' }}>{f.name}</div>
                  <div className="fro-sm" style={{ marginBottom:'0.15rem' }}>{f.role}</div>
                  <span style={{ fontSize:'0.76rem', fontWeight:600, color:'var(--fro-amber)' }}>LinkedIn →</span>
                </div>
              </a>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
