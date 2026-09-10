import { css } from 'lit'

import { surfaceBaseStyles } from '@/components/common/surface/surface.styles'
import { focusRing, visuallyHidden } from '@/stylesheets/shared.styles'

export const radioGroupStyles = css`
  :host {
    display: block;
  }

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

export const radioCardStyles = css`
  :host {
    display: block;
  }

  label {
    ${surfaceBaseStyles};
    --surface-border-radius: var(--radius-large);

    flex-direction: row;
    align-items: flex-start;
    gap: var(--space-3);
  }

  label > span {
    flex-shrink: 0;
    margin-block-start: var(--space-1);
  }

  slot {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
  }

  input:not(:checked):not(:disabled) + label:hover {
    --surface-background-color: var(--interaction-hover-background-color);
  }

  input[type='radio']:checked + label {
    --surface-border: var(--border-width) solid var(--interaction-selected-border-color);
    --surface-background-color: var(--interaction-selected-background-color);
  }

  input:focus-visible + label {
    ${focusRing};
  }

  input:focus-visible + label > span {
    outline: none;
  }
`
