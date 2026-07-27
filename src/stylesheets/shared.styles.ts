import { css, unsafeCSS } from 'lit'

import resetCss from '@/stylesheets/shared/reset.css?raw'

export const resetStyles = css`
  ${unsafeCSS(resetCss)}

  :host {
    box-sizing: border-box;
    font: inherit;
    color: inherit;
  }

  body,
  dl,
  dd,
  figure,
  blockquote,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  input[type='radio'],
  input[type='checkbox'] {
    margin: 0;
  }

  ul,
  ol,
  menu,
  fieldset,
  legend {
    margin: 0;
    padding: 0;
  }
`

/** 공유 focus 링 선언. --interaction-focus-outline 토큰을 소비하는 선택자 안에 펼쳐 쓴다. */
export const focusRing = css`
  outline: var(--interaction-focus-outline);
  outline-offset: 2px;
`

export const scrollbarStyles = css`
  &::-webkit-scrollbar {
    width: 0.5rem;
    height: 0.5rem;
    padding: 0.125rem;
    opacity: 0;
  }
  &::-webkit-scrollbar-track {
    background: inherit;
  }
  &::-webkit-scrollbar-thumb {
    margin: 0.125rem;
    background: var(--background-subtle-color);
    border-radius: var(--radius);
  }
  &::-webkit-scrollbar-button {
    display: none;
    background-color: inherit;
  }
  &::-webkit-scrollbar-corner {
    background-color: inherit;
  }

  &:hover::-webkit-scrollbar-thumb {
    background: var(--background-strong-color);
  }
`

/** chat-suggestions·search-suggestions처럼 스크롤바 없이 가로로 넘어가는 행이 공유하는 규칙. */
export const horizontalScrollRowStyles = css`
  :host {
    display: flex;
    gap: var(--space-2);
    flex-wrap: nowrap;
    overflow-x: auto;
    scroll-behavior: smooth;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  :host::-webkit-scrollbar {
    display: none;
  }
`
