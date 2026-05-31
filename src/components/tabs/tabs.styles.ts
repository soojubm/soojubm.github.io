import { css } from 'lit'

export const tabsStyles = css`
  :host {
    display: block;

    --tabs-indicator-color: var(--color-primary);
    --tabs-line-color: #e5e5ea;
    --tabs-line-width: 2px;
    --tabs-pill-background: var(--color-background-subtle);
    --tabs-pill-indicator-background: var(--color-background);
    --tabs-pill-radius: var(--radius);
  }

  .tablist-container {
    position: relative;
    display: flex;
    align-items: center;
    width: max-content;
  }

  .indicator {
    position: absolute;
    left: 0;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    will-change: transform, width;
  }

  /* ==========================================================
     1) Line 형태 (하단 선 스타일)
     ========================================================== */
  :host([variant='line']) .tablist-container {
    border-bottom: var(--tabs-line-width) solid var(--tabs-line-color);
    width: 100%;
  }

  :host([variant='line']) .indicator {
    bottom: calc(var(--tabs-line-width) * -1); /* 부모 보더선과 정밀하게 겹치도록 설정 */
    height: var(--tabs-line-width);
    background-color: var(--tabs-indicator-color);
  }

  /* ==========================================================
     2) Pill 형태 (알약/배경 상자 스타일)
     ========================================================== */
  :host([variant='pill']) .tablist-container {
    background-color: var(--tabs-pill-background);
    border-radius: var(--tabs-pill-radius);
    padding: 4px;
  }

  :host([variant='pill']) .indicator {
    height: calc(100% - 8px); /* 패딩 상하 영역 제외 */
    top: 4px;
    background-color: var(--tabs-pill-indicator-background);
    border-radius: 6px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
    z-index: 0; /* 탭 텍스트 뒤로 배치 */
  }
`
