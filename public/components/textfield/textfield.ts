import { makeStyleSheet } from '../../javascripts/components/utils'

// size = "large";

// constructor() {
//   super();
//   this.value = "";
// }

// static get observedAttributes() {
//   return ["placeholder"];
// }
// this.innerHTML = `<button class="chip"></button>`

class Input extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })

    const container = document.createElement('div')
    container.classList.add('textfield')
    container.dataset.size = this.size || ''
    container.classList.toggle('is-invalid', this.isInvalid)
    if (this.labeling) container.dataset.label = this.labeling

    const label = document.createElement('label')
    label.classList.add('textfield-label')
    label.textContent = this.label

    const input = document.createElement('input')
    input.classList.add('reset-input', 'textfield-input')
    input.setAttribute('type', this.type || 'text')
    input.setAttribute('value', this.value || '')
    input.setAttribute('placeholder', this.placeholder || '')
    if (this.disabled) input.setAttribute('disabled', String(this.disabled))

    const prefixSlot = document.createElement('slot')
    prefixSlot.name = 'prefix'

    const suffixSlot = document.createElement('slot')
    suffixSlot.name = 'suffix'

    const linkSlot = document.createElement('slot')
    linkSlot.name = 'link'

    if (this.isOptional) {
      const small = document.createElement('small')
      small.textContent = '선택입력'
      label.appendChild(small)
    }

    shadow.appendChild(container)
    if (this.label) container.appendChild(label)
    container.append(prefixSlot, input, suffixSlot, linkSlot, makeStyleSheet('textfield'))
    if (this.helper) {
      const p = document.createElement('p')
      p.classList.add('textfield-helper')
      p.textContent = this.helper
      container.appendChild(p)
    }
  }

  get type() {
    return this.getAttribute('type')
  }

  get value() {
    return this.getAttribute('value')
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
  // set label(value) {
  //   if (value) this.setAttribute('label', value)
  // }

  get helper() {
    return this.getAttribute('helper')
  }

  get isOptional() {
    return this.hasAttribute('isOptional')
  }

  get labeling() {
    return this.getAttribute('labeling')
  }

  get disabled() {
    return this.hasAttribute('disabled')
  }

  get isInvalid() {
    return this.hasAttribute('aria-invalid')
  }

  connectedCallback() {}
  disconnectedCallback() {
    console.log('disconnected', this)
  }
}

export default Input

function drawContainer() {}
