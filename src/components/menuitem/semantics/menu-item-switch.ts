import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { menuItemStyles } from '@/components/menuitem/menuitem.styles'
import {
  renderMenuItemContent,
  renderMenuItemRow,
  withMenuItemPresentation,
} from '@/components/menuitem/menuitem.utils'
import { ToggleController } from '@/controllers/toggle-controller'
import { emit } from '@/utils/emit'

@customElement('mm-menu-item-switch')
export class MenuItemSwitch extends withMenuItemPresentation(LitElement) {
  static styles = [menuItemStyles]

  @property({ type: Boolean }) disabled = false
  @property({ type: Boolean }) checked = false
  @property({ type: String }) value = ''

  private toggle = new ToggleController(this, {
    getValue: () => this.checked,
    setValue: checked => {
      this.checked = checked
    },
    isDisabled: () => this.disabled,
  })

  render() {
    return renderMenuItemRow(
      {
        role: 'menuitemcheckbox',
        disabled: this.disabled,
        ariaChecked: this.checked ? 'true' : 'false',
        onActivate: this.activate,
      },
      renderMenuItemContent(this, this.renderAction()),
    )
  }

  private commitChecked(checked: boolean) {
    if (!this.toggle.set(checked)) return

    emit(this, 'change', { checked: this.checked, value: this.value })
  }

  private activate = () => {
    this.commitChecked(!this.checked)
  }

  private renderAction() {
    // 행(row)이 role·상태·상호작용을 소유하므로 내부 컨트롤은 시각 표시 전용(inert)이다.
    return html`
      <mm-switch
        slot="trailing"
        inert
        aria-hidden="true"
        .checked=${this.checked}
        ?disabled=${this.disabled}
      ></mm-switch>
    `
  }
}

export default MenuItemSwitch
