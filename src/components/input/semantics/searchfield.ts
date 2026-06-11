import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { inputStyles } from '../input.styles'
import { ICON_NAMES } from '../../icon-button/semantics/icon-names'
import '../input'

@customElement('mm-searchfield')
class SearchField extends LitElement {
  @property({ type: String }) value = ''
  @property({ type: String }) placeholder?: string
  @property({ type: Boolean, reflect: true }) disabled = false
  @property({ type: String, reflect: true }) size = ''

  static styles = inputStyles

  private inputId = `input-${crypto?.randomUUID?.() || Math.random().toString(36).slice(2)}`

  render() {
    return html`
      <div class="textfield-control">
        <mm-icon name=${ICON_NAMES.SEARCH}></mm-icon>
        <mm-input
          input-id=${this.inputId}
          input-class="textfield-input"
          .type=${'search'}
          .value=${this.value}
          .placeholder=${this.placeholder}
          ?disabled=${this.disabled}
          @input=${this._handleInput}
        ></mm-input>
        <mm-clear-button
          label="clear"
          ?disabled=${this.disabled || !this.value}
          @click=${this._clear}
        ></mm-clear-button>
      </div>
    `
  }

  private _handleInput(event: Event) {
    const target = event.target as HTMLInputElement
    this.value = target.value
    this.dispatchEvent(new CustomEvent('input', { bubbles: true, composed: true, detail: { value: this.value } }))
  }

  private _clear(event: Event) {
    event.stopPropagation()
    if (this.disabled || !this.value) return
    this.value = ''
    this.dispatchEvent(new CustomEvent('input', { bubbles: true, composed: true, detail: { value: '' } }))
  }
}

export default SearchField
