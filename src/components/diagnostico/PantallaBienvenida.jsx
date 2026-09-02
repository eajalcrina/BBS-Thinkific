export default function PantallaBienvenida({ eyebrow, titulo, descripcion, meta, ctaTexto, onStart }) {
  return (
    <div className="fro-wrap" style={{ maxWidth: 640, margin: '0 auto', padding: '6rem 2rem', textAlign: 'center' }}>
      <div className="fro-eyebrow amber" style={{ marginBottom: '1.2rem' }}>
        {eyebrow}
      </div>
      <h1 className="fro-h2" style={{ marginBottom: '1.4rem' }}>
        {titulo}
      </h1>
      <p className="fro-lead" style={{ marginBottom: '2.2rem' }}>
        {descripcion}
      </p>
      <p className="fro-sm" style={{ marginBottom: '2.4rem', color: 'var(--fro-text-2)' }}>
        {meta}
      </p>
      <button type="button" onClick={onStart} className="fro-btn fro-btn-amber fro-btn-lg">
        {ctaTexto} <span aria-hidden>→</span>
      </button>
    </div>
  )
}
