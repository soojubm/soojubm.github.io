import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/common/icon/icon'
import type { IconName } from '@/components/common/icon/icon-names'

import { menuItemStyles } from '@/components/common/menu-item/menu-item.styles'
import {
  renderMenuItemContent,
  withMenuItemPresentation,
} from '@/components/common/menu-item/menu-item.utils'
import { resetStyles } from '@/stylesheets/shared.styles'

@customElement('mm-menu-item-action')
export class MenuItemAction extends withMenuItemPresentation(LitElement) {
  static styles = [resetStyles, menuItemStyles]
  @property({ type: String, attribute: 'trailing-icon' }) trailingIcon?: IconName
  @property({ type: Boolean }) disabled = false

  render() {
    return html`
      <button type="button" role="menuitem" ?disabled=${this.disabled}>
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
