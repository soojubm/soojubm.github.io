import { html, render } from 'lit'
import type { FilterOption } from '@/components/button/semantics/filter-button-group'
import { renderLayout } from '../../../layouts/base-layouts'
import { renderList, getCountries, loadJson } from '../../components/_list-page'
import { mediaCard } from '../media-card'

const main = html`
  <main class="page">
    <mm-page-header
      heading="영화감상 목록"
      description="감상한 영화를 기록합니다."
    ></mm-page-header>

    <div class="js-filters"></div>

    <mm-paragraph
      style="
      margin: var(--space-3) 0;
      color: var(--foreground-subtle-color);
      font-size: var(--font-size-14);
    "
    >
      <span class="js-count"></span>
      편
    </mm-paragraph>

    <mm-flex class="js-list" gap="3"></mm-flex>

    <div class="js-more" style="margin-top: var(--space-4); display: none">
      <mm-show-more-button class="js-more-btn" label="더 보기"></mm-show-more-button>
    </div>
  </main>
`

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
  renderLayout(main)
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

  const decadeOptions = toFilterOptions(getDecades(films), value => `${value}s`)
  const countryOptions = toFilterOptions(getCountries(films, 20))

  render(
    html`
      <mm-flex direction="column" gap="2">
        <mm-flex align-items="flex-start" gap="3">
          <mm-text size="12" color="light" style="min-width: 2rem; padding-top: 6px">연대</mm-text>
          <mm-filter-button-group
            class="js-decade-filter"
            mode="single"
            .options=${decadeOptions}
            style="flex: 1"
          ></mm-filter-button-group>
        </mm-flex>
        <mm-flex align-items="flex-start" gap="3">
          <mm-text size="12" color="light" style="min-width: 2rem; padding-top: 6px">국가</mm-text>
          <mm-filter-button-group
            class="js-country-filter"
            mode="single"
            .options=${countryOptions}
            style="flex: 1"
          ></mm-filter-button-group>
        </mm-flex>
      </mm-flex>
    `,
    container,
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

function toFilterOptions(values: string[], getLabel = (value: string) => value): FilterOption[] {
  return values.map(value => ({ value, label: getLabel(value) }))
}
