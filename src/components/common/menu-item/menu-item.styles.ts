import { css } from 'lit'

import {
  backgroundLayerStyles,
  interactiveElement,
  layerContainerStyles,
} from '@/stylesheets/shared.styles'

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
    box-sizing: border-box;
    cursor: pointer;
    ${layerContainerStyles}

    /* background state */
    &::before {
      border-radius: var(--radius);
      background-color: var(--menu-item-background-color);
      ${backgroundLayerStyles}
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
    color: var(--danger-color);
  }

  mm-list-item {
    flex: 1;
  }
`
