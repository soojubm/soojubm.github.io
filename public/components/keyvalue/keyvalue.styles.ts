import { css } from 'lit'

export const keyvalueStyles = css`
  :host {display:flex;flex-direction:column;width:100%;gap:var(--space-2);}
  .summary-item {
    display:flex;justify-content:space-between;
  }
  .summary-item[data-alignment=inline] {
    justify-content: baseline;
    gap: var(--space-2);
  }
  .summary-item[data-alignment=column] {
    flex-direction: column;
    gap: var(--space-0);
    /* font-family: 'Courier New', consolas; */
  }

  :host {display:flex;gap:2rem;}
`
