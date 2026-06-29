import main from './index.html'
import { renderLayout } from '../../../layouts/base-layouts'
import { renderList, getCountries, loadJson } from '../../components/_list-page'
import { mediaCard } from '../media-card'

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
  document.body.innerHTML = renderLayout(main)
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

  container.innerHTML = `
    <mm-flex align-items="flex-start" gap="3">
      <mm-text size="12" color="light" style="min-width:2rem;padding-top:6px">국가</mm-text>
      <mm-filter-button-group class="js-country-filter" mode="single" style="flex:1;flex-wrap:wrap">
        ${countries.map(c => `<mm-filter-button value="${c}">${c}</mm-filter-button>`).join('')}
      </mm-filter-button-group>
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
