import { css } from 'lit'

export const tabsStyles = css`
  :host {
    position: relative;
    display: flex;
    align-items: center;
    width: max-content;
    max-width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    scrollbar-width: none;

    --tabs-indicator-background-color: var(--interaction-selected-foreground-color);
    --tabs-line-color: var(--border-color);
    --tabs-line-width: var(--border-width);
    --tabs-pill-indicator-background-color: var(--background-color);
    --tabs-pill-border: var(--border-transparent);
    --tabs-pill-indicator-border: var(--border-transparent);
  }

  :host::-webkit-scrollbar {
    display: none;
  }

  /* 인디케이터는 z-index 없이 탭보다 먼저 렌더해 탭 뒤에 깔고, 스크롤 힌트(elevated)만 탭 위로 올린다. */
  .indicator {
    position: absolute;
    left: 0;
    box-sizing: border-box;
    transition: transform var(--transition-duration) var(--transition-easing),
      width var(--transition-duration) var(--transition-easing);
    will-change: transform, width;
  }

  /* ==========================================================
     1) Line 형태 (하단 선 스타일)
     ========================================================== */
  :host([variant='line']) {
    /* 스크롤 컨테이너는 border 영역의 자식을 잘라내므로, 기준선을 안쪽 그림자로 그려 인디케이터와 같은 줄에 둔다. */
    width: 100%;
    box-shadow: inset 0 calc(var(--tabs-line-width) * -1) 0 var(--tabs-line-color);

    & .indicator {
      bottom: 0;
      height: var(--tabs-line-width);
      background-color: var(--tabs-indicator-background-color);
    }
  }

  /* ==========================================================
     2) Pill 형태 (알약/배경 상자 스타일)
     ========================================================== */
  :host([variant='pill']) {
    background-color: var(--background-subtle-color);
    border: var(--tabs-pill-border);
    border-radius: var(--radius);
    padding: var(--space-1);

    & .indicator {
      height: var(--size-32);
      top: var(--space-1);
      background-color: var(--tabs-pill-indicator-background-color);
      border: var(--tabs-pill-indicator-border);
      border-radius: var(--radius);
    }
  }

  /* ==========================================================
     3) Text 형태 (제목 크기 굵은 글자 + 상단 점 인디케이터)
     ========================================================== */
  :host([variant='text']) {
    gap: var(--space-4);
    padding-top: var(--space-2);

    & .indicator {
      display: flex;
      align-items: center;
      justify-content: center;
      top: 0;
      height: var(--size-16);
    }
  }

  /* 글자 크기는 페이지 제목(mm-heading level 1)과 같은 단계다. 탭 토큰은 탭 요소 자신에게 재할당한다. */
  :host([variant='text']) ::slotted(mm-tab) {
    --tab-height: var(--size-48);
    --tab-padding-inline: 0;
    --tab-text-size: var(--font-size-32);

    font-weight: var(--font-weight-bold);
  }

  :host([variant='text']) ::slotted(mm-tab[aria-selected='true']) {
    --tab-text-color: var(--foreground-color);
  }
`
