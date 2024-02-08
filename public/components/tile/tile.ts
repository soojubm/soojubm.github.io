import { makeStyleSheet, setSlotElement } from '../../javascripts/components/utils'

class Tile extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })

    const container = document.createElement('div')
    container.classList.add('tile')

    // FIXME:  순서를 여기서 정의하게 되어버림
    setSlotElement(container, 'thumbnail')
    setSlotElement(container, 'byline')
    setSlotElement(container, 'heading')
    setSlotElement(container, 'body')
    setSlotElement(container, 'tags')
    setSlotElement(container, 'category')
    setSlotElement(container, 'item')

    const slotAction = document.createElement('slot')
    slotAction.name = 'action'

    // ...rest
    const children = document.createElement('slot')
    // children.name = 'children'
    // container.innerHTML = this.innerHTML || ''

    // TODO 이게 없으면백그라운드 는 뒤에 깔림. 하지만 보더가 중복됨.
    const style = this.getAttribute('style')
    container.setAttribute('style', style || '')

    if (this.variant) container.setAttribute('data-variant', this.variant)
    if (this.size) container.setAttribute('data-size', this.size)

    shadow.appendChild(container)
    container.appendChild(makeStyleSheet('tile'))
    container.appendChild(slotAction)
    container.appendChild(children)
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
