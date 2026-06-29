import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { IconName } from '@/components/icon-button/semantics/icon-names'
import type { AriaTriState } from '@/types/aria'

import { menuItemStyles } from '@/components/menuitem/menuitem.styles'
import { renderMenuItemContent } from '@/components/menuitem/menuitem.utils'
import { emit } from '@/utils/emit'

@customElement('mm-menu-item-switch')
export class MenuItemSwitch extends LitElement {
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

  render() {
    const ariaChecked: AriaTriState = this.checked ? 'true' : 'false'

    return html`
      <div
        role="menuitemcheckbox"
        data-interactive
        tabindex=${this.disabled ? '-1' : '0'}
        aria-disabled=${this.disabled ? 'true' : nothing}
        aria-checked=${ariaChecked}
        @click=${this.handleRowClick}
        @keydown=${this.handleRowKeydown}
      >
        ${renderMenuItemContent(this, this.renderAction())}
      </div>
    `
  }

  private commitChecked(checked: boolean) {
    if (this.disabled) return
    this.checked = checked
    emit(this, 'change', { checked: this.checked, value: this.value })
  }

  private handleRowClick = () => {
    this.commitChecked(!this.checked)
  }

  private handleRowKeydown = (event: KeyboardEvent) => {
    if (event.key !== 'Enter' && event.key !== ' ') return
    event.preventDefault()
    this.handleRowClick()
  }

  protected handleControlChange = (e: Event) => {
    e.stopPropagation()
    const { checked } = (e as CustomEvent<{ checked: boolean }>).detail
    this.commitChecked(checked)
  }

  private renderAction() {
    return html`
      <mm-switch
        slot="trailing"
        .checked=${this.checked}
        ?disabled=${this.disabled}
        @change=${this.handleControlChange}
      ></mm-switch>
    `
  }
}

export default MenuItemSwitch
