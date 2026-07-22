import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import { emit } from '@/utils/emit'
import { ICON_NAMES } from '@/components/icon-button/semantics/icon-names'
import '@/components/avatar/avatar'
import '@/components/button/semantics/clear-button'

@customElement('mm-attachment-item')
export class AttachmentItem extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      width: var(--size-80);
      gap: var(--space-1);
      position: relative;
    }

    mm-clear-button {
      position: absolute;
      right: var(--space-1-minus);
      top: var(--space-1-minus);
    }
  `

  @property({ type: String, attribute: 'file-name' }) fileName = ''
  @property({ type: String, attribute: 'file-size' }) fileSize = ''
  @property({ type: String, attribute: 'preview-url' }) previewUrl?: string
  @property({ type: String }) type = ''

  render() {
    return html`
      <mm-avatar
        shape="square"
        size="80"
        src=${ifDefined(this.previewUrl)}
        icon=${this.fallbackIconName}
      ></mm-avatar>
      <mm-caption>${this.fileName}</mm-caption>
      <mm-caption>${this.fileSize}</mm-caption>
      <mm-clear-button aria-label="삭제" @click=${this.handleRemove}></mm-clear-button>
    `
  }

  private get fallbackIconName() {
    return this.type.startsWith('video/') ? ICON_NAMES.VIDEO : ICON_NAMES.DOCUMENT
  }

  private handleRemove() {
    emit(this, 'remove')
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-attachment-item': AttachmentItem
  }
}
