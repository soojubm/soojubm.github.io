import { ICON_NAMES, type IconName } from '@/components/common/icon-button/semantics/icon-names'
import { ANIMATED_CLASSNAME, THEME_STORAGE_KEY } from '@/constants'

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

const parseJsonArray = <T>(value: string | null, fallback: T[] = []): T[] => {
  if (!value) return fallback

  try {
    const parsed = JSON.parse(value)
    return Array.isArray(parsed) ? parsed : fallback
  } catch {
    return fallback
  }
}

export const arrayAttributeConverter = <T>(fallback: T[] = []) => ({
  fromAttribute: (value: string | null) => parseJsonArray<T>(value, fallback),
  toAttribute: (value: T[]) => JSON.stringify(value ?? fallback),
})

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

export type Theme = 'light' | 'dark' | 'brutal' | 'glass'

export const THEMES: { value: Theme; icon: IconName; label: string }[] = [
  { value: 'light', icon: ICON_NAMES.LIGHT_MODE, label: 'Day' },
  { value: 'dark', icon: ICON_NAMES.DARK_MODE, label: 'Night' },
  { value: 'brutal', icon: ICON_NAMES.THEME, label: 'Brutal' },
  { value: 'glass', icon: ICON_NAMES.THEME, label: 'Glass' },
]

const DEFAULT_THEME: Theme = 'light'

function isTheme(value: string | null): value is Theme {
  return THEMES.some(theme => theme.value === value)
}

function getStoredTheme(): Theme | null {
  const theme = localStorage.getItem(THEME_STORAGE_KEY)
  return isTheme(theme) ? theme : null
}

// 시스템 설정(prefers-color-scheme)에 따른 다크모드는 일단 적용하지 않는다.
// function getSystemTheme(): Theme {
//   return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : DEFAULT_THEME
// }

export function getPreferredTheme(): Theme {
  return getStoredTheme() ?? DEFAULT_THEME
}

export function applyTheme(theme = getPreferredTheme()) {
  document.body.dataset.theme = theme
  return theme
}

export function saveTheme(theme: Theme) {
  localStorage.setItem(THEME_STORAGE_KEY, theme)
  return applyTheme(theme)
}

function throttle(callback: () => void) {
  let timer: number | undefined

  return function () {
    if (timer) window.cancelAnimationFrame(timer)
    timer = window.requestAnimationFrame(() => callback())
  }
}

export function stopAnimation() {
  let resizeTimer: ReturnType<typeof setTimeout> | undefined

  window.addEventListener(
    'resize',
    throttle(() => {
      document.body.classList.add('resize-animation-stopper')
      if (resizeTimer) clearTimeout(resizeTimer)

      resizeTimer = setTimeout(() => {
        document.body.classList.remove('resize-animation-stopper')
      }, 400)
    }),
  )
}

export const scrollAnimation = ({ selector }: { selector: string }) => {
  if (!('IntersectionObserver' in window)) return

  const callback = (entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return

      entry.target.classList.toggle(ANIMATED_CLASSNAME, entry.isIntersecting)
    })
  }
  const options: IntersectionObserverInit = {
    root: null,
    rootMargin: '-100px 0px',
    threshold: [0],
  }

  const observer = new IntersectionObserver(callback, options)

  const targets = Array.from(document.querySelectorAll(selector))
  targets.forEach(target => observer.observe(target))
}
