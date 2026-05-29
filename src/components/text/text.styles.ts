import { css } from 'lit'

// const textVariants = {
// display: {
//   fontSize: '64px',
//   lineHeight: '1',
//   fontWeight: 'var(--font-weight-bold)',
// },

export const textSizes = {
  // 1. 구형 variant 토큰 (마이그레이션 완료 후 삭제 예정)
  title: { fontSize: 'var(--font-size-32)', lineHeight: 'var(--font-size-32)' },
  heading2: { fontSize: 'var(--font-size-24)', lineHeight: 'var(--font-size-24)' },
  subhead: { fontSize: 'var(--font-size-18)', lineHeight: 'var(--font-size-18)' },
  body: { fontSize: 'var(--font-size-14)', lineHeight: 'var(--font-size-14)' },
  'body-large': { fontSize: 'var(--font-size-18)', lineHeight: 'var(--font-size-18)' },
  caption: {
    fontSize: 'var(--font-size-12)',
    lineHeight: 'var(--font-size-12)',
  },

  // 2. 신형 Primitive 전용 사이즈 토큰 (숫자 기반)
  '32': { fontSize: 'var(--font-size-32)', lineHeight: 'var(--font-size-32)' },
  '24': { fontSize: 'var(--font-size-24)', lineHeight: 'var(--font-size-24)' },
  '18': { fontSize: 'var(--font-size-18)', lineHeight: 'var(--font-size-18)' },
  '14': { fontSize: 'var(--font-size-14)', lineHeight: 'var(--font-size-14)' },
  '12': { fontSize: 'var(--font-size-12)', lineHeight: 'var(--font-size-12)' },
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

  .text-group {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }

  .text-group[data-variant='small'] {
    gap: var(--space-1);
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

  .statistic {
    display: flex;
    gap: 2rem;
  }
  .statistic-item {
    position: relative;
  }
  .statistic-label {
    display: block;
    color: var(--color-foreground-light);
    line-height: 24px;
  }
  .statistic-value {
    display: block;
    font-size: var(--font-size-18);
    font-weight: var(--font-weight-bold);
  }
  .statistic[data-size='small'] .statistic-item {
    display: flex;
    align-items: center;
  }
  .statistic[data-size='small'] .statistic-value {
    margin: 0 0 0 var(--space-1);
    font-size: var(--font-size-14);
  }
`
