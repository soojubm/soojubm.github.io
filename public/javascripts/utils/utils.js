export function backHistory() {}

export const isScrollEnd = () => window.innerHeight + window.pageYOffset >= document.body.offsetHeight
export const isViewportSmall = () => window.matchMedia('(min-width:888px)').matches

function getCookie(name) {
  let value = `; ${document.cookie}`
  let parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop().split(';').shift()
}

const download = () => {
  // <a href="/path/to/file" download>Download</a>
  const link = document.createElement('a')
  link.download = 'file name'
  link.href = '/path/to/file'

  document.body.appendChild(link)
  link.click()

  document.body.removeChild(link)

  // const data = JSON.stringify({ 'message': 'Hello Word' });
  // const blob = new Blob([data], { type: 'application/json' });
  // // Create new URL
  // const url = window.URL.createObjectURL(blob);
  // // Create a link and trigger the download
  // ...
  // // Free the URL created above
  // window.URL.revokeObjectURL(url);
}

const siblings = [].slice.call(parent.children).filter(function (child) {
  return child !== ele
})

const debounce = (callback, delay) => {
  let timerId
  return event => {
    // delay가 경과하기 이전에 이벤트가 발생하면 이전 타이머를 취소하고 새로운 타이머를 재설정
    // delay보다 짧은 간격으로 이벤트가 발생하면 callback은 호출되지 않는다.
    if (timerId) clearTimeout(timerId)
    timerId = setTimeout(callback, delay, event)
  }
}

// ! scroll rAF
const throttle2 = (callback, delay) => {
  let timerId
  return event => {
    // delay가 경과하기 전에 이벤트가 발생하면 아무동작도 하지 않는다.
    // delay가 경과했을 때 이벤트가 발생하면서 새로운 타이머를 재설정한다.
    // 따라서 delay 간격으로 callback이 호출된다.
    if (timerId) return
    timerId = setTimeout(
      () => {
        callback(event)
        timerId = null
      },
      delay,
      event,
    )
  }
}
