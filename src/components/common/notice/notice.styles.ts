import { css, unsafeCSS } from 'lit'

import { buildAttributeRules } from '@/utils'

const noticeVariantTokens = {
  success: {
    // TODO on-
    '--notice-text-color': 'var(--color-success-foreground)',
  },
  warning: {
    '--notice-text-color': 'var(--color-warning-foreground)',
  },
  danger: {
    '--notice-text-color': 'var(--color-danger-foreground)',
  },
}

export const noticeStyles = css`
  :host {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    width: 100%;
    padding: var(--notice-padding);
    box-sizing: border-box;
    border: var(--notice-border-width) solid var(--notice-border-color);
    border-radius: var(--notice-border-radius);
    background: var(--notice-background-color);
    color: var(--notice-text-color);
    position: relative;

    --notice-padding: var(--space-3);
    --notice-border-radius: var(--radius);
    --notice-border-width: var(--border-width);
    --notice-text-color: var(--foreground-color);
    --notice-background-color: transparent;
    --notice-border-color: var(--border-color);
  }

  ${unsafeCSS(buildAttributeRules('variant', noticeVariantTokens))}

  .notice-dismiss {
    position: absolute;
    right: var(--notice-padding);
    top: var(--notice-padding);
  }
`
