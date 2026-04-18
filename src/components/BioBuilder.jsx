import FadeIn from './FadeIn.jsx'

const NODES = [
  { x:280, y:55,  label:['Bio Estrategia'],       anchor:'middle', tx:280, ty:14  },
  { x:428, y:123, label:['Deep Tech'],            anchor:'start',  tx:476, ty:118 },
  { x:465, y:287, label:['Finanzas','Regenerativas'], anchor:'start', tx:509, ty:283 },
  { x:371, y:417, label:['Gobernanza'],           anchor:'middle', tx:371, ty:462 },
  { x:189, y:417, label:['Branding','Regenerativo'], anchor:'middle', tx:189, ty:462 },
  { x:95,  y:287, label:['Biodiversidad'],        anchor:'end',    tx:46,  ty:283 },
  { x:132, y:123, label:['Conocimiento','Territorial'], anchor:'end', tx:84,  ty:118 },
]

const MBA_ROWS = [
  'Maximiza retorno financiero a corto plazo',
  'Extrae valor de los ecosistemas',
  'Desconoce la biología molecular y el territorio',
  'Capital que huye de la región',
  'Perfil genérico, reemplazable',
  'Modelos que deterioran la región',
]
const BBS_ROWS = [
  'Diseña rentabilidad que regenera territorio',
  'Construye valor desde la biodiversidad',
  'Integra ciencia de frontera con visión financiera',
  'Capital que construye soberanía biotecnológica',
  'Perfil híbrido único en América Latina',
  'Bionegocios que auto-financian la regeneración',
]

export default function BioBuilder() {
  return (
    <section id="biobuilder" className="fro-sec" style={{ background:'var(--fro-bg)' }}>
      <div className="fro-wrap">

        <FadeIn><div className="fro-eyebrow" style={{ marginBottom:'1.2rem' }}>La solución</div></FadeIn>

        <FadeIn delay={0.08}>
          <h2 className="fro-h2" style={{ marginBottom:'1rem' }}>
            Formamos <span className="fro-italic-amber">Bio/Builders</span>, no MBAs.
          </h2>
        </FadeIn>
        <FadeIn delay={0.14}>
          <p className="fro-lead" style={{ maxWidth:620, marginBottom:'3.5rem' }}>
            El Bio/Builder es un líder híbrido: domina la ciencia, la tecnología y las finanzas de impacto. El perfil que América Latina necesita para transformar su abundancia biológica en economía real.
          </p>
        </FadeIn>

        <div className="bb-grid" style={{ display:'grid', gridTemplateColumns:'460px 1fr', gap:'3rem', alignItems:'start' }}>

          <FadeIn delay={0.18}>
            <div className="fro-card" style={{ padding:'1.5rem', background:'var(--fro-bg-2)' }}>
              <svg viewBox="0 0 560 500" xmlns="http://www.w3.org/2000/svg" style={{ width:'100%', overflow:'visible' }} role="img" aria-label="Diagrama: Bio/Builder como convergencia de 7 disciplinas">
                <defs>
                  <marker id="bb-arr" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
                    <path d="M0,0 L7,3.5 L0,7 Z" fill="rgba(255,255,255,.45)"/>
                  </marker>
                </defs>

                <circle cx="280" cy="245" r="230" fill="none" stroke="rgba(255,255,255,.05)" strokeDasharray="2 8"/>
                <circle cx="280" cy="245" r="190" fill="none" stroke="rgba(255,255,255,.06)" strokeDasharray="2 6"/>

                {NODES.map((n,i) => (
                  <g key={i}>
                    {/* dashed connector to center */}
                    <line
                      x1={n.x + Math.cos(Math.atan2(245-n.y, 280-n.x))*26}
                      y1={n.y + Math.sin(Math.atan2(245-n.y, 280-n.x))*26}
                      x2={280 + Math.cos(Math.atan2(n.y-245, n.x-280))*84}
                      y2={245 + Math.sin(Math.atan2(n.y-245, n.x-280))*84}
                      stroke="rgba(255,255,255,.22)" strokeWidth="1" strokeDasharray="3 5"
                      markerEnd="url(#bb-arr)"
                    />
                    <circle cx={n.x} cy={n.y} r="32" fill="rgba(255,200,0,0.06)" stroke="rgba(255,200,0,0.25)" strokeDasharray="3 5"/>
                    <circle cx={n.x} cy={n.y} r="22" fill="var(--fro-amber)" stroke="rgba(0,0,0,0.3)" strokeWidth="1"/>
                    <circle cx={n.x+5} cy={n.y-4} r="3.5" fill="rgba(0,0,0,0.25)"/>
                    {n.label.map((ln,li) => (
                      <text key={li}
                        x={n.tx} y={n.ty + li*14}
                        textAnchor={n.anchor}
                        fontFamily="Inter, sans-serif" fontSize="12" fontWeight="500"
                        fill="rgba(255,255,255,0.75)">{ln}</text>
                    ))}
                  </g>
                ))}

                {/* center */}
                <circle cx="280" cy="245" r="96" fill="rgba(255,200,0,0.04)" stroke="rgba(255,200,0,0.22)" strokeDasharray="3 6"/>
                <circle cx="280" cy="245" r="74" fill="var(--fro-amber)"/>
                <text x="280" y="241" textAnchor="middle" fontFamily="Syne, sans-serif" fontWeight="700" fontSize="19" fill="#0A0A0A" letterSpacing="0">BIO<tspan fill="#0A0A0A" fontWeight="500">/</tspan>BUILDER</text>
                <text x="280" y="261" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="600" fontSize="9" fill="rgba(0,0,0,0.70)" letterSpacing="2.2">LÍDER HÍBRIDO</text>
              </svg>
            </div>
          </FadeIn>

          <FadeIn delay={0.24}>
            <div className="bb-compare" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.8rem' }}>
              {/* MBA */}
              <div className="fro-card" style={{ padding:0, overflow:'hidden', opacity:0.75 }}>
                <div style={{ padding:'0.9rem 1.1rem', borderBottom:'1px solid var(--fro-line)', display:'flex', alignItems:'center', gap:'0.55rem' }}>
                  <span aria-hidden style={{ width:10, height:10, borderRadius:'50%', background:'var(--fro-text-4)' }}/>
                  <span style={{ fontFamily:'var(--finter)', fontSize:'0.66rem', fontWeight:600, letterSpacing:'0.16em', textTransform:'uppercase', color:'var(--fro-text-3)' }}>MBA Tradicional</span>
                </div>
                <ul style={{ listStyle:'none' }}>
                  {MBA_ROWS.map((t,i,a) => (
                    <li key={i} style={{ padding:'0.75rem 1rem', borderBottom: i<a.length-1 ? '1px solid var(--fro-line)' : 'none', fontSize:'0.82rem', color:'var(--fro-text-3)', lineHeight:1.5 }}>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              {/* BBS */}
              <div className="fro-card" style={{ padding:0, overflow:'hidden', borderColor:'var(--fro-amber-25)' }}>
                <div style={{ padding:'0.9rem 1.1rem', borderBottom:'1px solid var(--fro-amber-25)', display:'flex', alignItems:'center', gap:'0.55rem', background:'var(--fro-amber-08)' }}>
                  <span aria-hidden style={{ width:10, height:10, borderRadius:'50%', background:'var(--fro-amber)' }}/>
                  <span style={{ fontFamily:'var(--finter)', fontSize:'0.66rem', fontWeight:700, letterSpacing:'0.16em', textTransform:'uppercase', color:'var(--fro-amber)' }}>BIO<span style={{ color:'var(--fro-text)', fontWeight:500, margin:'0 0.1em' }}>/</span>BUILDER</span>
                </div>
                <ul style={{ listStyle:'none' }}>
                  {BBS_ROWS.map((t,i,a) => (
                    <li key={i} style={{ padding:'0.75rem 1rem', borderBottom: i<a.length-1 ? '1px solid var(--fro-line)' : 'none', fontSize:'0.85rem', color:'var(--fro-text)', lineHeight:1.5, fontWeight:500, display:'flex', gap:'0.55rem' }}>
                      <span aria-hidden style={{ color:'var(--fro-amber)', fontWeight:700 }}>—</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>

        </div>
      </div>

      <style>{`
        @media(max-width: 960px){
          .bb-grid { grid-template-columns: 1fr !important; }
          .bb-compare { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
