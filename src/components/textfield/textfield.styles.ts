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

  .textfield-control,
  textarea {
    width: 100%;
    height: var(--textfield-height);
    box-sizing: border-box;
    border-radius: var(--textfield-radius);
    background: var(--textfield-background-color);
    border: 1px solid transparent;
  }

  .textfield-control {
    display: flex;
    align-items: center;
    overflow: hidden;
  }

  textarea,
  input {
    display: block;
    width: 100%;
    min-width: 0;
    height: 100%;
    padding: var(--space-3) var(--space-4);
    box-sizing: border-box;
    border: 0;
    background: transparent;
    color: var(--color-foreground);
    font: inherit;
  }

  .textfield-control:hover {
    border-color: var(--textfield-color-border-hover);
  }

  textarea {
    height: auto;
    min-height: var(--textfield-height);
  }

  .textfield-control:focus-within,
  textarea:focus {
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
    height: var(--textfield-height);
    flex: 0 0 auto;
  }

  .textfield-prefix {
    width: var(--textfield-height);
  }

  .textfield-suffix,
  .textfield-link {
    padding-right: var(--space-2);
  }

  [data-size='small'] {
    --textfield-height: var(--size-medium);
  }

  [data-invalid] .textfield-control,
  [data-invalid] textarea {
    border-color: var(--color-danger);
  }

  .searchfield .textfield-control {
    border: 0;
    transition: all 0.2s ease;
  }

  .searchfield input {
    padding: var(--space-2) 0;
  }

  .searchfield-prefix {
    width: var(--textfield-height);
  }

  .searchfield-clear {
    width: var(--textfield-height);
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
    width: var(--textfield-height);
    padding: 0;
  }
`
