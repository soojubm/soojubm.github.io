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
        ${SORT_OPTIONS.map(
          opt => html`
            <option value=${opt.value} ?selected=${this.value === opt.value}>${opt.label}</option>
          `,
        )}
      </mm-dropdown>
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
