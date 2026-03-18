import FadeIn from './FadeIn.jsx'

const comparisons = [
  ['Maximiza retorno financiero a corto plazo', 'Diseña rentabilidad que regenera territorio'],
  ['Extrae valor de los ecosistemas', 'Construye valor desde la biodiversidad'],
  ['Desconoce la biología molecular y el territorio', 'Integra ciencia de frontera con visión financiera'],
  ['Capital que huye de la región', 'Capital que construye soberanía biotecnológica'],
  ['Perfil genérico, reemplazable', 'Perfil híbrido único en América Latina'],
  ['Modelos que deterioran la región', 'Bionegocios que auto-financian la regeneración'],
]

/* Orbit node positions (cx, cy, label lines, color) */
const nodes = [
  { cx: 190, cy: 52,  lines: ['BIO','ESTRATEGIA'], type: 'lime' },
  { cx: 320, cy: 108, lines: ['DEEP','TECH'],       type: 'lime' },
  { cx: 336, cy: 228, lines: ['FINANZAS','REGEN.'], type: 'lime' },
  { cx: 285, cy: 332, lines: ['GOBER-','NANZA'],    type: 'lime' },
  { cx: 94,  cy: 332, lines: ['MARCAS','REGEN.'],   type: 'rose' },
  { cx: 44,  cy: 228, lines: ['BIO-','DIVERS.'],    type: 'rose' },
  { cx: 60,  cy: 108, lines: ['CONOC.','TERRIT.'],  type: 'rose' },
]

export default function BioBuilder() {
  return (
    <section id="biobuilder" className="section">
      <div className="wrap">
        <FadeIn><div className="eyebrow" style={{ marginBottom: '0.75rem' }}>La solución</div></FadeIn>
        <FadeIn delay={0.08}>
          <h2 className="t-display t-lg" style={{ marginBottom: '0.9rem' }}>
            Formamos <em className="t-em">BioBuilders</em>,<br />no MBAs
          </h2>
        </FadeIn>
        <FadeIn delay={0.14}>
          <p className="lead" style={{ maxWidth: 580, marginBottom: '2.8rem' }}>
            El BioBuilder es un líder híbrido: domina la ciencia, la tecnología y las finanzas de impacto. El perfil que América Latina necesita para transformar su abundancia biológica en economía real.
          </p>
        </FadeIn>

        <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: '3.5rem', alignItems: 'start' }} className="bb-grid">
          {/* SVG diagram */}
          <FadeIn delay={0.1}>
            <svg viewBox="0 0 380 410" xmlns="http://www.w3.org/2000/svg" width="100%" style={{ overflow: 'visible' }}>
              <defs>
                <radialGradient id="gc" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#C5FC00" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#C5FC00" stopOpacity="0" />
                </radialGradient>
                <filter id="glow-lime">
                  <feGaussianBlur stdDeviation="2.5" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <filter id="glow-rose">
                  <feGaussianBlur stdDeviation="2.5" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>

              {/* Rotating outer ring */}
              <g className="orbit-outer">
                <circle cx="190" cy="195" r="148" fill="none" stroke="rgba(197,252,0,0.07)" strokeWidth="1" strokeDasharray="4 8" />
              </g>
              {/* Counter-rotating inner ring */}
              <g className="orbit-inner">
                <circle cx="190" cy="195" r="90" fill="none" stroke="rgba(197,252,0,0.12)" strokeWidth="1" strokeDasharray="2 6" />
              </g>

              {/* Connector lines */}
              {nodes.map((n, i) => (
                <line key={i} x1="190" y1="195" x2={n.cx} y2={n.cy}
                  stroke={n.type === 'lime' ? 'rgba(197,252,0,0.15)' : 'rgba(243,39,105,0.15)'}
                  strokeWidth="1"
                  strokeDasharray="3 5"
                />
              ))}

              {/* Center glow */}
              <circle cx="190" cy="195" r="70" fill="url(#gc)" className="center-glow" />

              {/* CENTER node */}
              <circle cx="190" cy="195" r="58" fill="#0E0E18" stroke="#C5FC00" strokeWidth="1.8" filter="url(#glow-lime)" />
              <text x="190" y="186" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="700" fontSize="14" fill="#C5FC00" letterSpacing="1.5">BIO</text>
              <text x="190" y="202" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="700" fontSize="14" fill="#C5FC00" letterSpacing="1.5">BUILDER</text>
              <text x="190" y="217" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="500" fontSize="9" fill="rgba(255,255,255,0.5)" letterSpacing="1">LÍDER HÍBRIDO</text>

              {/* Orbit nodes */}
              {nodes.map((n, i) => {
                const isLime = n.type === 'lime'
                const stroke = isLime ? 'rgba(197,252,0,0.45)' : 'rgba(243,39,105,0.5)'
                const fill   = isLime ? '#C5FC00' : '#f32769'
                const glow   = isLime ? 'url(#glow-lime)' : 'url(#glow-rose)'
                const delay  = `${i * 0.4}s`
                return (
                  <g key={i} className={`node-${n.type}`}>
                    <circle cx={n.cx} cy={n.cy} r="28" fill="#0E0E18" stroke={stroke} strokeWidth="1.2" filter={glow}
                      style={{ animationDelay: delay }} />
                    {n.lines.map((line, li) => (
                      <text key={li} x={n.cx} y={n.cy - 5 + li * 12}
                        textAnchor="middle"
                        fontFamily="Barlow Condensed,sans-serif"
                        fontWeight="700"
                        fontSize="8.5"
                        fill={fill}
                        letterSpacing="0.5"
                      >{line}</text>
                    ))}
                  </g>
                )
              })}

              {/* Legend */}
              <rect x="90" y="384" width="9" height="9" rx="1.5" fill="rgba(197,252,0,0.4)" />
              <text x="103" y="392" fontFamily="Barlow Condensed,sans-serif" fontSize="9.5" fill="rgba(255,255,255,0.5)">Capacidades BioBuilder</text>
              <rect x="224" y="384" width="9" height="9" rx="1.5" fill="rgba(243,39,105,0.45)" />
              <text x="237" y="392" fontFamily="Barlow Condensed,sans-serif" fontSize="9.5" fill="rgba(255,255,255,0.5)">Conservación territorial</text>
            </svg>
          </FadeIn>

          {/* Compare table */}
          <FadeIn delay={0.2}>
            <div style={{ border: '1px solid var(--line2)', borderRadius: 6, overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'var(--line)' }}>
                <div style={{ padding: '0.85rem 1.1rem', fontFamily: 'var(--fd)', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', background: 'var(--bg2)', color: 'var(--text-lo)' }}>MBA Tradicional</div>
                <div style={{ padding: '0.85rem 1.1rem', fontFamily: 'var(--fd)', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', background: 'rgba(197,252,0,0.07)', color: 'var(--lime)' }}>BioBuilder BBS</div>
              </div>
              {comparisons.map(([mba, bb], i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'var(--line)', borderTop: '1px solid var(--line)' }}>
                  <div style={{ padding: '0.82rem 1.1rem', fontSize: '0.83rem', lineHeight: 1.52, color: 'var(--text-lo)', background: 'var(--bg2)', display: 'flex', alignItems: 'flex-start', gap: '0.4rem' }}>
                    <span style={{ color: 'rgba(255,255,255,0.25)', flexShrink: 0 }}>—</span>{mba}
                  </div>
                  <div style={{ padding: '0.82rem 1.1rem', fontSize: '0.83rem', lineHeight: 1.52, color: 'var(--text-mid)', background: 'rgba(197,252,0,0.03)', display: 'flex', alignItems: 'flex-start', gap: '0.4rem' }}>
                    <span style={{ color: 'var(--lime)', fontWeight: 700, flexShrink: 0 }}>→</span>{bb}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
      <style>{`@media (max-width: 860px) { .bb-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  )
}
