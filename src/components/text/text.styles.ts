import { css } from 'lit'

export const textSizes = {
  '32': { fontSize: 'var(--font-size-32)', lineHeight: 'var(--font-line-height-40)' },
  '24': { fontSize: 'var(--font-size-24)', lineHeight: 'var(--font-line-height-32)' },
  '18': { fontSize: 'var(--font-size-18)', lineHeight: 'var(--font-line-height-28)' },
  '14': { fontSize: 'var(--font-size-14)', lineHeight: 'var(--font-line-height-24)' },
  '12': { fontSize: 'var(--font-size-12)', lineHeight: 'var(--font-line-height-16)' },
} as const

export const textWeights = {
  medium: 'var(--font-weight-medium)',
  bold: 'var(--font-weight-bold)',
} as const

// 타입 추론을 위한 타입 정의
export type TextSize = keyof typeof textSizes
export type TextWeight = keyof typeof textWeights

export const textStyles = css`
  h1,
  h2,
  h3,
  p {
    margin: 0;
    line-height: var(--font-line-height-large);
  }

  ul {
    margin: 0;
  }

  .checklist {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    padding-left: 0;
  }

  .checklist li {
    list-style: none;
    margin-left: 0;
    padding-left: var(--space-4);
    position: relative;
  }

  .checklist li::before {
    content: '';
    position: absolute;
    top: 6px;
    left: 3px;
    width: 2px;
    height: 6px;
    border: 1px solid var(--color-background-strong);
    border-width: 0 1px 1px 0;
    transform: rotate(37.5deg);
  }

  .text[data-center='true'] {
    text-align: center;
  }

  .text[data-truncated='true'] {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .util-truncate-multi {
    white-space: normal;
    word-wrap: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .summary {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: var(--space-2);
  }

  .summary-item {
    display: flex;
    justify-content: space-between;
  }

  .summary-item[data-alignment='inline'] {
    justify-content: baseline;
    gap: var(--space-2);
  }
`
