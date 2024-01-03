import { makeStyleSheet } from '../../javascripts/components/utils'

class Text extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })

    const container = document.createElement('p')
    container.classList.add('text')

    if (this.variant) container.setAttribute('data-variant', this.variant)
    container.innerHTML = this.content

    shadow.appendChild(container)
    shadow.appendChild(makeStyleSheet('text'))

    // TODO function
    const className = this.getAttribute('class')
    if (className) container.classList.add(className)
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

export default Text
