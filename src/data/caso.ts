export type Factor = {
  label: string
  detail: string
  weight: number
  kind: 'erroneo' | 'proxy'
}

export const mateoProfile = [
  { k: 'Edad', v: '23 años' },
  { k: 'Domicilio', v: 'Barrio del conurbano bonaerense' },
  { k: 'Trayectoria', v: 'Ex jugador de inferiores, lesión de rodilla' },
  { k: 'Trabajo', v: 'Repartidor' },
  { k: 'Antecedentes', v: 'Ninguna causa penal' },
  { k: 'Condenas', v: 'Ninguna' },
]

// Desglose ilustrativo del caso hipotético de la monografía.
export const scoreFactors: Factor[] = [
  {
    label: 'Registro policial previo',
    detail: 'Un antecedente cargado en la base que no corresponde a Mateo: fue atribuido por error a su legajo.',
    weight: 0.31,
    kind: 'erroneo',
  },
  {
    label: 'Código postal / territorio',
    detail: 'Mayor presencia policial en el barrio genera más detenciones, que realimentan el modelo.',
    weight: 0.22,
    kind: 'proxy',
  },
  {
    label: 'Nivel educativo',
    detail: 'Una condición social convertida en variable matemática, sin vínculo con un hecho concreto.',
    weight: 0.14,
    kind: 'proxy',
  },
  {
    label: 'Entorno y contactos',
    detail: 'Amistades, llamadas y lugares que frecuenta (incluida la cancha de los domingos).',
    weight: 0.12,
    kind: 'proxy',
  },
  {
    label: 'Situación laboral informal',
    detail: 'Trabajo de reparto sin registración, leído como “inestabilidad”.',
    weight: 0.1,
    kind: 'proxy',
  },
]

export const technicalGaps = [
  { k: 'Validación local', v: 'Ausente: el modelo no fue validado para la población donde se aplica' },
  { k: 'Versión del modelo', v: 'No informada' },
  { k: 'Margen de error', v: 'No informado' },
  { k: 'Finalidad del modelo', v: 'Estima reincidencia, no peligro de fuga ni entorpecimiento' },
]

export const prosecutionGrounds = [
  { label: 'Puntaje algorítmico 0,89 “refuerza” el peligro procesal', algorithmic: true, weight: 72 },
  { label: 'Gravedad abstracta del hecho investigado', algorithmic: false, weight: 6 },
]

export const defenseFacts = [
  'Domicilio fijo y conocido en su barrio',
  'Trabajo estable como repartidor',
  'Sin causas penales ni condenas previas',
  'Sin indicios de contacto con testigos ni de alteración de prueba',
]
