type Parameter = {
  selector: string
}

const toggleClass = ({ selector: trigger }: Parameter) => ({
  init: function() {},
  triggers: document.querySelectorAll(trigger),
  ACTIVE_CLASS: 'is-active',
  ACTIVE_CLASS2: 'is-visible',
  setEvent: function() {
    if (!this.triggers) return

    this.triggers.forEach(element =>
      element.addEventListener('click', event => {
        event.preventDefault()
        event.stopPropagation()

        const triggerNextElement = element?.nextElementSibling as HTMLElement
        if (!triggerNextElement) return

        this.toggleClassTrigger(element)
        this.toggleClassTarget(triggerNextElement)
  
        this.triggers.forEach(element => {
          if (event.target === element) return
          this.removeAllClass(element)
        })
      }),
    )
    document.body.addEventListener('click', () => this.triggers.forEach(trigger => this.removeAllClass(trigger)))

  },
  toggleClassTrigger: function(element) {
    element.classList.toggle(this.ACTIVE_CLASS)
    element.setAttribute('aria-expanded', `${element.classList.contains(this.ACTIVE_CLASS)}`)
  },
  toggleClassTarget: function(element) {
    element.classList.toggle(this.ACTIVE_CLASS2)
    element.addEventListener('click', event => event.stopPropagation())
  },
  removeAllClass: function(element) {
    element.setAttribute('aria-expanded', 'true')
    element.classList.remove(this.ACTIVE_CLASS)
    element.nextElementSibling.classList.remove(this.ACTIVE_CLASS2)
  }
})

export default toggleClass
