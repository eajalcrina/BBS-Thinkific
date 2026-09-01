import FadeIn from '../FadeIn.jsx'

export default function NoEsParaTi({ items }) {
  return (
    <section className="fro-sec fro-bg-white fro-on-light">
      <div className="fro-wrap">
        <FadeIn><div className="fro-eyebrow" style={{ marginBottom: '1.2rem' }}>Esto no es para ti si...</div></FadeIn>
        <FadeIn delay={0.06}>
          <ul className="fro-feat" style={{ maxWidth: 720 }}>
            {items.map(t => <li key={t}>{t}</li>)}
          </ul>
        </FadeIn>
      </div>
    </section>
  )
}
