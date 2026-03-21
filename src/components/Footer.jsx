const LogoFooter = () => (
  <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '1.15rem', letterSpacing: '0.04em', lineHeight: 1, userSelect: 'none' }}>
    <span style={{ fontWeight: 700, color: 'var(--lime)' }}>BIO_BUSINESS</span>
    <span style={{ fontWeight: 400, fontStyle: 'italic', color: 'rgba(255,255,255,0.6)', marginLeft: '0.3em' }}>SCHOOL</span>
  </span>
)

export default function Footer() {
  return (
    <footer style={{ background: 'var(--dark)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="wrap" style={{ padding: '3rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
        <div>
          <div style={{ marginBottom: '0.5rem' }}>
            <LogoFooter />
          </div>
          <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)' }}>Powered by Redesign Lab · redesignlab.org</div>
        </div>
        <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }} className="footer-cols">
          <div>
            <div style={{ fontFamily: 'var(--fbc)', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '0.6rem' }}>Productos</div>
            {[
              ['Biotech Sprint 01', 'https://wa.me/51974620309?text=Hola%2C%20estoy%20interesado%20en%20el%20curso%20Biotech%20Sprint%2001'],
              ['Bio Business Playbook', 'https://mpago.la/17jbnkb'],
              ['Membresía Biobuilders', '#comunidad']
            ].map(([l, h]) => (
              <div key={l} style={{ marginBottom: '0.35rem' }}>
                <a href={h} target={h.startsWith('http') ? '_blank' : undefined} rel={h.startsWith('http') ? 'noopener noreferrer' : undefined}
                  style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.6)', textDecoration: 'none', transition: 'color 0.18s' }}
                  onMouseEnter={e => e.target.style.color = 'var(--lime)'}
                  onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.6)'}
                >{l}</a>
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontFamily: 'var(--fbc)', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '0.6rem' }}>Contacto</div>
            <div style={{ marginBottom: '0.35rem' }}>
              <a href="mailto:bbs@redesignlab.org" style={{ fontSize: '0.82rem', color: 'var(--lime)', textDecoration: 'none' }}>biobusiness@redesignlab.org</a>
            </div>
            <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.6)' }}>biobusinessschool.org</div>
            <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', marginTop: '0.6rem' }}>© 2026 Bio Business School</div>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:600px){.footer-cols{flex-direction:column;gap:1.5rem}}`}</style>
    </footer>
  )
}
