import { css, LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import { menuItemStyles } from '@/components/common/menu-item/menu-item.styles'
import {
  activateOnKeydown,
  renderMenuItemContent,
  withMenuItemPresentation,
} from '@/components/common/menu-item/menu-item.utils'
import { emit } from '@/utils'
import '@/components/common/radio'

@customElement('mm-menu-item-radio')
export class MenuItemRadio extends withMenuItemPresentation(LitElement) {
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
  @property({ type: Boolean }) disabled = false
  @property({ type: Boolean }) checked = false
  @property({ type: String }) value = ''
  @property({ type: String }) name = ''

  // menu 밖(radiogroup)에서 쓰이므로 menuitemradio가 아니라 radio로 둔다.
  render() {
    return html`
      <div
        role="radio"
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

  private activate = () => {
    if (this.disabled) return
    if (this.checked) return
    this.checked = true
    emit(this, 'change', { checked: this.checked, value: this.value, name: this.name })
  }

  private handleRowKeydown = (event: KeyboardEvent) => activateOnKeydown(event, this.activate)

  private renderAction() {
    // 행(row)이 role·상태·상호작용을 소유하므로 내부 컨트롤은 시각 표시 전용(inert)이다.
    return html`
      <mm-radio
        slot="trailing"
        inert
        aria-hidden="true"
        .checked=${this.checked}
        ?disabled=${this.disabled}
      ></mm-radio>
    `
  }
}
