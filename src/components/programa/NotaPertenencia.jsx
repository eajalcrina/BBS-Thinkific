import FadeIn from '../FadeIn.jsx'

export default function NotaPertenencia() {
  return (
    <section className="fro-sec-t" style={{ background: 'var(--fro-bg)' }}>
      <div className="fro-wrap">
        <FadeIn><div className="fro-eyebrow amber" style={{ marginBottom: '1.2rem' }}>Al inscribirte</div></FadeIn>
        <FadeIn delay={0.06}>
          <p className="fro-lead" style={{ maxWidth: 720 }}>
            Te sumas automáticamente a la Comunidad Biobuilders: noticias del sector, convocatorias de empleo, fuentes de financiamiento no reembolsable, y acceso a la red de aliados de BBS.
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
