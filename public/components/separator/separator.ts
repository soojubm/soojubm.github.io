import { makeStyleSheet } from '../../javascripts/components/utils'

class Separator extends HTMLElement {
  constructor() {
    super()
  }
  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' })

    // ! hr 태그는 innerText 안 됨.
    const container = document.createElement('div')
    container.role = 'separator'
    container.classList.add('separator')

    const textSlot = document.createElement('slot')
    textSlot.name = 'text'

    shadow.append(container, makeStyleSheet('separator'))
    container.appendChild(textSlot)
  }
  disconnectedCallback() {}
}

export default Separator
