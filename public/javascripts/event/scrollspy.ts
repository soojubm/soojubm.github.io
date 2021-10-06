import { throttle } from '../utils/optimizationUtils'

type Parameter = {
  menusSelector: string
  sectionsSelector: string
}

const scrollspy = ({ menusSelector: menusClass, sectionsSelector: sectionsClass }: Parameter) => {
  const sections = document.querySelectorAll(sectionsClass) as NodeListOf<HTMLElement>
  const menus = document.querySelectorAll(menusClass) as NodeListOf<HTMLElement>

  if (!sections || !menus) return

  menus.forEach((element, index) => {
    element.addEventListener('click', event => {
      event.preventDefault()

      const targetOffsetY = sections[index].offsetTop + sections[index].clientHeight / 1.5
      window.scrollTo(0, targetOffsetY)
      // const targetOffsetY = document.querySelector(element.getAttribute('href')).getBoundingClientRect().top
    })
  })

  window.addEventListener('scroll', throttle(detectSection), false)

  function detectSection() {
    let activeOffsetLeft

    sections.forEach((section, index) => {
      const isObserved = section.offsetTop <= window.pageYOffset + sections[index].clientHeight / 1.5
      if (!isObserved) return

      const targetMenu = menus[index] as any
      if (!targetMenu) return

      menus.forEach(menu => menu.classList.remove('is-active'))
      targetMenu.classList.add('is-active')

      activeOffsetLeft = targetMenu.offsetLeft + targetMenu.clientWidth / 2
    })

    const buttonContainer = menus[0]?.parentElement as HTMLElement
    if (!buttonContainer) return
    // if(buttonContainer.scrollLeft < document.body.offsetWidth / 2) return
    buttonContainer.scroll({
      left: activeOffsetLeft - buttonContainer.offsetWidth / 2,
      top: 0,
      behavior: 'smooth',
    })
  }
}

export default scrollspy

// const absoluteTop = window.pageYOffset + element.getBoundingClientRect().top;
// function getAbsoluteTop(element) {
//   return window.pageYOffset + element.getBoundingClientRect().top;
// }
// ​
// const parentElement = element.parentElement;
// const parentAbsoluteTop = getAbsoluteTop(parentElement);
// const absoulteTop = getAbsoluteTop(element);
// ​
// const relativeTop = absoluteTop - parentAbsoluteTop;

// 출처: https://mommoo.tistory.com/85 [개발자로 홀로 서기]
