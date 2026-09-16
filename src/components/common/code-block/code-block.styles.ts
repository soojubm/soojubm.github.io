import { css } from 'lit'

import { surfaceBaseStyles } from '@/components/common/surface/surface.styles'

export const codeBlockStyles = css`
  :host {
    display: block;
  }

  /* 코드 면은 surface 면 선언을 조합한다. 누를 수 없는 면이라 채움 없이 테두리로 구분한다. */
  pre {
    ${surfaceBaseStyles};
    --surface-border-radius: var(--radius-large);
  }

  code {
    display: block;
    font-family: var(--font-family);
    font-size: var(--font-size-14);
    line-height: var(--font-line-height-24);
    white-space: pre-wrap;
    overflow-wrap: anywhere;
  }

  /* Prism이 붙이는 토큰 클래스. 테마마다 값이 정의된 색만 사용해 테마 전환을 그대로 따른다. */
  .token.punctuation,
  .token.operator,
  .token.comment {
    color: var(--foreground-subtle-color);
  }

  .token.tag,
  .token.keyword {
    color: color-mix(in srgb, var(--foreground-danger-color) 85%, transparent);
  }

  .token.attr-name,
  .token.property {
    color: color-mix(in srgb, var(--foreground-warning-color) 85%, transparent);
  }

  .token.attr-value,
  .token.builtin,
  .token.class-name {
    color: color-mix(in srgb, var(--foreground-success-color) 85%, transparent);
  }
`
