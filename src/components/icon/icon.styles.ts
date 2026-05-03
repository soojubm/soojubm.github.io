import { css } from 'lit'

export const iconStyles = css`
  i {
    font-style: normal;
  }

  .icon {
    --button-text-color: var(--color-foreground);
    --button-text-color: inherit;
    display: flex !important;
    align-items: center;
    justify-content: center;
    font-size: 1rem !important;
    color: var(--button-text-color);
  }

  .icon[data-size='tiny'] {
    font-size: 0.75rem !important;
  }

  .icon[data-size='small'] {
    font-size: 0.875rem !important;
  }

  .icon[data-size='large'] {
    font-size: 1.5rem !important;
  }
`
