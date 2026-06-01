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

    [data-size='small'] {
      --input-height: var(--size-medium);
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
