import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { resetStyles } from '../../../stylesheets/shared/reset.styles'

@customElement('mm-avatar-group')
export class AvatarGroup extends LitElement {
  /** 아바타 이미지 URL 배열. 빈 문자열이면 기본 아바타로 표시 */
  @property({
    type: Array,
    converter: value => {
      if (!value) return []
      try {
        return JSON.parse(value)
      } catch {
        return []
      }
    },
  })
  avatars: string[] = []

  @property({ type: String }) label = ''
  @property({ type: String }) size = 'small'

  /** 노출할 최대 아바타 수 (나머지는 +N으로 묶음) */
  private readonly maxVisible = 3

  static styles = [
    resetStyles,
    css`
      :host {
        display: flex;
        align-items: center;
        gap: var(--space-2);
      }

      .avatars {
        display: flex;
      }

      .avatars mm-avatar,
      .avatars .overflow {
        margin-left: -6px;
      }

      .avatars mm-avatar:first-child,
      .avatars .overflow:first-child {
        margin-left: 0;
      }

      .label {
        font-size: var(--font-size-14);
        line-height: var(--size-small);
        color: var(--color-foreground);
      }
    `,
  ]

  render() {
    const visible = this.avatars.slice(0, this.maxVisible)
    const overflowCount = this.avatars.length - this.maxVisible

    return html`
      <div class="avatars">
        ${visible.map(
          src => html` <mm-avatar size=${this.size} .src=${src || undefined}></mm-avatar> `,
        )}
        ${overflowCount > 0
          ? html`<mm-avatar size=${this.size}
              ><mm-text size="12">+${overflowCount}</mm-text></mm-avatar
            >`
          : nothing}
      </div>
      ${this.label ? html`<span class="label">${this.label}</span>` : nothing}
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-avatar-group': AvatarGroup
  }
}
