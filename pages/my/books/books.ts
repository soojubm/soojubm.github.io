import { html } from 'lit'
import { renderLayout } from '../../../layouts/base-layouts'
import { renderList, getCountries, loadJson } from '../../components/_list-page'
import { mediaCard } from '../media-card'

const main = html`
  <main class="page">
    <mm-page-header heading="독서 목록" description="읽은 책을 기록합니다."></mm-page-header>

    <div class="js-filters"></div>

    <mm-paragraph
      style="
      margin: var(--space-3) 0;
      color: var(--foreground-subtle-color);
      font-size: var(--font-size-14);
    "
    >
      <span class="js-count"></span>
      권
    </mm-paragraph>

    <mm-flex class="js-list" gap="3"></mm-flex>

    <div class="js-more" style="margin-top: var(--space-4); display: none">
      <mm-show-more-button class="js-more-btn" label="더 보기"></mm-show-more-button>
    </div>
  </main>
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

document.addEventListener('DOMContentLoaded', () => {
  renderLayout(main)
  initPage()
})

async function initPage() {
  const books = await loadJson<Book>('/pages/my/books/books.json')
  if (!books?.length) return

  const state: FilterState = { country: '' }
  const rerender = () => renderList(getFiltered(books, state), mediaCard)

  renderFilters(books, state, rerender)
  rerender()
}

function renderFilters(books: Book[], state: FilterState, rerender: () => void) {
  const container = document.querySelector<HTMLElement>('.js-filters')
  if (!container) return

  const countries = getCountries(books, 5)
  const countryOptions = toFilterOptions(countries)

  container.innerHTML = `
    <mm-flex align-items="flex-start" gap="3">
      <mm-text size="12" color="light" style="min-width:2rem;padding-top:6px">국가</mm-text>
      <mm-filter-button-group class="js-country-filter" mode="single" options='${countryOptions}' style="flex:1"></mm-filter-button-group>
    </mm-flex>
  `

  container.querySelector('.js-country-filter')?.addEventListener('change', e => {
    state.country = (e as CustomEvent<{ values: string[] }>).detail.values[0] ?? ''
    rerender()
  })
}

function getFiltered(books: Book[], state: FilterState) {
  return books.filter(b => {
    if (state.country && b.country !== state.country) return false
    return true
  })
}

function toFilterOptions(values: string[]) {
  return JSON.stringify(values.map(value => ({ value, label: value }))).replace(/'/g, '&apos;')
}
