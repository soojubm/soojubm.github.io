import { css } from 'lit'

export const groupStyles = css`
  .group {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
  }

  .group[data-variant='menuitem'] {
    flex-direction: column;
    gap: var(--space-2);
  }

  .group[data-variant='avatar'] {
    align-items: center;
    gap: 0;
  }

  .group[data-variant='avatar'] > * + * {
    margin-left: -0.25rem;
  }

  .group[data-variant='tag'] {
    gap: 6px;
  }

  .group[data-variant='button'] {
    gap: var(--space-2);
  }

  .group[data-variant='hashtag'] {
    column-gap: var(--space-2);
    row-gap: -0.25rem;
  }

  .group[data-variant='radio'],
  .group[data-variant='checkbox'] {
    flex-direction: column;
    gap: var(--space-3);
  }

  .group[data-variant='form'] {
    flex-direction: column;
    gap: var(--space-3);
  }

  .group[data-alignment='bleeding-vertical'] {
    display: flex;
    flex-wrap: nowrap;
    white-space: nowrap;
    padding: var(--space-3) 0 var(--space-0);
    overflow-x: auto;
    scroll-behavior: smooth;
  }
`
