import { LitElement, css, html, nothing } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { keyed } from 'lit/directives/keyed.js'

import type { FilterOption } from '@/components/common'

import '@/components/common'
import '@/components/domains/media-card/media-card'
import '@/components/domains/media-card/media-filter'

const PAGE_SIZE = 60

/** films·books가 공유하는 목록 항목. */
export interface MediaItem {
  releasedate: number
  titlekorean: string
  titleenglish: string
  director: string
  country: string
  etc: string
}

export interface MediaListFilter {
  label: string
  options: FilterOption[]
  /** 항목이 고른 값에 해당하는지 판정한다. 값을 고르지 않았을 때는 부르지 않는다. */
  matches: (item: MediaItem, value: string) => boolean
}

@customElement('fff-media-list')
export class MediaList extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--space-4);
    }

    div {
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
    }
  `
  @property({ attribute: false }) items: MediaItem[] = []
  @property({ attribute: false }) filters: MediaListFilter[] = []
  /** 개수 뒤에 붙는 단위(편·권 등) */
  @property({ type: String }) unit = ''
  @state() private selections: string[] = []
  @state() private visibleCount = PAGE_SIZE

  render() {
    if (!this.items.length) return nothing

    const items = this.getFilteredItems()

    return html`
      ${this.renderFilters()} ${this.renderCount(items.length)} ${this.renderCards(items)}
      ${this.renderShowMore(items.length)}
    `
  }

  protected willUpdate(changedProperties: Map<string, unknown>) {
    if (!changedProperties.has('items') && !changedProperties.has('filters')) return

    this.selections = []
    this.visibleCount = PAGE_SIZE
  }

  private getFilteredItems() {
    return this.items.filter(item =>
      this.filters.every((filter, index) => {
        const selected = this.selections[index]
        return !selected || filter.matches(item, selected)
      }),
    )
  }

  // 필터 구성이 바뀌면 이전 선택을 품은 그룹을 버리고 새로 만든다.
  private renderFilters() {
    if (!this.filters.length) return nothing

    return keyed(
      this.filters,
      html`
        <div>${this.filters.map((filter, index) => this.renderFilter(filter, index))}</div>
      `,
    )
  }

  private renderFilter(filter: MediaListFilter, index: number) {
    return html`
      <fff-media-filter
        label=${filter.label}
        .options=${filter.options}
        @change=${(e: CustomEvent<{ values: string[] }>) => this.handleFilterChange(index, e)}
      ></fff-media-filter>
    `
  }

  private renderCount(total: number) {
    return html`
      <fff-paragraph size="small" color="light">${total} ${this.unit}</fff-paragraph>
    `
  }

  private renderCards(items: MediaItem[]) {
    return html`
      <fff-flex gap="3" wrap="wrap">
        ${items.slice(0, this.visibleCount).map(item => this.renderCard(item))}
      </fff-flex>
    `
  }

  private renderCard(item: MediaItem) {
    return html`
      <fff-media-card
        title=${item.titlekorean}
        subtitle=${item.titleenglish}
        director=${item.director}
        country=${item.country ?? ''}
        year=${item.releasedate ?? ''}
      ></fff-media-card>
    `
  }

  private renderShowMore(total: number) {
    if (this.visibleCount >= total) return nothing

    return html`
      <fff-show-more-button @click=${this.handleShowMoreClick}></fff-show-more-button>
    `
  }

  private handleFilterChange(index: number, e: CustomEvent<{ values: string[] }>) {
    e.stopPropagation()

    const selections = [...this.selections]
    selections[index] = e.detail.values[0] ?? ''
    this.selections = selections
    this.visibleCount = PAGE_SIZE
  }

  private handleShowMoreClick() {
    this.visibleCount += PAGE_SIZE
  }
}
