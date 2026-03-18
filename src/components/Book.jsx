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
    <section id="libro" className="sec-t" style={{ position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', top:0, left:0, right:0, bottom:0,
        background:'linear-gradient(180deg, var(--bg) 0%, var(--bg2) 50%, var(--bg) 100%)',
        pointerEvents:'none' }}/>
      <div style={{ position:'absolute', bottom:'0', left:'20%', width:600, height:400,
        background:'radial-gradient(ellipse, rgba(200,240,0,0.04) 0%, transparent 70%)',
        filter:'blur(40px)', pointerEvents:'none' }}/>

      <div className="wrap" style={{ position:'relative' }}>
        <FadeIn><div className="label dim" style={{ marginBottom:'1rem' }}>Publicación · Vol. 1 de 3</div></FadeIn>

        {/* New editorial layout: full-width with image backdrop */}
        <div style={{ position:'relative', borderRadius:14, overflow:'hidden', border:'1px solid var(--b2)' }}>
          {/* Lime top accent */}
          <div style={{ height:2, background:'linear-gradient(90deg, var(--lime), rgba(200,240,0,0.15))' }}/>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', minHeight:520 }} className="book-grid">
            {/* LEFT: image */}
            <div style={{ position:'relative', overflow:'hidden', background:'#040408' }}>
              <motion.img src="/book-stack.jpg" alt="Bio Business Playbook"
                style={{ width:'100%', height:'100%', objectFit:'cover', display:'block', filter:'brightness(0.8) saturate(1.15)' }}
                initial={{ scale:1.1, opacity:0 }} whileInView={{ scale:1, opacity:1 }}
                viewport={{ once:true, margin:'-60px' }}
                transition={{ duration:1.3, ease:[0.22,1,0.36,1] }}
              />
              {/* fade overlay to right */}
              <div style={{ position:'absolute', top:0, right:0, bottom:0, width:'50%',
                background:'linear-gradient(90deg, transparent, var(--bg2))' }}/>
              <div style={{ position:'absolute', left:0, right:0, bottom:0, height:'30%',
                background:'linear-gradient(0deg, var(--bg2), transparent)' }}/>
            </div>

            {/* RIGHT: content */}
            <FadeIn delay={0.2} style={{ display:'flex', flexDirection:'column', justifyContent:'space-between', padding:'3rem 2.8rem', background:'var(--bg2)' }}>
              <div>
                {/* Big price — prominently displayed */}
                <div style={{ marginBottom:'2rem' }}>
                  <div style={{ fontFamily:'var(--fbc)', fontSize:'0.65rem', fontWeight:600, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--lime)', opacity:0.7, marginBottom:'0.2rem' }}>Precio digital</div>
                  <div style={{ display:'flex', alignItems:'baseline', gap:'0.3rem' }}>
                    <span style={{ fontFamily:'var(--fbc)', fontWeight:700, fontSize:'5.5rem', color:'var(--lime)', lineHeight:1 }}>$25</span>
                    <span style={{ fontFamily:'var(--fbc)', fontSize:'1.1rem', fontWeight:400, color:'var(--t3)' }}>USD</span>
                  </div>
                  <div style={{ fontFamily:'var(--fbc)', fontSize:'0.7rem', fontWeight:500, letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--t3)', marginTop:'0.15rem' }}>Pago único · Acceso inmediato</div>
                </div>

                <h2 className="t-out t-lg" style={{ marginBottom:'0.5rem' }}>
                  Bio Business <span className="hl">Playbook</span>
                </h2>
                <p style={{ fontFamily:'var(--fbc)', fontSize:'0.82rem', fontWeight:500, letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--lime)', marginBottom:'1.6rem', opacity:0.65 }}>Vol. 1 — Design</p>

                <p className="body" style={{ marginBottom:'0.9rem' }}>
                  América Latina ha operado durante siglos como la despensa del mundo: exportando biomasa por poco valor mientras el valor real se captura en laboratorios extranjeros.
                </p>
                <p className="body" style={{ marginBottom:'1.8rem' }}>
                  Eddie Ajalcriña y Lorenzo Ortiz desglosan la ingeniería de negocios completa para construir empresas que destaquen y dominen el mercado global desde la biodiversidad de la región.
                </p>
                <ul className="feat" style={{ marginBottom:'2rem' }}>
                  {features.map(f=><li key={f}>{f}</li>)}
                </ul>
              </div>

              <div>
                <div style={{ display:'flex', alignItems:'flex-start', gap:'0.65rem', background:'var(--lime10)', border:'1px solid var(--lime20)', borderRadius:5, padding:'0.85rem 1rem', marginBottom:'1.5rem', fontSize:'0.8rem', lineHeight:1.6, color:'var(--t2)' }}>
                  <span style={{ color:'var(--lime)', flexShrink:0, marginTop:'0.05rem' }}>★</span>
                  <span>La copia impresa está disponible <strong style={{ color:'var(--t1)' }}>previo registro</strong>. Déjanos tu correo y te avisamos cuando esté lista para envío en tu país.</span>
                </div>
                <div style={{ display:'flex', gap:'0.75rem', flexWrap:'wrap' }}>
                  <a href="https://biobusinessschool.org/playbook" className="btn btn-lime">Comprar digital →</a>
                  <a href="#comunidad" className="btn btn-ghost">Reservar copia impresa</a>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:860px){.book-grid{grid-template-columns:1fr!important}.book-grid>div:first-child{min-height:260px}}`}</style>
    </section>
  )
}
