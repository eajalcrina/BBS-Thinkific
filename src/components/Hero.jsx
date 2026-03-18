import { motion } from 'framer-motion'

const st = { hidden:{}, show:{ transition:{ staggerChildren:0.1, delayChildren:0.2 } } }
const it = { hidden:{ opacity:0, y:32 }, show:{ opacity:1, y:0, transition:{ duration:0.75, ease:[0.22,1,0.36,1] } } }

export default function Hero() {
  return (
    <section className="sec" style={{ minHeight:'90vh', display:'flex', alignItems:'center', position:'relative', overflow:'hidden' }}>
      {/* Bioluminescence orbs */}
      <div style={{ position:'absolute', top:'-25%', right:'-8%', width:800, height:800, borderRadius:'50%',
        background:'radial-gradient(circle at 40% 40%, rgba(200,240,0,0.09) 0%, rgba(200,240,0,0.02) 35%, transparent 65%)',
        animation:'orb1 18s ease-in-out infinite', pointerEvents:'none' }} />
      <div style={{ position:'absolute', bottom:'-15%', left:'-10%', width:700, height:700, borderRadius:'50%',
        background:'radial-gradient(circle at 60% 60%, rgba(243,39,105,0.07) 0%, rgba(243,39,105,0.015) 35%, transparent 65%)',
        animation:'orb2 22s ease-in-out infinite', pointerEvents:'none' }} />
      <div style={{ position:'absolute', top:'20%', left:'35%', width:400, height:400, borderRadius:'50%',
        background:'radial-gradient(circle, rgba(200,240,0,0.04) 0%, transparent 65%)',
        filter:'blur(30px)', pointerEvents:'none' }} />

      {/* Grid texture */}
      <div style={{ position:'absolute', inset:0,
        backgroundImage:'linear-gradient(rgba(200,240,0,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(200,240,0,0.025) 1px, transparent 1px)',
        backgroundSize:'80px 80px', pointerEvents:'none',
        maskImage:'radial-gradient(ellipse 70% 70% at 60% 50%, rgba(0,0,0,0.8) 0%, transparent 100%)' }} />

      <div className="wrap" style={{ width:'100%', position:'relative' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 400px', alignItems:'center', gap:'5rem' }} className="hero-grid">
          <motion.div variants={st} initial="hidden" animate="show">

            <motion.div variants={it} style={{ marginBottom:'1.8rem' }}>
              <span className="badge badge-lime">
                <span style={{ width:5, height:5, borderRadius:'50%', background:'var(--lime)', display:'inline-block', marginRight:'0.4rem', animation:'blink 2s infinite' }}/>
                Lanzamiento 2026 · Lima, Perú
              </span>
            </motion.div>

            <motion.h1 variants={it} className="t-out t-xl" style={{ marginBottom:'1.8rem' }}>
              Bionegocios<br/>
              <span className="hl">rentables</span><br/>
              para América<br/>Latina
            </motion.h1>

            <motion.div variants={it}>
              <div style={{ width:60, height:2, background:'linear-gradient(90deg, var(--lime), transparent)', marginBottom:'1.8rem', borderRadius:1 }}/>
            </motion.div>

            <motion.p variants={it} className="lead" style={{ maxWidth:500, marginBottom:'2.4rem' }}>
              No somos una escuela de negocios. Somos la plataforma de inteligencia estratégica que convierte la biodiversidad de América Latina en activos económicos de impacto global.
            </motion.p>

            <motion.div variants={it} style={{ display:'flex', gap:'0.85rem', flexWrap:'wrap', marginBottom:'2.8rem' }}>
              <a href="#curso" className="btn btn-lime btn-lg">Ver Biotech Sprint 01 →</a>
              <a href="#mision" className="btn btn-ghost btn-lg">Conocer BBS</a>
            </motion.div>

            <motion.div variants={it} style={{ display:'flex', gap:'2.5rem', flexWrap:'wrap', paddingTop:'1.8rem', borderTop:'1px solid var(--b1)' }}>
              {[['$55','Precio regular del curso'],['$0','Membresía Starter'],['Q2 2026','Primera cohorte']].map(([v,l]) => (
                <div key={v}>
                  <div style={{ fontFamily:'var(--fbc)', fontSize:'1.7rem', fontWeight:700, color:'var(--lime)', lineHeight:1, marginBottom:'0.18rem' }}>{v}</div>
                  <div className="sm">{l}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Stats panel */}
          <motion.div initial={{ opacity:0, x:50 }} animate={{ opacity:1, x:0 }}
            transition={{ duration:0.9, delay:0.5, ease:[0.22,1,0.36,1] }}
            className="glass hero-panel"
            style={{ borderRadius:12, overflow:'hidden', position:'relative' }}
          >
            <div style={{ position:'absolute', top:0, left:0, right:0, height:1, background:'linear-gradient(90deg, transparent, var(--lime), transparent)' }}/>

            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:1, background:'var(--b0)' }}>
              {[['55M','años de evolución biológica'],['ALC','América Latina y el Caribe'],['2026','año de lanzamiento']].map(([n,l],i) => (
                <div key={n} style={{ background: i===2 ? 'rgba(12,12,26,0.8)' : 'rgba(7,8,16,0.6)', padding:'1.5rem', gridColumn:i===2?'1/-1':undefined }}>
                  <div style={{ fontFamily:'var(--fbc)', fontSize:'2.4rem', fontWeight:700, color:'var(--lime)', lineHeight:1 }}>{n}</div>
                  <div style={{ fontFamily:'var(--fbc)', fontSize:'0.65rem', fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--t3)', marginTop:'0.25rem' }}>{l}</div>
                </div>
              ))}
            </div>

            <blockquote style={{ padding:'1.3rem 1.5rem 1.3rem 2rem', fontStyle:'italic', fontFamily:'var(--fout)', fontWeight:300, fontSize:'0.95rem', lineHeight:1.7, color:'var(--t2)', borderTop:'1px solid var(--b1)', position:'relative' }}>
              <span style={{ position:'absolute', left:0, top:0, bottom:0, width:3, background:'linear-gradient(to bottom, var(--lime), transparent)' }}/>
              "Nuestro propósito es rediseñar la arquitectura de los negocios para transformar la economía de América Latina desde sus raíces."
            </blockquote>

            <div style={{ padding:'1rem 1.5rem', borderTop:'1px solid var(--b1)' }}>
              {['Co-creado con 404 Tech Found','Comunidad Starter gratuita','Certificado BBS + 404'].map(t => (
                <div key={t} style={{ display:'flex', alignItems:'center', gap:'0.5rem', fontSize:'0.78rem', color:'var(--t3)', marginBottom:'0.35rem' }}>
                  <span style={{ color:'var(--lime)', fontWeight:700 }}>✓</span>{t}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes orb1 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(40px,-25px) scale(1.04)} 66%{transform:translate(-20px,18px) scale(0.97)} }
        @keyframes orb2 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(-30px,22px) scale(0.96)} 66%{transform:translate(25px,-15px) scale(1.03)} }
        @media(max-width:960px){.hero-grid{grid-template-columns:1fr!important}.hero-panel{display:none!important}}
      `}</style>
    </section>
  )
}
