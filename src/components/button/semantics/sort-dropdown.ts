import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/button/button'
import '@/components/dropdown/dropdown'
import { emit } from '@/utils/emit'

type SortOrder = 'latest' | 'oldest'

const SORT_OPTIONS = [
  { label: '최신순', value: 'latest' },
  { label: '오래된순', value: 'oldest' },
] as const

@customElement('mm-sort-dropdown')
export class SortDropdown extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
    }
  `

  @property({ type: String }) value: SortOrder = 'latest'

  render() {
    return html`
      <mm-dropdown .value=${this.value} @change=${this.handleChange}>
        <mm-button slot="trigger" size="small">${this.selectedLabel}</mm-button>
        ${this.renderSortOptions()}
      </mm-dropdown>
    `
  }

  private renderSortOptions() {
    return SORT_OPTIONS.map(option => this.renderOption(option))
  }

  private renderOption(option: typeof SORT_OPTIONS[number]) {
    return html`
      <option value=${option.value} ?selected=${this.value === option.value}>
        ${option.label}
      </option>
    `
  }

  private get selectedLabel() {
    return SORT_OPTIONS.find(opt => opt.value === this.value)?.label ?? SORT_OPTIONS[0].label
  }

  private handleChange(e: CustomEvent) {
    e.stopPropagation()

    const next = e.detail.value as SortOrder
    this.value = next

    emit(this, 'change', { value: next })
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-sort-dropdown': SortDropdown
  }
}
