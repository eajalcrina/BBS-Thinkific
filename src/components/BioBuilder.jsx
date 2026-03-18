import FadeIn from './FadeIn.jsx'
import { motion } from 'framer-motion'

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
    <section id="biobuilder" className="sec" style={{ background:'var(--cream)', position:'relative', overflow:'hidden' }}>
      {/* Lime blob */}
      <div style={{ position:'absolute', top:'-10%', right:'-5%', width:500, height:500, borderRadius:'50%',
        background:'radial-gradient(circle, rgba(193,244,0,0.3) 0%, transparent 65%)', pointerEvents:'none' }}/>
      <div style={{ position:'absolute', bottom:'0', left:'-5%', width:300, height:300, borderRadius:'50%',
        background:'radial-gradient(circle, rgba(243,39,105,0.1) 0%, transparent 65%)', pointerEvents:'none' }}/>

      <div className="wrap" style={{ position:'relative' }}>
        <FadeIn><div className="label" style={{ marginBottom:'1rem' }}>La solución</div></FadeIn>
        <FadeIn delay={0.08}>
          <h2 className="t-out t-lg" style={{ marginBottom:'0.9rem', color:'var(--dark)' }}>
            Formamos <em style={{ fontStyle:'normal', color:'var(--rose)', fontWeight:700 }}>BioBuilders</em>, no MBAs
          </h2>
        </FadeIn>
        <FadeIn delay={0.14}>
          <p className="lead" style={{ color:'var(--t-dark2)', maxWidth:580, marginBottom:'3rem' }}>
            El BioBuilder es un líder híbrido: domina la ciencia, la tecnología y las finanzas de impacto. El perfil que América Latina necesita para transformar su abundancia biológica en economía real.
          </p>
        </FadeIn>

        <div style={{ display:'grid', gridTemplateColumns:'400px 1fr', gap:'3.5rem', alignItems:'start' }} className="bb-grid">
          <FadeIn delay={0.1}>
            <svg viewBox="0 0 420 425" xmlns="http://www.w3.org/2000/svg" width="100%" style={{ overflow:'visible' }}>
              <defs>
                <radialGradient id="gCl" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#C1F400" stopOpacity="0.3"/><stop offset="100%" stopColor="#C1F400" stopOpacity="0"/></radialGradient>
                <filter id="fl4"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                <filter id="fr4"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
              </defs>
              <g className="ring-cw" style={{ transformOrigin:'210px 210px' }}>
                <circle cx="210" cy="210" r="152" fill="none" stroke="rgba(14,14,14,0.1)" strokeWidth="1.5" strokeDasharray="5 9"/>
              </g>
              <g className="ring-ccw" style={{ transformOrigin:'210px 210px' }}>
                <circle cx="210" cy="210" r="95" fill="none" stroke="rgba(14,14,14,0.15)" strokeWidth="1.5" strokeDasharray="2 7"/>
              </g>
              {NODES.map((n,i)=>(
                <line key={i} x1="210" y1="210" x2={n.cx} y2={n.cy}
                  stroke={n.type==='lime'?'rgba(14,14,14,0.12)':'rgba(243,39,105,0.2)'}
                  strokeWidth="1.2" strokeDasharray="3 6"/>
              ))}
              <circle cx="210" cy="210" r="72" fill="url(#gCl)" className="gpulse"/>
              <circle cx="210" cy="210" r="60" fill="var(--lime)" stroke="var(--dark)" strokeWidth="2" filter="url(#fl4)"/>
              <text x="210" y="200" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="700" fontSize="15" fill="var(--dark)" letterSpacing="2">BIO</text>
              <text x="210" y="218" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="700" fontSize="15" fill="var(--dark)" letterSpacing="2">BUILDER</text>
              <text x="210" y="234" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="400" fontSize="8.5" fill="rgba(14,14,14,0.55)" letterSpacing="1">LÍDER HÍBRIDO</text>
              {NODES.map((n,i)=>{
                const isL=n.type==='lime'
                const nodeFill=isL?'var(--lime)':'var(--rose)'
                const nodeStroke=isL?'var(--dark)':'var(--white)'
                const textFill=isL?'var(--dark)':'var(--white)'
                const gf=isL?'url(#fl4)':'url(#fr4)'
                return (
                  <g key={i} className="npulse" style={{ animationDelay:`${i*0.4}s`, transformOrigin:`${n.cx}px ${n.cy}px` }}>
                    <circle cx={n.cx} cy={n.cy} r="30" fill={nodeFill} stroke={nodeStroke} strokeWidth="1.5" filter={gf}/>
                    {n.lines.map((line,li)=>(
                      <text key={li} x={n.cx} y={n.cy - 5 + li*13}
                        textAnchor="middle" fontFamily="Barlow Condensed,sans-serif"
                        fontWeight="700" fontSize="9.5" fill={textFill} letterSpacing="0.8"
                      >{line}</text>
                    ))}
                  </g>
                )
              })}
              <rect x="100" y="400" width="9" height="9" rx="2" fill="var(--lime)" stroke="var(--dark)" strokeWidth="1"/>
              <text x="114" y="408" fontFamily="Barlow Condensed,sans-serif" fontSize="9.5" fill="var(--t-dark2)">Capacidades BioBuilder</text>
              <rect x="248" y="400" width="9" height="9" rx="2" fill="var(--rose)"/>
              <text x="262" y="408" fontFamily="Barlow Condensed,sans-serif" fontSize="9.5" fill="var(--t-dark2)">Conservación territorial</text>
            </svg>
          </FadeIn>

          <FadeIn delay={0.18}>
            <div style={{ background:'var(--white)', borderRadius:16, overflow:'hidden', border:'1px solid rgba(14,14,14,0.08)', boxShadow:'0 4px 32px rgba(14,14,14,0.08)' }}>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', background:'var(--cream)' }}>
                <div style={{ padding:'0.85rem 1.1rem', fontFamily:'var(--fbc)', fontSize:'0.78rem', fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--t-dark3)', borderRight:'1px solid rgba(14,14,14,0.08)' }}>MBA Tradicional</div>
                <div style={{ padding:'0.85rem 1.1rem', fontFamily:'var(--fbc)', fontSize:'0.78rem', fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--rose)' }}>BioBuilder BBS</div>
              </div>
              {compare.map(([mba,bb],i)=>(
                <div key={i} style={{ display:'grid', gridTemplateColumns:'1fr 1fr', borderTop:'1px solid rgba(14,14,14,0.06)' }}>
                  <div style={{ padding:'0.82rem 1.1rem', fontSize:'0.83rem', lineHeight:1.52, color:'var(--t-dark3)', display:'flex', alignItems:'flex-start', gap:'0.4rem', borderRight:'1px solid rgba(14,14,14,0.06)' }}>
                    <span style={{ color:'rgba(14,14,14,0.25)', flexShrink:0 }}>—</span>{mba}
                  </div>
                  <div style={{ padding:'0.82rem 1.1rem', fontSize:'0.83rem', lineHeight:1.52, color:'var(--t-dark)', background:i%2===0?'rgba(193,244,0,0.04)':'rgba(193,244,0,0.02)', display:'flex', alignItems:'flex-start', gap:'0.4rem' }}>
                    <span style={{ color:'var(--rose)', fontWeight:700, flexShrink:0 }}>→</span>{bb}
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
