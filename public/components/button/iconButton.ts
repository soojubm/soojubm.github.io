import { makeStyleSheet } from '../../javascripts/components/utils'

// TODO Tooltip
// aria label

class IconButton extends HTMLElement {
  static get observedAttributes() {
    return ['disabled']
  }

  constructor() {
    super()
    const shadowRoot = this.attachShadow({ mode: 'open' })

    const variant = this.getAttribute('variant')

    const host = document.createElement('button')
    host.classList.add('icon-button')
    host.dataset.variant = variant || ''

    const icon = document.createElement('mm-icon')
    icon.setAttribute('name', this.icon || '')

    // host.ariaLabel = this.ariaLabel

    // TODO icon button css
    shadowRoot?.append(host, makeStyleSheet('button'))
    host.appendChild(icon)
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

  connectedCallback() {}
  attributeChangedCallback() {}
  disconnectedCallback() {}
}

export default IconButton
