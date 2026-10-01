/**
 * films·books가 공유하는 "필터 + 페이지네이션 목록" 페이지 유틸리티.
 */
import type { FilterOption } from '@/components/common'
import type { MediaListFilter } from '@/components/domains/media-card'

import '@/components/domains/media-card'

export const toFilterOptions = (
  values: string[],
  getLabel = (value: string) => value,
): FilterOption[] => values.map(value => ({ value, label: getLabel(value) }))

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

/** 등장 횟수가 minCount 이상인 국가로 좁히는 필터. */
export const countryFilter = <T extends { country?: string }>(
  items: T[],
  minCount: number,
): MediaListFilter => ({
  label: '국가',
  options: toFilterOptions(getCountries(items, minCount)),
  matches: (item, country) => item.country === country,
})

/** films·books 공통 JSON 로더. 실패 시 null을 반환합니다. */
export async function loadJson<T>(url: string): Promise<T[] | null> {
  try {
    const response = await fetch(url)
    return await response.json()
  } catch {
    return null
  }
}
