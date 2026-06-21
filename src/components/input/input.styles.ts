import { css } from 'lit'

export const inputStyles = css`
  :host {
    position: relative;
    --input-height: var(--size-large);
    --input-background-color: var(--color-background-subtle);
    --input-radius: var(--radius);
    --input-border: var(--border-transparent);
    --input-color-border-hover: var(--gray400);
    --input-focus-shadow: var(--status-hover);
    --input-text-color: var(--color-foreground);
    --input-padding-block: var(--space-3);
    --input-padding-inline: var(--space-4);
    --input-padding: var(--input-padding-inline);
  }

  :host([size='small']) {
    --input-height: var(--size-medium);
    --input-padding-block: 0;
    --input-padding-inline: var(--space-2);
  }

  // :host-context([data-theme='brutal']) {
  //   --input-color-border-hover: var(--brutal-border-color);
  // }

  .textfield-control,
  .textarea-control {
    display: flex;
    align-items: center;
    overflow: hidden;
    width: 100%;
    min-height: var(--input-height);
    gap: var(--space-2);
    padding-inline: var(--input-padding-inline);
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
      box-shadow: var(--input-focus-shadow);
    }

    &[data-invalid] {
      border-color: var(--color-danger);
    }
  }

  /* mm-input은 light DOM에 렌더되므로 내부 input이 직접 flex item이 되도록 비표시한다. */
  mm-input {
    display: contents;
  }

  textarea {
    width: 100%;
    min-width: 0;
    height: auto;
    min-height: var(--input-height);
    border: 0 none;
    outline: none;
    background: inherit;
    font: inherit;
    font-family: inherit;
    font-size: inherit;
    color: var(--color-foreground);
    padding: var(--input-padding-block) 0;
    box-sizing: border-box;
    resize: none;

    &:focus {
      -webkit-appearance: none;
    }
    &:focus-visible {
      outline: 0;
    }
    &::placeholder {
      color: var(--color-foreground-light);
    }
  }

  input {
    width: 100%;
    min-width: 0;
    height: 100%;
    border: 0;
    outline: none;
    background: inherit;
    font: inherit;
    color: var(--color-foreground);

    &:focus-visible {
      outline: 0;
    }
    &::placeholder {
      color: var(--color-foreground-light);
    }
    &:read-only {
      color: var(--color-foreground-light);
      cursor: default;
    }
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    &[type='text'] {
      -webkit-appearance: none;
    }
    &[type='number'] {
      -webkit-appearance: none;
      -moz-appearance: textfield;

      &::-webkit-inner-spin-button,
      &::-webkit-outer-spin-button {
        -webkit-appearance: none;
        -moz-appearance: none;
      }
    }
    &[type='date'] {
      display: block;
      max-height: var(--size-large);
      -webkit-appearance: none;

      &::-webkit-calendar-picker-indicator {
        width: 100%;
        opacity: 0;
        position: absolute;
        left: 0;
        bottom: 0;
      }
      &::-webkit-inner-spin-button {
        display: none;
        -webkit-appearance: none;
      }
    }
    &[type='password'] {
      -webkit-appearance: none;
      letter-spacing: 0.25rem;
    }
    &[type='search'] {
      font-family: inherit;
      font-size: inherit;
      -webkit-appearance: none;

      &::-webkit-search-decoration,
      &::-webkit-search-cancel-button,
      &::-webkit-search-results-button,
      &::-webkit-search-results-decoration {
        display: none;
      }
    }
  }

  [data-invalid] {
    & .textfield-control,
    & .textarea-control,
    & textarea {
      border-color: var(--color-danger);
    }
  }
`
