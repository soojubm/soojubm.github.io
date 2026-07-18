const ANIMATED_CLASSNAME = 'is-observed'

const scrollAnimation = ({ selector: selector }) => {
  if (!('IntersectionObserver' in window)) return

  let callback = (entries: IntersectionObserverEntry[], observer) => {
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

  let observer = new IntersectionObserver(callback, options)

  const targets = Array.from(document.querySelectorAll(selector))
  targets.forEach(target => observer.observe(target))
}

export default scrollAnimation
