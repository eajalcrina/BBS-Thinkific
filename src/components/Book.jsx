import { motion } from 'framer-motion'
import FadeIn from './FadeIn.jsx'

const features = [
  'Diseño de bionegocios rentables desde cero',
  'Modelos financieros para territorios complejos',
  'Gobernanza de origen y protección de biodiversidad',
  'Casos reales de la Amazonía y ecosistemas críticos',
]
const orbsRose = [
  {x:5,y:6,r:1.8,f:'rgba(243,39,105,0.34)'},{x:15,y:5,r:1.4,f:'rgba(243,39,105,0.28)'},
  {x:17,y:15,r:2.2,f:'rgba(243,39,105,0.26)'},{x:5,y:16,r:1.8,f:'rgba(243,39,105,0.30)'},
  {x:11,y:11,r:1.2,f:'rgba(243,39,105,0.18)'}
]

export default function Book() {
  return (
    <section id="libro" className="sec-t" style={{ background:'var(--white)', position:'relative', overflow:'hidden' }}>

      {/* Burbuja suelta izquierda */}
      <div style={{ position:'absolute', top:'8%', left:'3%', width:65, height:65, borderRadius:'50%', background:'rgba(193,244,0,0.04)', border:'2px dashed rgba(193,244,0,0.18)', animation:'spin-ccw 36s linear infinite', transformOrigin:'center', pointerEvents:'none' }}/>
      <motion.div animate={{ y:[0,-8,0] }} transition={{ duration:6, repeat:Infinity, ease:'easeInOut' }}
        style={{ position:'absolute', bottom:'22%', left:'10%', width:10, height:10, borderRadius:'50%', background:'rgba(243,39,105,0.45)', pointerEvents:'none' }}/>

      {/* CÉLULA derecha visible */}
      <div style={{ position:'absolute', bottom:'8%', right:'4%', width:112, height:112, borderRadius:'50%', background:'rgba(193,244,0,0.07)', border:'2px dashed rgba(193,244,0,0.28)', animation:'spin-slow 44s linear infinite', transformOrigin:'center', pointerEvents:'none' }}>
        <motion.div animate={{ y:[0,-9,0] }} transition={{ duration:7, repeat:Infinity, ease:'easeInOut', delay:0.5 }}
          style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:24, height:24, borderRadius:'50%', overflow:'hidden' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ display:'block' }}>
            <circle cx="12" cy="12" r="11" fill="rgba(243,39,105,0.52)"/>
            {orbsRose.map((o,i)=><circle key={i} cx={o.x} cy={o.y} r={o.r} fill={o.f}/>)}
          </svg>
        </motion.div>
      </div>

      <div className="wrap" style={{ position:'relative' }}>
        <FadeIn><div className="label dark" style={{ marginBottom:'1rem' }}>Publicación · Vol. 1 de 3</div></FadeIn>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'4rem', alignItems:'center' }} className="book-grid">
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
              {/* TEXTO ACTUALIZADO: bajo demanda + 15 de Abril + caja de regalo */}
              <div style={{ background:'rgba(193,244,0,0.15)', border:'1.5px solid rgba(193,244,0,0.4)', borderRadius:12, padding:'0.9rem 1.1rem', marginBottom:'1.5rem', fontSize:'0.82rem', lineHeight:1.7, color:'var(--t-dark2)', display:'flex', gap:'0.65rem', alignItems:'flex-start' }}>
                <span style={{ color:'var(--lime-dk)', flexShrink:0, marginTop:'0.05rem', fontWeight:700 }}>★</span>
                <span>
                  La copia impresa está disponible <strong style={{ color:'var(--dark)' }}>bajo demanda</strong>. Compra el libro físico y espera recibirlo el <strong style={{ color:'var(--dark)' }}>15 de Abril</strong> en una caja de regalo con una <strong style={{ color:'var(--rose)' }}>sorpresa especial</strong>.
                </span>
              </div>
              <div style={{ display:'flex', gap:'0.75rem', flexWrap:'wrap' }}>
                <a href="https://mpago.la/17jbnkb" target="_blank" rel="noopener noreferrer" className="btn btn-rose btn-lg">Comprar digital →</a>
                <a href="https://mpago.la/1dgbgiT" target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-lg">Reservar impreso</a>
              </div>
            </FadeIn>
          </div>
          <FadeIn delay={0.2}>
            <div style={{ position:'relative', padding:'1.5rem 1.5rem 0 1.5rem' }}>
              <div style={{ position:'absolute', top:'1.5rem', right:'0.5rem', bottom:0, left:'0.5rem', borderRadius:20, background:'rgba(14,14,14,0.12)', filter:'blur(28px)', transform:'translateY(16px)', zIndex:0 }}/>
              <motion.img src="/book-stack.jpg" alt="Bio Business Playbook"
                style={{ position:'relative', zIndex:1, width:'100%', borderRadius:16, display:'block', objectFit:'cover', boxShadow:'0 32px 72px rgba(14,14,14,0.22), 0 8px 24px rgba(14,14,14,0.14)', filter:'brightness(1.02) saturate(1.08) contrast(1.02)' }}
                initial={{ scale:1.04, opacity:0, y:16 }} whileInView={{ scale:1, opacity:1, y:0 }} whileHover={{ scale:1.02, y:-4 }}
                viewport={{ once:true }} transition={{ duration:0.9, ease:[0.22,1,0.36,1] }}/>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Ola simple: white → lime */}
      <div style={{ position:'absolute', bottom:-1, left:0, right:0 }}>
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ width:'100%', height:60, display:'block' }}>
          <path d="M0,30 C360,50 1080,10 1440,30 L1440,60 L0,60 Z" fill="var(--lime)"/>
        </svg>
      </div>
      <style>{`@media(max-width:860px){.book-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  )
}
