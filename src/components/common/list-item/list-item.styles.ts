import { css, unsafeCSS } from 'lit'

import { buildAttributeRules } from '@/utils'

const listItemSizeTokens = {
  '48': {
    '--list-item-size': 'var(--size-48)',
    '--list-item-gap': 'var(--space-2)',
    '--list-item-font-size': 'var(--font-size-24)',
  },
  '80': {
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
