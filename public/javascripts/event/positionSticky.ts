// 스티키전의옵셋기억해주기
// passed와 바로. header / post-head
// 언제 cancel
import { throttle } from '../utils/optimizationUtils'
import { getWindowScrollTop, getElementOffsetTop } from '../utils/elementUtils'

type Parameters = {
  selector: string
  addClass: string
  isPassed: boolean
}
// todo renaming isPassed
// todo 라우팅 되었을 때 다시. 아니면 null 일 때도 실행이 디ㅗㅁ.

const positionSticky = ({ selector, addClass, isPassed }: Parameters) => {
  const element = document.querySelector<HTMLElement>(selector)
  if (!element) return

  const elementHeight = element.offsetHeight
  let offsetTop = getElementOffsetTop(element)
  const offsetBottom = offsetTop + elementHeight

  let previousScrollTop = isPassed ? offsetBottom : offsetTop

  window.addEventListener('scroll', throttle(handleElementScroll), false)
  window.addEventListener('resize', throttle(setElementOffsetTop), false)

  function setElementOffsetTop() {
    offsetTop = getElementOffsetTop(element)
  }

  function handleElementScroll() {
    let currentScrollTop = getWindowScrollTop()
    // >= 두두두두 flick
    const isStuck = currentScrollTop + 56 > previousScrollTop

    document.body.classList.toggle(addClass, isStuck)
    document.body.style.paddingTop = isStuck ? `${elementHeight}px` : '0'

    //  todo 일단.. 빠르ㅔㄱ..
    // navbar.....height...
    if (selector === '.hero') document.body.style.paddingTop = '0'
  }

  // window.addEventListener('resize', throttle())
}

export default positionSticky