import { makeStyleSheet } from './utils'

class Tile extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })

    const container = document.createElement('div')
    container.classList.add('tile')

    const slotActions = document.createElement('slot')
    const slotTags = document.createElement('slot')
    slotActions.name = 'actions'
    slotTags.name = 'tags'

    const style = this.getAttribute('style')
    container.setAttribute('style', style || '')

    shadow.appendChild(container)

    // console.log(...this.childNodes, ...this.children, 'this.childNodes')

    console.log(...this.childNodes, ...this.children, 'this.childNodes')

    container.innerHTML = this.innerHTML || ''
    container.appendChild(makeStyleSheet('tiles'))
    container.appendChild(slotActions)
    container.appendChild(slotTags)

    if (this.variant) container.setAttribute('data-variant', this.variant)
    container.setAttribute('data-size', this.size || '')
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

  get size() {
    return this.getAttribute('size')
  }

  connectedCallback() {}
  disconnectedCallback() {
    console.log('disconnected', this)
  }
}

export default Tile
