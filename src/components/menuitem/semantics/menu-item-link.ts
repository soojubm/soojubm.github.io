import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import type { AriaCurrent } from '@/types/aria'

import '@/components/tag/tag'
import { ICON_NAMES } from '@/components/icon-button/semantics/icon-names'
import { menuItemStyles } from '@/components/menuitem/menuitem.styles'
import {
  renderMenuItemContent,
  withMenuItemPresentation,
} from '@/components/menuitem/menuitem.utils'

@customElement('mm-menu-item-link')
export class MenuItemLink extends withMenuItemPresentation(LitElement) {
  static styles = [menuItemStyles]

  @property({ type: Boolean }) disabled = false
  @property({ type: String }) href = ''
  @property({ type: String }) target = '_blank'
  @property({ type: Boolean, attribute: 'hidden-trailing' }) hiddenTrailing = false
  @property({ type: String }) badge = ''
  @property({ type: String, attribute: 'aria-current', reflect: true }) ariaCurrent: AriaCurrent =
    null

  render() {
    return html`
      <a
        href=${ifDefined(this.disabled ? undefined : this.href)}
        role="menuitem"
        aria-disabled=${ifDefined(this.disabled ? 'true' : undefined)}
        aria-current=${ifDefined(this.ariaCurrent ?? undefined)}
        target=${this.target || nothing}
        rel=${this.target === '_blank' ? 'noopener noreferrer' : nothing}
      >
        ${renderMenuItemContent(this, this.renderAction())}
      </a>
    `
  }

  private renderAction() {
    if (this.badge) {
      return html`
        <span slot="trailing">
          <mm-tag>${this.badge}</mm-tag>
        </span>
      `
    }

    if (this.hiddenTrailing) return html``

    const trailingIcon = this.target === '_blank' ? ICON_NAMES.SHARE : ICON_NAMES.FORWARD

    return html`
      <span slot="trailing">
        <mm-icon name=${trailingIcon} size="small"></mm-icon>
      </span>
    `
  }
}
