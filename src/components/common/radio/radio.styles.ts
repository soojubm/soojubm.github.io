import { css } from 'lit'

import { focusRing, visuallyHidden } from '@/stylesheets/shared.styles'

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

  /* 그룹 이름은 스크린리더에만 전달한다. */
  legend {
    ${visuallyHidden};
  }
`

export const radioStyles = css`
  :host {
    --radio-size: var(--size-16);
    --radio-border-radius: var(--radius-full);
    --radio-border-color: var(--border-color);
    --radio-background-color: var(--background-color);
    gap: var(--space-2);
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
    --radio-background-color: var(--interaction-selected-foreground-color);
    --radio-border-color: var(--interaction-selected-border-color);
    animation: radiomark var(--transition-duration) ease-out;
    box-shadow: 0 0 0 4px var(--background-color) inset;
  }

  input:focus-visible + label > span {
    ${focusRing};
  }

  input:disabled ~ label {
    opacity: 0.5;
    cursor: not-allowed;
  }
`
