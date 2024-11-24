import { makeStyleSheet } from '../../javascripts/components/utils'

class Textarea extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })

    const container = document.createElement('div')
    container.classList.add('textfield')
    container.classList.toggle('is-invalid', this.isInvalid)
    if (this.hiddenLabel) container.dataset.label = String(this.hiddenLabel)

    const label = document.createElement('label')
    label.classList.add('textfield-label')
    label.textContent = this.label

    const textarea = document.createElement('textarea')
    textarea.classList.add('reset-input', 'textfield-input')
    textarea.setAttribute('value', this.value || '')
    textarea.setAttribute('placeholder', this.placeholder || '')
    textarea.setAttribute('rows', String(3))

    const p = document.createElement('p')
    p.classList.add('textfield-helper')
    p.textContent = this.helper

    if (this.disabled) textarea.setAttribute('disabled', String(this.disabled))

    if (this.isOptional) {
      const small = document.createElement('small')
      small.textContent = '선택입력'
      label.appendChild(small)
    }

    shadow.appendChild(container)
    if (this.label) container.appendChild(label)
    if (this.helper) container.appendChild(p)
    container.append(textarea, makeStyleSheet('textfield'))
  }

  get value() {
    return this.getAttribute('value')
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

  connectedCallback() {}
  disconnectedCallback() {}
}

export default Textarea

function drawContainer() {}
