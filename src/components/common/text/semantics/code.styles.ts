import { css } from 'lit'

/** fff-code와 fff-code-block이 같은 코드 글꼴로 읽히도록 글꼴 선언을 한곳에서 정의한다. */
export const codeTextStyles = css`
  font-family: var(--font-family-code);
  font-size: var(--font-size-12);
  font-weight: var(--font-weight-normal);
  letter-spacing: 0.0005em;
`
