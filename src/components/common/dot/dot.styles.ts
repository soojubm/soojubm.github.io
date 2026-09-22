import { css } from 'lit'

/**
 * 점의 모양과 크기. 점을 그리는 선택자 안에 펼쳐 쓴다.
 * 색은 --dot-background-color 하나로 모이므로, 상태별로 달라질 때도 이 변수에 값을 다시 할당한다.
 */
export const dotStyles = css`
  --dot-size: 8px;
  --dot-background-color: var(--foreground-subtle-color);

  display: inline-block;
  flex-shrink: 0;
  width: var(--dot-size);
  height: var(--dot-size);
  border-radius: 50%;
  background-color: var(--dot-background-color);
`
