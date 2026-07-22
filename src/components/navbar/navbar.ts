import { LitElement, html, nothing } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { repeat } from 'lit/directives/repeat.js'

import { ICON_NAMES } from '@/components/icon-button/semantics/icon-names'
import { PopupController } from '@/controllers/popup-controller'
import soojubmImage from '@/images/soojubm.png'
import { SITEMAP } from '@/sitemap'

type PagefindResult = { url: string; meta: { title: string }; excerpt: string }
type Pagefind = {
  search: (q: string) => Promise<{ results: { data: () => Promise<PagefindResult> }[] }>
}

function hasValue(target: EventTarget | null): target is HTMLInputElement | HTMLTextAreaElement {
  return target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement
}

@customElement('mm-navbar')
export class Navbar extends LitElement {
  @property({ type: Boolean, reflect: true, attribute: 'sidebar-collapsed' }) sidebarCollapsed =
    false

  @state() private query = ''
  @state() private results: PagefindResult[] = []
  @state() private searching = false

  private pagefind: Pagefind | null = null
  private debounceTimer: ReturnType<typeof setTimeout> | null = null
  private searchRequestId = 0

  // 검색 시트는 열릴 때 portal로 document.body로 이동하므로 renderRoot가 아닌 document에서 찾는다.
  private get searchField() {
    return document.querySelector<HTMLElement>('.js-search-sheet mm-searchfield') ?? undefined
  }

  private searchMenu = new PopupController(this, { event: 'click' })

  render() {
    return html`
      <nav class="navbar js-navbar" role="navigation">
        <mm-flex gap="2">
          <mm-hamburger-button
            aria-label="전체메뉴"
            aria-controls="site-sidebar"
          ></mm-hamburger-button>
          <a class="navbar-logo" href="./index.html" aria-label="홈"></a>
        </mm-flex>

        <div class="navbar-user">
          <mm-theme-switcher></mm-theme-switcher>
          <mm-icon-button
            icon=${ICON_NAMES.SEARCH}
            aria-label="검색"
            aria-expanded=${this.searchMenu.open ? 'true' : 'false'}
            @click=${this.toggleSearch}
          ></mm-icon-button>
          <mm-popover placement="bottom-right" width="320px">
            <mm-icon-button
              slot="trigger"
              icon=${ICON_NAMES.PROFILE}
              aria-label="내 메뉴"
            ></mm-icon-button>
            <mm-flex gap="2" justify-content="space-between">
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
              <mm-button>내 프로필 관리</mm-button>
            </mm-flex>
            <mm-separator></mm-separator>
            <mm-menu-item-group>
              <mm-menu-item-action
                icon=${ICON_NAMES.ANNOUNCEMENT}
                label="고객센터 및 도움말"
              ></mm-menu-item-action>
              <mm-menu-item-action
                icon=${ICON_NAMES.LOG_OUT}
                label="로그아웃"
              ></mm-menu-item-action>
            </mm-menu-item-group>
            <mm-separator></mm-separator>
            <mm-flex gap="2">
              <mm-link variant="secondary" href="#">개인정보처리방침</mm-link>
              <mm-link variant="secondary" href="#">서비스 약관</mm-link>
            </mm-flex>
          </mm-popover>
        </div>
      </nav>
      <div class="navbar-backdrop"></div>

      <mm-sheet
        class="js-search-sheet"
        variant="center"
        width="medium"
        style="--sheet-backdrop-blur: 2px"
        ?open=${this.searchMenu.open}
        @sheetclose=${() => this.searchMenu.close()}
        @pointerdown=${(e: Event) => e.stopPropagation()}
      >
        <mm-top-bar type="back"></mm-top-bar>
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

      <mm-sidebar id="site-sidebar" ?open=${!this.sidebarCollapsed}></mm-sidebar>

      <mm-fixed-bottom class="site-bottom-bar">
        <mm-bottom-bar .items=${this.bottomBarItems}></mm-bottom-bar>
      </mm-fixed-bottom>
    `
  }

  private get bottomBarItems() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html'
    const currentPageId = currentPath.replace('.html', '') || 'index'

    return SITEMAP.filter(node => node.type === 'standalone' && node.id !== 'signifier').map(
      node => ({
        label: node.title,
        href: `${node.id}.html`,
        icon: node.icon,
        active: node.id === currentPageId,
      }),
    )
  }

  // 전역 navbar.styles와 body의 메뉴 상태 선택자가 내부 구조에 접근해야 하므로 Light DOM을 유지한다.
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
    this.searchMenu.toggle()
    if (this.searchMenu.open) {
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
    return this.searchMenu.open && searchId === this.searchRequestId && this.query.trim() === query
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
              description=${ifDefined(
                result.excerpt ? result.excerpt.replace(/<[^>]*>/g, '') : undefined,
              )}
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
