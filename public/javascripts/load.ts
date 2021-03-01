export const initializeLoader = () => {
  document.addEventListener('DOMContentLoaded', lockBodyElement)
  window.addEventListener('load', unlockBodyElement)

  // todo 모듈로
  function lockBodyElement() {
    document.body.classList.add('body-lock')
  }
  function unlockBodyElement() {
    const loaderElement = document.querySelector<HTMLElement>('.js-loader')
    if (!loaderElement) return

    document.body.classList.remove('body-lock')
    loaderElement.hidden = true
  }
}

export const detectBrowser = () => {
  const BrowserElement = document.querySelector<HTMLElement>('.js-browser')
  if (!BrowserElement) return

  const userAgent = navigator.userAgent.toLowerCase()
  const isIEBrowser = userAgent.indexOf('msie') > -1 || userAgent.indexOf('trident') > -1
  // const isChromeBrowser = userAgent.indexOf('chrome') !== -1
  // const isMacBrowser = /Mac|iPod|iPhone|iPad/.test(navigator.platform);

  BrowserElement.hidden = !isIEBrowser
  // todo return browser
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

export const adjustTopPadding = () => {
  const headerElement = document.querySelector<HTMLElement>('.js-navbar')
  if (!headerElement) return

  const fn = () => setBodyMarginTop(headerElement)
  setBodyMarginTop(headerElement)
  window.addEventListener('scroll', () => requestAnimationFrame(fn))
  window.addEventListener('resize', () => requestAnimationFrame(fn))

  function setBodyMarginTop(headerElement) {
    const { body }: any = document
    const isFixedHeader = getComputedStyle(headerElement).position === 'fixed'

    body.style.marginTop = isFixedHeader ? `${headerElement.clientHeight}px` : 0
  }
}
