import { makeStyleSheet } from './utils'

class Row extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })

    const container = document.createElement('div')
    container.classList.add('row')
    container.role = 'group'

    const direction = this.getAttribute('direction')
    container.dataset.direction = direction || ''

    // if (this.variant) container.setAttribute('data-variant', this.variant)

    shadow.appendChild(container)
    container.append(...this.childNodes, makeStyleSheet('row'))
  }

  // set content(value) {
  //   return (container = value)
  // }

  connectedCallback() {}
  disconnectedCallback() {}
}

export default Row
