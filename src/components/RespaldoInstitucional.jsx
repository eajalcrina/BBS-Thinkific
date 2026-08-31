import FadeIn from './FadeIn.jsx'

export default function RespaldoInstitucional() {
  return (
    <section id="respaldo" className="fro-sec-t" style={{ background:'var(--fro-bg)' }}>
      <div className="fro-wrap">
        <FadeIn><div className="fro-eyebrow amber" style={{ marginBottom:'1.2rem' }}>Quién está detrás</div></FadeIn>
        <FadeIn delay={0.08}>
          <p className="fro-lead" style={{ maxWidth:820 }}>
            Bio Business School nace de Redesign Lab, la empresa que Eddie y Lorenzo fundaron y desde la cual han desarrollado distintas iniciativas de transformación económica en la región. Antes de este proyecto, ambos han ayudado a diseñar y ejecutar programas de formación para instituciones como MIT Professional Education, la Universidad de Chicago, CATIE e INCAE. Somos Claude Network Partners, porque creemos que la inteligencia artificial es indispensable para este proceso. Y seguimos sumando alianzas que refuercen la misma tesis.
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
