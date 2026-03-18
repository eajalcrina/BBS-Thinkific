export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--line)' }}>
      <div className="wrap" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem', padding: '2.5rem 2rem' }}>
        <div>
          <div style={{ fontFamily: 'var(--fd)', fontSize: '1.2rem', fontWeight: 700, letterSpacing: '0.06em' }}>
            BIO_<span style={{ color: 'var(--lime)' }}>BUSINESS</span> SCHOOL
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-lo)', marginTop: '0.2rem' }}>Powered by Redesign Lab · redesignlab.org</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p><a href="mailto:bbs@redesignlab.org" style={{ color: 'var(--lime)', textDecoration: 'none', fontSize: '0.8rem' }}>bbs@redesignlab.org</a></p>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-lo)', lineHeight: 1.85 }}>biobusinessschool.org</p>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-lo)', lineHeight: 1.85 }}>© 2026 Bio Business School</p>
        </div>
      </div>
    </footer>
  )
}
