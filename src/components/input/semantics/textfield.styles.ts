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

    .textfield-affix {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: var(--input-height);
      padding-inline: var(--input-padding);
      flex: 0 0 auto;
    }

    .textfield-prefix {
      width: var(--input-height);
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

    .searchfield-prefix {
      width: var(--input-height);
    }

    .searchfield-clear {
      width: var(--input-height);
    }

    .number-input {
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
