import type { ReactNode } from 'react'

type Props = {
  eyebrow: string
  title: ReactNode
  intro?: ReactNode
  accent?: 'pitch' | 'var' | 'alert'
}

const accentClass = {
  pitch: 'text-pitch',
  var: 'text-var',
  alert: 'text-alert',
}

export default function SectionHeader({ eyebrow, title, intro, accent = 'pitch' }: Props) {
  return (
    <header className="mx-auto mb-12 max-w-3xl text-center">
      <p className={`eyebrow mb-4 ${accentClass[accent]}`}>{eyebrow}</p>
      <h2 className="section-title">{title}</h2>
      {intro && <p className="mt-5 text-base leading-relaxed text-slate-400 sm:text-lg">{intro}</p>}
    </header>
  )
}
