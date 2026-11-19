import { useState } from 'react'
import { BookOpen, CheckCircle2, ChevronDown, Circle, Gavel, RotateCcw } from 'lucide-react'
import SectionHeader from './SectionHeader'
import Chapter from './Chapter'
import { norms, pillars, precedents } from '../data/erae'

const tone = {
  pitch: { text: 'text-pitch', border: 'border-pitch', soft: 'border-pitch/50 bg-pitch/10', band: 'bg-pitch text-night', solid: 'bg-pitch' },
  var: { text: 'text-var', border: 'border-var', soft: 'border-var/50 bg-var/10', band: 'bg-var text-night', solid: 'bg-var' },
  alert: { text: 'text-alert-soft', border: 'border-alert', soft: 'border-alert/50 bg-alert/10', band: 'bg-alert text-white', solid: 'bg-alert' },
}

export default function Erae() {
  const [checked, setChecked] = useState<Record<string, boolean>>({})
  const [openPillar, setOpenPillar] = useState<string | null>(null)
  const [caseId, setCaseId] = useState(precedents[0].id)

  const toggle = (key: string) => setChecked((c) => ({ ...c, [key]: !c[key] }))
  const pillarDone = (id: string, n: number) =>
    Array.from({ length: n }, (_, i) => checked[`${id}-${i}`]).filter(Boolean).length

  const totalChecks = pillars.reduce((a, p) => a + p.checks.length, 0)
  const doneChecks = pillars.reduce((a, p) => a + pillarDone(p.id, p.checks.length), 0)
  const complete = doneChecks === totalChecks
  const selected = precedents.find((p) => p.id === caseId) ?? precedents[0]

  return (
    <section id="erae" className="relative border-t border-slate-800 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeader
          chapter="Revisión VAR"
          tone="pitch"
          title={
            <>
              Estándar de Revisabilidad Algorítmica Efectiva <span className="text-pitch">(ERAE)</span>
            </>
          }
          intro="El VAR Jurídico: verificación, auditoría y revisión. Tres dimensiones inseparables: la información debe permitir el examen técnico; el examen debe habilitar la contradicción; y la contradicción debe recibir una respuesta judicial fundada."
        />

        <div className="grid gap-5 lg:grid-cols-3">
          {pillars.map((p, idx) => {
            const t = tone[p.color]
            const n = pillarDone(p.id, p.checks.length)
            const isOpen = openPillar === p.id
            const Icon = p.icon
            return (
              <article key={p.id} className={`flex flex-col overflow-hidden rounded-xl border-2 bg-slate-850/70 ${isOpen ? t.border : 'border-slate-800'}`}>
                <header className={`font-tv flex items-center justify-between gap-3 px-5 py-3 ${t.band}`}>
                  <span className="flex items-center gap-2 text-2xl font-extrabold uppercase leading-none tracking-wide">
                    <Icon className="h-5 w-5" aria-hidden /> {p.title.replace('Revisabilidad ', '')}
                  </span>
                  <span className="font-mono text-base font-bold tabular-nums">
                    {n}/{p.checks.length}
                  </span>
                </header>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="sr-only">{p.title}</h3>
                  <p className="text-sm text-slate-400">Dimensión {idx + 1} de 3</p>
                  <p className="mt-2 leading-relaxed text-slate-200">{p.summary}</p>

                  <button
                    type="button"
                    onClick={() => setOpenPillar(isOpen ? null : p.id)}
                    aria-expanded={isOpen}
                    aria-controls={`checks-${p.id}`}
                    className={`mt-5 inline-flex items-center gap-1.5 self-start text-sm font-semibold ${t.text}`}
                  >
                    {isOpen ? 'Ocultar checklist' : 'Auditar con checklist'}
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} aria-hidden />
                  </button>

                  <div id={`checks-${p.id}`} hidden={!isOpen} className="mt-4 space-y-2">
                    {p.checks.map((c, i) => {
                      const key = `${p.id}-${i}`
                      const on = !!checked[key]
                      return (
                        <button
                          key={key}
                          type="button"
                          role="checkbox"
                          aria-checked={on}
                          onClick={() => toggle(key)}
                          className={`flex w-full items-start gap-2.5 rounded-lg border px-3 py-2 text-left text-sm transition-colors ${
                            on ? `${t.soft} text-white` : 'border-slate-800 text-slate-300 hover:border-slate-600'
                          }`}
                        >
                          {on ? (
                            <CheckCircle2 className={`mt-0.5 h-4 w-4 shrink-0 ${t.text}`} aria-hidden />
                          ) : (
                            <Circle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                          )}
                          {c}
                        </button>
                      )
                    })}
                    <p className="pt-2 font-serif text-sm italic text-slate-200">{p.question}</p>
                  </div>

                  <div className="mt-auto pt-6">
                    <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
                      <div className={`h-full ${t.solid} transition-[width] duration-500`} style={{ width: `${(n / p.checks.length) * 100}%` }} />
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        <div
          className={`mt-5 flex flex-col items-start justify-between gap-4 rounded-xl border-2 p-5 sm:flex-row sm:items-center ${
            complete ? 'border-pitch bg-pitch/10' : 'border-slate-800 bg-ink'
          }`}
          aria-live="polite"
        >
          <div>
            <p className="font-tv text-lg font-bold uppercase tracking-wide text-slate-300">Estado de la revisión</p>
            <p className={`font-semibold ${complete ? 'text-pitch' : 'text-white'}`}>
              {complete
                ? 'Revisabilidad efectiva: el resultado puede valorarse como un elemento sometido a control.'
                : 'Revisabilidad incompleta: el puntaje no debería fundar una restricción de derechos.'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {doneChecks > 0 && (
              <button
                type="button"
                onClick={() => setChecked({})}
                className="inline-flex min-h-[40px] items-center gap-1.5 rounded-md px-3 py-2 text-xs text-slate-300 hover:bg-slate-800 hover:text-white"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden /> Reiniciar
              </button>
            )}
            <span className={`font-mono text-3xl font-bold tabular-nums ${complete ? 'text-pitch' : 'text-var'}`}>
              {doneChecks}/{totalChecks}
            </span>
          </div>
        </div>

        <figure className="mt-12 overflow-hidden rounded-xl shadow-[0_12px_32px_rgba(0,0,0,0.45)]">
          <figcaption className="font-tv flex items-center gap-2 bg-var px-5 py-2 text-lg font-extrabold uppercase tracking-wide text-night">
            <BookOpen className="h-5 w-5" aria-hidden /> Propuesta normativa
          </figcaption>
          <blockquote className="bg-white px-5 py-6 font-serif text-lg leading-relaxed text-night sm:px-8 sm:text-xl">
            <p className="max-w-[60ch]">
              <strong>Principio de revisión algorítmica procesal.</strong> La utilización de herramientas de inteligencia
              artificial en el proceso penal requiere transparencia técnica y plena facultad de contradicción sobre los
              datos y la metodología empleada. La decisión judicial no podrá delegarse en predicciones automatizadas ni
              privar de derechos si no median condiciones de auditabilidad efectiva y fundamentación humana independiente.
            </p>
          </blockquote>
        </figure>

        <div className="mt-12 space-y-4">
          <Chapter title="Jurisprudencia comparada" meta={`${precedents.length} fallos · EE. UU., Canadá, Alemania, Reino Unido, Europa y Corte IDH`}>
            <div className="grid gap-5 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
              <ul className="space-y-2" role="listbox" aria-label="Precedentes">
                {precedents.map((p) => (
                  <li key={p.id}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={p.id === caseId}
                      onClick={() => setCaseId(p.id)}
                      className={`flex w-full items-center justify-between gap-3 rounded-lg border px-4 py-3 text-left transition-colors ${
                        p.id === caseId ? 'border-pitch bg-pitch/10' : 'border-slate-800 hover:border-slate-600'
                      }`}
                    >
                      <span>
                        <span className="block font-serif text-base font-semibold italic text-white">{p.name}</span>
                        <span className="block text-xs text-slate-400">{p.court}</span>
                      </span>
                      <span className="font-mono shrink-0 rounded-sm bg-var px-2 py-0.5 text-xs font-bold text-night">{p.year}</span>
                    </button>
                  </li>
                ))}
              </ul>

              <article key={selected.id} className="tv-rise h-fit rounded-lg bg-night/60 p-5 sm:p-6">
                <h4 className="font-serif text-3xl font-semibold italic text-white">{selected.name}</h4>
                <p className="mt-2 text-sm font-semibold text-var">{selected.topic}</p>
                <p className="mt-1 text-sm text-slate-400">
                  {selected.court} · <span className="font-mono text-slate-300">{selected.citation}</span>
                </p>
                <p className="mt-5 leading-relaxed text-slate-200">{selected.summary}</p>
                <div className="mt-5 border-t border-slate-800 pt-4">
                  <p className="mb-1 flex items-center gap-2 text-sm font-semibold text-pitch">
                    <Gavel className="h-4 w-4" aria-hidden /> Aporte al ERAE
                  </p>
                  <p className="text-sm leading-relaxed text-slate-200">{selected.takeaway}</p>
                </div>
              </article>
            </div>
          </Chapter>

          <Chapter title="Normativa argentina" meta="Constitución Nacional, Ley 25.326, CPPF y Ley 27.785">
            <div className="grid gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
              {norms.map((n) => (
                <article key={n.id} className="border-t-2 border-slate-700 pt-3">
                  <p className="font-tv text-base font-bold uppercase tracking-wide text-var">{n.scope}</p>
                  <h4 className="mt-1 font-serif text-xl font-semibold text-white">{n.name}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">{n.detail}</p>
                </article>
              ))}
            </div>
          </Chapter>
        </div>
      </div>
    </section>
  )
}
