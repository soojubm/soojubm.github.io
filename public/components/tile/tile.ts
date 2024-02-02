import { makeStyleSheet, setSlotElement } from '../../javascripts/components/utils'

class Tile extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })

    const container = document.createElement('div')
    container.classList.add('tile')

    setSlotElement(container, 'entire')

    setSlotElement(container, 'thumbnail')
    setSlotElement(container, 'heading')
    setSlotElement(container, 'body')
    setSlotElement(container, 'tags')
    setSlotElement(container, 'category')
    setSlotElement(container, 'byline')
    setSlotElement(container, 'item')

    const slotAction = document.createElement('slot')
    slotAction.name = 'action'

    const children = document.createElement('slot')
    // children.name = 'children'

    const style = this.getAttribute('style')
    container.setAttribute('style', style || '')

    shadow.appendChild(container)

    // container.innerHTML = this.innerHTML || ''
    container.appendChild(makeStyleSheet('tile'))
    container.appendChild(slotAction)
    container.appendChild(children)

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
