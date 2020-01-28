type Parameter = {
  selector: string
}

// selector
const toggleClass = ({ selector: trigger }: Parameter) => {
  const triggers = document.querySelectorAll(trigger)
  if (!triggers) return

  triggers.forEach(element =>
    element.addEventListener('click', event => {
      event.stopPropagation()

      toggleClassTrigger(element)
      


      const triggerNextElement = element?.nextElementSibling as HTMLElement
      if (!triggerNextElement) return
      toggleClassTarget(triggerNextElement)

      triggers.forEach(element => {
        if (event.target === element) return
        removeAllClass(element)
      })
    }),
  )

  document.body.addEventListener('click', () => triggers.forEach(trigger => removeAllClass(trigger)))
}

const toggleClassTrigger = element => {
  element.classList.toggle('is-active')
  element.setAttribute('aria-expanded', `${element.classList.contains('is-active')}`)
}

const toggleClassTarget = element => {
  element.classList.toggle('is-visible')
  element.addEventListener('click', event => event.stopPropagation())
}

const removeAllClass = element => {
  element.setAttribute('aria-expanded', 'true')
  element.classList.remove('is-active')

  element.nextElementSibling.classList.remove('is-visible')
}

export default toggleClass
