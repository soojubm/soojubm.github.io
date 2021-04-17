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