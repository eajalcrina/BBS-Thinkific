import { useState } from 'react'
import FadeIn from '../FadeIn.jsx'

const cards = [
  { icon: '🗂️', title: 'Problem Statement Card', desc: 'Define el problema que quieres atacar, el mercado afectado y por qué América Latina tiene ventaja en ese problema.' },
  { icon: '🔬', title: 'Tech Stack Card', desc: 'La tecnología más prometedora para resolver tu problema, con evaluación de madurez y costo de acceso estimado.' },
  { icon: '🧩', title: 'Bio Business Model Canvas', desc: 'Canvas de 8 dimensiones adaptado al biotech latinoamericano: propuesta de valor, flujos de ingreso, activos científicos.' },
  { icon: '🗺️', title: 'Fundraising Roadmap', desc: 'Fuentes de capital priorizadas + borrador de elevator pitch + los 3 próximos pasos accionables.' },
]

function Card({ icon, title, desc }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--cream)',
        borderRadius: 16,
        padding: '1.6rem',
        transition: 'transform 0.25s var(--ease), box-shadow 0.25s var(--ease)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? '0 16px 48px rgba(14,14,14,0.1)' : 'none',
      }}
    >
      <div style={{
        width: 44, height: 44, borderRadius: '50%',
        background: 'rgba(243,39,105,0.08)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1.4rem', marginBottom: '0.8rem',
      }}>{icon}</div>
      <div style={{
        fontFamily: 'var(--fbc)', fontSize: '0.82rem', fontWeight: 700,
        textTransform: 'uppercase', letterSpacing: '0.08em',
        color: 'var(--dark)', marginBottom: '0.4rem',
      }}>{title}</div>
      <div style={{
        fontFamily: 'var(--fdm)', fontSize: '0.84rem',
        color: 'var(--t-dark2)', lineHeight: 1.6,
      }}>{desc}</div>
    </div>
  )
}

export default function SprintStarterKit() {
  return (
    <section className="sec" id="starterkit" style={{ background: 'var(--white)', position: 'relative', overflow: 'hidden' }}>
      <div className="wrap" style={{ textAlign: 'center' }}>
        <FadeIn>
          <div className="label">Tu entregable final</div>
        </FadeIn>

        <FadeIn delay={0.06}>
          <h2 style={{
            fontFamily: 'var(--fout)', fontWeight: 300,
            fontSize: 'clamp(1.8rem,3vw,3rem)',
            color: 'var(--dark)',
          }}>
            Biotech Business <span style={{ fontWeight: 700 }}>Starter Kit</span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p style={{
            fontSize: '0.95rem', color: 'var(--t-dark2)',
            maxWidth: 640, margin: '0 auto', lineHeight: 1.7,
          }}>
            El entregable que ningún otro programa de la región ofrece: cuatro piezas construidas semana a semana que forman el esqueleto completo de tu biotech.
          </p>
        </FadeIn>

        <style>{`
          .sk-grid{display:grid;grid-template-columns:1fr 1fr;gap:1.2rem}
          @media(max-width:760px){.sk-grid{grid-template-columns:1fr}}
        `}</style>

        <div className="sk-grid" style={{ marginTop: '2rem', textAlign: 'left' }}>
          {cards.map((c, i) => (
            <FadeIn key={i} delay={i * 0.06}>
              <Card icon={c.icon} title={c.title} desc={c.desc} />
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <p style={{
            fontSize: '0.82rem', color: 'var(--t-dark3)',
            textAlign: 'center', marginTop: '2rem',
          }}>
            El Starter Kit es también el insumo directo para aplicar al Bootcamp 101 — el siguiente nivel del ecosistema BBS × 404.
          </p>
        </FadeIn>

        <FadeIn delay={0.35}>
          <div style={{ marginTop: '1.5rem' }}>
            <a
              className="btn btn-dark"
              href="#modulos"
              onClick={e => { e.preventDefault(); document.querySelector('#modulos')?.scrollIntoView({ behavior: 'smooth' }) }}
            >
              Ver los 4 módulos →
            </a>
          </div>
        </FadeIn>
      </div>

      <div style={{ position: 'absolute', bottom: -1, left: 0, right: 0 }}>
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ width: '100%', height: 60, display: 'block' }}>
          <path d="M0,30 C360,0 1080,60 1440,30 L1440,60 L0,60 Z" fill="var(--dark)" />
        </svg>
      </div>
    </section>
  )
}
