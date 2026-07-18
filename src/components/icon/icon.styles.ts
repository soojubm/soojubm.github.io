import { css, unsafeCSS } from 'lit'

import { buildAttributeRules } from '@/utils/attribute-styles'

const iconSizeTokens = {
  tiny: { 'font-size': '0.75rem' },
  small: { 'font-size': '0.875rem' },
  large: { 'font-size': '1.5rem' },
}

export const iconStyles = css`
  :host {
    display: inline-flex;
    --icon-color: currentColor;
  }

  i {
    font-style: normal;
  }

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    color: var(--icon-color);
  }

  ${unsafeCSS(buildAttributeRules('size', iconSizeTokens, '.icon'))}
`
