import { css, unsafeCSS } from 'lit'

import { buildAttributeRules } from '@/utils'

export type TextSize = '32' | '24' | '18' | '14' | '12'
export type TextWeight = 'medium' | 'bold'
export type TextColor = 'inherit' | 'light' | 'danger'
export type TextMaxLength = '' | '1' | '2' | '3'

export const textMaxLengthStyles = css`
  :host([max-length]) > * {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  :host([max-length='1']) > * {
    white-space: nowrap;
  }

  :host([max-length='2']) > *,
  :host([max-length='3']) > * {
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }

  :host([max-length='2']) > * {
    -webkit-line-clamp: 2;
  }

  :host([max-length='3']) > * {
    -webkit-line-clamp: 3;
  }
`

const textColorTokens = {
  light: { color: 'var(--foreground-subtle-color)' },
  danger: { color: 'var(--danger-color)' },
}

/**
 * size 단계마다 짝지어 쓰는 크기·행간 토큰. 이 짝은 여기서만 정하고,
 * 문서 페이지도 값을 옮겨 적지 않고 이 목록을 읽어 소개한다.
 */
export const TEXT_SIZE_TOKENS = [
  { size: '12', fontSize: 'font-size-12', lineHeight: 'font-line-height-16' },
  { size: '14', fontSize: 'font-size-14', lineHeight: 'font-line-height-24' },
  { size: '18', fontSize: 'font-size-18', lineHeight: 'font-line-height-28' },
  { size: '24', fontSize: 'font-size-24', lineHeight: 'font-line-height-32' },
  { size: '32', fontSize: 'font-size-32', lineHeight: 'font-line-height-40' },
]

const textSizeTokens = Object.fromEntries(
  TEXT_SIZE_TOKENS.map(({ size, fontSize, lineHeight }) => [
    size,
    { 'font-size': `var(--${fontSize})`, 'line-height': `var(--${lineHeight})` },
  ]),
)

export const textStyles = css`
  :host {
    display: block;
    color: inherit;
  }

  ${unsafeCSS(buildAttributeRules('color', textColorTokens))}

  :host([centered]) {
    display: block;
    text-align: center;
  }

  ${unsafeCSS(buildAttributeRules('size', textSizeTokens))}

  :host([weight='bold']) {
    font-weight: var(--font-weight-bold);
  }

  ${textMaxLengthStyles}

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  span {
    margin: 0;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    font-weight: inherit;
    color: inherit;
  }
`
