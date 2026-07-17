import { LitElement, css, html, nothing } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { repeat } from 'lit/directives/repeat.js'

import { emit } from '@/utils/emit'
import '@/components/flex/flex'
import '@/components/button/semantics/attachment-button'
import '@/components/button/semantics/attachment-item'
import '@/components/tag/semantics/keyword-tag-group'
import soojubmImage from '@/images/soojubm.png'

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
      gap: var(--space-4);
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
      <mm-flex direction="column" gap="2">
        <mm-attachment-button
          label=${this.label}
          accept=${this.accept}
          ?multiple=${this.multiple}
          ?capture=${this.capture}
          @files-change=${this.handleFilesChange}
        ></mm-attachment-button>
        <mm-keyword-tag-group .keywords=${this.statusKeywords}></mm-keyword-tag-group>
      </mm-flex>

      <mm-flex direction="column" gap="2">
        <mm-paragraph color="light">첨부한 파일</mm-paragraph>

        ${this.renderAttachments()}
      </mm-flex>
    `
  }

  private get statusKeywords() {
    const keywords: string[] = []
    if (this.helper) keywords.push(this.helper)
    keywords.push(this.filesStatusText)

    return keywords
  }

  private get filesStatusText() {
    return this.files.length
      ? `${this.files.length} file${this.files.length > 1 ? 's' : ''} selected.`
      : 'No files currently selected for upload.'
  }

  private renderAttachments() {
    if (!this.files.length) return nothing

    return html`
      <mm-flex gap="2" wrap="wrap">
        ${repeat(
          this.files,
          file => file,
          (file, index) => this.renderAttachment(file, index),
        )}
      </mm-flex>
    `
  }

  private renderAttachment(file: File, index: number) {
    const previewUrl = this.previewUrls.get(file)

    return html`
      <mm-attachment-item
        file-name=${file.name}
        file-size=${this.formatFileSize(file.size)}
        preview-url=${ifDefined(previewUrl)}
        type=${file.type}
        @remove=${() => this.removeFile(index)}
      ></mm-attachment-item>
    `
  }

  disconnectedCallback() {
    this.revokePreviewUrls()
    super.disconnectedCallback()
  }

  private handleFilesChange(event: CustomEvent<{ files: File[] }>) {
    this.setFiles(event.detail.files)

    emit(this, 'files-change', { files: this.files })
  }

  private removeFile(index: number) {
    this.setFiles(this.files.filter((_, fileIndex) => fileIndex !== index))

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
