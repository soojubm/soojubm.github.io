import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { sheetHeaderStyles } from '@/components/overlay/overlay.styles'
import { emit } from '@/utils'
import '@/components/common/text/semantics/heading'
import '@/components/common/icon-button/semantics/close-button'

@customElement('mm-sheet-header')
class SheetHeader extends LitElement {
  static styles = sheetHeaderStyles

  @property({ type: String, reflect: true }) role = 'navigation'
  @property({ type: String }) heading = ''

  render() {
    return html`
      <mm-heading level="2">${this.heading}</mm-heading>
      <mm-close-button @close=${this.handleClose}></mm-close-button>
    `
  }

  private handleClose = () => {
    emit(this, 'sheet-close')
  }
}

export default SheetHeader
