import { throttle } from '../utils/optimizationUtils'
import { getWindowScrollTop, getElementOffsetTop } from '../utils/elementUtils'

const parallax = targetElement => {
  console.log('parallax', targetElement)
  const elements = document.querySelectorAll(targetElement)
  if (!elements) return

  window.addEventListener('scroll', event)

  function event() {
    elements.forEach(element => {
      let rate = getWindowScrollTop() + window.innerHeight - getElementOffsetTop(element)
      let isLimit = rate * 0.002 >= 1.5

      if (isLimit) return

      element.style.transform = `scale(${rate * 0.0015})`
    })
  }
}

export default parallax

// let aaa = (window.pageYOffset - element.offsetTop) * -1.5 // scrolled = window.pageYOffset
//let bbb = aaa > 0 ? -aaa : aaa;
// element.style.backgroundPosition = 'center ' + aaa + 'px'
// element.style.transform = 'translate3d(0px, '+rate+'px, 0px)';
// DataTransferItemList.rate
