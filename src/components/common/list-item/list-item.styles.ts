import { css, unsafeCSS } from 'lit'

import {
  backgroundLayerStyles,
  interactiveElement,
  layerContainerStyles,
} from '@/stylesheets/shared.styles'
import { buildAttributeRules } from '@/utils'

const listItemSizeTokens = {
  medium: {
    '--list-item-size': 'var(--size-40)',
    '--list-item-gap': 'var(--space-2)',
    '--list-item-font-size': 'var(--font-size-24)',
    '--list-item-label-leading': 'calc(var(--font-line-height-24) - var(--font-size-14))',
  },
  large: {
    '--list-item-size': 'var(--size-80)',
    '--list-item-gap': 'var(--space-3)',
    '--list-item-font-size': 'var(--font-size-24)',
    '--list-item-label-leading': 'calc(var(--font-line-height-28) - var(--font-size-18))',
    '--list-item-description-leading': 'calc(var(--font-line-height-24) - var(--font-size-14))',
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
    --list-item-label-leading: calc(var(--font-line-height-24) - var(--font-size-14));
    --list-item-description-leading: calc(var(--font-line-height-16) - var(--font-size-12));
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

  /* label과 description의 행간이 다르면 글자 묶음이 넓은 쪽으로 치우친다.
     각 행간의 절반이 글자 위아래에 실리므로, 차이의 절반만큼 되밀어 시각 중심을 맞춘다. */
  :host([has-description]) .content {
    translate: 0 calc((var(--list-item-label-leading) - var(--list-item-description-leading)) / -4);
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
