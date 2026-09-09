import { css } from 'lit'

export const codeStyles = css`
  :host {
    display: block;
  }

  pre {
    margin: 0;
  }

  code {
    display: block;
    padding-left: var(--space-4);
    font-family: var(--font-family);
    font-size: var(--font-size-14);
    line-height: var(--font-line-height-24);
    white-space: pre-wrap;
    overflow-wrap: anywhere;
  }

  /* Prism이 붙이는 토큰 클래스. 테마마다 값이 정의된 색만 사용해 테마 전환을 그대로 따른다. */
  .token.punctuation,
  .token.comment {
    color: var(--foreground-subtle-color);
  }

  .token.tag {
    color: color-mix(in srgb, var(--foreground-danger-color) 85%, transparent);
  }

  .token.attr-name {
    color: color-mix(in srgb, var(--foreground-warning-color) 85%, transparent);
  }

  .token.attr-value {
    color: color-mix(in srgb, var(--foreground-success-color) 85%, transparent);
  }
`
