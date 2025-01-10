import { makeStyleSheet } from '../../javascripts/components/utils'

class Input extends HTMLElement {
  // private hostElement: HTMLDivElement

  static get observedAttributes() {
    return ['type', 'placeholder', 'value', 'disabled']
  }

  constructor() {
    super()
    const shadowRoot = this.attachShadow({ mode: 'open' })

    const hostElement = document.createElement('div')
    hostElement.classList.add('textfield')
    hostElement.classList.toggle('is-invalid', this.isInvalid)
    if (this.hiddenLabel) hostElement.dataset.label = String(this.hiddenLabel)

    const labelElement = document.createElement('label')
    labelElement.classList.add('textfield-label')
    labelElement.textContent = this.label

    const inputElement = document.createElement('input')
    inputElement.classList.add('reset-input', 'textfield-input')
    inputElement.setAttribute('type', this.type)
    inputElement.setAttribute('value', this.value)
    inputElement.setAttribute('placeholder', this.placeholder)
    if (this.disabled) inputElement.setAttribute('disabled', String(this.disabled))

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

    shadowRoot!.append(hostElement, makeStyleSheet('textfield'))
    if (this.label) hostElement.appendChild(labelElement)
    if (this.isOptional) labelElement.appendChild(small)
    hostElement.append(prefixSlot, inputElement, suffixSlot, linkSlot)
    if (this.helper) hostElement.appendChild(p)
  }

  connectedCallback() {}
  disconnectedCallback() {}

  get type() {
    return this.getAttribute('type') || 'text'
  }

  get value() {
    return this.getAttribute('value') || ''
  }

  get name() {
    return this.getAttribute('name') || ''
  }

  get placeholder() {
    return this.getAttribute('placeholder') || ''
  }

  get label() {
    return this.getAttribute('label') || ''
  }

  get helper() {
    return this.getAttribute('helper') || ''
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
}

export default Input
