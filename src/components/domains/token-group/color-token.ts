import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { resetStyles } from '@/stylesheets/shared/reset.styles'
import '@/components/text/text'

/**
 * 시맨틱 색상 토큰 카드.
 * surface 색(color) 위에 대비쌍(on-color)을 얹어 조합을 시연하고,
 * 캡션으로 토큰과 원시값 매핑(token)을 문서화한다.
 * 색상 토큰 표를 구성하는 단위로 mm-token-item의 색상 대응물이다.
 */
@customElement('mm-color-token')
export class ColorToken extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: block;
        border: var(--border);
        border-radius: var(--radius) var(--radius) var(--radius-large) var(--radius-large);
        overflow: hidden;
      }

      .swatch {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        min-height: 56px;
        padding: var(--space-3) var(--space-4);
        background: var(--color-token-surface);
        color: var(--color-token-on-surface, var(--color-foreground));
        box-sizing: border-box;
      }

      figcaption {
        padding-bottom: var(--space-3);
        margin-left: var(--space-4);
        margin-top: var(--space-2);
        color: var(--color-foreground);
      }
    `,
  ]

  /** surface 배경색 (예: var(--color-primary)) */
  @property({ type: String }) color = ''
  /** surface 위 대비 색 (예: var(--color-foreground-on-primary)) */
  @property({ type: String, attribute: 'on-color' }) onColor = ''
  /** surface 안에 표시되는 대비 라벨 (예: "on primary") */
  @property({ type: String }) label = ''
  /** 캡션의 토큰·원시값 매핑 (예: "primary: green800") */
  @property({ type: String }) token = ''

  render() {
    return html`
      <figure
        class="swatch"
        style=${`--color-token-surface: ${this.color}; --color-token-on-surface: ${this.onColor}`}
      >
        <mm-text size="12" weight="bold">${this.label}</mm-text>
      </figure>
      ${this.renderCaption()}
    `
  }

  private renderCaption() {
    if (!this.token) return nothing

    return html`
      <figcaption>
        <mm-text size="12" weight="bold">${this.token}</mm-text>
      </figcaption>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-color-token': ColorToken
  }
}
