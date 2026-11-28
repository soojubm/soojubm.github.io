import { LitElement, css, html, nothing } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { repeat } from 'lit/directives/repeat.js'

import { emit } from '@/utils'
import '@/components/common/file-uploader/semantics/attachment-button'
import '@/components/common/file-uploader/semantics/attachment-item'
import '@/components/common/file-uploader/semantics/attachment-item-list'
import '@/components/common/tag/semantics/keyword-tag-group'

@customElement('fff-file-uploader')
export class FileUploader extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
    }
  `
  @property({ type: String }) label = '파일 업로드'
  @property({ type: String, attribute: 'max-size' }) maxSize = ''
  @property({ type: String }) accept = ''
  @property({ type: Boolean }) multiple = false
  @property({ type: Boolean }) capture = false
  @state() private files: File[] = []
  private previewUrls = new Map<File, string>()

  render() {
    return html`
      <fff-attachment-button
        label=${this.label}
        accept=${this.accept}
        ?multiple=${this.multiple}
        ?capture=${this.capture}
        @change=${this.handleFilesChange}
      ></fff-attachment-button>
      <fff-keyword-tag-group .keywords=${this.keywords}></fff-keyword-tag-group>
      ${this.renderAttachmentList()}
    `
  }

  private get keywords() {
    return [this.acceptText, this.maxSizeText, this.filesStatusText].filter(Boolean)
  }

  private get acceptText() {
    const extensions = this.accept
      .split(',')
      .map(extension => extension.trim())
      .filter(Boolean)
    if (!extensions.length) return ''

    const last = extensions.pop()
    const list = extensions.length ? `${extensions.join(', ')} and ${last}` : last

    return `Only ${list} files.`
  }

  private get maxSizeText() {
    return this.maxSize ? `${this.maxSize} max file size.` : ''
  }

  private get hasFiles() {
    return this.files.length > 0
  }

  private get filesStatusText() {
    if (!this.hasFiles) return 'No files currently selected for upload.'

    return `${this.files.length} file${this.files.length > 1 ? 's' : ''} selected.`
  }

  private renderAttachmentList() {
    if (!this.hasFiles) return nothing

    return html`
      <fff-attachment-item-list heading="첨부한 파일">
        ${repeat(
          this.files,
          file => file,
          (file, index) => html`
            <fff-attachment-item
              file-name=${file.name}
              file-size=${this.formatFileSize(file.size)}
              preview-url=${ifDefined(this.previewUrls.get(file))}
              type=${file.type}
              @remove=${() => this.handleRemoveClick(index)}
            ></fff-attachment-item>
          `,
        )}
      </fff-attachment-item-list>
    `
  }

  disconnectedCallback() {
    this.revokePreviewUrls()
    super.disconnectedCallback()
  }

  private handleFilesChange(event: CustomEvent<{ files: File[] }>) {
    // 첨부 버튼 단위 이벤트는 여기서 끊고 uploader 단위 change로 승격한다.
    event.stopPropagation()

    this.commitFiles(event.detail.files)
  }

  private handleRemoveClick(index: number) {
    this.commitFiles(this.files.filter((_, fileIndex) => fileIndex !== index))
  }

  private commitFiles(files: File[]) {
    this.setFiles(files)

    emit(this, 'change', { files: this.files })
  }

  private setFiles(files: File[]) {
    const nextFiles = new Set(files)

    for (const [file, previewUrl] of this.previewUrls) {
      if (!nextFiles.has(file)) {
        URL.revokeObjectURL(previewUrl)
        this.previewUrls.delete(file)
      }
    }

    for (const file of files) {
      if (!file.type.startsWith('image/') || this.previewUrls.has(file)) continue

      this.previewUrls.set(file, URL.createObjectURL(file))
    }

    this.files = files
  }

  private revokePreviewUrls() {
    for (const previewUrl of this.previewUrls.values()) URL.revokeObjectURL(previewUrl)

    this.previewUrls.clear()
  }

  private formatFileSize(size: number) {
    if (size < 1024) return `${size} bytes`
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`
    return `${(size / 1024 / 1024).toFixed(1)} MB`
  }
}
