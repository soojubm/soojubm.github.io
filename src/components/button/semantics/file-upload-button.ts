import { LitElement, css, html, nothing } from 'lit'
import { customElement, property, query, state } from 'lit/decorators.js'
import { repeat } from 'lit/directives/repeat.js'
import { emit } from '@/utils/emit'

@customElement('mm-file-upload-button')
export class FileUploadButton extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .field {
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
    }

    figure {
      margin: 0;
    }
    input {
      position: absolute;
      width: 1px;
      height: 1px;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
    }

    .attachments {
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
      margin-top: var(--space-4);
    }

    .attachment-list {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-2);
    }

    .attachment {
      width: 100px;
      padding: var(--space-3);
      border-radius: var(--radius);
      background-color: var(--color-background-subtle);
      position: relative;
      box-sizing: border-box;
    }

    .attachment img {
      display: block;
      width: 100%;
      border-radius: var(--radius);
      aspect-ratio: 1 / 1;
      object-fit: cover;
    }

    .remove {
      position: absolute;
      right: var(--space-1);
      top: var(--space-1);
    }
  `

  @property({ type: String }) label = '파일 업로드'
  @property({ type: String }) helper = ''
  @property({ type: String }) accept = ''
  @property({ type: Boolean }) multiple = false
  @property({ type: Boolean }) capture = false

  @state() private files: File[] = []
  @query('input') private input!: HTMLInputElement

  private previewUrls = new Map<File, string>()

  disconnectedCallback() {
    this.revokePreviewUrls()
    super.disconnectedCallback()
  }

  private handleChange(event: Event) {
    const input = event.target as HTMLInputElement
    this.setFiles(Array.from(input.files ?? []))

    emit(this, 'files-change', { files: this.files })
  }

  private openFilePicker() {
    this.input.click()
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
      if (file.type.startsWith('image/') && !this.previewUrls.has(file)) {
        this.previewUrls.set(file, URL.createObjectURL(file))
      }
    }

    this.files = files
  }

  private revokePreviewUrls() {
    for (const previewUrl of this.previewUrls.values()) {
      URL.revokeObjectURL(previewUrl)
    }

    this.previewUrls.clear()
  }

  private formatFileSize(size: number) {
    if (size < 1024) return `${size} bytes`
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`
    return `${(size / 1024 / 1024).toFixed(1)} MB`
  }

  render() {
    return html`
      <div class="field">
        <mm-button @click=${this.openFilePicker}>${this.label}</mm-button>
        <input
          type="file"
          accept=${this.accept || nothing}
          ?multiple=${this.multiple}
          capture=${this.capture ? 'camera' : nothing}
          @change=${this.handleChange}
        />
        ${this.helper
          ? html`
              <mm-text size="12">${this.helper}</mm-text>
            `
          : ''}
      </div>

      <div class="attachments">
        <mm-paragraph color="light">첨부한 파일</mm-paragraph>
        <mm-paragraph role="status">
          ${this.files.length
            ? `${this.files.length} file${this.files.length > 1 ? 's' : ''} selected.`
            : 'No files currently selected for upload.'}
        </mm-paragraph>

        ${this.files.length
          ? html`
              <div class="attachment-list">
                ${repeat(
                  this.files,
                  file => file,
                  (file, index) => html`
                    <figure class="attachment">
                      ${this.previewUrls.has(file)
                        ? html`
                            <img src=${this.previewUrls.get(file)} alt=${file.name} />
                          `
                        : ''}
                      <figcaption>
                        <mm-paragraph>${file.name}</mm-paragraph>
                        <mm-text size="12">${this.formatFileSize(file.size)}</mm-text>
                      </figcaption>
                      <div class="remove">
                        <mm-clear-button @click=${() => this.removeFile(index)}>
                          삭제
                        </mm-clear-button>
                      </div>
                    </figure>
                  `,
                )}
              </div>
            `
          : ''}
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-file-upload-button': FileUploadButton
  }
}
