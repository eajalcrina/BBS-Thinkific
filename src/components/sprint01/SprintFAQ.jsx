import FadeIn from '../FadeIn.jsx'
import FAQAccordion from './FAQAccordion.jsx'

const faqItems = [
  {
    q: '¿Necesito saber de biología o ciencias?',
    a: 'No. El programa está diseñado para ser accesible desde cualquier perfil profesional. Hay participantes de Economía, Administración y Derecho que aprovechan el Sprint tanto o más que los perfiles STEM.',
  },
  {
    q: '¿Cuánto tiempo por semana necesito dedicar?',
    a: 'Entre 6 y 8 horas semanales durante 4 semanas. El contenido asincrónico es flexible — lo haces a tu ritmo dentro de cada semana. Las sesiones en vivo son 90 minutos una vez por semana.',
  },
  {
    q: '¿Las sesiones en vivo son obligatorias?',
    a: 'No. Si no puedes asistir, tienes acceso a las grabaciones durante 30 días. Pero son donde ocurre lo más valioso del programa: feedback real, preguntas reales, casos reales sin editar.',
  },
  {
    q: '¿El Starter Kit lo construyo solo o hay acompañamiento?',
    a: 'Construyes cada pieza de forma autónoma durante la semana, y en la sesión en vivo recibes feedback del especialista. En la Sesión 03, hay un workshop donde algunos participantes presentan su Canvas y reciben retroalimentación directa.',
  },
  {
    q: '¿Qué pasa si termino el Sprint y quiero seguir?',
    a: 'Los inscritos Early Bird reciben un descuento directo de $40 en el Bootcamp 101 — el siguiente nivel del ecosistema BBS × 404, donde el Starter Kit se convierte en un negocio operativo.',
  },
  {
    q: '¿El Starter Kit tiene valor más allá del curso?',
    a: 'Sí. Es el documento de entrada al Bootcamp 101 y a la red BBS × 404. También es un documento ejecutivo que puedes compartir con potenciales socios, mentores o inversores como primera versión de tu tesis de negocio.',
  },
  {
    q: '¿Hay comunidad después del programa?',
    a: 'Sí. Todos los inscritos se integran automáticamente a la comunidad Starter de Biobuilders BBS — sin costo adicional.',
  },
  {
    q: '¿El certificado tiene reconocimiento institucional?',
    a: 'El certificado lleva el respaldo de BBS y 404 Tech Found, con carga horaria verificable de 30+ horas. Es descargable, compartible en LinkedIn y reconocido por la red de organizaciones aliadas de ambas instituciones.',
  },
]

export default function SprintFAQ() {
  return (
    <section
      id="faq"
      className="sec"
      style={{ background: 'var(--cream)', position: 'relative', overflow: 'hidden' }}
    >
      <div className="wrap">
        <FadeIn>
          <div className="label">Preguntas frecuentes</div>
          <h2 style={{
            fontFamily: 'var(--fout)', fontWeight: 300,
            fontSize: 'clamp(1.5rem,2.5vw,2.4rem)', color: 'var(--dark)',
            marginBottom: '2rem',
          }}>
            Resolvemos tus dudas
          </h2>
        </FadeIn>

        <FadeIn>
          <div style={{ maxWidth: 740, margin: '0 auto' }}>
            <FAQAccordion items={faqItems} />
          </div>
        </FadeIn>
      </div>

      {/* Bottom wave to rose */}
      <div style={{ position: 'absolute', bottom: -1, left: 0, right: 0 }}>
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ width: '100%', height: 60, display: 'block' }}>
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="var(--rose)" />
        </svg>
      </div>
    </section>
  )
}
