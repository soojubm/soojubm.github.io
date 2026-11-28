import { css } from 'lit'

import { disabledStyles, focusRingStyles } from '@/stylesheets/shared.styles'

export const switchStyles = css`
  :host {
    --switch-width: var(--size-32);
    --switch-height: var(--size-16);
    --switch-border-radius: var(--border-radius);
    --switch-background-color: var(--background-subtle-color);
    --switch-thumb-size: var(--switch-height);
    --switch-thumb-border: var(--border);
    --switch-thumb-background-color: var(--background-color);
    display: block;
    height: var(--switch-height);
    position: relative;
  }

  input:focus-visible + label:before {
    ${focusRingStyles};
  }

  input {
    opacity: 0;
    position: absolute;
    inset: calc(var(--space-2) * -1);
    inline-size: 100%;

    &:checked + label {
      --switch-background-color: var(--interaction-selected-foreground-color);

      &:after {
        /* 이동 거리는 트랙 너비에서 썸 크기를 뺀 값이다. */
        transform: translateX(calc(var(--switch-width) - var(--switch-thumb-size)));
      }
    }

    &:disabled + label {
      ${disabledStyles};
    }
  }

  label {
    display: flex;
    gap: var(--space-2);
    line-height: var(--switch-height);
    cursor: pointer;

    &:before {
      content: '';
      display: block;
      width: var(--switch-width);
      height: var(--switch-height);
      border-radius: var(--switch-border-radius);
      box-sizing: border-box;
      background: var(--switch-background-color);
      transition: all var(--transition-duration) var(--transition-easing);
    }

    &:after {
      content: '';
      display: block;
      width: var(--switch-thumb-size);
      height: var(--switch-thumb-size);
      border: var(--switch-thumb-border);
      border-radius: var(--switch-border-radius);
      box-sizing: border-box;
      background: var(--switch-thumb-background-color);
      position: absolute;
      left: 0;
      top: 0;
      transition: transform var(--transition-duration) var(--transition-easing);
    }
  }
`
