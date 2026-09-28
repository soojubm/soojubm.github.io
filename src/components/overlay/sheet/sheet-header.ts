import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { Sheet } from '@/components/overlay/sheet/sheet'

import { sheetHeaderStyles } from '@/components/overlay/overlay.styles'
import '@/components/common'

@customElement('mm-sheet-header')
export class SheetHeader extends LitElement {
  static styles = sheetHeaderStyles
  @property({ type: String }) heading = ''

  render() {
    return html`
      <mm-heading level="3">${this.heading}</mm-heading>
      <mm-close-button @close=${this.handleClose}></mm-close-button>
    `
  }

  // 헤더는 늘 시트의 직계 자식으로 쓰이므로, 요청 이벤트를 따로 두지 않고 담은 시트를 직접 닫는다.
  private handleClose = () => {
    this.closest<Sheet>('mm-sheet')?.close()
  }
}
