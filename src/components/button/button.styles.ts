import { css } from 'lit'

import { focusRing } from '@/stylesheets/shared/focus-ring.styles'

/** button 태그뿐 아니라 mm-hashtag-link 등 a 기반 파생 컴포넌트도 같은 스킨을 그대로 가져다 쓸 수 있도록 :is(button, a)로 잡는다. */
export const interactiveControlStyles = css`
  :is(button, a) {
    &:hover {
      border-color: var(--color-background-strong);
    }

    &:focus-visible {
      ${focusRing}
    }

    &:enabled:active {
      background: var(--interaction-active-background-color);
      box-shadow: var(--interaction-active-shadow);
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
      --button-height: var(--size-32);
      --button-min-width: 5rem;
      --button-border: var(--border-transparent);
      --button-padding-inline: var(--space-3);
      --button-border-radius: var(--radius);
      --button-background-color: var(--color-background-subtle);
      --button-text-size: inherit;
      --button-text-weight: var(--font-weight-normal);
      --button-text-color: var(--color-foreground);
    }

    :host([full-width]) :is(button, a) {
      width: 100%;
    }

    :is(button, a) {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      /* max-content for trailing icons */
      width: var(--button-width, max-content);
      gap: var(--space-2);
      height: var(--button-height);
      padding: 0 var(--button-padding-inline);
      border: var(--button-border);
      border-radius: var(--button-border-radius);
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
  :host([size='huge']) :is(button, a) {
    --button-height: var(--size-80);
    --button-text-size: var(--font-size-18);
    padding-bottom: 5px;
  }
  :host([size='large']) :is(button, a) {
    --button-height: var(--size-48);
    min-width: var(--button-min-width);
  }
  :host([size='small']) :is(button, a) {
    --button-height: var(--size-32);
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

/** 누름 상태는 표준 aria-pressed로 표현하므로, 스킨도 해당 attribute selector를 단일 기준으로 둔다. */
export const buttonSelectedStyles = css`
  button[aria-pressed='true'] {
    border-color: var(--interaction-selected-border-color);
    background: var(--interaction-selected-background-color);
    color: var(--interaction-selected-foreground-color);
  }
`

/** mm-toggle-button 비선택 스킨. radius는 그룹이 모서리를 묶도록 토큰으로 노출한다. */
export const toggleButtonStyles = css`
  :host {
    display: inline-flex;

    --toggle-button-border-radius: var(--radius);
  }

  button {
    width: 100%;
    border-radius: var(--toggle-button-border-radius);
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
