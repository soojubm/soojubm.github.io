import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { textfieldStyles } from './textfield.styles'

@customElement('mm-searchfield')
class SearchField extends LitElement {
  @property({ type: String }) value = ''
  @property({ type: String }) placeholder = ''
  @property({ type: String }) name = ''
  @property({ type: Boolean, reflect: true }) disabled = false

  static styles = [textfieldStyles]

  render() {
    return html`
      <div class="searchfield" role="search" aria-label="sitewide / on the page">
        <mm-icon class="searchfield-prefix" name="search"></mm-icon>

        <input
          class="reset-input textfield-input searchfield-input"
          type="search"
          .value="${this.value}"
          name="${this.name}"
          placeholder="${this.placeholder}"
          ?disabled="${this.disabled}"
        />

        <mm-clear-button class="searchfield-clear" aria-label="clear"></mm-clear-button>
      </div>
    `
  }
}

export default SearchField
