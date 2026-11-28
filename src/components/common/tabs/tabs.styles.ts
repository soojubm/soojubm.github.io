import { css } from 'lit'

export const tabsStyles = css`
  :host {
    position: relative;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    width: max-content;
    min-width: 0;
    max-width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    scrollbar-width: none;

    --tablist-indicator-background-color: var(--interaction-selected-foreground-color);
    --tablist-border-color: var(--border-color);
    --tablist-border-width: var(--border-width);
    --tablist-pill-indicator-background-color: var(--interaction-selected-background-color);
    --tablist-pill-border: var(--border-transparent);
    --tablist-pill-indicator-border: var(--border-selected);
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
    box-shadow: inset 0 calc(var(--tablist-border-width) * -1) 0 var(--tablist-border-color);

    & .indicator {
      bottom: 0;
      height: var(--tablist-border-width);
      background-color: var(--tablist-indicator-background-color);
    }
  }

  /* ==========================================================
     2) Pill 형태 (알약/배경 상자 스타일)
     ========================================================== */
  :host([variant='pill']) {
    background-color: var(--background-subtle-color);
    border: var(--tablist-pill-border);
    border-radius: var(--border-radius);
    padding: var(--space-1);

    & .indicator {
      height: var(--size-32);
      top: var(--space-1);
      background-color: var(--tablist-pill-indicator-background-color);
      border: var(--tablist-pill-indicator-border);
      border-radius: var(--border-radius);
    }
  }

  :host([variant='text']) {
    gap: var(--space-4);

    & .indicator {
      display: flex;
      align-items: center;
      justify-content: center;
      top: -0.25rem;
      height: var(--size-16);
    }
  }

  /* 글자 크기는 페이지 제목(fff-heading level 1)과 같은 단계다. 탭 토큰은 탭 요소 자신에게 재할당한다. */
  :host([variant='text']) fff-tab {
    --tab-height: var(--size-48);
    --tab-padding-inline: 0;
    --tab-font-size: var(--font-size-24);
    font-weight: var(--font-weight-bold);
  }

  :host([variant='text']) fff-tab[aria-selected='true'] {
    --tab-text-color: var(--foreground-color);
  }
`
