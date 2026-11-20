import { css, unsafeCSS } from 'lit'

import { MEDIA } from '@/constants'
import { buildAttributeRules, type AttributeTokens } from '@/utils'

export type SurfaceVariant = 'ghost' | 'paper' | 'outlined' | 'filled' | 'elevated'
export type SurfaceRadius = 'default' | 'large'

/**
 * variant별로 재정의하는 surface 컴포넌트 토큰. 이 오브젝트가 실제 :host([variant=...]) 규칙을
 * 생성하는 유일한 소스다(아래 surfaceVariantStyles 참고). 키가 컴포넌트 토큰 이름이라
 * 리액트로 옮길 때도 같은 이름의 CSS 커스텀 프로퍼티를 그대로 재사용할 수 있다.
 */
const surfaceElevatedTokens = {
  '--surface-shadow': 'var(--material-elevated-shadow)',
}

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
  elevated: surfaceElevatedTokens,
}

/** elevated variant의 선언. variant 속성 없이 호스트에서 직접 면을 쓰는 컴포넌트가 가져다 쓴다. */
export const surfaceElevatedStyles = css`
  ${unsafeCSS(
    Object.entries(surfaceElevatedTokens)
      .map(([name, value]) => `${name}: ${value};`)
      .join(' '),
  )}
`

/**
 * surface 면 선언. 면을 맡을 선택자는 사용부가 정한다.
 * 모든 값이 --surface-* 토큰을 거치므로 variant든 선택·hover 상태든
 * 속성을 다시 선언하지 않고 토큰만 재할당한다.
 */
export const surfaceBaseStyles = css`
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
  transition: box-shadow var(--transition-duration) var(--transition-easing);
`

const surfaceRadiusTokens: AttributeTokens<SurfaceRadius> = {
  default: { '--surface-border-radius': 'var(--radius)' },
  large: { '--surface-border-radius': 'var(--radius-large)' },
}

const surfaceRadiusStyles = css`
  ${unsafeCSS(buildAttributeRules('radius', surfaceRadiusTokens))}
`

const surfaceVariantStyles = css`
  ${unsafeCSS(buildAttributeRules('variant', surfaceVariants))}
`

/**
 * 좁은 화면에서 면을 페이지 좌우 여백까지 넓힌다. 내용은 여백 안쪽에 그대로 남아 페이지 본문과 정렬된다.
 * 페이지 본문이 `--layout-padding-inline`만큼 좌우 여백을 가진 맥락을 전제한다.
 * radius·variant가 정한 값을 덮어쓰므로 그 규칙들 뒤에 둔다.
 */
const surfaceBleedStyles = css`
  @media ${MEDIA.narrow} {
    :host([bleed]) {
      --surface-border-radius: 0;

      width: calc(100% + var(--layout-padding-inline) * 2);
      margin-inline: calc(var(--layout-padding-inline) * -1);
      padding-inline: var(--layout-padding-inline);
      border-inline-width: 0;
    }
  }
`

export const surfaceStyles = [
  css`
    :host {
      ${surfaceBaseStyles};
    }
  `,
  surfaceRadiusStyles,
  surfaceVariantStyles,
  surfaceBleedStyles,
]
