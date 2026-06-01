import { css } from 'lit'

export const inputStyles = css`
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
    --input-height: var(--size-large);
    --input-background-color: var(--color-background-subtle);
    --input-radius: var(--radius);
    --input-color-border-hover: var(--gray400);
    --input-text-color: var(--color-foreground);
    --input-padding-block: var(--space-3);
    --input-padding-inline: var(--space-4);
    --input-padding: var(--input-padding-inline);
  }

  :host-context([data-theme='brutal']) {
    --input-color-border-hover: var(--brutal-border-color);
  }

  .textfield-control,
  textarea {
    width: 100%;
    height: var(--input-height);
    box-sizing: border-box;
    border-radius: var(--input-radius);
    background: var(--input-background-color);
    /* 기본 transparent, brutal 테마에서 --input-border-color 주입(상속)으로 #000.
       hover/invalid가 element-level border-color로 덮으므로 상태는 그대로 우선. */
    border: 1px solid var(--input-border-color, transparent);
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
    padding: var(--input-padding-block) var(--input-padding-inline);
    box-sizing: border-box;
    border: 0;
    color: var(--color-foreground);
    font: inherit;
  }

  input {
    background: transparent;
  }

  input::placeholder,
  textarea::placeholder {
    color: var(--color-foreground-light);
  }

  .textfield-control:hover {
    border-color: var(--input-color-border-hover);
  }

  textarea {
    height: auto;
    min-height: var(--input-height);
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

  [data-invalid] .textfield-control,
  [data-invalid] textarea {
    border-color: var(--color-danger);
  }
`
