import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/overlay/popover/semantics/select'

type SortOrder = 'latest' | 'oldest'

const SORT_OPTIONS = [
  { label: '최신순', value: 'latest' },
  { label: '오래된순', value: 'oldest' },
] as const

@customElement('mm-sort-selector')
export class SortSelector extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
    }
  `

  @property({ type: String }) value: SortOrder = 'latest'

  render() {
    return html`
      <mm-select .value=${this.value} @change=${this.handleSelectChange}>
        ${SORT_OPTIONS.map(
          option => html`
            <option value=${option.value}>${option.label}</option>
          `,
        )}
      </mm-select>
    `
  }

  // select가 트리거 라벨을 스스로 소유하므로, 여기서는 외부에 노출하는 value 프로퍼티만 동기화한다.
  private handleSelectChange(e: CustomEvent) {
    this.value = e.detail.value as SortOrder
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-sort-selector': SortSelector
  }
}
