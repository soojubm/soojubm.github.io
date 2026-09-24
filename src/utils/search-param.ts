/** 현재 URL의 search parameter 값을 읽는다. 없으면 null. */
export const getSearchParam = (key: string): string | null =>
  new URLSearchParams(window.location.search).get(key)

/**
 * 현재 URL의 search parameter를 바꾼다.
 * 같은 페이지 안의 뷰 전환은 히스토리에 쌓지 않도록 replaceState를 쓴다.
 * 그래서 뒤로 가기는 이전 페이지로 나가고, 새로고침·공유 링크는 같은 뷰로 연다.
 */
export const replaceSearchParam = (key: string, value: string) => {
  const url = new URL(window.location.href)
  url.searchParams.set(key, value)
  window.history.replaceState(window.history.state, '', url)
}
