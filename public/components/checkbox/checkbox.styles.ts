import { css } from 'lit'

export const checkboxStyles = css`
  :host {
    --checkbox-size: var(--size-tiny);
    --checkbox-gap: calc(var(--checkbox-size) + var(--space-2));
    --checkbox-radius: 4px;
    --checkbox-inset: var(--space-2);
    gap: var(--space-2);
  }

  input {
    margin: 0;
    cursor: pointer;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }

  label {
    display: flex;
    align-items: center;
    height: var(--checkbox-size);
    gap: var(--space-2);
  }

  label > span {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    position: relative;
    user-select: none;
    width: var(--checkbox-size);
    height: var(--checkbox-size);
    border: var(--border);
    border-color: var(--color-border-strong);
    box-sizing: border-box;
    border-radius: var(--checkbox-radius);
    background: var(--color-background);
  }

  input[type='checkbox'] + label > span::after {
    content: '';
    display: block;
    width: 6px;
    height: 2px;
    border-left: 1px solid;
    border-bottom: 1px solid;
    border-color: var(--gray200);
    position: absolute;
    left: 4px;
    top: 5px;
    transform: rotate(-50deg) scale(0);
  }

  input[type='checkbox']:checked + label > span::after {
    border-color: var(--color-primary);
    transform: rotate(-50deg) scale(1);
  }

  input:focus + label::before {
    outline: 2px solid #007bff;
    outline-offset: 2px;
  }

  [data-size='large'] input[type='checkbox']:checked + label > span::after {
    left: 8px;
    top: 8px;
    transform: rotate(-50deg) scale(1.5);
  }

  input[indeterminate='true'] ~ label:before,
  input[data-indeterminate='true'] ~ label:before {
    border-color: var(--green800);
    background: var(--green100);
  }
  input[indeterminate='true'] ~ label:after,
  input[data-indeterminate='true'] ~ label:after {
    display: block;
    width: 8px;
    background: var(--color-primary);
    border: none;
    left: 4px;
    top: 48%;
    transform: rotate(0deg);
  }

  input:disabled ~ label {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @keyframes checkmark {
    0% {
      background-position-y: 5px;
    }
    50% {
      background-position-y: -2px;
    }
    100% {
      background-position-y: 0;
    }
  }

  [data-size='large'] {
    --checkbox-size: var(--size-small);
  }
`
