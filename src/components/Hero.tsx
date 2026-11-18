import { ArrowDown, Gavel, Scale, ShieldCheck } from 'lucide-react'

export default function Hero() {
  return (
    <section id="inicio" className="relative isolate overflow-hidden pb-24 pt-32 sm:pt-40">
      <div className="pitch-lines absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div className="absolute left-1/2 top-24 -z-10 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-pitch/10 blur-3xl" />
      <div className="absolute -right-24 top-64 -z-10 h-72 w-72 rounded-full bg-var/10 blur-3xl" />
      <div className="absolute -left-24 top-96 -z-10 h-72 w-72 rounded-full bg-alert/10 blur-3xl" />

      {/* Centre circle of the pitch */}
      <svg
        aria-hidden
        className="absolute left-1/2 top-1/2 -z-10 h-[38rem] w-[38rem] -translate-x-1/2 -translate-y-1/2 text-pitch/10"
        viewBox="0 0 200 200"
        fill="none"
        stroke="currentColor"
      >
        <circle cx="100" cy="100" r="60" strokeWidth="0.6" />
        <circle cx="100" cy="100" r="1.6" fill="currentColor" />
        <line x1="100" y1="0" x2="100" y2="200" strokeWidth="0.6" />
      </svg>

      <div className="mx-auto max-w-5xl px-5 text-center">
        <p className="mx-auto inline-flex max-w-full animate-rise items-center gap-2 rounded-full border border-var/40 bg-var/10 px-4 py-2 text-left text-xs font-medium text-var shadow-[0_0_30px_-10px] shadow-var/50 sm:text-sm">
          <span>
            <span aria-hidden>🏆 </span>1.<sup>er</sup> Premio Categoría Monografías · Congreso Internacional IA en la
            Justicia (Tucumán, Noviembre 2026)
          </span>
        </p>

        <h1 className="mt-8 animate-rise font-serif text-4xl font-bold leading-[1.05] tracking-tight text-white [animation-delay:80ms] sm:text-6xl lg:text-7xl">
          EL VAR DE LA JUSTICIA:
          <span className="mt-3 block bg-gradient-to-r from-pitch via-emerald-300 to-var bg-clip-text font-semibold italic text-transparent">
            ¿Quién arbitra cuando el algoritmo decide?
          </span>
        </h1>

        <p className="mx-auto mt-8 max-w-2xl animate-rise text-lg italic leading-relaxed text-slate-400 [animation-delay:160ms] sm:text-xl">
          Inteligencia artificial, evaluación de riesgo y el Estándar de Revisabilidad Algorítmica Efectiva (ERAE) en el
          proceso penal.
        </p>

        <div className="mt-10 flex animate-rise flex-col items-center justify-center gap-4 [animation-delay:240ms] sm:flex-row">
          <a
            href="#caso"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-pitch px-6 py-3.5 font-semibold text-night shadow-lg shadow-pitch/25 transition hover:bg-emerald-400 sm:w-auto"
          >
            <Gavel className="h-5 w-5" aria-hidden />
            Probar Sala VAR Jurídica (Caso Mateo)
          </a>
          <a
            href="#erae"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-850/70 px-6 py-3.5 font-semibold text-white transition hover:border-var/60 hover:text-var sm:w-auto"
          >
            <ShieldCheck className="h-5 w-5" aria-hidden />
            Explorar el Estándar ERAE
          </a>
        </div>

        <dl className="mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-3 text-left sm:grid-cols-3">
          {[
            { k: 'Puntaje algorítmico', v: '0,89 / 1,00', c: 'text-alert', icon: Scale },
            { k: 'Pruebas fácticas autónomas', v: '0', c: 'text-var', icon: Gavel },
            { k: 'Decisión final', v: 'HUMANA', c: 'text-pitch', icon: ShieldCheck },
          ].map(({ k, v, c, icon: Icon }) => (
            <div key={k} className="card flex items-center gap-4 px-5 py-4">
              <Icon className={`h-5 w-5 shrink-0 ${c}`} aria-hidden />
              <div>
                <dt className="text-xs uppercase tracking-wider text-slate-500">{k}</dt>
                <dd className={`font-mono text-xl font-bold ${c}`}>{v}</dd>
              </div>
            </div>
          ))}
        </dl>

        <a
          href="#prologo"
          className="mt-14 inline-flex flex-col items-center gap-2 text-xs uppercase tracking-[0.25em] text-slate-500 hover:text-slate-300"
        >
          Comenzar el partido
          <ArrowDown className="h-4 w-4 animate-bounce" aria-hidden />
        </a>
      </div>
    </section>
  )
}
