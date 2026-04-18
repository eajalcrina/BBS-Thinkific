import { motion } from 'framer-motion'
import FadeIn from './FadeIn.jsx'
import { trackOutbound } from '../lib/analytics.js'
import { withUtm, CAMPAIGNS } from '../lib/utm.js'

const DIGITAL_URL = withUtm('https://mpago.la/17jbnkb', { campaign: CAMPAIGNS.PLAYBOOK_DIGITAL, content: 'book_section' })
const IMPRESO_URL = withUtm('https://mpago.la/1dgbgiT', { campaign: CAMPAIGNS.PLAYBOOK_IMPRESO, content: 'book_section' })

const features = [
  'Diseño de bionegocios rentables desde cero',
  'Modelos financieros para territorios complejos',
  'Gobernanza de origen y protección de biodiversidad',
  'Casos reales de la Amazonía y ecosistemas críticos',
]

export default function Book() {
  return (
    <section id="libro" className="fro-sec" style={{ background:'var(--fro-bg)' }}>
      <div className="fro-wrap">

        <FadeIn><div className="fro-eyebrow" style={{ marginBottom:'1.2rem' }}>Publicación · Vol. 1 de 3</div></FadeIn>

        <div className="book-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'4rem', alignItems:'center' }}>

          <div>
            <FadeIn delay={0.1}>
              <h2 className="fro-h2" style={{ marginBottom:'0.4rem' }}>
                Bio Business <span className="fro-italic-amber">Playbook</span>
              </h2>
              <p style={{ fontFamily:'var(--finter)', fontSize:'0.8rem', fontWeight:500, letterSpacing:'0.16em', textTransform:'uppercase', color:'var(--fro-text-3)', marginBottom:'1.5rem' }}>
                Vol. 1 — Design
              </p>
            </FadeIn>

            <FadeIn delay={0.16}>
              <p className="fro-body" style={{ marginBottom:'0.9rem' }}>
                América Latina ha operado durante siglos como la despensa del mundo. Este libro cambia esa ecuación.
              </p>
              <p className="fro-body" style={{ marginBottom:'1.8rem' }}>
                Eddie Ajalcriña y Lorenzo Ortiz desglosan la ingeniería de negocios para construir empresas que destaquen y dominen el mercado global desde la biodiversidad de la región.
              </p>
              <ul className="fro-feat" style={{ marginBottom:'2rem' }}>
                {features.map(f => <li key={f}>{f}</li>)}
              </ul>
            </FadeIn>

            <FadeIn delay={0.22}>
              <div style={{ background:'var(--fro-amber-08)', border:'1px solid var(--fro-amber-25)', borderRadius:8, padding:'0.95rem 1.1rem', marginBottom:'1.6rem', display:'flex', gap:'0.75rem', alignItems:'flex-start' }}>
                <span aria-hidden style={{ color:'var(--fro-amber)', fontSize:'0.9rem', flexShrink:0 }}>★</span>
                <p style={{ fontSize:'0.85rem', lineHeight:1.65, color:'var(--fro-text-2)' }}>
                  La copia impresa está disponible <strong style={{ color:'var(--fro-text)' }}>bajo demanda</strong>. Compra el libro físico y espera recibirlo el <strong style={{ color:'var(--fro-text)' }}>15 de Mayo</strong> en una caja de regalo con una <strong style={{ color:'var(--fro-amber)' }}>sorpresa especial</strong>.
                </p>
              </div>

              <div style={{ display:'flex', gap:'0.7rem', flexWrap:'wrap' }}>
                <a
                  href={DIGITAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackOutbound(DIGITAL_URL, 'playbook_digital')}
                  className="fro-btn fro-btn-amber fro-btn-lg"
                >
                  Comprar digital <span aria-hidden>→</span>
                </a>
                <a
                  href={IMPRESO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackOutbound(IMPRESO_URL, 'playbook_impreso')}
                  className="fro-btn fro-btn-ghost fro-btn-lg"
                >
                  Reservar impreso
                </a>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.2}>
            <div style={{ position:'relative', padding:'1rem' }}>
              <div aria-hidden style={{ position:'absolute', inset:'1rem', borderRadius:14, background:'radial-gradient(ellipse at 50% 60%, rgba(255,200,0,0.18), transparent 70%)', filter:'blur(30px)', transform:'translateY(18px)', zIndex:0 }}/>
              <motion.img
                src="/book-stack.jpg"
                alt="Bio Business Playbook Vol. 1 — libro físico sobre bionegocios rentables en América Latina"
                loading="lazy"
                style={{ position:'relative', zIndex:1, width:'100%', borderRadius:10, display:'block', objectFit:'cover', border:'1px solid var(--fro-line)' }}
                initial={{ scale:1.04, opacity:0, y:16 }}
                whileInView={{ scale:1, opacity:1, y:0 }}
                whileHover={{ scale:1.02, y:-4 }}
                viewport={{ once:true }}
                transition={{ duration:0.9, ease:[0.22,1,0.36,1] }}
              />
              <div style={{ position:'relative', zIndex:2, marginTop:'1rem', display:'flex', alignItems:'center', justifyContent:'center', gap:'0.75rem', flexWrap:'wrap' }}>
                <div style={{ display:'flex', alignItems:'baseline', gap:'0.4rem', background:'var(--fro-bg-2)', border:'1px solid var(--fro-line-2)', borderRadius:6, padding:'0.55rem 1.1rem' }}>
                  <span style={{ fontFamily:'var(--finter)', fontSize:'0.65rem', fontWeight:600, letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--fro-text-3)' }}>Digital</span>
                  <span style={{ fontFamily:'var(--fsyne)', fontWeight:700, fontSize:'1.6rem', color:'var(--fro-amber)', lineHeight:1, letterSpacing:'-0.02em' }}>$25</span>
                  <span style={{ fontFamily:'var(--finter)', fontSize:'0.72rem', color:'var(--fro-text-3)' }}>USD</span>
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:'0.4rem', background:'rgba(255,255,255,0.03)', border:'1px solid var(--fro-line)', borderRadius:6, padding:'0.55rem 1.05rem' }}>
                  <span style={{ fontFamily:'var(--finter)', fontSize:'0.65rem', fontWeight:600, letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--fro-text-3)' }}>Impreso</span>
                  <span style={{ fontFamily:'var(--finter)', fontSize:'0.72rem', color:'var(--fro-text-3)' }}>bajo demanda</span>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      <style>{`
        @media(max-width: 960px){
          .book-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
