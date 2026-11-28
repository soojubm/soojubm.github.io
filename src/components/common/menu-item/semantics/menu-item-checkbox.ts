import { css, LitElement } from 'lit'
import { customElement } from 'lit/decorators.js'
import { literal } from 'lit/static-html.js'

import { menuItemStyles } from '@/components/common/menu-item/menu-item.styles'
import {
  renderMenuItemCheckedRow,
  withMenuItemPresentation,
  withMenuItemToggleState,
} from '@/components/common/menu-item/menu-item.utils'
import '@/components/common/checkbox'

@customElement('fff-menu-item-checkbox')
export class MenuItemCheckbox extends withMenuItemToggleState(
  withMenuItemPresentation(LitElement),
) {
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

  // menu 밖(체크 그룹)에서 쓰이므로 menuitemcheckbox가 아니라 checkbox로 둔다.
  render() {
    return renderMenuItemCheckedRow(this, {
      role: 'checkbox',
      control: literal`fff-checkbox`,
      activate: this.activate,
    })
  }
}
