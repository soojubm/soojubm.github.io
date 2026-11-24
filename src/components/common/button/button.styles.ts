import { css, unsafeCSS } from 'lit'

import type { ButtonSize, ButtonVariant } from '@/components/common/button/button'

import { disabledStyles, focusRingStyles } from '@/stylesheets/shared.styles'
import { buildAttributeRules, buildDeclarations, type AttributeTokens } from '@/utils'

/** 눌리는 컨트롤의 hover 테두리·포커스 링·비활성 표시. 선언만 담으므로 사용하는 컴포넌트가 자기 선택자 안에 펼친다. */
export const buttonInteractiveStyles = css`
  /* 눌림 상태는 자기 테두리 색을 지키므로 hover가 덮지 않는다. */
  &:hover:not(:disabled, [aria-pressed='true']) {
    border-color: var(--border-color);
  }

  &:focus-visible {
    ${focusRingStyles};
  }

  &:disabled {
    ${disabledStyles};
  }
`

const buttonSizeTokens: AttributeTokens<Exclude<ButtonSize, 'medium'>> = {
  large: { '--button-height': 'var(--size-48)' },
}

/**
 * 모든 버튼형 컴포넌트가 공유하는 기반 스타일.
 * 구조(레이아웃·크기·간격·타이포)와 기본 스킨에 hover·포커스·비활성(buttonInteractiveStyles)까지 함께 입힌다.
 */
export const buttonBaseStyles = css`
  :host {
    --button-height: var(--size-32);
    --button-min-width: var(--size-32);
    --button-border: var(--border-transparent);
    --button-padding-inline: var(--space-3);
    --button-border-radius: var(--border-radius);
    --button-background-color: var(--background-subtle-color);
    --button-text-size: inherit;
    --button-text-weight: var(--font-weight-normal);
    --button-text-color: var(--foreground-color);
  }

  ${unsafeCSS(buildAttributeRules('size', buttonSizeTokens))}

  :host([full-width]) :is(button, a) {
    width: 100%;
  }

  :is(button, a) {
    ${buttonInteractiveStyles};
    display: inline-flex;
    align-items: center;
    justify-content: center;
    /* max-content for trailing icons */
    width: max-content;
    min-width: var(--button-min-width);
    gap: var(--space-1);
    height: var(--button-height);
    padding: 0 var(--button-padding-inline);
    border: var(--button-border);
    border-radius: var(--button-border-radius);
    background: var(--button-background-color);
    box-sizing: border-box;

    font-family: var(--font-family);
    font-size: var(--button-text-size);
    font-weight: var(--button-text-weight);
    color: var(--button-text-color);

    text-transform: capitalize;
    white-space: nowrap;
  }
`

const buttonVariantTokens: AttributeTokens<ButtonVariant> = {
  primary: {
    '--button-background-color': 'var(--primary-color)',
    '--button-text-color': 'var(--foreground-on-primary-color)',
  },
  secondary: {
    '--button-text-color': 'var(--foreground-color)',
  },
  tertiary: {
    '--button-background-color': 'transparent',
    '--button-text-color': 'var(--primary-color)',
  },
}

/** mm-button 색 변형(variant)과, 파괴적 행동임을 알리는 destructive 의도. */
export const buttonVariantStyles = css`
  ${unsafeCSS(buildAttributeRules('variant', buttonVariantTokens))}

  :host([destructive][variant='primary']) {
    --button-background-color: var(--background-danger-color);
    --button-text-color: var(--foreground-on-danger-color);
  }

  :host([destructive][variant='secondary']),
  :host([destructive][variant='tertiary']) {
    --button-text-color: var(--foreground-danger-color);
  }
`

/** 자체 button을 렌더하는 시맨틱 컴포넌트가 variant 하나를 골라 스킨으로 얹는 선언. 얹을 선택자 안에 펼쳐 쓴다. */
export const buttonVariantSkin = (variant: keyof typeof buttonVariantTokens) =>
  unsafeCSS(buildDeclarations(buttonVariantTokens[variant]))

/** 누름 상태는 표준 aria-pressed로 표현하므로, 스킨도 해당 attribute selector를 단일 기준으로 둔다. */
export const buttonSelectedStyles = css`
  button[aria-pressed='true'] {
    --button-background-color: var(--interaction-selected-background-color);
    --button-text-color: var(--interaction-selected-foreground-color);
    --button-border: var(--border-selected);
  }
`
