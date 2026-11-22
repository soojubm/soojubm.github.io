import { css } from 'lit'

/** 원 안에 기호를 가운데 두는 마커 골격. 지름은 --marker-width·--marker-height로, 색은 얹는 쪽이 정한다. */
export const markerShapeStyles = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: var(--marker-width);
  height: var(--marker-height);
  border-radius: 50%;
  font-size: 10px;
`

export const listMarkerStyles = css`
  :host {
    --marker-width: var(--size-16);
    --marker-height: var(--size-16);
    --list-marker-background-color: var(--background-strong-color);
    --list-marker-text-color: var(--foreground-on-strong-color);

    ${markerShapeStyles};
    background: var(--list-marker-background-color);
    color: var(--list-marker-text-color);
  }

  /* 체크는 배경 없이 기호만 두므로 글자색을 일반 전경색으로 맞춘다. */
  :host([variant='check']) {
    --list-marker-background-color: transparent;
    --list-marker-text-color: var(--foreground-color);
  }

  svg {
    width: 0.5rem;
    height: 0.5rem;
  }
`
