import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import '../tooltip/tooltip'
import { iconButtonStyles } from './icon-button.styles'

export type IconButtonVariant = 'action' | 'flow' | 'plain' | 'navigator' | 'destructive'
export type IconButtonSize = 'small' | 'medium'

@customElement('mm-icon-button')
class IconButton extends LitElement {
  @property({ type: String }) icon = ''
  @property({ type: String, reflect: true }) variant: IconButtonVariant = 'action'
  @property({ type: String, reflect: true }) size: IconButtonSize = 'medium'
  @property({ type: String, attribute: 'aria-label' }) override ariaLabel = ''
  @property({ type: String }) tooltip = ''
  @property({ type: String, attribute: 'tooltip-align' }) tooltipAlign = ''
  @property({ type: Boolean, reflect: true }) disabled = false

  static styles = [iconButtonStyles]

  protected get _accessibilityLabel(): string {
    return this.ariaLabel || this.tooltip || this.icon || ''
  }

  protected renderControl() {
    return html`
      <button
        slot="trigger"
        type="button"
        aria-label="${this._accessibilityLabel}"
        ?disabled="${this.disabled}"
      >
        <mm-icon name="${this.icon}"></mm-icon>
      </button>
    `
  }

  render() {
    const control = this.renderControl()

    if (!this.tooltip) return control

    return html`
      <mm-tooltip content=${this.tooltip} align=${this.tooltipAlign}> ${control} </mm-tooltip>
    `
  }
}

export default IconButton
