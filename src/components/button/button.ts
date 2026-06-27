import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import type { IconName } from '../icon-button/semantics/icon-names'
import { buttonBaseStyles, buttonSizeStyles, buttonVariantStyles } from './button.styles'

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'destructive'
export type ButtonSize = 'huge' | 'large' | 'medium' | 'small'
export type ButtonIconPosition = 'leading' | 'trailing'
export type ButtonType = 'button' | 'submit' | 'reset'

// ARIA 상태 속성은 스펙이 허용하는 토큰만 받도록 좁혀 lit-analyzer 바인딩 검사를 통과시킨다.
export type AriaBoolean = 'true' | 'false' | null
export type AriaTriState = 'true' | 'false' | 'mixed' | null
export type AriaHasPopup = 'true' | 'false' | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog' | null

@customElement('mm-button')
export class Button extends LitElement {
  static styles = [buttonBaseStyles, buttonSizeStyles, buttonVariantStyles]

  @property({ type: String, reflect: true }) variant: ButtonVariant = 'tertiary'
  @property({ type: String, reflect: true }) size: ButtonSize = 'medium'
  @property({ type: Boolean, attribute: 'full-width', reflect: true }) isFullWidth = false
  @property({ type: String }) type: ButtonType = 'button'
  @property({ type: Boolean }) disabled = false
  @property({ type: String }) icon?: IconName
  @property({ type: String, attribute: 'icon-position' }) iconPosition: ButtonIconPosition =
    'leading'
  @property({ type: String, attribute: 'aria-label' }) ariaLabel = ''
  @property({ type: String, attribute: 'aria-pressed' }) ariaPressed: AriaTriState = null
  @property({ type: String, attribute: 'aria-checked' }) ariaChecked: AriaTriState = null
  @property({ type: String, attribute: 'aria-expanded' }) ariaExpanded: AriaBoolean = null
  @property({ type: String, attribute: 'aria-controls' }) ariaControls: string | null = null
  @property({ type: String, attribute: 'aria-haspopup' }) ariaHasPopup: AriaHasPopup = null
  @property({ type: String, attribute: 'aria-describedby' }) ariaDescribedBy: string | null = null

  private handleClick(event: Event) {
    if (this.disabled) {
      event.preventDefault()
      event.stopPropagation()
    }
  }

  private renderIcon(position: ButtonIconPosition) {
    return this.icon && this.iconPosition === position
      ? html`
          <mm-icon name=${this.icon}></mm-icon>
        `
      : nothing
  }

  render() {
    return html`
      <button
        type=${this.type}
        ?disabled=${this.disabled}
        aria-label=${this.ariaLabel || nothing}
        aria-pressed=${ifDefined(this.ariaPressed ?? undefined)}
        aria-checked=${ifDefined(this.ariaChecked ?? undefined)}
        aria-expanded=${ifDefined(this.ariaExpanded ?? undefined)}
        aria-controls=${this.ariaControls ?? nothing}
        aria-haspopup=${ifDefined(this.ariaHasPopup ?? undefined)}
        aria-describedby=${this.ariaDescribedBy ?? nothing}
        @click=${this.handleClick}
      >
        ${this.renderIcon('leading')}
        <slot></slot>
        ${this.renderIcon('trailing')}
      </button>
    `
  }
}

export default Button
