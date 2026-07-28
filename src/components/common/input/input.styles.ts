import { css } from 'lit'

/** radio·checkbox처럼 네이티브 input을 시각적으로 숨기고 label의 인디케이터로 대체하는 컨트롤이 공유하는 규칙. */
export const visuallyHiddenInputStyles = css`
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
`

export const inputStyles = css`
  :host {
    position: relative;
    --input-height: var(--size-48);
    --input-background-color: var(--background-subtle-color);
    --input-border-radius: var(--radius);
    --input-border: var(--border-transparent);
    --input-focus-outline: var(--interaction-focus-outline);
    --input-padding-block: var(--space-3);
    --input-padding-inline: var(--space-4);
  }

  :host(:hover) {
    --input-border: var(--border);
  }

  :host([size='small']) {
    --input-height: var(--size-32);
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
    color: var(--foreground-color);
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
      color: var(--foreground-subtle-color);
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

/** label·helper·validation을 함께 렌더하는 field 계열(textfield, textarea-field, number-input)의 공유 규칙. */
export const textfieldStyles = [
  inputStyles,
  css`
    p {
      margin: 0;
    }

    mm-textfield-validation {
      margin: var(--space-1) 0 0;
    }

    /* 라벨을 시각적으로만 감추고 스크린리더에는 남김 (for 연결 유지) */
    :host([hidden-label]) mm-textfield-label {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
  `,
]
