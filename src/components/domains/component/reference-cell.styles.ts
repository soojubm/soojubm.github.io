import { css } from 'lit'

import { focusRingStyles } from '@/stylesheets/shared.styles'

/** 레퍼런스 행의 모양. 적용 대상은 쓰는 컴포넌트가 `a`로 맞춘다. */
export const referenceCellStyles = css`
  :host {
    display: block;
  }

  a {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-2);
    min-height: var(--size-48);
    padding: var(--space-3) var(--space-6);
    color: var(--foreground-color);
    font-family: var(--font-family-code);
    font-size: var(--font-size-14);
    text-transform: uppercase;
    transition: background-color var(--transition-duration) var(--transition-easing);
  }

  a:hover {
    background: var(--background-subtle-color);
  }

  a:focus-visible {
    ${focusRingStyles};
  }
`
