import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { toggleSelection } from '@/components/button/button.utils'
import '@/components/icon-button/icon-button'
import { ICON_NAMES } from '@/components/icon-button/semantics/icon-names'
import { resetStyles } from '@/stylesheets/shared/reset.styles'

/**
 * 북마크/즐겨찾기 토글 버튼.
 * 아이콘 전용이며 선택 시 채워진 아이콘으로 전환됩니다.
 */
@customElement('mm-bookmark-button')
export class BookmarkButton extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: inline-flex;
      }

      mm-icon-button {
        --icon-button-text-color: var(--color-foreground-light);
      }

      :host([selected]) mm-icon-button {
        --icon-button-text-color: var(--selection-foreground);
      }
    `,
  ]

  @property({ type: Boolean, reflect: true }) selected = false
  @property({ type: String }) value = ''
  @property({ type: Boolean }) disabled = false
  @property({ type: String }) shape: 'star' | 'bookmark' | 'heart' = 'star'

  render() {
    return html`
      <mm-icon-button
        variant="ghost"
        icon=${this.iconName}
        aria-pressed=${String(this.selected)}
        aria-label=${this.actionLabel}
        ?disabled=${this.disabled}
        @click=${this.handleClick}
      ></mm-icon-button>
    `
  }

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
    toggleSelection(this)
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-bookmark-button': BookmarkButton
  }
}
