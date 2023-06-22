import { makeStyleSheet } from './utils'

class Badge extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })

    const container = document.createElement('em')
    container.classList.add('badge')
    container.setAttribute('data-variant', this.variant || '')

    shadow.appendChild(container)
    shadow.appendChild(makeStyleSheet('badge'))

    container.innerHTML = this.content
  }

  get variant() {
    return this.getAttribute('variant')
  }

  get content() {
    return this.innerHTML
  }

  connectedCallback() {}
  disconnectedCallback() {}
}

export default Badge
