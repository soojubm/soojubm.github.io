type Parameter = {
  selector: string
}

const enterTarget = ({ selector: target }: Parameter) => {
  const { body } = document
  const hoverElements = document.querySelectorAll(target)
  if (!hoverElements) return

  hoverElements.forEach(element => {
    const isNavigation = element === document.querySelector('.navigation li')

    element.addEventListener('mouseenter', () => {
      enterEvent()
      element.addEventListener('mouseleave', () => leaveEvent())
    })

    function enterEvent() {
      element.setAttribute('aria-expanded', 'true')
      element.classList.add('is-expanded')
      isNavigation && body.classList.add('is-shown')
    }
    function leaveEvent() {
      element.setAttribute('aria-expanded', 'false')
      element.classList.remove('is-expanded')
      isNavigation && body.classList.remove('is-shown')
    }
  })
}

export default enterTarget
