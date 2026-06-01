import { LitElement, css, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { iconButtonStyles } from '../../button/icon-button.styles'

/**
 * 텍스트를 클립보드에 복사하는 버튼.
 * 복사 성공 시 일시적으로 체크 아이콘으로 전환됩니다.
 */
@customElement('mm-copy-button')
export class CopyButton extends LitElement {
  /** 복사할 텍스트 */
  @property({ type: String }) value = ''
  @property({ type: String, attribute: 'aria-label' })
  override ariaLabel = '복사'

  @state() private copied = false

  static styles = [
    iconButtonStyles,
    css`
      .icon-button[data-variant='plain'] {
        color: var(--color-foreground-light);
      }
      .icon-button[data-variant='plain']:hover {
        color: var(--color-foreground);
        background-color: var(--color-background-subtle);
      }
      .icon-button[data-copied] {
        color: var(--color-primary);
      }
    `,
  ]

  private async handleClick() {
    const text = this.value || this.textContent?.trim() || ''
    try {
      await navigator.clipboard.writeText(text)
      this.copied = true
      this.dispatchEvent(
        new CustomEvent('copy', { detail: { value: text }, bubbles: true, composed: true }),
      )
      setTimeout(() => (this.copied = false), 1500)
    } catch {
      // 클립보드 접근 실패 시 무시
    }
  }

  render() {
    return html`
      <button
        type="button"
        class="icon-button"
        data-variant="plain"
        ?data-copied=${this.copied}
        aria-label=${this.copied ? '복사됨' : this.ariaLabel}
        @click=${this.handleClick}
      >
        <mm-icon name=${this.copied ? 'check' : 'copy'}></mm-icon>
      </button>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-copy-button': CopyButton
  }
}
