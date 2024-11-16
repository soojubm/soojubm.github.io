import { throttle } from '../utils/optimizationUtils'

type Parameter = {
  menusSelector: string
  sectionsSelector: string
}

const scrollspy = ({ menusSelector: menusClass, sectionsSelector: sectionsClass }: Parameter) => {
  const sections = document.querySelectorAll(sectionsClass) as NodeListOf<HTMLElement>
  const menus = document.querySelectorAll(menusClass) as NodeListOf<HTMLElement>

  if (!sections || !menus) return

  menus.forEach((item, index) => {
    item.addEventListener('click', event => {
      event.preventDefault()

      const targetOffsetY = sections[index].offsetTop - 32 * 2
      // const targetOffsetY = sections[index].offsetTop + sections[index].clientHeight
      window.scrollTo(0, targetOffsetY)
      // const targetOffsetY = document.querySelector(element.getAttribute('href')).getBoundingClientRect().top
    })
  })

  window.addEventListener('scroll', throttle(detectSection), false)

  function activeItem(item) {
    item.classList.add('is-active')
    item.setAttribute('aria-selected', 'true')
  }

  function deactiveItem(item) {
    item.classList.remove('is-active')
    item.setAttribute('aria-selected', 'false')
  }

  function detectSection() {
    let activeOffsetLeft

    sections.forEach((section, index) => {
      // todo intersectionObser
      const isObserved = section.offsetTop <= window.pageYOffset + 100
      if (!isObserved) return

      const targetItem = menus[index] as any
      if (!targetItem) return

      menus.forEach(item => deactiveItem(item))
      activeItem(targetItem)

      activeOffsetLeft = targetItem.offsetLeft + targetItem.clientWidth / 2
    })

    const buttonContainer = menus[0]?.parentElement as HTMLElement
    // if(buttonContainer.scrollLeft < document.body.offsetWidth / 2) return
    buttonContainer?.scroll({
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
