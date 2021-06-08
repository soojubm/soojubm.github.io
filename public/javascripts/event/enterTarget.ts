type Parameter = {
  selector: string
}

// throttle 필요할 듯?

const enterTarget = ({ selector: targetElement }: Parameter) => {
  const hoverElements = document.querySelectorAll<HTMLElement>(targetElement)
  const ACTIVE_CLASSNAME = 'is-shown'

  hoverElements?.forEach(element => {
    // const isNavigation = element.classList.contains('navbar-menu-item')

    element.addEventListener('mouseenter', () => enterEvent(element))
    element.addEventListener('mouseleave', () => leaveEvent(element))
  })

  function enterEvent(element) {
    element.setAttribute('aria-expanded', 'true')
    document.body.classList.add(ACTIVE_CLASSNAME)

    element.removeEventListener('mouseenter', () => enterEvent(element))
  }
  function leaveEvent(element) {
    element.setAttribute('aria-expanded', 'false')
    document.body.classList.remove(ACTIVE_CLASSNAME)

    element.removeEventListener('mouseleave', () => leaveEvent(element))
  }
}

export default enterTarget
