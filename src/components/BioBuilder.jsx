import FadeIn from './FadeIn.jsx'

const compare = [
  ['Maximiza retorno financiero a corto plazo','Diseña rentabilidad que regenera territorio'],
  ['Extrae valor de los ecosistemas','Construye valor desde la biodiversidad'],
  ['Desconoce la biología molecular y el territorio','Integra ciencia de frontera con visión financiera'],
  ['Capital que huye de la región','Capital que construye soberanía biotecnológica'],
  ['Perfil genérico, reemplazable','Perfil híbrido único en América Latina'],
  ['Modelos que deterioran la región','Bionegocios que auto-financian la regeneración'],
]

const NODES = [
  { cx:210, cy:60,  lines:['BIO','ESTRATEGIA'], type:'lime' },
  { cx:340, cy:115, lines:['DEEP','TECH'],       type:'lime' },
  { cx:355, cy:240, lines:['FINANZAS','REGEN.'], type:'lime' },
  { cx:300, cy:348, lines:['GOBER-','NANZA'],    type:'lime' },
  { cx:118, cy:348, lines:['MARCAS','REGEN.'],   type:'rose' },
  { cx:62,  cy:240, lines:['BIO-','DIVERS.'],    type:'rose' },
  { cx:78,  cy:115, lines:['CONOC.','TERRIT.'],  type:'rose' },
]

export default function BioBuilder() {
  return (
    <section id="biobuilder" className="section">
      <div className="container">
        <FadeIn><div className="label" style={{marginBottom:'1rem'}}>La solución</div></FadeIn>
        <FadeIn delay={0.08}>
          <h2 className="t-display t-lg" style={{marginBottom:'0.9rem'}}>
            Formamos <span className="hl">BioBuilders</span>,<br/>no MBAs
          </h2>
        </FadeIn>
        <FadeIn delay={0.14}>
          <p className="body-l" style={{maxWidth:580, marginBottom:'3rem'}}>
            El BioBuilder es un líder híbrido: domina la ciencia, la tecnología y las finanzas de impacto. El perfil que América Latina necesita para transformar su abundancia biológica en economía real.
          </p>
        </FadeIn>

        <div style={{display:'grid', gridTemplateColumns:'400px 1fr', gap:'3.5rem', alignItems:'start'}} className="bb-grid">
          {/* SVG Diagram */}
          <FadeIn delay={0.1}>
            <svg viewBox="0 0 420 420" xmlns="http://www.w3.org/2000/svg" width="100%" style={{overflow:'visible'}}>
              <defs>
                <radialGradient id="gC" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#BBEE00" stopOpacity="0.18"/>
                  <stop offset="100%" stopColor="#BBEE00" stopOpacity="0"/>
                </radialGradient>
                <filter id="fl"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                <filter id="fr"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
              </defs>

              {/* Rotating rings */}
              <g className="ring-cw">
                <circle cx="210" cy="210" r="152" fill="none" stroke="rgba(187,238,0,0.06)" strokeWidth="1" strokeDasharray="5 9"/>
              </g>
              <g className="ring-ccw">
                <circle cx="210" cy="210" r="95" fill="none" stroke="rgba(187,238,0,0.11)" strokeWidth="1" strokeDasharray="2 7"/>
              </g>

              {/* Connector lines */}
              {NODES.map((n,i)=>(
                <line key={i} x1="210" y1="210" x2={n.cx} y2={n.cy}
                  stroke={n.type==='lime'?'rgba(187,238,0,0.12)':'rgba(243,39,105,0.12)'}
                  strokeWidth="1" strokeDasharray="3 6"/>
              ))}

              {/* Center glow */}
              <circle cx="210" cy="210" r="72" fill="url(#gC)" className="g-pulse"/>

              {/* Center circle */}
              <circle cx="210" cy="210" r="60" fill="#0C0C18" stroke="#BBEE00" strokeWidth="1.8" filter="url(#fl)"/>
              <text x="210" y="200" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="700" fontSize="15" fill="#BBEE00" letterSpacing="2">BIO</text>
              <text x="210" y="218" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="700" fontSize="15" fill="#BBEE00" letterSpacing="2">BUILDER</text>
              <text x="210" y="233" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="400" fontSize="8.5" fill="rgba(255,255,255,0.42)" letterSpacing="1">LÍDER HÍBRIDO</text>

              {/* Orbit nodes */}
              {NODES.map((n,i)=>{
                const isLime = n.type==='lime'
                const stroke = isLime ? 'rgba(187,238,0,0.45)' : 'rgba(243,39,105,0.5)'
                const fill   = isLime ? '#BBEE00' : '#F32769'
                const gf     = isLime ? 'url(#fl)' : 'url(#fr)'
                const animDelay = `${i*0.45}s`
                return (
                  <g key={i} className="n-pulse" style={{animationDelay:animDelay}}>
                    <circle cx={n.cx} cy={n.cy} r="29" fill="#0C0C18" stroke={stroke} strokeWidth="1.3" filter={gf}/>
                    {n.lines.map((line,li)=>(
                      <text key={li}
                        x={n.cx} y={n.cy - 4 + li * 13}
                        textAnchor="middle"
                        fontFamily="Barlow Condensed,sans-serif"
                        fontWeight="700" fontSize="9"
                        fill={fill} letterSpacing="0.8"
                      >{line}</text>
                    ))}
                  </g>
                )
              })}

              {/* Legend */}
              <rect x="108" y="398" width="9" height="9" rx="1.5" fill="rgba(187,238,0,0.4)"/>
              <text x="121" y="406" fontFamily="Barlow Condensed,sans-serif" fontSize="9.5" fill="rgba(255,255,255,0.4)">Capacidades BioBuilder</text>
              <rect x="238" y="398" width="9" height="9" rx="1.5" fill="rgba(243,39,105,0.45)"/>
              <text x="251" y="406" fontFamily="Barlow Condensed,sans-serif" fontSize="9.5" fill="rgba(255,255,255,0.4)">Conservación territorial</text>
            </svg>
          </FadeIn>

          {/* Compare table */}
          <FadeIn delay={0.18}>
            <div style={{border:'1px solid var(--border-2)', borderRadius:6, overflow:'hidden'}}>
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:1, background:'var(--border)'}}>
                <div style={{padding:'0.85rem 1.1rem', fontFamily:'var(--fd)', fontSize:'0.78rem', fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase', background:'var(--bg-2)', color:'var(--text-3)'}}>MBA Tradicional</div>
                <div style={{padding:'0.85rem 1.1rem', fontFamily:'var(--fd)', fontSize:'0.78rem', fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase', background:'rgba(187,238,0,0.06)', color:'var(--lime)'}}>BioBuilder BBS</div>
              </div>
              {compare.map(([mba,bb],i)=>(
                <div key={i} style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:1, background:'var(--border)', borderTop:'1px solid var(--border)'}}>
                  <div style={{padding:'0.82rem 1.1rem', fontSize:'0.83rem', lineHeight:1.52, color:'var(--text-3)', background:'var(--bg-2)', display:'flex', alignItems:'flex-start', gap:'0.4rem'}}>
                    <span style={{color:'rgba(255,255,255,0.2)', flexShrink:0}}>—</span>{mba}
                  </div>
                  <div style={{padding:'0.82rem 1.1rem', fontSize:'0.83rem', lineHeight:1.52, color:'var(--text-2)', background:'rgba(187,238,0,0.025)', display:'flex', alignItems:'flex-start', gap:'0.4rem'}}>
                    <span style={{color:'var(--lime)', fontWeight:700, flexShrink:0}}>→</span>{bb}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
      <style>{`@media(max-width:860px){.bb-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  )
}
