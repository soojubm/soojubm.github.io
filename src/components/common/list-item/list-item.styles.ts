import { css, unsafeCSS } from 'lit'

import type { ListItemSize } from '@/components/common/list-item/list-item'

import {
  backgroundLayerStyles,
  disabledStyles,
  layerContainerStyles,
} from '@/stylesheets/shared.styles'
import { buildAttributeRules, type AttributeTokens } from '@/utils'

const listItemSizeTokens: AttributeTokens<Exclude<ListItemSize, 'small'>> = {
  medium: {
    '--list-item-min-height': 'var(--size-40)',
    '--list-item-gap': 'var(--space-2)',
    '--list-item-label-leading': 'calc(var(--font-line-height-24) - var(--font-size-14))',
  },
  large: {
    '--list-item-min-height': 'var(--size-80)',
    '--list-item-gap': 'var(--space-3)',
    '--list-item-label-leading': 'calc(var(--font-line-height-28) - var(--font-size-18))',
    '--list-item-description-leading': 'calc(var(--font-line-height-24) - var(--font-size-14))',
  },
}

export const listItemStyles = css`
  :host {
    display: flex;
    align-items: center;
    min-height: var(--list-item-min-height);
    gap: var(--list-item-gap);

    --list-item-min-height: var(--size-32);
    --list-item-gap: var(--space-2);
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
    min-height: var(--list-item-min-height);
    flex: 1;
  }

  /* label과 description의 행간이 다르면 글자 묶음이 넓은 쪽으로 치우친다.
     각 행간의 절반이 글자 위아래에 실리므로, 차이의 절반만큼 되밀어 시각 중심을 맞춘다. */
  :host([has-description]) .content {
    translate: 0 calc((var(--list-item-label-leading) - var(--list-item-description-leading)) / -4);
  }

  /* 이모지는 avatar 안의 글리프이며, 크기는 행 사이즈가 정한다. */
  .emoji {
    font-size: var(--font-size-14);
    line-height: 1;
  }

  :host([size='medium']) .emoji,
  :host([size='large']) .emoji {
    font-size: var(--font-size-24);
  }
`

/**
 * list-item 행을 감싸 눌리는 요소에 얹는 hover·포커스·선택·비활성 스킨.
 * 선언만 담으므로 사용하는 컴포넌트가 자기 행 선택자(button·a·role 있는 행) 안에 펼친다.
 */
export const listItemInteractiveStyles = css`
  --list-item-interactive-background-color: transparent;

  display: flex;
  align-items: center;
  width: 100%;
  padding-inline: 0;
  border-radius: var(--border-radius);
  color: inherit;
  box-sizing: border-box;
  cursor: pointer;
  ${layerContainerStyles};

  /* background state */
  &::before {
    border-radius: var(--border-radius);
    background-color: var(--list-item-interactive-background-color);
    ${backgroundLayerStyles};
  }

  &:hover {
    --list-item-interactive-background-color: var(--interaction-hover-background-color);
  }

  &:focus-visible {
    outline: var(--interaction-focus-outline);
    outline-offset: calc(var(--border-width) * -1);
  }

  &[aria-current='page'] {
    --list-item-interactive-background-color: var(--interaction-selected-background-color);
  }

  &[aria-selected='true'] {
    --list-item-interactive-background-color: var(--interaction-selected-background-color);
    color: var(--interaction-selected-foreground-color);

    /* 보더는 배경 레이어에 그려 행의 레이아웃 박스를 밀지 않는다. */
    &::before {
      border: var(--border-selected);
    }
  }

  &[disabled],
  &[aria-disabled='true'] {
    ${disabledStyles};

    &:hover {
      --list-item-interactive-background-color: transparent;
    }
  }

  fff-list-item {
    flex: 1;
  }
`
