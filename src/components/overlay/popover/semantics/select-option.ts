import { LitElement, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { menuItemStyles } from '@/components/common/menu-item/menu-item.styles'
import {
  renderMenuItemContent,
  renderMenuItemRow,
  withMenuItemPresentation,
} from '@/components/common/menu-item/menu-item.utils'
import { emit } from '@/utils'

/**
 * listbox 항목. mm-menu-item-action(role=menuitem)과 달리 선택 상태를 유지하는 role=option을 소유한다.
 * menu-item 계열의 공유 스타일·행 조립을 재사용하되 semantics만 별도로 가진다.
 */
@customElement('mm-select-option')
export class SelectOption extends withMenuItemPresentation(LitElement) {
  static styles = [menuItemStyles]

  @property({ type: Boolean }) disabled = false
  @property({ type: Boolean }) selected = false
  @property({ type: String }) value = ''

  render() {
    return renderMenuItemRow(
      {
        role: 'option',
        disabled: this.disabled,
        ariaSelected: this.selected ? 'true' : 'false',
        onActivate: this.activate,
      },
      renderMenuItemContent(this, nothing),
    )
  }

  private activate = () => {
    if (this.disabled) return
    emit(this, 'input', { value: this.value })
  }
}

export default SelectOption
