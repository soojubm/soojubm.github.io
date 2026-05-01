import { css } from 'lit'

export const radioStyles = css`
  :host {
    --radio-size: var(--size-tiny);
    --radio-color: var(--color-border-strong);
    --radio-border: 1px solid var(--radio-color);
    --radio-radius: 50%;
    --radio-inset: var(--space-2);

    /* min-width: var(--radio-size); */
    position:relative;
  }

  label {
    display: flex;
    gap: var(--space-2);
    line-height: var(--radio-size);
  }

  .radio-indicator {
    width:var(--radio-size);
    height:var(--radio-size);
    border:var(--radio-border);
    border-radius: var(--radio-radius);
    box-shadow: var(--shadow);
    box-sizing:border-box;
    /* animation:ripple2 0.2s linear forwards; */

    /* TODO pointer cursor on radio container */
    /* cursor: pointer; */
  }


  input {
    /* // reset */
    margin: 0;
    background-color: var(--color-background);

    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    position: absolute;
    left: 0;
  }
  input:checked + label .radio-indicator {
    --b1: 25.3267% .015896 252.417568;
    --b2: 23.2607% .013807 253.100675;
    background: var(--color-primary);
    border-color: var(--color-primary);

    animation: radiomark var(--animation-input, .2s) ease-out;
    box-shadow:
      0 0 0 4px var(--color-background) inset;

  }

  input:disabled {
    opacity:.4;cursor:not-allowed;
  }
  input:disabled + label {
    opacity:.6;cursor:not-allowed;
  }
`
