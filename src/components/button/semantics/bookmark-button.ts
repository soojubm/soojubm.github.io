import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { resetStyles } from '../../../stylesheets/shared/reset.styles'
import { ICON_NAMES } from '../../icon-button/semantics/icon-names'

/**
 * 북마크/즐겨찾기 토글 버튼.
 * 아이콘 전용이며 선택 시 채워진 아이콘으로 전환됩니다.
 */
@customElement('mm-bookmark-button')
export class BookmarkButton extends LitElement {
  @property({ type: Boolean, reflect: true }) selected = false
  @property({ type: String }) value = ''
  @property({ type: Boolean, reflect: true }) disabled = false
  /** star | bookmark | heart */
  @property({ type: String }) shape: 'star' | 'bookmark' | 'heart' = 'star'

  static styles = [
    resetStyles,
    css`
      :host {
        display: inline-flex;
      }

      .toggle {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        width: var(--size-medium);
        border: none;
        background: transparent;
        color: var(--color-foreground-light);
        cursor: pointer;

        &:hover {
          background: var(--color-background-subtle);
        }

        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      }

      :host([selected]) .toggle {
        background: transparent;
        color: var(--color-accent);
      }
    `,
  ]

  private get iconName() {
    const filled = {
      star: ICON_NAMES.FAVORITE_SELECTED,
      bookmark: ICON_NAMES.BOOKMARK_SELECTED,
      heart: ICON_NAMES.LIKE_SELECTED,
    }
    const outline = {
      star: ICON_NAMES.FAVORITE,
      bookmark: ICON_NAMES.BOOKMARK,
      heart: ICON_NAMES.LIKE,
    }
    return this.selected ? filled[this.shape] : outline[this.shape]
  }

  private get actionLabel() {
    const labels = { star: '즐겨찾기', bookmark: '북마크', heart: '좋아요' }
    return labels[this.shape]
  }

  private handleClick() {
    if (this.disabled) return
    this.selected = !this.selected
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { selected: this.selected, value: this.value },
        bubbles: true,
        composed: true,
      }),
    )
  }

  render() {
    return html`
      <button
        type="button"
        class="toggle"
        aria-pressed=${this.selected ? 'true' : 'false'}
        aria-label=${this.actionLabel}
        ?disabled=${this.disabled}
        @click=${this.handleClick}
      >
        <mm-icon name=${this.iconName}></mm-icon>
      </button>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-bookmark-button': BookmarkButton
  }
}
