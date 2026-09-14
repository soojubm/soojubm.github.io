import { css } from 'lit'

import { surfaceBaseStyles } from '@/components/common/surface/surface.styles'
import { focusRingStyles, visuallyHiddenStyles } from '@/stylesheets/shared.styles'

export const radioGroupStyles = css`
  :host {
    display: block;
  }

  /* fieldset 기본값(min-width: min-content) 때문에 flex 부모 안에서 줄어들지 못하고 넘치는 것을 막는다. */
  fieldset {
    min-width: 0;
  }

  .radio-group {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  /* 그룹 이름은 스크린리더에만 전달한다. */
  legend {
    ${visuallyHiddenStyles};
  }
`

export const radioStyles = css`
  :host {
    --radio-size: var(--size-16);
    --radio-border-radius: var(--radius-full);
    --radio-border-color: var(--border-color);
    --radio-background-color: var(--background-color);
  }

  label {
    display: flex;
    align-items: center;
    gap: var(--space-2);
  }

  label > .indicator {
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

  input[type='radio']:checked + label > .indicator {
    --radio-background-color: var(--interaction-selected-foreground-color);
    --radio-border-color: var(--interaction-selected-border-color);
    animation: radiomark var(--transition-duration) ease-out;
    box-shadow: 0 0 0 calc(var(--radio-size) / 4) var(--background-color) inset;
  }

  input:focus-visible + label > .indicator {
    ${focusRingStyles};
  }

  input:disabled + label {
    opacity: 0.5;
    cursor: not-allowed;
  }

  :host([size='large']) {
    --radio-size: var(--size-24);
  }
`

export const radioCardStyles = css`
  :host {
    display: block;
    --radio-card-background-color: var(--background-color);
    --radio-card-border: var(--border);
  }

  label {
    ${surfaceBaseStyles};
    --surface-border-radius: var(--radius-large);
    --surface-background-color: var(--radio-card-background-color);
    --surface-border: var(--radio-card-border);

    flex-direction: row;
    align-items: flex-start;
    gap: var(--space-3);
  }

  /* label이 align-items: flex-start라 슬롯 콘텐츠가 늘어나도 인디케이터가 첫 줄에 정렬되고 찌그러지지 않게 한다. */
  label > .indicator {
    flex-shrink: 0;
    margin-block-start: var(--space-1);
  }

  slot {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
  }

  input:not(:checked):not(:disabled) + label:hover {
    --radio-card-background-color: var(--interaction-hover-background-color);
  }

  input[type='radio']:checked + label {
    --radio-card-border: var(--border-width) solid var(--interaction-selected-border-color);
    --radio-card-background-color: var(--interaction-selected-background-color);
  }

  input:focus-visible + label {
    ${focusRingStyles};
  }

  input:focus-visible + label > .indicator {
    outline: none;
  }
`
