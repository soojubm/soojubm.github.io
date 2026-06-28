import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { AriaTriState } from '@/types/aria'

import { buttonBaseStyles, buttonSelectedStyles } from '@/components/button/button.styles'
import { ICON_NAMES } from '@/components/icon-button/semantics/icon-names'
import { emit } from '@/utils/emit'
import '@/components/icon/icon'

/**
 * 콘텐츠 필터링 옵션 버튼. 선택 시 체크 아이콘을 표시하고 selected 상태를 반영합니다.
 */
@customElement('mm-filter-button')
export class FilterButton extends LitElement {
  static styles = [buttonBaseStyles, buttonSelectedStyles]

  @property({ type: String }) value = ''
  @property({ type: Boolean, reflect: true }) selected = false
  @property({ type: String }) mode: 'single' | 'multiple' = 'single'
  @property({ type: Boolean, attribute: 'select-all' }) selectAll = false
  @property({ type: Boolean }) disabled = false

  render() {
    const ariaChecked: AriaTriState = this.selected ? 'true' : 'false'

    return html`
      <button
        type="button"
        ?disabled=${this.disabled}
        role=${this.mode === 'multiple' ? 'checkbox' : 'radio'}
        aria-checked=${ariaChecked}
        @click=${this.handleClick}
      >
        ${this.renderCheckIcon()}
        <slot></slot>
      </button>
    `
  }

  private renderCheckIcon() {
    if (!this.selected) return nothing

    return html`
      <mm-icon name=${ICON_NAMES.CHECK}></mm-icon>
    `
  }

  private handleClick() {
    if (this.disabled) return
    emit(this, 'filter-toggle', {
      value: this.value,
      selected: !this.selected,
      selectAll: this.selectAll,
    })
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-filter-button': FilterButton
  }
}
