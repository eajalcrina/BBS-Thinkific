export default function PreguntaScreen({ pregunta, numero, total, onAnswer }) {
  return (
    <div className="fro-wrap" style={{ maxWidth: 640, margin: '0 auto', padding: '5rem 2rem' }}>
      <div className="fro-sm" style={{ marginBottom: '0.6rem', color: 'var(--fro-text-2)' }}>
        Pregunta {numero} de {total}
      </div>
      <div style={{ height: 4, background: 'var(--fro-line)', borderRadius: 2, marginBottom: '2.4rem', overflow: 'hidden' }}>
        <div
          style={{
            height: '100%',
            width: `${(numero / total) * 100}%`,
            background: 'var(--fro-amber)',
            transition: 'width 0.3s var(--ease)',
          }}
        />
      </div>
      <h2 className="fro-h3" style={{ marginBottom: '1.8rem' }}>{pregunta.pregunta}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
        {pregunta.opciones.map((opcion, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onAnswer(opcion.valor)}
            className="fro-btn"
            style={{
              justifyContent: 'flex-start',
              textAlign: 'left',
              padding: '1rem 1.2rem',
              border: '1.5px solid var(--fro-line-2)',
              color: 'var(--fro-text)',
              background: 'transparent',
              whiteSpace: 'normal',
            }}
          >
            {opcion.texto}
          </button>
        ))}
      </div>
    </div>
  )
}
