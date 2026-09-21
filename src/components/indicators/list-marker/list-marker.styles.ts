import { css } from 'lit'

/** 원 안에 기호를 가운데 두는 마커 골격. 지름은 --marker-size로, 색은 얹는 쪽이 정한다. */
export const markerShapeStyles = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: var(--marker-size);
  height: var(--marker-size);
  border-radius: 50%;
  font-size: 10px;
`

export const listMarkerStyles = css`
  :host {
    --marker-size: var(--size-16);
    --list-marker-background-color: var(--background-strong-color);
    --list-marker-text-color: var(--foreground-on-strong-color);

    ${markerShapeStyles};
    background: var(--list-marker-background-color);
    color: var(--list-marker-text-color);
  }

  svg {
    width: 0.5rem;
    height: 0.5rem;
  }
`
