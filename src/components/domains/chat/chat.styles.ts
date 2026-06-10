import { css } from 'lit'

export const chatBubbleStyles = css`
  :host {
    display: flex;
    justify-content: flex-start;
    min-width: -webkit-fill-available;

    --bubble-radius: var(--radius) var(--radius-large) var(--radius-large) var(--radius-large);
    --thumbnail-radius: var(--bubble-radius);
  }

  .bubble {
    position: relative;
    width: fit-content;
    max-width: min(85%, 600px);
    padding: var(--space-3) var(--space-4);
    border: var(--bubble-border, none);
    border-radius: var(--bubble-radius);
    background-color: var(--color-background-subtle);
    font-size: var(--font-size-14);
    line-height: var(--line-height-14);
    box-sizing: border-box;
    /* 기본 none, brutal 테마에서 --bubble-border 주입(상속)으로 #000.
       failed 상태는 element-level border로 덮어 danger 보더 유지. */

    &.is-my {
      justify-content: flex-end;
    }

    /* 이미지 버블 */
    &.is-image {
      padding: 0;
      background-color: none;
      overflow: hidden;

      mm-thumbnail {
        display: block;
        max-width: 240px;
        overflow: hidden;
      }
    }
  }

  /* 타이핑 애니메이션 */
  .typing {
    display: flex;
    align-items: center;
    gap: var(--space-1);

    span {
      display: block;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--color-foreground-light);
      animation: bounce 1.2s infinite ease-in-out;

      &:nth-child(1) { animation-delay: 0s; }
      &:nth-child(2) { animation-delay: 0.2s; }
      &:nth-child(3) { animation-delay: 0.4s; }
    }
  }

  @keyframes bounce {
    0%,
    60%,
    100% {
      transform: translateY(0);
    }
    30% {
      transform: translateY(-6px);
    }
  }
`
