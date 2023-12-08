import { makeStyleSheet } from './utils'

makeStyleSheet

class Tag extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })

    // role=itemlist

    // tag-icon role=image
    const container = document.createElement(this.datetime ? 'time' : 'span')
    container.classList.add('tag')
    container.setAttribute('data-variant', this.variant || '')

    const iconSlot = document.createElement('slot')
    iconSlot.name = 'icon'

    container.textContent = this.textContent

    // todo icon prefix
    shadow.append(container, makeStyleSheet('tag'))
    container.appendChild(iconSlot)
  }

  get variant() {
    return this.getAttribute('variant')
  }
  set variant(value) {
    if (value) this.setAttribute('variant', value)
  }

  get content() {
    return this.innerHTML
  }

  get label() {
    return this.getAttribute('label')
  }

  get datetime() {
    return this.getAttribute('datetime')
  }

  connectedCallback() {}
  disconnectedCallback() {}
}

export default Tag
