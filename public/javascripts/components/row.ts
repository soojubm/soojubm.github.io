import { makeStyleSheet } from './utils'

class Row extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })

    const container = document.createElement('div')
    container.classList.add('row')
    container.role = 'group'

    // const align = 'vertical' || 'horizontal'
    const direction = this.getAttribute('direction')
    container.dataset.direction = direction || ''

    container.dataset.temp = this.temp || ''
    // if (this.variant) container.setAttribute('data-variant', this.variant)

    shadow.appendChild(container)
    container.append(...this.childNodes, makeStyleSheet('row'))
  }

  get temp() {
    return this.getAttribute('temp')
  }

  connectedCallback() {}
  disconnectedCallback() {}
}

export default Row
