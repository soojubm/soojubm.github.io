import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { buttonStyles } from './button.styles'

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'text' | 'destructive'
export type ButtonSize = 'huge' | 'large' | 'medium'
export type ButtonIconPosition = 'leading' | 'trailing'

@customElement('mm-button')
export class Button extends LitElement {
  @property({ type: String, reflect: true }) variant: ButtonVariant = 'tertiary'
  @property({ type: String, reflect: true }) size: ButtonSize = 'medium'
  @property({ type: Boolean, reflect: true }) isFullWidth = false
  @property({ type: Boolean, reflect: true }) disabled = false
  @property({ type: String }) icon = ''
  @property({ type: String, attribute: 'icon-position' }) iconPosition: ButtonIconPosition = 'leading'

  static styles = [buttonStyles]

  private _handleClick(event: Event) {
    if (this.disabled) {
      event.preventDefault()
      event.stopPropagation()
    }
  }

  private renderIcon(position: ButtonIconPosition) {
    return this.icon && this.iconPosition === position ? html`<mm-icon name="${this.icon}"></mm-icon>` : ''
  }

  render() {
    return html`
      <button
        ?disabled="${this.disabled}"
        @click="${this._handleClick}"
      >
        ${this.renderIcon('leading')}
        <slot></slot>
        ${this.renderIcon('trailing')}
      </button>
    `
  }
}

export default Button
