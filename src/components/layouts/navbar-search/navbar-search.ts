import { LitElement, css, html, nothing } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { createRef, ref } from 'lit/directives/ref.js'

import { ICON_NAMES } from '@/components/common'
import '@/components/common'
import '@/components/domains/search/search-result-list'
import '@/components/overlay/sheet'
import { PagefindSearchController } from '@/controllers/pagefind-search-controller'

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
  private search = new PagefindSearchController(this, { isActive: () => this.isOpen })
  // 검색 시트는 열릴 때 portal 컨테이너로 이동하지만 엘리먼트는 그대로라 ref로 붙잡는다.
  private searchField = createRef<HTMLElement>()

  render() {
    return html`
      <mm-icon-button
        icon=${ICON_NAMES.SEARCH}
        aria-label="검색"
        aria-expanded=${this.isOpen ? 'true' : 'false'}
        @click=${this.handleSearchButtonClick}
      ></mm-icon-button>

      <mm-sheet
        placement="top"
        style="--backdrop-blur: 2px"
        ?open=${this.isOpen}
        @toggle=${this.handleSheetToggle}
      >
        <mm-sheet-header heading="검색"></mm-sheet-header>
        <mm-sheet-body>
          <form role="search" style="display: flex; flex-direction: column; gap: var(--space-2)">
            <mm-searchfield
              ${ref(this.searchField)}
              placeholder="컴포넌트, 패턴을 검색하세요"
              .value=${this.search.query}
              @input=${this.handleSearchInput}
            ></mm-searchfield>
            ${this.renderResults()}
          </form>
        </mm-sheet-body>
      </mm-sheet>
    `
  }

  private handleSearchButtonClick = () => {
    if (this.isOpen) {
      this.closeSearch()
      return
    }
    this.openSearch()
  }

  private openSearch() {
    this.isOpen = true
    this.search.load()
    requestAnimationFrame(() => {
      this.searchField.value?.focus()
    })
  }

  private closeSearch = () => {
    this.isOpen = false
    this.search.reset(true)
  }
  // 시트가 배경·ESC·닫기 버튼으로 스스로 닫힌 경우만 받는다. 직접 닫은 경우는 이미 정리했다.
  private handleSheetToggle = (e: CustomEvent<{ open: boolean }>) => {
    if (e.detail.open || !this.isOpen) return

    this.closeSearch()
  }
  private handleSearchInput = (e: Event) => {
    this.search.setQuery(this.getInputValue(e))
  }

  private getInputValue(e: Event) {
    const detailValue = e instanceof CustomEvent ? e.detail?.value : undefined
    return detailValue ?? (hasValue(e.target) ? e.target.value : '')
  }

  private renderResults() {
    if (!this.search.query) return nothing
    if (this.search.searching) {
      return html`
        <mm-paragraph color="light">검색 중...</mm-paragraph>
      `
    }
    if (this.search.results.length === 0) {
      return html`
        <mm-paragraph color="light">'${this.search.query}'에 대한 결과가 없습니다.</mm-paragraph>
      `
    }
    return html`
      <mm-search-result-list
        heading="검색 결과"
        .results=${this.search.results}
      ></mm-search-result-list>
    `
  }
}
