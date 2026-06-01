import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import '../tooltip/tooltip'
import { iconButtonStyles } from './icon-button.styles'

const buttonVariants = {
  cta: 'primary',
  action: 'action',
  flow: 'flow',
  plain: 'plain',
  navigator: 'navigator',
  destructive: 'destructive',
} as const

const buttonSizes = {
  small: 'small',
  medium: 'medium',
} as const

export type IconButtonVariant = keyof typeof buttonVariants
export type IconButtonSize = keyof typeof buttonSizes

@customElement('mm-icon-button')
class IconButton extends LitElement {
  @property({ type: String }) icon = ''
  @property({ type: String }) variant: IconButtonVariant = 'action'
  @property({ type: String }) size: IconButtonSize = 'medium'
  @property({ type: String }) label = ''
  @property({ type: String, attribute: 'aria-label' }) override ariaLabel = ''
  @property({ type: String }) tooltip = ''
  @property({ type: String, attribute: 'tooltip-align' }) tooltipAlign = ''
  @property({ type: String }) href = ''
  @property({ type: Boolean, reflect: true }) disabled = false
  @property({ type: Boolean }) haspopup = false
  @property({ type: Boolean, reflect: true }) expanded = false

  static styles = [iconButtonStyles]

  private get _accessibilityLabel(): string {
    return this.ariaLabel || this.label || this.tooltip || this.icon || ''
  }

  protected renderControl() {
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
        aria-haspopup="${this.haspopup ? 'true' : nothing}"
        aria-expanded="${this.haspopup ? (this.expanded ? 'true' : 'false') : nothing}"
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
