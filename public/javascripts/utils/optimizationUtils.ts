export function throttle(callback) {
  let timer: number | undefined

  return function() {
    if (timer) window.cancelAnimationFrame(timer)
    timer = window.requestAnimationFrame(() => callback())
  }
}

export function stopAnimation() {
  let resizeTimer

  window.addEventListener(
    'resize',
    throttle(() => {
      document.body.classList.add('resize-animation-stopper')
      clearTimeout(resizeTimer)

      resizeTimer = setTimeout(() => {
        document.body.classList.remove('resize-animation-stopper')
      }, 400)
    }),
  )
}

export function loadLazyImages() {
  // todo hero 영역 이미지들 안 됨.. 왜
  if (!('IntersectionObserver' in window)) return

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return

      const target = entry.target as any // todo

      target.src = target.dataset.src
      imageObserver.unobserve(target)
    })
  })

  const targets = document.querySelectorAll('[data-src]')
  targets.forEach(image => imageObserver.observe(image))
}

// let start = null
// const element = document.querySelector('.js-navbar')

// function step(timestamp) {
//   if (!start) start = timestamp
//   const progress = timestamp - start
//   element.style.marginLeft = Math.min(progress / 10, 200) + 'px'

//   if (progress >= 5000) return
//   window.requestAnimationFrame(step)
// }

// window.requestAnimationFrame(step)

// if (navigator.connection && navigator.connection.effectiveType) {
//   if (navigator.connection.effectiveType === '4g') {
//     // Load video
//   } else {
//     // Load image
//   }
// }
