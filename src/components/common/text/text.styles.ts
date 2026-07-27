import { css, unsafeCSS } from 'lit'

import { buildAttributeRules } from '@/utils/attribute-styles'

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
  danger: { color: 'var(--color-danger)' },
}

const textSizeTokens = {
  '32': { 'font-size': 'var(--font-size-32)', 'line-height': 'var(--font-line-height-40)' },
  '24': { 'font-size': 'var(--font-size-24)', 'line-height': 'var(--font-line-height-32)' },
  '18': { 'font-size': 'var(--font-size-18)', 'line-height': 'var(--font-line-height-28)' },
  '14': { 'font-size': 'var(--font-size-14)', 'line-height': 'var(--font-line-height-24)' },
  '12': { 'font-size': 'var(--font-size-12)', 'line-height': 'var(--font-line-height-16)' },
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
