import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'

import { menuItemStyles } from '@/components/common/menu-item/menu-item.styles'
import {
  renderMenuItemToggleRow,
  withMenuItemPresentation,
  withMenuItemToggleState,
} from '@/components/common/menu-item/menu-item.utils'
import '@/components/common/checkbox'

@customElement('mm-menu-item-checkbox')
export class MenuItemCheckbox extends withMenuItemToggleState(
  withMenuItemPresentation(LitElement),
) {
  static styles = [menuItemStyles]

  // menu 밖(체크 그룹)에서 쓰이므로 menuitemcheckbox가 아니라 checkbox로 둔다.
  render() {
    return renderMenuItemToggleRow(this, 'checkbox', this.renderAction())
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
