import { css } from 'lit'

export const inputStyles = css`
  :host {
    position: relative;
    --input-height: var(--size-large);
    --input-background-color: var(--color-background-subtle);
    --input-border-radius: var(--radius);
    --input-border: var(--border-transparent);
    --input-focus-outline: var(--interaction-focus-outline);
    --input-padding-block: var(--space-3);
    --input-padding-inline: var(--space-4);
  }

  :host([size='small']) {
    --input-height: var(--size-medium);
    --input-padding-block: 0;
    --input-padding-inline: var(--space-2);
  }

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
    border-radius: var(--input-border-radius);
    box-sizing: border-box;
    background: var(--input-background-color);
    /* 기본 transparent, brutal 테마에서 --input-border-color 주입(상속)으로 #000.
       hover/invalid가 element-level border-color로 덮으므로 상태는 그대로 우선. */

    &:hover {
      border-color: var(--input-border-color-hover);
    }
    &:focus-within {
      outline: var(--input-focus-outline);
      outline-offset: 2px;
    }

    &[aria-invalid='true'] {
      border-color: var(--color-danger);
    }
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

  [aria-invalid='true'] {
    & .textfield-control,
    & .textarea-control,
    & textarea {
      border-color: var(--color-danger);
    }
  }
`
