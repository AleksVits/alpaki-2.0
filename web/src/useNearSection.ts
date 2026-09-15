import { useEffect, useState } from 'react'

export function useNearSection(id: string) {
  const [near, setNear] = useState(false)
  useEffect(() => {
    const section = document.getElementById(id)
    if (!section) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setNear(true)
        observer.disconnect()
      }
    }, { root: document.querySelector('.site'), rootMargin: '100% 0px' })
    observer.observe(section)
    return () => observer.disconnect()
  }, [id])
  return near
}
