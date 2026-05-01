import { css } from 'lit'

export const radioStyles = css`
  .radio {
    --radio-size: var(--size-tiny);
    --radio-color: var(--color-border-strong);
    --radio-border: 1px solid var(--radio-color);
    --radio-radius: 50%;
    --radio-inset: var(--space-2);
    position: relative;
  }

  .radio label {
    display: flex;
    gap: var(--space-2);
    line-height: var(--radio-size);
  }

  .radio-indicator {
    width: var(--radio-size);
    height: var(--radio-size);
    border: var(--radio-border);
    border-radius: var(--radio-radius);
    box-shadow: var(--shadow);
    box-sizing: border-box;
  }

  .radio input {
    margin: 0;
    background-color: var(--color-background);
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    position: absolute;
    left: 0;
  }

  .radio input:checked + label .radio-indicator {
    background: var(--color-primary);
    border-color: var(--color-primary);
    animation: radiomark var(--animation-input, 0.2s) ease-out;
    box-shadow: 0 0 0 4px var(--color-background) inset;
  }

  .radio input:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
  .radio input:disabled + label {
    opacity: 0.6;
    cursor: not-allowed;
  }
`
