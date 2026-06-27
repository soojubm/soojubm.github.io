import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { styleMap } from 'lit/directives/style-map.js'

@customElement('mm-ui-placeholder')
export class UiPlaceholder extends LitElement {
  static styles = css`
    :host {
      display: block;
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
    const style = {
      '--ui-placeholder-color': this.color,
      '--ui-placeholder-height': this.height,
      '--ui-placeholder-radius': this.radius,
    }

    return html`
      <div class="placeholder" style=${styleMap(style)} aria-hidden="true"></div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-ui-placeholder': UiPlaceholder
  }
}
