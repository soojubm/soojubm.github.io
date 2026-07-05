import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/button/button'
import '@/components/popover/semantics/select'

type SortOrder = 'latest' | 'oldest'

const SORT_OPTIONS = [
  { label: '최신순', value: 'latest' },
  { label: '오래된순', value: 'oldest' },
] as const

@customElement('mm-sort-picker')
export class SortPicker extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
    }
  `

  @property({ type: String }) value: SortOrder = 'latest'

  render() {
    return html`
      <mm-select .value=${this.value} @change=${this.syncValue}>
        <mm-button slot="trigger" size="small">${this.selectedLabel}</mm-button>
        ${SORT_OPTIONS.map(
          option => html`
            <option value=${option.value}>${option.label}</option>
          `,
        )}
      </mm-select>
    `
  }

  private get selectedLabel() {
    return SORT_OPTIONS.find(option => option.value === this.value)?.label ?? SORT_OPTIONS[0].label
  }

  // select의 change는 이미 bubble/composed로 호스트까지 올라오므로 재발행하지 않고,
  // 트리거 라벨을 다시 그리기 위해 선택값만 반영한다.
  private syncValue(e: CustomEvent) {
    this.value = e.detail.value as SortOrder
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-sort-picker': SortPicker
  }
}
