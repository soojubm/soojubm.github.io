import { makeStyleSheet } from './utils'

class Callout extends HTMLElement {
  constructor() {
    super()
  }

  get heading() {
    return this.getAttribute('heading')
  }

  get text() {
    return this.getAttribute('text')
  }

  get variant() {
    return this.getAttribute('variant')
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' })

    const container = document.createElement('div')
    const heading = document.createElement('h3')
    const text = document.createElement('p')

    container.classList.add('callout')
    container.dataset.variant = this.variant || ''

    heading.classList.add('callout-title')
    heading.innerText = this.heading || ''

    text.classList.add('callout-text')
    text.innerText = this.text || this.innerHTML || ''

    const icon = document.createElement('test-icon')
    icon.setAttribute('name', 'warning-triangle')
    icon.classList.add('callout-icon')

    shadow.appendChild(container)
    container.append(icon, heading, text, makeStyleSheet('callout'))
  }
  disconnectedCallback() {}
}

export default Callout
