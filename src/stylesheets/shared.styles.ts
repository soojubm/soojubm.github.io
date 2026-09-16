import { css, unsafeCSS } from 'lit'

import resetCss from '@/stylesheets/shared/reset.css?raw'

export const resetStyles = css`
  ${unsafeCSS(resetCss)}

  :host {
    box-sizing: border-box;
    font: inherit;
    color: inherit;
  }

  /* reset.css의 문서 본문용 목록 들여쓰기·간격은 컴포넌트 안에서 되돌린다.
     인라인된 reset.css 뒤에 와야 하고, 선택자 명시도를 맞춘다. */
  ul,
  ol,
  menu,
  fieldset,
  legend {
    margin: 0;
    padding: 0;
  }

  ul li:not(:first-child) {
    margin: 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font: inherit;
  }

  input,
  textarea {
    padding: 0;
    border: none;
    background: none;
    font: inherit;
    color: inherit;
  }

  input:is([type='text'], [type='search'], [type='password'], [type='date'], [type='number']),
  textarea {
    -webkit-appearance: none;
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }

  input::-webkit-inner-spin-button,
  input::-webkit-outer-spin-button {
    display: none;
    -webkit-appearance: none;
  }

  input::-webkit-search-decoration,
  input::-webkit-search-cancel-button,
  input::-webkit-search-results-button,
  input::-webkit-search-results-decoration {
    display: none;
  }
`

/**
 * 컴포넌트가 shadow root 안에 렌더하는 상호작용 요소.
 * hover·focus·disabled 상태 선택자는 컴포넌트마다 태그를 다시 적지 않고 이 선택자로 잡는다.
 * 구조 규칙은 그대로 태그·class로 두고, 상태만 여기에 모은다.
 */
export const interactiveElement = unsafeCSS(
  ":is(button, a, [role='button'], [role^='menuitem'], [role='option'])",
)

/** 공유 focus 링 선언. --interaction-focus-outline 토큰을 소비하는 선택자 안에 펼쳐 쓴다. */
export const focusRingStyles = css`
  outline: var(--interaction-focus-outline);
  outline-offset: 2px;
`

/**
 * 화면에서만 감추고 접근성 트리에는 남기는 선언. 감출 요소의 선택자 안에 펼쳐 쓴다.
 * display·visibility로 감추면 스크린리더에서도 사라지므로 클립으로 밀어낸다.
 */
export const visuallyHiddenStyles = css`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
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

/**
 * 스크롤바 없이 가로로 넘어가는 행 선언. 행을 맡을 선택자는 사용부가 정하며,
 * WebKit 스크롤바는 그 선택자의 ::-webkit-scrollbar에서 함께 감춘다.
 */
export const horizontalScrollRowStyles = css`
  display: flex;
  gap: var(--space-2);
  flex-wrap: nowrap;
  overflow-x: auto;
  scroll-behavior: smooth;
  -ms-overflow-style: none;
  scrollbar-width: none;
`
