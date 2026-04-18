import FadeIn from '../FadeIn.jsx'
import { motion } from 'framer-motion'

const profiles = [
  {
    icon: '🧬',
    label: 'El Estudiante STEM',
    desc: 'Biotecnología, Biología, Ingeniería Química, Farmacia. Sabes hacer ciencia pero no sabes cómo convertirla en algo que el mercado quiera pagar.',
    quote: 'Por fin, el mapa del biotech que tu carrera nunca te enseñó.',
  },
  {
    icon: '🔄',
    label: 'El Profesional que pivotea',
    desc: '2–5 años en industrias tradicionales — agro, pesca, pharma, banca. El sector está cambiando y quieres estar del lado correcto.',
    quote: 'Entiende el sector que va a redefinir tu industria, antes de que lo haga sin ti.',
  },
  {
    icon: '🚀',
    label: 'El Emprendedor en etapa cero',
    desc: 'Tienes una idea de biotech. Necesitas saber si es viable, cómo estructurarla y — sobre todo — cómo financiarla.',
    quote: '4 semanas para saber si tu biotech tiene chances reales — y un roadmap para financiarlo.',
  },
  {
    icon: '🧠',
    label: 'El Curioso estratégico',
    desc: 'Economía, Administración, Derecho, Comunicación. Todo el mundo habla de biotech pero nadie lo explica en términos que puedas usar.',
    quote: 'Deja de escuchar hablar de biotech. Empieza a entenderlo tú mismo.',
  },
]

export default function SprintParaQuien() {
  return (
    <section
      id="paraquien"
      className="fro-sec"
      style={{ background:'var(--fro-bg)' }}
    >
      <style>{`
        .pq-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.2rem; }
        @media (max-width: 760px) { .pq-grid { grid-template-columns: 1fr; } }
      `}</style>

      <div className="fro-wrap">
        <div style={{ textAlign:'center', marginBottom:'2.5rem' }}>
          <FadeIn>
            <div className="fro-eyebrow" style={{ marginBottom:'1rem', justifyContent:'center' }}>
              Para quién es
            </div>
          </FadeIn>

          <FadeIn delay={0.06}>
            <h2 className="fro-h2" style={{ marginBottom:'1rem', maxWidth:'16em', margin:'0 auto 1rem' }}>
              No necesitas ser biólogo.<br/>
              Necesitas{' '}
              <span className="fro-italic-amber">querer construir.</span>
            </h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="fro-lead" style={{ maxWidth:620, margin:'0 auto' }}>
              No necesitas ser biólogo. No necesitas tener una empresa. Necesitas querer construir algo con la biotecnología.
            </p>
          </FadeIn>
        </div>

        <div className="pq-grid">
          {profiles.map((p, i) => (
            <FadeIn key={p.label} delay={0.1 + i * 0.08}>
              <motion.article
                whileHover={{ y:-4, borderColor:'rgba(255,200,0,0.35)' }}
                transition={{ duration:0.25, ease:[0.22,1,0.36,1] }}
                className="fro-card"
                style={{ padding:'1.6rem', height:'100%', display:'flex', flexDirection:'column', gap:'0.75rem' }}
              >
                <div aria-hidden style={{ fontSize:'1.6rem' }}>{p.icon}</div>
                <div style={{ fontFamily:'var(--finter)', fontSize:'0.7rem', fontWeight:700, letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--fro-amber)' }}>
                  {p.label}
                </div>
                <p className="fro-sm" style={{ color:'var(--fro-text-2)' }}>{p.desc}</p>
                <p style={{
                  borderLeft:'3px solid var(--fro-amber)',
                  paddingLeft:'0.8rem',
                  fontFamily:'var(--finter)', fontStyle:'italic',
                  fontSize:'0.88rem', color:'var(--fro-text)', lineHeight:1.5, margin:0,
                }}>
                  {p.quote}
                </p>
              </motion.article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
