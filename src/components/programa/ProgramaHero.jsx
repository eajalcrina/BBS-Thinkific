import FadeIn from '../FadeIn.jsx'
import ProgramaCTA from './ProgramaCTA.jsx'

export default function ProgramaHero({ programa }) {
  return (
    <section className="fro-sec" style={{ paddingTop: '8rem', background: 'linear-gradient(160deg, var(--fro-bg) 0%, #131313 55%, var(--fro-bg-3) 100%)' }}>
      <div className="fro-wrap">
        <FadeIn>
          <div className="fro-chip" style={{ marginBottom: '1.6rem' }}>
            {programa.status === 'live' ? 'Disponible ahora' : 'Reserva tu cupo — cohorte Q3 2026'}
          </div>
        </FadeIn>
        <FadeIn delay={0.06}>
          <h1 className="fro-display" style={{ fontSize: 'clamp(2.1rem, 5vw, 3.6rem)', maxWidth: 820, marginBottom: '1.4rem' }}>
            {programa.titulo}
          </h1>
        </FadeIn>
        <FadeIn delay={0.12}>
          <p className="fro-lead" style={{ maxWidth: 720, marginBottom: '2rem', fontSize: '1.15rem' }}>
            {programa.notaCorta}
          </p>
        </FadeIn>
        <FadeIn delay={0.18}>
          <ProgramaCTA programa={programa} dark />
        </FadeIn>
      </div>
    </section>
  )
}
