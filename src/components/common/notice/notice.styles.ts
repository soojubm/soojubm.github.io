import { css, unsafeCSS } from 'lit'

import { buildAttributeRules } from '@/utils'

const noticeVariantTokens = {
  success: {
    // TODO on-
    '--notice-text-color': 'var(--foreground-success-color)',
  },
  warning: {
    '--notice-text-color': 'var(--foreground-warning-color)',
  },
  danger: {
    '--notice-text-color': 'var(--foreground-danger-color)',
  },
}

export const noticeStyles = css`
  :host {
    display: flex;
    align-items: flex-start;
    gap: var(--space-2);
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

  /* 첫 줄 line-box 안에서 아이콘을 텍스트 광학 중심에 맞춘다. */
  .notice-icon {
    margin-top: var(--space-1);
  }

  .notice-content {
    display: flex;
    gap: var(--space-2);
    flex: 1;
    min-width: 0;
  }

  .notice-dismiss {
    position: absolute;
    right: var(--notice-padding);
    top: var(--notice-padding);
  }
`
