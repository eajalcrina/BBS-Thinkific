export default function Footer() {
  return (
    <footer style={{ background:'var(--dark)', borderTop:'1px solid rgba(255,255,255,0.06)' }}>
      <div className="wrap" style={{ padding:'3rem 2rem', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'1.5rem' }}>
        <div>
          <img src="/logo-green.png" alt="Bio Business School" style={{ height:22, width:'auto', marginBottom:'0.5rem' }}/>
          <div style={{ fontSize:'0.72rem', color:'rgba(255,255,255,0.35)' }}>Powered by Redesign Lab · redesignlab.org</div>
        </div>
        <div style={{ display:'flex', gap:'3rem', flexWrap:'wrap' }} className="footer-cols">
          <div>
            <div style={{ fontFamily:'var(--fbc)', fontSize:'0.65rem', fontWeight:600, letterSpacing:'0.15em', textTransform:'uppercase', color:'rgba(255,255,255,0.3)', marginBottom:'0.6rem' }}>Productos</div>
            {[['Biotech Sprint 01','https://biobusinessschool.org/sprint01'],['Bio Business Playbook','https://biobusinessschool.org/playbook'],['Membresía Biobuilders','#comunidad']].map(([l,h])=>(
              <div key={l} style={{ marginBottom:'0.35rem' }}>
                <a href={h} style={{ fontSize:'0.82rem', color:'rgba(255,255,255,0.6)', textDecoration:'none', transition:'color 0.18s' }}
                  onMouseEnter={e=>e.target.style.color='var(--lime)'}
                  onMouseLeave={e=>e.target.style.color='rgba(255,255,255,0.6)'}
                >{l}</a>
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontFamily:'var(--fbc)', fontSize:'0.65rem', fontWeight:600, letterSpacing:'0.15em', textTransform:'uppercase', color:'rgba(255,255,255,0.3)', marginBottom:'0.6rem' }}>Contacto</div>
            <div style={{ marginBottom:'0.35rem' }}><a href="mailto:bbs@redesignlab.org" style={{ fontSize:'0.82rem', color:'var(--lime)', textDecoration:'none' }}>bbs@redesignlab.org</a></div>
            <div style={{ fontSize:'0.82rem', color:'rgba(255,255,255,0.6)' }}>biobusinessschool.org</div>
            <div style={{ fontSize:'0.75rem', color:'rgba(255,255,255,0.3)', marginTop:'0.6rem' }}>© 2026 Bio Business School</div>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:600px){.footer-cols{flex-direction:column;gap:1.5rem}}`}</style>
    </footer>
  )
}
