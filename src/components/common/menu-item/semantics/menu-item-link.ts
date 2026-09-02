import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import type { AriaCurrent } from '@/types'

import '@/components/common/icon/icon'
import { ICON_NAMES } from '@/components/common/icon-button/semantics/icon-names'
import { menuItemStyles } from '@/components/common/menu-item/menu-item.styles'
import {
  renderMenuItemContent,
  withMenuItemPresentation,
} from '@/components/common/menu-item/menu-item.utils'

@customElement('mm-menu-item-link')
export class MenuItemLink extends withMenuItemPresentation(LitElement) {
  static styles = [menuItemStyles]

  @property({ type: Boolean }) disabled = false
  @property({ type: String }) href = ''
  @property({ type: String }) target = '_blank'
  @property({ type: Boolean, attribute: 'hidden-trailing' }) hiddenTrailing = false
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
        ${renderMenuItemContent(this, this.renderTrailing())}
      </a>
    `
  }

  private renderTrailing() {
    return html`
      <slot name="trailing" slot="trailing">${this.renderDefaultTrailing()}</slot>
    `
  }

  private renderDefaultTrailing() {
    if (this.hiddenTrailing) return nothing

    const name = this.target === '_blank' ? ICON_NAMES.SHARE : ICON_NAMES.FORWARD

    return html`
      <mm-icon name=${name} size="small"></mm-icon>
    `
  }
}
