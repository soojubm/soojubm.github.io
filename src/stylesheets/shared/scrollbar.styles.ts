import { css } from 'lit'

export const scrollbarStyles = css`
  :host::-webkit-scrollbar {width:.5rem;height:auto;padding:.125rem;opacity:0;}
  :host::-webkit-scrollbar-track {background:inherit;}
  :host::-webkit-scrollbar-thumb {margin:.125rem;background:var(--color-background);border-radius:var(--radius);}
  :host::-webkit-scrollbar-button {display:none;background-color:inherit;}
  :host::-webkit-scrollbar-corner {background-color:inherit;}
  :host:hover::-webkit-scrollbar-thumb {background:var(--color-background-strong);}
`
