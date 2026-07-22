import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'

import { sheetBodyStyles } from '@/components/sheet/sheet.styles'

@customElement('mm-sheet-body')
class SheetBody extends LitElement {
  static styles = sheetBodyStyles

  render() {
    return html`
      <slot></slot>
    `
  }
}

export default SheetBody
