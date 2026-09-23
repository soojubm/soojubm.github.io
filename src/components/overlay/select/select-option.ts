import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import { menuItemStyles } from '@/components/common/menu-item/menu-item.styles'
import {
  renderMenuItemContent,
  withMenuItemPresentation,
} from '@/components/common/menu-item/menu-item.utils'
import { emit } from '@/utils'

/**
 * mm-select-listbox의 항목. 선택 상태를 유지하는 role=option을 소유한다.
 * menu-item 계열과 행 스킨·콘텐츠만 나눠 쓰고, 포커스 순회는 listbox가 맡는다.
 */
@customElement('mm-select-option')
export class SelectOption extends withMenuItemPresentation(LitElement) {
  static styles = [menuItemStyles]
  @property({ type: Boolean }) disabled = false
  @property({ type: Boolean }) selected = false
  @property({ type: String }) value = ''

  render() {
    return html`
      <div
        role="option"
        aria-selected=${this.selected ? 'true' : 'false'}
        aria-disabled=${ifDefined(this.disabled ? 'true' : undefined)}
        @click=${this.activate}
        @keydown=${this.handleRowKeydown}
      >
        ${renderMenuItemContent(this, nothing)}
      </div>
    `
  }

  private handleRowKeydown(event: KeyboardEvent) {
    if (event.key !== 'Enter' && event.key !== ' ') return

    event.preventDefault()
    this.activate()
  }

  private activate = () => {
    if (this.disabled) return
    emit(this, 'input', { value: this.value })
  }
}
