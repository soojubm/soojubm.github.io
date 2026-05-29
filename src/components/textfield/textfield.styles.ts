import { css } from 'lit'

export const textfieldStyles = css`
  p {
    margin: 0;
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

  :host {
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

  textarea,
  input {
    display: block;
    width: 100%;
    height: var(--textfield-height);
    padding: var(--space-3) var(--space-4);
    box-sizing: border-box;
    border-radius: var(--textfield-radius);
    background: var(--textfield-background-color);
    color: var(--color-foreground);
    border: 1px solid transparent;
    font: inherit;
  }

  input:not(:disabled):hover {
    border-color: var(--textfield-color-border-hover);
  }

  textarea {
    height: auto;
  }

  input:focus {
    box-shadow: var(--status-hover);
  }

  input:read-only {
    color: var(--color-foreground-light);
    cursor: default;
  }

  input:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  p {
    margin: var(--space-1) 0 0;
    color: var(--red800);
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

  ::slotted([slot='prefix']) ~ input {
    padding-left: 48px;
  }

  ::slotted([slot='link']) {
    position: absolute;
    right: 0;
    top: 0;
  }

  [data-label='false'] {
    --textfield-icon-position: 0;
  }

  [data-size='small'] {
    --textfield-height: var(--size-medium);
  }

  [data-invalid] input {
    border-color: var(--color-danger);
  }

  .searchfield {
    position: relative;
  }

  .searchfield input {
    width: 100%;
    height: var(--textfield-height);
    padding: var(--space-2) var(--size-large);
    border: 0;
    border-radius: var(--radius);
    background: var(--color-background-subtle);
    overflow: hidden;
    font: inherit;
    transition: all 0.2s ease;
    position: relative;
    z-index: 1;
  }

  .searchfield-input:focus ~ .searchfield-cancel {
    right: 0;
  }

  .searchfield-prefix {
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--textfield-height);
    height: var(--textfield-height);
    position: absolute;
    left: 0;
    top: 0;
    z-index: 2;
  }

  .searchfield-prefix ~ .searchfield-input {
    padding-left: calc(var(--size-medium) + var(--space-2) + 0.5rem);
  }

  .searchfield-clear {
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--textfield-height);
    height: var(--textfield-height);
    position: absolute;
    right: 32px;
    top: 0;
    z-index: 1;
  }

  .searchfield-input:focus + .searchfield-clear {
    display: flex;
  }
`
