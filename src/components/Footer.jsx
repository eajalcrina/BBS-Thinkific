export default function Footer() {
  return (
    <footer style={{ borderTop:'1px solid var(--b1)', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', bottom:0, left:'50%', transform:'translateX(-50%)', width:500, height:200,
        background:'radial-gradient(ellipse, rgba(200,240,0,0.03) 0%, transparent 70%)',
        filter:'blur(30px)', pointerEvents:'none' }}/>
      <div className="wrap" style={{ padding:'3rem 2rem', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'1.5rem', position:'relative' }}>
        <div>
          <img src="/logo-green.png" alt="Bio Business School" style={{ height:20, width:'auto', marginBottom:'0.5rem' }}/>
          <div className="sm">Powered by Redesign Lab · redesignlab.org</div>
        </div>
        <div style={{ display:'flex', gap:'3rem', flexWrap:'wrap' }} className="footer-cols">
          <div>
            <div style={{ fontFamily:'var(--fbc)', fontSize:'0.65rem', fontWeight:600, letterSpacing:'0.15em', textTransform:'uppercase', color:'var(--t3)', marginBottom:'0.6rem' }}>Productos</div>
            {[['Biotech Sprint 01','https://biobusinessschool.org/sprint01'],['Bio Business Playbook','https://biobusinessschool.org/playbook'],['Membresía Biobuilders','#comunidad']].map(([l,h])=>(
              <div key={l} style={{ marginBottom:'0.35rem' }}>
                <a href={h} style={{ fontSize:'0.8rem', color:'var(--t2)', textDecoration:'none', transition:'color 0.18s' }}
                  onMouseEnter={e=>e.target.style.color='#fff'} onMouseLeave={e=>e.target.style.color='var(--t2)'}
                >{l}</a>
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontFamily:'var(--fbc)', fontSize:'0.65rem', fontWeight:600, letterSpacing:'0.15em', textTransform:'uppercase', color:'var(--t3)', marginBottom:'0.6rem' }}>Contacto</div>
            <div style={{ marginBottom:'0.35rem' }}><a href="mailto:bbs@redesignlab.org" style={{ fontSize:'0.8rem', color:'var(--lime)', textDecoration:'none' }}>bbs@redesignlab.org</a></div>
            <div style={{ fontSize:'0.8rem', color:'var(--t2)' }}>biobusinessschool.org</div>
            <div className="sm" style={{ marginTop:'0.6rem' }}>© 2026 Bio Business School</div>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:600px){.footer-cols{flex-direction:column;gap:1.5rem}}`}</style>
    </footer>
  )
}
