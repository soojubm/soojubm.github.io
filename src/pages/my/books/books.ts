import { html, render } from 'lit'

import { renderPage } from '@/components/layouts/base-layouts'
import {
  renderList,
  renderMediaCard,
  getCountries,
  loadJson,
  toFilterOptions,
  type MediaItem,
} from '@/pages/my/list-page'

const main = html`
  <mm-main>
    <mm-flex direction="column" gap="4">
      <mm-page-header heading="독서 목록" description="읽은 책을 기록합니다."></mm-page-header>

      <div class="js-filters"></div>

      <mm-paragraph size="small" color="light">
        <span class="js-count"></span>
        권
      </mm-paragraph>

      <mm-grid class="js-list" column-min-width="220px" gap="3"></mm-grid>

      <div class="js-more" hidden></div>
    </mm-flex>
  </mm-main>
`

type FilterState = { country: string }

renderPage(main, { initialize: initPage })

async function initPage() {
  const books = await loadJson<MediaItem>('/src/pages/my/books/books.json')
  if (!books?.length) return

  const state: FilterState = { country: '' }
  const rerender = () => renderList(getFiltered(books, state), renderMediaCard)

  renderFilters(books, state, rerender)
  rerender()
}

function renderFilters(books: MediaItem[], state: FilterState, rerender: () => void) {
  const container = document.querySelector<HTMLElement>('.js-filters')
  if (!container) return

  const countryOptions = toFilterOptions(getCountries(books, 5))

  render(
    html`
      <mm-media-filter
        class="js-country-filter"
        label="국가"
        .options=${countryOptions}
      ></mm-media-filter>
    `,
    container,
  )

  container.querySelector('.js-country-filter')?.addEventListener('change', e => {
    state.country = (e as CustomEvent<{ values: string[] }>).detail.values[0] ?? ''
    rerender()
  })
}

function getFiltered(books: MediaItem[], state: FilterState) {
  return books.filter(b => {
    if (state.country && b.country !== state.country) return false
    return true
  })
}
