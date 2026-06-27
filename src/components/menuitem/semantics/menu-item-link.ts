import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ICON_NAMES, type IconName } from '@/components/icon-button/semantics/icon-names'
import { menuItemStyles } from '@/components/menuitem/menuitem.styles'
import { renderMenuItemContent } from '@/components/menuitem/menuitem.utils'
import type { AriaCurrent } from '@/types/aria'

@customElement('mm-menu-item-link')
export class MenuItemLink extends LitElement {
  static styles = [menuItemStyles]

  @property({ type: String, reflect: true }) size = 'medium'
  @property({ type: String, reflect: true }) tone = ''
  @property({ type: String }) label = ''
  @property({ type: String }) description = ''
  @property({ type: String }) icon?: IconName
  @property({ type: String }) emoji = ''
  @property({ type: String, attribute: 'avatar-src' }) avatarSrc = ''
  @property({ type: String, attribute: 'avatar-variant' }) avatarVariant = 'tertiary'
  @property({ type: Boolean }) disabled = false
  @property({ type: String }) href = ''
  @property({ type: String }) target = '_blank'
  @property({ type: Boolean, attribute: 'hidden-trailing' }) hiddenTrailing = false
  @property({ type: String, attribute: 'aria-current', reflect: true }) ariaCurrent: AriaCurrent =
    null

  render() {
    return html`
      <a
        href=${this.disabled ? nothing : this.href}
        class="item"
        role="menuitem"
        data-interactive
        aria-disabled=${this.disabled ? 'true' : nothing}
        aria-current=${this.ariaCurrent ?? nothing}
        target=${this.target || nothing}
        rel=${this.target === '_blank' ? 'noopener noreferrer' : nothing}
      >
        ${renderMenuItemContent(this, this.renderAction())}
      </a>
    `
  }

  private renderAction() {
    if (this.hiddenTrailing) return html``

    const trailingIcon = this.target === '_blank' ? ICON_NAMES.SHARE : ICON_NAMES.FORWARD

    return html`
      <span slot="trailing">
        <mm-icon name=${trailingIcon} size="small"></mm-icon>
      </span>
    `
  }
}
