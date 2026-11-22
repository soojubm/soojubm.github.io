import { css, LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import { menuItemStyles } from '@/components/common/menu-item/menu-item.styles'
import {
  activateOnKeydown,
  renderMenuItemContent,
  withMenuItemPresentation,
  withMenuItemToggleState,
} from '@/components/common/menu-item/menu-item.utils'
import '@/components/common/checkbox'

@customElement('mm-menu-item-checkbox')
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
    return html`
      <div
        role="checkbox"
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
