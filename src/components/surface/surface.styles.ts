import { css, unsafeCSS } from 'lit'

export type SurfaceVariant = 'ghost' | 'outlined' | 'plain' | 'filled' | 'elevated'
export type SurfaceRadius = 'default' | 'large'

/**
 * variant별로 재정의하는 surface 컴포넌트 토큰. 이 오브젝트가 실제 :host([variant=...]) 규칙을
 * 생성하는 유일한 소스다(아래 surfaceVariantStyles 참고). 키가 컴포넌트 토큰 이름이라
 * 리액트로 옮길 때도 같은 이름의 CSS 커스텀 프로퍼티를 그대로 재사용할 수 있다.
 */
export const surfaceVariants: Record<SurfaceVariant, Record<string, string>> = {
  ghost: {
    '--surface-border': 'var(--border-transparent)',
    '--surface-background-color': 'none',
  },
  outlined: {},
  plain: {
    '--surface-padding': '0',
    '--surface-border': '0',
    '--surface-background-color': 'none',
  },
  filled: {
    '--surface-border': 'var(--border-transparent)',
    '--surface-background-color': 'var(--color-background-subtle)',
  },
  elevated: {
    '--surface-shadow': 'var(--material-shadow)',
  },
}

const buildVariantRules = (variants: Record<string, Record<string, string>>) =>
  Object.entries(variants)
    .map(([variant, tokens]) => {
      const declarations = Object.entries(tokens)
        .map(([token, value]) => `${token}: ${value};`)
        .join(' ')
      return `:host([variant='${variant}']) { ${declarations} }`
    })
    .join('\n')

export const surfaceBaseStyles = css`
  :host {
    --surface-height: auto;
    --surface-padding: var(--space-4);
    --surface-border: var(--border);
    --surface-border-radius: var(--radius);
    --surface-background-color: var(--color-background);
    --surface-shadow: none;
    --surface-backdrop-filter: var(--backdrop-filter, none);

    display: flex;
    flex-direction: column;
    height: var(--surface-height);
    width: 100%;
    padding: var(--surface-padding);
    border: var(--surface-border);
    border-radius: var(--surface-border-radius);
    box-sizing: border-box;
    background: var(--surface-background-color);
    box-shadow: var(--surface-shadow);
    /* backdrop-filter: var(--surface-backdrop-filter, none);
    -webkit-backdrop-filter: var(--surface-backdrop-filter, none); */

    position: relative;
    z-index: 1;
    transition: box-shadow 0.2s ease-in-out;
  }
`

export const surfaceRadiusStyles = css`
  :host([radius='default']) {
    --surface-border-radius: var(--radius);
  }

  :host([radius='large']) {
    --surface-border-radius: var(--radius-large);
  }
`

export const surfaceVariantStyles = css`
  ${unsafeCSS(buildVariantRules(surfaceVariants))}
`

export const surfaceStyles = [surfaceBaseStyles, surfaceRadiusStyles, surfaceVariantStyles]
