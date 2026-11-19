import { useEffect, useState } from 'react'
import { Check, Gavel, Loader2, ShieldCheck, Trophy } from 'lucide-react'
import { PROD, award, pillars } from './content'

const STEP_MS = 650

export default function VariantRevision() {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPhase(pillars.length + 1)
      return
    }
    const timers = Array.from({ length: pillars.length + 1 }, (_, i) =>
      window.setTimeout(() => setPhase(i + 1), 700 + i * STEP_MS),
    )
    return () => timers.forEach(clearTimeout)
  }, [])

  const decided = phase > pillars.length

  return (
    <section className="tv-floodlights relative flex min-h-[100svh] items-center overflow-hidden pb-24 pt-24">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]">
        <div>
          <p className="tv-drop inline-flex items-center gap-2 rounded-md bg-var px-3 py-1.5 text-sm font-semibold text-night">
            <Trophy className="h-4 w-4" aria-hidden />
            <span>
              1.<sup>er</sup> Premio · Monografías · Tucumán 2026
            </span>
          </p>
          <h1 className="tv-rise mt-6 font-serif text-5xl font-bold leading-[1.02] tracking-tight text-white [animation-delay:80ms] sm:text-6xl">
            EL VAR DE LA JUSTICIA:
            <span className="mt-2 block text-3xl font-semibold text-slate-200 sm:text-5xl">
              ¿Quién arbitra cuando el algoritmo decide?
            </span>
          </h1>
          <p className="tv-rise mt-6 max-w-xl text-lg leading-relaxed text-slate-300 [animation-delay:160ms]">
            Antes de que un puntaje pese sobre la libertad de alguien, la jugada se revisa. Esa revisión tiene
            nombre: <strong className="text-white">Estándar de Revisabilidad Algorítmica Efectiva (ERAE)</strong>.
          </p>
          <div className="tv-rise mt-8 flex flex-col gap-3 [animation-delay:240ms] sm:flex-row">
            <a href={`${PROD}#erae`} className="inline-flex items-center justify-center gap-2 rounded-lg bg-pitch px-6 py-3.5 font-semibold text-night hover:bg-emerald-400">
              <ShieldCheck className="h-5 w-5" aria-hidden /> Explorar el Estándar ERAE
            </a>
            <a href={`${PROD}#caso`} className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-600 px-6 py-3.5 font-semibold text-white hover:border-var hover:text-var">
              <Gavel className="h-5 w-5" aria-hidden /> Ver el relato del caso Mateo
            </a>
          </div>
          <p className="mt-8 max-w-xl text-xs leading-relaxed text-slate-400">{award}</p>
        </div>

        {/* VAR review monitor */}
        <div
          className={`overflow-hidden rounded-xl border-2 bg-ink shadow-[0_18px_48px_rgba(0,0,0,0.55)] transition-colors duration-300 ${
            decided ? 'border-pitch' : 'border-var'
          }`}
          aria-live="polite"
        >
          <div className={`font-tv flex items-center justify-between px-4 py-2 text-lg font-bold uppercase tracking-wider ${decided ? 'bg-pitch text-night' : 'bg-var text-night'}`}>
            <span>{decided ? 'Revisión completada' : 'VAR · Revisión en curso'}</span>
            <span className="font-mono text-base">90+3’</span>
          </div>

          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-800 px-5 py-5">
            <div>
              <p className="text-sm text-slate-400">Informe algorítmico de riesgo</p>
              <p className={`font-mono text-3xl font-bold transition-colors duration-300 sm:text-5xl ${decided ? 'text-slate-500 line-through decoration-alert decoration-4' : 'text-alert-soft'}`}>
                0,89 / 1,00
              </p>
            </div>
            <span className={`font-tv rounded px-2 py-1 text-base font-bold uppercase ${decided ? 'bg-slate-800 text-slate-300' : 'bg-alert text-white'}`}>
              {decided ? 'No decide' : 'Riesgo elevado'}
            </span>
          </div>

          <ol className="divide-y divide-slate-800">
            {pillars.map((p, i) => {
              const checked = phase > i
              return (
                <li key={p.name} className="flex items-start gap-4 px-5 py-4">
                  <span className={`mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full ${checked ? 'bg-pitch text-night' : 'bg-slate-800 text-var'}`}>
                    {checked ? <Check className="h-4 w-4" aria-hidden /> : <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
                  </span>
                  <div className="flex-1">
                    <p className="font-tv text-xl font-bold uppercase tracking-wide text-white">Revisabilidad {p.name}</p>
                    <p className="text-sm text-slate-300">{p.text}</p>
                  </div>
                  <span className={`font-tv text-base font-bold uppercase ${checked ? 'text-pitch' : 'text-var'}`}>
                    {checked ? 'Exigida' : 'Revisando'}
                  </span>
                </li>
              )
            })}
          </ol>

          <div className="min-h-[76px] border-t border-slate-800 px-5 py-4">
            {decided && (
              <p className="tv-slam font-tv text-3xl font-extrabold uppercase tracking-wide text-pitch sm:text-4xl">
                Decisión final: humana
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
