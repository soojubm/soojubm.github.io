import { css } from 'lit'

export const styles = css`
  :host {
    display: inline-block;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: var(--tab-size, var(--size-medium));
    gap: var(--space-1);
    padding: 0 var(--space-3);
    border: 1px solid transparent;
    background: none;
    font-family: inherit;
    color: var(--tab-label-color, var(--color-foreground-light));
    font-weight: var(--tab-label-weight, var(--font-weight-bold));
    cursor: pointer;
    transition: color 0.2s;
    position: relative;
    z-index: var(--zindex-default);
  }

  button:hover {
    color: var(--tab-label-color-actived, var(--color-foreground));
  }

  /* 선택된 상태: 부모(mm-tab)의 [selected] 속성을 감지 */
  :host([selected='true']) button {
    border-radius: var(--radius);
    background: var(--color-background);
    box-shadow: var(--shadow);
    color: var(--tab-label-color-actived, var(--color-foreground));
  }

  .tab-label {
    padding: 0;
  }
`
