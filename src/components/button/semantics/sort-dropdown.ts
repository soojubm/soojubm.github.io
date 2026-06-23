import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import '../../dropdown/dropdown'

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

  private handleChange(e: CustomEvent) {
    e.stopPropagation()

    const next = e.detail.value as SortOrder
    this.value = next

    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { value: next },
        bubbles: true,
        composed: true,
      }),
    )
  }

  render() {
    return html`
      <mm-dropdown .value=${this.value} @change=${this.handleChange}>
        ${SORT_OPTIONS.map(
          opt => html`
            <option value=${opt.value} ?selected=${this.value === opt.value}>${opt.label}</option>
          `,
        )}
      </mm-dropdown>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-sort-dropdown': SortDropdown
  }
}
