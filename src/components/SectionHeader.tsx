import type { ReactNode } from 'react'

type Props = {
  title: ReactNode
  intro?: ReactNode
}

export default function SectionHeader({ title, intro }: Props) {
  return (
    <header className="mx-auto mb-12 max-w-3xl text-center">
      <h2 className="section-title">{title}</h2>
      {intro && <p className="mt-5 text-base leading-relaxed text-slate-400 sm:text-lg">{intro}</p>}
    </header>
  )
}
