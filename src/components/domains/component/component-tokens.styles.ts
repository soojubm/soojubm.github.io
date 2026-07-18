import { css } from 'lit'

import { componentContentFrameStyles } from '@/components/domains/component/component.styles'
import { resetStyles } from '@/stylesheets/shared/reset.styles'

export const tokenStyles = [
  resetStyles,
  css`
    :host {
      display: flex;
      align-items: center;
      gap: var(--space-2);

      /* 이름 강조색: tag 카테고리 팔레트의 text 색과 값을 공유한다(light·dark 모두) */
      --token-word-state-color: var(--tag-category-4-text);
      --token-word-surface-color: var(--tag-category-5-text);
      --token-word-dimension-color: var(--tag-category-8-text);
    }

    dt {
      font-weight: var(--font-weight-bold);
      line-height: var(--size-32);
    }

    dd {
      margin: 0;
      line-height: var(--size-32);
    }

    .dash {
    }

    .word-state {
      color: var(--token-word-state-color);
    }
    .word-surface {
      color: var(--token-word-surface-color);
    }
    .word-dimension {
      color: var(--token-word-dimension-color);
    }
  `,
]

export const componentTokensStyles = [
  resetStyles,
  componentContentFrameStyles,
  css`
    :host {
      display: block;
      margin-top: var(--space-4);
    }
  `,
]
