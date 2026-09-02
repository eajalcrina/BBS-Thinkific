import { trackCta } from '../../lib/analytics.js'
import { PROGRAMAS } from '../../data/programas.js'

export default function PantallaResultado({ resultado, percentil }) {
  const { score, scoreMax, nivel, dimensiones, contenido } = resultado
  const programa = PROGRAMAS.find(p => p.slug === contenido.programaSlug)

  return (
    <div className="fro-wrap" style={{ maxWidth: 680, margin: '0 auto', padding: '5rem 2rem' }}>
      <div className="fro-eyebrow amber" style={{ marginBottom: '0.8rem' }}>Tu resultado</div>
      <h2 className="fro-h2" style={{ marginBottom: '0.6rem' }}>{nivel}</h2>
      <p className="fro-sm" style={{ marginBottom: '1.6rem', color: 'var(--fro-text-2)' }}>
        {score} / {scoreMax} puntos
        {percentil && !percentil.insufficientData && (
          <> · Superaste al {percentil.percentil}% de quienes tomaron este diagnóstico</>
        )}
        {percentil && percentil.insufficientData && (
          <> · Eres de los primeros en tomar este diagnóstico — pronto vas a poder ver cómo te comparas con otros profesionales de la región.</>
        )}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '2.2rem' }}>
        {dimensiones.map(d => (
          <div key={d.nombre}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '0.3rem' }}>
              <span>{d.nombre}</span>
              <span>{d.porcentaje}%</span>
            </div>
            <div style={{ height: 6, background: 'var(--fro-line)', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${d.porcentaje}%`, background: 'var(--fro-amber)' }} />
            </div>
          </div>
        ))}
      </div>

      <p className="fro-body" style={{ marginBottom: '1.8rem' }}>{contenido.diagnostico}</p>

      <h3 className="fro-h3" style={{ fontSize: '1rem', marginBottom: '0.6rem' }}>Fortalezas</h3>
      <ul className="fro-feat" style={{ marginBottom: '1.6rem' }}>
        {contenido.fortalezas.map(f => <li key={f}>{f}</li>)}
      </ul>

      <h3 className="fro-h3" style={{ fontSize: '1rem', marginBottom: '0.6rem' }}>Oportunidad</h3>
      <ul className="fro-feat" style={{ marginBottom: '1.6rem' }}>
        {contenido.oportunidad.map(o => <li key={o}>{o}</li>)}
      </ul>

      <p className="fro-body" style={{ marginBottom: '2.2rem', fontWeight: 600 }}>{contenido.recomendacion}</p>

      {programa && (
        <a
          href={`/programas/${programa.slug}`}
          onClick={() => trackCta(`diagnostico_resultado_${programa.slug}`, 'diagnostico_profesionales', `/programas/${programa.slug}`)}
          className="fro-btn fro-btn-amber fro-btn-lg"
        >
          {programa.titulo} — {contenido.programaCtaNota} <span aria-hidden>→</span>
        </a>
      )}
    </div>
  )
}
