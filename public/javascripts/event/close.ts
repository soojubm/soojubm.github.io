type Parameter = {
  selector: string
}

const close = ({ selector: target }: Parameter) => {
  const closeElements = document.querySelectorAll<HTMLFormElement>(target)
  if (!closeElements) return

  closeElements.forEach(element =>
    element.addEventListener('click', () => {
      (<HTMLElement>element.parentNode).hidden = true
      // isHidden = HTMLElement.hidden
    })
  )
}

export default close
