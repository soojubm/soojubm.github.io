/**
 * films·books가 공유하는 "필터 + 페이지네이션 목록" 페이지 유틸리티.
 */
import { html, render, type TemplateResult } from 'lit'

import type { FilterOption } from '@/components/common'

import '@/components/domains/media-card'

const PAGE_SIZE = 60

/** films·books가 공유하는 목록 항목. */
export interface MediaItem {
  releasedate: number
  titlekorean: string
  titleenglish: string
  director: string
  country: string
  etc: string
}

export const renderMediaCard = (item: MediaItem) => html`
  <mm-media-card
    title=${item.titlekorean}
    subtitle=${item.titleenglish}
    director=${item.director}
    country=${item.country ?? ''}
    year=${item.releasedate ?? ''}
  ></mm-media-card>
`

export const toFilterOptions = (
  values: string[],
  getLabel = (value: string) => value,
): FilterOption[] => values.map(value => ({ value, label: getLabel(value) }))

/**
 * 아이템 목록을 렌더링하고 "더 보기" 버튼을 연결합니다.
 * offset 관리와 추가 로딩은 내부에서 처리하므로, 필터가 바뀔 때마다 다시 호출하면 됩니다.
 */
export function renderList<T>(items: T[], toCard: (item: T) => TemplateResult) {
  const listEl = document.querySelector<HTMLElement>('.js-list')
  const countEl = document.querySelector<HTMLElement>('.js-count')
  const moreWrap = document.querySelector<HTMLElement>('.js-more')
  if (!listEl || !countEl || !moreWrap) return

  countEl.textContent = String(items.length)
  let shown = 0

  const showMore = () => {
    shown = Math.min(shown + PAGE_SIZE, items.length)
    render(items.slice(0, shown).map(toCard), listEl)
    moreWrap.hidden = shown >= items.length
  }

  showMore()

  // 필터가 바뀌어 다시 부르면 같은 템플릿의 클릭 핸들러만 새 showMore로 바뀌므로 리스너가 쌓이지 않는다.
  render(
    html`
      <mm-show-more-button @click=${showMore}></mm-show-more-button>
    `,
    moreWrap,
  )
}

/**
 * 등장 횟수가 minCount 이상인 country 목록을 빈도순으로 반환합니다.
 */
export function getCountries<T extends { country?: string }>(
  items: T[],
  minCount: number,
): string[] {
  const counts: Record<string, number> = {}
  items.forEach(item => {
    if (item.country) counts[item.country] = (counts[item.country] ?? 0) + 1
  })
  return Object.entries(counts)
    .filter(([, count]) => count >= minCount)
    .sort((a, b) => b[1] - a[1])
    .map(([country]) => country)
}

/** films·books 공통 JSON 로더. 실패 시 null을 반환합니다. */
export async function loadJson<T>(url: string): Promise<T[] | null> {
  try {
    const response = await fetch(url)
    return await response.json()
  } catch {
    return null
  }
}
