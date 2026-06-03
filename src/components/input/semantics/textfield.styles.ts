import { css } from 'lit'
import { inputStyles } from '../input.styles'

export const textfieldStyles = [
  inputStyles,
  css`
    p {
      margin: 0;
    }

    .textfield {
      position: relative;
    }

    mm-textfield-validation {
      margin: var(--space-1) 0 0;
    }

    .textfield-affix,
    .textfield-suffix,
    .textfield-prefix {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: var(--input-height);
      height: var(--input-height);
    }

    :host([size='small']) {
      --input-height: var(--size-medium);
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

    .searchfield .textfield-control {
      border: 0;
      transition: all 0.2s ease;
    }

    .searchfield input {
      padding: var(--space-2) 0;
    }

    .number-input input {
      padding-right: var(--space-2);
      padding-left: var(--space-2);
      text-align: center;
    }

    .number-input .textfield-prefix,
    .number-input .textfield-suffix {
      width: var(--input-height);
    }
  `,
]
