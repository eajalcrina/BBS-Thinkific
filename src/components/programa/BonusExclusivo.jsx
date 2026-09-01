import FadeIn from '../FadeIn.jsx'

export default function BonusExclusivo({ programa }) {
  return (
    <section className="fro-sec" style={{ background: 'var(--fro-bg)' }}>
      <div className="fro-wrap">
        <FadeIn><div className="fro-eyebrow amber" style={{ marginBottom: '1.2rem' }}>Bonus exclusivo</div></FadeIn>
        <FadeIn delay={0.06}>
          <p className="fro-lead" style={{ maxWidth: 720 }}>{programa.bonus}</p>
        </FadeIn>
      </div>
    </section>
  )
}
