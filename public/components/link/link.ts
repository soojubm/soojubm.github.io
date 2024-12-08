import { makeStyleSheet } from '../../javascripts/components/utils'

class Link extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })

    const container = document.createElement('a')
    container.classList.add('link')
    container.href = this.href || ''
    container.target = this.target || '_blank'
    container.dataset.variant = this.variant || 'primary'

    shadow.appendChild(container)
    container.append(...this.childNodes, makeStyleSheet('link'))
  }

  get href() {
    return this.getAttribute('href')
  }
  get target() {
    return this.getAttribute('target')
  }
  get variant() {
    return this.getAttribute('variant')
  }

  connectedCallback() {}
  disconnectedCallback() {}
}

export default Link
