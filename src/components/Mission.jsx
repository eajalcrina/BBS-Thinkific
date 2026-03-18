import { motion } from 'framer-motion'
import FadeIn from './FadeIn.jsx'

function VennDiagram() {
  const circles = [
    { cx:130, cy:150, label:['Conocimiento','territorial'] },
    { cx:220, cy:150, label:['Tecnología de','vanguardia'] },
    { cx:310, cy:150, label:['Inteligencia','de negocios'] },
  ]
  return (
    <div style={{ width:'100%', maxWidth:560, margin:'0 auto' }}>
      <svg viewBox="0 0 560 300" xmlns="http://www.w3.org/2000/svg" width="100%" style={{ overflow:'visible' }}>
        <defs>
          <radialGradient id="vcg1" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="rgba(200,240,0,0.14)"/><stop offset="100%" stopColor="rgba(200,240,0,0)"/></radialGradient>
          <radialGradient id="vcg2" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="rgba(200,240,0,0.10)"/><stop offset="100%" stopColor="rgba(200,240,0,0)"/></radialGradient>
          <radialGradient id="vcg3" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="rgba(200,240,0,0.14)"/><stop offset="100%" stopColor="rgba(200,240,0,0)"/></radialGradient>
          <filter id="vglow"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          <filter id="rglow"><feGaussianBlur stdDeviation="8" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>

        {circles.map((c,i) => (
          <motion.circle key={i} cx={c.cx} cy={c.cy} r={95}
            fill={`url(#vcg${i+1})`} stroke="rgba(200,240,0,0.3)" strokeWidth="1.2"
            initial={{ opacity:0, scale:0.75 }} whileInView={{ opacity:1, scale:1 }}
            viewport={{ once:true }} transition={{ duration:0.85, delay:i*0.15, ease:[0.22,1,0.36,1] }}
            style={{ transformOrigin:`${c.cx}px ${c.cy}px` }}
          />
        ))}

        {/* Labels */}
        {circles.map((c,i) => (
          <motion.g key={i} initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ duration:0.6, delay:0.4+i*0.1 }}>
            <text x={c.cx + (i===0?-40:i===2?40:0)} y={c.cy-6} textAnchor="middle" fontFamily="DM Sans,sans-serif" fontWeight="300" fontSize="11.5" fill="rgba(255,255,255,0.7)">{c.label[0]}</text>
            <text x={c.cx + (i===0?-40:i===2?40:0)} y={c.cy+10} textAnchor="middle" fontFamily="DM Sans,sans-serif" fontWeight="300" fontSize="11.5" fill="rgba(255,255,255,0.7)">{c.label[1]}</text>
          </motion.g>
        ))}

        {/* Equals */}
        <motion.g initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ duration:0.5, delay:0.7 }}>
          <line x1="418" y1="143" x2="438" y2="143" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
          <line x1="418" y1="157" x2="438" y2="157" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
        </motion.g>

        {/* Result circle */}
        <motion.circle cx="498" cy="150" r="48"
          fill="var(--rose)" filter="url(#rglow)"
          initial={{ opacity:0, scale:0 }} whileInView={{ opacity:1, scale:1 }}
          viewport={{ once:true }} transition={{ duration:0.8, delay:0.8, ease:[0.22,1,0.36,1] }}
          style={{ transformOrigin:'498px 150px' }}
        />
        <motion.g initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ duration:0.5, delay:1.1 }}>
          <text x="498" y="139" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="700" fontSize="10" fill="#C8F000" letterSpacing="0.8">PROTECCIÓN</text>
          <text x="498" y="152" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="700" fontSize="10" fill="#C8F000" letterSpacing="0.8">DE LA</text>
          <text x="498" y="165" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="700" fontSize="10" fill="#C8F000" letterSpacing="0.8">BIODIVERSIDAD</text>
        </motion.g>
      </svg>
    </div>
  )
}

export default function Mission() {
  return (
    <section id="mision" className="sec" style={{ position:'relative', overflow:'hidden' }}>
      {/* Gradient background for this section */}
      <div style={{ position:'absolute', inset:0,
        background:'linear-gradient(180deg, var(--bg) 0%, var(--bg2) 50%, var(--bg) 100%)',
        pointerEvents:'none' }}/>
      <div style={{ position:'absolute', top:'20%', right:'-5%', width:500, height:500, borderRadius:'50%',
        background:'radial-gradient(circle, rgba(200,240,0,0.05) 0%, transparent 70%)',
        filter:'blur(60px)', pointerEvents:'none' }}/>

      <div className="wrap" style={{ position:'relative' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'5rem', alignItems:'center' }} className="mission-grid">
          <div>
            <FadeIn>
              <span style={{ display:'inline-block', background:'var(--rose08)', border:'1px solid var(--rose20)', borderRadius:2, padding:'0.28rem 0.75rem', fontFamily:'var(--fbc)', fontSize:'0.68rem', fontWeight:600, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--rose)', marginBottom:'1.5rem' }}>
                Bio Business School (BBS)
              </span>
            </FadeIn>
            <FadeIn delay={0.08}>
              <p style={{ fontSize:'1.2rem', fontWeight:300, fontFamily:'var(--fout)', color:'var(--t2)', marginBottom:'1.5rem', lineHeight:1.6 }}>
                No es una institución educativa tradicional.
              </p>
            </FadeIn>
            <FadeIn delay={0.14}>
              <h2 className="t-out t-lg" style={{ marginBottom:'2rem' }}>
                Es una plataforma de inteligencia para bionegocios <span className="hl">rentables</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="lead" style={{ maxWidth:460 }}>
                Combinamos conocimiento territorial, tecnología de vanguardia e inteligencia de negocios para convertir la biodiversidad de la región en valor económico real — protegiendo los ecosistemas en el proceso.
              </p>
            </FadeIn>
          </div>
          <FadeIn delay={0.18}><VennDiagram /></FadeIn>
        </div>
      </div>
      <style>{`@media(max-width:860px){.mission-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  )
}
