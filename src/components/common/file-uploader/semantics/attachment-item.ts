import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import { ICON_NAMES } from '@/components/common/icon/icon-names'
import { emit } from '@/utils'
import '@/components/common/avatar/avatar'
import '@/components/common/icon-button/icon-button'
import '@/components/common/icon-button/semantics/clear-button'
import '@/components/common/text/semantics/caption'
import '@/components/common/text/text'

@customElement('fff-attachment-item')
export class AttachmentItem extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      width: var(--size-80);
      gap: var(--space-1);
      position: relative;
    }

    .preview {
      position: relative;
    }

    progress {
      width: calc(100% - var(--space-2) * 2);
      height: var(--space-1);
      border: 0;
      border-radius: var(--border-radius);
      background-color: var(--background-subtle-color);
      overflow: hidden;
      appearance: none;
      position: absolute;
      bottom: var(--space-2);
      left: var(--space-2);
    }

    progress::-webkit-progress-bar {
      background-color: var(--background-subtle-color);
    }

    progress::-webkit-progress-value {
      background-color: var(--primary-color);
    }

    progress::-moz-progress-bar {
      background-color: var(--primary-color);
    }

    .preview fff-icon-button {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    fff-clear-button {
      position: absolute;
      right: var(--space-1-minus);
      top: var(--space-1-minus);
    }
  `
  @property({ type: String, attribute: 'file-name' }) fileName = ''
  @property({ type: String, attribute: 'file-size' }) fileSize = ''
  @property({ type: String, attribute: 'preview-url' }) previewUrl?: string
  @property({ type: String }) type = ''
  /** 0–100 업로드 진행률. 값이 있는 동안 업로드 중으로 표시하고, 완료되면 비운다. */
  @property({ type: Number }) progress?: number
  /** 업로드 실패 사유. 값이 있으면 진행률보다 우선해 실패로 표시하고 재업로드 액션을 연다. */
  @property({ type: String }) error?: string

  render() {
    return html`
      <div class="preview">
        <fff-avatar
          shape="square"
          size="80"
          src=${ifDefined(this.previewUrl)}
          icon=${this.fallbackIconName}
        ></fff-avatar>
        ${this.renderProgress()} ${this.renderRetryButton()}
      </div>
      <fff-caption>${this.fileName}</fff-caption>
      ${this.renderStatus()}
      <fff-clear-button
        aria-label=${this.isUploading ? '업로드 취소' : '삭제'}
        @click=${this.handleRemoveClick}
      ></fff-clear-button>
    `
  }

  private renderProgress() {
    if (!this.isUploading) return nothing

    return html`
      <progress
        value=${this.progress ?? 0}
        max="100"
        aria-label=${`${this.fileName} 업로드 진행률`}
      ></progress>
    `
  }

  private renderRetryButton() {
    if (!this.error) return nothing

    return html`
      <fff-icon-button
        size="small"
        icon=${ICON_NAMES.RETRY}
        aria-label=${`${this.fileName} 다시 업로드`}
        @click=${this.handleRetryClick}
      ></fff-icon-button>
    `
  }

  private renderStatus() {
    if (this.error) {
      return html`
        <fff-text as="span" size="12" weight="medium" color="danger" role="alert">
          ${this.error}
        </fff-text>
      `
    }

    if (this.isUploading) {
      return html`
        <fff-caption>업로드 중 ${this.progress}%</fff-caption>
      `
    }

    return html`
      <fff-caption>${this.fileSize}</fff-caption>
    `
  }

  private get isUploading() {
    return this.progress !== undefined && !this.error
  }

  private get fallbackIconName() {
    return this.type.startsWith('video/') ? ICON_NAMES.VIDEO : ICON_NAMES.DOCUMENT
  }

  private handleRemoveClick() {
    emit(this, 'remove')
  }

  private handleRetryClick() {
    emit(this, 'retry')
  }
}
