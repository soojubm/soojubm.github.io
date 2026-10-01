/**
 * localStorage 접근을 예외로부터 보호한다. 저장소를 막은 브라우저와 일부 웹뷰에서는 접근만 해도 예외가 나므로,
 * 읽기는 값이 없는 것으로, 쓰기는 이번 방문에서만 적용하는 것으로 처리해 저장이 안 되는 환경에서도 화면이 동작하게 한다.
 */
export function readStorage(key: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

export function writeStorage(key: string, value: string) {
  try {
    localStorage.setItem(key, value)
  } catch {
    // 저장할 수 없는 환경에서는 저장 없이 넘어간다.
  }
}
