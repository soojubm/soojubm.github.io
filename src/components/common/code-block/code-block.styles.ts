import { css } from 'lit'

import { surfaceBaseStyles } from '@/components/common/surface/surface.styles'

export const codeBlockStyles = css`
  :host {
    display: block;
    position: relative;
  }

  /* 면을 가진 pre 뒤에 두어야 그 위에 그려진다. code의 padding-right가 글이 깔릴 자리를 비워둔다. */
  mm-copy-button {
    position: absolute;
    top: var(--space-3);
    right: var(--space-3);
  }

  /* 코드 면은 surface 면 선언을 조합한다. */
  pre {
    ${surfaceBaseStyles};
    --surface-border-radius: var(--radius-large);
  }

  /* 면을 걷으면 버튼이 기댈 여백도 없으므로 첫 줄 가운데와 프레임 안쪽 끝에 맞춘다. */
  :host([variant='plain']) mm-copy-button {
    top: calc(var(--font-line-height-24) / 2);
    right: 0;
    transform: translateY(-50%);
  }

  /* 이미 면을 가진 프레임 안에 놓일 때는 면을 걷고 코드만 그린다. */
  :host([variant='plain']) pre {
    --surface-padding: 0;
    --surface-border: none;
    --surface-border-radius: 0;
    --surface-background-color: transparent;
  }

  code {
    display: block;
    font-family: var(--font-family);
    font-size: var(--font-size-14);
    line-height: var(--font-line-height-24);
    white-space: pre-wrap;
    overflow-wrap: anywhere;
  }

  /* 복사 버튼이 있을 때만 글이 버튼 아래로 깔릴 자리를 비운다. */
  pre:has(+ mm-copy-button) code {
    padding-right: var(--space-12);
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
