import { css } from 'lit'

import { backgroundLayerStyles, layerContainerStyles } from '@/stylesheets/shared.styles'

export const topBarStyles = css`
  :host {
    --top-bar-min-height: var(--size-48);
    --top-bar-gap: var(--space-2);

    display: block;
    background: inherit;
  }

  /* 페이지 단위 상단 바라 높이를 스스로 갖고 배경은 부모를 따른다. 고정 위치는 mm-fixed-top이 맡는다. */
  header {
    display: flex;
    align-items: center;
    width: 100%;
    min-height: var(--top-bar-min-height);
    gap: var(--top-bar-gap);
    box-sizing: border-box;
    background: inherit;
    ${layerContainerStyles}
  }

  /* 재질은 ::before 형제 레이어가 소유한다. 조상에 backdrop-filter가 걸리면 action slot 안 popover의 blur가 죽기 때문이다. */
  header::before {
    background: inherit;
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
