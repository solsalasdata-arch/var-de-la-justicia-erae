import { ArrowUp, MonitorPlay } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 md:flex-row md:items-end md:justify-between">
        <div className="max-w-xl">
          <p className="flex items-center gap-2 font-serif text-lg font-semibold text-white">
            <MonitorPlay className="h-5 w-5 text-var" aria-hidden /> El VAR de la Justicia
          </p>
          <p className="mt-3 font-serif text-xl italic text-slate-300">
            La inteligencia artificial puede ser asistente de línea. <span className="text-var">Nunca árbitro.</span>
          </p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-400">
            Churquina, G. S. (2026). <em>El VAR de la Justicia: Inteligencia artificial, evaluación de riesgo y el Estándar
            de Revisabilidad Algorítmica Efectiva (ERAE) en el proceso penal</em>. Eje 1: IA y Derecho Penal. Colaboración
            técnica: Lic. Sol Brenda Salas. El caso Mateo es hipotético y tiene fines académicos.
          </p>
        </div>
        <a
          href="#inicio"
          className="inline-flex items-center gap-2 self-start rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-300 hover:border-pitch/60 hover:text-pitch md:self-auto"
        >
          <ArrowUp className="h-4 w-4" aria-hidden /> Volver al inicio
        </a>
      </div>
    </footer>
  )
}
