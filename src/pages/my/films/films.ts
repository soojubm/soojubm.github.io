import { html } from 'lit'

import type { MediaItem, MediaList, MediaListFilter } from '@/components/domains/media-card'

import { renderPage } from '@/components/layouts/base-layouts'
import { countryFilter, loadJson, toFilterOptions } from '@/pages/my/list-page'

const main = html`
  <mm-main>
    <mm-flex direction="column" gap="4">
      <mm-page-header
        heading="영화감상 목록"
        description="감상한 영화를 기록합니다."
      ></mm-page-header>

      <mm-media-list unit="편"></mm-media-list>
    </mm-flex>
  </mm-main>
`

renderPage(main, { initialize: initPage })

async function initPage() {
  const films = await loadJson<MediaItem>('/src/pages/my/films/films.json')
  const list = document.querySelector<MediaList>('mm-media-list')
  if (!films?.length || !list) return

  list.items = films
  list.filters = [decadeFilter(films), countryFilter(films, 20)]
}

const getDecade = (film: MediaItem) => String(Math.floor(film.releasedate / 10) * 10)

function decadeFilter(films: MediaItem[]): MediaListFilter {
  const decades = new Set(films.filter(film => film.releasedate >= 1880).map(getDecade))

  return {
    label: '연대',
    options: toFilterOptions([...decades].sort(), value => `${value}s`),
    matches: (film, decade) => getDecade(film) === decade,
  }
}
