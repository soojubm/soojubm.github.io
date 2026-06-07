import { css } from 'lit'

export const inputStyles = css`
  :host {
    position: relative;
    --input-height: var(--size-large);
    --input-background-color: var(--color-background-subtle);
    --input-radius: var(--radius);
    --input-border: 1px solid var(--color-border);
    --input-color-border-hover: var(--gray400);
    --input-text-color: var(--color-foreground);
    --input-padding-block: var(--space-3);
    --input-padding-inline: var(--space-4);
    --input-padding: var(--input-padding-inline);
  }

  textarea {
    border: 0 none;
    font-family: inherit;
    font-size: inherit;
    resize: none;
    &:focus {
      -webkit-appearance: none;
    }
  }

  textarea:focus-visible,
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

  // :host-context([data-theme='brutal']) {
  //   --input-color-border-hover: var(--brutal-border-color);
  // }

  .textfield-control {
    display: flex;
    align-items: center;
    overflow: hidden;
    width: 100%;
    min-height: var(--input-height);
    gap: var(--input-padding-inline);
    padding: var(--input-padding-block) var(--input-padding-inline);
    border: var(--input-border);
    border-radius: var(--input-radius);
    box-sizing: border-box;
    background: var(--input-background-color);
    /* 기본 transparent, brutal 테마에서 --input-border-color 주입(상속)으로 #000.
       hover/invalid가 element-level border-color로 덮으므로 상태는 그대로 우선. */

    &:hover {
      border-color: var(--input-color-border-hover);
    }
    &:focus-within {
      box-shadow: var(--status-hover);
    }
  }

  /* mm-input은 light DOM에 렌더되므로 내부 input이 직접 flex item이 되도록 비표시한다. */
  mm-input {
    display: contents;
  }

  textarea,
  input {
    width: 100%;
    min-width: 0;
    height: 100%;

    border: 0;
    outline: none;
    background: inherit;
    font: inherit;
    color: var(--color-foreground);
  }

  input::placeholder,
  textarea::placeholder {
    color: var(--color-foreground-light);
  }

  textarea {
    height: auto;
    min-height: var(--input-height);
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
