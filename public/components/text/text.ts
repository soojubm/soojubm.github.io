import { makeStyleSheet, inheritStyle } from '../../javascripts/components/utils'

class Text extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })

    const container = document.createElement('p')
    container.classList.add('text')

    if (this.variant) container.dataset.variant = this.variant
    container.innerHTML = this.content

    // TODO 이거
    console.log(this.truncated, typeof this.truncated)
    if (this.truncated !== null) container.dataset.truncated = ''

    shadow.appendChild(container)
    shadow.appendChild(makeStyleSheet('text'))

    // TODO
    const style = this.getAttribute('style')
    if (style) container.setAttribute('style', style)

    // TODO function
    const className = this.getAttribute('class')
    if (className) container.classList.add(className)
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
