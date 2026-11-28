import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { Sheet } from '@/components/overlay/sheet/sheet'

import { sheetHeaderStyles } from '@/components/overlay/overlay.styles'
import '@/components/common'

@customElement('fff-sheet-header')
export class SheetHeader extends LitElement {
  static styles = sheetHeaderStyles
  @property({ type: String }) heading = ''

  render() {
    return html`
      <fff-heading level="3">${this.heading}</fff-heading>
      <fff-close-button @close=${this.handleClose}></fff-close-button>
    `
  }

  // 헤더는 늘 시트의 직계 자식으로 쓰이므로, 요청 이벤트를 따로 두지 않고 담은 시트를 직접 닫는다.
  private handleClose = () => {
    this.closest<Sheet>('fff-sheet')?.close()
  }
}
