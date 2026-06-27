import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { rowStyles } from '@/components/row/row.styles'

@customElement('mm-row')
class Row extends LitElement {
  static styles = [rowStyles]

  @property({ type: String }) gap = ''
  @property({ type: String, attribute: 'justify-content', reflect: true }) justifyContent = ''

  render() {
    const gap = /^\d+$/.test(this.gap) ? `var(--space-${this.gap})` : this.gap

    return html`
      <div class="row" style=${gap ? `gap: ${gap}` : ''}><slot></slot></div>
    `
  }
}

export default Row
