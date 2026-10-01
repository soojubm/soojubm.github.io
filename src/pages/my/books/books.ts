import { html } from 'lit'

import type { MediaItem, MediaList } from '@/components/domains/media-card'

import { renderPage } from '@/components/layouts/base-layouts'
import { countryFilter, loadJson } from '@/pages/my/list-page'

const main = html`
  <mm-main>
    <mm-flex direction="column" gap="4">
      <mm-page-header heading="독서 목록" description="읽은 책을 기록합니다."></mm-page-header>

      <mm-media-list unit="권"></mm-media-list>
    </mm-flex>
  </mm-main>
`

renderPage(main, { initialize: initPage })

async function initPage() {
  const books = await loadJson<MediaItem>('/src/pages/my/books/books.json')
  const list = document.querySelector<MediaList>('mm-media-list')
  if (!books?.length || !list) return

  list.items = books
  list.filters = [countryFilter(books, 5)]
}
