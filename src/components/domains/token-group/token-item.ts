import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { resetStyles } from '../../shared/reset.styles'

@customElement('mm-token-item')
export class TokenItem extends LitElement {
  /** 토큰 이름 / 값 텍스트 */
  @property({ type: String }) label = ''
  /** figure 미리보기의 인라인 style 값 */
  @property({ type: String, attribute: 'preview-style' }) previewStyle = ''

  static styles = [
    resetStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        gap: var(--space-2);
        padding: var(--space-3);
        border: var(--border);
        border-radius: var(--radius);
        background: var(--color-background);
        box-sizing: border-box;
      }

      @media (max-width: 800px) {
        :host {
          margin: var(--space-3) 0;
        }
      }

      figure {
        margin: 0;
        width: var(--size-large);
        height: var(--size-large);
        background: var(--color-background-strong);
        border-radius: var(--radius);
        flex-shrink: 0;
      }

      .label {
        display: block;
        font-weight: var(--font-weight-bold);
        font-size: var(--font-size-12);
        word-break: break-all;
      }
    `,
  ]

  render() {
    return html`
      ${this.previewStyle
        ? html`<figure style=${this.previewStyle}></figure>`
        : nothing}
      ${this.label ? html`<span class="label">${this.label}</span>` : nothing}
      <slot></slot>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-token-item': TokenItem
  }
}
