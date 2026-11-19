import { Radio, ShieldCheck, Trophy } from 'lucide-react'
import { pillars } from '../data/erae'

const panelTone = {
  pitch: 'bg-pitch text-night',
  var: 'bg-var text-night',
  alert: 'bg-alert text-white',
}

export default function Hero() {
  return (
    <section id="inicio" className="tv-floodlights relative overflow-hidden pb-20 pt-24 sm:pt-28">
      <div className="mx-auto max-w-6xl px-5">
        <h1 className="tv-rise text-center font-serif text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
          EL VAR DE LA JUSTICIA:{' '}
          <span className="font-semibold text-slate-200">¿Quién arbitra cuando el algoritmo decide?</span>
        </h1>
        <p className="tv-rise mx-auto mt-5 max-w-2xl text-center text-lg leading-relaxed text-slate-300 [animation-delay:80ms]">
          Inteligencia artificial, evaluación de riesgo y el Estándar de Revisabilidad Algorítmica Efectiva (ERAE) en el
          proceso penal.
        </p>

        <div
          role="group"
          aria-label="Marcador: algoritmo contra ERAE"
          className="tv-led tv-flash mt-10 overflow-hidden rounded-2xl border-4 border-slate-800 shadow-[0_24px_60px_rgba(0,0,0,0.6)] [animation-delay:200ms]"
        >
          <p className="flex items-center gap-2 bg-night px-5 py-2 text-sm font-semibold text-var sm:text-base">
            <Trophy className="h-4 w-4 shrink-0" aria-hidden />
            <span>
              1.<sup>er</sup> Premio Categoría Monografías · Congreso Internacional IA en la Justicia (Tucumán, Noviembre
              2026)
            </span>
          </p>

          <div className="grid items-center gap-6 px-5 py-8 sm:px-10 md:grid-cols-[1fr_auto_1fr]">
            <div className="text-center md:text-right">
              <p className="font-tv text-2xl font-bold uppercase tracking-[0.15em] text-slate-400">Algoritmo</p>
              <p className="font-mono text-6xl font-bold tabular-nums text-alert-soft sm:text-7xl">0,89</p>
              <p className="font-tv text-lg uppercase tracking-wider text-slate-400">Riesgo sin explicar</p>
            </div>
            <p className="font-tv text-center text-3xl font-bold uppercase text-slate-400">vs</p>
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
              <div key={p.id} className={`tv-rise px-5 py-4 ${panelTone[p.color]}`} style={{ animationDelay: `${700 + i * 90}ms` }}>
                <p className="font-tv text-2xl font-extrabold uppercase tracking-wide">{p.title.replace('Revisabilidad ', '')}</p>
                <p className="text-sm font-medium">{p.tagline}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="tv-rise mt-8 flex flex-col items-center justify-center gap-3 [animation-delay:1000ms] sm:flex-row">
          <a
            href="#erae"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-pitch px-6 py-3.5 font-semibold text-night transition-colors hover:bg-emerald-400 sm:w-auto"
          >
            <ShieldCheck className="h-5 w-5" aria-hidden /> Explorar el Estándar ERAE
          </a>
          <a
            href="#caso"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-600 px-6 py-3.5 font-semibold text-white transition-colors hover:border-var hover:text-var sm:w-auto"
          >
            <Radio className="h-5 w-5" aria-hidden /> Seguir el caso Mateo en vivo
          </a>
        </div>
      </div>
    </section>
  )
}
