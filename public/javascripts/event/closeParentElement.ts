type Parameter = {
  selector: string
}

const closeParentElement = ({ selector: targetElement }: Parameter) => {
  const closeElements = document.querySelectorAll<HTMLElement>(targetElement)
  if (closeElements.length === 0) return

  closeElements.forEach(element =>
    element.addEventListener('click', () => {
      (<HTMLElement>element.parentNode).hidden = true
        // isHidden = HTMLElement.hidden
    })
  )
}

export default closeParentElement
