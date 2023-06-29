import { makeStyleSheet } from './utils'

class Callout extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })

    const container = document.createElement('div')
    const icon = document.createElement('figure')
    const heading = document.createElement('h3')
    const text = document.createElement('p')

    heading.innerText = this.heading || ''
    text.innerText = this.text || this.content || ''
    icon.innerText = this.icon || ''

    container.dataset.variant = this.variant || ''

    container.classList.add('callout')
    icon.classList.add('callout-icon')
    heading.classList.add('callout-title')
    text.classList.add('callout-text')

    shadow.appendChild(container)
    container.append(icon, heading, text)
    shadow.appendChild(makeStyleSheet('callout'))
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

  // TODO title / HTMLElement
  get heading() {
    return this.getAttribute('heading')
  }

  get text() {
    return this.getAttribute('text')
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

  connectedCallback() {}
  disconnectedCallback() {}
}

export default Callout
