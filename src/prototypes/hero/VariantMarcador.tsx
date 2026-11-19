import { Gavel, ShieldCheck, Trophy } from 'lucide-react'
import { PROD, committee, pillars } from './content'

const panelTone = ['bg-pitch text-night', 'bg-var text-night', 'bg-alert text-white'] as const

export default function VariantMarcador() {
  return (
    <section className="tv-floodlights relative overflow-hidden pb-28 pt-24">
      <div className="mx-auto max-w-6xl px-5">
        <h1 className="tv-rise text-center font-serif text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
          EL VAR DE LA JUSTICIA:{' '}
          <span className="font-semibold text-slate-200">¿Quién arbitra cuando el algoritmo decide?</span>
        </h1>

        {/* Stadium LED scoreboard */}
        <div className="tv-led tv-flash mt-10 overflow-hidden rounded-2xl border-4 border-slate-800 shadow-[0_24px_60px_rgba(0,0,0,0.6)] [animation-delay:200ms]">
          <div className="font-tv flex items-center justify-between bg-night px-5 py-2 text-base font-bold uppercase tracking-[0.2em] text-slate-300 sm:text-lg">
            <span className="flex items-center gap-2 text-var">
              <Trophy className="h-4 w-4" aria-hidden />
              <span>
                1.<sup>er</sup> Premio · Monografías
              </span>
            </span>
            <span className="hidden sm:inline">Tucumán · Nov 2026</span>
          </div>

          <div className="grid items-center gap-6 px-5 py-8 sm:px-10 md:grid-cols-[1fr_auto_1fr]">
            <div className="text-center md:text-right">
              <p className="font-tv text-2xl font-bold uppercase tracking-[0.15em] text-slate-400">Algoritmo</p>
              <p className="font-mono text-6xl font-bold text-alert-soft sm:text-7xl">0,89</p>
              <p className="font-tv text-lg uppercase tracking-wider text-slate-400">Riesgo sin explicar</p>
            </div>
            <p className="font-tv text-center text-3xl font-bold uppercase text-slate-500">vs</p>
            <div className="text-center md:text-left">
              <p className="font-tv text-2xl font-bold uppercase tracking-[0.15em] text-slate-400">Proceso penal</p>
              <p className="font-tv text-7xl font-extrabold leading-none text-pitch sm:text-8xl">ERAE</p>
              <p className="font-tv text-lg uppercase tracking-wider text-slate-300">Revisión antes de decidir</p>
            </div>
          </div>

          <p className="font-tv border-y border-slate-800 bg-night/80 px-5 py-3 text-center text-xl font-bold uppercase tracking-wide text-white sm:text-2xl">
            Estándar de Revisabilidad Algorítmica Efectiva
          </p>

          <div className="grid sm:grid-cols-3">
            {pillars.map((p, i) => (
              <div key={p.name} className={`tv-rise px-5 py-4 ${panelTone[i]}`} style={{ animationDelay: `${700 + i * 90}ms` }}>
                <p className="font-tv text-2xl font-extrabold uppercase tracking-wide">{p.name}</p>
                <p className="text-sm font-medium opacity-90">{p.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="tv-rise mt-8 flex flex-col items-center justify-center gap-3 [animation-delay:1000ms] sm:flex-row">
          <a href={`${PROD}#erae`} className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-pitch px-6 py-3.5 font-semibold text-night hover:bg-emerald-400 sm:w-auto">
            <ShieldCheck className="h-5 w-5" aria-hidden /> Explorar el Estándar ERAE
          </a>
          <a href={`${PROD}#caso`} className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-600 px-6 py-3.5 font-semibold text-white hover:border-var hover:text-var sm:w-auto">
            <Gavel className="h-5 w-5" aria-hidden /> Ver el relato del caso Mateo
          </a>
        </div>
        <p className="mt-6 text-center text-sm text-slate-400">{committee}</p>
      </div>
    </section>
  )
}
