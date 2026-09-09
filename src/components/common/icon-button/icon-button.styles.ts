import { css, unsafeCSS } from 'lit'

import { interactiveControlStyles } from '@/components/common/button/button.styles'
import { buildAttributeRules } from '@/utils'

const iconButtonVariantTokens = {
  primary: {
    '--icon-button-background-color': 'var(--primary-color)',
    '--icon-button-text-color': 'var(--foreground-on-strong-color)',
  },
  secondary: {
    '--icon-button-border-radius': 'var(--radius-full)',
    '--icon-button-border': 'var(--border)',
    '--icon-button-background-color': 'var(--surface-base-background-color)',
    '--icon-button-backdrop-filter': 'var(--surface-base-backdrop-filter)',
    '--icon-button-shadow': 'var(--surface-base-shadow)',
  },
  ghost: {
    '--icon-button-background-color': 'transparent',
  },
  destructive: {
    '--icon-button-background-color': 'var(--danger-color)',
    '--icon-button-text-color': 'var(--foreground-on-strong-color)',
  },
}

/**
 * close/more/next/prev/to-top-button처럼 secondary 스킨을 그대로 쓰는 계열이 공유하는 토큰 오버라이드.
 * iconButtonStyles의 기본(tertiary)값 위에 얹어 쓴다.
 */
export const iconButtonSecondarySkinStyles = css`
  :host {
    --icon-button-border-radius: var(--radius-full);
    --icon-button-border: var(--border);
    --icon-button-background-color: var(--surface-base-background-color);
    --icon-button-backdrop-filter: var(--surface-base-backdrop-filter);
    --icon-button-shadow: var(--surface-base-shadow);
  }
`

/**
 * 누름 상태는 표준 aria-pressed로 표현하므로, 스킨도 해당 attribute selector를 단일 기준으로 둔다.
 * 아이콘 버튼은 아이콘 자체가 채워져 선택을 알리므로 색만 바꾼다.
 */
export const iconButtonSelectedStyles = css`
  button[aria-pressed='true'] {
    --icon-button-text-color: var(--interaction-selected-foreground-color);
  }
`

/**
 * icon-button 계열의 기반 스타일.
 * hover·focus·disabled는 자체 button을 렌더하는 파생 컴포넌트가 빠뜨리기 쉬우므로
 * buttonBaseStyles와 같이 interactiveControlStyles를 여기 묶어 함께 내보낸다.
 */
export const iconButtonStyles = [
  interactiveControlStyles,
  css`
    :host {
      display: inline-flex;
      --icon-button-size: var(--size-32);
      --icon-button-background-color: var(--background-subtle-color);
      --icon-button-border-radius: var(--radius);
      --icon-button-border: var(--border-transparent);
      --icon-button-text-color: var(--foreground-color);
      --icon-button-shadow: none;
      --icon-button-backdrop-filter: none;
    }

    button {
      padding: 0;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: var(--icon-button-size);
      height: var(--icon-button-size);
      border: var(--icon-button-border);
      border-radius: var(--icon-button-border-radius);

      background: var(--icon-button-background-color);
      box-shadow: var(--icon-button-shadow);
      backdrop-filter: var(--icon-button-backdrop-filter);
      -webkit-backdrop-filter: var(--icon-button-backdrop-filter);
      color: var(--icon-button-text-color);
      font-family: var(--font-family);
      font-size: inherit;
      cursor: pointer;

      &:hover {
        --icon-button-border: var(--border);
      }
    }

    ${unsafeCSS(buildAttributeRules('variant', iconButtonVariantTokens, 'button'))}

    :host([size='small']) {
      --icon-button-size: var(--size-24);
    }
  `,
]
