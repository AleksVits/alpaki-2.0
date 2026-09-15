import { useEffect, useRef, useState } from 'react'
import { asset } from '../asset'

const frames = [1, 2, 3, 4].map((n) => asset(`about-sequence/${n}.webp`))

export function AboutSequence() {
  const ref = useRef<HTMLDivElement>(null)
  const [frame, setFrame] = useState(0)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const section = ref.current?.closest('.stage')
    if (!section) return
    let disposed = false
    let ready = false
    let visible = false
    let started = false
    let timers: number[] = []
    const clear = () => { timers.forEach(window.clearTimeout); timers = [] }
    const start = () => {
      if (!ready || !visible || started || disposed) return
      started = true
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setFrame(3)
        return
      }
      setFrame(0)
      setPlaying(true)
      timers = [1, 2, 3].map((n) => window.setTimeout(() => setFrame(n), n * 1600))
    }
    // Decode every frame first so a slow download cannot interrupt the sequence.
    Promise.all(frames.map((src) => {
      const img = new Image()
      img.src = src
      return img.decode()
    })).then(() => { ready = true; start() }).catch(() => {
      // Keep the initial frame if a later asset cannot be loaded.
    })
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) {
        visible = false
        started = false
        clear()
        setFrame(0)
        setPlaying(false)
      } else if (entry.intersectionRatio >= 0.25) {
        visible = true
        start()
      }
    }, { root: document.querySelector('.site'), threshold: [0, 0.25] })
    observer.observe(section)
    return () => { disposed = true; clear(); observer.disconnect() }
  }, [])

  return (
    <div ref={ref} className={`about-sequence${playing ? ' is-playing' : ''}`} data-frame={frame + 1} aria-hidden="true">
      {frames.map((src, i) => <img key={src} src={src} alt="" className={i <= frame ? 'is-active' : ''} />)}
    </div>
  )
}
