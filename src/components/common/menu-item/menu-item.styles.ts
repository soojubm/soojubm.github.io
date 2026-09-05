import { css } from 'lit'

import { interactiveElement } from '@/stylesheets/shared.styles'

export const menuItemStyles = css`
  :host {
    --menu-item-background-color: transparent;
    --menu-item-padding-inline: 0;
  }

  ${interactiveElement} {
    display: flex;
    align-items: center;
    width: 100%;
    padding-inline: var(--menu-item-padding-inline);
    border-radius: var(--radius);
    color: inherit;
    text-decoration: none;
    box-sizing: border-box;
    cursor: pointer;
    /* z-index: -1 배경 레이어가 조상 배경 뒤로 빠지지 않도록 행에서 쌓임 맥락을 만든다 */
    position: relative;
    isolation: isolate;

    /* background state */
    &::before {
      content: '';
      display: block;
      background-color: var(--menu-item-background-color);
      border-radius: var(--radius);
      position: absolute;
      top: 0;
      bottom: 0;
      /* left: calc(var(--space-2) * -1); */
      /* right: calc(var(--space-2) * -1); */
      left: 0;
      right: 0;
      z-index: -1;
    }

    &:hover {
      --menu-item-background-color: var(--interaction-hover-background-color);
    }

    &:focus-visible {
      outline: var(--interaction-focus-outline);
      outline-offset: -1px;
    }

    &[aria-current='page'] {
      --menu-item-background-color: var(--interaction-selected-background-color);
    }

    &[aria-selected='true'] {
      --menu-item-background-color: var(--interaction-selected-background-color);
      color: var(--interaction-selected-foreground-color);
    }

    &[disabled],
    &[aria-disabled='true'] {
      opacity: 0.5;
      pointer-events: none;
    }
  }

  /* tone=danger: color를 행에 지정하면 list-item 내부 텍스트·아이콘이 상속받는다 */
  :host([tone='danger']) ${interactiveElement} {
    color: var(--color-danger);
  }

  mm-list-item {
    flex: 1;
  }

  button {
    all: unset;
  }
`
