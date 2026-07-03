import { css } from 'lit'

/** 공유 focus 링 선언. --interaction-focus-outline 토큰을 소비하는 선택자 안에 펼쳐 쓴다. */
export const focusRing = css`
  outline: var(--interaction-focus-outline);
  outline-offset: 2px;
`
