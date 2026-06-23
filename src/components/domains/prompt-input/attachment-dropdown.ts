import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import '../../dropdown/dropdown'
import '../../icon-button/icon-button'
import { ICON_NAMES } from '../../icon-button/semantics/icon-names'

@customElement('mm-attachment-dropdown')
export class AttachmentDropdown extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
    }
  `

  render() {
    return html`
      <mm-dropdown inline placement="top-left" list-min-width="160px">
        <mm-icon-button
          slot="trigger"
          icon=${ICON_NAMES.ADD}
          aria-label="이미지 첨부"
        ></mm-icon-button>
        <option value="upload" icon="import">이미지 업로드</option>
        <option value="camera" icon="camera">카메라 촬영</option>
        <option value="url" icon="link">URL로 추가</option>
      </mm-dropdown>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-attachment-dropdown': AttachmentDropdown
  }
}
