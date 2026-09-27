export type Constructor<T = object> = new (...args: any[]) => T

/**
 * host에서 CustomEvent를 디스패치하는 헬퍼.
 *
 * 기본으로 shadow 경계를 넘는 bubbles/composed를 켜고 detail을 그대로 싣는다.
 * 내부 전용 이벤트처럼 전파를 막고 싶으면 init으로 덮어쓴다.
 * dispatchEvent 결과(boolean)를 반환하므로 cancelable 이벤트에도 쓸 수 있다.
 */
export const emit = <T = unknown>(
  host: EventTarget,
  type: string,
  detail?: T,
  init?: EventInit,
): boolean =>
  host.dispatchEvent(new CustomEvent(type, { bubbles: true, composed: true, detail, ...init }))

/**
 * prefix 기반 고유 ID를 생성한다.
 * crypto.randomUUID를 우선 쓰고, 미지원 환경에서는 Math.random으로 폴백한다.
 */
export const uniqueId = (prefix: string): string =>
  `${prefix}-${crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2)}`

/**
 * shadow 경계를 따라 내려가 실제로 포커스를 가진 요소를 찾는다.
 * document.activeElement는 가장 바깥 shadow host에서 멈추기 때문이다.
 */
export const getDeepActiveElement = (): Element | null => {
  let active = document.activeElement
  while (active?.shadowRoot?.activeElement) active = active.shadowRoot.activeElement
  return active
}

/** 토큰 묶음을 CSS 선언 문자열로 펼친다. */
export const buildDeclarations = (tokens: Record<string, string>) =>
  Object.entries(tokens)
    .map(([token, tokenValue]) => `${token}: ${tokenValue};`)
    .join(' ')

export const buildAttributeRules = (
  attribute: string,
  values: Record<string, Record<string, string>>,
  descendant = '',
) =>
  Object.entries(values)
    .map(([value, tokens]) => {
      const declarations = buildDeclarations(tokens)
      const selector = descendant
        ? `:host([${attribute}='${value}']) ${descendant}`
        : `:host([${attribute}='${value}'])`
      return `${selector} { ${declarations} }`
    })
    .join('\n')

function toPageId(path: string) {
  return path.split('/').pop()?.replace('.html', '') || 'index'
}

export function getCurrentPageId() {
  return toPageId(window.location.pathname)
}

/** 링크가 지금 보고 있는 페이지를 가리키는지 판단한다. 내비게이션 항목의 aria-current 기준. */
export function isCurrentPage(href: string) {
  return !!href && toPageId(href) === getCurrentPageId()
}
