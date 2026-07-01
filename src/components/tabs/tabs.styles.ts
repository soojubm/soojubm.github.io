import { css } from 'lit'

export const tabsStyles = css`
  :host {
    position: relative;
    display: flex;
    align-items: center;
    width: max-content;

    --tabs-indicator-color: var(--selection-indicator-color);
    --tabs-line-color: var(--color-border);
    --tabs-line-width: var(--border-width);
    --tabs-pill-indicator-background: var(--color-background);
  }

  .indicator {
    position: absolute;
    left: 0;
    box-sizing: border-box;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    will-change: transform, width;
  }

  /* ==========================================================
     1) Line 형태 (하단 선 스타일)
     ========================================================== */
  :host([variant='line']) {
    border-bottom: var(--tabs-line-width) solid var(--tabs-line-color);
    width: 100%;

    & .indicator {
      bottom: calc(var(--tabs-line-width) * -1); /* 부모 보더선과 정밀하게 겹치도록 설정 */
      height: var(--tabs-line-width);
      background-color: var(--tabs-indicator-color);
    }
  }

  /* ==========================================================
     2) Pill 형태 (알약/배경 상자 스타일)
     ========================================================== */
  :host([variant='pill']) {
    background-color: var(--color-background-subtle);
    border: var(--tabs-pill-border, none);
    border-radius: var(--radius);
    padding: var(--space-1);

    & .indicator {
      height: var(--size-medium);
      top: var(--space-1);
      background-color: var(--tabs-pill-indicator-background);
      border: var(--tabs-pill-indicator-border, none);
      border-radius: var(--radius);
      box-shadow: var(--tabs-pill-indicator-shadow, var(--shadow));
      z-index: 0; /* 탭 텍스트 뒤로 배치 */
    }
  }
`
