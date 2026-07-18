import { css } from 'lit'

/** radio·checkbox처럼 네이티브 input을 시각적으로 숨기고 label의 인디케이터로 대체하는 컨트롤이 공유하는 규칙. */
export const visuallyHiddenInputStyles = css`
  input {
    cursor: pointer;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
`
