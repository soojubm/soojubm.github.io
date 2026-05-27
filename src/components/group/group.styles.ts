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
  /* 1. 모든 슬롯 자식들에게 왼쪽 음수 마진 부여 */
  .group[data-variant='avatar'] ::slotted(*) {
    margin-left: -0.25rem;
    outline: 2px solid var(--color-background);
    border-radius: var(--radius);
    position: relative;
    z-index: 1;
  }

  /* 2. 가장 첫 번째 슬롯 자식은 겹치지 않도록 마진을 0으로 리셋 */
  .group[data-variant='avatar'] ::slotted(:first-child) {
    margin-left: 0;
  }

  .group[data-variant='tag'] {
    gap: 6px;
  }

  .group[data-variant='button'] {
    gap: var(--space-2);
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
