import { css, unsafeCSS } from 'lit'

import { buildAttributeRules } from '@/utils'

const noticeVariantTokens = {
  success: {
    // TODO on-
    '--notice-foreground-color': 'var(--color-success-foreground)',
  },
  warning: {
    '--notice-foreground-color': 'var(--color-warning-foreground)',
  },
  danger: {
    '--notice-foreground-color': 'var(--color-danger-foreground)',
  },
}

export const noticeStyles = css`
  :host {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    width: 100%;
    padding: var(--notice-padding);
    border: var(--notice-border-width) solid var(--notice-border-color);
    border-radius: var(--notice-border-radius);
    background: var(--notice-background-color);
    color: var(--notice-foreground-color);
    position: relative;

    --notice-padding: var(--space-3);
    --notice-border-radius: var(--radius);
    --notice-border-width: var(--border-width);
    --notice-foreground-color: var(--foreground-color);
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
