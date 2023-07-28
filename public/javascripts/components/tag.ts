import { makeStyleSheet } from './utils'

makeStyleSheet

class Tag extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })

    // role=itemlist

    // tag-icon role=image

    const container = document.createElement('span')
    container.classList.add('tag')
    container.setAttribute('data-variant', this.variant || '')

    const iconSlot = document.createElement('slot')
    iconSlot.name = 'icon'

    shadow.appendChild(container)
    shadow.appendChild(makeStyleSheet('tag'))

    container.appendChild(iconSlot)
    container.innerHTML = this.innerHTML || this.label || ''
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
  set label(value) {
    if (value) this.setAttribute('label', value)
  }

  connectedCallback() {}

  disconnectedCallback() {
    console.log('disconnected', this)
  }
}

export default Tag
