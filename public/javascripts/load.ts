export const loader = () => {
  // todo initalizeLoader dom load
  const loaderElement = document.querySelector('.js-loader')
  if (!loaderElement) return

  const { body } = document

  document.addEventListener('DOMContentLoaded', () => {
    body.classList.add('body-lock')
  })
  window.addEventListener('load', () => {
    body.classList.remove('body-lock')
    loaderElement.classList.add('is-hidden')
  })
}

export const detectBrowser = () => {
  const BrowserElement = document.querySelector<HTMLElement>('.js-browser')
  if (!BrowserElement) return

  const userAgent = navigator.userAgent.toLowerCase()
  const isIEBrowser = userAgent.indexOf('msie') > -1 || userAgent.indexOf('trident') > -1
  const isChromeBrowser = userAgent.indexOf('chrome') !== -1
  // const isMacBrowser = /Mac|iPod|iPhone|iPad/.test(navigator.platform);

  if (isIEBrowser) {
    BrowserElement.style.display = 'block'
  } else if (isChromeBrowser) {
  }
  console.log('userAgent: ', userAgent)
  // todo return browser
}

const download = () => {
  // <a href="/path/to/file" download>Download</a>
  // Create a new link
  const link = document.createElement('a')
  link.download = 'file name'
  link.href = '/path/to/file'

  // Append to the document
  document.body.appendChild(link)

  // Trigger the click event
  link.click()

  // Remove the element
  document.body.removeChild(link)

  //
  // const data = JSON.stringify({ 'message': 'Hello Word' });
  // const blob = new Blob([data], { type: 'application/json' });
  // // Create new URL
  // const url = window.URL.createObjectURL(blob);
  // // Create a link and trigger the download
  // ...
  // // Free the URL created above
  // window.URL.revokeObjectURL(url);
}

export const adjustTopPadding = () => {
  const headerElement = document.querySelector('.js-navbar')
  if (!headerElement) return

  const fn = () => setBodyMarginTop(headerElement)
  setBodyMarginTop(headerElement)
  window.addEventListener('scroll', () => requestAnimationFrame(fn))
  window.addEventListener('resize', () => requestAnimationFrame(fn))
  // 스코프
  // 함수는 인자를 받는 것이 좋다...
  // 인풋이 있고 리턴이 있다...
  function setBodyMarginTop(headerElement) {
    const { body }: any = document
    const isFixedHeader = getComputedStyle(headerElement).position === 'fixed'

    body.style.marginTop = isFixedHeader ? `${headerElement.clientHeight}px` : 0
  }
}
