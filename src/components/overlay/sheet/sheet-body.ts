import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'

import { sheetBodyStyles } from '@/components/overlay/overlay.styles'
import '@/components/common'

@customElement('fff-sheet-body')
export class SheetBody extends LitElement {
  static styles = sheetBodyStyles

  render() {
    return html`
      <fff-scroll direction="column">
        <slot></slot>
      </fff-scroll>
    `
  }
}
