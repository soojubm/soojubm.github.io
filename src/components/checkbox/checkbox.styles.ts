import { css } from 'lit'

export const checkboxGroupStyles = css`
  fieldset {
    all: unset;

    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  legend {
    display: none;
  }
`

export const checkboxStyles = css`
  :host {
    --checkbox-size: var(--size-tiny);
    --checkbox-radius: 4px;
    --checkbox-color: var(--color-border-strong);
    --checkbox-color-background: var(--color-background);
    --checkbox-color-checked: var(--selection-indicator-color);
    gap: var(--space-2);
  }

  input {
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
    border-color: var(--checkbox-color);
    box-sizing: border-box;
    border-radius: var(--checkbox-radius);
    background: var(--checkbox-color-background);
  }

  input[type='checkbox'] + label > span::after {
    content: '';
    display: block;
    width: 6px;
    height: 2px;
    border-left: 1px solid;
    border-bottom: 1px solid;
    border-color: var(--color-border);
    position: absolute;
    left: 4px;
    top: 5px;
    transform: rotate(-50deg) scale(0);
  }

  input[type='checkbox']:checked + label > span::after {
    border-color: var(--checkbox-color-checked);
    transform: rotate(-50deg) scale(1);
  }

  input:focus + label::before {
    outline: 2px solid var(--color-interaction-focus);
    outline-offset: 2px;
  }

  :host([size='large']) input[type='checkbox']:checked + label > span::after {
    left: 8px;
    top: 8px;
    transform: rotate(-50deg) scale(1.5);
  }

  input[indeterminate='true'] ~ label:before,
  input[data-indeterminate='true'] ~ label:before {
    border-color: var(--selection-indicator-color);
    background: var(--selection-background);
  }
  input[indeterminate='true'] ~ label:after,
  input[data-indeterminate='true'] ~ label:after {
    display: block;
    width: 8px;
    background: var(--selection-indicator-color);
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

  :host([size='large']) {
    --checkbox-size: var(--size-small);
  }
`
