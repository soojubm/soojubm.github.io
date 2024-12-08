import { makeStyleSheet } from '../../javascripts/components/utils'

class TextGroup extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })

    const container = document.createElement('div')
    container.role = 'group'
    container.classList.add('text-group')
    container.dataset.variant = this.variant

    shadow.append(container, makeStyleSheet('text'))
    container.append(...this.childNodes)
  }

  get variant() {
    return this.getAttribute('variant') || ''
  }

  connectedCallback() {}
  disconnectedCallback() {}
}

export default TextGroup
