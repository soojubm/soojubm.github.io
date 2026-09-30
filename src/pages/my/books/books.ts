import { html, render } from 'lit'

import type { FilterOption } from '@/components/common'

import { renderPage } from '@/components/layouts/base-layouts'
import '@/components/domains/media-card'
import { renderList, getCountries, loadJson } from '@/pages/my/list-page'

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

      <div class="js-more" hidden>
        <mm-show-more-button class="js-more-btn"></mm-show-more-button>
      </div>
    </mm-flex>
  </mm-main>
`

interface Book {
  releasedate: number
  titlekorean: string
  titleenglish: string
  director: string
  country: string
  etc: string
}

type FilterState = { country: string }

renderPage(main, { initialize: initPage })

async function initPage() {
  const books = await loadJson<Book>('/src/pages/my/books/books.json')
  if (!books?.length) return

  const state: FilterState = { country: '' }
  const rerender = () => renderList(getFiltered(books, state), renderBookCard)

  renderFilters(books, state, rerender)
  rerender()
}

function renderFilters(books: Book[], state: FilterState, rerender: () => void) {
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

function renderBookCard(book: Book) {
  return html`
    <mm-media-card
      title=${book.titlekorean}
      subtitle=${book.titleenglish}
      director=${book.director}
      country=${book.country ?? ''}
      year=${book.releasedate ?? ''}
    ></mm-media-card>
  `
}

function getFiltered(books: Book[], state: FilterState) {
  return books.filter(b => {
    if (state.country && b.country !== state.country) return false
    return true
  })
}

function toFilterOptions(values: string[]): FilterOption[] {
  return values.map(value => ({ value, label: value }))
}
