import { css } from 'lit'

export const iconStyles = css`
  i {
    font-style: normal;
  }

  .icon {
    --button-text-color: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    color: var(--button-text-color);

    &[data-size='tiny'] {
      font-size: 0.75rem;
    }
    &[data-size='small'] {
      font-size: 0.875rem;
    }
    &[data-size='large'] {
      font-size: 1.5rem;
    }
  }
`
