import { css, unsafeCSS } from 'lit'

import { buildAttributeRules } from '@/utils/attribute-styles'

const avatarSizeTokens = {
  '80': { '--avatar-size': 'var(--size-80)', 'font-size': 'var(--font-size-huge)' },
  '48': { '--avatar-size': 'var(--size-48)', 'font-size': 'var(--font-size-large)' },
  '32': { '--avatar-size': 'var(--size-32)' },
}

const avatarVariantTokens = {
  primary: { border: 'var(--avatar-border)' },
  secondary: {
    '--avatar-background-color': 'var(--background-color)',
    '--avatar-border': 'var(--border)',
  },
  tertiary: {
    '--avatar-background-color': 'transparent',
    '--avatar-border': 'var(--border-transparent)',
    'box-shadow': 'none',
  },
}

export const avatarStyles = css`
  :host {
    --avatar-size: var(--size-40);
    --avatar-background-color: var(--background-subtle-color);
    --avatar-icon-color: var(--foreground-color);
    --avatar-border: var(--border-transparent);
    --avatar-border-radius: var(--radius);

    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--avatar-size);
    height: var(--avatar-size);
    max-height: var(--avatar-size);
    background-repeat: no-repeat;
    background-position: center;
    background-color: var(--avatar-background-color);
    border: var(--avatar-border);
    border-radius: var(--avatar-border-radius);
    box-sizing: border-box;
    position: relative;
    color: var(--avatar-icon-color);
  }

  :host([shape='circle']) {
    --avatar-border-radius: var(--radius-full);
  }

  ${unsafeCSS(buildAttributeRules('size', avatarSizeTokens))}

  ${unsafeCSS(buildAttributeRules('variant', avatarVariantTokens))}

  img {
    width: 100%;
    height: inherit;
    border-radius: var(--avatar-border-radius);
    object-fit: cover;
  }
`
