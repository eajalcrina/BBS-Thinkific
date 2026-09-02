export default function PantallaBienvenida({ onStart }) {
  return (
    <div className="fro-wrap" style={{ maxWidth: 640, margin: '0 auto', padding: '6rem 2rem', textAlign: 'center' }}>
      <div className="fro-eyebrow amber" style={{ marginBottom: '1.2rem' }}>
        AUTODIAGNÓSTICO GRATUITO · IA PARA PROFESIONALES
      </div>
      <h1 className="fro-h2" style={{ marginBottom: '1.4rem' }}>
        ¿Qué tan preparado estás frente a la disrupción de la IA?
      </h1>
      <p className="fro-lead" style={{ marginBottom: '2.2rem' }}>
        No medimos si usas IA o no. Medimos si la estás usando para
        desarrollar criterio propio, o para dejar que piense por ti.
      </p>
      <p className="fro-sm" style={{ marginBottom: '2.4rem', color: 'var(--fro-text-2)' }}>
        8 preguntas · 3 minutos · Resultado inmediato con análisis por dimensión.
        <br />
        Tu email se pide antes del resultado, no antes de empezar.
      </p>
      <button type="button" onClick={onStart} className="fro-btn fro-btn-amber fro-btn-lg">
        Iniciar diagnóstico <span aria-hidden>→</span>
      </button>
    </div>
  )
}
