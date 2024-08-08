import { makeStyleSheet } from '../../javascripts/components/utils'

class Badge extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })

    const container = document.createElement('em')
    container.classList.add('badge')
    container.dataset.variant = this.variant || ''

    shadow.appendChild(container)
    shadow.appendChild(makeStyleSheet('badge'))

    container.append(...this.childNodes)
  }

  get variant() {
    return this.getAttribute('variant')
  }

  connectedCallback() {}
  disconnectedCallback() {}
}

export default Badge
