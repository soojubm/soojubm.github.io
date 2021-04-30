// 스티키전의옵셋기억해주기
// passed와 바로. header / post-head
// 언제 cancel

import { throttle } from '../utils/optimizationUtils'

type Props = {
  targetElement: string
  addClass: string
  position: string
}

const stickyElement = ({ targetElement, addClass, position }) => {
  const stickyElement = document.querySelector(targetElement)
  if (!stickyElement) return

  let previousScrollTop = 0;

  window.addEventListener('scroll', throttle(handleElementScroll), false)

  // todo 회준
  // todo resize
  // window.addEventListener('resize', throttle())

  // function getResizedSizes() {
  //   return 
  // }
  function handleElementScroll() {
    const { offsetTop, offsetHeight } = stickyElement
    const offsetBottom = offsetTop + offsetHeight

    previousScrollTop = position === 'top' ? offsetTop : offsetBottom
    let currentScrollPostion = window.scrollY || window.pageYOffset
    const isStuck = currentScrollPostion > previousScrollTop
    
    document.body.classList.toggle(addClass, isStuck)
    // document.body.style.paddingTop = `${elementHeight}px`
    // lastScrollTop = window.pageYOffset;
  }
}

export default stickyElement
