import { motion } from 'framer-motion'
import FadeIn from './FadeIn.jsx'
import { Halo, Cell, Membrane, Dot, ORBS_ROSE } from './CellSystem.jsx'

const features = [
  'Diseño de bionegocios rentables desde cero',
  'Modelos financieros para territorios complejos',
  'Gobernanza de origen y protección de biodiversidad',
  'Casos reales de la Amazonía y ecosistemas críticos',
]

export default function Book() {
  return (
    <section id="libro" className="sec-t" style={{ background:'var(--white)', position:'relative', overflow:'hidden' }}>

      {/* ── Halos ── */}
      <Halo top="-40%"   left="-10%"  size={230} fill="rgba(193,244,0,.04)"  stroke="rgba(193,244,0,.10)"  delay={1} ccw/>
      <Halo bottom="-35%" right="-8%" size={165} fill="rgba(243,39,105,.03)" stroke="rgba(243,39,105,.08)" delay={4}/>

      {/* ── Células ── */}
      <Cell top="6%"    left="3%"   size={65}  mb="rgba(193,244,0,.04)" mf="rgba(193,244,0,.18)" spd="spin-ccw 37s"  nb={15} nf="rgba(243,39,105,.46)" orbs={ORBS_ROSE()} delay={0}/>
      <Cell bottom="6%" right="3%"  size={110} mb="rgba(193,244,0,.06)" mf="rgba(193,244,0,.24)" spd="spin-slow 45s" nb={25} nf="rgba(243,39,105,.48)" orbs={ORBS_ROSE()} delay={1}/>
      <Cell top="18%"   right="22%" size={55}  mb="rgba(193,244,0,.03)" mf="rgba(193,244,0,.13)" spd="spin-cw 50s"   nb={13} nf="rgba(243,39,105,.34)" orbs={ORBS_ROSE()} delay={2.5}/>
      <Cell bottom="18%" left="30%" size={38}  mb="rgba(193,244,0,.03)" mf="rgba(193,244,0,.11)" spd="spin-ccw 58s"  nb={9}  nf="rgba(243,39,105,.28)" orbs={ORBS_ROSE()} delay={3.5}/>

      {/* ── Membranas ── */}
      <Membrane top="42%"  right="38%" size={26} mb="rgba(193,244,0,.025)" mf="rgba(193,244,0,.10)"  spd="spin-slow 64s" delay={2}/>
      <Membrane top="12%"  left="42%"  size={18} mb="rgba(243,39,105,.02)"mf="rgba(243,39,105,.08)" spd="spin-cw 70s"   delay={5}/>

      {/* ── Puntos ── */}
      <Dot bottom="28%" left="10%"  size={9} fill="rgba(243,39,105,.40)"  anim="float-y" delay={0.5}/>
      <Dot top="34%"    left="28%"  size={7} fill="rgba(193,244,0,.45)"   anim="float-x" delay={2}/>
      <Dot bottom="18%" right="28%" size={6} fill="rgba(243,39,105,.28)"  anim="float-d" delay={3.5}/>

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

      <div style={{ position:'absolute', bottom:-1, left:0, right:0 }}>
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ width:'100%', height:60, display:'block' }}>
          <path d="M0,30 C360,50 1080,10 1440,30 L1440,60 L0,60 Z" fill="var(--lime)"/>
        </svg>
      </div>
      <style>{`@media(max-width:860px){.book-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  )
}
