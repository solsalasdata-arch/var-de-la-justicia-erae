import { useState } from 'react'
import { ArrowRight, BookOpen, CheckCircle2, ChevronDown, Circle, Gavel, Globe2, ScrollText } from 'lucide-react'
import SectionHeader from './SectionHeader'
import { norms, pillars, precedents } from '../data/erae'

const tone = {
  pitch: { text: 'text-pitch', border: 'border-pitch/50', bg: 'bg-pitch/10', solid: 'bg-pitch' },
  var: { text: 'text-var', border: 'border-var/50', bg: 'bg-var/10', solid: 'bg-var' },
  alert: { text: 'text-alert', border: 'border-alert/50', bg: 'bg-alert/10', solid: 'bg-alert' },
}

export default function Erae() {
  const [checked, setChecked] = useState<Record<string, boolean>>({})
  const [openPillar, setOpenPillar] = useState<string | null>('tecnica')
  const [tab, setTab] = useState<'juris' | 'norma'>('juris')
  const [caseId, setCaseId] = useState(precedents[0].id)

  const toggle = (key: string) => setChecked((c) => ({ ...c, [key]: !c[key] }))
  const pillarDone = (id: string, n: number) =>
    Array.from({ length: n }, (_, i) => checked[`${id}-${i}`]).filter(Boolean).length

  const totalChecks = pillars.reduce((a, p) => a + p.checks.length, 0)
  const doneChecks = pillars.reduce((a, p) => a + pillarDone(p.id, p.checks.length), 0)
  const complete = pillars.every((p) => pillarDone(p.id, p.checks.length) === p.checks.length)
  const selected = precedents.find((p) => p.id === caseId) ?? precedents[0]

  return (
    <section id="erae" className="relative border-t border-slate-800/60 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeader
          eyebrow="VAR Jurídico · Verificación, Auditoría y Revisión"
          title={
            <>
              Estándar de Revisabilidad Algorítmica Efectiva <span className="text-pitch">(ERAE)</span>
            </>
          }
          intro="Tres dimensiones inseparables: la información debe permitir el examen técnico; el examen debe habilitar la contradicción; y la contradicción debe recibir una respuesta judicial fundada."
        />

        {/* Pillars */}
        <div className="grid gap-5 lg:grid-cols-3">
          {pillars.map((p, idx) => {
            const t = tone[p.color]
            const n = pillarDone(p.id, p.checks.length)
            const isOpen = openPillar === p.id
            const Icon = p.icon
            return (
              <article
                key={p.id}
                className={`card relative flex flex-col p-6 transition ${isOpen ? `${t.border} shadow-xl` : 'hover:border-slate-700'}`}
              >
                {idx < pillars.length - 1 && (
                  <ArrowRight
                    className="absolute -right-4 top-10 z-10 hidden h-6 w-6 rounded-full border border-slate-700 bg-night p-1 text-slate-500 lg:block"
                    aria-hidden
                  />
                )}
                <div className="flex items-start justify-between gap-3">
                  <span className={`grid h-12 w-12 place-items-center rounded-xl ${t.bg}`}>
                    <Icon className={`h-6 w-6 ${t.text}`} aria-hidden />
                  </span>
                  <span className={`font-mono text-sm font-bold ${t.text}`}>
                    {n}/{p.checks.length}
                  </span>
                </div>
                <p className="eyebrow mt-5 text-slate-500">Dimensión {idx + 1}</p>
                <h3 className="mt-1 font-serif text-2xl font-semibold text-white">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{p.summary}</p>

                <button
                  onClick={() => setOpenPillar(isOpen ? null : p.id)}
                  aria-expanded={isOpen}
                  className={`mt-5 inline-flex items-center gap-1.5 self-start text-sm font-semibold ${t.text}`}
                >
                  {isOpen ? 'Ocultar checklist' : 'Auditar con checklist'}
                  <ChevronDown className={`h-4 w-4 transition ${isOpen ? 'rotate-180' : ''}`} aria-hidden />
                </button>

                {isOpen && (
                  <div className="mt-4 animate-rise space-y-2">
                    {p.checks.map((c, i) => {
                      const key = `${p.id}-${i}`
                      const on = !!checked[key]
                      return (
                        <button
                          key={key}
                          role="checkbox"
                          aria-checked={on}
                          onClick={() => toggle(key)}
                          className={`flex w-full items-start gap-2.5 rounded-lg border px-3 py-2 text-left text-sm transition ${
                            on ? `${t.border} ${t.bg} text-white` : 'border-slate-800 text-slate-400 hover:border-slate-700'
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
                    <p className="pt-2 font-serif text-sm italic text-slate-300">{p.question}</p>
                  </div>
                )}

                <div className="mt-auto pt-6">
                  <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className={`h-full ${t.solid} transition-all duration-500`}
                      style={{ width: `${(n / p.checks.length) * 100}%` }}
                    />
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        <div
          className={`mt-6 flex flex-col items-start justify-between gap-4 rounded-2xl border p-5 sm:flex-row sm:items-center ${
            complete ? 'border-pitch/50 bg-pitch/10' : 'border-slate-800 bg-slate-850/50'
          }`}
          aria-live="polite"
        >
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">Estado de la revisión</p>
            <p className={`mt-1 font-semibold ${complete ? 'text-pitch' : 'text-slate-200'}`}>
              {complete
                ? 'Revisabilidad efectiva: el resultado puede valorarse como un elemento sometido a control.'
                : 'Revisabilidad incompleta: el puntaje no debería fundar una restricción de derechos.'}
            </p>
          </div>
          <span className={`font-mono text-2xl font-bold ${complete ? 'text-pitch' : 'text-var'}`}>
            {doneChecks}/{totalChecks}
          </span>
        </div>

        <figure className="mt-12 rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-850 to-night p-6 sm:p-8">
          <p className="eyebrow flex items-center gap-2 text-var">
            <ScrollText className="h-4 w-4" aria-hidden /> Propuesta normativa
          </p>
          <blockquote className="mt-4 font-serif text-lg leading-relaxed text-slate-100 sm:text-xl">
            <strong className="text-white">Principio de revisión algorítmica procesal.</strong> La utilización de
            herramientas de inteligencia artificial en el proceso penal requiere transparencia técnica y plena facultad de
            contradicción sobre los datos y la metodología empleada. La decisión judicial no podrá delegarse en
            predicciones automatizadas ni privar de derechos si no median condiciones de auditabilidad efectiva y
            fundamentación humana independiente.
          </blockquote>
        </figure>

        {/* Jurisprudence & norms */}
        <div className="mt-20">
          <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow text-pitch">Marco jurídico</p>
              <h3 className="mt-2 font-serif text-3xl font-semibold text-white">Jurisprudencia y normativa comparada</h3>
            </div>
            <div role="tablist" className="grid grid-cols-2 gap-1 rounded-xl border border-slate-800 bg-slate-850/70 p-1">
              {(
                [
                  ['juris', 'Jurisprudencia', Globe2],
                  ['norma', 'Normativa argentina', BookOpen],
                ] as const
              ).map(([id, label, Icon]) => (
                <button
                  key={id}
                  role="tab"
                  aria-selected={tab === id}
                  onClick={() => setTab(id)}
                  className={`inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition ${
                    tab === id ? 'bg-pitch text-night' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Icon className="h-4 w-4" aria-hidden /> {label}
                </button>
              ))}
            </div>
          </div>

          {tab === 'juris' ? (
            <div className="grid gap-5 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
              <ul className="space-y-2" role="listbox" aria-label="Precedentes">
                {precedents.map((p) => (
                  <li key={p.id}>
                    <button
                      role="option"
                      aria-selected={p.id === caseId}
                      onClick={() => setCaseId(p.id)}
                      className={`flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left transition ${
                        p.id === caseId
                          ? 'border-pitch/50 bg-pitch/10'
                          : 'border-slate-800 bg-slate-850/50 hover:border-slate-700'
                      }`}
                    >
                      <span>
                        <span className={`block font-serif text-base font-semibold italic ${p.id === caseId ? 'text-white' : 'text-slate-200'}`}>
                          {p.name}
                        </span>
                        <span className="block text-xs text-slate-500">{p.court}</span>
                      </span>
                      <span className="shrink-0 rounded-md bg-night px-2 py-1 font-mono text-xs font-semibold text-var">
                        {p.year}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>

              <article key={selected.id} className="card h-fit animate-rise p-6 sm:p-8 lg:sticky lg:top-24">
                <p className="eyebrow text-var">{selected.topic}</p>
                <h4 className="mt-3 font-serif text-3xl font-semibold italic text-white">{selected.name}</h4>
                <p className="mt-2 text-sm text-slate-400">
                  {selected.court} · <span className="font-mono text-slate-300">{selected.citation}</span>
                </p>
                <p className="mt-6 leading-relaxed text-slate-300">{selected.summary}</p>
                <div className="mt-6 rounded-xl border border-pitch/30 bg-pitch/5 p-4">
                  <p className="mb-1 flex items-center gap-2 text-sm font-semibold text-pitch">
                    <Gavel className="h-4 w-4" aria-hidden /> Aporte al ERAE
                  </p>
                  <p className="text-sm leading-relaxed text-slate-300">{selected.takeaway}</p>
                </div>
              </article>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {norms.map((n) => (
                <article key={n.id} className="card animate-rise p-5">
                  <p className="font-mono text-xs uppercase tracking-wider text-slate-500">{n.scope}</p>
                  <h4 className="mt-2 font-serif text-xl font-semibold text-white">{n.name}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{n.detail}</p>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
