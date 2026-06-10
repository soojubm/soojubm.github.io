import { css } from 'lit'

export const switchStyles = css`
  :host {
    --switch-width: 2rem;
    --switch-height: 16px;
    --switch-radius: var(--radius);
    --switch-color: var(--gray200);
    --switch-color-checked: var(--color-primary);
    display: block;
    height: var(--switch-height);
    position: relative;

    &:focus-within label:before {
      outline: 3px solid var(--color-point);
    }
  }

  input {
    opacity: 0;
    position: absolute;
    left: -0.5rem;
    right: -0.5rem;
    top: -0.5rem;
    bottom: -0.5rem;
    inline-size: 100%;

    &:checked + label {
      &:before {
        background: var(--switch-color-checked);
      }
      &:after {
        transform: translateX(calc(var(--switch-width) - 16px));
      }
    }

    &:disabled + label {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }

  label {
    display: flex;
    gap: var(--space-2);
    line-height: var(--switch-height);
    cursor: pointer;

    &:before {
      content: '';
      display: block;
      width: var(--switch-width);
      height: var(--switch-height);
      border-radius: var(--switch-radius);
      box-sizing: border-box;
      background: var(--switch-color);
      transition: all 0.25s;
    }

    &:after {
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
  }
`
