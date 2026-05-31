import { css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ToggleButton } from './toggle-button'

/**
 * 북마크/즐겨찾기 토글 버튼. ToggleButton을 확장합니다.
 * 아이콘 전용이며 선택 시 채워진 별(또는 북마크)로 전환됩니다.
 */
@customElement('mm-bookmark-button')
export class BookmarkButton extends ToggleButton {
  /** star | bookmark | heart */
  @property({ type: String }) shape: 'star' | 'bookmark' | 'heart' = 'star'

  static override styles = [
    ...ToggleButton.styles,
    css`
      .toggle {
        padding: 0;
        width: var(--size-medium);
        justify-content: center;
        border: none;
        background: transparent;
        color: var(--color-foreground-light);
      }
      .toggle:hover {
        background: var(--color-background-subtle);
      }
      :host([selected]) .toggle {
        background: transparent;
        border: none;
        color: var(--color-accent);
      }
    `,
  ]

  private get iconName() {
    const filled = {
      star: 'star-solid',
      bookmark: 'bookmark-solid',
      heart: 'heart-solid',
    }
    const outline = {
      star: 'star',
      bookmark: 'bookmark',
      heart: 'heart',
    }
    return this.selected ? filled[this.shape] : outline[this.shape]
  }

  private get actionLabel() {
    const labels = { star: '즐겨찾기', bookmark: '북마크', heart: '좋아요' }
    return labels[this.shape]
  }

  override render() {
    return html`
      <button
        type="button"
        class="toggle"
        role="button"
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
