import { useEffect, useRef, useState, type ReactNode } from 'react'
import {
  AlertOctagon,
  CheckCircle2,
  ChevronDown,
  CloudRain,
  FastForward,
  FileSearch,
  Flag,
  Gavel,
  HelpCircle,
  Megaphone,
  Pause,
  Play,
  RotateCcw,
  Siren,
  SkipForward,
  ToggleLeft,
  type LucideIcon,
} from 'lucide-react'
import SectionHeader from './SectionHeader'
import { defenseFacts, mateoProfile, prosecutionGrounds, scoreFactors, technicalGaps } from '../data/caso'

const fmt = (n: number) => n.toFixed(2).replace('.', ',')
const STEP_MS = 4200

type Tone = 'pitch' | 'var' | 'alert' | 'slate'
type MatchPlay = { id: string; minute: string; tone: Tone; label: string; title: string; icon: LucideIcon }

const plays: MatchPlay[] = [
  { id: 'inicio', minute: "0'", tone: 'slate', label: 'Arranca', title: 'Mateo entra a la cancha', icon: Flag },
  { id: 'score', minute: "14'", tone: 'alert', label: 'Alerta', title: 'El algoritmo marca 0,89 / 1,00 — riesgo elevado', icon: Siren },
  { id: 'fiscal', minute: "27'", tone: 'alert', label: 'Pedido', title: 'La fiscalía pide prisión preventiva', icon: Megaphone },
  { id: 'defensa', minute: "38'", tone: 'var', label: 'VAR', title: 'La defensa pide revisar la jugada', icon: FileSearch },
  { id: 'auditoria', minute: "45'", tone: 'var', label: 'Revisión técnica', title: 'Se abre la caja negra', icon: FileSearch },
  { id: 'sustraccion', minute: "60'", tone: 'var', label: 'Revisión procesal', title: 'Prueba de sustracción argumental', icon: ToggleLeft },
  { id: 'resolucion', minute: "90+2'", tone: 'pitch', label: 'Decisión humana', title: 'El juez rechaza la prisión preventiva', icon: Gavel },
  { id: 'final', minute: 'Final', tone: 'slate', label: 'Final', title: 'Mateo sigue el proceso en libertad', icon: CloudRain },
]

const chip: Record<Tone, string> = {
  pitch: 'bg-pitch text-night',
  var: 'bg-var text-white',
  alert: 'bg-alert text-white',
  slate: 'bg-slate-200 text-night',
}

const indexOf = (id: string) => plays.findIndex((p) => p.id === id)

export default function CaseRelato() {
  const [shown, setShown] = useState(1)
  const [playing, setPlaying] = useState(false)
  const [subtracted, setSubtracted] = useState(false)
  const [fullRes, setFullRes] = useState(false)
  const started = useRef(false)
  const sectionRef = useRef<HTMLElement>(null)

  const finished = shown >= plays.length
  const reached = (id: string) => shown > indexOf(id)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          setPlaying(true)
        }
      },
      { threshold: 0.35 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!playing || finished) return
    const t = window.setTimeout(() => setShown((s) => Math.min(s + 1, plays.length)), STEP_MS)
    return () => clearTimeout(t)
  }, [playing, shown, finished])

  const subtractionAt = indexOf('sustraccion') + 1
  const autoSubtracted = useRef(false)
  useEffect(() => {
    if (shown < subtractionAt || autoSubtracted.current) return
    const t = window.setTimeout(
      () => {
        autoSubtracted.current = true
        setSubtracted(true)
      },
      shown === subtractionAt ? 1400 : 0,
    )
    return () => clearTimeout(t)
  }, [shown, subtractionAt])

  const next = () => setShown((s) => Math.min(s + 1, plays.length))
  const all = () => {
    autoSubtracted.current = true
    setShown(plays.length)
    setSubtracted(true)
    setPlaying(false)
  }
  const reset = () => {
    autoSubtracted.current = false
    setShown(1)
    setSubtracted(false)
    setFullRes(false)
    setPlaying(true)
  }

  const withAi = prosecutionGrounds.reduce((a, g) => a + g.weight, 0)
  const autonomous = prosecutionGrounds.filter((g) => !g.algorithmic).reduce((a, g) => a + g.weight, 0)
  const requested = reached('fiscal')
  const support = !requested ? 0 : subtracted ? autonomous : withAi
  const verdict = !requested
    ? 'Sin pedido de la fiscalía'
    : subtracted
      ? 'Insuficiente (0 pruebas fácticas autónomas de peligro de fuga o entorpecimiento)'
      : 'Aparentemente sólido (con IA)'
  const current = plays[shown - 1]
  const total = scoreFactors.reduce((a, f) => a + f.weight, 0)

  const bodies: Record<string, ReactNode> = {
    inicio: (
      <>
        <p>
          Durante años corrió por una cancha de tierra con la camiseta de un club de inferiores. No llegó a primera: se
          lesionó, trabajó de repartidor, volvió al barrio. Nunca tuvo una causa penal.
        </p>
        <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-3">
          {mateoProfile.map(({ k, v }) => (
            <div key={k} className="border-t border-slate-800 pt-2">
              <dt className="text-xs text-slate-400">{k}</dt>
              <dd className="text-sm font-medium text-slate-100">{v}</dd>
            </div>
          ))}
        </dl>
      </>
    ),
    score: (
      <p>
        Durante la investigación, un sistema de IA lo clasifica como persona de{' '}
        <strong className="text-alert-soft">riesgo elevado</strong>. Nadie le explicó cómo se calculó ese número. No hay
        repetición en cámara lenta, ni explicación de variables, ni margen de error.
      </p>
    ),
    fiscal: (
      <p>
        El fiscal pide <strong className="text-white">prisión preventiva</strong>: dice que el algoritmo “refuerza” el
        peligro procesal. La defensa objeta. El juez duda.
      </p>
    ),
    defensa: (
      <p>
        La defensa solicita conocer qué datos, variables y versión del modelo produjeron el{' '}
        <span className="font-mono text-alert-soft">0,89</span>. Como en la cancha, la jugada se frena para revisarla
        desde todos los ángulos.
      </p>
    ),
    auditoria: (
      <div className="space-y-4">
        <p>Detrás del 0,89 aparece esto (desglose ilustrativo):</p>
        <div className="flex h-4 overflow-hidden rounded-full bg-night" aria-hidden>
          {scoreFactors.map((f) => (
            <div
              key={f.label}
              style={{ width: `${(f.weight / total) * 100}%` }}
              className={`h-full border-r-2 border-night ${f.kind === 'erroneo' ? 'bg-alert' : 'bg-var'}`}
            />
          ))}
        </div>
        <ul className="divide-y divide-slate-800">
          {scoreFactors.map((f) => (
            <li key={f.label} className="flex items-start gap-3 py-2.5">
              {f.kind === 'erroneo' ? (
                <AlertOctagon className="mt-0.5 h-4 w-4 shrink-0 text-alert-soft" aria-hidden />
              ) : (
                <HelpCircle className="mt-0.5 h-4 w-4 shrink-0 text-var-soft" aria-hidden />
              )}
              <div className="flex-1">
                <p className="text-sm font-semibold text-white">
                  {f.label}{' '}
                  <span className={`font-tv ml-1 rounded-sm px-1.5 py-0.5 text-xs font-bold uppercase ${f.kind === 'erroneo' ? 'bg-alert text-white' : 'bg-var text-white'}`}>
                    {f.kind === 'erroneo' ? 'Dato erróneo' : 'Variable proxy'}
                  </span>
                </p>
                <p className="text-sm text-slate-300">{f.detail}</p>
              </div>
              <span className="font-mono text-sm font-bold tabular-nums text-slate-200">+{fmt(f.weight)}</span>
            </li>
          ))}
        </ul>
        <dl className="grid gap-x-4 gap-y-3 sm:grid-cols-2">
          {technicalGaps.map(({ k, v }) => (
            <div key={k} className="border-t border-slate-800 pt-2">
              <dt className="font-tv text-base font-bold uppercase tracking-wide text-alert-soft">{k}</dt>
              <dd className="text-sm text-slate-200">{v}</dd>
            </div>
          ))}
        </dl>
        <p>
          <strong className="text-white">Hallazgo:</strong> el puntaje combina un registro que no pertenece a Mateo con
          condiciones sociales que funcionan como aproximaciones indirectas. Un sistema penal debe juzgar{' '}
          <em>conductas probadas, no semejanzas calculadas</em>.
        </p>
      </div>
    ),
    sustraccion: (
      <div className="space-y-5">
        <blockquote className="rounded-lg bg-white px-4 py-3 font-serif text-lg italic leading-snug text-night">
          “Si se elimina el resultado algorítmico del razonamiento judicial, ¿subsisten fundamentos fácticos y jurídicos
          independientes?”
        </blockquote>
        <div className="flex items-center justify-between gap-4 rounded-lg border border-slate-700 bg-night/60 p-4">
          <span>
            <span id="switch-label" className="block text-sm font-semibold text-white">
              Sustraer puntaje algorítmico del expediente
            </span>
            <span className="block text-xs text-slate-400">Retira el informe IA del razonamiento de la fiscalía</span>
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={subtracted}
            aria-labelledby="switch-label"
            onClick={() => setSubtracted((v) => !v)}
            className={`relative h-8 w-14 shrink-0 rounded-full border transition-colors ${subtracted ? 'border-pitch bg-pitch' : 'border-slate-500 bg-slate-800'}`}
          >
            <span className={`absolute top-1 h-6 w-6 rounded-full bg-white transition-[left] duration-200 ${subtracted ? 'left-7' : 'left-1'}`} />
          </button>
        </div>
        <ul className="space-y-2">
          {prosecutionGrounds.map((g) => {
            const removed = subtracted && g.algorithmic
            return (
              <li
                key={g.label}
                className={`flex items-center justify-between gap-3 border-b border-slate-800 pb-2 text-sm ${removed ? 'text-slate-400 line-through' : 'text-slate-200'}`}
              >
                <span>{g.label}</span>
                <span className="shrink-0 font-mono text-xs tabular-nums">{removed ? '—' : `${g.weight}%`}</span>
              </li>
            )
          })}
        </ul>
        <div className="grid grid-cols-2 gap-3">
          {['Peligro de fuga', 'Entorpecimiento'].map((k) => (
            <div key={k} className="rounded-lg bg-night/60 p-3 text-center">
              <p className="font-tv text-base font-bold uppercase tracking-wide text-slate-300">{k}</p>
              <p className={`font-mono text-3xl font-bold ${subtracted ? 'text-alert-soft' : 'text-slate-400'}`}>
                {subtracted ? '0' : '?'}
              </p>
              <p className="text-xs text-slate-400">pruebas fácticas autónomas</p>
            </div>
          ))}
        </div>
        {subtracted && (
          <div className="tv-rise">
            <p className="mb-2 text-sm font-semibold text-pitch">Lo que sí consta en el expediente</p>
            <ul className="grid gap-1.5 text-sm text-slate-200 sm:grid-cols-2">
              {defenseFacts.map((f) => (
                <li key={f} className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-pitch" aria-hidden /> {f}
                </li>
              ))}
            </ul>
            <p className="mt-3">
              Retirado el puntaje, desaparecen las razones para restringir la libertad: indicio serio de que la decisión
              habría sido <strong className="text-white">delegada materialmente</strong> en la herramienta.
            </p>
          </div>
        )}
      </div>
    ),
    resolucion: (
      <div className="space-y-4">
        <p>Minuto noventa y dos. El juez pide un cuarto intermedio. Cuando vuelve, no dice que el algoritmo miente: dice algo más preciso.</p>
        <div className="rounded-lg bg-pitch p-4 text-night">
          <p className="font-tv text-lg font-extrabold uppercase tracking-wide">Resuelvo</p>
          <p className="mt-1 text-lg font-semibold">I. RECHAZAR el pedido de prisión preventiva. Mateo continuará el proceso en libertad.</p>
          <p className="mt-1">II. Excluir el informe algorítmico como fundamento de la medida de coerción.</p>
        </div>
        <button
          type="button"
          aria-expanded={fullRes}
          aria-controls="resolucion-completa"
          onClick={() => setFullRes((v) => !v)}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-pitch hover:text-pitch-soft"
        >
          {fullRes ? 'Ocultar fundamentos' : 'Leer los fundamentos de la resolución'}
          <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${fullRes ? 'rotate-180' : ''}`} aria-hidden />
        </button>
        <div id="resolucion-completa" hidden={!fullRes} className="space-y-4 font-serif text-[15px] leading-relaxed text-slate-100">
          <p>
            <span className="font-tv text-base font-bold uppercase tracking-wide text-slate-300">Y vistos: </span>
            el pedido de prisión preventiva formulado por la fiscalía respecto de Mateo, de 23 años, sustentado en un
            informe automatizado que lo clasifica con un puntaje de 0,89 / 1,00.
          </p>
          <div>
            <p className="font-tv mb-2 text-base font-bold uppercase tracking-wide text-slate-300">Y considerando:</p>
            <ol className="list-decimal space-y-2 pl-5 marker:font-mono marker:text-pitch">
              <li>
                Que rige el <strong>principio de inocencia</strong> (art. 18 CN; art. 8.2 CADH, art. 75 inc. 22 CN): la
                prisión preventiva es excepcional, exige razones procesales concretas, necesidad y proporcionalidad, y no
                puede operar como pena anticipada (Corte IDH, <em>Bayarri vs. Argentina</em>).
              </li>
              <li>
                Que conforme al <strong>derecho penal de acto</strong> (art. 19 CN) la coerción no puede fundarse en
                condiciones de vida, domicilio, escolaridad o entorno del imputado.
              </li>
              <li>
                Que el informe no satisface el <strong>Estándar de Revisabilidad Algorítmica Efectiva</strong>: contiene un
                registro policial que no corresponde al imputado, emplea variables territoriales y sociales cuya
                pertinencia no fue explicada, carece de validación local y fue diseñado para estimar reincidencia, no
                peligro de fuga ni de entorpecimiento.
              </li>
              <li>
                Que aplicada la <strong>prueba de sustracción argumental</strong>, no subsisten elementos fácticos autónomos
                que acrediten los peligros procesales invocados.
              </li>
              <li>
                Que una predicción no es una prueba; que un perfil no es un hecho; que la libertad no puede depender de un
                número que nadie puede explicar.
              </li>
            </ol>
          </div>
        </div>
      </div>
    ),
    final: (
      <p className="font-serif text-lg italic text-slate-100">
        Mateo sale del juzgado bajo la lluvia. En la vereda, un nene juega a la pelota contra una pared. Mateo hace una
        gambeta imaginaria y sigue caminando. Su futuro permanece abierto.
      </p>
    ),
  }

  return (
    <section id="caso" ref={sectionRef} className="relative border-t border-slate-800 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeader
          chapter="En vivo"
          tone="alert"
          title="Una estadística puede convertirse en una celda"
          intro="El caso Mateo es hipotético; las dinámicas que lo producen no lo son. La Sala VAR Jurídica, minuto a minuto: el relato avanza solo y podés pausarlo o adelantarlo."
        />

        <div className="grid gap-6 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)]">
          {/* Compact live bar (mobile) */}
          <div className="sticky top-16 z-30 -mx-5 flex items-center gap-3 border-y border-slate-700 bg-ink/95 px-5 py-2.5 lg:hidden">
            <span className="font-tv flex items-center gap-1.5 rounded-sm bg-alert px-2 py-0.5 text-sm font-bold uppercase text-white">
              <span className={`h-2 w-2 rounded-full bg-white ${playing && !finished ? 'tv-pulse' : ''}`} />
              {finished ? 'Final' : 'Vivo'}
            </span>
            <span className="font-mono text-base font-bold tabular-nums text-white">{current.minute}</span>
            <span className="min-w-0 flex-1">
              <span className="block h-2 overflow-hidden rounded-full bg-slate-800">
                <span
                  style={{ width: `${support}%` }}
                  className={`block h-full rounded-full transition-[width] duration-700 ease-out ${subtracted ? 'bg-alert' : 'bg-var'}`}
                />
              </span>
              <span className="mt-0.5 block truncate text-xs text-slate-300">Fundamento: {support}%</span>
            </span>
            {finished ? (
              <button type="button" onClick={reset} aria-label="Repetir el partido" className="grid h-11 w-11 place-items-center rounded-lg border border-slate-600 text-white">
                <RotateCcw className="h-4 w-4" aria-hidden />
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setPlaying((v) => !v)}
                  aria-label={playing ? 'Pausar' : 'Reanudar'}
                  className="grid h-11 w-11 place-items-center rounded-lg bg-white text-night"
                >
                  {playing ? <Pause className="h-4 w-4" aria-hidden /> : <Play className="h-4 w-4" aria-hidden />}
                </button>
                <button type="button" onClick={next} aria-label="Siguiente jugada" className="grid h-11 w-11 place-items-center rounded-lg border border-slate-600 text-white">
                  <SkipForward className="h-4 w-4" aria-hidden />
                </button>
              </>
            )}
          </div>

          {/* Live scoreboard */}
          <aside className="hidden h-fit overflow-hidden rounded-xl border-2 border-slate-700 bg-ink lg:sticky lg:top-24 lg:block">
            <div className="font-tv flex items-center justify-between bg-alert px-4 py-2 text-lg font-bold uppercase tracking-wider text-white">
              <span className="flex items-center gap-2">
                <span className={`h-2.5 w-2.5 rounded-full bg-white ${playing && !finished ? 'tv-pulse' : ''}`} />
                {finished ? 'Final del partido' : 'En vivo · Sala VAR'}
              </span>
              <span className="font-mono text-base tabular-nums">{current.minute}</span>
            </div>

            <div className="border-b border-slate-800 px-5 py-4">
              <p className="font-serif text-2xl font-semibold text-white">Mateo</p>
              <p className="text-sm text-slate-400">Imputado · 23 años · sin antecedentes</p>
            </div>

            <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
              <span className="font-tv text-lg font-bold uppercase tracking-wide text-slate-300">Informe IA</span>
              <span
                className={`font-mono text-2xl font-bold tabular-nums ${
                  reached('auditoria') ? 'text-slate-400 line-through decoration-alert decoration-2' : reached('score') ? 'text-alert-soft' : 'text-slate-500'
                }`}
              >
                {reached('score') ? '0,89 / 1,00' : '— / —'}
              </span>
            </div>

            <div className="px-5 py-4" aria-live="polite">
              <div className="mb-2 flex items-baseline justify-between gap-2">
                <p className="font-tv text-lg font-bold uppercase tracking-wide text-slate-300">Fundamento de la preventiva</p>
                <p className="font-mono text-sm font-bold tabular-nums text-slate-100">{support}%</p>
              </div>
              <div className="h-4 overflow-hidden rounded-full bg-slate-800">
                <div
                  style={{ width: `${support}%` }}
                  className={`h-full rounded-full transition-[width] duration-700 ease-out ${subtracted ? 'bg-alert' : 'bg-var'}`}
                />
              </div>
              <p className={`mt-2 text-sm font-semibold ${!requested ? 'text-slate-400' : subtracted ? 'text-alert-soft' : 'text-var-soft'}`}>
                {verdict}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 border-t border-slate-800 bg-night/60 px-5 py-4">
              {!finished && (
                <button
                  type="button"
                  onClick={() => setPlaying((v) => !v)}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-white px-4 text-sm font-semibold text-night hover:bg-slate-200"
                >
                  {playing ? <Pause className="h-4 w-4" aria-hidden /> : <Play className="h-4 w-4" aria-hidden />}
                  {playing ? 'Pausar' : 'Reanudar'}
                </button>
              )}
              {!finished && (
                <button
                  type="button"
                  onClick={next}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-slate-600 px-4 text-sm font-semibold text-white hover:border-var hover:text-var-soft"
                >
                  <SkipForward className="h-4 w-4" aria-hidden /> Siguiente jugada
                </button>
              )}
              {!finished && (
                <button
                  type="button"
                  onClick={all}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-lg px-3 text-sm font-semibold text-slate-300 hover:text-white"
                >
                  <FastForward className="h-4 w-4" aria-hidden /> Ver todo
                </button>
              )}
              {finished && (
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-slate-600 px-4 text-sm font-semibold text-white hover:border-pitch hover:text-pitch"
                >
                  <RotateCcw className="h-4 w-4" aria-hidden /> Repetir el partido
                </button>
              )}
            </div>
          </aside>

          {/* Minute-by-minute feed */}
          <ol className="relative space-y-4" aria-label="Relato minuto a minuto">
            {plays.slice(0, shown).map((p) => {
              const Icon = p.icon
              return (
                <li key={p.id} className="tv-rise grid grid-cols-[3.75rem_minmax(0,1fr)] gap-3 sm:grid-cols-[4.5rem_minmax(0,1fr)] sm:gap-4">
                  <div className="pt-1 text-right">
                    <span className="font-mono text-lg font-bold tabular-nums text-white sm:text-xl">{p.minute}</span>
                  </div>
                  <article className="rounded-xl border border-slate-800 bg-slate-850/70 p-4 sm:p-5">
                    <header className="flex flex-wrap items-center gap-x-3 gap-y-2">
                      <span className={`font-tv inline-flex items-center gap-1.5 rounded-sm px-2 py-0.5 text-sm font-bold uppercase tracking-wide ${chip[p.tone]}`}>
                        <Icon className="h-3.5 w-3.5" aria-hidden /> {p.label}
                      </span>
                      <h3 className="font-tv text-xl font-bold uppercase leading-tight tracking-wide text-white sm:text-2xl">{p.title}</h3>
                    </header>
                    <div className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-[15px]">{bodies[p.id]}</div>
                  </article>
                </li>
              )
            })}
            {!finished && (
              <li className="grid grid-cols-[3.75rem_minmax(0,1fr)] gap-3 sm:grid-cols-[4.5rem_minmax(0,1fr)] sm:gap-4">
                <span />
                <p className="flex items-center gap-2 rounded-xl border border-dashed border-slate-700 px-4 py-3 text-sm text-slate-400">
                  <span className={`h-2 w-2 rounded-full bg-var ${playing ? 'tv-pulse' : ''}`} />
                  {playing ? 'Se viene la próxima jugada…' : 'Relato en pausa'}
                </p>
              </li>
            )}
          </ol>
        </div>

        <p className="mx-auto mt-8 max-w-3xl text-center text-sm text-slate-400">
          Caso hipotético con fines académicos. El desglose del puntaje y la resolución son ilustrativos y reconstruyen la
          aplicación del ERAE propuesta en la monografía.
        </p>
      </div>
    </section>
  )
}
