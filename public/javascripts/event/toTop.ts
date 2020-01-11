type Parameter = {
  selector: string
}

const toTop = ({ selector: target }: Parameter) => {
  const toTopElement = document.querySelector<HTMLFormElement>(target)
  if (!toTopElement) return

  toTopElement.addEventListener('click', event => {
    event.preventDefault()
    window.scrollTo(0, 0)

    window.location.hash = toTopElement.name || toTopElement.href
  })
}

export default toTop
