import { css, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import IconButton from '../icon-button'
import { ICON_NAMES } from './icon-names'

/**
 * 텍스트를 클립보드에 복사하는 버튼.
 * 복사 성공 시 일시적으로 체크 아이콘으로 전환됩니다.
 */
@customElement('mm-copy-button')
export class CopyButton extends IconButton {
  /** 복사할 텍스트 */
  @property({ type: String }) value = ''

  @state() private copied = false

  static override styles = [
    ...IconButton.styles,
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

  constructor() {
    super()
    this.variant = 'plain'
    this.ariaLabel = '복사'
  }

  private _handleClick = async () => {
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

  protected override renderControl() {
    return html`
      <button
        slot="trigger"
        type="button"
        class="icon-button"
        data-variant="plain"
        ?data-copied=${this.copied}
        aria-label=${this.copied ? '복사됨' : this.ariaLabel}
        @click=${this._handleClick}
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
