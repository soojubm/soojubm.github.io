import { renderLayout } from '../../../layouts/base-layouts'
import main from './index.html'
import { renderList, getCountries } from '../../components/_list-page'

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
  const books = await loadBooks()
  if (!books?.length) return

  const state: FilterState = { country: '' }

  renderFilters(books, state)
  renderList(getFiltered(books, state), 0, bookCard, next =>
    renderList(getFiltered(books, state), next, bookCard, () => {}),
  )
}

function renderFilters(books: Book[], state: FilterState) {
  const container = document.querySelector<HTMLElement>('.js-filters')
  if (!container) return

  const countries = getCountries(books, 5)

  container.innerHTML = `
    <mm-flex align="start" gap="3">
      <span style="min-width:2rem;padding-top:6px;font-size:var(--font-size-12);color:var(--color-foreground-light)">국가</span>
      <mm-filter-button-group class="js-country-filter" mode="single" style="flex:1;flex-wrap:wrap">
        ${countries.map(c => `<mm-filter-button value="${c}">${c}</mm-filter-button>`).join('')}
      </mm-filter-button-group>
    </mm-flex>
  `

  container.querySelector('.js-country-filter')?.addEventListener('change', e => {
    state.country = (e as CustomEvent<{ selected: string[] }>).detail.selected[0] ?? ''
    renderList(getFiltered(books, state), 0, bookCard, next =>
      renderList(getFiltered(books, state), next, bookCard, () => {}),
    )
  })
}

function bookCard(b: Book) {
  return `
    <article style="border:var(--border);padding:var(--space-3);border-radius:var(--radius)">
      <mm-flex direction="column" gap="1">
        <mm-flex justify="between" align="center" gap="2">
          <time style="font-size:var(--font-size-12);color:var(--color-foreground-light)">${b.releasedate ?? ''}</time>
          <span style="font-size:var(--font-size-12);color:var(--color-foreground-light)">${b.country ?? ''}</span>
        </mm-flex>
        <p style="margin:0;font-weight:var(--font-weight-bold);line-height:1.3">${b.titlekorean}</p>
        <p style="margin:0;font-size:var(--font-size-12);color:var(--color-foreground-light)">${b.titleenglish}</p>
        <p style="margin:0;font-size:var(--font-size-14)">${b.director}</p>
      </mm-flex>
    </article>
  `
}

function getFiltered(books: Book[], state: FilterState) {
  return books.filter(b => {
    if (state.country && b.country !== state.country) return false
    return true
  })
}

async function loadBooks(): Promise<Book[] | null> {
  try {
    const res = await fetch('/pages/my/books/books.json')
    return await res.json()
  } catch {
    return null
  }
}
