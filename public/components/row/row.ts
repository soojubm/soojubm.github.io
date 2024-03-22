import { makeStyleSheet } from '../../javascripts/components/utils'

class Row extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })

    const container = document.createElement('div')
    container.classList.add('row')

    shadow.appendChild(container)
    container.append(...this.childNodes, makeStyleSheet('row'))
  }

  get gap() {
    return this.getAttribute('gap')
  }

  get justifyContent() {
    return this.getAttribute('justifyContent')
  }

  connectedCallback() {}
  disconnectedCallback() {}
}

export default Row
