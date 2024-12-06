import { makeStyleSheet } from '../../javascripts/components/utils'

class SearchField extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })

    const container = document.createElement('form')
    container.role = 'search'
    container.ariaLabel = 'sitewide / on the page'
    container.classList.add('searchfield')
    container.classList.toggle('is-invalid', this.isInvalid)
    container.dataset.size = this.size || ''
    if (this.hiddenLabel) container.dataset.label = String(this.hiddenLabel)

    const label = document.createElement('label')
    label.classList.add('searchfield-label')
    label.textContent = this.label

    const input = document.createElement('input')
    input.classList.add('reset-input', 'searchfield-input')
    input.setAttribute('type', 'search')

    input.setAttribute('value', this.value || '')
    input.setAttribute('placeholder', this.placeholder || '')

    if (this.disabled) input.setAttribute('disabled', String(this.disabled))

    const searchIndicator = document.createElement('mm-icon')
    searchIndicator.setAttribute('name', 'search')
    searchIndicator.classList.add('searchfield-prefix')

    const clearButton = document.createElement('mm-clear-button')
    clearButton.classList.add('searchfield-clear')
    clearButton.ariaLabel = ''

    shadow.append(container, makeStyleSheet('textfield'))
    if (this.label) container.appendChild(label)
    container.append(searchIndicator, input, clearButton)
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

export default SearchField
