import { css } from 'lit'

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
