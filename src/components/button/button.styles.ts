import { css } from 'lit'

export const interactiveControlStyles = css`
  :host {
    --control-color-focus: var(--color-interaction-focus);
    --control-color-active-bg: var(--color-interaction-active-background);
    --control-color-active-border: var(--color-interaction-active-border);
    --control-color-active-ring: var(--color-interaction-active-ring);
  }

  button {
    &:hover {
      border-color: var(--color-background-strong);
    }

    &:focus {
      outline: var(--space-1) solid var(--control-color-focus);
      outline-offset: var(--space-05);
    }

    &:enabled:active {
      background: var(--control-color-active-bg);
      border-color: var(--control-color-active-border);
      box-shadow: 0 0 0 var(--space-1) var(--control-color-active-ring),
        inset 0 0 0 var(--space-05) var(--color-foreground-on-solid);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
`

/**
 * 모든 버튼형 컴포넌트가 공유하는 기반 스타일.
 * 구조(레이아웃·크기·간격·타이포)와 기본 스킨, 상호작용 상태(focus·active·disabled)를 포함한다.
 */
export const buttonBaseStyles = [
  interactiveControlStyles,
  css`
    :host {
      --button-size: var(--size-medium);
      --button-min-width: 5rem;
      --button-border: var(--border-transparent);
      --button-padding-inline: var(--space-3);
      --button-radius: var(--radius);
      --button-background-color: var(--color-background-subtle);
      --button-text-size: inherit;
      --button-text-weight: var(--font-weight-normal);
      --button-text-color: var(--color-foreground);
    }

    :host([full-width]) button {
      width: 100%;
    }

    button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      /* max-content for trailing icons */
      width: var(--button-width, max-content);
      gap: var(--space-2);
      height: var(--button-size);
      padding: 0 var(--button-padding-inline);
      border: var(--button-border);
      border-radius: var(--button-radius);
      background: var(--button-background-color);
      box-sizing: border-box;

      color: var(--button-text-color);
      font-family: var(--font-family);
      font-size: var(--button-text-size);
      font-weight: var(--button-text-weight);
      text-transform: capitalize;

      cursor: pointer;
    }
  `,
]

/** mm-button 크기 변형. */
export const buttonSizeStyles = css`
  :host([size='huge']) button {
    --button-size: var(--size-huge);
    --button-text-size: var(--font-size-18);
    padding-bottom: 5px;
  }
  :host([size='large']) button {
    --button-size: var(--size-large);
    min-width: var(--button-min-width);
  }
  :host([size='small']) button {
    --button-size: var(--size-medium);
    min-width: 0;
  }
`

/** mm-button 색 변형(variant). */
export const buttonVariantStyles = css`
  :host([variant='primary']) {
    --button-background-color: var(--color-primary);
    --button-text-color: var(--color-foreground-on-solid);
  }
  :host([variant='secondary']) {
    --button-background-color: var(--color-primary-subtle);
    --button-text-color: var(--color-primary);
  }
  :host([variant='tertiary']) {
    --button-text-color: var(--color-foreground);
  }
  :host([variant='ghost']) {
    --button-background-color: transparent;
    --button-text-color: var(--color-primary);
  }
  :host([variant='destructive']) {
    --button-background-color: var(--color-danger);
    --button-text-color: var(--color-foreground-on-solid);
  }
`

/** 선택 상태 공통 스킨. toggle·follow·filter가 함께 공유한다. */
export const buttonSelectedStyles = css`
  :host([selected]) button {
    border: var(--border-width) solid var(--selection-indicator-color);
    background: var(--selection-background);
    color: var(--selection-foreground);
  }
`

/** mm-toggle-button 비선택 스킨. radius는 그룹이 모서리를 묶도록 토큰으로 노출한다. */
export const toggleButtonStyles = css`
  :host {
    display: inline-flex;

    --toggle-button-radius: var(--radius);
  }

  button {
    width: 100%;
    border-radius: var(--toggle-button-radius);
  }
`

/** mm-follow-button 비선택 스킨(팔로우 = primary). */
export const followButtonStyles = css`
  :host {
    display: inline-flex;
  }

  button {
    background: var(--color-primary);
    color: var(--color-foreground-on-solid);
  }
`
