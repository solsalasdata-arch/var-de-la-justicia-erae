import { useState } from 'react'
import { AlertTriangle, Camera, Clock, Eye, Flag, Quote, RotateCcw, Siren, Tv, UserCheck } from 'lucide-react'
import SectionHeader from './SectionHeader'

type Side = 'cancha' | 'juzgado'

const replaySteps = [
  { icon: Siren, title: 'El sistema señala penal', text: 'Contacto en el área. La IA —el jugador número 23— sanciona sin árbitro humano.' },
  { icon: Flag, title: 'La jugada se frena', text: 'Una indicación interrumpe el partido: la decisión debe ser revisada.' },
  { icon: Camera, title: 'Revisión desde múltiples ángulos', text: 'La imagen se repite. Un ángulo, después otro. La velocidad disminuye.' },
  { icon: UserCheck, title: 'El árbitro vuelve al campo', text: 'Lo que parecía evidente deja de serlo. Decide una persona. El partido continúa.' },
]

const angles = ['Cámara lateral', 'Cámara cenital', 'Cámara de arco']

const bars = [0.42, 0.58, 0.31, 0.74, 0.89, 0.66, 0.51]

export default function Prologue() {
  const [side, setSide] = useState<Side>('cancha')
  const [step, setStep] = useState(0)
  const [angle, setAngle] = useState(0)

  const advance = () => {
    if (step === 2 && angle < angles.length - 1) {
      setAngle((a) => a + 1)
      return
    }
    setStep((s) => Math.min(s + 1, replaySteps.length - 1))
  }

  const reset = () => {
    setStep(0)
    setAngle(0)
  }

  const finished = step === replaySteps.length - 1

  return (
    <section id="prologo" className="relative border-t border-slate-800/60 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeader
          chapter="Previa"
          tone="var"
          title={
            <>
              El partido sin árbitro <span className="text-slate-400">vs.</span> la sala penal
            </>
          }
          intro="En la cancha, una jugada dudosa se detiene y se revisa. En el juzgado, una cifra aparece en la pantalla a las tres de la mañana y no hay repetición posible."
        />

        <div
          role="tablist"
          aria-label="Escenario del prólogo"
          className="mx-auto mb-8 grid max-w-md grid-cols-2 gap-1 rounded-xl border border-slate-800 bg-slate-850/70 p-1 lg:hidden"
        >
          {(
            [
              ['cancha', 'En la Cancha'],
              ['juzgado', 'En el Juzgado'],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              role="tab"
              aria-selected={side === id}
              aria-controls={`panel-${id}`}
              onClick={() => setSide(id)}
              className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                side === id
                  ? id === 'cancha'
                    ? 'bg-pitch text-night'
                    : 'bg-alert text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* CANCHA */}
          <article
            id="panel-cancha"
            role="tabpanel"
            className={`${side === 'cancha' ? 'block' : 'hidden'} card relative overflow-hidden p-6 sm:p-8 lg:block`}
          >
            <div className="pitch-lines absolute inset-0 -z-10 opacity-60" />
            <header className="mb-6 flex items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-2xl font-semibold text-white">En la Cancha</h3>
                <p className="mt-1 text-sm text-pitch">Minuto 90 · Año 2050</p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-pitch/40 bg-pitch/10 px-3 py-1 font-mono text-xs font-semibold text-pitch">
                <Clock className="h-3.5 w-3.5" aria-hidden /> 90:00
              </span>
            </header>

            <div className="relative mb-6 aspect-video overflow-hidden rounded-xl border border-pitch/30 bg-gradient-to-b from-evergreen to-night">
              <svg viewBox="0 0 320 180" className="absolute inset-0 h-full w-full text-white/25" aria-hidden>
                <rect x="6" y="6" width="308" height="168" fill="none" stroke="currentColor" strokeWidth="1.2" />
                <rect x="226" y="40" width="88" height="100" fill="none" stroke="currentColor" strokeWidth="1.2" />
                <rect x="284" y="68" width="30" height="44" fill="none" stroke="currentColor" strokeWidth="1.2" />
                <circle cx="256" cy="90" r="1.8" fill="currentColor" />
                <line x1="160" y1="6" x2="160" y2="174" stroke="currentColor" strokeWidth="1.2" />
                <circle cx="160" cy="90" r="26" fill="none" stroke="currentColor" strokeWidth="1.2" />
              </svg>
              {/* players */}
              <span className="absolute left-[68%] top-[46%] h-3 w-3 rounded-full bg-var-soft shadow" />
              <span
                className={`absolute h-3 w-3 rounded-full bg-alert-soft shadow transition-all duration-700 ${
                  step >= 1 ? 'left-[71%] top-[52%]' : 'left-[72%] top-[44%]'
                }`}
              />
              <span className="absolute left-[74%] top-[49%] h-2 w-2 rounded-full bg-white shadow" />
              {step === 2 && (
                <>
                  <div className="absolute inset-y-0 left-[70.5%] w-px bg-var/80" />
                  <div className="absolute inset-x-0 h-1/3 animate-scan bg-gradient-to-b from-transparent via-var/10 to-transparent" />
                </>
              )}
              <div className="absolute left-3 top-3 flex items-center gap-2 rounded-md bg-black/50 px-2 py-1 font-mono text-[11px] uppercase tracking-wider text-white/80">
                {step === 2 ? (
                  <>
                    <Tv className="h-3 w-3 text-var-soft" aria-hidden /> REPLAY · {angles[angle]} · 0.25x
                  </>
                ) : step === 3 ? (
                  <>
                    <UserCheck className="h-3 w-3 text-pitch" aria-hidden /> Decisión humana
                  </>
                ) : (
                  <>
                    <span className="h-1.5 w-1.5 animate-blink rounded-full bg-alert" /> EN VIVO
                  </>
                )}
              </div>
              {step >= 1 && step < 3 && (
                <div className="absolute bottom-3 right-3 rounded-md border border-var/60 bg-var/20 px-2 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-var-soft">
                  VAR · Revisión en curso
                </div>
              )}
            </div>

            <ol className="space-y-3">
              {replaySteps.map(({ icon: Icon, title, text }, i) => (
                <li
                  key={title}
                  className={`flex gap-3 rounded-xl border p-3 transition ${
                    i === step
                      ? 'border-pitch/50 bg-pitch/10'
                      : i < step
                        ? 'border-slate-800'
                        : 'border-dashed border-slate-800'
                  }`}
                >
                  <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${i <= step ? 'text-pitch' : 'text-slate-400'}`} aria-hidden />
                  <div>
                    <p className={`text-sm font-semibold ${i <= step ? 'text-white' : 'text-slate-300'}`}>{title}</p>
                    <p className="text-sm text-slate-400">{text}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-6 flex flex-wrap gap-3">
              {!finished ? (
                <button
                  onClick={advance}
                  className="inline-flex items-center gap-2 rounded-lg bg-pitch px-4 py-2 text-sm font-semibold text-night hover:bg-pitch-soft"
                >
                  <Eye className="h-4 w-4" aria-hidden />
                  {step === 2 && angle < angles.length - 1 ? 'Ver otro ángulo' : 'Revisar la jugada'}
                </button>
              ) : (
                <button
                  onClick={reset}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 hover:border-pitch/60"
                >
                  <RotateCcw className="h-4 w-4" aria-hidden /> Repetir la secuencia
                </button>
              )}
            </div>
          </article>

          {/* JUZGADO */}
          <article
            id="panel-juzgado"
            role="tabpanel"
            className={`${side === 'juzgado' ? 'block' : 'hidden'} card relative overflow-hidden p-6 sm:p-8 lg:block`}
          >
            <header className="mb-6 flex items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-2xl font-semibold text-white">En el Juzgado</h3>
                <p className="mt-1 text-sm text-alert-soft">03:00 AM · Sala penal</p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-alert/40 bg-alert/10 px-3 py-1 font-mono text-xs font-semibold text-alert-soft">
                <Clock className="h-3.5 w-3.5" aria-hidden /> 03:00
              </span>
            </header>

            <div className="relative mb-6 overflow-hidden rounded-xl border border-alert/40 bg-ink p-5 shadow-[inset_0_0_60px_-20px] shadow-alert/40">
              <div className="mb-4 flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-slate-400">
                <span>RISK-ASSESS v?.?</span>
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 animate-blink rounded-full bg-alert" /> procesando
                </span>
              </div>
              <div className="flex h-28 items-end gap-2" aria-hidden>
                {bars.map((b, i) => (
                  <div
                    key={i}
                    style={{ height: `${b * 100}%` }}
                    className={`flex-1 rounded-t ${b === 0.89 ? 'animate-blink bg-alert' : 'bg-alert/25'}`}
                  />
                ))}
              </div>
              <div className="mt-5 border-t border-slate-800 pt-4 text-center">
                <p className="animate-blink font-mono text-3xl font-bold text-alert sm:text-4xl">0,89 / 1,00</p>
                <p className="mt-1 font-mono text-sm font-semibold tracking-[0.3em] text-alert-soft">— RIESGO ELEVADO</p>
              </div>
            </div>

            <ul className="divide-y divide-slate-800 border-y border-slate-800">
              {[
                ['Repetición en cámara lenta', 'No disponible'],
                ['Explicación de variables', 'Sin datos'],
                ['Margen de error', 'Desconocido'],
                ['Validación para la población local', 'No informada'],
              ].map(([k, v]) => (
                <li
                  key={k}
                  className="flex items-center justify-between gap-3 py-3"
                >
                  <span className="text-sm text-slate-300">{k}</span>
                  <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase text-alert-soft">
                    <AlertTriangle className="h-3.5 w-3.5" aria-hidden /> {v}
                  </span>
                </li>
              ))}
            </ul>

            <p className="mt-6 text-sm leading-relaxed text-slate-400">
              La fiscalía incorpora el informe. La defensa pide conocer sus fundamentos. El juez debe decidir, y esta vez{' '}
              <strong className="text-slate-200">no existe una pantalla desde la cual repetir la jugada</strong>.
            </p>
          </article>
        </div>

        <figure className="relative mx-auto mt-16 max-w-4xl overflow-hidden rounded-2xl border border-var/30 bg-gradient-to-br from-var/10 via-slate-850/60 to-pitch/10 p-8 sm:p-12">
          <Quote className="absolute -left-2 -top-2 h-24 w-24 text-var/10" aria-hidden />
          <blockquote className="relative font-serif text-2xl italic leading-snug text-white sm:text-3xl">
            “Una cifra puede expresar una probabilidad, pero nunca debe confundirse con una sentencia. La inteligencia
            artificial puede ser asistente de línea. <span className="not-italic text-var-soft">Nunca árbitro.</span>”
          </blockquote>
          <figcaption className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-slate-400">
            — El VAR de la Justicia · Galilea Selena Churquina
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
