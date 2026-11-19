import { BrainCircuit, GraduationCap, Mail, MapPin, Trophy } from 'lucide-react'
import SectionHeader from './SectionHeader'

const committee = ['José Ignacio Pastores', 'Adolfo Iriarte Yanicelli', 'Ana María Basualdo']

export default function Authors() {
  return (
    <section id="autoras" className="relative border-t border-slate-800/60 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeader
          chapter="Ficha técnica"
          tone="var"
          title="Derecho penal y ciencia de datos, en la misma cancha"
          intro="Una monografía jurídica que cruzó la frontera de su disciplina para desentrañar la opacidad de los algoritmos."
        />

        <div className="grid gap-6 md:grid-cols-2">
          <article className="card relative overflow-hidden p-6 sm:p-8">
            <h3 className="font-serif text-3xl font-semibold text-white">Galilea Selena Churquina</h3>
            <p className="mt-1 text-sm font-semibold text-pitch">Autora de la monografía</p>
            <ul className="mt-5 space-y-2.5 text-sm text-slate-300">
              <li className="flex gap-2.5">
                <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" aria-hidden />
                Estudiante avanzada de Abogacía, Universidad Católica de Salta (UCASAL)
              </li>
              <li className="flex gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" aria-hidden />
                Jujuy, Argentina
              </li>
              <li className="flex gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" aria-hidden />
                <a href="mailto:degalilea03@gmail.com" className="font-mono text-pitch hover:underline">
                  degalilea03@gmail.com
                </a>
              </li>
            </ul>
          </article>

          <article className="card relative overflow-hidden p-6 sm:p-8">
            <h3 className="font-serif text-3xl font-semibold text-white">Lic. Sol Brenda Salas</h3>
            <p className="mt-1 text-sm font-semibold text-sky-400">Colaboración técnica en IA y Ciencia de Datos</p>
            <ul className="mt-5 space-y-2.5 text-sm text-slate-300">
              <li className="flex gap-2.5">
                <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" aria-hidden />
                Licenciada en Ciencia de Datos, Universidad Católica de Salta (UCASAL)
              </li>
              <li className="flex gap-2.5">
                <BrainCircuit className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" aria-hidden />
                Especialista en Inteligencia Artificial, Visión por Computadora y auditoría algorítmica
              </li>
            </ul>
            <p className="mt-5 border-l-2 border-sky-500/40 pl-4 font-serif text-sm italic leading-relaxed text-slate-400">
              “Tu agudeza técnica en inteligencia artificial y tu mirada fueron indispensables para desentrañar la
              opacidad de los algoritmos.” — Agradecimientos de la monografía
            </p>
          </article>
        </div>

        <article className="tv-led relative mt-6 overflow-hidden rounded-2xl border-4 border-slate-800 p-6 sm:p-10">
          <Trophy className="absolute -bottom-6 -right-6 h-48 w-48 text-var/10" aria-hidden />
          <div className="relative">
            <div>
              <h3 className="font-serif text-3xl font-bold text-white sm:text-4xl">
                1.<sup>er</sup> Premio · Categoría Monografías
              </h3>
              <p className="mt-1 text-sm font-semibold text-var">Fallo oficial del Comité Evaluador</p>
              <p className="mt-3 max-w-2xl leading-relaxed text-slate-300">
                Congreso Internacional <em>“Inteligencia Artificial en la Justicia: Innovación y Justicia”</em> ·
                Tucumán, Argentina · <span className="font-mono text-var">12–13 de noviembre de 2026</span>
              </p>
              <div className="mt-6">
                <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-slate-400">Comité evaluador</p>
                <ul className="flex flex-wrap gap-2">
                  {committee.map((name) => (
                    <li
                      key={name}
                      className="rounded-full border border-slate-700 bg-night/60 px-3.5 py-1.5 text-sm font-medium text-slate-200"
                    >
                      {name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}
