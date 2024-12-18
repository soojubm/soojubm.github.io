import { makeStyleSheet } from '../../javascripts/components/utils'

class Input extends HTMLElement {
  constructor() {
    super()

    const shadow = this.attachShadow({ mode: 'open' })

    const container = document.createElement('div')
    container.classList.add('textfield')
    container.classList.toggle('is-invalid', this.isInvalid)
    container.dataset.size = this.size || ''
    if (this.hiddenLabel) container.dataset.label = String(this.hiddenLabel)

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

    const small = document.createElement('small')
    small.textContent = '선택입력'

    const p = document.createElement('p')
    p.classList.add('textfield-helper')
    p.textContent = this.helper

    shadow.append(container, makeStyleSheet('textfield'))
    if (this.label) container.appendChild(label)
    if (this.isOptional) label.appendChild(small)
    container.append(prefixSlot, input, suffixSlot, linkSlot)
    if (this.helper) container.appendChild(p)
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

  get name() {
    return this.getAttribute('name')
  }

  get placeholder() {
    return this.getAttribute('placeholder')
  }

  get label() {
    return this.getAttribute('label')
  }

  get helper() {
    return this.getAttribute('helper')
  }

  get isOptional() {
    return this.hasAttribute('isOptional')
  }

  get hiddenLabel() {
    return this.hasAttribute('hiddenLabel')
  }

  get disabled() {
    return this.hasAttribute('disabled')
  }

  get isInvalid() {
    return this.hasAttribute('aria-invalid')
  }

  static get observedAttributes() {
    return ['type', 'placeholder', 'value', 'disabled']
  }

  connectedCallback() {}
  disconnectedCallback() {}
}

export default Input
