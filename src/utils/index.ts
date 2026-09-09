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
 * gap·간격 prop 문자열을 CSS 길이로 변환한다.
 * 숫자와 `section`은 `--space-*` 토큰으로, 그 외 값(`1rem` 등)은 그대로 통과시키고,
 * 빈 값은 빈 문자열을 반환한다.
 */
export const resolveSpaceToken = (value: string): string => {
  if (!value) return ''
  if (value === '0') return '0'
  if (value === 'section') return 'var(--space-section)'
  return /^\d+$/.test(value) ? `var(--space-${value})` : value
}

export const buildAttributeRules = (
  attribute: string,
  values: Record<string, Record<string, string>>,
  descendant = '',
) =>
  Object.entries(values)
    .map(([value, tokens]) => {
      const declarations = Object.entries(tokens)
        .map(([token, tokenValue]) => `${token}: ${tokenValue};`)
        .join(' ')
      const selector = descendant
        ? `:host([${attribute}='${value}']) ${descendant}`
        : `:host([${attribute}='${value}'])`
      return `${selector} { ${declarations} }`
    })
    .join('\n')

export function getCurrentPageId() {
  return window.location.pathname.split('/').pop()?.replace('.html', '') || 'index'
}
