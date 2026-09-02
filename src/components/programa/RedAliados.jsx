import FadeIn from '../FadeIn.jsx'

export default function RedAliados() {
  return (
    <section className="fro-sec-t" style={{ background: 'var(--fro-bg)' }}>
      <div className="fro-wrap">
        <FadeIn><div className="fro-eyebrow amber" style={{ marginBottom: '1.2rem' }}>No estamos solos en esto</div></FadeIn>
        <FadeIn delay={0.06}>
          <p className="fro-lead" style={{ maxWidth: 720 }}>
            En cada programa invitamos a nuestra red, personas que comparten la misma misión de transformar América Latina y el Caribe, para enriquecer el debate en las sesiones. Y más allá de los programas, esa misma red ofrece espacios adicionales para quienes ya tomaron algún curso: experiencias reales de cómo levantar capital, cómo internacionalizar una marca, cómo estructurar un proyecto corporativo, cómo superar desafíos en la escalera corporativa. Conocimiento y experiencia real, no teoría.
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
