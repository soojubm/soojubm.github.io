import { css, unsafeCSS } from 'lit'

import {
  backgroundLayerStyles,
  interactiveElement,
  layerContainerStyles,
} from '@/stylesheets/shared.styles'
import { buildAttributeRules } from '@/utils'

const listItemSizeTokens = {
  medium: {
    '--list-item-size': 'var(--size-48)',
    '--list-item-gap': 'var(--space-2)',
    '--list-item-font-size': 'var(--font-size-24)',
  },
  large: {
    '--list-item-size': 'var(--size-80)',
    '--list-item-gap': 'var(--space-3)',
    '--list-item-font-size': 'var(--font-size-24)',
  },
}

export const listItemStyles = css`
  :host {
    display: flex;
    align-items: center;
    min-height: var(--list-item-size);
    gap: var(--list-item-gap);

    --list-item-size: var(--size-32);
    --list-item-gap: var(--space-2);
    --list-item-font-size: var(--font-size-14);
  }

  ${unsafeCSS(buildAttributeRules('size', listItemSizeTokens))}

  [slot='leading'],
  [slot='trailing'] {
    flex: 0 0 auto;
    display: inline-flex;
    align-items: center;
  }

  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-width: 0;
    min-height: var(--list-item-size);
    flex: 1;
  }

  :host([size='small'][has-description]) {
    --list-item-size: var(--size-40);
  }

  /* label(14/24)의 위 행간이 description(12/16)의 아래 행간보다 넓어 글자가 아래로 치우친다. 차이의 절반만큼 올려 시각 중심을 맞춘다. */
  :host([size='small'][has-description]) .content {
    translate: 0
      calc(
        (
            (var(--font-line-height-24) - var(--font-size-14)) -
              (var(--font-line-height-16) - var(--font-size-12))
          ) / -4
      );
  }

  .emoji {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--list-item-size);
    height: var(--list-item-size);
    font-size: var(--list-item-font-size);
    line-height: 1;
  }
`

/**
 * list-item 행을 감싸 눌리는 요소(button·a·role 있는 행)에 얹는 상호작용 스킨.
 * 행의 의미(role·이벤트)는 감싸는 컴포넌트가 소유하고, 여기서는 hover·포커스·선택·비활성 표시만 맡는다.
 */
export const interactiveRowStyles = css`
  :host {
    --interactive-row-background-color: transparent;
    --interactive-row-padding-inline: 0;
  }

  ${interactiveElement} {
    display: flex;
    align-items: center;
    width: 100%;
    padding-inline: var(--interactive-row-padding-inline);
    border-radius: var(--radius);
    color: inherit;
    box-sizing: border-box;
    cursor: pointer;
    ${layerContainerStyles}

    /* background state */
    &::before {
      border-radius: var(--radius);
      background-color: var(--interactive-row-background-color);
      ${backgroundLayerStyles}
    }

    &:hover {
      --interactive-row-background-color: var(--interaction-hover-background-color);
    }

    &:focus-visible {
      outline: var(--interaction-focus-outline);
      outline-offset: -1px;
    }

    &[aria-current='page'] {
      --interactive-row-background-color: var(--interaction-selected-background-color);
    }

    &[aria-selected='true'] {
      --interactive-row-background-color: var(--interaction-selected-background-color);
      color: var(--interaction-selected-foreground-color);
    }

    &[disabled],
    &[aria-disabled='true'] {
      opacity: 0.5;
      pointer-events: none;
    }
  }

  mm-list-item {
    flex: 1;
  }
`
