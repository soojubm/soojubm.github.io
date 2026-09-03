import { ANIMATED_CLASSNAME } from '@/constants'

function throttle(callback: () => void) {
  let timer: number | undefined

  return function () {
    if (timer) window.cancelAnimationFrame(timer)
    timer = window.requestAnimationFrame(() => callback())
  }
}

export function stopAnimation() {
  let resizeTimer: ReturnType<typeof setTimeout> | undefined

  window.addEventListener(
    'resize',
    throttle(() => {
      document.body.classList.add('resize-animation-stopper')
      if (resizeTimer) clearTimeout(resizeTimer)

      resizeTimer = setTimeout(() => {
        document.body.classList.remove('resize-animation-stopper')
      }, 400)
    }),
  )
}

export const scrollAnimation = ({ selector }: { selector: string }) => {
  if (!('IntersectionObserver' in window)) return

  const callback = (entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return

      entry.target.classList.toggle(ANIMATED_CLASSNAME, entry.isIntersecting)
    })
  }
  const options: IntersectionObserverInit = {
    root: null,
    rootMargin: '-100px 0px',
    threshold: [0],
  }

  const observer = new IntersectionObserver(callback, options)

  const targets = Array.from(document.querySelectorAll(selector))
  targets.forEach(target => observer.observe(target))
}
