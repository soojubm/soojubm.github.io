import { makeStyleSheet } from '../../javascripts/components/utils'

// TODO Tooltip
// aria label

class IconButton extends HTMLElement {
  static get observedAttributes() {
    return ['disabled']
  }

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
    const shadowRoot = this.attachShadow({ mode: 'open' })

    const host = document.createElement('button')
    host.classList.add('icon-button')
    host.dataset.variant = this.variant || ''
    // host.ariaLabel = this.ariaLabel

    const icon = document.createElement('mm-icon')
    icon.setAttribute('name', this.icon || '')

    shadowRoot?.append(host, makeStyleSheet('button'))
    host.appendChild(icon)
  }
  attributeChangedCallback() {}
  disconnectedCallback() {}
}

export default IconButton
