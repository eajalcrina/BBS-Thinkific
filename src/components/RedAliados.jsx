import FadeIn from './FadeIn.jsx'

export default function RedAliados() {
  return (
    <section id="aliados" className="fro-sec fro-bg-light fro-on-light">
      <div className="fro-wrap">
        <FadeIn><div className="fro-eyebrow" style={{ marginBottom:'1.2rem' }}>No estamos solos en esto</div></FadeIn>
        <FadeIn delay={0.08}>
          <h2 className="fro-h2" style={{ marginBottom:'1.4rem', maxWidth:760 }}>
            Amigos y expertos que suman a la conversación
          </h2>
        </FadeIn>
        <FadeIn delay={0.14}>
          <p className="fro-lead" style={{ maxWidth:720 }}>
            En cada programa invitamos a nuestra red, personas que comparten la misma misión de transformar América Latina y el Caribe, para enriquecer el debate en las sesiones. Y más allá de los programas, esa misma red ofrece espacios adicionales para quienes ya tomaron algún curso: experiencias reales de cómo levantar capital, cómo internacionalizar una marca, cómo estructurar un proyecto corporativo, cómo superar desafíos en la escalera corporativa. Conocimiento y experiencia real, no teoría.
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
