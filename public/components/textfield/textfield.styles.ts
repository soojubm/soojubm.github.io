import { css } from 'lit'

export const textfieldStyles = css`
  p {
    margin: 0;
  }

  .reset-input {
    background: transparent;
    border: 1px solid transparent;
    border-radius: var(--radius);
    box-sizing: border-box;
    font: inherit;
    color: var(--color-foreground);
  }

  textarea {
    border: 0 none;
    font-family: inherit;
    font-size: inherit;
    resize: none;
  }

  textarea:focus {
    -webkit-appearance: none;
  }

  textarea:focus-visible {
    outline: none;
  }

  input:focus-visible {
    outline: 0;
  }

  input[type='text'] {
    -webkit-appearance: none;
  }

  input[type='number'] {
    -webkit-appearance: none;
    -moz-appearance: textfield;
  }

  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
  }

  input[type='date'] {
    display: block;
    max-height: var(--size-large);
    -webkit-appearance: none;
  }

  input[type='date']::-webkit-calendar-picker-indicator {
    width: 100%;
    opacity: 0;
    position: absolute;
    left: 0;
    bottom: 0;
  }

  input[type='date']::-webkit-inner-spin-button {
    display: none;
    -webkit-appearance: none;
  }

  input[type='password'] {
    -webkit-appearance: none;
    letter-spacing: 0.25rem;
  }

  input[type='password']::placeholder {
    letter-spacing: 0;
  }

  input[type='search'] {
    font-family: inherit;
    font-size: inherit;
    -webkit-appearance: none;
  }

  input[type='search']::-webkit-search-decoration,
  input[type='search']::-webkit-search-cancel-button,
  input[type='search']::-webkit-search-results-button,
  input[type='search']::-webkit-search-results-decoration {
    display: none;
  }

  :host,
  .textfield {
    position: relative;
    --textfield-padding: null;
    --textfield-color-border: null;
    --textfield-color-border-hover: var(--gray400);
    --textfield-color-background: null;
    --textfield-background-color: null;
    --textfield-border-width: null;
    --textfield-height: var(--size-large);
    --textfield-background-color: var(--color-background-subtle);
    --textfield-border: var(--border);
    --textfield-radius: var(--radius);
    --textfield-text-color: 0;
    --textfield-icon-position: var(--size-small);
    --textfield-placeholder-color: null;
  }

  .textfield-label {
    display: block;
    line-height: var(--size-small);
  }

  .textfield-label small {
    margin: 0 0 0 var(--space-1);
    color: var(--color-foreground-light);
  }

  .textfield-input {
    display: block;
    width: 100%;
    height: var(--textfield-height);
    padding: var(--space-3) var(--space-4);
    box-sizing: border-box;
    border-radius: var(--textfield-radius);
    background: var(--textfield-background-color);
    color: var(--color-foreground);
  }

  .textfield-input:not(:disabled):hover {
    border-color: var(--textfield-color-border-hover);
  }

  textarea.textfield-input {
    height: auto;
  }

  .textfield-input:focus {
    box-shadow: var(--status-hover);
  }

  .textfield-input:read-only {
    color: var(--color-foreground-light);
    cursor: default;
  }

  .textfield-input:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ::slotted([slot='suffix']) {
    display: flex;
    align-items: center;
    justify-content: center;
    height: var(--textfield-height);
    position: absolute;
    top: var(--textfield-icon-position);
    right: var(--space-2);
  }

  ::slotted([slot='prefix']) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--textfield-height);
    height: var(--textfield-height);
    position: absolute;
    top: var(--textfield-icon-position);
    left: 0;
  }

  ::slotted([slot='prefix']) ~ .textfield-input {
    padding-left: 48px;
  }

  ::slotted([slot='link']) {
    position: absolute;
    right: 0;
    top: 0;
  }

  .textfield[data-label='false'] {
    --textfield-icon-position: 0;
  }

  .textfield[data-size='small'] {
    --textfield-height: var(--size-medium);
  }

  .is-invalid .textfield-input {
    border-color: var(--color-danger);
  }
`
