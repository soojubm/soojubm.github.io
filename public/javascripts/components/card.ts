import { makeStyleSheet, setSlotElement } from './utils'

class Card extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })
    const container = document.createElement('div')

    setSlotElement(container, 'entire')

    setSlotElement(container, 'thumbnail')
    setSlotElement(container, 'heading')
    setSlotElement(container, 'body')
    setSlotElement(container, 'tags')
    setSlotElement(container, 'category')
    setSlotElement(container, 'byline')
    setSlotElement(container, 'item')

    // todo function setAttribue?
    container.dataset.size = this.size || ''

    container.classList.add('tile')
    // thumbnail.classList.add('card-thumbnail')
    shadow.appendChild(container)
    shadow.appendChild(makeStyleSheet('tiles'))

    const className = this.getAttribute('class')
    if (className) container.classList.add(className)

    if (this.variant) container.setAttribute('data-variant', this.variant)
    container.setAttribute('data-size', this.size || '')

    const style = this.getAttribute('style')
    container.setAttribute('style', style || '')
  }

  get variant() {
    return this.getAttribute('variant')
  }

  get size() {
    return this.getAttribute('size')
  }

  connectedCallback() {}
  disconnectedCallback() {}
}

export default Card
