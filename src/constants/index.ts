import { unsafeCSS } from 'lit'

const BREAKPOINT = {
  wide: '1560px',
  default: '1200px',
  narrow: '800px',
  compact: '480px',
} as const

export const MEDIA_QUERY = {
  wide: `(max-width: ${BREAKPOINT.wide})`,
  default: `(max-width: ${BREAKPOINT.default})`,
  narrow: `(max-width: ${BREAKPOINT.narrow})`,
  compact: `(max-width: ${BREAKPOINT.compact})`,
} as const

export const MEDIA = {
  wide: unsafeCSS(MEDIA_QUERY.wide),
  default: unsafeCSS(MEDIA_QUERY.default),
  narrow: unsafeCSS(MEDIA_QUERY.narrow),
  compact: unsafeCSS(MEDIA_QUERY.compact),
} as const

export const THEME_STORAGE_KEY = 'theme'

/** IntersectionObserver가 노출된 요소에 붙이는 전역 클래스. */
export const ANIMATED_CLASSNAME = 'is-observed'
