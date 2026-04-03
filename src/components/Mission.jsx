import { motion } from 'framer-motion'
import FadeIn from './FadeIn.jsx'

function VennDiagram() {
  return (
    <div style={{ width:'100%', maxWidth:520, margin:'0 auto' }}>
      <svg viewBox="0 0 560 300" xmlns="http://www.w3.org/2000/svg" width="100%" style={{ overflow:'visible' }}>
        <defs>
          <radialGradient id="vg1" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="rgba(193,244,0,0.25)"/><stop offset="100%" stopColor="rgba(193,244,0,0)"/></radialGradient>
          <radialGradient id="vg2" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="rgba(193,244,0,0.20)"/><stop offset="100%" stopColor="rgba(193,244,0,0)"/></radialGradient>
          <radialGradient id="vg3" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="rgba(193,244,0,0.25)"/><stop offset="100%" stopColor="rgba(193,244,0,0)"/></radialGradient>
          <filter id="vglow2"><feGaussianBlur stdDeviation="6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>

        {[{ cx:130, cy:148, gid:'vg1' },{ cx:220, cy:148, gid:'vg2' },{ cx:310, cy:148, gid:'vg3' }].map((c,i) => (
          <motion.circle key={i} cx={c.cx} cy={c.cy} r={95}
            fill={`url(#${c.gid})`} stroke="rgba(14,14,14,0.2)" strokeWidth="1.5"
            initial={{ opacity:0, scale:0.8 }} whileInView={{ opacity:1, scale:1 }}
            viewport={{ once:true }} transition={{ duration:0.8, delay:i*0.15, ease:[0.22,1,0.36,1] }}
            style={{ transformOrigin:`${c.cx}px ${c.cy}px` }}
          />
        ))}

        {[{ cx:88, label:['Conocimiento','territorial'] },{ cx:220, label:['Tecnología de','vanguardia'] },{ cx:352, label:['Inteligencia','de negocios'] }].map((c,i) => (
          <motion.g key={i} initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ duration:0.6, delay:0.5+i*0.1 }}>
            <text x={c.cx} y={140} textAnchor="middle" fontFamily="DM Sans,sans-serif" fontWeight="400" fontSize="12" fill="rgba(14,14,14,0.7)">{c.label[0]}</text>
            <text x={c.cx} y={156} textAnchor="middle" fontFamily="DM Sans,sans-serif" fontWeight="400" fontSize="12" fill="rgba(14,14,14,0.7)">{c.label[1]}</text>
          </motion.g>
        ))}

        <motion.g initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ delay:0.8 }}>
          <line x1="418" y1="141" x2="440" y2="141" stroke="rgba(14,14,14,0.35)" strokeWidth="2"/>
          <line x1="418" y1="155" x2="440" y2="155" stroke="rgba(14,14,14,0.35)" strokeWidth="2"/>
        </motion.g>

        <motion.circle cx="498" cy="148" r="52" fill="var(--rose)" filter="url(#vglow2)"
          initial={{ opacity:0, scale:0 }} whileInView={{ opacity:1, scale:1 }}
          viewport={{ once:true }} transition={{ duration:0.8, delay:0.9, ease:[0.22,1,0.36,1] }}
          style={{ transformOrigin:'498px 148px' }}
        />
        <motion.g initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ delay:1.2 }}>
          <text x="498" y="136" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="700" fontSize="10" fill="#C1F400" letterSpacing="0.8">PROTECCIÓN</text>
          <text x="498" y="150" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="700" fontSize="10" fill="#C1F400" letterSpacing="0.8">DE LA</text>
          <text x="498" y="164" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="700" fontSize="10" fill="#C1F400" letterSpacing="0.8">BIODIVERSIDAD</text>
        </motion.g>
      </svg>
    </div>
  )
}

export default function Mission() {
  return (
    <section id="mision" className="sec" style={{ background:'var(--white)', position:'relative', overflow:'hidden' }}>
      {/* Accent stripe top */}
      <div style={{ position:'absolute', top:0, left:0, right:0, height:4, background:'linear-gradient(90deg, var(--lime), var(--lime-d))' }}/>

      <div className="wrap">
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'5rem', alignItems:'center' }} className="mission-grid">
          <div>
            <FadeIn>
              <span style={{ display:'inline-block', background:'rgba(243,39,105,0.1)', border:'1px solid rgba(243,39,105,0.2)', borderRadius:50, padding:'0.3rem 0.85rem', fontFamily:'var(--fbc)', fontSize:'0.68rem', fontWeight:600, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--rose)', marginBottom:'1.5rem' }}>
                Bio Business School (BBS)
              </span>
            </FadeIn>
            <FadeIn delay={0.08}>
              <p style={{ fontSize:'1.2rem', fontWeight:300, fontFamily:'var(--fout)', color:'var(--t-dark2)', marginBottom:'1.5rem', lineHeight:1.6 }}>
                No es una institución educativa tradicional.
              </p>
            </FadeIn>
            <FadeIn delay={0.14}>
              <h2 className="t-out t-lg" style={{ marginBottom:'1.8rem', color:'var(--dark)' }}>
                Es una plataforma de inteligencia para bionegocios <em style={{ fontStyle:'normal', color:'var(--rose)', fontWeight:700 }}>rentables</em>
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="lead" style={{ color:'var(--t-dark2)', maxWidth:460, marginBottom:'2rem' }}>
                Combinamos conocimiento territorial, tecnología de vanguardia e inteligencia de negocios para convertir la biodiversidad de la región en valor económico real — protegiendo los ecosistemas en el proceso.
              </p>
            </FadeIn>
            <FadeIn delay={0.26}>
              <div style={{ display:'flex', gap:'0.75rem', flexWrap:'wrap' }}>
                <a href="#biobuilder" className="btn btn-rose">Conocer el BioBuilder →</a>
                <a href="#mision" className="btn btn-outline">Nuestra misión</a>
              </div>
            </FadeIn>
          </div>
          <FadeIn delay={0.15}>
            <div style={{ background:'var(--cream)', borderRadius:24, padding:'2.5rem', border:'1px solid rgba(14,14,14,0.06)' }}>
              <VennDiagram />
            </div>
          </FadeIn>
        </div>
      </div>
      <style>{`@media(max-width:860px){.mission-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  )
}
