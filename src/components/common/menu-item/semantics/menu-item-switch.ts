import { css, LitElement, html } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import type { MenuItemGroup } from '@/components/common/menu-item/menu-item-group'

import { menuItemStyles } from '@/components/common/menu-item/menu-item.styles'
import {
  activateOnKeydown,
  renderMenuItemContent,
  withMenuItemPresentation,
  withMenuItemToggleState,
} from '@/components/common/menu-item/menu-item.utils'
import '@/components/common/switch'

@customElement('mm-menu-item-switch')
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
    const group = this.closest<MenuItemGroup>('mm-menu-item-group')
    this.rowRole = group?.role === 'menu' ? 'menuitemcheckbox' : 'switch'
  }

  render() {
    return html`
      <div
        role=${this.rowRole}
        tabindex=${this.disabled ? '-1' : '0'}
        aria-checked=${this.checked}
        aria-disabled=${ifDefined(this.disabled ? 'true' : undefined)}
        @click=${this.activate}
        @keydown=${this.handleRowKeydown}
      >
        ${renderMenuItemContent(this, this.renderAction())}
      </div>
    `
  }

  private handleRowKeydown = (event: KeyboardEvent) => activateOnKeydown(event, this.activate)

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
