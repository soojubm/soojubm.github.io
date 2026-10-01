import type { SearchResult } from '@/components/domains/search/search-result-list'
import type { ReactiveControllerHost } from 'lit'

import { ScheduleController } from '@/controllers/schedule-controller'

type PagefindResult = { url: string; meta: { title: string }; excerpt: string }
type Pagefind = {
  search: (q: string) => Promise<{ results: { data: () => Promise<PagefindResult> }[] }>
}

interface PagefindSearchControllerOptions {
  isActive: () => boolean
}

const DEBOUNCE_MS = 200
const MAX_RESULTS = 8

// Pagefind excerpt는 일치 구간을 <mark>로 감싼 HTML이라 태그를 걷어 설명 문구로 쓴다.
function toSearchResult(result: PagefindResult): SearchResult {
  return {
    href: result.url,
    label: result.meta.title || result.url,
    description: result.excerpt.replace(/<[^>]*>/g, ''),
  }
}

/**
 * Pagefind 색인 로딩·debounce·요청 순서 관리를 소유하는 검색 컨트롤러.
 * query·results·searching이 바뀌면 호스트를 다시 그린다.
 */
export class PagefindSearchController {
  query = ''
  results: SearchResult[] = []
  searching = false
  private pagefind: Pagefind | null = null
  private debounce: ScheduleController
  private requestId = 0

  constructor(
    private host: ReactiveControllerHost,
    private options: PagefindSearchControllerOptions,
  ) {
    this.debounce = new ScheduleController(host, () => this.search(this.query), {
      delay: DEBOUNCE_MS,
    })
  }

  async load() {
    if (this.pagefind) return
    try {
      // webpack이 번들링하지 않도록 Function constructor로 동적 import한다.
      // tsconfig가 commonjs라 import()를 직접 쓰면 require로 바뀌어 webpackIgnore 주석이 소용없다.
      const dynamicImport = new Function('url', 'return import(url)')
      this.pagefind = (await dynamicImport('/pagefind/pagefind.js')) as Pagefind
    } catch {
      console.warn('Pagefind not available. Run npm run build first.')
    }
  }

  setQuery(query: string) {
    this.query = query
    if (!query.trim()) {
      this.reset()
      return
    }
    this.debounce.request()
    this.host.requestUpdate()
  }

  reset(clearQuery = false) {
    if (clearQuery) this.query = ''

    this.debounce.cancel()
    this.results = []
    this.searching = false
    this.requestId++
    this.host.requestUpdate()
  }

  private async search(query: string) {
    const requestId = ++this.requestId
    const searchQuery = query.trim()
    if (!searchQuery) return

    await this.load()
    if (!this.isCurrent(requestId, searchQuery)) return
    if (!this.pagefind) {
      this.searching = false
      this.host.requestUpdate()
      return
    }

    this.searching = true
    this.host.requestUpdate()
    try {
      const { results } = await this.pagefind.search(searchQuery)
      const data = await Promise.all(results.slice(0, MAX_RESULTS).map(r => r.data()))
      if (!this.isCurrent(requestId, searchQuery)) return

      this.results = data.map(toSearchResult)
    } finally {
      if (this.isCurrent(requestId, searchQuery)) this.searching = false
      this.host.requestUpdate()
    }
  }

  private isCurrent(requestId: number, query: string) {
    return this.options.isActive() && requestId === this.requestId && this.query.trim() === query
  }
}
