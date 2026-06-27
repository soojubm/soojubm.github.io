import { LitElement, html, nothing } from 'lit'
import { customElement, query, state } from 'lit/decorators.js'
import { repeat } from 'lit/directives/repeat.js'
import { ICON_NAMES } from '@/components/icon-button/semantics/icon-names'
import soojubmImage from '@/images/soojubm.png'
import type Sheet from '@/components/sheet/sheet'

type PagefindResult = { url: string; meta: { title: string }; excerpt: string }
type Pagefind = {
  search: (q: string) => Promise<{ results: { data: () => Promise<PagefindResult> }[] }>
}

@customElement('mm-navbar')
export class Navbar extends LitElement {
  @state() private _searchOpen = false
  @state() private _query = ''
  @state() private _results: PagefindResult[] = []
  @state() private _searching = false

  private _pagefind: Pagefind | null = null
  private _debounceTimer: ReturnType<typeof setTimeout> | null = null

  @query('.js-search-sheet') private _searchSheet?: Sheet
  @query('.js-search-sheet mm-searchfield') private _searchField?: HTMLElement

  // 전역 navbar.css와 body의 메뉴 상태 선택자가 내부 구조에 접근해야 하므로 Light DOM을 유지한다.
  createRenderRoot() {
    return this
  }

  disconnectedCallback() {
    if (this._debounceTimer) {
      clearTimeout(this._debounceTimer)
      this._debounceTimer = null
    }
    super.disconnectedCallback()
  }

  private async _loadPagefind() {
    if (this._pagefind) return
    try {
      // webpack이 번들링하지 않도록 Function constructor로 동적 import
      const dynamicImport = new Function('url', 'return import(url)')
      this._pagefind = (await dynamicImport('/pagefind/pagefind.js')) as Pagefind
    } catch {
      console.warn('Pagefind not available. Run npm run build first.')
    }
  }

  private _toggleSearch() {
    this._searchOpen = !this._searchOpen
    if (this._searchSheet) this._searchOpen ? this._searchSheet.open() : this._searchSheet.close()
    if (this._searchOpen) {
      this._loadPagefind()
      requestAnimationFrame(() => {
        this._searchField?.focus()
      })
    } else {
      this._query = ''
      this._results = []
    }
  }

  private _onInput(e: Event) {
    this._query = (e as CustomEvent).detail?.value ?? (e.target as any)?.value ?? ''
    if (this._debounceTimer) clearTimeout(this._debounceTimer)
    if (!this._query.trim()) {
      this._results = []
      return
    }
    this._debounceTimer = setTimeout(() => {
      this._debounceTimer = null
      this._search(this._query)
    }, 200)
  }

  private async _search(query: string) {
    await this._loadPagefind()
    if (!this._pagefind) return
    this._searching = true
    try {
      const { results } = await this._pagefind.search(query)
      const data = await Promise.all(results.slice(0, 8).map(r => r.data()))
      this._results = data
    } finally {
      this._searching = false
    }
  }

  private _renderDefault() {
    return html`
      <mm-search-suggestions bleed="var(--space-4)" fade aria-label="추천 검색어">
        <mm-search-suggestion>아파트열쇠를빌려드립니다</mm-search-suggestion>
        <mm-search-suggestion>로얄테넌바움</mm-search-suggestion>
        <mm-search-suggestion>소매치기</mm-search-suggestion>
        <mm-search-suggestion>이탈리아여행</mm-search-suggestion>
        <mm-search-suggestion>고슴도치</mm-search-suggestion>
        <mm-search-suggestion>고슴도치</mm-search-suggestion>
      </mm-search-suggestions>

      <mm-menu-item-group aria-label="최근 검색">
        <mm-paragraph color="light">최근 검색</mm-paragraph>
        <mm-menu-item-action label="고슴이" emoji="🦔"></mm-menu-item-action>
        <mm-menu-item-action label="개구리" emoji="🐸"></mm-menu-item-action>
      </mm-menu-item-group>
    `
  }

  private _renderResults() {
    if (this._searching) {
      return html`
        <mm-paragraph color="light">검색 중...</mm-paragraph>
      `
    }
    if (this._results.length === 0) {
      return html`
        <mm-paragraph color="light">'${this._query}'에 대한 결과가 없습니다.</mm-paragraph>
      `
    }
    return html`
      <mm-menu-item-group aria-label="검색 결과">
        <mm-paragraph color="light">검색 결과</mm-paragraph>
        ${repeat(
          this._results,
          result => result.url,
          result => html`
            <mm-menu-item-action
              icon=${ICON_NAMES.SEARCH}
              label=${result.meta.title || result.url}
              description=${result.excerpt ? result.excerpt.replace(/<[^>]*>/g, '') : nothing}
              @click=${() => this._handleResultClick(result.url)}
            ></mm-menu-item-action>
          `,
        )}
      </mm-menu-item-group>
    `
  }

  private _handleResultClick(url: string) {
    window.location.href = url
  }

  render() {
    return html`
      <nav class="navbar js-navbar" role="navigation">
        <mm-flex gap="2">
          <mm-hamburger-button
            aria-label="전체메뉴"
            aria-controls="site-sidebar"
          ></mm-hamburger-button>
          <a class="navbar-logo" href="./index.html"></a>
        </mm-flex>

        <div class="navbar-user">
          <mm-theme-switcher></mm-theme-switcher>
          <mm-icon-button
            icon=${ICON_NAMES.SEARCH}
            aria-label="검색"
            aria-expanded=${String(this._searchOpen)}
            @click=${this._toggleSearch}
          ></mm-icon-button>
          <div style="position: relative">
            <mm-icon-button
              icon=${ICON_NAMES.PROFILE}
              class="navbar-user-trigger js-navbar-user-trigger"
              aria-haspopup="menu"
              aria-expanded="false"
            ></mm-icon-button>
            <div hidden>
              <mm-surface variant="elevated" size="medium">
                <mm-user-snippet
                  size="huge"
                  name="수줍이"
                  email="soojubm@gmail.com"
                  phone="010 3121 7045"
                  description="UI Designer"
                  avatar-src=${soojubmImage}
                  avatar-variant="secondary"
                  tag-label="접속 중"
                  tag-variant="primary"
                ></mm-user-snippet>
                <div style="margin: var(--space-2) 0 0">
                  <mm-button>내 프로필 관리</mm-button>
                </div>
                <div style="position: absolute; right: var(--space-4); top: var(--space-4)">
                  <mm-tag variant="primary" size="large">샘플 유아이</mm-tag>
                </div>
                <mm-separator spacing="small"></mm-separator>
                <mm-menu-item-group>
                  <mm-menu-item-action
                    icon=${ICON_NAMES.ANNOUNCEMENT}
                    label="고객센터 및 도움말"
                  ></mm-menu-item-action>
                </mm-menu-item-group>
                <mm-separator spacing="small"></mm-separator>
                <mm-menu-item-action
                  icon=${ICON_NAMES.LOG_OUT}
                  label="로그아웃"
                ></mm-menu-item-action>
                <mm-separator spacing="small"></mm-separator>
                <mm-flex>
                  <mm-link variant="secondary" href="#">개인정보처리방침</mm-link>
                  <mm-link variant="secondary" href="#">서비스 약관</mm-link>
                </mm-flex>
              </mm-surface>
            </div>
          </div>
        </div>
      </nav>
      <div class="navbar-backdrop"></div>

      <mm-sheet class="js-search-sheet" variant="center" width="medium" backdrop-blur>
        <mm-top-bar type="back" data-todo="topbar vs sheetheader"></mm-top-bar>
        <mm-sheet-body>
          <form role="search">
            <mm-flex direction="column" gap="2">
              <mm-searchfield
                placeholder="컴포넌트, 패턴을 검색하세요"
                .value=${this._query}
                @input=${this._onInput}
              ></mm-searchfield>
              ${this._query ? this._renderResults() : this._renderDefault()}
            </mm-flex>
          </form>
        </mm-sheet-body>
      </mm-sheet>

      <mm-sidebar id="site-sidebar" aria-hidden="true"></mm-sidebar>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-navbar': Navbar
  }
}
