export const loader = () => {
  const loaderElement = document.querySelector('.js-loading')
  if (!loaderElement) return
  
  const { body } = document

  window.addEventListener('load', () => {
    setTimeout(() => {
      loaderElement.classList.add('is-hidden')
      body.classList.remove('body-lock')
    }, 0)
  })
  document.addEventListener('DOMContentLoaded', () => {
    body.classList.add('body-lock')
  })
}

export const checkBrowser = () => {
  const BrowserElement = document.querySelector<HTMLElement>('.js-browser')
  if (!BrowserElement) return

  const userAgent = navigator.userAgent.toLowerCase()

  if (userAgent.indexOf('msie') > -1 || userAgent.indexOf('trident') > -1) {
    BrowserElement.style.display = 'block'
    console.log(userAgent)
  } else if (userAgent.indexOf('chrome') !== -1) {
    console.log(userAgent, '크롬')
  }
}

export const googleAnalytics = () => {
  // <script async src="https://www.googletagmanager.com/gtag/js?id=UA-83531239-1"></script>
  // window.dataLayer = window.dataLayer || [];
  // function gtag(){dataLayer.push(arguments);}
  // gtag('js', new Date());
  // gtag('config', 'UA-83531239-1');
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
}

function setBodyMarginTop(headerElement) {
  const { body }: any = document
  const isFixedHeader = getComputedStyle(headerElement).position === 'fixed'

  if (isFixedHeader) {
    body.style.marginTop = `${headerElement.clientHeight}px`
    return
  }
  body.style.marginTop = 0
}
