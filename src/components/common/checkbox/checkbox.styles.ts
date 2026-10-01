import { css } from 'lit'

import { disabledStyles, focusRingStyles } from '@/stylesheets/shared.styles'

export const checkboxStyles = css`
  :host {
    --checkbox-size: var(--size-16);
    --checkbox-border-radius: var(--radius);
    --checkbox-border-color: var(--border-color);
    --checkbox-background-color: var(--background-color);
  }

  label {
    display: flex;
    align-items: center;
    height: var(--checkbox-size);
    gap: var(--space-2);
  }

  label > .indicator {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    position: relative;
    user-select: none;
    width: var(--checkbox-size);
    height: var(--checkbox-size);
    border: var(--border);
    border-color: var(--checkbox-border-color);
    box-sizing: border-box;
    border-radius: var(--checkbox-border-radius);
    background: var(--checkbox-background-color);
  }

  input[type='checkbox'] + label > .indicator::after {
    content: '';
    display: block;
    width: calc(var(--checkbox-size) * 0.375);
    height: calc(var(--checkbox-size) / 8);
    border-left: var(--border-width) solid;
    border-bottom: var(--border-width) solid;
    border-color: var(--checkbox-border-color);
    position: absolute;
    left: calc(var(--checkbox-size) / 4);
    top: calc(var(--checkbox-size) * 0.3125);
    transform: rotate(-50deg) scale(0);
  }

  input[type='checkbox']:checked + label > .indicator {
    --checkbox-border-color: var(--interaction-selected-border-color);
  }

  input[type='checkbox']:checked + label > .indicator::after {
    transform: rotate(-50deg) scale(1);
  }

  /* 부분 선택의 막대는 체크 표시가 아니므로 체크 애니메이션에서 뺀다. */
  input[type='checkbox']:checked:not(:indeterminate) + label > .indicator::after {
    animation: checkmark var(--transition-duration) ease-out;
  }

  input:focus-visible + label > .indicator {
    ${focusRingStyles};
  }

  input[type='checkbox']:indeterminate + label > .indicator {
    --checkbox-border-color: var(--interaction-selected-border-color);
    --checkbox-background-color: var(--interaction-selected-background-color);
  }

  input[type='checkbox']:indeterminate + label > .indicator::after {
    display: block;
    width: calc(var(--checkbox-size) / 2);
    background: var(--interaction-selected-background-color);
    border: none;
    left: calc(var(--checkbox-size) / 4);
    top: 48%;
    transform: rotate(0deg);
  }

  input:disabled + label {
    ${disabledStyles};
  }

  :host([size='large']) {
    --checkbox-size: var(--size-24);
  }

  /* 선택하면 체크 표시가 0에서 커진다. 끝 값은 선택된 규칙의 transform을 그대로 쓴다. */
  @keyframes checkmark {
    from {
      transform: rotate(-50deg) scale(0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    input[type='checkbox']:checked:not(:indeterminate) + label > .indicator::after {
      animation: none;
    }
  }
`
