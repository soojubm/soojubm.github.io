import { LitElement, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { TooltipPlacement } from '@/components/overlay/tooltip/tooltip'

import { ICON_NAMES } from '@/components/common/icon/icon-names'
import { iconButtonStyles } from '@/components/common/icon-button/icon-button.styles'
import { renderIconButton } from '@/components/common/icon-button/icon-button.utils'
import { resetStyles } from '@/stylesheets/shared.styles'

@customElement('fff-clear-button')
export class ClearButton extends LitElement {
  static styles = [
    resetStyles,
    iconButtonStyles,
    css`
      :host {
        --icon-button-width: var(--size-16);
        --icon-button-height: var(--size-16);
        --icon-button-border-radius: var(--border-radius-full);
      }
    `,
  ]
  @property({ type: String, attribute: 'aria-label' }) ariaLabel = ''
  @property({ type: String, attribute: 'tooltip-placement' })
  tooltipPlacement: TooltipPlacement = 'bottom-start'
  @property({ type: Boolean }) disabled = false

  render() {
    return renderIconButton({
      icon: ICON_NAMES.CLOSE,
      ariaLabel: this.ariaLabel,
      tooltipPlacement: this.tooltipPlacement,
      disabled: this.disabled,
    })
  }
}
