import { makeStyleSheet } from '../../javascripts/components/utils'

class Input extends HTMLElement {
  private hostElement: HTMLDivElement
  private labelElement: HTMLLabelElement
  private inputElement: HTMLInputElement
  private helperElement: HTMLParagraphElement

  static get observedAttributes() {
    return ['type', 'placeholder', 'value', 'disabled']
  }

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.hostElement = document.createElement('div')
    this.labelElement = document.createElement('label')
    this.inputElement = document.createElement('input')
    this.helperElement = document.createElement('p')
  }

  connectedCallback() {
    const { shadowRoot, hostElement, labelElement, inputElement, helperElement } = this

    hostElement.classList.add('textfield')
    hostElement.classList.toggle('is-invalid', this.isInvalid)
    hostElement.dataset.label = String(this.hiddenLabel)
    if (this.hiddenLabel) hostElement.dataset.label = String(this.hiddenLabel)

    labelElement.classList.add('textfield-label')
    labelElement.textContent = this.label

    inputElement.classList.add('reset-input', 'textfield-input')
    inputElement.setAttribute('type', this.type)
    inputElement.setAttribute('value', this.value)
    inputElement.setAttribute('placeholder', this.placeholder)
    if (this.disabled) inputElement.setAttribute('disabled', String(this.disabled))
    // inputElement.setAttribute('disabled', String(this.disabled))

    const small = document.createElement('small')
    small.textContent = '선택입력'

    helperElement.classList.add('textfield-helper')
    helperElement.textContent = this.helper

    const prefixSlot = document.createElement('slot')
    prefixSlot.name = 'prefix'

    const suffixSlot = document.createElement('slot')
    suffixSlot.name = 'suffix'

    const linkSlot = document.createElement('slot')
    linkSlot.name = 'link'

    shadowRoot!.append(hostElement, makeStyleSheet('textfield'))
    if (this.label) hostElement.appendChild(labelElement)
    if (this.isOptional) labelElement.appendChild(small)
    hostElement.append(prefixSlot, inputElement, suffixSlot, linkSlot)
    if (this.helper) hostElement.appendChild(helperElement)
  }
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
