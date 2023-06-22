import { makeStyleSheet } from './utils'

class Row extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })

    const container = document.createElement('div')
    container.classList.add('row')
    container.role = 'group'

    shadow.appendChild(container)

    shadow.appendChild(makeStyleSheet('row'))

    // if (this.variant) container.setAttribute('data-variant', this.variant)

    container.innerHTML = this.content

    console.log(this, 'this')
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

export default Row
