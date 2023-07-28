import { makeStyleSheet } from './utils'

class Separator extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })

    const container = document.createElement('hr')
    container.role = 'separator'
    container.classList.add('separator')

    shadow.appendChild(container)
    shadow.appendChild(makeStyleSheet('separator'))
  }

  connectedCallback() {}
  disconnectedCallback() {}
}

export default Separator
