 import { makeStyleSheet } from '../../javascripts/components/utils'

// : 'title' | 'subhead' | 'body' | 'body-large' | 'label' | 'label-strong'

class Text extends HTMLElement {
  private hostElement: HTMLParagraphElement

  constructor() {
    super()
    const shadowRoot = this.attachShadow({ mode: 'open' })
    this.hostElement = document.createElement('p')
  }
  connectedCallback() {
    const { shadowRoot, hostElement } = this

    hostElement.classList.add('text')
    hostElement.dataset.variant = this.variant
    hostElement.dataset.truncated = this.truncated.toString()
    hostElement.innerHTML = this.innerHTML

    shadowRoot!.append(hostElement, makeStyleSheet('text'))
  }

  get variant() {
    return this.getAttribute('variant') || 'body'
  }
  get truncated() {
    return this.hasAttribute('truncated')
  }

  disconnectedCallback() {}
}

export default Text
