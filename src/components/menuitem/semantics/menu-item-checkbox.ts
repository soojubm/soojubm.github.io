import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { IconName } from '@/components/icon-button/semantics/icon-names'

import { menuItemStyles } from '@/components/menuitem/menuitem.styles'
import { renderMenuItemContent, renderMenuItemRow } from '@/components/menuitem/menuitem.utils'
import { ToggleController } from '@/controllers/toggle-controller'
import { emit } from '@/utils/emit'

@customElement('mm-menu-item-checkbox')
export class MenuItemCheckbox extends LitElement {
  static styles = [menuItemStyles]

  @property({ type: String, reflect: true }) size = 'medium'
  @property({ type: String, reflect: true }) tone = ''
  @property({ type: String }) label = ''
  @property({ type: String }) description = ''
  @property({ type: String }) icon?: IconName
  @property({ type: String }) emoji = ''
  @property({ type: String, attribute: 'avatar-src' }) avatarSrc = ''
  @property({ type: String, attribute: 'avatar-variant' }) avatarVariant = 'tertiary'
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
