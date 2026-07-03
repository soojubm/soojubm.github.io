import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { IconName } from '@/components/icon-button/semantics/icon-names'

import { menuItemStyles } from '@/components/menuitem/menuitem.styles'
import { renderMenuItemContent, renderMenuItemRow } from '@/components/menuitem/menuitem.utils'
import { emit } from '@/utils/emit'

@customElement('mm-menu-item-radio')
export class MenuItemRadio extends LitElement {
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
  @property({ type: String }) name = ''

  render() {
    return renderMenuItemRow(
      {
        role: 'menuitemradio',
        disabled: this.disabled,
        ariaChecked: this.checked ? 'true' : 'false',
        onActivate: this.activate,
      },
      renderMenuItemContent(this, this.renderAction()),
    )
  }

  private activate = () => {
    if (this.disabled) return
    if (this.checked) return
    this.checked = true
    emit(this, 'change', { checked: this.checked, value: this.value, name: this.name })
  }

  private renderAction() {
    // 행(row)이 role·상태·상호작용을 소유하므로 내부 컨트롤은 시각 표시 전용(inert)이다.
    return html`
      <mm-radio
        slot="trailing"
        inert
        aria-hidden="true"
        .name=${this.name}
        .value=${this.value}
        .checked=${this.checked}
        ?disabled=${this.disabled}
      ></mm-radio>
    `
  }
}

export default MenuItemRadio
