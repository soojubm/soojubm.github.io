import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { interactiveControlStyles } from '../../stylesheets/shared/interactive-control.styles'
import type { IconName } from '../icon-button/semantics/icon-names'
import { buttonStyles } from './button.styles'

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'destructive'
export type ButtonSize = 'huge' | 'large' | 'medium' | 'small'
export type ButtonIconPosition = 'leading' | 'trailing'

@customElement('mm-button')
export class Button extends LitElement {
  @property({ type: String, reflect: true }) variant: ButtonVariant = 'tertiary'
  @property({ type: String, reflect: true }) size: ButtonSize = 'medium'
  @property({ type: Boolean, attribute: 'full-width', reflect: true }) isFullWidth = false
  @property({ type: Boolean, reflect: true }) disabled = false
  @property({ type: String }) icon?: IconName
  @property({ type: String, attribute: 'icon-position' }) iconPosition: ButtonIconPosition =
    'leading'
  @property({ type: String, attribute: 'aria-label' }) ariaLabel = ''
  @property({ type: String }) role = ''
  @property({ type: String, attribute: 'aria-pressed' }) ariaPressed: string | null = null
  @property({ type: String, attribute: 'aria-checked' }) ariaChecked: string | null = null
  @property({ type: String, attribute: 'aria-expanded', reflect: true }) ariaExpanded:
    | string
    | null = null
  @property({ type: String, attribute: 'aria-controls' }) ariaControls: string | null = null
  @property({ type: String, attribute: 'aria-haspopup' }) ariaHasPopup: string | null = null
  @property({ type: String, attribute: 'aria-describedby' }) ariaDescribedBy: string | null = null

  static styles = [interactiveControlStyles, buttonStyles]

  private _handleClick(event: Event) {
    if (this.disabled) {
      event.preventDefault()
      event.stopPropagation()
    }
  }

  private renderIcon(position: ButtonIconPosition) {
    return this.icon && this.iconPosition === position
      ? html`
          <mm-icon name="${this.icon}"></mm-icon>
        `
      : ''
  }

  render() {
    return html`
      <button
        ?disabled="${this.disabled}"
        role=${this.role || nothing}
        aria-label=${this.ariaLabel || nothing}
        aria-pressed=${this.ariaPressed ?? nothing}
        aria-checked=${this.ariaChecked ?? nothing}
        aria-expanded=${this.ariaExpanded ?? nothing}
        aria-controls=${this.ariaControls ?? nothing}
        aria-haspopup=${this.ariaHasPopup ?? nothing}
        aria-describedby=${this.ariaDescribedBy ?? nothing}
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
