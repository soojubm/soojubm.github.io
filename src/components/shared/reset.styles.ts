import { css, unsafeCSS, type CSSResultGroup } from 'lit'

import resetCss from '../../stylesheets/shared/reset.css?raw'

const documentResetStyles = unsafeCSS(resetCss)
const componentResetStyles = css`
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
`

export const resetStyles: CSSResultGroup = [documentResetStyles, componentResetStyles]
