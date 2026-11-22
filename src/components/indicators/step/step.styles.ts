import { css } from 'lit'

import { markerShapeStyles } from '@/components/indicators/list-marker/list-marker.styles'

export const stepStyles = css`
  :host {
    --marker-width: var(--size-16);
    --marker-height: var(--size-16);

    display: flex;
    justify-content: space-around;
    width: 100%;
    position: relative;
    isolation: isolate;
  }

  /* 단계를 잇는 선은 마커 가운데를 지나며, 마커가 그 위에 얹힌다. */
  :host::before {
    content: '';
    width: 100%;
    height: var(--border-width);
    background: var(--border-color);
    position: absolute;
    top: calc(var(--marker-height) / 2);
    left: 0;
  }

  :host([orientation='vertical']) {
    flex-direction: column;
    gap: var(--space-3);
  }

  :host([orientation='vertical'])::before {
    width: var(--border-width);
    height: 100%;
    top: 0;
    left: calc(var(--marker-width) / 2);
  }
`

export const stepItemStyles = css`
  :host {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    gap: var(--space-1);
    position: relative;
    text-align: center;
  }

  .marker {
    ${markerShapeStyles};
    background: var(--background-subtle-color);
  }

  .label {
    color: var(--foreground-subtle-color);
  }

  :host([active]) .marker {
    background: var(--background-strong-color);
    color: var(--foreground-on-strong-color);
  }

  :host([active]) .label {
    color: var(--foreground-color);
  }

  /* 세로 단계는 마커 옆에 라벨을 두고, 딸린 내용은 라벨 아래 같은 열에서 이어진다. */
  :host([orientation='vertical']) {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: var(--space-2);
    text-align: left;
  }

  :host([orientation='vertical']) .content {
    grid-column: 2;
  }
`
