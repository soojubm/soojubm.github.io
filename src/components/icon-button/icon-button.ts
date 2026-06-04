import { LitElement, html, nothing } from 'lit'
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
  // 호스트에 설정된 aria 속성을 내부 <button>으로 포워딩
  @property({ attribute: 'aria-haspopup' }) private haspopup: string | null = null
  @property({ attribute: 'aria-expanded' }) private expanded: string | null = null

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
        aria-haspopup="${this.haspopup !== null ? this.haspopup : nothing}"
        aria-expanded="${this.expanded !== null ? this.expanded : nothing}"
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
