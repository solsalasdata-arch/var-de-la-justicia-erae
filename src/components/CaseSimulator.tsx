import { useState } from 'react'
import {
  AlertOctagon,
  BadgeAlert,
  Binary,
  CheckCircle2,
  CloudRain,
  FileSearch,
  Gavel,
  HelpCircle,
  Lock,
  RotateCcw,
  Scale,
  ScrollText,
  ToggleLeft,
  UserRound,
} from 'lucide-react'
import SectionHeader from './SectionHeader'
import { defenseFacts, mateoProfile, prosecutionGrounds, scoreFactors, technicalGaps } from '../data/caso'

const fmt = (n: number) => n.toFixed(2).replace('.', ',')

const steps = [
  { n: 1, title: 'Auditoría técnica', subtitle: 'Abrir la caja negra', icon: FileSearch },
  { n: 2, title: 'Prueba de sustracción', subtitle: 'Retirar el puntaje', icon: ToggleLeft },
  { n: 3, title: 'Resolución humana', subtitle: 'Decide el juez', icon: Gavel },
]

export default function CaseSimulator() {
  const [opened, setOpened] = useState(false)
  const [subtracted, setSubtracted] = useState(false)
  const [resolved, setResolved] = useState(false)
  const [current, setCurrent] = useState(1)

  const unlocked = (n: number) => n === 1 || (n === 2 && opened) || (n === 3 && subtracted)
  const done = (n: number) => (n === 1 && opened) || (n === 2 && subtracted) || (n === 3 && resolved)

  const total = scoreFactors.reduce((acc, f) => acc + f.weight, 0)
  const withAi = prosecutionGrounds.reduce((a, g) => a + g.weight, 0)
  const autonomous = prosecutionGrounds.filter((g) => !g.algorithmic).reduce((a, g) => a + g.weight, 0)
  const support = subtracted ? autonomous : withAi

  const reset = () => {
    setOpened(false)
    setSubtracted(false)
    setResolved(false)
    setCurrent(1)
  }

  return (
    <section id="caso" className="relative border-t border-slate-800/60 py-24">
      <div className="absolute inset-x-0 top-0 -z-10 h-96 bg-gradient-to-b from-alert/5 to-transparent" />
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeader
          eyebrow="El caso Mateo · Sala VAR Jurídica"
          title="Una estadística puede convertirse en una celda"
          intro="Caso hipotético de la monografía. Las dinámicas que lo producen no lo son. Revisá la jugada en tres pasos antes de que el juez decida."
          accent="alert"
        />

        <div className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          {/* STORY */}
          <aside className="card h-fit p-6 sm:p-8 lg:sticky lg:top-24">
            <div className="flex items-center gap-4">
              <div className="grid h-14 w-14 place-items-center rounded-2xl border border-slate-700 bg-night">
                <UserRound className="h-7 w-7 text-slate-300" aria-hidden />
              </div>
              <div>
                <p className="eyebrow text-slate-500">Imputado</p>
                <h3 className="font-serif text-3xl font-semibold text-white">Mateo</h3>
              </div>
            </div>

            <dl className="mt-6 grid grid-cols-2 gap-2">
              {mateoProfile.map(({ k, v }) => (
                <div key={k} className="rounded-xl border border-slate-800 bg-night/50 px-3 py-2.5">
                  <dt className="text-[11px] uppercase tracking-wider text-slate-500">{k}</dt>
                  <dd className="text-sm font-medium text-slate-200">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-400">
              <p>
                Durante años corrió por una cancha de tierra con la camiseta de un club de inferiores. No llegó a
                primera: se lesionó, trabajó de repartidor, volvió al barrio. Nunca tuvo una causa penal.
              </p>
              <p>
                Durante la investigación, un sistema de IA lo clasifica como persona de{' '}
                <span className="font-mono font-semibold text-alert">riesgo elevado</span>. Nadie le explicó cómo se
                calculó ese número.
              </p>
              <p className="rounded-xl border border-alert/30 bg-alert/5 p-4 text-slate-300">
                <BadgeAlert className="mb-2 h-5 w-5 text-alert" aria-hidden />
                El fiscal pide <strong className="text-white">prisión preventiva</strong>: dice que el algoritmo
                “refuerza” el peligro procesal. La defensa objeta. El juez duda.
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between rounded-xl border border-alert/40 bg-[#0a0f1f] px-4 py-3">
              <span className="font-mono text-xs uppercase tracking-wider text-slate-500">Informe IA</span>
              <span className={`font-mono text-lg font-bold ${opened ? 'text-var' : 'animate-blink text-alert'}`}>
                {fmt(total)} / 1,00
              </span>
            </div>
          </aside>

          {/* SIMULATOR */}
          <div className="card overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-800 bg-night/60 px-5 py-3">
              <p className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-var">
                <span className="h-2 w-2 animate-blink rounded-full bg-var" /> Sala VAR Jurídica · Auditoría procesal
              </p>
              <button
                onClick={reset}
                className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-slate-400 hover:bg-slate-800 hover:text-white"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden /> Reiniciar
              </button>
            </div>

            {/* Stepper */}
            <ol className="grid grid-cols-3 border-b border-slate-800">
              {steps.map(({ n, title, subtitle, icon: Icon }) => {
                const isUnlocked = unlocked(n)
                const isDone = done(n)
                const isCurrent = current === n
                return (
                  <li key={n}>
                    <button
                      disabled={!isUnlocked}
                      onClick={() => setCurrent(n)}
                      aria-current={isCurrent ? 'step' : undefined}
                      className={`flex h-full w-full flex-col items-start gap-1 border-b-2 px-3 py-4 text-left transition sm:px-5 ${
                        isCurrent ? 'border-var bg-var/5' : 'border-transparent hover:bg-slate-800/40'
                      } disabled:cursor-not-allowed disabled:opacity-40`}
                    >
                      <span className="flex items-center gap-2">
                        <span
                          className={`grid h-6 w-6 place-items-center rounded-full font-mono text-xs font-bold ${
                            isDone ? 'bg-pitch text-night' : isCurrent ? 'bg-var text-night' : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {isDone ? <CheckCircle2 className="h-4 w-4" aria-hidden /> : isUnlocked ? n : <Lock className="h-3 w-3" aria-hidden />}
                        </span>
                        <Icon className="hidden h-4 w-4 text-slate-500 sm:block" aria-hidden />
                      </span>
                      <span className="text-xs font-semibold text-white sm:text-sm">
                        Paso {n} · {title}
                      </span>
                      <span className="hidden text-xs text-slate-500 sm:block">{subtitle}</span>
                    </button>
                  </li>
                )
              })}
            </ol>

            <div className="p-5 sm:p-8">
              {current === 1 && (
                <div className="animate-rise">
                  <h4 className="font-serif text-2xl font-semibold text-white">Paso 1 — Abrir la caja negra</h4>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    La defensa solicita conocer qué datos, variables y versión del modelo produjeron el{' '}
                    <span className="font-mono text-alert">0,89</span>. Revisabilidad técnica: qué significa el resultado
                    y qué no permite concluir.
                  </p>

                  {!opened ? (
                    <button
                      onClick={() => setOpened(true)}
                      className="mt-6 inline-flex items-center gap-2 rounded-xl bg-var px-5 py-3 font-semibold text-night shadow-lg shadow-var/20 hover:bg-amber-400"
                    >
                      <Binary className="h-5 w-5" aria-hidden /> Abrir la caja negra
                    </button>
                  ) : (
                    <div className="mt-6 space-y-6">
                      <div>
                        <p className="eyebrow mb-3 text-slate-500">Desglose del puntaje (ilustrativo)</p>
                        <div className="mb-4 flex h-4 overflow-hidden rounded-full border border-slate-800 bg-night">
                          {scoreFactors.map((f) => (
                            <div
                              key={f.label}
                              title={`${f.label}: ${fmt(f.weight)}`}
                              style={{ width: `${f.weight * 100}%` }}
                              className={`h-full border-r border-night ${f.kind === 'erroneo' ? 'bg-alert' : 'bg-var/70'}`}
                            />
                          ))}
                        </div>
                        <ul className="space-y-2">
                          {scoreFactors.map((f, i) => (
                            <li
                              key={f.label}
                              style={{ animationDelay: `${i * 90}ms` }}
                              className={`animate-rise rounded-xl border p-4 ${
                                f.kind === 'erroneo' ? 'border-alert/50 bg-alert/10' : 'border-var/30 bg-var/5'
                              }`}
                            >
                              <div className="flex flex-wrap items-center justify-between gap-2">
                                <span className="flex items-center gap-2 text-sm font-semibold text-white">
                                  {f.kind === 'erroneo' ? (
                                    <AlertOctagon className="h-4 w-4 text-alert" aria-hidden />
                                  ) : (
                                    <HelpCircle className="h-4 w-4 text-var" aria-hidden />
                                  )}
                                  {f.label}
                                </span>
                                <span className="flex items-center gap-2">
                                  <span
                                    className={`rounded-full px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider ${
                                      f.kind === 'erroneo' ? 'bg-alert text-white' : 'bg-var/20 text-var'
                                    }`}
                                  >
                                    {f.kind === 'erroneo' ? 'Dato erróneo' : 'Variable proxy'}
                                  </span>
                                  <span className="font-mono text-sm font-bold text-slate-200">+{fmt(f.weight)}</span>
                                </span>
                              </div>
                              <p className="mt-1.5 text-sm text-slate-400">{f.detail}</p>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="grid gap-2 sm:grid-cols-2">
                        {technicalGaps.map(({ k, v }) => (
                          <div key={k} className="rounded-xl border border-slate-800 bg-night/60 p-3">
                            <p className="font-mono text-[11px] uppercase tracking-wider text-alert">{k}</p>
                            <p className="mt-1 text-sm text-slate-300">{v}</p>
                          </div>
                        ))}
                      </div>

                      <p className="rounded-xl border border-slate-800 bg-night/40 p-4 text-sm text-slate-300">
                        <strong className="text-white">Hallazgo:</strong> el puntaje combina un registro que no pertenece a
                        Mateo con condiciones sociales que funcionan como aproximaciones indirectas. Un sistema penal
                        debe juzgar <em>conductas probadas, no semejanzas calculadas</em>.
                      </p>

                      <button
                        onClick={() => setCurrent(2)}
                        className="inline-flex items-center gap-2 rounded-xl bg-pitch px-5 py-3 font-semibold text-night hover:bg-emerald-400"
                      >
                        Continuar al Paso 2
                      </button>
                    </div>
                  )}
                </div>
              )}

              {current === 2 && (
                <div className="animate-rise">
                  <h4 className="font-serif text-2xl font-semibold text-white">Paso 2 — Prueba de sustracción argumental</h4>
                  <blockquote className="mt-4 border-l-4 border-var bg-var/5 py-3 pl-4 pr-3 font-serif text-lg italic leading-snug text-slate-100">
                    “Si se elimina el resultado algorítmico del razonamiento judicial, ¿subsisten fundamentos fácticos y
                    jurídicos independientes?”
                  </blockquote>

                  <label className="mt-6 flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-slate-700 bg-night/60 p-4">
                    <span>
                      <span className="block text-sm font-semibold text-white">Sustraer puntaje algorítmico del expediente</span>
                      <span className="block text-xs text-slate-500">Retira el informe IA del razonamiento de la fiscalía</span>
                    </span>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={subtracted}
                      aria-label="Sustraer puntaje algorítmico del expediente"
                      onClick={() => setSubtracted((v) => !v)}
                      className={`relative h-8 w-14 shrink-0 rounded-full border transition-colors ${
                        subtracted ? 'border-pitch bg-pitch' : 'border-slate-600 bg-slate-800'
                      }`}
                    >
                      <span
                        className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow transition-all ${
                          subtracted ? 'left-7' : 'left-1'
                        }`}
                      />
                    </button>
                  </label>

                  <div className="mt-6 rounded-xl border border-slate-800 bg-night/60 p-5">
                    <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
                      <p className="eyebrow text-slate-500">Fundamento de la prisión preventiva</p>
                      <p className="font-mono text-sm font-bold text-slate-200">{support}%</p>
                    </div>
                    <div className="h-5 overflow-hidden rounded-full bg-slate-800">
                      <div
                        style={{ width: `${support}%` }}
                        className={`h-full rounded-full transition-all duration-700 ease-out ${
                          subtracted ? 'bg-alert' : 'bg-gradient-to-r from-var to-amber-300'
                        }`}
                      />
                    </div>
                    <p
                      className={`mt-3 font-mono text-sm font-semibold ${subtracted ? 'text-alert' : 'text-var'}`}
                      aria-live="polite"
                    >
                      {subtracted
                        ? 'Insuficiente (0 pruebas fácticas autónomas de peligro de fuga o entorpecimiento)'
                        : 'Aparentemente sólido (con IA)'}
                    </p>

                    <ul className="mt-5 space-y-2">
                      {prosecutionGrounds.map((g) => {
                        const removed = subtracted && g.algorithmic
                        return (
                          <li
                            key={g.label}
                            className={`flex items-center justify-between gap-3 rounded-lg border px-3 py-2 text-sm transition ${
                              removed ? 'border-slate-800 text-slate-600 line-through' : 'border-slate-700 text-slate-300'
                            }`}
                          >
                            <span>{g.label}</span>
                            <span className="shrink-0 font-mono text-xs">{removed ? '—' : `${g.weight}%`}</span>
                          </li>
                        )
                      })}
                    </ul>

                    <div className="mt-5 grid grid-cols-2 gap-2">
                      {['Peligro de fuga', 'Entorpecimiento'].map((k) => (
                        <div key={k} className="rounded-lg border border-slate-800 p-3 text-center">
                          <p className="text-[11px] uppercase tracking-wider text-slate-500">{k}</p>
                          <p className={`font-mono text-2xl font-bold ${subtracted ? 'text-alert' : 'text-slate-500'}`}>
                            {subtracted ? '0' : '?'}
                          </p>
                          <p className="text-[11px] text-slate-500">pruebas fácticas autónomas</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {subtracted && (
                    <div className="mt-6 animate-rise space-y-4">
                      <div className="rounded-xl border border-pitch/30 bg-pitch/5 p-4">
                        <p className="mb-2 text-sm font-semibold text-pitch">Lo que sí consta en el expediente</p>
                        <ul className="grid gap-1.5 text-sm text-slate-300 sm:grid-cols-2">
                          {defenseFacts.map((f) => (
                            <li key={f} className="flex gap-2">
                              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-pitch" aria-hidden /> {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <p className="text-sm text-slate-400">
                        Retirado el puntaje, desaparecen las razones para restringir la libertad: indicio serio de que la
                        decisión habría sido <strong className="text-white">delegada materialmente</strong> en la
                        herramienta.
                      </p>
                      <button
                        onClick={() => setCurrent(3)}
                        className="inline-flex items-center gap-2 rounded-xl bg-pitch px-5 py-3 font-semibold text-night hover:bg-emerald-400"
                      >
                        Continuar al Paso 3
                      </button>
                    </div>
                  )}
                </div>
              )}

              {current === 3 && (
                <div className="animate-rise">
                  <h4 className="font-serif text-2xl font-semibold text-white">Paso 3 — Resolución judicial humana</h4>
                  <p className="mt-2 text-sm text-slate-400">
                    Minuto noventa y dos. El juez pide un cuarto intermedio. Cuando vuelve, no dice que el algoritmo
                    miente: dice algo más preciso.
                  </p>

                  {!resolved ? (
                    <button
                      onClick={() => setResolved(true)}
                      className="mt-6 inline-flex items-center gap-2 rounded-xl bg-pitch px-5 py-3 font-semibold text-night shadow-lg shadow-pitch/20 hover:bg-emerald-400"
                    >
                      <Gavel className="h-5 w-5" aria-hidden /> Dictar resolución
                    </button>
                  ) : (
                    <article className="mt-6 animate-rise overflow-hidden rounded-xl border border-pitch/40 bg-[#0b1220]">
                      <header className="flex items-center justify-between gap-3 border-b border-slate-800 px-5 py-3">
                        <span className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-pitch">
                          <ScrollText className="h-4 w-4" aria-hidden /> Resolución · Audiencia de medidas de coerción
                        </span>
                        <Scale className="h-4 w-4 text-slate-500" aria-hidden />
                      </header>
                      <div className="space-y-5 p-5 font-serif text-[15px] leading-relaxed text-slate-200 sm:p-6">
                        <p>
                          <span className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Y vistos: </span>
                          el pedido de prisión preventiva formulado por la fiscalía respecto de Mateo, de 23 años, sustentado
                          en un informe automatizado que lo clasifica con un puntaje de 0,89 / 1,00.
                        </p>
                        <div>
                          <p className="mb-2 font-sans text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Y considerando:</p>
                          <ol className="list-decimal space-y-2 pl-5 marker:font-mono marker:text-pitch">
                            <li>
                              Que rige el <strong>principio de inocencia</strong> (art. 18 CN; art. 8.2 CADH, art. 75 inc. 22
                              CN): la prisión preventiva es excepcional, exige razones procesales concretas, necesidad y
                              proporcionalidad, y no puede operar como pena anticipada (Corte IDH, <em>Bayarri vs. Argentina</em>).
                            </li>
                            <li>
                              Que conforme al <strong>derecho penal de acto</strong> (art. 19 CN) la coerción no puede
                              fundarse en condiciones de vida, domicilio, escolaridad o entorno del imputado.
                            </li>
                            <li>
                              Que el informe no satisface el <strong>Estándar de Revisabilidad Algorítmica Efectiva</strong>:
                              contiene un registro policial que no corresponde al imputado, emplea variables territoriales y
                              sociales cuya pertinencia no fue explicada, carece de validación local y fue diseñado para
                              estimar reincidencia, no peligro de fuga ni de entorpecimiento.
                            </li>
                            <li>
                              Que aplicada la <strong>prueba de sustracción argumental</strong>, no subsisten elementos
                              fácticos autónomos que acrediten los peligros procesales invocados.
                            </li>
                            <li>
                              Que una predicción no es una prueba; que un perfil no es un hecho; que la libertad no puede
                              depender de un número que nadie puede explicar.
                            </li>
                          </ol>
                        </div>
                        <div className="rounded-lg border border-pitch/40 bg-pitch/10 p-4">
                          <p className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-pitch">Resuelvo:</p>
                          <p className="mt-2 text-lg font-semibold text-white">
                            I. RECHAZAR el pedido de prisión preventiva. Mateo continuará el proceso en libertad.
                          </p>
                          <p className="mt-1 text-slate-300">
                            II. Excluir el informe algorítmico como fundamento de la medida de coerción.
                          </p>
                        </div>
                        <p className="flex items-start gap-2 font-sans text-sm italic text-slate-400">
                          <CloudRain className="mt-0.5 h-4 w-4 shrink-0 text-sky-400" aria-hidden />
                          Mateo sale del juzgado bajo la lluvia. En la vereda, un nene juega a la pelota contra una pared.
                          Mateo hace una gambeta imaginaria y sigue caminando. Su futuro permanece abierto.
                        </p>
                      </div>
                    </article>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <p className="mx-auto mt-8 max-w-3xl text-center text-xs text-slate-500">
          Caso hipotético con fines académicos. El desglose del puntaje y la resolución son ilustrativos y reconstruyen la
          aplicación del ERAE propuesta en la monografía.
        </p>
      </div>
    </section>
  )
}
