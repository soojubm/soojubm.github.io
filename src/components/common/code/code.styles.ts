import { css } from 'lit'

export const codeStyles = css`
  :host {
    display: block;
  }

  pre {
    margin: 0;
    overflow-x: auto;
  }

  code {
    font-size: var(--font-size-12);
    line-height: var(--font-line-height-16);
    white-space: pre;
  }

  /* Prism이 붙이는 토큰 클래스. 테마마다 값이 정의된 색만 사용해 테마 전환을 그대로 따른다. */
  .token.punctuation,
  .token.comment {
    color: var(--foreground-subtle-color);
  }

  .token.tag {
    color: var(--color-danger-foreground);
  }

  .token.attr-name {
    color: var(--color-warning-foreground);
  }

  .token.attr-value {
    color: var(--color-success-foreground);
  }
`
