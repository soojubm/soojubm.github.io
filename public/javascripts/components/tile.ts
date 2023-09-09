import { makeStyleSheet } from './utils'

class Tile extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })

    const container = document.createElement('div')
    container.classList.add('tile')

    const slotAction = document.createElement('slot')
    const slotTags = document.createElement('slot')
    const slotCategory = document.createElement('slot')
    slotAction.name = 'action'
    slotTags.name = 'tags'
    slotCategory.name = 'category'

    const style = this.getAttribute('style')
    container.setAttribute('style', style || '')

    shadow.appendChild(container)
    // console.log(...this.childNodes, ...this.children, 'this.childNodes')

    container.innerHTML = this.innerHTML || ''
    container.appendChild(makeStyleSheet('tiles'))
    container.appendChild(slotAction)
    container.appendChild(slotTags)
    container.appendChild(slotCategory)

    if (this.variant) container.setAttribute('data-variant', this.variant)
    container.setAttribute('data-size', this.size || '')
  }

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
  disconnectedCallback() {}
}

export default Tile
