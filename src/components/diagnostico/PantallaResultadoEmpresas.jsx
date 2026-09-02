import { trackCta } from '../../lib/analytics.js'
import { PROGRAMAS } from '../../data/programas.js'

export default function PantallaResultadoEmpresas({ resultado }) {
  const { scoreTotal, scoreMax, dimensiones, contenido, contenidoSecundario } = resultado
  const programa = PROGRAMAS.find(p => p.slug === contenido.programaSlug)
  const programaSecundario = contenidoSecundario
    ? PROGRAMAS.find(p => p.slug === contenidoSecundario.programaSlug)
    : null

  return (
    <div className="fro-wrap" style={{ maxWidth: 680, margin: '0 auto', padding: '5rem 2rem' }}>
      <div className="fro-eyebrow amber" style={{ marginBottom: '0.8rem' }}>Tu resultado</div>
      <h2 className="fro-h2" style={{ marginBottom: '0.6rem' }}>{contenido.nombre}</h2>
      <p className="fro-sm" style={{ marginBottom: '1.8rem', color: 'var(--fro-text-2)' }}>
        {scoreTotal} / {scoreMax} puntos en preparación regenerativa general
      </p>

      <h3 className="fro-h3" style={{ fontSize: '1rem', marginBottom: '0.8rem' }}>Análisis por dimensión</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginBottom: '2.2rem' }}>
        {dimensiones.map(d => (
          <div key={d.nombre}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '0.3rem' }}>
              <span>{d.nombre}</span>
              <span>{d.porcentaje}%</span>
            </div>
            <div style={{ height: 6, background: 'var(--fro-line)', borderRadius: 3, overflow: 'hidden', marginBottom: '0.4rem' }}>
              <div style={{ height: '100%', width: `${d.porcentaje}%`, background: 'var(--fro-amber)' }} />
            </div>
            <p className="fro-sm" style={{ color: 'var(--fro-text-2)' }}>{d.lectura}</p>
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
          onClick={() => trackCta(`diagnostico_resultado_${programa.slug}`, 'diagnostico_empresas', `/programas/${programa.slug}`)}
          className="fro-btn fro-btn-amber fro-btn-lg"
        >
          {programa.titulo} — {contenido.programaCtaNota} <span aria-hidden>→</span>
        </a>
      )}

      {programaSecundario && (
        <p className="fro-sm" style={{ marginTop: '1.4rem', color: 'var(--fro-text-2)' }}>
          Ojo: además de esto, tu preparación para levantar capital también está baja —{' '}
          <a
            href={`/programas/${programaSecundario.slug}`}
            onClick={() => trackCta(`diagnostico_resultado_secundario_${programaSecundario.slug}`, 'diagnostico_empresas', `/programas/${programaSecundario.slug}`)}
            style={{ color: 'var(--fro-amber)', textDecoration: 'underline' }}
          >
            {programaSecundario.titulo}
          </a>{' '}
          podría ser tu segundo paso.
        </p>
      )}
    </div>
  )
}
