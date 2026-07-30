import { css } from 'lit'

import { focusRing } from '@/stylesheets/shared.styles'

export const switchStyles = css`
  :host {
    --switch-width: var(--size-32);
    --switch-height: var(--size-16);
    --switch-border-radius: var(--radius);
    --switch-background-color: var(--border-color);
    display: block;
    height: var(--switch-height);
    position: relative;
  }

  input:focus-visible + label:before {
    ${focusRing};
  }

  input {
    opacity: 0;
    position: absolute;
    left: -0.5rem;
    right: -0.5rem;
    top: -0.5rem;
    bottom: -0.5rem;
    inline-size: 100%;

    &:checked + label {
      --switch-background-color: var(--interaction-selected-foreground-color);

      &:after {
        /* 썸은 트랙 높이만 한 정사각형이라, 이동 거리는 트랙 너비에서 썸 크기를 뺀 값이다. */
        transform: translateX(calc(var(--switch-width) - var(--switch-height)));
      }
    }

    &:disabled + label {
      cursor: not-allowed;
      opacity: 0.5;
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
      width: var(--switch-height);
      height: var(--switch-height);
      border: var(--border);
      border-radius: var(--switch-border-radius);
      box-sizing: border-box;
      background: var(--background-color);
      position: absolute;
      left: 0;
      top: 0;
      transition: transform var(--transition-duration) var(--transition-easing);
    }
  }
`
