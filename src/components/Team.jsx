import FadeIn from './FadeIn.jsx'

const LiIcon = () => (
  <svg viewBox="0 0 24 24" width="11" height="11" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

const founders = [
  { initials:'EA', name:'Eddie Ajalcriña', role:'CEO & Co-founder', bio:'Emprendedor y estratega con experiencia acumulada liderando bionegocios rentables en la Amazonía y ecosistemas críticos de América Latina.', li:'https://www.linkedin.com/in/eddieajalcrina/', accent:'var(--lime)', bg:'rgba(187,238,0,0.08)' },
  { initials:'LO', name:'Lorenzo Ortiz', role:'CIO & Co-founder', bio:'Estratega e inversionista con perspectiva única para construir bionegocios de impacto regional, integrando inteligencia financiera y conocimiento territorial.', li:'https://www.linkedin.com/in/lorenzoo/', accent:'var(--rose)', bg:'rgba(243,39,105,0.08)' },
]

export default function Team() {
  return (
    <section id="equipo" className="section-tight" style={{background:'var(--bg-team)', borderTop:'1px solid var(--border)', borderBottom:'1px solid var(--border)'}}>
      <div className="container">
        <FadeIn><div className="label muted" style={{marginBottom:'1rem'}}>El equipo</div></FadeIn>
        <FadeIn delay={0.08}>
          <h2 className="t-display t-md" style={{marginBottom:'0.8rem'}}>
            Hacemos que invertir en negocios sostenibles sea <span className="hl">buen negocio</span>
          </h2>
        </FadeIn>
        <FadeIn delay={0.14}>
          <p className="body-l" style={{maxWidth:520, marginBottom:'2.5rem'}}>
            Emprendedores, estrategas e inversionistas. Hemos estado en ambos lados de la mesa.
          </p>
        </FadeIn>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.25rem'}} className="team-grid">
          {founders.map((f,i)=>(
            <FadeIn key={f.name} delay={0.1+i*0.12}>
              <div style={{background:'var(--bg-2)', border:'1px solid var(--border)', borderRadius:8, padding:'1.8rem', display:'flex', alignItems:'flex-start', gap:'1.1rem', transition:'border-color 0.22s'}}
                onMouseEnter={e=>e.currentTarget.style.borderColor='var(--border-2)'}
                onMouseLeave={e=>e.currentTarget.style.borderColor='var(--border)'}
              >
                <div style={{width:50, height:50, borderRadius:'50%', background:f.bg, border:`2px solid ${f.accent}`, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--fd)', fontSize:'1.2rem', fontWeight:700, color:f.accent, flexShrink:0}}>
                  {f.initials}
                </div>
                <div>
                  <h3 style={{fontFamily:'var(--fd)', fontSize:'1.1rem', fontWeight:600, color:'#fff'}}>{f.name}</h3>
                  <div style={{fontFamily:'var(--fd)', fontSize:'0.66rem', fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase', color:f.accent, marginBottom:'0.5rem'}}>{f.role}</div>
                  <p style={{fontSize:'0.83rem', color:'var(--text-2)', lineHeight:1.65, marginBottom:'0.75rem'}}>{f.bio}</p>
                  <a href={f.li} target="_blank" rel="noopener noreferrer"
                    style={{display:'inline-flex', alignItems:'center', gap:'0.4rem', fontFamily:'var(--fd)', fontSize:'0.68rem', fontWeight:600, letterSpacing:'0.08em', textTransform:'uppercase', textDecoration:'none', color:'var(--text-3)', border:'1px solid var(--border-2)', padding:'0.28rem 0.65rem', borderRadius:2, transition:'all 0.18s'}}
                    onMouseEnter={e=>{e.currentTarget.style.color='#fff';e.currentTarget.style.borderColor='var(--border-3)'}}
                    onMouseLeave={e=>{e.currentTarget.style.color='var(--text-3)';e.currentTarget.style.borderColor='var(--border-2)'}}
                  >
                    <LiIcon/> LinkedIn
                  </a>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:760px){.team-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  )
}
