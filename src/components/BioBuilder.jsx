import FadeIn from './FadeIn.jsx'
import { motion } from 'framer-motion'
import { Halo, Cell, Membrane, Dot, ORBS_ROSE } from './CellSystem.jsx'

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

      {/* ── Halos ── */}
      <Halo bottom="-38%" right="-10%" size={255} fill="rgba(14,14,14,.025)"   stroke="rgba(14,14,14,.06)"    delay={1}/>
      <Halo top="-30%"   left="-6%"   size={165} fill="rgba(243,39,105,.02)"   stroke="rgba(243,39,105,.06)"  delay={4} ccw/>

      {/* ── Células ── */}
      <Cell top="5%"    right="3%"  size={118} mb="rgba(14,14,14,.03)"  mf="rgba(14,14,14,.11)"  spd="spin-cw 29s"   nb={27} nf="rgba(243,39,105,.50)" orbs={ORBS_ROSE()} delay={0}/>
      <Cell bottom="9%" left="3%"  size={72}  mb="rgba(14,14,14,.02)"  mf="rgba(14,14,14,.07)"  spd="spin-ccw 40s"  nb={17} nf="rgba(243,39,105,.40)" orbs={ORBS_ROSE()} delay={1.5}/>
      <Cell top="28%"   right="22%" size={50}  mb="rgba(14,14,14,.02)"  mf="rgba(14,14,14,.07)"  spd="spin-slow 50s" nb={12} nf="rgba(243,39,105,.34)" orbs={ORBS_ROSE()} delay={2.5}/>
      <Cell bottom="12%" right="16%" size={36} mb="rgba(14,14,14,.015)" mf="rgba(14,14,14,.06)"  spd="spin-cw 58s"   nb={8}  nf="rgba(243,39,105,.28)" orbs={ORBS_ROSE()} delay={3.5}/>

      {/* ── Membranas ── */}
      <Membrane top="52%"  left="36%"  size={28} mb="rgba(14,14,14,.015)" mf="rgba(14,14,14,.06)"  spd="spin-ccw 62s"  delay={2}/>
      <Membrane top="15%"  left="44%"  size={20} mb="rgba(243,39,105,.01)"mf="rgba(243,39,105,.07)" spd="spin-slow 70s" delay={5}/>

      {/* ── Puntos ── */}
      <Dot bottom="30%" left="12%"  size={10} fill="rgba(243,39,105,.46)" anim="float-y" delay={0.5}/>
      <Dot top="20%"    left="36%"  size={7}  fill="rgba(14,14,14,.18)"   anim="float-x" delay={2}/>
      <Dot bottom="18%" right="30%" size={6}  fill="rgba(243,39,105,.30)" anim="float-d" delay={3.5}/>

      <div className="wrap" style={{ position:'relative' }}>
        <FadeIn><div className="label" style={{ marginBottom:'1rem' }}>La solución</div></FadeIn>
        <FadeIn delay={0.08}><h2 className="t-out t-lg" style={{ marginBottom:'0.9rem', color:'var(--dark)' }}>Formamos <em style={{ fontStyle:'normal', color:'var(--rose)', fontWeight:700 }}>BioBuilders</em>, no MBAs</h2></FadeIn>
        <FadeIn delay={0.14}><p className="lead" style={{ color:'var(--t-dark2)', maxWidth:580, marginBottom:'3rem' }}>El BioBuilder es un líder híbrido: domina la ciencia, la tecnología y las finanzas de impacto. El perfil que América Latina necesita para transformar su abundancia biológica en economía real.</p></FadeIn>
        <div style={{ display:'grid', gridTemplateColumns:'400px 1fr', gap:'3.5rem', alignItems:'start' }} className="bb-grid">
          <FadeIn delay={0.1}>
            <svg viewBox="0 0 420 425" xmlns="http://www.w3.org/2000/svg" width="100%" style={{ overflow:'visible' }}>
              <defs>
                <radialGradient id="gCl" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#C1F400" stopOpacity="0.3"/><stop offset="100%" stopColor="#C1F400" stopOpacity="0"/></radialGradient>
                <filter id="fl4"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                <filter id="fr4"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
              </defs>
              <g className="ring-cw" style={{ transformOrigin:'210px 210px' }}><circle cx="210" cy="210" r="152" fill="none" stroke="rgba(14,14,14,0.1)" strokeWidth="1.5" strokeDasharray="5 9"/></g>
              <g className="ring-ccw" style={{ transformOrigin:'210px 210px' }}><circle cx="210" cy="210" r="95" fill="none" stroke="rgba(14,14,14,0.15)" strokeWidth="1.5" strokeDasharray="2 7"/></g>
              {NODES.map((n,i)=>(<line key={i} x1="210" y1="210" x2={n.cx} y2={n.cy} stroke={n.type==='lime'?'rgba(14,14,14,0.12)':'rgba(243,39,105,0.2)'} strokeWidth="1.2" strokeDasharray="3 6"/>))}
              <circle cx="210" cy="210" r="72" fill="url(#gCl)" className="gpulse"/>
              <circle cx="210" cy="210" r="60" fill="var(--lime)" stroke="var(--dark)" strokeWidth="2" filter="url(#fl4)"/>
              <text x="210" y="200" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="700" fontSize="15" fill="var(--dark)" letterSpacing="2">BIO</text>
              <text x="210" y="218" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="700" fontSize="15" fill="var(--dark)" letterSpacing="2">BUILDER</text>
              <text x="210" y="234" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="400" fontSize="8.5" fill="rgba(14,14,14,0.55)" letterSpacing="1">LÍDER HÍBRIDO</text>
              {NODES.map((n,i)=>{ const isL=n.type==='lime'; return (<g key={i} className="npulse" style={{ animationDelay:`${i*0.4}s`, transformOrigin:`${n.cx}px ${n.cy}px` }}><circle cx={n.cx} cy={n.cy} r="30" fill={isL?'var(--lime)':'var(--rose)'} stroke={isL?'var(--dark)':'var(--white)'} strokeWidth="1.5" filter={isL?'url(#fl4)':'url(#fr4)'}/>{n.lines.map((line,li)=>(<text key={li} x={n.cx} y={n.cy-5+li*13} textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="700" fontSize="9.5" fill={isL?'var(--dark)':'var(--white)'} letterSpacing="0.8">{line}</text>))}</g>) })}
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
              {compare.map(([mba,bb],i)=>(<div key={i} style={{ display:'grid', gridTemplateColumns:'1fr 1fr', borderTop:'1px solid rgba(14,14,14,0.06)' }}><div style={{ padding:'0.82rem 1.1rem', fontSize:'0.83rem', lineHeight:1.52, color:'var(--t-dark3)', display:'flex', alignItems:'flex-start', gap:'0.4rem', borderRight:'1px solid rgba(14,14,14,0.06)' }}><span style={{ color:'rgba(14,14,14,0.25)', flexShrink:0 }}>—</span>{mba}</div><div style={{ padding:'0.82rem 1.1rem', fontSize:'0.83rem', lineHeight:1.52, color:'var(--t-dark)', background:i%2===0?'rgba(193,244,0,0.04)':'rgba(193,244,0,0.02)', display:'flex', alignItems:'flex-start', gap:'0.4rem' }}><span style={{ color:'var(--rose)', fontWeight:700, flexShrink:0 }}>→</span>{bb}</div></div>))}
            </div>
          </FadeIn>
        </div>
      </div>

      <div style={{ position:'absolute', bottom:-1, left:0, right:0, zIndex:1 }}>
        <svg viewBox="0 0 1440 110" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ width:'100%', height:110, display:'block' }}>
          <path d="M0,82 C180,30 420,100 720,40 C1020,8 1260,85 1440,58 L1440,110 L0,110 Z" fill="rgba(243,39,105,0.22)"/>
          <path d="M0,92 C220,48 460,108 740,58 C1020,22 1260,95 1440,68 L1440,110 L0,110 Z" fill="var(--rose)"/>
        </svg>
      </div>
      <style>{`@media(max-width:860px){.bb-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  )
}
