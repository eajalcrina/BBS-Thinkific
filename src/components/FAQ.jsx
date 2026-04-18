import FadeIn from './FadeIn.jsx'
import FAQAccordion from './sprint01/FAQAccordion.jsx'

/**
 * FAQ items — preguntas clave sobre BBS.
 * Estas preguntas también alimentan el schema FAQPage en index.html
 * (mantener sincronizado si se agregan/editan).
 */
export const HOME_FAQ_ITEMS = [
  {
    q: '¿Qué es un Bio/Builder?',
    a: 'Un Bio/Builder es un líder híbrido que domina simultáneamente la ciencia, la tecnología y las finanzas de impacto. Es el perfil que América Latina necesita para convertir su biodiversidad en bionegocios rentables. A diferencia de un MBA tradicional, el Bio/Builder diseña modelos económicos que regeneran territorio en lugar de extraer valor.',
  },
  {
    q: '¿En qué se diferencia Bio Business School de un MBA tradicional?',
    a: 'Los MBA clásicos maximizan retorno financiero a corto plazo sin entender biología molecular ni territorio, lo que ha llevado a décadas de capital en fuga desde la región. BBS forma un perfil inverso: gente que entiende ciencia de frontera, finanzas de impacto y gobernanza de origen, y que diseña empresas rentables que protegen la biodiversidad.',
  },
  {
    q: '¿Necesito tener formación científica para unirme?',
    a: 'No. Nuestros programas están diseñados para perfiles híbridos: científicos sin formación en negocios, ejecutivos sin formación científica, emprendedores en etapa cero y profesionales de cualquier disciplina interesados en biotecnología e impacto regional.',
  },
  {
    q: '¿Cuándo comienza el primer programa?',
    a: 'La primera cohorte del Biotech Sprint 01 arranca en el segundo trimestre de 2026 (Q2 2026). Las inscripciones Early Bird están abiertas con precio especial de lanzamiento de $40 USD.',
  },
  {
    q: '¿Los programas son online o presenciales?',
    a: 'El Biotech Sprint 01 es 100% online con sesiones en vivo semanales de 90 minutos y material asincrónico que puedes consumir a tu ritmo. Operamos desde Lima, Perú, con alcance en toda América Latina.',
  },
  {
    q: '¿Qué incluye la membresía gratis de Emprendedores?',
    a: 'Acceso al grupo privado de WhatsApp, herramientas y frameworks para vender desde el primer día, recursos curados sobre bionegocios, y prioridad de acceso a eventos y lanzamientos futuros. No cuesta nada y no pedimos tarjeta.',
  },
  {
    q: '¿Puedo acceder al Bio Business Playbook sin inscribirme al curso?',
    a: 'Sí. El Playbook Vol. 1 — Design está disponible en versión digital ($25 USD) y versión impresa bajo demanda. Es el libro donde Eddie Ajalcriña y Lorenzo Ortiz desglosan la ingeniería de bionegocios para dominar el mercado global desde la biodiversidad de la región.',
  },
  {
    q: '¿Cómo contacto al equipo para una asesoría empresarial?',
    a: 'Si eres empresario y quieres soporte personalizado para escalar tu bionegocio, puedes escribirnos directo por WhatsApp desde la sección Comunidad, o contactarnos a biobusiness@redesignlab.org.',
  },
]

export default function FAQ() {
  return (
    <section
      id="faq"
      className="fro-sec"
      style={{ background:'var(--fro-bg)' }}
    >
      <div className="fro-wrap">
        <FadeIn><div className="fro-eyebrow" style={{ marginBottom:'1.2rem' }}>Preguntas frecuentes</div></FadeIn>

        <FadeIn delay={0.06}>
          <h2 className="fro-h2" style={{ marginBottom:'1rem', maxWidth:'14em' }}>
            Todo lo que te{' '}
            <span className="fro-italic-amber">preguntarías</span>{' '}
            antes de unirte
          </h2>
        </FadeIn>

        <FadeIn delay={0.12}>
          <p className="fro-lead" style={{ maxWidth:620, marginBottom:'2.8rem' }}>
            Si falta algo, escríbenos a{' '}
            <a href="mailto:biobusiness@redesignlab.org" style={{ color:'var(--fro-amber)', textDecoration:'none', borderBottom:'1px solid var(--fro-amber-25)' }}>
              biobusiness@redesignlab.org
            </a>.
          </p>
        </FadeIn>

        <FadeIn delay={0.16}>
          <div style={{ maxWidth:820 }}>
            <FAQAccordion items={HOME_FAQ_ITEMS} />
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
