import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { resetStyles } from '../../../stylesheets/shared/reset.styles'
import '../../domains/indicators/list-marker'

type TokenStagePart =
  | string
  | {
      key: string
      value: string
    }

@customElement('mm-token-stage')
export class TokenStage extends LitElement {
  @property({
    type: Array,
    converter: value => {
      try {
        return JSON.parse(value || '[]')
      } catch {
        return []
      }
    },
  })
  parts: TokenStagePart[] = []

  static styles = [
    resetStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        gap: var(--space-3);
      }

      .stage {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 3rem 2rem;
        border: var(--border-stronger);
        border-radius: var(--radius-large);
        background: var(--color-background-subtle);
      }

      ::slotted(*) {
        position: relative;
      }

      .parts {
        display: flex;
        flex-direction: column;
        gap: var(--space-2);
        margin: 0;
        padding-left: 0;
      }

      .part {
        display: flex;
        align-items: flex-start;
        gap: var(--space-2);
        list-style: none;
        margin-left: 0;
        padding-left: 0;
      }

      .part-key {
        font-weight: var(--font-weight-bold);
      }

      .part-key::after {
        content: ':';
      }

      .part-value {
        color: var(--color-foreground-light);
      }
    `,
  ]

  private renderPart(part: TokenStagePart, index: number) {
    const isTokenPart = typeof part !== 'string'

    return html`
      <li class="part">
        <mm-list-marker variant="number" value=${index + 1}></mm-list-marker>
        ${isTokenPart
          ? html`
              <span class="part-key">${part.key}</span>
              <span class="part-value">${part.value}</span>
            `
          : part}
      </li>
    `
  }

  render() {
    return html`
      <div class="stage">
        <slot></slot>
      </div>
      ${this.parts.length
        ? html`<ol class="parts">
            ${this.parts.map((part, index) => this.renderPart(part, index))}
          </ol>`
        : nothing}
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-token-stage': TokenStage
  }
}
