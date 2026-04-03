import FadeIn from './FadeIn.jsx'
import { motion } from 'framer-motion'

const LiIcon = () => <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>

const founders = [
  { initials:'EA', name:'Eddie Ajalcriña', role:'CEO & Co-founder', bio:'Emprendedor y estratega con experiencia acumulada liderando bionegocios rentables en la Amazonía y ecosistemas críticos de América Latina.', li:'https://www.linkedin.com/in/eddieajalcrina/', color:'var(--rose)', bg:'rgba(243,39,105,0.1)' },
  { initials:'LO', name:'Lorenzo Ortiz', role:'CIO & Co-founder', bio:'Estratega e inversionista con perspectiva única para construir bionegocios de impacto regional, integrando inteligencia financiera y conocimiento territorial.', li:'https://www.linkedin.com/in/lorenzoo/', color:'var(--lime-dk)', bg:'rgba(193,244,0,0.2)' },
]

export default function Team() {
  return (
    <section id="equipo" className="sec-t on-dark" style={{ background:'var(--dark)', position:'relative', overflow:'hidden' }}>
      {/* Rose blob */}
      <div style={{ position:'absolute', top:'20%', right:'-5%', width:400, height:400, borderRadius:'50%', background:'radial-gradient(circle, rgba(243,39,105,0.12) 0%, transparent 65%)', pointerEvents:'none' }}/>
      <div style={{ position:'absolute', bottom:'10%', left:'-5%', width:300, height:300, borderRadius:'50%', background:'radial-gradient(circle, rgba(193,244,0,0.08) 0%, transparent 65%)', pointerEvents:'none' }}/>

      <div className="wrap" style={{ position:'relative' }}>
        <FadeIn><div className="label white" style={{ marginBottom:'1rem' }}>El equipo</div></FadeIn>
        <FadeIn delay={0.08}>
          <h2 className="t-out t-md" style={{ marginBottom:'0.8rem', color:'var(--white)' }}>
            Hacemos que invertir en negocios sostenibles sea <em style={{ fontStyle:'normal', color:'var(--lime)', fontWeight:700 }}>buen negocio</em>
          </h2>
        </FadeIn>
        <FadeIn delay={0.14}>
          <p className="lead" style={{ color:'var(--t-white2)', maxWidth:520, marginBottom:'2.5rem' }}>
            Emprendedores, estrategas e inversionistas. Hemos estado en ambos lados de la mesa.
          </p>
        </FadeIn>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.5rem' }} className="team-grid">
          {founders.map((f,i) => (
            <FadeIn key={f.name} delay={0.1+i*0.12}>
              <motion.div
                whileHover={{ y:-4 }} transition={{ duration:0.25 }}
                style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:20, padding:'2rem', display:'flex', alignItems:'flex-start', gap:'1.2rem', cursor:'default' }}
              >
                <div style={{ width:56, height:56, borderRadius:'50%', background:f.bg, border:`2px solid ${f.color}`, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--fbc)', fontSize:'1.3rem', fontWeight:700, color:f.color, flexShrink:0 }}>
                  {f.initials}
                </div>
                <div>
                  <h3 style={{ fontFamily:'var(--fout)', fontSize:'1.15rem', fontWeight:600, color:'var(--white)', marginBottom:'0.1rem' }}>{f.name}</h3>
                  <div style={{ fontFamily:'var(--fbc)', fontSize:'0.66rem', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:f.color, marginBottom:'0.6rem' }}>{f.role}</div>
                  <p style={{ fontSize:'0.84rem', color:'var(--t-white2)', lineHeight:1.65, marginBottom:'0.85rem' }}>{f.bio}</p>
                  <a href={f.li} target="_blank" rel="noopener noreferrer"
                    style={{ display:'inline-flex', alignItems:'center', gap:'0.4rem', fontFamily:'var(--fbc)', fontSize:'0.7rem', fontWeight:600, letterSpacing:'0.08em', textTransform:'uppercase', textDecoration:'none', color:f.color, border:`1px solid ${f.color}`, padding:'0.3rem 0.75rem', borderRadius:50, transition:'all 0.18s', opacity:0.8 }}
                    onMouseEnter={e=>{ e.currentTarget.style.opacity='1'; e.currentTarget.style.background=f.bg; }}
                    onMouseLeave={e=>{ e.currentTarget.style.opacity='0.8'; e.currentTarget.style.background='transparent'; }}
                  ><LiIcon/> LinkedIn</a>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:760px){.team-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  )
}
