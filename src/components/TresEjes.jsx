import { motion } from 'framer-motion'
import FadeIn from './FadeIn.jsx'

// Triangular arrangement — classic 3-circle Venn: pairwise center distance ≈ radius,
// so the three circles share one real triple-overlap region in the middle.
const R = 140
const CENTER = { x: 280, y: 225 }
const CIRCLES = [
  { cx: 280, cy: 144, label: ['Sistemas', 'vivos'], labelPos: { x: 280, y: 78 } },
  { cx: 210, cy: 265, label: ['Empresas y', 'capital'], labelPos: { x: 150, y: 318 } },
  { cx: 350, cy: 265, label: ['Inteligencia', 'artificial'], labelPos: { x: 410, y: 318 } },
]

function VennDiagram() {
  return (
    <div style={{ width:'100%', maxWidth:520, margin:'0 auto' }}>
      <svg viewBox="0 0 560 400" xmlns="http://www.w3.org/2000/svg" width="100%" style={{ overflow:'visible' }} role="img" aria-label="Diagrama: Bio Business School en la intersección de sistemas vivos, empresas y capital, e inteligencia artificial">
        <defs>
          <radialGradient id="te-center-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255,200,0,0.35)"/>
            <stop offset="100%" stopColor="rgba(255,200,0,0)"/>
          </radialGradient>
        </defs>

        {/* Three semi-transparent circles — overlaps compound naturally via alpha
            blending, so the triple-intersection in the middle reads as the most
            saturated point: exactly where BBS sits. */}
        {CIRCLES.map((c, i) => (
          <motion.circle key={i} cx={c.cx} cy={c.cy} r={R}
            fill="rgba(255,200,0,0.14)" stroke="rgba(43,43,43,0.22)" strokeWidth="1.5"
            initial={{ opacity:0, scale:0.85 }} whileInView={{ opacity:1, scale:1 }}
            viewport={{ once:true }} transition={{ duration:0.7, delay:i*0.12, ease:[0.22,1,0.36,1] }}
            style={{ transformOrigin:`${c.cx}px ${c.cy}px` }}
          />
        ))}

        {CIRCLES.map((c, i) => (
          <motion.g key={'l'+i} initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ duration:0.6, delay:0.45+i*0.1 }}>
            <text x={c.labelPos.x} y={c.labelPos.y} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="600" fontSize="14" fill="var(--fro-ink)">{c.label[0]}</text>
            <text x={c.labelPos.x} y={c.labelPos.y + 19} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="600" fontSize="14" fill="var(--fro-ink)">{c.label[1]}</text>
          </motion.g>
        ))}

        {/* BBS — sitting exactly in the triple intersection */}
        <motion.g initial={{ opacity:0, scale:0.7 }} whileInView={{ opacity:1, scale:1 }} viewport={{ once:true }} transition={{ duration:0.6, delay:0.85, ease:[0.22,1,0.36,1] }} style={{ transformOrigin:`${CENTER.x}px ${CENTER.y}px` }}>
          <circle cx={CENTER.x} cy={CENTER.y} r="46" fill="url(#te-center-glow)"/>
          <rect x={CENTER.x - 34} y={CENTER.y - 17} width="68" height="34" rx="17" fill="var(--fro-bg-white)" stroke="var(--fro-ink)" strokeWidth="1.5"/>
          <text x={CENTER.x} y={CENTER.y + 5} textAnchor="middle" fontFamily="var(--fbc), sans-serif" fontWeight="700" fontSize="15" letterSpacing="0.03em" fill="var(--fro-ink)">BBS</text>
        </motion.g>
      </svg>
    </div>
  )
}

export default function TresEjes() {
  return (
    <section id="tres-ejes" className="fro-sec fro-bg-light fro-on-light">
      <div className="fro-wrap">
        <FadeIn><div className="fro-eyebrow" style={{ marginBottom:'1.2rem' }}>Dónde vivimos</div></FadeIn>
        <FadeIn delay={0.08}>
          <h2 className="fro-h2" style={{ marginBottom:'2.6rem', maxWidth:820 }}>
            Bio Business School existe en la intersección de tres mundos
          </h2>
        </FadeIn>

        <FadeIn delay={0.14}>
          <div className="fro-card" style={{ padding:'2rem', marginBottom:'2.6rem' }}>
            <VennDiagram/>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="fro-lead" style={{ maxWidth:720, marginBottom:'1.6rem' }}>
            ¿Tu industria depende de un sistema vivo? Probablemente sí. Casi toda actividad económica depende, directa o indirectamente, de algo que la naturaleza produce o regula: agua, biomasa, suelo, biodiversidad. Pesca, agricultura, acuicultura, minería, energía, textil, alimentos, farmacéutica. Incluso la infraestructura que sostiene la inteligencia artificial depende de sistemas vivos, porque los centros de datos consumen agua y energía que salen de ecosistemas reales. Si tu negocio se sostiene sobre algo que la naturaleza sostiene primero, esto es para ti.
          </p>
        </FadeIn>

        <FadeIn delay={0.26}>
          <p className="fro-body" style={{ maxWidth:640, fontWeight:600 }}>
            Ahí, en esa intersección, es donde la región deja de exportar materia prima y empieza a exportar valor.
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
