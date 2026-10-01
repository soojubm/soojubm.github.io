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
      <mm-page-header
        heading="영화감상 목록"
        description="감상한 영화를 기록합니다."
      ></mm-page-header>

      <div class="js-filters"></div>

      <mm-paragraph size="small" color="light">
        <span class="js-count"></span>
        편
      </mm-paragraph>

      <mm-grid class="js-list" column-min-width="220px" gap="3"></mm-grid>

      <div class="js-more" hidden></div>
    </mm-flex>
  </mm-main>
`

type FilterState = { decade: string; country: string }

renderPage(main, { initialize: initPage })

async function initPage() {
  const films = await loadJson<MediaItem>('/src/pages/my/films/films.json')
  if (!films?.length) return

  const state: FilterState = { decade: '', country: '' }
  const rerender = () => renderList(getFiltered(films, state), renderMediaCard)

  renderFilters(films, state, rerender)
  rerender()
}

function renderFilters(films: MediaItem[], state: FilterState, rerender: () => void) {
  const container = document.querySelector<HTMLElement>('.js-filters')
  if (!container) return

  const decadeOptions = toFilterOptions(getDecades(films), value => `${value}s`)
  const countryOptions = toFilterOptions(getCountries(films, 20))

  render(
    html`
      <mm-flex direction="column" gap="2">
        <mm-media-filter
          class="js-decade-filter"
          label="연대"
          .options=${decadeOptions}
        ></mm-media-filter>
        <mm-media-filter
          class="js-country-filter"
          label="국가"
          .options=${countryOptions}
        ></mm-media-filter>
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

function getFiltered(films: MediaItem[], state: FilterState) {
  return films.filter(f => {
    if (state.decade) {
      const filmDecade = String(Math.floor(f.releasedate / 10) * 10)
      if (filmDecade !== state.decade) return false
    }
    if (state.country && f.country !== state.country) return false
    return true
  })
}

function getDecades(films: MediaItem[]) {
  const set = new Set(
    films.filter(f => f.releasedate >= 1880).map(f => String(Math.floor(f.releasedate / 10) * 10)),
  )
  return [...set].sort()
}
