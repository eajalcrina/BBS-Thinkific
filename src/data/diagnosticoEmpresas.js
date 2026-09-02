export const MARCA_QUESTIONS = [
  {
    id: 'm1',
    dimension: 'marca',
    pregunta: 'Si le preguntas a un cliente qué te hace diferente de la competencia, ¿qué tan claro tiene la respuesta?',
    opciones: [
      { texto: 'No creo que sepa decirlo', valor: 0 },
      { texto: 'Diría algo genérico, tipo "sostenibilidad" o "impacto"', valor: 1 },
      { texto: 'Tiene una idea, aunque no muy afilada', valor: 2 },
      { texto: 'Lo tiene clarísimo, y es distinto a lo que dicen mis competidores', valor: 3 },
    ],
  },
  {
    id: 'm2',
    dimension: 'marca',
    pregunta: '¿Tu identidad visual y tu forma de comunicar realmente reflejan lo que hace distinto a tu negocio?',
    opciones: [
      { texto: 'Se parece bastante a cualquier otra marca "verde" del mercado', valor: 0 },
      { texto: 'Tiene algo propio, pero se pierde entre el resto', valor: 1 },
      { texto: 'Sí se nota una diferencia, aunque podría ser más fuerte', valor: 2 },
      { texto: 'Es inconfundible — nadie la confunde con otra marca', valor: 3 },
    ],
  },
  {
    id: 'm3',
    dimension: 'marca',
    pregunta: '¿Sientes que estás cobrando lo que tu propuesta realmente vale, o compitiendo por precio?',
    opciones: [
      { texto: 'Compito por precio, constantemente', valor: 0 },
      { texto: 'A veces logro cobrar más, pero cuesta sostenerlo', valor: 1 },
      { texto: 'En general logro un precio justo por mi diferencia', valor: 2 },
      { texto: 'Cobro un premium claro y los clientes lo entienden', valor: 3 },
    ],
  },
]

export const NEGOCIO_QUESTIONS = [
  {
    id: 'n1',
    dimension: 'negocio',
    pregunta: '¿Tienes un modelo económico (cómo generas ingresos, cuáles son tus márgenes reales) documentado y claro, más allá de la intención regenerativa?',
    opciones: [
      { texto: 'No, vamos más por intuición y ajustes sobre la marcha', valor: 0 },
      { texto: 'Tengo una idea general, pero no está en un documento o modelo real', valor: 1 },
      { texto: 'Sí, tengo un modelo, aunque no lo reviso seguido', valor: 2 },
      { texto: 'Sí, y lo reviso y ajusto activamente con datos reales', valor: 3 },
    ],
  },
  {
    id: 'n2',
    dimension: 'negocio',
    pregunta: '¿Qué tan claro tienes tu modelo operativo — cómo escala tu negocio sin que dependa 100% de ti?',
    opciones: [
      { texto: 'Hoy depende casi todo de mí', valor: 0 },
      { texto: 'Tengo procesos básicos, pero informales', valor: 1 },
      { texto: 'Tengo procesos documentados para lo esencial', valor: 2 },
      { texto: 'El negocio funciona con estructura, no solo conmigo', valor: 3 },
    ],
  },
  {
    id: 'n3',
    dimension: 'negocio',
    pregunta: '¿Tienes gobernanza clara (roles, decisiones, cómo se reparte el valor) si tu negocio creciera mañana?',
    opciones: [
      { texto: 'No lo he pensado', valor: 0 },
      { texto: 'Tengo una idea informal', valor: 1 },
      { texto: 'Tengo algo definido, aunque básico', valor: 2 },
      { texto: 'Tengo gobernanza clara y probada', valor: 3 },
    ],
  },
]

export const CAPITAL_QUESTIONS = [
  {
    id: 'c1',
    dimension: 'capital',
    pregunta: 'Si un inversionista te pregunta por tu estructura de capital, ¿qué tan preparado te sientes para responder?',
    opciones: [
      { texto: 'No sabría por dónde empezar', valor: 0 },
      { texto: 'Tengo una idea general, no un documento', valor: 1 },
      { texto: 'Podría responder con algo de preparación', valor: 2 },
      { texto: 'Tengo la estructura de capital clara y documentada', valor: 3 },
    ],
  },
  {
    id: 'c2',
    dimension: 'capital',
    pregunta: '¿Tienes un data room (documentos financieros, legales, operativos ordenados) listo para mostrar a un inversionista?',
    opciones: [
      { texto: 'No tengo nada armado', valor: 0 },
      { texto: 'Tengo algunos documentos sueltos', valor: 1 },
      { texto: 'Tengo la mayoría, pero no está ordenado como data room', valor: 2 },
      { texto: 'Sí, tengo un data room listo', valor: 3 },
    ],
  },
  {
    id: 'c3',
    dimension: 'capital',
    pregunta: '¿Sabrías construir el caso de inversión — por qué tu negocio merece financiamiento y cómo generaría retorno — de forma convincente?',
    opciones: [
      { texto: 'No, es mi punto más débil', valor: 0 },
      { texto: 'Tengo el argumento, pero no lo he probado con inversionistas reales', valor: 1 },
      { texto: 'Lo he armado y presentado, con resultados mixtos', valor: 2 },
      { texto: 'Sí, y he conseguido o estoy cerca de conseguir financiamiento con eso', valor: 3 },
    ],
  },
]

export const QUESTIONS = [...MARCA_QUESTIONS, ...NEGOCIO_QUESTIONS, ...CAPITAL_QUESTIONS]

export const SECTOR_QUESTION = {
  id: 's1',
  pregunta: '¿Cuál describe mejor tu negocio?',
  opciones: [
    { texto: 'Producto, marca o servicio de consumo (B2C o B2B general)', sector: 'general' },
    { texto: 'Agricultura, pesca, minería, energía o manufactura a escala industrial', sector: 'industria' },
    { texto: 'Servicios profesionales, consultoría o tecnología', sector: 'general' },
    { texto: 'Otro', sector: 'general' },
  ],
}

const DIMENSION_MAX = 9

const LECTURAS = {
  marca: {
    brechaReal: 'Tu marca aún no comunica lo que te hace distinto.',
    enDesarrollo: 'Tienes una diferencia real, pero no está del todo afilada.',
    solido: 'Tu marca ya comunica tu diferencia con claridad.',
  },
  negocio: {
    brechaReal: 'Tu modelo económico y operativo no está lo suficientemente definido.',
    enDesarrollo: 'Tienes estructura básica — falta consolidarla.',
    solido: 'Tu ingeniería de negocio ya sostiene el propósito.',
  },
  capital: {
    brechaReal: 'No estás preparado para hablar el idioma de un inversionista.',
    enDesarrollo: 'Tienes elementos sueltos — falta armarlos en un caso convincente.',
    solido: 'Tu preparación para levantar capital ya es competitiva.',
  },
}

function lecturaDimension(dimension, score) {
  if (score <= 3) return LECTURAS[dimension].brechaReal
  if (score <= 6) return LECTURAS[dimension].enDesarrollo
  return LECTURAS[dimension].solido
}

const RESULTADOS = {
  marca: {
    nombre: 'Marca eco-genérica',
    diagnostico: 'Tu marca probablemente suena parecida a las cien que dicen tener lo mismo. No es un problema de diseño — es que tu propuesta de valor real no se está traduciendo en algo que el mercado perciba y esté dispuesto a pagar más por eso.',
    fortalezas: [
      'Tienes una causa real detrás — el problema no es de sustancia, es de traducción',
      'Ya estás operando, lo cual te da casos reales para construir una narrativa distinta',
    ],
    oportunidad: [
      'Tu identidad visual y narrativa se parecen a cualquier otra marca "verde" del mercado',
      'Estás compitiendo por precio en vez de cobrar lo que tu diferencia realmente vale',
    ],
    recomendacion: 'Antes de gastar más en marketing genérico, define qué te hace estructuralmente distinto — y constrúyelo desde ahí.',
    programaSlug: 'marcas-regenerativas',
    programaCtaNota: 'para dejar de sonar genérica y empezar a sonar como lo que realmente eres.',
  },
  negocio: {
    nombre: 'Intención sin ingeniería',
    diagnostico: 'Tienes la intención regenerativa correcta, pero sin modelo económico y operativo sólido, el propósito no escala — se queda en discurso. Te falta la ingeniería detrás del negocio que sí funciona.',
    fortalezas: [
      'El propósito ya está — no partes de cero en lo que más cuesta enseñar',
      'Tienes el contexto real de tu negocio para diseñar un modelo que sí aplique, no uno genérico',
    ],
    oportunidad: [
      'Tu modelo económico y operativo no está lo suficientemente documentado ni probado',
      'Dependes más de intuición que de estructura para decisiones clave',
    ],
    recomendacion: 'Convierte tu buena intención en un modelo económico y operativo que puedas defender con números, no solo con propósito.',
    programaSlug: 'negocios-regenerativos',
    programaCtaNota: 'la ingeniería detrás del negocio que sí funciona.',
  },
  capital: {
    nombre: 'Buen proyecto, capital que no llega',
    diagnostico: 'El capital no te está esquivando por falta de mérito — te está esquivando porque todavía no hablas el idioma que un inversionista necesita escuchar: estructura de capital, narrativa financiera, data room.',
    fortalezas: [
      'Tienes un proyecto real detrás — el problema no es el fondo, es la forma',
      'Ya identificas que necesitas capital, lo cual ya es más claridad que la mayoría',
    ],
    oportunidad: [
      'No tienes un data room ni una estructura de capital lista para mostrar',
      'Te falta el caso de inversión armado — por qué tu negocio merece financiamiento y cómo retorna',
    ],
    recomendacion: 'Antes de salir a buscar inversionistas, arma primero el material que ellos esperan ver — la preparación es lo que cierra la brecha.',
    programaSlug: 'capital-de-impacto',
    programaCtaNota: 'para que hables el idioma que un inversionista necesita escuchar.',
  },
  industria: {
    nombre: 'Operaciones ineficientes y lineales',
    diagnostico: 'Tu industria opera con márgenes cada vez más ajustados — y probablemente no estás aprovechando al máximo los recursos que ya tienes, incluido todo lo que hoy tratas como residuo. No es solo un tema de desperdicio: es cuánto valor real dejas sin capturar en tu propia operación.',
    fortalezas: [
      'Ya tienes la escala y los procesos para que un rediseño circular genere ahorro real, no solo simbólico',
      'Tu industria específica ya tiene marcos aplicados (ISO 59000, casos reales) que se pueden adaptar directo a tu operación',
    ],
    oportunidad: [
      'Sigues operando bajo una lógica lineal — extraer, usar, descartar — en vez de circular',
      'El riesgo social de tu operación probablemente se aborda con programas genéricos, no con modelos de negocio que generen valor compartido real',
    ],
    recomendacion: 'Empieza por mapear qué estás descartando hoy que todavía tiene valor recuperable — ahí suele estar el primer ahorro concreto.',
    programaSlug: 'economia-circular-industria',
    programaCtaNota: 'para llevar tu economía circular al siguiente nivel operativo.',
  },
}

const SECUNDARIO_CAPITAL_UMBRAL = 3

function sumaDimension(preguntas, respuestas) {
  return preguntas.reduce((sum, p) => sum + (respuestas[p.id] ?? 0), 0)
}

export function calcularResultado(respuestas, sector) {
  const marcaScore = sumaDimension(MARCA_QUESTIONS, respuestas)
  const negocioScore = sumaDimension(NEGOCIO_QUESTIONS, respuestas)
  const capitalScore = sumaDimension(CAPITAL_QUESTIONS, respuestas)
  const scoreTotal = marcaScore + negocioScore + capitalScore
  const scoreMax = DIMENSION_MAX * 3

  let resultado
  if (sector === 'industria') {
    resultado = 'industria'
  } else {
    const candidatos = [
      { key: 'marca', score: marcaScore },
      { key: 'negocio', score: negocioScore },
      { key: 'capital', score: capitalScore },
    ]
    resultado = candidatos.reduce((min, c) => (c.score < min.score ? c : min)).key
  }

  const secundario = resultado !== 'capital' && capitalScore <= SECUNDARIO_CAPITAL_UMBRAL ? 'capital' : null

  const dimensiones = [
    { nombre: 'Marca', porcentaje: Math.round((marcaScore / DIMENSION_MAX) * 100), lectura: lecturaDimension('marca', marcaScore) },
    { nombre: 'Negocio', porcentaje: Math.round((negocioScore / DIMENSION_MAX) * 100), lectura: lecturaDimension('negocio', negocioScore) },
    { nombre: 'Capital', porcentaje: Math.round((capitalScore / DIMENSION_MAX) * 100), lectura: lecturaDimension('capital', capitalScore) },
  ]

  return {
    sector,
    marcaScore,
    negocioScore,
    capitalScore,
    scoreTotal,
    scoreMax,
    resultado,
    secundario,
    dimensiones,
    contenido: RESULTADOS[resultado],
    contenidoSecundario: secundario ? RESULTADOS[secundario] : null,
  }
}
