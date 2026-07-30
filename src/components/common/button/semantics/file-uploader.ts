import { LitElement, css, html, nothing } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { repeat } from 'lit/directives/repeat.js'

import soojubmImage from '@/images/soojubm.png'
import { emit } from '@/utils'
import '@/components/common/button/semantics/attachment-button'
import '@/components/common/button/semantics/attachment-item'
import '@/components/common/tag/semantics/keyword-tag-group'

async function createSampleFiles(): Promise<File[]> {
  const photoBlob = await fetch(soojubmImage).then(response => response.blob())

  return [
    new File([photoBlob], 'sample-photo.png', { type: photoBlob.type }),
    new File([new Uint8Array(48_000)], 'sample-document.pdf', { type: 'application/pdf' }),
    new File([new Uint8Array(1_200_000)], 'sample-video.mp4', { type: 'video/mp4' }),
  ]
}

@customElement('mm-file-uploader')
export class FileUploader extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
    }

    .attachments {
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
    }

    .attachment-list {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-2);
    }
  `

  @property({ type: String }) label = '파일 업로드'
  @property({ type: String }) helper = ''
  @property({ type: String }) accept = ''
  @property({ type: Boolean }) multiple = false
  @property({ type: Boolean }) capture = false

  @state() private files: File[] = []

  private previewUrls = new Map<File, string>()

  async connectedCallback() {
    super.connectedCallback()
    this.setFiles(await createSampleFiles())
  }

  render() {
    return html`
      <mm-attachment-button
        label=${this.label}
        accept=${this.accept}
        ?multiple=${this.multiple}
        ?capture=${this.capture}
        @files-change=${this.handleFilesChange}
      ></mm-attachment-button>
      <mm-keyword-tag-group
        .keywords=${[this.helper, this.filesStatusText].filter(Boolean)}
      ></mm-keyword-tag-group>
      <div class="attachments">
        <mm-paragraph color="light">첨부한 파일</mm-paragraph>
        ${this.renderAttachments()}
      </div>
    `
  }

  private get hasFiles() {
    return this.files.length > 0
  }

  private get filesStatusText() {
    if (!this.hasFiles) return 'No files currently selected for upload.'

    return `${this.files.length} file${this.files.length > 1 ? 's' : ''} selected.`
  }

  private renderAttachments() {
    if (!this.hasFiles) return nothing

    return html`
      <div class="attachment-list">
        ${repeat(
          this.files,
          file => file,
          (file, index) => html`
            <mm-attachment-item
              file-name=${file.name}
              file-size=${this.formatFileSize(file.size)}
              preview-url=${ifDefined(this.previewUrls.get(file))}
              type=${file.type}
              @remove=${() => this.handleRemoveClick(index)}
            ></mm-attachment-item>
          `,
        )}
      </div>
    `
  }

  disconnectedCallback() {
    this.revokePreviewUrls()
    super.disconnectedCallback()
  }

  private handleFilesChange(event: CustomEvent<{ files: File[] }>) {
    this.commitFiles(event.detail.files)
  }

  private handleRemoveClick(index: number) {
    this.commitFiles(this.files.filter((_, fileIndex) => fileIndex !== index))
  }

  private commitFiles(files: File[]) {
    this.setFiles(files)

    emit(this, 'files-change', { files: this.files })
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

declare global {
  interface HTMLElementTagNameMap {
    'mm-file-uploader': FileUploader
  }
}
