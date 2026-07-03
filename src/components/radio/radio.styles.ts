import { css } from 'lit'

export const radioGroupStyles = css`
  fieldset {
    border: none;
    padding: 0;
    margin: 0;
    min-width: 0;
  }

  .radio-group {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }

  /* 스크린 리더 전용 숨김 스타일 */
  .visually-hidden {
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
`

export const radioStyles = css`
  :host {
    --radio-size: var(--size-tiny);
    --radio-border-color: var(--color-border-strong);
    --radio-border: 1px solid var(--radio-border-color);
    --radio-border-radius: 50%;
    --radio-color-checked: var(--selection-indicator-color);
    position: relative;
  }

  label {
    display: flex;
    gap: var(--space-2);
    line-height: var(--radio-size);

    & > span:first-child {
      width: var(--radio-size);
      height: var(--radio-size);
      border: var(--radio-border);
      border-radius: var(--radio-border-radius);
      box-shadow: var(--shadow);
      box-sizing: border-box;
    }
  }

  input {
    margin: 0;
    background-color: var(--color-background);
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    position: absolute;
    left: 0;

    &:checked + label > span:first-child {
      background: var(--radio-color-checked);
      border-color: var(--radio-color-checked);
      animation: radiomark var(--animation-input, 0.2s) ease-out;
      box-shadow: 0 0 0 4px var(--color-background) inset;
    }

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;

      & + label {
        opacity: 0.6;
        cursor: not-allowed;
      }
    }
  }
`
