import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav.jsx'
import Footer from '../components/Footer.jsx'

export default function Privacy() {
  useEffect(() => {
    document.title = 'Política de Privacidad | Bio Business School'
    window.scrollTo(0, 0)
    return () => { document.title = 'Bio Business School' }
  }, [])

  return (
    <>
      <a href="#main" className="skip-link" style={{ position:'absolute', left:-9999, top:0 }}>Ir al contenido</a>
      <Nav/>
      <main id="main">
        <section className="fro-sec" style={{ background:'var(--fro-bg)', paddingTop:'8rem' }}>
          <div className="fro-wrap" style={{ maxWidth:820 }}>

            <div className="fro-eyebrow" style={{ marginBottom:'1.2rem' }}>Legal</div>

            <h1 className="fro-h2" style={{ marginBottom:'1.6rem', fontSize:'clamp(2rem, 5vw, 3.4rem)' }}>
              Política de{' '}
              <span className="fro-italic-amber">Privacidad</span>
            </h1>

            <p className="fro-sm" style={{ marginBottom:'2.8rem', color:'var(--fro-text-3)' }}>
              Última actualización: 18 de abril de 2026
            </p>

            <div style={{ display:'flex', flexDirection:'column', gap:'2rem' }}>

              <section>
                <h2 className="fro-h3" style={{ marginBottom:'0.8rem' }}>1. Quiénes somos</h2>
                <p className="fro-body">
                  Bio Business School (BBS) es una plataforma educativa operada por Redesign Lab, con domicilio en Lima, Perú.
                  Puedes contactarnos en{' '}
                  <a href="mailto:biobusiness@redesignlab.org" style={{ color:'var(--fro-amber)', textDecoration:'none', borderBottom:'1px solid var(--fro-amber-25)' }}>
                    biobusiness@redesignlab.org
                  </a>.
                </p>
              </section>

              <section>
                <h2 className="fro-h3" style={{ marginBottom:'0.8rem' }}>2. Qué datos recopilamos</h2>
                <p className="fro-body" style={{ marginBottom:'0.8rem' }}>
                  Cuando te registras en nuestra comunidad Emprendedores o solicitas información por WhatsApp, recopilamos:
                </p>
                <ul className="fro-feat">
                  <li>Nombre, apellido y correo electrónico</li>
                  <li>Teléfono (opcional) y país de residencia</li>
                  <li>Datos de navegación agregados y anónimos (Google Analytics): país, dispositivo, páginas vistas, clicks en CTAs</li>
                </ul>
              </section>

              <section>
                <h2 className="fro-h3" style={{ marginBottom:'0.8rem' }}>3. Cómo usamos tus datos</h2>
                <ul className="fro-feat">
                  <li>Enviarte información sobre el programa Bio Business School, eventos y recursos</li>
                  <li>Gestionar tu acceso a la comunidad de Emprendedores y al grupo de WhatsApp</li>
                  <li>Medir el rendimiento de nuestro sitio de forma agregada (sin identificarte individualmente)</li>
                  <li>Responder consultas comerciales enviadas por WhatsApp o correo</li>
                </ul>
              </section>

              <section>
                <h2 className="fro-h3" style={{ marginBottom:'0.8rem' }}>4. Con quién compartimos tus datos</h2>
                <p className="fro-body" style={{ marginBottom:'0.8rem' }}>
                  No vendemos tus datos. Los compartimos únicamente con proveedores necesarios para operar:
                </p>
                <ul className="fro-feat">
                  <li>Google Analytics (métricas de sitio, IP anonimizada)</li>
                  <li>Proveedores de email marketing y CRM para enviarte comunicaciones</li>
                  <li>MercadoPago, si realizas una compra (libro o curso)</li>
                </ul>
              </section>

              <section>
                <h2 className="fro-h3" style={{ marginBottom:'0.8rem' }}>5. Tus derechos</h2>
                <p className="fro-body" style={{ marginBottom:'0.8rem' }}>
                  Conforme a la Ley 29733 de Protección de Datos Personales del Perú y el RGPD (si aplica), puedes:
                </p>
                <ul className="fro-feat">
                  <li>Acceder a los datos que tenemos sobre ti</li>
                  <li>Rectificar datos incorrectos</li>
                  <li>Solicitar la eliminación de tus datos (derecho al olvido)</li>
                  <li>Retirar tu consentimiento para comunicaciones comerciales</li>
                  <li>Oponerte al tratamiento o solicitar portabilidad</li>
                </ul>
                <p className="fro-body" style={{ marginTop:'0.8rem' }}>
                  Para ejercer cualquier derecho, escríbenos a{' '}
                  <a href="mailto:biobusiness@redesignlab.org" style={{ color:'var(--fro-amber)', textDecoration:'none', borderBottom:'1px solid var(--fro-amber-25)' }}>
                    biobusiness@redesignlab.org
                  </a>.
                </p>
              </section>

              <section>
                <h2 className="fro-h3" style={{ marginBottom:'0.8rem' }}>6. Cookies y tecnologías similares</h2>
                <p className="fro-body">
                  Usamos Google Analytics con la IP anonimizada para entender el uso del sitio. No utilizamos cookies publicitarias ni hacemos seguimiento individual entre sitios. Puedes bloquear cookies desde la configuración de tu navegador.
                </p>
              </section>

              <section>
                <h2 className="fro-h3" style={{ marginBottom:'0.8rem' }}>7. Retención</h2>
                <p className="fro-body">
                  Mantenemos tus datos mientras seas parte de la comunidad o hasta que solicites su eliminación. Los registros de compras se conservan por el plazo exigido por la normativa tributaria peruana.
                </p>
              </section>

              <section>
                <h2 className="fro-h3" style={{ marginBottom:'0.8rem' }}>8. Cambios a esta política</h2>
                <p className="fro-body">
                  Podemos actualizar esta política. La fecha en la parte superior indica la última modificación. Los cambios relevantes serán notificados por correo a los suscriptores activos.
                </p>
              </section>

            </div>

            <div style={{ marginTop:'3.5rem', paddingTop:'2rem', borderTop:'1px solid var(--fro-line)' }}>
              <Link to="/" className="fro-btn fro-btn-ghost">
                <span aria-hidden>←</span> Volver al inicio
              </Link>
            </div>

          </div>
        </section>
      </main>
      <Footer/>
    </>
  )
}
