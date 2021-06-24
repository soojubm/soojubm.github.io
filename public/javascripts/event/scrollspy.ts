import { throttle } from '../utils/optimizationUtils'

type Parameter = {
  menusSelector: string
  sectionsSelector: string
}

const scrollspy = ({ menusSelector: menusClass, sectionsSelector: sectionsClass }: Parameter) => {
  const sections = document.querySelectorAll(sectionsClass) as NodeListOf<HTMLElement>
  const menus = document.querySelectorAll(menusClass) as NodeListOf<HTMLElement>

  if (!sections || !menus) return

  console.log(menus[0].parentNode?.childNodes, menus)

  const buttonContainer = menus[0].parentNode as HTMLElement

  menus.forEach((element, index) => {
    element.addEventListener('click', event => {
      event.preventDefault()
      // const href = element.getAttribute('href')
      // const targetOffsetY = document.querySelector(href).getBoundingClientRect().top
      const targetOffsetY = sections[index].offsetTop - 100
      window.scrollTo(0, targetOffsetY)
    })
  })
  window.addEventListener('scroll', throttle(temp), false)

  function temp() {
    let activeOffsetLeft

    sections.forEach((section, index) => {
      const isObserved = section.offsetTop <= window.pageYOffset + 200
      if (!isObserved) return

      const menusTemp = menus[index] as any

      if (!menusTemp) return

      menus.forEach(menu => menu.classList.remove('is-active'))
      menusTemp.classList.add('is-active')

      activeOffsetLeft = menusTemp.offsetLeft + menusTemp.clientWidth / 2
    })
    // buttonContainer.scrollLeft = activeOffsetLeft

    console.log(activeOffsetLeft)

    const buttonContainerWidth = buttonContainer.offsetWidth
    // if(buttonContainer.scrollLeft < document.body.offsetWidth / 2) return
    buttonContainer.scroll({
      left: activeOffsetLeft - buttonContainerWidth / 2,
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
