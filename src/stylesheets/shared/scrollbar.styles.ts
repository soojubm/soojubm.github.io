import { css } from 'lit'

export const scrollbarStyles = css`
  &::-webkit-scrollbar {
    width: 0.5rem;
    height: 0.5rem;
    padding: 0.125rem;
    opacity: 0;
  }
  &::-webkit-scrollbar-track {
    background: inherit;
  }
  &::-webkit-scrollbar-thumb {
    margin: 0.125rem;
    background: var(--background-subtle-color);
    border-radius: var(--radius);
  }
  &::-webkit-scrollbar-button {
    display: none;
    background-color: inherit;
  }
  &::-webkit-scrollbar-corner {
    background-color: inherit;
  }

  &:hover::-webkit-scrollbar-thumb {
    background: var(--background-strong-color);
  }
`
