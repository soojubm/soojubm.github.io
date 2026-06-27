import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import '@/components/icon/icon'
import type { IconName } from '@/components/icon-button/semantics/icon-names'
import { menuItemStyles } from '@/components/menuitem/menuitem.styles'
import { renderMenuItemContent } from '@/components/menuitem/menuitem.utils'
import type { AriaCurrent } from '@/types/aria'

@customElement('mm-menu-item-action')
export class MenuItemAction extends LitElement {
  static styles = [menuItemStyles]

  @property({ type: String, reflect: true }) size = 'medium'
  @property({ type: String, reflect: true }) tone = ''
  @property({ type: String }) label = ''
  @property({ type: String }) description = ''
  @property({ type: String }) icon?: IconName
  @property({ type: String, attribute: 'trailing-icon' }) trailingIcon?: IconName
  @property({ type: String }) emoji = ''
  @property({ type: String, attribute: 'avatar-src' }) avatarSrc = ''
  @property({ type: String, attribute: 'avatar-variant' }) avatarVariant = 'tertiary'
  @property({ type: Boolean }) disabled = false
  @property({ type: String }) role = 'menuitem'
  @property({ type: String, attribute: 'aria-current' }) ariaCurrent: AriaCurrent = null

  render() {
    return html`
      <button
        type="button"
        class="item"
        role=${this.role}
        data-interactive
        ?disabled=${this.disabled}
        aria-current=${this.ariaCurrent ?? nothing}
      >
        ${renderMenuItemContent(
          this,
          this.trailingIcon
            ? html`
                <mm-icon slot="trailing" name=${this.trailingIcon}></mm-icon>
              `
            : html`
                <slot name="trailing" slot="trailing"></slot>
              `,
        )}
      </button>
    `
  }
}

export default MenuItemAction
