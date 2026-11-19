import { Gavel, ShieldCheck, Trophy } from 'lucide-react'
import { PROD, award, committee, pillars } from './content'

export default function VariantTransmision() {
  const crawl = `${award}  ·  ${committee}  ·  `
  return (
    <section className="tv-floodlights relative flex min-h-[100svh] flex-col overflow-hidden pt-16">
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-5 pb-28 pt-6 sm:pt-10">
        {/* Scoreboard bug + live tag */}
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="tv-drop font-tv flex items-stretch overflow-hidden rounded-md text-base font-bold uppercase leading-none tracking-wide shadow-[0_6px_18px_rgba(0,0,0,0.45)] sm:text-xl">
            <span className="flex items-center bg-alert px-3 py-2 text-white">Algoritmo</span>
            <span className="flex items-center bg-white px-3 py-2 font-mono text-base font-bold text-night sm:text-lg">0,89</span>
            <span className="flex items-center bg-slate-900 px-2 text-slate-400">–</span>
            <span className="flex items-center bg-white px-3 py-2 font-mono text-base font-bold text-night sm:text-lg">0</span>
            <span className="flex items-center bg-var px-3 py-2 text-night">Pruebas</span>
            <span className="hidden items-center bg-night px-3 py-2 font-mono text-base text-white sm:flex sm:text-lg">90:00</span>
          </div>
          <div className="tv-drop font-tv flex items-center gap-2 rounded-md bg-night/80 px-3 py-2 text-base font-bold uppercase tracking-wider text-white [animation-delay:120ms]">
            <span className="tv-pulse h-2.5 w-2.5 rounded-full bg-alert" /> En vivo · VAR
          </div>
        </div>

        {/* Headline */}
        <div className="mt-12 max-w-4xl sm:mt-16">
          <h1 className="tv-rise font-serif text-5xl font-bold leading-[1.02] tracking-tight text-white [animation-delay:160ms] sm:text-7xl">
            EL VAR DE LA JUSTICIA:
            <span className="mt-2 block text-4xl font-semibold text-slate-200 sm:text-6xl">
              ¿Quién arbitra cuando el algoritmo decide?
            </span>
          </h1>
        </div>

        {/* Lower third: the proposal */}
        <div className="mt-auto pt-12">
          <div className="tv-wipe max-w-4xl overflow-hidden rounded-lg shadow-[0_12px_32px_rgba(0,0,0,0.5)] [animation-delay:420ms]">
            <div className="flex flex-col sm:flex-row">
              <div className="font-tv flex items-center justify-center bg-pitch px-6 py-4 text-5xl font-extrabold leading-none tracking-wide text-night sm:text-6xl">
                ERAE
              </div>
              <div className="flex-1 bg-white px-5 py-4 text-night">
                <p className="font-tv text-2xl font-bold uppercase leading-tight tracking-wide sm:text-3xl">
                  Estándar de Revisabilidad Algorítmica Efectiva
                </p>
                <p className="mt-1 text-sm text-slate-700 sm:text-base">
                  La propuesta: ningún puntaje restringe la libertad si no puede revisarse técnica, procesal y
                  judicialmente.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 bg-night/95 sm:grid-cols-3">
              {pillars.map((p, i) => (
                <div key={p.name} className={`px-5 py-3 ${i > 0 ? 'border-t border-slate-800 sm:border-l sm:border-t-0' : ''}`}>
                  <p className="font-tv text-lg font-bold uppercase tracking-wide text-pitch">{p.name}</p>
                  <p className="text-sm text-slate-300">{p.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="tv-rise mt-6 flex flex-col gap-3 [animation-delay:640ms] sm:flex-row">
            <a href={`${PROD}#erae`} className="inline-flex items-center justify-center gap-2 rounded-lg bg-pitch px-6 py-3.5 font-semibold text-night hover:bg-emerald-400">
              <ShieldCheck className="h-5 w-5" aria-hidden /> Explorar el Estándar ERAE
            </a>
            <a href={`${PROD}#caso`} className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-600 bg-night/70 px-6 py-3.5 font-semibold text-white hover:border-var hover:text-var">
              <Gavel className="h-5 w-5" aria-hidden /> Ver el relato del caso Mateo
            </a>
          </div>
        </div>
      </div>

      {/* Ticker crawl */}
      <div className="absolute inset-x-0 bottom-0 flex items-stretch bg-var text-night">
        <span className="font-tv z-10 flex shrink-0 items-center gap-2 bg-night px-4 text-base font-bold uppercase tracking-wider text-var">
          <Trophy className="h-4 w-4" aria-hidden /> Último momento
        </span>
        <div className="overflow-hidden py-2.5">
          <p className="tv-crawl font-tv whitespace-nowrap text-lg font-semibold uppercase tracking-wide">
            <span>{crawl}</span>
            <span aria-hidden>{crawl}</span>
          </p>
        </div>
      </div>
    </section>
  )
}
