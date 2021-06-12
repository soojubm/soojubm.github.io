export function throttle(callback) {
  let timer: number | undefined

  return function() {
    if (timer) window.cancelAnimationFrame(timer)
    timer = window.requestAnimationFrame(() => callback())
  }
}

export function temp() {
  let resizeTimer
  window.addEventListener('resize', () => {
    document.body.classList.add('resize-animation-stopper')
    clearTimeout(resizeTimer)

    resizeTimer = setTimeout(() => {
      document.body.classList.remove('resize-animation-stopper')
    }, 400)
  })
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
