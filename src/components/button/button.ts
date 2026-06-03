import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { buttonStyles } from './button.styles'

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'text' | 'destructive'
export type ButtonSize = 'huge' | 'large' | 'medium'

@customElement('mm-button')
export class Button extends LitElement {
  @property({ type: String, reflect: true }) variant: ButtonVariant = 'tertiary'
  @property({ type: String, reflect: true }) size: ButtonSize = 'medium'
  @property({ type: Boolean, reflect: true }) isFullWidth = false
  @property({ type: Boolean, reflect: true }) disabled = false
  @property({ type: String }) icon = ''

  static styles = [buttonStyles]

  private _handleClick(event: Event) {
    if (this.disabled) {
      event.preventDefault()
      event.stopPropagation()
    }
  }

  render() {
    return html`
      <button
        ?disabled="${this.disabled}"
        @click="${this._handleClick}"
      >
        ${this.icon ? html`<mm-icon name="${this.icon}"></mm-icon>` : ''}
        <slot></slot>
      </button>
    `
  }
}

export default Button
