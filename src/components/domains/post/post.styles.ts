import { css } from 'lit'

/**
 * post 계열이 공유하는 링크 표면. 글 카드 전체가 하나의 링크가 되므로
 * 색과 밑줄은 흐르는 값을 따르고, hover 배경은 레이아웃 박스를 밀지 않도록
 * inset된 ::before 레이어로 깐다. 여백은 소비처가 `--post-link-inset`으로 넓힌다.
 */
export const postLinkStyles = css`
  .link {
    --post-link-background-color: transparent;
    --post-link-inset: 0px;

    display: flex;
    border-radius: var(--radius);
    color: inherit;
    text-decoration: none;
    position: relative;
    isolation: isolate;
  }

  .link::before {
    content: '';
    border-radius: var(--radius);
    background-color: var(--post-link-background-color);
    position: absolute;
    inset: 0 calc(var(--post-link-inset) * -1);
    z-index: -1;
  }

  a.link:hover {
    --post-link-background-color: var(--interaction-hover-background-color);
  }

  a.link:focus-visible {
    outline: var(--interaction-focus-outline);
    outline-offset: -1px;
  }
`
