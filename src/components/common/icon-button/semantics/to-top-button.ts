import { LitElement } from 'lit'
import { customElement } from 'lit/decorators.js'

import {
  iconButtonSecondarySkinStyles,
  iconButtonStyles,
} from '@/components/common/icon-button/icon-button.styles'
import { renderIconAction } from '@/components/common/icon-button/icon-button.utils'
import { ICON_NAMES } from '@/components/common/icon-button/semantics/icon-names'

@customElement('mm-to-top-button')
export class ToTopButton extends LitElement {
  static styles = [iconButtonStyles, iconButtonSecondarySkinStyles]

  render() {
    return renderIconAction({
      icon: ICON_NAMES.SCROLL_TOP,
      ariaLabel: '맨 위로',
      onClick: this.handleClick,
    })
  }

  private handleClick() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-to-top-button': ToTopButton
  }
}
