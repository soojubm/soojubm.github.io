import { makeStyleSheet } from './utils'

class Text extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })

    const container = document.createElement('p')
    container.classList.add('text')
    // container.setAttribute('data-variant', this.variant || '')
    shadow.appendChild(container)
    shadow.appendChild(makeStyleSheet('text'))

    if (this.variant) container.setAttribute('data-variant', this.variant)
    container.innerHTML = this.content

    // const style = this.getAttribute('style')
    // container.setAttribute('style', style || '')
  }

  get variant() {
    return this.getAttribute('variant')
  }
  // set variant(value) {
  //   if (value) this.setAttribute('data-variant', value)
  // }
  get content() {
    return this.innerHTML
  }

  connectedCallback() {}
  disconnectedCallback() {}
}

export default Text
