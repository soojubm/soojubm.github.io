import { css } from 'lit'

export const radioStyles = css`
  :host {
    --radio-size: var(--size-tiny);
    --radio-color: var(--color-border-strong);
    --radio-border: 1px solid var(--radio-color);
    --radio-radius: 50%;
    --radio-inset: var(--space-2);
    position: relative;
  }

  label {
    display: flex;
    gap: var(--space-2);
    line-height: var(--radio-size);
  }

  label > span:first-child {
    width: var(--radio-size);
    height: var(--radio-size);
    border: var(--radio-border);
    border-radius: var(--radio-radius);
    box-shadow: var(--shadow);
    box-sizing: border-box;
  }

  input {
    margin: 0;
    background-color: var(--color-background);
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    position: absolute;
    left: 0;
  }

  input:checked + label > span:first-child {
    background: var(--color-primary);
    border-color: var(--color-primary);
    animation: radiomark var(--animation-input, 0.2s) ease-out;
    box-shadow: 0 0 0 4px var(--color-background) inset;
  }

  input:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
  input:disabled + label {
    opacity: 0.6;
    cursor: not-allowed;
  }
`
