import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import '../../dropdown/dropdown'
import '../../icon-button/icon-button'

@customElement('mm-attachment-dropdown')
export class AttachmentDropdown extends LitElement {
  static styles = css`
    :host {
      display: contents;
    }

    mm-dropdown::part(dropdown) {
      width: auto;
    }

    mm-dropdown::part(list) {
      top: auto;
      bottom: calc(100% + 4px);
      left: 0;
      right: auto;
      min-width: 160px;
      transform-origin: bottom center;
    }
  `

  render() {
    return html`
      <mm-dropdown>
        <mm-icon-button
          slot="trigger"
          icon="media-image-plus"
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
