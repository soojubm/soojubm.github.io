import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { resetStyles } from '../../../stylesheets/shared/reset.styles'

@customElement('mm-read-more-button')
export class ReadMoreButton extends LitElement {
  @property({ type: Boolean, reflect: true }) expanded = false
  @property({ type: String, attribute: 'more-label' }) moreLabel = '더 보기'
  @property({ type: String, attribute: 'less-label' }) lessLabel = '접기'

  static styles = [
    resetStyles,
    css`
      :host {
        display: inline-flex;
      }

      button {
        appearance: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 0;
        min-height: 0;
        padding: 0;
        border: 0;
        border-radius: 0;
        background: none;
        color: var(--color-foreground);
        font: inherit;
        font-weight: var(--font-weight-bold);
        line-height: inherit;
        cursor: pointer;
      }

      button:focus-visible {
        outline: 2px solid var(--color-primary);
        outline-offset: 2px;
      }
    `,
  ]

  render() {
    return html`
      <button type="button" aria-expanded=${this.expanded ? 'true' : 'false'}>
        <slot>${this.expanded ? this.lessLabel : this.moreLabel}</slot>
      </button>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-read-more-button': ReadMoreButton
  }
}
