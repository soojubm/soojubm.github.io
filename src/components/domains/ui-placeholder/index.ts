import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('mm-ui-placeholder')
export class UiPlaceholder extends LitElement {
  @property({ type: String }) color = 'var(--green100)'
  @property({ type: String }) height = '4rem'
  @property({ type: String }) radius = 'var(--radius-large)'

  static styles = css`
    :host {
      display: block;
    }

    .placeholder {
      width: 100%;
      background: var(--ui-placeholder-color);
      height: var(--ui-placeholder-height);
      border-radius: var(--ui-placeholder-radius);
    }
  `

  render() {
    const style = `
      --ui-placeholder-color: ${this.color};
      --ui-placeholder-height: ${this.height};
      --ui-placeholder-radius: ${this.radius};
    `

    return html`<div class="placeholder" style=${style} aria-hidden="true"></div>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-ui-placeholder': UiPlaceholder
  }
}
