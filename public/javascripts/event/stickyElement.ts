// 스티키전의옵셋기억해주기
// passed와 바로. header / post-head
// 언제 cancel

import { throttle } from '../utils/interfaceUtils' 

const stickyElement = ({ targetElement, addClass, position }) => {
  const stickyElement = document.querySelector(targetElement)
  if (!stickyElement) return

  let elementHeight = stickyElement.offsetHeight

  window.addEventListener('scroll', throttle(hasScrolled), false)

  function hasScrolled() {
    const elementOffsetTop = stickyElement.offsetTop
    const elementOffsetBottom = stickyElement.offsetTop + elementHeight
    const isStuck = window.pageYOffset > (position === 'top' ? elementOffsetTop : elementOffsetBottom)
    if (isStuck) {
      document.body.classList.add(addClass)
      // document.body.style.paddingTop = `${elementHeight}px`
    } else {
      document.body.classList.remove(addClass)
    }
    // lastScrollTop = window.pageYOffset;
  }
}

export default stickyElement
