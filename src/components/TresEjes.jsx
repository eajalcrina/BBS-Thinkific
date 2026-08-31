import { motion } from 'framer-motion'
import FadeIn from './FadeIn.jsx'

const EJES = [
  { cx:130, cy:148, label:['Empresas y', 'capital'] },
  { cx:280, cy:148, label:['Sistemas', 'vivos'] },
  { cx:430, cy:148, label:['Inteligencia', 'artificial'] },
]

function VennDiagram() {
  return (
    <div style={{ width:'100%', maxWidth:520, margin:'0 auto' }}>
      <svg viewBox="0 0 560 300" xmlns="http://www.w3.org/2000/svg" width="100%" style={{ overflow:'visible' }} role="img" aria-label="Diagrama: Bio Business School en la intersección de empresas y capital, sistemas vivos, e inteligencia artificial">
        <defs>
          <radialGradient id="te-g" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255,200,0,0.28)"/>
            <stop offset="100%" stopColor="rgba(255,200,0,0)"/>
          </radialGradient>
        </defs>
        {EJES.map((c,i) => (
          <motion.circle key={i} cx={c.cx} cy={c.cy} r={110}
            fill="url(#te-g)" stroke="rgba(43,43,43,0.18)" strokeWidth="1.5"
            initial={{ opacity:0, scale:0.8 }} whileInView={{ opacity:1, scale:1 }}
            viewport={{ once:true }} transition={{ duration:0.8, delay:i*0.15, ease:[0.22,1,0.36,1] }}
            style={{ transformOrigin:`${c.cx}px ${c.cy}px` }}
          />
        ))}
        {EJES.map((c,i) => (
          <motion.g key={'l'+i} initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ duration:0.6, delay:0.5+i*0.1 }}>
            <text x={c.cx} y={142} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="600" fontSize="13" fill="var(--fro-ink)">{c.label[0]}</text>
            <text x={c.cx} y={160} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="600" fontSize="13" fill="var(--fro-ink)">{c.label[1]}</text>
          </motion.g>
        ))}
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
