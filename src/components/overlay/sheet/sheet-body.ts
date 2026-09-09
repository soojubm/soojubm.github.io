import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'

import { sheetBodyStyles } from '@/components/overlay/overlay.styles'
import '@/components/common/scroll/scroll'

@customElement('mm-sheet-body')
export class SheetBody extends LitElement {
  static styles = sheetBodyStyles

  render() {
    return html`
      <mm-scroll direction="column">
        <slot></slot>
      </mm-scroll>
    `
  }
}
