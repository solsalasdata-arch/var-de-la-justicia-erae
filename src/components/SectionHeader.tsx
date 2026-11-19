import type { ReactNode } from 'react'

type Props = {
  chapter: string
  tone?: 'pitch' | 'var' | 'alert'
  title: ReactNode
  intro?: ReactNode
}

const toneClass = {
  pitch: 'bg-pitch text-night',
  var: 'bg-var text-night',
  alert: 'bg-alert text-white',
}

export default function SectionHeader({ chapter, tone = 'pitch', title, intro }: Props) {
  return (
    <header className="mb-10 max-w-3xl">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
        <span className={`font-tv rounded-sm px-3 py-1 text-lg font-extrabold uppercase leading-none tracking-wide ${toneClass[tone]}`}>
          {chapter}
        </span>
        <h2 className="section-title">{title}</h2>
      </div>
      {intro && <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">{intro}</p>}
    </header>
  )
}
