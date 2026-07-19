import { css, unsafeCSS } from 'lit'

import { buildAttributeRules } from '@/utils/attribute-styles'

const iconButtonVariantTokens = {
  primary: {
    'background-color': 'var(--color-primary)',
    '--icon-button-text-color': 'var(--foreground-color-on-solid)',
  },
  secondary: {
    'border-radius': 'var(--radius-full)',
    '--icon-button-border': 'var(--surface-higher-border)',
    '--icon-button-background-color': 'var(--surface-higher-background-color)',
    '--icon-button-backdrop-filter': 'var(--surface-higher-backdrop-filter)',
    '--icon-button-shadow': 'var(--surface-higher-shadow)',
  },
  ghost: {
    'background-color': 'transparent',
    border: 'none',
  },
  destructive: {
    'background-color': 'var(--color-danger)',
    '--icon-button-text-color': 'var(--foreground-color-on-solid)',
  },
}

/** icon-button 액션 계열(close/delete/dismiss/hamburger/more/next/prev-button)이 공유하는 host 레이아웃. */
export const iconButtonActionStyles = css`
  :host {
    display: inline-flex;
  }
`

export const iconButtonStyles = css`
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
  }

  button:hover {
    background-color: var(
      --icon-button-background-color-hover,
      var(--icon-button-background-color)
    );
    color: var(--icon-button-text-color-hover, var(--icon-button-text-color));
  }

  ${unsafeCSS(buildAttributeRules('variant', iconButtonVariantTokens, 'button'))}

  :host([size='small']) {
    --icon-button-size: var(--size-24);
  }
`
