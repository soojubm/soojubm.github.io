type Parameter = {
  menusSelector: string,
  sectionsSelector: string
}

const scrollspy = ({ menusSelector: menusClass, sectionsSelector: sectionsClass }: Parameter) => {
  const sections = document.querySelectorAll<HTMLFormElement>(menusClass)
  const menus = document.querySelectorAll<HTMLFormElement>(sectionsClass)
  if(!sections || !menus) return

  menus.forEach((element, index) => {
    element.addEventListener('click', event => {
      event.preventDefault()
      // const href = element.getAttribute('href')
      // const targetOffsetY = document.querySelector(href).getBoundingClientRect().top
      const targetOffsetY = sections[index].offsetTop
      window.scrollTo(0, targetOffsetY)
    })
  })
  window.addEventListener('scroll', () => {
    sections.forEach((section, index) => {
      if(section.offsetTop <= window.pageYOffset + 200) {
        menus.forEach(menu => menu.classList.remove('is-active'))
        menus[index].classList.add('is-active')
      }
    })
  })
}

export default scrollspy