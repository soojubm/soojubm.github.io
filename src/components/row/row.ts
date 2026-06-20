import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { rowStyles } from './row.styles'

@customElement('mm-row')
class Row extends LitElement {
  @property({ type: String }) gap = ''
  @property({ type: String, attribute: 'justify-content', reflect: true }) justifyContent = ''

  static styles = [rowStyles]

  render() {
    const gap = /^\d+$/.test(this.gap) ? `var(--space-${this.gap})` : this.gap

    return html`
      <div class="row" style=${gap ? `gap: ${gap}` : ''}><slot></slot></div>
    `
  }
}

export default Row
