import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import '../tooltip/tooltip'
import { iconButtonStyles } from './icon-button.styles'

const buttonVariants = {
  cta: 'primary',
  action: 'action',
  flow: 'flow',
} as const

const buttonSizes = {
  small: 'small',
  medium: 'medium',
} as const

// 1. 각각의 개별 객체에서 직접 키(Key) 타입을 추출
export type IconButtonVariant = keyof typeof buttonVariants
export type IconButtonSize = keyof typeof buttonSizes

@customElement('mm-icon-button')
class IconButton extends LitElement {
  @property({ type: String }) icon = ''
  @property({ type: String }) variant: IconButtonVariant = 'action'
  @property({ type: String }) size: IconButtonSize = 'medium'
  @property({ type: String }) label = ''
  @property({ type: String }) tooltip = ''
  @property({ type: String, attribute: 'tooltip-align' }) tooltipAlign = ''
  @property({ type: String }) href = ''
  @property({ type: Boolean, reflect: true }) disabled = false

  static styles = [iconButtonStyles]

  private get _accessibilityLabel(): string {
    return this.label || this.tooltip || this.icon || ''
  }

  // private get _iconColor(): string {
  //   if (this.variant === 'cta') return 'primary'
  //   return this.color || 'inherit'
  // }

  private renderControl() {
    if (this.href && !this.disabled) {
      return html`
        <a
          slot="trigger"
          href="${this.href}"
          class="icon-button"
          data-variant="${this.variant}"
          data-size="${this.size}"
          aria-label="${this._accessibilityLabel}"
        >
          <mm-icon name="${this.icon}"></mm-icon>
        </a>
      `
    }

    return html`
      <button
        slot="trigger"
        type="button"
        class="icon-button"
        data-variant="${this.variant}"
        data-size="${this.size}"
        aria-label="${this._accessibilityLabel}"
        ?disabled="${this.disabled}"
        aria-disabled="${this.disabled ? 'true' : 'false'}"
      >
        <mm-icon name="${this.icon}"></mm-icon>
      </button>
    `
  }

  render() {
    const control = this.renderControl()

    if (!this.tooltip) return control

    return html`
      <mm-tooltip content=${this.tooltip} align=${this.tooltipAlign}>
        ${control}
      </mm-tooltip>
    `
  }
}

export default IconButton
