import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/overlay/backdrop/backdrop'
import '@/components/overlay/sheet/sheet-body'
import '@/components/overlay/sheet/sheet-footer'
import '@/components/common'
import type { ActionConfig } from '@/types'

import { sheetPositionStyles, overlaySurfaceStyles } from '@/components/overlay/overlay.styles'
import { SheetController } from '@/controllers/sheet-controller'
import { emit } from '@/utils'

@customElement('mm-dialog')
export class Dialog extends LitElement {
  static styles = [
    overlaySurfaceStyles,
    sheetPositionStyles,
    css`
      :host {
        --overlay-panel-min-width: var(--layout-width-narrow);
        --overlay-panel-max-width: var(--layout-width-narrow);
      }
    `,
  ]
  @property({ type: String, reflect: true }) role = 'alertdialog'
  @property({ type: String, attribute: 'aria-modal', reflect: true }) ariaModal = 'true'
  @property({ type: Boolean, reflect: true }) open = false
  @property({ type: String }) heading = ''
  @property({ type: String }) description = ''
  @property({ attribute: false }) primaryAction?: ActionConfig
  @property({ attribute: false }) secondaryAction?: ActionConfig
  private sheet = new SheetController(this, {
    isOpen: () => this.open,
    setOpen: open => {
      this.open = open
    },
    // 확인이 필요한 작업에 쓰므로 의도가 불분명한 배경 클릭으로는 닫지 않는다.
    // ESC는 키보드 사용자의 탈출 수단으로 남기되, 어느 액션도 실행하지 않고 닫기만 한다.
    // 보조 액션이 파괴적인 쪽(예: 나가기)일 수 있어 취소로 간주하지 않기 때문이다.
    dismissOn: ['escape'],
    onDismiss: () => this.handleDismiss(),
  })

  render() {
    return html`
      <mm-backdrop></mm-backdrop>
      <div class="panel" ?open=${this.open}>
        <mm-sheet-body>
          <mm-status-message
            heading=${this.heading}
            message=${this.description}
          ></mm-status-message>
          <slot></slot>
        </mm-sheet-body>
        <mm-sheet-footer
          .primaryAction=${this.primaryAction}
          .secondaryAction=${this.secondaryAction}
        ></mm-sheet-footer>
      </div>
    `
  }

  show() {
    this.open = true
  }

  close() {
    this.open = false
  }

  private handleDismiss() {
    this.close()
    emit(this, 'dialog-close')
  }
}
