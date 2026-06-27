import { renderLayout } from '../../../layouts/base-layouts'
import main from './index.html'
import { renderList, getCountries, loadJson, mediaCard } from '../../components/_list-page'

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
  const films = await loadJson<Film>('/pages/my/films/films.json')
  if (!films?.length) return

  const state: FilterState = { decade: '', country: '' }
  const rerender = () => renderList(getFiltered(films, state), mediaCard)

  renderFilters(films, state, rerender)
  rerender()
}

function renderFilters(films: Film[], state: FilterState, rerender: () => void) {
  const container = document.querySelector<HTMLElement>('.js-filters')
  if (!container) return

  const decades = getDecades(films)
  const countries = getCountries(films, 20)

  container.innerHTML = `
    <mm-flex direction="column" gap="2">
      <mm-flex align-items="flex-start" gap="3">
        <mm-text size="12" color="light" style="min-width:2rem;padding-top:6px">연대</mm-text>
        <mm-filter-button-group class="js-decade-filter" mode="single" style="flex:1;flex-wrap:wrap">
          ${decades.map(d => `<mm-filter-button value="${d}">${d}s</mm-filter-button>`).join('')}
        </mm-filter-button-group>
      </mm-flex>
      <mm-flex align-items="flex-start" gap="3">
        <mm-text size="12" color="light" style="min-width:2rem;padding-top:6px">국가</mm-text>
        <mm-filter-button-group class="js-country-filter" mode="single" style="flex:1;flex-wrap:wrap">
          ${countries.map(c => `<mm-filter-button value="${c}">${c}</mm-filter-button>`).join('')}
        </mm-filter-button-group>
      </mm-flex>
    </mm-flex>
  `

  container.querySelector('.js-decade-filter')?.addEventListener('change', e => {
    state.decade = (e as CustomEvent<{ values: string[] }>).detail.values[0] ?? ''
    rerender()
  })

  container.querySelector('.js-country-filter')?.addEventListener('change', e => {
    state.country = (e as CustomEvent<{ values: string[] }>).detail.values[0] ?? ''
    rerender()
  })
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
