import { makeStyleSheet } from './utils'

class Callout extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })

    const container = document.createElement('div')
    const icon = document.createElement('figure')
    const text = document.createElement('p')

    container.appendChild(icon)
    container.appendChild(text)

    text.innerText = this.content || ''
    icon.innerText = this.icon || ''

    container.classList.add('callout')
    icon.classList.add('callout-icon')
    text.classList.add('callout-text')

    shadow.appendChild(container)
    shadow.appendChild(makeStyleSheet('callout'))

    container.dataset.variant = this.variant || ''

    text.innerHTML = this.content
  }

  // tile 안에 클래스 적용 안 됨.
  // get size() {
  //   return this.getAttribute('size')
  // }
  // set size(value) {
  //   if (value) this.setAttribute('size', value)
  // }

  get icon() {
    return this.getAttribute('icon')
  }

  get text() {
    return this.textContent
  }

  get variant() {
    return this.getAttribute('variant')
  }

  get content() {
    return this.innerHTML
  }

  // set content(value) {
  //   return (container = value)
  // }

  connectedCallback() {
    // this.textContent = this.label
  }

  disconnectedCallback() {
    console.log('disconnected', this)
  }
}

export default Callout
