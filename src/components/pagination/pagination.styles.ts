import { css } from 'lit'

import { MEDIA } from '@/stylesheets/shared/breakpoints'

export const paginationStyles = css`
  :host {
    display: block;
  }

  .pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
    margin: var(--space-4) 0;
  }

  .pagination-ellipsis {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--size-32);
    height: var(--size-32);
    color: var(--color-foreground-light);
    letter-spacing: 1px;
    line-height: 1;
    user-select: none;
  }

  @media ${MEDIA.compact} {
    .pagination {
      gap: 0;
    }

    mm-prev-button,
    mm-next-button,
    mm-page-button {
      --button-height: var(--size-24);
    }

    .pagination-ellipsis {
      width: var(--size-24);
      height: var(--size-24);
    }
  }
`
