import { css, unsafeCSS } from 'lit'

import { buildAttributeRules } from '@/utils/attribute-styles'

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
    min-width: 0;
    flex: 1;
  }

  mm-text[color='light'] {
    margin-top: -0.125rem;
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
