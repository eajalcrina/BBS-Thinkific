export default function Footer() {
  return (
    <footer style={{borderTop:'1px solid var(--border)'}}>
      <div className="container" style={{padding:'3rem 2rem', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'1.5rem'}}>
        <div>
          <img src="/logo-green.png" alt="Bio Business School" style={{height:20, width:'auto', marginBottom:'0.5rem', filter:'brightness(1.0)'}}/>
          <div style={{fontSize:'0.72rem', color:'var(--text-3)'}}>Powered by Redesign Lab · redesignlab.org</div>
        </div>
        <div style={{display:'flex', gap:'3rem', flexWrap:'wrap'}} className="footer-links">
          <div>
            <div style={{fontFamily:'var(--fd)', fontSize:'0.65rem', fontWeight:600, letterSpacing:'0.15em', textTransform:'uppercase', color:'var(--text-3)', marginBottom:'0.6rem'}}>Productos</div>
            {[['Biotech Sprint 01','https://biobusinessschool.org/sprint01'],['Bio Business Playbook','https://biobusinessschool.org/playbook'],['Membresía Biobuilders','#comunidad']].map(([l,h])=>(
              <div key={l} style={{marginBottom:'0.35rem'}}>
                <a href={h} style={{fontSize:'0.8rem', color:'var(--text-2)', textDecoration:'none', transition:'color 0.18s'}}
                  onMouseEnter={e=>e.target.style.color='#fff'}
                  onMouseLeave={e=>e.target.style.color='var(--text-2)'}
                >{l}</a>
              </div>
            ))}
          </div>
          <div>
            <div style={{fontFamily:'var(--fd)', fontSize:'0.65rem', fontWeight:600, letterSpacing:'0.15em', textTransform:'uppercase', color:'var(--text-3)', marginBottom:'0.6rem'}}>Contacto</div>
            <div style={{marginBottom:'0.35rem'}}><a href="mailto:bbs@redesignlab.org" style={{fontSize:'0.8rem', color:'var(--lime)', textDecoration:'none'}}>bbs@redesignlab.org</a></div>
            <div style={{fontSize:'0.8rem', color:'var(--text-2)'}}>biobusinessschool.org</div>
            <div style={{fontSize:'0.75rem', color:'var(--text-3)', marginTop:'0.6rem'}}>© 2026 Bio Business School</div>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:600px){.footer-links{flex-direction:column;gap:1.5rem}}`}</style>
    </footer>
  )
}
