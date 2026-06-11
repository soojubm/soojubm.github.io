import { LitElement, html, nothing } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { ICON_NAMES } from '../icon-button/semantics/icon-names'

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

  createRenderRoot() {
    return this
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
    const sheet = this.querySelector('.js-search-sheet') as any
    if (sheet) this._searchOpen ? sheet.open() : sheet.close()
    if (this._searchOpen) {
      this._loadPagefind()
      requestAnimationFrame(() => {
        const input = this.querySelector('.js-search-sheet mm-searchfield') as any
        input?.focus?.()
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
    this._debounceTimer = setTimeout(() => this._search(this._query), 200)
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
        <mm-text size="14" color="var(--color-foreground-light)">최근 검색</mm-text>
        <mm-menu-item-action label="고슴이" emoji="🦔"></mm-menu-item-action>
        <mm-menu-item-action label="개구리" emoji="🐸"></mm-menu-item-action>
      </mm-menu-item-group>
    `
  }

  private _renderResults() {
    if (this._searching) {
      return html`<mm-text size="14" color="var(--color-foreground-light)">검색 중...</mm-text>`
    }
    if (this._results.length === 0) {
      return html`<mm-text size="14" color="var(--color-foreground-light)"
        >'${this._query}'에 대한 결과가 없습니다.</mm-text
      >`
    }
    return html`
      <mm-menu-item-group aria-label="검색 결과">
        <mm-text size="14" color="var(--color-foreground-light)">검색 결과</mm-text>
        ${this._results.map(
          r => html`
            <mm-menu-item-action
              icon=${ICON_NAMES.SEARCH}
              label=${r.meta.title || r.url}
              description=${r.excerpt ? r.excerpt.replace(/<[^>]*>/g, '') : ''}
              @click=${() => {
                window.location.href = r.url
              }}
            ></mm-menu-item-action>
          `,
        )}
      </mm-menu-item-group>
    `
  }

  render() {
    return html`
      <nav class="navbar js-navbar" role="navigation">
        <mm-flex gap="2">
          <mm-hamburger-button aria-label="전체메뉴"></mm-hamburger-button>
          <a class="navbar-logo" href="./index.html"></a>
        </mm-flex>

        <div class="navbar-user">
          <mm-icon-button
            icon=${ICON_NAMES.SEARCH}
            aria-label="검색"
            aria-expanded=${this._searchOpen ? 'true' : 'false'}
            @click=${this._toggleSearch}
          ></mm-icon-button>
          <mm-theme-switcher></mm-theme-switcher>
          <div style="position: relative">
            <mm-icon-button
              icon=${ICON_NAMES.PROFILE}
              class="navbar-user-trigger js-navbar-user-trigger"
              aria-haspopup="menu"
              aria-expanded="false"
            ></mm-icon-button>
            <div class="navbar-user-menu" hidden>
              <mm-surface variant="elevated" size="medium">
                <mm-user-snippet
                  name="수줍이"
                  email="soojubm@gmail.com"
                  phone="010 3121 7045"
                  description="UI Designer"
                  avatar-src="/src/images/soojubm.png"
                  avatar-size="huge"
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
                <mm-separator></mm-separator>
                <mm-menu-item-group>
                  <mm-menu-item-action
                    icon=${ICON_NAMES.ANNOUNCEMENT}
                    label="고객센터 및 도움말"
                  ></mm-menu-item-action>
                </mm-menu-item-group>
                <mm-separator></mm-separator>
                <mm-menu-item-action
                  icon=${ICON_NAMES.LOG_OUT}
                  label="로그아웃"
                ></mm-menu-item-action>
                <mm-separator></mm-separator>
                <mm-flex style="margin-top: -0.25rem">
                  <mm-link variant="secondary" href="#">개인정보처리방침</mm-link>
                  <mm-link variant="secondary" href="#">서비스 약관</mm-link>
                </mm-flex>
              </mm-surface>
            </div>
          </div>
        </div>
      </nav>
      <div class="navbar-backdrop"></div>

      <mm-sheet class="js-search-sheet" type="center" size="medium" backdrop-blur>
        <mm-top-bar type="back" data-todo="topbar vs sheetheader"></mm-top-bar>
        <mm-sheet-body>
          <mm-flex direction="column" gap="2">
            <mm-searchfield
              placeholder="컴포넌트, 패턴을 검색하세요"
              .value=${this._query}
              @input=${this._onInput}
            ></mm-searchfield>
            ${this._query ? this._renderResults() : this._renderDefault()}
          </mm-flex>
        </mm-sheet-body>
      </mm-sheet>

      <mm-sidebar></mm-sidebar>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-navbar': Navbar
  }
}
