import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
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
  @property({ type: String, attribute: 'role' }) override role = ''
  @property({ attribute: 'aria-controls' }) private _ariaControls: string | null = null
  @property({ attribute: 'aria-expanded' }) private _ariaExpanded: string | null = null
  @property({ attribute: 'aria-haspopup' }) private _ariaHaspopup: string | null = null

  static styles = [menuItemStyles]

  override updated() {
    if (this.hasAttribute('role')) this.removeAttribute('role')
  }

  render() {
    return html`
      <button
        type="button"
        class="item"
        role="menuitem"
        data-interactive
        aria-disabled=${ifDefined(this.disabled ? 'true' : undefined)}
        aria-controls=${this._ariaControls ?? nothing}
        aria-expanded=${this._ariaExpanded ?? nothing}
        aria-haspopup=${this._ariaHaspopup ?? nothing}
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
