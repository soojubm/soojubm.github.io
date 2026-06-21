import { LitElement, css, html, nothing } from 'lit'
import { customElement, property, query, state } from 'lit/decorators.js'

@customElement('mm-file-upload-button')
export class FileUploadButton extends LitElement {
  @property({ type: String }) label = '파일 업로드'
  @property({ type: String }) helper = ''
  @property({ type: String }) accept = ''
  @property({ type: Boolean }) multiple = false
  @property({ type: Boolean }) capture = false

  @state() private files: File[] = []
  @query('input') private input!: HTMLInputElement

  static styles = css`
    :host {
      display: block;
    }

    .field {
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
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

  private handleChange(event: Event) {
    const input = event.target as HTMLInputElement
    this.files = Array.from(input.files ?? [])

    this.dispatchEvent(
      new CustomEvent('files-change', {
        detail: { files: this.files },
        bubbles: true,
        composed: true,
      }),
    )
  }

  private openFilePicker() {
    this.input.click()
  }

  private removeFile(index: number) {
    this.files = this.files.filter((_, fileIndex) => fileIndex !== index)

    this.dispatchEvent(
      new CustomEvent('files-change', {
        detail: { files: this.files },
        bubbles: true,
        composed: true,
      }),
    )
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
                ${this.files.map(
                  (file, index) => html`
                    <figure class="attachment">
                      ${file.type.startsWith('image/')
                        ? html`
                            <img src=${URL.createObjectURL(file)} alt=${file.name} />
                          `
                        : ''}
                      <figcaption>
                        <mm-paragraph weight="bold">${file.name}</mm-paragraph>
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
