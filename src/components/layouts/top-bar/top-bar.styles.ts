import { css } from 'lit'

import { backgroundLayerStyles, layerContainerStyles } from '@/stylesheets/shared.styles'

export const topBarStyles = css`
  :host {
    --top-bar-min-height: var(--size-48);
    --top-bar-gap: var(--space-2);
    --top-bar-background-color: var(--material-chrome-background-color);

    display: block;
  }

  /* 페이지 단위 상단 바라 높이·배경을 스스로 갖는다. 고정 위치는 mm-fixed-top이 맡는다. */
  header {
    display: flex;
    align-items: center;
    width: 100%;
    min-height: var(--top-bar-min-height);
    gap: var(--top-bar-gap);
    box-sizing: border-box;
    ${layerContainerStyles}
  }

  /* 재질은 ::before 형제 레이어가 소유한다. 조상에 backdrop-filter가 걸리면 action slot 안 popover의 blur가 죽기 때문이다. */
  header::before {
    background: var(--top-bar-background-color);
    backdrop-filter: var(--material-chrome-backdrop-filter);
    -webkit-backdrop-filter: var(--material-chrome-backdrop-filter);
    ${backgroundLayerStyles}
  }

  .trailing-area {
    display: flex;
    gap: var(--top-bar-gap);
    margin: 0 0 0 auto;
  }
`
