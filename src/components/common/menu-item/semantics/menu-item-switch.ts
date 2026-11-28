import { css, LitElement } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { literal } from 'lit/static-html.js'

import type { MenuItemGroup } from '@/components/common/menu-item/menu-item-group'

import { menuItemStyles } from '@/components/common/menu-item/menu-item.styles'
import {
  renderMenuItemCheckedRow,
  withMenuItemPresentation,
  withMenuItemToggleState,
} from '@/components/common/menu-item/menu-item.utils'
import '@/components/common/switch'

@customElement('fff-menu-item-switch')
export class MenuItemSwitch extends withMenuItemToggleState(withMenuItemPresentation(LitElement)) {
  static styles = [
    css`
      :host {
        display: block;
      }

      div[role] {
        ${menuItemStyles}
      }
    `,
  ]
  @state() private rowRole: 'menuitemcheckbox' | 'switch' = 'switch'

  connectedCallback() {
    super.connectedCallback()
    const group = this.closest<MenuItemGroup>('fff-menu-item-group')
    this.rowRole = group?.role === 'menu' ? 'menuitemcheckbox' : 'switch'
  }

  render() {
    return renderMenuItemCheckedRow(this, {
      role: this.rowRole,
      control: literal`fff-switch`,
      activate: this.activate,
    })
  }
}
