import { makeStyleSheet } from '../../javascripts/components/utils'
import Input from './input'

class SearchField extends Input {
  // private shadowRoot: ShadowRoot;

  constructor() {
    super()

    // const textfield = this.shadowRoot?.querySelector('.textfield')
    // if (textfield) {
    //   textfield.classList.remove('textfield')
    //   textfield.classList.add('searchfield')
    //   textfield.role = 'search'
    //   textfield.ariaLabel = 'sitewide / on the page'
    // }

    // const input = this.shadowRoot?.querySelector('input')
    // if (input) {
    //   input.classList.remove('textfield-input')
    //   input.classList.add('searchfield-input')
    //   input.setAttribute('type', 'search')
    // }

    // textfield?.append(searchIndicator, clearButton)
  }

  connectedCallback() {
    super.connectedCallback()

    const shadowRoot = this.shadowRoot
    shadowRoot?.querySelector('.textfield')?.classList.replace('textfield', 'searchfield')

    const searchIndicator = document.createElement('mm-icon')
    searchIndicator.setAttribute('name', 'search')
    searchIndicator.classList.add('searchfield-prefix')

    shadowRoot?.querySelector('.searchfield')?.appendChild(searchIndicator)

    const button = document.createElement('button')
    button.style.cssText = `
      background-color: var(--color-primary);
      width: var(--size-small);
      height: var(--size-small);
      padding: 0;
      border: 0;
      border-radius: var(--radius);
      position: absolute;
      right: 0.75rem;
      top: 0.75rem;
      z-index: 1;
    `
    const icon = document.createElement('mm-icon')
    icon.setAttribute('name', 'arrow-right')
    icon.setAttribute('color', '#fff')

    button.appendChild(icon)

    shadowRoot?.querySelector('.searchfield')?.appendChild(button)

    const clearButton = document.createElement('mm-clear-button')
    clearButton.classList.add('searchfield-clear')
    clearButton.ariaLabel = ''

    shadowRoot?.querySelector('.searchfield')?.appendChild(clearButton)
  }
  disconnectedCallback() {}
}

export default SearchField
