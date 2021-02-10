function smoothScroll(target, duration) {
  var target = document.querySelector(target)
  var targetPosition = target.getBoundingClientRect().top
  var startPosition = window.pageYOffset
  var distance = targetPosition - startPosition
  var startTime = null || 0

  function animation(currentTime) {
    if (!startTime) startTime = currentTime

    var timeElapsed = currentTime - startTime
    var run = easeInOutQuad(timeElapsed, startPosition, distance, duration)

    window.scrollTo(0, run)

    if (timeElapsed < duration) requestAnimationFrame(animation)
  }
  function easeInOutQuad(t, b, c, d) {
    t /= d / 2
    if (t < 1) return (c / 2) * t * t + b
    t--
    return (-c / 2) * (t * (t - 2) - 1) + b
  }

  requestAnimationFrame(animation)
}

function loadScript(src) {
  let script = document.querySelector('script')
  script.src = src
  script.async = false
  document.body.append(script)
}
