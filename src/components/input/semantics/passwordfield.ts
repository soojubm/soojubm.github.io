import { LitElement, css, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import './textfield'

@customElement('mm-passwordfield')
class PasswordField extends LitElement {
  @property({ type: String }) value = ''
  @property({ type: String }) name?: string
  @property({ type: String }) placeholder?: string
  @property({ type: String }) label?: string
  @property({ type: String }) helper?: string
  @property({ type: String, attribute: 'validation-text' }) validationText?: string
  @property({ type: String, reflect: true }) size = ''
  @property({ type: Boolean }) optional = false
  @property({ type: Boolean, attribute: 'hidden-label', reflect: true }) hiddenLabel = false
  @property({ type: Boolean, reflect: true }) disabled = false
  @property({ type: String, attribute: 'aria-invalid' }) override ariaInvalid: string | null = null

  @state() private revealed = false

  static styles = css`
    :host {
      display: block;
    }
  `

  render() {
    return html`
      <mm-textfield
        type=${this.revealed ? 'text' : 'password'}
        .value=${this.value}
        .name=${this.name}
        .placeholder=${this.placeholder}
        .label=${this.label}
        .helper=${this.helper}
        .validationText=${this.validationText}
        .size=${this.size}
        ?optional=${this.optional}
        ?hidden-label=${this.hiddenLabel}
        ?disabled=${this.disabled}
        .ariaInvalid=${this.ariaInvalid}
        @input=${this._syncValue}
      >
        <mm-reveal-button
          slot="trailing"
          .revealed=${this.revealed}
          ?disabled=${this.disabled}
          @reveal-toggle=${this._handleReveal}
        ></mm-reveal-button>
      </mm-textfield>
    `
  }

  private _syncValue(event: CustomEvent<{ value: string }>) {
    this.value = event.detail.value
  }

  private _handleReveal(event: CustomEvent<{ revealed: boolean }>) {
    event.stopPropagation()
    this.revealed = event.detail.revealed
  }
}

export default PasswordField
