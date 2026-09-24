import { LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { ActionConfig } from '@/types'

import { renderActionButtons } from '@/components/common/button/button.utils'
import { sheetFooterStyles } from '@/components/overlay/overlay.styles'
import '@/components/common'

@customElement('mm-sheet-footer')
export class SheetFooter extends LitElement {
  static styles = sheetFooterStyles
  @property({ attribute: false }) primaryAction?: ActionConfig
  @property({ attribute: false }) secondaryAction?: ActionConfig

  render() {
    return renderActionButtons({
      primaryAction: this.primaryAction,
      secondaryAction: this.secondaryAction,
      size: 'large',
    })
  }
}
