import { css } from 'lit'

export const textStyles = css`
  h1,
  h2,
  h3,
  p {
    margin: 0;
    line-height: var(--font-line-height-large);
  }

  ul {
    margin: 0;
  }

  .checklist {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    padding-left: 0;
  }

  .checklist li {
    list-style: none;
    margin-left: 0;
    padding-left: var(--space-4);
    position: relative;
  }

  .checklist li::before {
    content: '';
    position: absolute;
    top: 6px;
    left: 3px;
    width: 2px;
    height: 6px;
    border: 1px solid var(--color-background-strong);
    border-width: 0 1px 1px 0;
    transform: rotate(37.5deg);
  }

  .text-group {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }

  .text-group[data-variant='small'] {
    gap: var(--space-1);
  }

  .text[data-center='true'] {
    text-align: center;
  }

  .text[data-truncated='true'] {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .util-truncate-multi {
    white-space: normal;
    word-wrap: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`
