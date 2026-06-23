import { renderLayout } from '../../../layouts/base-layouts'
import main from './index.html'
import { renderList, getCountries, PAGE_SIZE } from '../../components/_list-page'

interface Film {
  id: number
  releasedate: number
  titlekorean: string
  titleenglish: string
  director: string
  country: string
  etc: string
}

type FilterState = { decade: string; country: string }

document.addEventListener('DOMContentLoaded', () => {
  document.body.innerHTML = renderLayout(main)
  initPage()
})

async function initPage() {
  const films = await loadFilms()
  if (!films?.length) return

  const state: FilterState = { decade: '', country: '' }

  renderFilters(films, state)
  renderList(getFiltered(films, state), 0, filmCard, next =>
    renderList(getFiltered(films, state), next, filmCard, () => {}),
  )
}

function renderFilters(films: Film[], state: FilterState) {
  const container = document.querySelector<HTMLElement>('.js-filters')
  if (!container) return

  const decades = getDecades(films)
  const countries = getCountries(films, 20)

  container.innerHTML = `
    <mm-flex direction="column" gap="2">
      <mm-flex align-items="flex-start" gap="3">
        <span style="min-width:2rem;padding-top:6px;font-size:var(--font-size-12);color:var(--color-foreground-light)">연대</span>
        <mm-filter-button-group class="js-decade-filter" mode="single" style="flex:1;flex-wrap:wrap">
          ${decades.map(d => `<mm-filter-button value="${d}">${d}s</mm-filter-button>`).join('')}
        </mm-filter-button-group>
      </mm-flex>
      <mm-flex align-items="flex-start" gap="3">
        <span style="min-width:2rem;padding-top:6px;font-size:var(--font-size-12);color:var(--color-foreground-light)">국가</span>
        <mm-filter-button-group class="js-country-filter" mode="single" style="flex:1;flex-wrap:wrap">
          ${countries.map(c => `<mm-filter-button value="${c}">${c}</mm-filter-button>`).join('')}
        </mm-filter-button-group>
      </mm-flex>
    </mm-flex>
  `

  const rerender = () =>
    renderList(getFiltered(films, state), 0, filmCard, next =>
      renderList(getFiltered(films, state), next, filmCard, () => {}),
    )

  container.querySelector('.js-decade-filter')?.addEventListener('change', e => {
    state.decade = (e as CustomEvent<{ values: string[] }>).detail.values[0] ?? ''
    rerender()
  })

  container.querySelector('.js-country-filter')?.addEventListener('change', e => {
    state.country = (e as CustomEvent<{ values: string[] }>).detail.values[0] ?? ''
    rerender()
  })
}

function filmCard(f: Film) {
  return `
    <article style="border:var(--border);padding:var(--space-3);border-radius:var(--radius)">
      <mm-flex direction="column" gap="1">
        <mm-flex justify-content="space-between" align-items="center" gap="2">
          <time style="font-size:var(--font-size-12);color:var(--color-foreground-light)">${
            f.releasedate
          }</time>
          <span style="font-size:var(--font-size-12);color:var(--color-foreground-light)">${
            f.country ?? ''
          }</span>
        </mm-flex>
        <mm-paragraph style="margin:0;font-weight:var(--font-weight-bold);line-height:1.3">${
          f.titlekorean
        }</mm-paragraph>
        <mm-paragraph style="margin:0;font-size:var(--font-size-12);color:var(--color-foreground-light)">${
          f.titleenglish
        }</mm-paragraph>
        <mm-paragraph style="margin:0;font-size:var(--font-size-14)">${f.director}</mm-paragraph>
      </mm-flex>
    </article>
  `
}

function getFiltered(films: Film[], state: FilterState) {
  return films.filter(f => {
    if (state.decade) {
      const filmDecade = String(Math.floor(f.releasedate / 10) * 10)
      if (filmDecade !== state.decade) return false
    }
    if (state.country && f.country !== state.country) return false
    return true
  })
}

function getDecades(films: Film[]) {
  const set = new Set(
    films.filter(f => f.releasedate >= 1880).map(f => String(Math.floor(f.releasedate / 10) * 10)),
  )
  return [...set].sort()
}

async function loadFilms(): Promise<Film[] | null> {
  try {
    const res = await fetch('/pages/my/films/films.json')
    return await res.json()
  } catch {
    return null
  }
}
