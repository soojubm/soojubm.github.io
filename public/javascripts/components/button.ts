import { makeStyleSheet } from './utils'

class Button extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })

    const container = document.createElement('button')
    container.classList.add('button')
    container.dataset.variant = this.variant || ''
    container.dataset.size = this.size || ''
    container.dataset.status = this.status || ''

    container.textContent = this.textContent || this.label

    shadow.appendChild(container)
    shadow.appendChild(makeStyleSheet('button'))
  }

  get variant() {
    return this.getAttribute('variant')
  }
  // set variant(value) {
  //   if (value) this.setAttribute('data-variant', value)
  // }

  get size() {
    return this.getAttribute('size')
  }
  // set size(value) {
  //   if (value) this.setAttribute('data-size', value)
  // }

  get label() {
    return this.getAttribute('label')
  }

  get status() {
    return this.getAttribute('status')
  }

  connectedCallback() {}
  disconnectedCallback() {}
}

export default Button
