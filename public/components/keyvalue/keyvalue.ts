import { makeStyleSheet } from '../../javascripts/components/utils'

class Keyvalue extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })

    const container = document.createElement('div')
    container.classList.add('summary-item')
    if (this.size) container.dataset.size = this.size

    const slot = document.createElement('slot')
    slot.name = 'slot'

    const keyText = document.createElement('test-text')
    keyText.setAttribute('variant', 'label')
    keyText.innerText = this.key || ''

    const valueText = document.createElement('test-text')
    valueText.setAttribute('variant', this.size === 'large' ? 'body-large' : 'body')
    valueText.innerText = this.value || ''

    shadow.appendChild(container)
    container.append(keyText, valueText, slot, makeStyleSheet('keyvalue'))

    console.log(this.key, this.value)
  }

  get key() {
    return this.getAttribute('key')
  }

  get value() {
    return this.getAttribute('value')
  }

  get size() {
    return this.getAttribute('size')
  }

  connectedCallback() {}
  disconnectedCallback() {}
}

export default Keyvalue
