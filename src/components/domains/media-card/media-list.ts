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

/**
 * 감상 기록 목록. 필터로 좁힌 항목의 개수와 카드 격자를 보여주고, 한 번에 보이는 양을 넘으면 더 불러오는 버튼을 둔다.
 * 필터 선택과 보이는 양을 스스로 소유하므로, 소비자는 items와 filters만 넘긴다.
 * 필터 구성이 바뀌면 선택을 비우고 처음 양부터 다시 보여준다.
 */
@customElement('mm-media-list')
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
      <mm-media-filter
        label=${filter.label}
        .options=${filter.options}
        @change=${(e: CustomEvent<{ values: string[] }>) => this.handleFilterChange(index, e)}
      ></mm-media-filter>
    `
  }

  private renderCount(total: number) {
    return html`
      <mm-paragraph size="small" color="light">${total} ${this.unit}</mm-paragraph>
    `
  }

  private renderCards(items: MediaItem[]) {
    return html`
      <mm-grid column-min-width="220px" gap="3">
        ${items.slice(0, this.visibleCount).map(item => this.renderCard(item))}
      </mm-grid>
    `
  }

  private renderCard(item: MediaItem) {
    return html`
      <mm-media-card
        title=${item.titlekorean}
        subtitle=${item.titleenglish}
        director=${item.director}
        country=${item.country ?? ''}
        year=${item.releasedate ?? ''}
      ></mm-media-card>
    `
  }

  private renderShowMore(total: number) {
    if (this.visibleCount >= total) return nothing

    return html`
      <mm-show-more-button @click=${this.handleShowMoreClick}></mm-show-more-button>
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
