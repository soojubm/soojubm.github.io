import { css, unsafeCSS } from 'lit'

import { buildAttributeRules } from '@/utils'

export type SurfaceVariant = 'ghost' | 'paper' | 'outlined' | 'filled' | 'elevated'
export type SurfaceRadius = 'default' | 'large'
export type SurfaceTone = 'green'

/**
 * variant별로 재정의하는 surface 컴포넌트 토큰. 이 오브젝트가 실제 :host([variant=...]) 규칙을
 * 생성하는 유일한 소스다(아래 surfaceVariantStyles 참고). 키가 컴포넌트 토큰 이름이라
 * 리액트로 옮길 때도 같은 이름의 CSS 커스텀 프로퍼티를 그대로 재사용할 수 있다.
 */
const surfaceVariants: Record<SurfaceVariant, Record<string, string>> = {
  ghost: {
    '--surface-border': 'var(--border-transparent)',
    '--surface-background-color': 'none',
  },
  paper: {
    '--surface-border': 'var(--border-transparent)',
    '--surface-background-color': 'var(--background-color)',
  },
  outlined: {},
  filled: {
    '--surface-border': 'var(--border-transparent)',
    '--surface-background-color': 'var(--background-subtle-color)',
  },
  elevated: {
    '--surface-shadow': '0 4px 12px rgba(0, 0, 0, 0.15)',
  },
}

/**
 * tone별로 재정의하는 surface 컴포넌트 토큰. variant와 별개의 축으로,
 * 의미색(성공 등)을 표현할 때만 사용한다.
 */
const surfaceTones: Record<SurfaceTone, Record<string, string>> = {
  green: {
    '--surface-border': 'var(--tag-category-2-border)',
    '--surface-background-color': 'var(--tag-category-2-bg)',
    '--surface-text-color': 'var(--tag-category-2-text)',
  },
}

const surfaceBaseStyles = css`
  :host {
    --surface-height: auto;
    --surface-padding: var(--space-4);
    --surface-border: var(--border);
    --surface-border-radius: var(--radius);
    --surface-background-color: var(--background-color);
    --surface-text-color: inherit;
    --surface-shadow: none;

    display: flex;
    flex-direction: column;
    height: var(--surface-height);
    width: 100%;
    padding: var(--surface-padding);
    border: var(--surface-border);
    border-radius: var(--surface-border-radius);
    box-sizing: border-box;
    background: var(--surface-background-color);
    color: var(--surface-text-color);
    box-shadow: var(--surface-shadow);

    position: relative;
    z-index: var(--material-zindex-raised);
    transition: box-shadow var(--transition-duration) var(--transition-easing);
  }
`

const surfaceRadiusTokens = {
  default: { '--surface-border-radius': 'var(--radius)' },
  large: { '--surface-border-radius': 'var(--radius-large)' },
}

const surfaceRadiusStyles = css`
  ${unsafeCSS(buildAttributeRules('radius', surfaceRadiusTokens))}
`

const surfaceVariantStyles = css`
  ${unsafeCSS(buildAttributeRules('variant', surfaceVariants))}
`

const surfaceToneStyles = css`
  ${unsafeCSS(buildAttributeRules('tone', surfaceTones))}
`

export const surfaceStyles = [
  surfaceBaseStyles,
  surfaceRadiusStyles,
  surfaceVariantStyles,
  surfaceToneStyles,
]
