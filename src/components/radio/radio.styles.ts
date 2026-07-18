import { css } from 'lit'

import { focusRing } from '@/stylesheets/shared/focus-ring.styles'

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
    gap: var(--space-2);
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
    --radio-size: var(--size-16);
    --radio-border-radius: 50%;
    --radio-border-color: var(--color-border);
    --radio-background-color: var(--color-background);
    --radio-border-color-checked: var(--interaction-selected-border-color);
    --radio-background-color-checked: var(--interaction-selected-background-color);
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
    gap: var(--space-2);
  }

  label > span {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    position: relative;
    user-select: none;
    width: var(--radio-size);
    height: var(--radio-size);
    border: var(--border);
    border-color: var(--radio-border-color);
    box-sizing: border-box;
    border-radius: var(--radio-border-radius);
    background: var(--radio-background-color);
  }

  input[type='radio']:checked + label > span {
    background: var(--radio-background-color-checked);
    border-color: var(--radio-border-color-checked);
    animation: radiomark var(--animation-input, 0.2s) ease-out;
    box-shadow: 0 0 0 4px var(--color-background) inset;
  }

  input:focus-visible + label > span {
    ${focusRing}
  }

  input:disabled ~ label {
    opacity: 0.5;
    cursor: not-allowed;
  }
`
