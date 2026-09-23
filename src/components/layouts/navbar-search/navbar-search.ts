import { LitElement, css, html, nothing } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { repeat } from 'lit/directives/repeat.js'

import { ICON_NAMES } from '@/components/common'
import '@/components/common'
import '@/components/overlay/sheet'

type PagefindResult = { url: string; meta: { title: string }; excerpt: string }
type Pagefind = {
  search: (q: string) => Promise<{ results: { data: () => Promise<PagefindResult> }[] }>
}

function hasValue(target: EventTarget | null): target is HTMLInputElement | HTMLTextAreaElement {
  return target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement
}

/**
 * navbar 검색 트리거와 검색 시트를 함께 소유하는 컴포넌트.
 * 트리거가 내부에 있어 열기/닫기·query·검색 결과 상태를 모두 스스로 관리한다.
 */
@customElement('mm-navbar-search')
export class NavbarSearch extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
    }
  `
  @state() private isOpen = false
  @state() private query = ''
  @state() private results: PagefindResult[] = []
  @state() private searching = false
  private pagefind: Pagefind | null = null
  private debounceTimer: ReturnType<typeof setTimeout> | null = null
  private searchRequestId = 0

  // 검색 시트는 열릴 때 portal 컨테이너(#portal-root)로 이동하므로 renderRoot가 아닌 document에서 찾는다.
  private getSearchField() {
    return document.querySelector<HTMLElement>('.js-search-sheet mm-searchfield') ?? undefined
  }

  render() {
    return html`
      <mm-icon-button
        icon=${ICON_NAMES.SEARCH}
        aria-label="검색"
        aria-expanded=${this.isOpen ? 'true' : 'false'}
        @click=${this.toggleSearch}
      ></mm-icon-button>

      <mm-sheet
        class="js-search-sheet"
        placement="top"
        style="--backdrop-blur: 2px"
        ?open=${this.isOpen}
        @sheet-close=${this.closeSearch}
      >
        <mm-sheet-header heading="검색"></mm-sheet-header>
        <mm-sheet-body>
          <form role="search" style="display: flex; flex-direction: column; gap: var(--space-2)">
            <mm-searchfield
              placeholder="컴포넌트, 패턴을 검색하세요"
              .value=${this.query}
              @input=${this.handleSearchInput}
            ></mm-searchfield>
            ${this.renderResults()}
          </form>
        </mm-sheet-body>
      </mm-sheet>
    `
  }

  disconnectedCallback() {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer)
      this.debounceTimer = null
    }
    super.disconnectedCallback()
  }

  private async loadPagefind() {
    if (this.pagefind) return
    try {
      // webpack이 번들링하지 않도록 Function constructor로 동적 import
      const dynamicImport = new Function('url', 'return import(url)')
      this.pagefind = (await dynamicImport('/pagefind/pagefind.js')) as Pagefind
    } catch {
      console.warn('Pagefind not available. Run npm run build first.')
    }
  }

  private toggleSearch = () => {
    if (this.isOpen) {
      this.closeSearch()
      return
    }
    this.openSearch()
  }

  private openSearch() {
    this.isOpen = true
    this.loadPagefind()
    requestAnimationFrame(() => {
      this.getSearchField()?.focus()
    })
  }

  private closeSearch = () => {
    this.isOpen = false
    this.resetSearch(true)
  }
  private handleSearchInput = (e: Event) => {
    this.query = this.getInputValue(e)
    if (this.debounceTimer) clearTimeout(this.debounceTimer)
    if (!this.query.trim()) {
      this.resetSearch()
      return
    }
    this.debounceTimer = setTimeout(() => {
      this.debounceTimer = null
      this.search(this.query)
    }, 200)
  }

  private getInputValue(e: Event) {
    const detailValue = e instanceof CustomEvent ? e.detail?.value : undefined
    return detailValue ?? (hasValue(e.target) ? e.target.value : '')
  }

  private resetSearch(clearQuery = false) {
    if (clearQuery) this.query = ''

    this.results = []
    this.searching = false
    this.searchRequestId++
  }

  private async search(query: string) {
    const searchId = ++this.searchRequestId
    const searchQuery = query.trim()
    if (!searchQuery) return

    await this.loadPagefind()
    if (!this.isCurrentSearch(searchId, searchQuery)) return
    if (!this.pagefind) {
      this.searching = false
      return
    }

    this.searching = true
    try {
      const { results } = await this.pagefind.search(searchQuery)
      const data = await Promise.all(results.slice(0, 8).map(r => r.data()))
      if (!this.isCurrentSearch(searchId, searchQuery)) return

      this.results = data
    } finally {
      if (this.isCurrentSearch(searchId, searchQuery)) this.searching = false
    }
  }

  private isCurrentSearch(searchId: number, query: string) {
    return this.isOpen && searchId === this.searchRequestId && this.query.trim() === query
  }

  private renderResults() {
    if (!this.query) return nothing
    if (this.searching) {
      return html`
        <mm-paragraph color="light">검색 중...</mm-paragraph>
      `
    }
    if (this.results.length === 0) {
      return html`
        <mm-paragraph color="light">'${this.query}'에 대한 결과가 없습니다.</mm-paragraph>
      `
    }
    return html`
      <mm-menu-list heading="검색 결과">
        ${repeat(
          this.results,
          result => result.url,
          result => html`
            <mm-menu-item-action
              size="medium"
              icon=${ICON_NAMES.SEARCH}
              label=${result.meta.title || result.url}
              description=${ifDefined(
                result.excerpt ? result.excerpt.replace(/<[^>]*>/g, '') : undefined,
              )}
              @click=${() => this.handleResultClick(result.url)}
            ></mm-menu-item-action>
          `,
        )}
      </mm-menu-list>
    `
  }

  private handleResultClick(url: string) {
    window.location.href = url
  }
}
