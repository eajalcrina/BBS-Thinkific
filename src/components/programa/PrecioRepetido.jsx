import FadeIn from '../FadeIn.jsx'
import ProgramaCTA from './ProgramaCTA.jsx'

export default function PrecioRepetido({ programa }) {
  return (
    <section className="fro-sec fro-bg-light fro-on-light">
      <div className="fro-wrap">
        <FadeIn><div className="fro-eyebrow" style={{ marginBottom: '1.2rem' }}>Precio</div></FadeIn>
        <FadeIn delay={0.06}>
          <h2 className="fro-h2" style={{ marginBottom: '1.6rem', maxWidth: 640 }}>¿Listo para dar el siguiente paso?</h2>
        </FadeIn>
        <FadeIn delay={0.12}>
          <ProgramaCTA programa={programa} />
        </FadeIn>
      </div>
    </section>
  )
}
