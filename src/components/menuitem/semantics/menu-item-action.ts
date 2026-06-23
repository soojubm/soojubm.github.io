import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import '../../icon/icon'
import type { IconName } from '../../icon-button/semantics/icon-names'
import { menuItemStyles } from '../menuitem.styles'
import { renderMenuItemContent } from '../menuitem.utils'

@customElement('mm-menu-item-action')
export class MenuItemAction extends LitElement {
  @property({ type: String, reflect: true }) size = 'medium'
  @property({ type: String, reflect: true }) tone = ''
  @property({ type: String }) label = ''
  @property({ type: String }) description = ''
  @property({ type: String }) icon?: IconName
  @property({ type: String, attribute: 'trailing-icon' }) trailingIcon?: IconName
  @property({ type: String }) emoji = ''
  @property({ type: String, attribute: 'avatar-src' }) avatarSrc = ''
  @property({ type: String, attribute: 'avatar-variant' }) avatarVariant = 'tertiary'
  @property({ type: Boolean, reflect: true }) disabled = false
  @property({ type: String }) override role = 'menuitem'
  @property({ type: String, attribute: 'aria-controls' }) override ariaControls: string | null =
    null
  @property({ type: String, attribute: 'aria-expanded' }) override ariaExpanded: string | null =
    null
  @property({ type: String, attribute: 'aria-haspopup' }) override ariaHasPopup: string | null =
    null
  @property({ type: String, attribute: 'aria-current' }) override ariaCurrent: string | null = null

  static styles = [menuItemStyles]

  render() {
    return html`
      <button
        type="button"
        class="item"
        role=${this.role}
        data-interactive
        aria-disabled=${this.disabled ? 'true' : nothing}
        aria-controls=${this.ariaControls ?? nothing}
        aria-expanded=${this.ariaExpanded ?? nothing}
        aria-haspopup=${this.ariaHasPopup ?? nothing}
        aria-current=${this.ariaCurrent ?? nothing}
      >
        ${renderMenuItemContent(
          this,
          this.trailingIcon
            ? html`
                <mm-icon slot="trailing" name=${this.trailingIcon}></mm-icon>
              `
            : nothing,
        )}
      </button>
    `
  }
}

export default MenuItemAction
