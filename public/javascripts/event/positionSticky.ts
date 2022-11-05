// passed와 바로. header / post-head
// todo removeEventListener
// todo 엘리먼트의 상단에서 또는 하단에서 sticky

import { throttle } from '../utils/optimizationUtils'
import { getWindowScrollTop, getElementOffsetTop } from '../utils/elementUtils'

type Parameters = {
  selector: string
  addClass: string
  isPassed: boolean
}

// ! targetElement, position, bodyclassName을 받는 게 맞음...

const positionSticky = ({ selector, addClass, isPassed }: Parameters) => {
  const element = document.querySelector<HTMLElement>(selector)
  if (!element) return

  let offsetTop = getElementOffsetTop(element)

  const elementHeight = element.offsetHeight
  const offsetBottom = offsetTop + elementHeight

  let previousScrollTop = isPassed ? offsetBottom : offsetTop

  window.addEventListener('scroll', throttle(handleElementScroll), false)
  window.addEventListener('resize', throttle(setElementOffsetTop), false)

  function setElementOffsetTop() {
    offsetTop = getElementOffsetTop(element)
  }

  function handleElementScroll() {
    let currentScrollTop = getWindowScrollTop()

    const isStuck = currentScrollTop + elementHeight > previousScrollTop

    document.body.classList.toggle(addClass, isStuck)
    document.body.style.paddingTop = isStuck ? `${elementHeight}px` : '0'

    // todo 일단.. 빠르ㅔㄱ.. navbar.....height...
    if (selector === '.hero') document.body.style.paddingTop = '0'
  }
}

export default positionSticky
