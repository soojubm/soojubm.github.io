import { makeStyleSheet } from './utils'

class RadioGroup extends HTMLElement {
  constructor() {
    super()

    const shadow = this.attachShadow({ mode: 'open' })
    const container = document.createElement('div')

    container.classList.add('radio-group')
    container.setAttribute('role', 'group')

    shadow.appendChild(container)
    container.append(...this.childNodes, makeStyleSheet('radio'))
  }

  connectedCallback() {}
  disconnectedCallback() {}
}

export default RadioGroup
