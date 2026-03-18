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
    <section id="libro" className="section-tight">
      <div className="container">
        <FadeIn><div className="label muted" style={{marginBottom:'1rem'}}>Publicación · Vol. 1 de 3</div></FadeIn>

        <div style={{position:'relative', borderRadius:10, overflow:'hidden', background:'var(--bg-2)', border:'1px solid var(--border-2)'}}>
          {/* lime top accent */}
          <div style={{height:2, background:'linear-gradient(90deg, var(--lime) 0%, rgba(187,238,0,0.15) 100%)'}}/>

          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', minHeight:500}} className="book-grid">

            {/* Left: image panel with overlay */}
            <div style={{position:'relative', overflow:'hidden', background:'#060610'}}>
              <motion.img
                src="/book-stack.jpg"
                alt="Bio Business Playbook"
                style={{width:'100%', height:'100%', objectFit:'cover', display:'block', filter:'brightness(0.82) saturate(1.1)'}}
                initial={{scale:1.08, opacity:0}}
                whileInView={{scale:1, opacity:1}}
                viewport={{once:true, margin:'-60px'}}
                transition={{duration:1.2, ease:[0.22,1,0.36,1]}}
              />
              {/* right fade */}
              <div style={{position:'absolute', top:0, right:0, bottom:0, width:'45%',
                background:'linear-gradient(90deg, transparent, var(--bg-2))'}}/>
              {/* bottom fade */}
              <div style={{position:'absolute', left:0, right:0, bottom:0, height:'30%',
                background:'linear-gradient(0deg, var(--bg-2), transparent)'}}/>
            </div>

            {/* Right: content */}
            <FadeIn delay={0.18} style={{display:'flex', flexDirection:'column', justifyContent:'space-between', padding:'3rem 2.8rem'}}>
              <div>
                {/* Large price tag — prominent per request */}
                <div style={{display:'inline-flex', flexDirection:'column', alignItems:'flex-start', marginBottom:'2rem'}}>
                  <div style={{fontFamily:'var(--fd)', fontSize:'0.68rem', fontWeight:500, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--lime)', marginBottom:'0.3rem', opacity:0.7}}>Precio digital</div>
                  <div style={{display:'flex', alignItems:'baseline', gap:'0.3rem'}}>
                    <span style={{fontFamily:'var(--fd)', fontWeight:700, fontSize:'5rem', color:'var(--lime)', lineHeight:1}}>$25</span>
                    <span style={{fontFamily:'var(--fd)', fontSize:'1rem', fontWeight:400, color:'var(--text-3)'}}>USD</span>
                  </div>
                  <div style={{fontFamily:'var(--fd)', fontSize:'0.72rem', fontWeight:500, letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--text-3)', marginTop:'0.2rem'}}>Pago único · Acceso inmediato</div>
                </div>

                <h2 className="t-display t-lg" style={{marginBottom:'0.5rem'}}>
                  Bio Business<br/><span className="hl">Playbook</span>
                </h2>
                <p style={{fontFamily:'var(--fd)', fontSize:'0.82rem', fontWeight:500, letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--lime)', marginBottom:'1.6rem', opacity:0.65}}>
                  Vol. 1 — Design
                </p>
                <p className="body-m" style={{marginBottom:'0.9rem'}}>
                  América Latina ha operado durante siglos como la despensa del mundo: exportando biomasa por poco valor mientras el valor real se captura en laboratorios extranjeros.
                </p>
                <p className="body-m" style={{marginBottom:'1.8rem'}}>
                  Eddie Ajalcriña y Lorenzo Ortiz desglosan la ingeniería de negocios completa para construir empresas que destaquen y dominen el mercado global desde la biodiversidad de la región.
                </p>
                <ul className="feat" style={{marginBottom:'2rem'}}>
                  {features.map(f=><li key={f}>{f}</li>)}
                </ul>
              </div>

              <div>
                {/* Reserve note */}
                <div style={{display:'flex', alignItems:'flex-start', gap:'0.65rem', background:'var(--lime-glow)', border:'1px solid var(--lime-mid)', borderRadius:4, padding:'0.85rem 1rem', marginBottom:'1.5rem', fontSize:'0.8rem', lineHeight:1.6, color:'var(--text-2)'}}>
                  <span style={{color:'var(--lime)', flexShrink:0, marginTop:'0.05rem', fontSize:'0.8rem'}}>★</span>
                  <span>La copia impresa está disponible <strong style={{color:'var(--text-1)'}}>previo registro</strong>. Déjanos tu correo y te avisamos cuando esté lista para envío en tu país.</span>
                </div>
                <div style={{display:'flex', gap:'0.75rem', flexWrap:'wrap'}}>
                  <a href="https://biobusinessschool.org/playbook" className="btn btn-primary">Comprar digital →</a>
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
