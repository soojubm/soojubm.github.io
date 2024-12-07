import { makeStyleSheet } from '../../javascripts/components/utils'
import Input from './input'

class SearchField extends Input {
  constructor() {
    super()

    const textfield = this.shadowRoot?.querySelector('.textfield')
    if (textfield) {
      textfield.classList.remove('textfield')
      textfield.classList.add('searchfield')
      textfield.role = 'search'
      textfield.ariaLabel = 'sitewide / on the page'
    }

    const input = this.shadowRoot?.querySelector('input')
    if (input) {
      input.classList.remove('textfield-input')
      input.classList.add('searchfield-input')
      input.setAttribute('type', 'search')
    }

    const searchIndicator = document.createElement('mm-icon')
    searchIndicator.setAttribute('name', 'search')
    searchIndicator.classList.add('searchfield-prefix')

    const clearButton = document.createElement('mm-clear-button')
    clearButton.classList.add('searchfield-clear')
    clearButton.ariaLabel = ''

    textfield?.append(searchIndicator, clearButton)
  }

  connectedCallback() {}
  disconnectedCallback() {}
}

export default SearchField
