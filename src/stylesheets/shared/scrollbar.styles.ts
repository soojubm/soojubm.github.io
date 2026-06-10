import { css } from 'lit'

export const scrollbarStyles = css`
  :host {
    &::-webkit-scrollbar { width: 0.5rem; height: auto; padding: 0.125rem; opacity: 0; }
    &::-webkit-scrollbar-track { background: inherit; }
    &::-webkit-scrollbar-thumb { margin: 0.125rem; background: var(--color-background); border-radius: var(--radius); }
    &::-webkit-scrollbar-button { display: none; background-color: inherit; }
    &::-webkit-scrollbar-corner { background-color: inherit; }
    &:hover::-webkit-scrollbar-thumb { background: var(--color-background-strong); }
  }
`
