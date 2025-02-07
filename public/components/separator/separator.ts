import { makeStyleSheet } from '../../javascripts/components/utils'

class Separator extends HTMLElement {
  constructor() {
    super()
  }
  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' })

    // ! hr 태그는 innerText 안 됨.
    const container = document.createElement('hr')
    container.role = 'separator'
    container.dataset.spacing = this.spacing || ''

    const textSlot = document.createElement('slot')
    textSlot.name = 'text'

    shadow.append(container)
    shadow.append(makeStyleSheet('separator'))
    container.append(textSlot)
  }

  disconnectedCallback() {}

  get spacing() {
    return this.getAttribute('spacing')
  }
}

export default Separator
