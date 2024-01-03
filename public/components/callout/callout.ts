import { makeStyleSheet } from '../../javascripts/components/utils'

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
    container.classList.add('callout')
    container.dataset.variant = this.variant || ''

    // const heading = document.createElement('h3')
    // heading.classList.add('callout-title')
    // heading.innerText = this.heading || ''

    const text = document.createElement('p')
    text.classList.add('callout-text')
    text.innerText = this.text || this.innerHTML || ''

    const icon = document.createElement('test-icon')
    icon.setAttribute('name', 'warning-triangle')
    icon.classList.add('callout-icon')

    shadow.append(container, makeStyleSheet('callout'))
    container.append(icon, text)
  }
  disconnectedCallback() {}
}

export default Callout
