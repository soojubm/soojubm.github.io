import { css, unsafeCSS } from 'lit'

import { buildAttributeRules } from '@/utils'

export type TextSize = '32' | '24' | '18' | '14' | '12'
export type TextWeight = 'medium' | 'bold'
export type TextColor = 'inherit' | 'light' | 'danger'
export type TextMaxLength = '' | '1' | '2' | '3'

/** 본문 텍스트 크기 이름(paragraph 등)과 TextSize 토큰의 대응. 본문 사이즈 값은 여기서만 정의한다. */
export type ParagraphSize = 'small' | 'medium' | 'large'

export const paragraphSizeToTextSize: Record<ParagraphSize, TextSize> = {
  small: '12',
  medium: '14',
  large: '18',
}

export const textMaxLengthStyles = css`
  /* max-length는 reflect라 값이 없을 때도 attribute가 남는다. 값이 있을 때만 자른다. */
  :host([max-length]:not([max-length=''])) > * {
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

export const textSizeTokens: Record<TextSize, Record<string, string>> = {
  '12': { 'font-size': 'var(--font-size-12)', 'line-height': 'var(--font-line-height-16)' },
  '14': { 'font-size': 'var(--font-size-14)', 'line-height': 'var(--font-line-height-24)' },
  '18': { 'font-size': 'var(--font-size-18)', 'line-height': 'var(--font-line-height-28)' },
  '24': { 'font-size': 'var(--font-size-24)', 'line-height': 'var(--font-line-height-32)' },
  '32': { 'font-size': 'var(--font-size-32)', 'line-height': 'var(--font-line-height-40)' },
}

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
`
