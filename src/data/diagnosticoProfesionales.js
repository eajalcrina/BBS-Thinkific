// La rama de preguntas sigue siendo binaria (junior/senior) — `experiencia`
// es un dato adicional, más granular, que viaja junto al segmento hasta
// /api/lead para poder identificar más adelante al público de silver
// economy (15+ años/jubilados) sin tener que construir una tercera rama
// de preguntas todavía.
export const SEGMENTO_QUESTION = {
  id: 'q0',
  pregunta: '¿Cuántos años de experiencia profesional tienes?',
  opciones: [
    { texto: 'Menos de 5 años', segmento: 'junior', experiencia: 'menos-5' },
    { texto: 'Entre 5 y 15 años', segmento: 'senior', experiencia: '5-15' },
    { texto: 'Más de 15 años, incluyendo jubilados', segmento: 'senior', experiencia: 'mas-15' },
  ],
}

export const JUNIOR_QUESTIONS = [
  {
    id: 'j1',
    dimension: 'criterioPropio',
    pregunta: 'Cuando algo no sale como esperabas en el trabajo, ¿qué es lo primero que haces?',
    opciones: [
      { texto: 'Le pregunto a una IA qué debería hacer y sigo su sugerencia', valor: 0 },
      { texto: 'Le pregunto a una IA, pero comparo su respuesta con lo que yo pienso', valor: 1 },
      { texto: 'Lo pienso yo primero, y uso la IA para chequear o afinar', valor: 2 },
      { texto: 'Lo resuelvo yo, reviso con colegas o fuentes, y ya después considero qué diría una IA', valor: 3 },
    ],
  },
  {
    id: 'j2',
    dimension: 'criterioPropio',
    pregunta: '¿Con qué frecuencia te ha tocado tomar una decisión difícil sin tener toda la información?',
    opciones: [
      { texto: 'Casi nunca — prefiero esperar a tener claridad', valor: 0 },
      { texto: 'Rara vez, y cuando pasa me cuesta mucho', valor: 1 },
      { texto: 'A veces, y ya le voy agarrando la mano', valor: 2 },
      { texto: 'Seguido — es parte normal de mi trabajo', valor: 3 },
    ],
  },
  {
    id: 'j3',
    dimension: 'criterioPropio',
    pregunta: 'Si tuvieras que defender una postura distinta a la que te da una IA frente a tu jefe, ¿qué tan preparado te sientes?',
    opciones: [
      { texto: 'No sabría ni por dónde empezar', valor: 0 },
      { texto: 'Podría, pero me tomaría tiempo armar el argumento', valor: 1 },
      { texto: 'Me siento cómodo, ya me ha tocado', valor: 2 },
      { texto: 'Es algo que hago con frecuencia y disfruto', valor: 3 },
    ],
  },
  {
    id: 'j4',
    dimension: 'aprendizajeActivo',
    pregunta: 'Cuando la IA te muestra un concepto o dato que no conocías, ¿qué haces normalmente?',
    opciones: [
      { texto: 'Lo incorporo y sigo trabajando — confío en que está bien', valor: 0 },
      { texto: 'Le pido a la misma IA que me explique más, pero no salgo de ahí', valor: 1 },
      { texto: 'Investigo por mi cuenta en otras fuentes para entender mejor', valor: 2 },
      { texto: 'Además de investigar, lo contrasto con un colega o alguien con más experiencia antes de aplicarlo', valor: 3 },
    ],
  },
  {
    id: 'j5',
    dimension: 'proyeccionCrecimiento',
    pregunta: '¿La IA te ha permitido hacer cosas que van más allá de tu rol actual (tareas, responsabilidades o habilidades nuevas que antes no tenías)?',
    opciones: [
      { texto: 'No, la uso solo para hacer mi trabajo actual más rápido', valor: 0 },
      { texto: 'A veces pruebo cosas fuera de mi rol, pero no se ha notado', valor: 1 },
      { texto: 'He empezado a asumir tareas o proyectos que antes no me tocaban, gracias a lo que la IA me permite hacer', valor: 2 },
      { texto: 'Ya me han dado responsabilidades nuevas porque he demostrado que puedo hacer más de lo que mi puesto pedía', valor: 3 },
    ],
  },
  {
    id: 'j6',
    dimension: 'proyeccionCrecimiento',
    pregunta: 'Cuando piensas en las personas con cargos de liderazgo por encima de ti (tu jefe, tu coordinador), ¿qué tan claro tienes lo que a ti te falta para llegar ahí?',
    opciones: [
      { texto: 'No lo he pensado mucho todavía', valor: 0 },
      { texto: 'Tengo una idea general, pero no muy concreta', valor: 1 },
      { texto: 'Tengo bastante claro qué habilidades o experiencia me faltan', valor: 2 },
      { texto: 'Tengo un plan activo — sé exactamente qué necesito, incluyendo cómo la IA me ayuda a llegar ahí', valor: 3 },
    ],
  },
  {
    id: 'j7',
    dimension: 'proyeccionCrecimiento',
    pregunta: 'La IA te está liberando tiempo. ¿Qué haces con eso?',
    opciones: [
      { texto: 'Todavía no siento que me libere tiempo real', valor: 0 },
      { texto: 'Lo uso para profundizar en lo mismo que ya hacía — mi especialidad', valor: 1 },
      { texto: 'Lo uso para aprender cosas nuevas fuera de mi especialidad y volverme más versátil', valor: 2 },
      { texto: 'Lo uso para eso, y además comparto lo que aprendo con mi equipo — me estoy volviendo un referente', valor: 3 },
    ],
  },
]

export const SENIOR_QUESTIONS = [
  {
    id: 's1',
    dimension: 'amplificacionCriterio',
    pregunta: 'Cuando la IA te sugiere algo que contradice tu experiencia o intuición, ¿qué haces?',
    opciones: [
      { texto: 'Sigo mi criterio y ni pruebo lo que sugiere la IA', valor: 0 },
      { texto: 'Reviso lo que sugiere, pero rara vez cambia lo que ya iba a hacer', valor: 1 },
      { texto: 'Lo considero en serio, y a veces ajusto mi decisión con eso', valor: 2 },
      { texto: 'Lo uso activamente para poner a prueba mi propio criterio, y he cambiado de opinión más de una vez gracias a eso', valor: 3 },
    ],
  },
  {
    id: 's2',
    dimension: 'amplificacionCriterio',
    pregunta: '¿Qué tanto usas la IA para amplificar tu trabajo (no para que lo haga por ti, sino para hacer más con lo que ya sabes)?',
    opciones: [
      { texto: 'Casi no la uso, prefiero mis métodos de siempre', valor: 0 },
      { texto: 'La uso para tareas puntuales, pero no ha cambiado cómo trabajo', valor: 1 },
      { texto: 'La uso regularmente para acelerar partes de mi trabajo', valor: 2 },
      { texto: 'La uso para escalar criterio que antes solo yo podía dar, llegando a más gente o proyectos de los que podría solo', valor: 3 },
    ],
  },
  {
    id: 's3',
    dimension: 'sistematizacionMentoria',
    pregunta: '¿Cuánto de tu conocimiento y criterio está hoy solo "en tu cabeza" — y cuánto está documentado, sistematizado o enseñado a otros?',
    opciones: [
      { texto: 'Casi todo está solo en mi cabeza', valor: 0 },
      { texto: 'He compartido algo informalmente, pero no está sistematizado', valor: 1 },
      { texto: 'He documentado o enseñado partes importantes a mi equipo', valor: 2 },
      { texto: 'Activamente sistematizo y transfiero mi criterio — incluso usando IA para hacerlo escalable', valor: 3 },
    ],
  },
  {
    id: 's4',
    dimension: 'posicionamientoVisibilidad',
    pregunta: 'Cuando trabajas con alguien más joven que "sabe usar bien la IA", ¿cómo te sientes respecto a tu propio valor?',
    opciones: [
      { texto: 'Me preocupa no poder competir con esa fluidez', valor: 0 },
      { texto: 'Me genera algo de inseguridad, aunque sé que aporto otras cosas', valor: 1 },
      { texto: 'Confío en que mi experiencia sigue siendo más valiosa, aunque no siempre se note', valor: 2 },
      { texto: 'Tengo claro que mi criterio es lo que hace que su uso de la IA realmente valga — y lo demuestro', valor: 3 },
    ],
  },
  {
    id: 's5',
    dimension: 'posicionamientoVisibilidad',
    pregunta: '¿Sientes que tu experiencia es reconocida y aprovechada activamente en tu organización?',
    opciones: [
      { texto: 'No, siento que se está dando por sentada o pasando por alto', valor: 0 },
      { texto: 'A veces, pero no de forma consistente', valor: 1 },
      { texto: 'Sí, en general se reconoce', valor: 2 },
      { texto: 'Sí, y activamente me buscan para decisiones estratégicas justamente por eso', valor: 3 },
    ],
  },
  {
    id: 's6',
    dimension: 'sistematizacionMentoria',
    pregunta: '¿Qué tan seguido mentoreas, entrenas o le pasas criterio a colegas más jóvenes?',
    opciones: [
      { texto: 'Casi nunca — no es parte de mi rol o no encuentro el espacio', valor: 0 },
      { texto: 'Ocasionalmente, cuando alguien pregunta directamente', valor: 1 },
      { texto: 'Regularmente, es parte de cómo trabajo', valor: 2 },
      { texto: 'Es una parte activa y reconocida de mi rol — incluso he usado IA para hacerlo más escalable', valor: 3 },
    ],
  },
  {
    id: 's7',
    dimension: 'proyeccionIndependencia',
    pregunta: 'Cuando piensas en los próximos años de tu carrera, ¿qué tan clara tienes tu relación con la IA (ser quien la dirige y entrena, vs. quedar detrás de quienes la usan mejor)?',
    opciones: [
      { texto: 'No lo he pensado mucho', valor: 0 },
      { texto: 'Tengo una idea general, pero no un plan concreto', valor: 1 },
      { texto: 'Tengo bastante claro hacia dónde quiero ir con esto', valor: 2 },
      { texto: 'Tengo un plan activo — sé exactamente cómo posicionar mi experiencia frente a la IA en los próximos años', valor: 3 },
    ],
  },
  {
    id: 's8',
    dimension: 'proyeccionIndependencia',
    pregunta: 'Pensando en tu independencia futura (por decisión propia o por cambios en tu empleo), ¿qué tan claro tienes cómo usarías tu experiencia + IA para generar ingresos por tu cuenta (consultoría, negocio propio, especialización)?',
    opciones: [
      { texto: 'No lo he pensado — dependo de estar empleado', valor: 0 },
      { texto: 'Lo he pensado, pero no sé por dónde empezar', valor: 1 },
      { texto: 'Tengo una idea de cómo podría hacerlo, aunque no he dado pasos concretos', valor: 2 },
      { texto: 'Ya lo estoy construyendo o tengo un plan claro de cómo mi experiencia + IA me daría independencia', valor: 3 },
    ],
  },
]

// Nombres visibles de cada dimensión — la agrupación en sí vive en el
// campo `dimension` de cada pregunta (JUNIOR_QUESTIONS/SENIOR_QUESTIONS),
// no aquí, para tener una sola fuente de verdad.
const DIMENSION_NAMES = {
  criterioPropio: 'Criterio propio',
  aprendizajeActivo: 'Aprendizaje activo',
  proyeccionCrecimiento: 'Proyección de crecimiento',
  amplificacionCriterio: 'Amplificación de criterio',
  sistematizacionMentoria: 'Sistematización y mentoría',
  posicionamientoVisibilidad: 'Posicionamiento y visibilidad',
  proyeccionIndependencia: 'Proyección de independencia',
}

function calcularDimensiones(preguntas, respuestas) {
  const orden = []
  const grupos = {}
  for (const p of preguntas) {
    if (!grupos[p.dimension]) {
      grupos[p.dimension] = { val: 0, max: 0 }
      orden.push(p.dimension)
    }
    grupos[p.dimension].val += respuestas[p.id] ?? 0
    grupos[p.dimension].max += 3
  }
  return orden.map(id => ({
    nombre: DIMENSION_NAMES[id],
    porcentaje: Math.round((grupos[id].val / grupos[id].max) * 100),
  }))
}

const NIVELES = {
  junior: [
    {
      min: 0,
      max: 6,
      nombre: 'Techo de cristal activo',
      contenido: {
        diagnostico: 'Hoy estás construyendo bajo el mismo riesgo que describe el programa — dejar que la IA piense por ti, sin desarrollar el criterio propio que te va a diferenciar. No es un juicio, es una alerta a tiempo.',
        fortalezas: [
          'Ya usas IA activamente — la adopción no es el problema',
          'Tienes tiempo de sobra para revertir esto antes de que se vuelva un hábito permanente',
        ],
        oportunidad: [
          'Delegas el pensamiento crítico a la IA en vez de usarla para afinar el tuyo',
          'Todavía no tienes claro qué te falta para crecer hacia roles de liderazgo',
          'No estás usando el tiempo que la IA libera para expandirte más allá de tu rol actual',
        ],
        recomendacion: 'Empieza por resolver tú primero, y usa la IA para contrastar — no al revés. Es el hábito que más rápido cambia tu trayectoria.',
        programaSlug: 'ia-nuevos-profesionales',
        programaCtaNota: 'diseñado exactamente para este momento, antes de que el techo de cristal se vuelva permanente.',
      },
    },
    {
      min: 7,
      max: 14,
      nombre: 'En construcción',
      contenido: {
        diagnostico: 'Vas por buen camino — ya usas la IA con algo de criterio propio, pero todavía no es sistemático. Estás en la zona donde la diferencia entre liderar el cambio o quedarte a medias se decide.',
        fortalezas: [
          'Tienes momentos de pensamiento crítico genuino, no dependes 100% de la IA',
          'Ya muestras señales de querer crecer más allá de tu rol',
        ],
        oportunidad: [
          'Tu criterio propio es inconsistente — a veces lo usas, a veces no',
          'Podrías estar sistematizando más lo que aprendes en vez de dejarlo suelto',
        ],
        recomendacion: 'Convierte lo que haces bien ocasionalmente en un hábito consistente. Ahí está el salto al siguiente nivel.',
        programaSlug: 'ia-nuevos-profesionales',
        programaCtaNota: 'te ayuda a consolidar el criterio que ya empezaste a construir.',
      },
    },
    {
      min: 15,
      max: 21,
      nombre: 'Liderando el cambio',
      contenido: {
        diagnostico: 'Ya estás haciendo lo que este programa busca formar: usar la IA como herramienta, no como reemplazo de tu pensamiento. Tu siguiente reto es profundizar y multiplicar eso.',
        fortalezas: [
          'Sostienes tu propio criterio incluso frente a la IA',
          'Ya estás expandiéndote más allá de tu rol y compartiendo lo que aprendes',
        ],
        oportunidad: [
          'El siguiente nivel es sistematizar esto — pasar de hacerlo bien intuitivamente a tener un marco replicable',
          'Vale la pena afinar tu lectura de qué necesitas específicamente para el salto a roles de más responsabilidad',
        ],
        recomendacion: 'No te quedes en "ya lo hago bien" — profundiza el marco que te permita escalarlo y hacerlo visible ante quienes deciden tu siguiente paso.',
        programaSlug: 'ia-nuevos-profesionales',
        programaCtaNota: 'para llevar tu ventaja actual a un nivel más estratégico y visible.',
      },
    },
  ],
  senior: [
    {
      min: 0,
      max: 8,
      nombre: 'Experiencia en riesgo de invisibilidad',
      contenido: {
        diagnostico: 'Tu experiencia vale — el riesgo no es que la IA te reemplace, es que nadie (ni tú) esté multiplicándola todavía. Esa brecha es la que más rápido se puede cerrar.',
        fortalezas: [
          'Tienes años de criterio construido que ningún junior puede improvisar',
          'Estás a tiempo de posicionarte antes de que la brecha se sienta más',
        ],
        oportunidad: [
          'Tu criterio está solo "en tu cabeza" — no documentado ni transferido',
          'Sientes que tu valor no se nota frente a colegas más jóvenes "tool-fluent"',
          'No tienes un plan claro para tu independencia si tu situación laboral cambia',
        ],
        recomendacion: 'Empieza por sistematizar una sola cosa que sabes hacer mejor que nadie — es el primer paso hacia hacerlo visible.',
        programaSlug: 'ia-profesionales-senior',
        programaCtaNota: 'para que tu experiencia deje de sentirse amenazada y empiece a sentirse multiplicada.',
      },
    },
    {
      min: 9,
      max: 16,
      nombre: 'Multiplicando, pero no del todo',
      contenido: {
        diagnostico: 'Ya usas la IA como amplificador, no como amenaza — vas en la dirección correcta. Falta llevarlo de "lo hago" a "lo sistematizo y lo hago visible."',
        fortalezas: [
          'Usas la IA activamente para escalar tu trabajo',
          'Mentoreas o compartes criterio al menos ocasionalmente',
        ],
        oportunidad: [
          'La sistematización es parcial — se pierde valor que podría estar documentado o replicado',
          'Tu plan de independencia (consultoría, negocio propio) sigue siendo una idea, no una acción',
        ],
        recomendacion: 'Convierte una práctica de mentoría que ya haces en algo estructurado y repetible — ahí está tu ventaja competitiva más clara.',
        programaSlug: 'ia-profesionales-senior',
        programaCtaNota: 'para llevar tu criterio de algo que compartes ocasionalmente a un activo estratégico.',
      },
    },
    {
      min: 17,
      max: 24,
      nombre: 'Liderando la multiplicación',
      contenido: {
        diagnostico: 'Ya estás haciendo lo que muchos profesionales senior todavía no se atreven: usar la IA para escalar tu criterio, no para competir con él. El siguiente paso es capitalizar eso, dentro y fuera de tu organización.',
        fortalezas: [
          'Sistematizas y transfieres tu conocimiento activamente',
          'Tu experiencia es reconocida y buscada para decisiones estratégicas',
          'Tienes claridad sobre tu proyección, incluyendo independencia futura',
        ],
        oportunidad: [
          'El riesgo en este nivel no es de criterio, es de tiempo — ¿estás dedicando el espacio necesario a construir lo que ya sabes que quieres construir?',
        ],
        recomendacion: 'Pon fecha a los próximos pasos de tu plan de independencia o especialización — el conocimiento ya lo tienes.',
        programaSlug: 'ia-profesionales-senior',
        programaCtaNota: 'para darle estructura y velocidad a algo que ya sabes hacer bien.',
      },
    },
  ],
}

export function calcularResultado(segmento, respuestas) {
  const preguntas = segmento === 'junior' ? JUNIOR_QUESTIONS : SENIOR_QUESTIONS
  const scoreMax = preguntas.length * 3
  const score = preguntas.reduce((sum, p) => sum + (respuestas[p.id] ?? 0), 0)

  const dimensiones = calcularDimensiones(preguntas, respuestas)

  const nivelObj = NIVELES[segmento].find(n => score >= n.min && score <= n.max)

  return {
    score,
    scoreMax,
    nivel: nivelObj.nombre,
    dimensiones,
    contenido: nivelObj.contenido,
  }
}
