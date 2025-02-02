import { makeStyleSheet } from '../../javascripts/components/utils'

class ClearButton extends HTMLElement {
  constructor() {
    super()
  }

  get icon() {
    return this.getAttribute('icon')
  }

  get variant() {
    return this.getAttribute('variant')
  }

  get label() {
    return this.getAttribute('label')
  }

  connectedCallback() {
    if (this.shadowRoot) return

    const shadowRoot = this.attachShadow({ mode: 'open' })

    const host = document.createElement('button')
    host.classList.add('icon-button')
    host.dataset.variant = 'clear'

    const icon = document.createElement('mm-icon')
    icon.setAttribute('name', 'xmark')

    shadowRoot?.append(host, makeStyleSheet('button'))
    host.appendChild(icon)
  }
  attributeChangedCallback() {}
  disconnectedCallback() {}
}

export default ClearButton
