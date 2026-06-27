import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { gridStyles } from './grid.styles'

type Columns = 1 | 2 | 3 | 4

@customElement('mm-grid')
export class Grid extends LitElement {
  static styles = gridStyles

  @property({ type: Number, reflect: true }) columns: Columns = 2

  @property({ attribute: 'column-max-width' }) columnMaxWidth?: string

  @property({ type: String }) gap = '4'

  render() {
    const gap = /^\d+$/.test(this.gap) ? `var(--space-${this.gap})` : this.gap
    const styles = [`gap: ${gap}`]
    if (this.columnMaxWidth)
      styles.push(`--_col-max: ${this.columnMaxWidth}; justify-content: space-between`)

    return html`
      <div class="grid" style=${styles.join('; ')}><slot></slot></div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-grid': Grid
  }
}
