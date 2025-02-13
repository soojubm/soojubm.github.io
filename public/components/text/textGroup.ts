import { makeStyleSheet } from '../../javascripts/components/utils'

class TextGroup extends HTMLElement {
  private hostElement: HTMLElement

  constructor() {
    super()
    const shadowRoot = this.attachShadow({ mode: 'open' })

    this.hostElement = document.createElement('div')
  }

  connectedCallback() {
    const {shadowRoot, hostElement } = this
    hostElement.role = 'group'
    hostElement.classList.add('text-group')
    hostElement.dataset.variant = this.variant

    shadowRoot!.append(hostElement, makeStyleSheet('text'))
    hostElement.append(...this.childNodes)
  }
  disconnectedCallback() {}

  
  get variant() {
    return this.getAttribute('variant') || ''
  }
}

export default TextGroup
