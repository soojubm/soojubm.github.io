import { LitElement, css, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { iconButtonStyles } from '@/components/icon-button/icon-button.styles'
import { ICON_NAMES } from '@/components/icon-button/semantics/icon-names'
import { emit } from '@/utils/emit'
import { copyToClipboard } from '@/utils/clipboard'

/**
 * 텍스트를 클립보드에 복사하는 버튼.
 * 복사 성공 시 일시적으로 체크 아이콘으로 전환됩니다.
 */
@customElement('mm-copy-button')
export class CopyButton extends LitElement {
  static styles = [
    iconButtonStyles,
    css`
      button.plain {
        color: var(--color-foreground-light);
      }
      button.plain:hover {
        color: var(--color-foreground);
        background-color: var(--color-background-subtle);
      }
      button[data-copied] {
        color: var(--color-primary);
      }
    `,
  ]

  @property({ type: String }) value = ''
  @state() private copied = false

  private handleClick = async () => {
    const text = this.value || this.textContent?.trim() || ''
    if (!(await copyToClipboard(text))) return

    this.copied = true
    emit(this, 'copy', { value: text })
    setTimeout(() => (this.copied = false), 1500)
  }

  render() {
    return html`
      <button
        type="button"
        class="plain"
        ?data-copied=${this.copied}
        aria-label=${this.copied ? '복사됨' : '복사'}
        @click=${this.handleClick}
      >
        <mm-icon name=${this.copied ? ICON_NAMES.COPY_SUCCESS : ICON_NAMES.COPY}></mm-icon>
      </button>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-copy-button': CopyButton
  }
}
