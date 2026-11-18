import type { LucideIcon } from 'lucide-react'
import { Cpu, Landmark, Users } from 'lucide-react'

export type Pillar = {
  id: string
  title: string
  icon: LucideIcon
  color: 'pitch' | 'var' | 'alert'
  summary: string
  checks: string[]
  question: string
}

export const pillars: Pillar[] = [
  {
    id: 'tecnica',
    title: 'Revisabilidad Técnica',
    icon: Cpu,
    color: 'pitch',
    summary:
      'Debe ser posible saber qué herramienta se usó y bajo qué condiciones produjo el resultado: qué significa el puntaje y qué no permite concluir.',
    checks: [
      'Identificación de la herramienta y su finalidad',
      'Versión del modelo',
      'Datos de entrada y variables consideradas',
      'Condiciones de validación',
      'Márgenes de error y limitaciones conocidas',
    ],
    question: '¿Qué representa esa puntuación y bajo qué condiciones fue producida?',
  },
  {
    id: 'procesal',
    title: 'Revisabilidad Procesal',
    icon: Users,
    color: 'var',
    summary:
      'La parte afectada debe tener una oportunidad real, no formal, de cuestionar los datos y la metodología antes de que se decida.',
    checks: [
      'Derecho real de contradicción de la defensa',
      'Posibilidad de señalar errores en los datos',
      'Acceso controlado frente al secreto comercial',
      'Pericias independientes',
      'Respuesta de la fiscalía a las objeciones',
    ],
    question: '¿Pudo la defensa controvertir el resultado antes de la decisión?',
  },
  {
    id: 'judicial',
    title: 'Revisabilidad Judicial',
    icon: Landmark,
    color: 'alert',
    summary:
      'El juez valora de forma independiente la relevancia y confiabilidad del resultado. La responsabilidad no se desplaza al proveedor ni al operador.',
    checks: [
      'Valoración independiente del resultado',
      'Motivación propia, verificable y pertinente',
      'Explicitar límites y valor asignado',
      'Prohibición de delegar la decisión en predicciones automatizadas',
      'Superar la mera “firma al pie”',
    ],
    question: '¿Puede el juez explicar, con razones propias, qué valor le atribuye?',
  },
]

export type Precedent = {
  id: string
  name: string
  court: string
  year: string
  citation: string
  topic: string
  summary: string
  takeaway: string
}

export const precedents: Precedent[] = [
  {
    id: 'loomis',
    name: 'State v. Loomis',
    court: 'Corte Suprema de Wisconsin (EE. UU.)',
    year: '2016',
    citation: '881 N.W.2d 749 (Wis. 2016)',
    topic: 'Evaluación de riesgo · COMPAS',
    summary:
      'Examinó el uso del instrumento COMPAS en la determinación de la pena. Permitió su consideración bajo advertencias y limitaciones, sin admitir que el puntaje sustituya el razonamiento judicial.',
    takeaway:
      'No versó sobre prisión preventiva: muestra las dificultades que aparecen cuando una evaluación de riesgo opaca interviene en una decisión penal.',
  },
  {
    id: 'ewert',
    name: 'Ewert v. Canada',
    court: 'Corte Suprema de Canadá',
    year: '2018',
    citation: '2018 SCC 30, [2018] 2 S.C.R. 165',
    topic: 'Instrumentos actuariales · validez poblacional',
    summary:
      'Abordó el uso de instrumentos actuariales de evaluación respecto de personas indígenas privadas de libertad y la necesidad de examinar su validez para esa población.',
    takeaway:
      'Un instrumento no puede presumirse válido para cualquier grupo por haber sido desarrollado o usado en otro contexto.',
  },
  {
    id: 'bverfg',
    name: 'BVerfG — Análisis automatizado de datos',
    court: 'Tribunal Constitucional Federal de Alemania',
    year: '2023',
    citation: '1 BvR 1547/19, 1 BvR 2634/20 (16/02/2023)',
    topic: 'Análisis policial automatizado · Hesse y Hamburgo',
    summary:
      'Examinó normas de Hesse y Hamburgo sobre análisis automatizado de datos policiales y advirtió que ese tratamiento puede intensificar la vigilancia estatal.',
    takeaway:
      'Exige bases legales suficientemente determinadas, límites y garantías acordes con la intensidad de la injerencia.',
  },
  {
    id: 'bridges',
    name: 'R (Bridges) v. South Wales Police',
    court: 'Corte de Apelación de Inglaterra y Gales',
    year: '2020',
    citation: '[2020] EWCA Civ 1058',
    topic: 'Reconocimiento facial automatizado',
    summary: 'Examinó el uso policial de reconocimiento facial automatizado en espacios públicos del Reino Unido.',
    takeaway:
      'La tecnología de vigilancia no vuelve neutrales las decisiones estatales ni elimina la obligación de justificar necesidad y proporcionalidad.',
  },
  {
    id: 'glukhin',
    name: 'Glukhin v. Rusia',
    court: 'Tribunal Europeo de Derechos Humanos',
    year: '2023',
    citation: 'Solicitud n.º 11596/17 (04/07/2023)',
    topic: 'Reconocimiento facial · protesta pacífica',
    summary:
      'Abordó la utilización de reconocimiento facial contra una persona que había participado en una protesta pacífica.',
    takeaway: 'La capacidad técnica de identificar no amplía por sí misma las facultades jurídicas del Estado.',
  },
  {
    id: 'schufa',
    name: 'SCHUFA Holding',
    court: 'Tribunal de Justicia de la Unión Europea',
    year: '2023',
    citation: 'C-634/21 (07/12/2023)',
    topic: 'Puntuación automatizada · influencia material',
    summary:
      'Examinó la elaboración automatizada de puntuaciones crediticias y la relevancia que adquieren en decisiones de terceros.',
    takeaway:
      'Un puntaje formalmente “auxiliar” puede tener influencia material decisiva. Criterio comparativo, no precedente penal directo.',
  },
  {
    id: 'bayarri',
    name: 'Bayarri vs. Argentina',
    court: 'Corte Interamericana de Derechos Humanos',
    year: '2008',
    citation: 'Excepción Preliminar, Fondo, Reparaciones y Costas (30/10/2008)',
    topic: 'Prisión preventiva · límites convencionales',
    summary:
      'Reafirmó los límites que rigen la privación cautelar de la libertad y la necesidad de evitar que se convierta en una respuesta punitiva anticipada.',
    takeaway: 'La prisión preventiva exige razones procesales concretas, necesidad y proporcionalidad.',
  },
]

export type Norm = { id: string; name: string; scope: string; detail: string }

export const norms: Norm[] = [
  {
    id: 'cn18',
    name: 'Art. 18 CN',
    scope: 'Constitución Nacional',
    detail: 'Debido proceso, inviolabilidad de la defensa en juicio y principio de inocencia.',
  },
  {
    id: 'cn19',
    name: 'Art. 19 CN',
    scope: 'Constitución Nacional',
    detail: 'Principio de reserva y derecho penal de acto: se juzgan conductas, no personalidades ni condiciones de vida.',
  },
  {
    id: 'cn43',
    name: 'Art. 43 CN',
    scope: 'Constitución Nacional',
    detail: 'Hábeas data: conocer, rectificar y suprimir datos personales falsos o discriminatorios.',
  },
  {
    id: 'cn75',
    name: 'Art. 75 inc. 22 CN',
    scope: 'Constitución Nacional',
    detail: 'Jerarquía constitucional de los tratados de derechos humanos, incluida la Convención Americana (CADH).',
  },
  {
    id: 'ley25326',
    name: 'Ley 25.326',
    scope: 'Protección de los Datos Personales',
    detail: 'Calidad, exactitud y finalidad de los datos; límites al tratamiento automatizado de información personal.',
  },
  {
    id: 'cppf',
    name: 'CPPF (arts. 220, 221 y 222)',
    scope: 'Código Procesal Penal Federal',
    detail:
      'Medidas de coerción y peligros procesales (fuga y entorpecimiento). Implementación progresiva: no es aplicable automáticamente a procesos provinciales.',
  },
  {
    id: 'ley27785',
    name: 'Ley 27.785',
    scope: 'Modificación del CPPF',
    detail:
      'Incorporó el art. 222 bis (peligro de reiteración delictiva). Una categoría legal no autoriza a delegar su ponderación en un sistema automatizado.',
  },
]
