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
  }

  :host([size='tiny']) .icon {
    font-size: 0.75rem;
  }

  :host([size='small']) .icon {
    font-size: 0.875rem;
  }

  :host([size='large']) .icon {
    font-size: 1.5rem;
  }
`
