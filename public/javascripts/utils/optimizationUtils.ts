export function throttle(callback) {
  let timer: number | undefined

  return function() {
    if(timer) window.cancelAnimationFrame(timer)
    timer = window.requestAnimationFrame(() => callback())
  }
}