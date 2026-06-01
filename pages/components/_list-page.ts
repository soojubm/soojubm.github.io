/**
 * 공통 리스트 페이지 유틸리티.
 * films·books처럼 "필터 + 페이지네이션 목록" 구조를 공유합니다.
 */

export const PAGE_SIZE = 60

/**
 * 아이템 목록을 렌더링하고 "더 보기" 버튼을 연결합니다.
 * @param items   전체 필터링된 배열
 * @param offset  현재까지 표시된 개수 (0이면 새 렌더, 양수면 추가)
 * @param toCard  아이템 → HTML 문자열 변환 함수
 * @param onMore  다음 offset으로 재호출하는 콜백
 */
export function renderList<T>(
  items: T[],
  offset: number,
  toCard: (item: T) => string,
  onMore: (nextOffset: number) => void,
) {
  const listEl = document.querySelector<HTMLElement>('.js-list')
  const countEl = document.querySelector<HTMLElement>('.js-count')
  const moreWrap = document.querySelector<HTMLElement>('.js-more')
  const moreBtn = document.querySelector<HTMLElement>('.js-more-btn')
  if (!listEl || !countEl || !moreWrap) return

  const slice = items.slice(0, offset + PAGE_SIZE)
  countEl.textContent = String(items.length)

  if (offset === 0) {
    listEl.innerHTML = slice.map(toCard).join('')
  } else {
    listEl.insertAdjacentHTML(
      'beforeend',
      items.slice(offset, offset + PAGE_SIZE).map(toCard).join(''),
    )
  }

  const hasMore = slice.length < items.length
  moreWrap.style.display = hasMore ? '' : 'none'

  if (hasMore && moreBtn) {
    const nextOffset = offset + PAGE_SIZE
    const newBtn = moreBtn.cloneNode(true) as HTMLElement
    moreBtn.replaceWith(newBtn)
    newBtn.addEventListener('click', () => onMore(nextOffset))
  }
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
    .filter(([, n]) => n >= minCount)
    .sort((a, b) => b[1] - a[1])
    .map(([c]) => c)
}
