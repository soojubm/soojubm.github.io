import { unsafeCSS, type CSSResult } from 'lit'

/**
 * button / icon-button 공유 컴포넌트 토큰.
 * 두 컴포넌트가 동일한 --button-* 토큰을 한 곳(객체)에서 관리한다.
 */
export const buttonTokens = {
  '--button-size': 'var(--size-medium)',
  '--button-min-width': '5rem',
  '--button-padding-inline': 'var(--space-3)',
  '--button-color': 'var(--color-background-subtle)',
  '--button-radius': 'var(--radius)',
  '--button-text-color': 'var(--color-foreground)',
  '--button-text-size': 'inherit',
  '--button-text-weight': 'var(--font-weight-bold)',
} as const

/** 토큰 객체를 :host 안에 넣을 CSS 선언 묶음으로 변환 */
export const buttonHostTokens: CSSResult = unsafeCSS(
  Object.entries(buttonTokens)
    .map(([name, value]) => `${name}: ${value};`)
    .join('\n      '),
)
