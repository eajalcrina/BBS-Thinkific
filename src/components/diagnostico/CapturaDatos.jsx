import { useState } from 'react'

export default function CapturaDatos({ onSubmit }) {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [whatsapp, setWhatsapp] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    onSubmit({ nombre, email, whatsapp })
  }

  return (
    <div className="fro-wrap" style={{ maxWidth: 480, margin: '0 auto', padding: '5rem 2rem' }}>
      <h2 className="fro-h3" style={{ marginBottom: '0.8rem' }}>Ya casi. ¿A dónde te mandamos tu resultado?</h2>
      <p className="fro-body" style={{ marginBottom: '1.8rem' }}>
        Tu resultado se muestra en esta misma pantalla — estos datos son
        para que podamos contactarte con tu recomendación.
      </p>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
        <input
          required
          type="text"
          placeholder="Tu nombre"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          className="fro-field"
        />
        <input
          required
          type="email"
          placeholder="tu@correo.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="fro-field"
        />
        <input
          required
          type="tel"
          placeholder="WhatsApp (con código de país)"
          value={whatsapp}
          onChange={e => setWhatsapp(e.target.value)}
          className="fro-field"
        />
        <button type="submit" className="fro-btn fro-btn-amber fro-btn-lg" style={{ marginTop: '0.4rem' }}>
          Ver mi resultado
        </button>
      </form>
    </div>
  )
}
