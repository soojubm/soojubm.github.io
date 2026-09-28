import { css, unsafeCSS } from 'lit'

import type { ComponentSize } from '@/stylesheets/shared.styles'

import { buildAttributeRules, type AttributeTokens } from '@/utils'

/** 표준 세 단계에 표 정렬 아이콘처럼 글자보다 작은 자리를 위한 tiny를 아이콘에만 더한다. medium이 기본(1rem)이다. */
export type IconSize = ComponentSize | 'tiny'

const iconSizeTokens: AttributeTokens<Exclude<IconSize, 'medium'>> = {
  tiny: { 'font-size': '0.75rem' },
  small: { 'font-size': '0.875rem' },
  large: { 'font-size': '1.5rem' },
}

export const iconStyles = css`
  :host {
    display: inline-flex;
  }

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
  }

  ${unsafeCSS(buildAttributeRules('size', iconSizeTokens, '.icon'))}
`
