import { LitElement, css, html } from 'lit'
import { customElement, state } from 'lit/decorators.js'

import { ICON_NAMES } from '@/components/common'
import { TransientFlagController } from '@/controllers/transient-flag-controller'
import { emit } from '@/utils'
import { copyToClipboard } from '@/utils/clipboard'
import { serializeToMarkdown } from '@/utils/markdown'

/** AI에 붙여넣을 수 있도록 현재 문서 본문을 마크다운으로 복사한다. 페이지 이동 링크와 자기 자신은 제외한다. */
const isPageChrome = (element: Element) =>
  element.tagName === 'MM-COMPONENT-PAGER' || element.tagName === 'MM-COPY-PAGE-BUTTON'

@customElement('mm-copy-page-button')
export class CopyPageButton extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
      flex-shrink: 0;
    }
  `
  @state() private copied = false
  private copiedFlag = new TransientFlagController(this, {
    duration: 1500,
    onChange: copied => (this.copied = copied),
  })

  render() {
    return html`
      <mm-button
        icon=${this.copied ? ICON_NAMES.COPY_SUCCESS : ICON_NAMES.COPY}
        @click=${this.handleCopyClick}
      >
        ${this.copied ? '복사됨' : '페이지 복사'}
      </mm-button>
    `
  }

  private handleCopyClick = async () => {
    const main = document.querySelector('mm-main')
    if (!main) return

    const markdown = `${serializeToMarkdown(main, isPageChrome)}\n\nSource: ${location.href}\n`
    if (!(await copyToClipboard(markdown))) return

    emit(this, 'copy', { value: markdown })
    this.copiedFlag.trigger()
  }
}
