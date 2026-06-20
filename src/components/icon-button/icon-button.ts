import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { iconButtonStyles } from './icon-button.styles'

export type IconButtonVariant = 'action' | 'flow' | 'plain' | 'navigator' | 'destructive' | 'clear'
export type IconButtonSize = 'small' | 'medium'

@customElement('mm-icon-button')
class IconButton extends LitElement {
  @property({ type: String }) icon = ''
  @property({ type: String, reflect: true }) variant: IconButtonVariant = 'action'
  @property({ type: String, reflect: true }) size: IconButtonSize = 'medium'
  @property({ type: String, attribute: 'aria-label' }) override ariaLabel = ''
  @property({ type: String }) tooltip = ''
  @property({ type: String, attribute: 'tooltip-placement' }) tooltipPlacement = ''
  @property({ type: Boolean, reflect: true }) disabled = false
  // 호스트에 설정된 aria 속성을 내부 <button>으로 포워딩 (mm-dropdown 등 외부 컨트롤러용)
  @property({ attribute: 'aria-haspopup' }) private _ariaHaspopup: string | null = null
  @property({ attribute: 'aria-expanded' }) private _ariaExpanded: string | null = null
  @property({ attribute: 'aria-pressed' }) private _ariaPressed: string | null = null

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
        aria-haspopup="${this._ariaHaspopup !== null ? this._ariaHaspopup : nothing}"
        aria-expanded="${this._ariaExpanded !== null ? this._ariaExpanded : nothing}"
        aria-pressed="${this._ariaPressed !== null ? this._ariaPressed : nothing}"
      >
        <mm-icon name="${this.icon}"></mm-icon>
      </button>
    `
  }

  render() {
    const control = this.renderControl()

    if (!this.tooltip) return control

    return html`
      <mm-tooltip content=${this.tooltip} placement=${this.tooltipPlacement}>${control}</mm-tooltip>
    `
  }
}

export default IconButton
