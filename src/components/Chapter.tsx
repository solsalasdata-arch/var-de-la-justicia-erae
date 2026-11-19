import { useId, useState, type ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'

type Props = {
  title: string
  meta: string
  defaultOpen?: boolean
  children: ReactNode
}

export default function Chapter({ title, meta, defaultOpen = false, children }: Props) {
  const [open, setOpen] = useState(defaultOpen)
  const id = useId()
  return (
    <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-850/70">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-slate-800/40 sm:px-6"
        >
          <span>
            <span className="font-tv block text-2xl font-bold uppercase tracking-wide text-white sm:text-3xl">{title}</span>
            <span className="block text-sm text-slate-400">{meta}</span>
          </span>
          <ChevronDown
            className={`h-6 w-6 shrink-0 text-var transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
            aria-hidden
          />
        </button>
      </h3>
      <div id={id} hidden={!open} className="border-t border-slate-800 p-5 sm:p-6">
        {children}
      </div>
    </div>
  )
}
