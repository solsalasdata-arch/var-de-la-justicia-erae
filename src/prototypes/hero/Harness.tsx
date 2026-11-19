import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import Navbar from '../../components/Navbar'
import VariantTransmision from './VariantTransmision'
import VariantRevision from './VariantRevision'
import VariantMarcador from './VariantMarcador'

const variants = [
  { name: 'Transmisión', Component: VariantTransmision, position: 'top' },
  { name: 'Revisión VAR', Component: VariantRevision, position: undefined },
  { name: 'Marcador', Component: VariantMarcador, position: undefined },
]

function initialIndex() {
  const v = parseInt(new URLSearchParams(location.search).get('v') ?? '', 10)
  return v >= 1 && v <= variants.length ? v - 1 : 0
}

export default function Harness() {
  const [current, setCurrent] = useState(initialIndex)
  const [mountKey, setMountKey] = useState(0)
  const [ready, setReady] = useState(false)
  const items = useRef<(HTMLButtonElement | null)[]>([])
  const highlight = useRef<HTMLSpanElement>(null)

  const moveHighlight = useCallback(() => {
    const el = items.current[current]
    if (!el || !highlight.current) return
    highlight.current.style.width = `${el.offsetWidth}px`
    highlight.current.style.transform = `translateX(${el.offsetLeft}px)`
  }, [current])

  const select = useCallback((i: number) => {
    if (i < 0 || i >= variants.length) return
    setCurrent(i)
    setMountKey((k) => k + 1)
    const url = new URL(location.href)
    url.searchParams.set('v', String(i + 1))
    history.replaceState(null, '', url)
  }, [])

  const replay = useCallback(() => setMountKey((k) => k + 1), [])

  useLayoutEffect(moveHighlight, [moveHighlight])

  useEffect(() => {
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => setReady(true)))
    window.addEventListener('resize', moveHighlight)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', moveHighlight)
    }
  }, [moveHighlight])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement
      if (/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName) || t.isContentEditable) return
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const num = parseInt(e.key, 10)
      if (num >= 1 && num <= variants.length) select(num - 1)
      else if (e.key === 'ArrowRight') select((current + 1) % variants.length)
      else if (e.key === 'ArrowLeft') select((current - 1 + variants.length) % variants.length)
      else if (e.key === 'r' || e.key === 'R') replay()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [current, select, replay])

  const { Component, position } = variants[current]

  return (
    <>
      <Navbar />
      <main>
        <Component key={`${current}-${mountKey}`} />
      </main>
      <nav
        className="proto-picker"
        aria-label="Prototype variants"
        data-ready={ready ? '' : undefined}
        data-position={position}
      >
        <span ref={highlight} className="proto-picker-highlight" aria-hidden="true" />
        {variants.map((v, i) => (
          <button
            key={v.name}
            ref={(el) => {
              items.current[i] = el
            }}
            className="proto-picker-item"
            data-active={i === current ? '' : undefined}
            aria-current={i === current ? 'true' : undefined}
            onClick={() => select(i)}
          >
            {v.name}
          </button>
        ))}
        <span className="proto-picker-divider" aria-hidden="true" />
        <button className="proto-picker-item proto-picker-replay" aria-label="Replay animation (R)" onClick={replay}>
          ↻
        </button>
      </nav>
    </>
  )
}

