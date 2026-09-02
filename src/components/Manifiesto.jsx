import FadeIn from './FadeIn.jsx'

export default function Manifiesto() {
  return (
    <section id="manifiesto" className="fro-sec" style={{ background:'var(--fro-bg)' }}>
      <div className="fro-wrap">
        <FadeIn><div className="fro-eyebrow amber" style={{ marginBottom:'1.6rem' }}>Por qué hacemos esto</div></FadeIn>

        <FadeIn delay={0.08}>
          <p className="fro-lead" style={{ maxWidth:760, marginBottom:'1.4rem' }}>
            Donde muchos ven ineficiencia y limitación, nosotros vemos una oportunidad real de inversión y retorno.
          </p>
        </FadeIn>
        <FadeIn delay={0.14}>
          <p className="fro-lead" style={{ maxWidth:760, marginBottom:'1.4rem' }}>
            Creemos que el futuro de América Latina y el Caribe pasa por transformar las industrias que dependen de sistemas vivos.
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="fro-lead" style={{ maxWidth:760, marginBottom:'1.4rem' }}>
            Para lograrlo hacen falta profesionales y empresas que dominen la inteligencia artificial, sin perder la inteligencia territorial que ya tienen: el conocimiento del campo, del agua, de la tierra que nadie más tiene.
          </p>
        </FadeIn>
        <FadeIn delay={0.26}>
          <p className="fro-lead" style={{ maxWidth:760, marginBottom:'1.4rem' }}>
            Nuestra ventaja no está en seguir vendiendo materia prima barata. Está en el agua, la biodiversidad, los principios activos que solo existen aquí.
          </p>
        </FadeIn>
        <FadeIn delay={0.32}>
          <p className="fro-lead" style={{ maxWidth:760 }}>
            Convertir esa ventaja en resultado real solo requiere mejores herramientas: las competencias y capacidades que transforman desventaja en crecimiento, competitividad y desarrollo.
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
