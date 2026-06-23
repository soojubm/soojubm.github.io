import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { interactiveControlStyles } from '../../stylesheets/shared/interactive-control.styles'
import type { IconName } from './semantics/icon-names'
import { iconButtonStyles } from './icon-button.styles'

export type IconButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'destructive'
export type IconButtonSize = 'small' | 'medium'

@customElement('mm-icon-button')
class IconButton extends LitElement {
  @property({ type: String }) icon?: IconName
  @property({ type: String, reflect: true }) variant: IconButtonVariant = 'tertiary'
  @property({ type: String, reflect: true }) size: IconButtonSize = 'medium'
  @property({ type: String, attribute: 'aria-label' }) ariaLabel = ''
  @property({ type: String }) tooltip = ''
  @property({ type: String, attribute: 'tooltip-placement' }) tooltipPlacement = ''
  @property({ type: Boolean }) disabled = false
  @property({ type: String }) role = ''
  @property({ type: String, attribute: 'aria-haspopup' }) ariaHasPopup: string | null = null
  @property({ type: String, attribute: 'aria-expanded' }) ariaExpanded: string | null = null
  @property({ type: String, attribute: 'aria-pressed' }) ariaPressed: string | null = null
  @property({ type: String, attribute: 'aria-checked' }) ariaChecked: string | null = null
  @property({ type: String, attribute: 'aria-controls' }) ariaControls: string | null = null
  @property({ type: String, attribute: 'aria-describedby' }) ariaDescribedBy: string | null = null

  static styles = [interactiveControlStyles, iconButtonStyles]

  protected get _accessibilityLabel(): string {
    return this.ariaLabel || this.tooltip || this.icon || ''
  }

  protected renderControl() {
    return html`
      <button
        slot="trigger"
        type="button"
        role=${this.role || nothing}
        aria-label="${this._accessibilityLabel}"
        ?disabled="${this.disabled}"
        aria-haspopup=${this.ariaHasPopup ?? nothing}
        aria-expanded=${this.ariaExpanded ?? nothing}
        aria-pressed=${this.ariaPressed ?? nothing}
        aria-checked=${this.ariaChecked ?? nothing}
        aria-controls=${this.ariaControls ?? nothing}
        aria-describedby=${this.ariaDescribedBy ?? nothing}
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
