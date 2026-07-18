import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'

import { menuItemStyles } from '@/components/menuitem/menuitem.styles'
import {
  renderMenuItemToggleRow,
  withMenuItemPresentation,
  withMenuItemToggleState,
} from '@/components/menuitem/menuitem.utils'

@customElement('mm-menu-item-checkbox')
export class MenuItemCheckbox extends withMenuItemToggleState(
  withMenuItemPresentation(LitElement),
) {
  static styles = [menuItemStyles]

  render() {
    return renderMenuItemToggleRow(this, this.renderAction())
  }

  private renderAction() {
    // 행(row)이 role·상태·상호작용을 소유하므로 내부 컨트롤은 시각 표시 전용(inert)이다.
    return html`
      <mm-checkbox
        slot="trailing"
        inert
        aria-hidden="true"
        .checked=${this.checked}
        ?disabled=${this.disabled}
      ></mm-checkbox>
    `
  }
}

export default MenuItemCheckbox
