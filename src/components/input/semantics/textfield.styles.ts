import { css } from 'lit'
import { inputStyles } from '../input.styles'

export const textfieldStyles = [
  inputStyles,
  css`
    p {
      margin: 0;
    }

    label {
      display: block;
      line-height: var(--size-small);
    }

    label small {
      margin: 0 0 0 var(--space-1);
      color: var(--color-foreground-light);
    }

    .textfield {
      position: relative;
    }

    .textfield-helper {
      margin: var(--space-1) 0 var(--space-1);
    }

    .textfield-validation {
      margin: var(--space-1) 0 0;
    }

    .textfield-affix {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: var(--input-height);
      flex: 0 0 auto;
    }

    .textfield-prefix {
      width: var(--input-height);
    }

    .textfield-suffix,
    .textfield-link {
      padding-right: var(--space-2);
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
      max-width: 10rem;
    }

    .number-input input {
      padding-right: var(--space-2);
      padding-left: var(--space-2);
      text-align: center;
    }

    .number-input .textfield-prefix,
    .number-input .textfield-suffix {
      width: var(--input-height);
      padding: 0;
    }
  `,
]
