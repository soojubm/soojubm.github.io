import { css, unsafeCSS } from 'lit'

import resetCss from './reset.css?raw'

export const resetStyles = css`
  ${unsafeCSS(resetCss)}

  :host {
    box-sizing: border-box;
    font: inherit;
    color: inherit;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  body,
  dl,
  dd,
  figure,
  blockquote,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  input[type='radio'],
  input[type='checkbox'] {
    margin: 0;
  }

  ul,
  ol,
  menu,
  fieldset,
  legend {
    margin: 0;
    padding: 0;
  }
`
