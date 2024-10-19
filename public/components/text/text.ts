import { makeStyleSheet } from '../../javascripts/components/utils'

class Text extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })

    const container = document.createElement('p')
    container.classList.add('text')
    container.innerHTML = this.content

    if (this.variant) container.dataset.variant = this.variant || ''
    if (this.truncated) container.dataset.truncated = 'true' || ''

    shadow.append(container, makeStyleSheet('text'))
  }

  get variant() {
    return this.getAttribute('variant')
  }
  get truncated() {
    return this.getAttribute('truncated')
  }
  get content() {
    return this.innerHTML
  }

  connectedCallback() {}
  disconnectedCallback() {}
}

export default Text
