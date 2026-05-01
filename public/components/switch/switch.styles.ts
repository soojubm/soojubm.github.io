import { css } from 'lit'

export const switchStyles = css`
  .switch {
    --switch-width: 2rem;
    --switch-height: 16px;
    --switch-radius: var(--radius);
    display: block;
    height: var(--switch-height);
    position: relative;
  }

  .switch input {
    opacity: 0;
    inline-size: 100%;
    position: absolute;
    left: -0.5rem;
    right: -0.5rem;
    top: -0.5rem;
    bottom: -0.5rem;
    inline-size: 100%;
  }

  .switch label {
    display: flex;
    gap: var(--space-2);
    line-height: var(--switch-height);
    cursor: pointer;
  }

  .switch label:before {
    content: '';
    display: block;
    width: var(--switch-width);
    height: var(--switch-height);
    border-radius: var(--switch-radius);
    box-sizing: border-box;
    background: var(--gray200);
    transition: background-color 0.125s;
    transition: all 0.25s;
  }

  .switch label:after {
    content: '';
    display: block;
    width: var(--switch-height);
    height: var(--switch-height);
    border: var(--border);
    border-radius: var(--switch-radius);
    box-sizing: border-box;
    background: var(--color-background);
    box-shadow: var(--shadow);
    position: absolute;
    left: 0;
    top: 0;
    transition: transform 0.2s;
  }

  .switch input:checked + label:before {
    content: '';
    background: var(--color-primary);
  }
  .switch input:checked + label:after {
    transform: translateX(calc(var(--switch-width) - 16px));
  }

  .switch input:disabled + label {
    cursor: not-allowed;
    opacity: 0.5;
  }
  .switch:focus-within label:before {
    outline: 3px solid var(--color-point);
  }
`
