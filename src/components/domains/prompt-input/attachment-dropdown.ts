import { css, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import Dropdown, { type DropdownOption } from '../../dropdown/dropdown'
import '../../icon-button/icon-button'

@customElement('mm-attachment-dropdown')
export class AttachmentDropdown extends Dropdown {
  protected get defaultOptions(): DropdownOption[] {
    return [
      { label: '이미지 업로드', value: 'upload',  type: 'default', checked: false, selected: false, icon: 'import' },
      { label: '카메라 촬영',   value: 'camera',  type: 'default', checked: false, selected: false, icon: 'camera' },
      { label: 'URL로 추가',    value: 'url',     type: 'default', checked: false, selected: false, icon: 'link' },
    ]
  }

  static styles = [
    ...Dropdown.styles,
    css`
      .dropdown {
        width: auto;
      }

      /* 위로 열리는 리스트 */
      .dropdown-list {
        top: auto;
        bottom: calc(100% + 4px);
        left: 0;
        right: auto;
        min-width: 160px;
        transform-origin: bottom center;
        transform: translateY(4px) scale(0.98);
      }

      .dropdown-list.open {
        transform: translateY(0) scale(1);
      }
    `,
  ]

  protected renderTrigger() {
    return html`
      <mm-icon-button
        icon="media-image-plus"
        aria-label="이미지 첨부"
        aria-haspopup="true"
        aria-expanded="${this.isOpen}"
        @click="${this.toggleOpen}"
      ></mm-icon-button>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-attachment-dropdown': AttachmentDropdown
  }
}
