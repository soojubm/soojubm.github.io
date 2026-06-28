import { LitElement, html, nothing } from 'lit'
import { customElement, query, state } from 'lit/decorators.js'
import { repeat } from 'lit/directives/repeat.js'

import type Sheet from '@/components/sheet/sheet'

import { ICON_NAMES } from '@/components/icon-button/semantics/icon-names'
import { PopupController } from '@/controllers/popup-controller'
import soojubmImage from '@/images/soojubm.png'

type PagefindResult = { url: string; meta: { title: string }; excerpt: string }
type Pagefind = {
  search: (q: string) => Promise<{ results: { data: () => Promise<PagefindResult> }[] }>
}

function hasValue(target: EventTarget | null): target is HTMLInputElement | HTMLTextAreaElement {
  return target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement
}

@customElement('mm-navbar')
export class Navbar extends LitElement {
  @state() private searchOpen = false
  @state() private query = ''
  @state() private results: PagefindResult[] = []
  @state() private searching = false

  private pagefind: Pagefind | null = null
  private debounceTimer: ReturnType<typeof setTimeout> | null = null
  private searchRequestId = 0

  @query('.js-search-sheet') private searchSheet?: Sheet
  @query('.js-search-sheet mm-searchfield') private searchField?: HTMLElement
  @query('.navbar-user-trigger') private userMenuTrigger?: HTMLElement

  private userMenu = new PopupController(this, {
    event: 'click',
    getTrigger: () => this.userMenuTrigger,
  })

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
            aria-expanded=${this.searchOpen ? 'true' : 'false'}
            @click=${this.toggleSearch}
          ></mm-icon-button>
          <div class="navbar-user-menu">
            <mm-icon-button
              icon=${ICON_NAMES.PROFILE}
              class="navbar-user-trigger"
              aria-haspopup="menu"
              aria-expanded=${this.userMenu.open ? 'true' : 'false'}
              @click=${this.toggleUserMenu}
            ></mm-icon-button>
            <div class="navbar-user-panel" ?hidden=${!this.userMenu.open}>
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
                <div class="navbar-profile-action">
                  <mm-button>내 프로필 관리</mm-button>
                </div>
                <div class="navbar-profile-tag">
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
                .value=${this.query}
                @input=${this.onInput}
              ></mm-searchfield>
              ${this.query ? this.renderResults() : this.renderDefault()}
            </mm-flex>
          </form>
        </mm-sheet-body>
      </mm-sheet>

      <mm-sidebar id="site-sidebar" aria-hidden="true"></mm-sidebar>
    `
  }

  // 전역 navbar.css와 body의 메뉴 상태 선택자가 내부 구조에 접근해야 하므로 Light DOM을 유지한다.
  createRenderRoot() {
    return this
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
    this.searchOpen = !this.searchOpen
    if (this.searchSheet) this.searchOpen ? this.searchSheet.open() : this.searchSheet.close()
    if (this.searchOpen) {
      this.loadPagefind()
      requestAnimationFrame(() => {
        this.searchField?.focus()
      })
    } else {
      this.query = ''
      this.results = []
      this.searching = false
      this.searchRequestId++
    }
  }

  private toggleUserMenu = () => {
    this.userMenu.toggle()
  }

  private onInput = (e: Event) => {
    const detailValue = e instanceof CustomEvent ? e.detail?.value : undefined
    this.query = detailValue ?? (hasValue(e.target) ? e.target.value : '')
    if (this.debounceTimer) clearTimeout(this.debounceTimer)
    if (!this.query.trim()) {
      this.searchRequestId++
      this.results = []
      this.searching = false
      return
    }
    this.debounceTimer = setTimeout(() => {
      this.debounceTimer = null
      this.search(this.query)
    }, 200)
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
    return this.searchOpen && searchId === this.searchRequestId && this.query.trim() === query
  }

  private renderDefault() {
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

  private renderResults() {
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
      <mm-menu-item-group aria-label="검색 결과">
        <mm-paragraph color="light">검색 결과</mm-paragraph>
        ${repeat(
          this.results,
          result => result.url,
          result => html`
            <mm-menu-item-action
              icon=${ICON_NAMES.SEARCH}
              label=${result.meta.title || result.url}
              description=${result.excerpt ? result.excerpt.replace(/<[^>]*>/g, '') : nothing}
              @click=${() => this.handleResultClick(result.url)}
            ></mm-menu-item-action>
          `,
        )}
      </mm-menu-item-group>
    `
  }

  private handleResultClick(url: string) {
    window.location.href = url
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-navbar': Navbar
  }
}
