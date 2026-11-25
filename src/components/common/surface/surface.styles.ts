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

const surfaceFilledTokens = {
  '--surface-border': 'var(--border-transparent)',
  '--surface-background-color': 'var(--background-subtle-color)',
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
  filled: surfaceFilledTokens,
  elevated: surfaceElevatedTokens,
}

/** filled variant의 선언. variant 속성 없이 자기 요소에 직접 면을 쓰는 컴포넌트가 가져다 쓴다. */
export const surfaceFilledStyles = css`
  ${unsafeCSS(
    Object.entries(surfaceFilledTokens)
      .map(([name, value]) => `${name}: ${value};`)
      .join(' '),
  )}
`

/** elevated variant의 선언. variant 속성 없이 자기 요소에 직접 면을 쓰는 컴포넌트가 가져다 쓴다. */
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
  --surface-border-radius: var(--border-radius);
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
  default: { '--surface-border-radius': 'var(--border-radius)' },
  large: { '--surface-border-radius': 'var(--border-radius-large)' },
}

const surfaceRadiusStyles = css`
  ${unsafeCSS(buildAttributeRules('radius', surfaceRadiusTokens))};
`

const surfaceVariantStyles = css`
  ${unsafeCSS(buildAttributeRules('variant', surfaceVariants))};
`

/**
 * 면을 페이지 좌우 여백 밖 화면 가장자리까지 넓히고 좌우 테두리·radius를 걷는 선언.
 * 적용할 좁은 화면 조건과 대상은 사용하는 쪽이 정한다. 페이지 본문이 `--layout-padding-inline`만큼 좌우 여백을 가진 맥락을 전제한다.
 */
export const surfaceBleedStyles = css`
  --surface-border-radius: 0;

  width: calc(100% + var(--layout-padding-inline) * 2);
  margin-inline: calc(var(--layout-padding-inline) * -1);
  border-inline-width: 0;
`

/**
 * 좁은 화면에서 면을 페이지 좌우 여백까지 넓힌다. 내용은 여백 안쪽에 그대로 남아 페이지 본문과 정렬된다.
 * radius·variant가 정한 값을 덮어쓰므로 그 규칙들 뒤에 둔다.
 */
const surfaceBleedHostStyles = css`
  @media ${MEDIA.narrow} {
    :host([bleed]) {
      ${surfaceBleedStyles}
      padding-inline: var(--layout-padding-inline);
    }
  }
`

/**
 * 면을 화면 좌우 끝까지 넓힌다. 내용은 페이지 본문 칼럼 안에 그대로 남아 다른 구획과 정렬된다.
 * 너비를 늘리지 않고 그림자와 clip-path로 면만 번지게 하므로 가로 스크롤이 생기지 않는다.
 * 위아래 여백은 구획 간격 토큰으로 정해지고, radius·테두리는 걷는다. variant가 정한 값을 덮어쓰므로 뒤에 둔다.
 */
const surfaceBandStyles = css`
  :host([band]) {
    --surface-padding: var(--space-section) 0;
    --surface-border: var(--border-transparent);
    --surface-border-radius: 0;

    box-shadow: 0 0 0 100vmax var(--surface-background-color);
    clip-path: inset(0 -100vmax);
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
  surfaceBleedHostStyles,
  surfaceBandStyles,
]
