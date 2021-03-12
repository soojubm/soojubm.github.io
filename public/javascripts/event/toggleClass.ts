type Parameter = {
  selector: string
}

const toggleClass = ({ selector: trigger }: Parameter) => ({
  triggers: document.querySelectorAll(trigger),
  ACTIVE_CLASS: 'is-active',
  ACTIVE_CLASS2: 'is-visible',
  initialize() {
    if (!this.triggers) return

    this.triggers.forEach(element => element.addEventListener('click', event => {
      event.preventDefault()
      event.stopPropagation()

      this.toggle(element)
      // refector: for 5번 도는..
      // clickEventTarget이 아닌 
      this.triggers.forEach(element => {
        const isSelf = event.target === element
        if(!isSelf) this.remove(element)
      })
    }), false)
    document.body.addEventListener('click', () => this.triggers.forEach(trigger => this.remove(trigger)))
  },
  toggle(element) {
    const triggerNextElement = element?.nextElementSibling as HTMLElement
    if (!triggerNextElement) return

    element.classList.toggle(this.ACTIVE_CLASS)
    element.setAttribute('aria-expanded', `${element.classList.contains(this.ACTIVE_CLASS)}`)

    triggerNextElement.classList.toggle(this.ACTIVE_CLASS2)
    triggerNextElement.addEventListener('click', event => event.stopPropagation())
  },
  remove(element) {
    element.classList.remove(this.ACTIVE_CLASS)
    element.setAttribute('aria-expanded', 'true')
    element.nextElementSibling.classList.remove(this.ACTIVE_CLASS2)
  },
  clickOutbound() {}
})

export default toggleClass
