/**
 * 공통 리스트 페이지 유틸리티.
 * films·books처럼 "필터 + 페이지네이션 목록" 구조를 공유합니다.
 */

const PAGE_SIZE = 60

/**
 * 아이템 목록을 렌더링하고 "더 보기" 버튼을 연결합니다.
 * offset 관리와 추가 로딩은 내부에서 처리하므로, 필터가 바뀔 때마다 다시 호출하면 됩니다.
 */
export function renderList<T>(items: T[], toCard: (item: T) => string) {
  const listEl = document.querySelector<HTMLElement>('.js-list')
  const countEl = document.querySelector<HTMLElement>('.js-count')
  const moreWrap = document.querySelector<HTMLElement>('.js-more')
  const moreBtn = document.querySelector<HTMLElement>('.js-more-btn')
  if (!listEl || !countEl || !moreWrap) return

  countEl.textContent = String(items.length)
  listEl.innerHTML = ''
  let shown = 0

  const showMore = () => {
    const slice = items.slice(shown, shown + PAGE_SIZE)
    listEl.insertAdjacentHTML('beforeend', slice.map(toCard).join(''))
    shown += slice.length
    moreWrap.style.display = shown < items.length ? '' : 'none'
  }

  showMore()

  if (moreBtn) {
    // 필터 재렌더 시 이전 리스너가 남지 않도록 버튼을 교체하고 다시 연결한다.
    const freshBtn = moreBtn.cloneNode(true) as HTMLElement
    moreBtn.replaceWith(freshBtn)
    freshBtn.addEventListener('click', showMore)
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

/** films·books 공통 JSON 로더. 실패 시 null을 반환합니다. */
export async function loadJson<T>(url: string): Promise<T[] | null> {
  try {
    const res = await fetch(url)
    return await res.json()
  } catch {
    return null
  }
}

export interface MediaItem {
  releasedate?: number
  titlekorean: string
  titleenglish: string
  director: string
  country?: string
}

/** films·books가 공유하는 카드 마크업. */
export function mediaCard(item: MediaItem): string {
  return `
    <article style="border:var(--border);padding:var(--space-3);border-radius:var(--radius)">
      <mm-flex direction="column" gap="1">
        <mm-flex justify-content="space-between" align-items="center" gap="2">
          <time style="font-size:var(--font-size-12);color:var(--color-foreground-light)">${
            item.releasedate ?? ''
          }</time>
          <mm-text size="12" color="light">${item.country ?? ''}</mm-text>
        </mm-flex>
        <mm-paragraph style="margin:0;font-weight:var(--font-weight-bold);line-height:1.3">${
          item.titlekorean
        }</mm-paragraph>
        <mm-paragraph style="margin:0;font-size:var(--font-size-12);color:var(--color-foreground-light)">${
          item.titleenglish
        }</mm-paragraph>
        <mm-paragraph style="margin:0;font-size:var(--font-size-14)">${item.director}</mm-paragraph>
      </mm-flex>
    </article>
  `
}
