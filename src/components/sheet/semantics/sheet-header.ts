import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { sheetHeaderStyles } from '@/components/sheet/sheet.styles'
import { emit } from '@/utils/emit'

@customElement('mm-sheet-header')
class SheetHeader extends LitElement {
  static styles = sheetHeaderStyles

  @property({ type: String }) heading = ''

  render() {
    return html`
      <header role="navigation">
        <mm-paragraph size="large">${this.heading}</mm-paragraph>
        <mm-close-button @close=${this.handleClose}></mm-close-button>
      </header>
    `
  }

  private handleClose = () => {
    emit(this, 'sheetclose')
  }
}

export default SheetHeader
