import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import '@/components/common/icon/icon'
import type { IconName } from '@/components/common/icon-button/semantics/icon-names'
import type { AriaCurrent } from '@/types'

import { menuItemStyles } from '@/components/common/menu-item/menu-item.styles'
import {
  renderMenuItemContent,
  withMenuItemPresentation,
} from '@/components/common/menu-item/menu-item.utils'

@customElement('mm-menu-item-action')
export class MenuItemAction extends withMenuItemPresentation(LitElement) {
  static styles = [menuItemStyles]

  @property({ type: String, attribute: 'trailing-icon' }) trailingIcon?: IconName
  @property({ type: Boolean }) disabled = false
  @property({ type: String }) role: 'menuitem' | 'menuitemcheckbox' | 'menuitemradio' | 'option' =
    'menuitem'
  @property({ type: String, attribute: 'aria-current', reflect: true })
  ariaCurrent: AriaCurrent = null

  render() {
    return html`
      <button
        type="button"
        role=${this.role}
        ?disabled=${this.disabled}
        aria-current=${ifDefined(this.ariaCurrent ?? undefined)}
      >
        ${renderMenuItemContent(this, this.renderTrailing())}
      </button>
    `
  }

  private renderTrailing() {
    if (!this.trailingIcon) {
      return html`
        <slot name="trailing" slot="trailing"></slot>
      `
    }

    return html`
      <mm-icon slot="trailing" name=${this.trailingIcon}></mm-icon>
    `
  }
}

export default MenuItemAction
