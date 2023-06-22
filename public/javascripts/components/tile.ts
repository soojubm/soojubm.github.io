import { makeStyleSheet } from './utils'

class Tile extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })

    const container = document.createElement('div')
    container.classList.add('tile')

    shadow.appendChild(container)
    shadow.appendChild(makeStyleSheet('tiles'))

    // console.log('content', this.content)
    // console.log('parentNode', this.parentNode)
    // console.log('parentElement', this.parentElement)
    if (this.variant) container.setAttribute('data-variant', this.variant)
    container.innerHTML = this.content
  }

  // tile 안에 클래스 적용 안 됨.
  // get size() {
  //   return this.getAttribute('size')
  // }
  // set size(value) {
  //   if (value) this.setAttribute('size', value)
  // }

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

export default Tile
