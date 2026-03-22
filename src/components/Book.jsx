import { motion } from 'framer-motion'
import FadeIn from './FadeIn.jsx'
import CellCanvas from './CellCanvas.jsx'

const features = [
  'Diseño de bionegocios rentables desde cero',
  'Modelos financieros para territorios complejos',
  'Gobernanza de origen y protección de biodiversidad',
  'Casos reales de la Amazonía y ecosistemas críticos',
]

export default function Book() {
  return (
    <section id="libro" className="sec-t" style={{ background:'var(--white)', position:'relative', overflow:'hidden' }}>

      <CellCanvas palette="white"/>

      <div className="wrap" style={{ position:'relative', zIndex:2 }}>
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
            <FadeIn delay={0.12}><h2 className="t-out t-lg" style={{ marginBottom:'0.5rem', color:'var(--dark)' }}>Bio Business <em style={{ fontStyle:'normal', color:'var(--rose)', fontWeight:700 }}>Playbook</em></h2><p style={{ fontFamily:'var(--fbc)', fontSize:'0.82rem', fontWeight:500, letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--t-dark3)', marginBottom:'1.5rem' }}>Vol. 1 — Design</p></FadeIn>
            <FadeIn delay={0.16}><p className="body" style={{ color:'var(--t-dark2)', marginBottom:'0.9rem' }}>América Latina ha operado durante siglos como la despensa del mundo. Este libro cambia esa ecuación.</p><p className="body" style={{ color:'var(--t-dark2)', marginBottom:'1.8rem' }}>Eddie Ajalcriña y Lorenzo Ortiz desglosan la ingeniería de negocios para construir empresas que destaquen y dominen el mercado global desde la biodiversidad de la región.</p><ul className="feat on-light" style={{ marginBottom:'2rem' }}>{features.map(f=><li key={f}>{f}</li>)}</ul></FadeIn>
            <FadeIn delay={0.2}>
              <div style={{ background:'rgba(193,244,0,0.15)', border:'1.5px solid rgba(193,244,0,0.4)', borderRadius:12, padding:'0.9rem 1.1rem', marginBottom:'1.5rem', fontSize:'0.82rem', lineHeight:1.7, color:'var(--t-dark2)', display:'flex', gap:'0.65rem', alignItems:'flex-start' }}>
                <span style={{ color:'var(--lime-dk)', flexShrink:0, marginTop:'0.05rem', fontWeight:700 }}>★</span>
                <span>La copia impresa está disponible <strong style={{ color:'var(--dark)' }}>bajo demanda</strong>. Compra el libro físico y espera recibirlo el <strong style={{ color:'var(--dark)' }}>15 de Abril</strong> en una caja de regalo con una <strong style={{ color:'var(--rose)' }}>sorpresa especial</strong>.</span>
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
                style={{ position:'relative', zIndex:1, width:'100%', borderRadius:16, display:'block', objectFit:'cover', boxShadow:'0 32px 72px rgba(14,14,14,0.22), 0 8px 24px rgba(14,14,14,0.14)' }}
                initial={{ scale:1.04, opacity:0, y:16 }} whileInView={{ scale:1, opacity:1, y:0 }} whileHover={{ scale:1.02, y:-4 }}
                viewport={{ once:true }} transition={{ duration:0.9, ease:[0.22,1,0.36,1] }}/>
            </div>
          </FadeIn>
        </div>
      </div>

      <div style={{ position:'absolute', bottom:-1, left:0, right:0, zIndex:1 }}>
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ width:'100%', height:60, display:'block' }}>
          <path d="M0,30 C360,50 1080,10 1440,30 L1440,60 L0,60 Z" fill="var(--lime)"/>
        </svg>
      </div>
      <style>{`@media(max-width:860px){.book-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  )
}
