import { css, unsafeCSS } from 'lit'

import type { NoticeVariant } from '@/components/common/notice/notice'

import { buildAttributeRules, type AttributeTokens } from '@/utils'

const noticeVariantTokens: AttributeTokens<Exclude<NoticeVariant, 'info'>> = {
  warning: {
    '--notice-text-color': 'var(--foreground-warning-color)',
  },
  error: {
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
    border: var(--notice-border);
    border-color: var(--notice-border-color);
    border-radius: var(--notice-border-radius);
    background: var(--notice-background-color);
    color: var(--notice-text-color);

    --notice-padding: var(--space-3);
    --notice-border-radius: var(--border-radius);
    --notice-border: var(--border);
    --notice-text-color: var(--foreground-color);
    --notice-background-color: var(--background-color);
    --notice-border-color: var(--border-color);
  }

  ${unsafeCSS(buildAttributeRules('variant', noticeVariantTokens))}

  /* 첫 줄 line-box 안에서 아이콘을 텍스트 광학 중심에 맞춘다. */
  .notice-icon {
    margin-top: var(--space-1);
  }

  div {
    flex: 1;
    min-width: 0;
  }

  .notice-actions {
    display: flex;
    align-items: center;
    flex: none;
    gap: var(--space-2);
  }
`
