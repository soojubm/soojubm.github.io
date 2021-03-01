type Parameter = {
  selector: string
}

const enterTarget = ({ selector: targetElement }: Parameter) => {
  const hoverElements = document.querySelectorAll<HTMLElement>(targetElement)

  hoverElements?.forEach(element => {
    element.addEventListener('mouseenter', () => enterEvent(element))
    element.addEventListener('mouseleave', () => leaveEvent(element))
  })

  function enterEvent(element) {
    const isNavigation = element.classList.contains('navbar-menu-item')

    element.setAttribute('aria-expanded', 'true')
    isNavigation && document.body.classList.add('is-shown')
  }
  function leaveEvent(element) {
    const isNavigation = element.classList.contains('navbar-menu-item')

    element.setAttribute('aria-expanded', 'false')
    isNavigation && document.body.classList.remove('is-shown')
  }
}

export default enterTarget
