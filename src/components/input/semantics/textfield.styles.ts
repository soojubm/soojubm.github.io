import { css } from 'lit'

import { inputStyles } from '@/components/input/input.styles'

export const textfieldStyles = [
  inputStyles,
  css`
    p {
      margin: 0;
    }

    mm-textfield-validation {
      margin: var(--space-1) 0 0;
    }

    /* 라벨을 시각적으로만 감추고 스크린리더에는 남김 (for 연결 유지) */
    :host([hidden-label]) mm-textfield-label {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
  `,
]
