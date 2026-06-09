import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { resetStyles } from '../../../stylesheets/shared/reset.styles'

@customElement('mm-token-item')
export class TokenItem extends LitElement {
  /** 토큰 이름 */
  @property({ type: String }) key = ''
  /** 토큰 값 */
  @property({ type: String }) value = ''
  /** dot 색상 (CSS color 값) */
  @property({ type: String }) color = ''
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

      figure {
        margin: 0;
        width: var(--size-large);
        height: var(--size-large);
        background: var(--color-background-strong);
        border-radius: var(--radius);
        flex-shrink: 0;
      }

      .dot {
        flex-shrink: 0;
        width: var(--size-small);
        height: var(--size-small);
        border-radius: var(--radius);
      }

      .key::before {
        content: '--';
      }

      .key::after {
        content: ':';
      }
    `,
  ]

  render() {
    return html`
      <mm-flex gap="2" wrap>
        ${this.color ? html`<span class="dot" style="background:${this.color}"></span>` : nothing}
        ${this.key ? html`<span class="key">${this.key}</span>` : nothing}
        ${this.value ? html`<span class="value">${this.value}</span>` : nothing}
      </mm-flex>
      ${this.previewStyle ? html`<figure style=${this.previewStyle}></figure>` : nothing}
      <slot></slot>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-token-item': TokenItem
  }
}
