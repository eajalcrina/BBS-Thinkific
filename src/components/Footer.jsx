const Logo = () => (
  <span style={{ fontFamily:'var(--fsyne)', fontWeight:700, fontSize:'1.05rem', letterSpacing:'-0.02em', color:'var(--fro-text)' }}>
    bio<span style={{ color:'var(--fro-amber)' }}>/</span>business
  </span>
)

const YEAR = new Date().getFullYear()

export default function Footer() {
  return (
    <footer role="contentinfo" style={{ background:'var(--fro-bg)', borderTop:'1px solid var(--fro-line)' }}>
      <div className="fro-wrap" style={{ padding:'4rem 2rem 2rem' }}>

        <div className="footer-grid" style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr', gap:'3rem', marginBottom:'3rem' }}>
          <div>
            <Logo/>
            <p className="fro-sm" style={{ marginTop:'0.8rem', maxWidth:300 }}>
              Plataforma de inteligencia para bionegocios rentables en América Latina. Convertimos biodiversidad en activos económicos de impacto global.
            </p>
            <p style={{ marginTop:'0.8rem', fontSize:'0.78rem', color:'var(--fro-text-3)' }}>
              Powered by{' '}
              <a
                href="https://redesignlab.org/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color:'var(--fro-text-2)', textDecoration:'none', borderBottom:'1px solid var(--fro-line-2)', transition:'color 0.18s, border-color 0.18s' }}
                onMouseEnter={e=>{ e.currentTarget.style.color='var(--fro-amber)'; e.currentTarget.style.borderColor='var(--fro-amber)'; }}
                onMouseLeave={e=>{ e.currentTarget.style.color='var(--fro-text-2)'; e.currentTarget.style.borderColor='var(--fro-line-2)'; }}
              >Redesign Lab.</a>
            </p>
          </div>

          <nav aria-label="Productos">
            <h4 className="fro-eyebrow" style={{ fontSize:'0.68rem', marginBottom:'1rem' }}>Productos</h4>
            <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:'0.5rem' }}>
              {[
                ['Biotech Sprint 01', '/sprint01'],
                ['Bio Business Playbook', 'https://mpago.la/17jbnkb'],
                ['Membresía Bio/Builders', '#comunidad'],
              ].map(([l,h]) => (
                <li key={l}>
                  <a href={h}
                    target={h.startsWith('http')?'_blank':undefined}
                    rel={h.startsWith('http')?'noopener noreferrer':undefined}
                    style={{ fontSize:'0.85rem', color:'var(--fro-text-2)', textDecoration:'none', transition:'color 0.18s' }}
                    onMouseEnter={e=>e.currentTarget.style.color='var(--fro-amber)'}
                    onMouseLeave={e=>e.currentTarget.style.color='var(--fro-text-2)'}
                  >{l}</a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Navegación">
            <h4 className="fro-eyebrow" style={{ fontSize:'0.68rem', marginBottom:'1rem' }}>Explorar</h4>
            <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:'0.5rem' }}>
              {[
                ['El problema', '#problema'],
                ['Bio/Builders', '#biobuilder'],
                ['Playbook',     '#libro'],
                ['Equipo',       '#equipo'],
              ].map(([l,h]) => (
                <li key={l}>
                  <a href={h}
                    style={{ fontSize:'0.85rem', color:'var(--fro-text-2)', textDecoration:'none', transition:'color 0.18s' }}
                    onMouseEnter={e=>e.currentTarget.style.color='var(--fro-amber)'}
                    onMouseLeave={e=>e.currentTarget.style.color='var(--fro-text-2)'}
                  >{l}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h4 className="fro-eyebrow" style={{ fontSize:'0.68rem', marginBottom:'1rem' }}>Contacto</h4>
            <a href="mailto:biobusiness@redesignlab.org" style={{ display:'block', fontSize:'0.85rem', color:'var(--fro-amber)', textDecoration:'none', marginBottom:'0.4rem', wordBreak:'break-all' }}>
              biobusiness@redesignlab.org
            </a>
            <p style={{ fontSize:'0.82rem', color:'var(--fro-text-2)' }}>Lima, Perú</p>
            <p style={{ fontSize:'0.8rem', color:'var(--fro-text-3)', marginTop:'0.4rem' }}>biobusinessschool.org</p>
          </div>
        </div>

        <div style={{ borderTop:'1px solid var(--fro-line)', paddingTop:'1.5rem', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'1rem' }}>
          <p style={{ fontSize:'0.76rem', color:'var(--fro-text-3)' }}>
            © {YEAR} Bio Business School · Diseño y desarrollo por{' '}
            <a
              href="https://www.thousandfold.la/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color:'var(--fro-text-2)', textDecoration:'none', borderBottom:'1px solid var(--fro-line-2)', transition:'color 0.18s, border-color 0.18s' }}
              onMouseEnter={e=>{ e.currentTarget.style.color='var(--fro-amber)'; e.currentTarget.style.borderColor='var(--fro-amber)'; }}
              onMouseLeave={e=>{ e.currentTarget.style.color='var(--fro-text-2)'; e.currentTarget.style.borderColor='var(--fro-line-2)'; }}
            >Thousandfold</a>
          </p>
          <p style={{ fontSize:'0.76rem', color:'var(--fro-text-3)' }}>
            Lanzamiento Q2 2026
          </p>
        </div>
      </div>

      <style>{`
        @media(max-width: 860px){
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 2rem !important; }
        }
        @media(max-width: 520px){
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  )
}
