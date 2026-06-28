import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('mm-ui-placeholder')
export class UiPlaceholder extends LitElement {
  static styles = css`
    :host {
      display: block;
      --ui-placeholder-color: var(--color-primary-subtle);
      --ui-placeholder-height: 4rem;
      --ui-placeholder-radius: var(--radius-large);
    }

    .placeholder {
      width: 100%;
      background: var(--ui-placeholder-color);
      border: 1px solid var(--brutal-border-color);
      height: var(--ui-placeholder-height);
      border-radius: var(--ui-placeholder-radius);
    }
  `

  @property({ type: String }) color = 'var(--color-primary-subtle)'
  @property({ type: String }) height = '4rem'
  @property({ type: String }) radius = 'var(--radius-large)'

  render() {
    return html`
      <div class="placeholder" aria-hidden="true"></div>
    `
  }

  protected willUpdate() {
    this.style.setProperty('--ui-placeholder-color', this.color)
    this.style.setProperty('--ui-placeholder-height', this.height)
    this.style.setProperty('--ui-placeholder-radius', this.radius)
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-ui-placeholder': UiPlaceholder
  }
}
