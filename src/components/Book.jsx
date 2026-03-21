import { motion } from 'framer-motion'
import FadeIn from './FadeIn.jsx'

const features = [
  'Diseño de bionegocios rentables desde cero',
  'Modelos financieros para territorios complejos',
  'Gobernanza de origen y protección de biodiversidad',
  'Casos reales de la Amazonía y ecosistemas críticos',
]

export default function Book() {
  return (
    <section id="libro" className="sec-t" style={{ background:'var(--white)', position:'relative', overflow:'hidden' }}>
      {/* Lime accent top */}
      <div style={{ position:'absolute', top:0, left:0, right:0, height:4, background:'var(--lime)' }}/>
      <div style={{ position:'absolute', bottom:'0', right:'-5%', width:400, height:400, borderRadius:'50%',
        background:'radial-gradient(circle, rgba(193,244,0,0.18) 0%, transparent 65%)', pointerEvents:'none' }}/>

      <div className="wrap" style={{ position:'relative' }}>
        <FadeIn><div className="label dark" style={{ marginBottom:'1rem' }}>Publicación · Vol. 1 de 3</div></FadeIn>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'4rem', alignItems:'center' }} className="book-grid">

          {/* Left: content */}
          <div>
            <FadeIn delay={0.06}>
              <div style={{ marginBottom:'1.8rem' }}>
                <div style={{ fontFamily:'var(--fbc)', fontSize:'0.65rem', fontWeight:600, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--t-dark3)', marginBottom:'0.2rem' }}>Precio digital</div>
                <div style={{ display:'flex', alignItems:'baseline', gap:'0.4rem' }}>
                  <span style={{ fontFamily:'var(--fout)', fontWeight:800, fontSize:'6rem', color:'var(--rose)', lineHeight:1 }}>$25</span>
                  <span style={{ fontFamily:'var(--fbc)', fontSize:'1.1rem', fontWeight:400, color:'var(--t-dark3)' }}>USD</span>
                </div>
                <div style={{ fontFamily:'var(--fbc)', fontSize:'0.7rem', fontWeight:500, letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--t-dark3)', marginTop:'0.15rem' }}>Pago único · Acceso inmediato</div>
              </div>
            </FadeIn>
            <FadeIn delay={0.12}>
              <h2 className="t-out t-lg" style={{ marginBottom:'0.5rem', color:'var(--dark)' }}>
                Bio Business <em style={{ fontStyle:'normal', color:'var(--rose)', fontWeight:700 }}>Playbook</em>
              </h2>
              <p style={{ fontFamily:'var(--fbc)', fontSize:'0.82rem', fontWeight:500, letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--t-dark3)', marginBottom:'1.5rem' }}>Vol. 1 — Design</p>
            </FadeIn>
            <FadeIn delay={0.16}>
              <p className="body" style={{ color:'var(--t-dark2)', marginBottom:'0.9rem' }}>
                América Latina ha operado durante siglos como la despensa del mundo. Este libro cambia esa ecuación.
              </p>
              <p className="body" style={{ color:'var(--t-dark2)', marginBottom:'1.8rem' }}>
                Eddie Ajalcriña y Lorenzo Ortiz desglosan la ingeniería de negocios para construir empresas que destaquen y dominen el mercado global desde la biodiversidad de la región.
              </p>
              <ul className="feat on-light" style={{ marginBottom:'2rem' }}>
                {features.map(f=><li key={f}>{f}</li>)}
              </ul>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div style={{ background:'rgba(193,244,0,0.15)', border:'1.5px solid rgba(193,244,0,0.4)', borderRadius:12, padding:'0.9rem 1.1rem', marginBottom:'1.5rem', fontSize:'0.82rem', lineHeight:1.6, color:'var(--t-dark2)', display:'flex', gap:'0.65rem', alignItems:'flex-start' }}>
                <span style={{ color:'var(--lime-dk)', flexShrink:0, marginTop:'0.05rem', fontWeight:700 }}>★</span>
                <span>La copia impresa está disponible <strong style={{ color:'var(--dark)' }}>previo registro</strong>. Déjanos tu correo y te avisamos cuando esté lista para envío.</span>
              </div>
              <div style={{ display:'flex', gap:'0.75rem', flexWrap:'wrap' }}>
                
                  href="https://mpago.la/17jbnkb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-rose btn-lg"
                >
                  Comprar digital →
                </a>
                
                  href="https://mpago.la/1dgbgiT"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-lg"
                >
                  Reservar impreso
                </a>
              </div>
            </FadeIn>
          </div>

          {/* Right: book image — sin marco, imagen protagonista */}
          <FadeIn delay={0.2}>
            <div style={{ position:'relative', padding:'1.5rem 1.5rem 0 1.5rem' }}>

              {/* Sombra decorativa detrás */}
              <div style={{
                position:'absolute',
                inset:'1.5rem 0.5rem 0 0.5rem',
                borderRadius:20,
                background:'rgba(14,14,14,0.12)',
                filter:'blur(28px)',
                transform:'translateY(16px)',
                zIndex:0,
              }}/>

              {/* Imagen principal */}
              <motion.img
                src="/book-stack.jpg"
                alt="Bio Business Playbook"
                style={{
                  position:'relative',
                  zIndex:1,
                  width:'100%',
                  borderRadius:16,
                  display:'block',
                  objectFit:'cover',
                  boxShadow:'0 32px 72px rgba(14,14,14,0.22), 0 8px 24px rgba(14,14,14,0.14)',
                  filter:'brightness(1.02) saturate(1.08) contrast(1.02)',
                }}
                initial={{ scale:1.04, opacity:0, y:16 }}
                whileInView={{ scale:1, opacity:1, y:0 }}
                whileHover={{ scale:1.02, y:-4 }}
                viewport={{ once:true }}
                transition={{ duration:0.9, ease:[0.22,1,0.36,1] }}
              />

              {/* Badge flotante $25 */}
              <div style={{
                position:'absolute',
                top:4,
                right:4,
                zIndex:2,
                background:'var(--rose)',
                color:'var(--white)',
                borderRadius:12,
                padding:'0.8rem 1rem',
                textAlign:'center',
                boxShadow:'0 8px 24px rgba(243,39,105,0.45)',
                minWidth:90,
              }}>
                <div style={{ fontFamily:'var(--fbc)', fontSize:'1.8rem', fontWeight:800, lineHeight:1 }}>$25</div>
                <div style={{ fontFamily:'var(--fbc)', fontSize:'0.65rem', fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase', opacity:0.85, marginTop:'0.15rem' }}>USD</div>
              </div>

            </div>
          </FadeIn>

        </div>
      </div>
      <style>{`@media(max-width:860px){.book-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  )
}
