import { unsafeCSS } from 'lit'

export const BREAKPOINT = {
  large: '1560px',
  small: '1100px',
  narrow: '1000px',
  tiny: '880px',
  compact: '800px',
  phone: '480px',
} as const

export const MEDIA_QUERY = {
  large: `(max-width: ${BREAKPOINT.large})`,
  small: `(max-width: ${BREAKPOINT.small})`,
  narrow: `(max-width: ${BREAKPOINT.narrow})`,
  tiny: `(max-width: ${BREAKPOINT.tiny})`,
  compact: `(max-width: ${BREAKPOINT.compact})`,
  phone: `(max-width: ${BREAKPOINT.phone})`,
} as const

export const MEDIA = {
  large: unsafeCSS(MEDIA_QUERY.large),
  small: unsafeCSS(MEDIA_QUERY.small),
  narrow: unsafeCSS(MEDIA_QUERY.narrow),
  tiny: unsafeCSS(MEDIA_QUERY.tiny),
  compact: unsafeCSS(MEDIA_QUERY.compact),
  phone: unsafeCSS(MEDIA_QUERY.phone),
} as const
