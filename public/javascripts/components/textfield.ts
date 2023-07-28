import { makeStyleSheet } from './utils'

class Input extends HTMLElement {
  constructor() {
    super()
    // size = "large";

    // constructor() {
    //   super();
    //   this.value = "";
    // }

    // static get observedAttributes() {
    //   return ["placeholder"];
    // }
    // this.innerHTML = `<button class="chip"></button>`
    const shadow = this.attachShadow({ mode: 'open' })

    const container = document.createElement('div')
    container.classList.add('textfield')
    container.dataset.size = this.size || ''

    const label = document.createElement('label')
    label.classList.add('textfield-label')

    const input = document.createElement('input')
    input.classList.add('reset-input')
    input.classList.add('textfield-input')
    input.setAttribute('type', 'text')
    input.setAttribute('placeholder', this.placeholder || '')

    if (this.disabled) {
      input.setAttribute('disabled', String(this.disabled))
    }

    const iconSlot = document.createElement('slot')
    iconSlot.name = 'icon'

    const leadingIconSlot = document.createElement('slot')
    leadingIconSlot.name = 'leading'

    shadow.appendChild(container)
    container.appendChild(label)
    container.appendChild(input)
    container.appendChild(leadingIconSlot)
    container.appendChild(iconSlot)

    shadow.appendChild(makeStyleSheet('textfield'))

    label.textContent = this.label
    // input.setAttribute('placeholder', this.placeholder || '')

    if (this.isOptional) {
      const small = document.createElement('small')
      small.textContent = '선택입력'
      label.appendChild(small)
    }

    if (this.helper && this.helper.length > 0) {
      const p = document.createElement('p')
      p.classList.add('textfield-helper')
      p.textContent = this.helper
      container.appendChild(p)
    }
  }

  get type() {
    return this.getAttribute('type')
  }
  set type(value) {
    if (value) this.setAttribute('type', value)
  }

  get size() {
    return this.getAttribute('size')
  }
  set size(value) {
    if (value) this.setAttribute('size', value)
  }

  get name() {
    return this.getAttribute('name')
  }

  get placeholder() {
    return this.getAttribute('placeholder')
  }
  set placeholder(value) {
    if (value) this.setAttribute('placeholder', value)
  }

  get label() {
    return this.getAttribute('label')
  }
  set label(value) {
    if (value) this.setAttribute('label', value)
  }

  get helper() {
    return this.getAttribute('helper')
  }

  get isOptional() {
    return this.hasAttribute('isOptional')
  }

  get disabled() {
    return this.hasAttribute('disabled')
  }

  connectedCallback() {
    console.log('helper', this.helper)

    console.log('textarea', this)
  }
  disconnectedCallback() {
    console.log('disconnected', this)
  }
}

export default Input
