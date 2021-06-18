import { throttle } from '../utils/optimizationUtils'

type Parameter = {
  menusSelector: string
  sectionsSelector: string
}

const scrollspy = ({ menusSelector: menusClass, sectionsSelector: sectionsClass }: Parameter) => {
  const sections = document.querySelectorAll<HTMLElement>(sectionsClass)
  const menus = document.querySelectorAll<HTMLElement>(menusClass)
  const buttonContainer = menus[0].parentNode as any

  if (!sections || !menus) return

  menus.forEach((element, index) => {
    element.addEventListener('click', event => {
      event.preventDefault()
      // const href = element.getAttribute('href')
      // const targetOffsetY = document.querySelector(href).getBoundingClientRect().top
      const targetOffsetY = sections[index].offsetTop
      window.scrollTo(0, targetOffsetY)
    })
  })
  window.addEventListener('scroll', throttle(temp), false)

  function temp() {
    let activeOffsetLeft

    // buttonContainer.scrollLeft = -activeOffsetLeft

    sections.forEach((section, index) => {
      if (section.offsetTop <= window.pageYOffset + 200) {
        menus.forEach(menu => menu.classList.remove('is-active'))
        menus[index].classList.add('is-active')

        activeOffsetLeft = menus[index].offsetLeft
      }
    })

    // buttonContainer.scrollLeft = activeOffsetLeft
    buttonContainer.scroll({
      left: activeOffsetLeft,
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
